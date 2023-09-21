# scss 指南

## 安装

> npm i -g sass

初始化一个 package.json，`npm init -y`

配置一个 script 脚本用来编译

```json
 "scripts": {
    "watch": "sass --watch scss:css --style expanded --no-source-map"
  }
```

::: tip
\[scss]:\[css] 第一个方框里面代表源路劲第二个方框代表目标路径，sass 会自动跟踪文件变化
:::

一些常用命令

- sass -h
- sass -w
- sass -v

## 变量

sass 的变量是使用 `$` 符号来定义的,变量的命名规则连接符选择`_`和`-`都可以使用看个人习惯，在 sass 的大多数地方，中划线命名的内容和下划线命名的内容是互通的

**sass 的变量就是在编译的时候替换到 css 属性上面去**

例：

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: rgb(89, 46, 158);

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

变量作用域

scss 的变量作用域分为`块级作用域`和`全局作用域`

```scss
$nav-color: #f90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}
```

块内如果有相同名字的变量则后面的变量会覆盖前面的变量

```scss
$width: 50px;
nav {
  $width: 100px;

  &#active {
    $width: 120px;
  }
  width: $width; // 120px

  &.active {
    $width: 110px;
  }
}
```

::: tip 注意

凡是`css`属性的标准值（比如说 1px 或者 bold）可存在的地方，变量就可以使用

:::

```scss
$base-boder: 1px solid;
.border {
  border: $base-boder red;
}
```

## 嵌套规则

### 后代选择器

```scss
#content {
  article {
    h1 {
      color: #333;
    }
    p {
      margin-bottom: 1.4em;
    }
  }
  aside {
    background-color: #eee;
  }
}
```

### 父选择器 &

当我们编写`:hover`或者`::after` 等这些伪类或者伪元素的时候就需要用到父选择器

```scss
article a {
  color: blue;
  &:hover {
    color: red;
  }
}
```

还有一种巧妙的用法，我们可以在父选择器之前添加选择器,这种情况方便我们做一些样式隔离

```scss
#content aside {
  color: red;
  body.ie & {
    color: green;
  }
}
```

& 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器

```scss
#main {
  color: black;
  &-sidebar {
    border: 1px solid;
  }
}
```

### 联合选择器

多个选择器同时使用某一些样式我们叫做联合选择

```scss
.container {
  h1,
  h2,
  h3 {
    margin-bottom: 0.8em;
  }
}

nav,
aside {
  a {
    color: blue;
  }
}
```

### 子选择器 和 兄弟选择器

```scss
article {
  ~ article {
    border-top: 1px dashed #ccc;
  }
  > section {
    background: #eee;
  }
  dl > {
    dt {
      color: #333;
    }
    dd {
      color: #555;
    }
  }
  nav + & {
    margin-top: 0;
  }
}
```

### 嵌套属性

嵌套属性的规则是这样的：把属性名从中划线-的地方断开，在根属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中。

```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}

//或者 超级方便是不是
nav {
  border: 1px solid #ccc {
    left: 0px;
    right: 0px;
  }
}
```

## 导入 sass 文件

::: info

sass 内置了`import`功能，但是 scss 和 css 的 import 不太一样，css 的 import 是当执行到 import 语句的时候再去下载对应的 css 文件，而 scss 的 import 规则生成 css 文件时就把相关文件导入进来，这意味着所有相关的样式被归纳到了同一个 css 文件中，而无需发起额外的下载请求。

:::

例:不需要加文件后缀

```scss
@import 'color';
```

### 局部文件

使用@import 导入 scss 文件的时候相当于，直接混入到单前文件中，有时候会生成额外文件，如果我们不想要生成额外文件的话，则需要局部文件

- 声明

当我们使用`_`(下划线)来声明一个 scss 文件的时候，当前这个 scss 文件就是一个局部文件，导入的时候可以不需要写`_`

例:

```scss
//file：_color.scss
@import 'color';
```

### 默认变量值

一般情况下，你反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值，如果你希望别人可以修改你的变量值的情况你可以使用默认变量

**语法**：!default

**含义**：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。

```scss
$fancybox-width: 400px !default;
.fancybox {
  width: $fancybox-width;
}
```

### 嵌套导入

sass 允许@import 命令写在 css 规则内

```scss
.blue-theme {
  @import 'blue-theme';
}
```

::: tip

被导入的局部文件中定义的所有变量和混合器，也会在这个`规则范围内生效`。这些变量和混合器`不会全局有效`，这样我们就可以通过嵌套导入只对站点中某一特定区域运用某种颜色主题或其他通过变量配置的样式。

:::

## 静默注释

```scss
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

## 混合器

语法:@mixin 混合器名字

使用: @include 调用会把混合器中的所有样式提取出来放在@include 被调用的地方

例：

```scss
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
```

::: tip 何时使用混合器

如果你发现自己在不停地重复一段样式，那就应该把这段样式构造成优良的混合器，尤其是这段样式本身就是一个逻辑单元，比如说是一组放在一起有意义的属性。

:::

### 混合器中的 CSS 规则

混合器中不仅可以包含属性，也可以包含 css 规则，包含选择器和选择器中的属性

```scss
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
```

### 混合器传参

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}

// 使用

a {
  @include link-colors($normal: blue, $visited: green, $hover: red);
}
```

### 默认参数

```scss
@mixin link-colors($normal, $hover: $normal, $visited: $normal) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}
```

### 参数变量 (Variable Arguments)

