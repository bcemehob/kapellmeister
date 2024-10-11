<template>
  <div class="section">
    <div class="title">KapellMeister</div>
    <div class="d-flex">
      <PreRoll :current-preroll-beat="currentPrerollBeat" />
      <motion-viewer :current-beat="currentBeat" />
      <instruments :pattern="pattern" :current-beat="currentBeat" />
    </div>
  </div>
</template>

<script setup>
import Instruments from "@/views/InstrumentsCard.vue";
import MotionViewer from "@/views/MotionViewer.vue";
import PreRoll from "@/views/PreRoll.vue";
</script>

<script>

export default {
  name: 'KapellMeister',
  props: {
    currentBeat: Number,
    currentPrerollBeat: Number,
  },
  data:
      function () {
        return {
          fontSize: 30,
          errorMessage: null,
          beatEmitter: null,
        }
      },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  }
}

</script>
