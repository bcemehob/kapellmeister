<template>
  <div class="section">
    <div class="title">KapellMeister</div>
    <PatternEditor></PatternEditor>
    <ControlPanel :handle-beat="handleBeat"></ControlPanel>
    <div class="d-flex">
      <MotionViewer :current-beat="currentBeat"></MotionViewer>
      <Instruments :pattern="pattern" :current-beat="currentBeat"></Instruments>
    </div>
  </div>
</template>

<script setup>
import Instruments from "@/views/Instruments.vue";
import MotionViewer from "@/views/MotionViewer.vue";
import ControlPanel from "@/views/controls/ControlPanel.vue";
import PatternEditor from "@/views/editor/PatternEditor.vue";
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
      this.currentBeat = currentBeat
    },
  }
}

</script>
