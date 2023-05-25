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

## Multiple access protocols

多路访问链路和协议，或者说全称 Multiple Acess Links and Protocol。

两种类型的网络链路：

- **点对点链路（point-to-point link）**
  - 拨号访问的 PPP
  - 以太网交换机和主机之间的点对点链路
- **广播链路（broadcast link）**：共享线路或媒体
  - 传统以太网
  - HFC 上行链路
  - 802.11 无线局域网

![image-20230525171556533](./06-link-layer-and-lans.assets/image-20230525171556533.png)

::: tip 多路访问协议

- 单个共享的广播型链路
- 传输的帧在接收方可能在接收方处碰撞/冲突（collide）。
- 分布式算法-决定节点如何使用共享信道，即：决定节点什么时候可以发送？

:::

在理想情况下，对于速率为 R bps 的广播信道，多路访问协议应该具有以下所希望的特性：

1. 当且仅当一个节点发送数据时，该节点具有 R bps 的吞吐量；

2. 当有 M 个节点发送数据时，每个节点吞吐量为 R/M bps。这不必要求 M 个节点中的每一个节点总是有 R/M 的瞬时速率，而是每个节点在一些适当定义的时间间隔内应该有 R/M 的平均传输速率；

3. 协议是分散的，这就是说不会因为某主节点故障而使整个系统崩溃

   （高级的说法：没有特殊节点协调发送、没有时钟和时隙的同步）

4. 协议是简单的，使实现不昂贵

现在主流的 3 种类型多路访问协议（介质访问控制协议，MAC）：

- **信道划分协议（channel partitioning protocol）**
  - 把信道划分成小片（时间、频率、编码）
  - 分配片给每个节点专用
- **随机接入协议（random access protocol）**
  - 信道不划分，允许冲突
  - 冲突后恢复
- **轮流协议（taking-turns protocol）**
  - 节点依次轮流
  - 但是有很多数据传输的节点可以获得较长的信道使用权

### 信道划分协议

Channel Partitioning Protocols

**时分多路复用**（time division multiple access，简称 TDMA）：

- 轮流（“rounds”）使用信道（channel），信道的时间分为周期
- 每个站点使用每周期中固定的时隙（长度=帧传输时间）传输帧
- 时隙空闲（浪费）主要出现在站点无帧传输

**频分多路复用**（frequency division multiple access，简称 FDMA）：

- 信道的有效频率范围被分成一个个小的频段
- 每个站点被分配一个固定的频段
- 浪费主要出现在分配给站点的频段没有被使用

**码分多址**（Code Division Multiple Access，简称 CDMA）

- 所有站点在整个频段上同时进行传输，采用编码原理加以区分
- 完全没有冲突（假定信号同步很好，线性叠加）

### 随机接入协议

> Random Access Protocols

#### Slotted ALOHA

Slotted 时隙，ALOHA 是夏威夷土著语，意为“你好”、“谢谢”。

假设：

- all frames same size

- time divided into equal size slots(时间划分为大小相等的插槽) (time to transmit 1 frame)
- nodes start to transmit only slot beginning(插槽开头)
- nodes are synchronized（同步过）
- if 2 or more nodes transmit in slot, all nodes detect collision(所有节点都检测到冲突)

在每个节点中，时隙 ALOHA 的操作如下：

- 当节点有一个新帧要发送时，它等到下一个间隙开始并在该时隙传输整个帧；
- 如果没有碰撞，该节点成功地传输它的帧，从而不需要考虑重传该帧；
- 如果有碰撞，该节点在时隙结束之前检测到这次碰撞，该节点以概率 p 在后续的每个时隙中重传它的帧，直到该帧被无碰撞的传输出去；

![image-20230222000508480](./06-link-layer-and-lans.assets/image-20230222000508480.png)

#### Slotted ALOHA: efficiency

效率：当有很多节点，每个节点有很多帧要发送时，x%的时隙是成功传输帧的时隙

- 假设 N 个节点，每个节点都有很多帧要发送，在每个时隙中的传输概率是 p
- 一个节点成功传输概率是 $p(1-p)^{N-1}$
- 任何一个节点的成功概率是 $Np(1-p)^{N-1}$
- N 个节点的最大效率：求出使 $Np(1-p)^{N-1}$ 最大的 p\*
- 代入 P\*得到最大 $f(p^*)=Np^*(1-p^*)^{N-1}$
- N 为无穷大时的极限为 $1/e=0.37$

即最好情况：信道利用率 37%

#### Pure (unslotted) ALOHA

在纯 ALOHA 中，当一帧首次到达，节点立刻将该帧完整地传输进广播信道。

效率上：比时隙 ALOHA 更差了！

### 载波侦听多路访问

CSMA (carrier sense multiple access)

两个重要的规则：

1. 说话之前先听。如果其他人正在说话，等到他们说完话为止。在网络领域中，这被称为**载波侦听**（carrier sensing），即一个节点在传输前先听信道。如果来自另一个节点的帧正向信道上发送，节点则等待直到检测到一小段时间没有传输，然后开始传输
2. 如果与他人同时开始说话，停止说话。在网络领域中，这被称为**碰撞检测**（collision detection），即当一个传输节点在传输时一直在侦听此信道。如果它检测到另一个节点正在传输干扰帧，它就停止传输，在重复“侦听-当空闲时传输”循环之前等待一段随机时间
