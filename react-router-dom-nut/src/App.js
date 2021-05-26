
// 手写原理

import { BrowserRouter as Router, Route, Link, Switch } from './react-router-dom-nut'
import { useState } from 'react'
import Home from './views/Home'
import User from './views/User'
import Login from './views/Login'
import NotFound from './views/NotFound'

function App() {

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>add</button>
      <br />
      {count}
      <Router>
        <ul>
          <li>
            <Link to='/home'>首页</Link>
          </li>
          <li>
            <Link to='/user'>用户中心</Link>
          </li>
          <li>
            <Link to='/login'>登录</Link>
          </li>
          <li>
            <Link to='/product'>商品</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" children={Home} />
          <Route path="/user" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/product/:id" component={Product} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

function Product(props) {
  const { url } = props.match
  return (
    <div>
      Product...
      <Link to={url + "/detail"}> 详情 </Link>
      <Route path={url + "/detail"} component={Detail} />
    </div>
  )
}

function Detail() {
  return (
    <div>Detail...</div>
  )
}


export default App;
