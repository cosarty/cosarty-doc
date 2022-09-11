---
title: esm和cjs的循环引用问题.
isOriginal: true
sidebar: false
# icon: emoji
description: esm和cjs的循环引用机制的思考
category: 前端
tag: js
---

# ES module 循环

> ES module 是 ES6 官方发布的 Module 特性,利用 export/import 实现导出/导入。我们看看下面的结果(在 script 上加上 type='module',即可实现 ES module):

```javascript
/*a.js*/
import { count } from './b.js';
console.log(count);
export let message = 'hello';
/*b.js*/
import { message } from './a.js';
export let count = 5;
setTimeout(() => {
  console.log(message);
}, 0);
```

调用流程:

- (1)程序先进入 a.js,执行 import {count} from 'b.js',进入 b.js;
- (2)b.js 中执行 import {message} from 'a.js',企图再次进入 a.js,但是 a.js 已经请求过,但没有解析完,被标记为 Fetching,（内部有一个 Module Map,专门记录一个 Module 当前的状态,如果解析完成就获取它的 Module Record(类似 AST,会分析出该模块的 import,export,获得依赖关系)；如果没有解析完成,则被标记为 Fetching,不做处理,继续执行。）,此时从 a.js 中没有任何导出,无法获取 message(可以认为此时 message 为 undefined)。
- (3)b.js 执行完毕,导出了 count,在 a.js(b.js 的上层）中找到 count,将它们链接起来(指向同一个地址)
- (4)返回 a.js 中继续执行,导出了 message,在 b.js(a.js 的上层）中找到 message,将它们链接起来(指向同一个地址)
- (5)b.js 中的 setTimeout 执行,得到了 a.js 中导出的 message。

# commonJS 循环

> commonJS 是 nodeJS 中的模块引用,利用 require/exports 实现导出/导入,看看下面的结果(在 nodeJS 环境中执行):

```javascript
/*c.js*/
var count = require('./d.js').count;
console.log(count);
exports.message = 'hello';
/*d.js*/
var message = require('./c.js').message;
exports.count = 5;
setTimeout(function () {
  console.log(message);
}, 0);
```

调用流程:

- (1)c.js 执行 require('./d.js'),进入 d.js。
- (2)d.js 中执行 require('./c.js'),企图再次进入 c.js,但是 c.js 已经被加载过,因此 require('./c.js')会得到一个空对象。（内部给每个模块的导出都定义了一个对象,如果一个模块有导出,那么相当于这个导出对象上多了一组 key,value)。此时的 require('./c.js').message 为 undefined。
- (3)d.js 执行完,导出了 count;c.js 执行完,导出 message。
- (4)d.js 中的 setTimeout 执行,但是 message 仍然为 undefind。

# 区别

ES module 趋向于构建依赖树,它会沿着一个入口,根据 import 关系(利用 AST 分析)去构建一棵依赖树,遍历到树的叶子模块后,然后根据依赖关系,反向（向上）找到父模块,将 export/import 指向同一地址。
而 commonJS 的导出则简单的多,它将每个模块的导出视为一个对象,在刚进入模块的时候,就为它准备好了一个空对象作为它的导出结果,如果有导出就在这个对象上增加 key,value。因此,别的模块得到的引用对象则仅仅只是这个导出对象的引用。

## commonJS 获取正确结果

```javascript
var o = {}; //进入c.js,初始化导出对象为空对象
var m = o.message; //进入d.js,先获取message
setTimeout(function () {
  //d.js中,定时获取message内容
  console.log(m);
}, 0);
o.message = 'hello'; //回到c.js中,重新给message赋值
```

上面的演示就是按照 commonJS 导入/导出逻辑来的,我们很容易发现结果是不对的,因为第一个获取的 message 和第二次赋值的 message 没有任何关系,自然也就得不到正确结果了。

如果想让上面的 commonJS 循环得到正确的结果,可以改写如下:

```javascript
/*c.js*/
var count = require('./d.js').count;
console.log(count);
exports.message = 'hello';
/*d.js*/
var obj = require('./c.js');
exports.count = 5;
setTimeout(function () {
  console.log(obj.message);
}, 0);
```
