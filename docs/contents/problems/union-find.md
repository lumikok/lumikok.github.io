---
tags:
  - 刷题
  - 并查集
---
# 并查集

## 基础

### 01.资料分发 1

- **掌握情况**：❌️；
- **来源**：洛谷 [P2097 资料分发1](https://www.luogu.com.cn/problem/P2097)；
- **标签**：并查集，图论；普及-；
- **核心思路**：

> 并查集按秩合并，统计不同组的个数 -> 默认为 n 组，可合并就 -1。

**并查集经典模板**。

-  **关键代码**：

```cpp
int find(int x) {
    if(x != fa[x]) {
        fa[x] = find(fa[x]);
    }
    return fa[x];
}

void unite(int x,int y) {
    int r1 = find(x);
    int r2 = find(y);
    if(r1 == r2) return;
    if(size[r1] < size[r2]) {
        fa[r1] = r2;
    } else if (size[r1] > size[r2]) {
        fa[r2] = r1;
    } else {
        fa[r2] = r1;
        size[r1]++;
    }
    ans--;
}
```

**源程序**；

- **注意点**：
	- 按秩合并用于提高性能；
	- `find(...)`： 状态压缩；