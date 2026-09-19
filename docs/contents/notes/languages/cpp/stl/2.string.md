# string

C++ 标准库提供了一个名为 `std::string` 的类，用于处理字符串。`std::string` 是一个动态大小的字符数组，提供了丰富的成员函数来操作字符串。

## 初始化方式

```cpp
#include <string>
using namespace std;

string s1 = "Hello";  //拷贝初始化
string s2("World");   //直接初始化
string s3(5, 'A'); //重复字符初始化，结果为 "AAAAA"
string s4(s1); //拷贝构造函数
string s5 = s1 + s2; //拼接初始化
string s6{"C++11"}; //列表初始化
```

## 赋值操作

```cpp
string s;
s = "Hello"; //直接赋值
s.assign("World"); //使用 assign 方法赋值
s.assign(3, 'A'); //重复字符赋值，结果为 "AAA"
s.assign(s1,1,3); //从 s1 的索引 1 开始，取 3 个字符赋值，结果为 "ell"
```

## 长度与容量

```cpp
string s = "Hello World";
size_t len1 = s.length(); // 获取字符串长度
size_t len2 = s.size(); // 获取字符串大小（推荐使用）
size_t cap = s.capacity(); // 获取字符串容量
s.resize(10, 'X'); // 调整字符串大小为 10，超出部分填充 'X'
s.reserve(50); // 预留容量为 50
s.clear(); // 清空字符串
s.empty(); // 检查字符串是否为空
s.shrink_to_fit(); // 收缩容量以适应当前大小
```

## 访问字符

```cpp
string s = "Hello";
char c1 = s[1]; // 使用下标访问字符，结果为 'e'(不进行边界检查)
char c2 = s.at(1); // 使用 at() 访问字符，结果为 'e'(进行边界检查)
char& c3 = s.front(); // 获取第一个字符的引用，结果为 'H'
char& c4 = s.back(); // 获取最后一个字符的引用，结果为 'o'
```

## 遍历字符串

```cpp
string s = "Hello";
// 使用范围 for 循环遍历
for (char c : s) {
    // 处理字符 c
}
// 使用迭代器遍历
for (auto it = s.begin(); it != s.end(); ++it) {
    char c = *it;
    // 处理字符 c
}
// 使用索引遍历
for (size_t i = 0; i < s.size(); ++i) {
    char c = s[i];
    // 处理字符 c
}
```

## 查找

```cpp
string s = "Hello World";

size_t pos1 = s.find("World"); // 查找子字符串，结果为 6
