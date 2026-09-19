// 动态数组（C）
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n;
    printf("请输入数组要存入的数的数量：");
    scanf("%d",&n);
    int* nums = (int *)malloc(n * sizeof(int));
    printf("请输入你要存入的%d个数\n",n);
    for(int i = 0 ; i < n ; i++) {
        scanf("%d",&nums[i]);
    }
    printf("你创建的数组是：\n");
    for(int i=0 ; i<n ; i++) {
        printf("%d\n",nums[i]);
    }
    free(nums);
    return 0;
}