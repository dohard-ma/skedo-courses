import { defineComponent, reactive, Ref, ref, render } from "vue"

function ref1<T>(value : T){
	
	let _value = value
	return {
		get value() {
			return _value
		},
		set value(value : T){
			console.log('')
			_value = value 
		}
	}
}


function useCounter() : [Ref<number>, () => void]{
	// reactive
	// effect
	// Time slicing 1000/60
	// sendRequest("vue://update?")
	const counter = ref(0) // reactive
	const a = {}
	function increment(){
		counter.value ++
	}

	return [counter, increment]
}

export default defineComponent({
	setup(props, ctx) {
		const [counter, increment] = useCounter()
		const c = ref(0)
		c.value = 1
		return () => (
      <div
      >
      </div>
    )
	}
})
