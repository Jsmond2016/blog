
import { useEffect, useState } from 'react'
import { RouterContext } from './RouterContext'


const computeRootMatch = (pathname) => {
  return {
    path: '/',
    url: '/',
    params: {},
    isExact: pathname === '/'
  }
}

export default function Router(props) {
  const [location, setLocation] = useState(props.history.location)
  const { children, history } = props
  const { listen } = history
  
  // 监听路由
  const unlisten = listen((location) => {
    setLocation(location)
  })

  const match = computeRootMatch(location.pathname)
  
  // 组件卸载的时候取消监听
  useEffect(() => {
    return () => {
      unlisten?.()
    }
  }, [unlisten])

  return (
    <RouterContext.Provider value={{history, location, match}}>
      {children}
    </RouterContext.Provider>
  )
}