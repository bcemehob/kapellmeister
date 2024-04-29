<template>
  <div class="container">
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
    <MotionViewer :current-beat="this.currentBeat"></MotionViewer>
    <Instrument></Instrument>
  </div>
</template>
<script setup>
import Instrument from "@/views/Instrument.vue";
import MotionViewer from "@/views/MotionViewer.vue";
</script>

<script>
import {ConductorService} from '@/services/ConductorService';
import {BeatEmitter} from "@/services/BeatEmitter";

export default {
  name: 'EmployeeManager',
  data:
      function () {
        return {
          playing: false,
          fontSize: 30,
          loading: false,
          tempo: null,
          errorMessage: null,
          beatEmitter: null,
          isBeating: false,
          currentBeat: 0,
          group: '',
        }

      },
  mounted() {
    this.tempo = ConductorService.getTempo()
  },
  unmounted: function () {

  },
  computed: {
    detectedTempo: function () {
      return this.tempo
    },
  },
  methods: {
    loadPattern() {
      this.beatEmitter = BeatEmitter.getInstance(130, 160, this.handleBeat)
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
    handleBeat(currentBeat) {
      console.log("beat", currentBeat, new Date().getTime())
      this.isBeating = true
      setTimeout(() => this.isBeating = false, 200)
      this.currentBeat = currentBeat
    },
    ringClass() {
      return 'ring trans-' + (this.currentBeat % 4)
    }
  },
  watch: {

  }
}

</script>

<style scoped>


</style>
