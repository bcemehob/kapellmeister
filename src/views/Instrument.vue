<template>
  <div class="d-flex align-items-center justify-content-center">
    <h1 class="display-6 fw-bold">Instrument info:</h1>
    <div class="display-6 fw-bold">{{ pattern }}</div>
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
      return this.$store.pattern
    }
  }
}
</script>
<style scoped>

</style>
