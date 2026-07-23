# TypeScript 在前端项目中的实用边界：建模、收窄与避免 any

TypeScript 的价值不是给每个变量都写复杂类型，而是把不确定性限制在输入边界，让业务代码在更小的可信范围内工作。接口响应、表单输入和路由参数最值得优先建模。

![TypeScript 类型收窄：外部输入先表示为联合类型，再经判别字段或运行时检查收窄到具体分支。](/illustrations/frontend/typescript-narrowing.svg)

## 先用类型描述业务状态

接口结果不应只有「可能成功」的模糊对象。使用可判别联合，让成功和失败分支各自拥有明确字段。

```ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; code: string };

function showUser(result: Result<{ name: string }>) {
  if (result.ok) {
    return result.data.name;
  }

  return `加载失败：${result.message}`;
}
```

`ok` 是判别字段。进入 `if (result.ok)` 后，TypeScript 自动知道 `data` 存在；失败分支也能安全访问 `message`。

## unknown 是外部输入的起点

`any` 会关闭类型检查，错误会扩散到后续所有调用点。面对 `JSON.parse`、第三方 SDK 或不可信接口时，先用 `unknown`，再通过运行时验证收窄。

```ts
function isUser(value: unknown): value is { id: string; name: string } {
  return typeof value === 'object'
    && value !== null
    && 'id' in value
    && 'name' in value;
}

const payload: unknown = JSON.parse(text);
if (isUser(payload)) {
  console.log(payload.name);
}
```

TypeScript 不会在运行时验证服务器返回内容。类型守卫、Schema 校验或可靠的 API 契约，才是跨边界时的真正保护。

## 泛型用于保留输入和输出的关系

当函数的返回类型依赖输入类型时，泛型比 `any` 更准确：

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const id = first(['a', 'b']); // string | undefined
```

不要为了「看起来高级」而泛型化一切。如果类型参数只出现一次，普通明确类型通常更可读。

## 常见误区

**给接口响应写断言就完成校验。** `as User` 只是在告诉编译器相信你，运行时数据仍可能不符合结构。

**用可选属性逃避建模。** 大量 `foo?: string` 会让每个调用点都需要猜测状态；互斥状态应优先用联合类型表达。

**一开始就开启最严格规则并一次修完。** 遗留项目可先从新增代码、接口边界和关键模块开始，逐步收紧 `strict`。

## 小结

把外部数据视为 `unknown`，用联合类型表达业务分支，用类型守卫完成收窄，再用泛型保留真实的输入输出关系。这样能在不制造类型噪音的前提下，让前端代码更可靠。

延伸阅读：[Typescript Enum 问题](./ts-enum-01)。
