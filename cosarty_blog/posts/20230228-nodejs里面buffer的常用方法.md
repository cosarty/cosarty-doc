---
description: nodejs里面buffer的常用方法
tag:
  - js
  - node
category: 
  - 后端
  - 前端
date: 2023-02-28
---

# nodejs里面buffer的常用方法

### 1. 什么是Buffer

##### 1.1 了解buffer内存分配

buffer对象的内存分配并不是在V8的堆内存中，而是在Node的C++层面实现内存的申请；为了高效的使用申请来得内存，Node中采用slab分配机制（一种动态内存管理机制）。

##### 1. 2 buffer的全局性

Node在进程启动时buffer就已经加装进入内存，并将其放入全局对象，使用时候可以无需require引入，但是官方但仍然建议通过 import 或 require 语句显式地引用它。

### 2. 创建Buffer

buffer实例除了可以在文件读取，http请求得到之外，还可以通过手动方式构造创建。

##### 2.1 Buffer.alloc(size[, fill[, encoding]])

参数：

- size: buffer长度
- fill: 预填充值，默认值：0
- encoding: 如果fill是字符串，则就是字符串的编码，默认：utf-8

```js
import { Buffer } from 'buffer';

const buf = Buffer.alloc(8);

console.log(buf);
// <Buffer 00 00 00 00 00 00 00 00>
```

##### 2.2 Buffer.allocUnsafe(size)

参数：

- size: 新的buffer所需要长度
- 以这种方式创建的 Buffer 实例的底层内存不会被初始化。 新创建的 Buffer 的内容是未知的，可能包含敏感的数据。

```js
import { Buffer } from 'buffer';

const buf = Buffer.allocUnsafe(8);

console.log(buf);
// <Buffer e8 bf 99 e6 98 af e4 b8 80 e6>
```

##### 2.3 Buffer.from(string[, encoding])

创建包含传入string的新buffer

参数：

- string: 字符串
- encoding: 编码,默认值：utf-8

```js
import { Buffer } from 'buffer';

const buf = Buffer.from('hello buffer');

console.log(buf);
// <Buffer 68 65 6c 6c 6f 20 62 75 66 66 65 72>
```

##### 2.4 Buffer.from(array)

使用 `0` – `255` 范围内的字节 `array` 分配新的 `Buffer`。

```js
import { Buffer } from 'buffer';

const array = [0x62, 0x78, 0x84];
const buf = Buffer.from(array);

console.log(buf);
// <Buffer 62 78 84>
```

### 3. 复制Buffer

##### 3.1 Buffer.from(buffer)

参数：

- buffer,要复制的buffer实例

```js
import { Buffer } from 'buffer';
// 新建
const buf1 = Buffer.alloc(10, 2);
// 复制
const buf2 = Buffer.from(buf1);

console.log(buf1);
// <Buffer 02 02 02 02 02 02 02 02 02 02>
console.log(buf2);
// <Buffer 02 02 02 02 02 02 02 02 02 02>
```

##### 3.2 buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

将buf实例复制到target目标

```js
import { Buffer } from 'buffer';

const buf1 = Buffer.alloc(10, 2);
const buf2 = Buffer.allocUnsafe(10)
// 将buf1复制到buf2
buf1.copy(buf2);

console.log(buf1);
// <Buffer 02 02 02 02 02 02 02 02 02 02>
console.log(buf2);
// <Buffer 02 02 02 02 02 02 02 02 02 02>
```

### 4. 拼接Buffer

##### 4.1 Buffer.concat(list[, totalLength])

返回list中所有buffer实例连接在一起的新buffer

参数：

- list:<Buffer[]> | <Unit8Array[]>
- totalLength: 连接总长度。

`注意`：

- 如果列表没有条目，或者 totalLength 为 0，则返回新的零长度 Buffer。
- 如果未提供 totalLength，则从 list 中的 Buffer 实例通过相加其长度来计算。

```js
import { Buffer } from 'buffer';

const buf1 = Buffer.alloc(4, 2);
const buf2 = Buffer.alloc(4, 3);

const buf3 = Buffer.concat([buf1, buf2]);

console.log(buf1); // <Buffer 02 02 02 02>
console.log(buf2); // <Buffer 03 03 03 03>
console.log(buf3); // <Buffer 02 02 02 02 03 03 03 03>
```

