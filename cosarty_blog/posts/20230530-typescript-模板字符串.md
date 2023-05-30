---
description: 'typescript 字符串类型体操'
tag:
  - ts
  - 技巧
category:
  - 前端
  - typescript
date: 2023-05-30
---

[[toc]]

# typescript 模板字符串

## 基本介绍

TS 中`模板字符串`类型 与 JS 模板字符串非常类似,，通过 `${}` 包裹,

1. 模板字符串类型的目的就是将多个字符串组装在一起

```typescript
type name = "Echoyya";
type sayHaha = `hi ${name} haha`; // type name = "Echoyya";
```

2. 模板字符串具备分发的机制可以组成联合类型
   实现：marign-left、 margin-top、 margin-bottom.....

```typescript
type Direction = "left" | "right" | "top" | "bottom";
type size = "10" | "20";
type AllMargin = `margin-${Direction}:${size}px;`;
```

3. 在映射类型中使用模板字符串

**对象属性重命名**

```typescript
type Person = { name: string; age: number; address: string };
// 全部重命名
type RenamePerson<T> = {

[K in keyof T as `rename_${K & string}`]: TK;

};

// 仅为指定的key重命名
type RenamePersonForKey<T, X extends keyof T> = {

[K in keyof T as K extends X ? `rename_${K & string}` : K]: TK;

};
type a1 = RenamePerson<Person>; //  rename_name, rename_age, rename_address
type a2 = RenamePersonForKey<Person, "name">; // rename_name,age,address
```

针对模板字符串内部还提供了很多专门的类型，可以供我们使用 `Uppercase 转大写`、`Lowercase转小写`、`Capitalize首字母大写`、`Uncaptailize首字母小写`**使用模板字符串和内置的类型，实现为对象类型统一生成对象属性的 getter / setter 等方法**

```typescript

type Person = { name: string; age: number; address: string };
 
type PersonGetter<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
};
 
let person!: PersonGetter<Person>;
 
person.getName();
person.getAge();
```

**Emits 方法的封装**
实现：`{ onA: () => {}; onB: () => {}; onC: () => {} }`

```typescript
type Events = { a: () => {}; b: () => {}; c: () => {} };
type EmitsGetter<T> = {
  [K in keyof T as `on${Capitalize<K & string>}`]: T[K];
};
 
type EmitsEvents = EmitsGetter<Events>;

```

**模板字符串配合 infer 使用**
和元组的 infer 用法很相似 `[infer L,...infer R]`,L 是第一个，又有点像正则的匹配模式

```typescript
type getFirstWord<S extends string> = S extends `${infer L} ${string}` ? L : any;
type FirstWord = getFirstWord<"hello world">; // type FirstWord = "hello"
```

## 字符串类型体操实操环节

TS 通过 type 声明的类型，如果设置了泛型，也就是类型参数。高级类型的目的是通过一系列类型运算来生成更准确的类型。这种生成不同类型的高级类型的生成逻辑，就是`所谓的类型体操`。

### 1. 字符串首字母大写 CapitalizeString

```typescript
export type CapitalizeString<T> = T extends string ? `${Capitalize<T>}` : T;
 
type a1 = CapitalizeString<"handler">; // Handler
type a2 = CapitalizeString<"echoyya">; // Echoyya
type a3 = CapitalizeString<233>; // 233
```

### 2. 获取字符串第一个字符 FirstChar

```typescript
export type FirstChar<T> = T extends `${infer L}${infer R}` ? L : never;
 
type A = FirstChar<"BFE">; // 'B'
type B = FirstChar<"Echoyya">; // 'd'
type C = FirstChar<"">; // never
```

### 3. 获取字符串最后一个字符 LastChar

```typescript
export type LastChar<T, F extends string = ""> = T extends `${infer L}${infer R}` ? LastChar<R, L> : F;
 
type A = LastChar<"BFE">; // E
type B = LastChar<"Echoyya">; // a
type C = LastChar<"a">; // a
```

### 4. 字符串转元组 StringToTuple

```typescript
export type StringToTuple<T, F extends any[] = []> = T extends `${infer L}${infer R}` ? StringToTuple<R, [...F, L]> : F;
 
type A = StringToTuple<"Echoyya">; // ["E", "c", "h", "o", "y", "y", "a"]
type B = StringToTuple<"">; // []
```

### 5. 元组转字符串 TupleToString

```typescript
export type TupleToString<T, F extends string = ""> = T extends [infer L, ...infer R]
  ? TupleToString<R, `${F}${L & string}`> // 模板字符串拼接
  : F;
 
type A = TupleToString<["E", "c", "h", "o"]>; //  Echo
type B = TupleToString<["a"]>; // a
type C = TupleToString<[]>; // ''
```

### 6. 重复字符串 RepeatString

```typescript
export type RepeatString<
  T extends string,
  C, // 重复次数
  A extends any[] = [], // 拼接Arr
  F extends string = "" // 最终结果
> = C extends A["length"] // Arr长度是否满足重复C
  ? F
  : RepeatString<T, C, [...A, null], `${F}${T}`>;
 
type A = RepeatString<"a", 3>; // 'aaa'
type B = RepeatString<"a", 0>; // ''
```

