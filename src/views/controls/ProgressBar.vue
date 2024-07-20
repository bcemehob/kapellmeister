<template>
  <div class="bar">
    <div class="current-measure" v-html="getMeasure()"></div>
    <div class="current-time">{{ moment.currentTime.timeString }}</div>
    <progress id="time" max="100" :value="currentTimePercentage()" @click="startFromTime"/>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {ConductorService} from "@/services/ConductorService";

const store = useStore()
const pattern = computed(() => store.state.pattern)
const moment = computed(() => {
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
  return Math.floor(offsetX * beatsForPixel)
}

const getMeasure = () => {
  const integerPart = Math.floor(moment.value.currentBeat / pattern.value.measure.base)
  const remainder = moment.value.currentBeat % pattern.value.measure.base
  const fraction = remainder > 0 ? ` ${remainder}/${pattern.value.measure.base}` : ''
  console.log(integerPart, remainder, pattern.value.measure.base, fraction)
  return `${integerPart}&nbsp;<span class="fraction">${fraction}</span>`
}

</script>

<style scoped>
.bar > div {
  display: inline-block;
}

progress {
  margin: 0 0 0 20px;
  cursor: pointer;
  width: 80%;
  background-color: #000;
  height: 7px;
}

progress::-webkit-progress-bar {
  background-color: rgb(162, 250, 211);
  border-radius: 7px;
}

progress::-webkit-progress-value {
  background-color: #36866e;
  border-radius: 7px;
}

.bar {
  display: inline-block;
  width: 90%;
}

.current-measure {
  color: #58dab4;
  margin: 0 20px;
  width: 50px;
  font-size: 20px;
}
</style>
