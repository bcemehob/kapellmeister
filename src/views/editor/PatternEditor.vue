<template>
  <div class="section">
    <div class="title">Pattern editor</div>
    <div class="controls-bar">
      <div>
        <button class="btn btn-dark" @click="save()" :disabled="isPatternEmpty"><i class="fa fa-save"></i></button>
      </div>
      <router-link v-if="isExpanded" :to="'/'" class="btn btn-dark">
        <i class="fa fa-down-left-and-up-right-to-center"></i>
      </router-link>
      <router-link v-else :to="'/pattern-editor'" class="btn btn-dark">
        <i class="fa fa-up-right-and-down-left-from-center"></i>
      </router-link>
    </div>
    <div v-if="isExpanded" class="editor">
      <Timeline></Timeline>
      <Options></Options>
    </div>
  </div>

</template>
<script>

import Timeline from "@/views/editor/Timeline.vue";
import {ConductorService} from "@/services/ConductorService";
import Options from "@/views/editor/Options.vue";

export default {
  name: "PatternEditor",
  components: {Options, Timeline},
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
    },
    isExpanded() {
      return this.$route.name === 'PatternEditor'
    },
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
