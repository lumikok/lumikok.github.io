// 基于数组实现基本队列

#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *nums;
    int size;
    int front;
    int capacity;
} ArrayQueue;

// 构造函数

ArrayQueue *creatqueue(int capacity) {
    ArrayQueue *queue =(ArrayQueue)malloc(sizeof(ArrayQueue));

    queue->capacity = capacity;
    queue->nums = (int)malloc(sizeof((int) * queue->capacity));
    queue->front = queue->size = 0;
    return queue;
}

// 析构函数

void freequeue(ArrayQueue *queue) {
    free(queue->nums);
    free(queue);
}

