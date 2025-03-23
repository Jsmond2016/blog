# 算法题初中高级分类整理

> 共计 141 道题

- [初级算法](https://leetcode-cn.com/leetbook/detail/top-interview-questions-easy/)
- [中级算法](https://leetcode-cn.com/leetbook/detail/top-interview-questions-medium/)
- [高级算法](https://leetcode-cn.com/leetbook/detail/top-interview-questions-hard/)
- [未整理-算法面试题汇总](https://leetcode-cn.com/leetbook/detail/top-interview-questions/)
- [Leetcode-retag](https://github.com/Jsmond2016/Leetcode-retag) 重新分类 Leetcode 高频题 2021 版

模板：

```
- 题目描述
- 解题方法
  - 思路
  - 注意要点
  - 代码
JavaScript 版本
Java 版本
Go 版本
```

Plan：

- [ ] 完成上述 【初中高级和面试题】所有算法，并添加整理题解；
- [ ] 分类整理方法，每个专题添加 【出题方向】【题型总结】，可以参考  [Leetcode-retag](https://github.com/Jsmond2016/Leetcode-retag)
- [ ] 参考 [数据结构和算法学习](https://jsmond2016.github.io/leetcode/) 的目标阶段逐步完成



## 数组和字符串

初级：

### 删除排序数组中的重复项  

> [26. 删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

- 题目描述
- 解题方法1
  - 思路：利用双指针思想
  - 注意要点

javascript 版本
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let n = nums.length
    let left = 0
    for (let right = 1; right < n; right ++) {
        if (nums[left] !== nums[right]) {
            nums[++left] = nums[right]
        }
    }
    return left + 1
};
```

java 版本

go 版本

- 解题方法2
  - 思路：利用哈希的唯一性
  - 代码-js版本

```js
var removeDuplicates = function(nums) {
    let j = 0, hash = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (!hash.get(nums[i])) {
            hash.set(nums[i], true)
            nums[j] = nums[i]
            j ++
        }
    }
    return j
};
```



### 买卖股票的最佳时机 II  

- 题目描述：
- 解题方法
  - 思路
  - 代码

JavaScript 版本

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const n = prices.length;
    let ans = 0;
    for (let i=1; i<n; i++) {
        if (prices[i] - prices[i-1] > 0) {
            ans += prices[i] - prices[i-1]
        }
    }
    return ans
};
```



### 旋转数组
### 存在重复元素
### 只出现一次的数字        
### 两个数组的交集 II       
### 加一
### 移动零
### 两数之和
### 有效的数独
### 旋转图像

> 字符串部分：

### 反转字符串
### 整数反转
### 字符串中的第一个唯一字符
### 有效的字母异位词
### 验证回文串
### 字符串转换整数 (atoi)
### 实现 strStr()
### 外观数列
### 最长公共前缀

中级：

### 三数之和
### 矩阵置零
### 字母异位词分组
### 无重复字符的最长子串
### 最长回文子串
### 递增的三元子序列

高级：


### 除自身以外数组的乘积
### 螺旋矩阵
### 四数相加 II
### 盛最多水的容器
### 生命游戏
### 缺失的第一个正数
### 最长连续序列
### 寻找重复数
### 基本计算器 II
### 滑动窗口最大值
### 最小覆盖子串



## 链表

初级：

### 删除链表中的节点
### 删除链表的倒数第N个节点
### 反转链表
### 合并两个有序链表
### 回文链表
### 环形链表

中级：


### 两数相加
### 奇偶链表
### 相交链表

高级：

### 合并K个排序链表
### 排序链表
### 复制带随机指针的链表

## 树和图

初级：

### 二叉树的最大深度
### 验证二叉搜索树
### 对称二叉树
### 二叉树的层序遍历
### 将有序数组转换为二叉搜索树

中级：

### 二叉树的中序遍历
### 二叉树的锯齿形层次遍历
### 从前序与中序遍历序列构造二叉树
### 填充每个节点的下一个右侧节点指针
### 二叉搜索树中第K小的元素
### 岛屿数量

高级：

### 单词接龙
### 被围绕的区域
### 二叉树的最近公共祖先
### 二叉树中的最大路径和
### 朋友圈
### 课程表
### 课程表 II
### 矩阵中的最长递增路径
### 计算右侧小于当前元素的个数

## 回溯算法

中级：

### 电话号码的字母组合
### 括号生成
### 全排列
### 子集
### 单词搜索

高级：

### 分割回文串
### 单词搜索 II
### 删除无效的括号
### 通配符匹配
### 正则表达式匹配


## 排序和搜索

### 合并两个有序数组
### 第一个错误的版本

中级：

### 颜色分类
### 前 K 个高频元素
### 数组中的第K个最大元素
### 寻找峰值
### 在排序数组中查找元素的第一个和最后一个位置
### 合并区间
### 搜索旋转排序数组
### 搜索二维矩阵 II

高级：

### 摆动排序 II
### 有序矩阵中第K小的元素
### 寻找两个正序数组的中位数



## 动态规划

### 爬楼梯
### 买卖股票的最佳时机
### 最大子序和
### 打家劫舍

中级：

### 跳跃游戏
### 不同路径
### 零钱兑换
### 最长上升子序列

高级：

### 乘积最大子数组
### 最佳买卖股票时机含冷冻期
### 完全平方数
### 单词拆分
### 单词拆分 II
### 戳气球


## 设计问题

### 打乱数组
### 最小栈

中级：

### 二叉树的序列化与反序列化
### 常数时间插入、删除和获取随机元素

高级：

### LRU缓存机制
### 实现 Trie (前缀树)
### 扁平化嵌套列表迭代器
### 数据流的中位数


## 数学

### Fizz Buzz
### 计数质数
### 3的幂
### 罗马数字转整数

中级：

### 快乐数
### 阶乘后的零
### Excel表列序号
### Pow(x n)
### x 的平方根
### 两数相除
### 分数到小数

高级：

### 最大数
### 直线上最多的点数


## 其他

### 位1的个数
### 汉明距离
### 颠倒二进制位
### 杨辉三角
### 有效的括号
### 缺失数字

中级：

### 两整数之和
### 逆波兰表达式求值
### 多数元素
### 任务调度器

高级：

### 根据身高重建队列
### 接雨水
### 天际线问题
### 柱状图中最大的矩形
