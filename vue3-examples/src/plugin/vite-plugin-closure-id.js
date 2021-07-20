import babel from '@babel/core'
import plugin from './babel-plugin-closure-id'
const { createFilter } = require('@rollup/pluginutils')

function vueJsxPlugin(options = {}) {
  return {
    name: 'closure-id',
    transform(code, id, ssr) {
      const {
        include,
        exclude,
      } = options

      const filter = createFilter(include || /\.[jt]sx$/, exclude)

      if (filter(id)) {
        const plugins = [plugin()]
        const result = babel.transformSync(code, {
          babelrc: false,
          ast: true,
          plugins,
          sourceMaps: true,
          sourceFileName: id,
          configFile: false
        })

        return {
          code: result.code,
          map: result.map
        }
      }
    }
  }
}

export default vueJsxPlugin