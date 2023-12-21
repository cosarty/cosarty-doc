<template></template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
defineOptions({ name: 'TailwindcssScript' })
onMounted(() => {
  const script = document.createElement('script')
  script.id = 'tailwindcss'
  script.src = '/tailwindcss.js'
  script.onload = () => {
    // 这边添加配置
    ;(window as any).tailwind.config = {
      darkMode: 'class',
    }
  }

  document.head.appendChild(script)
})

onUnmounted(() => {
  const tailwindcss = document.getElementById('tailwindcss')
  if (tailwindcss) tailwindcss.remove()
  location.reload()
})
</script>
