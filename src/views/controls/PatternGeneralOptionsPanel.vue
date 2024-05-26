<template>
  <div v-if="!ConductorService.isEmpty(pattern)" class="track-name">
    <div>{{ pattern.name }}</div>
    <div>
      <span class="track-info"><ClickableEditable v-model="pattern.tempo"/> bpm</span>
      <span class="track-info"><ClickableEditable v-model="pattern.duration"/> measures <i class="fa"
                                                                                           :class="measureClass"></i></span>
      <span class="track-info">
        <ClickableEditable v-model="pattern.measure.beats"/>
         /
        <ClickableEditable v-model="pattern.measure.base"/>
      </span>
      <span class="track-info">{{ duration }}</span>
    </div>
  </div>
  <div v-else class="empty-track">placeholder</div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {ConductorService} from "@/services/ConductorService";
import ClickableEditable from "@/views/controls/ClickableEditable.vue";

const store = useStore()
const pattern = computed(() => store.state.pattern)
const durationInBeats = computed(() => calculateBeats(pattern.value))
const duration = computed(() => ConductorService.calculateDuration(durationInBeats.value, pattern.value.tempo))
const measureClass = computed(() => measureClassMapped(ConductorService.getClassName(pattern.value)))
const calculateBeats = p => !p.measure ? 0 : p.duration * p.measure.beats

const measureClassMapped = className => {
  switch (className) {
    case "not-ok":
      return "fa-circle-exclamation not-ok"
    case "ok":
      return "fa-circle-check ok"
    case "good":
      return "fa-thumbs-up good"
    case "great":
      return "fa-heart great"
    default:
      return ""
  }
}

</script>

<style scoped>
.track-name {
  color: #fff
}

.track-name, .empty-track {
  width: 40%;
  text-align: right;
}

.track-info {
  color: #999;
  padding: 0 10px;
  position: relative;
  border-left: 1px solid #777;
}

.track-info:first-child {
  padding: 0;
  border: 0;
  padding-right: 10px;
}

.fa {
  &.ok {
    color: green;
  }
  &.not-ok {
    color: red;
  }
  &.good {
    color: #38af38;
  }
  &.great {
    color: #58dab4;
  }
}

</style>
