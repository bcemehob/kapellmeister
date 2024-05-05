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
      <div class="timeline">
        <div class="timeline-item">Timeline go down</div>
      </div>
      <div class="options">
        <div class="option">Options here</div>
      </div>

    </div>
  </div>

</template>
<script>

export default {
  name: "PatternEditor",
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
      return Object.keys(this.pattern).length === 0;
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
