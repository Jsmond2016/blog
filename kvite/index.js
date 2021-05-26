// node服务器
// html 宿主页
// js
// vue


const Koa = require('koa')

// 创建实例

const app = new Koa()
const fs = require('fs')
const path = require('path')
const compilerSFC = require('@vue/compiler-sfc')
const compilerDom = require('@vue/compiler-dom')
//中间件配置
// 配置路由


app.use(async (ctx) => {

  const { url, query } = ctx.request

  // 首页请求
  if (url === '/') {
    // 加载 index.html
    ctx.type = "text/html"
    ctx.body = fs.readFileSync("./index.html", "utf8")
  } else if (url.endsWith('.js')) {
    // js 文件加载处理
    const p = path.join(__dirname, url )
    ctx.type = "application/javascript"
    ctx.body = rewriteImport(fs.readFileSync(p, 'utf8'))
  } else if (url.startsWith('/@modules/')) {
    // 获得裸模块名称
    const moduleName = url.replace('/@modules/', '')
    // 去 node_modules目录找
    const prefix = path.join(__dirname, './node_modules', moduleName)
    console.log('__dirname: ', __dirname);
    console.log('prefix: ', prefix);
    // 从 package.json 中获取 module 字段
    const module = require(prefix + "/package.json").module
    const filePath = path.join(prefix, module)
    const ret = fs.readFileSync(filePath, 'utf8')
    ctx.type = "application/javascript"
    ctx.body = rewriteImport(ret)
  } else if(url.indexOf('.vue') > -1) {
    // 获取加载文件的路径
    const p = path.join(__dirname, url.split('?')[0])
    // 拿到 ast
    const astRet = compilerSFC.parse(fs.readFileSync(p, 'utf8'))
    console.log('astRet: ', astRet);

    if (!query.type) {
      // sfc 请求
      // 读取 vue 文件，解析为 js
      
      // 获取脚本部分的内容
      const scriptContent = astRet.descriptor.script.content
      // 替换默认导出的一个常量，方便后续修改
      const script = scriptContent.replace('export default', 'const __script = ')
      ctx.type = 'application/javascript'
      ctx.body = `
      ${rewriteImport(script)}
      // 解析 template部分
      import { render as __render } from '${url}?type=template'
      __script.render =  __render
      export default __script
      `
    } else if (query.type === 'template') {
      const tpl = astRet.descriptor.template.content
      const render = compilerDom.compile(tpl, {mode: 'module'}).code
      ctx.type = 'application/javascript'
      ctx.body = rewriteImport(render)
    }

  }  

})

// 裸模块重写

// import xxx from 'vue'
// import xxx from '/@modules/vue'

function rewriteImport(content) {
  return content.replace(/ from ['"](.*)['"]/g, function(s1, s2) {
    if (s2.startsWith('./' || s2.startsWith('/') || s2.startsWith('../'))) {
      return s1
    } else {
      // 裸模块 替换
      return ` from '/@modules/${s2}'`
    }
  })
}


app.listen(3000, () => {
  console.log('kvite start at: http://localhost:3000')
})