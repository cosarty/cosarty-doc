---
headerDepth: 4
---

# swc 指南

:::info 作用
SWC可以用于编译和捆绑。对于编译，它使用现代JavaScript功能获取JavaScript / TypeScript文件，并输出所有主要浏览器支持的有效代码

`SWC在单线程上比Babel快20倍，在四核上快70倍。`
:::

## 安装

```bash
pnpm add -D @swc/cli @swc/core
```

swc的主要的核心库只有两个，`@swc/cli`主要是提供了一些脚手架命令，通过配置的方式去转换代码，而`@swc/core`则提供了swc的核心API，使我们可以在代码中使用api调用的方式去使用它。



## @swc/cli

### Options

| 命令                                      | 说明                                                         | 操作                                                         |
| ----------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| --filename (-f)                           | 选择文件                                                     | `npx swc -f input.js`                                        |
| --config-file                             | 要使用的 `.swcrc` 文件的路径。                               | `npx swc  --config-file .swcrc ./src/test.ts -o ./dist/t.js` |
| <span style="color:red">--env-name</span> | 写插件的时候用到                                             | `npx swc input.js --env-name='test'`                         |
| --no-swcrc                                | 是否查找 `.swcrc` 文件。默认支持编译typescript               | `npx swc input.js --no-swcrc`                                |
| --ignore                                  | 不编译的glob路径列表。                                       | `npx swc src --ignore **/*.test.js`                          |
| `--only`                                  | 仅编译的glob路径列表                                         | `npx swc src --only **/*.js`                                 |
| --watch (-w)                              | 要在更改时自动重新编译文件，请安装 `chokidar`                | `pnpm add -D chokidar`  && `npx swc input.js -w`             |
| --source-maps                             | true\|false\|inline\|both                                    | `npx swc input.js -s`                                        |
| --source-map-target                       | 为源映射定义 `file`                                          | `npx swc input.js -s --source-map-target input.map.js`       |
| --source-file-name                        | 在返回的源映射上设置 `sources[0]`                            |                                                              |
| --out-file (-o)                           | 将所有输入文件编译为一个文件。                               | `npx swc input.js -o output.js`                              |
| --out-dir (-d)                            | 将模块的输入目录编译为输出目录。                             | `npx swc src -d dist`                                        |
| --copy-files (-D)                         | 编译目录时，复制不可编译的文件。                             | `npx swc src --copy-files`                                   |
| --config (-C)                             | 从 `.swcrc` 文件中覆盖配置。                                 | `npx swc src -C module.type=amd -C module.moduleId=hello`    |
| --sync                                    | 同步启动swc。对调试很有用。                                  | `npx swc src --sync`                                         |
| --log-watch-compilation                   | 成功编译监视文件时记录一条消息。                             | `npx swc input.js --log-watch-compilation`                   |
| --strip-leading-paths                     | 在构建最终输出路径时，删除引导目录（包括所有父相对路径）。例如，它将 `src` 文件夹下的所有模块编译到 `dist` 文件夹，而不会在 `dist` 中创建 `src` 文件夹。 | `npx swc src -d dist --strip-leading-paths`                  |

## @swc/core

- transform

```javascript
const swc = require("@swc/core");
 
swc
  .transform("source code", {
    // Some options cannot be specified in .swcrc
    filename: "input.js",
    sourceMaps: true,
    // Input files are treated as module by default.
    isModule: false,
 
    // All options below can be configured via .swcrc
    jsc: {
      parser: {
        syntax: "ecmascript",
      },
      transform: {},
    },
  })
  .then((output) => {
    output.code; // transformed code
    output.map; // source map (in string)
  });

```

- transformSync

- transformFile

- transformFileSync

- parseSync

- parseFile

- parseFileSync

- minifySync

