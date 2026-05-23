# 从 C 转向 C++

> 面向**已有 C 语言基础**的人员。
> 由于 C++的基础语法与 C 语言有相似之处，故仅整理二者核心差异与 C++的新增特性。
> 阅读后即可上手写基础 C++ 程序，并过渡到类、模板、STL 学习。
> 本文只讲核心语法，复杂用法后续按需补充。

前言：学校这学期开了 C++的课程，为了复习巩固，遂开始对之前的 C++笔记进行整理（😫一周了，才整理一篇😭），由于本人当初学的时候是从 C 学到 C++的，当时也很懵逼，又把 C++基础语法学了一遍，遂整理此篇，希望能帮助到大家从 C 快速过渡到 C++（基础语法大多互通）。下一步：*类与面向对象*。慢慢来吧🤷‍♀️

## 核心差异速查表

下表涉及部分 C++ 新语法，看不懂可先行跳过，**主要用于快速对比差异**。

| 常见任务        | C 写法                                | C++ 写法                                         |
| ----------- | ----------------------------------- | ---------------------------------------------- |
| 输出          | `printf("Hello\n");`                | `cout << "Hello" << endl;`                     |
| 输入          | `scanf("%d", &a);`                  | `cin >> a;`                                    |
| 字符串定义       | `char str[100];`                    | `string str;`                                  |
| 字符串拷贝       | `strcpy(dest, src);`                | `dest = src;`                                  |
| 动态分配单个对象    | `int* p = malloc(sizeof(int));`     | `int* p = new int(42);`                        |
| 释放单个对象      | `free(p);`                          | `delete p;`                                    |
| 动态数组        | `int* arr = malloc(n*sizeof(int));` | `int* arr = new int[n];` 或 `vector<int> v(n);` |
| 释放数组        | `free(arr);`                        | `delete[] arr;`                                |
| 函数参数传递（大对象） | 传指针 `void f(Struct* s)`             | 传引用 `void f(Struct& s)`                        |
| 空指针         | `NULL`                              | `nullptr`                                      |
| 布尔类型        | 用 `int` 模拟 (0/1)                    | `bool` / `true` / `false`                      |
| 常量定义        | `#define PI 3.14`                   | `constexpr double PI = 3.14;`                  |
| 类型别名        | `typedef int MyInt;`                | `using MyInt = int;`                           |

## 程序结构与命名空间

### Hello World!

```Cpp
#include <iostream>
using namespace std; // 仅示例用，大型项目建议显式写 std::

int main() {
	cout << "Hello World!" << endl;
	return 0;
}
```

**差异说明**：

1. `#include <iostream>`：对应 C 的 `<stdio.h>`。同为**头文件**，包含标准输入输出流。
2. `using namespace std;`：引入**标准命名空间**，用于简化代码。
3. `cout << ... << endl`：C++标准输出流，`endl` 换行并刷新缓冲区。

**注意**：命名空间的引入不可滥用，**小型示例可用，大型项目推荐显式写法**（如 `std::cout`）

### 命名空间

#### 为什么需要命名空间

命名空间主要是为了**解决命名冲突**的问题。

不同库可能定义同名函数/变量，命名空间可将其隔离。

#### 定义与使用

如果你需要为自己写的函数构建命名空间，可以 参考下面的语法：

```cpp
namespace Mylib {
	void print() {
		std::cout << "Mylib::print" << std:: endl; 
	}
}

// 调用时必须加上命名空间前缀
Mylib::print();    // 输出 MyLib::print
```

不难发现，命名空间中可以使用其他命名空间的内容。

#### 标准命名空间 std

C++标准库的所有内容，都定义在 `std` 命名空间中，是最常使用的命名空间。

其使用方式如下：

1. **加前缀**：

```cpp
std::cout << "Hello" << std::endl;
```

2. **using 声明（引入单用法）**：

```cpp
using std::cout;
using std::endl;
cout << "Hello" << endl;
```

3. **using 指令（引入整个命名空间）**（慎用⚠️）：

```cpp
using namespace std;
cout << "Hello" << endl;
```

#### 嵌套与别名

有时为了更好地管理，可以嵌套定义命名空间。

但在这种情况下，调用方式就比较繁琐。此时可以通过为命名空间起别名的方式解决这个问题。

示例如下：

```cpp
namespace Outer {
	namespace Inner {
		void func()
	}
}
// 调用：Outer::Inner::func();

//起别名
namespace OI = Outer::Inner;
OI::func();
```

## 输入输出（I/O）

C++ 用**流**做输入输出，无需格式化控制符，类型安全（自动识别类型）。

**何为流（stream）**：数据传输通道，`cin/cout/cerr/clog` 都是流对象。

### 输入 cin

```cpp
int a,b;
cin >> a >> b; 
```

- `>>`：从流中提取，根据变量类型解析数据。
- 自动跳过空格、Tab，回车。

### 输出 cout

在上面的内容中，我们已经使用了 `cout` 的基本用法。

这里，给出一个稍微复杂的样例：

```cpp
int a = 10;
double b = 3.14;
cout << "a = " << a << ",b = " << b << endl;
```

