<script setup lang="ts">
import { size, doOrder } from "../nodes"
import ToastyError from "./ToastyError.vue"

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in size.choices" :class="['button', option.selected ? 'selected' : '']"
            @click="size.selectItem(index)">
            <div>{{ option.id }}</div>
        </div>
        <div class="container-title">
            <div>size</div>
        </div>
        <ToastyError error-msg="Please choose" :active="(!!doOrder.submitBlocked || !!size.touched) && !size.valid">
        </ToastyError>
    </div>
</template>

<style scoped>
.option-container {
    color: var(--color-purple)
}
</style>