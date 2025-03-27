---
title: Windows 开发基本配置
date: 2019-7-8
tags: 
- "随笔"
---

# Windows 开发基本配置

## 1.软件安装

- 编辑器安装 
  - [SublimeText3](https://www.sublimetext.com/) 收费，但是可以无限试用
  - [Webstrom](https://www.jetbrains.com/webstorm/)  收费，需要破解，[破解方式](http://blog.csdn.net/it_talk/article/details/52448597)
  - [VS Code](https://code.visualstudio.com/) 开源，免费
  - [Typora](https://typora.io/) Markdown 编辑器
- Gitbash [安装](https://git-scm.com/downloads)
- 浏览器 Chrome [安装](http://www.google.cn/chrome/browser/desktop/index.html)
- [Nodejs 安装](https://nodejs.org/zh-cn/)

## 2.Github账号注册和配置

- 科学上网
  - 梯子下载和安装[shadowsocks](https://github.com/shadowsocks/shadowsocks-windows/releases)  配置和 [账号购买](https://portal.shadowsocks.la/?language=chinese)
  - 蓝灯  [下载地址1](https://github.com/getlantern/lantern/releases/tag/latest)
  - 赛风 [下载地址1](http://www.psiphon3.net/zh/index.html)  [下载地址2](http://s3.amazonaws.com/fddc-r090-rtqi/zh.html)
  - 修改 HOSTS [方法](https://github.com/racaljk/hosts)
- 注册 Gmail账号和邮箱
- 注册Github账号
- 线上Github的基本使用
- 在gitbash  [配置github](http://jsmond.info/2017/10/11/Git%E7%9A%84%E5%B8%B8%E7%94%A8%E6%93%8D%E4%BD%9C/)  和 git命令下使用教程

## 3. Markdown的学习和使用

- [Markdown 语法学习](https://www.jianshu.com/p/q81RER)
- 在简书上开通个人博客 
- 设置编辑模式为 *Markdown* 
- 在简书上和Typora编辑markdown的区别 
  - 简书：所见即所得
  - Typora 写完可见

## 4. Hexo+github 搭建个人博客

- [关于Hexo](https://hexo.io/zh-cn/docs/)

- 参考  [hexo+github 搭建个人博客](https://www.jianshu.com/p/0af76a76b279)

- git账号注册和gitbash下载 【已完成】

- Nodejs 下载 【已完成】

- Hexo安装

- 创建 github仓库，仓库名字为 `name.github.io` 

- 部署 ：

  编辑 `_config.yml(在H:\hexo下)`。你在部署时，要把下面的yourname都换成你的账号名。

  ```
  deploy:
    type: git
    repository:git@github.com:yourname/yourname.github.io.git
    branch: master
  ```

- 更换主题：参考第一条

- 绑定个性域名

  - [参考文章1](https://zhuanlan.zhihu.com/p/25627048) [参考文章2](http://www.kiwimore.com/namesilo-yuming-jiexi/)
  - 购买域名 
    - [namesilo](https://www.namesilo.com/)
    - [使用优惠码购买域名](https://www.imhunk.com/buy-domain-on-namesilo/) 
  - 如何绑定
    - [Hexo博客系列（七）：域名和DNS](http://www.isetsuna.com/hexo/domain-dns/)  


## 5. git 基本操作的学习

- git 的原理
  ![](https://i.loli.net/2018/01/15/5a5cb43f1b9fb.png)
- git 的普通操作，[推荐-看我](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)  [git-菜鸟教程](http://www.runoob.com/git/git-tutorial.html) 
- github pages是什么？如何使用？[githubPages-guide](https://pages.github.com/) 【看不懂英文直接 鼠标右键翻译该网页】
- 既然你都学到这里了，还不要 [follow我](https://github.com/Jsmond2016)？互相关注吧~

## 6. Linux命令行的学习

- 推荐文章 ：[Linux 常用命令行](http://jsmond.info/2017/10/01/%E5%B8%B8%E7%94%A8Linux%E5%91%BD%E4%BB%A4%E8%A1%8C/)
- 题外话：[为什么要学习Linux？-知乎](https://www.zhihu.com/question/20117703)
- Vim 的学习 ：[文章](https://coolshell.cn/articles/5426.html)
- `http-server`  的配置和[使用](https://segmentfault.com/q/1010000003926981)：`npm install http-server -g` 
- `.bashrc` 设置快捷键，[alias的使用](http://blog.csdn.net/cyberreality/article/details/6838788) ,并且给你的 git 操作添加 alias吧，例如：`ga == git add` 

## 7. 如何问问题？

- 首先：自己搜索（80%的问题都可以得到解决）：
  1. 找出你的报错或关键词
  2. 【墙外】谷歌搜索你的问题
  3. 【墙内】必应，百度搜索你的问题
  4. 把你的报错信息或者问题分别用英文描述重复步骤2和3
- 其次：询问他人
  1. 代码复制在线上 [jsBin](http://jsbin.com/) 保存，复制你的连接
  2. 报错截图 
  3. 描述你的问题：你想要的结果是什么，你得到的结果又是什么，因为什么操作出现了问题？
  4. 把步骤1，2，3 总结好向老师提问。