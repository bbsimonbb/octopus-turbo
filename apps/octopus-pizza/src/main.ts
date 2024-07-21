import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {buildGraph} from './graph'

const app = createApp(App)
const graph = buildGraph()
app.mount('#app')
