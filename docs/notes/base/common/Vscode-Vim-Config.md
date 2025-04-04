# vscode-vim 配置

## 文档速查

- [命令速查-官方文档](https://github.com/VSCodeVim/Vim/blob/15dbe0b415f269a5be14dc74651a69b9334fba14/ROADMAP.ZH.md)
- [vscodevim/vim](https://github.com/vscodevim/vim)
- [10 VS Code Vim Tricks to Boost Your Productivity ⚡ - DEV Community](https://dev.to/ansonh/10-vs-code-vim-tricks-to-boost-your-productivity-1b0n) 拓展文档


## 常用命令

![vscode-4](https://github.com/Jsmond2016/picx-images-hosting/raw/master/vscode-4.7axcd7vq9g.webp)


## settings.json 配置

配置文件说明：

- 启用 `easymotion` 插件
- 设置 `leader` 键为 `space`
- 启用 `incsearch` 插件
- 启用 `useSystemClipboard` 插件
- 启用 `useCtrlKeys` 插件
- 启用 `hlsearch` 插件
- 启用 `foldfix` 插件
- 启用 `smartRelativeLine` 插件
- 启用 `affinity` 插件
- 快捷键映射：常用的就是不同模式下的 **上下左右 快速移动**
  -  `H` 键映射为 `^`
  -  `L` 键映射为 `g_`
  -  `J` 键映射为 `5j`
  -  `K` 键映射为 `5k`
  -  `E` 键映射为 `gT`
  -  `R` 键映射为 `gt`
  -  `Ctrl + n` 键映射为 `:nohl`
  -  `Leader + d + f` 键映射为 `V`, `$`, `%`, `d`
  -  `insertModeKeyBindings` 配置：
    -  `jk` 键映射为 `<Esc>`
    -  `kj` 键映射为 `<Esc>`
  -  `normalModeKeyBindings` 配置：
    -  `H` 键映射为 `^`
    -  `L` 键映射为 `g_`
    -  `J` 键映射为 `5j`
    -  `K` 键映射为 `5k`
    -  `E` 键映射为 `gT`
    -  `R` 键映射为 `gt`
    -  `Ctrl + n` 键映射为 `:nohl`
    -  `Leader + d + f` 键映射为 `V`, `$`, `%`, `d`
  -  `visualModeKeyBindings` 配置：
    -  `J` 键映射为 `5j`
    -  `K` 键映射为 `5k`
    -  `jk` 键映射为 `<Esc>`
    -  `kj` 键映射为 `<Esc>`
    -  `Ctrl + c` 键映射为 `y`
    -  `Ctrl + c` 键映射为 `y`



```json
"vim.easymotion": true,
"vim.incsearch": true,
"vim.useSystemClipboard": true,
"vim.useCtrlKeys": true,
"vim.hlsearch": true,
"vim.leader": "<space>",
"vim.foldfix": true,
"vim.smartRelativeLine": true,
"extensions.experimental.affinity": {
  "vscodevim.vim": 1
},
"vim.insertModeKeyBindings": [
  {
    "before": [
      "j",
      "k"
    ],
    "after": [
      "<Esc>"
    ],
  },
  {
    "before": [
      "k",
      "j"
    ],
    "after": [
      "<Esc>"
    ],
  }
    ],
    "vim.normalModeKeyBindings": [
      {
        "before": [
          "H"
        ],
        "after": [
          "^"
        ]
      },
      {
        "before": [
          "L"
        ],
        "after": [
          "g",
          "_"
        ]
      },
      {
        "before": [
          "J"
        ],
        "after": [
          "5",
          "j"
        ]
      },
      {
        "before": [
          "K"
        ],
        "after": [
          "5",
          "k"
        ]
      },
      {
        "before": [
          "E"
        ],
        "after": [
          "g",
          "T"
        ]
      },
      {
        "before": [
          "R"
        ],
        "after": [
          "g",
          "t"
        ]
      },
      {
        "before": [
          "<C-n>"
        ],
        "commands": [
          ":nohl"
        ]
      },
      {
        "before": [
          "<Leader>",
          "d",
          "f"
        ],
        "after": [
          "V",
          "$",
          "%",
          "d"
        ]
      }
    ],
    "vim.visualModeKeyBindings": [
      {
        "before": [
          "J"
        ],
        "after": [
          "5",
          "j"
        ]
      },
      {
        "before": [
          "K"
        ],
        "after": [
          "5",
          "k"
        ]
      },
      {
        "before": [
          "j",
          "k"
        ],
        "after": [
          "<Esc>"
        ],
      },
      {
        "before": [
          "k",
          "j"
        ],
        "after": [
          "<Esc>"
        ],
      },
      {
        "before": [
          "<Ctrl>",
          "c"
        ],
        "after": [
          "y"
      ],
     }
    ],
    "vim.normalModeKeyBindingsNonRecursive": [
      {
        "before": [
          "<leader>",
          "d"
        ],
        "after": [
          "d",
          "d"
        ]
      },
      {
        "before": [
          "<C-n>"
        ],
        "commands": [
          ":nohl"
        ]
      }
    ],
    "vim.handleKeys": {
      "<C-a>": false,
      "<C-f>": false
    },

```


## easymotion 模式

文档参考：https://github.com/vscodevim/vim?tab=readme-ov-file#vim-easymotion


使用方式：使用 `<leader>`，例如，`<leader>` 是 空格；
- `<leader><leader> s <char>` 等于 连按 2 次空格，进入 easymotion 模式；
- 再按字母 s 进入搜索模式，例如如 输入需要搜索的字母 m；
- 屏幕变暗色，会出现所有字母 m 的索引；
- 按下对应红色的字母 索引，即可完成跳转；

如图：

![image](https://github.com/Jsmond2016/picx-images-hosting/raw/master/image.1sf7x1ugrm.webp)

**推荐命令:**

- `<leader><leader> / n-char <CR>` 搜索任意 变量名，按回车 进入索引模式，输入索引跳转；
- `<leader><leader><leader>` j 任意位置跳转；

::: danger 问题
进入索引模式后如何滚动屏幕？当前只能通过 鼠标操作；
:::



## vim-surround 模式

文档：https://github.com/vscodevim/vim?tab=readme-ov-file#vim-surround



使用方式，参考下面的例子:

- "test" with cursor inside quotes type **cs"' to end up with 'test'**
- "test" with cursor inside quotes type **ds" to end up with test**
- "test" with cursor inside quotes type **cs"t and enter 123> to end up with `<123>test</123>`**  推荐使用!!!!；在使用 react 开发写 `html` 相关组件的时候很适用；

**推荐命令**
- `cs motion t` 用于快速修改 所在内容的 wrapper tag；
- 对于使用 `[] / "" / '' / {}` 之类的字符包裹的内容，可以快速替换 包裹符号；



## 快速注释代码-vim-commentary

- `gc` - toggles line comment. For example `gcc` to toggle line comment for current line and   `gc2j` to toggle line comments for the current line and the next two lines.
- `gC` - toggles block comment. For example `gCi)` to comment out everything within parentheses.

解释：

- 单行注释：`gcc` 或者 `gc + 回车`
- 多行（块内）注释：注意字母 c 的大小写区别；效果不同；
  - `gci{` 双斜杠注释  实际没什么作用，使用 visual 模式选中多行，按下 `Ctrl + /` 也可以 
  - `gCi{` JsDoc 注释
  - 说明：`i` 可以换成 `a` ,代表选择范围，如 `ci{` , `ca{`

![vscode-1](https://github.com/Jsmond2016/picx-images-hosting/raw/master/vscode-1.wiqhm79tt.webp)

![vscode-2](https://github.com/Jsmond2016/picx-images-hosting/raw/master/vscode-2.67xn2btchs.webp)




## replaceAll 替换

参考文档：https://www.baeldung.com/linux/vim-search-replace

- 单行替换

```sh
:s/article/tutorial/g
```


- 同一文件全部替换

```sh
:%s/article/tutorial/g
```


- 大小写敏感

```sh
:%s/vim/baeldung/gi
```


- 二次确认

```sh
:%s/article/tutorial/gc
```

![vscode-3](https://github.com/Jsmond2016/picx-images-hosting/raw/master/vscode-3.8s3heyy6qp.webp)


## 快捷键 Ctrl 修改

为什么需要修改？ 因为无法使用 `ctrl + c` 复制内容；

- windows: 参考文章 [vscode的vim插件不能使用ctrl-c问题](https://blog.csdn.net/Qiana_/article/details/114106477)

去掉图中 `Vim: Use Ctrl Keys` 前面的 `√` 即可；

![vscode-5](https://github.com/Jsmond2016/picx-images-hosting/raw/master/vscode-5.5fkrklq6mh.webp)

## toggle-sidebar 切换侧边栏

参考文章：https://www.reddit.com/r/vscode/comments/snn39h/help_keybinding_for_toggling_file_explorer/

- toggle-sidebar 切换左侧边栏： 使用 vim 模式开发，为方便快捷不使用鼠标，使用快捷键操作 侧边栏的打开和关闭；
  - 在 windows 中，切换左侧菜单时按下空格选中文件，按下回车即进入右侧编辑文件；
  - 在 mac 中，切换左侧菜单时按下空格选中文件，按下 l / L即 vim 模式的 右 健 即可进入 文件编辑；



vscode 中 设置方式： `ctrl + shift + p` 选择 `Open Keyboard ShortCuts`，输入如下配置：

```json
{
  "key": "alt+;",
  "command": "workbench.action.closeSidebar",
  "when": "explorerViewletVisible"
},
{
  "key": "alt+;",
  "command": "workbench.view.explorer",
  "when": "!explorerViewletVisible"
},

// vim <leader> 快捷方式，切换菜单聚焦时，按下如下字母快速操作；
// 参考： https://dev.to/ansonh/10-vs-code-vim-tricks-to-boost-your-productivity-1b0n， 搜索 '#7 - File Explorer Keybindings'
// {
//   "key": "space e",
//   "command": "workbench.action.toggleSidebarVisibility",
//   "when": "filesExplorerFocus && !inputFocus"
// },
{
  "key": "a",
  "command": "explorer.newFile",
  "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
},
{
  "key": "f",
  "command": "explorer.newFolder",
  "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
},
{
  "key": "r",
  "command": "renameFile",
  "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
},
// {
//   "key": "x",
//   "command": "filesExplorer.cut",
//   "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
// },
// {
//   "key": "y",
//   "command": "filesExplorer.copy",
//   "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus"
// },
// {
//   "key": "p",
//   "command": "filesExplorer.paste",
//   "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceReadonly && !inputFocus"
// }

```

【mac 中】同时删除系统自带的 cmd + b切换菜单设置；避免误触


## 修改快捷键 shift+alt+Up/Down Arrow

参考文档：https://stackoverflow.com/questions/69939030/when-i-use-shift-alt-uparrow-or-downarrow-in-vscode-it-goes-into-multi-curso

windows 中：

向上和向下复制一行，禁用 vim 模式；

记住：有 2 个设置 up/down 都禁用;

![vscode-6](https://github.com/Jsmond2016/picx-images-hosting/raw/master/vscode-6.77dqfipazy.webp)