```typescript
export declare function minify(src: string, opts?: JsMinifyOptions): Promise<Output>;
export declare function minifySync(src: string, opts?: JsMinifyOptions): Output;
 
export interface Output {
    code: string;
    map?: string;
}
export declare type TerserEcmaVersion = 5 | 2015 | 2016 | string | number;
export interface JsMinifyOptions {
    compress?: TerserCompressOptions | boolean;
    mangle?: TerserMangleOptions | boolean;
    ecma?: TerserEcmaVersion;
    keep_classnames?: boolean;
    keep_fnames?: boolean;
    module?: boolean | "unknown";
    safari10?: boolean;
    toplevel?: boolean;
    sourceMap?: boolean;
    outputPath?: string;
    inlineSourcesContent?: boolean;
}
export interface TerserCompressOptions {
    arguments?: boolean;
    arrows?: boolean;
    booleans?: boolean;
    booleans_as_integers?: boolean;
    collapse_vars?: boolean;
    comparisons?: boolean;
    computed_props?: boolean;
    conditionals?: boolean;
    dead_code?: boolean;
    defaults?: boolean;
    directives?: boolean;
    drop_console?: boolean;
    drop_debugger?: boolean;
    ecma?: TerserEcmaVersion;
    evaluate?: boolean;
    expression?: boolean;
    global_defs?: any;
    hoist_funs?: boolean;
    hoist_props?: boolean;
    hoist_vars?: boolean;
    ie8?: boolean;
    if_return?: boolean;
    inline?: 0 | 1 | 2 | 3;
    join_vars?: boolean;
    keep_classnames?: boolean;
    keep_fargs?: boolean;
    keep_fnames?: boolean;
    keep_infinity?: boolean;
    loops?: boolean;
    negate_iife?: boolean;
    passes?: number;
    properties?: boolean;
    pure_getters?: any;
    pure_funcs?: string[];
    reduce_funcs?: boolean;
    reduce_vars?: boolean;
    sequences?: any;
    side_effects?: boolean;
    switches?: boolean;
    top_retain?: any;
    toplevel?: any;
    typeofs?: boolean;
    unsafe_passes?: boolean;
    unsafe_arrows?: boolean;
    unsafe_comps?: boolean;
    unsafe_function?: boolean;
    unsafe_math?: boolean;
    unsafe_symbols?: boolean;
    unsafe_methods?: boolean;
    unsafe_proto?: boolean;
    unsafe_regexp?: boolean;
    unsafe_undefined?: boolean;
    unused?: boolean;
    module?: boolean;
}
export interface TerserMangleOptions {
    props?: TerserManglePropertiesOptions;
    top_level?: boolean;
    keep_class_names?: boolean;
    keep_fn_names?: boolean;
    keep_private_props?: boolean;
    ie8?: boolean;
    safari10?: boolean;
    reserved?: string[];
}
export interface TerserManglePropertiesOptions {
}
```

## swc-loader

```shell
pnpm i -D @swc/core swc-loader
```

- webpack.config.js

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        // `.swcrc` can be used to configure swc
        loader: "swc-loader"
      }
    }
  ]
}
```

- 当与babel-loader一起使用时，parseMap选项必须设置为true。

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "swc-loader",
        options: {
          parseMap: true
        }
      }
    }
  ]
}
```

## 配置

### Compilation 

> `compilation `可以在SWC中开箱即用，不需要定制。也可以覆盖配置。以下是默认值：

```js
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": false,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": false,
      "decoratorsBeforeExport": false,
      "topLevelAwait": false,
      "importMeta": false,
      "preserveAllComments": false
    },
    "transform": null,
    "target": "es5",
    "loose": false,
    "externalHelpers": false,
    // Requires v1.2.50 or upper and requires target to be es2016 or upper.
    "keepClassNames": false
  },
  "isModule": false
}
```

#### env

##### env.targets

设置浏览器的支持程度

```json
{
    "env": {
        "targets": "Chrome >= 48"
    }
}
```

```json
{
    "env": {
        "targets": {
            "chrome": "79",
        }
    },
}
```

##### env.mode

可选的： `"usage" | "entry" | false` ，默认为 `false` 

- ` "usage"`：这种模式会自动根据代码中使用到的特性来添加所需的 polyfill。这种方式是按需添加的，更加高效，因为只会引入那些实际使用到的 polyfill。

- `"entry"`：这种模式要求你手动在代码中引入 core-js 或 regenerator-runtime。这样做的好处是你可以明确知道引入了哪些 polyfill，但可能会引入一些不必要的 polyfill，导致最终的打包文件变大。

