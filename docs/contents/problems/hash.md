---
title: 哈希统计
---

# 哈希统计

## CF1722C Word Game：出现次数何时等于人数

[原题](https://codeforces.com/problemset/problem/1722/C) 中三人各写 `n` 个长度为 `3` 的不同单词。仅一人写过的词得 `3` 分，两人写过则各得 `1` 分，三人都写过则不得分。

关键前提是**每个人内部的单词互不重复**。因此全局词频恰好等于写过该词的人数，可以先计数，再遍历每个人的词表计分。

下面从训练文件 `01_date/2026-10/CF1722C.cpp` 提取单组计分逻辑，保留词频表与三份词表的结构，改为函数输入、返回三人分数。

```cpp
#include <array>
#include <string>
#include <unordered_map>
#include <vector>
using namespace std;

// 前提：每人的词表内部互不重复。
array<int, 3> wordGameScores(const array<vector<string>, 3>& words) {
    unordered_map<string, int> freq;
    // 1. 汇总词频；本题每个人对同一个词最多贡献 1 次。
    for (int person = 0; person < 3; ++person) {
        for (const string& word : words[person]) {
            ++freq[word];
        }
    }

    // 2. 按各自写下的词计分。这里的键都已在建表阶段插入。
    array<int, 3> score = {0, 0, 0};
    for (int person = 0; person < 3; ++person) {
        for (const string& word : words[person]) {
            if (freq[word] == 1) {
                score[person] += 3;
            } else if (freq[word] == 2) {
                score[person] += 1;
            }
        }
    }
    return score;
}
```

例如三人分别写 `abc`、`def`、`abc`，则 `abc` 出现 `2` 次，`def` 出现 `1` 次，分数为 `1, 3, 1`。每组调用都建立新的表与分数，避免多组数据串状态。

如果题目改成允许同一个人重复写词，直接统计会把“次数”错当“人数”。例如第一人写两次 `abc`、第二人写一次，实际参与人数为 `2`，原始词频却是 `3`。此时应先对每个人分别去重，再统计人数；计分也遍历去重后的个人词表。只做一次全局去重无法保留谁写过该词的信息。

设全局不同单词数为 `U`。本题单词长度固定，平均时间 O(n)，严重哈希冲突下可给出 O(nU) 的最坏上界，`U <= 3n`。词频表额外空间 O(U)，连同输入词表共 O(n)。只读查询与缺键插入的区别见[哈希表](../notes/algorithms/data-structures/hash-table/哈希表.md)。
