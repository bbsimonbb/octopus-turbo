import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import buildGraph from './graph/graph.js'

const app = createApp(App)
app.provide("graph",buildGraph())
app.mount('#app')
