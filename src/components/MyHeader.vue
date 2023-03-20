<script setup>
import { ref, onMounted, getCurrentInstance, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Check, Close } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '~/assets/plugins/pinia/global-store'

const headerHeight = 54
const { proxy } = getCurrentInstance()
// const toggleDark = useToggle(isDark)
const router = useRouter()
const store = useGlobalStore()

const isDark = useDark()
const isDarkTheme = ref(isDark)
watch(isDarkTheme, (val) => {
  useToggle(val)
})

function goIndex() {
  router.push('/index')
}

function goAboutMe() {
  router.push('/aboutme')
}

const scrollTop = ref(0)
function handleScroll() {
  window.addEventListener('scroll', () => {
    scrollTop.value = window.scrollY;
  });
}

function setAnimations() {
  const index = document.querySelector('#tab-index')
  index.addEventListener('mouseover', () => {
    proxy.$animate('.fa-monument', 'heartBeat')
  })
  index.addEventListener('mouseout', () => {
    proxy.$stopAnimate('.fa-monument', 'heartBeat')
  })

  const category = document.querySelector('#tab-category')
  category.addEventListener('mouseover', () => {
    proxy.$animate('.fa-box-archive', 'swing')
  })
  category.addEventListener('mouseout', () => {
    proxy.$stopAnimate('.fa-box-archive', 'swing')
  })

  const message = document.querySelector('#tab-message')
  message.addEventListener('mouseover', () => {
    proxy.$animate('.fa-wand-magic-sparkles', 'tada')
  })
  message.addEventListener('mouseout', () => {
    proxy.$stopAnimate('.fa-wand-magic-sparkles', 'tada')
  })

  const aboutme = document.querySelector('#tab-aboutme')
  aboutme.addEventListener('mouseover', () => {
    proxy.$animate('.fa-user-astronaut', 'heartBeat')
  })
  aboutme.addEventListener('mouseout', () => {
    proxy.$stopAnimate('.fa-user-astronaut', 'heartBeat')
  })
}

onMounted(() => {
  handleScroll()
  setAnimations()
})

</script>

<template>
  <div class="header-con" :class="{ onTop: scrollTop }">
    <div class="header-left">

    </div>

    <div class="header-tabs">
      <div class="header-tabs-item" id="tab-index" @click="goIndex()">
        <font-awesome-icon icon="fa-solid fa-monument" /> 首页
      </div>
      <div class="header-tabs-item" id="tab-category" @click="">
        <font-awesome-icon icon="fa-solid fa-box-archive" /> 归档
      </div>
      <div class="header-tabs-item" id="tab-message" @click="">
        <font-awesome-icon icon="fa-solid fa-wand-magic-sparkles" /> 留言板
      </div>
      <div class="header-tabs-item" id="tab-aboutme" @click="goAboutMe()">
        <font-awesome-icon icon="fa-solid fa-user-astronaut" /> 关于
      </div>
    </div>

    <div class="header-right">
      <el-switch class="header-switch" v-model="isDarkTheme" inline-prompt :active-icon="Check" :inactive-icon="Close"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .header-switch {
    height: v-bind('headerHeight')px;
  }
</style>
