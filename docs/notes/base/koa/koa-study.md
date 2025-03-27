
> 代码见：https://github.com/Jsmond2016/node-study/tree/main/koa-study


# koa 学习汇总

## 01-koa-bodyparser

> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/01-koa-bodyparser.js

```js
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
 
app.use(bodyParser());
 
app.use(async(ctx)=>{
    if(ctx.url === '/' && ctx.method === 'GET'){
        //显示表单页面
        let html=`
            <h1>Koa2 request POST</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>age</p>
                <input name="age" /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body=html;
    }else if(ctx.url === '/' && ctx.method === 'POST'){
         let postData = ctx.request.body;
         ctx.body = postData;
    }else{
        ctx.body = '<h1>404!</h1>';
    }
});

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000');
});

```

## 02-koa-router
> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/02-koa-router.js

```js
const Koa = require('koa');
const Router = require('koa-router');
 
const app = new Koa();
const router = new Router();
 
//实现 '/'、'/koa'两个路由层级
router
    .get('/',(ctx,next)=>{
        ctx.body="Index page";
    })
    .get('/koa',(ctx,next)=>{
        ctx.body="Koa page";
    });
 
app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(3000,()=>{
    console.log('starting at port 3000');
});

```

## 03-koa-router-prefix

> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/03-koa-router-prefix.js

```js
const Koa = require('koa');
const Router = require('koa-router');
 
const app = new Koa();
// 访问地址 http://localhost:3000/api/test1
// 访问地址 http://localhost:3000/api/test2
// 其他地址为 404
//所有路由必须加上一个tony父层级，才能被访问
const router = new Router({
  prefix: '/api'
})
 
//实现 '/'、'/koa'两个路由层级
router
    .get('/test1',(ctx,next)=>{
        ctx.body="test1 page";
    })
    .get('/test2',(ctx,next)=>{
        ctx.body="test2 page";
    });
 
app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(3000,()=>{
    console.log('starting at port 3000');
});
```

## 04-koa-router-suffix

> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/04-koa-router-suffix.js

```js
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();


//实现'/home'、'/page'两个子路由层级，以及各自的两个孙子路由层级

//子路由
let home = new Router();
home
    .get('/',async(ctx)=>{
        ctx.body="Home";
    })
    .get('/one',async(ctx)=>{
        ctx.body="Home one";
    })
    .get('/two',async(ctx)=>{
        ctx.body ='Home two';
    })

let page = new Router();
page
    .get('/',async(ctx)=>{
        ctx.body="Page";
    })
    .get('/one',async(ctx)=>{
        ctx.body="Page one";
    })
    .get('/two',async(ctx)=>{
        ctx.body ='Page two';
    })

//总路由，装载子路由
let router = new Router();
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});

```

## 05-koa-views
> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/05-koa-views.js

```js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 定位模板文件目录，并选择模板引擎
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  //渲染index.ejs，并传入title变量
  await ctx.render('index', {
    title
  })
})

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
})
```


## 06-koa-static

> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/06-koa-static.js

```js
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

const staticPath = './static'

//即可直接通过 http://localhost:3000/pear.jpg 访问到静态资源
app.use(static(
  path.join(__dirname, staticPath)
))

app.use( async ( ctx ) => {
  ctx.body = '<h1>hello world</h1>'
})

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})

```

## 07-koa-session
> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/07-koa-session.js

```js
const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});

app.listen(3000);
console.log('listening on port 3000');

```

## 08-koa-jwt
> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/08-koa-jwt.js

```js
var Koa = require('koa');
var jwt = require('koa-jwt');

var app = new Koa();

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

// Unprotected middleware
app.use(function(ctx, next){
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n';
  } else {
    return next();
  }
});

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: 'shared-secret' }));

// Protected middleware
app.use(function(ctx){
  if (ctx.url.match(/^\/api/)) {
    ctx.body = 'protected\n';
  }
});

app.listen(3000);

