---
title: AI Learning Lab
description: 用 NumPy 实现回归、Iris 分类和两层神经网络。
start: 2026-10
end: present
status: ongoing
method: 个人实践 · AI 辅助学习
repo: https://github.com/lumikok/ai-learning-lab
stack: Python · NumPy · scikit-learn · uv
order: 1
---

# AI Learning Lab

从参数枚举开始，现在有回归、Iris 分类和两层网络的 NumPy 实现。各单元保留代码、运行方法、结果和遇到的问题。

## 仓库内容

| 单元 | 内容 |
| --- | --- |
| [训练与预测](https://github.com/lumikok/ai-learning-lab/tree/main/01-train-and-predict) | 参数枚举、训练与测试分工、预处理信息泄漏。 |
| [过拟合与泛化](https://github.com/lumikok/ai-learning-lab/tree/main/02-overfitting) | 对照给定模型在训练数据和新数据上的误差。 |
| [NumPy 基础](https://github.com/lumikok/ai-learning-lab/tree/main/Numpy) | 数组形状、取列、逐元素计算。 |
| [线性回归](https://github.com/lumikok/ai-learning-lab/tree/main/03-linear-regression) | 循环与数组梯度、多特征训练、学习率和标准化对照。 |
| [逻辑回归](https://github.com/lumikok/ai-learning-lab/tree/main/04-logistic-regression) | 概率、交叉熵、梯度训练、阈值与决策边界。 |
| [Iris 二分类](https://github.com/lumikok/ai-learning-lab/tree/main/05-iris-classification) | 训练与验证、简单基线、错分记录和特征对照。 |
| [两层神经网络](https://github.com/lumikok/ai-learning-lab/tree/main/06-neural-network) | 前向、反向、数值梯度检查、短训练及 Iris 训练与验证。 |

这些是小规模练习。两层网络在当前 Iris 设置下没有优于逻辑回归；单次划分和初始化不能说明模型的一般优劣。

关键计算由我在 AI 讲解和提示下编写，环境配置、样板与部分整理有 AI 帮助。Iris 数据加载和划分使用 scikit-learn，训练核心仍是 NumPy 实现。完整结果与环境说明见仓库。

## 对应知识笔记

- [训练、评估与数据泄漏](/contents/notes/ai/machine-learning/01_训练、评估与数据泄漏)
- [欠拟合、过拟合与线性回归](/contents/notes/ai/machine-learning/02_欠拟合、过拟合与线性回归)
- [NumPy 数组与批量计算](/contents/notes/ai/machine-learning/03_NumPy数组与批量计算)
- [多特征线性回归](/contents/notes/ai/machine-learning/04_多特征线性回归)
- [逻辑回归](/contents/notes/ai/machine-learning/05_逻辑回归)
- [错误分析与特征对照](/contents/notes/ai/machine-learning/06_错误分析与特征对照)
