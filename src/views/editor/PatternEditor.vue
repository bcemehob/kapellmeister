<template>
  <div class="section">
    <div class="title">Pattern editor</div>
    <div class="controls-bar">
      <div>
        <button class="btn btn-dark" @click="save()" :disabled="isPatternEmpty"><i class="kf kf-save"></i></button>
      </div>
    </div>
    <div class="editor">
      <timeline />
    </div>
  </div>

</template>
<script>

import Timeline from "@/views/editor/Timeline.vue";

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
      return this.pattern.isEmpty()
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
