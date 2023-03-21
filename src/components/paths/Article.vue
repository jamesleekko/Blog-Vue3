<template>
  <div class="article-con">
    <div class="sub-gallery">
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useGlobalStore } from '~/assets/plugins/pinia/global-store';

const store = useGlobalStore()
</script>