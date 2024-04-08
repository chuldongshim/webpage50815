---
id: ethernetM
title:  CAN/CAN-FD to 이더넷 컨버터 모듈 (Updating)
---

<div align="right">
  <font size="4">
    2024 ~ <br/>
  </font>
</div>

---

## 개요

### 목적

기존에 진행한 이더넷 통신모듈에 CAN/CAN-FD 기능을 추하여 이더넷을 통해 CAN/CAN-FD 패킷을 송/수신 할 수 있는 컨버터 모듈을 개발하는 프로젝트입니다.
* 기존에 판매되는 제품을 벤치마킹 하여 더 나은 기능을 수행하는 제품을 개발하는 능력을 키우기 위해 진행하는 개인 프로젝트 입니다.  
* 전기자동차에는 앞으로 CAN-FD와 Ethernet 통신이 많이 사용될 것으로 판단되어 두 기술을 Master하면 쓸모가 있을 것 같아보여 진행하고 있습니다.  


### 컨셉

* 모니터링  
BBB를 CAN/CAN-FD 네트워크 또는 이더넷 네트워크에 연결하여 송/수신 패킷을 무선으로 모니터링 합니다.

<p align="center">
	<img
		src={require('/img/6_ethM/ethM_Concept.png').default}
		alt="Example banner"
		width="450"
	/>
</p>

* 보드개발  
기존에 개발을 진행했던 이더넷 통신모듈에 CAN/CAN-FD 기능을 추가할 계획입니다.  
주로 SW개발을 주업무로 수행하여 HW개발은 많이 부족하지만 기회가 된다면   
추후 PCB열해석, 임피던스 매칭 등 고급기술도 학습/적용해 볼 계획입니다.

<p align="center">
	<img
		src={require('/img/6_ethM/ethM_fifth_udp_multicast.png').default}
		alt="Example banner"
		width="450"
	/>
</p>


## 동작확인

### stm32-stm32 for CAN

1. stm32-stm32 CAN통신 동작확인 완료(23.12.21)
<p align="center">
	<img
		src={require('/img/6_ethM/ethM_Can_Config.png').default}
		alt="Example banner"
		width="450"
	/>
</p>

### stm32-BBB for CAN

2. stm32-BBB CAN통신 동작확인 완료(24.04.06)
<p align="center">
	<img
		src={require('/img/6_ethM/ethM_Can_bbb_Config.png').default}
		alt="Example banner"
		width="450"
	/>
</p>

### s32k-BBB for CAN-FD

s32k1-BBB CAN-FD통신 동작확인 (진행중)

<p align="center">
	<img
		src={require('/img/6_ethM/ethM_CanFD.png').default}
		alt="Example banner"
		width="450"
	/>
</p>

CAN-FD 프로토콜
<p align="center">
	<img
		src={require('/img/6_ethM/ethM_packet_for_can_canfd.png').default}
		alt="Example banner"
		width="450"
	/>
</p>

## C++/Python SW 개발

### CAN통신 모니터링

1. Python을 통한 CAN패킷 모니터링
<p align="center">
	<img
		src={require('/img/6_ethM/ethM_Can_Aanlyzer.png').default}
		alt="Example banner"
		width="450"
	/>
</p>


