# Chapter 3: Transport Layer

## Outline

1. Transport-layer services
2. Multiplexing and demultiplexing
3. Connectionless transport: UDP
4. Principles of reliable data transfer
5. Connection-oriented transport: TCP

   - segment structure
   - reliable data transfer
   - flow control
   - connection management

6. Principles of congestion control
7. TCP congestion control

## Transport-layer services

### Transport vs. network layer

网络层是协议栈中的第三层，负责处理互联网上每个主机之间的路由。该层有两个主要的任务：

1. 选择最佳路径将数据包发送到目标地址；
2. 控制每个数据包在网络中的传输。网络层协议常用的是 IP（Internet Protocol），它定义了如何通过互联网把数据包从源主机传输到目标主机。

传输层是协议栈中的第四层，是端到端通信的主要协议。传输层实现了数据传输的可靠性，并采用流控制和拥塞控制等机制来协调系统中的数据流。该层的两个最常用的协议是 TCP（Transmission Control Protocol）和 UDP（User Datagram Protocol）。TCP 提供可靠的数据传输，而 UDP 则提供无连接、不可靠和基于报文的传输。

因此，网络层和传输层具有不同的目的和职责。网络层处理路由和数据包转发，而传输层负责端到端通信可靠性，数据流控制和拥塞控制等方面的任务。

## Multiplexing and demultiplexing

> [计算机网络：多路复用（Multiplexing） VS 多路分解（Demultiplexing）\_计算机 demultiplexing_SongXJ--的博客-CSDN 博客](https://blog.csdn.net/SongXJ_01/article/details/106880461)
>
> ### Multiplexing 多路复用
>
> 从源主机的不同套接字（socket）中收集数据块，并为每个数据块封装上首部信息（这将在多路分解时使用）从而生成报文段（segment），然后将报文段传递到网络层的工作称为多路复用。
>
> - 在 TCP 或者 UDP 传输过程中，数据需要被不同程序识别，multiplexing 因此诞生
> - 一般情况下 multiplexing 有以下几个 field 用于区分不同程序所需要的数据 source ip, source port, destination ip, destination port
>
> ### Demultiplexing 多路分解
>
> 将传输层报文段中的数据交付到正确的套接字的工作称为多路分解。
>
> - 通过检验上述 field, 传输协议（transport layer protocol）将不同数据包发送至正确的 socket port
> - 0-1023 是被各种协议占用的端口，1024-65535 是一般程序可用的端口

## Connectionless transport: UDP

### UDP: User Datagram Protocol [RFC 768]

基础原理已经在 [Chapter 2@Client/server socket: UDP](./02-application-layer#client-server-socket-udp) 讲过，不再赘述。

### UDP: segment header

> [Segmentation Explained with TCP and UDP Header (computernetworkingnotes.com)](https://www.computernetworkingnotes.com/ccna-study-guide/segmentation-explained-with-tcp-and-udp-header.html)
>
> ### Segmentation
>
> Segmentation is the process of dividing large data stream into smaller pieces. This functionality allows a host to send or receive a file of any size over the any size of network. For example, if network bandwidth is 1 Mbps and file size is 100 Mb, host can divide the file in 100 or more pieces. Once a piece becomes less or equal to the network bandwidth in size, it can be transferred easily. Destination host, upon(在…之后) receiving all pieces, joins them back to reproduce the original file.
>
> If an application wants to use UDP to send its data, it can’t give the data to UDP in actual size. It has to use its own mechanism(机制) to detect whether segmentation is required or not. And if segmentation is required, it has to do it on its own before giving data to UDP.
>
> ### Packing data for transmission
>
> Both protocols pack data in similar fashion. Both add a header with each data piece. A header mainly contains two types of information;
>
> 1. The information that is required to send the segment at the correct destination.
> 2. The information that is required to support the protocol specific features.
>
> ### How UDP Work with header
>
> UDP neither provides any protocol specific service, nor adds any additional information in the header.
>
> Following figure shows data with UDP header.
>
> ![UDP header](./03-transport-layer.assets/csg26-02-udp-header.png)
>
> | Field            | Description                                                                       |
> | ---------------- | --------------------------------------------------------------------------------- |
> | Source port      | Port number of the application that is transmitting data from the source computer |
> | Destination port | Port number of the application that will receive the data at destination.         |
> | Length           | Denotes the length of the UDP header and the UDP data                             |
> | Checksum         | CRC of the complete segment                                                       |
> | Data             | Data which it received from the application                                       |

### UDP checksum

Goal: detect “errors” (e.g., flipped bits(比特位的翻转)) in transmitted segment

UDP（用户数据报协议）checksum 是一种用于检测 UDP 数据包完整性的简单校验和。当 UDP 数据包被发送到网络时，发送端计算校验和并将其添加到 UDP 数据包中的 checksum 字段中。接收端通过再次计算校验和并将其与数据包的 checksum 字段进行比较来检测数据包是否在传输过程中出现任何错误或损坏。如果计算出的校验和不匹配，则数据包被认为是损坏的。UDP 校验和是 UDP 协议的一项重要功能，可确保数据在传输过程中的完整性和正确性。

## Principles of reliable data transfer

Characteristics(特点) of unreliable channel will determine(决定) complexity of reliable data transfer protocol.

::: tip
Reliable data transfer(rdt) 即可靠传输。
:::

> [网络协议 7：【传输层】可靠传输（rdt）的原理 - 掘金 (juejin.cn)](https://juejin.cn/post/7030066301062086670)
>
> ![image.png](./03-transport-layer.assets/6d5c25bbe2e5400fbc9335d7050819c1tplv-k3u1fbpfcp-zoom-in-crop-mark4536000.webp)
>
> ### rdt 1.0
>
> rdt 1.0 是基于**理想情况下**的协议，假设所有信道都是可靠的——没有比特位的翻转，没有数据包的丢失与超时。所以 rdt 1.0 的传输功能就是：**发送方发送数据，接收方等着接受数据**。
>
> ![image-20230330182543746](./03-transport-layer.assets/image-20230330182543746.png)
>
> ### rdt 2.0
>
> - rdt 2.0 在 rdt1.0 的基础上考虑了 **bit errors**，即，不可信信道中数据包中的 1 可能会变 0，0 可能会变成 1。rdt2.0 的任务是**发现并修复**这些 bit errors
> - rdt 1.0 中接受者和发送者固定，rdt2.0 引入有限状态自动机 finite state machines (FSM) 来切换指定发送者和接受者
>
> ::: tip Finite State Machines
> 即只有有限种状态的，在特定条件下能切换状态的机器。比如刷卡就转的这种门禁机器。
> :::
>
> rdt 2.0 增加了3种新机制来提升：
>
> 1. 通过checksum来错误校验
> 2. 接收者反馈接受正误信息：
>    - acknowledgements (ACKs): receiver explicitly(明确地) tells sender that pkt() received OK
>    - negative acknowledgements (NAKs): receiver explicitly tells sender that pkt had errors
> 3. 出错就重传
>
> 即，传输层对应用层的数据进行打包处理时，新增checksum（校验和），从而接收端可以对其数据包进行检验，如果正确，返回ACK，发送者继续发送下一个数据包；如果不正确，返回NAK，发送者重传数据。
