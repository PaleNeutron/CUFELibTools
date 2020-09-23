<template>
  <a-layout class="LibPageWarp">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <a-row>
      <a-col class="frame">
        <iframe  src="http://10.12.162.31/ClientWeb/m/ic2/Default.aspx" frameborder="0"></iframe>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import LibSitSearch from '@/components/LibSitSearch.vue'

export default {
  name: "LibPageWarp",
  components: {
    // HelloWorld,
    // LibSitSearch,
  },
};
</script>


<style lang="less">
/* .first-row {position: absolute;top: 0; left: 0; right: 0; height: 100px; background-color: lime;} */
iframe {
    display: block;
    // background: #000;
    border: none;
    height: calc(100vh - 30px);
    width: 100%;
}
</style>