<script setup>
import { ref, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()

function goIndex() {
  router.push('/index')
}

function goAboutMe() {
  router.push('/aboutme')
}

const scrollTop = ref(0)

onMounted(() => {
  handleScroll()
})

function handleScroll() {
  window.addEventListener('scroll', () => {
    scrollTop.value = window.scrollY;
  });
}

</script>

<template>
  <div class="header-con" :class="{onTop: scrollTop}">
    <div class="header-left">

    </div>
    <div class="header-tabs">
      <div class="header-tabs-item" @click="goIndex()">
        <font-awesome-icon icon="fa-solid fa-monument" /> 首页
      </div>
      <div class="header-tabs-item" @click="">
        <font-awesome-icon icon="fa-solid fa-box-archive" /> 归档
      </div>
      <div class="header-tabs-item" @click="">
        <font-awesome-icon icon="fa-solid fa-wand-magic-sparkles" /> 留言板
      </div>
      <div class="header-tabs-item" @click="goAboutMe()">
        <font-awesome-icon icon="fa-solid fa-user-astronaut" /> 关于
      </div>
    </div>
    <div class="header-right">

    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
