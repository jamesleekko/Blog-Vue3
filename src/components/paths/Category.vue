<template>
  <div class="cate-con mt-[54px] overflow-hidden">
    <div
      class="min-h-[200] relative mb-0 p-8 sub-gallery animate__animated animate__pulse"
    >
      <el-image class="w-full" :src="store.category_banner_url" fit="fill" />
      <div class="center-con">
        <p class="banner-title">文章归档</p>
      </div>
    </div>
    <div class="container flex flex-wrap mx-auto justify-center">
      <div class="con-left w-[120px] p-4">
        <div
          class="art-cat-item animate__animated animate__fadeInUp"
          v-for="item in store.categoryList"
          @click="setCategory(item.id)"
        >
          <font-awesome-icon :icon="getCateIcon(item)" :id="'cat-' + item.id" />
          {{ item.name }}
        </div>
      </div>
      <div class="w-[1px] border-[1px] border-dashed border-grey-200"></div>
      <div class="con-center p-4">
        <MyDrawer
          :data="store.articleGroupByDate"
          :key_level1="'year_month'"
          :key_array2="'articles'"
          :key_level2="'title'"
          @chooseItem="goArticle"
        ></MyDrawer>
      </div>
      <div class="con-right w-[120px] p-4"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";
import MyDrawer from "~/components/common/MyDrawer.vue";
import { useRouter } from "vue-router";
import { setArticleGroupByDate } from "~/assets/utils/commonFunc";

const store = useGlobalStore();
const router = useRouter();
const proxy = getCurrentInstance()?.proxy;

function getCateIcon(item) {
  switch (item.id) {
    case 1:
      return "fa-solid fa-cube";
    case 2:
      return "fa-solid fa-square-pen";
  }
}

function setAnimations() {
  const items = document.querySelectorAll(".art-cat-item");
  items.forEach((item, index) => {
    item.addEventListener("mouseover", () => {
      proxy.$animate(`#cat-${index + 1}`, "tada");
    });
    item.addEventListener("mouseout", () => {
      proxy.$stopAnimate(`#cat-${index + 1}`, "tada");
    });
  });
}

function goArticle(item) {
  router.push("/article?id=" + item.id);
}

function setCategory(id) {
  setArticleGroupByDate(id);
}

onMounted(() => {
  setTimeout(() => {
    setAnimations();
  }, 500);
});
</script>
