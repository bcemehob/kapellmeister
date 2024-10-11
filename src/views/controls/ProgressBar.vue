<template>
  <div class="bar">
    <div class="current-measure" v-html="getMeasure()"></div>
    <div class="current-time">{{ moment.currentTime.timeString }}</div>
    <span>
      <progress ref="progress" id="time" max="100" :value="currentTimePercentage()"
                :class="{'no-pointer': !conductorView}"
                @click="goToBeat"
                @mouseout="hideTooltip"
                @mousemove="moveTooltip"/>
      <span class="dynamic-tooltip" ref="tooltip"></span>
    </span>
  </div>
</template>

<script setup>
import {useStore} from "vuex"
import {computed, ref} from "vue"
import {ConductorService} from "@/services/ConductorService"

const store = useStore()
const tooltip = ref(null)
const progress = ref(null)
const conductorView = window.conductor
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

const goToBeat = (event) => {
  if (!conductorView) return
  const newCurrentBeat = getCurrentBeat(event.offsetX, event.target.getBoundingClientRect().width)
  if (props.beatEmitter.currentBeat === newCurrentBeat) return
  props.beatEmitter.goToBeat(newCurrentBeat, pattern.value.tempo)
}

const getCurrentBeat = (offsetX, elementWidth) => {
  const beatsTotal = ConductorService.durationInBeats(pattern.value)
  const beatsForPixel = beatsTotal / elementWidth
  return Math.floor(offsetX * beatsForPixel) + 1
}

const getMeasure = () => {
  return getMeasureForBeat(moment.value.currentBeat)
}

const getMeasureForBeat = currentBeat => {
  const intPart = Math.ceil(currentBeat / pattern.value.measure.base)
  const remainder = currentBeat % pattern.value.measure.base
  const fraction = remainder > 0 ? ` ${remainder}/${pattern.value.measure.base}` : ''
  return `${intPart}&nbsp;<span class="fraction">${fraction}</span>`
}

const moveTooltip = e => {
  tooltip.value.style.visibility = 'visible'
  tooltip.value.style.top = (e.clientY - 50) + 'px'
  tooltip.value.style.left = e.clientX + 'px'
  const selectedBeat = getCurrentBeat(e.offsetX, progress.value.getBoundingClientRect().width)
  tooltip.value.innerHTML = `${getMeasureForBeat(selectedBeat)} (${ConductorService.calculateDuration(selectedBeat, pattern.value.tempo).timeString})`
}

const hideTooltip = () => {
  tooltip.value.style.visibility = 'hidden'
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
  &.no-pointer {
    cursor: auto;
  }
}

progress::-webkit-progress-bar {
  background-color: #D5DAD8FF;
  border-radius: 7px;
}

progress::-webkit-progress-value {
  background-color: rgba(17, 150, 114, 100);
  border-radius: 7px;
}

.bar {
  display: inline-block;
  width: 90%;

  .dynamic-tooltip {
    display: block;
    visibility: hidden;
    position: fixed;
    background-color: #d8d892;
    color: #000;
    border: 1px solid #000;
    border-radius: 3px;
    padding: 3px 5px;
    z-index: 10000;
  }
}

.current-measure {
  color: #58dab4;
  margin: 0 20px;
  width: 50px;
  font-size: 20px;
}
</style>
