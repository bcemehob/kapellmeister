<template>
  <div class="row section">
    <div class="title">Play mode</div>
    <div class="d-flex space-between">
      <input type="file" ref="json" @change="readPattern()"/>
      <div v-if="beatEmitter" class="d-flex" style="flex: 1">
        <div class="container mt-3">TEMPO: {{ pattern.tempo }} bpm</div>
        <div class="container mt-3">DURATION: {{ ConductorService.durationInBeats(pattern) }} beats ({{ pattern.duration}} measures)</div>
      </div>
    </div>
    <div v-show="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="!!beatEmitter" class="container control">
      <button v-if="!playing" class="btn btn-dark" @click="play()"><i class="fa-solid fa-play"></i></button>
      <button v-else class="btn btn-dark" @click="pause()"><i class="fa-solid fa-pause"></i></button>
      <button :disabled="!playing" class="btn btn-dark" @click="stop()"><i class="fa-solid fa-stop"></i></button>
    </div>
  </div>
</template>
<script>

import {BeatEmitter} from "@/services/BeatEmitter";
import {ConductorService} from "@/services/ConductorService";

export default {
  name: 'ControlPanel',
  props: {
    handleBeat: Function
  },
  data() {
    return {
      beatEmitter: null,
      playing: false,
      error: null
    }
  },
  computed: {
    ConductorService() {
      return ConductorService
    },
    pattern() {
      return this.$store.state.pattern
    }
  },
  methods: {
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
    readPattern() {
      this.error = null
      const file = this.$refs.json.files[0];
      const reader = new FileReader();
      if (file.name.endsWith(".kpm") || file.name.endsWith(".json")) {
        reader.onload = (readingEvent) => {
          try {
            const pattern = JSON.parse(readingEvent.target.result)
            this.$store.commit('setPattern', pattern)
            localStorage.setItem('pattern', readingEvent.target.result)
            this.beatEmitter = new BeatEmitter(this.pattern.tempo, ConductorService.durationInBeats(this.pattern), this.handleBeat)
          } catch (e) {
            this.error = 'Could not read file'
          }
        };
        reader.onerror = (err) => this.error = err
        reader.readAsText(file);
      } else {
        this.error = `Invalid file format: ${file.name}`;
      }
    }
  },
  mounted() {
    if (this.pattern && !ConductorService.isEmpty(this.pattern)) {
      this.beatEmitter = new BeatEmitter(this.pattern.tempo, ConductorService.durationInBeats(this.pattern), this.handleBeat)
    }
  }
}
</script>
<style scoped>
.space-between {
  justify-content: space-between;
}
button {
  margin: 2px;
  width: 48px;
  height: 48px;
  font-size: 24px;
}
</style>
