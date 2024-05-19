<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid ">
      <router-link to="/" class="navbar-brand">
        <SvgIcon :name="'logo'"></SvgIcon>
        Kapellmeister
      </router-link>
      <div class="control-block">
        <button class="btn btn-grey">
          <label for="file-upload" class="load-pattern"></label>
        </button>
        <input id="file-upload" type="file" ref="json" @change="readPattern"/>
        <button @click="loadSamplePattern" class="btn btn-grey">Sample pattern
        </button>
        <button class="btn btn-grey"
                @click="clearPattern">Clear pattern
        </button>
      </div>
      <div class="track-name" v-if="!ConductorService.isEmpty(pattern)">
        <div>{{ pattern.name }}</div>
        <div>
          <span class="track-info">{{ pattern.tempo }} bpm</span>
          <span class="track-info">{{ pattern.duration }} measures</span>
          <span class="track-info">{{ durationInBeats }} beats</span>
          <span class="track-info">{{ duration }}</span>
        </div>
      </div>
      <div class="empty-track" v-else>placeholder</div>
    </div>
  </nav>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<script>

import {ConductorService} from "@/services/ConductorService";

export default {
  name: 'NavBar',
  components: {},
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
    durationInBeats() {
      if (!this.pattern.measure) return 0
      return this.pattern.duration * this.pattern.measure.beats
    },
    duration() {
      return ConductorService.calculateDuration(this.durationInBeats, this.pattern.tempo)
    }
  },
  methods: {
    loadSamplePattern() {
      fetch("/samples/samplePattern.kpm")
          .then(res => res.json().then(data => this.$store.dispatch('persistPattern', data)))
    },
    clearPattern() {
      this.$store.dispatch('clearPattern')
    },
    readPattern() {
      this.error = null
      const file = this.$refs.json.files[0]
      const reader = new FileReader()
      if (file.name.endsWith(".kpm") || file.name.endsWith(".json")) {
        reader.onload = (readingEvent) => {
          try {
            this.$store.dispatch('persistPattern', JSON.parse(readingEvent.target.result))
          } catch (e) {
            this.error = 'Could not read file'
          }
        };
        reader.onerror = (err) => this.error = err
        reader.readAsText(file)
      } else {
        this.error = `Invalid file format: ${file.name}`
      }
    },
  }
}
</script>
<style scoped>
.track-name, .control-block {
  color: #fff
}

.track-name, .empty-track {
  width: 40%;
  text-align: right;
}

.control-block {
  input[type="file"] {
    display: none;
  }
  .load-pattern::after {
    content: "\f07c";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    cursor: pointer;
  }
}

.track-info {
  color: #999;
  padding: 0 10px;
  border-left: 1px solid #777;
}

.track-info:first-child {
  padding: 0;
  border: 0;
  padding-right: 10px;
}

.btn-grey {
  margin: 4px;
  background-color: #7d858d;

  &:hover {
    background-color: #5d656d;

  }
}
</style>
