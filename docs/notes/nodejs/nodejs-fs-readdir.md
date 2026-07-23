# nodejs如何读取文件夹目录的内容

> https://zhuanlan.zhihu.com/p/112452725

好程序员前端教程-nodejs如何读取文件夹目录的内容？

首先，nodejs中文件，目录的操作，我们对fs文件系统分为两类操作，第一类是xxx方法，第二类是xxxSync方法。所有的fs操作几乎都是这两类，第一类是异步回调，第二类是同步等待。

## 一、对于文件的读写操作

1.完整性读写

a.fs.readFile(filename,[options],callback)//可以用来完整读取一个整的文件。

b.fs.writeFile(filename,data,[options],callback)//写入文件的数据

c.fs.appendFile(filename,data,[options],callback)//写入文件数据

2.指定位置读写

首先打开文件，然后操作文件，最后关闭文件。

a.fs.open(filename,flags,[mode],callback) callback(err,fd)//打开文件

b.fs.read(fd,buffer,offset,length,position,callback)//读取文件

c.fs.write(fd,buffer,offset,length,position,callback)//写入文件

d.fs.fsync(fd,callback) //当上面read，write异步操作完全结束以后会调用这个函数，最后执行close操作。

e.fs.close(fd)//关闭文件
 
## 二、创建和读取目录

1.fs.mkdir(path,callback);//创建目录

2.fs.readdir(path,callback);//读取目录，其中callback中files是当前目录所有文件

3.fs.stat(path,callback);//查看目录和文件的信息

4.fs.lstat(path,callback);//查看目录和文件以及软链信息，只要要看软链，必须要看这个的。

5.fs.exists(path,callback);//检查是否存在这个目录，或者文件。

## 三、对目录的其他操作

1.fs.realpath(path,[cache],cakkback);//获取当前目录或者文件的绝对路径

2.fs.utimes(path,atime,utime,callback);//修改文件访问和修改时间

3. fs.chmod(path,mode,callback);//修改文件的权限

4.fs.rename(oldPath,newPath,callback);//修改并且移动文件,从oldPath->newPath

5.fs.link(srcpath,dstpath,callback);//创建硬链接（只能在本券中）fs.unlink()删除硬链接

6.fs.symlink(srcpath,stpaht,callback);//创建软链接（任何券中）fs.readlink(path,callback)读取软链接所有的
信息.

7.fs.truncate(filename,len,callback)；//截断文件，将文件部分留下，剩下留下

8. fs.rmdir(path,callback)；//删除目录
