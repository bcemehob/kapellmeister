<template>
  <div class="container">
    <ControlPanel :handle-beat="handleBeat"></ControlPanel>
    <MotionViewer :current-beat="this.currentBeat"></MotionViewer>
    <Instrument></Instrument>
  </div>
</template>

<script setup>
import Instrument from "@/views/Instrument.vue";
import MotionViewer from "@/views/MotionViewer.vue";
import ControlPanel from "@/views/ControlPanel.vue";
</script>

<script>

export default {
  name: 'EmployeeManager',
  data:
      function () {
        return {
          fontSize: 30,
          errorMessage: null,
          beatEmitter: null,
          isBeating: false,
          currentBeat: 0,
        }

      },
  methods: {
    handleBeat(currentBeat) {
      console.log("beat", currentBeat, new Date().getTime())
      this.isBeating = true
      setTimeout(() => this.isBeating = false, 200)
      this.currentBeat = currentBeat
    },
  }
}

</script>
