<template>
  <div class="svg-container">
    <div class="row">
      <svg viewBox="-400 -300 800 600" xmlns="http://www.w3.org/2000/svg" data-v-1cd75c46="">
        <circle r="100" cx="0" cy="-180" fill="#1c2d6e" :class="ringClass()"></circle>
      </svg>
    </div>
  </div>
</template>
<script>

export default {
  name: 'MotionViewer',
  props: {
    currentBeat: Number
  },
  methods: {
    ringClass() {
      return 'ring trans-' + (this.currentBeat % 4)
    }
  }
}
</script>
<style scoped>
.ring {
  transition: transform .2s, fill .2s;
}

.ring.trans-0 {
  transform: translate(0) scale(1);
  fill: #1c2d6e;
}

.ring.trans-1 {
  transform: translate(0%, 70%) scale(200%);
  fill: #37120e;
}

.ring.trans-2 {
  transform: translate(-40%, 25%) scale(75%);
  fill: #1c2d6e;
}

.ring.trans-3 {
  transform: translate(30%, 40%) scale(150%);
  fill: #18643a;
}

.svg-container {
  border: 1px solid black;
  width: 50%;
}

</style>
