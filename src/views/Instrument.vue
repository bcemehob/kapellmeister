<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="fw-bold">Instrument info:</div>
    <div class="fw-bold">{{ pattern }}</div>
  </div>
</template>
<script>

export default {
  name: 'InstruMent',
  props: {
    beatCounter: Number
  },
  mounted() {
    console.log('Component mounted.', this.$store)
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  }
}
</script>
<style scoped>

</style>
