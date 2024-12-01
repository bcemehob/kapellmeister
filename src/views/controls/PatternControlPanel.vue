<template>
  <div class="control-block">
    <label>Pattern options</label>
    <button class="btn btn-grey input-label">
      <label for="file-upload" class="kf kf-open"></label>
    </button>
    <input id="file-upload" type="file" ref="json" @change="readPattern"/>
    <button class="btn btn-grey" @click="addEmptyPattern">
      <i class="kf kf-new"></i>
    </button>
    <button @click="loadSamplePattern" class="btn btn-grey">
      <i class="kf kf-magic"></i>
    </button>
    <button class="btn btn-grey" @click="clearPattern">
      <i class="kf kf-bin"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex"
import {Pattern} from "@/pattern/deserialized/Pattern";
import {Measure} from "@/pattern/deserialized/Measure";
import {Instrument} from "@/pattern/deserialized/Instrument";
import {generateUUID} from "@/services/InstrumentService";
import {PartPerformance} from "@/pattern/deserialized/PartPerformance";
import {Part} from "@/pattern/deserialized/Part";

const store = useStore()

const loadSamplePattern = () => {
  fetch("/samples/sample-pattern-2-0.kpm")
      .then(res => res.json().then(data => store.dispatch('persistPattern', data)))
}

const clearPattern = () => {
  store.dispatch('clearPattern')
}

const readPattern = () => {
  this.error = null
  const file = this.$refs.json.files[0]
  const reader = new FileReader()
  if (file.name.endsWith(".kpm") || file.name.endsWith(".json")) {
    reader.onload = (readingEvent) => {
      try {
        store.dispatch('persistPattern', JSON.parse(readingEvent.target.result))
      } catch (e) {
        this.error = 'Could not read file'
      }
    };
    reader.onerror = (err) => this.error = err
    reader.readAsText(file)
  } else {
    this.error = `Invalid file format: ${file.name}`
  }
}

const addEmptyPattern = () => {
  const measure = new Measure(4, 4)
  const part = new Part(generateUUID(), "part 1", 4, 0)
  const performance = new PartPerformance(generateUUID(), 1, part.id)
  const instrument = new Instrument(generateUUID(), "instrument 1", [performance], [part], [])
  const pattern = new Pattern("new pattern", 120, 8, measure, [instrument])
  store.dispatch('persistPattern', pattern)
}

</script>
