---
title: AI Learning Lab
description: 从训练与评价到学习率对照和 NumPy 批量计算的机器学习基础实验。
start: 2026-10
end: present
status: ongoing
method: 个人实践 · AI 辅助学习
repo: https://github.com/lumikok/ai-learning-lab
stack: Python · NumPy · uv
order: 1
---

# AI Learning Lab

这是学习 AI 基础时使用的实验仓库，从机器学习的训练与评价起步，用小数据、代码和对照结果连接理论与实践。

## 已有实验

| 日期 | 单元与代码入口 | 问题与结果 |
| --- | --- | --- |
| 2026-10-04 | [训练与预测](https://github.com/lumikok/ai-learning-lab/tree/main/01-train-and-predict) | 枚举参数并在独立数据上评价；对照只用训练数据与使用全体数据确定缩放规则的差异。 |
| 2026-10-08 | [过拟合与泛化](https://github.com/lumikok/ai-learning-lab/tree/main/02-overfitting) | 比较两个给定模型：训练 MAE 为 0 的模型在新数据上 MAE 为 1.5，训练 MAE 为 1/3 的模型在新数据上 MAE 为 0。 |
| 2026-10-13 | [线性回归与梯度下降](https://github.com/lumikok/ai-learning-lab/tree/main/03-linear-regression) | 实现损失、梯度与训练循环，分别得到约 `w=2,b=1` 和 `w=-3,b=1`，再用未参与训练的验证数据评价。 |
| 2026-10-19 | [学习率对照](https://github.com/lumikok/ai-learning-lab/tree/main/03-linear-regression) | 固定数据、初始参数与更新步数，对照四种学习率；本组数据中 0.01、0.1 的损失下降，1.0、0.5 发散，减小步长不一定立即恢复稳定。 |
| 2026-10-19 | [NumPy 数组与基础计算](https://github.com/lumikok/ai-learning-lab/tree/main/Numpy) | 练习数组形状、取列、逐元素运算与批量损失；两列数据损失为 1.75，跳过编号列的三列变式损失为 7/3。 |

这些结果来自人为小数据。过拟合单元只评价给定模型，未实现多项式拟合；线性回归中的近零误差也不代表真实任务没有误差。

## 实践方式

学习中使用 AI 讲解、提示和调试反馈，实验数据、必要公式与函数接口有教学支持，关键代码由我编写。实验说明保留真实错误、结果与局限；这些是学习过程中的自编练习，不记作完成官方课程作业。

训练与预测、过拟合、线性回归三个单元使用 Python 标准库；NumPy 单元引入数组计算，当前只计算预测与损失，尚未用数组实现参数训练。学习率对照仍保留在线性回归单元中。

仓库已统一使用 `pyproject.toml`、`uv.lock` 管理依赖，按[运行说明](https://github.com/lumikok/ai-learning-lab#运行方式)安装锁定环境后运行；同一概念的对照和变式优先放在原单元中。

## 对应知识笔记

- [训练、评估与数据泄漏](/contents/notes/ai/machine-learning/01_训练、评估与数据泄漏)
- [欠拟合、过拟合与线性回归](/contents/notes/ai/machine-learning/02_欠拟合、过拟合与线性回归)
- [NumPy 数组与批量计算](/contents/notes/ai/machine-learning/03_NumPy数组与批量计算)
