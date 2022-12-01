---
id: window_realize_f1_AutoManual
title: F1 AutoManual
---
---

## 분석

> <font color="blue"><strong>Auto/Manual 기능</strong></font><br/>
> Auto,Up,Dn 스위치 입력을 통해 자동 or 수동으로 윈도우 열림/닫힘 동작을 수행하는 기능

:::important
* 구현하기 가장 쉬운 기본기능(F1.AutoManual기능의 M-Up/M-Dn 시뮬레이션)을 선정하고 이에 대한 구현 및 시뮬레이션 과정을 통해 `기능로직`을 개발하기 위한 시뮬레이션 환경을 구축한다.  
* 기본 기능로직모델(Simulink를 통해 구현한 최소한의 동작을 수행)과 System Identification을 통해 구현한 Plant모델을 이용하여,  
* 설계된 시스템 아키텍처를 시뮬링크 모델로 대체하여 전체 시스템을 구성하고 시뮬레이션을 수행한다.
:::

## 구현조건

### 위치/속도 정의

* 위치는 열림량 0을 Zero Position으로 판단하여  
  * 0\[pulse](Closed) -> Dn이동(pulse +증가) -> 2797\[pulse](Opened)
  * 윈도우 상단 구속상태를 Window Closed Position(PulseCnt ≤ 0)으로,
  * 하단 구속상태를 Window Opened Position(PulseCnt ≥ 2797)으로 정의한다.
* 속도는 열림량을 기준으로 판단한다.  
  * 열림량증가 == +속도 == Opening == Downing
  * Closed -> Opened 방향 이동 시 +속도로,
  * Opened -> Closed 방향 이동 시 -속도로 이동한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_1_def_pos_vel.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;윈도우 영역 정의&gt;</em>
</p>

:::important 비율에 따른 윈도우 영역구분
* 자동초기화를 위해서는 I~IV영역이 자동으로 결정되어야 하는데, I~IV영역은 차량마다 윈도우 형태 및 길이가 다르므로 차량에 따라 다르게 결정된다.
* 따라서 I~IV영역을 Fix된 길이로 지정하지 않고, 비율로 정의하여 Full-Strok가 구해지면 자동으로 결정되도록 한다.  
ex) I영역 : 0~4mm -> 전체길이(Full-Strok) 중 1.32%
* 또한 영역에 대한 비율은 파라미터로 설정하여 가변할 수 있도록 한다.
:::

### 위치 언더플로우 방지

unsigned 형 변수를 signed형 변수로 형변환하여 Underflow를 방지한다.
* 형변환 시 접근가능한 양수크기는 반(0~0xFFFF -> 0x7FFF)으로 작아지는 사실을 고려해야 하며,
* 윈도우의 경우 Full-Stroke 측정결과 대략 0~1600[pulse]가 나오므로 형변환을 수행해도 값이 잘리는 현상이 없기 때문에 형변환을 통해 언더플로우를 방지한다.

s32k144는 QE(Quadrature Encoder)를 내장하고 있어 홀펄스 발생 시 A/B상으로부터 펄스를 카운트하여 레지스터에 저장하며, uint16_t형 타입 변수를 통해 hall count 값을 읽을 수 있다.
* QE Reset 직후 현재위치 0(0x0)에서 -방향으로 회전하여 홀펄스 카운트 값이 1감소하면 Underflow가 발생하여 0에서 갑자기 65535로 값이 바뀌게 된다.
* Underflow 방지를 위해 uint16_t형 카운트값을 int16_t형 카운트값으로 형변환할 경우 0에서 1감소 시 65535(0xFFFF)로 카운트 값이 읽히는데, int16_t형에서는 -1로 인식하게 되므로 Underflow를 방지할 수 있다.

```
                  int8_t  uint8_t
	0b0111.1111 =   127      127
	   :
	0b0000.0011 =     3        3
	0b0000.0010 =     2        2
	0b0000.0001 =     1        1
	0b0000.0000 =     0        0
	0b1111.1111 =    -1      255
	0b1111.1101 =    -3      254
	   :
	0b1000.0000 =  -128      128
```

## 기능구현

