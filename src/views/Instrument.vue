<template>
  <div class="row inline-box">
    <div class="row title">{{ instrument.name }}</div>
    <div class="row">Current party: {{ currentParty.name }}</div>
    <div class="row">Upcoming party: {{ upcomingParty.name }} {{countDown}}</div>
  </div>
</template>
<script>

export default {
  name: 'InstruMent',
  props: {
    currentBeat: Number,
    instrument: Object
  },
  data() {
    return {
      partyTimeline: []
    }
  },
  computed: {
    currentParty() {
      const currentParty = this.partyTimeline[this.currentBeat]
      return currentParty ? currentParty : {start: 0, duration: 0}
    },
    upcomingParty() {
      if (this.currentBeat >= this.partyTimeline.length - 4) return {start: 0, duration: 0}
      const upcomingParty = this.partyTimeline[this.currentBeat + 4]
      if (!upcomingParty) return {start: 0, duration: 0}
      return !this.currentParty || this.currentParty.name === upcomingParty.name ?  {start: 0, duration: 0} : upcomingParty
    },
    countDown() {
      return this.upcomingParty.start === 0 ? "-" : this.upcomingParty.start - this.currentBeat
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
