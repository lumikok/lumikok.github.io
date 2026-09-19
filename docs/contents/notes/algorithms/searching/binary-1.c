//实现二分查找
#include <stdio.h>
#include <stdlib.h>

int binarysearch(int *arr,int len,int target)
{
    int left=0;
    int right=len-1;
    while(left<=right){
        int m=left+(right-left)/2;
        if(arr[m]>target){
            right=m-1;
        }
        else if(arr[m]<target){
            left=m+1;
        }
        else return m;//找到了，返回索引
        }
    
    return -1;//未找到所需元素
    
}
int main()
{
    int n;
    printf("请输入数组的长度：");
    scanf("%d",&n);
    int *array = (int *)malloc(n * sizeof(int));
    
    //用于判断内存分配是否成功
    if(array == NULL){
        printf("内存分配失败！");
        return 1;
    }
    printf("请输入数组总共%d个元素(按从小到大顺序排列):\n",n);
    for(int i=0;i<n;i++){        
        scanf("%d",&array[i]);
    }
    printf("\n");

    //主要部分写完了，以下是二分查找法的运用。
    int m;
    int target;
    printf("请输入要查找的元素：");
    scanf("%d",&target);
    m = binarysearch(array,n,target);
    printf("你所要查找的元素是该数组第%d个元素",m+1);
    free(array);
    return 0;
}