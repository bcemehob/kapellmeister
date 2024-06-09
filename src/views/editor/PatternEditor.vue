<template>
  <div class="section">
    <div class="title">Pattern editor</div>
    <div class="controls-bar">
      <div>
        <button class="btn btn-dark" @click="save()" :disabled="isPatternEmpty"><i class="fa fa-save"></i></button>
      </div>
    </div>
    <div class="editor">
      <timeline />
    </div>
  </div>

</template>
<script>

import Timeline from "@/views/editor/Timeline.vue";
import {ConductorService} from "@/services/ConductorService";

export default {
  name: "PatternEditor",
  components: {Timeline},
  data: function () {
    return {
      name: '',
      errorMessage: null,
      groups: []
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
    isPatternEmpty() {
      return ConductorService.isEmpty(this.pattern)
    }
  },
  methods: {
    save: function () {
      const link = document.createElement("a");
      const file = new Blob([JSON.stringify(this.pattern)], {type: 'application/json'});
      link.href = URL.createObjectURL(file);
      link.download = "pattern.kpm";
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }
}
</script>
<style>
</style>