- `false`：默认值，不进行任何处理。

##### env.debug

说明：启用调试日志记录。

 类型: Boolean

#####  env.dynamicImport

 类型: Boolean

#####   env.include

说明：要包含的功能或模块。

类型：string[]

```json
{
    "env": {
        "targets": {
            "chrome": "79",
        },
        "include": [
            "transform-async-to-generator",
            "transform-regenerator",
        ],
    },
}
```

##### env.exclude

说明：要排除的功能或模块。

类型：string[]

##### env.coreJs

说明：corejs的版本

类型：string

##### env.path

说明：env的文件路径

类型：string

##### env.bugfixes

说明：修复错误

类型：boolean

#### jsc

##### jsc.externalHelpers

```json
{
  "jsc": {
    "externalHelpers": true
  }
}
```

输出代码可能依赖于帮助器函数来支持目标环境。默认情况下，helper函数被内联到需要它的输出文件中。您可以通过启用`externalHelpers` 来使用外部模块中的helper，helper代码将由 `node_modules/@swc/helpers` 的输出文件导入。除了 `@swc/core` 之外，您还必须添加 `@swc/helpers` 作为依赖项。

##### jsc.parser

类型：ecmascript | typescript



```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": false,
      "dynamicImport": false
    }
  }
}
```

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": false,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "classPrivateProperty": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": false,
      "decoratorsBeforeExport": false,
      "importMeta": false
    }
  }
}
```



##### jsc.target

```json
{
  "jsc": {
    // Disable es3 / es5 / es2015 transforms
    "target": "es2016"
  }
}
```

##### jsc.loose

说明：松散转换

类型：boolean

##### jsc.transform

**jsc.transform.legacyDecorator**

说明：是否使用装饰器

type：boolean

**jsc.transform.decoratorMetadata**

说明：如果你使用的是启用了 `emitDecoratorMetadata` 的类型脚本和装饰器，你可以使用 `swc` 来加快迭代速度

type：boolean

**jsc.transform.react.runtime**

说明：如果你使用的是启用了 `emitDecoratorMetadata` 的类型脚本和装饰器，你可以使用 `swc` 来加快迭代速度

type：classic | automatic

**jsc.transform.constModules**

`constModules` 是一个对象，键是模块名，值是一个对象，定义了从该模块导入的标识符及其替换值。

```json
{
  "jsc": {
    "transform": {
      "constModules": {
        "globals": {
          "@ember/env-flags": {
            "DEBUG": "true"
          },
          "@ember/features": {
            "FEATURE_A": "false",
            "FEATURE_B": "true"
          }
        }
      }
    }
  }
}
```

代码如下

```js
import { DEBUG } from "@ember/env-flags";
import { FEATURE_A, FEATURE_B } from "@ember/features";
 
console.log(DEBUG, FEATURE_A, FEATURE_B);
```

转换为

```json
console.log(true, false, true);
```

**jsc.transform.optimizer.simplify**

您可以将其设置为 `false` 以在跳过优化时使用 `inline_globals` 。

```json
{
  "jsc": {
    "transform": {
      "optimizer": {
        "simplify": true
      }
    }
  }
}
```

```js
// Before
if (true) {
    doSomething();
} else {
    doSomethingElse();
}
// After
doSomething();

```

**jsc.transform.optimizer.globals**

`jsc.transform.optimizer.globals` 是 SWC 中一个非常有用的配置选项，可以通过在编译时替换全局变量来优化代码。它有助于提高代码的执行效率、减小打包大小，并使代码更易于阅读和维护。在大型项目或生产环境中使用这个选项，能够显著提升整体性能。

```json
{
  "jsc": {
    "transform": {
      "optimizer": {
        "globals": {
          "vars": {
            "__DEV__": "true",
            "process.env.NODE_ENV": "\"production\""
          }
        }
      }
    }
  }
}
```

```js
if (__DEV__) {
    console.log("Development mode");
}

