<template>
  <div class="timeline">
    <table>
      <tr>
        <th class="narrow-column"> measure</th>
        <th v-for="(instrument, i) in pattern.instruments" v-bind:key="i">
          <span v-if="!isInstrumentNameChanging[i]"
                @click="isInstrumentNameChanging[i] = true">{{ instrument.name }}</span>
          <span v-else>
            <input v-model="instrument.name" type="text" @blur="changeName(i)">
          </span>
        </th>
      </tr>
      <tr>
        <td>
          <div v-for="measure in measures" v-bind:key="measure.id" class="measure">
            <span v-if="measure.type" :class="measure.type">{{ measure.id }}</span>
            <span v-else>&#8226;</span>
          </div>
        </td>
        <td v-for="(instrument, i) in pattern.instruments" v-bind:key="i" class="instrument">
          <div class="parties-container">
            <div v-for="partySpan in partySpans(instrument)"
                 v-bind:key="partySpan.id" class="party"
                 :style="partySpanStyle(partySpan, i)">
              <span class="span-title" @mousedown="startMove($event, partySpan)">{{ partySpan.name }}</span>
              <span>start: {{partySpan.start}} ({{((partySpan.start - 1) / pattern.measure.beats) + 1}}), dur: {{partySpan.duration}}</span>
              <div class="bottom" @mousedown="startDrag($event, partySpan)">==</div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {ConductorService} from "@/services/ConductorService";
import {TimelineService} from "@/services/TimelineService";

const PARTY_COLORS = [
  '#EAD992', '#51abad', '#ed7981',
  '#7d8cf3', '#89f37d', '#f3ae7d'
]

export default {
  name: "TimeLine",
  data() {
    return {
      measures: [],
      isInstrumentNameChanging: [],
      stretchListener: null,
      stopStretchListener: null,
      moveListener: null,
      stopMoveListener: null,
      timelineService: null,
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

    changeName(i) {
      this.$store.commit('setPattern', this.pattern)
      localStorage.setItem('pattern', JSON.stringify(this.pattern))
      this.isInstrumentNameChanging[i] = false
    },

    startDrag(eClick, partySpan) {
      this.setStretchListeners(eClick, partySpan)
      document.addEventListener('mousemove', this.stretchListener)
      document.addEventListener('mouseup', this.stopStretchListener)
    },

    startMove(eClick, partySpan) {
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
      this.$store.commit('setPattern', this.pattern)
      localStorage.setItem('pattern', JSON.stringify(this.pattern))
      document.removeEventListener('mousemove', mouseMoveListener)
      document.removeEventListener('mouseup', mouseUpListener)
    },

    init() {
      this.timelineService = new TimelineService(this.pattern.duration, this.pattern.measure)
      this.measures = []
      for (let i = 1; i <= this.pattern.duration; i++) {
        let type = null
        if ((i - 1) % ConductorService.DOUBLE === 0) type = 'double'
        else if (i % ConductorService.SQUARE === 1) type = 'square'
        this.measures.push({id: i, type})
      }
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  },
  mounted() {
    this.init()
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type === 'setPattern') this.init()
    })
  },
  beforeUnmount() {
    this.unsubscribe()
  }
}
</script>
<style scoped src="@/styles/timeline.css"/>

