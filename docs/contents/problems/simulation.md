---
title: 状态模拟
---

# 状态模拟

## P1518：联合状态与判环

[原题 P1518 两只塔姆沃斯牛](https://www.luogu.com.cn/problem/P1518)：在固定的 `10×10` 地图上，农夫与牛都从朝北开始。每分钟若前方可通行就前进一步，否则原地顺时针转向；双方同时行动，分钟末处于同一格才算相遇，途中交换位置不算。求相遇用时，无法相遇输出 `0`。

### 用完整状态判断循环

单方有 `10×10×4=400` 种位置与方向组合，双方联合状态最多 `400×400=160000` 种。障碍会减少可达状态，但这个上界足够。

固定地图、固定规则下，完整联合状态重复意味着后续也会重复。模拟时先检查是否已经相遇，再判断该联合状态是否访问过；若没有，就标记并推进一分钟。状态选择的理由和规则随奇偶变化的变式见[状态与转移](../notes/algorithms/techniques/03_状态与转移.md)。

### 实现

下面从训练文件 `01_date/2026-10/P1518.cpp` 提取模拟逻辑。原程序两次分别书写移动判断，这里用结构体和共用的单步函数去重；地图改为字符串容器，判重仍保存双方位置与方向，行动规则保持一致。参数要求十行、每行十个字符，并且恰有一个 `F` 和一个 `C`。

```cpp
#include <string>
#include <vector>
using namespace std;

struct Agent {
    int x, y, direction;  // 方向编号依次为北、东、南、西。
};

int meetingTime(const vector<string>& grid) {
    Agent farmer{0, 0, 0}, cow{0, 0, 0};
    for (int x = 0; x < 10; ++x) {
        for (int y = 0; y < 10; ++y) {
            if (grid[x][y] == 'F') farmer = {x, y, 0};
            if (grid[x][y] == 'C') cow = {x, y, 0};
        }
    }

    const int dx[] = {-1, 0, 1, 0};
    const int dy[] = {0, 1, 0, -1};
    bool seen[10][10][4][10][10][4] = {};
    auto step = [&](Agent& person) {
        int nx = person.x + dx[person.direction];
        int ny = person.y + dy[person.direction];
        // 转弯也消耗整整一分钟，转弯后本分钟不再前进。
        if (nx < 0 || nx >= 10 || ny < 0 || ny >= 10 || grid[nx][ny] == '*') {
            person.direction = (person.direction + 1) % 4;
        } else {
            person.x = nx;
            person.y = ny;
        }
    };

    int minutes = 0;
    while (true) {
        // 每轮都在同一时间点检查：双方上一分钟的行动均已完成。
        if (farmer.x == cow.x && farmer.y == cow.y) return minutes;
        if (seen[farmer.x][farmer.y][farmer.direction]
                [cow.x][cow.y][cow.direction]) return 0;
        seen[farmer.x][farmer.y][farmer.direction]
            [cow.x][cow.y][cow.direction] = true;

        step(farmer);
        step(cow);
        ++minutes;
    }
}
```

代码顺序调用两次 `step` 仍等价于同时行动：每个人的动作只读取自己的状态和静态地图，另一方不是障碍。必须等两次调用都结束后再检查相遇，不能在其中一方先移动后立刻判断；位置互换也不会被当成相遇。

### 容易遗漏的边界

- 用 `char g[10][10]` 逐行读入十字符字符串时，每行还要存结束符 `\0`，十列不够。原文件已改为 `g[11][11]`；这里的 `vector<string>` 也能避免这项容量错误。
- 判重数组保存的是联合状态，不是分别记录两方是否曾到过某格。
- 遇边界与遇障碍采用同一条转向规则；不能把地图里的初始 `F/C` 标记当作固定障碍。

按联合状态上界 `S` 计，最多访问 O(S) 个不同状态，每次只做常数次判断，因此时间、空间均为 O(S)。
