#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

// 获取最大数字的位数
int getmaxDigits(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(),arr.end());
    int digits = 0;

    while(maxVal > 0) {
        digits++;
        maxVal /= 10;
    }
    return digits;
}

// 获取数字num在exp位的数字
int getDigit(int num,int exp) {
    return (num / exp) % 10;
}

// 计数排序（保持稳定性）
void countingSort(vector<int>& arr,int exp) {
    int n = arr.size();   //获取原数组长度，用于确定计数循环次数
    vector<int> output(n);   //存放排序后的结果
    vector<int> count(10,0); //计数数组（0~9）,索引就是对应的值

    // 1.统计每个数字出现的次数
    for (int i = 0; i < n;i++) {
        int digit = getDigit(arr[i],exp);
        count[digit]++;  
    }

    // 2.计算累积次数（确定最终正确的位置）
    for (int i = 1;i < 10;i++) {
        count[i] += count[i-1]; //count[i]小于等于i的数的累积次数
    }
    
    // 3.从后向前遍历原数组
    for (int i = n - 1;i >= 0;i--) {
        int digit = getDigit(arr[i],exp);
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // 4.将排序结果复制回原数组
    for (int i = 0;i < n;i++) {
        arr[i] = output[i];
    } 
}

// LSD基数排序（从低位到高位）
void radixSort(vector<int>& arr) {
    if (arr.empty()) return;

    // 获取最大数的位数
    int maxDigits = getmaxDigits(arr);

    // 对每一位进行排序
    for (int exp = 1;maxDigits > 0; exp *= 10,maxDigits--) {
        countingSort(arr,exp);

        // 可选：打印每一轮排序后的结果
        cout << "按第" << exp << "位排序后: ";
        for (int num : arr) cout << num << " ";
        cout << endl;
    }
}

// 测试函数
void testRadixSort() {
    vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};
    
    cout << "原始数组: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    
    radixSort(arr);
    
    cout << "\n排序后数组: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
}

int main() {
    testRadixSort();
    return 0;
}