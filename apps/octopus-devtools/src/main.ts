import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VNetworkGraph from "v-network-graph"

const app = createApp(App)

app.use(VNetworkGraph)
app.mount('#app')

