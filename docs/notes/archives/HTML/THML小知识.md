---
title: THML小知识
date: 2017-11-13 17:19:29
tags: HTML
categories: HTML
---

## 1.  HTML，XML,XHTML,之间的区别？
  答：
  （1）HTML:超文本标记语言，是语法较为宽松的，不严格的web语言
  （2）XML:可拓展标记语言，主要用于存储数据和结构
  （3）XHTML:可拓展超文本标记语言，基于XML,其作用与HTML相似，但语法更为严格。

## 2. 怎样理解HTML语义化？
  参考- [维基百科](https://zh.wikipedia.org/wiki/%E8%AF%AD%E4%B9%89%E7%BD%91)

> 通过下列方法可以提升[万维网](https://zh.wikipedia.org/wiki/%E5%85%A8%E7%90%83%E8%B3%87%E8%A8%8A%E7%B6%B2)以及其互连的资源的易用性（usability）和实用性（usefulness）：
>
> - "标记"了语义信息的文档。这可以是机器可以理解的关于文档内容（例如文档的作者,标题,简介等)的描述,或者是描述该网站所拥有的服务和资源.(注意:任何东西都是能被URI-统一资源定位符-所描述的,因此语义网能理解人物、地方、想法、类别等等)
> - 通用元数据词汇表([本体论](https://zh.wikipedia.org/wiki/%E6%9C%AC%E4%BD%93%E8%AE%BA_(%E8%AE%A1%E7%AE%97%E6%9C%BA)))及词汇间的影射使得文档作者知道如何来标记文档方可让机器识别他想提供的元数据.
> - 利用元数据为语义网用户执行任务的自动软件代理(agent).
> - 为自动软件代理提供特定信息的网络服务 (例如,可信度服务可以让软件代理查询某个在线商店是否曾经有过不良纪录或者发送过垃圾邮件).

我的理解：

（1）HTML语义化是一种编写HTML的方式，选择合适的标签，使用合理的代码结构便于开发者阅读，同时让浏览器的爬虫和机器可以很好的解析。

（2）具体来说，就是在书写HTML时，尽可能使用具有语义信息的标签，例如`header`, `footer` ，`nav`,`aside`,`section`等代替那些没有语义信息的标签，例如`big`,`center`,`strike`,`font`等



## 3. 怎样理解内容与样式、行为分离的原则？
  答：一个网页的内容主要由3部分组成，分别为HTML,CSS,JavaScript三部分组成。
  要求：
  （1）在写HTML的时候，先不管样式和效果如何，重点放在HTML的结构和语义化上，让HTML能够体现页面的结构和内容。通俗的理解为给页面“搭好骨架”，做出结构原型。
  （2）在之前HTML的基础上写CSS，不允许出现属性样式，尽可能不出现行内样式。
  （3）写JS的时候尽量不要用JS去直接操作样式，而是通过给元素添加或删除class来控制样式的变化。

参考：

[内容样式分离-简书](http://www.jianshu.com/p/55a7e598957f)



## 4. 有哪些常见的meta标签？
  答：HTML` <meta> `元素表示那些不能由其它HTML元相关元素 (`<base>`, `<link>`, `<script>`, `<style>` 或` <title>`) 之一表示的任何元数据信息.
  （1）页面关键词
  `<meta name="keywords" content="your tags" />`
  （2）页面描述
  `<meta http-equiv="description" content="网页描述">`
  （3）内核区分
  `<meta name="renderer" content="webkit|ie-comp|ie-stand">`
  （4）自动刷新
  `<meta http-equiv="Refresh" content="20;url=http://www.baidu.com">`
  （5）禁止缓存
  `<meta http-equiv="pragram" content="no-cache"> `
  （6）清除缓存
  `<meta http-equiv="cache-control" content="no-cache, must-revalidate"> `
  （7）手机端
  `<meta name="format-detection" content="telphone=no, email=no"/>`
  （8）初始化设备
  `<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />`

拓展链接：
[meta标签拓展1](https://segmentfault.com/a/1190000002407912)
[meta标签拓展2](https://zhuanlan.zhihu.com/p/24025945)
[meta标签拓展3](http://www.cnblogs.com/iloveyou-sky/p/5878091.html)


## 5.  文档声明的作用?严格模式和混杂模式指什么? <!doctype html> 的作用?
  答：
  （1）文档声明是告知浏览器当前的 HTML (或 XML) 文档是哪一个版本. Doctype 是一条声明, 而不是一个标签; 也可以把它叫做 "文档类型声明", 或 简称为 "DTD".
  （2）严格模式和混杂模式
>区别：严格模式是浏览器根据规范去显示页面；混杂模式是以一种向后兼容的方式去显示。
>意义：决定浏览器如何渲染网站（浏览器使用那种规范去解析网页）。
>触发：浏览器根据doctype是否存在和使用的是那种dtd来决定。
>参考文章[严格模式和混杂模式](http://www.cnblogs.com/maomaoroc/p/3517823.html)

（3）[<!Doctype html> ](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/Introduction_to_HTML5)是HTML5的doctype声明文件包含HTML5标记，这样声明会让目前还不支持的HTML5的浏览器采用标准模式解析，这意味着他们会解析那些HTML5中兼容的旧的HTML的标签的部分，而忽略他们不支持HTML5的新特性。

## 6. 浏览器乱码的原因是什么？如何解决？   
  答：乱码产生的根本原因—你保存的编码格式和浏览器解析时的解码格式不匹配导致的。 
> **解释**：简而言之，好比我们存储一个HTML文件的时候，保存格式为UTF-8，但是没有进行声明以什么方式进行解码，浏览器会用它默认的方式进行解码，当浏览器使用了和之前不一致解码方式，那么就会导致乱码。
> **解决办法**：
> 1.在HTML文件中声明 `<meta charset="UTF-8">`
> 2.在浏览器中设置解码方式和你所编写的HTML文件的编码方式一致。
> 知识点参考：
> [1.浏览器乱码](http://ruoyu.jirengu.com/post/%E5%85%B3%E4%BA%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B9%B1%E7%A0%81)
> [2.浏览器编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)
> [3.乱码](https://zh.wikipedia.org/wiki/%E4%BA%82%E7%A2%BC)



## 7. 常见的浏览器有哪些，什么内核
  答：

（1）[Gecko内核](https://zh.wikipedia.org/wiki/Gecko)：是Mozilla开放源代码项目的网页浏览器引擎，被各种来自基于Mozilla代码的派生产品所使用，包括Firefox网页浏览器、Thunderbird电子邮件客户端以及SeaMonkey网络包。

（2）[Trident内核](https://zh.wikipedia.org/wiki/Trident_(%E6%8E%92%E7%89%88%E5%BC%95%E6%93%8E))：Internet Explorer的网页浏览器引擎，使用于Microsoft Windows平台的许多应用程序，如netSmart、Outlook Express、Microsoft Outlook的一些版本和Winamp、RealPlayer中的迷你浏览器。

（3）[Presto内核](https://zh.wikipedia.org/wiki/Presto)：Opera软件公司的专有引擎Presto已经授权给许多软件供应商，以及Opera自家的网页浏览器所使用，直到2013年它被Blink引擎替换。

（4）[WebKit内核](https://zh.wikipedia.org/wiki/WebKit)：是一种用来让网页浏览器绘制网页的排版引擎。它被用于Apple Safari。其分支被用于基于Chromium的网页浏览器，如：Opera与Google Chrome。

|         内核         |                    应用                    |
| :----------------: | :--------------------------------------: |
|     Trident内核      |    IE,MaxThon,TT,The World,360,搜狗浏览器等    |
|      Gecko内核       | Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等 |
|      Presto内核      |                Opera7及以上                 |
|      Webkit内核      |              Safari,Chrome等              |
| 双内核：Trident和WebKit |                  搜狗2.0                   |
| 双内核：Trident和WebKit |                傲游3.0Beta                 |
| 双内核：Trident和WebKit |                  QQ浏览器5                  |



参考:
[1.常见的浏览器内核](http://www.cnblogs.com/happyPawpaw/archive/2012/05/18/2507441.html)
[2.常见的浏览器内核](http://www.cnblogs.com/vajoy/p/3735553.html)

## 8.  列出常见的标签，并简单介绍这些标签用在什么场景？

|       标签       |                    用途                    |
| :------------: | :--------------------------------------: |
|     h1-h6      |                    标题                    |
|       p        |                    段落                    |
|       hr       |                    横线                    |
|       a        |                    链接                    |
|       br       |                    换行                    |
|       em       |                    强调                    |
|     strong     |                 更为强烈的强调                  |
|      span      |          没有具体的语义，是为了单独设置属性而使用的           |
|      div       |                  分割（区域）                  |
|       ul       |                   无序列表                   |
|       ol       |                   有序列表                   |
|      form      |                    表单                    |
|     input      |           输入框（根据type类型不同意义不同）            |
|    textarea    |                  文本输入域                   |
| radio/checkbox |                  单选/复选框                  |
|     option     |                   下拉列表                   |
|     label      |                    标签                    |
|     reset      |                    重置                    |
|     table      |                    表格                    |
|     tbody      | 当表格内容非常多时，表格会下载一点显示一点，但如果加上tbody标签后，这个表格就要等表格内容全部下载完才会显示。 |
|       th       |                    表头                    |
|       tr       |                    行                     |
|       td       |                   单元格                    |
|    caption     |                    标题                    |

参考：
[HTML常用标签](http://blog.csdn.net/fang323619/article/details/51905954)
[菜鸟教程](http://www.runoob.com/html/html-elements.html)




















