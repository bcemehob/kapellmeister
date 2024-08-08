<template>
  <div class="section" :class="isHidden() && 'hidden'">
    <div class="title">Preroll</div>
    <div>Beat: {{props.currentPrerollBeat}} - {{pattern.name}}</div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
const props = defineProps({
  currentPrerollBeat: Object
})

const store = useStore()
const pattern = computed(() => store.state.pattern)
const prerollDuration = computed(() => store.state.prerollMeasures * pattern.value.measure.beats)
const isHidden = () => {
  return props.currentPrerollBeat === 0 || props.currentPrerollBeat > prerollDuration.value
}
</script>

<style scoped>
.section {
  position: absolute;
  top: 100px;
  left: 0;
  visibility: visible;
  &.hidden{
    visibility: hidden;
  }
}
</style>
