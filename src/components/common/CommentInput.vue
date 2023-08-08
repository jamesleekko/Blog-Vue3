<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { getInfoByQQ } from "~/assets/plugins/axios/http";
import userAvatar from "~/assets/images/user.svg"

const props = defineProps({
  replyId: { type: Number, default: null },
  mainId: { type: Number, default: null },
  replyInfo: { type: Object, default: null },
});

const emit = defineEmits(["commit"]);

const commentContent = reactive({
  replyId: props.replyId,
  mainId: props.mainId,
  replyName: props.replyName,
  replyInfo: props.replyInfo,
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
  const name = commentContent.name;
  if (isQQNumber(name)) {
    getInfoByQQ(name).then((res) => {
      if (res.data.success) {
        commentContent.avatar = res.data.avatar_url;
        commentContent.name = res.data.name;
        commentContent.email = `${name}@qq.com`;

        if (!res.data.name) {
          ElMessage({
            message: "拉取QQ昵称失败",
            type: "error",
          });
        }
      } else {
        ElMessage({
          message: res.data.message,
          type: "error",
        });
      }
    });
  }
}

function isQQNumber(str) {
  var reg = /^[1-9][0-9]{4,10}$/;
  return reg.test(str);
}

const getAvatarUrl = () => {
  if (commentContent.avatar) {
    return commentContent.avatar;
  } else {
    return userAvatar;
  }
};
</script>

<template>
  <div class="comments-con">
    <div v-if="replyId"></div>
    <p class="text-gray-500" v-if="!replyId"></p>
    <textarea
      class="comments-area"
      v-model="commentContent.content"
      placeholder="说点什么吧..."
    >
    </textarea>
    <div class="flex items-center justify-between mt-4">
      <el-avatar size="large" class="!bg-white" :src="getAvatarUrl()"></el-avatar>
      <el-tooltip
        effect="dark"
        content="输入QQ号自动拉取信息"
        placement="top-start"
      >
        <input
          class="comments-input duration-500 focus:border-[#ff9c00]"
          placeholder="*昵称"
          v-model="commentContent.name"
          @blur="getQQInfo()"
        />
      </el-tooltip>
      <input
        class="comments-input duration-500 focus:border-[#ff9c00]"
        placeholder="*邮箱"
        v-model="commentContent.email"
      />
      <input
        class="comments-input duration-500 focus:border-[#ff9c00]"
        placeholder="个人站点"
        v-model="commentContent.website"
      />
      <button
        class="comments-commit bg-[#ffa619] hover:bg-[#ff9c00] px-4 py-1 text-1 text-white rounded-sm"
        @click="commitComment(commentContent)"
      >
        提交
      </button>
    </div>
  </div>
</template>
