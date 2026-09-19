#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int val;
    struct ListNode *next;
} ListNode;

typedef struct {
    ListNode *top;
    int size;
} Stack;

// 构造函数

Stack* stackCreate() {
    Stack *stack = (Stack *)malloc(sizeof(Stack));
    stack->top = NULL;
    stack->size = 0;
    return stack;
}

// 析构函数

void stackFree(Stack* stack) {
    whlie(stack->top){
        ListNode* temp = stack->top;
        stack->top = stack->top->next;
        free(temp);
    }
    free(stack);
}

// 获取栈的长度

int stackSize(Stack* stack) {
    return stack->size;
}

// 判断栈是否为空

bool stackIsEmpty(Stack* stack) {
    return stackSize(stack) == 0;
}

// 入栈操作

void stackPush(Stack* stack,int num) {
    ListNode* node = (ListNode*)malloc(sizeof(ListNode));
    node->val = num;
    node->next = stack->top;
    stack->top = node;
    stack->size++;
}

// 访问栈顶元素

int stackPeek(Stack* stack){
    if(stackIsEmpty(stack)){
        return -1; // 栈为空时返回-1
    }
    return stack->top->val;
}

// 出栈操作

int stackPop(Stack* stack) {
    if(stackIsEmpty(stack)){
        return -1; // 栈为空时返回-1
    }
    ListNode* temp = stack->top;
    int val = stackPeek(stack);
    stack->top = stack->top->next;
    free(temp);
    stack->size--;
    return val;
}