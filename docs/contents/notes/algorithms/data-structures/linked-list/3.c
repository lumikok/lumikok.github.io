#include <stdio.h>
#include <stdlib.h>

typedef struct Node{
    int data;
    struct Node* next;
} Node;

// 创建单向链表（先入先出），带有附加头节点

Node* createlinkedlist() {
    Node *head = (Node*)malloc(sizeof(Node));
    head->next = NULL;
    Node *tail = head;

    int value;

    while(1) {
        scanf("%d",&value);
        if (value == 0) {
            break;
        }
        Node *newnode = (Node *)malloc(sizeof(Node));
        newnode->data = value;
        newnode->next = NULL;

        tail->next = newnode; //将新节点插入到链表尾部
        tail = newnode; //更新尾节点
    }
    return head;
}

// 输出当前链表

void printlist(Node *head) {
    Node *current = head->next; //跳过附加头节点

    if(current == NULL) {
        printf("链表为空\n");
        return;
    }

    while(current != NULL) {
        printf("%d",current->data);
        if(current->next != NULL) {
            printf("->");
        }
        current = current->next;
    }
    printf("\n");
}

// 删除要删的数（整合所有输出操作)

void delete_value_list(Node *head,int value) {
    Node *prev = head; //前驱节点（用于删除对应节点）
    Node *current = head->next;

    while(current != NULL) {
        if (current->data == value) {
            prev->next = current->next;
            free(current);
            printlist(head);
            return;
        } 
        prev = current;
        current = current->next;
    }

    printf("未找到要删除的整数\n");
    printlist(head);
    return;
}

// 释放整个链表

void free_list(Node *head) {
    Node *current = head;
    while(current != NULL) {
        Node* tem = current;
        current = current->next;
        free(tem);
    }
    free(head);
}

int main()
{
    printf("请输入若干整数，直到输入0为止：\n");
    Node *head = createlinkedlist();

    printf("创建的链表为：\n");
    printlist(head);

    int value;

    printf("请输入你要删除的节点值：");
    scanf("%d",&value);
    delete_value_list(head,value);
    free_list(head);
    return 0;
}