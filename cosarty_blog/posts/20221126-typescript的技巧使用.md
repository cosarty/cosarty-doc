---
description: typescript的技巧使用
tag:
  - css
  - 技巧
category: 前端
date: 2022-11-26
star: 100
---

# typescript的技巧使用

## Omit 的实现

```ts
  type Person = { name: string, age: never, city: string }
  
  type MyOmit<T, U> = Pick<T, Exclude<keyof T, U>>
  type OmitPerson = MyOmit<Person, 'age'>

  //  这边keyof 默认会消除 never 类型的键
  type MyOmit2<T, U> = Pick<T, { [P in keyof T]: P extends U ? never : P }[keyof T]>
  type OmitPerson2 = MyOmit2<Person, 'age'>
```

## 未完待续。。。。。