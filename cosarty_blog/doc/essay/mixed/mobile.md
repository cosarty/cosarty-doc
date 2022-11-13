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