- **可连续输出**：`<<` 把数据送入流。
- **不自动换行**：使用 `'\n'` 或 `endl`（后者会刷新缓冲区，略慢）。

### 错误/日志输出

此处简单介绍一下 C++中的标准错误输出和标准日志输出。

```cpp
// 标准错误流
cerr << "错误信息" << endl;
// 标准日志流
clog << "日志信息" << endl;
```

目前来说，这部分内容不常用，但当接触大型项目和团队协作时，错误处理与日志是不可或缺的技能。

### 格式化控制

有时，你不得不格式化变量的输出形式（比如保留 两位小数）。

这时，可以使用 `<iomanip>` 中的操纵符来实现。

比如保留 n 位小数可以用 `setprecison(n)` 搭配 `fixed` 来实现：

```cpp
#include <iomanip>
cout << setprecision(2) << fixed << 3.14159; // 输出：3.14
```

`setprecision()` ：用于保留有效数字位数，搭配 `fixed` 可实现保留小数。
## 引用

**引用是变量的别名**，必须在定义时初始化，且不能改变指向。

```cpp
int a = 10;
// int &ref;   错误(必须初始化)
int &ref = a; // ref 是 a 的别名
ref = 20; // a 变为 20
```

不难发现，修改引用的值，原变量的值也会改变。

因此，其可替代指针，作为函数参数进行传递：

```cpp
void swap(int &x,int &y) {
	int tmp = x;
	x = y;
	y = tmp;
}
// 调用 swap(a,b)，直接传变量，自动传引用
```

足以见得，引用传参可直接修改原变量的值，并且在调用时直接传变量即可（会自动传相应变量的引用）。

是不是十分的简便😃，C++函数传参建议使用引用（如果想要修改函数外变量）。

**常见错误**：

- 引用未初始化
- 误以为 `ref = b` 能改变引用的指向（实际是将 `b` 的值赋给被引用的变量）
- 函数返回局部变量的引用（悬垂引用）

### 指针 VS 引用

此处，简单列出了二者区别：

| 特性    | 指针           | 引用       |
| ----- | ------------ | -------- |
| 可重新绑定 | 是            | 否        |
| 可为空   | 是（需判空）       | 否（必须初始化） |
| 语法    | 需用 `*` 和 `&` | 直接使用别名   |

## 函数增强

### 函数重载

现在我们要写多个功能相同，但操作对象不同的函数，比如对不同数据类型的数据求和。

如果是 C 语言，是不是要写 `add_int()`、`add_double()` 等多个不同的函数名，管理起来十分麻烦。

而 C++引入了**函数重载(overload)**，**允许函数名相同，参数列表不同**，调用时编辑器可根据参数个数和类型自动匹配，比如：

- `add(int a,int b)`
- `add(double a,double b)`

是不是就很方便了😃

**⚠️注意**：仅返回值类型不同不能构成重载（调用时无法区分）。

### 缺省参数（默认参数）

C++允许函数在声明或定义时给参数一个默认值。调用时若省略该参数，则使用默认值。

```cpp
int add_or_subtract(int a,int b,int c = 1) {
	if(c==1) return a + b;
	if(c==0) return a - b;
}

cout << add_or_subtract(1,1); // 输出 2
cout << add_or_subtract(1,1,0); // 输出 0
```

**⚠️ 核心规则**：默认参数必须从右向左连续提供，且一般在声明中指定（若分离声明与定义）。

常见错误：

- 中间有非缺省参数：`void func(int a,int b = 10,int c)` ❌ （c 也必须有默认值）。
- 声明与定义分离时，默认值只能在一处给出。

### 内联函数（inline）

C++用 `inline` 替代 C 语言的带参宏（`#define`）。`inline` 建议编译器将函数视为内联函数处理。

- **作用**：在编译时，将函数体直接嵌入调用处，省去函数调用的开销。
- **适用场景**：代码短小，且频繁调用的函数。
- **对比 C 宏**：宏只是文本替换，极易出错（无类型检查、参数有副作用如 `i++` 被执行两次）；内联函数本质还是函数，既有宏的效率，又安全。
- **注意**：
	- `inline` 只是对编译器的**建议**，编译器会根据内部代码开销和是否存在循环/递归，来自行选择。
	- 滥用会导致代码膨胀（可执行文件变大）。
- **补充**：C 中也有 `inline`（C 99），但 C++更常用。

## 动态内存管理

C++使用 `new` / `delete` 替代 `malloc` / `free`，**类型安全**且能自动调用构造/析构（后续类相关）。

| 操作     | C++ 语法                    | 对应 C 语法                              |
| ------ | ------------------------- | ------------------------------------ |
| 分配单个对象 | `int* p = new int(5);`    | `int* p = malloc(sizeof(int));`      |
| 释放单个对象 | `delete p;`               | `free(p);`                           |
| 分配数组   | `int* arr = new int[10];` | `int* arr = malloc(10*sizeof(int));` |
| 释放数组   | `delete[] arr;`           | `free(arr);`                         |


> **重要**：`new` 和 `delete`、`new[]` 和 `delete[]` 必须配对使用，否则行为未定义。


