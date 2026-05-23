#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

long long movesCount = 0;

// 从最左边的柱子移到最右边的柱子
void move(vector<int>& left,vector<int>& right) {
    int disk = left.back();
    left.pop_back();
    right.push_back(disk);
    cout << "Move disk " << disk << " from left to right" << endl;
    movesCount++;
}

// 解f(n)
void hanoi(int n, vector<int>& left, vector<int>& mid, vector<int>& right) {
    if (n == 1) {
        move(left, right);
        return;
    }
    hanoi(n - 1, left, right, mid); // 将上面n-1个盘子从左柱子借助右柱子移到中柱子
    move(left, right);              // 将最底下的第n个盘子从左柱子移到右柱子
    hanoi(n - 1, mid, left, right); // 将中柱子的n-1个盘子借助左柱子移到右柱子
}

// 求解汉诺塔问题
void hanoiTower(int n) {
    vector<int> left, mid, right;
    for (int i = n; i >= 1; --i) {
        left.push_back(i); // 初始化左柱子，盘子从大到小编号
    }
    hanoi(n, left, mid, right);
}

int main() {
    int n;
    cout << "Enter the number of disks: ";
    cin >> n;
    hanoiTower(n);
    cout << "Total moves: " << movesCount << endl;
    return 0;
}