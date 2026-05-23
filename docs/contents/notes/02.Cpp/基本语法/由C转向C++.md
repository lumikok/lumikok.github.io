# 由C转向C++

以下是对C++与C语言的相似但不一样的内容进行的整理。

## C++的基本程序结构

```c
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

拆解以上代码（主要针对不同之处）：

1. `#include <iostream>`：很明显类似于C语言中的`#include <stdio.h>`，用于包含输入输出流的头文件。区别在于不需要使用`.h`后缀。
2. `using namespace std;`：这里是C++相较于C语言的新增内容（“命名空间”的概念）。这里是为了使用标准命名空间`std`中的内容，避免每次使用标准库的内容时都需要加上`std::`前缀。
3. `cout << "Hello, World!" << endl;`：这是C++中输出内容的方式，类似于C语言中的`printf`。`cout`是标准输出流对象，`<<`是输出运算符，`endl`用于输出换行。

### 什么是命名空间？

命名空间主要是为了**解决命名冲突**的问题。在大型项目中，不同的库可能会定义相同名称的变量、函数或类，使用命名空间可以将它们区分开来。 头文件中（就是库，比如`<iostream>`）通常会使用命名空间来组织代码。例如，C++标准库中的所有内容都位于`std`命名空间中。

## 数据类型

C++基本数据类型和C语言一样。  
**引入的新数据类型**：

1. `bool`：布尔类型，取值为`true`或`false`，用于表示逻辑真值。
2. `wchar_t`：宽字符类型，用于表示宽字符，通常用于处理国际化字符集。
3. `string`：字符串类型，C++标准库提供的字符串类，方便字符串操作。
4. `nullptr`：空指针常量，替代C语言中的`NULL`，用于表示空指针。
5. `auto`：自动判断类型。
6. `decltype`：获取表达式的类型。
7. `std::initializer_list`：用于列表初始化。
8. `enum class`：强类型枚举，避免命名冲突。
9. `std::array`：固定大小的数组类模板。
10. `std::vector`：动态数组类模板。
11. `std::tuple`：元组类型，用于存储多个不同类型的值。

## 类型限定符

C++继承了C语言的类型限定符，并引入了一些新的限定符：

1. `mutable`：修饰类的成员变量，允许在`const`成员函数中修改该变量。
2. `constexpr`：用于声明常量表达式，表示在编译时就能求值的常量。
3. `volatitle`：与C语言相同，表示变量可能会被意外修改，通常用于多线程编程或硬件寄存器访问。
4. `thread_local`：用于声明线程局部存储的变量，每个线程都有自己的实例。
5. `noexcept`：用于声明函数不会抛出异常，提高程序的性能和安全性。
6. `final`：用于防止类被继承或虚函数被重写。
7. `override`：用于标识虚函数重写，确保基类中存在该虚函数。
8. `static_assert`：用于在编译时进行断言检查，确保某些条件成立。
9. `alignas`：用于指定类型或变量的对齐方式。

## 字符串

C++引入了`std::string`类，提供了更方便的字符串操作方式。相比C语言中的字符数组，`std::string`具有以下优点：

1. 自动管理内存：`std::string`会自动处理内存分配和释放，避免了手动管理内存的复杂性。
2. 丰富的成员函数：`std::string`提供了许多成员函数，如`length()`、`substr()`、`find()`等，方便字符串操作。
3. 支持动态大小：`std::string`可以根据需要动态调整大小，而不需要预先定义固定长度。

```c
#include <iostream>

using namespace std;

int main(){
    string str1 = "Hello, World!";
    string str2 = " C++ is great.";
    string str3;
    str1 += str2; // 字符串连接
    str3 = str1.substr(7, 5); // 提取子字符串(从索引7开始，长度为5)
    cout << "字符串内容: " << str1 << endl;
    cout << "字符串长度: " << str1.length() << endl;
    cout << "子字符串: " << str3 << endl; // 输出 "World"
    return 0;
}
```

## 引用

C++引入了引用（Reference）的概念，引用是某个变量的别名。引用在定义时必须初始化，并且一旦绑定到一个变量，就不能再绑定到其他变量。

```c
#include <iostream>
using namespace std;

int main(){
    int a = 10;
    int& ref = a; // 定义引用ref，绑定到变量a
    ref = 20; // 通过引用修改变量a的值
    cout << "a的值: " << a << endl; // 输出20
    return 0;
}
```

引用的主要用途包括：

