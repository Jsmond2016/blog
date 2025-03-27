# Typescript 高级使用

- Partial / Required / Readonly
- Pick / Omit
- Exclude / Extract
- Record / keyof
- NonNullable / Parameters
- ReturnType / InstanceType
- typeof / keyof / in /  extends / infer / is

```js
/*
 * @Description: Typescript 高级类型学习
 * @Refer1: https://juejin.im/post/6844904121070256141 参考这篇文章，包括了大部分 ts 的高级使用方式
 * @Refer2: https://juejin.im/post/6844903863791648782 
 * @Refer3: https://juejin.im/post/6844904055039344654 TS 常见问题整理（60多个，持续更新ing）
 * @Date: 2020-11-01 12:25:12
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

// Partial / Required / Readonly
// Pick / Omit
// Exclude / Extract
// Record / keysof
// NonNullable / Parameters
// ReturnType / InstanceType

// typeof / keyof / in /  extends / infer / is




// Record 用法，快速定义同一种类型的数据类型
type AllNmuber = Record<'age' | 'salary' | 'weight' | 'height', number>
type AllString = Record<'birth' | 'name' | 'startDate' | 'endDate', string>


const numberObj: AllNmuber = {
  age: 1,
  salary: 10000,
  weight: 140,
  height: 175,
}


// Pick 用法，从某个数据中心快速提取某几个数据作为类型
type PickProps = Pick<AllNmuber, 'age' | 'salary'>

const pick: PickProps = {
  age: 18,
  salary: 15000
}

// Omit 用法，从某个数据中剔除部分数据作为类型
type OmitProps = Omit<AllString, 'startDate' | 'endDate'>

const omit: OmitProps = {
  birth: '1995-12',
  name: 'Tom',
}

// Partial 将所有数据变为可选
type PartialProps = Partial<AllString>

const partial: PartialProps = {
  birth: '1995-12',
  name: 'Tom',
}

// Partial 将所有数据变为必选
type RequiredProps = Required<AllNmuber>

const required: RequiredProps = {
  age: 1,
  salary: 10000,
  weight: 140,
  height: 175,
}

// 将所有数据变为只读
type ReadProps = Readonly<AllNmuber>

const read: ReadProps = {
  age: 1,
  salary: 10000,
  weight: 140,
  height: 175,
}

// read.age = 22

type SonProps = {
  name: string,
  password: string,
  isLogin: boolean
}

type DadProps = {
  name: string,
  isLogin: boolean
}

// Extract 父子继承关系取儿子-取属性多的
const userInfo: Extract<SonProps, DadProps> = {
  name: 'xiaoming',
  isLogin: true,
  password: 'hello'
}

// Exclude 父子继承关系取父亲
const user2: Exclude<DadProps, SonProps> = {
  name: 'xiaoming',
  isLogin: true,
}


type KeyProps = keyof SonProps

```



- 相关资料：

```js
https://juejin.im/post/6844904121070256141 参考这篇文章，包括了大部分 ts 的高级使用方式
https://juejin.im/post/6844903863791648782 
https://juejin.im/post/6844904055039344654 TS 常见问题整理（60多个，持续更新ing）
```

