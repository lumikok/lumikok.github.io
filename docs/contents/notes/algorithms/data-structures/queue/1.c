// 基于链表实现基本队列

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct {
    int data;
    struct ListNode *next;
} ListNode;

typedef struct {
    ListNode *front,*rear;
    int size;
} LinkedListQueue;

// 构造函数

LinkedListQueue *initqueue(){
    LinkedListQueue *queue = (LinkedListQueue *)malloc(sizeof(LinkedListQueue));
    queue->front = NULL;
    queue->rear = NULL;
    queue->size = 0;
    return queue;
}

// 析构函数

void freequeue(LinkedListQueue *queue) {
    while(queue->front != NULL){
        LinkedListQueue *temp =queue->front;
        queue->front = queue->front->next;
        free(temp);
    }
}

// 获取队列长度

int size(LinkedListQueue *queue) {
    return queue->size; 
}

// 判断是否为空

bool isempty(LinkedListQueue *queue) {
    return queue->size == 0;
}

// 入队

void push(LinkedListQueue *queue,int data) {
    ListNode *newnode = (ListNode *)malloc(sizeof(ListNode));
    newnode->data = data;
    newnode->next = NULL;
    if(queue->front == NULL){
        queue->front = newnode;
        queue->rear = newnode;
    }
    else {
        queue->rear->next = newnode;
        queue->rear = newnode;
    }
    queue->size++;
}

// 出队

int pop(LinkedListQueue *queue) {
    int num = queue->front->data;
    ListNode *temp = queue->front;
    queue->front = queue->front->next;
    free(temp);
    queue->size--;
    return num;
}

// 访问队首元素

int peek(LinkedListQueue *queue) {
    assert(queue->front && size(queue));
    return queue->front->data;
}

// 打印队列（转化为数组后打印）

void print(LinkedListQueue *queue) {
    int *arr = (int *)malloc(sizeof(int) * size(queue));
    ListNode *current = queue->front;
    for(int i = 0; i < size(queue); i++) {
        arr[i] = current->data;
        current = current->next;
    }
    printf("队列元素：");
    for(int i = 0; i < size(queue); i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    free(arr);
}