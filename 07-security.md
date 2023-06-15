---
title: "Chapter 8: Security"
---

## Outline

1. What is network security?
2. Principles of cryptography
3. Message integrity, authentication
4. Securing e-mail
5. Securing TCP connections: SSL
6. Network layer security: IPsec
7. Securing wireless LANs
8. Operational security: firewalls and IDS

## What is network security?

Network security 包含：

- **机密性**：只有发送方和指定的接收方能否理解传输的报文内容，并且遵从：

  - 发送方加密报文
  - 接收方解密报文

- **认证**：发送方和接收方需要**确认对方的身份**

- **报文完整性**：发送方、接受方需要**确认报文在传输的过程中或者事后没有被改变**

- **访问控制和服务的可用性**：服务可以接入以及对用户而言是可用的

### 网络交流的双方与行恶的第三方

双方可能是：

- 现实世界中的两个人
- 电子交易中的 Web browser/server
- 在线银行的 client/server
- DNS servers
- 路由信息的交换等

第三方可以做：

- 窃听：截获报文

- 插入：在连接上插入报文
- 伪装：可以在分组的源地址写上伪装的地址
- 劫持：将发送方或者接收方踢出，接管连接
- 拒绝服务：阻止服务被其他正常用户使用（e.g.,通过对资源的过载使用）

## Principles of cryptography

Principles of cryptography 即加密原理

一些专业词汇：

- plain text 纯文本
- cipher text 密文

密码学上我们把加密方式分为：

- 对称密钥密码学：发送方和接收方的密钥相同
- 公开密钥密码学：发送方使用接收方的公钥进行加密，接收方使用自己的私钥进行解密

### 对称密钥加密

Symmetric key cryptography 即对称密钥加密

双方共享一个对称式的密钥。

#### 替换密码

如单码替换密码，将一个字母替换成另外一个字母（密码强度非常低）

#### DES: Data Encryption Standard

- 块式加密，也叫块密码（block cipher）
- US 加密标准[NIST 1993]
- 56-bit 对称密钥, 64-bit 明文输入

DES 本身也很安全，破解需要非常长的时间。

> [什么是 DES 算法，详解 DES 算法的基本原理 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/575214691)
>
> DES 是一个分组加密算法，就是将明文分组进行加密，每次按顺序取明文一部分，一个典型的 DES 以 64 位为分组，加密解密用算法相同。它的密钥长度为 56 位，因为每组第 8 位是用来做奇偶校验，密钥可以是任意 56 位的数，保密性依赖于密钥。 DES 算法的核心主要包括两部分，第一部分是 Feistel 结构，第二部分是 16 个子密钥的生成。

使 DES 更安全：

- 使用 3 个 key， 3 重 DES 运算
- 密文分组成串技术

但安全性还是在日渐下降，所以我们推出了新的加密方法。

#### AES: Advanced Encryption Standard

- 也是块密码
- 新的对称密钥 NIST 标准(Nov. 2001) 用于替换 DES
- 数据 128bit 成组加密
- 支持 128, 192, or 256 bit 三种长度的密钥

> [什么是 AES 加密？详解 AES 加密算法原理流程 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/562256846)
>
> AES 是高级加密标准，在密码学中又称 Rijndael 加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的 DES，目前已经被全世界广泛使用，同时 AES 已经成为对称密钥加密中最流行的算法之一。
>
> AES 支持三种长度的密钥：128 位，192 位，256 位。平时大家所说的 AES128，AES192，AES256，实际上就是指的 AES 算法对不同长度密钥的使用。

AES 加密使用多轮加密算法，每轮包括四个步骤：SubBytes、ShiftRows、MixColumns 和 AddRoundKey。这些步骤通过对明文和密钥进行一系列的替换、移位和异或操作，以实现加密。解密时，需要将加密过程中的操作逆序执行。

### 公开密钥密码学

对称加密模式有一个最大弱点：甲方必须把加密规则告诉乙方，否则无法解密。保存和传递密钥，就成了最头疼的问题。公开密钥密码学就是与对称密钥密码学完全不同的方法 [Diffie-Hellman76, RSA78]。

这种密码学一般都有这样的特性：

- 发送方和接收方无需共享密钥
- 一个实体的公钥公诸于众
- 私钥只有他自己知道

