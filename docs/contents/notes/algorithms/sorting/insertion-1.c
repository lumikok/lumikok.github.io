#include <stdio.h>

void insert_sort(int arr[],int size){
    for(int i=1;i<size;i++){
        int base = arr[i],j = i-1;
        while(j >=0 && arr[j] > base){
            arr[j+1] = arr[j];
            j--;
        }
        // j就是前一个的下标，不满足前面大的条件了，直接把它插入到该数前面就行了
        arr[j+1] = base;
    }
}