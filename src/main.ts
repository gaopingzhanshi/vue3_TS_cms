import { createApp } from 'vue'
import { globalRegister } from './global'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

const app = createApp(App)

// 注册element-plus/其他
app.use(globalRegister)
app.use(ElementPlus)
setupStore()
app.use(router)
app.use(store)

app.mount('#app')
