<template>
  <div class="control-block">
    <label>Actions</label>
    <button class="btn btn-grey" :disabled="!undoAvailable" @click="undo()"><i class="kf kf-undo"></i></button>
    <button class="btn btn-grey" :disabled="!redoAvailable" @click="redo()"><i class="kf kf-redo"></i></button>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const undoAvailable = computed(() =>  store.state.patternUndoStack.length )
const redoAvailable = computed(() =>  store.state.patternRedoStack.length )
const undo = () => store.dispatch('undo')
const redo = () => store.dispatch('redo')
</script>
