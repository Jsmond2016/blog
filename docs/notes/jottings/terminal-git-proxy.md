# PowerShell 命令行 和 git 代理配置-windows 篇

最近使用 powershell clone 仓库，速度贼慢，研究了一下如何提速：



## 梯子准备

如下，你的楼梯本地代理地址：

```sh
socks5:http://127.0.0.1:51837
```



## powershell 命令行代理

::: warning 说明

配置 terminal 命令可能导致你在使用 `yarn | npm` 安装依赖的时候报错，请谨慎使用；
:::


```ps1
$env:http_proxy="http://127.0.0.1:51837"
$env:https_proxy="http://127.0.0.1:51837"
```

测试：

```sh
curl -I www.google.com
```

收到响应，则表示代理成功；

如图：

![image](https://github.com/Jsmond2016/blog/assets/25282180/4ecf3637-65c2-4fe9-89c0-4976797e19fd)

取消设置：

```sh
$env:http_proxy=""
$env:https_proxy=""
```


其他关于 PowerShell 的 `env` 相关操作

```sh

# $env:ENV_NAME
$env:http_proxy

> http://127.0.0.1:51837

dir env:

...展示所有环境变量

```

更多，参考：

- https://www.tutorialspoint.com/how-to-set-environment-variables-using-powershell
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.3


## Git 命令代理

主要分 2 种：http 代理和 ssh 代理

- http 代理

```sh
git config --global https.proxy http://127.0.0.1:51837
git config --global https.proxy https://127.0.0.1:51837

# 上下 2 个配置 二选一，试一试，应该有一个有效果

git config --global http.proxy 'socks5://127.0.0.1:51837' 
git config --global https.proxy 'socks5://127.0.0.1:51837'
```

测试：

```sh
git clone https://github.com/vuejs/vue.git
```

效果：

![image](https://github.com/Jsmond2016/blog/assets/25282180/7d287254-2134-421c-ac17-9cc625cfba4b)



后续不需要，可取消代理：

```sh
git config --global --unset http.proxy
git config --global --unset https.proxy
```


- ssh 代理

```sh
ProxyCommand connect -S http://127.0.0.1:51837 %h %p
```

测试：

```sh
git clone git@github.com:vuejs/vue.git
```

效果图：

![image](https://github.com/Jsmond2016/blog/assets/25282180/1012af44-d94b-4e58-b62a-f0e63803945d)


## 遇到问题

上述操作都成功了，我使用 `yarn` 给项目安装依赖的时候，报网络问题，不知为何，尝试禁用 PowerShell 的代理后恢复；


参考资料：


- [win-ss](https://gist.github.com/dreamlu/cf7cbc0b8329ac145fa44342d6a1c01d)
- [SSH in git behind proxy on windows 7](https://stackoverflow.com/questions/5103083/ssh-in-git-behind-proxy-on-windows-7)
- [给windows终端设置代理](https://juejin.cn/post/7130206938919927838)
- [让终端命令请求走 Charles 或 SS 代理的方法](https://blog.devhitao.com/2018/08/23/mac-terminal-proxy)
- [Windows git和cmd代理设置](https://www.jianshu.com/p/b9047a59ffc9)
- [Proxy CONNECT aborted--解决办法](https://zhuanlan.zhihu.com/p/620877553)