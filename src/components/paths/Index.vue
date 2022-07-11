<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import store from '~/assets/plugins/vuex/vuex'
// import $ from 'jquery'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const count = ref(1)

const curPictureNum = Math.floor(Math.random() * (store.state.galleryTotal - 1)) + Number(1);
const curPicture = `../../../assets/images/gallery/index-banner${curPictureNum}.jpg`
setTimeout(() => {
  console.log('show gallery ele', $('.index-gallery'))
  $('.index-gallery').css('background-image', `url(${curPicture})`)
}, 1000);
</script>

<template>
  <div class="index-gallery">
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
</template>

<style lang="scss" scoped>
</style>
