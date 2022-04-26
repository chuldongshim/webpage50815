---
id: window_realize_f0_PlantModeling
title: 플랜트모델링
---

<div align="right">
  <font size="4">
    Since 21.08.20 ~ 21.11.30
  </font>
</div>

---

## DC모터 단품 모델링

### 가정

* 기어의 RPM을 직접 측정할 수는 없고, Motor_Shaft에 붙어있는 Hall_ic를 통해 Motor-Shaft의 RPM을 측정할 수 있다.
* Motor-Shaft의 RPM을 측정하더라도, Gear와 Motor_Shaft가 연결되어 있기 때문에 Gear/마찰 등의 영향을 Motor_Shaft RPM이 측정된다. 따라서 Motor_Shaft RPM을 85로 나눠 "모터인가전압-Gear RPM"에 대한 Plant 모델링을 수행한다.

### 데이터 샘플링

입력에 따른 출력데이터를 이용하여 시스템을 정의한다.  
DC모터 전달함수의 입력은 전압이고, 출력은 각속도이므로 입력전압에 따른 모터출력각속도를 확인해야 한다.

* 16[bit] PWM 0~32,768[bit]을 0~12[V]로 변환하여 입력전압 측정
* 100ms 주기로 측정된 펄스증가량을 이용하여 속도를 측정  
delat_Cnt[pulse]/0.1[s] -> 10\*delat_Cnt[pulse/s] -> (10\*delat_Cnt)/8[rev/s]
* FreeMASTER(Serial통신 프로그램)를 이용하여 100ms 주기로 전압/속도 정보 샘플링

### 모델링

System Identification을 통해 모터 모델링을 수행한다.

* 전압레벨을 다르게 하여 구형파 전압을 입력하고, 입력전압에 따른 모터 Shaft의 출력 RPM을 FreeMASTER를 이용하여 raw_data Acquisition을 수행한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot1_raw_data.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Real: 입력전압(0~12V)에 따른 Motor_Shaft RPM 출력(0~75rpm)&gt;</em>
</p>

* Matlab으로 raw_data를 import하여 Input_Voltage, Shaft_RPM을 변수에 저장한 다음 System Identification을 실행하여 Transfer Function Estimation을 수행한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot2_sys_id.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Estimation: 입력전압(0~12V) vs Motor_Shaft RPM 출력(0~75rpm)&gt;</em>
</p>

* System Identification을 수행하여 다음과 같은 전달함수(Plant)를 도출하였으며, 전달함수 Step 입력 결과 4.8V 입력에 Gear 30[RPM] 출력이 나와 실제 입/출력 raw data와 근접하게 동작되는 것을 확인하였다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot3_sys_id_result.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;입력전압 vs Motor_Shaft RPM 출력 시뮬레이션&gt;</em>
</p>

## 입/출력 검증

### 삼각파 입/출력

* 모델링에 사용된 샘플데이터와 다른 입력파형을 실제 시스템 입/출력 데이터와 전달함수를 통해 시뮬레이션 실행 데이터를 비교하여 Plant 모델링 타당성을 확인한다.
* 실제 -12~12[V]의 전압레벨을 톱니파로 인가할 때 -75~75[rpm]의 Gear Velocity가 엑셀그래프(좌)와 같이 출력되고, 모델링을 통해 도출한 전달함수에 동일한 -12~12[V]를 입력하였을 때 실제 출력과 근사하게 -75~75[rpm]의 Gear Velocity가 Matlab Figure(우)와 같이 출력된다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot4_sys_verify_tooth.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;삼각파 전압 입력 시 모터 출력 (좌-Real vs 우-Simulation)&gt;</em>
</p>

### 사다리꼴 입/출력

