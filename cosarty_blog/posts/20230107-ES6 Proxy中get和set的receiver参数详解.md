---
description: ES6 Proxy 中 get 和 set 的 receiver 参数详解
tag:
  - js
  - 小知识
category: 前端
date: 2023-01-07
---

# ES6 Proxy 中 get 和 set 的 receiver 参数详解

## 从Accessor的上下文丢失问题说起
一般而言，在`Proxy`中，我们只需要使用这样的语法，就可以完成对原始对象属性的get访问：

```js
get(target, prop, receiver) {
    return target[prop];
}
```

但是，在出现Accessor继承的情况下，这种做法可能出现问题，就像这样：

```js
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  },
  getName() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};
// 期望输出：Admin
alert(admin.name); // 输出：Guest (?!?)
```

**出了个大问题：我们执行admin.name得到的结果并不是Admin而是Guest。**

问题出在哪？首先得分析一下，当admin.name被调用，发生了什么？

1. 检查admin对象，发现admin中并不存在name属性

2. 检查admin对象的原型admin.__proto__，即userProxy

3. 尝试获取userProxy.name，这会导致Proxy的get方法被调用

4. 由于在Proxy中，target始终是user对象，于是转为尝试获取user['name']

5. 在user对象中找到了get name()，**由于它是一个访问器，它会被立即执行，于是它会返回this._name**

6. 由于target是user，所以这里的this也是user，于是结果变成了Guest

问题出在哪里呢？第5步。

一般而言，如果是普通函数，直接使用target[prop]也是没有问题的，以执行admin.getName()为例，在调用中实际上发生了以下步骤：

1. 检查admin对象，发现admin中并不存在getName属性

2. 检查admin对象的原型admin.__proto__，即userProxy

3. 触发get陷阱，此时target是user，prop则是getName

4. 通过user['getName']找到了函数并返回

5. 由于admin在.之前，admin作为this调用了user['getName']函数

但是这个道理在Accessor里行不通，因为Accessor并不是函数，并不会出现上述的第4和第5两个过程，恰恰相反，实际上，**当试图访问user.name的时候，get访问器里的代码就会被立即执行，而get访问器的返回值也不是一个函数，而是执行get访问器里的代码以后获得的返回值**。

因此，很明显，对于Accessor我们不应该使用target作为this。我们应该使用实际调用者，也就是admin作为this，但是，由于target只能是user，所以我们无法做到这一点。

## 解决问题第一步：receiver参数
为了解决这个尴尬的问题，Javascript追加了一个参数，也就是get陷阱的第三个参数receiver，receiver参数代表的就是实际调用者，也就是最初调用时.前面的那个对象。在这个例子里，receiver就是admin。

好了，我们现在有了实际调用者了，这就够了吗？开玩笑。我们就算知道admin的存在我们也无能为力。

对于一般的函数，我们可以使用call、apply和bind函数改变它的执行上下文，但是，上面已经强调过了，对于访问器而言，它并不会作为一个函数被传递，而是会被立即执行并返回执行的结果。因此，从对象的外部，我们是无法获悉一个属性到底是访问器还是真实属性的。也是因此，call、apply和bind我们都用不了，我们改变不了访问器的上下文。

## 解决问题第二步：Reflect.get和Reflect.set函数
在此基础上，为了修改访问器的上下文，Javascript又提供一个更加底层的方式来执行get和set行为，这就是`Reflect.get(target, property, receiver)`和`Reflect.set(target, property, receiver)`。

这里以Reflect.get为例，Reflect.set是类似的。

Reflect.get代表了`[[Get]]`原语的最小封装，它比user['name']这样的方式更加底层，因此，也更加强大。它强就强在第三个参数receiver上，我们可以使用receiver指定访问器的上下文this。

没错，这里的receiver参数和上面一样，它存在的唯一目的还是解决访问器的this丢失问题，确切的说，是为了在实际调用对象和被代理对象不同时，修改访问器的上下文this以保证上下文不会丢失。

当target === receiver或者虽然target !=== receiver但是想要访问的`target[prop]`并非访问器时，`Reflect.get(target, prop, receiver)`都等价于`target[prop]`。

