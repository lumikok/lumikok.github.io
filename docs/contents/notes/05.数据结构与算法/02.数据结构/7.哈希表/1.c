#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 100

// 哈希表节点

typedef struct HashNode {
    char *key;
    int value;
    struct HashNode *next; //用于处理冲突的链表
} HashNode;

// 哈希表

typedef struct {
    HashNode **buckets;   //桶数组
    int size;    //表大小
} HashTable;

// 复杂的哈希函数（减少冲突）

unsigned int djb2_hash(const char *key,int table_size) {
    unsigned long hash = 5381;
    int c;

    while ((c = *key++)) {
        hash = ((hash << 5) + hash) +c;
    }

    return hash % table_size;
}

// 创建哈希表

HashTable *create_hash_table(int size) {
    HashTable *table = (HashTable *)malloc(sizeof(HashTable));
    table->size = size;
    table->buckets = (HashNode **)calloc(size, sizeof(HashNode *));
    return table;
}

// 插入键值对

void hash_table_insert(HashTable *table,const char *key,int value) {
    unsigned int index = djb2_hash(key,table->size);

    // 检查这个键是否已存在
    HashNode *current = table->buckets[index];
    while(current !=NULL) {
        if(strcmp(current->key,key) == 0) {
            current->value = value;
            return;
        }
        current = current->next;
    }

    // 创建新节点（如果键不存在）
    HashNode *new_node = (HashNode*)malloc(sizeof(HashNode));
    new_node->key = strdup(key); //复制字符串
    new_node->value = value;

    // 头插法
    new_node->next = table->buckets[index];
    table->buckets[index] = new_node;
}

// 查找值

int hash_table_search(HashTable *table,const char *key,int *value) {
    unsigned int index = djb2_hash(key,table->size);
    HashNode *current = table->buckets[index];

    while(current != NULL) {
        if(strcmp(current->key,key) == 0) {
            *value = current->value;
            return 1;   //找到了（返回1）
        }
        current = current->next;
    }

    return 0;  //没找到（返回0）
}

// 删除键值对

int hash_table_delete(HashTable *table,const char *key) {
    unsigned int index = djb2_hash(key,table->size);
    HashNode *current = table->buckets[index];
    HashNode *prev = NULL; //空指针（用于标记）

    while(current != NULL) {
        if(strcmp(current->key,key) == 0) {
            if(prev == NULL) {
                table->buckets[index] = current->next;
            }
            else {
                prev->next = current->next;
            }

            free(current->key);
            free(current);
            return 1;
        }
        prev = current;
        current = current->next;
    }

    return 0;
}

// 打印哈希表

void print_hash_table(HashTable *table) {
    for(int i = 0 ; i < table->size ; i++) {
        HashNode *current = table->buckets[i];
        while (current != NULL) {
            printf("(%s: %d) -> ", current->key, current->value);
            current = current->next;
        }
        printf("NULL\n");
    }

}

void destroy_hash_table(HashTable *table) {
    if (table == NULL) return;
    for (int i = 0; i < table->size; i++ ) {
        HashNode *current = table->buckets[i];
        while(current != NULL) {
            HashNode *temp = current;
            current = current->next;
            free(temp->key);
            free(temp);
        }
    }
    free(table->buckets);
    free(table);
}

// int main() {
//     // 创建哈希表
//     HashTable *table = create_hash_table(10);
    
//     // 插入测试数据
//     printf("插入数据...\n");
//     hash_table_insert(table, "apple", 10);
//     hash_table_insert(table, "banana", 20);
//     hash_table_insert(table, "orange", 30);
//     hash_table_insert(table, "grape", 40);
//     hash_table_insert(table, "apple", 15);  // 更新已存在的键
    
//     print_hash_table(table);
    
//     // 查找测试
//     printf("\n查找测试...\n");
//     int value;
//     if (hash_table_search(table, "banana", &value)) {
//         printf("找到 banana: %d\n", value);
//     } else {
//         printf("未找到 banana\n");
//     }
    
//     if (hash_table_search(table, "watermelon", &value)) {
//         printf("找到 watermelon: %d\n", value);
//     } else {
//         printf("未找到 watermelon\n");
//     }
    
//     // 删除测试
//     printf("\n删除测试...\n");
//     if (hash_table_delete(table, "orange")) {
//         printf("成功删除 orange\n");
//     } else {
//         printf("删除 orange 失败\n");
//     }
    
//     print_hash_table(table);
    
//     // 清理
//     destroy_hash_table(table);
    
//     return 0;
// }