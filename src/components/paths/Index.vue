<script setup>
import { onMounted, ref, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";
import { getArticleList } from "~/assets/plugins/axios/http";

import banner1 from "~/assets/images/gallery/index/index-banner1.jpg";
const banners = [banner1];

const store = useGlobalStore();
const isDark = useDark();
const toggleDark = useToggle(isDark);
const slogan = ref(" Hustle Hustle");
const articleList = ref([]);
const articleTotal = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const curPictureNum =
  Math.floor(Math.random() * (store.totalGallery - 1)) + Number(1);

const addArticles = (page, size) => {
  getArticleList(null, null, page, size).then((res) => {
    if (res.data.success) {
      articleList.value = articleList.value.concat(res.data.data.list);
      articleTotal.value = res.data.data.total;
    }
  });
};
addArticles(currentPage.value, pageSize.value);

onMounted(() => {
  watch(
    () => store.index_banner_url,
    (newVal, oldVal) => {
      if (newVal) {
        const gallery = document.querySelector(".index-gallery");
        gallery.classList.add("animate__animated", "animate__fadeIn");
      }
    }
  );
});
</script>

<template>
  <div>
    <div
      class="index-gallery"
      :style="{ 'background-image': `url(${store.index_banner_url})` }"
    >
      <div style="height: 20px"></div>
      <div class="center-con">
        <div class="title-big glitch" :data-text="slogan">{{ slogan }}</div>
      </div>
    </div>

    <div class="index-list max-w-[800px] mx-auto mt-10">
      <div
        class="flex h-[200px] justify-center items-center mt-10 first:mt-0 rounded-xl"
        :class="{ 'flex-row-reverse': index % 2 }"
        v-for="(item, index) in articleList"
      >
        <div class="w-[60%] h-full bg-slate-500">
          <p>哈哈</p>
        </div>
        <div class="w-[40%] h-full">
          <p>嘿嘿</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
