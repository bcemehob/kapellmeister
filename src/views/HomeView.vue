<template>
  <div class="home">
    <Conductor></Conductor>
    <PatternEditor></PatternEditor>

  </div>
</template>

<script setup>
import PatternEditor from "@/views/PatternEditor.vue";
import Conductor from "@/views/Conductor.vue";
</script>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {

  }
}
</script>
