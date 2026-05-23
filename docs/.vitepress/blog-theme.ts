// 主题独有配置
import { getThemeConfig } from "@sugarat/theme/node";

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'
// const baseUrl = "https://theme.sugarat.top";
// const RSS: Theme.RSSOptions = {
//   title: "@sugarat/theme",
//   baseUrl,
//   language: "zh-cn",
//   description: "lumikkk的博客，存储了其笔记文档和一些随笔",
//   copyright: "Copyright (c) 2023-present, 粥里有勺糖",
// };

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,

  // 首页标签数量限制
  homeTags: {
    limit: 10,
  },

  // 首页博客信息是否可折叠
  home: {
    blogInfoCollapsible: false,
  },
  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // 默认关闭 markdown 图表支持（开启会增加一定的构建耗时）
  mermaid: true,
  alert: {
    type: "success",
    title: "欢迎来到我的博客，这里存储了我的笔记文档和一些随笔",
    duration: 5000,
  },

  // 图片预览
  imagePreview: {
    showProgress: true,
    infinite: true,
    hideOnClickModal: true,
  },

  // 文章作者信息列表（如果文章frontmatter里没有设置作者或者设置的作者信息不完整，则会使用这里的默认信息）

  authorList: [
    {
      nickname: "lumikok",
      des: "奋斗的年轻人",
      url: "https://lumikok.github.io/",
    },
  ],
  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: "MIT License | lumikok © 2026",
    // message 字段支持配置为字符串或字符串数组，下面使用数组同时展示访问量和运行时间
    message:
      '总访客数: <span id="vercount_value_site_uv">0</span> 人 &nbsp;|&nbsp; 网站已运行 <span id="site-runtime"></span>',

    // 文章页
    // icpRecord: {
    //   name: '蜀ICP备19011724号',
    //   link: 'https://beian.miit.gov.cn/'
    // },
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },
  docMetaInsertSelector: "h1",
  docMetaInsertPosition: "after",

  buttonAfterArticle: {
    openTitle: "投“币”",
    closeTitle: "下次一定",
    content:
      '<img src="/zanshang.jpg" alt="赞赏二维码" style="width: 300px; height: 300px; object-fit: cover;">',
    icon: "wechatPay",
  },
  // 主题色修改
  themeColor: "el-blue",

  // 文章默认作者
  author: "lumikok",

  comment: {
    type: "giscus",
    options: {
      repo: "lumikok/blog-comments",
      repoId: "R_kgDOSkyX6g",
      category: "Announcements",
      categoryId: "DIC_kwDOSkyX6s4C9m4j",
      inputPosition: "top",
    },
    label: "留下足迹",
    icon: `<svg width="512" height="512" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path fill="#fbbf67" d="M63.962 31.979c0 17.665-14.318 31.979-31.981 31.979C14.319 63.958 0 49.644 0 31.979C0 14.315 14.319 0 31.981 0c17.663 0 31.981 14.315 31.981 31.979"/>
      <path fill="#633d19" d="M39.512 47.925c-.624-1.461-1.959-2.202-3.97-2.202c-1.568 0-3.271.45-4.515.78l-.727.185c-.32.079-1.979 1.012-1.868 1.914l.193.727h.671c.111 0 .229-.016.37-.049l.602-.152c1.361-.342 2.643-.666 3.983-.666c.788 0 1.46.305 2 .905c.442.487.371.773.348.868c-.118.494-.889 1.085-1.916 1.476c0 0-1.594.658-1.663 1.574l.052.622l.415.237c2.326 1.333 2.278 2.194 1.979 2.796c-.332.664-1.275.805-2.01.805c-1.019 0-2.121-.273-2.765-.542l-.427-.083c-.806 0-2.105.97-2.248 1.673l-.071.716l.573.238a8.03 8.03 0 0 0 3.128.628h.004c1.896 0 3.831-.663 5.442-1.866c1.431-1.066 1.713-2.18 1.699-2.929c-.02-.938-.506-1.882-1.391-2.728c2.23-1.332 2.939-2.986 2.112-4.927"/>
      <ellipse cx="11.242" cy="42.42" fill="#ed307c" opacity=".48" rx="7.928" ry="6.462"/>
      <path fill="#ed307c" d="M60.65 43.24c0 3.571-3.549 6.462-7.927 6.462c-4.379 0-7.93-2.891-7.93-6.462c0-3.572 3.551-6.466 7.93-6.466c4.378 0 7.927 2.894 7.927 6.466" opacity=".48"/>
      <path fill="#633d19" d="M25.23 12.968c-5.951-.411-11.346 2.028-15.08 6.66c-1.622 2.01 1.223 4.89 2.86 2.86c3.134-3.887 7.215-5.822 12.221-5.475c2.605.179 2.588-3.867 0-4.045m14.079 0c5.95-.411 11.346 2.028 15.08 6.66c1.621 2.01-1.223 4.89-2.86 2.86c-3.134-3.887-7.215-5.822-12.221-5.475c-2.605.179-2.587-3.867 0-4.045M28.886 32.33c-.225 0-4.333-1.576-8.48-1.576c-3.705 0-7.442 1.576-8.481 1.576c-.9 0-1.236-1.043-.691-1.667c4.961-5.728 13.378-5.728 18.344 0c.541.624.205 1.667-.692 1.667m25.019 0c-.226 0-4.333-1.576-8.48-1.576c-3.705 0-7.441 1.576-8.48 1.576c-.9 0-1.236-1.043-.691-1.667c4.961-5.728 13.379-5.728 18.344 0c.54.624.204 1.667-.693 1.667"/>
  </svg>`,
    mobileMinify: false,
  },

  // 友链
  friend: {
    list: [
      {
        nickname: "sugarat",
        des: "一个热爱技术的年轻人",
        url: "https://sugarat.top/",
        avatar:
          "https://cdn.upyun.sugarat.top/avatar/blog/zlyst-avatar.jpeg-wh100",
      },
      {
        nickname: "Vitepress",
        des: "Vite & Vue Powered Static Site Generator",
        url: "https://vitepress.dev/",
        avatar: "https://vitepress.dev/vitepress-logo-large.webp",
      },
    ],
    random: true,
    limit: 5,
    scrollSpeed: 100,
  },
  recommend: false,
  article: {
    readingTime: true,
    readingTimePosition: "inline",
  },
  // 公告
  // popover: {
  //   title: "公告",
  //   body: [
  //     { type: "text", content: "👇我的微信👇---👇 我的QQ 👇" },
  //     {
  //       type: "image",
  //       src: "https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp",
  //       alt: "粥里有勺糖微信二维码",
  //     },
  //     {
  //       type: "text",
  //       content: "欢迎大家加群&私信交流",
  //     },
  //     {
  //       type: "text",
  //       content: "文章首/文尾有群二维码",
  //       style: "padding-top:0",
  //     },
  //     {
  //       type: "button",
  //       content: "作者博客",
  //       link: "https://sugarat.top",
  //     },
  //     {
  //       type: "button",
  //       content: "加群交流",
  //       props: {
  //         type: "success",
  //       },
  //       link: "https://theme.sugarat.top/group.html",
  //     },
  //   ],
  //   duration: 0,
  // },
});

export { blogTheme };
