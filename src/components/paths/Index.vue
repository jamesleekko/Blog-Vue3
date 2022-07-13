<script setup>
import { onMounted, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import store from '~/assets/plugins/vuex/vuex'
import banner1 from '~/assets/images/gallery/index/index-banner1.jpg'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const count = ref(1)

const curPictureNum = Math.floor(Math.random() * (store.state.galleryTotal - 1)) + Number(1);
const curPictureUrl = new URL('/assets/images/gallery/index/index-banner' + curPictureNum + '.jpg', import.meta.url).href;

onMounted(() => {
  console.log('show gallery ele', $('.index-gallery'))
  $('.index-gallery').css('background-image', `url(${banner1})`)
})
</script>

<template>
  <div class="index-gallery">
    <div style="height: 20px"></div>
    <div class="center-con">
      <div class="title-big glitch" data-text="Hustle,Hustle!">Hustle,Hustle!</div>
    </div>
  </div>
  <div style="height: 40px;">fdsjfiods</div>
</template>

<style lang="scss" scoped>
</style>
