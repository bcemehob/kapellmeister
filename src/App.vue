<template>

<NavBar/>
  <router-view/>

</template>
<script>
import NavBar from "@/components/NavBar";
import {ConductorService} from "@/services/ConductorService";
export default {
  name: 'App',
  components: { NavBar },
  methods: {

  },
  computed: {
    pattern() {
      return this.$store.state.pattern;
    }
  },
  mounted() {
    if (ConductorService.isEmpty(this.pattern)) {
      const patternJson = localStorage.getItem('pattern')
      if (patternJson) {
        this.$store.commit('setPattern', JSON.parse(patternJson))
      }
    }
  }
}
</script>
