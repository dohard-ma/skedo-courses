import { Ref } from "vue"
import Draggable from "./Draggable"
import Editor from "./Editor"
import { Actions, ComponentDesc, DragData } from "./editor.types"
import classes from './drag-drop.module.scss'

type PanelProps = {
	editor : Editor ,
	items : Array<Ref<ComponentDesc>>
}

type ItemRenderProps = {
	item : ComponentDesc,
	style ? : any
}

const ItemRender = (props : ItemRenderProps) => {
	const {item, style, ...others} = props
	// console.log('render', style.transform)
	switch(props.item.type) {
		case 'image' :
			return <img {...others} style={{
				width : 50,
				height :50,
				...style
			}} />
		case 'rect' :
			return (
        <div
          {...others}
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "yellow",
						...style
          }}
        />
      )
		case "text" :
			return (
        <h2 {...others} style={{...style}}>
          这里是文本
        </h2>
      )
		default:
			throw new Error("unsupported type")
	}
}

export default (props : PanelProps) => {

	const editor = props.editor
	function handleDragStart(){
		editor.dispatch(Actions.EvtDragStart)
	}

	function handleDrag(){
		editor.dispatch(Actions.EvtDrag)
	}

	function handleDragEnd(item : Ref<ComponentDesc>, data : DragData){
		item.value = {
			...item.value,
			x : data.x,
			y : data.y
		}
		console.log('end---', data)
		editor.dispatch(Actions.EvtDragEnd)
	}

	return <div class={classes.panel}>
		{props.items.map( (item, i) => {
			return (
        <Draggable
          key={i}
					initialPosition={[item.value.x, item.value.y]}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={(data? : DragData) => {
						handleDragEnd(item, data!)
					}}
        >
          <ItemRender item={item.value} />
        </Draggable>
      )
		})}
	</div>
}
