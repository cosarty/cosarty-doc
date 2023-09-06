<template>
  <div class="educational-container">
    <div v-for="({ title, range, specialty }, id) in info" :key="id" class="educational-items">
      <div class="range">{{ range }}</div>
      <div class="title">{{ title }}</div>
      <div class="specialty">{{ specialty }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


interface EducationalImp {
  range: string,
  title: string,
  specialty: string
}

const info = reactive<EducationalImp[]>([{ range: '2018.09-2022.06', title: '福州大学至诚学院', specialty: '计算机科学与技术' }])
</script>

<style scoped lang="scss">
.educational {
  &-container {}

  &-items {
    display: flex;

    @media screen and (max-width:650px) {
      flex-direction: column;
      row-gap: 10px;
      align-items: center;
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