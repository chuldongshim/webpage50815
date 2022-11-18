---
id: window_design
title: 설계
---

<div align="right">
  <font size="4">
    Since 21.07.30 ~ 21.11.30
  </font>
</div>

---

## 설계컨셉

:::important
반복작업을 최소화 하기 위해 아키텍처 작성은 개발 처음과 끝에 각각 1회씩만 작성하여 업데이트 한다.
* <u>개발 초기단계에 `예비 아키텍처(Preliminary Architecture)`를 1회 작성</u>하고,
* 이를 바탕으로 시뮬링크 모델링→기능구현→시뮬레이션을 진행하며,
* 모든 기능구현 및 시험이 완료되는 <u>프로젝트 종료시점에 `최종 아키텍처(Architecture)`를 1회 개정</u>한다.
:::

시뮬링크를 이용하여 아키텍처를 설계하고, 기능을 아키텍처에 <u>할당(allocation)</u>한다.

#### Physical Architecture

* 하드웨어 의존적인 MCU Peripherals 영역을 Physical로 분류한다.

#### Logical Architecture

:::info
로직으로 언급되는 시스템 구성요소는 모델을 통한 시뮬레이션을 이용하여 하드웨어 독립적으로 개발이 가능함을 의미한다.
:::
하드웨어 독립적으로 실행할 수 있는 부분을 Logical로 분류하고, MIL단계 시뮬링크 시뮬레이션을 통해 Logical Component(Software Logic)를 개발한다.


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

#### 참고자료

