<template>
  <div class="beat-container">
    <div class="row">
      <div v-if="measure" class="col-12">
        <div class="beat" :class="isCurrent(beat)" v-for="beat in beats" v-bind:key="beat"> {{beat}}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const props = defineProps({
  currentBeat: Number
})

const measure = computed(() => store.state.pattern.measure)
const beats = computed(() => Array.from(Array.from({length: measure.value.beats}, (_, i) => i + 1)))
function isCurrent(beat) {
  let curBeat = props.currentBeat % measure.value.beats
  curBeat = curBeat === 0 ? measure.value.beats : curBeat
  return beat === curBeat ? "current": ""
}

</script>

<style scoped>

.beat-container {
  border: 1px solid #7d858d;
  background-color: #cddadc;
  width: 50%;
  .beat {
    display: inline-block;
    width:170px;
    height: 300px;
    text-align: center;
    vertical-align: top;
    font-size: 120px;
    line-height: 250px;
    color: #999;
    padding: 5px 20px;
    border: 1px solid #999;
    border-radius: 10px;
    margin: 5px;
    transition: font-size .1s;
    &.current {
      color: #000;
      border-color: #000;
      font-size: 200px;
      border-width: 3px;
    }
  }
}

</style>
