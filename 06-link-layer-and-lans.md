---
title: "Chapter 6: The Link Layer and LANs"
---

即链路层和局域网

## Outline

1. introduction, services
2. error detection, correction
3. multiple access protocols \*
4. LANs \*
   - addressing, ARP
   - Ethernet
   - switches
   - VLANS
5. link virtualization: MPLS（少考）
6. data center networking（少考）
7. a day in the life of a web request

## Link layer: introduction

> [笔记-计算机网络-自顶向下 | FEZ 的博客 (toby-fish.github.io)](https://toby-fish.github.io/2021/11/22/笔记-计算机网络-自顶向下/)
>
> 为了透彻理解链路层以及它是如何与网络层关联的，我们考虑一个交通运输的类比例子。
>
> 假设一个旅行计划为游客开辟从美国新泽西州的普林斯顿到瑞士洛桑的旅游路线。假定该旅行社认为对于游客而言最为便利的方案是：从普林斯顿乘豪华大轿车到 JFK 机场，然后乘飞机从 JFK 机场去日内瓦机场，最后乘火车从日内瓦机场到洛桑火车站。一旦该旅行社作了这 3 项预定，普林斯顿豪华大轿车公司将负责将游客从普林斯顿带到 JFK，航空公司将负责将游客从 JFK 带到日内瓦，瑞士火车服务将负责将游客从日内瓦带到洛桑。该旅途中 3 段中的每一段都在两个“相邻”地点之间是“直达的”。注意到这 3 段运输是由不同的公司管理，使用了完全不同的运输方式（豪华大轿车、飞机和火车）。尽管运输方式不同，但它们都提供了将旅客从一个地点运输到相邻地点的基本服务。
>
> 在这个运输类比中，一个游客好比一个数据报，每个运输区段好比一条链路，每种运输方式好比一种链路层协议，而该旅行社好比一个路由选择协议。

一些概念：

- 节点（node）：运行链路层协议的任何人设备，如：主机、路由器、网桥、交换机等；
- 链路（link）：沿着通信路径连接相邻节点的通信信道，包括：
  - 有线链路
  - 无线链路
  - 局域网，共享性链路
- 数据单元帧（frame）：封装数据报，位于第二层协议

### 链路层提供的服务

数据链路层负责从一个节点通过链路将（帧中的）数据报发送到相邻的物理节点（一个子网内部的 2 节点）。

- 成帧（Framing）、链路接入（Link access）：
  - 将数据报封装在帧中，加上帧头、帧尾部
  - 如果采用的是共享性介质，信道接入获得信道访问权；
  - **媒体访问控制（Medium Access Control，MAC）**协议规定了帧在链路上传输规则；
- 可靠交付（Reliable deliver）、差错检测和纠正（Error detection and correction）：
  - 第三章传输层的可靠数据传输
  - 在低出错率的链路上（光纤和双绞线电缆）很少使用
  - 在无线链路经常使用：出错率高

::: tip 为什么在链路层和传输层都实现了可靠性？
一般化的链路层服务，不是所有的链路层都提供这些服务。一个特定的链路层只是提供其中一部分的服务。
:::

### 链路在何处实现

链路层的主体部分在**网络适配器（network adapter）中实现，网络适配器有时也称为网络接口卡（Network Interface Card，NIC）**。位于网络适配器核心的是链路层控制器，该控制器通常是一个实现了许多链路层服务（成帧、链路接入、差错检测等）的专用芯片。

一个典型的主机体系结构如下图所示：

![image-20230518180024184](./06-link-layer-and-lans.assets/image-20230518180024184.png)

## Error detection, correction

差错检测与纠正的场景如下图所示：

![image-20230518180512130](./06-link-layer-and-lans.assets/image-20230518180512130.png)

差错检测和纠正技术有：

1. 奇偶校验，包括使用单个**奇偶检验位**（parity bit）和**二维奇偶校验**（two-dimensional parity）；
2. 检验和方法；
3. 循环冗余检测（Cyclic Redundancy Check, CRC）编码

### EDC

- EDC=差错检测和纠正位（冗余位）
- D=数据由差错检测保护，可以包含头部字段错误检测。

错误检测不是 100%可靠的！

- 协议会漏检一些错误，但是很少
- 更长的 EDC 字段可以得到更好的检测和纠正效果

### Parity Checks

**单个奇偶校验位（single bit parity）**：detect single bit errors

发送 d 比特信息附加一个比特使 d+1 比特中 1 的总数是偶数（偶校验）或奇数（奇校验），偶校验如下图所示：

![image-20230518181444747](./06-link-layer-and-lans.assets/image-20230518181444747.png)

但注意此种方法只能检测不能纠错，并且也不能检测超过 1 比特位的错误。

**二维奇偶校验（two-dimension parity）**：detect and correct single bit errors

![image-20230518181939406](./06-link-layer-and-lans.assets/image-20230518181939406.png)

### Cyclic Redundancy Check(CRC)

计算机网络中广泛应用的差错检测技术基于**循环冗余检测（Cyclic Redundancy Check，CRC）编码，也称为多项式编码（polynomial code）**，CRC 如下图所示：

![image-20230518183408852](./06-link-layer-and-lans.assets/image-20230518183408852.png)

![image-20230518192928492](./06-link-layer-and-lans.assets/image-20230518192928492.png)

其中 `R` 计算：

$$
R=remainder\frac{D\cdot2^r}{G}
$$
