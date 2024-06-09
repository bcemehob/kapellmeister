<template>
  <div class="section">
    <div class="title">KapellMeister</div>
    <div class="d-flex">
      <motion-viewer :current-beat="currentBeat" />
      <instruments :pattern="pattern" :current-beat="currentBeat" />
    </div>
  </div>
</template>

<script setup>
import Instruments from "@/views/Instruments.vue";
import MotionViewer from "@/views/MotionViewerV2.vue";
</script>

<script>

export default {
  name: 'KapellMeister',
  props: {
    currentBeat: Number
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
