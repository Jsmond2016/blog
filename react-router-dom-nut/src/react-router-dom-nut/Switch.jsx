import React from 'react'
import { RouterContext } from "./RouterContext";
import matchPath from './matchPath'

export default function Switch(props) {

  const { children, location } = props
  return (
    <RouterContext.Consumer>
      {(context) => {
        console.log('context: ', context);
        let match  // 是否匹配
        let element // 匹配到的元素
        // 遍历子元素，找到第一个匹配的
        // 问题：子元素可能是数组也可能是个元素
        const _location = location || context.location
        React.Children.forEach( children, child => {
          if (match == null && React.isValidElement(child)) {
            element = child
            const { path } = child.props
            match = path ? matchPath(_location.pathname, child.props) : context.match
          }
        });
        return match ? React.cloneElement(element, {computedMath: match}) : null 
      }}
    </RouterContext.Consumer>
  )
}