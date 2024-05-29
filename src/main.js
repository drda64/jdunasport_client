import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ('@/assets/main.css')
import Notifications from '@kyvg/vue3-notification'
import { setLocale } from 'yup';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Notifications)

app.mount('#app')
