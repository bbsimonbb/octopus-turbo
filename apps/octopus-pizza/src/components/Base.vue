<script setup lang="ts">
import {base, doOrder} from "../nodes"

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in base.val?.choices" :class="['button', option.selected ? 'selected' : '']"
            @click=" base.methods?.selectItem(index)">
            <div>{{ option.id }}</div>
        </div>
        <div class="container-title">
            <div>base</div>
        </div>
        <div :class="{'container-error':true, active:(doOrder.val?.submitBlocked || base.val?.touched) && !base.val?.valid}"><div>Please choose</div></div>
    </div>
</template>

<style scoped>
.option-container {
    color: var(--color-khaki)
}
</style>