<script setup lang="ts">
import { inject, ref } from 'vue'
import {base} from "../graph/base"

const graph: any = inject("graph")

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in base.val?.optionValues" :class="['button', option.selected ? 'selected' : '']"
            @click="graph.methods.base.selectItem(index)">
            <div>{{ option.valueName }}</div>
        </div>
        <div class="container-title">
            <div>base</div>
        </div>
        <div :class="{'container-error':true, active:(graph.state.doOrder.submitBlocked || base.val?.touched) && !base.val?.valid}"><div>Please choose</div></div>
    </div>
</template>

<style scoped>
.option-container {
    color: var(--color-khaki)
}
</style>
