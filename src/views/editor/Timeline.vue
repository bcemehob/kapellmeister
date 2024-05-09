<template>
  <div class="timeline">
    <table>
      <tr>
        <th class="narrow-column"> measure</th>
        <th v-for="(instrument, i) in pattern.instruments" v-bind:key="i">
          <InstrumentNameField :instrument @name="n => instrument.name = n" />
        </th>
      </tr>
      <tr>
        <td>
          <MeasuresRibbon />
        </td>
        <td v-for="(instrument, index) in pattern.instruments" v-bind:key="index" class="instrument">
          <InstrumentPartySpan :instrument :index />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import InstrumentNameField from "@/views/editor/InstrumentNameField.vue";
import InstrumentPartySpan from "@/views/editor/InstrumentPartySpan.vue";
import MeasuresRibbon from "@/views/editor/MeasuresRibbon.vue";

export default {
  name: "TimeLine",
  components: {MeasuresRibbon, InstrumentPartySpan, InstrumentNameField},
  data() {
    return {
      measures: []
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  }
}
</script>

<style scoped src="@/styles/timeline.css"/>
