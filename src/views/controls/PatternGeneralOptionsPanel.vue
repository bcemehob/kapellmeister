<template>
  <div v-if="!ConductorService.isEmpty(pattern)" class="track-name">
    <div>{{ pattern.name }}</div>
    <div>
      <span class="track-info"><ClickableEditable v-model="pattern.tempo" /> bpm</span>
      <span class="track-info"><ClickableEditable v-model="pattern.duration" /> measures</span>
      <span class="track-info">{{ durationInBeats }} beats</span>
      <span class="track-info">
        <ClickableEditable v-model="pattern.measure.beats" />
         /
        <ClickableEditable v-model="pattern.measure.base" />
      </span>
      <span class="track-info">{{ duration }}</span>
    </div>
  </div>
  <div v-else class="empty-track">placeholder</div>
</template>

<script>
import {ConductorService} from "@/services/ConductorService";
import ClickableEditable from "@/views/controls/ClickableEditable.vue";

export default {
  name: "PatternGeneralOptionsPanel",
  components: {ClickableEditable},
  computed: {
    ConductorService() {
      return ConductorService
    },
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
