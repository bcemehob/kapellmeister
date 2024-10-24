<template>
  <top-bar :beat-emitter="beatEmitter" :conductor-view="conductorView"/>
  <pattern-editor v-if="editMode && conductorView" :current-beat="currentBeat"/>
  <conductor v-else :current-beat="currentBeat" :current-preroll-beat="currentPrerollBeat"/>
</template>
<script setup>
import {useStore} from "vuex"
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue"
import {ConductorService} from "@/services/ConductorService"
import {BeatEmitterProvider} from "@/services/BeatEmitterProvider"
import TopBar from "@/components/TopBar.vue"
import PatternEditor from "@/views/editor/PatternEditor.vue"
import Conductor from "@/views/KapellmeisterCard.vue"
import {HttpClient} from "@/clients/HttpClient"
import sse from "@/clients/Sse";

const beatEmitter = ref(null)
const serverBeatEmitterEnabled = true
const store = useStore()
const pattern = computed(() => store.state.pattern)
const editMode = computed(() => store.state.editMode)
const currentBeat = computed(() => beatEmitter.value ? beatEmitter.value.currentBeat : 0)
const currentPrerollBeat = computed(() => beatEmitter.value ? beatEmitter.value.getCurrentPrerollBeat() : 0)
const prerollBeats = computed(() => ConductorService.isEmpty(pattern.value) ? 0 : store.state.prerollMeasures * pattern.value.measure.beats)
const conductorView = window.conductor
sse.init()

const loadPattern = async () => {
  if (ConductorService.isEmpty(pattern.value)) {
    const pattern = conductorView.value ? readPatternFromLocalStorage() : await HttpClient.requestPatternFromBackend()
    pattern && store.commit('setPattern', pattern)
  }
}

const readPatternFromLocalStorage = () => {
  const pattern = localStorage.getItem('pattern')
  return pattern ? JSON.parse(pattern) : null
}
const handleClick = () => document.addEventListener('click', closeContextMenu)
const closeContextMenu = () => store.commit('setContextMenuShown', false)
const patternCallback = newPattern => {
  if (conductorView) return
  const ptrn = JSON.parse(newPattern)
  store.dispatch('persistPattern', ptrn)
}

const prerollCallback = prerollBeats => {
  const prerollMeasures = ConductorService.durationInMeasures(pattern.value, prerollBeats)
  store.commit('setPrerollMeasures', prerollMeasures)
}


onMounted(async () => {
  handleClick()
  await loadPattern()
  if (pattern.value && !ConductorService.isEmpty(pattern.value)) {
    let duration = ConductorService.durationInBeats(pattern.value)
    beatEmitter.value = new BeatEmitterProvider(pattern.value.tempo, duration, prerollBeats.value, serverBeatEmitterEnabled).get()
    if (serverBeatEmitterEnabled) sse.setupEmitterAndCallbacks(beatEmitter.value, patternCallback, prerollCallback)
  }
})

onBeforeUnmount(() => document.removeEventListener('click', closeContextMenu))

watch(pattern, newVal => {
  let duration = ConductorService.durationInBeats(newVal)
  beatEmitter.value = ConductorService.isEmpty(newVal) ? null :
      new BeatEmitterProvider(newVal.tempo, duration, prerollBeats.value, serverBeatEmitterEnabled).get()
  if (beatEmitter.value && serverBeatEmitterEnabled) sse.setupEmitterAndCallbacks(beatEmitter.value, patternCallback, prerollCallback)
})
watch(prerollBeats, newVal => beatEmitter.value && beatEmitter.value.resetPreroll(newVal))
</script>
