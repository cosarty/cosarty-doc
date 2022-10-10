---
# sidebar: false
# icon: emoji
description: webpack配置总结
tag:
  - webpack
category: 前端
date: 2022-10-05
---

# webpack配置总结 

webpack-cli 命令

:::note

--watch  监听webpack.config.js

--c

--o

:::





安装webpack: 

::: code-tabs

  @tab yarn 

```bash
yarn add webpack webpack-cli --dev
```

  @tab npm

```bash
npm install webpack webpack-cli -D
```

  :::

运行 `npx webpack` 的时候他默认回去找src下面的index.js文件作为入口文件，我们创建一个**hello.js**然后运行webpack指令`npx webpack`,他会通过入口文件解析依赖给我们打包出一个dist文件夹，这个文件夹就是存放编译之后的js文件的

![1665134826528](../.vuepress/public/assets/posts/20221006/1665134826528.png)

::: note

webpack默认会打包到dist/main.js下面

:::

我们也可以改变他的打包入口和输出位置,我们需要创建**webpack.config.js**文件

```javascript
const path = require('path')

module.exports = {
   entry: './src/index.js', // 文件的打包入口

  output: {
    filename: 'bundle.js', // 输出的文件
    path: path.join(__dirname, 'dist'), // 输出的文件夹
    clean: true,  // 清除上一次遗留的缓存
  },
}
```



## 一、基础配置

> 我们需要在打包的项目下面创建一个配置文件**webpack.config.js**

### 1.HtmlWebpackPlugin

> 这是我们学习的第一个插件，首先我们要按照**HtmlWebpackPlugin**这个插件然后注入到webpack的配置中去

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
....
  mode: 'development', // 如果设置为production html文件会被压缩
  plugins: [
      new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'app.[contenthash:5].html', //输出的文件名
      title: '小蔡不菜', // 设置html 的title
      inject: 'body', // 设置js标签的插入位置
    }),
  ],
....
}
```

**title要通过ejs语法注入到html模板才可以**

![1665141054254](../.vuepress/public/assets/posts/20221006/1665141054254.png)

### 2 mode

> 此选项用于配置当前的开发环境 有两个可选值 production，development

- 配置development的时候代码无法准确定位代码位置

![1665219711386](../.vuepress/public/assets/posts/20221006/1665219711386.png)

![1665220403517](../.vuepress/public/assets/posts/20221006/1665220403517.png)

```javascript
module.exports = {
    ....
     mode: 'development', // production development
    ....
}
```

### 3.  devtool

- 可以设置source-map的类型  用来定位错误

 ```javascript
module.exports = {
    ....
       devtool: 'inline-source-map',
    ....
}
 ```

![1665220517905](../.vuepress/public/assets/posts/20221006/1665220517905.png)

> 配置完之后错误定位正确!!!!

### 4.webpack-dev-server

`webpack-dev-server为我们提供了一个基本的web 服务，并且具有实时重载功能

> 安装：`yarn add --dev webpack-dev-server`

```javascript
module.exports = {
    ....
    devServer: {...options},
    ....
}
```

运行` npx  webpack server`

### 5.assetMoudle

- asset/resource  发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。

- asset/inline 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- asset/source 出资源的源代码。之前通过使用 `raw-loader` 实现。
- asset  在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

```javascript
// 配置资源模块
 module: {
   output: {
    assetModuleFilename: 'images/[contenthash:5][ext]', // 配置资源文件的输出的文件夹 1
  },

    rules: [
      { 
       test: /\.png$/,
       type: 'asset/resource'， 
       generator: {
         // 配置资源文件的输出的文件夹 2 这种方式优先级高
          filename: 'images/[contenthash:7][ext]', 
        }, 
       },
    ],
  },
```

![1665222324201](../.vuepress/public/assets/posts/20221006/1665222324201.png)

![1665222330899](../.vuepress/public/assets/posts/20221006/1665222330899.png)