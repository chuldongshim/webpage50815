---
id: mymbd
title: 모델기반설계 상세
---

<b><big>[목차]</big></b>

* [1. BLDC 선행학습](#mymbd-bldc)
  * [[23.XX.xx~23.xx.xx] : 1.1 Sensorless BLDC by Kalman Filter (TBD)](#mymbd-bldc-plan)
  * [[22.10.21~22.11.05] : 1.2 Sensored BLDC MBD](#mymbd-bldc-sensered)
  * [[xx.xx.xx~xx.xx.xx] : 1.3 Kalman Filter학습 및 시뮬레이션](#mymbd-bldc-kalman-simulation-study)
  * [[16.10.03~17.04.30] : 1.4 Kalman Filter이론학습(Self_Study)](#mymbd-bldc-kalman-basic-study)
* [2. MBD 고객대응](#mymbd-psb-mbd)
  * [[22.03.03~22.05.17] : 2.1 PSB(안전벨트) 기능로직 MBD구현 고객대응](#mymbd-customer-psb)
* [3. 와이퍼 알고리즘 개발](#mymbd-wiper)
  * [[22.09.01~22.10.18] : 3.1 와이퍼 MBD 제어기설계(관측기,LQR)](#mymbd-wiper-lqr)
  * [[22.08.14~22.08.29] : 3.2 FFT MCU 구현 및 Matlab 연동 ](#mymbd-wiper-fft)
  * [[21.01.08~21.07.13] : 3.3 와이퍼 MBD 기본기능구현 [☜ click for side project]](#mymbd-wiper-func)
* [4. 윈도우 선행학습](#mymbd-window)
  * [[21.07.30~21.12.31] : 4.1 윈도우 MBD 기본기능구현 [☜ click for side project]](#mymbd-window-func)
  * [[13.10.01~14.05.16] : 4.2 윈도우 MBD 선행학습](#mymbd-window-basic)
* [5. MBD 시작](#mymbd-start)
  * [[20.08.12~20.11.13] : 5.1 온도 PID제어 MBD [☜ click for side project]](#mymbd-start-temp-pid)
  * [[07.03.02~08.08.31] : 5.2 졸업논문](#mymbd-start-graduation)

---

## 1. BLDC 선행학습 {#mymbd-bldc}

### 1.1 Sensorless BLDC by Kalman Filter (TBD) {#mymbd-bldc-plan}

* CAD연동(ProE/Solidworks 등)을 통한 Simulnik모델 가상 시뮬레이션
* 하드웨어 없이 시뮬레이션 만으로 타겟 소프트웨어 개발
(로봇팔 PIL 이미지 삽입)
* Software Component개발(T.B.D)
* 칼만필터를 이용한 DC/BLDC 모터 제어

### 1.2 Sensored BLDC MBD {#mymbd-bldc-sensered}

* MBD기반 BLDC모터 제어

### 1.3 Kalman Filter학습 및 시뮬레이션 {#mymbd-bldc-kalman-simulation-study}

* 칼만필터 이론 학습 및 칼만필터를 통한 Noisy DC모터 속도측정 : <a href="/assets/kalman/Webpage_Maxon_Motor_3_Kalman_.html" target="_blank">Kalman Filter [☜ click for more]</a>
* 칼만필터를 통한 상태피드백 제어 : <a href="/assets/kalman/Webpage_Maxon_Motor_4_Stochastic_.html" target="_blank">Stochastic Estimation Control by LQG [☜ click for more]</a>
* 외란관측기(TBD) : <a href="/assets/kalman/Q_filter.html" target="_blank">Q-Filter [☜ click for more]</a>

<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-kalman-simulation.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Simulink 모델을 통한 칼만필터 시뮬레이션&gt;</em>
</p>

### 1.4 Kalman Filter이론학습(Self_Study) {#mymbd-bldc-kalman-basic-study}

## 2. MBD 고객대응 {#mymbd-psb-mbd}

### 2.1 PSB(안전벨트) 기능로직 MBD구현 고객대응{#mymbd-customer-psb}

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 22.03.01 ~ 현재 (책임 4년차)
* MBD 선행 개발 프로세스 수립
* S32K144+Simulink를 통한 제어 알고리즘 개발 및 AutoCode
* Cypress MCU에서 동작 가능한 HW 독립적인 코드 생성

양산적용을 타겟으로 고객 요청하에 진행된 프로젝트로 MBD를 통해 PSB(Pre-safe Seat Belt)의 기능로직SW를 개발하는 것이 주요 목적이며, 시뮬링크를 이용하여 아키텍처를 설계하고 기능을 아키텍처에 할당(allocation)하여 Profiling 기능로직을 구현하였다.
<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-psb-architecture.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

Profiling 기능로직을 시뮬레이션으로 확인해 가면서 구현을 진행하였으며, 최종 구현결과는 다음과 같다.
<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//eV5v-e-QV1A?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;안전벨트 기능로직 MBD구현&gt;</em>
</p>

PC에서 설정된 파라미터 정보를 CAN을 통해 제어기로 전송하하고, 제어입력(Reference Profiling)과 제어출력(Motor Current Sensing)을 비교한 결과가 동일하므로 제어입력을 제어기가 잘 추종하는 것을 확인하였다.
<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-psb-verify.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

시뮬링크를 통해 '요구사항-아키텍처모델-C코드' 간의 양방향 추적성을 확보하였다.
<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-psb-traceability.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

## 3. 와이퍼 알고리즘 개발 {#mymbd-wiper}

### 3.1 와이퍼 MBD 제어기설계(관측기,LQR) {#mymbd-wiper-lqr}

* 해당 제어기는 다음의 성능사양을 만족해야 한다.
  * 3.5s 주기로 Wiping을 수행하다 1s 주기로 Wiping 수행
  * 60[CPM] 구동 - 1s 당 1회 Wiping
  * Wiping 주기가 1s인 경우 0.5s동안 0°->134°, 0.5s동안 134°->0°로 Wiping 수행
  * 제어로직 실행시간 : 10us @ s32k144
  * 개발 하드웨어 - S32K144(48MHz Cortex-M4 with FPU) + VNH5019(ST모터드라이버)
* 기본 동작확인을 위한 PID 피드백 구현
  * 위치/속도 피드백 제어

<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-wiper-pid.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* 성능개선을 위한 상태피드백 구현
  * 전달함수->상태방정식 : <a href="/assets/kalman/Maxon_Motor_.html" target="_blank">모터 전달함수 모델링[☜ click for more]</a>
  * 상태관측기를 통한 상태추정 : <a href="/assets/kalman/Webpage_Maxon_Motor_1_ObserverStateFB_.html" target="_blank">State Feedback Control by full state observer(관측기를 통한 전상태모니터링) [☜ click for more]</a>
  * LQR상태피드백 제어 + 오차적분제어 + Anti-Windup : <a href="/assets/kalman/Webpage_Maxon_Motor_2_RobustStateFB_.html" target="_blank">Robust Control by Integral Action(외란 오차제거) and Anti-Windup(Saturation Limit을 통한 적분기 출력제한) [☜ click for more]</a>

<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-wiper-lqr_1.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

상태피드백 제어 알고리즘을 Simulink를 통해 C코드로 자동생성하고, 컴파일 하여 타겟 MCU에서 실행
<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//n_bor37xbMU?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;관측기 상태피드백을 통한 LQR제어&gt;</em>
</p>

MCU에서 상태피드백 제어 방식으로 와이퍼모터를 제어하고, 통신으로 위치정보를 수신하여 다음과 같이 1s 주기마다 Wiping 동작하는 것을 확인함
<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-wiper-lqr_2.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

### 3.2 FFT MCU 구현 및 Matlab 연동  {#mymbd-wiper-fft}
* <a href="/assets/mbd/Webpage_Ews_S32K1_FFT.html" target="_blank">MCU에서 생성한 샘플신호를 FFT연산 후 Serial통신을 통해 Matlab Realtime Plot [☜ click for more]</a>

<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-wiper-fft_1.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

### [3.3 와이퍼 MBD 기본기능구현 [☜ click for side project]](/docs/sideprj/wiper#wiper-system-config) {#mymbd-wiper-func}

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 21.04.01 ~ 21.06.30 (책임 3년차)
* 목적 : GitLab-Agile방식을 통한 Wiper MBD개발
  * MBD기반 제어로직 모델링
  * 시뮬레이션을 통한 모델 검증
  * 자동생성코드 타겟MCU(RCP) 구현 및 동작검증
* 구현 내용 : Wiper모터를 대상으로 모터구동부 구현
  * 기능로직 보다는 모터구동부만 구현
  * 모터 가속-등속-감속제어를 위한 profiling 로직 설계
  * 위치/속도 PID제어
(공유한 구동부-통신부-제어로직부 ... 블록다이어그램 이미지(fig_2_1 추가)

제어로직을 개발하고, 시뮬레이션을 통해 제어로직 검증(MIL, Model In the Loop)을 수행하였습니다. 

<p align="center">
	<iframe
		src="https://www.youtube.com/embed/nDjuDzeTUoU?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;입력각도로 Linkage 위치 피드백제어 3D시뮬레이션&gt;</em>
</p>

제어로직 개발 후 MBD를 통해 생성된 자동생성코드가 실제 MCU에 적용되어 시뮬레이션과 동일하게 동작하는 것을 확인함으로써 MBD가 개발실무에 적용이 가능한지 타당성을 확인하는 것을 목적으로 프로젝트를 진행하였습니다.

<p align="center">
	<iframe
		src="https://www.youtube.com/embed/gZ7yAiUIIdw?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Auto Wiping 동작확인&gt;</em>
</p>


## 4. 윈도우 선행학습 {#mymbd-window}

MBD기반의 소프트웨어를 개발하고, 개발한 소프트웨어를 실제 타겟 MCU에서 동작하여 검증하였습니다.

* 개발환경 구축 및 윈도우 타겟구동 확인
* MBD를 통해 선행/양산 대응이 가능한 수준의 프로세스 준수 방법론 정립

### [4.1 윈도우 MBD 기본기능구현 [☜ click for side project]](/docs/sideprj/window#window-system-config) {#mymbd-window-func}

2013년도에 MBD를 처음 시작하였으며, 사내 표준프로세스 구축 업무로 MBD개발 업무가 Holding되어 시뮬레이션을 통해 알고리즘만 개발하고 실제 타겟에 적용하지 못하여 아쉬움이 많이 남았습니다.
하지만 꾸준한 관심과 하고자 하는 의지로 21년에 결국 Manual Coding 없이 모델기반설계로 제어기 개발환경을 구축/적용해 보았고, 제품 수주를 위한 개발활동에 MBD를 적용하여 개발을 진행하고 있습니다.

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 21.08.20 ~ 21.11.30 (책임 3년차)

MBD를 통해 기능로직에 대한 HW 독립적인 SW(C코드)를 자동생성하고, 타겟 MCU에 포팅하여 기능로직 정상동작 확인을 목적으로 프로젝트를 진행하였습니다. MBD를 통해 7가지 기능로직을 설계하고 C코드를 생성 후 타겟 MCU에서 동작하여 설계한 로직을 검증해 보았습니다.

<p align="center">
	<iframe
		src="https://www.youtube.com/embed//eEmUgEgfH4k?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 윈도우 반전 (21년12월03일)&gt;</em>
</p>

### 4.2 윈도우 MBD 선행학습 {#mymbd-window-basic}

처음으로 MBD를 접하여 파워윈도우 시스템을 대상으로 Simulink 모델을 개발하고, 모델로부터 시뮬레이션을 수행하여 모델링 타당성을 검증한 다음, MicroAutoBox를 통해 시뮬레이션과 동일하게 실제 윈도우가 동작되는지를 확인하여 경험을 통해 MBD에 대한 기초를 다질 수 있었습니다.

* 소속 : 동양기전/DYAUTO
* 기간 : 2013.10 ~ 2014.09 (대리 1년차)

<p align="center">
	<img
		src={require('/img/2_mbd/img2_1_dyauto_mbd.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* MicroAutoBox를 이용한 제어기 RCP(Rapid Control Prototyping) 구현 및 동작확인
  * Matlab Stateflow를 이용한 제어 로직 프로그래밍
  * Hardware dependent device driver interface를 통한 peripheral control(Timer/Interrupt, ADC, Port IO 등)
* Matlab/Simulink를 통한 제어기 시뮬레이션 확인 및 모델 코드 자동생성(AutoCode Generation)
* 장애물 감지 시 반전 알고리즘/로직 시뮬레이션

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//JWzVYKv_Eac?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 반전 알고리즘 시뮬레이션&gt;</em>
</p>


## 5. MBD 시작 {#mymbd-start}

### [5.1 온도 PID제어 MBD [☜ click for side project]](/docs/sideprj/temperature#temperature-pid-ctrl-system){#mymbd-start-temp-pid}

MBD를 통해 생성된 자동생성코드가 MCU에 실제로 사용될 수 있을까라는 의문을 해결하기 위해 온도제어 실습이 가능한 EVB보드(TMS320F28069)를 이용하여 MBD기반 온도PID제어기 설계를 개인프로젝트로 진행하였습니다.

<p align="center">
	<img
		src={require('/img/1_process/f_process_gitlab_temp_pid.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;GitLab 이슈를 통한 프로젝트 관리&gt;</em>
</p>

처음이라 그런지 프로젝트 관리가 제대로 되지 않아서 고민을 하던 차에 Github/GitLab하면 Agile 이야기가 나오는 것을 알게 되었고, "애자일, 민첩하고 유연한 조직의 비밀"이라는 책을 읽게 되었습니다. 프로젝트 경험과 책을 통해서 느낀점은 이후 Agile방식의 프로젝트를 지향하는 계기가 되었고, 그 생각과 실천은 지금까지 이어지고 있습니다.
* 처음으로 GitLab기반 소스 형상관리 수행
* 처음으로 GitLab기반 Task(할일) 및 Issue(문제) 관리 -> 프로젝트 관리 관리 수행

이 프로젝트를 통해 MBD 기반 개발을 타겟에 실제 적용할 수 있겠다는 확신을 갖을 수 있었습니다. 이는 이후 회사에서 MBD 프로젝트를 수행할 수 있는 계기가 되었습니다.  
* 처음으로 MBD기반으로 설계한 로직을 C코드를 자동생성하고 타겟 MCU에 구동
* 모든 MBD기반 프로젝트 진행의 계기가 됨



### 5.2 졸업논문 {#mymbd-start-graduation}

졸업논문에서 지능형 근력강화 시스템을 수학적으로 모델링하고, 모델링한 시스템을 분석할 때 처음으로 Matlab/Simulink를 사용하였습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img1_0_mju_paper.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* 담당
  * 기구부 및 전장부 설계 및 개발
  * 시스템 요소를 Modeling한 후 Matlab-Simulink 시뮬레이션과 실제 실험데이터와의 비교를 통하여 Modeling의 타당성 검증
  * 시스템 요소 Modeling의 타당성을 검증한 후 전체 시스템으로 통합하는 단계적인 절차 제시
  * 통합된 System Model의 안정성 확인을 통하여 제어기 성능을 검증하여 주어진 제어 명령을 잘 추종하는 제어기 설계
  * Modeling System과 Real System과의 출력 데이터 일치 여부를 확인하여 제어기 성능 검증
  * 실제 System을 이용하여 사용자의 근력 증강 여부 검증 
* 개발내용
  * FSR(Force Sensing Registor)를 통하여 시스템 입력(제어명령)을 생성하고 전압(PWM) 제어기를 통하여 모터 제어 (Force Sensing Registor : 힘에 비례하여 전압이 증가하는 센서)
  * 제어기는 구동 상태에 따라 제어 모드를 변환시켜 모터 제어 (FSR 입력이 없을 때에는 PI제어(위치)를 수행하고, FSR 입력이 있을 때에는 PD제어(속도) 수행)
  * 검지 손가락의 미미한 움직임을 통하여 5kg의 물건을 움직여 개발된 시스템 동작 확인

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed/Bdt_fOkhiw8?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;명지대 석사논문(2007.03 ~ 2009.02)&gt;</em>
</p>

