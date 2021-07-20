type HelloWorldProps = {
	msg : string
}

const Title = ({msg} : HelloWorldProps) => {
	return <h1>{msg}</h1>
}
export default ({msg}: HelloWorldProps) => {
	return <Title msg={msg} />
}


// JSX = react
