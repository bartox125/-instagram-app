import './assets/main.css'
import './assets/filters.css'
import { createApp } from "vue";
import { createStore } from "vuex";
import {store} from '@/store/index.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')