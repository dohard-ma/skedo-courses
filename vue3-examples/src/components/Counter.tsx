import { lexicalScoped, effect }  from '@skedo/lexical-cache'
import { ref } from 'vue'

lexicalScoped("ref", "effect")



export default () => {
  const counter = ref(0)
	effect(() => {
		console.log('value changed to', counter.value)
	}, [counter.value])

	return (
    <div>
      {counter.value}
      <button
        onClick={() => {
          counter.value++
					console.log('clicked', counter.value)
        }}
      >
        add
      </button>
    </div>
  )
}