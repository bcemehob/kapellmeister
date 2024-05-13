<template>
  <div class="timeline">
    <table>
      <tr>
        <th class="narrow-column"> measure</th>
        <th v-for="(instrument, i) in pattern.instruments" v-bind:key="i"
            @contextmenu="e => showContextMenu(e, instrument, i)"
            :id="instrumentThId(instrument, i)">
          <InstrumentNameField :instrument @name="n => instrument.name = n" />
        </th>
        <th class="narrow-column">menu</th>
      </tr>
      <tr>
        <td>
          <MeasuresRibbon />
        </td>
        <td v-for="(instrument, index) in pattern.instruments" v-bind:key="index" class="instrument">
          <InstrumentPartySpan :instrument :index />
        </td>
        <td>-</td>
      </tr>
    </table>
    <div v-show="contextMenuShown" class="context-menu" :style="getContextMenuStyle()">
      <div class="menu-title">Instrument:</div>
      <ul>
        <li @click="deleteInstrument()"><i class="fa fa-trash"></i> delete</li>
        <li @click="addInstrumentRight()"><i class="fa fa-plus"></i> add after</li>
        <li @click="addInstrumentLeft()"><i class="fa fa-plus"></i> add before</li>
        <li @click="moveRight()"><i class="fa fa-arrow-right"></i> move right</li>
        <li @click="moveLeft()"><i class="fa fa-arrow-left"></i> move left</li>
      </ul>
    </div>
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
      measures: [],
      currentContextMenu: {offsetX: 0, offsetY: 0},
    }
  },
  methods: {
    showContextMenu(event, instrument, i) {
      event.preventDefault()
      let thElement = document.getElementById(this.instrumentThId(instrument, i))
      let offsetX = thElement.offsetLeft + event.offsetX + 15
      let offsetY = thElement.offsetTop + event.offsetY + 15
      this.currentContextMenu = { offsetX, offsetY, instrument }
      this.$store.commit("setContextMenuShown", !this.contextMenuShown)
    },
    getContextMenuStyle() {
      return {
        left : this.currentContextMenu.offsetX + 'px',
        top : this.currentContextMenu.offsetY + 'px'
      }
    },
    instrumentThId(instrument, i) {
      return `instrument-th-${instrument.name}-${i}`
    },
    deleteInstrument() {
      this.pattern.instruments = this.pattern.instruments.filter(ins => ins !== this.currentContextMenu.instrument)
      this.$store.commit("setPattern", this.pattern)
      localStorage.setItem('pattern', this.pattern.instruments)
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
    contextMenuShown() {
      return this.$store.state.contextMenuShown
    }
  }
}
</script>

<style scoped src="@/styles/timeline.css"/>
