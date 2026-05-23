#include <stdio.h>
#include <stdlib.h>

typedef struct ListNode{
    int val;
    struct ListNode *next;
} ListNode;

typedef struct LinkedList{
    ListNode *head;
} LinkedList;

// 初始化链表

LinkedList* initlist() {
    LinkedList* list = (LinkedList *)malloc(sizeof(LinkedList));
    list->head = NULL;
    return list;
}

// 插入节点

void insert_node_list(LinkedList *list,int data) {
    ListNode* newnode = (ListNode *)malloc(sizeof(ListNode));
    newnode->val = data;
    newnode->next = list->head;
    list->head = newnode;
}