---
headerDepth: 4

---

# esbuild 指南

## 安装

```shell
npm install esbuild
```

查看版本

```shell
.\node_modules\.bin\esbuild --version
```

esbuild 天然支持解析jsx，不需要额外安装其他东西

### 命令式调用

```json
{
  "scripts": {
    "build": "esbuild app.jsx --bundle --outfile=out.js"
  }
}
```

### api 调用

```js
require('esbuild').build({
  entryPoints: ['app.jsx'],
  bundle: true,
  outfile: 'out.js',
}).catch(() => process.exit(1))
```



#### 打包成浏览器环境

```shell
esbuild app.jsx --bundle --minify --sourcemap --target=chrome58,firefox57,safari11,edge16
```

### 打包成node环境

```js
esbuild app.js --bundle --platform=node --target=node10.4  --external:./node_modules/*
```

## Build API

> 您通常会传递一个或多个入口点文件以及各种选项来进行处理，然后 esbuild 将结果**写回文件系统**。这是一个启用与输出目录捆绑的简单示例

```js
import * as esbuild from 'esbuild'

let result = await esbuild.build({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'dist',
})
console.log(result)
```

### 有三种不同的增量构建 API

#### watch mode

```js
let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'dist',
})

await ctx.watch()
```

> cli表示：esbuild app.ts --bundle --outdir=dist --watch

#### Serve mode

服务模式启动本地开发服务器，提供最新构建的结果。传入请求会自动启动新版本，因此当您在浏览器中重新加载页面时，您的 Web 应用程序始终是最新的。这是一个例子：

```js
let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'dist',
})

let { host, port } = await ctx.serve()
```

> cli表示：esbuild app.ts --bundle --outdir=dist --serve

#### Rebuild mode

重建模式允许您手动调用构建。当将 esbuild 与其他工具集成时（例如使用自定义文件观察器或开发服务器而不是 esbuild 的内置工具），这非常有用。这是一个例子

```js
let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'dist',
})

for (let i = 0; i < 5; i++) {
  let result = await ctx.rebuild()
}
```

完成上下文对象后，您可以在上下文上调用 `dispose()` 以等待现有构建完成、停止监视和/或服务模式并释放资源。

### 配置

