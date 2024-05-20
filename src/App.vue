<template>
<NavBar/>
  <Conductor />
  <PatternEditor />

</template>
<script>
import NavBar from "@/components/NavBar";
import {ConductorService} from "@/services/ConductorService";
import Conductor from "@/views/Conductor.vue";
import PatternEditor from "@/views/editor/PatternEditor.vue";
export default {
  name: 'App',
  components: {PatternEditor, Conductor, NavBar },
  methods: {
    loadPattern() {
      if (ConductorService.isEmpty(this.pattern)) {
        const patternJson = localStorage.getItem('pattern')
        if (patternJson) {
          this.$store.commit('setPattern', JSON.parse(patternJson))
        }
      }
    },
    handleClick() {
      document.addEventListener('click', this.closeContextMenu)
    },
    closeContextMenu() {
      this.$store.commit('setContextMenuShown', false)
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    }
  },
  mounted() {
    this.loadPattern()
    this.handleClick()
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeContextMenu)
  }
}
</script>
