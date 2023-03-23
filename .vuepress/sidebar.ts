import type { NavbarConfig } from "vuepress";

const navConfig: NavbarConfig = [
  {
    text: "Tutorial",
    children: [
      { text: "Home", link: "/index.md" },
      { text: "Intro", link: "/intro.md" },
    ],
  },
  {
    text: "Main Chapters",
    children: ["/01-introduction.md", "/02-application-layer.md"],
  },
  {
    text: "Experiments",
    children: [
      "/experiment/01-网络基础知识及双绞线的制作.md",
      "/experiment/02-交换机配置及VLAN建立.md",
      "/experiment/03-三层交换及VLAN间路由.md",
      "/experiment/04-路由器基本配置及静态路由配置",
    ],
  },
];

export default navConfig;
