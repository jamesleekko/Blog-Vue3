<template>
  <div class="article-con">
    <div
      class="article-gallery relative m-[-20px] min-h-[200px] bg-fixed bg-cover bg-no-repeat bg-center"
      id="art-gallery"
    >
      <el-image :src="bannerSrc" fit="cover"></el-image>
      <p
        class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-4xl"
      >
        {{ articleContent.title }}
      </p>
      <div
        class="absolute left-[50%] top-[calc(50%+5rem)] translate-x-[-50%] translate-y-[-50%]"
      >
        最后编辑于 {{ articleContent.time }}
      </div>
      <div
        class="absolute left-[50%] top-[calc(50%+3rem)] translate-x-[-50%] translate-y-[-50%]"
      >
        <font-awesome-icon icon="fa-solid fa-eye" />
        {{ articleContent.views ? articleContent.views : 0 }}
        &nbsp;&nbsp;
        <font-awesome-icon icon="fa-solid fa-thumbs-up" />
        {{ articleContent.likes ? articleContent.likes : 0 }}
      </div>
    </div>

    <div class="container mx-auto mt-[13px] pt-8">
      <div class="art-content mx-auto max-w-[800px]">

        <v-md-preview :text="articleContent.content" />

        <div class="option-con flex items-center justify-center mt-8">
          <div class="thumb-button">
            <input class="thumb-input" id="article-like" type="checkbox" />
            <label class="thumb-label" for="article-like"
              ><font-awesome-icon icon="fa-regular fa-thumbs-up"
            /></label>
          </div>
        </div>

        <div class="comments-con"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";
import { useRouter, useRoute } from "vue-router";
import {
  getArticleContent,
  getBannerImageUrl,
} from "~/assets/plugins/axios/http";

const store = useGlobalStore();
const router = useRouter();
const route = useRoute();
const articleContent = ref({});
const bannerSrc = ref("");
if (route.query.id) {
  getBannerImageUrl(4).then((res) => {
    if (res.data.success) {
      //给article-gallery设置背景图片
      const gallery = document.getElementById("art-gallery");
      console.log("check url", res.data.data[0]);
      // gallery.style.backgroundImage = `url(${res.data.data[0].src})`;
      bannerSrc.value = res.data.data[0].src;
    } else {
    }
  });
  getArticleContent(route.query.id).then((res) => {
    if (res.data.success) {
      articleContent.value = res.data.data[0];
    } else {
      router.push("/category");
    }
  });
} else {
  router.push("/category");
}
</script>
