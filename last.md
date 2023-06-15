# At the last

至此已经全部结束了！感谢您看到最后。

下面是考试相关。

## 考试分数分布

1. Single choice and Ferminlogy ($10*2 + 5*1$ score)
2. Multiple choice fill blanks ($5*2 + 15*1$ score)
3. Problem and analysis ($25$ score)
4. Configuration ($25$ score)

## 重要考点

1. 单选题：重点在 3456 章，部分在 2 章。如：

   - 数据链路层常见的设备，如 Hub、Switch、冲突域、广播域等知识点。
   - 或可靠或不可靠协议的语义，如 IP、TCP、UDP 等。语法涉及少。FTP、HTTP、Email 等常见的协议（Socket）端口号要考
   - 怎么使用 IP 地址
   - TCP 三次握手、四次挥手
   - 什么协议属于什么层的

2. 多选题：尽量选满

   填空题：

   - FSM 有限状态机（可靠的数据传递）
   - TCP 问题
   - 主要在传输层、数据链路层

3. 理论题

   - 帧和 IP 包（ARP、帧的转换、路由表等技术）
   - IP 地址的规划（子网划分等技术）

   如：把 IP 地址分成 9 个子网应该怎么分，尽量采用聚合地址或余间路由技术（Cider）

4. 实验题：考实验 3（以实验报告的形式，尽量写的详尽，完整的如何配置这个网络的），并且队访问控制部分没有太多要求，静态路由、端口设置、IP 地址设置等是重点考察。

   - Configuring the network with mask, IP address, gateway, DNS, etc.
   - Rename the host name
   - Configuring the static route, where you can see all the routes are configured in the router.

## 例子

现在有资源：202.202.96.0/21

现在分配：

- 500\*1
- 250\*2
- 120\*3
- 60\*2
- 30\*3

1. 21 位为网络号，剩下 11 位为主机号，所以可以分配 2^11-2=2046 个主机。
2. 我们拿两位来分配给子网，所以可以分配 2^2=4 个子网（00、01、10、11）。
3. 分配：
   - 202.202.96.0/23，500大小，即子网掩码为 255.255.250.0
   - 202.202.98.0/24，250大小
   - 202.202.99.0/24，250大小
   - 202.202.100.
