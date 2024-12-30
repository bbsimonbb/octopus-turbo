<script setup lang="ts">
import { computed } from 'vue'
import { pizza, doOrder } from '../nodes'
import ToastyError from './ToastyError.vue'


const errorActive = computed(() => {
    return !!pizza.canChoose && !pizza.valid && (doOrder.submitBlocked || pizza.touched)
})

const errorMsg = computed(() => {
    if (pizza.valid)
        return ""
    else if (!!(pizza.selectedIndex + 1))
        return "Your choice is not compatible with your base"
    else
        return "Please choose"
})

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in pizza.choices" :class="{
            'button': true,
            selected: option.selected,
            hide: option.hide
        }" @click="pizza.selectItem(index)">
            <div>{{ option.id }} €{{ option.price?.toFixed(2) }}</div>
        </div>
        <div class="container-title">
            <div>choose your pizza</div>
        </div>
        <ToastyError :error-msg="errorMsg" :active="errorActive"></ToastyError>
    </div>
</template>

<style>
.option-container {
    color: var(--color-orange)
}
</style>