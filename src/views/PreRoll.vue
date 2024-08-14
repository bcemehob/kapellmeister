<template>
  <div class="section" :class="{hidden: isHidden()}">
    <div class="title">Preroll</div>
    <div class="dots-container">
      <span v-for="dot in prerollDots" :key="dot.id" class="dot-container"
            :class="{wasted: dot.wasted, current: dot.current, strong: dot.strong}">
        <span class="dot">&nbsp;</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const props = defineProps({
  currentPrerollBeat: Number
})

const store = useStore()
const pattern = computed(() => store.state.pattern)
const prerollDuration = computed(() => store.state.prerollMeasures * pattern.value.measure.beats)
const isHidden = () => {
  return props.currentPrerollBeat === 0 || props.currentPrerollBeat > prerollDuration.value
}

const prerollDots = computed(() => {
  if (!pattern.value.measure) return []
  const arr = []
  for (let i = 0; i < prerollDuration.value; i++) {
    arr.push({
      id: i,
      wasted: i < props.currentPrerollBeat,
      current: i === props.currentPrerollBeat,
      strong: i % pattern.value.measure.beats === 0
    })
  }
  return arr
})
</script>

<style scoped>
.section {
  background-color: rgba(230, 245, 245, 0.85);
  border: 1px solid #7d858d;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  left: 40px;
  width: 65%;
  height: 100%;
  z-index: 100;
  transition: opacity 300ms ease;
  opacity: 1;

  &.hidden {
    opacity: 0;
  }

  .dots-container {
    text-align: center;
    margin-top: 12%;
    .dot-container {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 70px;
      padding: 15px;
      transition: all 300ms ease;
      .dot {
        position: absolute;
        background-color: #373f57;
        display: block;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        transition: all 300ms ease;
      }
      &.strong {
        margin-left: 40px;
        padding: 10px;
        .dot {
          background-color: #272f47;
          width: 50px;
          height: 50px;
        }
      }
      &.wasted {
        padding: 30px 20px;
        .dot {
          background-color: #a7afc7;
          height: 10px;
          width: 10px;
        }
        &.strong {
          padding: 30px 10px!important;
          .dot {
            background-color: #979fb7;
            height: 10px;
            width: 30px;
          }
        }
      }
      &.current {
        padding: 10px 20px;
        .dot {
          background-color: #171f37;
          height: 50px;
          width: 30px;
        }
        &.strong {
          padding: 0 5px;
          .dot {
            background-color: #070f27;
            height: 70px;
            width: 40px;
          }
        }
      }
    }
  }
}
</style>
