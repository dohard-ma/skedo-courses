import {throttle} from './throttle'
import {debounce} from './debounce'
import {timer} from 'rxjs'
describe("throttle-test", () => {


	it("test", (done) => {

		let count = 0
	
		function __addCount(){
			count += 1
		}
	
		const addCount = throttle(__addCount, 100)

		const source = timer(0, 10)

		source.subscribe((i:number) => {
			if(i === 100) {
				expect(count).toBe(11)
				done()
			} else {
				addCount()
			}
		})
	})

	it("test-debounce", (done) => {
		let count = 0
		function __addCount(){
			count += 1
		}
	
		const addCount = debounce(__addCount, 100)

		const source = timer(0, 10)

		const subscription = source.subscribe((i) => {
			if(i === 100) {
				subscription.unsubscribe()
				setTimeout(() => {
					expect(count).toBe(1)
					done()
				}, 350)
			}else {
				addCount()
			}
		})

	
	})
})