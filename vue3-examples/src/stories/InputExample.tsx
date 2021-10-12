import {ref, defineComponent, PropType} from 'vue'

const Input = defineComponent({
  props : {
    onChange : {
      type : Function as PropType<(v : any) => void>,
    }  ,
    value : {
      type : String,
      required : true
    } 
  },
  setup: () => {
    const input = ref(null)

    onMounted
    return () => {
      return <input ref={input} />
    }
  },
})
export const InputControlled = () => {
  const val = ref("hello")
  return <Input onChange ={v => {
    console.log('here---')
    val.value = '123'
  }} value={val.value} /> 
}