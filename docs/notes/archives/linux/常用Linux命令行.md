---
title: 常用Linux命令行
date: 2017-10-01 09:49:12
tags: Linux
categories: Linux
thumbnail: https://i.loli.net/2017/10/07/59d85b2f1870d.jpg  
  
---

## 1.进入目录

```sh
cd  +空格+文件名

# 例子
cd c/user/file # 表示进入file文件夹
```

## 2.显示当前目录

```sh
pwd

# 例子
$ pwd

c/user/file/  # 表示显示file的路径
```

## 3.创建新文件夹  

```sh
mkdir  + 空格 + 文件名

# 例子

mkdir files # 表示在当前路径下创建文件夹 files


mkdir -p + 空格 + 目录路径

# 例子
mkdir -p file/file2/file3 # 表示创建的file3在file/file2 的路径下
```


## 4.查看路径

```sh
ls # 显示文件或目录

# ~file>file2>file3 
ls # 表示显示file3文件或目录

# 列出当前目录下所有文件及目录，包括隐藏的a(all)
ls -al

```


## 5.创建文件-1

```sh
# 往文件内写入内容
echo 内容 > 文件名

# 例子
echo file > 1.txt #  表示在1.txt 文件中写入内容为 “file”

# 覆盖写入 >!，注意：此命令在windows环境下不支持
echo file2 >！1.txt # 表示对 1.txt 已存在内容覆盖为“file2”，原本内容“file”丢失


# 追加写入 >>
echo file2>>1.txt # 此时文件1.txt内容为file和file2

```

## 5.创建文件-2

```sh

# touch  创建名字为“文件名”文件
touch +空格+文件名

# 例子 创建名字为“file”的 文本文件
touch file.txt

# 改变文件“文件名”的更新时间
touch + 空格 + 文件名

# 例子 更改文件“file.txt”的更新时间
touch file.txt  
```



## 7.复制文件

```sh
# 表示复制某个文件到新的文件夹下（个人理解为单个复制某个文件）
cp +空格+原路径+空格+目标路径

# 例子 将 1.txt 文件复制到 c/file2 文件夹内
cp c/file/1.txt  c/file2

# 复制文件夹
cp -r +空格+原路径+目标路径

# 例子 将整个A文件夹复制到B文件夹内
cp -r A B
```


## 8.移动文件(剪切)

```sh
mv +空格+原路径+目标路径

# 例子 将整个A文件夹剪切到B文件夹内。
mv A B
```


## 9. 删除文件

```sh
# 删除某路径下的文件
rm +空格+文件路径
# 例子 删除c/user/A文件
rm c/user/A 


# 强制删除
rm -f +空格+文件路径
# 例子 强制删除
rm -f c/user/B

# 删除目录
rm -r +空格+文件路径
# 例子 删除目录
rm -r c/user/A

# 强制删除某个目录
rm -rf +目标路径
# 例子 强制删除c/user/AA这个目录
rm -rf c/user/AA
```

**切记：永远不要运行** `rm -rf /`



## 10.常用小技巧

```sh

# 回到刚才的目录
cd - 

# 使用上一次命令
!!

# 使用上一次的最后一个参数
Alt+.


# 一句话执行两个命令（不论xxx命令是否执行，yyy命令都会执行）
xxx;yyy

# 一句话执行两个命令（只有xxx命令可执行，yyy命令才能够执行）
xxx&&yyy
```



## 11.如何在命令里面打回车？

```sh
\\ + Enter
```

## 12.如何自学命令行

- 方法1：

```sh
man ls

ls -help

ls -h
```

- 方法2：ExplainShell.com