- General options
  - [Bundle](#bundle)
  - [Cancel ](#cancel )
  - [Live reload](#live-reload)
  - [Platform](#platform)
  - [Rebuild](#rebuild)
  - [Server](#server)
  - [Tsconfig](#tsconfig)
  - [Tsconfig raw](#tsconfig-raw)
- Input
  - [Entry points](#entry-points )
  - [Loader](#loader)
  - [Stdin](#stdin) 
- Output contents
  - 



## Transform API

把code转成字符串而不是写入文件中

```js
import * as esbuild from 'esbuild'

let ts = 'let x: number = 1'
let result = await esbuild.transform(ts, {
  loader: 'ts',
})
console.log(result)
```

> 对于某些用例，采用字符串而不是文件作为输入更符合人体工程学。文件系统隔离具有某些优点（例如，在浏览器中工作，不受附近 `package.json` 文件的影响）和某些缺点（例如，不能与捆绑或插件一起使用）。如果您的用例不适合转换 API，那么您应该使用更通用的构建 API。

### 配置

## Options

### **General options**

#### Bundle

> 捆绑文件意味着将任何导入的依赖项内联到文件本身中。这个过程是递归的，因此依赖项的依赖项（等等）也将被内联。默认情况下 esbuild 不会捆绑输入文件。必须像这样显式启用捆绑

```js
import * as esbuild from 'esbuild'

console.log(await esbuild.build({
  entryPoints: ['in.js'],
  bundle: true,
  outfile: 'out.js',
}))
```

::: info

请注意，捆绑与文件串联不同。在启用捆绑的情况下传递 esbuild 多个输入文件将创建多个单独的捆绑包，而不是将输入文件连接在一起。要将一组文件与 esbuild 结合在一起，请将它们全部导入到单个入口点文件中，然后仅将该一个文件与 esbuild 捆绑在一起。

:::

#### Cancel 

如果您使用重建来手动调用增量构建，您可能需要使用此取消 API 提前结束当前构建，以便您可以开始新的构建。你可以这样做

```js
import * as esbuild from 'esbuild'
import process from 'node:process'

let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'www',
  logLevel: 'info',
})

process.stdin.on('data', async () => {
  try {

    await ctx.cancel()

    console.log('build:', await ctx.rebuild())
  } catch (err) {
    console.error(err)
  }
})
```



#### Live reload

- 第一步

```js
import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'www',
})

await ctx.watch()

let { host, port } = await ctx.serve({
  servedir: 'www',
})
```

- 第二步

index.html

这样子就可以实现浏览器自动刷新

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./app.js"></script>
  <script>
    new EventSource('/esbuild').addEventListener('change', () =>{
      location.reload()
    })
  </script>
</body>
</html>
```

- #### 实时重新加载注意事项

  - 这些事件仅在 esbuild 的输出更改时触发。当与正在监视的构建无关的文件发生更改时，它们不会触发。如果您的 HTML 文件引用了 esbuild 不知道的其他文件并且这些文件已更改，您可以手动重新加载页面，也可以实现自己的实时重新加载基础结构，而不是使用 esbuild 的内置行为
  - `EventSource` API 应该会自动为您重新连接。然而，Firefox 中存在一个错误，如果服务器暂时无法访问，则会破坏此功能。解决方法是使用任何其他浏览器，在发生这种情况时手动重新加载页面，或者编写更复杂的代码，在出现连接错误时手动关闭并重新创建 `EventSource` 对象
  - 浏览器供应商已决定不实施没有 TLS 的 HTTP/2。这意味着，当使用 `http://` 协议时，每个 `/esbuild` 事件源将占用您宝贵的 6 个并发每域 HTTP/1.1 连接之一。因此，如果您打开六个以上使用此实时重新加载技术的 HTTP 选项卡，您将无法在其中某些选项卡中使用实时重新加载（并且其他选项也可能会损坏）。解决方法是启用 `https://` 协议。

#### Platform

> 默认情况下，esbuild 的捆绑程序配置为生成适用于浏览器的代码。如果您的捆绑代码打算在节点中运行，则应将平台设置为 `node` 

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  platform: 'node',
  outfile: 'out.js',
})
```

#### Rebuild 

如果您的用例涉及使用相同选项重复调用 esbuild 的构建 API，您可能需要使用此 API。例如，如果您正在实现自己的文件观察器服务，这非常有用。重建比再次构建更有效，因为先前构建的一些数据被缓存，如果原始文件自上次构建以来没有更改，则可以重复使用。

```js
import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
})

// Call "rebuild" as many times as you want
for (let i = 0; i < 5; i++) {
  let result = await ctx.rebuild()
}

// Call "dispose" when you're done to free up resources
ctx.dispose()
```

#### Serve

服务模式启动一个 Web 服务器，将您的代码提供给设备上的浏览器。下面是一个将 `src/app.ts` 捆绑到 `www/js/app.js` 中的示例，然后还通过 `http://localhost:8000/` 提供 `www` 目录：

```js
import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  entryPoints: ['src/app.ts'],
  outdir: 'www/js',
  bundle: true,
})

let { host, port } = await ctx.serve({
  servedir: 'www',
})
```

options

```typescript
interface ServeOptions {
  port?: number
  host?: string
  servedir?: string
  keyfile?: string
  certfile?: string
  fallback?: string
  onRequest?: (args: ServeOnRequestArgs) => void
}

interface ServeOnRequestArgs {
  remoteAddress: string
  method: string
  path: string
  status: number
  timeInMS: number
}
```

#### Tsconfig

通常，构建 API 会在构建期间自动发现 `tsconfig.json` 文件并读取其内容。不过，您也可以配置自定义 `tsconfig.json` 文件来代替使用。如果您需要使用不同的设置对同一代码进行多次构建

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.ts'],
  bundle: true,
  tsconfig: 'custom-tsconfig.json',
  outfile: 'out.js',
})
```

#### Tsconfig raw 

```js
import * as esbuild from 'esbuild'

let ts = 'class Foo { foo }'
let result = await esbuild.transform(ts, {
  loader: 'ts',
  tsconfigRaw: `{
    "compilerOptions": {
      "useDefineForClassFields": false,
    },
  }`,
})
console.log(result.code)
```

### Input

#### Entry points 

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['home.ts', 'settings.ts'],
  bundle: true,
  write: true,
  outdir: 'out',
})
```

这将生成两个输出文件 `out/home.js` 和 `out/settings.js` 对应于两个入口点 `home.ts` 和 `settings.ts`

此外，您还可以使用替代入口点语法为每个单独的入口点指定完全自定义的输出路径：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: [
    { out: 'out1', in: 'home.ts'},
    { out: 'out2', in: 'settings.ts'},
  ],
  bundle: true,
  write: true,
  outdir: 'out',
})
```

#### Loader

此选项更改给定输入文件的解释方式。例如， `js` 加载器将文件解释为 JavaScript， `css` 加载器将文件解释为 CSS。有关所有内置加载器的完整列表，请参阅内容类型页面。

通过为给定文件类型配置加载程序，您可以使用 `import` 语句或 `require` 调用加载该文件类型。例如，配置 `.png` 文件扩展名以使用数据 URL 加载器意味着导入 `.png` 文件会为您提供包含该图像内容的数据 URL：

```js
import url from './example.png'
let image = new Image
image.src = url
document.body.appendChild(image)

import svg from './example.svg'
let doc = new DOMParser().parseFromString(svg, 'application/xml')
let node = document.importNode(doc.documentElement, true)
document.body.appendChild(node)
```

可以使用构建 API 调用来捆绑上述代码，如下所示：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  loader: {
    '.png': 'dataurl',
    '.svg': 'text',
  },
  outfile: 'out.js',
})
```

#### Stdin

通常，构建 API 调用采用一个或多个文件名作为输入。但是，此选项可用于在文件系统上根本不存在模块的情况下运行构建。它被称为“stdin”，因为它对应于在命令行上将文件通过管道传输到 stdin。

除了指定 stdin 文件的内容之外，您还可以选择指定解析目录（用于确定相对导入的位置）、源文件（在错误消息和源映射中使用的文件名）和加载器（它决定如何解释文件内容）。 CLI 无法指定解析目录。相反，它会自动设置为当前工作目录。

```js
import * as esbuild from 'esbuild'

let result = await esbuild.build({
  stdin: {
    contents: `export * from "./another-file"`,
    resolveDir: './src',
    sourcefile: 'imaginary-file.js',
    loader: 'ts',
  },
  format: 'cjs',
  write: false,
})
```

### Output contents

#### Banner 

使用它可以在生成的 JavaScript 和 CSS 文件的开头插入任意字符串。这通常用于插入注释：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  banner: {
    js: '//comment',
    css: '/*comment*/',
  },
  outfile: 'out.js',
})
```

#### Footer 

使用它可以在生成的 JavaScript 和 CSS 文件的末尾插入任意字符串。这通常用于插入注释：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  footer: {
    js: '//comment',
    css: '/*comment*/',
  },
  outfile: 'out.js',
})
```

#### Format 

这设置生成的 JavaScript 文件的输出格式。当前可以配置三个可能的值： `iife` 、 `cjs` 和 `esm` 。当未指定输出格式时，如果启用了捆绑（如下所述），esbuild 会为您选择一个输出格式；如果禁用捆绑，则不会执行任何格式转换。

- #### IIFE

  - `iife` 格式代表“立即调用的函数表达式”，旨在在浏览器中运行。将代码包装在函数表达式中可确保代码中的任何变量不会意外地与全局范围内的变量发生冲突。如果您的入口点具有要在浏览器中公开为全局的导出，则可以使用全局名称设置来配置该全局的名称。当未指定输出格式、启用捆绑且平台设置为 `browser` （默认情况下）时，将自动启用 `iife` 格式

- #### CommonJS

- #### ESM

  - `esm` 格式代表“ECMAScript 模块”。它假设环境支持 `import` 和 `export` 语法。 CommonJS 模块语法中带有导出的入口点将转换为 `module.exports` 值的单个 `default` 导出。当未指定输出格式、启用捆绑且平台设置为 `neutral` 时，将自动启用 `esm` 格式


#### Global name 

仅当格式设置为 `iife` （代表立即调用的函数表达式）时，此选项才有意义。它设置用于存储入口点导出的全局变量的名称

```js
import * as esbuild from 'esbuild'

let js = 'module.exports = "test"'
let result = await esbuild.transform(js, {
  format: 'iife',
  globalName: 'xyz',
})
console.log(result.code)
```

生成如下

```js
var xyz = (() => {
  ...
  var require_stdin = __commonJS((exports, module) => {
    module.exports = "test";
  });
  return require_stdin();
})();
```

#### Legal comments

“法律注释”被认为是 JS 中的任何语句级注释或 CSS 中的规则级注释，其中包含 `@license` 或 `@preserve` 或以 `//!` 或 `/*!` 。默认情况下，这些注释会保留在输出文件中，因为这遵循代码原作者的意图

#### Line limit 

此设置是一种防止 esbuild 生成具有很长行的输出文件的方法，这可以帮助在实现不佳的文本编辑器中提高编辑性能。将其设置为正整数以告诉 esbuild 在给定行通过该字节数后立即结束该行。例如，这会在长行传递约 80 个字符后立即换行：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.ts'],
  lineLimit: 80,
})
```

行在超过限制之后而不是之前被截断，因为检查何时超过限制然后预测何时将要超过限制更简单，并且因为在生成输出文件时避免备份和重写内容更快。所以这个极限只是近似值。

  #### Splitting

::: tip 

代码分割仍在进行中。目前它仅适用于 `esm` 输出格式。跨代码分割块的 `import` 语句还存在一个已知的排序问题。您可以关注跟踪问题以获取有关此功能的更新。

:::

通过异步 `import()` 表达式引用的代码将被拆分到一个单独的文件中，并且仅在计算该表达式时才加载。这使您可以通过仅在启动时下载所需的代码，然后在以后需要时延迟下载其他代码，从而缩短应用程序的初始下载时间。

如果未启用代码分割， `import()` 表达式将变为 `Promise.resolve().then(() => require())` 。这仍然保留了表达式的异步语义，但这意味着导入的代码包含在同一个包中，而不是拆分到单独的文件中。

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['home.ts', 'about.ts'],
  bundle: true,
  splitting: true,
  outdir: 'out',
  format: 'esm',
})
```

