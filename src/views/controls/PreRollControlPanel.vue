<template>
  <div class="control-block">
    <label>Preroll measures:</label>
    <select v-model="prerollMeasures">
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
const prerollMeasures = computed({
  get() {
    return store.state.prerollMeasures
  },
  set(val) {
    store.commit('setPrerollMeasures', val)
  }
})
</script>
