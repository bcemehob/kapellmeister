<template>
  <div class="bar">
    <div>{{ moment.currentBeat }}</div> :
    <div>{{ moment.currentTime.seconds }}</div> :
    <div>{{ moment.currentTime.timeString }}</div> :
    <div>{{ moment.totalTime.timeString }}</div>
    <progress id="time" max="100" :value="currentTimePercentage()" />
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

</script>

<style scoped>
.bar > div{
  display: inline-block;
}
</style>