### Output location 

#### Allow overwrite

启用此设置允许输出文件覆盖输入文件。默认情况下不启用它，因为这样做意味着覆盖源代码，如果未签入代码，可能会导致数据丢失。但支持此功能可以避免需要临时目录，从而使某些工作流程变得更容易。因此，当您想故意覆盖源代码时，可以启用此功能

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  outdir: '.',
  allowOverwrite: true,
})
```

#### Asset names

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  assetNames: 'assets/[name]-[hash]',
  loader: { '.png': 'file' },
  bundle: true,
  outdir: 'out',
})
```

- [dir]
  - 这是从包含资源文件的目录到 outbase 目录的相对路径。其目的是通过镜像输出目录内的输入目录结构来帮助资产输出路径看起来更美观
- [name]
  - 这是资产的原始文件名，不带扩展名。例如，如果资源最初命名为 `image.png` ，则模板中的 `[name]` 将替换为 `image` 。没有必要使用这个占位符；它的存在只是为了提供人类友好的资产名称，以使调试更容易。
- [hash]
  - 这是资产的内容哈希，这对于避免名称冲突很有用。例如，您的代码可能会导入 `components/button/icon.png` 和 `components/select/icon.png` 在这种情况下，您需要哈希来区分都名为 `icon` 的两个资产