当target !=== receiver且target[prop]又是一个访问器，那么，访问器的代码仍然是来自target，但是访问器中的上下文this会被修改为receiver，这样一来就解决了使用Proxy时出现的访问器上下文丢失问题。

## 补充：receiver仅仅提供上下文
上面的论述可能会让人好奇，如果我们手动设置Reflect.get函数的receiver参数让他变成其他对象会发生什么呢？**看看下面这段代码。**

```js
let user = {
    _name: "Guest",
    get name() {
        return this._name + " (From user)";
    }
};

let user2 = {
    _name: "Guest233",
    get name() {
        return this._name + " (From user2)";
    }
};

let userProxy = new Proxy(user, {
    get(target, prop, receiver) {
        return Reflect.get(target, prop, user2); // 强行使用user2作为receiver
    }
});

let admin = {
    __proto__: userProxy,
    _name: "Admin"
};

document.write(admin.name);
```

你猜结果是什么？

**首先排除Guest233 (From user2)。**

实际上，上述代码的执行结果是Guest233 (From user)。

原因很简单，上面说过了，receiver的作用仅仅是提供上下文环境this，而访问器的实际代码仍然来自于target。

## 补充：不要轻易手动使用receiver
如题，不要轻易手动使用receiver，除非你真的知道自己在做什么。当然，既然我都写在这里了，我肯定还是想说说到底会发生什么。看看这段人畜无害的代码：

```js
let user = {
    _name: "Guest",
    get name() {
        return this._name;
    }
};

let userProxy = new Proxy(user, {
    get(target, prop, receiver) {
        document.write(receiver);	// (*)
        return Reflect.get(target, prop, receiver);
    }
});

let admin = {
    __proto__: userProxy,
    _name: "Admin"
};

document.write(admin.name);
```

你可以亲自试试，当然，**试试就逝世。**

你会喜提爆栈，也就是说，你会发现类似这样的报错：

> Uncaught RangeError: Maximum call stack size exceeded
>
>    at Object.get (main.js:11:9)
>
>    at Object.get (main.js:11:18)
>
>    at Object.get (main.js:11:18)
>
>    at Object.get (main.js:11:18)
>
>    at Object.get (main.js:11:18)
>
>    at Object.get (main.js:11:18)
>
>    at Object.get (main.js:11:18)
>
>    at Object.get (main.js:11:18)
>
>    at Object.get (main.js:11:18)
>
>    at Object.get (main.js:11:18)

为什么会出现这种情况？问题显然出现在带有(*)的那一行。

其实事情是这样的：

1. 获取admin.name，但是admin并没有name属性，于是沿着原型链来到userProxy

2. 获取userProxy.name的过程触发了get陷阱

3. get陷阱中尝试执行document.write(receiver)

4. 由于receiver是一个对象，而document.write函数的参数是字符串，于是他会尝试转换，调用也就是调用receiver[Symbol.toPrimitive]

5. 不巧，receiver正是admin，但是admin并没有定义[Symbol.toPrimitive]函数，于是沿着原型链向上查找，又来到了userProxy

6. 获取userProxy[Symbol.toPrimitive]的过程又触发get陷阱

7. get陷阱中又尝试执行document.write(receiver)

8. 由于这里的receiver还是admin，是一个对象，于是Javascript再次尝试调用receiver[Symbol.toPrimitive]

9. 到此，一个死循环的形成已经很明显了

解决方案也很简单，如果我们在admin中加上一个[Symbol.toPrimitive]，那一切都正常了。

```js
let user = {
    _name: "Guest",
    get name() {
        return this._name;
    }
};

let userProxy = new Proxy(user, {
    get(target, prop, receiver) {
        document.write(receiver);
        return Reflect.get(target, prop, receiver);
    }
});

let admin = {
    __proto__: userProxy,
    _name: "Admin",
    [Symbol.toPrimitive](_) {
        return "object admin";
    }
};

document.write(admin.name);
```

现在的输出很简单：object admin Admin。

你看，就是一句看起来很简单的document.write再加上receiver，就能造成一个严重的恶性bug，所以，**除非你真的知道自己在做什么，否则，不要轻易手动使用receiver。**