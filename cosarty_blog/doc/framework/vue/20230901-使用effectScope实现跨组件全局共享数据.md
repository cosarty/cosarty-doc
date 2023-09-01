---
description: '不为人知的effectScope'
tag:
  - vue3
  - 技巧
category:
  - 前端
date: 2023-09-01
---

# 使用 effectScope 实现跨组件全局共享数据

> 我们在学习的 vue3 的时候，总是有一个 api 被我们忽略，因为在实际业务中也很少有人去注意这么一个不起眼的 api，它就是`effectScope`，最近我在学习 vueuse 以及 pinia 的过程中发现，他们的源码里面大量的使用了`effectScope`这么一个 api，那么他的用处到底是什么？

同学们也可以自行去[官网](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)查看`effctScope的作用`

## 作用

在讲解`effectScoped`之前我们要知道 vue3 里面一个很重要的概念那就是`effect作用域`

每一个`effect`作用域其实就是用来管理副作用函数的一个区域,学过 vue3 的同学都知道 vue3 有一个`setup`选项，其实这个`setup`选项就是一个`effect`作用域，当组件销毁的时候 vue 会自动清空整个组件所收集的副作用函数，或者我们可以通过`getCurrentScope`来手动清空副作用函数，当一个 effect 作用域下面的所有副作用函数都被清空的时候会就会调用`onScopeDispose`这个回调函数

例如：

:::info 测试
首先我们在代码里面引入了`onScopeDispose`用来获取当前所在的 `effect` 作用域，然后当我们点击停止的时候，它会清空我们当前 `effect` 作用域下面所收集的所有副作用依赖，我们点击了停止之后会发现页面无法响应式更新了，这是因为依赖收集被清空了,最后触发了`onScopeDispose`回调相应
:::

::: vue-playground EffectScopeVue

@file EffectScopeVue.vue

```vue
<template>
  <div>
    <input v-model="txt1" />
    <button @click="curretnScope.stop()">停止</button>
    <div>回显2：{{ txt2 }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentScope,
  onScopeDispose,
  ref,
  watch,
  getCurrentInstance,
} from 'vue'

const txt1 = ref('')
const txt2 = ref('')

const proxy = getCurrentInstance()
console.log('proxy: ', proxy)

watch(txt1, (nx) => {
  txt2.value = nx
})

const curretnScope = getCurrentScope()!

onScopeDispose(() => {
  console.log('我没有副作用依赖啦')
})
</script>
```

:::

> 由上面案例我们可以得知，组件销毁的时候会自动清空 effect 作用域，但是 effect 作用域清空，组件未必销毁

## effectScope

首先我们来认识一下`effectScope`这个 api，从上面我们知道了组件创建之后会有一个默认的 effect 作用域就是`setup`，而`effextScope`这个函数就是可以让我们手动创建一个 effect 作用域，由我们手动控制它的依赖收集关系

API

- effectScope(detached = false): EffectScope

```ts
interface EffectScope {
  run<T>(fn: () => T): T | undefined // undefined if scope is inactive
  stop(): void
}
```

- getCurrentScope(): EffectScope | undefined

- onScopeDispose(fn: () => void): void

**基本用法**

```ts
// 创建一个作用域
const scope = effectScope()
```

一个作用域可以运行一个函数，并捕获在函数同步执行期间创建的所有效果，包括任何在内部创建效果的 API，例如： `computed` 、 `watch` 和 `watchEffect` ：

```ts
scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

// the same scope can run multiple times
scope.run(() => {
  watch(counter, () => {
    /*...*/
  })
})
```

**嵌套作用域**

正常情况下面父作用域被释放的时候子作用域也会跟着释放，而`effectScope`函数提供了一个参数，这个参数可以控制我们的子作用域是否会受到夫作用域的影响

```ts
// with the detected flag,
// the scope will not be collected and disposed by the outer scope
nestedScope = effectScope(true /* detached */)
```

## 功能用例

### 1.共享公共 hook

某些组合设置全局副作用。例如，下面的 useMouse() 函数：

```ts
function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function handler(e) {
    x.value = e.x
    y.value = e.y
  }

  window.addEventListener('mousemove', handler)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handler)
  })

  return { x, y }
}
```

