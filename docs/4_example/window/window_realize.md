---
id: window_realize
title: 기능구현
---
<div align="right">
  <font size="4">
    Since 21.08.20 ~ 21.11.30
  </font>
</div>
---

## 속도측정

> Plant를 모델링을 위해 실제 시스템 입력(전압)에 따른 출력(각속도) 정보를 이용하여 System Identification을 수행하기 위해서는 속도를 측정할 수 있어야 한다.

:::note
* 복잡도를 낮추기 위해 모터 단품을 통해 Basic Logic 및 기본기능을 구현하고, 시뮬레이션을 통한 검증의 완료되면,
* 이후 Plant를 통해 시스템 의존적인(ex. anti-pinch) 기능을 구현하고 시뮬레이션을 통해 기능 검증을 수행한다.
:::

#### DC모터 위치/속도 측정 방법

모터 전달함수를 구하기 위해서는 입력(모터 인가 전압)에 따른 출력(모터각속도)데이터를 이용하여 System Identification을 수행해야 한다.  
이를 위해 입력전압에 따른 출력속도 raw data를 측정할 수 있어야 한다.

HW-Simulink에서 구현한 시뮬링크 모델([GPIO-ADC-PWM-QD-IC](/.)를 통해 위치 및 속도를 측정한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_simulink_3_basic_ex.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_simulink_3_basic_ex.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;nxp_s32k144_gpio_pwm_adc_qd_ic.slx&gt;</em>
	</a>
</p>

* SW2(dn) 입력 시 → +1 출력, +Rpm 측정, 펄스카운트 증가
* SW2(up) 입력 시 → -1 출력, -Rpm 측정, 펄스카운트 감소

##### Position by QD

hall ic로부터 출력되는 펄스를 s32k144 quadrature decoder로 입력받아 위치를 카운트 한다.
```
	|￣￣|____|￣￣|____	// A상 2펄스 발생
	↑    ↓    ↑    ↓
	   |￣￣|____|￣￣|____	// B상 2펄스 발생
	   ↑    ↓    ↑    ↓
	1  2 3  4 5  6 7  8
```
* 4극 Ring Magnet
  * Motor Shaft 1회전 시 2펄스 발생 즉, 4번의 Edge(rising 2회, falling 2회)가 Detect 되며, A/B상이므로 2배가 되어 1회전 시 총 8[Count]가 발생하고,
  * Quadrature Phase Mode(4채배)로 rising/falling 모두 카운트 한다.
* 기어비가 1:85인 윈도우 모터
  * Shaft 1회전 시 8[Count]가 발생하고,
  * Gear 1회전 시 8x85=680[Count]가 발생한다.

##### Velocity by Pulse Period

:::important
* Zero Velocity  
Capture Input 인터럽트를 통해 1펄스 시간을 측정하여 속도를 계산하는 방법은 정지상태에서는 펄스가 발생하지 않아 인터럽트가 실행되지 않기 때문에 Zero Velocity 측정불가 문제가 발생하는 한편,  
일정 시간동안 발생되는 펄스수를 통해 속도를 계산하면 Zero Velocity를 계산할 수 있으나, 저속에서 펄스가 길어져 일정시간 안에 펄스가 발생되지 않아 측정 가능한 최소속도가 제한되는 문제가 발생한다.
100ms 단위로 측정되는 펄스 개수를 측정하여 속도를 계산한다.
* 정지상태 속도  
처음 정지상태에서는 펄스주기가 측정되지 않기 때문에 1펄스 시간이 0으로 나오고, 0으로 나누면 무한대의 속도가 계산되는 현상이 발생한다. 따라서 정지상태에서는 속도계산을 수행하지 않고, 바로 Zero Velocity를 출력하고, 펄스주기가 측정될 때(이동중)에만 속도계산을 수행해야 한다.
* ExtInt Premmption  
ExtInt를 통한 펄스 주기 측정 시 우선순위가 높은 인터럽트에 의해 선점당하면 펄스주기가 큰 값으로 측정되어 속도값이 튀는 원인이 될 수 있으므로, ExtInt의 우선순위를 가장 높게 설정해야 한다.
:::

12[V]인가 시 Gear 75[rpm]이 측정되므로 Motor Shaft 속도는 다음과 같다.  
75[rpm] = 75\*((85\*8)/60) = 850[pulse/s] -> 1펄스 시간 = 1/850 = 0.0012[s]  
15[rpm] = 15\*((85\*8)/60) = 170[pulse/s] -> 1펄스 시간 = 1/170 = 0.0059[s]  
1[rpm] = 1\*((85\*8)/60) = 11.333[pulse/s] -> 1펄스 시간 = 1/11.333 = 0.0882[s]  


850[pulse/s] = 85[pulse/0.1s] = 8.5[puls/0.01s] = 0.85[pulse/s]

* 60rpm을 기준으로 rpm -> pulse/s로 단위환산을 수행한다.
* 15[rpm]은 4[s]동안 Gear 1회전하는 속도이다.

<center>

|Gear|Gear|Shaft|Shaft|
|----|----|----|----|
|60[rpm]|1[rev/s]|85[rev/s]|680[pulse/s] (1rev=8pulse)|
|15[rpm]|0.25[rev/s]|21.25[rev/s]|170[pulse/s]|

</center>

60[rpm] x 85/60[(rev/s)/rpm] = 85[rev/s]
60[rpm] x (85*8)/60[(pluse/s)/rpm] = 680[pulse/s]

따라서
rpm에 `(85)/60`를 곱하면 [rev/s]가 되고,
rpm에 `(85*8)/60`를 곱하면 [pulse/s]가 된다.
* 1[rpm] = (85)/60[rev/s]
* 1[rpm] = (85*8)/60[pulse/s]

#### Period 측정을 통한 속도계산

##### <u>Manual Coding 방법 - Ext_Int로 1펄스 시간을 측정해 속도계산</u>

외부인터럽트(Ext_Int)로 hall pulse(A상(or B상)rising edge)를 입력 받고, 인터럽트가 발생할 때마다 인터럽트 발생 시간(SysTick 카운트)을 저장하여 이전 인터럽트부터 현재 인터럽트 발생 시점까지 시간 dt를 계산한다.
```
	<--윈도우모터 1회전-->		// 2펄스 -> 1.0[rev]
	<--dt_A--->				// 1펄스 -> 0.5[rev]
	↓         ↓
A상	|￣￣|____|￣￣|____
B상	   |￣￣|____|￣￣|____
	   ↑         ↑
	   <--dt_B--->			// 1펄스 -> 0.5[rev]

* 속도 = 거리/시간 = 0.5[rev]/dt[s] = 0.5/dt [rev/s]
* 1[rev/s] = 60[rpm] -> (0.5/dt)*60 [rpm]
```

* 노이즈로 인해 속도가 튀는 경우가 가끔 발생하므로 속도 업데이트 시점에 dt_A와 dt_B의 차이가 작은 경우에만 속도를 업데이트 하고, 차이가 클 경우 이전 속도로 값을 유지시킨다. (속도가 변하므로 같을 수는 없음)
* 그래도 가끔씩 이동중 Zero Velocity가 나오는 경우가 있음 -> 이전위치와 현재위치가 다를 경우 이동중이므로 Zero Velocity가 나오면 이전 속도로 값을 유지시킨다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_0_vel_process.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_0_vel_process.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;속도 정확도 향상처리 방법&gt;</em>
	</a>
</p>

```c
void PORTB_IRQHandler(void)	
{
	if(PORTB->ISFR & (1<<2))		// A상 인터럽트
	{
		if(PTB->PDIR & (1<<2))		// 입력 high -> rising edge
		{
			// dt_A 측정
			gw_curr_pb2_tick = (int32_t)osif_GetCurrentTickCount();
			gw_elapse_tick = (gw_curr_pb2_tick >= gw_prev_tick) ?
				(gw_curr_pb2_tick - gw_prev_tick) :
				(gw_curr_pb2_tick + (0xFFFFFFFFu-gw_prev_tick));
			gw_prev_tick = gw_curr_pb2_tick;
		}
		else{}						// 입력 low -> falling edge
	}
	else if(PORTB->ISFR & (1<<3))
	{
		if(PTB->PDIR & (1<<3))
		{
			//A상 rising와 동일한 방법으로 B상 rising dt_B 측정
		}
		else{}
	}
	
	if(abs(dt_A-dt_B)<50)
		// Update velocity
	else
		// maintain previous velocity
}
```

:::note Zero Velocity 측정
인터럽트를 통해 1펄스를 입력받아 속도를 측정하는 경우, 모터정지 시 인터럽트가 발생하지 않기 때문에 속도가 0으로 업데이트 되지 않는 문제를 해결해야 한다.  
* 현재(21.09.16) 다음과 같이 구현
  * 일정 시간 위치값의 변화가 없으면 속도를 0으로 업데이트
  * 측정결과 max low velocity에서 최대 260ms 간격으로 1펄스가 발생할 수 있다.
* 문제
  * 0속도 판단에 300ms 가 소요됨
:::

##### <u>Input_Capture로 1펄스 시간을 측정해 속도 계산 - Simulink AutoCode 방법 적용</u>

* Simulink S32K144 Capture Input Block을 통해 생성된 코드를 실행하여 펄스 Period를 측정할 경우 계산된 속도값이 가끔 튀는 현상이 발생한다.
  * 측정속도가 튀니까 이를 제어하려고 모터가 꿀렁임, 시뮬링크 자동생성 코드 효율이 좋치 않아서 튀는게 아닌지 의심스러움(21.11.17)
  * Input Capture를 통해 속도를 측정할 때 형변환을 수행하는데, 불필요한 형변환을 제거하니까 다시 잘됨(21.11.19)
* Manual Coding으로 ExtInt로 펄스 Period를 측정할 경우 튀는 현상없이 잘됨.
  * Simulink S32k144 ExtInt를 구현해서 ExtInt를 통해 속도를 측정해 보고 그래도 속도가 가끔 튀는 현상이 지속되면 기존에 구현해 놓은 Manual Coding으로 ExtInt를 구현한 방법 사용할 것(21.11.17)
  * 구현상 문제를 해결하니까 잘 되므로 그냥 Simulink AutoCode 방법을 사용하기로 함(21.11.19)

#### <u>측정값 필터링</u>

:::important
* 필터링 필요성  
본 프로젝트에서는 1펄스 주기를 이용하여 속도를 계산하는데, 필터를 추가하지 않으면 노이즈로 인하여 측정된 속도가 튀는 현상이 발생되고, 이로인해 모터출력도 꿀렁임
* HW필터링  
Capture Input 모듈이 제공하는 Hardware Level의 Filter 적용(디지털 필터 없이 이것만 적용해서 깔끔하게 속도가 측정되는 것을 확인함, 21.10.29)  
~~디지털필터를 적용하면 튀는값은 잡울 수 있느나 피드백 값 업데이트가 느려져서 속도제어가 빨리빨리 되지 않는 듯한 느낌이 있음 (21.11.15 재확인필요)~~
* SW필터링(필요성)  
Input Capture 분해능때문에 저속 속도측정이 불가능한하며, 이로인해 0[Rpm]에서 속도측정이 가능한 구간으로 확 올라가거나, 이동하다 정지할 경우 인위적으로 0[Rpm]으로 만들기 때문에 과도구간에서 급격한 속도변화가 발생한다.  
-> 이를 방지하기 위해 LPF를 적용한다.
:::

##### 하드웨어필터(Input Capture filter) 설계

* HW 필터 적용  
s32k144 Capture Input simulink block에 해당하는 `FTM Input Edge Capture` 더블클릭 → General탭 → Check `Filter enable` → `Input Filter value`를 3으로 설정하고 측정하니까 소프트웨어 필터 없이도 속도측정값 튀지않고 잘 측정됨(21.10.29)
* High Priority로 우선순위 설정  
우선순위를 높게 설정하지 않으면 우선순위가 높은 ISR이 수행되어 속도측정이 튀는 현상이 발생하므로 우선순위를 가장 높게(0) 설정한다.
* 해상도  
저속에서 펄스폭이 길어지는데, Prescale Factor를 가장 높게(128) 설정하여 저속 펄스를 최대한 측정할 수 있도록 설정한다.
* Edge 측정  
rising edge만 측정하여 1펄스 발생 시간을 측정한다.
Velocity = 0.5회전/1펄스측정시간 = pi/dt
(2극의 경우 모터 shaft 1회전 시 2펄스 발생)

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_1_IC_hw_filter.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_1_IC_hw_filter.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;Input Capture HW 필터 설정&gt;</em>
	</a>
</p>

##### 디지털필터(LPF) 설계

:::note
기능구현 완료 후 필터설계를 진행하고, 우선 간단하게 속도측정 시 다음과 같이 Low Pass Filter를 적용한다(21.09.27)
LPF
:::

저역통과필터는 입력신호와 직렬로 R을 연결하고, 병렬로 C를 연결하며, RC를 이용하여 차단주파수가 결정된다.  
Cut off frequency Fc = 1/(2\*pi\*RC)  
Fc=1로 설정하여 1Hz보다 주파수가 높은 신호를 차단할 경우 RC값은  
RC = 1/(2\*pi\*Fc) = 1/(2\*pi\*1) = 0.1592가 되고,  
Lowpass Filter 전달함수는 Vo/Vi = 1/(1+jw\*RC) = 1/(1+RC\*s)이므로  
전달함수는 H = Vo/Vi = 1/(0.1592\*s+1)이 된다.

```c
fc=1;                         // 1Hz보다 높은 주파수 차단
RC=1/(2*pi*fc);

Hs = tf(1, [RC 1])            // LPF 전달함수
Hs =
       1
  ------------
  0.1592 s + 1
	
Hz = c2d(Hs, 0.001, 'tustin')  // 샘플링 주기 : 1ms
Hz =
  0.003132 z + 0.003132
  ---------------------
       z - 0.9937
```

2pi[rad/s]가 1[Hz]이므로 rad/s에 2pi를 곱하면 Hz가 된다. 즉, 100*(2pi)=100Hz가 된다.
```
1[Hz]:2pi[rad/s] = freq_in[Hz]:freq_out[rad/s]
freq_out = freq_in*2pi
```
속도측정 시 다음과 같은 LPF(fc=1Hz) 및 Butterworth Filter(fc=6Hz)를 적용한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_2_LPFnButterworth.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_2_LPFnButterworth.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;1차 (좌) LPF fc=1Hz, Ts=0.001s vs (우) Butterworth fc=6Hz&gt;</em>
	</a>
</p>

##### 디지털필터(FIR) 설계

:::note [Html Link]
<a href="/assets/kalman/fir_filtering.html" target="_blank">1. FIR Lowpass filter를 통한 속도측정</a><br/>
:::

* LPF로 필터링 잘 안될 경우 CMSIS DSP Library FIR Low Pass Filter example.mp4 - CMSIS에서 제공하는 필터 라이브러리 이용하는 방법 고려해 볼 것  
  * [FIR Lowpass Filter Example](https://www.keil.com/pack/doc/CMSIS/DSP/html/group__FIRLPF.html)
  * [예제소스 arm_fir_example_f32.c](https://www.keil.com/pack/doc/CMSIS/DSP/html/arm_fir_example_f32_8c-example.html)
* nxp에서 제공 AMMCLIM f라이브러리를 이용하는 방법 고려해 볼 것
  * s32k14x시뮬링크 예제 - ../S32K14x_AMMCLIB_v1.1.18/../GDFLIB_FilterFIR_BAM_F32.mdl

##### 디지털필터 타겟보드 동작확인

시뮬링크 모델 [nxp_s32k144_gpio_pwm_adc_qd_ic.slx](#dc모터-위치속도-측정)을 코드자동생성/빌드/다운로드 하여 실행하면, FreeMASTER를 통해 다음과 같은 필터링 결과를 확인할 수가 있다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_3_LPF_targetExecution.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_3_LPF_targetExecution.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;LPF를 통한 저속구간 속도 필터링 필요성&gt;</em>
	</a>
</p>

#### Pulse Count를 통한 속도계산

* 1회전 당 8카운트가 발생하므로
  - 1[rev]=8[pulsecnt] -> 1[pulsecnt] = 1/8[rev]
  - 따라서 발생한 pulsecnt를 8로 나누면 [rev]가 된다.
* 1ms마다 인터럽트를 발생시켜 증가한 펄스수를 확인하는 경우
  - `속도 = 거리 / 시간`  
  -> (pulsecnt/8)[rev]/0.001[s] = (1000/8)\*pulsecnt [rev/s]
* [rev/s] -> [rpm] 변환
  - 1[rev/s]=60[rpm]
  - 60\*(1000/8)\*pulsecnt [rpm]

윈도우모터의 경우 저속에서 1펄스(0.5[rev])가 발생하는 시간은 260ms(duty 7.6%)가 되므로
1ms 간격으로 펄스카운트 측정 시 속도측정이 불가능 하다.  
이를 해결하기 위해 샘플시간을을 1ms에서 1s(or 100ms)로 늘리면 펄스카운트가 가능하여 속도측정이 가능하지만 속도 업데이트가 1s(or 100ms)로 느려지므로 고속제어 시에는 적용이 불가능하다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_4_vel_measure.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;PWM출력 vs 속도측정(1펄스시간/주기동안펄스카운트)&gt;</em>
</p>

<font color="#34a28a">따라서 펄스카운트 개수를 통한 속도계산은 엔코더 분해능이 높거나 고속에서 속도측정 시 사용되어야 한다.</font><br /><br />

:::note 
1ms로 피드백제어를 수행할 때 100ms 속도가 업데이트 되는 경우 제어가 불가능함
:::

## F0 플랜트 모델링

#### DC모터 단품 모델링

##### 가정

* 기어의 RPM을 직접 측정할 수는 없고, Motor_Shaft에 붙어있는 Hall_ic를 통해 Motor-Shaft의 RPM을 측정할 수 있다.
* Motor-Shaft의 RPM을 측정하더라도, Gear와 Motor_Shaft가 연결되어 있기 때문에 Gear/마찰 등의 영향을 Motor_Shaft RPM이 측정된다. 따라서 Motor_Shaft RPM을 85로 나눠 "모터인가전압-Gear RPM"에 대한 Plant 모델링을 수행한다.

##### 데이터 샘플링

입력에 따른 출력데이터를 이용하여 시스템을 정의한다.  
DC모터 전달함수의 입력은 전압이고, 출력은 각속도이므로 입력전압에 따른 모터출력각속도를 확인해야 한다.

* 16[bit] PWM 0~32,768[bit]을 0~12[V]로 변환하여 입력전압 측정
* 100ms 주기로 측정된 펄스증가량을 이용하여 속도를 측정  
delat_Cnt[pulse]/0.1[s] -> 10\*delat_Cnt[pulse/s] -> (10\*delat_Cnt)/8[rev/s]
* FreeMASTER(Serial통신 프로그램)를 이용하여 100ms 주기로 전압/속도 정보 샘플링

##### 모델링

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
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot3_sys_id_result.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot3_sys_id_result.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;입력전압 vs Motor_Shaft RPM 출력 시뮬레이션&gt;</em>
	</a>
</p>

#### 입/출력 검증

##### 삼각파 입/출력

* 모델링에 사용된 샘플데이터와 다른 입력파형을 실제 시스템 입/출력 데이터와 전달함수를 통해 시뮬레이션 실행 데이터를 비교하여 Plant 모델링 타당성을 확인한다.
* 실제 -12~12[V]의 전압레벨을 톱니파로 인가할 때 -75~75[rpm]의 Gear Velocity가 엑셀그래프(좌)와 같이 출력되고, 모델링을 통해 도출한 전달함수에 동일한 -12~12[V]를 입력하였을 때 실제 출력과 근사하게 -75~75[rpm]의 Gear Velocity가 Matlab Figure(우)와 같이 출력된다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot4_sys_verify_tooth.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;삼각파 전압 입력 시 모터 출력 (좌-Real vs 우-Simulation)&gt;</em>
</p>

##### 사다리꼴 입/출력

사다리꼴 전압 입력에 따른 Simulation vs Real 모터 출력을 비교한 결과 
두 경우 모두 0~12[V]범위의 S커브 전압 입력 시 0~75[rpm]범위의 Gear RPM 출력이 비슷하게 확인되므로 윈도우 모델이 실제 윈도우 모터를 근사한 것으로 판단하고, 해당 모델을 MBD개발에 사용한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_5_mot5_sys_verify_profiling.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;시뮬레이션 결과와 실제 모터구동 결과 비교&gt;</em>
</p>

#### 윈도우 시스템 모델링

##### 가정

* 윈도우 시스템은 윈도우 부하로인해 동일한 입력전압에 대하여 Up/Down 방향에 따라 다른 Rpm이 출력된다. 따라서 Plant를 비선형 시스템으로 모델링 해야 한다.

##### 데이터 샘플링

* Plant Modeling 시 입력전압에 대한 조작 없이 순전히 입력전압에 따른 출력Rpm을 측정해야 한다.
* 전압별로 끊어서 Step입력(각각의 0.0V, 2.4V, -2.4V, 3.6V, -3.6V, 4.8V, -4.8V, 6.0V, -6.0V, 7.2V, -7.2V, 8.4V, -8.4V, 9.6V, -9.6V)에 대한 출력 각속도(RPM) data를 획득한 다음 엑셀로 합쳐 System Identification을 수행할 것

##### 모델링

* DAQ 데이터  
안정하게 시리얼 데이터를 수신하기 위해 0.1[s] 단위로 MCU가 보내는 시리얼 데이터를 PC에서 수신하여 저장한다.
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win1_raw_data.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win1_raw_data.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;입력전압 vs Window 시스템에 장착된 모터 RPM 출력&gt;</em>
	</a>
</p>
* Matlab System Identification을 통한 Nonlinear Model Estimation 수행  
비선형모델로 모델링을 수행한 결과 Estimate 한 모델출력이 실제값을 상당히 잘 따라가는 것을 확이할 수 있다.
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win2_sys_id.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win2_sys_id.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;Estimated Model Output vs Real Output&gt;</em>
	</a>
</p>
* 시뮬레이션 결과확인  
Voltage Step Input에 대한 Window Rpm 출력 확인  
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win3_sys_id_result.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win3_sys_id_result.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;스텝 전압입력 시 실제출력과 모델 출력 시뮬레이션 결과 비교&gt;</em>
	</a>
</p>
Step입력을 통해 모델링 한 모델에 다른전압(사다리꼴 프로파일)을 인가할 때에도 모델출력과 실제출력이 동일한지 확인한다.  
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win3_sys_id_result2.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_6_win3_sys_id_result2.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;사다리꼴 전압입력 시 실제출력과 모델출력 시뮬레이션 결과 비교&gt;</em>
	</a>
</p>
확인 결과 사다리꼴 입력 시에는 실제출력과 모델출력에 오차가 약간 존재하는 것으로 확인되며, 실제 타겟시스템에서 튜닝을 통해 극복한다.

#### 입/출력 검증

T.B.D

#### 참고자료

* [Estimating DC Motor Parameters](https://www.youtube.com/watch?v=AUtfvXtz12Y)  
전달함수가 있고, 시뮬레이션 결과와 실험값의 차이가 있을 경우 전달함수 파라미터를 자동으로 찾아주는 기능
* [Introduction to System Identification](https://www.youtube.com/watch?v=u7hJ1aF-JrU)  
전달함수 자체를 만들어주는 기능
* [Estimate model parameters](https://www.mathworks.com/discovery/parameter-estimation.html)
* [엔진 스로틀 시스템의 모델 매개변수 값 추정(GUI)](https://kr.mathworks.com/help/sldo/ug/estimate-model-parameter-values-gui.html)
* QEP를 통한 고속/저속 Speed Calculation
  * [LAUNCHXL-F28377S: Simulink Settings for eQEP speed calculation](https://e2e.ti.com/support/microcontrollers/c2000/f/171/t/617754?LAUNCHXL-F28377S-eQEP-speed-calculation-in-Simulink)
  * [LAUNCHXL-F28377S: Simulink Models for eQEP speed calculation](https://www.mathworks.com/matlabcentral/answers/353589-simulink-eqep-block-for-speed-calculation-with-c2000-mcu)

## F1 Auto/Manual

> <font color="blue"><strong>Auto/Manual 기능</strong></font><br/>
> Auto,Up,Dn 스위치 입력을 통해 자동 or 수동으로 윈도우 열림/닫힘 동작을 수행하는 기능

:::important
* 구현하기 가장 쉬운 기본기능(F1.AutoManual기능의 M-Up/M-Dn 시뮬레이션)을 선정하고 이에 대한 구현 및 시뮬레이션 과정을 통해 `기능로직`을 개발하기 위한 시뮬레이션 환경을 구축한다.  
* 기본 기능로직모델(Simulink를 통해 구현한 최소한의 동작을 수행)과 System Identification을 통해 구현한 Plant모델을 이용하여,  
* 설계된 시스템 아키텍처를 시뮬링크 모델로 대체하여 전체 시스템을 구성하고 시뮬레이션을 수행한다.
:::

#### 구현조건

##### 위치/속도 정의

* 위치는 열림량 0을 Zero Position으로 판단하여  
  * 0\[pulse](Closed) -> Dn이동(pulse +증가) -> 2797\[pulse](Opened)
  * 윈도우 상단 구속상태를 Window Closed Position(PulseCnt ≤ 0)으로,
  * 하단 구속상태를 Window Opened Position(PulseCnt ≥ 2797)으로 정의한다.
* 속도는 열림량을 기준으로 판단한다.  
  * 열림량증가 == +속도 == Opening == Downing
  * Closed -> Opened 방향 이동 시 +속도로,
  * Opened -> Closed 방향 이동 시 -속도로 이동한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_1_def_pos_vel.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_1_def_pos_vel.png').default}
			alt="Example banner"
			width="550"
		/><br/><em>&lt;윈도우 위치/속도 정의&gt;</em>
	</a>
</p>

:::important 비율에 따른 윈도우 영역구분
* 자동초기화를 위해서는 I~IV영역이 자동으로 결정되어야 하는데, I~IV영역은 차량마다 윈도우 형태 및 길이가 다르므로 차량에 따라 다르게 결정된다.
* 따라서 I~IV영역을 Fix된 길이로 지정하지 않고, 비율로 정의하여 Full-Strok가 구해지면 자동으로 결정되도록 한다.  
ex) I영역 : 0~4mm -> 전체길이(Full-Strok) 중 1.32%
* 또한 영역에 대한 비율은 파라미터로 설정하여 가변할 수 있도록 한다.
:::

##### 위치 언더플로우 방지

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

#### 기능구현

모델링 한 플랜트 모델을 이용하여 시뮬레이션이 가능한지 여부를 판단하기 위해 다음과 같이 모터 On/Off로 시스템을 구성하여 시뮬레이션 가능 여부를 확인한다.

##### 스위치 입력 판단

RCP장비에는 스위치가 2개 밖에 없으므로 스위치 입력 조합을 통해 Auto, Up, Dn 입력을 결정한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_2_SwitchInput.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;초기화 상태에 따른 Auto 설정&gt;</em>
</p>

* M-Up : sw3up On(Manual Closing), sw3up Off(Stop)
* A-Up : sw3up On → sw2dn On(Auto Closing), sw3up | sw2dn On(Stop)
* M-Dn : sw2dn On(Manual Opening), sw2dn Off(Stop)
* A-Dn : sw2dn On → sw3up On(Auto Opening), sw2dn | sw3up On(Stop)

##### Input Processing

Auto/Up/Dn 스위치의 이전 키입력과 현재 키입력의 조합으로 상태천이 조건(transition index)을 결정한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_3_transition_idx.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_3_transition_idx.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;스위치 입력에 따른 상태천이 조건 판단&gt;</em>
	</a>
</p>

Left(Up버튼), Right(Dn버튼)와 같이 스위치 입력이 2개인 경우 다음과 같은 키조합으로 스위치 입력을 결정한다.
* Up을 누른 상태에서 Dn을 누르면 AutoUp
* Up만 눌렀더 떼면 ManualUp
* Dn을 누른 상태에서 Up을 누르면 AutoDn
* Dn만 눌렀다 떼면 ManualDn

##### Window Logic

* 스위치 입력이 없는 경우 출력신호 0 유지
* M-Dn 입력 시 출력신호를 0->1로 변경하고, 입력을 유지하는 동안 출력신호도 1을 유지하며, M-Dn 해제 시 출력신호를 1->0로 변경 ([`F1_Req3`](/.))
* A-Dn 입력 시 출력신호를 0->1로 변경하고, A-Dn 해제 시에도 하단구속까지 출력신호를 1로 유지하며, 하단구속 시 출력신호를 1->0로 변경 ([`F1_Req2`](/.))
* A-Dn 동작 중 추가 스위치 조작이 있으면 출력신호를 1->0로 변경 ([`F1_Req1`](/.))
* Up은 방향만 -1로 반대이고, 동작은 Dn과 동일함

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_4_window_logic.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_4_window_logic.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;스위치 입력에 따른 윈도우 상태천이 동작&gt;</em>
	</a>
</p>

##### Output Processing

`Basic Simulation`에서는 피드백제어를 수행하지 않으므로 스위치 입력에 따라 `Window Logic`에서 생성되는 `Trigger Signal(1/-1/0)`를 `모터에 인가되는 전압(12/-12/0)`으로 바꿔 Plant에 전달한다.  
따라서 `Pos Calculator` 및 `Output Processing` 모듈을 다음과 같이 단순화 한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_5_etc.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;M-Dn 및 A-Dn 시뮬레이션&gt;</em>
</p>

* <u>Pos Calculator</u>  
위치/속도 계산은 Quadrature, External-Interrupt를 이용하여 Hand-Coding으로 구현하며 시뮬레이션에서 PosCalculator 블록은 입력신호를 ByPass하여 그대로 출력신호로 내보낸다.
* <u>Output Processing</u>  
여기서는 시뮬레이션 가능성 여부를 확인하는 것을 목적으로 하므로 `-1 ~ 1` 범위를 갖는 Window Logic의 출력신호에 12를 곱해 `-12V ~ 12V` 전압으로 변경하여 Plant(모터)에 전달한다.

#### 시뮬레이션

##### 스위치입력에 따른 모터 구동

시뮬레이션 동작확인이 주된 목적이므로 코드생성 및 MCU실행을 고려하지 않고, Continuous Model로만 시스템을 구성하여 시뮬레이션을 수행한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_6_simulation_dn.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;M-Dn 및 A-Dn 시뮬레이션&gt;</em>
</p>

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f1_AuMa_6_simulation_up.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;M-Up 및 A-Up 시뮬레이션&gt;</em>
</p>

시뮬레이션 수행 결과 피드백제어를 수행하지 않기 때문에 Dn(Opening) 중 3753 이상 이동하면 정지명령을 출력하나 4000이 넘는 위치에서 모터가 정지한다.

## F2 속도 프로파일

> <font color="blue"><strong>프로파일링 기능</strong></font><br/>
> 모터를 부드럽게 구동시키기 위해 가속/등속/감속 구간으루 나눠 위치(S커브) 및 속도(사다리꼴) 제어입력을 생성하는 기능

#### 구현조건

##### 시뮬레이션 환경

Continuous Transfer Function으로 모델링 된 Plant Model과, MCU실행을 고려하여 일정주기(1ms)마다 Profiling을 수행하는 Discrete Profiling Model이 하나의 시뮬링크 환경에서 수행되어야 하기 때문에 다음과 같이 환경을 설정하고 시뮬레이션을 수행한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_1_solver.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_1_solver.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;Simulink Solver Settings&gt;</em>
	</a>
</p>

##### 파라미터 정의

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

#### 기능구현

##### 파라미터 정의

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

##### 프로파일링 트리거

* WindowState로직은
  * ProfileTrigger(스위치입력) 발생 시 Opening/Closing 상태로 천이하고, ProfileTrigger신호를 1/-1로 출력한다.
  * 트리거 발생 후 추가 스위치 조작이 없는 경우 StopTrigger(0[pulse] or 4000[pulse] 도달)가 발생하면 Opened/Closed 상태로 천이하고, ProfileTrigger신호를 0으로 출력한다.
* OutputProcessing로직은
  * ProfileTrigger신호가 1/-1인 경우 가속/등속/감속 프로파일링을 수행한다.
  * 가속/등속 중 스위치 조작으로 ProfileTrigger신호가 0으로 변경되면 정지를 위해 감속프로파일을 수행하고, 감속 중 ProfileTrigger신호가 0으로 변경되면 진행중인 감속프로파일을 계속 수행한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_2_profile_trigger.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_2_profile_trigger.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;WindowState로직(좌) 및 OutputProcessing로직(우)&gt;</em>
	</a>
</p>

##### 프로파일링

속도프로파일은 가속/등속/감속 세구간으로 나눠 직선의 방정식을 vel=f(t)와 같은 수식으로 만들어 각 샘플시간마다 속도를 계산한다. 역방향 프로파일은 정방향 프로파일과 부호만 반대로 계산한다.  
속도프로파일을 적분하여 위치프로파일을 생성하고, 미분을 통해 가속도 프로파일을 생성한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_3_vel_formula.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_3_vel_formula.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;가속/등속/감속 프로파일링 생성 수식&gt;</em>
	</a>
</p>

이와 같은 수식을 Stateflow를 통해 다음과 같이 구현한다.

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

##### 트리거 동기화

`Closing->Closed동작`을 예를들면, 윈도우 Plant 특성 상 가속보다 감속에서 지연이 많이 발생하는 이유로, 감속 Profiling은 끝났는데, 지연 때문에 아직 `0[pulse]`에 도착하지 않았기 때문에 <u>WindowState로직(위치를 기준으로 상태천이 수행)</u>은 Closing상태를 Closed상태로 천이시키지 않고, `MovingTragger=-1`을 출력한다. OutputProcessing로직은 Profiling완료 후 WindowState로직의 -1 신호로인해 다시 Profiling을 시도하게 되고, 비로소 `0[pulse]`에 도착하면 WindowState로직은 Closed상태로 천이하여 `MovingTragger=0`를 출력하고, 이로인해 OutputProcessing로직은 가속 Profiling 도중 Switch Off를 인식하여 감속 Profiling을 진행하여 모터가 멈추게 된다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_4_Sync_problem.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_4_Sync_problem.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;모터 구동명령 동기화 문제&gt;</em>
	</a>
</p>

이와 같은 이유로 윈도우 동작을 위한 MovingTrigger신호를 생성하는 WindowState로직과 이를 이용하여 모터 출력을 생성하는 OutputProcessing로직간 동기화가 중요해 진다.

WindowState로직과 OutputProcessing로직 동기화를 위해 다음과 같이 ProfileTrigger 신호를 이용하여 동기화를 구현한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_5_Sync_solution.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_5_Sync_solution.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;모터 구동명령 동기화 해결방법&gt;</em>
	</a>
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

#### 시뮬레이션

##### 속도프로파일을 통한 모터 출력

위치/속도 피드백제어를 정확하게 수행하면 정의된 시간에 계산된 위치까지 이동하므로
이동위치에 도달할 때 Opening->Opened or Closing->Closed로 상태천이를 수행하면 되나,
피드백제어를 수행하지 않을 경우 다음과 같이 Reference위치가 4000에 도달하여 Reference Voltage를 0[V]으로 출력해도, 관성으로 Plant는 여전히 이동하며, 이로인해 위치오차가 발생하게 된다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_6_out_without_FbCtrl.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f2_VelProfile_6_out_without_FbCtrl.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;피드백 없는 프로파일 모터 출력&gt;</em>
	</a>
</p>

## F3 피드백제어

> <font color="blue"><strong>Feedback Control 기능</strong></font><br/>
> 위치/속도 피드백제어 통해 프로파일링 제어입력에 대한 피드백 오차를 최소화하여 플랜트를 제어한다.

#### 구현조건

##### 제어기 설계

제어기를 설계하기 위해서는 많은 시간이 필요하므로, 여기서는 PID제어 중 P제어만을 이용하여 위치 및 속도제어를 수행하며, 기능구현 완료 후 Robust 제어기를 설계하기로 한다.

#### 기능구현

##### 피드포워드 제어

Robust 제어기 설계 시 적용(T.B.D)

##### 피드백 제어 (위치/속도 Simple P제어)

다음과 같이 `입력처리로직`의 스위치 입력 판단에 따라 `윈도우상태로직`에서 모터 정지 또는 정/역 구동을 판단하여 트리거 신호(모터구동이 결정)를 생성하고, `ProfileGen로직`을 통해 0.01s 주기로 제어입력 Ref_Pos를 생성하여 `위치제어기`에서 P제어를 수행하고, 0.01s마다 생성되는 제어입력을 Ref_Vel로 받으면 `속도제어기`는 0.002s 간격으로 P제어를 수행한다(위치제어 1회 출력에 대하여 5회 속도피드백제어를 수행한다). 

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_1_timing.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_1_timing.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;피드백 제어주기&gt;</em>
	</a>
</p>

##### 피드백 제어 (속도 Anti-Windup PI제어기)

:::important 반드시 확인하고 이해할 것
* matlab 도움말 -> 검색창에서 `Anti-Windup Control Using a PID Controller` 키워드 검색
* `plcdemo_pid_feedforward.slx` 검색하여 실행
  * Feedforward 추가됨
  * 코드생성/확인 가능
:::

#### 시뮬레이션

##### 피드백 제어

시뮬레이션을 통해 피드백을 수행하지 않을 경우 위치오차가 발생하나, 피드백을 수행하면 위치오차가 제거되는 것을 확인할 수 있다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_2_simulation.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_2_simulation.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;No Feedback(상) vs Feedback(하)&gt;</em>
	</a>
</p>

* 피드백 미수행 시 사다리꼴 속도프로파일 출력(0~1[pulse/s])에 12를 곱한 0~12V의 신호를 Plant에 직접 입력하고, 
* 피드백 수행 시 위치제어기 내부에 속도제어기를 배치하여, 위치 프로파일 출력(0~1[pulse])을 피드백제어기를 거쳐 Plant에 입력한다.

##### 게인튜닝

제어게인을 Pos_Pgain=10, Vel_Pgain=1로 설정하고, 피드백을 수행할 경우 속도제어에서 불안정한 출력이 발생되므로 시뮬레이션을 통해 속도제어게인을 조정한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_3_gain_tune.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_3_gain_tune.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;속도제어 게인 튜닝&gt;</em>
	</a>
</p>

시뮬레이션 결과 속도제어게인이 낮아지면 속도제어 시 오실레이션이 작아지는 반면 낮아지는 게인으로인해 위치응답이 늦어지게 된다.
여기서는 응답속도를 고려하여 제어게인을 각각 <font color="#34a28a">Pos_Pgain=20, Vel_Pgain=0.4</font>로 적용한다.

#### 타겟구동

##### 코드자동생성

시뮬링크에서는 Function Block의 실행주기가 서로 다를 경우 색상을 통해 구분하여 표현할 수 있으며, 다음과 같이 시스템은 1ms(빨강), 2ms(초록), 10ms(파랑) 3개의 주기로 각각 실행된다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_4_AutoCode.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_4_AutoCode.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;코드자동생성&gt;</em>
	</a>
</p>

##### 피드백 제어

* 속도제어기 피드백에 의해 제어출력(motorVoltage)이 12V를 넘더라도 모터에는 12V까지 전압이 인가되며, 12V에서 모터출력속도가 Max가 된다.  
* 피드백제어를 수행한 결과 정해진 시간(7s)이내에 4000[pulse]까지 도달하는 것을 확인할 수 있고, 
* 모터의 비선형적 특성으로 인해 CW와 CCW 제어가 동일하지 않음을 확인할 수 있다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_5_verification.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f3_Feedback_5_verification.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;모터구동 출력신호 확인&gt;</em>
	</a>
</p>

#### 시뮬레이션

피드백 제어는 실부하가 있는 상태에서 확인이 수월하므로 실부하 상태에서 기능시험으로 대체함.

#### 참고자료

* [Anti-Windup Control Using a PID Controller Block](https://kr.mathworks.com/help/simulink/slref/anti-windup-control-using-a-pid-controller.html)
* [모터제어 알고리즘 설계/구현을 위한 Motor Control Blockset ](https://kr.mathworks.com/products/motor-control.html#sensor-observers)
* [시뮬레이션을 통한 BLDC 모터제어 알고리즘 개발](https://kr.mathworks.com/solutions/power-electronics-control/bldc-motor-control.html)
* [Parameter Tuning Guide for Position Controller with Cascaded Velocity Controller](https://doc.synapticon.com/resources/tutorials/tuning_guides/position_controller_with_cascaded_structure/index.html)
* [시뮬레이션을 통한 BLDC 모터 제어 알고리즘 개발 by Mathworks](https://kr.mathworks.com/solutions/power-electronics-control/bldc-motor-control.html)
* [Simscape Electrical을 사용한 모터 제어기 설계 방법 by Mathworks](https://kr.mathworks.com/videos/series/how-to-design-motor-controllers-using-simscape-electrical.html)
* [브러시리스 DC 모터의 PID 제어 by Mathworks](https://kr.mathworks.com/videos/pid-control-of-a-brushless-dc-motor-1523009772696.html)
* [PID and PIV Controllers - Frequency Domain Tuning](https://www.youtube.com/watch?v=18bfizGBiP4)
* [](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=pg365&logNo=222034164061)
[로보티즈 다이나믹셀 위치/속도/전류제어 블록도](https://emanual.robotis.com/docs/en/dxl/p/pm54-060-s250-r/)
* [PIV 서보 제어란](https://www.motioncontroltips.com/faq-what-is-piv-servo-control/)

## F4 초기화

> <font color="blue"><strong>초기화설정 기능</strong></font><br/>
> 초기화 해제 상태에서 모터구동을 통해 상하단 구속위치 및 윈도우 이동거리(Full-Stroke)를 자동으로 설정하고, 초기화 상태로 동작모드를 변경하는 기능

#### 구현조건

##### 가정

1. 편의를 위해 Dn(=Down)을 Opening방향, Up을 Closing방향으로 정의한다.
2. 초기화해제상태에서 초기화 동작 중 장애물을 감지되지 않아야 한다.
3. 상/하단 구속을 통한 초기화가 설정되지 않으면 시스템은 초기화해제상태(UninitState)에 있게 되고, 초기화 

#### 기능구현

##### 스위치 입력

초기화 상태에 따라 Auto 스위치입력 Masking을 통해 Auto 동작 활성화/비활성화를 결정한다.

* 초기화해제 상태
  * M-Up/M-Dn 스위치만 입력받아 M-Up/M-Dn 동작만 가능하고, 
  * Anti-Pinch 기능이 비활성화 된다.
* 초기화 상태
  * A-Up/A-Dn 스위치까지 입력을 받아 A-Up/A-Dn 동작도 가능하고,
  * A-Up 동작 시 Anti-Pinch 기능이 활성화 된다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f4_init_1_SetAutoByInit.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;초기화 상태에 따른 Auto 설정&gt;</em>
</p>

##### 위치값리셋

Simulink 상에서 시뮬레이션을 통해 초기화기능을 구현할 때 원점설정 시 Plant의 현재위치가 0으로 Reset되어야 하는데,`Transfer Fcn` block은 초기화 기능이 없기 때문에 초기화기능이 있는 `Integrator` block만을 사용하여 전달함수를 풀어서 표현해야 한다.

1. `Transfer Fcn block`을 이용하여 표현된 모터 전달함수를 
2. `Integrator block`만을 이용하여 Decomposition 된 전달함수를 다음과 같이 표현한다.
3. 여기에 `Integrator block`의 Reset기능을 이용하여 Plant 초기화 기능을 추가한다.
4. 각각의 블록으로 표현된 전달함수 출력을 비교하면 동일한 입력에 대하여 동일한 결과가 출력됨을 확인할 수 있다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f4_init_2_reset_tf.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f4_init_2_reset_tf.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;Decomposition of Transfer Function&gt;</em>
	</a>
</p>

MCU 상에서는 레지스터 설정을 통해 초기화기능을 구현할 때 초기화를 위해 특정 조건을 만족하면 원점위치를 재설정해야 한다. 현재 Quadrature를 통해 위치를 카운트 하므로 Quadrature 카운터 레지스터 설정을 통해 Counter Value를 리셋해야 한다.

```c
// ftm_common.c
status_t FTM_DRV_Init(uint32_t instance,
                      const ftm_user_config_t * info,
                      ftm_state_t * state)
{
  FTM_DRV_SetSync(instance, &(info->syncMethod));
}

// main.c
void Init_FTM2_QuadratureDecoder(void)
{
  // flexTimer_qd2_InitConfig
  //  ->syncMethod == true(Software trigger state)
  FTM_DRV_Init(INST_FLEXTIMER_QD2,
               &flexTimer_qd2_InitConfig,
			   &stateQuad);
}

int main(void)
{
    :
  Init_FTM2_QuadratureDecoder();
    :
  while(1)
  {
      :
	// Read Encoder Pulse Count
	quadra_state = FTM_DRV_QuadGetState(INST_FLEXTIMER_QD2);
	gi_encPos = (int16_t)quadra_state.counter;
	// Read Count Value
    if(gb_tmpFlag)		          // flag set by breakpoint
	{
	  FTM_DRV_CounterReset(       // 카운터값 리셋
	    INST_FLEXTIMER_QD2,true);
	  gb_tmpFlag = false;
	}
	  :
  }
}
```

##### 구속판단

초기화해제 상태에서는 장애물에 의한 구속이 발생되지 않아야 하며, AutoSet을 통한 Full-Stroke 계산 시 차량마다 편차가 있으나 평균적으로 최소 2700 pulse(T.B.D)이상의 Full-Stroke 값이 측정되어야 초기화상태로 천이한다.
* 초기화 해제 시 구속판단
  * 초기화해제 상태에서 PWM출력 시 200ms±10ms동안 Quadrature Decoder Count Value값에 변화가 없으면 구속으로 판단한다.
  * PWM출력 duty가 작을 경우 PWM출력 시 Hall Pulse가 발생하지 않으므로 PWM출력은 모터 구동이 가능한 최소한의 duty여야 하며, 파라미터를 통해 튜닝할 수 있어야 한다.
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f4_init_3_StuckDetect.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f4_init_3_StuckDetect.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;구속판단&gt;</em>
	</a>
</p>
* 초기화 시 구속판단
  * I/IV 영역에서 윈도우가 Up or Dn 동작 중(Quadrature Decoder Count Value값에 변화) 200ms±10ms동안 Quadrature Decoder Count Value값에 변화가 없으면 구속으로 판단한다.

:::important 구속판단시첨 (21.10.20 현재 미구현 상태)
모터 초기 시동구간에서  부하마찰 등의 요인으로 출력이 나가는데 모터가 움직이지 않는 상황이 발생하게 된다. 따라서 1 or -1 출력 후 일정시간이 지난 다음부터 구속판단을 수행해야 한다.
:::

##### 초기화 로직

초기화해제상태에서 `CW구속->CCW구속->CW구속` 연속동작이 수행되는 경우에만 초기화를 수행하며, `CW구속->CCW구속->CW구속 전 정지`와 같이 동작 중 정지가 발생하면 다시 처음부터 `CW구속->CCW구속->CW구속` 연속동작을 수행해야 초기화가 가능하다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f4_init_4_InitLogic.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f4_init_4_InitLogic.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;초기화 로직&gt;</em>
	</a>
</p>

:::note 초기화 설정방법
* 구속지점까지 이동한 상태에서 CW/CCW 1회 이동을 통해 Full-Stroke 및 Direction을 자동으로 설정한다.
* 초기화해제상태에서는 CW/CCW로 방향을 정의하고, 초기화상태에서는 Up/Dn으로 방향을 정의한다.
:::

초기화를 위해 필요한 설정값을 다음과 같이 Flag로 설정하고, 초기화동작을 통해 설정값이 설정되면 플래그를 셋하고, 모든 플래그가 셋이되면 초기화상태로 천이한다.

```c
struct FLAG_INIT_BIT
{
	uint8_t bCWendpos  : 1;  // CW Full-Stroke 설정 플래그
	uint8_t bCWdist    : 1;  // CW 방향판단 정보설정 플래그
	uint8_t bCCWendpos : 1;  // CCW Full-Stroke 설정 플래그
	uint8_t bCCWdist   : 1;  // CCW 방향판단 정보설정 플래그
	uint8_t binitState : 1;  // 초기화/초개화해제 상태
};

union FLAG_INIT
{
	uint8 all;
	struct FLAG_INIT_BIT bit;
};

typedef struct
{
	/*
	 * 이동거리 판단
	 *  - |CWendpos-CCWendpos| > 3000(TBD) -> Full Stroke 설정
	 */
	union FLAG_INIT flag;
	uint32_t iCWendpos;    // CW구동 중 Stuck 발생 시 엔코더 위치
	uint32_t iCWdist;      // 100ms동안 CW로 pwm duty 30% 출력 시 이동거리
	uint32_t iCCWendpos;   // CCW구동 중 Stuck 발생 시 엔코더 위치
	uint32_t iCCWdist;     // 100ms동안 CCW로 pwm duty 30% 출력 시 이동거리
} flag_init_t;
flag_init_t windowinit;

logic()
{
  if(windowinit.flag.all = 0x0F)
  {
    // 초기화완료
	windowinit.flag.bit.binitState = 1;
  }
}
```

* CW구속지점까지 이동
  * a. M-Dn 스위치 입력 시 30% duty 출력으로 CW구동 시작
  * b. CW구속 감지 후 정지
  * c. 위치값 0으로 리셋
* CCW구속지점까지 이동
  * a. M-Up 스위치 입력 시 30% duty 출력으로 CCW구동 시작
  * b. CCW구속 감지 후 정지
  * c. CW구속->CCW구속 시간/거리 저장
    * `CCW이동시간` 저장
    * `CCW이동거리` 저장
* CW구속지점까지 이동
  * a. 정의된 출력(eg. 30% duty)으로 CW구동 시작
  * b. CW구속 감지 후 정지
  * c. CCW구속->CW구속 시간/거리 저장
    * `CW이동시간` 저장
    * `CW이동거리` 저장

동일출력(TBD) 시 윈도우 부하때문에 Closing_Up 이동시간보다 Opening_Down 이동시간이 짧은 사실을 이용하여 방향을 판단한다.
* Opening_Down / Closing_Up 판단
  * `CW이동시간` > `CCW이동시간` : CW=Opening, CCW=Closing
  * `CW이동시간` < `CCW이동시간` : CCW=Opening, CW=Closing

:::important Window 이동시간
* 동일출력 시 윈도우 부하로 인해 CW/CCW이동시간 차이가 발생하는 사실을 이용하므로 초기화 동작동안에는 CW/CCW 모두 동일한 PWM duty로 모터를 구동해야 한다.
* 플랜트를 모터단품으로 모델링한 경우 윈도우 부하가 없어 CW/CCW 구동시간이 동일하므로 Up/Dn이동시간 차이를 통한 방향판단이 불가능 하다.  
* 따라서 시뮬레이션을 통한 방향판단로직 검증을 위해서는 윈도우로 플랜트를 모델링해야 한다.
:::

Full-Stroke 및 방향 설정이 완료되는 경우에만 초기화상태로 천이한다.
* 초기화 완료 조건
  * Full-Stroke 및 Opening/Closing 설정 -> 초기화상태로 천이
  * Full-Stroke 및 Opening/Closing 미설정 -> 초기화동작 재수행
* 초기화 실패 조건
  * 초기화해제 상태에서 구속 발생 전 CW/CCW 구동은 무한반복 가능하며, 상단 or 하단구속 시점부터 연속동작이 진행되지 않으면 초기화실패로 판단한다.
  * 초기화해제상태에서 초기화동작 연속 3회 실패 시 시스템은 halt 되며, Power Off->On을 통해 초기화 동작을 재시작 할 수 있다.

:::note Full-Stroke 판단기능 삭제
CW이동중엔 장애물이 없다가 CCW이동중 장애물이 감지되는 경우로 보통 장애물감지는 처음 시작부터 감지되는 것으로 봐야하므로 Full-Stroke 판단기능 삭제  
~~장애물 감지 시 감지위치가 정중앙에서 감지되지 않는 이상 CW/CCW 이동거리가 다를 수 밖에 없고, 장애물이 감지되지 않을 경우 CW/CCW 이동거리가 같게 된다.~~
* ~~Full-Stroke 판단~~
  * ~~`CW이동거리`==`CCW이동거리` : Full-Stroke 설정  
  -> 오차범위 내에서 이동거리가 같을 경우 Full-Stroke = (CW이동거리`+`CCW이동거리)/2~~
  * ~~`CW이동거리`!=`CCW이동거리` : Full-Stroke 미설정  
  -> 장애물 감지로 Full-Stroke까지 이동하지 못한 것으로 판단~~
:::

#### 시뮬레이션

##### 초기화 동작확인

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f4_init_5_InitSequence.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f4_init_5_InitSequence.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;초기화 시퀀스&gt;</em>
	</a>
</p>

## F5 Soft-Stop

> <font color="blue"><strong>Soft-Stop 기능</strong></font><br/>
> 소음을 저감하고, 충격으로 인한 모터/기구부 파손을 방지하기 위해 구속 전 위치에서 모터를 정지시키는 기능


#### 기능구현

##### 구속정지

모터출력 시 300ms([저속 구동 시 max 260ms의 펄스가 발생함](./))동안 엔코더펄스 변화가 없는 경우 구속으로 판단한다.

* 초기화해제상태 구속정지  
초기화해제상태에서 구속이 발생하면 모터를 즉시 정지하고, 상/하단 구속위치를 설정한다.
* 초기화상태 구속정지  
Soft-Stop 오차누적으로 구속이 발생하면 모터를 즉시 정지하고, 상/하단 및 Soft-Stop 위치를 재설정 한다.

#### 시뮬레이션

T.B.D

## F6 반전

> <font color="blue"><strong>반전 기능</strong></font><br/>
> 윈도우 Auto-Up 동작 중 <u>장애물(물체끼임)을 감지하면 윈도우 Down 동작을 수행(반전동작)</u>하여 윈도우 끼임으로부터 신체를 보호하는 기능

:::important
* Down(Auto/Manual) 동작 중에는 반전동작을 수행하지 않는다.
* Manual-Up 동작은 사용자 의도에 의한 Up 동작으로 간주하고 반전동작을 수행하지 않는다.
:::


#### 구현조건

#### 알고리즘 개발전략

* `Full AutoCode` 방법을 통해 Anti-Pinch 알고리즘을 개발하고, `Hybrid AutoCode` 방법으로 타겟에 통합한다.

##### 기존 반전판단 기준

* 100N 미만 반전력이 측정되어야 하고, ±3N안으로 튜닝이 가능해야 함.
* 반전판단방법 : rpm 변화량이 기준치(가변가능) 이상을 넘은 횟수(가변가능)가 정해진 횟수를 넘어가면 반전
* rpm을 32개 저장하여 평균 rpm을 구하고 평균 rpm과 비교하는 로직이 있음
* Short Pinch(기동이 얼마 안되었을 대) 반전로직 있음
* Max Pinch(180N) 반전로직 있음 (많이 아픔)
* 꾹 눌렀을 때는 반전해야 하고, 임펄스로 눌렀을 때에는 반전하면 안됨
* 전압변동도 고려해야 함.

#### 반전기능구현



#### 오반전 요인 제거

:::note [Html Link]
<a href="/assets/kalman/fir_filtering.html" target="_blank">1. FIR Lowpass filter를 통한 속도측정</a><br/>
<a href="/assets/mbd/sbcmDS_f6_AntiPinch.html" target="_blank">2. 부하학습을 통한 오반전 요인 제거</a><br/>
:::

* 속도정보를 바탕으로 반전을 판단하기 때문에 속도측정값이 튀는 경우 반전 오인식으로 이어질 수 있으므로 디지털 필터를 적용하여 노이즈로 인해 튀는 값(속도)은 제거되어야 한다.
* Window 프레임 형상으로 인해 동일한 위치에서 반전이 발생하므로 형상으로 발생되는 부하를 제거한 상태에서 반전판단을 수행한다.


#### 시뮬레이션

Anti-Pinch 반전은 실부하가 있는 상태에서 확인이 수월하므로 실부하 상태에서 기능시험으로 대체함.

## F7 칼만필터

> <font color="blue"><strong>Kalman-Filtering 기능</strong></font><br/>
> 엔코더를 통해 측정한 위치/속도에 대한 필터링을 수행하고 이용하여 전류를 추정한다.

:::important
* 모터과열방지 기능이 없는 상태에서 모터연속동작 시 과열에 의해 아마추어 내부 플라스틱이 녹아 정상적으로 모터가 구동되지 않는 현상 발생함(21.10.13)
* 모터 발생열은 모터에 흐르는 전류에 비례하므로 엔코더 펄스를 이용하여 모터에 흐르는 전류를 추정하고, 이를 이용하여 모터발생열을 추정하여 모터과열로 인한 모터파손을 방지해야 한다. (`모터시스템에 필히 구현되어야 하는 기능`임)
* Kalman-Filtering을 이용하여 모터에 흐르는 전류를 추정한다.
:::


#### 기본개념

칼만필터를 통한 모터제어(LQG)는 matrix 형태의 상태방정식으로 표현되기 때문에 matrix 연산을 위한 선형대수학에 대한 이해가 선행되어야 한다.

:::note [Html Link]
0. <a href="/assets/kalman/Maxon_Motor_.html" target="_blank">모터 전달함수</a>
1. <a href="/assets/kalman/Maxon_Motor_1_ObserverStateFB_.html" target="_blank">State Feedback Control by full state observer(관측기를 통한 전상태모니터링)</a>
2. <a href="/assets/kalman/Maxon_Motor_2_RobustStateFB_.html" target="_blank">Robust Control by Integral Action(외란 오차제거) and Anti-Windup(Saturation Limit을 통한 적분기 출력제한)</a>
3. <a href="/assets/kalman/Maxon_Motor_3_Kalman_.html" target="_blank">Kalman Filter</a>
4. <a href="/assets/kalman/Maxon_Motor_4_Stochastic_.html" target="_blank">Stochastic Estimation Control by LQG</a>
5. <a href="/assets/kalman/Q_filter.html" target="_blank">Q-Filter</a>
:::

#### 구현전략

`Full AutoCode` 방법을 통해 칼만필터 알고리즘을 개발하고, `Hybrid AutoCode` 방법으로 타겟에 통합한다.

1. 시뮬레이션  
시뮬레이션을 통하 칼만필터 원리를 파악한다.
2. 예제구현  
쉽게 접근할 수 있는 MPU6050 센서와 F28069를 통해 Full AutoCode-External Mode 방식으로 칼만필터 구현이 가능성한지 실제로 확인한다.
3. 기능구현  
최종 목적에 맞게 타겟에서 동작이 가능한 칼만필터 전류추정 알고리즘을 개발한다.
4. 동작확인
타겟(s32k144)동작 확인을 통해 검증한다.

#### 시뮬레이션

:::note [Html Link]
0. <a href="/assets/kalman/Maxon_Motor_.html" target="_blank">칼만필터 시뮬레이션</a>
:::

#### 예제구현

##### [사양 및 인터페이스](http://www.jkelec.co.kr/img/sensors/manual/mpu6050_gy521/mpu6050_ds.pdf)

* 3~5V 전원공급 (GY-521에 LDO가 있는데, 3.3V로도 동작 가능하고, MPU6050는 3.3V에서도 동작함)
* [빨강색 모듈에는 3.3V 공급핀이 있고, 파랑색 모듈은 없는데, 파랑색 모듈에서 3.3V를 공급해서 동작시키는 내용이 있음](https://chocoball.tistory.com/entry/Hardware-Gyroscope-GY521-MPU6050)

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_mil_f7_mpu6050_interface.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_mil_f7_mpu6050_interface.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;MPU6050 인터페이스&gt;</em>
	</a>
</p>

##### 시뮬링크 I2C 통신

* 파라미터 설정 : controlstick_I2C_MPU6050.m
* I2C 통신 시뮬링크 모델 : controlstick_I2C_MPU6050.slx

<p align="center">
	<iframe 
		width="350" height="250"
		src="https://www.youtube.com/embed//lSM-kUjmdFw?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
	<br/><em>&lt;MPU6050와 TI ControlStick의 Simulink 연동&gt;</em>
</p>

##### MPU6050 칼만필터링

#### 전류추정 기능구현

##### 전상태 모니터링

관측기를 통한 전상태 모니터링

##### 위치로 속도 추정

#### 동작확인

T.B.D

#### 참고자료

* DC motor fault detection by output comparision of a Real system and Kalman Filter.pdf
* [MPU6050 칼만필터 구현예제0](https://sharehobby.tistory.com/entry/%EC%B9%BC%EB%A7%8C-%ED%95%84%ED%84%B0Kalman-filter1?category=990451)
* [MPU6050 칼만필터 구현예제1](https://sharehobby.tistory.com/entry/%EC%B9%BC%EB%A7%8C-%ED%95%84%ED%84%B0Kalman-filter%EC%9D%98-%EC%BD%94%EB%94%A9-%EC%98%88%EC%A0%9C?category=990451)
* [MPU6050 칼만필터 구현예제2](https://sharehobby.tistory.com/entry/MPU6050%EC%9D%98-%EC%B9%BC%EB%A7%8C-%ED%95%84%ED%84%B0Kalman-filter%EC%9D%98-%EA%B5%AC%ED%98%84-%EC%98%88%EC%A0%9C2?category=990451)
* [MPU6050 칼만필터 구현예제3](https://sharehobby.tistory.com/entry/XFile-35?category=990451)
* [MPU6050 칼만필터 구현예제4](https://sharehobby.tistory.com/entry/XFile-36?category=990451)


