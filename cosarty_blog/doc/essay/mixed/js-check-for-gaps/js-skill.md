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

## elementUI table组件多列排序高亮

::: tip
我们在使用elementUI的使用会发现排序的时候只能够，排序一列或者排序的高亮箭头只能高亮一个
主要是靠header-cell-style和sort-change ，通过将sortable设置为custom，来自定义排序
:::

::: normal-demo 排序高亮

```html
 <!-- 商品的表格 -->
    <el-table
      :data="compData"
      :row-key="($event) => $event.goodsId"
      style="width: 100%"
      @sort-change="onSortChange"
      :header-cell-style="handleTheadStyle"
    >
     <el-table-column prop="totalSoldCountShow" label="总销售量" width="130" sortable="custom">
          <template #default="{ row }">
            <span>
              {{ row.extra.sales[filterObj.radio].totalSoldCountShow }}
            </span>
          </template>
        </el-table-column>
    </el-table>
```

```js
export default {
  data(){
    return {
        filterObj: {
          totalSoldCountShow: null,
      },
    }
  },
  methods:{
    // 记录排序规则   ascending 升 descending 降序
    onSortChange({ order, prop }) {
      this.filterObj[prop] = order;
    },
    // 多箭头高亮
    handleTheadStyle({ column }) {
      if (this.filterObj[column.property]) {
        column.order = this.filterObj[column.property];
      }
    },
  }
}
```

:::


