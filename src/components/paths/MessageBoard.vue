<script setup>
import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";

const banner_url = "/src/assets/images/message-banner.jpg";

</script>

<template>
  <div>
    <div class="w-full relative shadow-md">
      <el-image :src="banner_url"></el-image>
      <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <h1 class="text-4xl text-white">留言板</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
