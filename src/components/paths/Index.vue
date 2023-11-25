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
const slogan = ref("Hustle Hustle.`");
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

// const proverb = ref("我不是一个好人，但我也不是一个坏人。");
const proverb = ref("Codiiiiiiiiiiiiiiiiiiiiiiiiiiiing。");

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
        const newItem = parsePreview(res.data.data.list[0]);
        articleList.value = articleList.value.concat(newItem);
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

const scrollDis = ref(0);
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
    scrollDis.value = scrollTop;
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

const scrollDownGallery = () => {
  const gallery = document.querySelector(".index-gallery");
  const galleryHeight = gallery.offsetHeight;
  window.scrollTo({
    top: galleryHeight,
    behavior: "smooth",
  });
};

const parsePreview = (articleItem) => {
  articleItem.preview = articleItem.preview.replaceAll("\n", "").replaceAll(/[`]+/g, "").replaceAll(/[#]+/g, "");
  return articleItem;
};

const goArticle = (id) => {
  router.push(`/article?id=${id}`);
};

onMounted(() => {});
</script>

<template>
  <div>
    <div class="index-gallery">
      <div class="center-con">
        <div
          class="title-big glitch animate__animated animate__fadeInDown"
          :data-text="slogan"
        >
          {{ slogan }}
        </div>
        <div
          class="bg-[#00000080] rounded-md mt-8 p-4 w-[658px] mx-auto animate__animated animate__fadeInDown"
        >
          <p class="text-[#eaeadf] font-['Ubuntu,sans-serif']">
            <font-awesome-icon icon="fa-solid fa-quote-left" class="text-2xl">
            </font-awesome-icon>
            {{ proverb }}
            <font-awesome-icon
              icon="fa-solid fa-quote-right"
              class="text-2xl"
            ></font-awesome-icon>
          </p>
          <div class="flex justify-center mt-4 gap-x-4">
            <el-tooltip effect="dark" content="网易云音乐" placement="bottom">
              <a href="https://music.163.com/#/user/home?id=90431140">
                <img class="w-6 h-6 cursor-pointer" :src="store.netease_url" />
              </a>
            </el-tooltip>
            <el-tooltip effect="dark" content="Github" placement="bottom">
              <a href="https://github.com/jamesleekko/">
                <img class="w-6 h-6 cursor-pointer" :src="store.github_url" />
              </a>
            </el-tooltip>
            <el-tooltip effect="dark" content="腾讯QQ" placement="bottom">
              <a
                href="http://wpa.qq.com/msgrd?v=3&uin=736082263&site=qq&menu=yes"
              >
                <img class="w-6 h-6 cursor-pointer" :src="store.qq_url" />
              </a>
            </el-tooltip>

            <el-tooltip effect="dark" content="哔哩哔哩" placement="bottom">
              <a href="https://space.bilibili.com/23181961">
                <img class="w-6 h-6 cursor-pointer" :src="store.bilibili_url" />
              </a>
            </el-tooltip>

            <el-tooltip effect="dark" placement="bottom">
              <template #content>
                <p>微信<br />暂未开放</p>
              </template>
              <a>
                <img class="w-6 h-6 cursor-pointer" :src="store.wechat_url" />
              </a>
            </el-tooltip>
          </div>
        </div>
      </div>

      <div
        v-if="scrollDis == 0"
        class="absolute bottom-0 px-4 py-2 left-1/2 -translate-x-1/2 text-white text-2xl cursor-pointer"
        @click="scrollDownGallery"
      >
        <font-awesome-icon
          icon="fa-solid fa-chevron-down"
          class="animate-bounce"
        ></font-awesome-icon>
      </div>
    </div>

    <div class="bg-white py-4">
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
            <p class="mt-4 index-preview-text">
              {{ item.preview }}
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
