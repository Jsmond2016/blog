import React from 'react'
import { RouterContext } from './RouterContext'
import matchPath from './matchPath'




export default function Route(props) {

  const { component, children, render, path, computedMatch } = props

  // match: 优先级顺序为 children -> component -> render -> null
  // not match: 优先级顺序为 chidren(function) -> null
  // match ? children : null
  //         children ? (typeof children === 'function' ? children(props) : children) : component
  //                     typeof children === 'function' ? children(props) : children
  //         component ? React.createElement(component, props) : render
  //         render ? render(props) : null
  //         render(props) ? null : typeof children === 'function' ? children(props) : null
  //         typeof children === 'function' ? children(props) : null
  return (
    <RouterContext.Consumer>

      {(context) => {
        const match = computedMatch ? computedMatch : path ? matchPath(context.location.pathname, props) : context.match
        const routeProps = {
          ...context,
          match
        }
        return match
          ?
          children ? (typeof children === 'function' ? children(routeProps) : children)
            : component ? React.createElement(component, routeProps)
              : render
                ? render(routeProps) : null
          : typeof children === 'function' ? children(routeProps) : null
      }}
    </RouterContext.Consumer>
  )
}