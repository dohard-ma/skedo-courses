import * as t from "@babel/types"
import * as BabelCore from '@babel/core'


export interface VueJSXPluginOptiosn {
}

let id_counter = 1
export default () => {
	return {
		name : "closure-id",
		visitor : {
			CallExpression : {
				enter(path : BabelCore.NodePath<t.CallExpression>) {
					if('name' in path.node.callee) {
						const name = path.node.callee.name
						if(name === 'useState' || name === "useEffect") {
							const obj = t.objectExpression(
								[t.objectProperty(t.identifier("_closure"), t.numericLiteral(id_counter ++))]
							)
							const bindCall = t.memberExpression(t.identifier(name), t.identifier("bind"))
							const callBindExpr = t.callExpression(bindCall, [obj])
							const args = path.node.arguments
							const newNode = t.callExpression(callBindExpr, args)
							path.replaceWith(newNode)
						}
					}
				}
			}
		}
	}
}