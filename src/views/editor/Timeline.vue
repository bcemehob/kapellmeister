<template>
  <div class="timeline">
    <div class="timeline-item">Timeline go down</div>
    <table>
      <tr>
        <th class="narrow-column"> measure</th>
        <th v-for="instrument in pattern.instruments" v-bind:key="instrument.name"> {{ instrument.name }}</th>
      </tr>
      <tr>
        <td>
          <div v-for="measure in measures" v-bind:key="measure.id" class="measure">
            {{ measure.id }}
          </div>
        </td>
        <td v-for="instrument in pattern.instruments" v-bind:key="instrument.name" class="instrument">
          <div class="parties-container">
            <div v-for="partySpan in partySpans(instrument)"
                 v-bind:key="partySpan.id" class="party"
                 :style="partySpanStyle(partySpan)">
              {{ partySpan.id }}
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  data() {
    return {
      measures: []
    }
  },
  methods: {
    partySpans(instrument) {
      const ret = []
      instrument.parties
          .forEach(party => party.spans
              .forEach(span => ret.push({id: `${party.name}-${span[0]}`, start: span[0], duration: span[1]})))
      return ret
    },
    partySpanStyle(partySpan) {
      return  {top: (partySpan.start / 4) * 10 - 18 + 'px', height: (partySpan.duration / 4) * 10 + 'px'};
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
  },
  mounted() {
    for (let i = 1; i <= this.pattern.duration; i++) {
      this.measures.push({id: i})
    }
    console.log(this.pattern)
  }
}
</script>
<style scoped>

table {
  width: 100%;

  th {
    border-bottom: 1px dotted #7d858d;
  }

  th, td {
    padding: 3px 7px;
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
  }
  .measure {
    box-sizing: border-box;
    font-size: 12px;
    height: 12px;
    padding: 2px;
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
    }
  }
}
</style>
