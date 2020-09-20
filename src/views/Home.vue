<template>
  <a-layout class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <LibSitSearch />
  </a-layout>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import LibSitSearch from '@/components/LibSitSearch.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    LibSitSearch,
  }
}
</script>
