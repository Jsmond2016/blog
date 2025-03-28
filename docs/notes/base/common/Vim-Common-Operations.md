
# Vim 常用操作

教程：

打开` terminal `，输入 `vimtutor` 按 `enter`

## 正式学习：

了解 Vim 的几种模式

- `insert` 模式
- 普通模式（normal）模式
- 冒号模式（命令模式）
- V 模式：编辑选区模式

### 第一步：进入和退出 `Vim`

- 进入 `vim` 
  - `vi` 或者 `vi fileName`
- 退出 `vim`
  - 按下`esc ` 进入正常模式，然后按下 `:` + `q!` + `enter` 表示强制退出
  - 按下`esc ` 进入正常模式，然后按下 `:` + `wq` + `enter` 表示保存后退出

### 第二步：移动光标

- 上 :`k` 表示上移，`nk` 表示上移 n 行
- 下 :`j` 表示下移，`nj` 表示下移 n 行
- 左 :`h` 表示左移， `nh` 表示左移 n 列
- 右 : `l` 表示右移，`nl` 表示右移 n 列

### 第三步：常用操作

记住以下单词：

- quit 放弃 

  按`:q!` 表示强制退出

- write / road  读 /写 

  按 `write` 保存文件

- yank  复制

  按下 `y` 表示复制

  在配置 `.vimrc` 以后

  按下 `空格 + y` 表示复制到系统剪贴板

- paste 粘贴

  - 首先到达你要复制的开头

  - 按 `v` 进入选区模式，移动光标到你要复制的结尾

  - 按 `y` 复制

    在配置 `.vimrc` 以后

    按下 `空格 + p` 表示从系统剪贴板粘贴到 vim 中

  - 到达你要粘贴的位置，按 `p` 在该光标前面开始粘贴，或按 `P`  在该光标后面的结尾开始粘贴

- delete 删除

  - 按 `x` 删除光标后一个字母
  - 按 `dd` 表示删除一行
  - 按 `nd` 表示删除 n 行
  - 按 `dw` 表示删除光标后面的一个单词（delete word）
  - 按 `dnw` 表示删除光标后的 n 个单词 
  - 按 `db` 表示删除光标前面的一个单词（delete backword）
  - 复杂用法：

  `eg:This is (a vim study test) ` 删除括号里面的内容怎么快速删掉？

  按 `di(` 表示 `delete in ()`

  `eg:This is (a vim study test) ` 删除括号以及里面的内容怎么快速删掉？

  按 `da(` 表示 `delete at ()`

  同理，其他的复杂操作也是这个原理

  eg1:

  ```
  function (){
      console.log(0)
  }
  ```

  删除花括号里面的内容： `di{`

  eg2:

  `<div>hello,world! </div>`

  删除标签里面的内容

  `dit` 表示 `delete in tag` 标签里面的东西

- change  改变

  - `cw` 表示`change word` ，修改光标后面的一个单词
  - `cw` 表示 `change backword` ，修改光标前的一个单词
  - `change` 的复杂操作

  和 `delete` 的操作一样，也支持复杂用法，比如你要修改一个标签的内容，正常的用法是要先删除然后在写入，使用 `cahnge` 的高级操作则不需要如此麻烦

  `eg：<div>abc</div>` 修改`div` 里面的内容为 `def`

  按 `cit` 表示 `change in tag` ，此时已经删除了标签里面东内容同事进入了编辑模式

- line 行

- find 查找

- word （一个）单词

- forward / backword  前面 / 后面

- up / down 向上  向下

  翻页：因为快捷键 `d` 被前面删除所占用了，因此需要添加 `ctr + d` 

  上一页（上翻）：`ctr + u `

  下一页（下翻）：`ctr + d`

- insert / append  （在前面）插入 /  （在后面）插入  

  按 `i` （在光标前面）插入 ； 按  `I` 在整行前面（行首）插入

  按 `a` （在光标后）插入  ；按 `A` 在整行后面（行尾）插入

   

- do / undo   撤销  

   按 `u` 撤销  ，按 `ctr + u` 把撤销的又重做一遍（回到撤销前的状态）

  - `u` 撤销一次
  - `nu` 撤销  n 次

### 高级操作

- 配置`.vimrc` 

`curl https://gist.githubusercontent.com/FrankFang/a6dc0886d6895c088225d7c61b954e69/raw/4855205d90fe739067a7ee4016f010ac1009d944/simple-vimrc > ~/.vimrc`

在`.vimrc` 中，复制粘贴有个需要注意到的地方，当在 vim 中复制一个内容，只能在 vim 中使用粘贴，而不能在其他地方使用；同理，在其他地方复制一个内容，也不能在 vim 中粘贴

因为使用 `y` 仅仅是复制内容在 vim 剪贴板中，而不是系统剪贴板中

同理，使用 `p` 仅仅是粘贴 vim 剪贴板中所有的内容，而不是系统剪贴板的内容

那么怎么复制和站忒系统剪贴板的内容在 vim 中呢？

在 `.vimrc` 中配置好了，使用 `空格 + y ` 表示复制 vim 中的内容到系统剪贴板中，其他地方可以直接粘贴；

使用 `空格 + p` 表示粘贴在其他地方的内容到 vim 中

- 配置插件

参考[junegunn/vim-plug](https://github.com/junegunn/vim-plug)

在 `.vimrc` 中找个空白的地方，输入两行：

第一行： `call plug#begin('~/.vim/plugged')`

第二行： `call plug#end()` 

即，需要安装的插件按照格式填写在里面即可

- 安装插件  `emmet` 

  找到 [vim-emmet](https://github.com/mattn/emmet-vim) ，填写内容为

  `Plug 'mattn/emmet-vim'`

  退出到编辑模式，输入 `:PlugInstall` 安装插件

- 配置 `emmet` 自定义快捷键 [vim-emmet](https://github.com/mattn/emmet-vim)

  ​



 