- [ext]
  - 这是资源的文件扩展名（即最后一个 `.` 字符末尾之后的所有内容）。它可用于将不同类型的资产放入不同的目录中。例如， `--asset-names=assets/[ext]/[name]-[hash]` 可能会将名为 `image.png` 的资源写为 `assets/png/image-CQFGD2NG.png` 。

#### Chunk names 

此选项控制启用代码分割时自动生成的共享代码块的文件名。它使用带有占位符的模板配置输出路径，在生成输出路径时，占位符将替换为特定于块的值。例如，指定块名称模板 `chunks/[name]-[hash]` 会将所有生成的块放入输出目录内名为 `chunks` 的子目录中，并在文件名中包含块的内容哈希。这样做看起来像这样：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  chunkNames: 'chunks/[name]-[hash]',
  bundle: true,
  outdir: 'out',
  splitting: true,
  format: 'esm',
})
```

请注意，此选项仅控制自动生成的共享代码块的名称。它不控制与入口点相关的输出文件的名称。这些名称当前是根据原始入口点文件相对于 outbase 目录的路径确定的，并且此行为无法更改。将来将添加一个额外的 API 选项，以便您更改入口点输出文件的文件名。

#### Entry names 

该选项控制与每个输入入口点文件对应的输出文件的文件名。它使用带有占位符的模板配置输出路径，在生成输出路径时，占位符将替换为特定于文件的值。例如，指定条目名称模板 `[dir]/[name]-[hash]` 在文件名中包含输出文件的哈希值，并将文件放入输出目录中，可能位于子目录下（请参阅有关 `[dir]` 的详细信息） b1> 如下）。这样做看起来像这样：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/main-app/app.js'],
  entryNames: '[dir]/[name]-[hash]',
  outbase: 'src',
  bundle: true,
  outdir: 'out',
})
```

