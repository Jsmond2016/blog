import Router from './Router'
import { createBrowserHistory } from 'history'


export default function BrowserRouter(props) {

  const { children } = props
  const history = createBrowserHistory()

  return (
    <Router history={history} children={children} />
  )
}