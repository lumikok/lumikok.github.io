# set - 集合

## 目录结构

- [基本操作](#基本操作)；
- [案例](#案例).

## 基本操作

- 介绍：`set` **无序**、不可重复（**自动去重**）、可修改
- 定义：

```python
# 定义集合  
s1 = {"A","B","C","D","E","F","G","H","I","J"}  
  
# 定义空集合  
s2 = set()
```

**注意**：因 `set` 无序，故不可以下标访问。

- 常见方法：

| 操作             | 含义              | 样例                  |
| -------------- | --------------- | ------------------- |
| add(...)       | 添加元素到集合中        | s1.add('t')         |
| remove(...)    | 移除集合中的指定元素（须存在） | s1.remove('t')      |
| pop()          | 随机删除集合中的元素并返回   | e = s1.pop()        |
| clear()        | 清空集合            | s1.clear()          |
| difference()   | 求取两个集合的差集       | s1.difference(s2)   |
| union()        | 求取两个集合的并集       | s1.union(s2)        |
| intersection() | 求取两个集合的交集       | s1.intersection(s2) |

## 案例

```python
# 选修足球学生名单  
football_set = {"王林", "曾牛", "徐立国", "遁天", "天运子", "韩立", "厉飞雨", "乌丑", "紫灵"}  
# 选修篮球学生名单  
basketball_set = {"张铁", "墨居仁", "王林", "姜老道", "曾牛", "王蝉", "韩立", "天运子", "李化元", "厉飞雨", "云露"}  
# 选修法语学生名单  
french_set = {"许木", "王卓", "十三", "虎咆", "姜老道", "天运子",  "红蝶", "厉飞雨", "韩立", "曾牛"}  
# 选修艺术学生名单  
art_set = { "遁天", "天运子", "韩立", "虎咆", "姜老道", "紫灵"}  
  
# 1.找出同时选修法语和艺术的同学（方式一）  
art_and_french_set = art_set.intersection(french_set)  
print(f"同时选择了法语和艺术的同学有：{art_and_french_set}")  
  
# 方式二（&)  
art_and_french_set2 = art_set & french_set  
  
# 2.找出同时选修了所有四门课程的学生  
all_set = football_set.intersection(art_and_french_set,basketball_set)  
print(all_set)  
  
# 3.找出选修了足球，但是没有选修篮球的学生  
no_basketball_in_football_set = football_set.difference(basketball_set)  
print(no_basketball_in_football_set)  
  
# 方式二（-）  
no_basketball_in_football_set2 = football_set - basketball_set  
  
# 方式三：集合推导式  
no_basketball_in_football_set3 = {s for s in football_set if s not in basketball_set}  
  
# 4.统计每一个学生选修的课程数量  
  
# 并集（|）  
all_n_set = football_set | basketball_set | french_set | art_set  
  
all_list = [*football_set,*basketball_set,*french_set,*art_set]  
  
for s in all_n_set:  
    print(f"{s}选修了{all_list.count(s)}门课")
```

总结：

1. 集合 `set` 的操作符：
    - **&**：交集
    - **|**：并集
    - **-**：差集
2. 集合推导式：
    - 变量名称 = {s for s in 列表}
    - 变量名称 = {s for s in 列表 if 条件}
