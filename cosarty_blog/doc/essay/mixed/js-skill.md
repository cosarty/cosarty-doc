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
function search(){
  console.log('搜索',inp.value)
}
inp.addEventListener('input',function(){
  if(!isComposition){
     console.log('input')
      search()
  }
 
})
inp.addEventListener('compositionstart',function(){
  isComposition = true
  console.log('start')

})
inp.addEventListener('compositionend',function(){
  console.log('end')
  search()
  isComposition= false
})
```

:::

## 判断js的启动环境

```javascript
require.main === module
```
判断js文件的执行环境是不是 node

 - [具体细节可以看这一个视频](https://www.bilibili.com/video/av80554200/?zw&vd_source=c191d8a5710b10bf82cce87c957298ca)