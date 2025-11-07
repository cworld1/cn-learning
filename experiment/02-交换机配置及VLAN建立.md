# 2. 交换机配置及 VLAN 建立

> VLAN：Local Virtal Area Network，即本地虚拟局域网络

## 实验目的

- 了解交换机功能，学会使用 Windows 操作系统上的超级终端程序，通过交换机的控制口简单配置交换机。
- 学习一些交换机的基本配置命令。
- 学习查看配置过程中的出错信息和各种配置信息。
- 学习查看相关操作手册和帮助文档。
- 学习 VLAN 的建立、配置和调试命令。
- 学习如何实现 VLAN 间通讯，掌握交换机端口模式的使用。

## 实验原理

### 连接方式

交换机的终端控制一般使用串专用串口或 Telnet。其中专用串口方式的连接一般为：

交换机 Console 口 ↔ 交换机 Console 线 ↔ PC 机串口（COM 口）

> 注：
>
> 1. 串口，也叫 COM 口（Cluster Communication Port），即串行通讯端口。
> 2. 注意连接不能太远，最好控制在 15 米以内（实验用的线为 RS232）。

### 以太网端口链路类型

以太网端口有三种链路类型有三种：Access、Hybrid 和 Trunk。

- Access 类型的端口只能属于一个 VLAN，一般用于连接计算机的端口；
- Trunk 类型的端口可以属于多个 VLAN，可以接收和发送多个 VLAN 的报文，一般用于路由器之间连接的端口；
- Hybrid 类型的端口可以属于多个 VLAN，可以接收和发送多个 VLAN 的报文，可以用于路由器之间连接，也可以用于连接用户的计算机。

> Hybrid 端口和 Trunk 端口的不同之处在于 Hybrid 端口可以允许多个 VLAN 的报文发送时不打标签，而 Trunk 端口只允许缺省 VLAN 的报文发送时不打标签。

| 端口链路类型 | 适用连接对象         |
| ------------ | -------------------- |
| Access       | 计算机               |
| Trunk        | 主机通讯             |
| Hybrid       | 计算机和主机通讯均可 |

### 终端常用命令

> 三种视图：
>
> 1. 用户视图：`＜switch＞`
> 2. 系统视图：`［switch］`
> 3. 接口视图：`［switch-Ethernet**］`
> 4. VLAN 视图：`［switch-vlan**］`

通用命令：

- `quit | return`：返回用户视图/退出当前端口
- `undo xxx`：取消执行某个命令
- `reboot`：重启当前交换机
- `display  history-command`：显示历史命令，命令行接口为每个用户缺省保存 10 条历史命令。临时调用命令可以尝试：
  - <kbd>Ctrl+P</kbd> 或 <kbd>↑</kbd>：上一条历史命令
  - <kbd>Ctrl+N</kbd> 或 <kbd>↓</kbd>：下一条历史命令
- <kbd>TAB</kbd>：快速补全命令

用户视图下：

- `system-view`：进入系统视图

系统视图下：

- `reset saved-configuration`：重置配置（需要重启应用配置）
- `display saved-configuration`：查看当前配置
  其中部分显示信息：
  - `telnet server`：通过网络（Telnet）配置交换机
  - `interface Vlan-interface*`：连接上游主机，其 ip 可以填写某个指定的 ip，也可以填写 dhcp-alloc（动态主机分配协议），使用上游主机自动分配 ip（ip 协议一般用来连接互联网）
- `sysname <switch-name>`：给交换机重新命名
- `vlan <vlan_id>`：创建指定名称的 VLAN（VLAN 最多能定义 4094 个）
- `display|displ <ethernet>`：查看某个端口的状态
- `(interface) <ethernet>` 进入某个端口（如 ethernet0/1）的视图
- `save`：保存当前配置到本地，需要手动确认并命文件名（文件名可以默认）。

端口视图下：

