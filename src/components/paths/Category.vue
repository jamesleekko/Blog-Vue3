<template>
  <div class="cate-con mt-[54px]">
    <div class="sub-gallery">
      <el-image class="sub-img" :src="store.category_banner_url" fit="none"/>
      <div class="center-con">
        <p class="banner-title">文章归档</p>
      </div>
    </div>
    <div class="container flex mx-auto justify-center">
      <div class="con-left w-[200px] p-3">
        <div class="art-cat-item" v-for="item in store.categoryList" @click="">
          {{ item.name }}
        </div>
      </div>
      <div class="con-center p-3">
        <MyDrawer
          :data="store.articleGroupByDate"
          :key_level1="'year_month'"
          :key_array2="'articles'"
          :key_level2="'title'"
        ></MyDrawer>
      </div>
      <!-- <div class="con-right w-[200px] p-3"></div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";
import MyDrawer from "~/components/common/MyDrawer.vue";

const store = useGlobalStore();
</script>
