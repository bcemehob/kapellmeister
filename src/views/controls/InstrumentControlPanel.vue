<template>
  <div class="control-block">
    <label>Instrument:</label>
    <span>Current: {{currentInstrument}}</span>
    <select v-model="currentInstrument">
      <option v-for="instrument in instruments" v-bind:key="instrument.name"> {{instrument.name}}</option>
    </select>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const instruments = computed(() => store.state.pattern.instruments)
const currentInstrument = computed({
  get() {
    return store.state.currentInstrument
  },
  set(val) {
    store.commit('setCurrentInstrument', val)
  }
})
</script>
