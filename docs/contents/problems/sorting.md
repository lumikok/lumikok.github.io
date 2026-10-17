---
title: 排序
---

# 排序

## CF1722D Line：把方向变化转为独立收益

[原题](https://codeforces.com/problemset/problem/1722/D)：一排人各朝左或朝右，每人贡献其朝向上其他人的数量。对每个 `k=1..n`，求至多改变 `k` 人方向后的最大总贡献。

### 先算原贡献，再算翻转收益

采用从 `0` 开始的下标。位置 `i` 左边有 `i` 人，右边有 `n-1-i` 人：

| 原方向 | 原贡献 | 翻转后的增量 |
| --- | --- | --- |
| L | i | (n-1-i)-i |
| R | n-1-i | i-(n-1-i) |

翻转只改变这个人的朝向，其他人的位置和左右人数不变，因此每项收益独立、可以相加。原总贡献加上被选翻转的收益，就是新总贡献。

把收益降序排列。对“至多 `k` 次”，只累加前 `k` 项中的正收益，零收益和负收益可以跳过。如果某个方案选了小收益却漏掉更大的收益，交换两项不会增加操作次数，也不会让总贡献变差；反复交换后即得到按收益从大到小选择的方案。

### 实现

下面从训练文件 `01_date/2026-10/CF1722D.cpp` 提取单组逻辑，保留原收益公式、降序排序与仅累加正收益的方式。原程序逐项输出，函数改为返回对应 `k=1..n` 的答案。

```cpp
#include <algorithm>
#include <functional>
#include <string>
#include <vector>
using namespace std;
using ll = long long;

vector<ll> bestLineValues(const string& directions) {
    int n = static_cast<int>(directions.size());
    vector<int> gain;
    ll total = 0;

    // 1. 统计原贡献，并计算每个人单独翻转的收益。
    for (int i = 0; i < n; ++i) {
        if (directions[i] == 'L') {
            total += i;
            gain.push_back(n - i - 1 - i);
        } else {
            total += n - i - 1;
            gain.push_back(i - (n - i - 1));
        }
    }

    // 2. 每个操作代价相同，按独立收益降序选择。
    sort(gain.begin(), gain.end(), greater<int>());
    vector<ll> answer;
    for (int k = 0; k < n; ++k) {
        if (gain[k] > 0) {
            total += gain[k];
        }
        answer.push_back(total);  // 此项对应至多 k + 1 次操作。
    }
    return answer;
}
```

例如 `LLR` 的原贡献为 `1`，收益为 `2, 0, 2`；排序后依次使用正收益，三个答案为 `3, 5, 5`。最后一个预算无需用满。`n=1` 时没有其他人，答案为 `0`。

排序决定总时间 O(n log n)，额外空间 O(n)。单项收益可用 `int`，总贡献必须使用 `long long`。这类收益排序依赖操作互不影响、成本相同；若一次操作会改变其他项的收益，就不能直接沿用这套证明。
