---
id: window_realize_f2_Profiling
title: F2 Profiling
---
---

## 분석

> <font color="blue"><strong>프로파일링 기능</strong></font><br/>
> 모터를 부드럽게 구동시키기 위해 가속/등속/감속 구간으루 나눠 위치(S커브) 및 속도(사다리꼴) 제어입력을 생성하는 기능

### 구현조건

### 시뮬레이션 환경

Continuous Transfer Function으로 모델링 된 Plant Model과, MCU실행을 고려하여 일정주기(1ms)마다 Profiling을 수행하는 Discrete Profiling Model이 하나의 시뮬링크 환경에서 수행되어야 하기 때문에 다음과 같이 환경을 설정하고 시뮬레이션을 수행한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_1_solver.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Simulink Solver Settings&gt;</em>
</p>

### 파라미터 정의

<u>파라미터 확인</u>

* 단위환산
  * 기어60[rpm] = 기어1[rev/s] = 모터85[rev/s] = 모터680(=85x8)[pulse/s]
  * 기어1[rpm] = 모터(85*8)/60[pulse/s] = 11.33[pulse/s]
* 12[V]인가 시 Shaft 최대 속도
  * 실험데이터를 통해 <font color="#34a28a">12[V]인가 시 75[rpm]이 출력되므로 최대속도는</font>
  * <font color="#34a28a">75[rpm] = 75x((85*8)/60)[pulse/s] = 850[pulse/s]</font>
* 이동시간 Td, 0.25Td 가속, 0.5Td 등속, 0.75Td 감속
  * 속도프로파일에서 면적이 이동거리가 되므로 거리=시간x속도 -> 3000 = 0.75Td*Vmax -> Vmax = 3000/0.75Td
  * 따라서 3000[pulse]를 1s에 가려면 가/감속이 없는 경우 3000[pulse/s]가 되나, 가/감속이 있는 경우 등속구간이 더 높아야 하므로 Vmax=4000[pulse/s]가 되어야 한다.
* 2[s] 동안 3000[pulse]를 이동하기 위한 Vmax
  * Vmax = 3000/0.75Td = 3000/(0.75*2) = 2000[pulse/s]

<u>기구부 사양</u>

* Drum Size(지름) : 46.45mm
* 기어비 : 1:85
* 4극 : 1회전 시 4펄스(rising 2개+falling 2개) -> A/B상이므로 총 8펄스 발생
* 1펄스 발생 시 윈도우 이동거리
  * 기어 1회전 시 Drum도 1회전 -> 윈도우 145.853[mm](=pi x 46.45)이동  
  * 기어 1회전 시 Shaft 85회전 -> 680[pulse] 발생  
  * 145.853[mm]:680[pulse] = x[mm]:1[pulse]  
  * 1[pulse] = 145.853/680[mm] ≒ 0.2145[mm]
* 300mm 이동 시 펄스
  * 46.45[mm]:680[pulse] = 300[mm]:x[pulse]  
  * x[pulse] = (46.45*3000)/680[pulse] = 4,391.82[pulse]
  * <font color="#34a28a">따라서 300mm 이동시 발생되는 펄스는 4,391.82[pulse]가 된다.</font>
* 기어60[rpm] 회전 시 300mm 이동 소요시간
  * 60rpm인 경우 초당 1회전이므로 1초에 680[pulse] 발생  
  * 680[pulse]:1[s] = 4,391.82[pulse]:x[s]
  * x[s] = 4,391.82/680[s] = 6.458[s]

## 기능구현

### 파라미터 정의

프로파일링을 위해서는 다음과 같이 이동거리, 이동시간이 결정되어야 한다. (가/감속 비율은 전체 이동시간 Td 중 0.25Td로 일정하다고 가정)

* 4[s]동안 4000[pulse] 이동 시 Vmax  
<Note10으로 그림 그려서 삽입>
  * `이동시간 Td=4[s]`, `0.25Td 가속`, `0.5Td 등속`, `0.75Td 감속`인 경우
  * 거리 = 0.75Td x Vmax -> 4000[pulse] = 3[s] x Vmax
  * <font color="#34a28a">Vmax = 4000/0.75Td [pulse/s]</font>
* Td[s]동안 4000[pulse] 이동 시 Vmax
  * 12[V]인가시 출력속도 850[pulse/s]보다 크면 안됨
  * Td=4[s] -> Vmax=4000/(0.75*4)=1,333.33[pulse/s]
  * Td=5[s] -> Vmax=4000/(0.75*5)=1,066.67[pulse/s]
  * Td=6[s] -> Vmax=4000/(0.75*6)=888.89[pulse/s]
  * Td=7[s] -> Vmax=4000/(0.75*7)=761.90[pulse/s]

### 프로파일링 트리거

* WindowState로직은
  * ProfileTrigger(스위치입력) 발생 시 Opening/Closing 상태로 천이하고, ProfileTrigger신호를 1/-1로 출력한다.
  * 트리거 발생 후 추가 스위치 조작이 없는 경우 StopTrigger(0[pulse] or 4000[pulse] 도달)가 발생하면 Opened/Closed 상태로 천이하고, ProfileTrigger신호를 0으로 출력한다.
