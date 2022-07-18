<script setup>
import { onMounted, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useGlobalStore } from '~/assets/plugins/pinia/global-store';

import banner1 from '~/assets/images/gallery/index/index-banner1.jpg'
const banners = [banner1]

const store = useGlobalStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const curPictureNum = Math.floor(Math.random() * (store.totalGallery - 1)) + Number(1);

onMounted(() => {
  console.log('show gallery ele', $('.index-gallery'), curPictureNum)
  $('.index-gallery').css('background-image', `url(${banners[curPictureNum - 1]})`)
})
</script>

<template>
  <div class="index-gallery">
    <div style="height: 20px"></div>
    <div class="center-con">
      <div class="title-big glitch" data-text="Hustle,Hustle!">Hustle,Hustle!</div>
    </div>
  </div>
  <div style="height: 100vh; scroll-snap-align: start;">fdsjfiods</div>
</template>

<style lang="scss" scoped>
</style>
