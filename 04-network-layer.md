---
title: "Chapter 4: Network Layer (The Data Plane)"
---

## Outline

1. Overview of Network layer
   - data plane
   - control plane
2. What’s inside a router
3. IP: Internet Protocol
   - datagram format
   - fragmentation
   - IPv4 addressing
   - network address translation
   - IPv6
4. Generalized Forward and SDN
   - match
   - action
   - OpenFlow: examples of match-plus-action in action

## Overview of Network layer

- transport segment(片段) from sending to receiving host 
- on sending side encapsulates(封装) segments into datagrams(数据报；数据包)
- on receiving side, delivers(传送) segments to transport layer
- network layer protocols(协议) in every host(主机), router
- router examines(检查) header fields in all IP datagrams passing through it

Two key network-layer functions:

- forwarding: move packets from router’s input to appropriate(适当的) router output

- routing: determine(确定) route taken by packets from source to destination (using routing algorithms)

- 
