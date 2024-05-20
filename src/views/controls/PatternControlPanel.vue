<template>
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
</template>

<script>

export default {
  name: 'PatternControlPanel',
  computed: {
    pattern() {
      return this.$store.state.pattern
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
</style>