如果在多个组件中调用 `useMouse()` ，则每个组件将附加一个 `mousemove` 侦听器，并创建自己的 `x` 和 `y` 引用副本。我们应该能够通过在多个组件之间共享相同的侦听器和引用集来使其更有效，但是我们不能这样做，因为每个 `onUnmounted` 调用都耦合到单个组件实例。

我们可以使用分离的作用域和 `onScopeDispose` 来实现这一点。首先，我们需要将 `onUnmounted` 替换为 `onScopeDispose` ：

```ts
onScopeDispose(() => {
  window.removeEventListener('mousemove', handler)
})
```

然后，我们可以创建一个管理父作用域订阅的实用函数：

```ts
function createSharedComposable(composable) {
  let subscribers = 0
  let state, scope

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = null
    }
  }

  return (...args) => {
    subscribers++
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    onScopeDispose(dispose)
    return state
  }
}
```

现在我们可以创建一个共享版本 useMouse ：

```ts
const useSharedMouse = createSharedComposable(useMouse)
```

不管有多少组件在使用，新的 useSharedMouse composable 将只设置一次监听器，当没有组件在使用它时会删除监听器。事实上， useMouse 函数应该首先是一个共享的组合函数！

### 2.局部范围控制

```ts
export default {
  setup() {
    const enabled = ref(false)
    let mouseState, mouseScope

    const dispose = () => {
      mouseScope && mouseScope.stop()
      mouseState = null
    }

    watch(
      enabled,
      () => {
        if (enabled.value) {
          mouseScope = effectScope()
          mouseState = mouseScope.run(() => useMouse())
        } else {
          dispose()
        }
      },
      { immediate: true }
    )

    onScopeDispose(dispose)
  },
}
```

在上面的例子中，我们会动态地创建和处置一些作用域， onScopeDispose 允许 useMouse 正确地进行清理，而 onUnmounted 在这个过程中永远不会被调用。

### 3.全局数据共享

- useMyGlobalState.ts 

```ts
import { effectScope } from 'vue'

const useMyGlobalState = <
  T extends (...args: any) => any,
  P extends Parameters<T>
>(
  fn: T
) => {
  let initialized = false
  let state: any
  let scope = effectScope(true)

  return ((...arg: P) => {
    if (!initialized) {
      state = scope.run(() => fn(...(arg as any[])))
      initialized = true
    }

    return state
  }) as T
}

export { useMyGlobalState }
```

- store.ts

```ts
import { useMyGlobalState as createGlobalState } from './useMyGlobalState.ts'
import { ref } from 'vue'

export const useMyGlobalState = createGlobalState((a: number = 0) => {
  const count = ref(a)
  return { count }
})
```

::: vue-playground 全局共享



@file index.vue

```vue
<template>
  <div>
    <UseGlobalState />
    <Test />
  </div>
</template>

<script setup lang="ts">
import UseGlobalState from './useGlobalState.vue'
import Test from './Test.vue'
</script>

<style scoped></style>
```

@file useGlobalState.vue

```vue
<template>
  <div>
    <button @click="count++">＋1</button>
  </div>
</template>

<script setup lang="ts">
import { useMyGlobalState } from './store.ts'
const { count } = useMyGlobalState()
</script>

<style lang="scss" scoped></style>
```

@file Test.vue

```vue
<template>
  <div>
    {{ count }}
  </div>
</template>

<script setup lang="ts">
import { useMyGlobalState } from './store.ts'

const { count } = useMyGlobalState()
</script>

<style scoped></style>
```

@file store.ts

```ts
import { useMyGlobalState as createGlobalState } from './useMyGlobalState.ts'
import { ref } from 'vue'

export const useMyGlobalState = createGlobalState((a: number = 0) => {
  const count = ref(a)
  return { count }
})
```

@file useMyGlobalState.ts

```ts
import { effectScope } from 'vue'

const useMyGlobalState = <
  T extends (...args: any) => any,
  P extends Parameters<T>
>(
  fn: T
) => {
  let initialized = false
  let state: any
  let scope = effectScope(true)

  return ((...arg: P) => {
    if (!initialized) {
      state = scope.run(() => fn(...(arg as any[])))
      initialized = true
    }

    return state
  }) as T
}

export { useMyGlobalState }
```

:::
