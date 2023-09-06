<template>
  <div class="work-container">
    <div v-for="({ title, range, specialty }, id) in info" :key="id" class="work-items">
      <div class="title">{{ title }}</div>
      <div class="specialty">{{ specialty }}</div>
      <div class="range">{{ range }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface WorkImp {
  range: string
  title: string
  specialty: string
}

const info = reactive<WorkImp[]>([
  {
    range: '2023-06至 2023-09',
    title: '福建大娱号信息股份有限公司',
    specialty: '前端开发工程师',
  },
  {
    range: '2022-06至2023-05',
    title: '思飞信息技术有限公司',
    specialty: '前端开发工程师',
  },
  {
    range: '2021-07至2021-12',
    title: '锐捷网络股份有限公司',
    specialty: '前端开发实习',
  },
])
</script>

<style scoped lang="scss">
.work {
  &-container {}

  &-items {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    @media screen and (max-width: 650px) {
      flex-direction: column;
      row-gap: 10px;
      align-items: center;
      padding-bottom: 6px;

      &:not(:last-child) {
        border-bottom: 2px solid #ccc;
      }
    }

    >div {
      flex: 1;

      &.title {
        font-weight: 600;
      }
    }
  }
}
</style>
