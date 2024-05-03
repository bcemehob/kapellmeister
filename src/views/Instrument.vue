<template>
  <div class="row inline-box">
    <div class="row title">{{ instrument.name }}</div>
    <div v-if="instrumentService">
      <div class="row">Current party:{{ currentParty.name }}</div>
      <div class="row">Upcoming party: {{ upcomingParty.name }} {{ prerollCountDown }}
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
    prerollCountDown() {
      return this.instrumentService.prerollCountDown(this.currentBeat)
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
</style>
