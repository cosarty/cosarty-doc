# js 技巧


## 合成事件
> 多个按键对应一个文字
::: normal-demo 移动端 1px 解决方案

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