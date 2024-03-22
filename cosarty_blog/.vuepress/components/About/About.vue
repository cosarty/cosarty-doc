<template>
  <div class="profile-wrapper">
    <div class="profile-header">个人简历</div>
    <Info />
    <Case>教育背景 </Case>
    <Educational class="mb-15" />
    <Case>个人总结</Case>
    <Sumup class="mb-15" />
    <Case>工作经历</Case>
    <Work class="mb-15" />
    <Case>项目经历</Case>
    <Project class="mb-15" />
  </div>
</template>

<script lang="ts" setup>
import Info from './components/Info.vue'
import Case from './components/Case.vue'
import Educational from './components/Educational.vue'
import Sumup from './components/Sumup.vue'
import Work from './components/Work.vue'
import Project from './components/Project.vue'
defineOptions({ name: 'About' })
</script>

<script setup></script>

<style lang="scss" scoped>
.profile {
  &-wrapper {
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 3px 5px #ccc, 0 -3px 5px #ccc, -3px 0 5px #ccc, 3px 0 5px #ccc;
    padding: 16px;
    overflow: hidden;
    @media screen and (max-width: 650px) {
      padding: 6px;
    }
  }

  &-header {
    background: #d9d9d9;
    text-align: center;
    font-size: 30px;
    line-height: 2.1;
    font-weight: 700;
  }
}

.mb-15 {
  margin-bottom: 15px;
}
</style>
