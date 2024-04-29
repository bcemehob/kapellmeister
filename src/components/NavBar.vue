<template>
 <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
 <div class="container-fluid ">

<router-link to="/" class="navbar-brand">
  <SvgIcon :name="'logo'"></SvgIcon> Kapellmeister
</router-link>

    </div>
 </nav>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<script>
// @ is an alias to /src


export default {
  name: 'NavBar',
  components: {

  }
}
</script>
