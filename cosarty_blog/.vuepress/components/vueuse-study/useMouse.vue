<template>
  <div>
    {{ x }} --- {{ y }}
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'


const { x, y } = useMouse()
</script>

<style scoped></style>