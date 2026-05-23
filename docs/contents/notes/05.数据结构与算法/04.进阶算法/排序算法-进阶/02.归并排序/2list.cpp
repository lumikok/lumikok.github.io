/*用归并排序对链表进行排序。
1.定义链表节点结构体ListNode。
2.findmid函数：
    - 使用快慢指针找到链表的中间节点。
    - 返回中间节点指针。
3.merge函数：
    - 合并两个有序链表。
    - 返回合并后的有序链表头指针。
4.mergesort函数：
    - 递归实现归并排序。
    - 分割链表，递归排序左右两部分，合并排序结果。
5.main函数：
    - 创建一个无序链表。
    - 调用mergesort函数排序链表。
    - 输出排序后的链表。
    - 释放链表节点内存。
*/

#include <iostream>
using namespace std;

// 定义链表节点
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* nextNode) : val(x), next(nextNode) {}
};

// 查找链表的中间节点（快慢指针）
ListNode* findmid(ListNode* head) {
    if (!head || !head->next) {
        return head;
    }

    ListNode* slow = head;
    ListNode* fast = head->next;  //定义快慢指针

    while( fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;  //快指针动两步，慢指针动一步
    }

    return slow;
}

// 合并两个有序链表
ListNode* merge(ListNode* l1, ListNode* l2) {
    // 创建附加头节点（哑节点）
    ListNode dummy(0);
    ListNode* tail = &dummy;

    while (l1 && l2) {
        if (l1->val <= l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else{
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    // 连接剩余部分
    while(l1) {
        tail->next = l1;
        tail = tail->next;
        l1 = l1->next;
    }
    while(l2) {
        tail->next = l2;
        tail = tail->next;
        l2 = l2->next;
    }
    return dummy.next;
}

// 归并排序主函数（递归实现）
ListNode* mergesort(ListNode* head) {
    // 基本情况：链表为空或只有一个节点
    if (!head || !head->next) {
        return head;
    }

    // 1.分割链表
    ListNode* mid = findmid(head);
    ListNode* half = mid->next;
    mid->next = nullptr; //切断链表

    // 2.递归排序
    ListNode* left = mergesort(head);
    ListNode* right = mergesort(half);

    // 3.合并
    return merge(left,right);
}

int main () 
{
    ListNode* n5 = new ListNode(4);
    ListNode* n4 = new ListNode(2, n5);
    ListNode* n3 = new ListNode(1, n4);
    ListNode* n2 = new ListNode(3, n3);
    ListNode* n1 = new ListNode(5, n2);
    // 输出排序后的链表
    ListNode* current = mergesort(n1);
    while (current) {
        cout << current->val << " ";
        cout << "->";
        current = current->next;
    }
    cout << "nullptr" << endl;
    return 0;
}