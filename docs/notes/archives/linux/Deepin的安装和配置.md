---
title: Deepin/Linux的安装和基本配置
date: 2018-04-23
tags: Linux
---

# Deepin/Linux的安装和基本配置

![](https://i.loli.net/2018/03/12/5aa6869c9bd66.png)

![](https://i.loli.net/2018/03/12/5aa6869cbbd89.png)

![](https://i.loli.net/2018/03/12/5aa6869cdbabf.png)

## [系统的基本配置](https://www.thefanclub.co.za/how-to/ubuntu-after-install)

## [系统的基本配置2](https://www.zhihu.com/search?type=content&q=Ubuntu)

## [Linux命令学习](http://jsmond.info/2017/10/01/%E5%B8%B8%E7%94%A8Linux%E5%91%BD%E4%BB%A4%E8%A1%8C/)

## [Linux命令学习－程序媛版本](https://zhuanlan.zhihu.com/p/32579020)

## 常用软件的安装

如何分区

[Linux分区](https://blog.csdn.net/qq_28867949/article/details/78314748)

### 常用安装命令

`sudo apt-get update    # 更新一下软件源，获取最新软件的列表`

`sudo apt-get install 软件名    # 安装软件`

对于　.Deb　类型的安装文件

`sudo dpkg -i *.deb    # 注意“*.deb”的意思是你的deb包的全称，请用软件包的名字替换掉星号`

  或者，cd 到安装包目录

`sudo apt install ./xxxx.deb `



### 系统软件

#### 1.爱壁纸

#### 2.网易云

#### 3.印象笔记　NixNote2

#### 4.微信

#### 5.QQ

#### 6.迅雷

#### ７.百度云

#### 8.ShadowSocks

#### 9.Chrome浏览器

### 10.搜狗输入法





###　工具软件

#### 1.OBS

`sudo add-apt-repository ppa:obsproject/obs-studio`

`  sudo apt-get update && sudo apt-get install obs-studio`

[教程1](https://github.com/obsproject/obs-studio/wiki/Install-Instructions#ubuntu-installation) [教程2](https://www.linuxhelp.com/how-to-install-obs-on-ubuntu-16-04/) [Ubuntu安装OBS](http://blog.csdn.net/kingroc/article/details/50829213)

#### 2.截图工具和配置对应的快捷键 `shutter` 、深度截图

`sudo add-apt-repository ppa:shutter/ppa`

`sudo apt-get update`

`sudo apt-get install shutter`

[安装shutter 并配置快捷键](https://www.jianshu.com/p/8f0aab6d8144)

#### 3.Docky

`sudo add-apt-repository ppa:ricotz/docky`

`sudo apt-get update`

`sudo apt-get install docky`

卸载

`sudo apt-get remove docky`

#### 4.WPS

[wps-download](http://community.wps.cn/download/)

字体缺失问题: [wps解决字体问题](https://www.jianshu.com/p/e86ed6013ecd)

#### 5.有道词典-bash 

安装：
` sudo npm -g install yddict`
使用：
`$ yd <word or sentence>`

#### 6.图片处理　GIMP

`sudo add-apt-repository -y ppa:otto-kesselgulasch/gimp`
`sudo apt-get update`
`sudo apt-get install gimp`

#### 7.视频播放  MPV,VLC

vlc:
`sudo apt-get update`
`sudo apt-get install vlc browser-plugin-vlc`

mpv:
`sudo apt install mpv`

#### 8.Albert 快捷搜索

`sudo apt-get install albert`

[Albert官网](https://albertlauncher.github.io/docs/installing/)

#### 9.磁盘管理工具(图形化界面)

[博客推荐](https://blog.csdn.net/china_zhli/article/details/5472411)

快捷查看磁盘情况: 

博客: [df、du、fdisk：Linux磁盘管理三板斧的使用心得](http://os.51cto.com/art/201012/240726_all.htm)

命令：`df`

图形化管理界面

安装 : `sudo apt-get install gparted`

打开: `sudo gparted`

#### 10.gif 录制

`sudo add-apt-repository ppa:peek-developers/stable`

`sudo apt-get update`

`sudo apt-get install peek`

 参考教程: 

- [在Linux(Ubuntu)下超好用的录屏gif软件!!安装教程](https://www.jishux.com/plus/view-663051-1.html)
- [linux gif 录制 视频 录制](https://www.jianshu.com/p/0b3f4c65a7cd)

#### 11.Ubuntu上如何分屏操作

- 分屏

  1. 插入 V 接线链接到第二个显示器

  2. 设置`display` ，`settings >> displays >> 如下图设置`

     ![](https://i.loli.net/2018/04/19/5ad8564f22e86.png)

     ​

  3. 此时，往右移动鼠标即可移动到拓展的显示器上

- 不同显示器显示不同的工作任务

  - 进入目录 `settings >> appearance >> behavior >> 选择 【enable workspaces】`

    ![](https://i.loli.net/2018/04/19/5ad8572a9841a.png)

  - 设置完成以后，桌面左侧【菜单栏】会有一个十字的标志，点击可以看到当前的工作区，分为笔记本桌面和拓展显示器桌面，然后打开你的应用，移动到不同的工作区【拓展显示器】即可

    ![](https://i.loli.net/2018/04/19/5ad8588526ded.png)

    ​



### 开发软件

#### 1.Sublime-Text3

#### 2.VS-Code

#### 3.WebStorm

#### 4.pic　取色工具

#### 5.bash　配置git ,Node,http-server

#### 6.typora

```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE
```
`sudo add-apt-repository 'deb http://typora.io linux/'`

`sudo apt-get update`

`sudo apt-get install typora`

#### 7.Ubuntu启动项，背景图设置

[Ubuntu启动项，背景图设置](https://www.sysgeek.cn/ubuntu-16-04-grub-2-boot-loader/)

[Typora 官网](https://www.typora.io/#linux)

## 常用的命令

## 主题配置和美化

[Ubuntu 16.04下安装MacBuntu 16.04 TP 变身Mac OS X主题风格](https://www.linuxidc.com/Linux/2016-06/131947.htm)

[Ubuntu16.04系统美化](http://blog.csdn.net/teavamc/article/details/78283448)

[Ubuntu 16.04下的美化配置过程](http://blog.csdn.net/wangweiqiang1325/article/details/53447123)

[Ubuntu 16.04的一些配置](http://blog.csdn.net/baidu_31611967/article/details/77919073)











推荐阅读：

[Linux平台常用软件总结（Ubuntu版）](https://www.jianshu.com/p/4adbfd83b29f)