### 5. 截取Buffer

##### 5.1 buf.slice([start[, end]])

从buf实例中返回新的Buffer实例，返回的新Buffer实例只是源buf实例的引用，即对新返回的实例修改会影响原有的Buffer实例

参数：

- start: 起始位置，默认0
- end: 结束位置，默认buf.length

```js
import { Buffer } from 'buffer';

const buf1 = Buffer.alloc(10, 2);
// 截取
const buf2 = buf1.slice(1,4);
// 截取部分修改
buf2[0] = 0x63;

console.log(buf1);
// <Buffer 02 63 02 02 02 02 02 02 02 02>
console.log(buf2);
// <Buffer 63 02 02>
```

### 6. 填充Buffer

##### 6.1 buf.fill(value[, offset[, end]][, encoding])

参数：

- value,填充值
- offset: 在开始填充 buf 之前要跳过的字节数,默认值0
- end: 结束填充buf(不包括在内)的位置，默认值buf.length
- encoding,如果value值为字符串，则为字符串编码，默认utf-8

```js
import { Buffer } from 'buffer';

const buf1 = Buffer.allocUnsafe(8).fill(2);

console.log(buf1);
// <Buffer 02 02 02 02 02 02 02 02>
```

##### 6.2 buf.write(string[, offset[, length]][, encoding])

根据 encoding 中的字符编码将 string 写入 buf 的 offset 处。

`注意`：length 参数是要写入的字节数。 如果 buf 没有足够的空间来容纳整个字符串，则只会写入 string 的一部分

参数：

- string: 写入的字符串值
- offset: 开始写入 string 之前要跳过的字节数,默认值为0
- length: 写入的最大字节数，默认值buf.length - offset
- encoding: 编码，默认utf-8

```js
import { Buffer } from 'buffer';
// buf1 length为12
const buf1 = Buffer.alloc(12, 3);
// write offset大于buf1.length,写入无效
buf1.write('hello', 12);

console.log(buf1);
// <Buffer 03 03 03 03 03 03 03 03 03 03 03 03>
// 部分写入
buf1.write('hello', 10);
// <Buffer 03 03 03 03 03 03 03 03 03 03 68 65>
```

### 7. Buffer工具方法

##### 7.1 Buffer.isBuffer(obj)

检验传入obj是否为buffer

```js
import { Buffer } from 'buffer';

const buf1 = Buffer.alloc(12, 3);

console.log(Buffer.isBuffer(buf1));
// true
```

##### 7.2 Buffer.isEncoding(encoding)

检查传入的编码名称是否被Buffer所支持

```js
import { Buffer } from 'buffer';

console.log(Buffer.isEncoding('utf-8'))
// true
```

### 8. Buffer与String的转换

Buffer转String

##### 8.1 buf.toString([encoding[, start[, end]]])

参数：

- encoding:使用的字符串编码，默认utf-8
- start,开始位置，默认0
- end,结束位置，默认buf.length

```js
import { Buffer } from 'buffer';

const buf1 = Buffer.allocUnsafe(26)

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf1[i] = i + 97;
}

console.log(buf1.toString())
// abcdefghijklmnopqrstuvwxyz
```

String转Buffer

##### 8.2 Buffer.from(string[, encoding])

参数：

- string: 字符串
- encoding: 编码,默认值：utf-8

```js
import { Buffer } from 'buffer';

const buf = Buffer.from('hello buffer');

console.log(buf);
// <Buffer 68 65 6c 6c 6f 20 62 75 66 66 65 72>
```

### 9. Buffer与Array的对比

##### 9.1 与Array类似点

- 可以使用下标获取指定位置的值
- 可以使用length属性获取Buffer大小
- 可以使用for...of遍历

##### 9.2 与Array不同之处

- 存储的是16进制的两位数
- 值为0-255
- 支持多种编码格式
- 内存不在v8堆中分配
- 底层有c++实现，上层由js控制

作者：ktb07
链接：https://juejin.cn/post/7046297380764778509
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。