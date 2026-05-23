# CSS 基础

CSS（层叠样式表）是为 web 内容添加样式的代码。以下仅涉及 CSS 的基础知识，用于快速上手实践（详细内容见后续章节）。

## 什么是 CSS

CSS 非编程语言，也不是标记语言，而是一种**样式表语言**。它用于为 HTML 元素添加样式，例如颜色、字体和布局。如：

```css
p {
  color: red;
}
```

上面的代码将所有`<p>`元素的文本颜色设置为红色。为了将 CSS 应用到 HTML 文档中，可以使用文件关联的方式（将下面的代码添加到 HTML 的`<head>`部分）：

```html
<link href="styles/style.css" rel="stylesheet" />
```

### CSS 规则集

以上述红色段落文字的 CSS 代码为例，了解其具体工作原理：

首先，整个结构称为**规则集**（rule set）。其各部分名称如下：

- **选择器**（selector）：
  HTML 元素名位于规则集的开头，意思就是说指定要为哪些元素添加样式。在本例中，选择器是`p`，表示为所有`<p>`元素添加样式。
- **声明块**（declaration block）：
  由大括号`{}`包围的部分，包含一个或多个声明（用于为元素的指定**属性**添加样式）。在本例中，声明块是`{ color: red; }`。
- **属性**（property）：
  它是为 HTML 元素添加样式的方式。在本例中，属性是`color`，表示文本颜色。
- **属性值**（value）:
  显而易见，它是为属性指定的值。在本例中，属性值是`red`，表示将文本颜色设置为红色。

**需注意的语法细节**：

- 各声明以分号`;`结尾。
- 属性和值之间用冒号`:`分隔。
- 声明块用大括号`{}`包围。

**补充**：一个规则集可以选择多个元素（用逗号分隔），也可以包含多个声明。

### 选择器类型

上述例子中使用的是**元素选择器**，其实 CSS 还提供了多种选择器类型：

| 选择器类型 | 选择的内容                     | 示例                                   |
| ---------- | ------------------------------ | -------------------------------------- |
| 元素选择器 | 选择所有指定类型的 HTML 元素   | `p` 选择所有段落                       |
| ID 选择器  | 选择具有特定 ID 的元素（唯一） | `#my-id` 选择`<p id="my-id">`          |
| 类选择器   | 选择具有特定类的元素（可重复） | `.my-class` 选择`<p class="my-class">` |
| 属性选择器 | 选择具有特定属性的元素         | `img[src]` 选择所有有`src`属性的图片   |
| 伪类选择器 | 选择特定状态的特定元素         | `a:hover` 选择鼠标悬停的链接           |

以上也只是部分常用选择器，CSS 还提供了更多选择器以满足不同需求。

## 字体和文本

CSS 可以用来设置字体和文本样式。此处仅以部分操作实例进行简单说明：

```html
<link
  href="https://fonts.googleapis.com/css?family=Open+Sans"
  rel="stylesheet"
/>
```

上面的代码将 Google Fonts 的 Open Sans 字体引入到 HTML 文档中。然后，该字体可以在 CSS 中使用：

```css
html {
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
}
h1 {
  font-size: 2em;
  font-align: center;
}
p,
li {
  font-size: 1em;
  line-height: 1.5;
  letter-spacing: 0.05em;
}
```

上述代码中：

- `font-size`：设置字体大小，可以使用绝对单位（如`px`）或相对单位（如`em`）。
- `font-family`：设置字体系列，可以指定多个字体作为备选。
- `line-height`：设置行高，控制文本行之间的垂直间距。
- `letter-spacing`：设置字母间距，控制字符之间的水平间距。
- `font-align`：设置文本对齐方式，如`center`表示居中对齐。

这仅为字体和文本样式的基础介绍（供个人学习实践参考和解释）。

## 盒子模型

其实，页面上大部分 HTML 元素都可以看作是若干堆叠的盒子，而 CSS 布局的核心就是**盒子模型**。每个盒子由以下四个部分组成：

1. **内容区域**（content）：盒子中实际显示内容的区域。
2. **内边距**（padding）：内容区域与边框之间的空间。
3. **边框**（border）：包围内容和内边距的线条。
4. **外边距**（margin）：盒子与其他元素之间的空间。

可以使用 CSS 属性来设置这些部分的大小和样式。例如：

- `width` 和 `height`：设置内容区域的宽度和高度。
- `background-color`：设置内容区域的背景颜色。
- `color`：设置内容区域的文本颜色。
- `text-shadow`：为内容区域的文本添加阴影效果。
- `display`：设置盒子的显示类型，如`block`、`inline`等。
- `padding`：设置内边距的大小。
- `border`：设置边框的样式、宽度和颜色。
- `margin`：设置外边距的大小。
- `box-shadow`：为盒子添加阴影效果。

通过理解和应用盒子模型，可以更好地控制网页布局和元素的外观。

## 实践示例

以下是一些常见的 CSS 实践示例，展示如何使用 CSS 设置页面样式。

### 页面颜色

可以使用`background-color`属性设置页面的背景颜色。例如：

```css
html {
  background-color: #00539f;
}
```

### 文档体样式

在 CSS 中，`body` 元素代表整个网页的内容区域。可以通过设置 `body` 的样式来影响整个页面的外观。例如：

```css
body {
  width: 600px;
  margin: 0 auto;
  background-color: aliceblue;
  padding: 0 20px 20px 20px;
  border: 5px solid black;
}
```

上述代码中：

- `width: 600px;`：强制内容区域永远保持 600 像素宽。
- `margin: 0 auto;`：`margin`的第一个值控制上下边距为 0，第二个值`auto`使左右边距自动调整，从而实现水平居中。
- `background-color: aliceblue;`：设置背景颜色为浅蓝色。（如前文所述）
- `padding: 0 20px 20px 20px;`：设置内边距，上边距为 0，右、下、左边距均为 20 像素。
- `border: 5px solid black;`：设置边框为 5 像素宽的实线黑色边框。

### 页面主标题

通常，网页的主标题使用`<h1>`元素表示。可以通过 CSS 设置其样式。例如：

```css
h1 {
  margin: 0;
  padding: 20px 0;
  color: navy;
  text-shadow: 3px 3px 1px black;
}
```

上述代码中：

- `margin: 0;`：将主标题的外边距设置为 0。
- `padding: 20px 0;`：设置主标题的上下内边距为 20 像素，左右内边距为 0。
- `color: navy;`：将主标题的文本颜色设置为海军蓝。
- `text-shadow: 3px 3px 1px black;`：为主标题的文本添加阴影效果，阴影向右下偏移 3 像素，模糊半径为 1 像素，颜色为黑色。

### 图像

在网页中，图像通常使用`<img>`元素表示。可以通过 CSS 设置其样式以实现居中效果。例如：

```css
img {
  display: block;
  margin: 0 auto;
}
```

**注意**：`body`是块级元素，而`img`默认是行内元素。为了使图像居中，需要将其`display`属性设置为`block`，然后使用`margin: 0 auto;`实现水平居中。
