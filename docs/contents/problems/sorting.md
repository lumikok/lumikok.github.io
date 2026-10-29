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

## 月赛 D：排序与首个可行位置

SWJTU ACM2026 月赛 D「chil[D]hood’s end」（2026-10-25）：给定舱室容量与碎片大小，每次查询找不超过容量的最大碎片；大小相同取最小原编号，无解输出 `0 0`。查询相互独立，同一碎片可以重复选中。题面范围为 `1<=n,m<=200000`，容量为 `0..10^9`，碎片大小为 `1..10^9`。

### 排序规则与查询边界配套

先保存原编号，按“大小降序、同大小编号升序”排序。不能只比较大小并假定同值记录仍按输入顺序排列，理由见[多关键字排序](../notes/algorithms/sorting/08_排序实现中的区间、不变量、稳定性与退化.md#踩坑-5-把并列要求落实为第二关键字)。

对容量 `capacity`，排好序的碎片形成“太大、太大、……、可以放下、可以放下”的分界：

- 当前碎片太大，只有右侧更小的值可能满足，令 `left=mid+1`。
- 当前碎片能放下，它可能就是第一个合适位置，令 `right=mid`。

第一个合适位置的大小最大，且同值时原编号最小。如果所有碎片都太大，这套闭区间循环仍会停在最后一个位置，因此结束后必须再检查能否放下，不能直接输出。

### 整理实现

下面从训练文件 `01_date/2026-10/yuesai/d.cpp` 提取单批查询为函数，保留最终比较规则与二分循环，重命名记录、返回结果数组，并将末尾无解判断简化为直接检查候选大小。`sizes` 非空，与原题 `m>=1` 一致。

```cpp
#include <algorithm>
#include <utility>
#include <vector>
using namespace std;

struct Fragment {
    long long size;
    int index;
};

vector<pair<long long, int>> chooseFragments(
    const vector<long long>& capacities, const vector<long long>& sizes) {
    vector<Fragment> fragments;
    for (int i = 0; i < static_cast<int>(sizes.size()); ++i) {
        fragments.push_back({sizes[i], i + 1}); // 1. 排序前保存原编号。
    }
    sort(fragments.begin(), fragments.end(), [](const Fragment& a, const Fragment& b) {
        if (a.size != b.size) return a.size > b.size;
        return a.index < b.index; // 2. 显式落实同值时的编号要求。
    });

    vector<pair<long long, int>> answer;
    for (long long capacity : capacities) {
        int left = 0, right = static_cast<int>(fragments.size()) - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (fragments[mid].size > capacity) left = mid + 1;
            else right = mid; // 3. 保留第一个能放下的位置。
        }
        if (fragments[left].size > capacity) answer.push_back({0, 0});
        else answer.push_back({fragments[left].size, fragments[left].index});
    }
    return answer; // 查询不删除碎片，后续可以再次选中同一编号。
}
```

题面例子中，碎片大小 `[3,8,5,5,2,9]`，容量 `5` 应返回 `(5,3)`，而不是 `(5,4)`；容量 `7` 仍返回 `(5,3)`，能同时检查重复值与查询独立性。容量小于所有碎片（包括 `0`）时返回 `(0,0)`；只有一个碎片也要执行末尾判断。

排序时间 O(m log m)，`n` 次查询 O(n log m)，总空间 O(n+m)，包含保存的查询结果。值相同只影响第二关键字，不破坏按大小形成的单调分界。