if (process.env.NODE_ENV === "production") {
    console.log("Production mode");
}
```

**jsc.transform.optimizer.jsonify**

`jsc.transform.optimizer.jsonify` 是 SWC 中一个有用的优化选项，可以通过将对象和数组字面量转换为 JSON 字符串来提升代码的执行效率和减少代码大小。对于包含大量静态数据的项目，启用此选项可以显著提高性能。

```js
{
  "jsc": {
    "transform": {
      "optimizer": {
        "jsonify": true
      }
    }
  }
}
```

```js
// Before
const data = {
    name: "SWC",
    version: 1.0,
    features: ["fast", "reliable"]
};
const config = [1, 2, 3, { enabled: true }];
// After
const data = JSON.parse('{"name":"SWC","version":1.0,"features":["fast","reliable"]}');
const config = JSON.parse('[1,2,3,{"enabled":true}]');
```

#####  jsc.keepClassNames

说明：启用此选项将使swc保留原始类名。

type：boolean

##### jsc.paths

说明：和typescript一样

type：string

##### jsc.baseUrl

说明：路径必须指定为绝对路径。

type：string

##### jsc.minify

压缩代码，后面会详细解释

##### jsc.experimental

**jsc.experimental.keepImportAssertions**

说明：保留导入断言。这是实验性的，因为ecmascript规范还没有涵盖导入断言。

type：boolean

**jsc.experimental.plugins**

它遵循node.js的解析规则。

```js
{
  "jsc": {
    "experimental": {
      "plugins": [
        ["@swc/plugin-styled-jsx", {}]
      ]
    }
  }
}
```

##### jsc.preserveAllComments

说明：是否保留注释

type：boolean

##### jsc.transform.useDefineForClassFields

说明：初始化class时使用的规则默认false就好

type：boolean

##### jsc.transform.decoratorVersion

说明：`jsc.transform.decoratorVersion` 选项用于选择 SWC 在编译装饰器时使用的版本。根据项目需求和所依赖的技术栈，可以选择使用 `legacy` 或 `2023-05` 版本的装饰器提案，以确保装饰器行为符合预期

type：legacy |2023-05|string

##### jsc.output.charset

说明：输出的字符集

type：utf8 | ascii 

### Multiple Entries

```json
[
  {
    "test": ".*\\.js$",
    "module": {
      "type": "commonjs"
    }
  },
  {
    "test": ".*\\.ts$",
    "module": {
      "type": "amd"
    }
  }
]
```

这使得SWC将JavaScript文件编译为CommonJS模块，并将TypeScript文件编译为AMD模块。

### exclude

```json
{
  "exclude": [".*\\.js$", ".*\\.map$"],
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": true,
      "dynamicImport": true
    }
  }
