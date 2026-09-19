#include <stdio.h>

void select_sort(int arr[],int size){
    for(int i = 0;i<size-1;i++){
        int min_index = i;
        for(int j = i+1;j<=size;j++){
            if(arr[j] < arr[min_index]){
                min_index=j;
                continue;
            }
        }
        int temp = arr[i];
        arr[i] = arr[min_index];
        arr[min_index] = temp;
    }
}

int main(){
    int arr[] = {5,2,9,1,6,3};
    int size = sizeof(arr)/sizeof(arr[0]);
    select_sort(arr,size);
    for(int i = 0;i<size;i++){
        printf("%d ",arr[i]);
    }
    return 0;
}