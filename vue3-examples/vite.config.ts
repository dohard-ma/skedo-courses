import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from "@vitejs/plugin-vue-jsx"
import closureId from './src/plugin/vite-plugin-closure-id'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJSX(), closureId()]
})
