<template>
  <div class="container">
    <ControlPanel :handle-beat="handleBeat"></ControlPanel>
    <MotionViewer :current-beat="this.currentBeat"></MotionViewer>
    <div class="d-flex align-items-center justify-content-center">
      <Instrument v-for="instrument in pattern.instruments" :key="instrument.name" :parties="instrument"></Instrument>
    </div>
  </div>
</template>

<script setup>
import Instrument from "@/views/Instrument.vue";
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
