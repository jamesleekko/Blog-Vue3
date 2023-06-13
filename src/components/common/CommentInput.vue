<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import { getInfoByQQ } from "~/assets/plugins/axios/http";

const props = defineProps({
  replyId: { type: Number, default: null },
  replyName: { type: String, default: null },
  replyContent: { type: String, default: null },
  mainId: { type: Number, default: null },
});

const emit = defineEmits(["commit"]);

const commentContent = ref({
  replyId: props.replyId,
  replyName: props.replyName,
  replyContent: props.replyContent,
  mainId: props.mainId,
  content: "",
  avatar: "",
  name: "",
  email: "",
  website: "",
});

function commitComment(commentContent) {
  emit("commit", commentContent);
}

function getQQInfo() {
  if (isQQNumber) {
    getInfoByQQ(commentContent.value.name).then((res) => {
      if (res.data.success) {
        commentContent.value.avatar = res.data.avatar_url;
        commentContent.value.name = res.data.name;
      }
    });
  }
}

function isQQNumber(str) {
  var reg = /^[1-9][0-9]{4,10}$/;
  return reg.test(str);
}
</script>

<template>
  <div class="comments-con">
    <div v-if="replyId"></div>
    <p class="text-gray-500" v-if="!replyId">
      Comments<span class="">&nbsp;|&nbsp;</span
      ><span class="text-gray-400">22条评论</span>
    </p>
    <textarea
      class="comments-area"
      v-model="commentContent.content"
      placeholder="说点什么吧..."
    >
    </textarea>
    <div class="flex items-center justify-between mt-4">
      <el-avatar size="large" class="" :src="commentContent.avatar"></el-avatar>
      <el-tooltip
        effect="dark"
        content="输入QQ号自动拉取信息"
        placement="top-start"
      >
        <input
          class="comments-input"
          placeholder="*昵称"
          v-model="commentContent.name"
          @blur="getQQInfo()"
        />
      </el-tooltip>
      <input
        class="comments-input"
        placeholder="*邮箱"
        v-model="commentContent.email"
      />
      <input
        class="comments-input"
        placeholder="个人站点"
        v-model="commentContent.website"
      />
      <button class="comments-commit" @click="commitComment(commentContent)">
        提交
      </button>
    </div>
  </div>
</template>
