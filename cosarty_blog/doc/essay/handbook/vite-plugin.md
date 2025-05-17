# vite 常用插件

## @vitejs/plugin-legacy

- vue3 语法向下兼容

```bash
yarn add @vitejs/plugin-legacy -D
```

- 使用

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['chrome 52'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    }
  ],
  build: {
    target: 'es2015'
  }
})
```

## vite-plugin-vue-setup-extend

- 优雅使用组件名

```bash
yarn add vite-plugin-vue-setup-extend -D
```

- 使用

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig({
  plugins: [VueSetupExtend()],
});
```

```vue
<script lang="ts" setup name="firstPage">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('mounted');
});
</script>
```

## rollup-plugin-visualizer

- 构建分析工具

```bash
yarn add vrollup-plugin-visualizer -D
```

- 使用

```ts
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      emitFile: false,
      file: 'stats.html', //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
  ],
});
```

## vite-plugin-cdn-import

cdn 引入

```bash
yarn add vite-plugin-cdn-import -D
```

- 使用

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { autoComplete, Plugin as importToCDN } from 'vite-plugin-cdn-import';

export default defineConfig({
  plugins: [vue(),
   importToCDN({
    prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
    modules: [
      autoComplete('vue'),
      autoComplete('axios'),
      {
        name: 'element-plus',
        var: 'ElementPlus', //根据main.js中定义的来
        version: '2.2.17',
        path: 'dist/index.full.js',
        css: 'dist/index.css'
      },
      {
        name: 'vue-demi',
        var: 'VueDemi', //根据main.js中定义的来
        version: '0.13.11',
        path: 'lib/index.iife.js'
      },
      {
        name: '@element-plus/icons-vue',
        var: 'ElementPlusIconsVue', //根据main.js中定义的来
        version: '2.0.9',
        path: 'dist/index.iife.min.js'
      },
      {
        name: 'bootstrap',
        var: 'bootStrap', //根据main.js中定义的来
        version: '5.2.1',
        path: 'dist/js/bootstrap.js',
        css: 'dist/css/bootstrap.min.css'
      },
    ],
  })
],
)}
```

## vite-plugin-compression

```bash
yarn add vite-plugin-compression -D
```

- 使用

```ts
import viteCompression from 'vite-plugin-compression';
export default defineConfig({
  plugins: [vue(), viteCompression({
    verbose: true, //是否在控制台输出压缩结果
    disable: false, //是否禁用,相当于开关在这里
    threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
    algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
    ext: '.gz', //文件后缀
    )}
 ]
)}

