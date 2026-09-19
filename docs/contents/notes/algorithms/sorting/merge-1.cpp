/* 归并排序算法实现1：
1.合并函数 mergeArrays：
    - 输入：两个已排序的数组 left 和 right。
    - 输出：一个合并后的已排序数组 result。
    - 过程：使用两个指针 i 和 j 分别遍历 left 和 right 数组，比较当前元素大小，将较小的元素添加到 result 中，
            直到遍历完其中一个数组。然后将另一个数组的剩余元素全部添加到 result 中。
2.归并排序函数 mergesort：
    - 输入：一个未排序的数组 arr。
    - 输出：一个已排序的数组。
    - 过程：如果数组长度小于等于1，直接返回该数组（已排序）。否则，找到数组的中间点 mid，将数组分割为左半部分 left 和右半部分 right。
            递归调用 mergesort 对 left 和 right 进行排序，然后调用 mergeArrays 合并两个已排序的子数组，返回合并后的结果。
*/
#include <iostream>
#include <vector>
using namespace std;

// 合并函数（返回合并后的数组（已排序好））

vector<int> mergeArrays(const vector<int>& left,const vector<int>& right) {
    vector<int> result;
    int i = 0,j = 0;

    // 遍历比较并将较小的元素放入结果数组
    while(i < left.size() && j < right.size()) {
        if (left[i] < right[j]) {
            result.push_back(left[i]);
            i++;
        } else {
            result.push_back(right[j]);
            j++;
        }
    }

    // 添加剩余元素

    while (i < left.size()) {
        result.push_back(left[i]);
        i++;
    }
    while(j < right.size()) {
        result.push_back(right[j]);
        j++;
    }

    return result;
}

// 归并排序函数

vector<int> mergesort(const vector<int>& arr) {
    // 处理数组为空或者仅有一个元素的情况
    if (arr.size() <= 1) {
        return arr;
    }

    // 找到中间点
    int mid = arr.size() / 2;

    // 分割数组
    vector<int> left(arr.begin(),arr.begin() + mid);
    vector<int> right(arr.begin() + mid,arr.end());

    // 递归排序
    left = mergesort(left);
    right = mergesort(right);

    return mergeArrays(left,right);
}

// 测试代码

int main() {
    vector<int> arr = {38,27,43,3,9,82,10};
    cout << "Original array: ";
    for (int num : arr) {
        cout << num << " ";
    }
    vector<int> sortedArr = mergesort(arr);

    cout << "Sorted array: ";
    for (int num : sortedArr) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}