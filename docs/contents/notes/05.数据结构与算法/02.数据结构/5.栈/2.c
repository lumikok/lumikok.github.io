#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100
// 基于数组实现的栈

typedef struct {
    int *data;
    int size;
} ArrayStack;

ArrayStack *ArrayStackcreat() {
    ArrayStack *stack = malloc(sizeof(ArrayStack));
    stack->data = malloc(sizeof(int) * MAX_SIZE);
    stack->size = 0;
    return stack;
}

// 析构函数

void ArrayStackfree(ArrayStack *stack) {
    free(stack->data);
    //为什么要free这个data，因为stack只包含一个指针，指向data，但是动态数组data里的数据也是动态分配的内存，需要释放
    free(stack);
}

// 获取栈的长度

int size(ArrayStack *stack) {
    return stack->size;
}

// 判断栈是否为空

bool isEmpty(ArrayStack *stack) {
    return size(stack) == 0;
}

// 入栈操作

void ArrayStackPush(ArrayStack *stack,int num) {
    if (stack->size == MAX_SIZE) {
        printf("栈已满，无法入栈\n");
        return;
    }
    stack->data[stack->size] = num;
    stack->size++;
}

// 出栈操作

int ArrayStackPop(ArrayStack *stack) {
    if(stack->size == 0) {
        printf("栈为空，无法出栈\n");
        return -1; // 栈为空时返回-1
    }
    int val = stack->data[stack->size - 1];
    stack->size--;
    return val;
}

/* 出栈操作解释：这里把size这个计数器减一，
  看似没有把数据真正删除，但是返回的这个数据
  已经不在栈的范围内了，下一次入栈会覆盖掉这个数据，
  所以逻辑上来说这个数据已经被删除了。 */

// 访问栈顶元素

int ArrayStackPeak(ArrayStack *stack) {
    if (stack->size == 0) {
        printf("栈为空，无法访问栈顶元素\n");
        return -1; // 栈为空时返回-1
    }
    return stack->data[stack->size - 1];
}