* [S32K1xx Series Safety Manual](https://usermanual.wiki/Document/S32K1xx20Series20Safety20ManualREV204.925554493/view)
* Simulink Library  
Matlab Path에 lib파일위치 추가→set_param(gcs,'EnableLBRepository','on') 실행→Simulink Library Browser 새로고침(F5)
* [사용자 지정 라이브러리 (by Mathworks)](https://kr.mathworks.com/help/simulink/libraries.html)
* [라이브러리 브라우저에 라이브러리 추가 (by Mathworks)](https://kr.mathworks.com/help/simulink/ug/adding-libraries-to-the-library-browser.html)
* [Creating Customized Block Libraries 동영상 (by Mathworks)](https://kr.mathworks.com/videos/creating-customized-block-libraries-101591.html)
* [사용자 지정 라이브러리 만들기 (by Mathworks)](https://kr.mathworks.com/help/simulink/ug/creating-block-libraries.html)
* [구성요소 기반 모델링 지침 (by Mathworks)](https://kr.mathworks.com/help/simulink/ug/component-based-modeling-guidelines.html)

## 요구사항 정의

* 기능을 정의하고, 시스템 요구사항을 기능에 <u>할당(allocation)</u>하므로 기능을 모두 구현하고, 시험하면 모든 기능요구사항을 만족하게 된다.
  * 본 프로젝트는 선행개발로 윈도우 Up/Down 동작과 관련된 기능(F1~F5)만을 구현 한다.
  * 본 프로젝트에서 비기능 요구사항 및 인터페이스 요구사항은 고려하지 않는다.
* 요구사항 관리는
  * 워드/엑셀/txt 등의 포멧을 이용하여 기능요구사항 초안작성 후 MBD 구현을 시작하기 전에 요구사항을 Simulink Requirements를 통해 Simulink로 import하여 `요구사항-구현-코드`의 추적성을 확보한다.
  * Simulink import 시점 이후부터는 구현이 완료될 때까지 Simulink Requirement로만 요구사항을 관리하고, 구현 및 시뮬레이션이 완료된 시점에 고객과의 공유를 위해 1회 기능요구사항 초안을 업데이트하고, 추적표를 작성한다.

### F1 Auto/Manual

* [`F1_Req1`](/.) 윈도우 이동 중 버튼을 조작하면 Window는 동작을 멈춰야 한다.
* [`F1_Req2`](/.) A-Up/A-Dn이 입력 후 추가 버튼 조작이 없으면 모터는 상/하단 Soft-Stop 위치까지 이동하여야 한다.
* [`F1_Req3`](/.) M-Up/M-Dn이 입력되는 동안 모터는 상/하단 방향으로 이동하며 입력이 해제되면 모터는 정지해야 한다.

:::note Wiper모터 스위치입력 vs Window모터 스위치입력
Wiper모터는 SW를 눌렀다 떼면(Manual 1회 입력) 속도프로파일(0 -> Target)을 1회 완료하고, 속도프로파일 중 스위치를 다시 입력하면 감속을 수행하는 반면  
Window모터는 SW를 누르는 동안에만 속도프로파일을 수행하고 스위치를 떼면 감속을 수행
:::

### F2 속도프로파일

* [`F2_Req1`](/.) 속도프로파일을 통한 위치/속도제어를 수행해야 한다.
* [`F2_Req2`](/.) 가속/등속/감속 구간으로 나눠 프로파일링을 수행하며, 
* [`F2_Req3`](/.) 파라미터를 통해 프로파일을 가변할 수 있어야 한다.
  
### F3 피드백제어

* [`F3_Req1`](/.) 위치 및 속도 피드백 제어를 수행해야 한다.

### F4 초기화설정

* [`F4_Req1`](/.) Power On 시 초기화해제 상태에서 구속이 감지될 때까지 모터를 CW/CCW로 n회(TBD) 구동하여 모터 부하를 통해 Up/Down방향을 판단하고, 상하단구속 위치 감지 후 초기화 상태로 천이되어야 한다.
* [`F4_Req2`](/.) 초기화해제 상태에서는 Manaul동작만 가능하고, 초기화 상태에서 Auto/Manual동작 모두 가능하다.
* [`F4_Req3`](/.) 초기화를 통해 상/하단 구속지점을 감지하여 이동거리(Full-Stroke)를 자동으로 인식해야 한다.
  
### F5 Soft-Stop

* [`F5_Req1`](/.) 충격으로 인한 시스템 파손을 방지하기 위해 상/하단 구속 전 위치에서 모터는 정지해야 한다.
* [`F5_Req2`](/.) Soft-Stop 수행 시 상/하단 구속이 발생하면 위치오차가 발생한 것으로 판단하여 모터를 정지시키고, Soft-Stop 위치(상/하단 구속 전 위치)를 재설정 해야 한다.
* [`F5_Req3`](/.) 위치오차 보정을 위해 Up/Down Soft-Stop동작 10회(TBD) 수행 후 Full-Open/Close 명령 수신 시 1회 <u>상/하단 구속위치까지 이동(Hard-Stop)</u>하여 Full-Stroke에 대한 Hall Pulse Count 값이 동일한지 확인해야 하며,  
Count 값 변경 시 Full-Stroke 값을 재설정해야 한다.  
동일현상 연속3회 발생 시 초기화해제 상태로 천이되어야 한다.
  
### F6 Anti-Pinch

* [`F6_Req1`](/.) AutoUp 동작 중 반전영역 II에서 장애물을 감지하면 300±10mm 하강 후 정지해야 한다.
* [`F6_Req2`](/.) AutoUp 동작 중 반전영역 III에서 장애물을 감지하면 50±10mm 하강 후 정지해야 한다.
* [`F6_Req3`](/.) AutoUp 동작 중 반전영역 I, IV에서는 반전동작을 수행하지 않는다.
  
### F7 칼만필터링

* [`F7_Req1`](/.) 엔코더 신호를 칼만필터링하여 전류정보를 추정한다.
  
### F8 이상감지

* [`F8_Req1`](./) 홀센서 고장 시 
* [`F8_Req2`](./) 고전압 감지 시 모터가 구동중이면 모터를 즉시 정시시키고, 정상전압 복귀 시 진행중이던 모터구동을 재개해야 한다.
* [`F8_Req3`](./) 저전압 감지 시 
* [`F8_Req4`](./) 연속 입/출력 동작 10회 감지 시 

### F9 모터 과열 방지

* TBD

### F10 Sleep/WakeUp

* TBD

## 아키텍처 설계

### 컨셉 설계 

시스템은 크게 공통으로 사용되는 모듈(통신부, 입력부, 출력부)과 아이템마다 다르게 구현되는 모듈(일반기능로직 및 Safety)로 나뉜다.  
Controller는 C코드생성을 고려해 Discrete block을 사용하여 구현하고, Plant는 Continuous로 구현한 다음 지연소자를 통해 인터페이스한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_design_pre_arch_concept.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_design_pre_arch_concept.png').default}
			alt="Example banner"
			width="550"
		/><br/><em>&lt;System Architecture Concept&gt;</em>
	</a>
</p>

* 일반기능로직은 Simulink 시뮬레이션 또는 RCP(기능 초기 검증이 필요한 경우)를 통해 Function Block 단위로 구현하고, Function Block 단위로 검증을 수행한다.
* 중복하여 사용되는 Function Block은 수정/변경 시 일괄적으로 적용될 수 있도록 라이브러리로 만들어 관리한다.

### System Architecture

시뮬링크를 이용하여 아키텍처를 설계하고, 기능을 아키텍처에 <u>할당(allocation)</u>한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_design_pre_arch_system.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_design_pre_arch_system.png').default}
			alt="Example banner"
			width="550"
		/><br/><em>&lt;System Architecture&gt;</em>
	</a>
</p>

### Physical Architecture

하드웨어 의존적인 부분인 PWS 및 MCU Peripherals 영역을 Physical로 분류한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_design_pre_arch_physical.png').default}
		alt="Example banner"
		width="350"
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
		alt="Example banner"
		width="350"
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