```

### sourceMaps

通过将 `sourceMaps: true` 或 `sourceMaps: 'inline'` 添加到 `.swcrc` 来启用源映射。

### inlineSourcesContent

果您想让 `swc` 将文件的内容存储到源映射中，您可以将 `inlineSourcesContent` 设置为 `true` 。

### isModule

type：true、false、"unknown"

用于将输入视为模块或脚本。如果设置为 `unknown` ，如果是esm，则为 `Module` ，否则为 `Script` 。

## Supported Browsers（支持的浏览器）

```json
{
  "env": {
    "targets": {
      "chrome": "79"
    },
    "mode": "entry",
    "coreJs": "3.22"
  }
}
```

#### Options

**targets **

`string | Array<string> | { [string]: string }` ，默认为 `{}` 。

描述您的项目支持/目标环境。这可以是浏览器列表兼容的查询（有限制）：

```json
{
  "env": {
    "targets": "> 0.25%, not dead"
  }
}
```

或要支持的最低环境版本的对象：

```json
{
  "env": {
    "targets": {
      "chrome": "58",
      "ie": "11"
    }
  }
}
```

Example environments: 示例环境：

- `chrome`
- `opera`
- `edge`
- `firefox`
- `safari`
- `ie`
- `ios`
- `android`
- `node`
- `electron`

如果未指定 `targets` ，SWC将使用 `browserslist` 获取目标信息。

**path **

`path` 指定加载 `browserslist` 模块和任何browserslist配置文件的目录。例如，package.json中的 `.browserslistrc` 或 `browserslist` 字段。如果生成系统不在项目的根目录中，这会很有用。

**skip**

定义要跳过的ES功能以减少捆绑大小。例如，您的 `.swcrc` 可能是：

```json
{
  "env": {
    "skip": ["core-js/modules/foo"]
  }
}
```

`env.skip` 选项在 SWC 中允许通过布尔值或数组来控制环境变量的处理。设置为数组时，可以更精细地指定哪些环境变量在编译过程中应被跳过处理，从而提供更大的灵活性和定制化能力。在使用该选项时，需要仔细考虑跳过处理的环境变量对代码功能的影响。

**coreJs**

`coreJs` 指定要使用的 `core-js` 的版本，可以是swc支持的任何core-js版本。

该选项与 `mode: "usage"` 或 `mode: "entry"` 一起使用时有效。建议指定次要版本（例如 `"3.22"` ），否则 `"3"` 将被解释为 `"3.0"` ，其中可能不包括最新功能的polyfill。

## Modules 

SWC 可以使用 ES 模块将您的代码转译为 CommonJS 或 UMD/AMD。默认情况下，模块语句将保持不变。

### CommonJS

```json
{
  "module": {
    "type": "commonjs",
  }
}
```

### ES6

```json
{
  "module": {
    "type": "es6",
  }
}
```

### AMD

```json
{
  "module": {
	"type": "amd",
    // Optional. If specified, swc emits named AMD module.
    "moduleId": "foo",
  }
}
```

### UMD

```json
{
  "module": {
    "type": "umd",
    "globals": {},
  }
}
```

### Shared Options 

这些选项由 `.swcrc` 内的 `commonjs` / `es6` / `umd` / `amd` 共享：

```json
{
  "module": {
    // You can specify "commonjs", "es6", "amd", "umd"
    "type": "commonjs",
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false,
    "ignoreDynamic": false
  }
}
```

#### strict 

默认为 `false` 。默认情况下，在 SWC 中使用导出时，会导出不可枚举的 `__esModule` 属性。在某些情况下，此属性用于确定导入是默认导出还是包含默认导出。

要防止导出 `__esModule` 属性，您可以将 strict 选项设置为 `true` 。

#### strictMode 

默认为 `true` 。如果为 true，swc 会发出“use strict”指令。

#### noInterop

默认为 `false` 。默认情况下，当使用 swc 导出时，会导出不可枚举的 `__esModule` 属性。然后，此属性用于确定导入是否是默认导出，或者是否包含默认导出。

如果不需要自动展开默认值，您可以将 noInterop 选项设置为 true 以避免使用 interopRequireDefault 帮助器（如上面的内联形式所示）

#### ignoreDynamic 

如果设置为 `true` ，将保留动态导入。

#### importInterop 

如果 `noInterop` 为 true，则默认为 `none` ，否则为 `swc` 

#### resolveFully 

当设置为 `true` 时，完全解析模块 `import` 文件路径，包括任何以 `index.js` 结尾的文件路径。

## Minification(压缩)

```json
{
  // Enable minification
  "minify": true,
  // Optional, configure minification options
  "jsc": {
    "minify": {
      "compress": {
        "unused": true
      },
      "mangle": true
    }
  }
}
```

### 配置

::: tip 注意

如果将 `jsc.minify.compress` 设置为 `true` 或 `{}` ，SWC 将仅保留许可证注释。如果您不希望这样，请修改 `jsc.minify.format` 。

:::

#### `jsc.minify.compress`

Type: `boolean | object`. 

```json
{
  "jsc": {
    "minify": {
      "compress": true // equivalent to {}
    }
  }
}
```

详细规则请阅读(官网)[https://swc.rs/docs/configuration/minification#jscminifycompress]

#### `jsc.minify.mangle`

Type: `boolean | object`.

类似于 `terser` 的 (mangle)[https://terser.org/docs/options/#mangle-options] 选项。

```json
{
  "jsc": {
    "minify": {
      "mangle": true // equivalent to {}
    }
  }
}
```

#### `jsc.minify.format`

这些属性大多尚未实现，但它的存在是为了支持将 terser 配置传递到 swc minify 而不进行修改。[官网](https://swc.rs/docs/configuration/minification#jscminifyformat)

