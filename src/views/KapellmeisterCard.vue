<template>
  <div class="section">
    <div class="title">KapellMeister</div>
    <div class="d-flex">
      <PreRoll :current-preroll-beat="currentPrerollBeat"/>
      <motion-viewer :current-beat="currentBeat"/>
      <instruments :pattern="pattern" :current-beat="currentBeat"/>
    </div>
  </div>
</template>

<script setup>
import Instruments from "@/views/InstrumentsCard.vue";
import MotionViewer from "@/views/MotionViewer.vue";
import PreRoll from "@/views/PreRoll.vue";
import {computed} from "vue";
import {useStore} from "vuex";

defineProps(['currentBeat', 'currentPrerollBeat'])
const store = useStore()
const pattern = computed(() => store.state.pattern)
</script>
