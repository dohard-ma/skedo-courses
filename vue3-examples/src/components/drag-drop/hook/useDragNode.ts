
import { ref } from "vue"
import { lexicalScoped, effect } from '@skedo/lexical-cache'
import DragNode from "../object/DragNode"
import {DragEvents} from '../types/editor.types'

lexicalScoped('ref', "effect")

export function useDragNode(props : DragEvents, initialPositon : [number, number]){
  const node = ref<DragNode>(new DragNode()) 
  // for update
  const ver = ref(0)

  effect(() => {
    node.value.init()
    ver.value ++
  }, initialPositon)

  const handlers : any = {
    onDragstart: (e: DragEvent) => {
      node.value.start(e)
      props.onDragStart && props.onDragStart(node.value as DragNode)
    },
    onDrag: (e: DragEvent) => {
      node.value.update(e)
      ver.value++
      props.onDrag && props.onDrag(node.value as DragNode)
    },
    onDragend: (e: DragEvent) => {
      node.value.update(e)
      props.onDragEnd && props.onDragEnd(node.value as DragNode)
    },
  }

  return [node, handlers]
}