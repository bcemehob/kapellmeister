<template>
  <div v-if="beatEmitter" class="control-block">
    <div class="container control"> {{beatEmitter.playing}} {{beatEmitter.currentBeat}} {{beatEmitter.id}}
      <button v-if="!beatEmitter.playing" :disabled="beatEmitter.isPrerollPlaying()"
              class="btn btn-grey" @click="play()"><i class="fa-solid fa-play"></i></button>
      <button v-else class="btn btn-grey" @click="pause()"><i class="fa-solid fa-pause"></i></button>
      <button :disabled="!beatEmitter.playing" class="btn btn-grey" @click="stop()"><i class="fa-solid fa-stop"></i></button>
      <progress-bar :beat-emitter="beatEmitter"/>
    </div>
  </div>
  <div v-else class="control-block"></div>
</template>

<script setup>
import ProgressBar from "@/views/controls/ProgressBar.vue";

const props = defineProps({
  beatEmitter: Object
})

function play() {
  props.beatEmitter.start()
}

function stop() {
  props.beatEmitter.stop()
}

function pause() {
  props.beatEmitter.pause()
}

</script>