```

## 09-koa-helmet
> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/09-koa-helmet.js

```js
"use strict";

// https://github.com/venables/koa-helmet
// 主要针对 https 请求做处理

const Koa = require("koa");
const helmet = require("koa-helmet");
const app = new Koa();

app.use(helmet());

app.use((ctx) => {
  ctx.body = "Hello World"
});

app.listen(3000);

```

## 10-koa-compress
> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/10-koa-compress.js

```js
const compress = require('koa-compress')
const Koa = require('koa')

// 具体信息，可以参考这篇博客 https://blog.csdn.net/dreamjay1997/article/details/85229277


const app = new Koa()
app.use(compress({
  filter (content_type) {
  	return /text/i.test(content_type)
  },
  threshold: 2048,
  gzip: {
    flush: require('zlib').constants.Z_SYNC_FLUSH
  },
  deflate: {
    flush: require('zlib').constants.Z_SYNC_FLUSH,
  },
  br: false // disable brotli
}))


// 使用
app.use((ctx, next) => {
  //ctx 代表响应 ctx.compress = trus 代表允许压缩
  ctx.compress = true
  // ...
})

app.listen(3000,()=>{
  console.log('[demo] server is starting at port 3000');
})

```

## 11-koa-logger

> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/11-koa-logger.js

```js
const logger = require('koa-logger')
const Koa = require('koa')

const app = new Koa()
app.use(logger())

app.use((ctx) => {
  ctx.body = "Hello World"
});

app.listen(3000);
```


## 12-koa-convert

> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/12-koa-convert.js

## 13-koa-compose

> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/13-koa-compose.js

```js
// 使用方式：compose([a, b, c, ...])

const Koa = require('koa')
const componse = require('koa-compose')

const app = new Koa()

const middle1 = (ctx, next) => {
  console.log('11111')
  next()
}

const middle2 = (ctx, next) => {
  console.log('222')
  next()
}

const middle3 = (ctx, next) => {
  console.log('333')
  ctx.body = 'hahahahah'
  next()
}

// 合并的中间件要放在 数组中
app.use(componse([middle1,middle2,middle3]))

app.listen(3000, () => {
  console.log('start server port at 3000')
})

```

## 14-koa-RESTful

> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/14-koa-RESTful.js

```js
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const koaBody = require('koa-body')

// 用于格式化返回的 数据为 json 格式
const json = require('koa-json')



const app = new Koa()
const router = new Router()


// 常规测试
router.get('/', ctx => {
  console.log(ctx)
  ctx.body = 'hello, world'
})

router.get('/api', ctx => {
  console.log(ctx)
  ctx.body = 'hello, Api'
})

router.get('/async', async (ctx)=> {
  let res = await new Promise((resove, reject) => {
    setTimeout(() => {
      resove("Hello, world 2s later");
    }, 2000)
  })
  ctx.body = res
})


router.post('/post', async (ctx) => {
  let { body } = ctx.request
  console.log(body)
  console.log(ctx.request)
  ctx.body = body
})


// prefix 测试



app.use(koaBody())
   .use(cors())
   .use(json({
     pretty: false, param: 'pretty'
   }))
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(3000)

```

## 15-koa-combine-routes
> https://github.com/Jsmond2016/node-study/blob/main/koa-study/koa-middleware/15-koa-combine-routes.js

```js
const Koa = require('koa') 
const Router = require('koa-router')
const combineRouters = require('koa-combine-routers')

const app = new Koa()
 
const dogRouter = new Router()
const catRouter = new Router()
 
dogRouter.get('/dogs', async ctx => {
  ctx.body = 'dogs  ok'
})
 
catRouter.get('/cats', async ctx => {
  ctx.body = 'cats  ok'
})
 
const router = combineRouters(
  dogRouter,
  catRouter
)

app.use(router())

app.listen(3000, () => {
  console.log('服务已开启，运行在' + process.env.PORT + '端口')
})
```
