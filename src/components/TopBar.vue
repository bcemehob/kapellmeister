<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid ">
      <brand-with-logo />
      <edit-mode-control-panel />
      <pattern-control-panel/>
      <transport-control-panel :beat-emitter="beatEmitter"/>
      <actions-control-panel />
      <pattern-general-options-panel/>
    </div>
  </nav>
</template>

<script setup>
import PatternControlPanel from "@/views/controls/PatternControlPanel.vue"
import TransportControlPanel from "@/views/controls/TransportControlPanel.vue"
import PatternGeneralOptionsPanel from "@/views/controls/PatternGeneralOptionsPanel.vue"
import EditModeControlPanel from "@/views/controls/EditModeControlPanel.vue"
import BrandWithLogo from "@/views/BrandWithLogo.vue"
import ActionsControlPanel from "@/views/controls/ActionsControlPanel.vue";

defineProps(['beatEmitter'])
</script>
