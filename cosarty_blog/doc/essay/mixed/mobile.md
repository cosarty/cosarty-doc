# 移动端的一些细节

## 移动端 1px 解决方案

::: normal-demo 移动端 1px 解决方案

```html
<div class="first">
  <div class="first-div">HELLO WORLD</div>
</div>
```

```css
.first {
  position: relative;
  font-size: 16px;
}
.first .first-div:before { 
  content: '';
  position: absolute;
  top: -50%;
  bottom: -50%;
  left: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  border: solid 1px red;
  box-sizing: border-box;
}
```

:::

## align-items: center 垂直居中隐藏

::: normal-demo lign-items: center 垂直居中隐藏

```html
  <div class="box">
        测试
  </div>
```

```css
    body{
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      /* align-items: center; */
    
      padding: 0;
      margin: 0;
    }
    .box{
      width: 200px;
      height: 300px;
      background-color: red;
    }

    .box{
      /* 采用margin 居中方案 */
      margin-top: auto;
      margin-bottom: auto;
    }

```

:::
