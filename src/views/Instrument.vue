<template>
  <div class="inline-box w-50">
    <div class="title">{{ instrument.name }}</div>
    <div v-if="instrumentService" class="party-info w-100 h-100">
      <div class="current-party">
        <div class="d-flex">
          <div class="fw-bold"> {{ currentParty.name }}</div>
          <div v-if="countDown" :class="'count-down ' + countDown.type"> {{ countDown.count}} </div>
        </div>
      </div>
      <div v-if="upcomingParty.name" class="upcoming-party">
         Next: <span class="fw-bold">{{ upcomingParty.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {InstrumentService} from '@/services/InstrumentService'

export default {
  name: 'InstruMent',
  props: {
    currentBeat: Number,
    instrument: Object,
    measure: Object,
  },
  data() {
    return {
      partyTimeline: [],
      instrumentService: null
    }
  },
  computed: {
    currentParty() {
      return this.instrumentService.currentParty(this.currentBeat)
    },
    upcomingParty() {
      return this.instrumentService.upcomingParty(this.currentBeat)
    },
    countDown() {
      return this.instrumentService.countDown(this.currentBeat)
    }
  },
  mounted() {
    this.instrumentService = new InstrumentService(this.instrument, this.measure)
  }
}
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

</style>
