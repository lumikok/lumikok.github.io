---
title: 差分
---

# 差分

## CF295A Greg and Array：先统计操作次数

[原题](https://codeforces.com/problemset/problem/295/A) 给定长度为 `n` 的数组和 `m` 条区间加操作。第 i 条操作给 `[l[i],r[i]]` 加 `d[i]`；每个请求 `[x,y]` 要把编号在该区间内的操作各执行一次，最后输出数组。

直接按请求逐条执行操作会重复处理相同贡献。由于操作都是加法，可以先算每条操作总共执行几次，再把它的贡献合并到原数组。

### 两层处理顺序

第一层在**操作编号**上差分：请求 `[x,y]` 让该范围中的执行次数加一。累计后得到 `cnt[i]`，第 i 条操作便等价于向原数组区间加 `cnt[i] × d[i]`。

第二层在**原数组位置**上差分：把上述加权贡献更新到 `l[i]` 与 `r[i]+1`，最后累计还原数组。两层下标的含义、加权请求例子及两种初始化口径见[前缀和与差分的联系](../notes/algorithms/techniques/preprocessing/03_前缀和与差分的联系.md)。

### 实现

下面整理自训练文件 `01_date/2026-10/CF295A.cpp`，保留原数组差分初始化、操作结构体、两层差分与最终还原的实现；调整了排版与变量注释，并使用所需的标准头文件。

```cpp
#include <iostream>
#include <vector>
using namespace std;
using ll = long long;

struct Operation {
    int l, r;
    ll d;
};

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<ll> a(n + 2, 0), diff(n + 2, 0);
    vector<Operation> ops(m + 2);
    vector<ll> opDiff(m + 2, 0), cnt(m + 2, 0);

    // 1. 在原数组位置上初始化差分，保留初值。
    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        diff[i] = a[i] - a[i - 1];
    }
    for (int i = 1; i <= m; ++i) {
        cin >> ops[i].l >> ops[i].r >> ops[i].d;
    }

    // 2. 请求影响的是操作编号区间，不是原数组区间。
    for (int i = 0; i < k; ++i) {
        int x, y;
        cin >> x >> y;
        ++opDiff[x];
        --opDiff[y + 1];
    }
    for (int i = 1; i <= m; ++i) {
        cnt[i] = cnt[i - 1] + opDiff[i];
    }

    // 3. 按执行次数合并贡献，更新原数组差分。
    for (int i = 1; i <= m; ++i) {
        ll delta = ops[i].d * cnt[i];
        diff[ops[i].l] += delta;
        diff[ops[i].r + 1] -= delta;
    }

    // 4. 初值已包含在 diff 中，累计后直接输出最终值。
    for (int i = 1; i <= n; ++i) {
        a[i] = a[i - 1] + diff[i];
        cout << a[i] << ' ';
    }
    return 0;
}
```

以 `n=1`、初值为 `1`、唯一操作给 `[1,1]` 加 `1`、唯一请求执行 `[1,1]` 为例，答案是 `2`。`y+1` 与 `r+1` 都落到各自预留的位置 `2`，仍不需要特殊分支。

三段主要扫描分别按请求数 `k`、操作数 `m`、数组长度 `n` 进行，总时间 O(n+m+k)，额外空间 O(n+m)。原题单条操作的加权增量可达到 `10^10`，同一位置累计可达到 `10^15`，因此不能使用 32 位整数保存乘积或最终值。
