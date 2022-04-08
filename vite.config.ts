import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
// path 为 nodejs 模块 typescript 不知道他的类型 需要增加 yarn add -D @types/node 插件，补充 node 类型
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
      exclude: ['src/**/*.tsx']
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ],
  resolve: {
    alias: [
      // 如果 ts 文件使用，还需要在 tsconfig.json 的 compilerOptions 中增加 "paths": {"@/*" : ["src/*"]}
      { find: '@', replacement: path.join(__dirname, 'src') }
    ]
  }
})
