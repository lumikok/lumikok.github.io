// 递归实现二分查找 
#include <iostream>
#include <vector>
using namespace std;
 

int BinarySearch(vector<int>& nums,int target,int i,int j) {
    if (i > j) {
        return -1;
    }

    int mid = i + (j - i)/2;
    if (nums[mid] > target) {
        return BinarySearch(nums,target,i,mid - 1);
    } else if (nums[mid] < target) {
        return BinarySearch(nums,target,mid + 1,j);
    } else {
        return mid;
    }
}

int BinarySearch(vector<int>& nums,int target) {
    if (nums.empty()) return -1;

    return BinarySearch(nums,target,0,nums.size() - 1);
}

int main()
{
    vector<int> nums;
    for (int i = 0;i < 10;i++) {
        nums.push_back(i+1);
    }
    int t = BinarySearch(nums,9);
    cout << t << endl;
    return 0;
}