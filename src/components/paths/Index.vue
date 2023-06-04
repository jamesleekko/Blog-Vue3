<script setup>
import { onMounted, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";

import banner1 from "~/assets/images/gallery/index/index-banner1.jpg";
const banners = [banner1];

const store = useGlobalStore();
const isDark = useDark();
const toggleDark = useToggle(isDark);
const slogan = ref(" Hustle Hustle");

const curPictureNum =
  Math.floor(Math.random() * (store.totalGallery - 1)) + Number(1);

onMounted(() => {
});
</script>

<template>
  <div
    class="index-gallery"
    :style="{ 'background-image': `url(${store.index_banner_url})` }"
  >
    <div style="height: 20px"></div>
    <div class="center-con">
      <div class="title-big glitch" :data-text="slogan">{{ slogan }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
