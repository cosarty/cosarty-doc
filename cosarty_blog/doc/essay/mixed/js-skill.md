# js 技巧

## 合成事件

> 多个按键对应一个文字

::: normal-demo 合成事件

```html
<input type="text" />
```

```js
let inp = document.querySelector('input')
let isComposition = false
function search() {
  console.log('搜索', inp.value)
}
inp.addEventListener('input', function () {
  if (!isComposition) {
    console.log('input')
    search()
  }
})
inp.addEventListener('compositionstart', function () {
  isComposition = true
  console.log('start')
})
inp.addEventListener('compositionend', function () {
  console.log('end')
  search()
  isComposition = false
})
```

:::

## 判断 js 的启动环境

```javascript
require.main === module
```

判断 js 文件的执行环境是不是 node

- [具体细节可以看这一个视频](https://www.bilibili.com/video/av80554200/?zw&vd_source=c191d8a5710b10bf82cce87c957298ca)

## 判断移动端设备

```js
const ua = navigator.userAgent.toLowerCase()
const isMobile =
  /phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone/.test(
    ua
  )
```

## 正则表达式 lastIndex 的 技巧

::: tip
当正则表达式开启 `g`、`y`模式的时候会记录 lastIndex 的值，每次匹配都从 lastIndex 开始匹配，所以会导致匹配不准，因此需要重新设置 lastIndex 的值
:::

::: normal-demo 正则表达式 lastIndex 的 技巧

```html
密码校验: <input id="inp" /> <span id="tip"></span>
```

```js
const input = document.getElementById('inp')
const tip = document.getElementById('tip')
const reg = /^1\d{10}$/g
input.oninput = change = (e) => {
  reg.lastIndex = 0
  if (reg.test(e.target.value)) {
    tip.textContent = '过'
  } else {
    tip.textContent = '不过'
  }
}
```

:::


