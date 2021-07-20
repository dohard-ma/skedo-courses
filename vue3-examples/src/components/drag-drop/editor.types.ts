import { Ref } from "vue"

export type ComponentDesc = {
  type : string,
  x : number,
  y : number
}

export type DragPageState = {
  list : Array<ComponentDesc>
}

export enum States {
  Start,
  DragStart,
  Moving,
  Stoped,
  Selected
}

export enum Actions {
  AUTO,
  EvtDragStart,
  EvtDrag,
  EvtDragEnd,
}


export type DragData = {
	dragging : boolean,
	startX : number,
	startY : number,
	x : number,
	y : number,
	diffX : number,
	diffY : number
}
