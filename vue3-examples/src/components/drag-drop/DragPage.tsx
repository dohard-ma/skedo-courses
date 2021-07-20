import { defineComponent, reactive, ref, toRefs } from "vue"
import "./index.scss"
import classes from './drag-drop.module.scss'
import ItemList from "./ItemList"
import Panel from "./Panel"
import { DragPageState } from "./editor.types"
import Editor  from "./Editor"




export default defineComponent({
	setup(){
    const list = [{
      type : 'rect',
      x : 0,
      y : 0
    }]

    const listRefs = list.map(x => ref(x))

    const editor = new Editor()
  
		return () => {
      return (
        <div class={classes.page}>
          <ItemList />
          <Panel 
            editor={editor}
            items={listRefs} 
          />
        </div>
      )
    }
	}
})