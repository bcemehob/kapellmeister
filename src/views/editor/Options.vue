<template>
  <div class="options section">
    <div class="title">Options</div>
    <div class="measures">
      <input type="number" v-model="pattern.duration" @input="setPatternDuration">
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionsView",
  methods: {
    setPatternDuration() {
      this.$store.commit('setPattern', this.pattern)
    }
  },
  computed: {
    pattern(){
      return this.$store.state.pattern
    }
  }
}
</script>


<style scoped>

</style>
