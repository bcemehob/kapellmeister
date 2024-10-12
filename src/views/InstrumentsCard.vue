<template>
  <div class="section w-50">
    <div class="title inline">Instruments</div>
    <instrument-switch v-if="!conductorView" class="inline float-r"/>
    <div class="d-flex align-items-center justify-content-center">
      <instrument v-for="instrument in instruments()"
                  :key="instrument.name"
                  :instrument="instrument"
                  :measure="pattern.measure"
                  :current-beat="currentBeat" />
    </div>
  </div>
</template>
<script setup>
import instrument from "@/views/InstrumentCard.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import InstrumentSwitch from "@/views/InstrumentSwitch.vue";

defineProps(['currentBeat'])
const store = useStore()
const conductorView = window.conductor
const pattern = computed(() => store.state.pattern)
const currentInstrument = computed(() => store.state.currentInstrument)
const instruments = () => {
  return conductorView ? pattern.value.instruments : instrumentForMusician()
}
const instrumentForMusician = () => {
  return !(currentInstrument.value && pattern.value.instruments) ?
      [] : pattern.value.instruments.filter(ins => ins.name === currentInstrument.value)
}
</script>
