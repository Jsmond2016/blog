# Typescript Enum 问题

看了一篇文章， [我在团队内部提倡禁用 typescript enum
](https://juejin.cn/post/7478167090530418728) 主要是讲述 枚举的缺点。

- 可以被运行时修改
- 增大打包体积
- 字符串枚举值同值映射不匹配

具体缺点可以参考这篇文章 [TypeScript 官方宣布弃用 Enum？Enum 何罪之有？官方真的不推荐 Enum 了吗？ 甲级战犯 Enum - 掘金](https://juejin.cn/post/7478980680183169078#heading-13)


对比多种解决方式后，作者最后的解决方案是 **使用静态对象的方式**：

```ts
const Role = {
    Owner: 'owner,
    Editor: 'editor'
} as const

// public type util
type ObjectToEnums<T> = T[keyof T]

type RoleEnum = ObjectToEnums<typeof Role>

enum OldRoleStatus {
    owner = 'owner',
    editor = 'editor'
}

const fn = (role: RoleEnum) => role

fn(Role.Owner) // ✅
fn("owner") // ✅
fn(1122) // ❌ Argument of type '1122' is not assignable to parameter of type RoleEnum
fn(OldRoleStatus.Owner) // ✅

```

这是一个好办法，不过评论区给出了一个更好的方法，非常有意思：

```ts
enum AuthMethods {
  push = "Push",
  sms = "Sms",
  voice = "Voice",
}
type AuthMethodStrings = `${AuthMethods}`;


function f1(a: AuthMethods) {}
f1('PUSH') // 报错

function f2(a: AuthMethodStrings) {}
f2('Push') // 正确
```

我觉得这个方法很巧妙，又没有失去枚举的特性，可以在开发中用起来；

推荐推荐!!!!