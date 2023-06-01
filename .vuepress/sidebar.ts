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
    children: [
      "/01-introduction",
      "/02-application-layer",
      "/03-transport-layer",
      "/04-network-layer",
      "/05-network-layer-2",
      "/06-link-layer-and-lans",
    ],
  },
  {
    text: "Experiments",
    children: [
      "/experiment/00-getting-started",
      "/experiment/01-网络基础知识及双绞线的制作",
      "/experiment/02-交换机配置及VLAN建立",
      "/experiment/03-三层交换及VLAN间路由",
      "/experiment/04-路由器基本配置及静态路由配置",
      "/experiment/05-动态路由协议的配置",
      "/experiment/06-访问控制列表及防火墙使用",
      "/experiment/07-应用服务器的配置",
    ],
  },
];

export default navConfig;
