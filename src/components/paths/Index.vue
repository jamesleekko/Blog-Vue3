<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
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
const pageSize = ref(1);
let scrollWatched = false;

const curPictureNum =
  Math.floor(Math.random() * (store.totalGallery - 1)) + Number(1);

const addArticles = (page, size) => {
  getArticleList(null, null, page, size).then(async (res) => {
    if (res.data.success) {
      articleList.value = articleList.value.concat(res.data.data.list);
      articleTotal.value = res.data.data.total;

      if (!scrollWatched) {
        await nextTick();
        watchScroll();
      }
    }
  });
};
addArticles(currentPage.value, pageSize.value);

const watchScroll = () => {
  const itemRect = document
    .querySelector(".article-item")
    .getBoundingClientRect();
  const oneHeight = document.querySelector(".article-item").offsetHeight;
  const listRect = document
    .querySelector(".index-list")
    .getBoundingClientRect();
  const windowHeight = window.innerHeight;
  let bottomEdge = listRect.top + listRect.height + 10;
  let marginTop = 0;
  const rem = document.querySelector("html").style.fontSize;

  if (oneHeight) {
    window.addEventListener("scroll", () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop, oneHeight, windowHeight, listRect, itemRect.top);
      if (scrollTop + windowHeight > bottomEdge) {
        currentPage.value++;
        addArticles(currentPage.value, pageSize.value);
        bottomEdge += oneHeight;
        console.log("add");
      }
    });
    scrollWatched = true;
  }
};

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

    <div class="index-list max-w-[800px] mx-auto mt-10 pb-10">
      <div
        class="article-item flex h-[200px] justify-center items-center mb-10 last:mb-0 rounded-xl overflow-hidden shadow-[0_7px_29px_0_rgba(100,100,111,0.2)]"
        :class="{ 'flex-row-reverse': index % 2 }"
        v-for="(item, index) in articleList"
      >
        <div class="w-[60%] h-full bg-slate-500 p-4">
          <p>哈哈</p>
        </div>
        <div class="w-[40%] h-full p-4">
          <p>嘿嘿</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
