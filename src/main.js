import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import { createVfm } from 'vue-final-modal'
import vue3GoogleLogin from 'vue3-google-login'
import googleToken from './store/token'

console.log(googleToken)
import './main.css'

window.__BASE_URL = 'http://localhost:3000'
window.ax = axios.create({
  baseURL: `${window.__BASE_URL}/api/v1`,
  timeout: 10000,
  withCredentials: true
})

const app = createApp(App)
const vfm = createVfm()

app.use(vfm)
app.use(createPinia())
app.use(vue3GoogleLogin, {
  clientId:
    '606657596707-fmmdou47nt96t3le8ko8fcg1jm009ibt.apps.googleusercontent.com'
})

app.mount('#app')
