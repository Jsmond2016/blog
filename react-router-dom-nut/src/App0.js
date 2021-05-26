// 基础学习代码

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
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
      <Switch>
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
              <Link to='/other'>其他</Link>
            </li>
            <li>
              <Link to='/product'>商品页</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/product/:id" component={Product} />
          <Route component={NotFound} />
        </Router>
      </Switch>
    </div>
  );
}


function Product(props) {
  console.log('props', props)
  const { url, params } = props.match
  const { id } = params
  return (
    <div>
      <h2>Product ...{id}</h2>
      <Link to={url + '/detail'}>详情页</Link>
      <Route path={url + '/detail'} component={Detail} />
    </div>
  )
}

function Detail() {
  return (
    <>
      <h2>商品详情页</h2>
    </>
  )
}

function Render(props) {
  console.log('props: ', props);
  return (
    <h2>Render ...</h2>
  )
}

export default App;
