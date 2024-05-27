<template>
  <div v-if="!ConductorService.isEmpty(pattern)" class="timeline">
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
          <InstrumentPartySpans :instrument :index />
        </td>
        <td>-</td>
      </tr>
    </table>
    <div v-show="contextMenuShown" class="context-menu" :style="getContextMenuStyle()">
      <div class="menu-title">Instrument:</div>
      <ul>
        <li @click="addInstrumentRight()"><i class="fa fa-plus"></i> add after</li>
        <li @click="addInstrumentLeft()"><i class="fa fa-plus"></i> add before</li>
        <li v-if="!isLastInstrument()" @click="moveRight()"><i class="fa fa-arrow-right"></i> move right</li>
        <li v-if="!isFirstInstrument()" @click="moveLeft()"><i class="fa fa-arrow-left"></i> move left</li>
        <li @click="deleteInstrument()"><i class="fa fa-trash"></i> delete</li>
      </ul>
    </div>
  </div>
</template>

<script>
import InstrumentNameField from "@/views/editor/InstrumentNameField.vue";
import InstrumentPartySpans from "@/views/editor/InstrumentPartySpans.vue";
import MeasuresRibbon from "@/views/editor/MeasuresRibbon.vue";
import {ConductorService} from "@/services/ConductorService";

export default {
  name: "TimeLine",
  components: {InstrumentPartySpans, MeasuresRibbon, InstrumentNameField},
  data() {
    return {
      measures: [],
      currentContextMenu: {offsetX: 0, offsetY: 0, instrument: null},
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
      this.$store.dispatch('backup')
      this.pattern.instruments = this.pattern.instruments.filter(ins => ins !== this.currentContextMenu.instrument)
      this.$store.dispatch('persistPattern')
    },
    addInstrumentRight() {
      const data = this.instrumentData()
      if (data.instrumentIndex === this.pattern.instruments.length - 1) {
        data.resultInstruments = [...this.pattern.instruments, data.newInstrument]
      } else {
        const head = this.pattern.instruments.slice(0, data.instrumentIndex + 1)
        const tail = this.pattern.instruments.slice(data.instrumentIndex + 1)
        data.resultInstruments = [...head, data.newInstrument, ...tail]
      }
      this.pattern.instruments = data.resultInstruments
      this.$store.dispatch('persistPattern')
    },
    addInstrumentLeft() {
      const data = this.instrumentData()
      if (data.instrumentIndex === 0) {
        data.resultInstruments = [data.newInstrument, ...this.pattern.instruments]
      } else {
        const head = this.pattern.instruments.slice(0, data.instrumentIndex)
        const tail = this.pattern.instruments.slice(data.instrumentIndex)
        data.resultInstruments = [...head, data.newInstrument, ...tail]
      }
      this.pattern.instruments = data.resultInstruments
      this.$store.dispatch('persistPattern')
    },
    instrumentData() {
      this.$store.dispatch('backup')
      const instrumentIndex = this.currentInstrumentIndex
      if (instrumentIndex < 0) {
        throw new Error('instrument not found')
      }
      return {
        newInstrument: {name: `instrument ${this.pattern.instruments.length + 1}`, parties: []},
        instrumentIndex: instrumentIndex,
      }
    },
    isLastInstrument() {
      return this.currentInstrumentIndex === this.pattern.instruments.length - 1
    },
    isFirstInstrument() {
      return this.currentInstrumentIndex === 0
    },
    moveLeft() {
      this.swapColumns(-1)
    },
    moveRight() {
      this.swapColumns(1)
    },
    swapColumns(neighbourIndex) {
      const i = this.currentInstrumentIndex
      const currentInstrument = this.pattern.instruments[i]
      this.pattern.instruments[i] = this.pattern.instruments[i + neighbourIndex]
      this.pattern.instruments[i + neighbourIndex] = currentInstrument
      this.$store.dispatch('persistPattern')
    },
  },
  computed: {
    ConductorService() {
      return ConductorService
    },
    pattern() {
      return this.$store.state.pattern
    },
    contextMenuShown() {
      return this.$store.state.contextMenuShown
    },
    currentInstrumentIndex() {
      return this.pattern.instruments.findIndex(ins => ins === this.currentContextMenu.instrument)
    }
  }
}
</script>

<style scoped src="@/styles/timeline.css"/>
