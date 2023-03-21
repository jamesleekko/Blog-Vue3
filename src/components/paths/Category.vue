<template>
  <div class="cate-con">
    <div class="sub-gallery">
      <div class="center-con">
        <p class="banner-title">文章分类</p>
      </div>
    </div>
    <div class="cate-main">
      <div class="cate-left">
        
      </div>
      <div class="cate-right">

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useGlobalStore } from '~/assets/plugins/pinia/global-store';

const store = useGlobalStore()
</script>