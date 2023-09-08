

# javascript

## 数组和对象的根本区别

（1）创建方式不同：数组表示有序数据的集合，而对象表示无序数据的集合。数组的数据没有”名称”（name），对象的数据有”名称”（name）。

（2）调用方法不同

（3）对象键值唯一，数组可以重复

（4）对象没有长度，不能用for循环

（5） 数组默认挂载的迭代器对象 可以使用forof 循环

（6）数组和对象都可以使用for...in 循环


## 什么时候`Object.prototype.toString`会无效

当对象上设置了`Symbol.toStringTag`的时候会无效

```js
    const arr = []
    const obj = {
      [Symbol.toStringTag]: 'Array'
    }
    const num = new Number(23)
    num[Symbol.toStringTag] = 'HHHH'
    console.log(Object.prototype.toString.call(arr))  //[object Array]
    console.log(Object.prototype.toString.call(obj)) //[object Array]
    console.log(Object.prototype.toString.call(num)) //[object HHH]
```

