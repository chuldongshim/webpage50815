---
id: wiper_verify
title: 설계 및 검증
---

---

## 개발 프로세스 정의

> 시뮬레이션을 통한 로직 개발
* 하드웨어에 대한 고려 없이 로직/알고리즘을 개발하고 Host PC 상에서 시뮬레이션을 통해 구현 가능성을 검증한다.
* 시뮬레이션을 통해 불필요한 하드웨어 재개발 요인을 제거하여 전체 개발시간을 단축한다.

### 로직개발 및 시뮬레이션

다음과 같이 수식을 통해 사다리꼴 속도 프로파일을 구하고, 미분을 통해 위치 프로파일을, 적분을 통해 가속도 프로파일 모델을 개발한다.

<p align="center">
	<img
		src={require('/img/2_mbd/img4_3_logic_modeling.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;사다리꼴 속도 프로파일&gt;</em>
</p>

로직을 포함하는 전체 시스템을 다음과 같이 모델링하고 시뮬레이션을 수행한다. 검증 완료 후 코드 자동생성 Boundary를 정의하고 타겟 포팅을 위한 코드자동생성을 수행한다.
* “Profile생성 로직 + 피드백제어 로직”은 하드웨어 독립적인 소프트웨어로 코드자동생성 대상임
* 하드웨어 독립적이므로 시뮬레이션 검증 완료 후 자동생성코드 변경없이 타겟에 사용이 가능함

<p align="center">
	<img
		src={require('/img/2_mbd/img4_4_simulation.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;로직 시뮬레이션&gt;</em>
</p>

### 3D 시뮬레이션

개발한 제어로직 동작확인을 위해 3D CAD 툴을 통해 모델링 한 모터모델을 Import하여 제어로직(Maxon_Motor_with_RefProfilePosPID) 실행결과를 확인 한다.

<head>
<title>모터제어 3D 시뮬레이션</title>
</head>
<body>
<p align="center">
	<iframe
		src="https://www.youtube.com/embed/nDjuDzeTUoU?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">f
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;모터 단품 3D시뮬레이션&gt;</em>
</p>
</body>

모터 동작 확인 후 플랜트모델을 Import하여 최종 실행결과를 확인 한다.

<p align="center">
	<iframe
		src="https://www.youtube.com/embed/Vi7RNYXipMQ?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Wiper 시스템 3D시뮬레이션&gt;</em>
</p>

### 구현

시뮬레이션을 통해 알고리즘/로직 개발을 완료하면 코드를 자동생성하여 타겟환경에서 동작을 확인해야 한다.
하드웨어가 결정되지 않은 상태에서 Rapid Control Prototyping(이하 RCP라 함)을 제공하는 EVB를 통해 다음과 같은 컨셉으로 하드웨어를 구성하면 RCP 장비를 통해 알고리즘 확인이 가능하게 된다.

Simulink Auto-Code-Generation 기능을 이용하여 모델로부터 C코드를 자동생성하고, MCU에 다운로드하여 실행한다.

<p align="center">
	<img
		src={require('/img/2_mbd/img4_5_MCU_porting.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;시스템 구성&gt;</em>
</p>

실제 다음과 같이 하드웨어를 구성하였다.

<p align="center">
	<img
		src={require('/img/2_mbd/img4_2_hw_configuration2.jpg').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;하드웨어 인터페이스&gt;</em>
</p>


## 동작확인

### Manual Wiping

<p align="center">
	<iframe
		src="https://www.youtube.com/embed/SH5TJdI_F8M?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Manual Wiping 동작확인&gt;</em>
</p>

### Auto Wiping

<p align="center">
	<iframe
		src="https://www.youtube.com/embed/gZ7yAiUIIdw?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Auto Wiping 동작확인&gt;</em>
</p>


