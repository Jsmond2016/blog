---
title: Ubuntu 系统配置
date: 2018-04-23
tags: Linux
---

# Ubuntu 系统配置

## 系统分区

前提： 100G 以上硬盘方案

- `/swap`  8G 

  要求：大于等于物理内存即可)

- `/boot` 500M 

  要求：大于200M 即可

-  `/home` 60G  或以上

  要求： 存放数据文件，要求尽可能大

- `/` 30G 或以上

  要求：存放系统文件，类似于win的C盘，

- 其他分区

  可不设置，具体请细节 `谷歌搜索 【Ubuntu分区】`

## 基本设置

> 推荐文章 [Ubuntu 16.04下的美化配置过程](http://blog.csdn.net/wangweiqiang1325/article/details/53447123)

### 1.换源和更新

- 在设置--软件和更新里--下载自--其他站点--中国--`http://mirrors.aliyun.com/ubuntu`

```sh
sudo apt-get update
sudo apt-get upgrade 
```


参考资料： 

- 源网站1  [清华大学开源软镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)
- 源网站2 [ubuntu 16.04 镜像源设置](https://blog.csdn.net/z346859/article/details/79008256)
- 源网站3 [ubuntu17.04 linux换源](http://blog.sina.com.cn/s/blog_b953bc190102x8h3.html)
- [更新设置](https://www.linuxidc.com/Linux/2017-11/148627.htm)

### 2.系统美化（主题，壁纸，bash界面）

- Ubuntu启动项，背景图设置

[Ubuntu启动项，背景图设置](https://www.sysgeek.cn/ubuntu-16-04-grub-2-boot-loader/)

参考资料： 

- [Ubuntu 16.04下安装MacBuntu 16.04 TP 变身Mac OS X主题风格](https://www.linuxidc.com/Linux/2016-06/131947.htm)
- [Ubuntu16.04系统美化](http://blog.csdn.net/teavamc/article/details/78283448)
- [Ubuntu 16.04下的美化配置过程](http://blog.csdn.net/wangweiqiang1325/article/details/53447123)
- [Ubuntu 16.04的一些配置](http://blog.csdn.net/baidu_31611967/article/details/77919073)

## 软件安装 

> 搜狗输入法 [安装搜狗输入法 for linux](https://blog.csdn.net/weixin_38506983/article/details/71190705)

### 工具软件

1.OBS

```sh
sudo add-apt-repository ppa:obsproject/obs-studio
sudo apt-get update && sudo apt-get install obs-studio
```

参考资料：

- [教程1](https://github.com/obsproject/obs-studio/wiki/Install-Instructions#ubuntu-installation) 
- [教程2](https://www.linuxhelp.com/how-to-install-obs-on-ubuntu-16-04/) 
- [Ubuntu安装OBS](http://blog.csdn.net/kingroc/article/details/50829213)

2.截图工具和配置对应的快捷键 `shutter` 、深度截图

```sh
sudo add-apt-repository ppa:shutter/ppa

sudo apt-get update

sudo apt-get install shutter
```


参考资料：

- [安装shutter 并配置快捷键](https://www.jianshu.com/p/8f0aab6d8144)

3.Docky

```sh
sudo add-apt-repository ppa:ricotz/docky

sudo apt-get update

sudo apt-get install docky
```

卸载

```sh
sudo apt-get remove docky
```

4.WPS

- [wps-download](http://community.wps.cn/download/)

- 字体缺失问题: [wps解决字体问题](https://www.jianshu.com/p/e86ed6013ecd)

5.有道词典-bash 

```sh
# 安装：
sudo npm -g install yddict

# 使用：
yd <word or sentence>
```
6.图片处理　GIMP

```sh
sudo add-apt-repository -y ppa:otto-kesselgulasch/gimp

sudo apt-get update

sudo apt-get install gimp
```

7.视频播放  MPV,VLC

vlc:

```sh
sudo apt-get update
sudo apt-get install vlc browser-plugin-vlc

```

mpv:


```sh
sudo apt install mpv
```

8.Albert 快捷搜索

```sh
sudo apt-get install albert
```

- [Albert官网](https://albertlauncher.github.io/docs/installing/)

9.磁盘管理工具(图形化界面)

- [博客推荐](https://blog.csdn.net/china_zhli/article/details/5472411)

快捷查看磁盘情况: 

- 参考博客: [df、du、fdisk：Linux磁盘管理三板斧的使用心得](http://os.51cto.com/art/201012/240726_all.htm)

命令：`df`

图形化管理界面

```sh
# 安装
sudo apt-get install gparted

# 打开
sudo gparted
```

10.gif 录制

```sh
sudo add-apt-repository ppa:peek-developers/stable
sudo apt-get update
sudo apt-get install peek
```

 参考教程: 

- [在Linux(Ubuntu)下超好用的录屏gif软件!!安装教程](https://www.jishux.com/plus/view-663051-1.html)
- [linux gif 录制 视频 录制](https://www.jianshu.com/p/0b3f4c65a7cd)

11.Ubuntu上如何分屏操作

- 分屏

1. 插入 V 接线链接到第二个显示器

2. 设置`display` ，`settings >> displays >> 如下图设置`

![](https://i.loli.net/2018/04/19/5ad8564f22e86.png)

- 此时，往右移动鼠标即可移动到拓展的显示器上

- 不同显示器显示不同的工作任务

- 进入目录 `settings >> appearance >> behavior >> 选择 【enable workspaces】`

![](https://i.loli.net/2018/04/19/5ad8572a9841a.png)

- 设置完成以后，桌面左侧【菜单栏】会有一个十字的标志，点击可以看到当前的工作区，分为笔记本桌面和拓展显示器桌面，然后打开你的应用，移动到不同的工作区【拓展显示器】即可

![](https://i.loli.net/2018/04/19/5ad8588526ded.png)


### 开发软件

- Sublime-Text3
- VS-Code
- WebStorm
- pic　取色工具
- bash　配置git ,Node,http-server
- typora

```sh
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE
sudo add-apt-repository 'deb http://typora.io linux/'

sudo apt-get update

sudo apt-get install typora
```

参考：[Typora 官网](https://www.typora.io/#linux)

4.快捷键配置（bash，vim，shutter，albert，Pick等）

常用命令：

```sh
# 查看进程（查看后台程序）
ps -A 

# 关闭进程
kill -9 number 

```