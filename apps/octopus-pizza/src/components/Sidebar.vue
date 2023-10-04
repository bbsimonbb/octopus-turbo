<template>
  <div id="sidebar-right">
    <div class="option-container" style="display:block">
      <div class="container-title">
        <input id="deliveryCheckbox" type="checkbox" v-model="deliveryCheckbox"> delivery 5€
      </div>
      <div>
        <div>delivery address</div>
        <div id="deliveryAddressTextArea" class="text-area" @input="deliveryAddressOnChange" style="height:60px"
          contenteditable @focus="graph.state.delivery.deliveryOn()"></div>
      </div>

      <div :class="{ 'container-error': true, active: (graph.state.delivery.touched || graph.state.doOrder.submitBlocked) && !graph.state.delivery.valid }">
        <div>Please provide a delivery address.</div>
      </div>
    </div>
    <Tip></Tip>
    <br>
    <div class="option-container" style="justify-content:flex-end">
      <div class="container-title">total</div>
      <div class="amount">{{ totalPrice.total.toFixed(2) }}&nbsp;€</div>
      <br>
      <br>

    </div>
    <div class="order-container">
      <div :class="{
        button: true,
        hide: !graph.state.allValid.valid
      }" @click="graph.state.doOrder.go()">Place order</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, computed, inject, ref } from 'vue'
import Tip from "./Tip.vue"
const graph: any = inject("graph")

const totalPrice : ComputedRef<any> = computed(()=>graph.state.totalPrice)

const deliveryCheckbox = computed({
  get() { return graph.state.delivery.checked },
  set(newVal) { graph.state.delivery.setChecked(newVal) }
})
function deliveryAddressOnChange(e: Event) {
  const textArea = e.target as HTMLElement
  graph.state.delivery.setDeliveryAddress(textArea.innerText)
}

</script>

<style scoped>
.order-container {
  display: flex;
  justify-content: flex-end;
  padding: 15px;
}

.order-container .button {
  border-color: turquoise;
  color:white;
  background-color: turquoise;
}

.amount {
  font-size: 50px;
}

#sidebar-right {
  background-color: rgb(218, 203, 203);
  flex: 1 1 1px;
  padding: 30px;
  color: var(--color-purple);
}

.option-container {
  color: var(--color-purple)
}

.text-area {
  border: none;
  border-left: 2px solid var(--color-purple);
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(67, 120, 198, .06);
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  outline: none;
  padding: 10px 16px;
  resize: none;
  background-color: white;
}</style>