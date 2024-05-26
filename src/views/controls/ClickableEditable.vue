<template>
   <div class="wrapp">
    <div class="disp" @click="startEdit">{{ value }}</div>
    <input v-if="editMode" type="number" v-model="value"
           @wheel="() => {}"
           @blur="finishEdit"/>
   </div>
</template>

<script>

export default {
  name: 'ClickableEditable',
  props: {
    modelValue: Number,
  },
  data() {
    return {
      editMode: false
    }
  },
  computed: {
    pattern() {
      return this.$store.state.pattern
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    startEdit() {
      this.editMode = true
    },

    finishEdit() {
      this.editMode = false
      this.$store.dispatch('persistPattern')
    },
  }
}

</script>

<style scoped>
.wrapp {
  display: inline-block;
  position: relative;

  .disp {
  }

  input {
    position: absolute;
    left: 0;
    width: auto;
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
