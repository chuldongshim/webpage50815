---
id: mbd
title: 모델기반설계 경험 요약
---
---

## 선행학습

### 파워윈도우 MBD

처음으로 MBD를 접하여 파워윈도우 시스템을 대상으로 Simulink 모델을 개발하고, 모델로부터 시뮬레이션을 수행하여 모델링 타당성을 검증한 다음, MicroAutoBox를 통해 시뮬레이션과 동일하게 실제 윈도우가 동작되는지를 확인하여 경험을 통해 MBD에 대한 기초를 다질 수 있었습니다.

<p align="center">
	<iframe 
		width="350" height="250"
		src="https://www.youtube.com/embed//JWzVYKv_Eac?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 반전 알고리즘 시뮬레이션&gt;</em>
</p>

### 온도PID제어 MBD실습

MBD를 통해 생성된 자동생성코드가 MCU에 실제로 사용될 수 있을까라는 의문을 해결하기 위해 온도제어 실습이 가능한 EVB보드(TMS320F28069)를 이용하여 MBD기반 온도PID제어기 설계를 개인프로젝트로 진행하였습니다. 
처음으로 MBD기반 자동생성 코드를 타겟MCU에서 구동하였고, 이 프로젝트를 통해 MBD 기반 개발을 타겟에 실제 적용할 수 있겠다는 확신을 갖을 수 있었습니다.

<p align="center">
	<img
		src={require('/img/2_mbd/img3_4_mbd_realization.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

### Embedded WebServer(진행중)

센서신호를 신호처리 알고리즘을 적용하여 필터링을 수행하고, 무선 데이터 송/수신을 통해 휴대폰으로 처리 결과를 확인할 수 있는 모니터링 시스템을 개발하는 것을 목적으로 개인 프로젝트를 진행하고 있습니다.

### 추후계획(하고싶은 것)

* MBD기반 BLDC모터 제어
* CAD연동(ProE/Solidworks 등)을 통한 Simulnik모델 가상 시뮬레이션
* 하드웨어 없이 시뮬레이션 만으로 타겟 소프트웨어 개발
(로봇팔 PIL 이미지 삽입)

## 로직설계

### IBM Rhapsody

* 소속 : 인터콘시스템스
* 기간 :  (과장 2년차)

### 선루프 시스템 설계

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 2019.12 ~ 2020.08 (책임 2년차)
* 역할 : Sunroof 선행개발 프로젝트 시스템 설계(양산수주로 이어짐)

EA를 통한 시스템 설계 및 동작을 상태천이로 설계
(EA 상태천이도 이미지 추가할 것)

### PSB MBD선행 (22.02.24~ 현재진행중)

고객 요청하에 실제 양산적용을 목적으로 MBD를 통해 기능로직SW를 개발하는 것이 주요 목적임
(색깔 강조표시할 것)

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 22.03.01 ~ 현재 (책임 4년차)
* MBD 선행 개발 프로세스 수립
* 개발 하드웨어 - S32K144 + VNH5019(모터드라이버 by ST)
* 칼만필터를 이용한 DC모터 제어
* S32K144+Simulink를 통한 제어 알고리즘 개발 및 AutoCode
* Cypress MCU에서 동작 가능한 HW 독립적인 코드 생성
* 프로세스
  * Matlab/Simulink를 통한 MBD 개발 프로세스 구축
  (요구사항부터 코드/시험까지 일관된 추적성을 유지하며 개발하는 방법론 수립)

## 모터제어

### Wiper DC모터 MBD선행

시뮬레이션 검증을 통해 제어로직을 개발하고, 

<head>
<title>모터제어 3D 시뮬레이션</title>
</head>
<body>
<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed/nDjuDzeTUoU?rel=0"
		frameborder="0"
		allowfullscreen="true">f
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;모터 단품 3D시뮬레이션&gt;</em>
</p>
</body>

MBD를 통해 생성된 자동생성코드가 실제 MCU에 적용되어 시뮬레이션과 동일하게 동작하는 것을 확인함으로써 MBD가 개발실무에 적용이 가능한지 타당성을 확인하는 것을 목적으로 프로젝트를 진행하였습니다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed/gZ7yAiUIIdw?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Auto Wiping 동작확인&gt;</em>
</p>

### Window MBD선행

MBD를 통해 기능로직에 대한 HW 독립적인 SW를 자동생성하고, 타겟 MCU에 포팅하여 기능로직 정상동작 확인을 목적으로 프로젝트를 진행하였습니다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//eEmUgEgfH4k?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 윈도우 반전 (21년12월03일)&gt;</em>
</p>


