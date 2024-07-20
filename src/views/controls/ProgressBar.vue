<template>
  <div class="bar">
    <div>{{ moment.currentBeat }}</div> :
    <div>{{ moment.currentTime.seconds }}</div> :
    <div>{{ moment.currentTime.timeString }}</div> :
    <div>{{ moment.totalTime.timeString }}</div>
    <progress id="time" max="100" :value="currentTimePercentage()" @click="startFromTime" />
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {ConductorService} from "@/services/ConductorService";

const store = useStore()
const pattern = computed(() => store.state.pattern)
const moment = computed( () =>  {
  return {
    currentBeat: props.beatEmitter.currentBeat,
    currentTime: ConductorService.duration(props.beatEmitter.currentSecond),
    totalTime: ConductorService.calculateTimeDuration(pattern.value)
  }
})

const props = defineProps({
  beatEmitter: Object
})

const currentTimePercentage = () => {
  return Math.floor(100 * moment.value.currentTime.seconds / moment.value.totalTime.seconds)
}


const startFromTime = (event) => {
  const currentBeat = getCurrentBeat(event.offsetX, event.target.getBoundingClientRect().width)
  props.beatEmitter.goToBeat(currentBeat, pattern.value.tempo)
  props.beatEmitter.pause()
}

const getCurrentBeat = (offsetX, elementWidth) => {
  const beatsTotal = ConductorService.durationInBeats(pattern.value)
  const beatsForPixel = beatsTotal / elementWidth
  return  Math.floor(offsetX * beatsForPixel)
}

</script>

<style scoped>
.bar > div{
  display: inline-block;
}

progress {
  cursor: pointer;
}
</style>
