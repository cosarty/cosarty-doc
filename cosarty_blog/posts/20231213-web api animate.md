---
description: js animte api的使用
tag:
  - api
category:
  - 前端
  - js
date: 2023-12-13
---

# web api animate

## 介绍

`Web Animations API` 主要包含两个 `API`：`animate` 来执行动画，`getAnimations` 来获取当前元素的动画。

并且 `getAnimations` 不止可以获取到 `animate` 创建的动画，`css` 中的动画同样可以获取到。

## getAnimations

先来个小 `Demo`：

::: normal-demo Demo

```html
<div id="app">
  <div>
    <button id='play'>play</button>
    <button id='pause'>pause</button>
  </div>

  <div id="anim">
    hello world
  </div>
</div>
```

```js
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const anim = document.getElementById('anim');

setTimeout(()=>{
 const animate = anim.getAnimations()[0];
playBtn.addEventListener('click', () => {
  animate.play();
})

pauseBtn.addEventListener('click', () => {
  animate.pause();
})
},0)

```

```css
@keyframes anim {
  0%, to {
    transform: scale(1) rotate(0turn);
  }
  50% {
    transform: scale(1.5) rotate(1turn);
  }
}
#anim {
  margin: 100px auto;
  width: 300px;
  text-align: center;
  animation: anim 1s infinite;
}
```

:::

如上 `Demo` 所示，通过 `getAnimations` 我们可以获取到当前元素的正在运行的动画的 `Animate` 对象，如果传入参数 `{subtree: true}` 还能获取到包括其所有子元素、伪元素的动画。

通过拿到的 `animate`，我们可以直接对其进行各种操作，如：

- `pause` - 暂停动画
- `play` - 播放动画
- `cancel` - 取消动画状态
- `reverse` - 反向执行动画到开始状态
- `finish` - 直接跳到动画结束阶段

此外还有一些其他比较少用的方法，如 `commitStyles`、`persist` 等。

通过上述 `API`，我们可以轻易的通过 `JS` 来控制动画的执行，而不需要像以前一样通过改写 `CSS` 样式来控制。

除了上述的一些操作方法外，`animate` 中还有很多动画的属性，包括运行状态的 `Promise`、`timeline`、`effect` 等。

其中如 `finished` 等 `Promise` 在动画控制时也很好用，比如创建一个动画后需要在动画完成后做一些处理直接 `await finished` 即可，不需要像以前一样监听 `dom` 状态或是设定倒计时。

其它需要了解的可以点击[这里查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Animation)。

## animate

animate` 方法则可通过 `JS` 给元素添加动画：`Element.animate(keyframes, options)

```
anim.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }, { transform: 'translateX(0)' }],
    1000
);
```

这里的 `keyframes` 是一个数组，不同于 `css keyframes`，这里不需要定义每一个关键帧的百分比，此处会默认按照等比拆分关键帧，如果需要定义百分比，可直接在关键帧中添加 `offset` 参数：

```js
anim.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)', offset: 0.3 }, { transform: 'translateX(0)' }],
    1000
);
```

此处 `keyframe` 参数主要包含两种属性，第一种是对应的 `css` 属性的 `js` 表示，如 `left`、`paddingLeft`、`transform` 等（注意此处 `css` 中的 `float`、`offset` 需要写成 `cssFloat`、`cssOffset`），第二种是上面说到的 `offset` 一类的通用控制参数，除了 `offset` 外，还可设置 `easing` 为每个关键帧设定动画曲线：

```js
anim.animate([{ opacity: 1, easing: 'ease-out' }, { opacity: 0.1, easing: 'ease-in' }, { opacity: 0 }], 1000);
```

以及 `composite` 参数来控制动画合成方式。

此外，`keyframes` 还支持第二种格式：

```js
anim.animate(
    {
        opacity: [0, 0.9, 1],
        offset: [0, 0.8], // Shorthand for [ 0, 0.8, 1 ]
        easing: ['ease-in', 'ease-out']
    },
    1000
);
```

可直接传入一个对象，将对象中的属性通过数组表示来表示对应的关键帧。

`options` 则可以直接传入数字，代表动画事件或是传入动画参数：

```js
anim.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }, { transform: 'translateX(0)' }], {
    duration: 1000
});
```

参数和 `CSS` 中差不多，包括：

