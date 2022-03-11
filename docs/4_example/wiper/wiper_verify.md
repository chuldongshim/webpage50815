---
id: wiper_verify
title: 검증
---

---

## MBD개발

### 개발 프로세스 정의

### 로직개발 및 시뮬레이션

> 시뮬레이션을 통한 로직 개발
* 하드웨어에 대한 고려 없이 로직/알고리즘을 개발하고 Host PC 상에서 시뮬레이션을 통해 구현 가능성을 검증한다.
* 시뮬레이션을 통해 불필요한 하드웨어 재개발 요인을 제거하여 전체 개발시간을 단축한다.

#### 로직개발 및 시뮬레이션

다음과 같이 수식을 통해 사다리꼴 속도 프로파일을 구하고, 미분을 통해 위치 프로파일을, 적분을 통해 가속도 프로파일 모델을 개발한다.

<p align="center">
	<img
		src={require('/img/2_mbd/img4_3_logic_modeling.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;사다리꼴 속도 프로파일&gt;</em>
</p>

로직을 포함하는 전체 시스템을 다음과 같이 모델링하고 시뮬레이션을 수행한다. 검증 완료 후 코드 자동생성 Boundary를 정의하고 타겟 포팅을 위한 코드자동생성을 수행한다.
* “Profile생성 로직 + 피드백제어 로직”은 하드웨어 독립적인 소프트웨어로 코드자동생성 대상임
* 하드웨어 독립적이므로 시뮬레이션 검증 완료 후 자동생성코드 변경없이 타겟에 사용이 가능함

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/img4_4_simulation.png').default}>
		<img
			src={require('/img/2_mbd/img4_4_simulation.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;로직 시뮬레이션&gt;</em>
	</a>
</p>

#### 3D 시뮬레이션

개발한 제어로직 동작확인을 위해 3D CAD 툴을 통해 모델링 한 모터모델을 Import하여 제어로직(Maxon_Motor_with_RefProfilePosPID) 실행결과를 확인 한다.

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

모터 동작 확인 후 플랜트모델을 Import하여 최종 실행결과를 확인 한다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed/Vi7RNYXipMQ?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Wiper 시스템 3D시뮬레이션&gt;</em>
</p>

### 하드웨어 구성

하드웨어가 결정되지 않은 상태에서 Rapid Control Prototyping(이하 RCP라 함)을 제공하는 EVB를 통해 다음과 같은 컨셉으로 하드웨어를 구성하면 RCP 장비를 통해 알고리즘 확인이 가능하게 된다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/img4_2_hw_configuration1.png').default}>
		<img
			src={require('/img/2_mbd/img4_2_hw_configuration1.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;하드웨어 인터페이스 컨셉&gt;</em>
	</a>
</p>

실제 다음과 같이 하드웨어를 구성하였다.

<p align="center">
	<img
		src={require('/img/2_mbd/img4_2_hw_configuration2.jpg').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;하드웨어 인터페이스&gt;</em>
</p>

### 코드자동생성/포팅

시뮬레이션 완료 후 다음과 같이 Hardware-Independent한 영역만을 자동생성 영역으로 정의하고, Simulink Auto-Code-Generation 기능을 이용하여 C코드를 자동생성 한다.

<p align="center">
	<img
		src={require('/img/2_mbd/img4_5_autocode1.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;모델에서 코드자동생성 범위&gt;</em>
</p>

기존 타겟 프로젝트에서 자동생성된 코드를 include하여 Function Call을 통해 실행한다.
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/img4_6_MCU_porting.png').default}>
		<img
			src={require('/img/2_mbd/img4_6_MCU_porting.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;자동생성 코드 프로젝트 통합 컨셉&gt;</em>
	</a>
</p>

## 동작확인

### Manual Wiping

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed/SH5TJdI_F8M?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Manual Wiping 동작확인&gt;</em>
</p>

### Auto Wiping

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed/gZ7yAiUIIdw?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Auto Wiping 동작확인&gt;</em>
</p>


