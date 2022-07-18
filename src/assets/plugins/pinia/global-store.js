import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalStore', () => {
  const isDark = useDark()
  function toggleDark() {
    useToggle(isDark)
  }

  const totalGallery = 1

  return { isDark, toggleDark, totalGallery }
})