| 参数名               | 含义                                                         |
| -------------------- | ------------------------------------------------------------ |
| `delay`              | 延迟动画开始的毫秒数。默认为0。                              |
| `direction`          | 动画运动方向                                                 |
| `duration`           | 动画每次迭代完成所需的毫秒数。默认为0                        |
| `easing`             | 动画曲线函数，可以自定义                                     |
| `endDelay`           | 动画结束后要延迟的毫秒数。这主要用于基于另一个动画的结束时间对动画进行排序。默认为0。 |
| `fill`               | 动画结束后属性值的状态                                       |
| `iterationStart`     | 描述动画应该在迭代的什么时候开始。0.5表示在第一次迭代中途开始，使用这个值集，一个有两次迭代的动画将在第三次迭代中途结束。默认为0.0 |
| `iterations`         | 动画应该重复的次数。默认值为1，也可以取一个值 Infinity，使其在元素存在期间重复。 |
| `composite`          | 动画和其他单独的动画之间组合。 这是个高级特性，默认是replace，就是替换提起的动画。 |
| `iterationComposite` | 动画的属性值变化如何在每次动画迭代时累积或相互覆盖           |

需要了解可[点击查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate)。

### 常用的方法

- `cancel()` 取消
- `finish()` 完成
- `pause()` 暂停
- `play()` 播放
- `reverse()`  逆转播放方向

### Animation 事件监听

监听有两种形式:

1. **event 方式** **因其继承于EventTarget，所有依旧有两种形式**

```js
animation.onfinish = function() {
  element.remove();
}

animation.addEventListener("finish", function() {
  element.remove();
}
```

1. Promise形式

```js
animation.finished.then(() =>
  element.remove()
)
```

**比如一个很有用的场景，所有动画完成后:**

```js
Promise.all( element.getAnimations().map(ani => ani.finished)
 ).then(function() {           
    // do something cool 
  })
```

常用事件回调

- `oncancel` 取消
- `onfinish` 完成
- `onremove` 删除

## 优势

1. 相对css动画更加灵活
2. 相对requestAnimation/setTimeout/setInterval 动画，性能更好，代码更简洁
3. **`天然支持Promise，爽爽爽！！！`**

你有什么理由拒绝她呢？

## 对比 CSS Animation

### 动画参数属性键对照表

| Web Animation API | CSS                       |
| ----------------- | ------------------------- |
| delay             | animation-delay           |
| duration          | animation-duration        |
| iterations        | animation-iteration-count |
| direction         | animation-direction       |
| easing            | animation-timing-function |
| fill              | animation-fill-mode       |

### 参数设置值上的区别

1. `duration` 参数只支持毫秒
2. 迭代次数无限使用的是 JS的`Infinity`，不是字符串 `"infinite"`
3. 默认动画的贝塞尔是`linear`，而不是css的`ease`

## 兼容和 polyfill

当然，该系列 `API` 兼容并不佳，要能够完整体验需要至少 `chrome` 84 以上版本，`IE` 则完全没戏。

不过还好有 `polyfill` 的存在：[web-animations-js](https://github.com/web-animations/web-animations-js)


## 基于Web Animations API实现点击粒子动画效果

::: normal-demo 粒子动画效果

```html
<div id="app">
  <button id="button">点我</button>
</div>
```
```js
setTimeout(() => {

  if (window.document.body.animate) {
  document.querySelector('#button').addEventListener('click', pop);
}

function pop(e) { 
  for (let i = 0; i < 30; i++) {
    createParticle(e.clientX, e.clientY);
  }
}
function createParticle(x, y) {
  const particle = window.document.createElement('div');
  particle.classList.add('particle')
  const size = Math.floor(Math.random() * 20 + 5);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
  const destinationX = x + (Math.random() - 0.5) * 2 * 75;
  const destinationY = y + (Math.random() - 0.5) * 2 * 75;
  const animation = particle.animate([
    {
      transform: `translate(${x - (size / 2)}px, ${y - (size / 2)}px)`,
      opacity: 1
    },
    {
      transform: `translate(${destinationX}px, ${destinationY}px)`,
      opacity: 0
    }
  ], {
    duration: 500 + Math.random() * 1000,
    easing: 'cubic-bezier(0, .9, .57, 1)',
    delay: Math.random() * 200
  });
  animation.onfinish = () => {
    particle.remove();
  };
  document.appendChild(particle);
}
},0)
```

```css
#app{
 padding: 100px;
 text-align: center;
}

#button{
  width: 140px;
  height: 60px;
  font-size: 16px;
  border-color:rgb(24, 144, 255);
  background-color: rgb(24, 144, 255,.2);
  outline: 0;
}

.particle {
  border-radius: 50%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  opacity: 0;
}
```


:::


