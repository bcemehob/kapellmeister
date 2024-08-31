<template>
  <top-bar :beat-emitter="beatEmitter"/>
  <div class="message-box">
    <label for="messageInput">message:</label>
    <input type="text" v-model="wsMessage" id="messageInput">
    <button @click="sendMessage">Send</button>
    <ul id="messages">
      <li v-for="message in wsMessages" v-bind:key="message">{{ message }}</li>
    </ul>
  </div>
  <pattern-editor v-if="editMode" :current-beat="currentBeat"/>
  <conductor v-else :current-beat="currentBeat" :current-preroll-beat="currentPrerollBeat"/>
</template>
<script>
import {ConductorService} from "@/services/ConductorService";
import Conductor from "@/views/Conductor.vue";
import PatternEditor from "@/views/editor/PatternEditor.vue";
import {BeatEmitter} from "@/services/BeatEmitter";
import TopBar from "@/components/TopBar.vue";

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', () => {
  console.log('Connected to WebSocket server.')
})

export default {
  name: 'App',
  components: {PatternEditor, Conductor, TopBar},
  data() {
    return {
      beatEmitter: null,
      playing: false,
      wsMessages: [],
      wsMessage: ''
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
    sendMessage() {
      socket.send(JSON.stringify({text: this.wsMessage}))
      this.wsMessage = ''
    }
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
    },
    currentPrerollBeat() {
      return this.beatEmitter ? this.beatEmitter.getCurrentPrerollBeat() : 0
    },
    prerollBeats() {
      return ConductorService.isEmpty(this.pattern) ? 0 : this.$store.state.prerollMeasures * this.pattern.measure.beats
    }
  },
  mounted() {
    this.loadPattern()
    this.handleClick()
    if (this.pattern && !ConductorService.isEmpty(this.pattern)) {
      this.beatEmitter = new BeatEmitter(this.pattern.tempo, ConductorService.durationInBeats(this.pattern), this.prerollBeats)
    }
    socket.addEventListener('message', (event) => {
      this.wsMessages.push(event.data)
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeContextMenu)
  },

  watch: {
    pattern(newVal) {
      this.beatEmitter = ConductorService.isEmpty(newVal) ? null :
          new BeatEmitter(this.pattern.tempo, ConductorService.durationInBeats(this.pattern), this.prerollBeats)
    },
    prerollBeats(newVal) {
      this.beatEmitter && this.beatEmitter.resetPreroll(newVal)
    }
  }
}
</script>
