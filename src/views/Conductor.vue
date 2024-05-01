<template>
  <div class="container">
    <ControlPanel :handle-beat="handleBeat"></ControlPanel>
    <MotionViewer :current-beat="this.currentBeat"></MotionViewer>
    <Instruments :pattern="pattern" :current-beat="currentBeat"></Instruments>
  </div>
</template>

<script setup>
import Instruments from "@/views/Instruments.vue";
import MotionViewer from "@/views/MotionViewer.vue";
import ControlPanel from "@/views/ControlPanel.vue";
</script>

<script>

export default {
  name: 'KapellMeister',
  data:
      function () {
        return {
          fontSize: 30,
          errorMessage: null,
          beatEmitter: null,
          currentBeat: 0,
        }

      },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  },
  methods: {
    handleBeat(currentBeat) {
      console.log("beat", currentBeat, new Date().getTime())
      this.currentBeat = currentBeat
    },
  }
}

</script>
