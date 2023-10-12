<template>
    <div :class="{'container-error':true, active:active}">
        <div>{{displayErr}}</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps < { errorMsg?: string, active: boolean } > ()
let displayErr=ref(props.errorMsg)
watch(()=>props.errorMsg, ()=>{
    if ( displayErr.value && displayErr.value !== props.errorMsg) {
        // don't clear the error message until the toast has vanished
        setTimeout(() => { displayErr.value = '' }, 500)
    }
    else if (displayErr.value !== props.errorMsg)
        displayErr.value = props.errorMsg || ''
})
</script>

<style lang="scss" scoped></style>