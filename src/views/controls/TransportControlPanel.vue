<template>
  <div v-if="beatEmitter" class="control-block">
    <div class="container control">
      <template v-if="conductorView">
        <button v-if="!beatEmitter.playing" :disabled="beatEmitter.isPrerollPlaying()"
                class="btn btn-grey" @click="play()"><i class="fa-solid fa-play"></i></button>
        <button v-else class="btn btn-grey" @click="pause()"><i class="fa-solid fa-pause"></i></button>
        <button :disabled="!beatEmitter.playing" class="btn btn-grey" @click="stop()"><i class="fa-solid fa-stop"></i>
        </button>
      </template>
      <progress-bar :beat-emitter="beatEmitter"/>
    </div>
  </div>
  <div v-else class="control-block"></div>
</template>

<script setup>
import ProgressBar from "@/views/controls/ProgressBar.vue";
import {useStore} from "vuex";
import {computed} from "vue";

const props = defineProps({
  beatEmitter: Object
})
const store = useStore()
const conductorView = computed(() => store.state.conductorView)

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
