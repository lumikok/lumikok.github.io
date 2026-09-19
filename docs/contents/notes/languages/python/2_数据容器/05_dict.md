---
date: 2026-04-19
cssclasses:
  - python-字典
tags:
  - python
---

# dict（字典）

目录：
- [简介](#简介)
- [常用操作](#常用操作)
- [案例](#案例)

## 简介

- **介绍**：使用键值对来存储数据，类似于 `C++` 中的 `map`
- **特点**：`key` 不能重复、可修改
- **定义**：
- 
```python
# 01. 定义字典  
dict1 = {"小明":3,"小白":4,"小红":5,"小李":6}  
  
# 02. 定义空字典  
dict2 = {}  
dict3 = dict()  
  
# 由 key 获取 value
v = dict1["小明"]
```

**注意**：
- `value` 可为任何类型的数据，但是 `key` 不能为可变类型（如：`list` `set` `dict`）
- `key` 有重复时，后来居上
- 字典无索引下标，仅能根据 `key` 获取 `value` 

## 常用操作

| 类型  | 含义                    | 样例                 |
| --- | --------------------- | ------------------ |
| 添加  | 向指定字典中添加键值对           | dict1["小明"] = 1    |
| 删除  | 删除指定的key 并返回对应的 value | s = dict1.pop("小明) |
| 删除  | 删除指定的键值对              | del dict1["小明"]    |
| 修改  | 修改 key  对应的值          | dict1["小明"] = 2    |
| 查询  | 由 key 获取 value        | dict1["小明"]        |
| 查询  | 由 key 获取 value        | dict1.get("小明")    |
| 查询  | 获取所有 key              | dict1.keys()       |
| 查询  | 获取所有 value            | dict1.values()     |
| 查询  | 获取所有键值对               | dict1.items()      |


**遍历**：
```python
# 遍历  
for k in dict1.keys():  
    print(k,dict1[k])
    
for item in dict1.items():  
    print(f"{item[0]}: {item[1]}")

for k,v in dict1.items():  
    print(f"{k}: {v}")
```

## 案例

开发一个购物车管理系统，实现商品信息的添加、修改、删除、查询功能。系统使用字典结构存储商品数据，通过控制台菜单与用户交互。具体功能如下：

1. **添加购物车**：用户根据提示录入商品名称、以及该商品的价格、数量，保存该商品信息到购物车。
2. **修改购物车**：要求用户输入要修改的购物车商品名称，然后再提示输入该商品的价格、数量，输入完成后修改该商品信息。
3. **删除购物车**：要求用户输入要删除的购物车名称，根据名称删除购物车中的商品。
4. **查询购物车**：将购物车中的商品信息展示出来，格式为：`商品名称：xxx，商品价格：xxx，商品数量：xxx`。
5. **退出购物车**

**代码**：

```python
shopping_cart = {}  
  
menu = """  
########### 购物车系统 ############         1. 添加购物车          ##         2. 修改购物车          ##         3. 删除购物车          ##         4. 查询购物车          ##         5. 退出购物车          ################################# """  
  
# 1. 制作菜单  
print("欢迎使用购物车管理系统")  
  
while True:  
    print(menu)  
  
    # 2. 执行具体操作  
    choice = input("请输入要执行的操作(1-5)：")  
  
    match choice:  
        case "1":  
            goods_name = input("请输入商品名称：")  
  
            if goods_name not in shopping_cart:  
                goods_price = float(input("请输入商品价格："))  
                goods_num = int(input("请输入商品数量："))  
                shopping_cart[goods_name] = {"price": goods_price, "num": goods_num}  
                print("商品添加完毕")  
            else:  
                print("该商品已存在，请重新选择")  
        case "2":  
            goods_name = input("请输入要修改的商品名称：")  
  
            if goods_name not in shopping_cart:  
                print("该商品不存在，请重新选择")  
            else:  
                goods_price = float(input("请输入新的商品价格："))  
                goods_num = int(input("请输入新的商品数量："))  
                shopping_cart[goods_name] = {"price": goods_price, "num": goods_num}  
                print("商品添加完毕")  
        case "3":  
            goods_name = input("请输入要删除的商品名称：")  
  
            if goods_name not in shopping_cart:  
                print("该商品不存在，请重新选择")  
            else:  
                del shopping_cart[goods_name]  
                print("商品删除完毕")  
        case "4":  
            for goods_name in shopping_cart.keys():  
                goods_info = shopping_cart[goods_name]  
                print(f"商品名称：{goods_name}，商品价格：{goods_info['price']}，商品数量：{goods_info['num']}")  
        case "5":  
            print("成功退出操作系统")  
            break  
        case _:  
            print("无效选择，请重新选择！！！")
```

**总结**：
1. **多行字符串**：三个双引号 `"""` 或三个单引号 `'''` 定义多行字符串，直接打印即可 。如：本案例中的 `menu` 。
2. **嵌套字典**：包含 - 外层 `key` + 内层的多个 `key` 和 `value` ，同时可以由外层 `key` 来获取内层字典。


