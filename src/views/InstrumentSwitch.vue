<template>
  <div class="switch inline float-r">
    <button class="btn btn-grey"  :disabled="!currentInstrument" @click="currentInstrument = null">
      <i class="fa fa-list "></i>
    </button>
  </div>
  <div class="instrument-switch-modal" :class="{'disappeared': currentInstrument}">
    <ul>
      <li v-for="instrument in instruments" v-bind:key="instrument.name" @click="setCurrentInstrument(instrument)">
        {{ instrument.name}}
      </li>
    </ul>
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

const setCurrentInstrument = instrument => {
  console.log("clicked instrument", instrument)
  currentInstrument.value = instrument
}
</script>

<style scoped>
.instrument-switch-modal {
  display: block;
  position: fixed;
  top: 20%;
  right: 15%;
  max-width: 40%;
  max-height: 40%;
  overflow-y: auto;
  background-color: #cdd5dd;
  border: 1px solid #7d858d;
  border-radius: 5px;
  font-size: 20px;
  z-index: 10000;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      cursor: pointer;
      padding: 0.7rem 2.5rem;
      border-bottom: 1px dotted #7d858d;
      &:hover {
        background-color: #adb5bd;
        color: #070f27;
      }
    }
  }
  &.disappeared{
    display: none;
    z-index: -1;
  }
}

</style>
