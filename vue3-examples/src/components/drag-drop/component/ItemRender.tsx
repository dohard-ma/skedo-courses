
import { ref } from "vue"
import Draggable from "./Draggable"
import Editor from "../object/Editor"
import { Actions } from "../types/editor.types"
import DragNode from "../object/DragNode"
import Node from "../object/Node"
import { lexicalCache, lexicalScoped } from "@skedo/lexical-cache"
import { EditorEvents } from "../object/EditorEvents"


lexicalScoped('ref')
type ItemRenderProps = {
	node : Node,
	editor : Editor,
	style ? : any
}

const ItemRenderForDraggable = (props: ItemRenderProps) => {
  const { node, editor, style, ...others } = props
	const ver = ref(0)

	lexicalCache(() => {
		node.on(EditorEvents.NodePositionUpdated)
			.subscribe(() => {
				ver.value ++
			})
	},[])

  function render(ver : number) {
    switch (props.node.getType()) {
      case "image":
        return (
          <img
            {...others}
            src={"https://img.kaikeba.com/a/83541110301202sxpe.png"}
            style={{
              ...style,
            }}
          />
        )
      case "rect":
        return (
          <div
            {...others}
            style={{
              backgroundColor: "yellow",
              ...style,
            }}
          />
        )
      case "text":
        return (
          <h2 {...others} style={{ ...style }}>
            这里是文本
          </h2>
        )
    }
  }
	function handleDragStart(node : Node, dragNode : DragNode){
		editor.dispatch(Actions.EvtDragStart, node)
	}

	function handleDrag(node : Node, dragNode : DragNode){
		editor.dispatch(Actions.EvtDrag)
	}

	function handleDragEnd(node : Node, dragNode: DragNode){
		editor.dispatch(Actions.EvtDragEnd, [dragNode.diffX, dragNode.diffY])
	}
	return (
    <Draggable
      initialPosition={[node.getX(), node.getY()]}
      onDragStart={(dragNode: DragNode) =>
        handleDragStart(node, dragNode)
      }
      onDrag={(dragNode: DragNode) =>
        handleDrag(node, dragNode)
      }
      onDragEnd={(dragNode?: DragNode) => {
        handleDragEnd(node, dragNode!)
      }}
    >
      {render(ver.value)}
    </Draggable>
  )
}

const ItemRender = (props : ItemRenderProps) => {
	const {node, editor, style, ...others} = props
  const ver = ref(0)

  lexicalCache(() => {
    node.on(EditorEvents.NodeChildrenUpdated)
      .subscribe(() => {
        ver.value ++
      })
  }, [])

  console.log('render', ver.value)
	switch (node.getType()) {
    case "root":
      const children = node.getChildren()
      console.log('children', children)
      return (
        <div>
          {children.map((node, i) => {
            return (
              <ItemRender style={{
                width : node.getW() + 'px',
                height : node.getH() + 'px'
              }} key={i} editor={editor} node={node} />
            )
          })}
        </div>
      )
    case "rect":
    case "image":
    case "text":
			return <ItemRenderForDraggable editor={editor} node={node} />

    default:
      throw new Error("unsupported type")
  }
}

export default ItemRender