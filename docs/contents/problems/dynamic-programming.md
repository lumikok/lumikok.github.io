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

## CF455A：按数值聚合，而不是按原序列位置转移

[Boredom](https://codeforces.com/problemset/problem/455/A) 每次选取一个数值 `x`，获得 `x` 分并删除该元素，同时删除所有值为 `x-1`、`x+1` 的元素，目标是最大化总得分。原题 `n<=100000`，数值在 `1..100000`。

### 先判断冲突发生在哪里

冲突由数值是否相邻决定，与元素在输入中的位置无关。相同数值之间互不冲突，且分数为正：一旦选择数值 `x`，就可以把所有 `x` 都选完，总收益为 `weight[x]=x*cnt[x]`。于是只需决定选哪些互不相邻的数值，不必保留原序列顺序。

定义 `dp[i]` 为**只使用数值 `1..i` 能获得的最大总收益**。与 Frog 中“到达第 `i` 块石头”的状态不同，这里的 `i` 是数值范围的右边界，不是原数组下标，也不代表一定选了 `i`。

按是否选择数值 `i` 分成两类：

- 不选 `i`：最优值为 `dp[i-1]`。
- 选 `i`：不能选 `i-1`，但 `1..i-2` 可自由取得最优值，因此为 `dp[i-2]+i*cnt[i]`。

所以 `dp[i]=max(dp[i-1],dp[i-2]+i*cnt[i])`。其中 `dp[i-2]` 不等于“必须选择数值 `i-2`”；它可能来自更早的数值组合。不存在的数值保留 `cnt[i]=0`，数值轴仍按整数递增处理，不能把缺失值压掉后把新的相邻位置误当成相邻数值。

### 初值、实现与边界

下面从训练文件 `01_date/2026-10/CF455A.cpp` 提取整理：保留计数与递推，改用局部动态数组，以 `dp[0]=0`、`dp[1]=cnt[1]` 后从 `2` 开始转移，避免单独处理 `dp[2]`。不是原源码的逐字复制。

```cpp
#include <algorithm>
#include <vector>
using namespace std;

// 前提：values 非空，元素在 [1,100000] 内。
long long maxBoredomScore(const vector<int>& values) {
    int maximum = *max_element(values.begin(), values.end());
    vector<long long> cnt(maximum + 1, 0), dp(maximum + 1, 0);
    for (int x : values) ++cnt[x];  // 1. 把相同数值聚合到同一位置。

    dp[0] = 0;
    dp[1] = cnt[1];  // 2. 只有数值 1 可用时，取完所有 1。
    for (int i = 2; i <= maximum; ++i) {
        // 3. 比较不选 i，以及排除 i-1 后取完所有 i。
        long long take = dp[i - 2] + cnt[i] * i;
        dp[i] = max(dp[i - 1], take);
    }
    return dp[maximum];
}
```

例如 `[1,2,3]` 中选 `1` 和 `3` 得 `4`，优于只选 `2`；`[2,2,4]` 可全部选取，得到 `8`，说明应按数值差一判断冲突，而非按输入位置相邻判断。

`M=1` 时循环不执行，答案为 `cnt[1]`；`M=2` 时比较两组的总收益即可。收益可达 `n*max(a_i)=10^10`，计数乘法与 DP 都应使用 64 位整数。设最大数值为 `M`，时间 O(n+M)，空间 O(M)。
