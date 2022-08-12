import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './styles/index.scss'
import elementPlus from './plugins/element-plus'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(elementPlus)
  .mount('#app')
