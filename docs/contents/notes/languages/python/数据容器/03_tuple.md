# tuple - 元组

## 目录结构


1. [为何引入元组及其基本操作](#为何引入元组及其基本操作)；
2. [组包与解包](#组包与解包)；
3. [案例](#案例)


## 为何引入元组及其基本操作

首先，回顾列表的特点：元素可重复，有序，**可修改**；

因此，当我们的要求是仅访问不修改时，列表就不再适用，故引入 `tuple`，具体如下：

- 定义：元组是**不可变**的序列，类似列表，但创建后**不可修改**
- 特点：
    - 可存储不同类型的元素；
    - 元素可重复，有序，**不可修改**（支持下标访问，切片）。
- 定义方式：

```python
# 定义元组
t1 = (1,2,3)

# 定义空元组
t2 = ()
t3 = tuple()

# 注意：定义单元素元组时，末尾加 , 如：t = (100,)
t = (100,)
```

- 查询方法：
    - `count()`：统计某元素在元组中的出现次数；
    - `index()`：查找某元素第一次出现的索引位置。


## 组包与解包

- **组包**：将多个值合并到一个容器中；
- **解包**：将容器解开成多个元素，分别赋值给多个元素。

示例如下：

```python
# 定义元组 ： 组包  
t1 = (1,2,3,4)  
  
t2 = 5,6,7,8  
  
# 基础解包  
a,b,c,d = t1  
print(a,b,c,d)  
  
# 扩展解包（*）  
x,*y,z = t2 # x = 5,y = [6,7],z = 8  
  
x,*y = t2 # x = 5,y = [6,7,8]  
  
*x,y = t2 # x = [5,6,7],y = 8
```

可知：

- 基础解包：变量与元素个数一致；
- 扩展解包（`*`）：打包剩下的所有元素成 `list`。

### 例子

1. 交换两个变量的值：

```python
a = 20  
b = 10  
  
a,b = b,a  
print(a,b)
```

2. 将 `a,b,c` 赋值给 `c,a,b`：

```python
a = 10  
b = 20  
c = 30  

# 组包
t = a,b,c  

# 解包  
c,a,b = t  

# 合并
c,a,b = a,b,c
print(a)  
print(b)  
print(c)
```

**核心**：组包、解包过程中，会优先计算 `=` 右边的值，将值赋给 `=` 左边，因此不会因提前覆盖而失效。


## 案例


- 描述：基于给定的学生成绩表，完成以下任务：
    1. 统计每位学生的总成绩，平均分；
    2. 各科最低，最高，平均；
    3. 平均分大于等于90的学生姓名。

### 方式一（基础）


```python
# 方式一：  
for s in students:  
    total = s[2] + s[3] + s[4]  
    avg = total / 3  
    print(f"{s[0]} {s[1]} {s[2]} {s[3]} {s[4]} {total} {avg:.1f}") # :.1f -> 保留一位小数 \t 制表符
# 2.各科最低，最高，平均  
  
chinese_scores = [s[2] for s in students]  
english_scores = [s[3] for s in students]  
math_scores = [s[4] for s in students]  
  
min_chinese_score = min(chinese_scores)  
min_english_score = min(english_scores)  
min_math_score = min(math_scores)  
max_chinese_score = max(chinese_scores)  
max_english_score = max(english_scores)  
max_math_score = max(math_scores)  
print(min_chinese_score, min_english_score,min_math_score,max_chinese_score,max_english_score,max_math_score)  
  
# 3.平均分大于等于90的学生姓名  
  
for s in students:  
    total = s[2] + s[3] + s[4]  
    avg = total / 3  
    if avg >= 90:  
        print(s[1])
```

总结：`for`循环 + 列表推导式（何为列表推导式？）。

### 方式二（tuple）


```python
for id,name,chinese,english,math in students:  
    total = chinese + english + math  
    avg = total / 3  
    print(f"{id} {name} {chinese} {english} {math} {total} {avg:.1f}")
```

总结：`for` 循环里应用解包，**提高了代码可读性**
