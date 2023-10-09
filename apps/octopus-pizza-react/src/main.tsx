/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.css'
import buildGraph from './graph/graph.ts'

const graph = buildGraph()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
