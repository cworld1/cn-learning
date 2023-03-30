import { defaultTheme, defineUserConfig } from "vuepress";
import navConfig from "./sidebar.js";

export default defineUserConfig({
  // set site base to default value
  base: "/",

  // extra tags in `<head>`
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.png",
      },
    ],
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
  plugins: [],
});
