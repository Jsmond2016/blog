# react+redux+typescript构建前端项目

> 学习参考 [视频1](https://www.bilibili.com/video/BV1C7411k7ZQ?from=search&seid=15906508399145941210)
>
> 代码地址：[Jsmond2016/webpack-react-ts](https://github.com/Jsmond2016/webpack-react-ts)

## 1搭建开发环境

- 项目初始化

```bash
mkdir react-ts

cd react-ts

npm init -y
```

- 安装相关依赖

```bash
yarn add typescript webpack webpack-cli webpack-dev-server ts-loader cross-env webpack-merge clean-webpack-plugin html-webpack-plugin -D
```

## 2-生成ts配置文件

此时，可以使用 tsc 命令，生成 tsconfig 文件

```
yarn add typescript -g

tsc --init
```

文件如下：

```json
{
  "compilerOptions": {
    "target": "es5", /** 编译后的版本 */
    "module": "commonjs", /** 编译后模块的写法 */
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
}

```

配置文件含义参考：

- [tsconfig.json配置详解](https://segmentfault.com/a/1190000021749847)
- [详解TypeScript项目中的tsconfig.json配置](https://www.jianshu.com/p/0383bbd61a6b)

## 3-配置 webpack

- 安装依赖

```bash
yarn add typescript webpack webpack-cli webpack-dev-server ts-loader cross-env webpack-merge clean-webpack-plugin html-webpack-plugin -D

yarn add react @types/react react-dom @types/react-dom -D

yarn add redux react-redux @types/react-redux redux-logger redux-promise redux-thunk @types/redux-logger @types/redux-promise -D

yarn add react-router-dom @types/react-router-dom connected-react-router antd -D

yarn add eslint @typescript-eslit/eslint-plugin @typescript-eslit/parser -D

yarn add @types/jest ts-jest -D
```

- 编写 `/config/webpack.base.config.js`

```js
/*
 * @Description: 
 * @Date: 2020-12-11 15:34:09
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

// 清理产出目录的插件
 const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//  产出 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  output: {
    // 输出目录
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    contentBase: '../dist'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```



- 编写 `webpack.dev.config.js`

```js
const { smart } = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = smart(base, {
  mode: 'development',
  devtool: 'inline-soruce-map'
})
```



- 编写 `webpack.prod.config.js`

```js
const { smart } = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = smart(base, {
  mode: 'production',
})
```



- 新建 `src/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>react-ts</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

- 新建 `src/index.tsx`

```js
console.log('hello')
```

- 配置 `package.json` 中的 `dev`, `build` 命令

```json
{
  "name": "react-typeScript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config ./config/webpack.dev.config.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.config.js",
    "eslint": "eslint src --ext .js,.ts,.tsx",
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/jest": "^24.9.1",
    "@types/react-redux": "^7.1.7",
    "@types/react-router-dom": "^5.1.3",
    "@types/redux-logger": "^3.0.7",
    "@types/redux-promise": "^0.5.28",
    "clean-webpack-plugin": "^3.0.0",
    "cross-env": "^7.0.0",
    "css-loader": "^3.4.2",
    "html-webpack-plugin": "^3.2.0",
    "jest": "^25.1.0",
    "react-redux": "^7.1.3",
    "redux": "^4.0.5",
    "redux-logger": "^3.0.6",
    "redux-promise": "^0.6.0",
    "redux-thunk": "^2.3.0",
    "style-loader": "^1.1.3",
    "ts-jest": "^25.0.0",
    "ts-loader": "^6.2.1",
    "typescript": "^3.7.5",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.1",
    "webpack-merge": "^4.2.2"
  },
  "dependencies": {
    "@types/react": "^16.9.19",
    "@types/react-dom": "^16.9.5",
    "antd": "^3.26.7",
    "connected-react-router": "^6.6.1",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-router-dom": "^5.1.2"
  }
}
```

- 启动验证

```bash
yarn dev
# http://localhost:8080/

yarn build
```

- 可能报错
  - 错误1：`smart is not a  function`
  - 错误2：`webpack-cli/bin/config-yargs...`
- 解决办法：使用上面的 `package.json` 文件，锁定依赖版本

## 4-配置 eslint

- 配置 `.eslintrc.json` 文件

```json
{
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint/eslint-plugin"
    ],
    "extends": [
        /** 使用推荐配置 */
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        /** 配置规则 */
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-var-requires": "off"
    }
}
```

- 配置 `package.json` ，新增 `eslint`  命令

这里可以安装 vs code 的 eslint 插件



## 5-单元测试

- 安装 jest 测试工具

```bash
yarn add @types/jest ts-jest -D
```

- 新建 `jest.config.js` 配置

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
}
```

- 编写测试文件

```tsx
// src/calc.tsx

function sum (a: number, b: number) {
  return a + b
}
function minus (a: number, b: number) {
  return a - b
}

module.exports = {
  sum,
  minus
}

// src/calc.test.jsx
let calc = require('./calc')

describe('测试calc', () => {
  test('1+1', () => {
    expect(calc.sum(1,1)).toBe(2)
  })
  
  test('111', () => {
    expect(calc.minus(1,1)).toBe(0)
  })
})
```

- 配置 `package.json` 中 测试命令

```json
"scripts": {
    /** ... */
    "test": "jest"
  },
```

- 运行测试命令： `npm run test`



## 6-支持 React

- 安装 react

```bash
yarn add react @types/react react-dom @types/react-dom -D
```

- 编写 `src/index.tsx`

```tsx
import React from 'react';
import ReactDom from 'react-dom'

const Index = () => {
  return (
    <div>hello, world</div>
  )
}

ReactDom.render(<Index />, document.getElementById("root"))
```

- 这里可能会标红语法问题，需要配置 `tsconfig.json`

```json
{
  "compilerOptions": {
      /** ... 新加这个 */
    "jsx": "preserve", /** 'preserve' | 'react-native' | 'react' */
     /** 'preserve' 表示保留 jsx 语法 和 tsx 后缀  */
     /** 'react-native' 表示 保留 jsx 语法但会把后缀改为 js  */
     /**  'react' 表示不保留 jsx 语法，直接编译成 es5  */
  }
}

```

- 启动测试：

```bsh
yarn dev

// http://localhost:8080/
```

可以看到预览效果

- 其他 ts 相关：
  - `Element` 是指原生 `DOM` 对象元素，不是 `React` 里的东西，而是 `DOM` 里面的类型

```tsx
// React.tsx
    // DOM Elements
    // ReactHTMLElement
function cloneElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
element: DetailedReactHTMLElement<P, T>,
 props?: P,
 ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
```

- 关系图如下：

![继承关系](http://img.zhufengpeixun.cn/elementss.png)

## 7-定义 函数组件和类组件

```tsx
import React from 'react';
import ReactDom from 'react-dom'

interface Props {
  className: string
}
interface State {
  id: string
}

const props: Props = {
  className: 'title'
}

const Index = (props: Props) => {
  const { className } = props
  return (
    <div className={className}>hello, world</div>
  )
}

class Hello extends React.Component<Props, State> {
  state = {
    id: '11'
  }
  render() {
    return React.createElement<Props, HTMLHeadingElement>('h1', props, 'hello')
  }
}

ReactDom.render(<Index {...props} />, document.getElementById("root"))
```



## 9-使用 redux

- 安装依赖：

```bash
yarn add redux react-redux @types/react-redux redux-logger redux-promise redux-thunk @types/redux-logger @types/redux-promise -D
```

- 创建文件 `/src/store/index.tsx`

```tsx
import { createStore, applyMiddleware, StoreEnhancer, StoreEnhancerStoreCreator, Store } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

let storeEnhancer: StoreEnhancer = applyMiddleware(thunk)
let storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(createStore)
let store: Store = storeEnhancerStoreCreator(reducer)

export default store
```

- 创建 `/src/store/acton-types.tsx`

```jsx
export const ADD1 = 'ADD1'
export const ADD2 = 'ADD2'
```

- 创建 `/src/store/reducers/counter1.tsx`

```jsx
import * as types from '../action-types'
import { AnyAction } from 'redux'

export interface Counter1State {
  number: number
}

let initialState: Counter1State = {
  number: 0
}

export default function (state: Counter1State = initialState, action: AnyAction): Counter1State {
  switch (action.type) {
    case types.ADD1:
      return { number: state.number + 1 }
    case types.ADD2:
      return { number: state.number + 2 }
    default: 
      return state
  }
}
```

- 创建 `/src/store/reducers/counter2.tsx`

```jsx
import * as types from '../action-types'
import { AnyAction } from 'redux'

export interface Counter2State {
  number: number
}

let initialState: Counter2State = {
  number: 0
}

export default function (state: Counter2State = initialState, action: AnyAction): Counter2State {
  switch (action.type) {
    case types.ADD1:
      return { number: state.number + 1 }
    case types.ADD2:
      return { number: state.number + 2 }
    default: 
      return state
  }
}
```

- 创建 `/src/store/reducers/index.tsx`

```jsx
import { combineReducers, ReducersMapObject, Reducer, AnyAction } from 'redux';
import counter1, { Counter1State } from './counter1';
import counter2, { Counter2State } from './counter2';

export interface CombinedState {
  counter1: Counter1State
  counter2: Counter2State
}


let reducers: ReducersMapObject<CombinedState, AnyAction> = {
  counter1,
  counter2
}

// export type CombineState = {
//  [key in keyof typeof reducers]:  ReturnType<typeof reducers[key]>
// }


let reducer: Reducer<CombinedState, AnyAction>  = combineReducers(reducers)
export default reducer
```

- 使用 redux
- 新建 `/src/components/Counter1.tsx`

```jsx
import React from 'react'

class Counter1 extends React.Component {

  render () {
    return <>Counter1</>
  }
}

export default Counter1
```

- 新建 `/src/components/Counter2.tsx`

```jsx
import React from 'react'

class Counter2 extends React.Component {
  
  render () {
    return <>Counter2</>
  }
}

export default Counter2
```

- 修改 `/src/index.tsx`

```jsx
import React from 'react';
import ReactDom from 'react-dom'
import Counter1 from './components/Counter1'
import Counter2 from './components/Counter2'
import { Provider } from 'react-redux'
import store from './store'


ReactDom.render(
  <Provider store={store}>
    <Counter1 />
    <Counter2 />
  </Provider>
  , document.getElementById("root"))
```

- 启动项目验证

```bash
yarn dev

// http://localhost:8080
```

可以看到 `Counter1Counter2` 正确显示

接下来，开始连接 Redux

- 修改 `/src/components/Counter1.tsx`

```jsx
import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux';
import { CombinedState } from '../store/reducers/index';
import { Counter1State } from '../store/reducers/counter1';
import * as types from '../store/action-types';

let mapStateToProps = (state: CombinedState): Counter1State => state.counter1 
let mapDispatchToProps = (dispatch: Dispatch) => ({
  add1(amount: number) {dispatch({type: types.ADD1, payload: amount })},
  add2() {dispatch({type: types.ADD2})}
})

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class Counter1 extends React.Component<Props> {

  render () {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add1(5)}>+5</button>
        <button onClick={() => this.props.add2()}>+2</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter1)
```

- 修改 `/src/components/Counter2.tsx`

```jsx
import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux';
import { CombinedState } from '../store/reducers/index';
import { Counter2State } from '../store/reducers/counter2';
import * as types from '../store/action-types';

let mapStateToProps = (state: CombinedState): Counter2State => state.counter2
let mapDispatchToProps = (dispatch: Dispatch) => ({
  add3() {dispatch({type: types.ADD3 })},
  add4() {dispatch({type: types.ADD4 })},
  
})

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class Counter2 extends React.Component<Props> {

  render () {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add3()}>+1</button>
        <button onClick={() => this.props.add4()}>+10</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter2)
```

- 修改 `src/store/action-types.tsx`

```jsx
export const ADD1 = 'ADD1'
export const ADD2 = 'ADD2'
export const ADD3 = 'ADD3'
export const ADD4 = 'ADD4'
```

- 修改 `src/store/reducers/counter1.tsx` 的 `types.ADD1， types.ADD2`

```jsx
import * as types from '../action-types'
import { AnyAction } from 'redux'

export interface Counter1State {
  number: number
}

let initialState: Counter1State = {
  number: 0
}

export default function (state: Counter1State = initialState, action: AnyAction): Counter1State {
  switch (action.type) {
    case types.ADD1:
      // 每次点击新增传入的参数
      return { number: state.number + (action.payload || 1) }
    case types.ADD2:
      return { number: state.number + 2 }
    default: 
      return state
  }
}
```

- 修改 `src/store/reducers/counter2.tsx`  的 `types.ADD3， types.ADD4`

```jsx
import * as types from '../action-types'
import { AnyAction } from 'redux'

export interface Counter2State {
  number: number
}

let initialState: Counter2State = {
  number: 0
}

export default function (state: Counter2State = initialState, action: AnyAction): Counter2State {
  switch (action.type) {
    case types.ADD3:
      return { number: state.number + 1 }
    case types.ADD4:
      return { number: state.number + 10 }
    default: 
      return state
  }
}
```

- 启动验证

```bash
yarn dev

// http://localhost:8080/
```



## 10-支持路由

- 安装路由相关依赖

```bash
yarn add react-router-dom @types/react-router-dom connected-react-router antd -D
```

- 修改 `src/index.tsx`

```jsx
import React from "react";
import ReactDom from "react-dom";
import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";
import { Provider } from "react-redux";
import store from "./store";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ul>
        <li>
          <Link to="counter1">counter1</Link>
        </li>
        <li>
          <Link to="counter2">counter2</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/counter1" component={Counter1} />
        <Route path="/counter2" component={Counter2} />
        <Redirect to="counter1" />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

```

- 新增 `src/history.tsx` 文件

```jsx
import { createHashHistory } from 'history'

const history = createHashHistory()

export default history
```

- 修改 `/src/store/index.tsx` 文件

```jsx
import {
  createStore,
  applyMiddleware,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  Store,
} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { routerMiddleware } from 'connected-react-router'
import history from '../history';

// 在中间件中使用 routerMiddleware(history)
const storeEnhancer: StoreEnhancer = applyMiddleware(thunk, routerMiddleware(history));
const storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(
  createStore
);
const store: Store = storeEnhancerStoreCreator(reducer);

export default store;

```

- 修改 `/src/store/reducers/index.tsx`

```jsx
import { combineReducers, ReducersMapObject, Reducer, AnyAction } from "redux";
import counter1, { Counter1State } from "./counter1";
import counter2, { Counter2State } from "./counter2";
// 引入 下面的文件
import { connectRouter, RouterState } from "connected-react-router";
import history from "../../history";

export interface CombinedState {
  counter1: Counter1State;
  counter2: Counter2State;
   // 新增 router 在 store 的 state 中
  router: RouterState;
}

// 这里因为 RouterState 的类型和 AnyAction 不一致没有交集，使用 any
const reducers: ReducersMapObject<CombinedState, any> = {
  counter1,
  counter2,
  router: connectRouter(history),
};

// export type CombineState = {
//  [key in keyof typeof reducers]:  ReturnType<typeof reducers[key]>
// }

const reducer: Reducer<CombinedState, AnyAction> = combineReducers(reducers);
export default reducer;

```

- 页面使用 `dispatch` 的方式跳转路由

```jsx
import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux';
import { CombinedState } from '../store/reducers/index';
import { Counter1State } from '../store/reducers/counter1';
import * as types from '../store/action-types';
// 引入依赖
import { LocationDescriptorObject, LocationState } from 'history'
import { push } from 'connected-react-router'

const mapStateToProps = (state: CombinedState): Counter1State => state.counter1 
const mapDispatchToProps = (dispatch: Dispatch) => ({
  add1(amount: number) {dispatch({type: types.ADD1, payload: amount })},
  add2() {dispatch({type: types.ADD2})},
  // 新增 跳转路由方法 
  goTo(location: LocationDescriptorObject<LocationState>) {
    dispatch(push(location))
  }
})

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class Counter1 extends React.Component<Props> {

  render () {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add1(5)}>+5</button>
        <br/>
        <button onClick={() => this.props.add2()}>+2</button>
        <br/>
         {/** 新增 跳转路由方法  */}
        <button onClick={() => this.props.goTo({pathname: '/counter2'})}>跳转页面</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter1)
```

参考资料：

- [解析 connected-react-router](https://segmentfault.com/a/1190000023692081)
- [使用connected-react-router绑定react-router到redux](https://zhuanlan.zhihu.com/p/93228510)

 ## 11-使用AntDesign

- 安装依赖：

```jsx
yarn add antd @types/antd -D

yarn add style-loader css-loader @types/react-router-dom -D

yarn add axios -D
```

- 修改 `src/index.tsx`

```jsx
import React from "react";
import ReactDom from "react-dom";
import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";
import { Provider } from "react-redux";
import store from "./store";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";
import "antd/dist/antd.css";
// 使用 antd
import { Layout } from "antd";
import NavBar from "./components/NavBar";
import User from "./components/User";
const { Content } = Layout;

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <NavBar />
        <Content style={{ padding: "20px" }}>
          <Switch>
            <Route path="/counter1" component={Counter1} />
            <Route path="/counter2" component={Counter2} />
            <Route path="/user" component={User} />
            <Redirect to="counter1" />
          </Switch>
        </Content>
      </Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

```

- 新增 `src/components/NavBar.tsx`

```jsx
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'

type Props = RouteComponentProps


class NavBar extends React.Component<Props> {
  render() {
    return (
      <Layout.Header>
        <Menu
          theme="dark"
          style={{lineHeight: '64px'}}
          mode="horizontal"
          selectedKeys={[this.props.location.pathname]}
        >
          <Menu.Item>
            <Link to="/counter1">counter1</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/counter2">counter2</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/user">user</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    )
  }
}

export default withRouter(NavBar)
```

- 以下文件因为是 逐步增加的 需求代码，这里只放最后的代码
- 新增 `src/components/User.tsx` 用户模块

```jsx
import React from "react";
import { Link, RouteComponentProps, withRouter, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import UserAdd from './UserAdd'
import UserList from './UserList'
import UserDetail from './UserDetail'

type Props = RouteComponentProps;

const { Sider, Content } = Layout;

class User extends React.Component<Props> {
  render() {
    return (
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[this.props.location.pathname]}
          >
            <Menu.Item>
              <Link to="/user/add">添加用户</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/user/list">用户列表</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{padding: '20px'}}>
          <Route path="/user/add" component={UserAdd} />
          <Route path="/user/list" component={UserList} />
          <Route path="/user/detail/:id" component={UserDetail} />
        </Content>
      </Layout>
    );
  }
}

export default withRouter(User);
```



- 新增 `src/components/UserAdd.tsx` 新增用户模块

```tsx
import React, { useState, useEffect } from 'react'
import { message, Form, Button, Layout, Input, Menu } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { User, UserAddResponse } from '../typings/api'
import http, { AxiosResponse } from '../api/request'

type Props = RouteComponentProps

const UserAdd = (props: Props) => {
  const [user, setUser] = useState<User>({} as User)
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    http.post<UserAddResponse>('/user', user).then((res: AxiosResponse) => {
       const { data, code } = res.data
       if (code === 0) {
         props.history.push('/user/list')
       }else {
         message.error('添加失败')
       }
    })
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      name: event.target.value
    })
  }

  return (
    <Form>
      <Form.Item>
        <Input
          placeholder="用户名"
          style={{width: 120}}
          value={user.name}
          onChange={handleNameChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>添加</Button>
      </Form.Item>
    </Form>
  )
}

export default UserAdd
```



- 新增 `src/components/UserList.tsx` 用户列表模块

```tsx
import React, { useState, useEffect } from 'react'
import { message, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { User, UserListResponse } from '../typings/api'
import httpInstance, { AxiosResponse } from '../api/request'

const columns: ColumnProps<User>[] = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '跳转详情页',
    dataIndex: 'jump',
    key: 'jump',
    render: (val, record) => (<Link to={`/user/detail/${record._id}`} >跳转</Link>)
  }
]

const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  
  useEffect(() => {
    (async function () {
     const res: AxiosResponse<UserListResponse> =  await httpInstance.get<UserListResponse, AxiosResponse<UserListResponse>>('/users')
     const { data, code } = res.data
     if (code === 0) {
       setUsers(data)
     } else {
       message.error('获取用户列表失败')
     }
    })()
  }, [])


  return (
    <Table columns={columns} dataSource={users} rowKey={row => row._id} />
  )
}

export default UserList
```



- 新建 `src/typings/api.ts` 定义接口类型

```typescript
/*
 * @Description: 
 * @Date: 2020-12-12 12:11:11
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 export interface User {
   _id: string
   name: string
 }

 export interface UserListResponse {
   code: number
   data: User[]
 }


 export interface UserAddResponse {
   code: number
   data: User
 }
```



- 新建 `src/api/request.ts` 定义请求方法

```typescript
/*
 * @Description: 
 * @Date: 2020-12-12 13:51:31
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 import axios from 'axios'

 const httpInstance = axios.create({
   timeout: 2000,
   baseURL: '/api/'
 })

 export * from 'axios'
 export default httpInstance
```

- 连接 store
- 修改 `src/store/action-types.tsx`

```tsx
export const ADD1 = 'ADD1'
export const ADD2 = 'ADD2'
export const ADD3 = 'ADD3'
export const ADD4 = 'ADD4'


export const SET_USER_LIST = 'SET_USER_LIST'
```

- 新建 `src/store/reducers/user.tsx`

```tsx
import * as types from "../action-types";
import { AnyAction } from "redux";
import { User } from '../../typings/api'


export interface UserState {
  list: User[]
}

const initialState: UserState = {
  list: [],
};

export default function (
  state: UserState = initialState,
  action: AnyAction
): UserState {
  switch (action.type) {
    case types.SET_USER_LIST:
      return { list: action.payload };
    default:
      return state;
  }
}

```

- 修改 `src/store/reducers/index.tsx`

```tsx
import { combineReducers, ReducersMapObject, Reducer, AnyAction } from "redux";
import counter1, { Counter1State } from "./counter1";
import counter2, { Counter2State } from "./counter2";
// 新增 user
import user, { UserState } from './user'
import { connectRouter, RouterState } from "connected-react-router";
import history from "../../history";
export interface CombinedState {
  counter1: Counter1State;
  counter2: Counter2State;
  // 新增 user
  user: UserState;
  router: RouterState;
}

const reducers: ReducersMapObject<CombinedState, any> = {
  counter1,
  counter2,
  // 新增 user
  user,
  router: connectRouter(history),
};

// export type CombineState = {
//  [key in keyof typeof reducers]:  ReturnType<typeof reducers[key]>
// }

const reducer: Reducer<CombinedState, AnyAction> = combineReducers(reducers);
export default reducer;

```

- 修改 `src/components/UserList.tsx`

```tsx
import React, { useState, useEffect } from 'react'
import { message, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { User, UserListResponse } from '../typings/api'
import httpInstance, { AxiosResponse } from '../api/request'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { CombinedState } from '../store/reducers/index';
import { UserState } from '../store/reducers/user';
import * as types from '../store/action-types';


const mapStateToProps = (state: CombinedState): UserState => state.user
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUserList(list: User[]) {
    dispatch({ type: types.SET_USER_LIST, payload: list })
  }
})

const columns: ColumnProps<User>[] = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '跳转详情页',
    dataIndex: 'jump',
    key: 'jump',
    render: (val, record) => (<Link to={`/user/detail/${record._id}`} >跳转</Link>)
  }
]


type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const UserList = (props: Props ) => {

  // const [users, setUsers] = useState<User[]>([])
  const users = props.list
  useEffect(() => {
    (async function () {
      const res: AxiosResponse<UserListResponse> =  await httpInstance.get<UserListResponse, AxiosResponse<UserListResponse>>('/users')
      const { data, code } = res.data
      if (code === 0) {
        // setUsers(data)
        props.setUserList(data)
      } else {
        message.error('获取用户列表失败')
      }
     })()
  }, [])


  return (
    <Table columns={columns} dataSource={users} rowKey={row => row._id} />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
```



## 12-后台接口

- 后台仓库地址：[Jsmond2016/server-webpack-react-ts](https://github.com/Jsmond2016/server-webpack-react-ts)

- 初始化项目

```bash
mkdir server
cd server
cnpm init -y
cnpm i @types/node express @types/express body-parser cors @types/cors mongoose @types/mongoogse shelljs -S
```

- `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5", 
    "module": "commonjs", 
    "lib": [
      "ES2015",
       "DOM"
    ],
    "outDir": "./dist",
    "strict": true, 
     "baseUrl": "./",
     "paths": {
       "paths": {
         "*": [
         "node_modules/*",
         "typings/*"
       ]
     },
    "esModuleInterop": true,
  }
}
```

- `servet.ts`

```typescript
/*
 * @Description: 
 * @Date: 2020-12-12 14:11:23
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 import express, {Express, Request, Response } from 'express'
 import bodyParser from 'body-parser'
 import cors from 'cors'
 import Models from './db'
 import config from './config'
 import path from 'path'

 const app: Express = express()

 app.use(cors({
   origin: config.origin,
   credentials: true,
   allowedHeaders: "Content-Type, Authorization",
   methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"
 }))
 app.use(express.static(path.resolve(__dirname, 'public')))
 app.use(bodyParser.urlencoded({extended: false }))
 app.use(bodyParser.json())

 app.get('/api/users', async (req: Request, res: Response) => {
   const user = await Models.UserModel.find()
   res.json({
     code: 0,
     data: user
   })
 })

 app.post('/api/user', async (req: Request, res: Response) => {
   let user = req.body
   user = await Models.UserModel.create(user)
   res.json({
     code: 0,
     data: user
   })
 })

 app.listen(4000, () => {
   console.log('服务器在 http://localhost:4000 端口启动')
 })
```

- 编写 `src/db.ts`

```typescript
/*
 * @Description: 
 * @Date: 2020-12-12 14:46:27
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 import mongoose, { Schema, Connection, Model} from 'mongoose'
 import config from './config';
 

 const conn: Connection = mongoose.createConnection(config.dbUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true
 })
 const UserModel = conn.model("User", new Schema({
   usename: {
     type: String
   }
 }))

 export default { UserModel }
```

- 编写 `src/config.ts`

```typescript
/*
 * @Description: 
 * @Date: 2020-12-12 14:20:51
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 interface IConfig {
   secret: string
   dbUrl: string
   origin: string []
 }

 const config: IConfig = {
   secret: 'webpack-react-ts-test',
   dbUrl: 'mongodb://localhost:27017/webpack-ts',
   origin: ['http://localhost:8080']
 }

 export default config
```

- 编写 `src/copy.ts`

```typescript
/*
 * @Description: 
 * @Date: 2020-12-12 14:58:55
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 import shelljs  from 'shelljs'

 shelljs.cp("-R", "./public/", "./dist/")
```

- 编写 `src/typings/shelljs/index.d.ts`

```typescript
/*
 * @Description: 
 * @Date: 2020-12-12 14:58:27
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 declare module 'shelljs'
```

- 修改 `package.json` 文件

```json
{
  "name": "server-webpack-react-ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node ./src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/mongoose": "^5.10.2",
    "mongoose": "^5.11.6"
  },
  "devDependencies": {
    "@types/cors": "^2.8.8",
    "@types/express": "^4.17.9",
    "@types/node": "^14.14.12",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "shelljs": "^0.8.4"
  }
}

```

- 打开 `Robo 3T` 数据库预览工具，开启连接
- 创建数据库 `webpack-ts`
- 创建表 `users`
- 新增 `log` 进行测试

```typescript
// src/server.ts
app.get('/api/users', async (req: Request, res: Response) => {
   const user = await Models.UserModel.find()
   console.log('GET /api/users: ', user)
   res.json({
     code: 0,
     data: user
   })
 })

 app.post('/api/user', async (req: Request, res: Response) => {
   let user = req.body
   console.log('POST /api/user: ', JSON.stringify(user))
   user = await Models.UserModel.create(user)
   res.json({
     code: 0,
     data: user
   })
 })
```

- 使用 postman 测试接口，查看 log 信息

```js
get localhost:4000/api/users

post localhost:4000/api/user
```

- 修改 前端 请求配置

```typescript
// src/api/request.ts 
import axios from 'axios'

 const httpInstance = axios.create({
   timeout: 2000,
   // 如果你这里的代码和我的不一致，参考修改
   baseURL: '/api/'
 })

 export * from 'axios'
 export default httpInstance

// 其他文件所有请求都只请求后面部分,如 '/users'
//const res: AxiosResponse<UserListResponse> =  await httpInstance.get<UserListResponse, AxiosResponse<UserListResponse>>('/users')

```

- 前端设置代理 `webpack.base.config.js`

```js
devServer: {
    contentBase: '../dist',
    proxy: [　　
      // webpack 关于跨域的配置，参考资料 https://www.cnblogs.com/zwhbk/p/13364931.html　　　　
  　　// 例如将'localhost: 8080/api/xxx'代理到'http:www.baidu.com/api/xxx
      {
          context: ['/api'],
          target: 'http://localhost:4000/', //接口域名
          changeOrigin: true, //如果是https需要配置该参数
          secure: false, //如果接口跨域需要进行该配置
      },
    ]
  },
```

- 前端项目启动，测试数据是否成功

```bash
yarn dev

// localhost:8080
```



## 13-拓展知识：异步 Dispatch

因为 Redux 自带的 Dispatch 没有异步 Dispatch ，因此需要自己定义

- 看代码：

```tsx
import { Middleware, Action, AnyAction } from 'redux';
type MiddlewareExt = Middleware & {
    withExtraArgument: typeof createThunkMiddleware
}
export type ThunkAction<R, S, E, A extends Action> = (
    dispatch: ThunkDispatch<S, E, A>,
    getState: () => S,
    extraArgument: E
) => R;
// 特点：异步 dispatch 可以接受一个 异步函数
export interface ThunkDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;
    <R>(asyncAction: ThunkAction<R, S, E, A>): R;
}
function createThunkMiddleware<S = Record<string, unknown>, A extends Action = AnyAction, E = undefined>(extraArgument?: any): Middleware {
    const middleware: Middleware<ThunkDispatch<S, E, A>, S, ThunkDispatch<S, E, A>> = ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }

        return next(action);
    };
    return middleware;
}

const thunk: MiddlewareExt = createThunkMiddleware() as MiddlewareExt;
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

```

- 使用

```tsx
import React from 'react'
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { CombinedState } from '../store/reducers/index';
import { Counter1State } from '../store/reducers/counter1';
import * as types from '../store/action-types';
import { LocationDescriptorObject, LocationState } from 'history'
import { push } from 'connected-react-router'
// 异步 dispatch 
import { ThunkDispatch } from '../redux-thunk';


const mapStateToProps = (state: CombinedState): Counter1State => state.counter1 
// 异步 dispatch - ThunkDispatch<CombinedState, Record<string, unknown>, AnyAction>
const mapDispatchToProps = (dispatch: ThunkDispatch<CombinedState, Record<string, unknown>, AnyAction>) => ({
  add1(amount: number) {dispatch({type: types.ADD1, payload: amount })},
  add2() {dispatch({type: types.ADD2})},
  goTo(location: LocationDescriptorObject<LocationState>) {
    dispatch(push(location))
  },
   // 异步 dispatch
  asnycAdd(amount: number) {
    dispatch((dispatch: ThunkDispatch<CombinedState, Record<string, unknown>, AnyAction>, getState: any) => {
      setTimeout(() => {
        dispatch({type: types.ADD1, payload: amount})
      }, 1000)
    })
  }
})

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class Counter1 extends React.Component<Props> {

  render () {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add1(5)}>+5</button>
        <br/>
        <button onClick={() => this.props.add2()}>+2</button>
        <br/>
        <button onClick={() => this.props.goTo({pathname: '/counter2'})}>跳转页面</button>
        <br/>
        <button onClick={() => this.props.asnycAdd(5)}>异步thunk</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter1)
```



## 14-Mock 数据

参考资料：

- [在webpack-dev-server内添加mock server](https://blog.csdn.net/weixin_33815613/article/details/88027401)
- [vue项目mock数据方案之一：webpack的devServer.before](https://www.jianshu.com/p/c4883c04acb3)

## 15-webpack-tsconfig 配置优化

- [React Typescript音乐播放器项目笔记：2、alias与tsconfig的配置](https://blog.csdn.net/weixin_38405133/article/details/87188898)
- [Typescript + alias 2019 配置](https://zhuanlan.zhihu.com/p/123097934)

参考学习资料：

- [视频参考](https://www.bilibili.com/video/BV1Wb41147QT?from=search&seid=15906508399145941210)
- [视频参考2](https://www.bilibili.com/video/BV1C7411k7ZQ?from=search&seid=15906508399145941210)
- [资料参考1](https://github.com/CCZX/React-TypeScript-from0to1)
- [资料参考2](https://github.com/CCZX/wechat)
- [从零开始搭建React应用（一）——基础搭建](https://juejin.cn/post/6844903605070200846)
- [从零开始搭建React应用（二）——React应用架构](https://juejin.cn/post/6844903639782260749)

