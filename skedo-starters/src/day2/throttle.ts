export function throttle(fn : Function, interval : number = 300, lock = false) {
	let I = null
	let start : number
	return (...args : Array<any>) => {
		if(start === undefined) {
			start = new Date().getTime()
		}
		if (lock) {
      return
    }
		lock = true
		fn(...args)
		const ellapsed = (new Date().getTime() - start ) 
		I = setTimeout(() => {
			lock = false
		}, interval - ellapsed % interval)
	}
}


