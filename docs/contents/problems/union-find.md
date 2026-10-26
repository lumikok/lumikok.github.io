---
tags:
  - 刷题
  - 并查集
---
# 并查集

## P2097 资料分发 1

- **来源**：洛谷 [P2097 资料分发 1](https://www.luogu.com.cn/problem/P2097)，电脑之间用双向数据线连接，求至少向几台电脑输入数据才能覆盖全部电脑。
- **核心思路**：同一个连通分量内，输入一次即可互相传播；不同分量之间无法传播，所以每个分量至少需要输入一次，答案恰为连通分量数。初始化为 `n` 组，合并两个不同根时减一。
- **关键代码**：以下整理自训练文件 `01_date/2026-06/P2097.cpp`，补齐初始化与入口，保留原来的路径压缩和按秩合并。原变量 `size` 实际保存秩，不是集合元素数量，这里更名为 `treeRank`，同时避免与 C++17 的 `std::size` 同名。

```cpp
#include <iostream>
using namespace std;

int fa[100100], treeRank[100100];
int ans;

int find(int x) {
    if (x != fa[x]) fa[x] = find(fa[x]);
    return fa[x];
}

void unite(int x, int y) {
    int r1 = find(x), r2 = find(y);
    if (r1 == r2) return;
    if (treeRank[r1] < treeRank[r2]) {
        fa[r1] = r2;
    } else if (treeRank[r1] > treeRank[r2]) {
        fa[r2] = r1;
    } else {
        fa[r2] = r1;
        ++treeRank[r1];
    }
    --ans;
}

int main() {
    int n, m;
    cin >> n >> m;
    ans = n;
    for (int i = 1; i <= n; ++i) {
        fa[i] = i;
        treeRank[i] = 0;
    }
    while (m--) {
        int x, y;
        cin >> x >> y;
        unite(x, y);
    }
    cout << ans;
    return 0;
}
```

- **注意点**：只有两个根不同才减少分量数，重边、自环不会重复减一；相等秩合并后只增加新根的秩。这里的 `find` 使用**路径压缩**，不叫“状态压缩”。题目允许 `n=0`，此时无节点可合并，直接得到 `0`。
- **复杂度**：初始化 O(n)，路径压缩配合按秩合并后，每次操作摊还 O(α(n))，总时间 O(n+mα(n))，空间 O(n)。
