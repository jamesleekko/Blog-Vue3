<script setup>
import { watch, ref } from "vue";
import banner_url from "~/assets/images/message_banner2.png";
import Comments from "~/components/common/Comments.vue";
import { getCommentById } from "~/assets/plugins/axios/http";

const messageList = ref([]);
const messageTotal = ref(0);
const mainMessageTotal = ref(0);
const mPage = ref(1);
const mSize = ref(10);

const getMessageList = (id, page, size, isMessage) => {
  getCommentById(id, page, size, isMessage).then((res) => {
    if (res.data.success) {
      messageList.value = res.data.data.comments;
      messageTotal.value = res.data.data.total;
      mainMessageTotal.value = res.data.data.mainTotal;
    } else {
      ElMessage({
        message: res.data.message,
        type: "error",
      });
    }
  });
};

const handleCurrentChange = (val) => {
  mPage.value = val;
  getMessageList(null, mPage.value, mSize.value, true);
};

const handlePrevChange = (val) => {
  mPage.value = val;
  getMessageList(null, mPage.value, mSize.value, true);
};

const handleNextChange = (val) => {
  mPage.value = val;
  getMessageList(null, mPage.value, mSize.value, true);
};

getMessageList(null, mPage.value, mSize.value, true);
</script>

<template>
  <div>
    <div class="w-full relative">
      <el-image class="w-full" :src="banner_url" :fit="'contain'"></el-image>
      <div
        class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      >
        <h1 class="text-4xl text-white font-['Microsoft JhengHei']">留言板</h1>
      </div>
    </div>

    <!-- <div class="w-[730px] h- mt-10 border-[2px] border-[#797979] border-t-0 relative text-center mx-auto max-w-[80%]">
      <div class="absolute left-0 top-0 h-[2px] bg-[#797979] w-[27%]"></div>
      <div class="absolute right-0 top-0 h-[2px] bg-[#797979] w-[27%]"></div>
      <p class="text-2xl mt-[-20px] text-[#797979]">一言</p>
      <p class="">宇宙是蚂蚁的梦。</p>
    </div> -->

    <div
      class="w-[730px] mt-[100px] border-t-0 relative text-center mx-auto max-w-[80%]"
    >
      <div class="absolute left-0 top-3 h-[2px] bg-[#797979] w-[27%]"></div>
      <div class="absolute right-0 top-3 h-[2px] bg-[#797979] w-[27%]"></div>
      <p class="text-[#797979] text-xl">宇宙是蚂蚁的梦</p>
    </div>

    <div class="max-w-[800px] mx-auto mt-20">
      <Comments
        :articleContent="articleContent"
        :commentList="messageList"
        :commentTotal="messageTotal"
        :mainCommentTotal="mainMessageTotal"
        @commit-success="getMessageList(null, mPage, mSize, true)"
      ></Comments>

      <ElPagination
        class="mt-8 justify-center"
        :page-size="mSize"
        :total="mainMessageTotal"
        :hide-on-single-page="true"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        @prev-change="handlePrevChange"
        @next-change="handleNextChange"
      ></ElPagination>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