#### Out extension 

此选项允许您将 esbuild 生成的文件的文件扩展名自定义为 `.js` 或 `.css` 之外的其他内容。特别是， `.mjs` 和 `.cjs` 文件扩展名在node中具有特殊含义（它们分别表示ESM和CommonJS格式的文件）。如果您使用 esbuild 生成多个文件并且必须使用 outdir 选项而不是 outfile 选项，则此选项非常有用。你可以这样使用它：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outdir: 'dist',
  outExtension: { '.js': '.mjs' },
})
```

#### Outbase

如果您的构建在单独的目录中包含多个入口点，则目录结构将被复制到相对于 outbase 目录的输出目录中。例如，如果有两个入口点 `src/pages/home/index.ts` 和 `src/pages/about/index.ts` 并且 outbase 目录为 `src` ，则输出目录将包含 `pages/home/index.js` 和 `pages/about/index.js` 。使用方法如下

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: [
    'src/pages/home/index.ts',
    'src/pages/about/index.ts',
  ],
  bundle: true,
  outdir: 'out',
  outbase: 'src',
})
```

#### Outdir 

该选项设置构建操作的输出目录。例如，此命令将生成一个名为 `out` 的目录：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outdir: 'out',
})
```

#### Outfile 

此选项设置构建操作的输出文件名。这仅适用于只有单个入口点的情况。如果有多个入口点，则必须使用 outdir 选项来指定输出目录。使用 outfile 看起来像这样：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
})
```

#### Public path

