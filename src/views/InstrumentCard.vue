<template>
  <div class="inline-box" :class="conductorView ? 'w-50' : 'w-100'">
    <div class="title">{{ instrument.name }}</div>
    <div v-if="instrumentService" class="party-info w-100 h-100">
      <div class="current-party">
        <div class="d-flex">
          <div class="fw-bold"> {{ currentPartLegacy.name }}</div>
          <div v-if="countDown" :class="'count-down ' + countDown.type"> {{ countDown.count}} </div>
        </div>
      </div>
      <div v-if="upcomingPartLegacy.name" class="upcoming-party">
         Next: <span class="fw-bold">{{ upcomingPartLegacy.name }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, onMounted, ref} from "vue";
import {InstrumentService} from "@/services/InstrumentService";

const props = defineProps(['currentBeat', 'instrument', 'measure'])
const instrumentService = ref(null)
const currentPartLegacy = computed(() => instrumentService.value.currentPartLegacy(props.currentBeat))
const upcomingPartLegacy = computed(() => instrumentService.value.upcomingPartLegacy(props.currentBeat))
const countDown = computed(() => instrumentService.value.countDown(props.currentBeat))
onMounted( () => instrumentService.value = new InstrumentService(props.instrument, props.measure))
const conductorView = window.conductor

</script>
<style scoped>
.inline-box {
  padding: 5px;
  margin: 5px;
  border: 1px solid #7d858d;
  background-color: #cddadc;
}

.title {
  border-bottom: 1px solid #7d858d;
}

.current-party {
  font-size: 20px;
}

.current-party .d-flex {
  justify-content: space-between;
  align-items: center;
}
.current-party div {
  margin: 10px;
}
.count-down {
  font-size: 30px;
}

.count-down.common {
  color: red;
}
.count-down.upcoming {
  color: blue;
}
.party-info {
 position: relative;
}
.upcoming-party {
  border: 1px solid #7d858d;
  position: absolute;
  right: 0;
  top: -11px;
}
@media (max-width:960px) {
  .inline-box {
    padding: 2px 5px;
    margin: 2px 0;
  }
}

</style>
