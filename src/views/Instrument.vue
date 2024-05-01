<template>
  <div class="row inline-box">
    <div class="row">Instrument info:</div>
    <div class="row">{{ parties }}</div>
  </div>
</template>
<script>

export default {
  name: 'InstruMent',
  props: {
    beatCounter: Number,
    parties: Object
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  }
}
</script>
<style scoped>
  .inline-box{
    padding: 5px;
    margin: 5px;
    background: #dddcdd;
  }
</style>
