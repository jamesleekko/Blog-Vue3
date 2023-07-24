<script setup>
import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";
//监听路由跳转，滚动到顶部
const route = useRoute();
watch(
  () => route.path,
  (newVal, oldVal) => {
    window.scrollTo(0, 0);
  }
);
</script>

<template>
  <router-view> </router-view>
</template>

<style lang="scss" scoped></style>
