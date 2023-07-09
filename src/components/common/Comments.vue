<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import { addComment } from "~/assets/plugins/axios/http";
import CommentInput from "~/components/common/CommentInput.vue";
import { ElMessage } from "element-plus";
import moment from "moment";

const props = defineProps({
  articleContent: {
    type: Object,
    default: () => {},
  },
  article_id: {
    type: Number,
    default: () => null,
  },
  isSub: {
    type: Boolean,
    default: () => false,
  },
  commentList: {
    type: Array,
    default: () => [],
  },
  commentTotal: {
    type: Number,
    default: () => 0,
  },
  mainCommentTotal: {
    type: Number,
    default: () => 0,
  },
});

//watch commentList
watch(
  () => props.commentList,
  (newVal, oldVal) => {
    inputShowList.value = newVal.map((item) => {
      return false;
    });
  }
);

const emit = defineEmits(["commitSuccess"]);
const inputShowList = ref([]);
const showReplyInput = ref(false);

const commitComment = (commentContent) => {
  console.log("get comment", commentContent);
  const date = new Date();
  //格式化时间，按照yyyy-MM-dd hh:mm:ss的格式输出
  const formatDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  commentContent.time = formatDate;
  commentContent.article_id = props.articleContent.id;

  addComment(commentContent).then((res) => {
    if (res.data.success) {
      ElMessage({
        message: "评论成功",
        type: "success",
      });
      emit("commitSuccess");
    } else {
      ElMessage({
        message: res.data.message,
        type: "error",
      });
    }
  });
};

const onSubCommitSuccess = () => {
  emit("commitSuccess");
};

const getAvatarUrl = (item) => {
  if (item.avatar_url) {
    return item.avatar_url;
  } else {
    return "/src/assets/images/user.svg";
  }
};

const switchReply = (index) => {
  inputShowList.value[index] = !inputShowList.value[index];
};

</script>

<template>
  <div class="mt-10">
    <div v-if="!isSub">
      <p class="text-gray-500">
        Comments<span class="">&nbsp;|&nbsp;</span
        ><span class="text-gray-400"
          >{{ commentTotal }}条评论</span
        >
      </p>
      <CommentInput @commit="commitComment"></CommentInput>
    </div>

    <div class="mt-10">
      <div
        v-for="(item, index) in commentList"
        :class="{ 'ml-10': isSub }"
        class="relative mt-8 first:mt-0"
      >
        <div class="group/section">
          <el-avatar
            class="avatar-shadow hover:animate-spin"
            :src="getAvatarUrl(item)"
          ></el-avatar>
          <div class="inline-block ml-2 align-top">
            <h4 class="text-[#6812b3] text-base">{{ item.name }}</h4>
            <p class="text-gray-400 text-xs mt-1">发布于 {{ moment(item.time).format("YYYY-MM-DD hh:mm:ss") }}</p>
          </div>
          <div v-if="isSub" class="mt-2">
            <p class="bg-gray-100 p-2 rounded-[4px]">
              回复：&nbsp;<span>{{ item.replyTarget.name }}</span>&nbsp;&nbsp;&nbsp;"<span
                class="max-w-[400px] overflow-ellipsis whitespace-nowrap overflow-hidden inline-block align-top"
                >{{ item.replyTarget.content }}</span
              >"
            </p>
          </div>

          <section class="mt-2">{{ item.content }}</section>

          <button
            class="absolute right-0 top-0 invisible group-hover/section:visible bg-[#ffa619] rounded-sm px-2 py-1 text-white text-xs hover:bg-[#ff9c00]"
            @click="switchReply(index)"
          >
            {{ inputShowList[index] ? "取消" : "回复" }}
          </button>
        </div>

        <div class="mt-8 h-[1px] w-full bg-gray-200"></div>

        <CommentInput
          v-if="inputShowList[index]"
          :reply-id="item.id"
          :main-id="isSub ? item.mainId : item.id"
          :reply-info="item"
          @commit="commitComment"
        ></CommentInput>

        <Comments
          v-if="item.replyComments && item.replyComments.length > 0"
          :article-content="props.articleContent"
          :isSub="true"
          :comment-list="item.replyComments"
          @commit-success="onSubCommitSuccess"
        ></Comments>
      </div>
    </div>
  </div>
</template>
