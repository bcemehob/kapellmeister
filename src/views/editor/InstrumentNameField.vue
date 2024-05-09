<template>
  <div>
    <span v-if="!isInstrumentNameChanging"
          @click="isInstrumentNameChanging = true">{{ instrument.name }}
    </span>
    <span v-else>
      <input v-model="name" type="text" @blur="changeName()">
    </span>
  </div>

</template>

<script>
export default {
  name: "InstrumentNameField",
  props: {
    instrument: Object
  },
  data() {
    return {
      isInstrumentNameChanging: false
    }
  },
  methods: {
    changeName() {
      this.$store.commit('setPattern', this.pattern)
      localStorage.setItem('pattern', JSON.stringify(this.pattern))
      this.isInstrumentNameChanging = false
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
    name: {
      get: function () {
        return this.instrument.name
      },
      set: function (name) {
        this.$emit('name', name)
      }
    }
  }
}
</script>


<style scoped>

</style>