这与外部文件加载器结合使用非常有用。默认情况下，加载程序使用 `default` 导出将导入文件的名称导出为字符串。公共路径选项允许您在此加载程序加载的每个文件的导出字符串前面添加基本路径：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  loader: { '.png': 'file' },
  publicPath: 'https://www.example.com/v1',
  outdir: 'out',
})
```

#### Write 

构建 API 调用可以直接写入文件系统，也可以返回已写入内存缓冲区的文件。默认情况下，CLI 和 JavaScript API 会写入文件系统，而 Go API 不会。要使用内存缓冲区：

```js
import * as esbuild from 'esbuild'

let result = await esbuild.build({
  entryPoints: ['app.js'],
  sourcemap: 'external',
  write: false,
  outdir: 'out',
})

for (let out of result.outputFiles) {
  console.log(out.path, out.contents, out.hash, out.text)
}
```

### Path resolution

#### Alias

此功能可让您在捆绑时用一个包替换另一个包。下面的示例将包 `oldpkg` 替换为包 `newpkg` ：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  write: true,
  alias: {
    'oldpkg': 'newpkg',
  },
})
```

请注意，当使用别名替换导入路径时，生成的导入路径将在工作目录中解析，而不是在包含具有导入路径的源文件的目录中解析。如果需要，可以使用工作目录功能设置 esbuild 使用的工作目录。

#### Conditions 

此功能控制如何解释 `package.json` 中的 `exports` 字段。可以使用条件设置添加自定义条件。您可以根据需要指定任意数量的内容，这些内容的含义完全取决于包作者。 Node 目前仅认可推荐使用的 `development` 和 `production` 自定义条件。以下是添加自定义条件 `custom1` 和 `custom2` 的示例：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/app.js'],
  bundle: true,
  conditions: ['custom1', 'custom2'],
})
```

#### External 

您可以将文件或包标记为外部，以将其从构建中排除。导入将被保留，而不是捆绑（对于 `iife` 和 `cjs` 格式使用 `require` ，对于 `esm` > 格式）并将在运行时进行评估。

这有多种用途。首先，它可用于从捆绑包中删除不必要的代码，以获得您知道永远不会执行的代码路径。例如，一个包可能包含仅在节点中运行的代码，但您只能在浏览器中使用该包。它还可用于在运行时从无法捆绑的包中导入节点中的代码。例如， `fsevents` 包包含 esbuild 不支持的本机扩展。将某些东西标记为外部看起来像这样：

```js
import * as esbuild from 'esbuild'
import fs from 'node:fs'

fs.writeFileSync('app.js', 'require("fsevents")')

await esbuild.build({
  entryPoints: ['app.js'],
  outfile: 'out.js',
  bundle: true,
  platform: 'node',
  external: ['fsevents'],
})
```

您还可以在外部路径中使用 `*` 通配符将与该模式匹配的所有文件标记为外部。例如，您可以使用 `*.png` 删除所有 `.png` 文件，或使用 `/images/*` 删除以 `/images/` 开头的所有路径：

```js
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.js'],
  outfile: 'out.js',
  bundle: true,
  external: ['*.png', '/images/*'],
})
```

外部路径在路径解析之前和之后应用，这使您可以匹配源代码中的导入路径和绝对文件系统路径。如果外部路径在任一情况下都匹配，则该路径被视为外部路径。具体行为如下：

- 在路径解析开始之前，将根据所有外部路径检查导入路径。此外，如果外部路径看起来像包路径（即不以 `/` 或 `./` 或 `../` 开头），则检查导入路径以查看如果他们将该包路径作为路径前缀。
- 这意味着 `--external:@foo/bar` 隐式也意味着与导入路径 `@foo/bar/baz` 匹配的 `--external:@foo/bar/*` 。因此它也将 `@foo/bar` 包内的所有路径标记为外部路径。
- 路径解析结束后，将针对所有看起来不像包路径的外部路径（即以 `/` 或 `./` 或 `../` 通配符）。
- 这意味着您可以使用 `--external:./dir/*` 将目录 `dir` 中的所有内容标记为外部。请注意，前导 `./` 很重要。使用 `--external:dir/*` 会被视为包路径，并且在路径解析结束后不会进行检查。