모델링 한 플랜트 모델을 이용하여 시뮬레이션이 가능한지 여부를 판단하기 위해 다음과 같이 모터 On/Off로 시스템을 구성하여 시뮬레이션 가능 여부를 확인한다.

### 스위치 입력 판단

RCP장비에는 스위치가 2개 밖에 없으므로 스위치 입력 조합을 통해 Auto, Up, Dn 입력을 결정한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_2_SwitchInput.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;초기화 상태에 따른 Auto 설정&gt;</em>
</p>

* M-Up : sw3up On(Manual Closing), sw3up Off(Stop)
* A-Up : sw3up On → sw2dn On(Auto Closing), sw3up | sw2dn On(Stop)
* M-Dn : sw2dn On(Manual Opening), sw2dn Off(Stop)
* A-Dn : sw2dn On → sw3up On(Auto Opening), sw2dn | sw3up On(Stop)

### Input Processing

Auto/Up/Dn 스위치의 이전 키입력과 현재 키입력의 조합으로 상태천이 조건(transition index)을 결정한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_3_transition_idx.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;스위치 입력에 따른 상태천이 조건 판단&gt;</em>
</p>

Left(Up버튼), Right(Dn버튼)와 같이 스위치 입력이 2개인 경우 다음과 같은 키조합으로 스위치 입력을 결정한다.
* Up을 누른 상태에서 Dn을 누르면 AutoUp
* Up만 눌렀더 떼면 ManualUp
* Dn을 누른 상태에서 Up을 누르면 AutoDn
* Dn만 눌렀다 떼면 ManualDn

### Window Logic

* 스위치 입력이 없는 경우 출력신호 0 유지
* M-Dn 입력 시 출력신호를 0->1로 변경하고, 입력을 유지하는 동안 출력신호도 1을 유지하며, M-Dn 해제 시 출력신호를 1->0로 변경 ([`F1_Req3`](/.))
* A-Dn 입력 시 출력신호를 0->1로 변경하고, A-Dn 해제 시에도 하단구속까지 출력신호를 1로 유지하며, 하단구속 시 출력신호를 1->0로 변경 ([`F1_Req2`](/.))
* A-Dn 동작 중 추가 스위치 조작이 있으면 출력신호를 1->0로 변경 ([`F1_Req1`](/.))
* Up은 방향만 -1로 반대이고, 동작은 Dn과 동일함

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_4_window_logic.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;스위치 입력에 따른 윈도우 상태천이 동작&gt;</em>
</p>

### Output Processing

`Basic Simulation`에서는 피드백제어를 수행하지 않으므로 스위치 입력에 따라 `Window Logic`에서 생성되는 `Trigger Signal(1/-1/0)`를 `모터에 인가되는 전압(12/-12/0)`으로 바꿔 Plant에 전달한다.  
따라서 `Pos Calculator` 및 `Output Processing` 모듈을 다음과 같이 단순화 한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_5_etc.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;M-Dn 및 A-Dn 시뮬레이션&gt;</em>
</p>

* <u>Pos Calculator</u>  
위치/속도 계산은 Quadrature, External-Interrupt를 이용하여 Hand-Coding으로 구현하며 시뮬레이션에서 PosCalculator 블록은 입력신호를 ByPass하여 그대로 출력신호로 내보낸다.
* <u>Output Processing</u>  
여기서는 시뮬레이션 가능성 여부를 확인하는 것을 목적으로 하므로 `-1 ~ 1` 범위를 갖는 Window Logic의 출력신호에 12를 곱해 `-12V ~ 12V` 전압으로 변경하여 Plant(모터)에 전달한다.

## 시뮬레이션

### 스위치입력에 따른 모터 구동

시뮬레이션 동작확인이 주된 목적이므로 코드생성 및 MCU실행을 고려하지 않고, Continuous Model로만 시스템을 구성하여 시뮬레이션을 수행한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_6_simulation_dn.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;M-Dn 및 A-Dn 시뮬레이션&gt;</em>
</p>

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_6_simulation_up.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;M-Up 및 A-Up 시뮬레이션&gt;</em>
</p>

시뮬레이션 수행 결과 피드백제어를 수행하지 않기 때문에 Dn(Opening) 중 3753 이상 이동하면 정지명령을 출력하나 4000이 넘는 위치에서 모터가 정지한다.
