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
    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Documentation
      </a>

      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>

    <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
    <el-progress :percentage="count * 10" />
    <el-button type="primary" @click="store.commit('increment')">vuex count is: {{ store.state.count }}</el-button>
    <el-progress :percentage="store.state.count * 10" />
    <el-button type="primary" @click="toggleDark()">开关灯</el-button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </div>
  <div style="height: 40px;">fdsjfiods</div>
</template>

<style lang="scss" scoped>
</style>
