<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import { getInfoByQQ, getQQAvatar } from "~/assets/plugins/axios/http";

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

//监听commentContent.name的变化，停止输入2秒后自动拉取QQ信息
watch(
  () => commentContent.value.name,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        if (newVal === commentContent.value.name) {
          getInfoByQQ(newVal).then((res) => {
            console.log('qq res', res)
            // if (res.data.success) {
            //   commentContent.value.avatar = res.data.data.avatar;
            //   commentContent.value.email = res.data.data.email;
            //   commentContent.value.website = res.data.data.website;
            // }
          });
        }
      }, 2000);
    }
  }
);

function commitComment(commentContent) {
  emit("commit", commentContent);
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
