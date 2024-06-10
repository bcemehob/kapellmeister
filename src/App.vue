<template>
  <top-bar :beat-emitter="beatEmitter"/>
  <pattern-editor v-if="editMode" :current-beat="currentBeat"/>
  <conductor v-else :current-beat="currentBeat"/>
</template>
<script>
import {ConductorService} from "@/services/ConductorService";
import Conductor from "@/views/Conductor.vue";
import PatternEditor from "@/views/editor/PatternEditor.vue";
import {BeatEmitter} from "@/services/BeatEmitter";
import TopBar from "@/components/TopBar.vue";

export default {
  name: 'App',
  components: {PatternEditor, Conductor, TopBar},
  data() {
    return {
      beatEmitter: null,
      playing: false
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
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },

    editMode() {
      return this.$store.state.editMode
    },

    currentBeat() {
      return this.beatEmitter ? this.beatEmitter.currentBeat : 0
    }
  },

  mounted() {
    this.loadPattern()
    this.handleClick()
    if (this.pattern && !ConductorService.isEmpty(this.pattern)) {
      this.beatEmitter = new BeatEmitter(this.pattern.tempo, ConductorService.durationInBeats(this.pattern))
    }
  },

  beforeUnmount() {
    document.removeEventListener('click', this.closeContextMenu)
  },

  watch: {
    pattern(newVal) {
      this.beatEmitter = ConductorService.isEmpty(newVal) ? null :
          new BeatEmitter(this.pattern.tempo, ConductorService.durationInBeats(this.pattern))
    }
  }
}
</script>
