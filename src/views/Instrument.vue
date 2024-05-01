<template>
  <div class="row inline-box">
    <div class="row title">{{ instrument.name }}</div>
    <div class="row">Instrument info:</div>
    <div class="row">{{ instrument }}</div>
  </div>
</template>
<script>

export default {
  name: 'InstruMent',
  props: {
    currentBeat: Number,
    instrument: Object
  },
}
</script>
<style scoped>
.inline-box {
  padding: 5px;
  margin: 5px;
  border: 1px solid #7d858d;
  background-color: #cddadc;
}
.title {
  border-bottom: 1px solid #7d858d;
}
</style>
