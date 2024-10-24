<template>
  <div class="preroll-measures">Preroll measures: {{ prerollMeasures }}</div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const prerollMeasures = computed(() => store.state.prerollMeasures)
</script>

<style scoped>
.preroll-measures{
  color: #fff;
  font-size: 12px;
}
</style>
