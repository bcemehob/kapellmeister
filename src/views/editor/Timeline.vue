<template>
  <div class="timeline">
    <table>
      <tr>
        <th class="narrow-column"> measure</th>
        <th v-for="(instrument, i) in pattern.instruments" v-bind:key="i">
          <InstrumentNameField :instrument @name="n => instrument.name = n"></InstrumentNameField>
        </th>
      </tr>
      <tr>
        <td>
          <div v-for="measure in measures" v-bind:key="measure.id" class="measure">
            <span v-if="measure.type" :class="measure.type">{{ measure.id }}</span>
            <span v-else>&#8226;</span>
          </div>
        </td>
        <td v-for="(instrument, index) in pattern.instruments" v-bind:key="index" class="instrument">
          <InstrumentPartySpan :instrument :index></InstrumentPartySpan>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {ConductorService} from "@/services/ConductorService";
import InstrumentNameField from "@/views/editor/InstrumentNameField.vue";
import InstrumentPartySpan from "@/views/editor/InstrumentPartySpan.vue";

export default {
  name: "TimeLine",
  components: {InstrumentPartySpan, InstrumentNameField},
  data() {
    return {
      measures: []
    }
  },
  methods: {
    init() {
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
