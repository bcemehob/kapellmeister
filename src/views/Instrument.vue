<template>
  <div class="row inline-box">
    <div class="row title">{{ instrument.name }}</div>
    <div class="row">Current party: {{ currentParty.name }}</div>
    <div class="row">Upcoming party: {{ upcomingParty.name }} {{countDown}}</div>
  </div>
</template>
<script>
const EMPTY_PARTY = {start: 0, duration: 0}
export default {
  name: 'InstruMent',
  props: {
    currentBeat: Number,
    instrument: Object,
    measure: Object
  },
  data() {
    return {
      partyTimeline: []
    }
  },
  computed: {
    currentParty() {
      const currentParty = this.partyTimeline[this.currentBeat]
      return currentParty ? currentParty : EMPTY_PARTY
    },
    upcomingParty() {
      if (this.currentBeat >= this.partyTimeline.length - this.measure.beats) return EMPTY_PARTY
      const upcomingParty = this.partyTimeline[this.currentBeat + this.measure.beats]
      if (!upcomingParty) return EMPTY_PARTY
      return !this.currentParty || this.currentParty.name === upcomingParty.name ?
          {start: 0, duration: 0} : upcomingParty
    },
    countDown() {
      return this.upcomingParty.start === 0 ? "-" :
          Math.ceil((this.upcomingParty.start - this.currentBeat) / this.measure.beats)
    }
  },
  mounted() {
    this.instrument.parties.forEach(party => party.spans.forEach((span => {
      for (let i = span[0]; i < span[0] + span[1]; i++) {
        this.partyTimeline[i] = {name: party.name, start: span[0], duration: span[1]}
      }
    })))
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
