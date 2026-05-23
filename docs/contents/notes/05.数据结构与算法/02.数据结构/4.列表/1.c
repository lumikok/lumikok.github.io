#include <stdio.h>
#include <assert.h>
#include <stdlib.h>

// 定义结构体
typedef struct {
    int *arr;
    int capacity;
    int currentsize;
    int extendRatio;
} MyList;

//定义函数，该函数获得初识列表

MyList *Newlist(){
    MyList *nums = malloc(sizeof(MyList));//结构体首先要分配内存
    nums->capacity = 10;
    nums->arr = (int *)malloc(sizeof(int));//动态数组的实现需要分配内存
    nums->currentsize = 0;
    nums->extendRatio = 2;
    return nums;
}

// 释放内存（析    构）

void deletelist(MyList *nums){
    free(nums->arr);//先释放所定义列表中的一个动态数组
    free(nums);//再把整个列表进行释放。
}


// 定义函数，获得函数当前容量和当前含有元素个数

int Currentcapacity(MyList *nums){
    int n = nums->capacity;
    return n;
}

int Currentsize(MyList *nums){
    return nums->currentsize;
}

//定义函数，扩容列表

void ExtendList(MyList *nums){
    int NewCapacity = Currentcapacity(nums) * (nums->extendRatio);

    // 这个定义的extend是暂存，最后仍是回归到nums
    int *extend = (int *)malloc(sizeof(int) * NewCapacity);
    int *temp = nums->arr;

    // 把原数组中的所有已存在的元素拷贝到extend里面

    for(int i = 0;i<Currentsize(nums);i++){
        extend[i] = nums->arr[i];
    }

    // 这里释放原数组内存

    free(temp);

    // 更新即可(已经释放了原有函数的内存，这是直接将分配好的extend直接给nums即可)

    nums->arr = extend;
    nums->capacity = NewCapacity;
}

// 定义函数，访问或更新列表元素

int get(MyList *nums,int index){
    assert(index >=0 && index <Currentsize(nums));
    return nums->arr[index];
}

void set(MyList *nums,int index,int num){
    assert(index >=0 && index <Currentsize(nums));
    nums->arr[index] = num;
}

// 定义函数，在尾部添加元素

void add(MyList *nums,int num){
    if(Currentsize(nums) == Currentcapacity(nums)){
        ExtendList(nums);
    }
    nums->arr[nums->currentsize] = num;
    nums->currentsize++;
}

// 定义函数，在指定位置插入元素

void insert(MyList *nums,int index,int num){
    assert(index >=0 && index < Currentsize(nums));
    if(Currentsize(nums) == Currentcapacity(nums)){
        ExtendList(nums);
    }
    for(int i = Currentsize(nums);i>index;i--){
        nums->arr[i] = nums->arr[i-1];
    }
    nums->arr[index] = nums;
    nums->currentsize++;
}

// 定义函数，删除指定位置元素

void delete(MyList *nums,int index){
    assert(index >=0 && index < Currentsize(nums));
    for(int i = index;i < Currentsize(nums)-1;i++){
        nums->arr[i] = nums->arr[i+1];
    }
    nums->currentsize--;
}

// 定义函数，将列表转换成数组

int *toArray(MyList *nums){
    return nums->arr;
}



