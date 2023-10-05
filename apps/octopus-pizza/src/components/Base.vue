<script setup lang="ts">
import { inject, ref } from 'vue'

const graph: any = inject("graph")

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in graph.state.base.optionValues" :class="['button', option.selected ? 'selected' : '']"
            @click="graph.methods.base.selectItem(index)">
            <div>{{ option.valueName }}</div>
        </div>
        <div class="container-title">
            <div>base</div>
        </div>
        <div :class="{'container-error':true, active:(graph.state.doOrder.submitBlocked || graph.state.base.touched) && !graph.state.base.valid}"><div>Please choose</div></div>
    </div>
</template>

<style scoped>
.option-container {
    color: var(--color-khaki)
}
</style>
