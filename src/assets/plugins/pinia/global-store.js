import { defineStore } from "pinia";
import { useDark, useToggle } from "@vueuse/core";
import { reactive, ref } from "vue";

export const useGlobalStore = defineStore("globalStore", () => {
  //全局主题
  const isDark = useDark();
  function toggleDark() {
    useToggle(isDark);
  }

  //首页轮播图数量
  const totalGallery = 1;

  //文章分类列表
  let categoryList = [];
  function setCategoryList(list) {
    categoryList = list;
  }

  return { isDark, toggleDark, totalGallery, categoryList, setCategoryList };
});
