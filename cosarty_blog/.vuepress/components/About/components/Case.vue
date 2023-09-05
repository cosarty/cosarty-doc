<template>
  <div class="profile-case">
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.profile-case {
  background-color: #d9d9d9;
  margin-bottom: 12px;

  .title {
    padding: 11px 15px;
    background-color: #414141;
    width: max-content;
    color: white;
    font-weight: 500;
    letter-spacing: 3px;
  }
}
</style>