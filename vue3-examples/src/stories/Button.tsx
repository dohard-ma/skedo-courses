import {defineComponent} from 'vue'

const Button = ({text} : {text : string}) => {
  return <button>{text}</button>
}

const ButtonWithSlots = (_ : any, context : any) => {
  return <button>{context.slots.default()}</button>
}


// const ButtonWithSlots = defineComponent({
//   props : {
//     style : {
//       type : Object 
//     }
//   },
//   setup : (props, context) => {
//     return () => {
//       return (
//         <button style={props.style}>
//           {context.slots.default!()}
//         </button>
//       )
//     }
//   }
// })


export const ButtonExample01 = () => {
  return (
    <Button text="你好!" />
  )
}

export const ButtonExample02 = () => {
  return <ButtonWithSlots>你好！</ButtonWithSlots>
}
