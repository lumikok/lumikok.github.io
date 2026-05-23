import { defineConfig } from "vitepress";

import generatedSidebar from "./sidebar.generated.json" with { type: "json" };
// 导入主题的配置
import { blogTheme } from "./blog-theme";

// 导入评论系统

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// 如果项目名已经为 name.github.io 域名，则不需要修改！
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/vitepress-blog-sugar-template/'
//   : '/'

export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  // base,
  lang: "zh-cn",
  title: "lumikok",
  description: "一个持续奋斗的年轻人",
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    [
      "script",
      {
        // VitePress head attributes expect string values
        async: "true",
        src: "https://cn.vercount.one/js",
      },
    ],
    [
      "script",
      {},
      `
    (function() {
      // 请修改为你的真实建站日期 (年, 月-1, 日, 时, 分, 秒)
      const startDate = new Date(2026, 4, 22, 0, 0, 0);
      
      function updateRuntime() {
        const span = document.getElementById('site-runtime');
        if (!span) return;
        
        const now = new Date();
        const diff = now - startDate;
        if (diff <= 0) {
          span.innerText = '刚刚诞生';
          return;
        }
        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let text = '';
        if (days > 0) text += days + '天';
        if (hours > 0) text += hours + '小时';
        if (minutes > 0) text += minutes + '分钟';
        if (seconds > 0) text += seconds + '秒';
        span.innerText = text;
      }
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          updateRuntime();
          setInterval(updateRuntime, 1000);
        });
      } else {
        updateRuntime();
        setInterval(updateRuntime, 1000);
      }
    })();
    `,
    ],
    ["link", { rel: "stylesheet", href: "/custom.css" }],
    [
      "meta",
      {
        "http-equiv": "Content-Security-Policy",
        content:
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercount.one;",
      },
    ],

    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ["link", { rel: "icon", href: "/icon.ico" }],
    // 配置网站标签页的信息（显示在浏览器的 tab 上，并且固定展示）
  ],

  themeConfig: {
    sidebar: generatedSidebar,

    // 本地搜索
    search: {
      provider: "local",
    },

    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: "目录",
    },
    // 默认文案修改
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "相关文章",
    lastUpdatedText: "上次更新于",

    // 设置logo

    logo: "/logo.jpg",

    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: "首页", link: "/" },
      {
        text: "笔记",

        items: [
          { text: "导航", link: "/contents/notes/" },
          { text: "C语言", link: "/contents/notes/c/" },
        ],
      },
      { text: "随笔", link: "/contents/essays/home.md" },
      { text: "关于我", link: "/about/" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/lumikok",
      },
    ],
  },
});
