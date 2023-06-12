<script setup>
import { reactive, onMounted, ref } from "vue";

const props = defineProps({
  replyId: { type: Number, default: null },
  replyName: { type: String, default: null },
  replyContent: { type: String, default: null },
  mainId: { type: Number, default: null },
});
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
      v-model="newComment"
      placeholder="说点什么吧..."
    >
    </textarea>
  </div>
</template>