二维数组的实现逻辑和 C 类似，都需要先分配行指针数组，再为每一行分配列数组

```cpp
// 1. 分配行指针数组
int **arr = new int*[rows];

// 2. 为每一行分配列数组
for(int i = 0;i < rows;i++) {
	arr[i] = new int[cols];
}

// 1. 先释放每一行的列数组
for(int i = 0;i < rows;i++) {
	delete[] arr[i];
}

// 2. 再释放行指针数组
delete[] arr;
```

> **现代 C++的忠告**：动态数组不推荐用上述手动方式实现（需手动管理内存），现代 C++推荐使用 `vector`（见 *STL*部分），可自动管理内存。

### 动态数组的替代：`vector`

`vector` 实际为 STL 的内容，但鉴于上文提到了且比较常用，遂在此做简单介绍。

`vector` 容器，可自动管理内存、动态增长，比 `new[]` 更安全。

```cpp
#include <vector>
vector<int> arr = {1,2,3}      // 初始化
arr.push_back(4);              // 尾部添加
cout << arr[0] << ", size = " << arr.size() << endl;
```

详细用法在*STL*章节。

## 字符串：`std::string`

C 风格字符串（`char[]`）仍然可用，但 C++提供了 `string` 类型，需要头文件 `<string>`。

```cpp
#include <string>
using std::string;

string s1 = "Hello";
string s2 = "World";
string s3 = s1 + " " + s2;  // 字符串拼接
cout << s3 << endl;			// Hello World

// 常用操作
int len = s1.length();       // 或 size()
if (s1 == s2) { };           // 直接比较
s1[0] = 'h';                 // 索引访问（修改）
s1.append(" C++");           // 追加```
```

目前，只需把它理解成一个智能的字符数组，内部提供了很多简便用法（本质为类，涉及运算符重载）。

## 布尔类型与空指针

### `bool` 类型

C++ 内置 `bool`，取值 `true`（1）或 `false`（0）：

```cpp
bool flag = true;
if(flag) { }
```

### `nullptr` 关键字

用于表示空指针，比 `NULL` **更安全**，避免与整数重载混淆（知道即可）。

```cpp
int* p = nullptr;
if(p == nullptr) { }
```

## 常量：`const` 与 `constexpr`

C++ 推荐用 `const` 或 `constexpr` 替代 `#define` 宏。

**为什么 C 语言总爱用 `#define`？**
因为 C 语言的 `const` 只是“只读变量”，不是真正的常量：

```c
const int SIZE = 10; 
int arr[SIZE]; // ❌ C 语言报错！数组大小需要常量，SIZE 不算
```

所以 C 只能被迫用 `#define SIZE 10`（文本替换，无类型，坑多）。

**C++ 的解法**：
C++ 强化了 `const`，只要初始值是常量，它就是编译期常量：

```cpp
const int SIZE = 10;
int arr[SIZE]; // ✅ C++ 合法！
```

**`constexpr`（C++11）：**  
比 `const` 更严格，强制要求值必须在编译期算出来，语义更安全。

```cpp
constexpr double PI = 3.14; // 推荐！真正的常量
```

一般来说，`const` 用的较多，`constexpr` 常用于性能优化或模版参数。

## 类型别名：`using` vs `typedef`

两者功能相似，但 `using` 语法更统一，尤其在模板中（后续学习）。

```cpp
typedef int MyInt;
using MyInt = int;          // 等义

// 函数指针示例
typedef void (*Func)(int);
using Func = void(*)(int);  // 更清晰
```

## 类型推导：`auto`

编译器自动推导变量类型，减少冗长代码。

```cpp
auto a = 10;           // int
auto b = 3.14;         // double
auto c = "Hello";      // const char* (注意不是 string)
auto d = std::string("Hello"); // 显式构造 string

// 常用场景：迭代器
vector<int> v = {1,2,3};
for (auto it = v.begin(); it != v.end(); ++it) { }
```

> **注意**：`auto` 会去掉引用和 `const`，如需保留可用 `auto&` 或 `const auto&`。
> 迭代器此处了解即可。

## 范围 for 循环 (Range-based for)

用于简化遍历数组或容器（*STL*），C++11 引入。

```cpp
int arr[] = {1, 2, 3, 4};
for (int x : arr) {
    cout << x << " ";
}

// 修改元素需用引用
for (int &x : arr) {
    x *= 2;
}

// 配合 string 或 vector
string s = "Hello";
for (char ch : s) { cout << ch; }
```

## 强制类型转换（了解）

C++ 提供更细粒度的类型转换操作符，比 C 的 `(type)value` 更安全易查。

|转换操作符|用途|示例|
|---|---|---|
|`static_cast`|常见类型转换（int→double）|`double d = static_cast<double>(i);`|
|`const_cast`|去掉 const 属性|`const_cast<int*>(&c);`|
|`reinterpret_cast`|底层位模式转换（危险）|指针转整数等|
|`dynamic_cast`|多态类型向下转换（需继承）|类与对象章节学习|

目前只需了解 `static_cast`，基本可替代 C 风格转换。


下一篇：*面向过程 VS 面向对象*（待整理）