import { Actions, States } from "./editor.types";
import StateMachine from './StateMachine'

export default class Editor extends StateMachine<States, Actions> {

	constructor(){
		super(0)

    // start -> DragStart
    this.register(States.Start, States.DragStart, Actions.EvtDragStart, () => {

    })

    // DragStart -> Moving
    this.register(States.DragStart, States.Moving, Actions.EvtDrag, () => {

    })

    // Moving -> Moving
    this.register(States.Moving, States.Moving, Actions.EvtDrag, () => {

    })

    // Moving -> Stoped 
    this.register(States.Moving, States.Stoped, Actions.EvtDragEnd, () => {

    })

    // Stoped -> Start
    this.register(States.Stoped, States.Start, Actions.AUTO, () => {

    })

    // DragStart -> Selected 
    this.register(States.DragStart, States.Selected, Actions.EvtDragEnd, () => {

    })
	}
}