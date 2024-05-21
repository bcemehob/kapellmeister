<template>
  <img src="../assets/logo.svg" class="logo-icon" alt="icon" width="64" height="64">
</template>

<script>


export default {
  name: 'SvgIcon',
  props: {
    color: String
  },
  components: {

  }
}
</script>

<style scoped>

.logo path {
  fill: #0dcaf0;
}

</style>