* OutputProcessing로직은
  * ProfileTrigger신호가 1/-1인 경우 가속/등속/감속 프로파일링을 수행한다.
  * 가속/등속 중 스위치 조작으로 ProfileTrigger신호가 0으로 변경되면 정지를 위해 감속프로파일을 수행하고, 감속 중 ProfileTrigger신호가 0으로 변경되면 진행중인 감속프로파일을 계속 수행한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_2_profile_trigger.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;WindowState로직(좌) 및 OutputProcessing로직(우)&gt;</em>
</p>

### 프로파일링

속도프로파일은 가속/등속/감속 세구간으로 나눠 직선의 방정식을 vel=f(t)와 같은 수식으로 만들어 각 샘플시간마다 속도를 계산한다. 역방향 프로파일은 정방향 프로파일과 부호만 반대로 계산한다. 수식을 Stateflow를 통해 다음과 같이 구현한다.  
속도프로파일을 적분하여 위치프로파일을 생성하고, 미분을 통해 가속도 프로파일을 생성한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_3_vel_profiling.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;가속/등속/감속 프로파일링&gt;</em>
</p>

프로파일링을 위해서는 이동거리 및 시간, 가/감속 기울기가 파라미터로 입력되어야 하며, 이동거리(4000[pulse]), 이동시간(7s) 및 가/감속 기울기(0.25)가 Constant로 일정하다고 할 때 다음의 경우를 고려하여 이동거리가 계산되어야 한다.
* DOWN  
③ 0[pulse]에서 M-Dn 입력유지 시 Dn방향(↑) 이동거리=4000[pulse]  
① 500[pulse]에서 M-Dn 입력유지 시 Dn방향(↑) 이동거리=3500[pulse]  
② 3500[pulse]에서 M-Dn 입력유지 시 Dn방향(↑) 이동거리=500[pulse]
* Up  
③ 4000[pulse]에서 M-Up 입력유지 시 Up방향(↓) 이동거리=4000[pulse]  
① 3500[pulse]에서 M-Up 입력유지 시 Up방향(↓) 이동거리=3500[pulse]  
② 500[pulse]에서 M-Up 입력유지 시 Up방향(↓) 이동거리=500[pulse]

### 트리거 동기화

`Closing->Closed동작`을 예를들면, 윈도우 Plant 특성 상 가속보다 감속에서 지연이 많이 발생하는 이유로, 감속 Profiling은 끝났는데, 지연 때문에 아직 `0[pulse]`에 도착하지 않았기 때문에 <u>WindowState로직(위치를 기준으로 상태천이 수행)</u>은 Closing상태를 Closed상태로 천이시키지 않고, `MovingTragger=-1`을 출력한다. OutputProcessing로직은 Profiling완료 후 WindowState로직의 -1 신호로인해 다시 Profiling을 시도하게 되고, 비로소 `0[pulse]`에 도착하면 WindowState로직은 Closed상태로 천이하여 `MovingTragger=0`를 출력하고, 이로인해 OutputProcessing로직은 가속 Profiling 도중 Switch Off를 인식하여 감속 Profiling을 진행하여 모터가 멈추게 된다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_4_Sync_problem.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;모터 구동명령 동기화 문제&gt;</em>
</p>

이와 같은 이유로 윈도우 동작을 위한 MovingTrigger신호를 생성하는 WindowState로직과 이를 이용하여 모터 출력을 생성하는 OutputProcessing로직간 동기화가 중요해 진다.

WindowState로직과 OutputProcessing로직 동기화를 위해 다음과 같이 ProfileTrigger 신호를 이용하여 동기화를 구현한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_5_Sync_solution.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;모터 구동명령 동기화 해결방법&gt;</em>
</p>

1. WindowState로직에서  
: Opening 상태에서 ProfileTrigger=1출력
2. OutputProcessing로직에서  
: Opening 프로파일링 수행 -> 프로파일링 완료 -> ProfileTrigger=0까지 대기
3. WindowState로직에서  
: Opening인 경우 4000[pulse] 도달 시 ProfileTrigger=0출력
: Closing인 경우 0[pulse] 도달 시 ProfileTrigger=0출력
4. OutputProcessing로직에서  
: Selector로 상태를 천이하여 Profiling 완료

## 시뮬레이션

### 속도프로파일을 통한 모터 출력

위치/속도 피드백제어를 정확하게 수행하면 정의된 시간에 계산된 위치까지 이동하므로
이동위치에 도달할 때 Opening->Opened or Closing->Closed로 상태천이를 수행하면 되나,
피드백제어를 수행하지 않을 경우 다음과 같이 Reference위치가 4000에 도달하여 Reference Voltage를 0[V]으로 출력해도, 관성으로 Plant는 여전히 이동하며, 이로인해 위치오차가 발생하게 된다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_6_out_without_FbCtrl.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;피드백 없는 프로파일 모터 출력&gt;</em>
</p>

