# 安装

:::tip
tailwind 是一个`css`的`工具库`,包含了大量的样式`工具类`,可以直接组合书写在 html 代码上
:::

::: tabs

@tab cli

- 安装 tailwindcss CSS

通过 pnpm 安装`tailwindcss`，然后创建`tailwind.config.js`配置文件’

```shell
  pnpm add -D tailwindcss
  npx tailwindcss init
```

- 配置模板文件的路径

在 `tailwind.config.js` 配置文件中添加所有模板文件的路径

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- 将加载 Tailwind 的指令添加到你的 CSS 文件中

在你的主 CSS 文件中通过 `@tailwind` 指令添加每一个 Tailwind 功能模块。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- 开启 Tailwind CLI 构建流程

```shell
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

- 在你的 HTML 代码中使用 Tailwind 吧

```html{6,9-11}
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/dist/output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

@tab postcss

> 将 Tailwind CSS 安装为 PostCSS 插件是将其与 webpack，Rollup，Vite 和 Parcel 等构建工具集成的最无缝方式。

- 通过 pnpm 安装`tailwindcss`，然后创建`tailwind.config.js`配置文件’

```shell
  pnpm add -D tailwindcss postcss autoprefixer
  npx tailwindcss init
```

- 将 Tailwind 添加到 PostCSS 配置中

将 tailwindcss 和 autoprefixer 添加到你的 postcss.config.js 文件中，或者在你的项目中配置了 PostCSS 的任何地方。

```js{3,4}
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- 配置模板路径
  将路径添加到 tailwind.config.js 文件中的所有模板文件。

```js{3}
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./src/**/*.{html,js}"],
 theme: {
   extend: {},
 },
 plugins: [],
}
```

- 将 Tailwind 指令添加到 CSS 中
  将 Tailwind 的每个层的 @tailwind 指令添加到主 CSS 文件中

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- 开始构建过程
  使用 npm run dev 或 package.json 文件中配置的任何命令运行构建过程。

```bash
npm run dev
```

- 开始在 HTML 中使用 Tailwind
  确保你编译的 CSS 包含在 `<head>` 中（你的框架可能会为你处理这个问题），然后开始使用 Tailwind 的实用程序类来设计你的内容。

```html{6,9,10}
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/dist/main.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

@tab CDN

> 使用 Play CDN 在浏览器中尝试 Tailwind，无需任何构建步骤。Play CDN 仅为开发目的而设计，并非生产的最佳选择。

- 将 Play CDN 脚本添加到 HTML
  将 Play CDN 脚本标记添加到 HTML 文件的 `<head>` 中，并开始使用 Tailwind 的实用程序类来设置内容的样式。

```html{6,9}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </body>
</html>
```

- 尝试自定义配置
  编辑 tailwind.config 对象以使用您自己的设计令牌自定义配置。

```html{8-16}
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            clifford: '#da373d',
          }
        }
      }
    }
  </script>
</head>
<body>
  <h1 class="text-3xl font-bold underline text-clifford">
    Hello world!
  </h1>
</body>
</html>
```

- 尝试添加一些自定义 CSS

使用 type="text/tailwindcss" 添加支持 Tailwind 所有 CSS 功能的自定义 CSS。

```html{9-13}

<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style type="text/tailwindcss">
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
    }
  </style>
</head>
<body>
  <div class="lg:content-auto">
    <!-- ... -->
  </div>
</body>
</html>
```

@tab 使用脚手架(vite)

> tailwind 支持很多流行的框架，这边主要举例`Vite`下的安装方式，更多框架的教程可以去[官网](https://www.tailwindcss.cn/docs/installation/framework-guides)阅读安装文档

- 创建项目

如果您还没有设置 Vite 项目，请先创建一个新的 Vite 项目。最常见的方法是使用 Create Vite。

```shell
npm create vite@latest my-project  --template vue
cd my-project
```

- 安装 Tailwind CSS

安装 tailwindcss 及其对等依赖项，然后生成 tailwind.config.js 和 postcss.config.js 文件。

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- 配置模板路径
  将路径添加到 tailwind.config.js 文件中的所有模板文件。

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- 将 Tailwind 指令添加到 CSS 中

将 Tailwind 的每个层的 @tailwind 指令添加到您的 ./src/style.css 文件。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- 开始构建过程

```shell
npm run dev

```

- 开始在您的项目中使用 Tailwind

```html
<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
</template>
```

:::
