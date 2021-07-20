import { defineComponent, reactive, ref, VNode, VNodeProps } from "vue"
import { useState } from "../hooks"
import {deepMerge} from './deepMerge'
import { DragData } from "./editor.types"


function assignPropsToVNode(vNode : VNode, props : any) {
	vNode.props = deepMerge(vNode.props, props) 
	return vNode
}

type DraggableProps = {
	onDragStart ? : (e ? : DragData) => void,
	onDragEnd ? : (e? :DragData) => void,
	onDrag? : (e? : DragData) => void,
	initialPosition : [number, number]
}


export default (props: DraggableProps, ctx: any) => {
  const [state, setState] = useState<DragData>({
    dragging: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    diffX: 0,
    diffY: 0,
  })
  console.log(props.initialPosition)

  const vNodeProps: any = {
    draggable: true,
    onDragstart: (e: DragEvent) => {
      const newState = {
        ...state,
        dragging: true,
        x: props.initialPosition[0],
        y: props.initialPosition[1],
        startX: e.clientX,
        startY: e.clientY,
        diffX : 0,
        diffY : 0
      }
      console.log('start---', newState)
      setState(newState)
      props.onDragStart && props.onDragStart(newState)
    },
    onDrag: (e: DragEvent) => {
      const diffX =  e.clientX - state.startX
      const diffY =  e.clientY - state.startY
      const newState = {
        ...state,
        x: diffX + props.initialPosition[0],
        y: diffY + props.initialPosition[1],
        diffX,
        diffY,
      }
      console.log("move", e.clientX, e.clientY)
			setState(newState)
      props.onDrag && props.onDrag(newState)
    },
    onDragend: (e: DragEvent) => {
      const diffX =  e.clientX - state.startX
      const diffY =  e.clientY - state.startY
      const newState = {
        ...state,
        dragging: false,
        x: diffX + props.initialPosition[0],
        y: diffY + props.initialPosition[1],
        diffX,
        diffY,
      }
      console.log("end---", newState)
      props.onDragEnd && props.onDragEnd(newState)
    },
  }

  let vNode: VNode = ctx.slots.default!()[0]

  vNodeProps.style = {
    position: "absolute",
    top: 0,
    left: 0,
    transform: `translate(${state.x}px, ${state.y}px)`,
  }

  vNode = assignPropsToVNode(vNode, vNodeProps)
  return vNode
}



const Draggable1 = defineComponent({
  setup : (props, ctx) => {
      const vNode = ctx.slots.default!()[0]
      return vNode
  }
})