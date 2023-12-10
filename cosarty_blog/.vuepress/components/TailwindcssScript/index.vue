<template>

</template>

<script  lang="ts" setup>
import { onMounted,onUnmounted } from 'vue';
defineOptions({ name: 'TailwindcssScript' })
onMounted(() => {
  const script = document.createElement('script')
  script.id = 'tailwindcss'
  script.src = '/tailwindcss.js'
  script.onload = ()=>{
    console.log('tailwindcss.js挂载完成完成')
  }

  document.head.appendChild(script)
})

onUnmounted(() => {
  const tailwindcss = document.getElementById('tailwindcss')
  if (tailwindcss) tailwindcss.remove()
  location.reload()
})
</script>
