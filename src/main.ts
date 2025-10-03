import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vuetify } from '@/plugins/vuetify'
import piniaPersist from 'pinia-plugin-persistedstate'

import './assets/main.scss'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
