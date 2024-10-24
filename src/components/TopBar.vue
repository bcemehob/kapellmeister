<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid ">
      <brand-with-logo />
      <template v-if="conductorView">
        <edit-mode-control-panel />
        <pre-roll-control-panel />
        <actions-control-panel />
        <pattern-control-panel />
      </template>
      <template v-else>
        <preroll-measures-view />
      </template>
      <pattern-general-options-panel/>
    </div>
  </nav>
  <div class="row under-navbar">
    <transport-control-panel :beat-emitter="beatEmitter"/>
  </div>
</template>

<script setup>
import PatternControlPanel from "@/views/controls/PatternControlPanel.vue"
import TransportControlPanel from "@/views/controls/TransportControlPanel.vue"
import PatternGeneralOptionsPanel from "@/views/controls/PatternGeneralOptionsPanel.vue"
import EditModeControlPanel from "@/views/controls/EditModeControlPanel.vue"
import BrandWithLogo from "@/views/BrandWithLogo.vue"
import ActionsControlPanel from "@/views/controls/ActionsControlPanel.vue"
import PreRollControlPanel from "@/views/controls/PreRollControlPanel.vue"
import PrerollMeasuresView from "@/views/PrerollMeasuresView.vue";

defineProps(['beatEmitter'])
const conductorView = window.conductor
</script>

<style scoped>
.under-navbar {
  background: linear-gradient(180deg, #313539 0%, #212529 30%, #212529 70%, #313539 100%);
  padding: 5px 0;
}
</style>
