<template>
  <div class="options section">
    <div class="title">Options</div>
    <div class="info">
      <label>Duration: &nbsp;</label>
      <input type="number" v-model="pattern.duration" :class="squaredSize()" @input="setPatternDuration">
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
    },
    squaredSize() {
      if (this.pattern.duration % (this.pattern.measure.beats * ConductorService.DOUBLE) === 0) return "great"
      if (this.pattern.duration % (this.pattern.measure.beats * ConductorService.SQUARE) === 0) return "good"
      if (this.pattern.duration % this.pattern.measure.beats === 0) return "ok"
      else return "not-ok"
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
  font-weight: bold;
  &.not-ok {
    color: #7f0101;
    background-color: #FFDBE2;
  }
  &.good {
    color: #020276;
    background-color: #dbffe9;

  }
  &.great {
    color: #004b00;
    background-color: #bcfd96;
  }

}
.options {
  font-size: 14px;
  .info{
    padding: 15px;
  }
}
</style>
