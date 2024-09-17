<template>
  <div v-for="measure in measures" v-bind:key="measure.id" class="measure">
    <span v-if="measure.type" :class="'number-shown ' + measure.type">{{ measure.id }}</span>
    <span v-else>&#8226;</span>
  </div>
</template>

<script>
import {ConductorService} from "@/services/ConductorService"

export default {
  name: "MeasuresRibbon",
  data() {
    return {
      measures: []
    }
  },
  methods: {
    generateMeasuresList() {
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
    pattern(){
      return this.$store.state.pattern
    }
  },
  mounted() {
    this.generateMeasuresList()
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type === 'setPattern') this.generateMeasuresList()
    })
  },
  beforeUnmount() {
    this.unsubscribe()
  }
}
</script>
<style scoped>

.measure {
  box-sizing: border-box;
  font-size: 12px;
  height: 12px;
  padding: 2px;
  .number-shown {
    display: inline-block;
    border-top: 1px solid #7d858d;
  }
  .square {
    width: 15%;
  }
  .double {
    width: 30%;
    border-width: 2px;
  }
}
</style>
