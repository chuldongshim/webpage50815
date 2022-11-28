---
id: window_realize_f0_VelMeasure
title: 속도측정
---
---

> Plant를 모델링을 위해 실제 시스템 입력(전압)에 따른 출력(각속도) 정보를 이용하여 System Identification을 수행하기 위해서는 속도를 측정할 수 있어야 한다.

:::note
* 복잡도를 낮추기 위해 모터 단품을 통해 Basic Logic 및 기본기능을 구현하고, 시뮬레이션을 통한 검증의 완료되면,
* 이후 Plant를 통해 시스템 의존적인(ex. anti-pinch) 기능을 구현하고 시뮬레이션을 통해 기능 검증을 수행한다.
:::

## DC모터 위치/속도 측정 방법

모터 전달함수를 구하기 위해서는 입력(모터 인가 전압)에 따른 출력(모터각속도)데이터를 이용하여 System Identification을 수행해야 한다.  
이를 위해 입력전압에 따른 출력속도 raw data를 측정할 수 있어야 한다.

HW-Simulink에서 구현한 시뮬링크 모델([GPIO-ADC-PWM-QD-IC](/.)를 통해 위치 및 속도를 측정한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_simulink_3_basic_ex.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;nxp_s32k144_gpio_pwm_adc_qd_ic.slx&gt;</em>
</p>

* SW2(dn) 입력 시 → +1 출력, +Rpm 측정, 펄스카운트 증가
* SW2(up) 입력 시 → -1 출력, -Rpm 측정, 펄스카운트 감소

### Position by QD

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

### Velocity by Pulse Period

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

## Period 측정을 통한 속도계산

### Manual Coding 방법 - Ext_Int로 1펄스 시간을 측정해 속도계산

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
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_0_vel_process.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;속도 정확도 향상처리 방법&gt;</em>
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

### Input_Capture로 1펄스 시간을 측정해 속도 계산 - Simulink AutoCode 방법 적용

* Simulink S32K144 Capture Input Block을 통해 생성된 코드를 실행하여 펄스 Period를 측정할 경우 계산된 속도값이 가끔 튀는 현상이 발생한다.
  * 측정속도가 튀니까 이를 제어하려고 모터가 꿀렁임, 시뮬링크 자동생성 코드 효율이 좋치 않아서 튀는게 아닌지 의심스러움(21.11.17)
  * Input Capture를 통해 속도를 측정할 때 형변환을 수행하는데, 불필요한 형변환을 제거하니까 다시 잘됨(21.11.19)
* Manual Coding으로 ExtInt로 펄스 Period를 측정할 경우 튀는 현상없이 잘됨.
  * Simulink S32k144 ExtInt를 구현해서 ExtInt를 통해 속도를 측정해 보고 그래도 속도가 가끔 튀는 현상이 지속되면 기존에 구현해 놓은 Manual Coding으로 ExtInt를 구현한 방법 사용할 것(21.11.17)
  * 구현상 문제를 해결하니까 잘 되므로 그냥 Simulink AutoCode 방법을 사용하기로 함(21.11.19)

## 측정값 필터링

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

### 하드웨어필터(Input Capture filter) 설계

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
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_1_IC_hw_filter.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Input Capture HW 필터 설정&gt;</em>
</p>

### 디지털필터(LPF) 설계

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
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_2_LPFnButterworth.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;1차 (좌) LPF fc=1Hz, Ts=0.001s vs (우) Butterworth fc=6Hz&gt;</em>
</p>

### 디지털필터(FIR) 설계

:::note [Html Link]
<a href="/assets/kalman/fir_filtering.html" target="_blank">1. FIR Lowpass filter를 통한 속도측정</a><br/>
:::

* LPF로 필터링 잘 안될 경우 CMSIS DSP Library FIR Low Pass Filter example.mp4 - CMSIS에서 제공하는 필터 라이브러리 이용하는 방법 고려해 볼 것  
  * [FIR Lowpass Filter Example](https://www.keil.com/pack/doc/CMSIS/DSP/html/group__FIRLPF.html)
  * [예제소스 arm_fir_example_f32.c](https://www.keil.com/pack/doc/CMSIS/DSP/html/arm_fir_example_f32_8c-example.html)
* nxp에서 제공 AMMCLIM f라이브러리를 이용하는 방법 고려해 볼 것
  * s32k14x시뮬링크 예제 - ../S32K14x_AMMCLIB_v1.1.18/../GDFLIB_FilterFIR_BAM_F32.mdl

### 디지털필터 타겟보드 동작확인

시뮬링크 모델 [nxp_s32k144_gpio_pwm_adc_qd_ic.slx](#dc모터-위치속도-측정)을 코드자동생성/빌드/다운로드 하여 실행하면, FreeMASTER를 통해 다음과 같은 필터링 결과를 확인할 수가 있다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f0_modeling_3_LPF_targetExecution.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;LPF를 통한 저속구간 속도 필터링 필요성&gt;</em>
</p>

## Pulse Count를 통한 속도계산

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
		width="450"
		alt="Example banner"
	/><br/><em>&lt;PWM출력 vs 속도측정(1펄스시간/주기동안펄스카운트)&gt;</em>
</p>

<font color="#34a28a">따라서 펄스카운트 개수를 통한 속도계산은 엔코더 분해능이 높거나 고속에서 속도측정 시 사용되어야 한다.</font><br /><br />

:::note 
1ms로 피드백제어를 수행할 때 100ms 속도가 업데이트 되는 경우 제어가 불가능함
:::