```scss
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

```scss
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}
$values: #ff0000, #00ff00, #0000ff;
.primary {
  @include colors($values...);
}
```

### 向混合样式中导入内容

```scss
@mixin apply-to-ie6-only {
  * html {
    @content;
  }
}
@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
```

## 继承

scss 里面的继承是通过 `@extend`来实现，那`@extend`和`@mixin`有什么区别呢，首先`@mixin`的含义是混入也就是用几次`@mixin`就相当于复制了几次 css 代码注入到指定位置，而`@extend`则是将不同样式之间的相同之处提取出来，需要的时候直接引用，可以控制使其是否生成代码

- 基本用法

  例：

```scss
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
}

.alert-info {
  @extend .alert;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}

.alert-success {
  @extend .alert;
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
```

```scss
.alert-danger {
  @extend .alert;
  @extend .important;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
```

- 占位符用%
你可能发现被继承的css父类并没有被实际应用，也就是说html代码中没有使用该类，它的唯一目的就是扩展其他选择器。

对于该类，可能不希望被编译输出到最终的css文件中，它只会增加CSS文件的大小，永远不会被使用。

这就是占位符选择器的作用。

```scss
%alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 12px;
}
 
.alert-info {
    @extend %alert;
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
}

```


## 插值语句 `#{}`

通过 `#{}` 插值语句可以在选择器或属性名中使用变量：

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
```

`#{}`插值语句也可以在属性值中插入 SassScript，大多数情况下，这样可能还不如使用变量方便，但是使用 `#{}`可以避免 Sass 运行运算表达式，直接编译 CSS。

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

## & in SassScript

```scss
@mixin does-parent-exist {
  @if & {
    &:hover {
      color: red;
    }
  } @else {
    a {
      color: red;
    }
  }
}
```

## @media 指令

Sass 中 @media 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
```

## @at-root

将选择器提升到最外层

```scss
.parent {
  ...
  @at-root .child { ... }
}

// 效果

.parent { ... }
.child { ... }

```

## 控制指令

### @if

```scss
$type: 'monster';
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

### @for

@for 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。

这个指令包含两种格式:

- `@for $var from <start> through <end>`
- `@for $var from <start> to <end>`

区别在于 `through` 与 `to` 的含义：当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和` <end>` 必须是整数值。

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
```

### @each

`@each` 指令的格式是` $var in <list>`,` $var` 可以是任何变量名，比如 `$length` 或者 $name，而 `<list>` 是一连串的值，也就是值列表。

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

**二维数组的遍历**

```scss
@each $animal, $color, $cursor in (puma, black, default), (
    sea-slug,
    blue,
    pointer
  ), (egret, white, move)
{
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```

**遍历 map**

```scss
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

### @while

`@while`指令重复输出格式直到表达式返回结果为 false。这样可以实现比 `@for` 更复杂的循环，只是很少会用到。例如：

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

## 函数指令

```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar {
  width: grid-width(5);
}
```

## @use

建议使用`@use`代替`@import`

> `@use`在`@import`的基础上加入了命名空间的功能，进行了模块文化隔离，当我们使用`@use`规则从其他 `Sass`样式表加载`mixins`、`functions`和变量，并将来自多个样式表的 CSS 组合在一起。加载的样式表`@use`称为“模块”

### 加载成员

`<namespace>.<variable>`您可以通过编写、`<namespace>.<function>()`或来从另一个模块访问变量、函数和混入@include `<namespace>.<mixin>()`。默认情况下，命名空间只是模块 URL 的最后一个组成部分。

```scss
@use 'src/corners';

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```

### 命名空间重命名

```scss
@use 'src/corners' as c;

.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

您甚至可以通过编写 来加载没有`@use "<url>" as *`命名空间的模块。不过，我们建议您只对您编写的样式表执行此操作；否则，他们可能会引入新成员，导致名称冲突！

```scss
@use 'src/corners' as *;

.button {
  @include rounded;
  padding: 5px + $radius;
}
```

### 私有变量

```scss
// src/_corners.scss
$-radius: 3px;

@mixin rounded {
  border-radius: $-radius;
}

// style.scss
@use 'src/corners';

.button {
  @include corners.rounded;

  // This is an error! $-radius isn't visible outside of `_corners.scss`.
  padding: 5px + corners.$-radius;
}
```

### 配置模块变量

样式表可以定义带有!default 标志的变量，使它们可配置。要加载带有配置的模块，请编写`@use <url> with (<variable>: <value>, <variable>: <value>)`. 配置的值将覆盖变量的默认值。

```scss
SCSS 语法
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```

配置

```scss
// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

## 高级指引

### sass:list

使用: `@use 'sass:list';`

list 的定义可以使用空格，逗号来分割

例:`$colors:red,blue,yellow`

常用方法

- list.append($list, $val, $separator: auto) 返回新列表
- list.index($list, $value) 返回下标
- list.join($list1, $list2, $separator: auto, $bracketed: auto) 合并列表
- list.length($list) 返回长度
- list.nth($list, $n) 取指定下标的元素
- list.set-nth($list, $n, $value) 设置指定下标的元素

### sass:map

使用: `@use 'sass:map';`

定义 map 例:` $font-weights: ("regular": 400, "medium": 500, "bold": 700);`

常用方法

- map.get($map, $key)获取指定 key 的值
- map.has-key($map, $key) 判断是否存在 key
- map.keys($map) 获取 key 列表
- map.merge($map1, $map2) 合并 map
- map.remove($map, $keys...) 删除指定 key
- map.values($map) 获取值列表
