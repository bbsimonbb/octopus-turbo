<script setup lang="ts">
import Size from './components/Size.vue'
import Pizza from './components/Pizza.vue'
import Base from './components/Base.vue'
import Sidebar from './components/Sidebar.vue'
import { pizza } from "./nodes"
import graph from "./bareReactiveGraph";

let devtools: undefined | null | Window
function popDevtools() {
  if (devtools && !devtools.closed) {
    devtools.focus()
  } else {
    const origin = "http://localhost:7768"
    devtools = window.open(origin, "_blank", "popup")
    window.addEventListener("pagehide", () => { devtools?.close() })
    if (devtools)
      graph.registerDevtools(devtools, origin)
  }
}
</script>

<template>
  <div id="content">
    <div class="flex-container">
      <div style="height:400px; margin:30px">
        <img :class="{ main: true, veil: !pizza.valid }" :src="pizza.choices[pizza.selectedIndex]?.imageUrl" />
      </div>
    </div>
    <div class="flex-container">
      <Size></Size>
      <Base>
      </Base>
    </div>
    <div class="flex-container">
      <Pizza></Pizza>
    </div>
  </div>
  <Sidebar></Sidebar>
  <img src="./assets/vue.svg" id="vue-logo" />
  <img src="./assets/octopus-photo.png" id="octo" @click="popDevtools()" />
</template>

<style>
#octo {
  position: absolute;
  height: 100px;
  bottom: 0;
  right: 0;
}

#vue-logo {
  position: absolute;
  height: 60px;
  bottom: 22px;
  right: 180px;
}

#content {
  align-self: center;
  flex: 3 3 3px;
}

.flex-container {
  display: flex;
  justify-content: center;
}

img.main {
  height: 400px;
  transition: opacity ease-in-out 500ms;
}

img.main.veil {
  opacity: 30%;
}

.option-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  border: 1px solid;
  padding: 20px;
  margin: 15px;
  border-radius: 10px;
  position: relative;
}

.container-title {
  position: absolute;
  top: -14px;
  left: 50px;
  font-size: 18px;
  background-color: white;
  border: 1px solid;
  border-radius: 10px;
  padding: 0px 8px;
}

.container-error {
  position: absolute;
  bottom: -14px;
  right: 8%;
  max-width: 0px;
  white-space: nowrap;
  overflow: hidden;
  transition: max-width 500ms ease-in-out;
}

.container-error.active {
  max-width: 500px
}

.container-error div {
  background-color: white;
  border: 1px solid;
  border-radius: 10px;
  padding: 0px 8px;
  line-height: 26px;
}

.container-error div::before {
  content: '⚠';
  color: red;
  font-size: larger;
  padding: 0px 8px;
}

.container-title div {
  position: relative;
  top: -3px;
}

.button {
  border: 3px solid;
  border-radius: 10px;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
}

.button.hide {

  filter: saturate(30%) brightness(120%) !important;
}

.button.selected {
  background-color: currentColor;
  border-color: currentColor;
}

.button.selected div {
  color: white;
}

.button:hover {
  filter: brightness(150%);
}

.button:hover:active {
  filter: brightness(80%);
}
</style>
./bareReactiveGraph./nodes/Pizza