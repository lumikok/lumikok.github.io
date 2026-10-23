---
title: 深度优先搜索
tags:
  - 刷题
  - DFS
---
# 深度优先搜索

## B 3862 图的遍历

- **来源**：洛谷 [B 3862](https://www.luogu.com.cn/problem/B3862)；
- **标签**：DFS，图；
- **核心思路**：

> 邻接表存图，标记是否到过，保存每次的最大值。

- **关键代码**：

```cpp
vector<int> graph[maxn];
bool vis[maxn];
int max_num = 0; 

// DFS函数核心
vis[u] = true;

if(u > max_num) max_num = u;

for(int v : graph[u]) {
    if(!vis[v]) dfs(v);
}

遍历每个点dfs即可
```

- **注意点**：
	- 判断大小是关键；
	- 遍历每个点结束后，一定要在这里重置 `vis` 数组；
	- `max_num` 初始化为当前节点；

## CF1676G：子树差值与答案计数

[White-Black Balanced Subtrees](https://codeforces.com/problemset/problem/1676/G) 给出以 `1` 为根的树、节点 `2..n` 各自的父节点，以及每个节点的黑白颜色，求黑白节点数相等的子树数量。这里的子树是“某节点及其所有后代”，不是任取一组连通节点。原题每组 `2<=n<=4000`。

### 返回差值，完成后判断当前子树

约定黑色贡献 `+1`，白色贡献 `-1`，则：

```text
diff(u) = 节点 u 的颜色贡献 + Σ diff(v)  // v 为 u 的直接孩子
```

孩子之间的子树不重叠，合并所有孩子的差值并计入自身后，所得差值就是当前整棵子树的黑节点数减白节点数；为零当且仅当该子树平衡。

因此 `dfs(u)` 只需返回差值，而 `ans` 另行统计有多少个节点的子树满足条件。必须在所有孩子返回后再判断，且每个节点只判断一次；不能把孩子已累计的平衡数量再重复加进共享答案。递归调用暂停、局部变量独立与返回摘要的机制见[深度优先搜索](../notes/algorithms/searching/06_DFS.md)。

例如根 `1` 为黑色、唯一孩子 `2` 为白色：节点 `2` 返回 `-1`，不是平衡子树；根合并后得到 `1+(-1)=0`，答案为 `1`。根返回的差值是 `0`，但最终答案不是 `0`，两者含义不同。

### 实现与边界

下面整理自训练文件 `01_date/2026-10/CF1676G.cpp`，保留原实现的父到子建树、局部差值、全局计数和多测重置，换用明确的标准头文件，删除未使用的类型别名并补充步骤注释；不是另一份参考算法替代原代码。

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

vector<vector<int>> g;
int ans;
string s;

int dfs(int u) {
    int diff = (s[u - 1] == 'B' ? 1 : -1);  // 1. 计入自身颜色。
    for (int v : g[u]) {
        diff += dfs(v);  // 2. 等孩子整棵子树处理完，再合并其差值。
    }
    if (diff == 0) ++ans;  // 3. 当前子树已完整，只在这里贡献一次计数。
    return diff;          // 4. 父节点需要的是差值，不是 ans。
}

void solve() {
    int n;
    cin >> n;
    ans = 0;  // 每组重新开始计数，不能沿用上一组答案。
    g.assign(n + 1, vector<int>());
    for (int i = 2; i <= n; ++i) {
        int parent;
        cin >> parent;
        g[parent].push_back(i);  // 输入已给父亲，只保存父到子的边。
    }
    cin >> s;
    dfs(1);
    cout << ans << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int testCount;
    cin >> testCount;
    while (testCount--) solve();
    return 0;
}
```

节点编号为 `1..n`，字符串下标为 `0..n-1`，所以颜色读取使用 `s[u-1]`。父子边只单向保存，从根出发不会走回父节点；若改成无向边输入，需要另行过滤父节点，不能原样使用这个循环。

官方三组样例输出为 `2、1、4`，对应的平衡子树根分别为 `{2,3}`、`{1}`、`{1,3,5,7}`。检查输出时应能指出哪些子树被计入，而不只是重复预期数字。叶子的差值为 `+1` 或 `-1`，不会被误计；全同色树的答案为零。多组数据还要同时清空答案与孩子列表。

每个节点访问一次、每条父子边合并一次，时间 O(n)；孩子列表与最坏调用栈合计空间 O(n)。链形树递归可达 `n` 层，运行环境的栈限制仍需留意。
