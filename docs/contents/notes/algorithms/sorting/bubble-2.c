#include <stdio.h>

void Bubble_sort(int arr[],int size){
    for (int i = size-1;i>0;i--){
        int flag = 0;
        for (int j = 0;j<i;j++){
            if(arr[j]>arr[j+1]){
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                flag = 1;
            }
        }
        if(!flag)
            break;
    }
}