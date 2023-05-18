# Computer Network Learning

[![GitHub stars](https://img.shields.io/github/stars/cworld1/cn-learning?style=flat-square)](https://github.com/cworld1/cn-learning/stargazers)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/y/cworld1/cn-learning?label=commits&style=flat-square)](https://github.com/cworld1/cn-learning/commits)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/cworld1/cn-learning/.github/workflows/build-deploy.yml?branch=main&style=flat-square)](https://github.com/cworld1/cn-learning/actions/workflows/build-deploy.yml)
[![GitHub license](https://img.shields.io/github/license/cworld1/cn-learning?style=flat-square)](https://github.com/cworld1/cn-learning/blob/main/LICENSE)

Some notes and code about CWorld learning Computer Network.

[Get Started 前往阅读 →](https://cn.cworld.top/)

## Local Development

Environment requirements:

- [Node.js](https://nodejs.org) 16.14.0+

### 1. Enable corepack & pnpm

> If your Node.js version is lower than 16.13.0，Please install [corepack](https://nodejs.org/api/corepack.html) first.
>
> ```shell
> npm install -g corepack
> ```

```shell
corepack enable
corepack prepare pnpm@latest --activate
```

### 2. Clone the repository

```shell
git clone https://github.com/cworld1/cn-learning.git
cd cn-learning
```

### 2. Install dependencies

```shell
pnpm install
```

### 3. Start the development server

```shell
pnpm dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### 4. Some useful commands

`pnpm build`
Bundles your website into static files for production.

## Contributions

As the author is only a beginner in learning Computer Network, there are obvious mistakes in his notes. Readers are also invited to make a lot of mistakes. In addition, you are welcome to use PR or Issues to improve them.

## Thanks

Some of the electronic textbooks have helped the author a lot in his studies, and without them, this notebook would not have been possible. I would like to express my gratitude to the original authors of these materials. If you have any doubts about this project, you can also read the following textbooks carefully to remedy them.

- [STATS 201 : Computer Network](https://courseoutline.auckland.ac.nz/dco/course/STATS/201/1215)
- [college_assignment/计算机网络 · GitHub](https://github.com/A-BigTree/college_assignment/blob/main/learning_Notes/计算机网络.md#56-icmp因特网控制报文协议)
- [笔记-计算机网络-自顶向下 | FEZ的博客](https://toby-fish.github.io/2021/11/22/笔记-计算机网络-自顶向下/)
- [中科大郑烇、杨坚《计算机网络》课程 学习笔记-CSDN博客](https://blog.csdn.net/qq_53111905/category_11228995.html)
- [Jim Kurose (author’s website of Computer Networking: a Top Down Approach (P)](http://gaia.cs.umass.edu/kurose_ross/index.php)

## License

This project is licensed under the GPL 3.0 License.

[![Creative Commons](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)

This documention is admitted by [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](http://creativecommons.org/licenses/by-nc-sa/4.0/).

> **Note** This website is built using [Vuepress Next](https://github.com/vuepress/vuepress-next), a [Vuejs](https://vuejs.org) static website generator.
