<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";
import { getArticleList, getBannerImageUrl } from "~/assets/plugins/axios/http";
import moment from "moment";

const router = useRouter();
const store = useGlobalStore();
const isDark = useDark();
const toggleDark = useToggle(isDark);
const slogan = ref("Hustle Hustle`");
const articleList = ref([]);
const articleTotal = ref(0);
const currentPage = ref(1);
const pageSize = ref(1);

const bannerImg = new Image();
bannerImg.src = "https://api.likepoems.com/img/bing";
bannerImg.onload = function () {
  const gallery = document.querySelector(".index-gallery");
  gallery.style.backgroundImage = `url("${bannerImg.src}")`;
  gallery.classList.add("ani_bgZoom");
};

//避免重复监听
let scrollWatched = false;

//用于限制文章列表加载数量，以及提前设置容器高度
const articleLeft = ref(0); //剩余未加载文章总数
const groupLimit = 10;
const articleGroupCount = ref(0);

let addingLock = false;

const addArticles = (page, size) => {
  return new Promise((resolve, reject) => {
    addingLock = true;
    getArticleList(null, null, page, size).then(async (res) => {
      if (res.data.success) {
        articleGroupCount.value++;
        articleList.value = articleList.value.concat(res.data.data.list);
        articleTotal.value = res.data.data.total;
        await nextTick();

        //给最后一个item里的itemPicture添加背景图
        const lastItem = document.querySelector(".article-item:last-child");
        const lastItemPicture = lastItem.querySelector(".itemPicture");
        // lastItemPicture.style.backgroundImage = `url("https://unsplash.it/1366/768?random")`;
        getBannerImageUrl(5).then(function (res) {
          if (res.data.success) {
            lastItemPicture.style.backgroundImage = `url("${res.data.data[0].src}")`;
          }
        });

        addingLock = false;

        if (!scrollWatched) {
          articleLeft.value = articleTotal.value - 1;
          await nextTick();
          setContainerHeight();
          watchScroll();
        } else {
          articleLeft.value--;
        }
        resolve(articleList);
      } else {
        reject(res);
      }
    });
  });
};
addArticles(currentPage.value, pageSize.value);

const nextGroup = () => {
  currentPage.value++;
  articleGroupCount.value = 0;
  addArticles(currentPage.value, pageSize.value).then(() => {
    setContainerHeight(true);
  });
};

const setContainerHeight = (includeFirst = false) => {
  const groupEmpty = groupLimit - articleGroupCount.value;
  let increaseCount =
    groupEmpty < articleLeft.value ? groupEmpty : articleLeft.value;
  if (includeFirst) {
    increaseCount++;
  }
  const oneHeight = document.querySelector(".article-item").offsetHeight;
  const itemMarginTop = getComputedStyle(
    document.querySelector(".article-item")
  ).marginTop.replace("px", "");
  const increaseHeight = increaseCount * (oneHeight + Number(itemMarginTop));
  const container = document.querySelector(".index-list");
  container.style.height = `${container.offsetHeight + increaseHeight}px`;
};

const getIcon = (type) => {
  switch (type) {
    case 1:
      return "fa-solid fa-cube";
      break;
    case 2:
      return "fa-solid fa-square-pen";
      break;
  }
};

const getTypeName = (type) => {
  return store.categoryList.find((item) => item.id === type).name;
};

const watchScroll = () => {
  let oneHeight;
  try {
    //检查是否有第一个文章，没有则不监听
    oneHeight = document.querySelector(".article-item").offsetHeight;
    if (!oneHeight) {
      return;
    }
  } catch (e) {
    return;
  }

  const listRect = document
    .querySelector(".index-list")
    .getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const itemMarginTop = getComputedStyle(
    document.querySelector(".article-item")
  ).marginTop.replace("px", "");

  window.addEventListener("scroll", () => {
    const listDoms = document.querySelectorAll(".article-item");
    const scrollTop = document.documentElement.scrollTop;
    if (
      scrollTop + windowHeight >
        listRect.top -
          Number(itemMarginTop) +
          listDoms.length * (oneHeight + Number(itemMarginTop)) +
          10 &&
      articleGroupCount.value < groupLimit &&
      currentPage.value < articleTotal.value &&
      !addingLock
    ) {
      currentPage.value++;
      addArticles(currentPage.value, pageSize.value);
    }
  });
  scrollWatched = true;
};

const goArticle = (id) => {
  router.push(`/article?id=${id}`);
};

onMounted(() => {
  // watch(
  //   () => store.index_banner_url,
  //   (newVal, oldVal) => {
  //     if (newVal) {
  //       bannerImg.src = newVal;
  //     }
  //   }
  // );
});
</script>

<template>
  <div>
    <div class="index-gallery">
      <!-- <el-image
        id="banner"
        class="w-full h-full !fixed z-[-1]"
        :src="store.index_banner_url"
        fit="cover"
        @load="bannerLoaded"
      /> -->
      <div class="center-con">
        <div class="title-big glitch" :data-text="slogan">{{ slogan }}</div>
      </div>
    </div>

    <div class="bg-white pt-4">
      <div class="index-list max-w-[800px] mx-auto pb-10">
        <div
          class="article-item group flex h-[320px] justify-center items-center mt-10 rounded-xl bg-white overflow-hidden shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] animate__animated animate__fadeInUp cursor-pointer"
          :class="{ 'flex-row-reverse': index % 2 }"
          v-for="(item, index) in articleList"
          @click="goArticle(item.id)"
        >
          <div class="w-[40%] h-full p-4">
            <p class="text-xs text-gray-400">
              <font-awesome-icon icon="fa-regular fa-clock" /> 发布于
              {{ moment(item.time).format("YY-MM-DD HH:mm:ss") }}
            </p>
            <h2 class="mt-4 text-xl">{{ item.title }}</h2>
            <div class="mt-4 flex justify-start text-gray-400 text-sm">
              <p class="">
                <font-awesome-icon icon="fa-regular fa-eye"></font-awesome-icon>
                {{ item.views }}
              </p>
              <p class="ml-4">
                <font-awesome-icon
                  icon="fa-regular fa-thumbs-up"
                ></font-awesome-icon>
                {{ item.likes }}
              </p>
              <p class="ml-4">
                <font-awesome-icon
                  :icon="getIcon(item.type)"
                ></font-awesome-icon>
                {{ getTypeName(item.type) }}
              </p>
            </div>
            <p class="mt-4 max-h-[48px] overflow-hidden overflow-ellipsis">
              {{ item.preview }} ...
            </p>
          </div>
          <div
            class="itemPicture w-[60%] h-full p-4 bg-center bg-[100%,100%] bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[120%,120%]"
          ></div>
        </div>
      </div>

      <div
        class="flex justify-center animate__animated animate__fadeInUp"
        v-if="articleGroupCount === 10 && articleLeft > 0"
      >
        <button class="draw-border" @click="nextGroup()">MORE</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
