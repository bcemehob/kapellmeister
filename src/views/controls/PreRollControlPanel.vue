<template>
  <div class="control-block">
    <label>Measures to pre-roll:</label>
    <select v-model="preRollMeasures">
      <option>0</option>
      <option>1</option>
      <option>2</option>
      <option>4</option>
      <option>6</option>
      <option>8</option>
    </select>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const preRollMeasures = computed({
  get() {
    return store.state.preRollMeasures
  },
  set(val) {
    store.commit('setPreRollMeasures', val)
  }
})
</script>
