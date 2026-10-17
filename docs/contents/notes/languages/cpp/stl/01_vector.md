# vector

vector其实就是一个动态数组。

**基本特性**：

- **动态扩展**：当vector的容量不够时，会自动分配更大的内存空间，并将原有元素拷贝过去。
- **连续存储**：vector中的元素在内存中是连续存储的，这使得它支持高效的随机访问。
- **自动管理内存**：vector会自动管理内存的分配和释放，减少了内存泄漏的风险。
- **元素类型**：vector可以存储任意类型的元素，包括基本数据类型和自定义类型。
- **可迭代**：vector支持迭代器，可以方便地遍历和操作其中的元素。

其包含在头文件 `<vector>` 中。

## 常用操作

### 创建vector

```cpp
std::vector<int> vec; // 创建一个空的vector，存储int类型的元素
std::vector<int> vec2(10); // 创建一个包含10个int类型元素的vector，默认初始化为0
std::vector<int> vec3(10, 5); // 创建一个包含10个int类型元素的vector，所有元素初始化为5
std::vector<int> vec4 = {1, 2, 3, 4, 5}; // 使用初始化列表创建vector
```

### 添加元素

```cpp
vec.push_back(10); // 在vector末尾添加一个元素10
vec.emplace_back(20); // 在vector末尾直接构造一个元素20
```

### 访问元素

```cpp
int first = vec[0]; // 通过下标访问第一个元素
int second = vec.at(1); // 通过at()方法访问第二个元素，会进行边界检查
int front = vec.front(); // 访问第一个元素
int back = vec.back(); // 访问最后一个元素
```

### 删除元素

```cpp
vec.pop_back(); // 删除vector末尾的元素
vec.erase(vec.begin() + 1); // 删除第二个元素
```

### 获取大小和容量

```cpp
int size = vec.size(); // 获取vector中元素的数量
int capacity = vec.capacity(); // 获取vector的容量
```

### 清空vector

```cpp
vec.clear(); // 清空vector中的所有元素
```

### 遍历vector

```cpp
for (const auto& element : vec) {
    std::cout << element << " "; // 使用范围for循环遍历vector
}
```

### 其他操作

**插入元素**：

```cpp
vec.insert(vec.begin() + 1, 15); // 在第二个位置插入元素15
```

**检查是否为空**：

```cpp
bool isEmpty = vec.empty(); // 检查vector是否为空
```

