---
tag:
  - vite
  - vue3
category: 前端
date: 2023-01-07
---

# 搭建 vue3 企业级骨架

## 通过 Vite 安装 Vue3 项目

```bash
pnpm create vite
```

## 代码规范

随着团队的不断扩大，每个人都有自己的 coding 风格，但是如果一个项目中的代码存在多种风格，那对于代码的可维护性和可读性都大大减少，所以说一个项目规范对于前端团队来说的重要性。

### ESlint+Prettier

这两个工具一个是进行代码风格检查，另一个是格式化工具，现在我们开始配置。

第一步，安装相关依赖：

```bash
pnpm add eslint eslint-plugin-vue eslint-define-config --dev # eslink
pnpm add prettier eslint-plugin-prettier @vue/eslint-config-prettier --dev# prettire
pnpm add @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev # 对ts的支持
```

第二步，编写对应配置文件

`.eslintrc.js`

```ts
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  /* 指定如何解析语法。*/
  parser: 'vue-eslint-parser',
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser',
    //模块化方案
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    // 解决 defineProps and defineEmits generate no-undef warnings
    'vue/setup-compiler-macros': true,
  },
  // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {},
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则,
    'prettier',
    'plugin:prettier/recommended',
  ],
  // https://cn.eslint.org/docs/rules/
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    semi: 'off',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-explicit-any': 'off', // 可以使用 any 类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 解决使用 require() Require statement not part of import statement. 的问题
    '@typescript-eslint/no-var-requires': 0,
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-types.md
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // add a custom message to help explain why not to use it
          Foo: "Don't use Foo because it is unsafe",

          // add a custom message, AND tell the plugin how to fix it
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },

          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
    // 禁止出现未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'vue/html-indent': 'off',
    // 关闭此规则 使用 prettier 的格式化规则，
    'vue/max-attributes-per-line': ['off'],
    // 优先使用驼峰，element 组件除外
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['/^el-/', '/^router-/'],
        registeredComponentsOnly: false,
      },
    ],
    // 强制使用驼峰
    camelcase: ['error', { properties: 'always' }],
    // 优先使用 const
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
})
```

`.eslintignore`

```text
/node_modules/
/public/
.vscode
.idea
```

`.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 80,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### husky

`husky`是一个 Git Hook，可以帮助我们对`commit`前，`push`前以及`commit`提交的信息进行验证，现在我们就来安装并配置一下这个工具，首先通过自动配置命令安装，命令如下：

```bash
npx husky-init && pnpm i
npx husky-init && pnpm
```

执行完毕之后会在项目的根目录出现一个.husky 的目录，目录下有一个`pre-commit`文件，我们将 npm test 修改为我们需要执行的命令，示例代码如下：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint
```

最后我们配置一下`package.json`，示例代码如下：

```json
"scripts": {
  "lint": ""lint": "eslint src --fix --ext .js,.ts,.jsx,.tsx,.vue && prettier --write --ignore-unknown""
}
```

- `src`：要验证的目标文件夹；
- `--fix`：自动修复命令；
- `--ext`：指定检测文件的后缀。

现在我们进行`commit`之前会对代码进行检测并进行格式化。

### lint-staged

我们配置好了`husky`后，会出现一个问题，就是我们不管是改动一行还是两行都会对整个项目进行代码检查和格式化，我们可以通过 lint-staged 这个工具来实现只对 git 暂存区中的内容进行检查和格式化，配置步骤如下：

第一步，安装 lint-staged

```bash
pnpm add lint-staged --dev
```

第二步，配置`package.json`

```json
{
  "scripts": {},
  // 新增
  "lint-staged": {
    "*.{vue,js,ts,tsx,jsx}": [
      "eslint --fix",
      "prettier --write --ignore-unknown"
    ]
  }
}
```

第三步，修改`.husky/pre-commit`，修改内容如下：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### commit message 规范

优秀项目中 commit message 都是统一风格的，这样做的好处就是可以快速定位每次提交的内容，方便之后对版本进行控制。现在我们就来配置一下 commit message 规范。

