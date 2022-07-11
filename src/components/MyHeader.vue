<script setup>
import { ref } from 'vue'
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

</script>

<template>
<div class="header-con">
  <div class="header-left">

  </div>
  <div class="header-tabs">
    <div class="header-tabs-item" @click="goIndex()">
      首页
    </div>
    <div class="header-tabs-item" @click="">
      归档
    </div>
    <div class="header-tabs-item" @click="goAboutMe()">
      关于
    </div>
  </div>
  <div class="header-right">
    
  </div>
</div>
</template>

<style lang="scss" scoped>
</style>
