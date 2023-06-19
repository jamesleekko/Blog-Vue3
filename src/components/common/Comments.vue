<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import { addComment } from "~/assets/plugins/axios/http";
import CommentInput from "~/components/common/CommentInput.vue";
import { ElMessage } from "element-plus";

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

  //处理回复
  if (commentContent.replyInfo) {
    commentContent.pid = commentContent.replyId;
    commentContent.mainid = commentContent.mainId;
  }

  addComment(commentContent).then((res) => {
    if (res.data.success) {
      ElMessage({
        message: res.data.message,
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
        ><span class="text-gray-400">{{ commentTotal }}条评论</span>
      </p>
      <CommentInput @commit="commitComment"></CommentInput>
    </div>

    <div class="mt-10">
      <div
        v-for="(item, index) in commentList"
        class="group relative mt-8 first:mt-0 border-b-[1px] last:border-b-[0] border-stone-400"
      >
        <el-avatar class="avatar-shadow" :src="getAvatarUrl(item)"></el-avatar>
        <div class="inline-block ml-2 align-top">
          <h4 class="text-[#6812b3] text-base">{{ item.name }}</h4>
          <p class="text-gray-400 text-xs mt-1">发布于 {{ item.time }}</p>
        </div>
        <p class="mt-2">{{ item.content }}</p>
        <button
          class="absolute right-0 top-0 invisible group-hover:visible"
          @click="switchReply(index)"
        >
          {{ inputShowList[index] ? "取消" : "回复" }}
        </button>

        <CommentInput
          v-if="inputShowList[index]"
          :reply-id="item.id"
          :main-id="isSub ? item.mainid : item.id"
          :reply-info="item"
          @commit="commitComment"
        ></CommentInput>

        <Comments
          v-if="item.subComments && item.subComments.length > 0"
          :article-content="props.articleContent"
          :isSub="true"
          :comment-list="item.subComments"
          @commit-success="onSubCommitSuccess"
        ></Comments>
      </div>
    </div>

    <ElPagination
      :page-size="mSize"
      :total="commentTotal"
      :hide-on-single-page="false"
      background
      layout="prev, pager, next"
    ></ElPagination>
  </div>
</template>
