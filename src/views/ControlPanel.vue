<template>
  <div class="row">
    <div class="col">

      <p class="h3 my-3 text-success fw-bold">Play mode</p>
      <div class="container mt-3">TEMPO: {{ pattern.tempo }} bpm</div>
      <div class="container mt-3">DURATION: {{ pattern.duration }} bpm</div>
      <input type="file" ref="json" @change="readPattern()" />
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
  computed: {
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
      const file = this.$refs.json.files[0];
      const reader = new FileReader();
      if (file.name.includes(".json")) {
        reader.onload = (res) => {
          this.$store.commit('setPattern', JSON.parse(res.target.result))
          this.beatEmitter = new BeatEmitter(this.pattern.tempo, this.pattern.duration, this.handleBeat)
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(file);
      } else {
        throw new Error("Invalid file type");
      }
    }
  }
}
</script>
<style scoped>

</style>
