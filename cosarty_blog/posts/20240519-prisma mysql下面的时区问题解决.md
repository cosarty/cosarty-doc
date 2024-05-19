---
description: prisma mysql下面的时区问题解决
tag:
  - prisma
category:
  - 数据库
date: 2024-05-19
---

# prisma mysql下面的时区问题解决

```js
import { PrismaClient } from '@prisma/client';


const dateTimeOffsetKey = Symbol('key');


BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const prisma = new PrismaClient();

function fixPrismaReadDate(d) {
  return new Date(
    `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1).toString().padStart(2, '0')}-${d
      .getUTCDate()
      .toString()
      .padStart(2, '0')}T${d.getUTCHours().toString().padStart(2, '0')}:${d
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${d.getUTCSeconds().toString().padStart(2, '0')}.${d
      .getUTCMilliseconds()
      .toString()
      .padStart(2, '0')}+08:00`,
  );
}

function fixPrismaWriteDate(d) {
  return new Date(
    `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}T${d
      .getHours()
      .toString()
      .padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d
      .getMilliseconds()
      .toString()
      .padStart(2, '0')}Z`,
  ); 
}

prisma.$use(async (params, next) => {
  const setOffsetTime = (obj, fn) => {
    if (obj === undefined || obj === null || obj[obj] || !isNaN(obj)) return;
    for (const key in obj) {
      if (obj[key] instanceof Date) {
        obj[key] = fn(obj[key]);
      } else if (typeof obj[key] === 'object') {
        setOffsetTime(obj[key], fn);
      }
    }
    obj[dateTimeOffsetKey] = true;
  };

  setOffsetTime(params.args, fixPrismaWriteDate);
  const res = await next(params);
  setOffsetTime(res, fixPrismaReadDate);
  return res;
});


export default prisma;


```
