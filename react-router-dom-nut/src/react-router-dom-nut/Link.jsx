
import { useContext } from 'react'
import { RouterContext } from './RouterContext'

export default function Link({to, children, ...restProps}) {

  const context = useContext(RouterContext)
  
  // history 模式跳转路由
  const handleClick = e => {
    e.preventDefault()
    context.history.push(to)
  }
  
  return (
    <a href={to} onClick={handleClick} {...restProps}>
      {children}
    </a>
  )
}