#include <stdio.h>
#include <stdlib.h>

// 定义节点结构体

typedef struct Node{
    int data;
    struct Node* next;
}Node;

// 定义链表头指针结构体

typedef struct LinkedList{
    Node* head;
}LinkedList;

// 初始化链表

LinkedList* initlist(){
    LinkedList* list = (LinkedList*)malloc(sizeof(LinkedList));
    list->head = NULL;
    return list;
}

// 插入节点

void insertlist(LinkedList* list,int data){
    Node* newnode = (Node*)malloc(sizeof(Node));
    newnode->data = data;
    newnode->next = list->head;//新节点指向原来的头节点：新节点成为新的头节点，原头节点变为第二个节点
    list->head=newnode;//更新头节点指针
}

// 打印链表

void printlist(LinkedList* list){
    Node* current = list->head;
    while(current != NULL){
        printf("%d ->",current->data);
        current = current->next;
    }
    printf("NULL\n");
}

// 删除链表

void freelist(LinkedList* list){
    Node* current = list->head;
    Node* nextnode;
    while(current != NULL){
        nextnode = current->next;
        free(current);
        current=nextnode;
    }
}

// 测试代码

int main()
{
    LinkedList* list = initlist();
    int n;
    printf("请输入想要往链表里添加的数据数量：");
    scanf("%d",&n);
    printf("依次输入数据:\n");
    for(int i=0;i<n;i++){
        int m=0;
        scanf("%d",&m);
        insertlist(list,m);
    }
    printlist(list);
    freelist(list);
    free(list);
    return 0;
}