#### 提交规范

1. 安装`commitizen`

```bash
pnpm add commitizen -D
```

2. 配置项目提交说明，这里我们使用`cz-conventional-changelog`，或者选择`cz-customizable`，我们先进行安装

```bash
pnpm add cz-conventional-changelog -D
```

3. 修改 package.json，代码如下：

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

4. 进行 commit，通过 cz 这个 cli 工具

```bash
pnpm cz # 或者 npx cz
```

第一步选择本次更新的类型，每个类型的作用如下表所示：

| Type     | 作用                                                        |
| -------- | ----------------------------------------------------------- |
| feat     | 新增特性                                                    |
| fix      | 修复 Bug                                                    |
| docs     | 修改文档                                                    |
| style    | 代码格式修改                                                |
| refactor | 代码重构                                                    |
| perf     | 改善性能                                                    |
| test     | 测试                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm等） |
| ci       | 更改持续集成软件的配置文件和`package.json`中的`scripts`命令 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                    |
| revert   | 代码回退                                                    |

第二步填写改变的作用域，可以写组件名或者文件名 第三步填写提交的信息 第四步填写提交的详细描述 第五步选择是否是一次重大的更改 第六步是否影响某个open issue 整个过程如下图

5. 我们也可以配置一个`script`，示例代码如下： `package.json`

```json
"scripts": {
  "commit": "cz"
}
```

#### message验证

现在我们定义了提交规范，但是并不能阻止不按照这个规范进行提交，这里我们通过`commitlint`配合`husky`来实现对提交信息的验证规则。

第一步，安装相关依赖

```bash
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

第二步，创建`commitlint.config.js`配置commitlint

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

第三步，使用`husky`生成`commit-msg`文件，验证提交信息

```bash
pnpm husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

到这，commitlint的配置就完成了，如果message编写不规范，则会阻止提交。

## 配置vite

### 别名配置

配置别名可以帮助我们快速的找到我们想要的组件、图片等内容，不用使用`../../../`的方式，首先配置`vite.config.ts`，通过`resolve.alias`的方式配置，示例代码如下：

```ts
import { resolve } from 'path'

export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        cpns: resolve(__dirname, 'src/components'),
      },
      extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    /* more config */
  }
})
```

这里配置两个两个别名，分别是`@`和`cpns`，然后配置`tsconfig.json`，允许别名在使用，代码如下：

```ts
"compilerOptions": {
  // 用于设置解析非相对模块名称的基本目录，相对模块不会受到baseUrl的影响
  "baseUrl": ".",
  "paths": {
    // 用于设置模块名到基于baseUrl的路径映射
    "@/*": [ "src/*" ],
    "cpns/*": [ "src/components/*" ]
  }
},
```

### 环境变量

#### .env文件

在Vite中通过.env开头的文件去读取配置，来作为环境变量，Vite默认允许我们使用以下文件：

