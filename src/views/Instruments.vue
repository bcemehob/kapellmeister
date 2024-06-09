<template>
  <div class="section w-50">
    <div class="title">Instruments</div>
    <div class="d-flex align-items-center justify-content-center">
      <instrument v-for="instrument in pattern.instruments"
                  :key="instrument.name"
                  :instrument="instrument"
                  :measure="pattern.measure"
                  :current-beat="currentBeat" />
    </div>
  </div>
</template>
<script>

import Instrument from "@/views/Instrument.vue";

export default {
  name: 'InstruMent',
  components: {Instrument},
  props: {
    currentBeat: Number
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  }
}
</script>
