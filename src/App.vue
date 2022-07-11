<script setup>
import { ref } from 'vue'
import MyHeaderVue from '~/components/MyHeader.vue';
import MyMainVue from '~/components/MyMain.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeaderVue></MyHeaderVue>
      </el-header>
      <el-main>
        <MyMainVue></MyMainVue>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
// @use './styles/styles.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