사다리꼴 전압 입력에 따른 Simulation vs Real 모터 출력을 비교한 결과 
두 경우 모두 0~12[V]범위의 S커브 전압 입력 시 0~75[rpm]범위의 Gear RPM 출력이 비슷하게 확인되므로 윈도우 모델이 실제 윈도우 모터를 근사한 것으로 판단하고, 해당 모델을 MBD개발에 사용한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot5_sys_verify_profiling.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;시뮬레이션 결과와 실제 모터구동 결과 비교&gt;</em>
</p>

## 윈도우 시스템 모델링

### 가정

* 윈도우 시스템은 윈도우 부하로인해 동일한 입력전압에 대하여 Up/Down 방향에 따라 다른 Rpm이 출력된다. 따라서 Plant를 비선형 시스템으로 모델링 해야 한다.

### 데이터 샘플링

* Plant Modeling 시 입력전압에 대한 조작 없이 순전히 입력전압에 따른 출력Rpm을 측정해야 한다.
* 전압별로 끊어서 Step입력(각각의 0.0V, 2.4V, -2.4V, 3.6V, -3.6V, 4.8V, -4.8V, 6.0V, -6.0V, 7.2V, -7.2V, 8.4V, -8.4V, 9.6V, -9.6V)에 대한 출력 각속도(RPM) data를 획득한 다음 엑셀로 합쳐 System Identification을 수행할 것

### 모델링

* DAQ 데이터  
안정하게 시리얼 데이터를 수신하기 위해 0.1[s] 단위로 MCU가 보내는 시리얼 데이터를 PC에서 수신하여 저장한다.
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win1_raw_data.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;입력전압 vs Window 시스템에 장착된 모터 RPM 출력&gt;</em>
</p>
* Matlab System Identification을 통한 Nonlinear Model Estimation 수행  
비선형모델로 모델링을 수행한 결과 Estimate 한 모델출력이 실제값을 상당히 잘 따라가는 것을 확이할 수 있다.
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win2_sys_id.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Estimated Model Output vs Real Output&gt;</em>
</p>
* 시뮬레이션 결과확인  
Voltage Step Input에 대한 Window Rpm 출력 확인  
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win3_sys_id_result.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;스텝 전압입력 시 실제출력과 모델 출력 시뮬레이션 결과 비교&gt;</em>
</p>
Step입력을 통해 모델링 한 모델에 다른전압(사다리꼴 프로파일)을 인가할 때에도 모델출력과 실제출력이 동일한지 확인한다.  
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win3_sys_id_result2.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;사다리꼴 전압입력 시 실제출력과 모델출력 시뮬레이션 결과 비교&gt;</em>
</p>
확인 결과 사다리꼴 입력 시에는 실제출력과 모델출력에 오차가 약간 존재하는 것으로 확인되며, 실제 타겟시스템에서 튜닝을 통해 극복한다.

## 입/출력 검증

T.B.D

## 참고자료

* [Estimating DC Motor Parameters](https://www.youtube.com/watch?v=AUtfvXtz12Y)  
전달함수가 있고, 시뮬레이션 결과와 실험값의 차이가 있을 경우 전달함수 파라미터를 자동으로 찾아주는 기능
* [Introduction to System Identification](https://www.youtube.com/watch?v=u7hJ1aF-JrU)  
전달함수 자체를 만들어주는 기능
* [Estimate model parameters](https://www.mathworks.com/discovery/parameter-estimation.html)
* [엔진 스로틀 시스템의 모델 매개변수 값 추정(GUI)](https://kr.mathworks.com/help/sldo/ug/estimate-model-parameter-values-gui.html)
* QEP를 통한 고속/저속 Speed Calculation
  * [LAUNCHXL-F28377S: Simulink Settings for eQEP speed calculation](https://e2e.ti.com/support/microcontrollers/c2000/f/171/t/617754?LAUNCHXL-F28377S-eQEP-speed-calculation-in-Simulink)
  * [LAUNCHXL-F28377S: Simulink Models for eQEP speed calculation](https://www.mathworks.com/matlabcentral/answers/353589-simulink-eqep-block-for-speed-calculation-with-c2000-mcu)
