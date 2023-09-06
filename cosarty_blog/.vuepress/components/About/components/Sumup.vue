<template>
  <div class="sumup-container">
    <div class="sumup-items" v-for="(text, key) in list" :key="key">
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const list = reactive([
  '熟练掌握前端基础（JavaScript、CSS3、HTML5），能够快速实现Web端和移动端页面搭建。',
  '有扎实的JavaScript基本功，熟练掌握ES6语法。了解前端模块化规范（AMD、CMD、ES Modules）。',
  '熟悉数据结构，有良好的模块化开发思维。对http协议有一定的理解。',
  '熟练使用 Vue2 & Vue3 框架以及相关生态技术（ElementUI，vant，pinia），能够独立完成项目搭建和项目部署，熟悉框架部分原理。',
  '熟悉React框架的基本使用，有使用antd和umi开发的的实际项目使用经验。',
  '对前端工程模块化有一定理解，熟悉webpack、vite等打包工具及其日常开发配置，可以做到从0到1独立搭建项目，并优化构建流程。',
  '熟练使用TypeScript，有Typescript的实际项目使用经验。',
  '能够使用nodejs搭建服务端应用，熟练使用nestjs，express等服务端框架。',
  '有小程序开发以及上线经验，熟练使用 uniapp  生态。',
  '熟悉 npm 发包流程，以及 monorepo 的使用。',
])
</script>

<style lang="scss" scoped>
.sumup-container {
  .sumup-items {
    display: flex;
    align-items: start;
    font-size: 14px;

    &::before {
      content: '';
      display: block;
      width: 10px;
      min-width: 10px;
      height: 10px;
      border-radius: 100%;
      background-color: #d9d9d9;
      margin: 4px 14px 0;
      flex-shrink: 1;
      @media screen and (max-width:650px) {
        margin: 4px 8px 0;
        
      }

    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
