import * as babel from "@babel/core"
import plugin from './babel-plugin-closure-id'


const code = `
import { createTextVNode as _createTextVNode, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
`

const result = babel.transformSync(code, {
	babelrc: false,
	ast: true,
	plugins : [plugin(null, null, null)],
	sourceMaps: true,
	sourceFileName: "aaa",
	configFile: false
})

console.log(result!.code)