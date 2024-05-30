<template>
  <div class="wrapp">
    <div class="clickable-value" @click="startEdit">{{ value }}</div>
    <input v-show="editMode" :type="type" v-model="value"
           ref="input"
           @wheel="() => {}"
           @blur="finishEdit"
           @keyup.enter="finishEdit"/>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
const props = defineProps({
  modelValue: Number,
  type: {type: String, required: false, default: "number"},
})
const emit = defineEmits(['update:modelValue'])
const editMode = ref(false)
const input = ref(null)
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

function startEdit() {
  editMode.value = true
  if (input.value) setTimeout(() => input.value.focus())
}

function finishEdit() {
  editMode.value = false
  store.dispatch('persistPattern')
}
</script>

<style scoped>
.wrapp {
  display: inline-block;
  position: relative;

  .clickable-value {
    cursor: pointer;
    &:hover {
      color: #cbcbcb;
    }
  }

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 150%;
    background-color: #4d555d;
    color: #fff;
    outline: none;
    appearance: textfield;
    border: 0;
    border-radius: 4px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
}
</style>
