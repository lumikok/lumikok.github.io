// 双向队列的实现

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>
// 双向链表节点

typedef struct DoublyListNode {
    int val;
    struct DoublyListNode *next,*prev;
} DoublyListNode;

// 初识化一个双向链表

DoublyListNode *newlistnode(int num) {
    DoublyListNode *new = (DoublyListNode *)malloc(sizeof(DoublyListNode));
    new->next = NULL;
    new->prev = NULL;
    new->val = num;
    return new;
}

// 析构函数(删除双向链表)

void delDoublyListNode(DoublyListNode *node){
    free(node);
}

// 基于双向链表构造双向队列

typedef struct {
    DoublyListNode *front,*rear;
    int quesize;
} LinkedListDeque;

// 初始化双向队列

LinkedListDeque *initDoublyDeque() {
    LinkedListDeque *deque = (LinkedListDeque *)malloc(sizeof(LinkedListDeque));
    deque->front = NULL;
    deque->rear = NULL;
    deque->quesize = 0;
    return deque;
}

// 析构函数

void delDeque(LinkedListDeque *deque) {

    for(int i = 0 ; i < deque->quesize && deque->front != NULL ; i++){
        DoublyListNode *temp = deque->front;
        deque->front = deque->front->next;
        free(temp);
    }
    free(deque);
}

// 获取队列长度

int gaindequesize(LinkedListDeque *deque) {
    return deque->quesize;
}

// 判断队列是否为空

bool emptyDeque(LinkedListDeque *deque) {
    return (gaindequesize(deque) == 0);
}


// 入队(引入bool，true指向front添加，false指向rear添加)

void push(LinkedListDeque *deque,int num,bool isFront) {
    DoublyListNode *node = newlistnode(num);

    if(emptyDeque(deque)) {
        deque->front = deque->rear = node;
    }

    else if(isFront) {
        deque->front->prev = node;
        node->next = deque->front;
        deque->front = node;
    }
    else {
        deque->rear->next = node;
        node->prev = deque->rear;
        deque->rear = node;
    }
    deque->quesize ++;
}

// 队首添加元素

void addfirst(LinkedListDeque *deque,int num) {
    push(deque,num,true);
}

// 队尾添加元素

void addfinal(LinkedListDeque *deque,int num) {
    push(deque,num,false);
}

// 访问队首元素

int peekFirst(LinkedListDeque *deque) {
    assert(gaindequesize(deque) && deque->front);
    return deque->front->val;
}

// 访问队尾元素

int peekLast(LinkedListDeque *deque) {
    assert(gaindequesize(deque) && deque->rear);
    return deque->rear->val;
}

// 出队(此处引入布尔值，将队首队尾出队写在一起，防止写重复代码)

int pop(LinkedListDeque *deque,bool isFront) {
    if(emptyDeque(deque))
        return -1;
    int val;
    // 队首出队
    if(isFront) {
        val = peekFirst(deque);
        DoublyListNode *fNext = deque->front->next;
        if(fNext) {
            fNext->prev = NULL;
            deque->front->next = NULL;
        }
        delDoublyListNode(deque->front);
        deque->front = fNext;
    }

    // 队尾出队

    else{
        val = peekLast(deque);
        DoublyListNode *lPrev = deque->rear->prev;
        if(lPrev) {
            lPrev->next = NULL;
            // 将删除节点处于“孤立”状态
            deque->rear->prev = NULL;
        }
        delDoublyListNode(deque->rear);
        deque->rear = lPrev;
    }
    deque->quesize--;
    return val;
}

// 队首出列

int popFirst(LinkedListDeque *deque) {
    return pop(deque,true);
}

// 队尾出列

int popLast(LinkedListDeque *deque) {
    return pop(deque,false);
}

// 打印队列

/* forward declaration to avoid implicit declaration error */
void printArray(int *arr,int size);

void printLinkedListDeque(LinkedListDeque *deque) {
    
    // 定义一个用于拷贝的数组（大小适当）
    int *arr = malloc(sizeof(int) * deque->quesize);
    
    int i;
    DoublyListNode *node;
    for(i =0,node = deque->front; i < deque->quesize; i++) {
        arr[i] = node->val;
        node = node->next;
    }
    printArray(arr,deque->quesize);
    free(arr);
}

// 打印数组

void printArray(int *arr,int size) {
    for (int i = 0;i<size;i++) {
        printf("%d\n",arr[i]);
    }
}



