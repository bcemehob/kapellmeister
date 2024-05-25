<template>
  <div class="control-block">
    <label>Pattern editor</label>
    <input type="checkbox" @click="() => $store.dispatch('toggleEditMode')"/>
  </div>
</template>

<script>
export default {
  name: 'EditModeControlPanel'
}
</script>

