// 计数排序——通用实现（可处理负数）

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(vector<int>& arr) {
    if (arr.empty()) return;

    // 1.找到最大值和最小值
    int maxVal = *max_element(arr.begin(),arr.end());
    int minVal = *min_element(arr.begin(),arr.end());

    // 2.计算数值范围，创建计数数组
    int range = maxVal - minVal + 1;
    vector<int> count(range,0);

    // 3.统计各元素出现的次数
    for (int num : arr) {
        count[num - minVal]++; //数值映射
    }

    // 4.计算累积次数（保持稳定性）
    // count[i]表示 小于等于‘i+minVal’（即从小到大的值）在
    // 排序后的最后一个位置索引 +1
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // 5.从后向前遍历原数组，并将它存入辅助数组（保持稳定性）
    vector<int> output(arr.size());
    for (int i = arr.size() - 1; i >= 0; i--) {
        int index = count[arr[i] - minVal] - 1;
        output[index] = arr[i];
        count[arr[i] - minVal]--;  //已经排序好了一个，故减少计数
    }

    // 6.复制回原数组
    arr = output;
}

// 测试通用版
// void testGeneral() {
//     std::vector<int> arr = {-5, -10, 0, -3, 8, 5, -1, 10};
//     std::cout << "原始数组: ";
//     for (int num : arr) std::cout << num << " ";
    
//     countingSort(arr);
    
//     std::cout << "\n排序后: ";
//     for (int num : arr) std::cout << num << " ";
//     std::cout << std::endl;
// }