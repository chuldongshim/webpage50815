---
id: wiper_devenv
title: 개발환경구축
---

---

* 타겟보드(s32k144, tms320f28069)를 이용한 제어기 RCP(Rapid Control Prototyping) 구현 및 동작확인
  * Matlab Stateflow를 이용한 제어 로직 프로그래밍
  * Hardware dependent device driver interface를 통한 peripheral control(Timer/Interrupt, ADC, Port IO 등)
* Matlab/Simulink를 통한 제어기 시뮬레이션 확인 및 모델 코드 자동생성(AutoCode Generation)
* 장애물 감지 시 반전 알고리즘/로직 시뮬레이션

## MCU - S32K144

###  주요특징
[S32K1_Overview_Presentation pdf 참고](https://www.nxp.com/docs/en/supporting-information/S32K1_Overview_Presentation.pdf)

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_s32k14x_1_mcu_brief.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;MCU Spec(Brief)&gt;</em>
</p>

* High performance
  * ARM Cortex M4F up to 112MHz w FPU
  * eDMA from 57xxx family
* Memory
  * <u>Up to 2 MB program flash memory with ECC</u>
  * 64 KB FlexNVM for data flash memory with ECC and EEPROM emulation
  * Up to 256 KB SRAM with ECC
  * Up to 4 KB of FlexRAM for use as SRAM or EEPROM emulation
  * Up to 4 KB Code cache
* Software Friendly Architecture
  * High RAM to Flash ratio
  * Independent CPU and peripheral clocking
  * 48MHz 1% IRC – no PLL init required in LP
  * Registers maintained in all modes
  * Programmable triggers for ADC no SW delay counters or extra interrupts
* Functional safety
  * ISO26262 support for ASIL B or higher
  * Memory Protection Unit, ECC on Flash/Dataflash and RAM
  * Independent internal OSC for Watchdog
  * Diversity between ADC and ACMP, SPI/SCI and FlexIO
  * Core self test libraries
  * Scalable LVD protection, CRC
* Low power
  * Low leakage technology
  * Multiple VLP modes and IRC combos
  * Wake-up on analog thresholds
* Security
  * CSEc (SHE-spec)

### EVB Board

[Pinmap]

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_s32k14x_2_evb_pinout.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;S32K144EVB-Q100 pinout&gt;</em>
</p>

[Interface]

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_s32k14x_3_evb_interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;s32k144 evb interface&gt;</em>
</p>

[NXP Community 참고자료]

[S32K-Tutorials 참고](https://community.nxp.com/t5/NXP-Model-Based-Design-Tools/S32K-Tutorials/m-p/719950)

* LOW POWER MODES
  * [S32K1xx - Low Power Modes Introduction](https://community.nxp.com/thread/462168)
  * [How to put S32K MCU into sleep (low power mode)?](https://community.nxp.com/thread/454028)
  * [Video Link : 7966](https://community.nxp.com/videos/7966)
* COMMUNICATIONS
  * [How to Build and Configure a CAN with S32K to Emulate Automotive Body Control Infrastructure](https://community.nxp.com/thread/465130)
  * [FlexIO - Flex your muscles with the latest MBDToolbox release](https://community.nxp.com/thread/462157)
  * [Video Link : 7851](https://community.nxp.com/videos/7851)
* MOTOR CONTROL
  * [3-Phase PMSM Control Workshop with NXP's Model-Based Design Toolbox](https://community.nxp.com/thread/464336)
  * [How to Spin a Motor with NPX's MOTORGD, S32K and MPC5744P](https://community.nxp.com/thread/460314)
  * [Motor Control and Communication Demo](https://community.nxp.com/docs/DOC-334351)
  * [How to Squeeze Every Last Drop of Performance Out of SIMULINK Models with AMMCLIB](https://community.nxp.com/thread/472243)
* SCHEDULING
  * [Multitasking on S32K144 MBDT Simulink](https://community.nxp.com/thread/488575)

## RCP 동작확인

s32k144 toolbox에서 제공하는 예제를 통해 s32k144 mcu peripherals 동작을 확인한다.

* 로직제어 시 : SysTick, Timer, ExtInt, GPIO
* 모터제어 시 : PWM, ADC, Quadrature Decoder
* 통신제어 시 : UART(Rx Interrupt), FreeMASTER, SPI

### Simulink 기초

<a href="/assets/mbd/Simulink_user_manual.html" target="_blank">시뮬링크 기초 사용법</a><br/><br/>

Simulink Data Type

시뮬링크는 타입 재선언을 통해 모든 타겟ㅇ
시뮬링크를 통해 생성되는 코드는 모든 타겟에서 동작될 수 있도록 데이터 타입을 재선언하여 사용한다.  
즉, int형으로 int32_t를 사용하는 타겟의 경우 `typedef int32_t int32_T`와 같이 타입을 재선언한다.

```
/*=======================================================================*
 * Fixed width word size data types:                                     *
 *   int8_T, int16_T, int32_T     - signed 8, 16, or 32 bit integers     *
 *   uint8_T, uint16_T, uint32_T  - unsigned 8, 16, or 32 bit integers   *
 *   real32_T, real64_T           - 32 and 64 bit floating point numbers *
 *=======================================================================*/
typedef signed char int8_T;
typedef unsigned char uint8_T;
typedef short int16_T;
typedef unsigned short uint16_T;
typedef int int32_T;
typedef unsigned int uint32_T;
typedef float real32_T;
typedef double real64_T;
```

시뮬링크에서 소수점 표현을 single/double로 표현한다.

```
float – 32bit (4 byte), 단정도(single precision)
double – 64bit (8 byte), 배정도(double precision)
uint32 – 32bit (4 byte), integer
```

### GPIO-ADC-PWM-QD

하드웨어 인터페이스

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_simulink_1_basic_ex_interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;s32k144 evb interface&gt;</em>
</p>

C:\Users\User\Documents\MATLAB\Add-Ons\Toolboxes\NXP_MBDToolbox_S32K1xx\S32_Examples\s32k14x\gpio\gpio_isr_control_s32k144.slx

시뮬링크 모델을 통해 GPIO, ADC, PWM, QD(Quadrature Decoder) 동작을 확인한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_simulink_1_basic_ex.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;nxp_s32k144_gpio_pwm_adc_qd.slx&gt;</em>
</p>

### Timer-PWM-IC

하드웨어 인터페이스

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_simulink_2_basic_ex_interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;s32k144 evb interface&gt;</em>
</p>

시뮬링크 모델을 통해 Timer, PWM, IC(Input Capture) 동작을 확인한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_simulink_2_basic_ex.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;nxp_s32k144_gpio_pwm_ic.slx&gt;</em>
</p>

:::important
FTM0_PWM, FTM1_IC 모두 System Clock(80MHz)를 사용하는데, FTM0_PWM(펄스발생) 1 Count Time이 FTM1_IC(펄스측정) 1 Count time보다 길어야 IC를 통해 PWM Period를 측정할 수 있다.
따라서 PWM Prescaler >= IC Prescaler로 설정되어야 한다.
예제에서는 PWM/IC 모두 동일하게 128 분주하므로 PWM Tick값(Period Value)과 IC로 측정한 Tick값(Period)이 동일해야 한다.
:::

### GPIO-ADC-PWM-QD-IC

하드웨어 인터페이스

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_simulink_3_basic_ex_interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;s32k144 evb interface&gt;</em>
</p>

시뮬링크 모델을 통해 GPIO, ADC, PWM, QD(Quadrature Decoder), IC(Input Capture) 동작을 확인한다.
* 가변저항으로 PWM Duty 설정
* SW2(dn), SW3(up) 입력 시 PWM/Dir 출력
* QD를 통해 Hall펄스 카운트
* IC를 통해 Hall펄스 Duty 측정을 통한 속도계산

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_simulink_3_basic_ex.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;nxp_s32k144_gpio_pwm_adc_qd_ic.slx&gt;</em>
</p>

### Single모터 구동

동작확인(21.11.11 완료)

* ENA, EHB는 각각 Half-Bridge_A와 Half-Bridge_B를 Enable 시키는 신호이므로 5V를 인가하여 항상 Enable 시켜 놓는다.
* PWM을 인가한 상태에서 INA와 INB를 반전하여 출력하면 DC모터 정/역 회전이 가능하며, CS핀을 통해 전류에 비례하는 전압을 측정하거나 ADC변환하여 전류를 확인할 수 있다.
* Pin_6(Current Sense Disable, Active High)을 Low or Open상태로 만들면 External Register를 Pin_8(Current Sense)에 연결하여 전류에 비례하는 전압을 ADC 할 수 있다.(Shield에 1K저항 Pull-Down되어 있고, LPF도 달려 있어서 바로 ADC 가능함.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_fw_driver_single_vnh5019_interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;VNH5019 인터페이스&gt;</em>
</p>

동작확인 시 사용한 시뮬링크 모델 : nxp_s32k144_gpio_pwm_ic_single_VNH5019.slx

### Dual모터 구동

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_fw_driver_dual_vnh5019_m1_Interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;VNH5019 Motor1 인터페이스&gt;</em>
</p>

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_hw_nxp_fw_driver_dual_vnh5019_m2_Interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;VNH5019 Motor2 인터페이스&gt;</em>
</p>

동작확인 시 사용한 시뮬링크 모델 : nxp_s32k144_gpio_pwm_ic_dual_VNH5019.slx

## 참고자료

### S32K1x datasheet

* [S32 SDK software architecture](https://www.programmersought.com/article/36523455668/)
* [S32K1xx Bootloader ](https://www.nxp.com/docs/en/application-note/AN12218.pdf)
* [S32K1xx Firmware updates](https://www.nxp.com/docs/en/application-note/AN12323.pdf)

### 시뮬링크 예제

[로직제어]

* SysTick
* Timer
  * ftm_sw_control_s32k14x.mdl
  * lpit_s32k14x.mdl
  * lptmr_time_counter_s32k14x.mdl
  * lptmr_pulse_counter_s32k14x.mdl
* ExtInt
* GPIO
  * sl_gpio_isr_control_s32k144.mdl
  * sl_gpio_s32k144.slx

[모터제어]

* PWM
  * sl_ftm_complementary_pwm_s32k14x.slx
  * ftm_independent_pwm_s32k14x.mdl
* ADC
  * adc_isr_s32k14x.mdl
  * adc_software_trigger_s32k14x.mdl
* Quadrature Decoder
  * sl_ftm_hall_sensor_s32k14x.mdl
  * sl_ftm_qd_s32k14x.mdl
* Input Capture
  * sl_ftm_input_capture_s32k14x.mdl

[통신]

* UART
  * lpuart_hello_world_s32k14x.mdl
  * lpuart_s32k14x.mdl
* UART Rx Interrupt
* FreeMASTER
* SPI
  * lpspi_master_slave_s32k14x.mdl
  * lpspi_master_s32k144W.mdl
  * lpspi_slave_s32k144.mdl