1. 作为函数参数：可以使用引用作为函数参数，避免复制大对象，提高性能。
2. 作为函数返回值：可以使用引用作为函数返回值，避免复制，提高性能。
3. 实现操作符重载：在重载操作符时，可以使用引用作为参数和返回值，确保语义正确。

### 引用作为函数参数

引用作为函数参数时，可以避免传递大对象时的性能开销，同时允许函数修改传入的变量。

```c
#include <iostream>
using namespace std;

void modifyValue(int& ref) {
    ref = 100; // 修改引用所绑定的变量
}

int main() {
    int a = 10;
    modifyValue(a);
    cout << "a的值: " << a << endl; // 输出100
    return 0;
}
```

### 引用作为函数返回值

引用作为函数返回值时，可以避免复制对象，提高性能，同时允许链式调用。

```c
#include <iostream>
using namespace std;

int& getReference(int& ref) {
    return ref;
}

int main() {
    int a = 10;
    getReference(a) = 20; // 通过引用修改变量a的值
    cout << "a的值: " << a << endl; // 输出20
    return 0;
}
```

## 输入输出

C++中的输入输出主要通过`iostream`库来实现，常用的输入输出对象有：

1. `cin`：标准输入流，用于接收用户输入。
2. `cout`：标准输出流，用于输出信息到控制台。
3. `cerr`：标准错误流，用于输出错误信息。
4. `clog`：标准日志流，用于输出日志信息。

### 输入

使用`cin`进行输入时，可以使用`>>`运算符将输入的值存储到变量中。

```c
#include <iostream>
using namespace std;

int main() {
    int a;
    cout << "请输入一个整数: ";
    cin >> a;
    cout << "你输入的整数是: " << a << endl;
    return 0;
}
```

### 输出

使用`cout`进行输出时，可以使用`<<`运算符将要输出的内容发送到标准输出流。

```c
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    cout << "a的值: " << a << endl;
    return 0;
}
```

### 错误输出

使用`cerr`进行错误输出时，输出内容会被发送到标准错误流。

```c
#include <iostream>
using namespace std;

int main() {
    cerr << "错误: 发生了一个错误!" << endl;
    return 0;
}
```

### 日志输出

使用`clog`进行日志输出时，输出内容会被发送到标准日志流。

```c
#include <iostream>
using namespace std;

int main() {
    clog << "日志: 这是一个日志信息。" << endl;
    return 0;
}
```

## 容器（vectors）-初识

vector实际上就是动态数组。其具有以下优点：

1. 动态大小：vector可以根据需要动态调整大小，而不需要预先定义固定长度。
2. 自动管理内存：vector会自动处理内存分配和释放，避免了手动管理内存的复杂性。
3. 丰富的成员函数：vector提供了许多成员函数，如`push_back()`、`pop_back()`、`size()`等，方便数组操作。

```c
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> numbers; // 定义一个整数类型的动态数组
    numbers.push_back(10); // 在末尾添加元素
    numbers.push_back(20);
    numbers.push_back(30);

    cout << "数组元素: ";
    for (const auto& num : numbers)// 范围for循环遍历数组
    {
        cout << num << " ";
    }
    cout << endl;

    cout << "数组大小: " << numbers.size() << endl;

    numbers.pop_back(); // 删除末尾元素
    cout << "删除末尾元素后数组大小: " << numbers.size() << endl;

    return 0;
}
```

补充：删除用erase,插入用insert，清空用clear。

**注意**：此处遍历vector时使用到了范围for循环，其实也可以用迭代器来遍历vector，如下所示：

```c
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> numbers = {10, 20, 30};

    cout << "数组元素: ";
    for (auto it = numbers.begin(); it != numbers.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    return 0;
}
```

**这两个内容？？？***

## 数据结构

C++标准库中已经包含了多种常用的数据结构，如：

1. `std::list`：双向链表，支持高效的插入和删除操作。
2. `std::deque`：双端队列，支持在两端进行高效的插入和删除操作。
3. `std::set`：集合，存储唯一的元素，并支持高效的查找操作。
4. `std::map`：映射，存储键值对，并支持高效的查找操作。
5. `std::unordered_set`：无序集合，基于哈希表实现，支持高效的查找操作。
6. `std::unordered_map`：无序映射，基于哈希表实现，支持高效的查找操作。
7. `std::stack`：栈，遵循后进先出（LIFO）原则的数据结构。
8. `std::queue`：队列，遵循先进先出（FIFO）原则的数据结构。

## 范围for循环

范围for循环是一种简化的循环语法，可用于遍历容器，其语法如下：

```c
for (declaration : range) {
    // 循环体

```
