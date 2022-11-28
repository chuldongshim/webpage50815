---
id: window_design_architecture
title: 아키텍처 설계
---
---

## 아키텍처 설계

### 컨셉 설계

시스템은 크게 공통으로 사용되는 모듈(통신부, 입력부, 출력부)과 아이템마다 다르게 구현되는 모듈(일반기능로직 및 Safety)로 나뉜다.  
Controller는 C코드생성을 고려해 Discrete block을 사용하여 구현하고, Plant는 Continuous로 구현한 다음 지연소자를 통해 인터페이스한다.

<p align="center">
  <img
    src={require('/img/2_mbd/mbd_sys_design_pre_arch_concept.png').default}
    width="450"
    alt="Example banner"
  /><br/><em>&lt;System Architecture Concept&gt;</em>
</p>

* 일반기능로직은 Simulink 시뮬레이션 또는 RCP(기능 초기 검증이 필요한 경우)를 통해 Function Block 단위로 구현하고, Function Block 단위로 검증을 수행한다.
* 중복하여 사용되는 Function Block은 수정/변경 시 일괄적으로 적용될 수 있도록 라이브러리로 만들어 관리한다.

### System Architecture

시뮬링크를 이용하여 아키텍처를 설계하고, 기능을 아키텍처에 <u>할당(allocation)</u>한다.

<p align="center">
  <img
    src={require('/img/2_mbd/mbd_sys_design_pre_arch_system.png').default}
    width="450"
    alt="Example banner"
  /><br/><em>&lt;System Architecture&gt;</em>
</p>

### Physical Architecture

하드웨어 의존적인 부분인 PWS 및 MCU Peripherals 영역을 Physical로 분류한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_design_pre_arch_physical.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Physical Architecture&gt;</em>
</p>

### Logical Architecture

:::info
로직으로 언급되는 시스템 구성요소는 모델을 통한 시뮬레이션을 이용하여 하드웨어 독립적으로 개발이 가능함을 의미한다.
:::
하드웨어 독립적으로 실행할 수 있는 부분을 Logical로 분류하고, MIL단계 시뮬링크 시뮬레이션을 통해 Logical Component(Software Logic)를 개발한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_design_pre_arch_logical.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Logical Architecture&gt;</em>
</p>

* Input Processing
  * 사용자 입력을 처리하여 WindowLogic의 상태천이 조건을 생성하는 로직
* Window State
  * 상태천이를 이용하여 PWS의 여러 기능을 구현하는 로직
* Output Processing
  * Trigger 신호를 입력받아 0~1(0~100%) 범위의 출력을 조절하여 프로파일링 신호를 생성한다.
  * 프로파일링 신호를 제어입력으로 하여 피드백 제어를 수행한다.
* Pos Calculator
  * 엔코더 펄스 카운트 값과 엔코더 펄스 주기를 입력으로 받아 속도 및 위치를 계산하는 로직
* Obstacle Detect
  * T.B.D
* Comm Processing
  * T.B.D

