// 计数排序——基础实现(仅处理非负整数)

#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

void countingSort(vector<int>& arr) {
    if (arr.empty()) return;

    // 1.寻找最大值，确定计数数组大小
    int maxVal = *max_element(arr.begin(),arr.end());

    // 2.创建计数数组并初始化为0
    vector<int> count(maxVal + 1,0);

    // 3.统计各元素的出现次数
    for (int num : arr) {
        count[num]++;
    }

    // 4.重构排序数组
    int index = 0;
    for (int i = 0; i <= maxVal; i++) {
        while(count[i] > 0) {
            arr[index] = i;
            index++;
            count[i]--;
        }
    }
}

// 测试函数
// void testBasic() {
//     std::vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
//     std::cout << "原始数组: ";
//     for (int num : arr) std::cout << num << " ";
    
//     countingSort(arr);
    
//     std::cout << "\n排序后: ";
//     for (int num : arr) std::cout << num << " ";
//     std::cout << std::endl;
// }