<template>
  <div class="cate-con mt-[54px]">
    <div class="sub-gallery">
      <div class="center-con">
        <p class="banner-title">文章归档</p>
      </div>
    </div>
    <div class="h-4 -mx-[20px] bg-slate-300"></div>
    <div class="container flex mx-auto justify-center">
      <div class="con-left w-[200px] p-3">
        <div v-for="item in store.categoryList" class="p-3" @click="">
          {{ item.name }}
        </div>
      </div>
      <div class="con-center flex-auto"></div>
      <div class="con-right w-[200px] p-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";

const store = useGlobalStore();
</script>