```bash
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

这些文件是有优先级的，他们的优先级是`.env`<`.env.local`<`.env.[mode]`<`.env.[mode].local`；Vite中还预设了一些环境变量，这些的优先级是最高的，不会被覆盖，分别如下：

- `MODE: {string}`：应用运行的模式（开发环境下为`development`，生成环境为`production`）。
- `BASE_URL: {string}`：部署应用时的基本 URL。他由`base` 配置项决定。
- `PROD: {boolean}`：当前是否是生产环境。
- `DEV: {boolean}`：当前是否是开发环境 (永远与 `PROD`相反)。

这些环境变量Vite允许我们通过`import.meta.env`方式获取。

#### 定义环境变量

如果我么你想要自定义环境变量，就必须以`VITE_`开头，如果修改则需要通过[`envPrefix`](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vitejs.dev%2Fconfig%2Findex.html%23envprefix)[配置项](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vitejs.dev%2Fconfig%2Findex.html%23envprefix)，该配置项允许我们传入一个非空的字符串作为变量的前置。

```bash
.env
VITE_APP_API_BASE_URL=http://127.0.0.1:8080/
```

定义完成之后我们就可以在项目中通过`import.meta.env.VITE_APP_API_BASE_URL`的方式获取。

如果想要获得TypeScript的类型提示，需要在创建一个`src/env.d.ts`，示例代码如下：

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URL: string
  // 定义更多环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

#### 在vite.config.ts中获取环境变量

如果我们想要在`vite.config.ts`中获取环境变量，需要使用Vite提供的`loadEnv()`方法，该方法的定义如下：

```ts
function loadEnv(
  mode: string, 
  envDir: string, 
  prefixes?: string | string[]
): Record<string, string>
```

上面的三个参数的解释如下：

- `mode`：模式；
- `envDir`：环境变量配置文件所在目录；
- `prefixes`：【可选】接受的环境变量前缀，默认为`VITE_`。

了解了使用的API，在`vite.config.ts`中获取环境变量示例代码如下：

```ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import type { ConfigEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    /* more config */
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
```

## **项目依赖**

### 安装Element-plus

1. 安装Element-plus

   ```Bash
   pnpm add element-plus
   ```

2. Volar 支持 如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

   ```JSON
   // tsconfig.json
   {
     "compilerOptions": {
       // ...
       "types": ["element-plus/global"]
     }
   }
   ```

3. 按需导入 安装相关插件实现自动按需导入

```Bash
pnpm add unplugin-vue-components unplugin-auto-import -D
```

**`vite.config.js`**

```ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

### 自动导入

**`vite.config.js`**

```ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router'],
        dts: 'types/auto-imports.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        // directoryAsNamespace: true,
        dts: 'types/components.d.ts',
        // dirs: ['src/components'],
      }),
  ],
}
```

### Tailwind CSS

1. 安装

```Bash
yarn add tailwindcss postcss autoprefixer --dev
```

2. 初始化

```Bash
yarn tailwindcss init -p
```

3. 配置`tailwind.config.js`

```JavaScript
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // tree shaking
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],
}
```

4. 配置`postcss.config.js`

```JavaScript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

5. 引入Tailwind CSS `./src/index.css`

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. **`./src/main.ts`**

```ts

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
createApp(App).mount('#app')
```

### VueRouter

第一步，安装VueRouter

```Bash
yarn add vue-router@next
```

第二步，创建VueRouter入口文件

```ts
src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 配置路由信息
const routes: RouteRecordRaw[] = []

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
```

第三步，在`main.ts`中引入VueRouter

```TypeScript
import { createApp } from 'vue'
import App from './App.vue'
// 引入 vue-router
import router from './router'
import './assets/css/index.css'

createApp(App).use(router).mount('#app')
```

### pinia

第一步，安装pinia

```Bash
yarn add vuex@next
```

第二步，创建vuex入口文件

```ts
src/store/index.ts
import { createPinia } from 'pinia'

const store = createPinia()

export default store
```

第三步，在`main.ts`中引入pinia

```TypeScript
import { createApp } from 'vue'
import App from './App.vue'
// 引入 vue-router
import router from './router'
// 引入 vuex
import store from './store'
import './assets/css/index.css'

createApp(App).use(router).use(store).mount('#app')
```

第四步，创建测试数据

```ts
src/store/modules/count.ts
import { defineStore } from 'pinia'
import type { CountInterface } from './types'
export const useCountStore = defineStore({
  id: 'count', // id必填，且需要唯一
  // state
  state: (): CountInterface => {
    return {
      count: 0,
    }
  },
  // getters
  getters: {
    doubleCount: state => {
      return state.count * 2
    },
  },
  // actions
  actions: {
    // actions 同样支持异步写法
    countAdd() {
      // 可以通过 this 访问 state 中的内容
      this.count++
    },
    countReduce() {
      this.count--
    },
  },
})

```

**`src/store/modules/type.ts`**

```ts
export interface CountInterface {
  count: number
}
```



最后一步，为了方便导入，我们将所有内容统一在`src/store/index.ts`进行导入导出，代码如下：

```TypeScript
import { createPinia } from 'pinia'
import { useCountStore } from './modules/count'
const store = createPinia()

export default store
export { useCountStore }
```

### 封装Axios

Axios作为前端使用最高的HTTP请求库，周下载量已经达到了2000多万，在这个项目中我们也使用Axios，这里我们通过TS对Axios进行二次封装，方便我们在项目中使用。

**`src\service\index.ts`**

```ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const noon = <T>(res: T): T => res

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: <T = AxiosResponse>(config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}
// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
}
interface RequestData<T> extends RequestConfig {
  data?: T
}

