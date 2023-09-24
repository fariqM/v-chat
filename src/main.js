import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import './main.css'
// import 'vue-final-modal/style.css'
// import 'vue-final-modal/dist/'

import { createVfm } from 'vue-final-modal'

const app = createApp(App)
const vfm = createVfm()

app.use(vfm)
app.use(createPinia())
app.mount('#app')
