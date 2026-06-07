---
tags:
  - 刷题
  - BFS
---
# BFS

## 基础

### 01.马的遍历

- **掌握情况**：✅️；
- **来源**：洛谷 [P 1443 马的遍历](https://www.luogu.com.cn/problem/P1443)；
- **标签**：BFS，队列；普及-；
- **核心思路**：

> 马的移动方向有八个，距离数组初始化 -1（未到达），初始点设为 0。

**经典 BFS 目标点最短路径**

-  **关键代码**：

```cpp
int dx[] = {1,1,-1,-1,2,2,-2,-2};
int dy[] = {2,-2,2,-2,1,-1,1,-1};

// 二维坐标处理技巧
queue<pair<int,int>> q;
board[x][y] = 0;
q.push({x,y});
while(!q.empty()) {
    auto cur = q.front();
    q.pop();
    int nx = cur.first;
    int ny = cur.second;
    for(八个方向) {
        int ax = nx + dx[i];
        int ay = ny + dy[i];
        if(边界内&& board[ax][ay] == -1) {
            board[ax][ay] = board[nx][ny] + 1;
            q.push({ax,ay});
        }
    }
}
// 初始化数组的技巧
memset(board,-1,sizeof(board)) 
```

**源程序**；

- **注意点**：
	- 方向数组不要写错；
	- 处理二维坐标类的技巧（pair）；
	- 条件判断写全，别出错；
	- 初始化数组的技巧（memset）；