import{_ as e,o as a,c as i,e as l}from"./app-3c569d04.js";const d="/assets/image-20230314170054429-bd063dde.png",o="/assets/image-20230314170120240-61ceba35.png",n="/assets/image-20230314170450886-a4f7b6c9.png",c={},p=l('<h1 id="_3-三层交换及-vlan-间路由" tabindex="-1"><a class="header-anchor" href="#_3-三层交换及-vlan-间路由" aria-hidden="true">#</a> 3. 三层交换及 VLAN 间路由</h1><p>网关(Gateway)又称网间连接器、协议转换器。网关在<strong>传输层</strong>上以实现网络互连，是最复杂的网络互连设备，仅用于两个<strong>高层协议不同的</strong>网络互连。网关的结构也和路由器类似，<strong>不同的是互连层</strong>。网关既可以用于广域网互连，也可以用于局域网互连。</p><p>顾名思义，网关(Gateway)就是一个网络连接到另一个网络的“关口”。如三层交换机或路由器等。</p><h2 id="实验目的" tabindex="-1"><a class="header-anchor" href="#实验目的" aria-hidden="true">#</a> 实验目的</h2><ul><li>进一步理解三层交换机配置的基本原理。</li><li>掌握三层交换机的基本命令配置。</li><li>掌握不同组网通信含义。</li></ul><h2 id="实验原理" tabindex="-1"><a class="header-anchor" href="#实验原理" aria-hidden="true">#</a> 实验原理</h2><p>系统视图下：</p><ul><li><p><code>interface vlan-interface &lt;vlan_id&gt;</code>：创建 VLAN 接口或进入 VLAN 接口视图。（Undo 删除）</p><blockquote><ul><li><p>VLAN 接口视图和 VLAN 视图是不同的；</p></li><li><p>VLAN 路由接口（或简称 VLAN 接口）与 VLAN 具有对应关系,是整个 VLAN 的逻辑接口,只有在已经建立了某个 VLAN 的情况下，才能为该 VLAN 建立路由接口。</p></li><li><p>在 2 层交换机上,由于只有一个默认 VLAN（VLAN1），只能为 vlan 1 建立路由接口，而在三层交换机下，可以为每个 VLAN 建立一个逻辑接口。</p></li></ul></blockquote></li></ul><p>接口视图下：</p><ul><li><code>ip address ip-address net-mask (sub)</code>：给 VLAN 接口指定 IP 地址和掩码。</li></ul><h2 id="实验步骤" tabindex="-1"><a class="header-anchor" href="#实验步骤" aria-hidden="true">#</a> 实验步骤</h2><h3 id="实验-1-在三层交换机上实现不同网段相同-vlan-计算机互联" tabindex="-1"><a class="header-anchor" href="#实验-1-在三层交换机上实现不同网段相同-vlan-计算机互联" aria-hidden="true">#</a> 实验 1：在三层交换机上实现不同网段相同 VLAN 计算机互联</h3><p>STEP 1：按图示搭建网络环境，每 6 人为一组,均通过网线连接在 2 层交换机 S2 的 1-6 号口。为各计算配置 IP 地址，同侧的三台计算机在同一网段，然后用 ping 命令测试其连通性，六台计算机属于同一 VLAN 的情况下属于同一网段的计算机应该都能连通。</p><p><img src="'+d+'" alt="image-20230314170054429" loading="lazy"></p><p>STEP 2：将二层交换机 S2 级联到三层交换机 S1，在 S1 上创建 VLAN 路由接口，并在 VLAN 接口视图下配置路由接口的主从 IP 地址，然后测试不同网段间计算的连通性。</p><p><img src="'+o+'" alt="image-20230314170120240" loading="lazy"></p><ol><li><p><code>system-view</code>：进入系统视图</p></li><li><p>链接三层交换机 S1，建立 vlan 1 的接口视图，并设置其 ip 地址：</p><ol><li><p><code>vlan 1</code>：进入 vlan 1 视图</p></li><li><p><code>interface vlan 1</code>：为 vlan 1 创建路由接口</p></li><li><p><code>ip address 192.168.0.1 255.255.255.0</code>：为 vlan 1 的路由接口配置 IP 地址</p></li><li><p><code>ip address 202.0.0.1 255.255.255.0 sub</code>：为 vlan 1 的路由器接口配置子 IP 地址</p></li></ol></li><li><p>使用 <code>ping</code> 命令测试连通性。</p></li></ol><h3 id="实验-2-不同网段不同-vlan-的计算机互联" tabindex="-1"><a class="header-anchor" href="#实验-2-不同网段不同-vlan-的计算机互联" aria-hidden="true">#</a> 实验 2：不同网段不同 VLAN 的计算机互联</h3><p>STEP 1：按图示搭建网络环境，每 6 人为一组，均通过网线连接在 2 层交换机 S2 的 1-6 号口。为各计算配置 IP 地址，同侧的三台计算机在同一网段同一 VLAN。然后用 ping 命令测试其连通性，同侧三台计算机应该能连通。</p><p><img src="'+n+'" alt="image-20230314170450886" loading="lazy"></p><p>STEP 2：在交换机 S1 上，建立 VLAN 100 和 VLAN 200 的路由接口，并分别设置 ip 地址，该 ip 应和 VLAN 内的计算机 ip 地址处于同一网段内。将计算机网段地址设置为对应的 VLAN 接口地址，通过 ping 命令测试其连通性。</p><ol><li><code>vlan 100</code>：创建 vlan 100 并进入其视图</li><li><code>port e1/0/1 to e1/0/3</code>：将 1-3 号以太口加入 VLAN100</li><li><code>vlan 200</code>：创建 vlan 200 并进入其视图</li><li><code>port e1/0/4 to e1/0/6</code>：将 4-6 号以太口加入 VLAN200</li><li><code>int vlan 100</code>：创建 vlan100 的路由接口</li><li><code>ip address 192.168.0.1 255.255.255.0</code>：配置 IP 地址</li><li><code>int vlan 200</code>：创建 vlan200 的路由接口</li><li><code>ip address 202.0.0.1 255.255.255.0</code>：配置 IP 地址</li></ol>',22),s=[p];function t(r,h){return a(),i("div",null,s)}const N=e(c,[["render",t],["__file","03-三层交换及VLAN间路由.html.vue"]]);export{N as default};
