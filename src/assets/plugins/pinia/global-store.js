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
  const totalGallery = ref(1);

  //文章分类列表
  const categoryList = ref([]);
  function setCategoryList(list) {
    categoryList.value = list;
    console.log(categoryList)
  }

  const count = ref(0);

  return { isDark, toggleDark, totalGallery, categoryList, setCategoryList, count };
});