- `display interface`：查看当前端口信息
- `speed 10|100|1000|auto`：设置端口的速度（如 10 代表 10M）
- `duplex auto|full|half`：设置端口的模式（自动、双工、半双工）
- `port link-type access|hybrid|trunk`：设置以太网端口的链路类型（Access、Hybrid 或 Trunk）
- `port access vlan <vlan_id> (to vlan_id)`：将该端口加入到指定 VLAN 下
- `port hybrid vlan <vlan_id_list> tagged|untagged`：将 Hybrid 端口加入到指定 VLAN
- `port trunk permit vlan <vlan_id_list>|all`：将当前以太网端口加入到指定 VLAN
- `shutdown`：关闭当前端口

VLAN 视图下：

- `display vlan`：查看当前 VLAN 信息
- `port <interface_list>`：将指定端口（或端口列表）添加到该 VLAN 下。

## 实验环境

- A PC with Windows XP, Super Shell（超级终端）
- A Switch with 相关操作手册
- A Console 线缆（RS232 型号）

## 实验步骤

### 基础实验内容

1. 使用 Console 线将交换机的 Console 口与电脑 COM 口相连。
2. 在 PC 机上运行超级终端程序进行连接：
   1. 新建配置并为之命名，指定 COM 口。
   2. 设置终端通信参数为波特率（位/秒）为 9600bit/s ，数据位 8 位，无校验，停止位 1 位和无流控制。
      ![](./02-交换机配置及VLAN建立.assets/image-20230308193235.png)
3. 连接终端：交换机上电，终端上开始显示以太网交换机的自检信息，自检结束后提示用户键入回车，之后将出现命令行提示符，如 `＜Quidway＞` 并可能伴随显示 `login from Console` 等提示，即表示交换机正确连接成功。
4. 重置配置文件：
   1. `reset saved-configuration`：还原初始配置（用户视图下使用）
   2. `reboot`：重启交换机（用户视图下使用）
   3. `display  current-configuration`：显示当前配置信息
5. `sysname SwitchA`：修改交换机名称

### 实验 1：在同一台交换机上划分 VLAN

STEP 1：图示搭建网络环境,每 6 人为一组,均通过网线连接在同一台交换机上,分别连接在交换机的 1-6 号口。为各计算配置 IP 地址（网关可以暂时不配），要求在同一网段，然后用 ping 命令测试其连通性，六台计算机属于同一 VLAN 的情况，应该都能连通。

![](./02-交换机配置及VLAN建立.assets/image-20230308201241.png)

STEP 2：在 6 台计算机完全连通之后，将同在一侧的三台计算机所在的端口划分为一个 VLAN，另一侧的三台计算机所在的端口划分为另一个 VLAN（VLAN 编号自由设定）。利用 ping 命令测试其连通性，可以发现同属一个 VLAN 计算机可以连通，而不同 VLAN 计算机不能连通。删除 VLAN，六台计算机恢复全连通状态。

![](./02-交换机配置及VLAN建立.assets/image-20230308201356.png)

1. `vlan 10`：创建 VLAN
2. `vlan 10`：进入 VLAN 10
3. `port ethernet 1/0/1 to ethernet 1/0/4`：将 1~4 端口接入到 VLAN10 内
4. `quit`：退出 VLAN 10
5. 各台电脑均接入交换机，并设置好 IP 地址，互相使用 `ping` 指令测试连通性。
6. `vlan 11`：创建 VLAN 11
7. `vlan 11`：进入 VLAN 11
8. `port ethernet 1/0/3 to ethernet 1/0/4`：将 3~4 端口接入到 VLAN11 内
9. `quit`：退出 VLAN 11
10. 3、4 电脑互相 `ping` 进行测试，并对 1、2 电脑尝试 `ping` 测试。

### 实验 2：同一个 VLAN 的跨交换机通讯

1. `interface ethernet 1/0/1`：进入端口 `ethernet 1/0/1`
2. `port trunk`：设置当前以太网端口的链路类型为 Trunk
3. `port trunk permit vlan 11`：将当前以太网端口加入到 VLAN 11
4. 使用相同操作设置另外一台交换机
5. 将两台交换机的端口 1 相互连接
6. 对两台交换机对应的 3、4 电脑互相 `ping` 进行测试，并对 2 电脑尝试 `ping` 测试。
