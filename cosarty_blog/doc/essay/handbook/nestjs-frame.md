# nestjs 的企业级骨架搭建

[[toc]]

:::tip 开头
最近在使用 nestjs 来作为我毕业设计的后端支持，这篇文章主要用来总结我使用 nestjs 这些天的一些心得和总结，nestjs 是一个高度分装的，扩展性非常强的一个服务端应用框架，他的高扩展性同时也是一柄双刃剑，如果合理的使用它为我们提供的一些服务，会大大提高我们的开发效率和整个服务架构，他的是基于 express 分装的上层应用，支持 AOP 编程
:::

**下面的包管理工具我将使用 pnpm 来管理，npm， yarn ，同理**

## 安装 netsjs

- 安装全局脚手架(安装过的可以跳过): `pnpm i -g @nestjs/cli`
- 创建项目:`nest new project-name`

:::info 概述
nestjs 的程序的入口文件是从 main.ts 开始加载，他的内部是按照模块作用域来划分，由一个根组件开始注入，其他模块是挂载在根模块下面
:::

```ts
// file main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
}
bootstrap();
```

*接下来我们将从这个入口文件开始深入构建*