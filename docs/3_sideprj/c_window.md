---
id: window
title: 윈도우 MBD 개요
---

<div align="right">
  <font size="4">
    Since 21.07.30 ~ 21.12.31
  </font>
</div>

---

## 윈도우 시스템 구성 {#window-system-config}

실제 타겟을 대상으로 MBD를 통해 개발을 수행할 수 있음을 검증는 것을 목적으로 하여, 시뮬레이션을 통해 기능로직을 구현하고 자동생성코드를 타겟에 실행하여 기능동작을 검증함.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_design_init_system_comcept.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

## 윈도우 개발 개요

1. [설계 [☜ click for more]](./window/window_design) : 개발 컨셉을 수립하고, 정의한 요구사항을 토대로 아키텍처를 설계한다.
2. [구현 [☜ click for more]](./window/window_realize) : MBD를 통해 기능로직을 구현한다.
3. [검증 [☜ click for more]](./window/window_verify) : 코드를 자동생성하고, 타겟구동을 통해 기능을 검증하고, 요구사항-구현 간의 추적성을 확보한다.

