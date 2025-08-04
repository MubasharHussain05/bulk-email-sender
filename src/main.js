import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/queryClient'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')