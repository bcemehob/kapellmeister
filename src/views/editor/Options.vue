<template>
  <div class="options section">
    <div class="title">Options</div>
    <div class="block">
      <div class="info">
        <label class="option-name">Duration:</label>
        <input type="number" v-model="pattern.duration" :class="highlightDuration()" @input="changePattern">
        <label>&nbsp;measures ({{ durationInBeats }} beats, {{ duration }})</label>
      </div>
      <div class="info">
        <label class="option-name">Tempo:</label>
        <input type="number" v-model="pattern.tempo" @input="changePattern">
        <label>&nbsp;beats per minute (BPM)</label>
      </div>
      <div class="info">
        <label>Add new instrument: &nbsp;</label>
        <div class="btn btn-dark" @click="addInstrument"><i class="fa fa-plus"></i> </div>
      </div>
      <div class="info">
        <button class="btn btn-dark" :disabled="!undoAvailable" @click="undo()"><i class="fa fa-undo"></i></button>
        <button class="btn btn-dark" :disabled="!redoAvailable" @click="redo()"><i class="fa fa-redo"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import {ConductorService} from "@/services/ConductorService";

export default {
  name: "OptionsView",
  methods: {
    changePattern() {
      this.$store.commit('setPattern', this.pattern)
      localStorage.setItem('pattern', JSON.stringify(this.pattern))
    },
    highlightDuration() {
      if (this.pattern.duration % (this.pattern.measure.beats * ConductorService.DOUBLE) === 0) return "great"
      if (this.pattern.duration % (this.pattern.measure.beats * ConductorService.SQUARE) === 0) return "good"
      if (this.pattern.duration % this.pattern.measure.beats === 0) return "ok"
      else return "not-ok"
    },
    addInstrument() {
      this.pattern.instruments.push({name: 'new instrument', parties: []})
      this.changePattern()
    },
    undo(){
      this.$store.dispatch('undo')
    },
    redo(){
      this.$store.dispatch('redo')
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
    durationInBeats() {
      return this.pattern.duration * this.pattern.measure.beats
    },
    duration() {
      return ConductorService.calculateDuration(this.durationInBeats, this.pattern.tempo)
    },
    undoAvailable() {
      return this.$store.state.patternUndoStack.length
    },
    redoAvailable() {
      return this.$store.state.patternRedoStack.length
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

  .block {
    padding: 15px;
  }
  .info {
    padding: 5px;

    .option-name {
      width: 65px;
    }
  }
}
.btn {
  width: 26px;
  height: 26px;
  padding:0;
  font-size: 16px;
}
</style>
