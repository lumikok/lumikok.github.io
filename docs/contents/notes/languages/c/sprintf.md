# sprintf

`sprintf` 函数用于将格式化的数据写入字符串中。它的函数原型如下：

```c
int sprintf(buffer,"姓名: %s, 年龄: %d", name, age);
```

就是说，`sprintf` 会将格式化后的字符串写入到 `buffer` 中，而不是输出到控制台。返回值是写入的字符数（不包括终止的空字符）。
