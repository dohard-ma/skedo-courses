import Editor from "../object/Editor"
import { Actions } from "../types/editor.types"
import classes from './drag-drop.module.scss'
import Node from '../object/Node'
import {lexicalScoped } from '@skedo/lexical-cache'
import ItemRender from './ItemRender'

type PanelProps = {
	editor : Editor ,
}

type ItemRenderProps = {
	node : Node,
	editor : Editor,
	style ? : any
}


lexicalScoped('ref')


export default (props : PanelProps) => {

	const editor = props.editor


	function handleDragOver(e : DragEvent){
    e.preventDefault()
		editor.dispatch(Actions.EvtDrag, [e.clientX, e.clientY])
	}

	
	return (
    <div class={classes.panel} onDragover={handleDragOver} onDrop={e => {
      e.preventDefault()
      editor.dispatch(Actions.EvtDrop)
    }}>
      <ItemRender editor={editor} node={editor.getRoot()} />
    </div>
  )
}

