<script setup>
import { onMounted, ref } from "vue";
import MyHeaderVue from "~/components/MyHeader.vue";
import MyMainVue from "~/components/MyMain.vue";
import { useGlobalStore } from "./assets/plugins/pinia/global-store";
import { useDark, useToggle } from "@vueuse/core";
import {
  setArticleCategory,
  setIndexBannerUrl,
  setCategoryBannerUrl,
  setArticleGroupByDate,
  setIndexContactUrls,
} from "~/assets/utils/commonFunc";

// const isDark = useDark();
// const isDarkRef = ref(isDark);
// console.log(isDark, isDarkRef)
// if(isDarkRef){
//   console.log("isDarkRef",isDarkRef)
//   useToggle(isDarkRef);
// }

const store = useGlobalStore();
setArticleCategory();
setIndexBannerUrl();
setIndexContactUrls();
setCategoryBannerUrl();
setArticleGroupByDate();

onMounted(() => {
  // const doodle = document.querySelector("css-doodle");
  // document.addEventListener("click", function (e) {
  //   doodle.update();
  // });

  //锁定亮色主题
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  if (isDark.value) {
    toggleDark();
  }
});
</script>

<template>
  <div class="">
    <el-header class="px-0">
      <MyHeaderVue></MyHeaderVue>
    </el-header>
    <main style="overflow-y: hidden !important">
      <MyMainVue></MyMainVue>
    </main>

    <!-- <css-doodle id="doodle">
      :doodle { @grid: 1x20 / 100vmin; } @place-cell: center; width:
      @rand(60vmin, 100vmin); height: @rand(60vmin, 100vmin); transform:
      translate(@rand(-120%, 120%), @rand(-80%, 80%)) scale(                                                                      @rand(.8, 2.8))
      skew(@rand(45deg)); clip-path: polygon( @r(0, 30%) @r(0, 50%), @r(30%,
      60%) @r(0%, 30%), @r(60%, 100%) @r(0%, 50%), @r(60%, 100%) @r(50%, 100%),
      @r(30%, 60%) @r(60%, 100%), @r(0, 30%) @r(60%, 100%) ); background:
      @pick(#f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #60569e, #e6437d,
      #ebbf4d, #00bcd4, #03a9f4, #2196f3, #009688, #5ee463, #f8e645, #ffc107,
      #ff5722, #43f8bf, #e136eb, #f57c23, #32ed39); opacity: @rand(.1, .3);
      position: relative; top: @rand(-80%, 80%); left: @rand(-80%, 80%);
      animation: colorChange @rand(6.1s, 26.1s) infinite @rand(-.5s, -2.5s)
      linear alternate; @keyframes colorChange { 100% { left: 0; top: 0; filter:
      hue-rotate(360deg); } }
    </css-doodle> -->
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
