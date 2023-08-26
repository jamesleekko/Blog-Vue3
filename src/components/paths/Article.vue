<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";
import { useRouter, useRoute } from "vue-router";
import Comments from "~/components/common/Comments.vue";
import {
  getArticleContent,
  getBannerImageUrl,
  thumbArticle,
  cancelThumbArticle,
  getCommentById,
} from "~/assets/plugins/axios/http";

const store = useGlobalStore();
const router = useRouter();
const route = useRoute();
const articleContent = ref({});
const bannerSrc = ref("");
const isThumb = ref(false);

const commentList = ref([]);
const commentTotal = ref(0);
const mainCommentTotal = ref(0);
const mPage = ref(1);
const mSize = ref(10);

const getCommentList = (id, page, size) => {
  getCommentById(id, page, size).then((res) => {
    if (res.data.success) {
      commentList.value = res.data.data.comments;
      commentTotal.value = res.data.data.total;
      mainCommentTotal.value = res.data.data.mainTotal;
    } else {
      ElMessage({
        message: res.data.message,
        type: "error",
      });
    }
  });
};

const switchThumb = () => {
  if (isThumb.value) {
    thumb();
  } else {
    cancelThumb();
  }
};

const getThumbStatus = () => {
  const thumbList = localStorage.getItem("thumbList");
  if (thumbList) {
    const thumbArray = thumbList.split(",");
    if (thumbArray.indexOf(route.query.id) !== -1) {
      isThumb.value = true;
    } else {
      isThumb.value = false;
    }
  } else {
    localStorage.setItem("thumbList", "");
  }
};

const thumb = () => {
  thumbArticle(route.query.id).then((res) => {
    if (res.data.success) {
      const thumbList = localStorage.getItem("thumbList");
      if (thumbList) {
        localStorage.setItem("thumbList", thumbList + "," + route.query.id);
      } else {
        localStorage.setItem("thumbList", route.query.id);
      }
      articleContent.value.likes = res.data.data[0].likes;
    } else {
      console.log("点赞失败");
    }
  });
};

const cancelThumb = () => {
  cancelThumbArticle(route.query.id).then((res) => {
    if (res.data.success) {
      const thumbList = localStorage.getItem("thumbList");
      if (thumbList) {
        localStorage.setItem(
          "thumbList",
          thumbList
            .replace("," + route.query.id, "")
            .replace(route.query.id, "")
        );
      }
      console.log("thumblist2", localStorage.getItem("thumbList"));
      articleContent.value.likes = res.data.data[0].likes;
    } else {
      console.log("取消失败");
    }
  });
};

const handleCurrentChange = (val) => {
  mPage.value = val;
  getCommentList(route.query.id, mPage.value, mSize.value);
};

const handlePrevChange = (val) => {
  mPage.value = val;
  getCommentList(route.query.id, mPage.value, mSize.value);
};

const handleNextChange = (val) => {
  mPage.value = val;
  getCommentList(route.query.id, mPage.value, mSize.value);
};

if (route.query.id) {
  getThumbStatus();
  getBannerImageUrl(4).then((res) => {
    if (res.data.success) {
      //给article-gallery设置背景图片
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
  getCommentList(route.query.id, mPage.value, mSize.value);
} else {
  router.push("/category");
}
</script>

<template>
  <div class="article-con pb-8">
    <div
      class="article-gallery relative bg-fixed bg-cover bg-no-repeat bg-center"
      id="art-gallery"
    >
      <el-image :src="bannerSrc" fit="cover" class="w-full"></el-image>
      <p
        class="text-shadowed absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-4xl font-bold"
      >
        {{ articleContent.title }}
      </p>
      <div
        class="text-shadowed text-slate-200 absolute left-[50%] top-[calc(50%+5rem)] translate-x-[-50%] translate-y-[-50%]"
      >
        最后编辑于 {{ articleContent.time }}
      </div>
      <div
        class="text-shadowed text-slate-200 absolute left-[50%] top-[calc(50%+3rem)] translate-x-[-50%] translate-y-[-50%]"
      >
        <font-awesome-icon icon="fa-regular fa-eye" />
        {{ articleContent.views ? articleContent.views : 0 }}
        &nbsp;&nbsp;
        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
        {{ articleContent.likes ? articleContent.likes : 0 }}
      </div>
    </div>

    <div class="container mx-auto mt-[13px] pt-8">
      <div class="art-content mx-auto max-w-[800px]">
        <mavon-editor
          v-model="articleContent.content"
          class="w-full"
          :boxShadow="false"
          :subfield="false"
          :toolbarsFlag="false"
          :editable="false"
          :previewBackground="'#ffffff00'"
          defaultOpen="preview"
          codeStyle="stackoverflow-dark"
        ></mavon-editor>

        <div class="option-con flex items-center justify-center flex-wrap mt-8">
          <div class="thumb-button !w-full">
            <input
              class="thumb-input"
              id="article-like"
              type="checkbox"
              v-model="isThumb"
              @change="switchThumb()"
            />
            <label class="thumb-label" for="article-like"
              ><font-awesome-icon icon="fa-regular fa-thumbs-up"
            /></label>
          </div>
          <p class="text-gray-400">
            收获&nbsp;<span class="text-[#e2264d]">{{
              articleContent.likes
            }}</span
            >&nbsp;个赞
          </p>
        </div>

        <Comments
          :articleContent="articleContent"
          :commentList="commentList"
          :commentTotal="commentTotal"
          :mainCommentTotal="mainCommentTotal"
          @commit-success="getCommentList(route.query.id, mPage, mSize)"
        ></Comments>

        <ElPagination
          class="mt-8 justify-center"
          :page-size="mSize"
          :total="mainCommentTotal"
          :hide-on-single-page="false"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          @prev-change="handlePrevChange"
          @next-change="handleNextChange"
        ></ElPagination>
      </div>
    </div>
  </div>
</template>
