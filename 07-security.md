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

是与堆成密钥密码学完全不同的方法 [Diffie-Hellman76, RSA78]

这种密码学一般都有这样的特性：

- 发送方和接收方无需共享密钥

- 一个实体的公钥公诸于众
- 私钥只有他自己知道
