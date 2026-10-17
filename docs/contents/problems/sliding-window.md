---
title: 滑动窗口
---

# 滑动窗口

## CF580B Kefa and Company：排序后的合法区间

[原题](https://codeforces.com/problemset/problem/580/B)：每人有金钱 `money` 和非负友情值 `friendship`，选出的人的最大、最小金钱之差必须严格小于 `d`，目标是最大化友情值之和。题目保证至少一人、`d > 0`。

### 为什么可以选一个完整区间

按金钱排序后，若选中了两端的人，那么夹在两端之间的人不会扩大金钱差。友情值非负，把中间人全部补进来不会使答案变小，因此存在一个最优解是排序后的连续区间。

固定右端 `right`，把左端右移，直到 `money[right] - money[left] < d`。此时左端尽量靠左，合法区间尽量大；由于友情值非负，该区间的收益不小于同右端下任何更短合法区间。枚举全部右端即可覆盖最优解。

旧左端一旦超出差值限制，右端继续向右时不会重新合法，所以两端都只需向右移动。通用判断见[滑动窗口](../notes/algorithms/techniques/01_%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3.md)。

### 前缀和实现

下面从训练文件 `01_date/2026-10/CF580B.cpp` 的单组处理逻辑提取为函数，整理变量名与步骤注释，保留原来的“先处理首人，再扩张右端”及前缀和方案。

```cpp
#include <algorithm>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

// 前提：people 非空，d > 0，友情值非负；元素为 {金钱, 友情值}。
ll maxFriendship(vector<pair<ll, ll>> people, ll d) {
    sort(people.begin(), people.end());  // 1. 两个字段一起按金钱排序。
    int n = static_cast<int>(people.size());

    // 2. pre[i] 存前 i 人的友情值之和。
    vector<ll> pre(n + 1, 0);
    for (int i = 0; i < n; ++i) {
        pre[i + 1] = pre[i] + people[i].second;
    }

    int left = 0;
    int right = 0;
    ll best = people[0].second;  // 单人窗口合法，也覆盖 n == 1。
    while (right < n - 1) {
        ++right;
        // 3. 等于 d 也不合法，必须收缩到严格小于 d。
        while (people[right].first - people[left].first >= d) {
            ++left;
        }
        // 4. 闭区间 [left, right] 的收益。
        best = max(best, pre[right + 1] - pre[left]);
    }
    return best;
}
```

金钱差相等于 `d` 时必须收缩；同金钱者可以同选。所有友情值为零时答案为零。友情值总和可能超过 32 位整数，需要 `long long`。

若友情值允许为负，金钱差的双指针仍能维护合法范围，但把整个窗口全部选上未必最优。例如同金钱三人的友情值为 `5, -100, 6`，全选得 `-89`，跳过中间者可得 `11`。

排序 O(n log n)，前缀和与窗口扫描各 O(n)，总时间 O(n log n)，空间 O(n)。这里用 `pair` 保持每个人的字段对应，前缀和也必须按排序后的顺序建立。
