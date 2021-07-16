export function debounce(fn : Function, delay:number=300) {
	let I = null
	return (...args : Array<any>) => {
		clearInterval(I)
		I = setTimeout(() => {
			fn(...args)
		}, delay )
	}
}