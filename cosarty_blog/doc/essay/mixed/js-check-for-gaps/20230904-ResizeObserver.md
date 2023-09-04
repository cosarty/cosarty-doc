---
description: 学习ResizeObserver的使用
tag:
  - js
category:
  - 前端
date: 2023-09-04
---

# ResizeObserver使用总结



## 使用说明

`ResizeObserver`的作用主要是用来监听DOM元素的尺寸变化，在这个API还没有诞生时，通常需要通过CSS媒体查询，或者通过window上的resize事件间接监听整个视窗的变化。

但在有些情况下，视窗尺寸的改变不一定导致监测元素尺寸的变化，或者，监测元素尺寸的变化并不由视窗尺寸元素的变化导致。例如，自身支持resize的元素在响应式布局中影响其他元素，支持动态增删改的列表也会导致父元素的尺寸变化。这种时候，监听视窗的尺寸变化，不仅浪费性能，还有可能起不到想要的监听效果。

`ResizeObserver`可以做到，不管什么层级的DOM元素，调用它的observer方法，即可精准监听尺寸变化。不用再去憨憨地监听整个视窗的变化了。

同时，这也是一种无侵入的观察方式，可以在完全不影响目标元素业务逻辑的同时，嵌入需要响应变化的功能逻辑，例如发送埋点数据。减轻了开发者的心智负担和维护成本。

## 基本使用

`ResizeObserver`本身是一个构造函数，通过调用它创建一个实例。

同时需要传给它一个callback，在callback中写好当目标元素尺寸发生变化时，需要相响应的逻辑。

callback本身接收一个变化对象数组参数，每个对象中包含了尺寸变化的相关信息。

```js
const observer = new ResizeObserver(callback);

function callback(entries){
    for(const entry of entries){
        const rect = entry.contentRect;
        // ...
    }
}

```

其中，`entry.contentRect`返回的是一个DOMRect对象，其中包含了目标元素的x, y, width, height, top, bottom, left, right等属性。

`ResizeObserver`有三个方法，`observe()`,`unobserve()`,`disconnect()`,分别对应了开始监听，结束监听，以及取消所有对目标元素的的监听。

```js
// 获取目标元素
const ele = document.getElementsByClassName('list-item');
// 开始监听
observer.observe(ele);
// 结束监听
observer.unobserve(ele);
// 取消监听所有目标元素
observer.disconnect();
```

`entry` 中包括以下五个属性：

- `borderBoxSize`： 监听元素的 `borderBox` 尺寸
- `contentBoxSize`： 监听元素的 `contentBox` 尺寸
- `devicePixelContentBoxSize`： 监听元素的 `contentBox` 尺寸，不过是设备像素维度，而不是展示维度
- `contentRect`： 监听元素的 `contentRect` 信息，同 `getClientRects`
- `target`： `entry` 所属的监听元素

`borderBox` 和 `contentBox` 就是我们常说的 `CSS` 盒模型中的 `borderBox` 和 `contentBox`，`entry` 中的 `borderBoxSize` 和 `contentBoxSize` 中包含两个属性：`blockSize` 和 `inlineSize`，这两个属性的值与页面元素的 `writing-mode` 相关，默认情况下 `blockSize` 为纵向尺寸一般为高度，`inlineSize` 为横向尺寸一般为宽度。而当书写模式为纵向时，`blockSize`、`inlineSize` 的纵横向关系会调换。

而 `devicePixelContentBoxSize` 则和设备像素比相关，在移动设备或是高分辨率屏幕中会与 `CSS` 像素存在差异。

## 全局唯一实例的性能优化

其实，`ResizeObserver`的诞生，相较于`MutationObserver`以及传统的`resize`事件，本身就是高效的尺寸变化监测。它的精准性避免了很多不必要的性能开销。

但在最近的一个项目中，由于业务需求，需要通过`ResizeObserver`监听动态列表项高度，将它加在了一个长列表的每一项。由于每一项都是一个单独的组件，每个组件都拥有自己的 `ResizeObserver` 实例，这意味着浏览器会为每个实例分配内存和处理事件。当页面上有大量组件时，会对性能产生相当程度的影响。

细心的读者应该发现了，每个`ResizeObserver`实例是可以同时监听多个目标元素的，那么借鉴单例模式的思想，尝试封装一个全局的`ResizeObserver`，限制整个项目只有一个实例。在需要调用的地方直接`GlobalResizeObserver.observe()`!话不多说，上代码：

下面我们就来封装一个全局公共的`ResizeObserver`hook

### useResizeObserver

```ts
/**
 * @param target - 监听的目标元素
 * @param callback - 回调函数
 * @param options - 选项
 */

import {
  ComponentPublicInstance,
  Ref,
  computed,
  toValue,
  watch,
  getCurrentScope,
  onScopeDispose,
} from 'vue'

type MybeElementRef =
  | HTMLElement
  | Ref<HTMLElement | undefined>
  | ComponentPublicInstance

const useSupported = (key: keyof typeof window) =>
  typeof window !== 'undefined' && key in window

const useResizeObserver = (
  target: MybeElementRef | MybeElementRef[],
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = {}
) => {
  // 判断一下是否支持的resizeObserver
  const isSupported = useSupported('ResizeObserver')

  const scope = getCurrentScope()
  let observer: ResizeObserver | undefined

  const unrefElemnt = (target: MybeElementRef): HTMLElement => {
    const el = toValue(target)
    return (el as ComponentPublicInstance)?.$el ?? el
  }
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const targets = computed(() =>
    Array.isArray(target)
      ? target.map((el) => unrefElemnt(el))
      : [unrefElemnt(target)]
  )

  // 监听数组变化然后重新监听
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup()
      if (isSupported) {
        observer = new ResizeObserver(callback)
        for (const _el of els) {
          _el && observer!.observe(_el, options)
        }
      }
    },
    { immediate: true, flush: 'post', deep: true }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  if (scope) {
    onScopeDispose(stop)
  }
}

export { useResizeObserver }
```

### 使用

```vue
<template>
  <div class="container">
    <div ref="el" class="box">测试</div>
    <div ref="el2" class="box2">测试2</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useResizeObserver } from './useResizeObserver'


const el = ref<HTMLDivElement>()
const el2 = ref<HTMLDivElement>()

useResizeObserver([el, el2], (entry) => {
  console.log('entry: ', entry);
})

</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  height: 100vh;
  .box,
  .box2 {
    width: 300px;
    height: 300px;
    resize: both;
    margin: auto 0;
    border: 1px solid #ccc;
    overflow: auto;
  }
  .box2 {
    margin: auto 12px;
  }
}
</style>
```

