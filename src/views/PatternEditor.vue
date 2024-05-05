<template>
  <div class="section">
    <div class="title">Pattern editor</div>
    <div>
      <button class="btn btn-dark" @click="save()" :disabled="isPatternEmpty()"><i class="fa fa-save"></i></button>
    </div>
<!--    <div class="container mt-3">
      <div class="row">
        <div class=" col-md-4">
          <form>
            <div class=" mb-3">
              <input required v-model="name" type="text" class="form-control" placeholder="Name">
            </div>
            <div class="mb-3">
              <select required v-model="groups" class="form-control">
                <option value="">Name</option>
                <option :value="name" v-for="group of groups" :key="group.id">{{ group.name }}</option>
              </select>
            </div>
            <div class="mb-3">
              <input type="submit" class="btn btn-danger" value="Submit">
            </div>
          </form>
        </div>
      </div>
    </div>-->
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
    },
    isPatternEmpty() {
      return Object.keys(this.pattern).length === 0;
    }
  }

}
</script>
<style>

</style>
