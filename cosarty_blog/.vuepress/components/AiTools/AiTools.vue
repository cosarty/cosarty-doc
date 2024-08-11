<template>
  <div class="">
    <div v-for="(value, key) in aiConfig" :key="key" class="flex flex-col">
      <div
        class="text-3xl font-bold text-gray-500 py-[20px] mb-[20px] border-0 border-b-2 border-gray-400 border-solid"
      >
        {{ value.label }}
      </div>
      <div class="flex flex-wrap gap-[20px]">
        <div
          v-for="item in value.items"
          :key="item.link"
          class="flex cursor-pointer flex-col items-center shadow-md p-[10px] rounded-md hover:shadow-2xl"
        >
          <img :src="item.icon" class="w-14 h-14 object-contain" />
          <div
            class="text-sm w-14 text-nowrap text-ellipsis overflow-hidden text-center mt-1"
            @click="openHandler(item.link)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import aiConfig from './ai.config';
defineOptions({ name: 'AiTools' });

const openHandler = (link: string) => {
  window.open(link);
};
</script>

<style scoped></style>