export interface CancelRequestSource {
  [index: string]: () => void
}

class Request {
  /*
  存放取消方法的集合
  * 在创建请求后将取消请求方法 push 到该集合中
  * 封装一个方法，可以取消请求，传入 url: string|string[] 
  * 在请求之前判断同一URL是否存在，如果存在就取消请求
  */
  cancelRequestSourceList?: CancelRequestSource[]
  /*
  存放所有请求URL的集合
  * 请求之前需要将url push到该集合中
  * 请求完毕后将url从集合中删除
  * 添加在发送请求之前完成，删除在响应之后删除
  */
  requestUrlList?: string[]

  private instance: AxiosInstance
  private interceptorsObj: RequestInterceptors = {}
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    if (config?.interceptors) {
      this.interceptorsObj = config.interceptors
      // 使用全局拦截器
      this.useIntercepetor()
    }
  }
  useIntercepetor(
    instance = this.instance,
    interceptorsObj = this.interceptorsObj,
  ) {
    const {
      requestInterceptors = noon,
      requestInterceptorsCatch = noon,
      responseInterceptors = noon,
      responseInterceptorsCatch = noon,
    } = interceptorsObj

    instance.interceptors.request.use(
      requestInterceptors,
      requestInterceptorsCatch,
    )
    instance.interceptors.response.use(
      responseInterceptors,
      responseInterceptorsCatch,
    )
  }
  /**
   * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex(
      (item: CancelRequestSource) => {
        return Object.keys(item)[0] === url
      },
    ) as number
  }
  /**
   * @description: 删除 requestUrlList 和 cancelRequestSourceList
   * @param {string} url
   * @returns {*}
   */
  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex(u => u === url)
    const sourceIndex = this.getSourceIndex(url)
    // 删除url和cancel方法
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1)
    sourceIndex !== -1 &&
      this.cancelRequestSourceList?.splice(sourceIndex as number, 1)
  }
  // 取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach(source => {
      const key = Object.keys(source)[0]
      source[key]()
    })
  }
  // 取消请求
  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      // 取消单个请求
      const sourceIndex = this.getSourceIndex(url)
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]()
    } else {
      // 存在多个需要取消请求的地址
      url.forEach(u => {
        const sourceIndex = this.getSourceIndex(u)
        sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]()
      })
    }
  }

  // 设置请求
  async request<D = any, T = any>(
    config: RequestData<D>,
  ): Promise<ResponseData<T>> {
    const { method = 'GET' } = config
    if (method.toUpperCase() === 'GET') config.params = config.data
    const url = config.url
    // url存在保存取消请求方法和当前请求url
    if (url) {
      this.requestUrlList?.push(url)
      config.cancelToken = new axios.CancelToken(c => {
        this.cancelRequestSourceList?.push({
          [url]: c,
        })
      })
    }
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    const res = await this.instance.request<ResponseData<T>>(config)
    try {
      if (config.interceptors?.responseInterceptors) {
        return (await config.interceptors.responseInterceptors(res)) as any
      }
    } catch (error: any) {
      throw new Error(error)
    } finally {
      url && this.delUrl(url)
    }
    return res.data
  }
}
export default new Request({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_APP_API_BASE_URL
    : '/api',
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      console.log('实例请求拦截器')

      return config
    },
    // 响应拦截器
    responseInterceptors: result => {
      console.log('实例响应拦截器')
      return result
    },
  },
})

```

