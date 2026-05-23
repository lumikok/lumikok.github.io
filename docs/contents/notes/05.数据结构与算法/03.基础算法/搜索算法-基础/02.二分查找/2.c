//实现二分查找插入点

# include <stdio.h>
int searchInsert(int *array, int len, int target){
    int left = 0;
    int right = len - 1;
    while(left <= right){
        int mid = left + (right - left)/2;
        if(array[mid] == target)
            return mid;
        else if(array[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
            //以上代码与二分查找目标相同
    }
    return left;//不存在目标，返回插入位置
}

int main(){
    int array[] = {1,3,5,7,9,11};
    //计算数组长度
    int len = sizeof(array)/sizeof(array[0]);
    int target;
    scanf("%d", &target);
        //获得插入位置
    int index = searchInsert(array, len, target);
    printf("The insert position is: %d\n", index);
}