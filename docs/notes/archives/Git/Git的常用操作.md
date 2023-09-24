---
title: Git的常用操作
date: 2017-10-11 23:59:54
tags: Git
categories: Git
thumbnail: https://i.loli.net/2017/10/12/59de40a010840.jpg

---

# Git的常用操作
![](https://tse2-mm.cn.bing.net/th?id=OIP.u0Pk-feV2uAMLCfcbXUVDwHaE8&p=0&o=5&pid=1.1)

### 第一步：配置Github

1.进入你的github页面 ，选择settings ，在gitbash上输入 ` SSH and GPG keys `， 填写 Title 和 key  (其中key将在下面的操作中得到)

2.打开 Git Bash ，然后 复制并运行 ` rm -rf ~/.ssh/* ` 目的是把现有的 ssh key 都删掉，切记：这句命令行如果你多打一个空格，可能就要重装系统了，建议复制运行!

4.运行 ` ssh-keygen -t rsa -b 4096 -C "你的邮箱"`，注意填写你的邮箱！

5.按回车三次

6.运行`cat ~/.ssh/id_rsa.pub `，得到一串东西，完整的复制这串东西

7.回到上面第 1 步的页面，在 Title 输入「我的第一个 key」

8.在 Key 里粘贴刚刚你你复制的那串东西

9.点击 Add SSH key

10.回到 Git Bash,运行`ssh -T git@github.com `，你可能会看到这样的提示：

![pic](https://i.loli.net/2017/10/11/59de32a03f19d.png)

**输入`yes`**

11.然后如果你看到 `Permission denied (publickey).`就说明你失败了，请回到第 1 步重来，是的，回到第 1 步重来；

- 如果你看到 `Hi Yourname! You've successfully authenticated, but GitHub does not provide shell access.` 就说明你成功了！

### 第二步：配置Git


`  1.git config --global user.name 你的英文名 `

` 2.git config --global user.email 你的邮箱 `

` 3.git config --global push.default matching `

` 4.git config --global core.quotepath false `

` 5.git config --global core.editor "vim" `

### 第三步：使用Git——Git的三种常用方式

1. 只是在本地使用
2. 将本地仓库上传到github上
3. 下载github上的仓库

#### 3.1只在本地使用
1. 简单理解为：创建目录，初始化，存放你的文件
2. `git add 文件路径` 添加到暂存区
3. `git commit 文件路径 -m "提交信息" ` 提交到仓库（本地仓库）
4. 其他命令 `git status -sb ` &nbsp; 查看当前状态
5. 其他命令 ` git log ` &nbsp;查看提交历史

#### 3.2将本地的仓库上传到github仓库
1. 在 github上建立一个新仓库，复制该仓库的SSH地址
2. ` git remote add origin SSH地址 `
3. ` git push -u origin master `
4. 刷新页面，即可看到你最新的提交信息。

#### 3.3下载Github仓库
1. 在github上copy你的仓库的SSH地址
2. 打开gitbash，进入你要存放仓库的文件夹，输入`git clone 你copy的SSH地址`
3. `ls -la`
4. 这时，你就有一个本地仓库了，又可以重复3.1的操作啦

### 第四步：上传更新
1. ` git add 文件路径 `
2. ` git commit 文件路径 -m "上传信息" `
3. ` git pull ` 将本地和github上的仓库信息同步
4. ` git push `

####  参考资料

- [Git](http://www.runoob.com/git/git-install-setup.html)
- [SSH的原理](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)

