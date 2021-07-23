import { Actions, Meta, States } from "../types/editor.types";
import StateMachine from './StateMachine'
import Node from './Node'
import { EditorEvents } from "./EditorEvents";
import Metas from "./Metas";

export default class Editor extends StateMachine<States, Actions> {

  private root : Node

  private sel : Set<Node>

  private addingMeta? : Meta 
  private addingVector! : [number, number]

	constructor(){
		super(0)

    this.sel = new Set()
    this.root = new Node('root', 0, 0, 800, 800)
    const rectMeta = Metas.find(x => x.type === 'rect')
    this.root.add(new Node('rect', 0, 0, rectMeta!.w, rectMeta!.h))

    // start -> DragStart
    this.register(States.Start, States.DragStart, Actions.EvtDragStart, (node : Node) => {
		  this.replaceSelection(node)
    })

    // DragStart -> Moving
    this.register(States.DragStart, States.Moving, Actions.EvtDrag, () => {

    })

    // Moving -> Moving
    this.register(States.Moving, States.Moving, Actions.EvtDrag, () => {

    })

    // Moving -> Stoped 
    this.register(States.Moving, States.Stoped, Actions.EvtDragEnd, (vec : [number, number]) => {
      for(let node of this.sel.values()) {
        node.setXYByVector(vec)
        node.emit(EditorEvents.NodePositionUpdated)
      }
    })

    // Stoped -> Start
    this.register(States.Stoped, States.Start, Actions.AUTO, () => {

    })

    // DragStart -> Selected 
    this.register(States.DragStart, States.Selected, Actions.EvtDragEnd, () => {

    })

    this.register(States.Start, States.PlacingComponent, Actions.StartAddComponent, (meta) => {
      this.addingMeta = meta
    })
    this.register(States.PlacingComponent, States.PlacingComponent, Actions.EvtDrag, (vec) => {
      this.addingVector = vec

    })

    this.register(States.PlacingComponent, States.AddingComponent, Actions.EvtDrop , () => {

      const node = new Node(
        this.addingMeta!.type,
        this.addingVector[0] - this.addingMeta!.w / 2 - 100,
        this.addingVector[1] - this.addingMeta!.h / 2 ,
        this.addingMeta!.w,
        this.addingMeta!.h
      )

      this.root.add(node)
      console.log(this.root.getChildren())
      this.root.emit(EditorEvents.NodeChildrenUpdated)
    })

    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
    })




	}


  public replaceSelection(node : Node) {
    this.sel.clear()
    this.sel.add(node)
  }

  public getRoot(){
    return this.root
  }
}