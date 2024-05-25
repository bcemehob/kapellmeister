<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid ">
      <BrandWithLogo />
      <EditModeControlPanel />
      <PatternControlPanel/>
      <TransportControlPanel :beat-emitter="beatEmitter"/>
      <PatternGeneralOptionsPanel/>
    </div>
  </nav>
</template>

<script setup>
import PatternControlPanel from "@/views/controls/PatternControlPanel.vue";
import TransportControlPanel from "@/views/controls/TransportControlPanel.vue";
import PatternGeneralOptionsPanel from "@/views/controls/PatternGeneralOptionsPanel.vue";
import EditModeControlPanel from "@/views/controls/EditModeControlPanel.vue";
import BrandWithLogo from "@/views/BrandWithLogo.vue";
</script>

<script>

import {ConductorService} from "@/services/ConductorService";

export default {
  name: 'TopBar',
  components: {},
  props: {
    beatEmitter: Object
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
    durationInBeats() {
      if (!this.pattern.measure) return 0
      return this.pattern.duration * this.pattern.measure.beats
    },
    duration() {
      return ConductorService.calculateDuration(this.durationInBeats, this.pattern.tempo)
    }
  }
}
</script>
