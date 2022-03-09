---
id: wiper
title: 와이퍼
---

<div align="right">
  <font size="4">
    21.04.01 ~ 21.06.30
  </font>
</div>

---

## 개요

본 문서는 Model Based Design(이하 mbd라 함)을 적용하여 모터제어 시스템을 개발하는데 필요한 모든 내용을 정의한 문서이다.

### 목표

* Model Based Design(이하 MBD라 함) 선행개발을 진행하여 모델(로직/알고리즘)로부터 자동생성된 코드를 실제 타겟에서 구동한다.
* Wiper 모터 구동을 통한 MBD 개발환경을 구축하는 것을 주 목적으로 하며, temperature PID 프로젝트를 통해 정의한 개발환경을 개선하여 최적의 MBD 개발환경을 구축한다.

### 프로젝트 관리

* 형상관리 : GitHub-Docusaurus를 통한 문서산출물 관리
* 소스관리 : GitLab Repository를 통한 소스 관리

### 진행절차

1. System Identification을 통한 Plant 모델링(DC모터 파라미터 정의)
2. DC모터 속도/위치제어 알고리즘 개발 및 시뮬레이션
3. 코드자동생성
4. 실제 구동결과와 시뮬레이션 결과 일치여부 비교검증

#### 프로세스(미적용)

MBD를 고려하지 않는 일반적인 개발은 시스템/HW/SW/시험 단계를 통해 다음과 같이 진행한다.
<details><summary>일반 개발 프로세스</summary>
	<details><summary>1.시스템</summary>
		<details><summary>1.1 시스템 설계</summary>
			<div>1.1.1 기능정의</div>
			<div>1.1.2 아키텍처 설계</div>
			<div>MBD 아키텍처 설계 단계에서 Function블록 내부 로직/알고리즘 개발 없이 시스템에 대한 전체 구조를 구상/구현한다.</div>
			<div>1.1.3 분석(FMEA/FTA/PMHF/LFM) 및 아키텍처 개정</div>
		</details>
		<details><summary>1.2 플랜트 모델링</summary>
			<div>1.2.1 위치/속도측정</div>
			<div>1.2.2 System Identification</div>
			<div>1.2.3 DC모터 속도/위치제어 알고리즘 개발 및 시뮬레이션</div>
		</details>
		<details><summary>1.3 PIL단계 기능로직 개발 및 시뮬레이션</summary>
			<div>1.3.1 HW/SW인터페이스 설계</div>
			<div>HSI 단계에서 실제 하드웨어 구성, 펌웨어 설명, Embedded Coder 설정 등을 정의한다.</div>
		</details>
	</details>
	<details><summary>2. 소프트웨어</summary>
		<div>2.1 기능 Sequence Diagram</div>
		<div>2.2 Class Diagram을 통한 SW아키텍처 설계 (Matlab2021a class diagram 지원)</div>
	</details>
	<details><summary>3. 하드웨어</summary>
		<div>3.1 Schematic</div>
		<div>3.2 펌웨어 동작확인</div>
	</details>
	<details><summary>4. 시험</summary>
		<div>4.1 선행단계에서는 시스템 레벨의 기능테스트만을 수행한다.</div>
	</details>
</details>

MBD개발은 다음과 같이 MIL/SIL/PIL/HIL 단계를 통해 진행한다.

<details><summary>MBD 개발 프로세스</summary>
	<div>
	<p align="center">
		<img
			src={require('/img/2_mbd/1_mil_sil_pil.png').default}
			alt="Example banner"
			width="350"
		/>
	</p>
	</div>
	<details><summary>1. MIL (Model In the Loop)</summary>
		<div>Plant 모델링을 완료하면 제어로직을 개발하고 시뮬레이션을 통해 동작 결과를 확인할 수 있다.</div>
	</details>
	<details><summary>2. SIL (Software In the Loop)</summary>
		<div>제어로직 개발이 완료되면 타겟보드에서 동작될 코드를 자동생성하고, 무결성을 검증한다.</div>
	</details>
	<details><summary>3. PIL (Processor In the Loop)</summary>
		<div>실제 제어대상이 준비되지 않은 경우 타겟보드에서 코드를 동작시켜 결과를 확인하고,</div>
	</details>
	<details><summary>4. HIL (Hardware In the Loop)</summary>
		<div>실제 제어대상이 준비된 경우 시스템 기능/비기능 테스트를 수행한다.</div>
	</details>
</details>

#### 선행개발(적용)

