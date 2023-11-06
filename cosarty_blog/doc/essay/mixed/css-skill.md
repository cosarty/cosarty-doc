# 不常用的 css 属性

## writing-mode 垂直数字

::: normal-demo 垂直数字

```html
<div class="demo">
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <span>4</span>
  <span>5</span>
  <span>6</span>
  <span>7</span>
</div>
```

```css
.demo {
  writing-mode: vertical-lr;
  text-orientation: upright;
}
```

:::

## shape-outside 文字环绕

> shape-outside 属性用来定义浮动元素的浮动区域。这个浮动区域决定了行内内容（浮动元素）所包裹的形状。也就是说，当元素浮动的时候，元素周围的文字内容以何种方式环绕。

语法：

```css
shape-outside: keyword | [keyword] Function | url | gradient | global;
```

### 关键字值

none
none: 不对浮动区域进行任何设置，使用浏览器的默认行为，文字以浮动元素的 margin 边际进行围绕;
margin-box： 环绕文字按照浮动元素的外边距边界进行围绕；

content-box：环绕文字按照浮动元素的边框边界进行围绕；
padding-box：环绕文字按照浮动元素的内边距边界进行围绕；

content-box：环绕文字按照浮动的内容区域进行围绕；

**其他的属性值类似 clip-path**

::: normal-demo 文字环绕

```html
<div class="box1">
  <img src="/assets/image/97354534_p0_master1200.jpg" id="img01" />
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
  <div>请环绕我呈半圆形排列</div>
</div>
```

```css
.box1 {
  width: 500px;
}
#img01 {
  width: 250px;
  height: 250px;
  margin: 10px;
  float: left;
  border-radius: 50%;
  /* shape-outside: border-box; */
  /*polygon：多边形  多角形*/
  shape-outside: polygon(0 100%, 50% 0, 100% 100%, 0 100%);
}
```

:::

## aspect-ratio 同比布局

CSS aspect-ratio 属性接收以 `"/"` 分隔的两个数字作为属性值，分别代表宽度和高度的比例，例如 16 / 9 表示 16:9 的纵横比， 5 / 4 表示 5:4 的纵横比：

```css
aspect-ratio: 16 / 9; // 纵横比为 16:9
aspect-ratio: 5 / 4; // 纵横比为 5:4
```

`"/"` 和后面的高度比可以省略，默认为 1

```css
aspect-ratio: 4; // 纵横比为 4:1
```

aspect-ratio 属性值也可以设置为 auto，在缩放的时候，保持一定的纵横比：

```css
aspect-ratio: auto; // 保持原有的纵横比
```

::: normal-demo 垂直数字

```html
<div class="box">
  <img src="/assets/image/97354534_p0_master1200.jpg" />
</div>
```

```css
.box {
  width: 500px;
  height: 500px;
  border: 1px solid red;
  resize: both; // 图片容器设置随意缩放
  overflow: auto;
}

.box img {
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 16/9; // 设置图片的纵横比为 1:1，最大高度和宽度都是容器的 100%，图片不会超出容器
}
```

:::

## text-fill-color 渐变文字

::: normal-demo 渐变文字

```html
<h3 class="panel-title">background-clip + text-fill-color</h3>
```

```css
.panel-title {
  background: linear-gradient(
    to right,
    rgb(255, 0, 0) 0%,
    rgba(0, 0, 255, 0.8) 50%,
    rgb(128, 0, 128) 80%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

:::

## text-align: justify 文本双端对齐

::: normal-demo 文本双端对齐

```html
<div class="text">首页</div>
```

```css
.text {
  width: 90px;
  font-weight: 700;
  text-align: justify;
  border: 1px solid #ccc;
}
.text::after {
  content: '';
  display: inline-block;
  width: 100%;
  margin-top: -20px;
  height: 10px;
}
```

:::

## filter: drop-shadow 文本双端对齐

::: normal-demo 文本双端对齐

```html

<h3>
  filter: drop-shadow
</h3>
<div class="box drop-shadow">
    <i class="cor"></i>
    filter: drop-shadow
  </div>
<h3>
  filter: box-shadow
  
</h3>
<div class="box box-shadow">
    <i class="cor"></i>
    filte
```

```css
.box {
  margin: 40px; padding: 50px;
  background-color: #fff;
  position: relative;
  font-size: 24px;
}
.cor {
  position: absolute;
  left: -40px;
  width: 0;
  height: 0;
  overflow: hidden;
  border: 20px solid transparent;
  border-right-color: #fff;
}
.drop-shadow {
  filter: drop-shadow(5px 5px 5px black);
}
.box-shadow{
   box-shadow:5px 5px 5px black;
}

```

:::