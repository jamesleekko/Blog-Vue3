<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const count = ref(1)
</script>

<template>
  <router-view>
  </router-view>
</template>

<style lang="scss" scoped>
</style>
