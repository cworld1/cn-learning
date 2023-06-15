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

- 简单的对ｍ的数 字签名：Bob 使用他自己的私钥对 m 进行了签署 ，创建数字签名 $K^-_B (m)$

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

- Alice 使用 Bob 的公钥 $K_B$ 对 $K^-_B (m)$ 进行验证， 判断 $K^+_B(K^-_B(m)) = m$ 是否成立。

  如果成立，那么签署这个文件的人一定拥有 Bob 的私钥。

数字签名 = 对报文摘要进行数字签署：

![image-20230615170400897](./07-security.assets/image-20230615170400897.png)

#### Hash function algorithms

> 摘自 [密码学家王小云：十年破解 MD5 和 SHA-1 两大国际密码-新华网 (xinhuanet.com)](http://www.xinhuanet.com/politics/2019-12/27/c_1125394020.htm)，有删改。
>
> 时间回到 2004 年，对于国际密码学界来说，这注定是不同寻常的一年。
>
> 这年的 8 月，在美国加州圣巴巴拉召开的国际密码大会上，王小云宣读了自己和研究团队对于 MD4、MD5、HAVAL-128 和 RIPEMD 四个国际著名密码算法的破译结果。
>
> 这被认为是 2004 年密码学界最具突破性的结果，堪称学术界的一场强烈地震。当年国际密码大会总结报告上写道：我们该怎么办？MD5 被重创了，它即将从应用中淘汰。SHA-1 仍然活着……
>
> 多年来，由美国国家标准技术研究院（NIST）颁布的基于哈希函数的 MD5 和 SHA-1 算法，是国际上公认最先进、应用范围最广的两大重要算法，后者更被视为计算安全系统的基石，有着“白宫密码”之称。
>
> 没多久，SHA-1 的末日降临。2005 年 2 月，在美国召开的国家信息安全研讨会上，5 名著名密码学家公布了哈希函数发展史上的重要研究进展——他们收到了来自中国的王小云等 3 位女研究者对 SHA-1 全算法的攻击。
>
> 2005 年，美国《新科学家》杂志在一篇文章中，用了颇具震撼力的标题——《崩溃！密码学的危机》，报道了王小云团队花 10 年时间取得的学术成果。
>
> 2006 年，NIST 颁布了美国联邦机构 2010 年之前必须停止使用 SHA-1 的新政策，并于次年向全球密码学者征集新的国际标准密码算法。
>
> ### “天书”哈希函数到底是什么
>
> 今天，计算机网络、移动网络、物联网、卫星网络还有大数据、云计算，这些人们已经熟知的科技场景，都离不开密码技术的支撑，需要密码来解决安全问题。
>
> 王小云曾将密码比作钥匙：“没有密码的保障，就相当于有人偷了家里的钥匙，可以随时自由进出你家，而你却浑然不知。”
>
> 密码学重要到何种地步？不得不从一个密码学中的基本工具说起，它就是王小云打了多年交道的哈希函数。
>
> 这个时代的所有网络信息安全，需要满足机密性、可认证性、不可抵赖性、完整性与有效性这五大安全属性，才可以有效防御黑客的攻击。其中，有效性是指效率问题，而前四个属性中，机密算法保障机密性，即不被窃取、看到；数字签名算法满足的是可认证性和不可抵赖性；哈希函数算法保证信息的完整性。
>
> 不过，数字签名算法必须和哈希函数一起才能保证可认证性和不可抵赖性。因此，五大安全属性里有三个，都离不开哈希函数。
>
> 密码上的哈希函数，可以将任意长度的消息压缩成固定长度的哈希值，而哈希值就像每个人都拥有唯一的“指纹”一样，哈希函数的重要之处就是能够赋予每个消息唯一的“数字指纹”，即使更改该消息的一个比特，对应的哈希值也会变为截然不同的“指纹”。
>
> 清华大学高等研究院数学博士吴彦冰打了个比方，就像把一本书里的某一页或一个字更改了，但看书的人很难判断更改的地方，即便全书通读一遍也未必能发现，“但通过哈希函数，输入稍有不同，输出结果就会完全不同”。
>
> ### 解密的惊心动魄更多在内心
>
> 吴彦冰曾听老师王小云讲起破解 MD5 的经历，“那时候王老师还没学过编程，就用手写推导的方式，写了 400 多页纸，几百个方程，推导了两三个月才得到结果。”
>
> 王小云沉浸在密码的美妙世界中，享受着外人无法体会的乐趣。生活中她喜欢在家里和实验室养花，有时候思考一个数学问题，却找不到答案时，就会起来打扫打扫卫生，或者是给花浇浇水，干点别的事情，但实际上脑子里一直没有放下科学问题。
>
> 科研过程中，王小云也把这种乐趣传递给学生们。他们既扮演着“设谜者”的角色，设计一套巧妙的密码算法，弥补前人的不足，希冀让攻击者无法突破；同时还扮演着“猜谜人”的角色，把别人设计精妙的体系一举攻破。“参与者会有很大的喜悦感和成就感。”吴彦冰说。
>
> 就如王小云在未来科学大奖的获奖致辞中所说，虽然目前密码学只被少数人所熟悉，但未来会有更多的年轻力量为密码学的发展助力，愿意尽自己的全力去帮助年轻的科学家们开拓密码学这门神秘而又充满力量的学科。（记者完颜文豪、李牧鸣）

计算机中常见的摘要算法（散列函数算法）：

- MD5（RFC 1321 标准，不再完全安全，但是算法简单快速、已经被广泛传播使用，常用于下载文件校验）
- SHA-1（US 标准，不再完全安全，同上）
- SHA-128
- SHA-256（国际上最为常用的算法）
- SM3（由国内王小云开发的算法，尽管目前为止绝对安全，但国际认可度不高）

#### Public-key certification

主要由可信赖中介完成。

- Trusted key distribution center (KDC) 在实体之间扮演可信赖中介的角色；

- 服务器和每一个注册用户都分享一个对称式的密钥（many users）

  ![image-20230615172144403](./07-security.assets/image-20230615172144403.png)

- 该可信赖中介的可信赖的 certification authority (CA) 专门颁布可信赖的证书：

  CA 创建一个证书，捆绑了实体信息和**他的公钥**，而且是被 CA 签署的**（被 CA 用自己的私钥加了密的）**

- CA 说 “this is E’s public key”。

![image-20230615172626271](./07-security.assets/image-20230615172626271.png)

## Securing e-mail

这是一个例子，这里我放几张截图得了，反正就是之前讲的这一套安全系统。

![image-20230615172856623](./07-security.assets/image-20230615172856623.png)

Alice：

- 产生随机的对称密钥 $K_S$
- 使用 KS 对报文加密(为了效率)
- 对 $K_S$ 使用 Bob 的公钥进行加密
- 发送 $K_S(m)$ 和 $K_B(K_S)$ 给 Bob

Bob：

- 使用自己的私钥解密 $K_S$
- 使用 $K_S$ 解密 $K_S(m)$ 得到报文

![image-20230615172840307](./07-security.assets/image-20230615172840307.png)

- Alice 使用了 3 个 keys：自己的私钥，Bob 的公钥，新产生出的对称式密钥

## Securing TCP connections: SSL

SSL: Secure Sockets Layer

为使用 SSL 服务的、基于 TCP 的应用提供传输层次的安全性。

![image-20230615175406133](./07-security.assets/image-20230615175406133.png)

实现了：

- _confidentiality_
- _integrity_
- _authentication_

> [ssl 是什么-ssl 和 tls 的区别-SSL 证书 | Cloudflare](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-ssl/)
>
> ### 什么是 SSL？
>
> 安全套接字层 (SSL) 是一种[加密安全](https://www.cloudflare.com/learning/ssl/what-is-encryption/)[协议](https://www.cloudflare.com/learning/network-layer/what-is-a-protocol/)。它最初由 Netscape 于 1995 年开发，旨在确保 Internet 通信中的隐私、身份验证和数据完整性。SSL 是如今使用的现代 [TLS](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/)加密的前身。
>
> 实施 SSL/TLS 的网站的 URL 中带有“[HTTPS](https://www.cloudflare.com/learning/ssl/what-is-https/)”，而不是“[HTTP”](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/)。
>
> ![HTTP 与 HTTPS](./07-security.assets/http-vs-https.svg)
>
> ### SSL/TLS 如何工作？
>
> - 为了提供高度[隐私](https://www.cloudflare.com/learning/privacy/what-is-data-privacy/)，SSL 会对通过 Web 传输的数据进行加密。这意味着，任何试图截取此数据的人都只会看到几乎无法解密的乱码字符。
> - SSL 在两个通信设备之间启动称为[握手](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)的**身份验证**过程，以确保两个设备确实是它们声称的真实身份。
> - SSL 还对数据进行数字签名，以提供**数据完整性**，验证数据是否在到达目标接收者之前被篡改过。
>
> SSL 已经过多次迭代，安全性逐代增强。SSL 在 1999 年更新为 TLS。
>
> ### SSL/TLS 为何重要？
>
> 最初，Web 上的数据是以明文形式传输的，任何人只要截获消息都可以读取。例如，如果消费者访问了购物网站，下了订单并在网站上输入了他们的信用卡号，那么该信用卡号将不加隐藏地在 Internet 上传播。
>
> 创建 SSL 就是为了纠正此问题并保护用户隐私。通过对用户和 Web 服务器之间传输的所有数据进行加密，SSL 可确保截获数据的人只能看到混乱的字符。消费者的信用卡号现在可以确保安全，仅在他们输入卡号的购物网站上可见。
>
> SSL 还可以阻止某些类型的网络攻击：它对 Web 服务器进行身份验证，这非常重要，因为攻击者通常会尝试建立伪造网站来欺骗用户并窃取数据。它还可以防止攻击者篡改传输中的数据，就像药品容器上的防篡改封条一样。
>
> ### SSL 和 TLS 是同一回事吗？
>
> SSL 是另一个称为 TLS（传输层安全性）的协议的直接前身。在 1999 年，互联网工程任务组（IETF）提出了对 SSL 的更新。由于此更新是由 IETF 开发的，不再牵涉到 Netscape，因此名称更改为 TLS。SSL 的最终版本（3.0）与 TLS 的第一版本之间并无明显差异，应用名称更改只是表示所有权改变。
>
> 由于它们紧密地联系在一起，这两个术语经常互换使用并混为一谈。有些人仍然使用 SSL 来指代 TLS，其他人则使用术语“SSL/TLS 加密”，因为 SSL 仍然具有很大的知名度。
>
> ### SSL 仍然没有落伍吗？
>
> SSL 自 1996 年推出 SSL 3.0 以来未曾更新过，现已弃用。SSL 协议中存在多个已知漏洞，安全专家建议停止使用。实际上，大多数现代 Web 浏览器已彻底不再支持 SSL。
>
> TLS 是依然在网络上实施的最新加密协议，尽管有许多人仍将其称为“SSL 加密”。这可能会使购买安全解决方案的消费者感到困惑。事实上，如今提供“SSL”的任何供应商提供的几乎肯定都是 TLS 保护，这已成为二十多年来的行业标准。但是，由于许多人仍在搜寻“SSL 保护”，因此这个术语在许多产品页面上仍然处于醒目位置。
>
> ### 什么是 SSL 证书？
>
> SSL 只能由具有 [SSL 证书](https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/)（技术上称为“TLS 证书”）的网站来实现。SSL 证书就像身份证或徽章一样，证明某人就是他们所说的真实身份。SSL 证书由网站或应用程序的服务器存储并显示在 Web 上。
>
> SSL 证书中最重要的信息之一是网站的公共[密钥](https://www.cloudflare.com/learning/ssl/what-is-a-cryptographic-key/)。[公钥](https://www.cloudflare.com/learning/ssl/how-does-public-key-encryption-work/)使得加密和身份验证成为可能。用户的设备查看公钥，并使用它与 Web 服务器建立安全的加密密钥。同时，Web 服务器还具有一个保密的私有密钥。私钥解密使用公钥加密的数据。
>
> 证书颁发机构（CA）负责颁发 SSL 证书。
>
> ### SSL 证书有哪些不同类型？
>
> 有几种不同[类型的 SSL 证书](https://www.cloudflare.com/learning/ssl/types-of-ssl-certificates/)。一个证书可以应用于一个或多个网站，具体取决于类型：
>
> - **单域：**单域 SSL 证书仅适用于一个域（“域”是网站的名称，例如 [www.cloudflare.com](https://www.cloudflare.com)）。
> - **通配符：**与单域证书一样，通配符 SSL 证书仅适用于一个域。但是，它也包括该域的子域。例如，通配符证书可以覆盖 [www.cloudflare.com](https://www.cloudflare.com)、blog.cloudflare.com，和 developers.cloudflare.com，而单域证书只能覆盖第一个。
> - **多域：**顾名思义，多域 SSL 证书可以应用于多个不相关的域。
>
> SSL 证书还具有不同的验证级别。验证级别就像背景检查一样，并且级别会根据检查的彻底性而变化。
>
> - **域验证：**这是最严格的验证级别，也是最便宜的级别。企业只需要证明他们控制着域。
> - **组织验证：**这是一个需要亲力亲为的过程：证书机构直接联系请求证书的人员或企业。这些证书更受用户信赖。
> - **扩展验证：**在发出 SSL 证书之前，需要对组织进行全面的背景检查。

### Pretty good privacy (PGP)

Internet e-mail 加密方案，事实上的标准。该方案是一个商业方案，后来也有了开源的、非商业化的 GPG 方案，与 PGP 基本完全相同。

![image-20230615175925826](./07-security.assets/image-20230615175925826.png)
