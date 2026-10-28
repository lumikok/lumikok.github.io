---
title: AI Learning Lab
description: 从 NumPy 回归训练到逻辑回归、Iris 分类与错误分析的机器学习基础实验。
start: 2026-10
end: present
status: ongoing
method: 个人实践 · AI 辅助学习
repo: https://github.com/lumikok/ai-learning-lab
stack: Python · NumPy · scikit-learn · uv
order: 1
---

# AI Learning Lab

这是学习 AI 基础时使用的实验仓库，从训练与评价起步，逐步加入 NumPy 回归训练、逻辑回归和公开数据分类，用代码与对照结果连接理论和实践。

## 已有实验

| 单元与代码入口 | 问题与已验证范围 |
| --- | --- |
| [训练与预测](https://github.com/lumikok/ai-learning-lab/tree/main/01-train-and-predict) | 枚举参数并在独立数据上评价；对照训练数据与全体数据确定缩放规则的差异。 |
| [过拟合与泛化](https://github.com/lumikok/ai-learning-lab/tree/main/02-overfitting) | 比较两个给定模型的训练与新数据误差，观察贴合训练数据不等于泛化更好。 |
| [NumPy 基础](https://github.com/lumikok/ai-learning-lab/tree/main/Numpy) | 练习数组形状、取列、逐元素计算与批量损失，为后续数组训练准备数据表示。 |
| [线性回归](https://github.com/lumikok/ai-learning-lab/tree/main/03-linear-regression) | 对照循环与 NumPy 的梯度和参数更新，扩展到多特征训练，并做学习率、删列和标准化实验。 |
| [逻辑回归](https://github.com/lumikok/ai-learning-lab/tree/main/04-logistic-regression) | 实现概率预测、交叉熵、梯度训练与分类评价，检查阈值、决策边界及误报和漏报。 |
| [Iris 二分类](https://github.com/lumikok/ai-learning-lab/tree/main/05-iris-classification) | 在公开数据上完成训练/验证划分、训练集统计量预处理、简单基线与错误分析，并比较四特征和花瓣两特征在四次划分下的表现。 |

Iris 的种子 42 实验中，四特征模型验证错误率为 8%，多数类基线为 52%；四次划分对照中，四特征的验证交叉熵均更低，错误率三次持平、一次更低。验证集可能重叠，且没有独立最终测试集，结论仅限本次任务与设置。

早期单元使用人为小数据，过拟合单元只评价给定模型；构造数据上的近零训练误差也不代表真实任务的泛化表现。

## 实践方式

学习中使用 AI 讲解、提示和调试反馈，实验数据、必要公式与函数接口有教学支持，关键代码由我编写。实验说明保留真实错误、结果与局限；这些是学习过程中的自编练习，不记作完成官方课程作业。

训练与预测、过拟合及线性回归的循环版使用 Python 标准库，数组训练与逻辑回归使用 NumPy；Iris 实验用 scikit-learn 加载内置数据并划分样本，训练核心仍为 NumPy 实现。学习率、删列与标准化对照保留在线性回归单元中。

仓库已统一使用 `pyproject.toml`、`uv.lock` 管理依赖，按[运行说明](https://github.com/lumikok/ai-learning-lab#运行方式)安装锁定环境后运行；同一概念的对照和变式优先放在原单元中。

## 对应知识笔记

- [训练、评估与数据泄漏](/contents/notes/ai/machine-learning/01_训练、评估与数据泄漏)
- [欠拟合、过拟合与线性回归](/contents/notes/ai/machine-learning/02_欠拟合、过拟合与线性回归)
- [NumPy 数组与批量计算](/contents/notes/ai/machine-learning/03_NumPy数组与批量计算)
- [多特征线性回归](/contents/notes/ai/machine-learning/04_多特征线性回归)
- [逻辑回归](/contents/notes/ai/machine-learning/05_逻辑回归)
