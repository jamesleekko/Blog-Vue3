<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";
import { getArticleList } from "~/assets/plugins/axios/http";

const store = useGlobalStore();
const isDark = useDark();
const toggleDark = useToggle(isDark);
const slogan = ref(" Hustle Hustle ");
const articleList = ref([]);
const articleTotal = ref(0);
const currentPage = ref(1);
const pageSize = ref(1);

//避免重复监听
let scrollWatched = false;

//用于限制文章列表加载数量，以及提前设置容器高度
const articleLeft = ref(0); //剩余未加载文章总数
const groupLimit = 10;
const articleGroupCount = ref(0);

const addArticles = (page, size) => {
  getArticleList(null, null, page, size).then(async (res) => {
    if (res.data.success) {
      articleList.value = articleList.value.concat(res.data.data.list);
      articleTotal.value = res.data.data.total;
      articleGroupCount.value++;

      if (!scrollWatched) {
        articleLeft.value = articleTotal.value - 1;
        await nextTick();
        setContainerHeight();
        watchScroll();
      } else {
        articleLeft.value--;
      }
    }
  });
};
addArticles(currentPage.value, pageSize.value);

const nextGroup = () => {
  if (articleLeft.value > 0) {
    currentPage.value++;
    articleGroupCount.value = 0;
    addArticles(currentPage.value, pageSize.value);
  }
};

const setContainerHeight = () => {
  const groupEmpty = groupLimit - articleGroupCount.value;
  const increaseCount =
    groupEmpty < articleLeft.value ? groupEmpty : articleLeft.value;
  const oneHeight = document.querySelector(".article-item").offsetHeight;
  const itemMarginTop = getComputedStyle(
    document.querySelector(".article-item")
  ).marginTop.replace("px", "");
  const increaseHeight = increaseCount * (oneHeight + Number(itemMarginTop));
  const container = document.querySelector(".index-list");
  container.style.height = `${container.offsetHeight + increaseHeight}px`;
};

const watchScroll = () => {
  const oneHeight = document.querySelector(".article-item").offsetHeight;
  const listRect = document
    .querySelector(".index-list")
    .getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const itemMarginTop = getComputedStyle(
    document.querySelector(".article-item")
  ).marginTop.replace("px", "");

  if (oneHeight) {
    window.addEventListener("scroll", () => {
      const listDoms = document.querySelectorAll(".article-item");
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (
        scrollTop + windowHeight >
          listRect.top -
            Number(itemMarginTop) +
            listDoms.length * (oneHeight + Number(itemMarginTop)) +
            10 &&
        articleGroupCount.value < groupLimit &&
        currentPage.value < articleTotal.value
      ) {
        currentPage.value++;
        addArticles(currentPage.value, pageSize.value);
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

    <div class="index-list max-w-[800px] mx-auto pb-10">
      <div
        class="article-item flex h-[280px] justify-center items-center mt-10 rounded-xl overflow-hidden shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] animate__animated animate__fadeInUp"
        :class="{ 'flex-row-reverse': index % 2 }"
        v-for="(item, index) in articleList"
      >
        <div class="w-[60%] h-full bg-slate-500 p-4">
          <p>哈哈</p>
        </div>
        <div class="w-[40%] h-full p-4">
          <p>嘿嘿</p>
          <p>{{ item.preview }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center" v-if="articleGroupCount === 10">
      <button class="draw-border" @click="nextGroup()">More</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
