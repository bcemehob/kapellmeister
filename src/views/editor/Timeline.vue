<template>
  <div class="timeline">
    <div class="timeline-item">Timeline go down</div>
    <table>
      <tr>
        <th> beat</th>
        <th v-for="instrument in pattern.instruments" v-bind:key="instrument.name"> {{ instrument.name }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  methods: {},
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  }
}
</script>
<style scoped>

</style>
