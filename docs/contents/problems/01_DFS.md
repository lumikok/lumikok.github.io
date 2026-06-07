---
tags:
  - 刷题
  - DFS
---
# DFS

## B 3862 图的遍历

- **掌握情况**：✅️；
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

**源程序**；

- **注意点**：
	- 判断大小是关键；
	- 遍历每个点结束后，一定要在这里重置 `vis` 数组；
	- `max_num` 初始化为当前节点；