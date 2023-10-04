<template>
  <div class="profile-info">
    <div class="profile-content">
      <div
        class="profile-items"
        v-for="({ text, value }, key) in infoList"
        :key="key"
      >
        <div class="text">{{ text }}</div>
        ：
        <div class="value">
          <template v-if="!value.startsWith('http')">{{ value }}</template>
          <template v-else>
            <a :href="value" target="_blank">{{ value }}</a>
          </template>
        </div>
      </div>
    </div>
    <div class="profile-avatar">
      <img src="/46b9869c9c26891e.jpg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface ProFileInfoImp {
  name: string //姓名
  dateBirth: string //出生年月
  nation: string // 民族
  phone: string //手机
  email: string //邮箱
  institution: string //就读院校
  education: string //学历
  address: string //住址
  post: string //职位
  home: string // 主页
  github: string //
}

type ParcodeInfo<T extends Record<string, any>> = {
  [K in keyof T]: { text: string; value: T[K] }
}

const infoList = reactive<ParcodeInfo<ProFileInfoImp>>({
  name: {
    text: '姓名',
    value: 'cosarty',
  },
  dateBirth: {
    text: '出生年月',
    value: '2000.05',
  },
  nation: { text: '民族', value: '汉' },
  phone: { text: '手机', value: '181********' },
  email: {
    text: '邮箱',
    value: '139********@qq.com',
  },
  institution: {
    text: '就读院校',
    value: '福州大学至诚学院',
  },
  education: {
    text: '学历',
    value: '本科',
  },
  address: {
    text: '住址',
    value: '福建福州',
  },
  post: {
    text: '职位',
    value: '前端开发工程师',
  },
  home: {
    text: '主页',
    value: 'http://cosarty.cn',
  },
  github: {
    text: 'github首页',
    value: 'https://github.com/cosarty',
  },
})
</script>

<style lang="scss" scoped>
.profile {
  &-info {
    margin: 30px 0 0;
    display: flex;

    @media screen and (max-width: 650px) {
      flex-direction: column-reverse;
    }
  }

  &-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 300px;
    justify-content: space-between;
    row-gap: 13px;
    padding: 0 20px;

    @media screen and (max-width: 650px) {
      max-height: max-content;
      padding: 0 5px;
    }
  }

  &-items {
    display: flex;
    margin-top: -15px;

    .text {
      width: 90px;
      font-weight: 700;
      text-align: justify;

      &::after {
        content: '';
        display: inline-block;
        width: 100%;
        margin-top: -20px;
        height: 10px;
      }
    }

    .value {
      margin-left: 10px;
    }
  }

  &-avatar {
    width: 150px;
    height: 230px;
    // background-image: linear-gradient(to right, blue, yellow, pink);
    // background-image: linear-gradient(to right, blue, yellow, pink);
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    @media screen and (max-width: 650px) {
      align-self: center;
      margin-bottom: 25px;
    }
  }
}
</style>
