<template>
  <top-bar :beat-emitter="beatEmitter"/>
  <pattern-editor v-if="editMode" :current-beat="currentBeat"/>
  <conductor v-else :current-beat="currentBeat" :current-preroll-beat="currentPrerollBeat"/>
</template>
<script setup>
import {useStore} from "vuex"
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue"
import {ConductorService} from "@/services/ConductorService"
import {BeatEmitterProvider} from "@/services/BeatEmitterProvider"
import TopBar from "@/components/TopBar.vue"
import PatternEditor from "@/views/editor/PatternEditor.vue"
import Conductor from "@/views/Conductor.vue"

const beatEmitter = ref(null)
const serverBeatEmitterEnabled = true
// const playing = ref(false)
// const wsMessages = ref([])
// const wsMessage = ref('')

const store = useStore()
const pattern = computed(() => store.state.pattern)
const editMode = computed(() => store.state.editMode)
const currentBeat = computed(() => beatEmitter.value ? beatEmitter.value.currentBeat : 0)
const currentPrerollBeat = computed(() => beatEmitter.value ? beatEmitter.value.getCurrentPrerollBeat() : 0)
const prerollBeats = computed(() => ConductorService.isEmpty(pattern.value) ? 0 : store.state.prerollMeasures * pattern.value.measure.beats)

const loadPattern = () => {
  if (ConductorService.isEmpty(pattern.value)) {
    const patternJson = localStorage.getItem('pattern')
    if (patternJson) {
      store.commit('setPattern', JSON.parse(patternJson))
    }
  }
}
const handleClick = ()  => document.addEventListener('click', closeContextMenu)
const closeContextMenu = () => store.commit('setContextMenuShown', false)

onMounted(() => {
  loadPattern()
  handleClick()
  if (pattern.value && !ConductorService.isEmpty(pattern.value)) {
    let duration = ConductorService.durationInBeats(pattern.value)
    beatEmitter.value = new BeatEmitterProvider(pattern.value.tempo, duration, prerollBeats.value, serverBeatEmitterEnabled).get()
  }
})

onBeforeUnmount(() =>  document.removeEventListener('click', closeContextMenu))

watch(pattern, newVal => {
  let duration = ConductorService.durationInBeats(newVal)
  beatEmitter.value = ConductorService.isEmpty(newVal) ? null :
      new BeatEmitterProvider(newVal.tempo, duration, prerollBeats.value, serverBeatEmitterEnabled).get()
})
watch(prerollBeats, newVal => beatEmitter.value && beatEmitter.value.resetPreroll(newVal))

</script>
