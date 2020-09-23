  <!-- <div id="app">
    <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- <router-view/> -->
  <!-- </div> -->


<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['4']">
        <a-menu-item key="1">
          <router-link  to="/">
          <a-icon type="user" />
          <span class="nav-text">home</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link  to="/LibPageWarp">
          <a-icon type="video-camera" />
          <span class="nav-text">lib system</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link  to="/about">
          <a-icon type="video-camera" />
          <span class="nav-text">about</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header :style="{ background: '#fff', padding: 0 }" >座位查找工具</a-layout-header> -->
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: 'calc(100vh - 100px)' }">
          <router-view/>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        Created by JohnLyu@cufe SE 2020
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>