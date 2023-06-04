<script setup>
import { onMounted, ref } from "vue";
import MyHeaderVue from "~/components/MyHeader.vue";
import MyMainVue from "~/components/MyMain.vue";
import { useGlobalStore } from "./assets/plugins/pinia/global-store";
import {
  setArticleCategory,
  setIndexBannerUrl,
  setCategoryBannerUrl,
  setArticleGroupByDate,
} from "~/assets/utils/commonFunc";

const store = useGlobalStore();
setArticleCategory();
setIndexBannerUrl();
setCategoryBannerUrl();
setArticleGroupByDate();

onMounted(() => {});
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