```

## 打包优化

```ts
import viteCompression from 'vite-plugin-compression';
export default defineConfig({
  plugins: [vue(), viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  }),
  build: {
    outDir: 'mh', //输出目录名
    minify: "terser", //压缩方式
    terserOptions: {
      compress: {
        drop_console: true, //剔除console,和debugger
        drop_debugger: true,
      },
    },
    // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
    rollupOptions: {
      output: { //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})

```

## unplugin-vue-components

- 组件自动按需导入。

```bash
npm i unplugin-vue-components -D
```

- 使用

```ts
import Components from 'unplugin-vue-components/vite';
// ui库解析器，也可以自定义，需要安装相关UI库，unplugin-vue-components/resolvers
// 提供了以下集中解析器，使用的时候，需要安装对应的UI库，这里以vant示例
// 注释的是包含的其他一些常用组件库，供参考
import {
  // ElementPlusResolver,
  // AntDesignVueResolver,
  VantResolver,
  // HeadlessUiResolver,
  // ElementUiResolver
} from 'unplugin-vue-components/resolvers';

export default ({ mode }) =>
  defineConfig({
    plugins: [
      Components({
        dirs: ['src/components'], // 目标文件夹
        extensions: ['vue', 'jsx'], // 文件类型
        dts: 'src/components.d.ts', // 输出文件，里面都是一些import的组件键值对
        // ui库解析器，也可以自定义，需要安装相关UI库
        resolvers: [
          VantResolver(),
          // ElementPlusResolver(),
          // AntDesignVueResolver(),
          // HeadlessUiResolver(),
          // ElementUiResolver()
        ],
      }),
    ],
  });
```

## vite-plugin-style-import

当你使用 unplugin-vue-components 来引入 ui 库的时候，message, notification，toast 等引入样式不生效。

安装：

```bash
npm i vite-plugin-style-import -D
```

```ts
import styleImport, {
  // AndDesignVueResolve,
  VantResolve,
  // ElementPlusResolve,
  // NutuiResolve,
  // AntdResolve
} from 'vite-plugin-style-import';

export default ({ mode }) =>
  defineConfig({
    plugins: [
      styleImport({
        resolves: [
          // AndDesignVueResolve(),
          VantResolve(),
          // ElementPlusResolve(),
          // NutuiResolve(),
          // AntdResolve()
        ],
      }),
    ],
  });
```

## unplugin-auto-import

支持 vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core 等自动引入

- 安装

```bash
npm i unplugin-auto-import -D
```

```ts
import AutoImport from 'unplugin-auto-import/vite';
export default ({ mode }) =>
  defineConfig({
    plugins: [
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: 'src/auto-import.d.ts',
      }),
    ],
  });
```

## vite-plugin-imagemin

打包压缩图片

- 安装

```bash
npm i vite-plugin-imagemin -D
```

```ts
import { defineConfig, loadEnv } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
export default ({ mode }) =>
  defineConfig({
    plugins: [
      viteImagemin({
        gifsicle: {
          // gif图片压缩
          optimizationLevel: 3, // 选择1到3之间的优化级别
          interlaced: false, // 隔行扫描gif进行渐进式渲染
          // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
        },
        optipng: {
          // png
          optimizationLevel: 7, // 选择0到7之间的优化级别
        },
        mozjpeg: {
          // jpeg
          quality: 20, // 压缩质量，范围从0(最差)到100(最佳)。
        },
        pngquant: {
          // png
          quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
          speed: 4, // 压缩速度，1(强力)到11(最快)
        },
        svgo: {
          // svg压缩
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
    ],
  });
```

## vite-plugin-cp

复制文件

- 安装

```bash
npm i vite-plugin-cp -D
```

```ts
import cp from 'vite-plugin-cp';

export default defineConfig({
  plugins: [
    cp({
      targets: [
        {
          src: '../../node_modules/three/build/three.min.js',
          dest: './dist',
        },
      ],
    }),
  ],
});
```

## vite-plugin-restart

自动重启

- 安装

最常用的场景就是监听 vite.config.js 和 .env.development 文件，我们知道，修改 vite 配置文件和环境配置文件，是需要重启 vite 才会生效，通过这个插件，我们将从反复重启中解脱出来

```bash
npm i vite-plugin-restart -D
```

```ts
import ViteRestart from 'vite-plugin-restart';
export default {
  plugins: [
    ViteRestart({
      restart: ['my.config.[jt]s'],
    }),
  ],
};
```


## vite-plugin-html

- 一个针对 index.html，提供压缩和基于 ejs 模板功能的 vite 插件

- 安装

```bash
npm i vite-plugin-html -D
```

```ts
import { defineConfig,loadEnv} from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
export default  ({ mode }) => defineConfig({
    // mode 环境变量名，若配置有.env.test，启动时 --mode test，这里的mode就是test
  plugins: [
    createHtmlPlugin({
      minify: true,
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry: '/src/main.ts',
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          // 查找.env.test文件里面的VITE_PROJECT_TITLE，请以VITE_标识开头
          title: loadEnv(mode, process.cwd()).VITE_PROJECT_TITLE, 
          injectScript: `<script src="/inject.js"></script>`,
        },
      },
    })
  ]
})
```
