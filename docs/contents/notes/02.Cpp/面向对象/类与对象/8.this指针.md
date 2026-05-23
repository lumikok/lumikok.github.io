# this指针

## 必须掌握的内容

### 基础理解与使用

- `this` 指针是一个隐含在类的非静态成员函数中的指针，指向调用该成员函数的对象本身。
- 在成员函数内部，可以使用 `this` 指针来访问调用该函数的对象的成员变量和成员函数。
- 可以在成员函数中用它来解决命名冲突。

例子：

```cpp
class Student {
    string name;
public:
    void setName(string name) {
        this->name = name; // 使用 this 指针区分成员变量和参数
    }
};
```

### 链式调用

- 通过返回 `*this`，可以实现成员函数的链式调用。

例子：

```cpp
class Student {
    string name;
    int age;
public:
    Student& setName(string name) {
        this->name = name;
        return *this; // 返回当前对象的引用
    }
    Student& setAge(int age) {
        this->age = age;
        return *this; // 返回当前对象的引用
    }
};
// 使用链式调用
Student s;
s.setName("Alice").setAge(20);
```

### 区分当前对象

- 在某些情况下，可能需要明确区分当前对象与其他对象，这时可以使用 `this` 指针。

例子：

```cpp
Student s1, s2;
s1.setName("Bob");      //this = &s1
s2.setName("Charlie"); // this = &s2
```

## 拓展内容

### const 成员函数中的 this 指针

- 在 `const` 成员函数中，`this` 指针的类型是 `const ClassName*`，表示指向常量对象的指针。

例子：

```cpp
class MyClass {
    int value;
public:
    int getValue() const {
        return this->value; // this 是 const MyClass*
        // 不能修改成员变量
    }
};
```
