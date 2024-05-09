<template>
  <div class="options section">
    <div class="title">Options</div>
    <div class="info">
      <label>track size: &nbsp;</label>
      <input type="number" v-model="pattern.duration" @input="setPatternDuration">
      <label>&nbsp;measures ({{ durationInBeats }} beats, {{ duration }})</label>
    </div>
  </div>
</template>

<script>
import {ConductorService} from "@/services/ConductorService";

export default {
  name: "OptionsView",
  methods: {
    setPatternDuration() {
      this.$store.commit('setPattern', this.pattern)
    }
  },
  computed: {
    pattern(){
      return this.$store.state.pattern
    },
    durationInBeats() {
      return this.pattern.duration * this.pattern.measure.beats
    },
    duration() {
      return ConductorService.calculateDuration(this.durationInBeats, this.pattern.tempo)
    }
  }
}
</script>

<style scoped>
input {
  width: 65px;
}
</style>
