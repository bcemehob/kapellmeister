<template>
  <div class="row section">
    <div class="title">Play mode</div>

    <div v-show="error" class="alert alert-danger">{{ error }}</div>
    <div class="container control">
      <button v-if="!beatEmitter.playing" class="btn btn-grey" @click="play()"><i class="fa-solid fa-play"></i></button>
      <button v-else class="btn btn-grey" @click="pause()"><i class="fa-solid fa-pause"></i></button>
      <button :disabled="!beatEmitter.playing" class="btn btn-grey" @click="stop()"><i class="fa-solid fa-stop"></i></button>
    </div>
  </div>
</template>
<script>

import {ConductorService} from "@/services/ConductorService"

export default {
  name: 'TransportControlPanel',
  props: {
    handleBeat: Function,
    beatEmitter: Object
  },
  data() {
    return {
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
    },

    stop: function () {
      this.beatEmitter.stop()
    },

    pause: function () {
      this.beatEmitter.pause()
    },
  },
}
</script>