본 프로젝트는 선행개발로 MBD 목적에 맞게 시스템 단계에서 MIL/PIL만을 수행하여 개발을 진행한다.(SW개발은 코드자동생성으로 대체, HW개발은 RCP를 통해 대체)
* Design - `기능/비기능 요구사항 정의`, `아키텍처 설계`
* MIL - `플랜트 모델링`, `기능로직 구현 및 시뮬레이션`
* PIL - `기능로직 코드생성`, `MCU구동`, `타겟에 적용하여 기능시험 수행`

<p align="center">
	<img
		src={require('/img/2_mbd/2_pil_simulation_concept.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;선행개발 컨셉&gt;</em>
</p>

:::note
이와 같은 방법은 Plant 및 제어입력을 PC에서 가상으로 구축하기 때문에 모델링만 가능한 경우 어떠한 시스템이라도 시뮬레이션을 통해 제어로직을 검증할 수 있는 장점이 있다.
:::

### 진행결과 `(~21.07.26 완료)`

* Reference Velocity Profiling 생성 로직을 개발하고 Simulink를 통한 시뮬레이션 검증 후
* 개발한 로직 모델로부터 타겟용 C코드를 자동생성한 후 타겟 MCU를 통해 Wiper Motor모터의 속도 가/감속 제어를 수행하였다.
* 시뮬레이션과 실제 구동결과가 일치함을 확인하고, 개발시간을 획기적으로 단축할 수 있음을 확인하였다.

### 참고자료

* [ball on wheel by rapd control prototyping](https://technodocbox.com/Java/66141645-Rapid-control-prototyping-with-matlab-simulink-case-study-ball-on-wheel.html)
<p align="center">
	<img
		src={require('/img/2_mbd/3_ball_on_wheel_by_RCP.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;MBD 구현 예제&gt;</em>
</p>
* [ISO26262프로젝트에 Simulink를 활용하는 방법](https://kr.mathworks.com/company/newsletters/articles/how-to-use-simulink-for-iso-26262-projects.html)
* [Simulink를 사용하여 ISO26262 응용프로그램을 개발하는 11가지 모범사례](https://kr.mathworks.com/content/dam/mathworks/white-paper/gated/iso-26262-best-practices-white-paper.pdf)
* [MBD 개발 프로세스 by Mathworks](https://kr.mathworks.com/help/simulink/gs/model-based-design.html#mw_3e1d9df7-df1e-43bb-8b3b-fe7c22ed99d7)

## 개발환경구축

### 개발환경

* 타겟보드(s32k144, tms320f28069)를 이용한 제어기 RCP(Rapid Control Prototyping) 구현 및 동작확인
  * Matlab Stateflow를 이용한 제어 로직 프로그래밍
  * Hardware dependent device driver interface를 통한 peripheral control(Timer/Interrupt, ADC, Port IO 등)
* Matlab/Simulink를 통한 제어기 시뮬레이션 확인 및 모델 코드 자동생성(AutoCode Generation)
* 장애물 감지 시 반전 알고리즘/로직 시뮬레이션

### MCU 사양

#### S32K144_100LQFP 주요특징
[S32K1_Overview_Presentation pdf 참고](https://www.nxp.com/docs/en/supporting-information/S32K1_Overview_Presentation.pdf)

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_s32k14x_1_mcu_brief.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_s32k14x_1_mcu_brief.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;MCU Spec(Brief)&gt;</em>
	</a>
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

#### S32K144EVB-Q100 EVB Board

[Pinmap]

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_s32k14x_2_evb_pinout.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_s32k14x_2_evb_pinout.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;s32k144 evb pinout&gt;</em>
	</a>
</p>

[Interface]

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_s32k14x_3_evb_interface.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_s32k14x_3_evb_interface.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;s32k144 evb interface&gt;</em>
	</a>
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

### RCP 동작확인

s32k144 toolbox에서 제공하는 예제를 통해 s32k144 mcu peripherals 동작을 확인한다.

* 로직제어 시 : SysTick, Timer, ExtInt, GPIO
* 모터제어 시 : PWM, ADC, Quadrature Decoder
* 통신제어 시 : UART(Rx Interrupt), FreeMASTER, SPI

#### Data Type

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

#### GPIO-ADC-PWM-QD

하드웨어 인터페이스

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_simulink_1_basic_ex_interface.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_simulink_1_basic_ex_interface.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;s32k144 evb interface&gt;</em>
	</a>
</p>

C:\Users\User\Documents\MATLAB\Add-Ons\Toolboxes\NXP_MBDToolbox_S32K1xx\S32_Examples\s32k14x\gpio\gpio_isr_control_s32k144.slx

시뮬링크 모델을 통해 GPIO, ADC, PWM, QD(Quadrature Decoder) 동작을 확인한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_simulink_1_basic_ex.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_simulink_1_basic_ex.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;nxp_s32k144_gpio_pwm_adc_qd.slx&gt;</em>
	</a>
</p>

#### Timer-PWM-IC

하드웨어 인터페이스

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_simulink_2_basic_ex_interface.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_simulink_2_basic_ex_interface.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;s32k144 evb interface&gt;</em>
	</a>
</p>

시뮬링크 모델을 통해 Timer, PWM, IC(Input Capture) 동작을 확인한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_simulink_2_basic_ex.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_simulink_2_basic_ex.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;nxp_s32k144_gpio_pwm_ic.slx&gt;</em>
	</a>
</p>

:::important
FTM0_PWM, FTM1_IC 모두 System Clock(80MHz)를 사용하는데, FTM0_PWM(펄스발생) 1 Count Time이 FTM1_IC(펄스측정) 1 Count time보다 길어야 IC를 통해 PWM Period를 측정할 수 있다.
따라서 PWM Prescaler >= IC Prescaler로 설정되어야 한다.
예제에서는 PWM/IC 모두 동일하게 128 분주하므로 PWM Tick값(Period Value)과 IC로 측정한 Tick값(Period)이 동일해야 한다.
:::

#### GPIO-ADC-PWM-QD-IC

하드웨어 인터페이스

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_hw_nxp_simulink_3_basic_ex_interface.png').default}>
		<img
			src={require('/img/2_mbd/mbd_hw_nxp_simulink_3_basic_ex_interface.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;s32k144 evb interface&gt;</em>
	</a>
</p>

시뮬링크 모델을 통해 GPIO, ADC, PWM, QD(Quadrature Decoder), IC(Input Capture) 동작을 확인한다.
* 가변저항으로 PWM Duty 설정
* SW2(dn), SW3(up) 입력 시 PWM/Dir 출력
* QD를 통해 Hall펄스 카운트
* IC를 통해 Hall펄스 Duty 측정을 통한 속도계산

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

#### 시뮬링크 예제

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

### Single모터 구동

동작확인(21.11.11 완료)

* ENA, EHB는 각각 Half-Bridge_A와 Half-Bridge_B를 Enable 시키는 신호이므로 5V를 인가하여 항상 Enable 시켜 놓는다.
* PWM을 인가한 상태에서 INA와 INB를 반전하여 출력하면 DC모터 정/역 회전이 가능하며, CS핀을 통해 전류에 비례하는 전압을 측정하거나 ADC변환하여 전류를 확인할 수 있다.
* Pin_6(Current Sense Disable, Active High)을 Low or Open상태로 만들면 External Register를 Pin_8(Current Sense)에 연결하여 전류에 비례하는 전압을 ADC 할 수 있다.(Shield에 1K저항 Pull-Down되어 있고, LPF도 달려 있어서 바로 ADC 가능함.

<p align="center">
  <a target="_blank"
  href={require('/img/2_mbd/mbd_hw_nxp_fw_driver_single_vnh5019_interface.png').default}>
    <img
      src={require('/img/2_mbd/mbd_hw_nxp_fw_driver_single_vnh5019_interface.png').default}
      alt="Example banner"
      width="350"
    /><br/><em>&lt;VNH5019 인터페이스&gt;</em>
  </a>
</p>

동작확인 시 사용한 시뮬링크 모델 : nxp_s32k144_gpio_pwm_ic_single_VNH5019.slx

### Dual모터 구동

<p align="center">
  <a target="_blank"
  href={require('/img/2_mbd/mbd_hw_nxp_fw_driver_dual_vnh5019_m1_Interface.png').default}>
    <img
      src={require('/img/2_mbd/mbd_hw_nxp_fw_driver_dual_vnh5019_m1_Interface.png').default}
      alt="Example banner"
      width="350"
    /><br/><em>&lt;VNH5019 Motor1 인터페이스&gt;</em>
  </a>
</p>

<p align="center">
  <a target="_blank"
  href={require('/img/2_mbd/mbd_hw_nxp_fw_driver_dual_vnh5019_m2_Interface.png').default}>
    <img
      src={require('/img/2_mbd/mbd_hw_nxp_fw_driver_dual_vnh5019_m2_Interface.png').default}
      alt="Example banner"
      width="350"
    /><br/><em>&lt;VNH5019 Motor2 인터페이스&gt;</em>
  </a>
</p>

동작확인 시 사용한 시뮬링크 모델 : nxp_s32k144_gpio_pwm_ic_dual_VNH5019.slx

### 참고자료

* [S32 SDK software architecture](https://www.programmersought.com/article/36523455668/)
* [S32K1xx Bootloader ](https://www.nxp.com/docs/en/application-note/AN12218.pdf)
* [S32K1xx Firmware updates](https://www.nxp.com/docs/en/application-note/AN12323.pdf)

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
