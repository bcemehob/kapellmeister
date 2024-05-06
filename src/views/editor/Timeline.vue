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
              {{ partySpan.name }}
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {ConductorService} from "@/services/ConductorService";

const PARTY_COLORS = [
  '#EAD992', '#51abad', '#ed7981',
  '#7d8cf3', '#89f37d', '#f3ae7d'
]
const partySpan = (partyName, span) => {
  return {
    id: `${partyName}-${span[0]}`,
    name: partyName,
    start: span[0],
    duration: span[1]
  }
}
export default {
  name: "TimeLine",
  data() {
    return {
      measures: [],
      isInstrumentNameChanging: []
    }
  },
  methods: {
    partySpans(instrument) {
      return instrument.parties.flatMap(party => party.spans.map(span => partySpan(party.name, span)))
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
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
  },
  mounted() {
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
      }
    }
  }
}
</style>
