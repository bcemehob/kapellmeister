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
              <span class="span-title">{{ partySpan.name }}</span>
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
      this.setListeners(eClick, partySpan)
      document.addEventListener('mousemove', this.stretchListener)
      document.addEventListener('mouseup', this.stopStretchListener)
    },

    setListeners(eClick, partySpan) {
      const that = this
      this.stretchListener = function (eMove) {
        that.stretch(eClick, eMove, partySpan)
      }
      this.stopStretchListener = function (eStop) {
        that.stopStretch(eClick, eStop, partySpan)
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

    stopStretch(eClick, eStop, partySpan) {
      partySpan.duration = partySpan.initialDuration + Math.ceil((eStop.y - eClick.y) / 3)
      let nxSpan = this.timelineService.nextSpan(partySpan)
      let measureBeats = this.pattern.measure.beats
      if (partySpan.duration < measureBeats * ConductorService.SQUARE) {
        partySpan.duration = measureBeats * ConductorService.SQUARE
      } else if (partySpan.start + partySpan.duration >= nxSpan.start) {
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
    },
  },
  mounted() {
    this.timelineService = new TimelineService()
    for (let i = 1; i <= this.pattern.duration; i++) {
      let type = null
      if ((i - 1) % ConductorService.DOUBLE === 0) type = 'double'
      else if (i % ConductorService.SQUARE === 1) type = 'square'
      this.measures.push({id: i, type})
    }
  }
}
</script>
<style scoped>

table {
  width: 100%;

  tr {
    box-sizing: border-box;
    padding: 0;


    th {
      border-bottom: 1px dotted #7d858d;
      padding: 0;
    }

    th, td {
      padding: 0 7px;
    }

    th:not(:first-child), td:not(:first-child) {
      border-left: 1px dotted #7d858d;
    }

    th.narrow-column {
      width: 5%;
      font-size: 16px;
      letter-spacing: -1px;
    }

    td.instrument {
      vertical-align: top;
      width: 20%;
      max-width: 20%;
    }

    .measure {
      box-sizing: border-box;
      font-size: 12px;
      height: 12px;
      padding: 2px;

      .square {
        display: inline-block;
        width: 15%;
        border-top: 1px solid #7d858d;
      }

      .double {
        display: inline-block;
        width: 30%;
        border-top: 2px solid #7d858d;
      }
    }

    .parties-container {
      display: inline-block;
      position: relative;
      height: 100%;
      width: 100%;

      .party {
        border: 1px solid #7d858d;
        position: absolute;
        height: 12px;
        top: -18px;
        font-size: 12px;
        width: 70%;
        text-align: center;

        .span-title {
          font-weight: bold;
          font-size: 14px
        }

        .bottom {
          position: absolute;
          bottom: 0;
          border-top: 1px dashed #7d858d;
          color: #7d858d;
          user-select: none;
          height: 10px;
          line-height: 8px;
          width: 100%;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