### 7. 字符串分割 SplitString

```typescript
type SplitString<
  T extends string,
  S extends string, // 分割符
  F extends any[] = [] // 最终结果
> = T extends `${infer L}${S}${infer R}` // infer 匹配模式
  ? SplitString<R, S, [...F, L]>
  : [...F, T]; // 最后一次不满足条件时，需要将最后一个单词也放入结果集中
 
type A1 = SplitString<"handle-open-flag", "-">; // ["handle", "open", "flag"]
type A2 = SplitString<"flag", "-">; // ["flag"]
type A3 = SplitString<"handle.open.flag", ".">; // ["handle", "open", "flag"]
type A4 = SplitString<"open.flag", "-">; // ["open.flag"]
```

### 8. 获取字符串长度 LengthOfString

```typescript
type LengthOfString<T extends string, F extends any[] = []> = T extends `${infer L}${infer R}` ? LengthOfString<R, [...F, L]> : F["length"];
 
type A = LengthOfString<"Echoyya">; // 7
type B = LengthOfString<"">; // 0
```

### 9. 驼峰转为短横线隔开式 KebabCase

```typescript
type KebabCase<T extends string, F extends string = ""> = T extends `${infer L}${infer R}`
  ? KebabCase<R, `${F}${Capitalize<L> extends L ? `-${Lowercase<L>}` : L}`> // 取每个字母判断 是否与其大写一致，拼接短横线并转为小写
  : RemoveFirst<F>; // 当第一个字母也是大写时会多一个-，需要截取调
 
type RemoveFirst<T extends string> = T extends `${infer L}${infer R}` ? R : T;
 
type a1 = KebabCase<"HandleOpenFlag">; // handle-open-flag
type a2 = KebabCase<"EchoYya">; // echo-yya
```

### 10. 短横线隔开式转为驼峰 CamelCase

```typescript
type CamelCase<T extends string, F extends string = ""> = T extends `${infer L}-${infer R1}${infer R2}`
  ? CamelCase<R2, `${F}${L}${Capitalize<R1>}`> // 递归R2，去掉-，拼接大写的R1
  : Capitalize<`${F}${T}`>; // 结果首字母也需要大写
 
type a1 = CamelCase<"handle-open-flag">; // HandleOpenFlag
type a2 = CamelCase<"echo-yya">; // EchoYya
```

### 11. 字符串是否包含某个字符 Include

```ts
type Include<T extends string, C extends string> = T extends ""
  ? C extends ""
    ? true
    : false // 空字符串时需要特殊处理
  : T extends `${infer L}${C}${infer R}`
  ? true
  : false;
 
type a1 = Include<"Echoyya", "E">; // true
type a2 = Include<"Echoyya", "o">; // true
type a3 = Include<"", "">; // true 空字符串时需要特殊处理
type a4 = Include<"", "a">;
```

### 12. 去掉左右空格 Trim

```typescript
type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;
type TrimRight<T extends string> = T extends `${infer L} ` ? TrimRight<L> : T;
type Trim<T extends string> = TrimLeft<TrimRight<T>>;
 
type a1 = Trim<"   Echoyya   ">; // Echoyya
```

### 13. 字符串替换 Replace

```typescript
type Replace<T extends string, C extends string, RC extends string, F extends string = ""> =
  // 空格替换 特殊处理
  C extends ""
    ? T extends ""
      ? RC
      : `${RC}${T}`
    : T extends `${infer L}${C}${infer R}` // 匹配模式
    ? Replace<R, C, RC, `${F}${L}${RC}`> // 结果拼接并替换
    : `${F}${T}`;
 
type a1 = Replace<"ha ha ha 123", "ha", "he">; // he he he 123
type a2 = Replace<"Ey", "Ey", "Echoyya">; //Echoyya
type a4 = Replace<"", "", "Echo">; //Echo
type a3 = Replace<"a", "", "yya">; //yyaa
```

### 14. 函数重命名改变返回值类型 ComponentEmitsType

```typescript
// 转化为
/*
  {
      onHandleOpen?: (flag: boolean) => void,
      onPreviewItem?: (data: { item: any, index: number }) => void,
      onCloseItem?: (data: { item: any, index: number }) => void,
  }
  */
type a1 = {
  "handle-open": (flag: boolean) => true;
  "preview-item": (data: { item: any; index: number }) => true;
  "close-item": (data: { item: any; index: number }) => true;
};
 
type CamelCase<T extends string, F extends string = ""> = T extends `${infer L}-${infer R1}${infer R2}`
  ? CamelCase<R2, `${F}${L}${Capitalize<R1>}`> // 递归R2，去掉-，拼接大写的R1
  : Capitalize<`${F}${T}`>; // 结果首字母也需要大写
 
type ComponentEmitsType<T> = {
  [K in keyof T as `on${CamelCase<K & string>}`]: T[K] extends (...args: infer P) => any // 参数类型不变
    ? (...args: P) => void // 仅改变返回值类型
    : T[K];
};
 
type a2 = ComponentEmitsType<a1>;
```

