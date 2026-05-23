#include <stdio.h>

void quicksort(int nums[],int left,int right) {
    if(left>=right) return;
        int i = left; // 小于基准的元素的最后一个位置
        int j = right; // 大于基准的元素的第一个位置
        while(i<j){
            while(i<j && nums[j] >= nums[left]){
                j--;
            }
            while(i<j && nums[i] <= nums[left]){
                i++;
            }
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
        int tem = nums[left];
        nums[left] = nums[i];
        nums[i] = tem;

        int pivot = i;
        quicksort(nums,left,pivot-1);
        quicksort(nums,pivot+1,right);
    
}

int main() {
    int nums[] = {3,6,8,10,1,2,1};
    int size = sizeof(nums)/sizeof(nums[0]);
    quicksort(nums,0,size-1);
    for(int i=0;i<size;i++){
        printf("%d ",nums[i]);
    }
    return 0;
}