> [RSA 算法原理（一） - 阮一峰的网络日志 (ruanyifeng.com)](https://ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)
>
> 1976 年，两位美国计算机学家 Whitfield Diffie 和 Martin Hellman，提出了一种崭新构思，可以在不直接传递密钥的情况下，完成解密。这被称为["Diffie-Hellman 密钥交换算法"](https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange)。这个算法启发了其他科学家。人们认识到，加密和解密可以使用不同的规则，只要这两种规则之间存在某种对应关系即可，这样就避免了直接传递密钥。
>
> 这种新的加密模式被称为"非对称加密算法"。
>
> 1. 乙方生成两把密钥（公钥和私钥）。公钥是公开的，任何人都可以获得，私钥则是保密的。
> 2. 甲方获取乙方的公钥，然后用它对信息加密。
> 3. 乙方得到加密后的信息，用私钥解密。
>
> 如果公钥加密的信息只有私钥解得开，那么只要私钥不泄漏，通信就是安全的。
>
> ![img](./07-security.assets/bg2013062702.jpg)
>
> 1977 年，三位数学家 Rivest、Shamir 和 Adleman 设计了一种算法，可以实现非对称加密。这种算法用他们三个人的名字命名，叫做[RSA 算法](https://zh.wikipedia.org/zh-cn/RSA加密算法)。从那时直到现在，RSA 算法一直是最广为使用的"非对称加密算法"。毫不夸张地说，只要有计算机网络的地方，就有 RSA 算法。

#### RSA

> [公开密钥加密之 RSA 算法【概念+计算+代码实现】\_rsa 算法代码\_MIKE 笔记的博客-CSDN 博客](https://blog.csdn.net/m0_51607907/article/details/123884953)
>
> ### 密钥计算方法
>
> 1. 选择两个大素数 p 和 q(典型值为 1024 位)
> 2. 计算 `n=p×q` 和 `z=(p-1)×(q-1)`（其中 n 表示欧拉函数）
> 3. 选择一个与 z 互质的数，令其为 d
> 4. 找到一个 e 使满足 `exd= 1 (mod z)`
> 5. 公开密钥为 `(e，m)`，私有密钥为 `(d，m)`
>
> ### 加密方法
>
> 1. 将明文看成比特串，将明文划分成 k 位的块 P 即可，这里 k 是满足 $2*k<n$ 的最大整数。
> 2. 对每个数据块 P，计算 $C= P^e(mod\ n)$，而 C 即为 P 的密文。
>
> ### 解密方法
>
> 对每个密文块 C，计算 $P=C^d(mod\ n)$，P 即为明文。
>
> ### RSA 算法流程图
>
> ![RSA算法流程图](./07-security.assets/rsa.png)
>
> 代码实现：[2️⃣ 代码实现 (csdn.net)](https://blog.csdn.net/m0_51607907/article/details/123884953#t14) 有时间可以看看学一学。

RSA 的一个重要的特性：

![image-20230608182124110](./07-security.assets/image-20230608182124110.png)

Exponentiation in RSA is computationally intensive. RSA 中的求幂运算是计算密集型的。

## Message integrity, authentication

### Authentication

即信息完整性与认证

- Protocol ap1.0：直接发送对方信息
- Protocol ap2.0：对方信息中加入了 IP 地址
- Protocol ap3.0：对方信息中加入了自己的密码证明
- Protocol ap3.1：对方信息中加入了自己的加密之后的密码来证明

> 重放攻击：将之前的操作复现一遍，从而欺骗对方。

- Protocol ap4.0：为了证明 Alice 的活跃性, Bob 发送给 Alice 一个 nonce, R。Alice 必须返回加密之后的 R，使用双方约定好的 key。

  > Nonce: 一生只用一次（_once-in-a-lifetime_）的整数 R

  问题是需要双方共享一个对称式的密钥。这个协议的缺点是需要共享秘钥！

- Protocol ap5.0：使用 nonce，公开密钥加密技术

  （安全漏洞 —— 中间攻击）仍然存在问题：

  - Trudy 用自己的私钥加密 R，传给 Bob 公钥
  - Trudy 截获 Alice 的信息和公钥，用 Alice 的 公钥解密她的私钥

  至此 Bob 与 Alice 之间的信息全被 Trudy 截获

  ![image-20230615162125059](./07-security.assets/image-20230615162125059.png)

### Message integrity

#### Digital signatures

即数字签名。我们类比于手写签名。

特性：

- 可验证性 _verifiable_
- 不可伪造性 _nonforgeable_
- 不可抵赖性 _non-repudiation_

其中重点：

- 谁签署：接收方（Alice）可以向他人证明是 Bob，而不是其他人签署了这个文件（包括 Alice）
- 签署了什么：这份文件，而不是其它文件

过程：

- 简单的对ｍ的数  字签名：Bob 使用他自己的私钥对 m 进行了签署 ，创建数字签名 $K^-_B (m)$

  ![image-20230615163120828](./07-security.assets/image-20230615163120828.png)

::: tip Message digests

但这里要注意的是，对长报文进行公开密钥加密算法的实施需要耗费大量的时间。所以我们约定了一个指定的长度文本即可。这就要用到报文摘要（Message digests）。

对 m 使用散列函数 H，获得固定长度的报文摘要 H(m)。

![image-20230615163515880](./07-security.assets/image-20230615163515880.png)

散列函数的特性：

- 多对 1
- 结果固定长度
- 给定一个报文摘要 x，反向计算出原报文在计算上是不可行的 $x = H(m)$

:::

- 假设 Alice 收到报文 m，以及数字签名 $K^-_B (m)$

- Alice 使用 Bob 的公钥 $K_B$ 对 $K^-_B (m)$ 进行验证， 判断 $K^+_B(K^-_B(m)) = m$是否成立。

  如果成立，那么签署这个文件的人一定拥有 Bob 的私钥。
