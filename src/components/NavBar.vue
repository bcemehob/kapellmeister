<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid ">
      <router-link to="/" class="navbar-brand">
        <SvgIcon :name="'logo'"></SvgIcon>
        Kapellmeister
      </router-link>
      <div class="control-block">
        <label>Pattern options</label>
        <button class="btn btn-grey input-label">
          <label for="file-upload" class="load-pattern"></label>
        </button>
        <input id="file-upload" type="file" ref="json" @change="readPattern"/>
        <button class="btn btn-grey" @click="addEmptyPattern">
          <i class="fa fa-add"></i>
        </button>
        <button @click="loadSamplePattern" class="btn btn-grey">Sample
        </button>
        <button class="btn btn-grey" @click="clearPattern">
          <icon class="fa fa-trash"></icon>
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
    addEmptyPattern() {
      const newPattern = {
        name: 'new pattern',
        tempo: 120,
        duration: 128,
        measure: {
          base: 4,
          beats: 4
        },
        instruments: [
          {name: 'instrument 1', parties: []}
        ]
      }
      this.$store.dispatch('persistPattern',newPattern)
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
  position: relative;
  & > label {
    position: absolute;
    left: 4px;
    top: -17px;
    font-size: 14px;
  }
  input[type="file"] {
    display: none;
  }
  .load-pattern::after {
    content: "\f07c";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    cursor: pointer;
  }
  button.input-label {
    cursor: pointer;
    padding: 0;
    .load-pattern {
      padding: 6px;
    }
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
