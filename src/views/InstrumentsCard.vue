<template>
  <div class="section w-50">
    <div class="title">Instruments</div>
    <div class="d-flex align-items-center justify-content-center">
      <instrument v-for="instrument in pattern.instruments"
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

defineProps(['currentBeat'])
const store = useStore()
const pattern = computed(() => store.state.pattern)
</script>
