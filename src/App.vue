<template>
<NavBar @edit-mode="toggleEditMode"/>
  <PatternEditor v-if="isEditMode"/>
  <Conductor v-else/>
</template>
<script>
import NavBar from "@/components/NavBar";
import {ConductorService} from "@/services/ConductorService";
import Conductor from "@/views/Conductor.vue";
import PatternEditor from "@/views/editor/PatternEditor.vue";
export default {
  name: 'App',
  components: {PatternEditor, Conductor, NavBar },
  data() {
    return {
      isEditMode: false,
    }
  },
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
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode
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
