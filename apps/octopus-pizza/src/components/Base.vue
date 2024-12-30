<script setup lang="ts">
import { base, doOrder } from "../nodes"

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in base.choices" :class="['button', option.selected ? 'selected' : '']"
            @click=" base.selectItem(index)">
            <div>{{ option.id }}</div>
        </div>
        <div class="container-title">
            <div>base</div>
        </div>
        <div :class="{ 'container-error': true, active: (doOrder.submitBlocked || base.touched) && !base.valid }">
            <div>Please choose</div>
        </div>
    </div>
</template>

<style scoped>
.option-container {
    color: var(--color-khaki)
}
</style>