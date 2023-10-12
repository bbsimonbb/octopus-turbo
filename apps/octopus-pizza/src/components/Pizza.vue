<script setup lang="ts">
import { computed } from 'vue'
import { doOrder} from '../graph/doOrder'
import {pizza} from '../graph/Pizza'
import ToastyError from './ToastyError.vue'


const errorActive = computed(()=>{
    return !!pizza.val?.canChoose && !pizza.val?.valid && (doOrder.val?.submitBlocked || pizza.val?.touched)
})

const errorMsg = computed(()=>{
    if(pizza.val?.valid)
    return ""
    else if(!!pizza.val?.selectedValue)
    return "Your choice is not compatible with your base"
    else
    return "Please choose"
})

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in pizza.val?.optionValues" :class="{
            'button': true,
            selected: option.selected,
            hide: option.hide
        }" @click="pizza.methods.selectItem(index)"><div>{{ option.valueName }} €{{ option.price?.toFixed(2) }}</div></div>
        <div class="container-title"><div>choose your pizza</div></div>
        <ToastyError :error-msg="errorMsg" :active="errorActive"></ToastyError>
    </div>
</template>

<style >
.option-container {
    color: var(--color-orange)
}
</style>
