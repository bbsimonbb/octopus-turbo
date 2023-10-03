<script setup lang="ts">
import { ComputedRef, computed, inject, ref } from 'vue'
import { IPizza } from '../graph/Pizza';

const graph: any = inject("graph")
const errorActive = computed(()=>{
    return myNode.value.canChoose && !myNode.value.valid && (graph.state.doOrder.submitBlocked || myNode.value.touched)
})
const myNode : ComputedRef<IPizza> = computed(()=>graph.state.pizza)
const errorMsg = computed(()=>{
    if(myNode.value.valid)
    return ""
    else if(!!myNode.value.selectedValue)
    return "Your choice is not compatible with your base"
    else
    return "Please choose"
})

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in myNode.optionValues" :class="{
            'button': true,
            selected: option.selected,
            hide: option.hide
        }" @click="graph.methods.pizza.selectItem(index)"><div>{{ option.valueName }} €{{ option.price?.toFixed(2) }}</div></div>
        <div class="container-title"><div>choose your pizza</div></div>
        <div :class="{'container-error':true, active: errorActive}"><div>{{ errorMsg }}</div></div>
    </div>
</template>

<style >
.option-container {
    color: var(--color-orange)
}
</style>
