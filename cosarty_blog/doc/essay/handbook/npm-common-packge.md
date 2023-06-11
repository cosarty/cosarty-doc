---
sidebar: heading
title: npm常用包
---
## picocolors

picocolors 是一个可以在终端修改输出字符样式的 npm 包，说直白点就是给字符添加颜色；

可能有的同学想到了，这不是跟 [chalk](https://www.npmjs.com/package/chalk) 一样的吗？

没错，他们的作用其实就是一样的！

**为什么选择 picocolors：**

- 无依赖包；
- 比 chalk 体积小 14 倍，速度快 2 倍；
- 支持 CJS 和 ESM 项目；

所以大家明白选什么了吧！

当然因为 `picocolors` 包比较小，所以功能边界没有 `chalk` 的全面，但是用在一些自研等绝大部分的需求中是完全可以满足的。

> 注意：
>
> 1. 因为历史等原因 `vue3` 目前还在使用 `chalk`；
> 2. vite 已全面用 `picocolors` 替代作为终端样式输出；
> 3. 不过 `chalk` 为了优化，在最近的最新版本 v5 中已剔除依赖包；

## `prompts` vs `enquirer` vs `inquirer`

| 工具名   | 何处使用 | 大小    | 周下载量   | github 地址                                        |
| -------- | -------- | ------- | ---------- | -------------------------------------------------- |
| prompts  | vite     | 187 kB  | 18,185,030 | [prompts](https://www.npmjs.com/package/prompts)   |
| enquirer | vue3     | 197 kB  | 13,292,137 | [enquirer](https://www.npmjs.com/package/enquirer) |
| inquirer | 其它     | 87.7 kB | 24,793,335 | [inquirer](https://www.npmjs.com/package/inquier)  |

**简单总结：**

- 其实 `vite` 起初也是使用的 `enquirer`，只是后面为了满足用户跨平台使用时出现的 bug，才替换成了 `prompts`，当然也并不是说 `enquirer` 不好，只是场景不同，所以选择会有所不同罢了；
- 其实如果你想在自己的项目中使用 `交互式界面` 工具，我这边还是比较推荐 `inquirer` 的，毕竟社区受欢迎程度和功能都是完全满足你的需求的。

## cac

[cac](https://www.npmjs.com/package/cac) 是一个用于构建 CLI 应用程序的 JavaScript 库；

通俗点讲，就是给你的 cli 工具增加自定义一些命令，例如 `vite create`，后面的 `create` 命令就是通过 cac 来增加的；

因为该库较适用于一些自定义的工具库中，所以只在 `vite` 中使用， `vue3` 并不需要该工具；

**为什么不用 [commander](https://www.npmjs.com/package/commander) or [yargs](https://www.npmjs.com/package/yargs)？**

主要是因为 vite 的工具是针对一些自定义的命令等场景不是特别复杂的情况；

我们看看 `cac 的优势`：

- **超轻量级**：没有依赖，体积数倍小于 `commander` 和 `yargs`；
- **易于学习**：只需要学习 4 API `cli.option`、`cli.version` 、`cli.help` `cli.parse` 即可搞定大部分需求；
- **功能强大**：启用默认命令，可以像使用 git 的命令一样方便去使用它，且有参数和选项的校验、自动生成 help 等完善功能；

> 当然，如果你想写一个功能较多的 cli 工具，也是可以选择 `commander` 和 `yargs` 的；
>
> 不过一些中小型的 cli 工具我还是比较推荐 `cac` 的；

## npm-run-all

[npm-run-all](https://www.npmjs.com/package/npm-run-all) 是一个 `cli` 工具，可以并行、或者按顺序执行多个 `npm` 脚本；`npm-run-all` 在 `vite` 工具源码中有使用；

通俗点讲就是为了解决官方的 `npm run 命令` 无法同时运行多个脚本的问题，它可以把诸如 `npm run clean && npm run build:css && npm run build:js && npm run build:html` 的一长串的命令通过 glob 语法简化成 `npm-run-all clean build:*` 一行命令。

**提供三个命令：**

- npm-run-all

  - 可以带 `-s` 和 `-p` 参数的简写，分别对应串行和并行；

  ```bash
  # 依次执行这三个任务命令
  npm-run-all clean lint build
  
  # 同时执行这两个任务命令
  npm-run-all --parallel lint build
  
  # 先串行执行 a 和 b, 再并行执行 c 和 d
  npm-run-all -s a b -p c d
  ```

- `run-s`：为 `npm-run-all --serial`的缩写；

- `run-p`：为 `npm-run-all --parallel`的缩写；

> 上面只是简单的介绍了下，想要了解更多实用功能的，可以去[官网](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmysticatea%2Fnpm-run-all)查看；
>
> 最后：**这个库属实是好用，良心推荐！**

## semver

[semver](https://www.npmjs.com/package/semver) 是一个语义化版本号管理的 `npm` 库；`semver` 在 `vue3` 框架源码和 `vite` 工具源码中都有使用；

说直白一点，你在开发一个开源库的时候，肯定会遇到要提醒用户不同版本号不同的情况，那么如何去判断用户版本过低，`semver` 就可以很好的帮助你解决这个问题；

`semver` 内置了许多方法，比如 `判断一个版本是否合法，判断版本号命名是否正确，两个版本谁大谁小之类` 等等方法；

**如下列一些官网的例子：**

```javascript
const semver = require('semver')

semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null
semver.clean('  =v1.2.3   ') // '1.2.3'
semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
semver.gt('1.2.3', '9.8.7') // false
semver.lt('1.2.3', '9.8.7') // true
semver.minVersion('>=1.0.0') // '1.0.0'
semver.valid(semver.coerce('v2')) // '2.0.0'
semver.valid(semver.coerce('42.6.7.9.3-alpha')) // '42.6.7'
```

## minimist

[minimist](https://www.npmjs.com/package/minimist) 是一个命令行参数解析工具；`minimist` 在 `vue3` 框架源码和 `vite` 工具源码中都有使用；

**使用：**

```javascript
const args = require('minimist')(process.argv.slice(2))
```

**例如：**

```bash
# 执行以下命令
vite create app -x 3 -y 4 -n5 -abc --beep=boop foo bar baz

# 将获得
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```

特别要说明的是返回值其中首个 key 是`_`，它的值是个数组，包含的是所有没有关联选项的参数。

> 如果你的工具在终端有较多的参数，那么这个工具就非常的适合您！

## ora

(ora)[https://www.npmjs.com/package/ora] ora是一个终端旋转器

可以实现终端加载动画

##  magic-string

[magic-string](https://www.npmjs.com/package/magic-string) 是一个用于操作字符串和生成源映射的小而快的库；

其实它最主要的功能就是对一些源代码和庞大的 `AST` 字符串做轻量级字符串的替换；

在 `vite` 工具源码和 `@vue/compiler-sfc` 中大量使用；

**使用：**

```typescript
import MagicString from 'magic-string';
const s = new MagicString('problems = 99');

// 替换 problems -> answer
s.overwrite(0, 8, 'answer')
s.toString() // 'answer = 99'

// 生成 sourcemap
var map = s.generateMap({
  source: 'source.js',
  file: 'converted.js.map',
  includeContent: true
})
```

##  fs-extra

[fs-extra](#) 是一个强大的`文件操作库`， 是 `Nodejs fs 模块` 的增强版；

这个就不多讲了，因为它在千锤百炼之下只能形容它是 `YYDS`，查看 [更多官方文档](https://www.npmjs.com/package/fs-extra)。

## chokidar

chokidar是一款专门用于文件监控的库；`chokidar` 只在 `vite` 工具源码中有使用；

其实 Node.js 标准库中提供 `fs.watch` 和 `fs.watchFile` 两个方法用于处理文件监控，但是为什么我们还需要`chokidar` 呢？

主要是由于 `兼容性不好、无法监听、监听多次` 等大量影响性能的问题；

**chokidar 用法：**

```javascript
const chokidar = require('chokidar');

const watcher = chokidar.watch('file, dir, glob, or array', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))
  .on('addDir', path => console.log(`Directory ${path} has been added`))
  .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
  .on('error', error => console.log(`Watcher error: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes'))
  .on('all', (event, path) => console.log(event,path))
  .on('raw', (event, path, details) => {
    log('Raw event info:', event, path, details);
  });
```

## fast-glob

fast-glob 是一个快速批量导入、读取文件的库； `fast-glob` 只在 `vite` 工具源码中有使用；

**基本语法：**

1. `*` ：匹配除斜杆、影藏文件外的所有文件内容；
2. `**`：匹配零个或多个层级的目录；
3. `?`：匹配除斜杆以外的任何单个字符；
4. `[seq]`：匹配 `[]` 中的任意字符 seq；

**如何使用：**

```javascript
const fg = require('fast-glob');

const entries = await fg(['.editorconfig', '**/index.js'], { dot: true });
```

**在 `vite` 中使用：**

`vite` 工具中 `import.meta.glob` 方法（如下）就是基于这个库来实现，所以如果你在自己的工具库中有批量文件等的操作，这个库是以很不错的选择；

```typescript
const modules = import.meta.glob('./dir/*.js', { query: { foo: 'bar', bar: true } })
```

`vite` 通过 `fast-glob` 工具把它生成如下代码

```typescript
// vite 生成的代码
const modules = {
  './dir/foo.js': () =>
    import('./dir/foo.js?foo=bar&bar=true').then((m) => m.setup),
  './dir/bar.js': () =>
    import('./dir/bar.js?foo=bar&bar=true').then((m) => m.setup)
}
```

## debug

debug 是一个模仿 `Node.js` 核心调试技术的小型 `JavaScript` 调试程序，在适用于 `Node.js` 和 `Web 浏览器` 都可使用；`debug` 只在 `vite` 工具源码中有使用；

说直白点就是你可以使用 debug 来对你的程序进行 `毫秒级别时间差的统计` 对你程序代码进行优化；

**使用：**

```javascript
var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

// fake app

debug('booting %o', name);

http.createServer(function(req, res){
  debug(req.method + ' ' + req.url);
  res.end('hello\n');
}).listen(3000, function(){
  debug('listening');
});

// fake worker of some kind

require('./worker');
```

> 如果你对你的代码或者自研的工具等有较高性能要求，强烈建议可以使用 `debug` 来进行调式。

##  dotenv

dotenv 是一个零依赖模块，可将 `.env 文件` 中的环境变量加载到 `process.env` 中；`dotenv` 只在 `vite` 工具源码中有使用；

**如何使用：**

1. 创建 `.env 文件`

   ```ini
   3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEYGOESHERE"
   ```

2. 使用

   ```typescript
   import * as dotenv from 'dotenv'
   dotenv.config()
   console.log(process.env)
   ```

## esbuild

esbuild 是一个基于 Go 语言开发的 JavaScript 打包工具，被 Vite 用于开发环境的依赖解析；

相比传统的打包工具，主打性能优势，在构建速度上可以快 10~100 倍

> 到现在知道为啥 `vite` 为啥快了吧，`esbuild` 就是第一功臣。

**优势：**

- 没有缓存机制也有极快的打包速度
- 支持es6和cjs模块
- 支持es6 modules的tree-shaking
- 支持ts和jsx
- sourcemap
- 压缩工具
- 自定义的插件开发

**使用：**

`esbuild` 在 API 层面上非常简洁, 主要的 API 只有两个: `Transform` 和 `Build`, 这两个 API 可以通过 CLI, JavaScript, Go 的方式调用；

1. transform：调用这个API能将 `ts`，`jsx` 等文件转换为js文件；

   ```typescript
   // cli
   exbuild ./test.ts --loader=ts // 输出 const str = 'Hello World';
   
   // js api调用
   const esbuild = require('esbuild');
   const fs = require('fs');
   const path = require('path');
   const filePath = path.resolve(__dirname, 'test.ts');
   const code = esbuild.transformSync(fs.readFilesync(filePath), {
       loader: 'ts',
   })
   console.log(code);
   // 输出
   // {
   //  code: 'const str = 'Hello World'',
   //  map: '',
   //  warnings: []
   // }
   ```

2. build：整合了`transform`后的代码，可以将一个或者多个文件转换并保存为文件；

   ```typescript
   // cli
   esbuild test.ts --outfile=./dist/test.js // { errors: [], warnings: [] }
   
   // js api调用
   const esbuild = require('esbuild');
   const path = require('path');
   
   const result = esbuild.buildSync({
     entryPoints: [path.resolve(__dirname, 'test.ts')],
     outdir: path.resolve(__dirname, 'dist'),
   });
   
   console.log(result); // { errors: [], warnings: [] }
   ```

##  rollup

rollup 是一个 `JavaScript 模块打包器`，可以将小块代码编译成大块复杂的代码，我们熟悉的 vue、react、vuex、vue-router 等都是用 rollup 进行打包的。

在 `vite` 中的**生产环境（Production）**  就是基于 `rollup` 打包来构建主要代码的。

**使用：**

1. 创建 `rollup.config.js` 文件

2. 配置文件

   ```typescript
   export default {
     input: 'src/index.js',
     output: {
       name: 'amapUpper',
       file: 'dist/amapUpper.js',
       format: 'umd'
     },
     plugins: []
   };
   ```

3. 运行

   ```json
   {
     "scripts": {
       "dev": "rollup -i src/index.js -o dist/bundle.js -f es"
     },
   }
   ```

4. 执行 `npm run dev`

##  ws

ws 是一个简单易用、速度极快且经过全面测试的 `WebSocket 客户端`和 `服务器` 实现；完全可以是 `Socket.io` 的替代方案；`ws` 只在 `vite` 工具源码中有使用。

说直白一点就是通过 `ws`，咱们可以实现服务端和客户端的长连接，且通过 `ws` 对象，就可以获取到 `客户端发送过来的信息` 和 `主动推送信息给客户端`。

**使用：**

1. server.js

   ```javascript
   const WebSocket = require('ws')
       const WebSocketServer = WebSocket.Server;
       
       // 创建 websocket 服务器 监听在 3000 端口 
       const wss = new WebSocketServer({port: 3000}) 
       
       // 服务器被客户端连接 
       wss.on('connection', (ws) => { 
           // 通过 ws 对象，就可以获取到客户端发送过来的信息和主动推送信息给客户端 
           var i=0 
           var int = setInterval(function f() { 
               ws.send(i++) // 每隔 1 秒给连接方报一次数 
           }, 1000) 
       })
   ```

2. client.js

   ```typescript
   const WebSocket = require('ws')
   const ws = new WebSocket('ws://localhost:3000')
   
   // 接受
   ws.on('message', (message) => {
     console.log(message)
   
       // 当数字达到 10 时，断开连接
       if (message == 10) {
         ws.send('close');
         ws.close()
     }
   })
   ```

## esno

esno 是一个基于 `esbuild` 的 `TS/ESNext` 的 `Node.js` 运行时；

说直白点就是可以类似 `ts-node` 一样直接运行 `TS 文件`，那为甚么还用 `esno` 呢？

因为 `esno` 是基于 `esbuild` 运行的，`esbuild` 有多快，上面我们有讲到了吧，这里就不复述了。

**使用：**

```json
{
  "scripts": {
    "start": "esno index.ts"
  },
  "dependencies": {
    "esno": "*"
  }
}
```

```bash
npm run start
```

## tsup

tsup 是一个轻小且无需配置的，由 `esbuild` 支持的打包工具；

它可以直接把 `.ts、.tsx` 转成不同格式 `esm、cjs、iife` 的文件，快速打包你的工具库；

**使用：**

1. 安装 `tsup`

   ```bash
   pnpm i tsup -D
   ```

2. 在根目录下的 `package.json` 中配置

   ```json
   {
     "scripts": {
       "dev": "pnpm run build -- --watch --ignore-watch examples",
       "build": "tsup src/index.ts --dts --format cjs,esm"
     },
   }
   ```

