---
description: typescript的技巧使用
tag:
  - css
  - 技巧
category: 前端
date: 2022-11-26
star: 100
---

# typescript 的技巧使用

## Omit 的实现

```ts
type Person = { name: string; age: never; city: string };

type MyOmit<T, U> = Pick<T, Exclude<keyof T, U>>;
type OmitPerson = MyOmit<Person, 'age'>;

//  这边keyof 默认会消除 never 类型的键
type MyOmit2<T, U> = Pick<
  T,
  { [P in keyof T]: P extends U ? never : P }[keyof T]
>;
type OmitPerson2 = MyOmit2<Person, 'age'>;
```

## 条件类型判断

```ts
type CXN<T> = T extends string ? string : boolean;
type CXN2<T> = [T] extends string ? string : boolean;

// 这种情况下传入联合类型的会对联合类型的每一项进行比对
type cxn = CXN<string | number>;
//  cxn:string|boolean

// 使用 [] 将条件类型框起来的话就会进行整体匹配
type cxn2 = CXN2<string | number>;
// cxn2:boolean

// 宽类型可以赋值给窄类型 ，窄类型 不能赋值给宽类型
// 就是长的可以给短的
type Anim = { name: string; fay: boolean };
type Cat = { name: string };
type an = Cat extends Anim ? boolean : never;
// an:boolean
```

## 手写 Pick

```ts
type Person = { name: string; age: never; city: string };

type MyPick<T, U extends keyof T> = {
  [P in U]: T[P];
};

type p = MyPick<Person, 'age'>;
```

## 手写 extract 和 exclude

```ts
type MyExtract<T, U> = T extends U ? T : never;
type MyExclude<T, U> = T extends U ? never : T;
```

## 手写 record

```ts
type Record<K extends string | number | symbol, V> = { [P in K]: V };
```

## infer 的使用

```ts
type Person = { name: string; age: number };
type Fn = (n: string) => number[];
type AttrType<T> = T extends { name: infer M; age: infer M } ? M : never;

type p = AttrType<Person>;
type f = Fn extends (...args: any) => (infer U)[] ? U : Fn;
```

## 过滤属性类型

```ts
type Person = { name: string; age: number };
type FilterPropertyType<T, U> = {
  [P in keyof T]: T[P] extends U ? never : P;
}[keyof T];
type p = Pick<Person, FilterPropertyType<Person, number>>;
```

## 索引签名技巧

```ts
type CXN = {
  [x: `${string}Cxn`]: string | number;
};
const cxn: CXN = { niCxn: 'hhh' };
```

## 去除函数第一个参数

```typescript
declare type RestParameters<T extends (...args: any[]) => any> = T extends (
  arg1: any,
  ...args: infer R
) => any
  ? R
  : never;

declare type OmitFunctionFirstParameters<T extends (...args: any[]) => any> = (
  ...args: RestParameters<T>
) => ReturnType<T>;
```

### DeepPartial

```typescript
declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
```

### 使用映射类型和索引访问类型转换为 'user.address.city' 类型

```typescript

// 获取如a.b.c的类型提示
type ObjKeysToUnion<T> = T extends object
  ? {
      [K in keyof T]-?: K | `${K}.${ObjKeysToUnion<T[K]>}`;
    }[keyof T]
  : never;
```

### 获取 DotNotationPath 的类型

```typescript
type GetType<T, Path extends string> = Path extends ''
  ? T
  : Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? GetType<T[Key], Rest>
    : unknown
  : Path extends keyof T
  ? T[Path]
  : unknown;
  // 获取DotNotationPath的类型

```

## 约束数组长度

```typescript
type SafeArray<T> = Array<T> satisfies (value: T) => value.length === 3;
```

## 未完待续。。。。。
