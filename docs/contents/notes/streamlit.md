---
date: 2026-04-26
tags:
  - python库
  - 待整理
---
# Streamlit

## 入门

- **介绍**：`Streamlit`是一个开源的`Python`库，用来快速基于`Python`代码构建交互式的`web`网站（**主要用于数据科学及机器学习领域**）
- **官网**：[https://streamlit.io/](https://streamlit.io/)
- **安装方式**：`pip install streamlit`
- **构建方式**：基于`streamlit`中的`api`构建页面
- **运行方式**：终端运行`streamlit run 文件名`

## 常用API

详细的各类`API` 见：[Streamlit API 参考](https://docs.streamlit.io/develop/api-reference)。

常用的 API 见下面程序：

```python
import streamlit as st  
  
# 页面设置  
st.set_page_config(  
    page_title="Streamlit 入门", # 页面标题  
    page_icon="😁", # 页面图标  
    # 布局  
    layout="wide",  
    # 侧边栏状态  
    initial_sidebar_state="expanded",  
    # 菜单栏按钮  
    menu_items={  
        'get help': 'https://www.baidu.cn'  
    }  
)  
# 大标题  
st.title("入门演示")  
st.header("一级标题")  
st.subheader("二级标题")  
  
# 段落文字  
st.write("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊")  
st.write("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊")  
st.write("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊")  
st.write("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊")  
  
# 图片  
  
# st.image()  
  
# 音频  
  
# st.audio()  
  
# 视频  
  
# st.video()  
  
# Logo  
  
# st.logo()  左上角  
  
# 表格  
  
student_data = {  
    "姓名": ["王林","李","莫"],  
    "学号": ['2023','2023','2022']  
}  
st.table(student_data)  
  
# 输入框  
  
name = st.text_input("请输入姓名")  
st.write(f"您输入的姓名为：{name}")  
  
password = st.text_input("请输入密码",type="password")  
st.write(f"您输入的密码为：{name}")  
  
# 单选按钮  
  
gender = st.radio("请输入你的性别",["男","女","未知"])  
st.write(f"您的性别为：{gender}")
```

