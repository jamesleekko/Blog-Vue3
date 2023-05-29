import { defineStore } from "pinia";
import { useDark, useToggle } from "@vueuse/core";
import { reactive, ref } from "vue";

export const useGlobalStore = defineStore("globalStore", () => {
  //全局主题
  const isDark = useDark();
  function toggleDark() {
    useToggle(isDark);
  }

  //首页大图url
  const index_banner_url = ref("");
  function setIndexBannerUrl(url) {
    index_banner_url.value = url;
  }

  //归档banner图url
  const category_banner_url = ref("");
  function setCategoryBannerUrl(url) {
    category_banner_url.value = url;
  }

  //文章分类列表
  const categoryList = ref([]);
  function setCategoryList(list) {
    categoryList.value = list;
  }

  //文章归档-日期
  const articleGroupByDate = ref([]);
  function setArticleGroupByDate(list) {
    articleGroupByDate.value = list;
  }

  const count = ref(0);

  return {
    isDark,
    toggleDark,
    categoryList,
    index_banner_url,
    setCategoryList,
    setIndexBannerUrl,
    count,
    setCategoryBannerUrl,
    category_banner_url,
    articleGroupByDate,
    setArticleGroupByDate,
  };
});
