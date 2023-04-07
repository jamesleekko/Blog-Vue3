<template>
  <div class="cate-con">
    <div class="sub-gallery">
      <div class="center-con">
        <p class="banner-title">文章分类</p>
      </div>
    </div>
    <div class="h-4 -mx-[20px] bg-slate-300"></div>
    <div class="container flex mx-auto justify-center">
      <div class="w-[200px] p-3">
        <div v-for="item in categories" class="">{{ item }}</div>
      </div>
      <div class="flex-auto"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";

const store = useGlobalStore();
const categories = store.categoryList;
</script>
