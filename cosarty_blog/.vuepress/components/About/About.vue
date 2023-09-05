<template>
  <div class="profile-wrapper">
    <div class="profile-header">个人简历</div>
    <Info />
    <Case>教育背景</Case>
    <Case>个人总结</Case>
    <Case>工作经历</Case>
    <Case>项目经历</Case>
  </div>
</template>

<script lang="ts" setup>


import Info from './components/Info.vue'
import Case from './components/Case.vue'
defineOptions({ name: 'About' })
</script>


<script setup>

</script>

<style lang="scss" scoped>
.profile {
  &-wrapper {
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 3px 5px #ccc, 0 -3px 5px #ccc, -3px 0 5px #ccc, 3px 0 5px #ccc;
    padding: 16px;

    @media screen and (max-width:650px) {
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
</style>