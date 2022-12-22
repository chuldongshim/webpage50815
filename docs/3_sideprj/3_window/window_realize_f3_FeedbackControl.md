---
id: window_realize_f3_FeedbackControl
title: F3 피드백제어
---
---

## 분석

> <font color="blue"><strong>Feedback Control 기능</strong></font><br/>
> 위치/속도 피드백제어 통해 프로파일링 제어입력에 대한 피드백 오차를 최소화하여 플랜트를 제어한다.

### 구현조건

### 제어기 설계

제어기를 설계하기 위해서는 많은 시간이 필요하므로, 여기서는 PID제어 중 P제어만을 이용하여 위치 및 속도제어를 수행하며, 기능구현 완료 후 Robust 제어기를 설계하기로 한다.

## 기능구현

### 피드포워드 제어

Robust 제어기 설계 시 적용(T.B.D)

### 피드백 제어 (위치/속도 Simple P제어) {#feedback-control-period}

다음과 같이 `입력처리로직`의 스위치 입력 판단에 따라 `윈도우상태로직`에서 모터 정지 또는 정/역 구동을 판단하여 트리거 신호(모터구동이 결정)를 생성하고, `ProfileGen로직`을 통해 0.01s 주기로 제어입력 Ref_Pos를 생성하여 `위치제어기`에서 P제어를 수행하고, 0.01s마다 생성되는 제어입력을 Ref_Vel로 받으면 `속도제어기`는 0.002s 간격으로 P제어를 수행한다(위치제어 1회 출력에 대하여 5회 속도피드백제어를 수행한다). 

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_1_timing.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;피드백 제어주기&gt;</em>
</p>

### 피드백 제어 (속도 Anti-Windup PI제어기)

:::important 반드시 확인하고 이해할 것
* matlab 도움말 -> 검색창에서 `Anti-Windup Control Using a PID Controller` 키워드 검색
* `plcdemo_pid_feedforward.slx` 검색하여 실행
  * Feedforward 추가됨
  * 코드생성/확인 가능
:::

## 시뮬레이션

### 피드백 제어 {#feedback-control-simulation}

시뮬레이션을 통해 피드백을 수행하지 않을 경우 위치오차가 발생하나, 피드백을 수행하면 위치오차가 제거되는 것을 확인할 수 있다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_2_simulation.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;No Feedback(상) vs Feedback(하)&gt;</em>
</p>

* 피드백 미수행 시 사다리꼴 속도프로파일 출력(0~1[pulse/s])에 12를 곱한 0~12V의 신호를 Plant에 직접 입력하고, 
* 피드백 수행 시 위치제어기 내부에 속도제어기를 배치하여, 위치 프로파일 출력(0~1[pulse])을 피드백제어기를 거쳐 Plant에 입력한다.

### 게인튜닝

제어게인을 Pos_Pgain=10, Vel_Pgain=1로 설정하고, 피드백을 수행할 경우 속도제어에서 불안정한 출력이 발생되므로 시뮬레이션을 통해 속도제어게인을 조정한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_3_gain_tune.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;속도제어 게인 튜닝&gt;</em>
</p>

시뮬레이션 결과 속도제어게인이 낮아지면 속도제어 시 오실레이션이 작아지는 반면 낮아지는 게인으로인해 위치응답이 늦어지게 된다.
여기서는 응답속도를 고려하여 제어게인을 각각 <font color="#34a28a">Pos_Pgain=20, Vel_Pgain=0.4</font>로 적용한다.

## 타겟구동

### 코드자동생성

시뮬링크에서는 Function Block의 실행주기가 서로 다를 경우 색상을 통해 구분하여 표현할 수 있으며, 다음과 같이 시스템은 1ms(빨강), 2ms(초록), 10ms(파랑) 3개의 주기로 각각 실행된다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_4_AutoCode.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;코드자동생성&gt;</em>
</p>

### 피드백 제어

* 속도제어기 피드백에 의해 제어출력(motorVoltage)이 12V를 넘더라도 모터에는 12V까지 전압이 인가되며, 12V에서 모터출력속도가 Max가 된다.  
* 피드백제어를 수행한 결과 정해진 시간(7s)이내에 4000[pulse]까지 도달하는 것을 확인할 수 있고, 
* 모터의 비선형적 특성으로 인해 CW와 CCW 제어가 동일하지 않음을 확인할 수 있다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_5_verification.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;모터구동 출력신호 확인&gt;</em>
</p>

## 시뮬레이션

피드백 제어는 실부하가 있는 상태에서 확인이 수월하므로 실부하 상태에서 기능시험으로 대체함.

