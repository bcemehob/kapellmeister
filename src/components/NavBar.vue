<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid ">
      <router-link to="/" class="navbar-brand">
        <SvgIcon :name="'logo'"></SvgIcon>
        Kapellmeister
      </router-link>
      <div class="track-name">
        <div>{{ pattern.name }}</div>
        <div v-if="pattern">
          <span class="track-info">{{ pattern.tempo }} bpm</span>
          <span class="track-info">{{ pattern.duration }} measures</span>
          <span class="track-info">{{ durationInBeats }} beats</span>
          <span class="track-info">{{ duration }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
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
.track-name {
  color: #fff
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
