<template>
  <div class="parties-container">
    <div v-if="!instrument.parties.length" class="add-party">
      <button class="btn btn-dark" @click="addParty"><i class="fa fa-add"></i></button>
    </div>
    <div v-for="partySpan in partySpans(instrument)"
         v-bind:key="partySpan.id" class="party"
         :style="partySpanStyle(partySpan, index)">
      <span class="span-title" @mousedown="startMove($event, partySpan)">{{ partySpan.name }}</span>
      <span>start: {{ partySpan.start }} ({{
          ((partySpan.start - 1) / pattern.measure.beats) + 1
        }}), dur: {{ partySpan.duration }}</span>
      <div class="bottom" @mousedown="startDrag($event, partySpan)">==</div>
    </div>
  </div>
</template>

<script>
import {TimelineService} from "@/services/TimelineService";

const PARTY_COLORS = [
  '#EAD992', '#51abad', '#ed7981',
  '#7d8cf3', '#89f37d', '#f3ae7d'
]

export default {
  name: "InstrumentPartySpans",
  props: {
    instrument: Object,
    index: Number
  },
  data() {
    return {
      stretchListener: null,
      stopStretchListener: null,
      moveListener: null,
      stopMoveListener: null,
      timelineService: null
    }
  },
  methods: {
    partySpans(instrument) {
      if (!this.timelineService) return {}
      return this.timelineService.partySpans(instrument)
    },

    partySpanStyle(partySpan, i) {
      return {
        top: (partySpan.start / 4) * 12 - 18 + 'px',
        height: (partySpan.duration / 4) * 12 + 'px',
        backgroundColor: PARTY_COLORS[i],
      };
    },
    startDrag(eClick, partySpan) {
      if (eClick.button !== 0) return
      this.$store.dispatch('backup')
      this.setStretchListeners(eClick, partySpan)
      document.addEventListener('mousemove', this.stretchListener)
      document.addEventListener('mouseup', this.stopStretchListener)
    },

    startMove(eClick, partySpan) {
      if (eClick.button !== 0) return
      this.$store.dispatch('backup')
      this.setMoveListeners(eClick, partySpan)
      document.addEventListener('mousemove', this.moveListener)
      document.addEventListener('mouseup', this.stopMoveListener)
    },

    setStretchListeners(eClick, partySpan) {
      const that = this
      this.stretchListener = function (eMove) {
        that.stretch(eClick, eMove, partySpan)
      }
      this.stopStretchListener = function (eStop) {
        that.stopStretch(eClick, eStop, partySpan)
      }
    },

    setMoveListeners(eClick, partySpan) {
      const that = this
      this.moveListener = function (eMove) {
        console.log("start move")
        that.move(eClick, eMove, partySpan)
      }
      this.stopMoveListener = function (eStop) {
        that.stopMove(eClick, eStop, partySpan)
      }
    },

    stretch(eClick, eMove, partySpan) {
      this.timelineService.stretch(partySpan, eMove.y - eClick.y)
    },

    move(eClick, eMove, partySpan) {
      this.timelineService.move(partySpan, eMove.y - eClick.y)
    },

    stopMove(eClick, eStop, partySpan) {
      this.timelineService.changeSpanStart(partySpan, eStop.y - eClick.y)
      this.finalizeChange(this.moveListener, this.stopMoveListener)
    },

    stopStretch(eClick, eStop, partySpan) {
      this.timelineService.changeSpanDuration(partySpan, eStop.y - eClick.y)
      this.finalizeChange(this.stretchListener, this.stopStretchListener)
    },

    finalizeChange(mouseMoveListener, mouseUpListener) {
      this.$store.dispatch('persistPattern')
      document.removeEventListener('mousemove', mouseMoveListener)
      document.removeEventListener('mouseup', mouseUpListener)
    },
    addParty() {
      this.$store.dispatch('addNewSpan', this.instrument)
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  },
  mounted() {
    this.timelineService = new TimelineService(this.pattern.duration, this.pattern.measure)
  }
}
</script>

<style scoped src="@/styles/instrumentPartySpan.css" />
