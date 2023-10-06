<script setup lang="ts">
import { inject, ref } from 'vue'
import {size} from "../graph/Size"
import {doOrder} from "../graph/doOrder"

</script>

<template>
    <div class="option-container">
        <div v-for="(option, index) in size.val?.optionValues"
            :class="['button',option.selected?'selected':'']"
            @click="size.methods?.selectItem(index)"
        ><div>{{ option.valueName }}</div></div>
        <div class="container-title"><div>size</div></div>
        <div :class="{'container-error':true, active:(doOrder.val?.submitBlocked || size.val?.touched) && !size.val?.valid}"><div>Please choose</div></div>
    </div>
</template>

<style scoped>
.option-container{
    color: var(--color-purple)
}
</style>
