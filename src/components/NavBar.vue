<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid ">
      <div class="navbar-brand">
        <SvgIcon :name="'logo'"></SvgIcon>
        Kapellmeister
      </div>
      <input type="checkbox" @click="() => $emit('editMode')" />
      <PatternControlPanel />
      <div class="track-name" v-if="!ConductorService.isEmpty(pattern)">
        <div>{{ pattern.name }}</div>
        <div>
          <span class="track-info">{{ pattern.tempo }} bpm</span>
          <span class="track-info">{{ pattern.duration }} measures</span>
          <span class="track-info">{{ durationInBeats }} beats</span>
          <span class="track-info">{{ duration }}</span>
        </div>
      </div>
      <div class="empty-track" v-else>placeholder</div>
    </div>
  </nav>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import PatternControlPanel from "@/views/controls/PatternControlPanel.vue";
</script>

<script>

import {ConductorService} from "@/services/ConductorService";

export default {
  name: 'NavBar',
  components: {},
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
<style scoped>
.track-name, .control-block {
  color: #fff
}

.track-name, .empty-track {
  width: 40%;
  text-align: right;
}


.track-info {
  color: #999;
  padding: 0 10px;
  border-left: 1px solid #777;
}

.track-info:first-child {
  padding: 0;
  border: 0;
  padding-right: 10px;
}
</style>
