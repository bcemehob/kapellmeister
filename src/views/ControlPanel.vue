<template>
  <div class="row">
    <div class="col">

      <p class="h3 my-3 text-success fw-bold">Play mode</p>
      <div class="container mt-3">
        TEMPO: {{ tempo }} bpm
      </div>
      <button class="btn btn-dark" @click="loadPattern()">Load pattern</button>
      <div v-if="!!beatEmitter" class="container control">
        <button v-if="!playing" class="btn btn-dark" @click="play()">Play</button>
        <button v-else class="btn btn-dark" @click="pause()">Pause</button>
        <button :disabled="!playing" class="btn btn-dark" @click="stop()">Stop</button>
      </div>
    </div>
  </div>
</template>
<script>

import {BeatEmitter} from "@/services/BeatEmitter";

export default {
  name: 'ControlPanel',
  props: {
    handleBeat: Function
  },
  data() {
    return {
      beatEmitter: null,
      playing: false,
    }
  },

  methods: {
    loadPattern() {
      this.beatEmitter = BeatEmitter.getInstance(130, 160, this.handleBeat)
      this.$store.commit('setPattern', {tempo: this.beatEmitter.tempo, duration: this.beatEmitter.duration})
    },
    play: function () {
      this.beatEmitter.start()
      this.playing = true
    },
    stop: function () {
      this.beatEmitter.stop()
      this.playing = false
    },
    pause: function () {
      this.beatEmitter.pause()
      this.playing = false
    },
  }
}
</script>
<style scoped>

</style>
