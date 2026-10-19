---
title: 线性动态规划
---

# 线性动态规划

## Frog 1→Frog 2：按最后一步分类

[Frog 1](https://atcoder.jp/contests/dp/tasks/dp_a) 每次能向前跳一块或两块石头；[Frog 2](https://atcoder.jp/contests/dp/tasks/dp_b) 把范围改为一到 `K` 块。一次跳跃费用都是两块石头高度差的绝对值，目标为从第一块到最后一块的最小总代价。两题均保证 `N>=2`，Frog 2 保证 `K>=1`。

### 状态、最后一步与计算顺序

采用从 `1` 开始的下标，定义 `dp[i]` 为从第一块到第 `i` 块的最小总代价。到达同一石头后，后续选择与增量费用相同，所以只保留最小代价即可，理由见[状态与转移](../notes/algorithms/techniques/03_状态与转移.md)。

Frog 1 中，任何到达 `i` 的路线，其最后一步必定来自 `i-1` 或 `i-2`。因此：

```text
dp[1] = 0
dp[2] = |h[2] - h[1]|
dp[i] = min(dp[i-1] + |h[i] - h[i-1]|,
            dp[i-2] + |h[i] - h[i-2]|)       // i >= 3
```

每个候选既包含到达前驱的费用，也包含最后一跳的费用；不能只比较最后一跳哪个更便宜。前驱编号都比当前编号小，因此从小到大计算时，依赖项已经求出。

高度为 `[10,30,40,20]` 时，路线 `1→2→4` 的费用为 `20+10=30`。

### 推广到 K 个前驱

Frog 2 保持同一个状态，只把前驱范围推广为：

```text
max(1, i-K) <= j < i
dp[i] = min(dp[j] + |h[i] - h[j]|)          // 枚举上述 j
```

下界取 `max(1,i-K)` 避免访问零号或负下标；每个新状态要先设为足够大的值，再取所有候选的最小值。若初始化为零，正费用候选就无法更新它。

下面整理自训练文件 `01_date/2026-10/AT_dp_a.cpp` 和 `AT_dp_b.cpp`，采用后者的前驱循环提取为函数；Frog 1 传入 `k=2`，无需另写第二份实现。`h[0]` 为占位，合法高度在 `h[1..n]`，保留原题高度范围 `1..10000`。

```cpp
#include <algorithm>
#include <climits>
#include <cstdlib>
#include <vector>
using namespace std;
using ll = long long;

// 前提：h 按 1 起始存储，n >= 2，k >= 1。
ll minJumpCost(const vector<int>& h, int k) {
    int n = static_cast<int>(h.size()) - 1;
    vector<ll> dp(n + 1, 0);
    dp[1] = 0;

    for (int i = 2; i <= n; ++i) {
        dp[i] = LLONG_MAX;  // 1. 为当前状态重新开始取最小值。
        for (int j = max(1, i - k); j < i; ++j) {
            ll cost = abs(h[i] - h[j]);
            // 2. 到达前驱的最优费用，加上最后一跳费用。
            dp[i] = min(dp[i], dp[j] + cost);
        }
    }
    return dp[n];
}
```

由于 `K>=1` 且允许跳一块，每个前驱都可从起点到达。按从小到大的顺序计算时，`dp[j]` 已是有限值，本题不会计算 `LLONG_MAX + cost`。如果另一个问题存在不可达前驱，就必须先排除无穷值再做加法，不能直接照抄。

`N=2`、相同高度、`K=1` 和 `K` 大于当前可用前驱数，都由这套循环覆盖。Frog 1 时间 O(N)；Frog 2 时间上界 O(NK)，两者空间均为 O(N)。这里保留一维数组便于逐状态检查，不额外展开其他 DP 模型。
