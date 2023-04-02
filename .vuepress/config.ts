import { defaultTheme, defineUserConfig } from "vuepress";
import navConfig from "./sidebar.js";
import containerPlugin from "@vuepress/plugin-container";
import { searchPlugin } from "@vuepress/plugin-search";
import { pwaPlugin } from "@vuepress/plugin-pwa";

export default defineUserConfig({
  // set site base to default value
  base: "/",

  // extra tags in `<head>`
  head: [
    ["link", { rel: "icon", href: "/icons/favicon.png" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
  ],

  // site-level locales config
  lang: "zh-CN",
  title: "Computer Network Learning",
  description: "关于 CWorld 学习该课程的一些笔记。",

  dest: "./dist",
  pagePatterns: ["**/*.md", "!**/README.md", "!.vuepress", "!node_modules"],
  // theme config
  theme: defaultTheme({
    // 导航栏配置
    navbar: [
      { text: "Home", link: "/" },
      { text: "Intro", link: "/intro.md" },
      { text: "Blog", link: "https://blog.cworld.top" },
    ],
    // 侧边栏
    sidebar: navConfig,
    sidebarDepth: 1,
  }),
  // plugins config
  plugins: [
    // 提示卡片
    containerPlugin({
      type: "tip",
      locales: {
        "/": {
          defaultInfo: "TIP",
        },
      },
    }),
    // 本地搜索
    searchPlugin({
      locales: {
        "/": {
          placeholder: "Search",
        },
      },
    }),
    // PWA
    pwaPlugin({}),
  ],
});
