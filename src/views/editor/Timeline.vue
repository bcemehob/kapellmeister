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
      if (Math.abs(eMove.y - eClick.y) < 6) return
      partySpan.duration = partySpan.initialDuration + Math.ceil((eMove.y - eClick.y) / 3)
      if (!this.timelineService.canStretch(partySpan)) {
        partySpan.duration = partySpan.initialDuration
        return
      }
      partySpan.span[1] = partySpan.duration
    },

    move(eClick, eMove, partySpan) {
      if (Math.abs(eMove.y - eClick.y) < 6) return
      partySpan.start = partySpan.initialStart + Math.ceil((eMove.y - eClick.y) / 3)
      if (!this.timelineService.canMove(partySpan)) {
        partySpan.start = partySpan.initialStart
        return
      }
      partySpan.span[0] = partySpan.start
    },

    stopMove(eClick, eStop, partySpan) {
      const nxSpan = this.timelineService.nextSpan(partySpan)
      const prevSpan = this.timelineService.previousSpan(partySpan)
      partySpan.start = partySpan.initialStart + Math.ceil((eStop.y - eClick.y) / 3)
      const measureBeats = this.pattern.measure.beats
      if (partySpan.start < 1) {
        partySpan.start = 1
      }
      let remainder = partySpan.start % measureBeats
      if (remainder > measureBeats / 2) partySpan.start += measureBeats - remainder + 1
      else partySpan.start -= remainder - 1

      if (!nxSpan && partySpan.start + partySpan.duration > this.timelineService.durationInBeats) {
        partySpan.start = this.timelineService.durationInBeats - partySpan.duration + 1
      } else if (nxSpan && partySpan.start + partySpan.duration >= nxSpan.start) {
        partySpan.start = nxSpan.start - partySpan.duration
      } else if (prevSpan && partySpan.start <= prevSpan.start + prevSpan.duration) {
        partySpan.start = prevSpan.start + prevSpan.duration
      }
      partySpan.span[0] = partySpan.start
      this.$store.commit('setPattern', this.pattern)
      localStorage.setItem('pattern', JSON.stringify(this.pattern))
      document.removeEventListener('mousemove', this.moveListener)
      document.removeEventListener('mouseup', this.stopMoveListener)
    },

    stopStretch(eClick, eStop, partySpan) {
      partySpan.duration = partySpan.initialDuration + Math.ceil((eStop.y - eClick.y) / 3)
      const nxSpan = this.timelineService.nextSpan(partySpan)
      const measureBeats = this.pattern.measure.beats
      if (partySpan.duration < measureBeats * ConductorService.SQUARE) {
        partySpan.duration = measureBeats * ConductorService.SQUARE
      }
      if (!nxSpan && partySpan.start + partySpan.duration > this.timelineService.durationInBeats) {
          partySpan.duration = this.timelineService.durationInBeats - partySpan.start + 1
      } else if (nxSpan && partySpan.start + partySpan.duration >= nxSpan.start) {
        partySpan.duration = nxSpan.start - partySpan.start
      } else {
        let remainder = partySpan.duration % measureBeats
        if (remainder > measureBeats / 2) partySpan.duration += measureBeats - remainder
        else partySpan.duration -= remainder
      }
      partySpan.span[1] = partySpan.duration
      this.$store.commit('setPattern', this.pattern)
      localStorage.setItem('pattern', JSON.stringify(this.pattern))
      document.removeEventListener('mousemove', this.stretchListener)
      document.removeEventListener('mouseup', this.stopStretchListener)
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  },
  mounted() {
    this.timelineService = new TimelineService(this.pattern.duration, this.pattern.measure)
    for (let i = 1; i <= this.pattern.duration; i++) {
      let type = null
      if ((i - 1) % ConductorService.DOUBLE === 0) type = 'double'
      else if (i % ConductorService.SQUARE === 1) type = 'square'
      this.measures.push({id: i, type})
    }
  }
}
</script>
<style scoped src="@/styles/timeline.css"/>
