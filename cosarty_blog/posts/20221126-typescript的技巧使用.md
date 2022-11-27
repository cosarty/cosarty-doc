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

## 条件类型判断

```ts
type CXN<T> =T extends string ? string : boolean
type CXN2<T> =[T] extends string ? string : boolean

// 这种情况下传入联合类型的会对联合类型的每一项进行比对
type cxn = CXN<string | number>
//  cxn:string|boolean


// 使用 [] 将条件类型框起来的话就会进行整体匹配
type cxn2 = CXN2<string | number>
// cxn2:boolean


  // 宽类型可以赋值给窄类型 ，窄类型 不能赋值给宽类型
  // 就是长的可以给短的
  type Anim = {name:string,fay:boolean} 
  type Cat =   {name:string}
  type an = Cat extends Anim ? boolean : never
  // an:boolean
```

## 手写Pick

```ts
  type Person = { name: string, age: never, city: string }

  type MyPick<T, U extends keyof T> = {
    [P in U]:T[P]
  }

  type p = MyPick<Person,'age'>

```
## 手写extract和exclude

```ts
type MyExtract<T,U> = T extends U ? T :never
type MyExclude<T,U> = T extends U ? never :T
```
## 手写record

```ts
type Record<K extends string | number | symbol, V> = {[P in K]:V}
```
## infer的使用

```ts
type Person = {name:string,age:number}
type Fn = (n: string) => number[]
type AttrType<T> = T extends { name: infer M, age: infer M } ? M : never
  
type p = AttrType<Person>
type f = Fn extends ((...args:any)=>(infer U)[]) ? U : Fn
```
## 过滤属性类型
```ts
  type Person = { name: string; age: number }
  type FilterPropertyType<T, U> = {
    [P in keyof T]: T[P] extends U ? never : P
  }[keyof T]
  type p = Pick<Person,FilterPropertyType<Person, number>>
```
## 索引签名技巧
```ts
  type CXN = {
    [x:`${string}Cxn`]:string | number
  }
  const cxn:CXN = {niCxn:'hhh'}
```



## 未完待续。。。。。