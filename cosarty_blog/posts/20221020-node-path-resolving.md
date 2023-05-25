---
sidebar: false
# icon: emoji
description: node下几种路劲解析的方式
tag:
  - node
category: 前端
date: 2022-10-20
---

# node-path-resolving

:::note
本文主要介绍三种路径解析方式，以及区别

- path.relove
- path.join
- require.resolve

:::

## path.relove

```javascript
var path = require('path') //引入node的path模块

console.log(path.resolve('/foo/bar', './baz')) // returns '/foo/bar/baz'
console.log(path.resolve('/foo/bar', 'baz')) // returns '/foo/bar/baz'
console.log(path.resolve('/foo/bar', '/baz')) // returns '/baz'
console.log(path.resolve('/foo/bar', '../baz')) // returns '/foo/baz'
console.log(path.resolve('home', '/foo/bar', '../baz')) // returns '/foo/baz'
console.log(path.resolve('home', './foo/bar', '../baz')) // returns '/home/foo/baz'
console.log(path.resolve('home', 'foo/bar', '../baz')) // returns '/home/foo/baz'
console.log(
  path.resolve('home', 'foo', 'build', 'aaaa', 'aadada', '../../..', 'asset')
)
```

:::tip
我们可以将 path.resolve() 理解成 cd 的操作就好

path.resolve() 该方法将一些的 路径/路径段 解析为绝对路径。
:::

## path.join

```javascript
console.log(path.join(__dirname, '/foo'))
console.log(path.join(__dirname, './foo/bar'))
console.log(path.join('/foo', 'bar', '/baz/apple', 'aaa', '..'))
console.log(path.join('foo', 'bar', 'baz'))
```

:::tip
path.join 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
:::

## require.resolve

> 在 node 中，可以使用 require.resolve 来查询某个模块的完整路径，使用方式如下：

```javascript
// 绝对路径 -> /Users/enhanced-resolve/lib/node.js
require.resolve('/Users/enhanced-resolve/')
// 相对路径 -> /Users/enhanced-resolve/index.js
require.resolve('./index')
// 模块路径 -> /Users/enhanced-resolve/node_modules/diff/diff.js
require.resolve('diff')
```

:::note
刚开始看到结果可能会疑惑，为什么返回结果是 node.js？他是怎么找到 node_modules 下的 diff.js？下面我们好好解释一下
:::

### 绝对路径 resolve('/Users/enhanced-resolve/')

- 进入`\_findPath`，因为是绝对路径，所以仅在该目录下查找；
- 进入 `tryPackage`，获取到该目录下描述文件` package.json`，其中 `main: ./lib/node.js`，使用该路径查找；
- 进入 `tryFile`，解析出/Users/enhanced-resolve/lib/node.js；

### 相对路径 resolve('./index')

- 进入`\_resolveLookupPaths`，因为是相对路径，只返回一个搜索目录[/Users/enhanced-resolve]；
- 进入`\_findPath`，因为/Users/enhanced-resolve/index 不是文件，所以尝试使用扩展名查找
- 进入 `tryExtensions`，解析出/Users/enhanced-resolve/index.js;

### 模块路径 resolve('diff')

- 进入`\_resolveLookupPaths`，返回多个搜索目录["/Users/enhanced-resolve/node_modules", "/Users/node_modules", "/node_modules"];
- 进入`\_findPath`，首先解析第一个可能的目录/Users/enhanced-resolve/node_modules;
- 进入 `tryPackage`，获取到该目录下描述文件 package.json，其中 main: ./diff，使用该路径查找；
- 进入 `tryFile` 发现/Users/enhanced-resolve/node_mdoules/diff/diff 不是文件，返回;
- 进入 `tryExtensions`，解析出/Users/enhanced-resolve/node_mdoules/diff/diff.js;
