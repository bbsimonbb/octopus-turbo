<template>
    <div class="option-container" style="display:block; margin-top:50px;">
        <div class="container-title">tip</div>
        <input type="radio" id="tipAsPct" name="tipPercent" :value="true" v-model="tipAsPct">
        <label for="tipAsPct">10%</label>
        <span v-if="tipAsPct" style="font-size: smaller; padding-left: 10px;">({{ ((pizza.optionPrice /
            10) || 0).toFixed(2) }}
            €)</span>
        <br>
        <br>
        <input type="radio" name="tipPercent" :value="false" v-model="tipAsPct">&nbsp;
        <input type="text" v-model="amountInput" @focus="tipAmountInputOnFocus()" @blur="tipAmountInputOnBlur()"
            @keypress="tipAmountInputOnKeypress($event)" id="tipAmountText" size="5">&nbsp;€
        <div :class="{ 'container-error': true, active: (doOrder.submitBlocked || tip.touched) && !tip.valid }">
            <div>Must not be empty</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { tip, doOrder, pizza } from "../nodes"
// tipUI has an inner loop. User input is backed by a local variable in the vue component.
// Only if it parses to a number will we update the graph.
var _rawUI = ref("")
var amountActive = ref(false)
function tipAmountInputOnFocus() {
    if (tip.parsedUserInput)
        _rawUI.value = tip.parsedUserInput?.toFixed(2)
    amountActive.value = true
}
function tipAmountInputOnBlur() {
    amountActive.value = false
}
function tipAmountInputOnKeypress(e: KeyboardEvent) {
    if (e.target) {
        const tgt = e.target as HTMLInputElement
        const i = tgt.selectionStart || 0
        const currVal = tgt.value
        const futureVal = currVal.slice(0, i) + e.key + currVal.slice(i + Math.abs(0))
        if (/^[1-9]?[0-9]*\.?[0-9]{0,2}$/.test(futureVal))
            return true
        else {
            e.preventDefault()
            return false
        }
    }
}
const amountInput = computed({
    get() {
        if (amountActive.value) {
            return _rawUI.value
        } else {
            // if empty string, display it
            if (!_rawUI.value)
                return _rawUI.value
            else
                return tip.parsedUserInput?.toFixed(2)
        }
    },
    set(newVal) {
        _rawUI.value = newVal || ''
        const parsedUI = parseFloat(newVal || '0')
        // keyup handler ensures only numbers are entered
        tip.tipAmountOnChange(isNaN(parsedUI) ? null : parsedUI)
    }
})

const tipAsPct = computed({
    get() { return tip.tipAsPct },
    set(newVal) { tip.setTipAsPct(newVal) }
})

</script>

<style scoped></style>