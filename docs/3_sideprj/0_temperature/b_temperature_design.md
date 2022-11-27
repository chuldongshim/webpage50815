---
id: temperature_design
title: 설계 및 검증
---
---

## 개발환경

개발환경 구축 : Wiper_v9_210726_Closing.docx 내용 정리

### TR28069 HW 사양

TR28069 EVB보드를 이용하여 온도PID제어 기능을 구현한다.

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/mbd_hw_ti_evb_TR28069_pinout.png').default}
			alt="Example banner"
		/><br/><em>&lt;Piccolo ControlStick F28069 pinout&gt;</em>
	</div>
</p>

* Piccolo TMS320F28069U PZP T 칩 탑재
  * 32-Bit Fixed-Point Core (C28X)  
  (Up to 90MHz/90MIPS/90MMACS/180MFLOPS)
  * Control Law Accelerator (CLA) / Floating-point Unit (FPU) / Viterbi, Complex Math, CRC Unit을 내장
  * 내부 메모리 : 100KB RAM / 2KB OTP / 256KB FLASH
  * 16채널 ADC : 12-Bit / Up to 3.46MSPS
  * 16 PWM (+3채널 ECAP Aux. PWM) /
  * 8채널 HR-PWM / 3 CAP / 2 QEP
  * 통신 : 2 SPI / 2 SCI / 1 CAN / 1 I2C / 1 McBSP
* JTAG 에뮬레이터 내장 (XDS100v1)
  * 별도의 JTAG 에뮬레이터 없이, USB 연결만으로 학습 가능
  * 내장 JTAG 에뮬레이터 미-사용시, 별도의 JTAG 에뮬레이터 연결을 위한 표준 14핀 JTAG 인터페이스 인출 (IEEE1149.1)
* 다양한 사용자 인터페이스
  * 7-Segment 1개 (GPIO 및 PWM 실습 및 테스트 용 / LED 대용)
  * 가변저항분압기 1개 (ADC 실습 및 테스트 용)
  * Tactile Switch 2개 (GPIO/인터럽트/Capture/Trip 테스트용)
  * 콘덴서 마이크 1개 (ADC를 이용한 음향 처리 가능)
* PWM 포트 6개 / ADC 입력채널 3개 인출
  * 범용 PWM 6채널과 ADC 입력 3채널 인출  
  (홀 인출, 외부 회로와 연결하여 활용 가능)
* 온도센서 및 발열용 Wattage 저항 탑재
  * PWM 출력을 통해, Wattage 저항에서 열을 발생시키고, 온도센서의 출력을 ADC로 처리하여, 기본적인 PID 제어 알고리즘 학습 가능
* CAN / I2C / RS232C 통신포트 인출
  * 2.54mm 1x9(수) 핀-헤더를 통해 CAN / I2C / RS232C 통신 포트 인출
* 점퍼 방식의 부트모드 테스트 회로
  * 2핀 점퍼를 통해, TMS320F28035 프로세서의 다양한 부트모드 테스트 가능

### 툴체인 설치

애드온 매니저를 통해 Simulink에서 F2806x 사용을 위한 소프트웨어가 모두 설치되어 있는지 확인해야 Simulink로만 빌드/다운로딩이 가능하다.

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/mbd_hw_ti_fw_ccs_installation.png').default}
			alt="Example banner"
		/><br/><em>&lt;소프트웨어 설치 확인&gt;</em>
	</div>
</p>

#### 드라이버 설치

XDS100S는 Texas Instruments(TI) 사의 XDS100 에뮬레이션 기술을 적용한 JTAG 에뮬레이터로 Launchpad는 XDS100v2를 내장하고 있으며, [CCS설치 시 드라이버가 자동으로 설치](https://www.tms320f28x.co.kr/goods/goods_view.php?goodsNo=200902350)되며, 드라이버 설치 시 문제가 있을 경우 [홈페이지에서 다운받아 직접 설치](https://software-dl.ti.com/ccs/esd/documents/xdsdebugprobes/emu_xds_software_package_download.html)가 가능하다.  
(Release → 9.2.0.00002 → 64-bit Windows/CCSv9.0.x and up → ti_emupack_setup_9.2.0.00002_win_64.exe 파일 다운로드/설치)

#### Pin Mux Utility

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/mbd_hw_ti_fw_controlSUITE_PinMuxUtility.png').default}
			alt="Example banner"
		/><br/><em>&lt;Pin Mux Utility&gt;</em>
	</div>
</p>

## 기본동작 확인

시뮬링크 Function Block을 통해 tms320f28069 mcu의 peripherals 동작을 확인한다.

#### Peripherals 용도

* 로직제어 : SysTick, Timer, ExtInt, GPIO
* 모터제어 : PWM, ADC
* 위치/속도측정 : eQEP(Quadrature Decoder)
* 통신 : UART(Rx Interrupt), SPI

#### 참고자료

* _F2806x Firmware Development Package User's Guide.pdf -> 56p (ADC변환 후 FIR필터링)
  * ePWM1을 통해 ADC_SOC(start of Conversion) Triggering
  * ADCINA2를 통해 ADC 변환을 수행하고, ADC_RESULT1 레지스터에 변환 결과 저장
  * ADC변환이 완료되면 ADCINT7 인터럽트 발생 -> CLA가 Task7(FIR Filter) 실행
  * Task7 완료 후 main CPU에 CLA1_INT7 인터럽트 발생
  * main CPU는 ADCINT flag를 clear하고, CLA 출력 및 ADCRESULT1(Orgin for Compare)를 저장
* Speed and Position measurement
  * `_controlSUITE 설명 - F2806x Firmware Development Package User's Guide.pdf`  
-> 4.23 eQEP Speed and Position measurement(eqep_pos_speed)

### GPIO

클럭소스를 `Sample time=0.1`, Sample based Pulse type으로 설정하고, Period(number of samples)=10(0.1\*10=1s), Pulse width(number of smaples)=5(5\*0.1=0.5s)로 설정하고,  
타겟보드에서 GPIO18, 19포트 물리적으로 연결한 상태에서 Run버튼을 눌러 External모드를 실행하면
1. Matlab Simulink에서 1s 주기 duty 50%의 펄스신호를 Scope 출려고가 동시에 타겟보드 Blue LED가 Blinking하며
2. GPIO18에서 출력이 나가면(EnableOut=1) GPIO19를 통해 펄스신호가 읽힘과 동시에 Red LED가 Blinking하며
3. GPIO18에서 출력이 안나가면(EnableOut=0) GPIO19를 통해 펄스신호가 읽히지 않으면서, Red LED가 Blinking하지 않는다

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/mbd_hw_ti_sl_LAUNCHXL_gpio.png').default}
			alt="Example banner"
		/><br/><em>&lt;gpio by external mode&gt;</em>
	</div>
</p>

:::note External mode 실행
* Configuration Parameters -> Hardware Implementation -> Target Hardware resources -> External mode에서 장치가 있식하고 있는 시리얼 포트로 설정하고,
* Simulink 화면에서 실행 모드를 Normal External로 변경하고 실행버튼을 클릭하면 빌드->이미지 타겟에 다운로딩->시리얼통신을 통해 Simulink와 타겟간 External mode 동작함.
:::

### PWM-RC필터-ADC

시뮬레이션을 통한 PWM 주파수 결정
* RC회로를 통해 PWM신호를 평활하므로 PWM Frequency가 너무 낮으면 평활이 수행되지 않으므로 ADC가 가능하도록 평활이 되는 PWM Frequency를 결정해야 한다.
* 한편 PWM 모듈은 시스템클럭(SYSCLKOUT=90MHz)를 분주한 TBCLK를 기반으로 동작하며, 여기서 ePWM블록의 `Time base clock(TBCLK) prescaler divider`를 1로 설정하므로 `1 count time`=1/90e6=1.11e-8≒11ns가 된다.  
* 따라서 `Period`를 20480로 설정하면 -> 11ns*20480=2.2756e-4 ≒ 0.227ms -> PWM주기는 227us가 된다.
* R=1Kohm, C=0.1uF이므로 LowPassFilter 전달함수를 통해 시뮬레이션을 수행하면  
차단주파수=1/(2*pi*RC)=1/(2*pi*1000*0.1e-6)=1.5915e+03=1.59KHz보다 주파수가 높은신호(1/1590=0.628ms보다 펄스폭이 좁은)는 차단,  
주파수가 낮은신호(1/1590=0.628ms보다 펄스폭이 넓은)는 통과
* Low Pass Filter 전달함수  
전달함수=1/(RCs+1)=1/(1000*0.1e-6s+1)=1/(0.0001s+1)
* PWM 신호 통과  
PWM Period=`20480` → 11ns*20480=227us(실제측정 227us\*2=454us)  
fc=1.59KHz(628us Period)에서 454us는 저주파 통과  
→ 통과되어 ADC측정 불가
* PWM 신호 차단  
PWM Period=`2048` → 11ns*2048=22.7us(실제측정 22.7us\*2=45.4us)
fc=1.59KHz(628us Period)에서 45.4us는 고주파 차단  
→ 감쇠되어 ADC측정 가능
<p align="center">
	<img
	  src={require('/img/2_mbd/mbd_hw_ti_sl_LAUNCHXL_PwmAdc_simulate.png').default}
	  alt="Example banner"
	  width="350"
	/><br/><em>&lt;LPF Simulation&gt;</em>
</p>

인터페이스 및 Extermal Mode를 통한 동작확인
* PWM을 ADC로 직접 측정할 수 없으므로 RC회로를 거쳐 평활한 다음 측정한다. 따라서 다음과 같이 ePWM7B(GPIO41) -> RC회로를 통한 DAC2(J4_31pin) -> ADCINA0(J3_29pin)
* PMW주파수를 변경하면 ADC 측정결과가 달라지는 것을 확인할 수 있다.
<p align="center">
	<img
	  src={require('/img/2_mbd/mbd_hw_ti_sl_LAUNCHXL_PwmAdc.png').default}
	  alt="Example banner"
	  width="350"
	/><br/><em>&lt;PWM->ADC&gt;</em>
</p>

### virtualHall-eQEP

시뮬링크에서 eQEP블록은 포트설정을 다음과 같이 수행한다.
```  
Configuration Parameters -> Hardware Implementation -> Hardware board settings -> Target hardware resources -> eQEP에서
  * A상   - GPIO20 or GPIO50
  * B상   - GPIO21 or GPIO51
  * Index - GPIO23 or GPIO53
```

* eQEP는 16bit TimerCounter를 사용하므로, Max Pos Count는 0xFFFF.FFFF가 된다.
* 인터페이스 및 Extermal Mode를 통한 동작확인
  <p align="center">
   <img
	  src={require('/img/2_mbd/mbd_hw_ti_sl_LAUNCHXL_eQEP.png').default}
	  alt="Example banner"
	  width="350"
	/><br/><em>&lt;eQEP&gt;</em>
  </p>

:::important
* eQEP 포트설정  
tms320f28069는 Configuration Parameters -> Hardware Implementation -> Hardware board settings -> Target hardware resources에서 eQEP포트가 GPIO20~27 or 50~57로 설정됨
* controlStick에는 eQEP포트가 Pin으로 나와있지 않아서 Test가 불가능하다.
* 따라서 eQEP 포트가 밖으로 나와있는 EVB(LAUNCHXL-F28069M)로 확인
:::

## 시스템 설계

Sinkwork에서 제공되는 온도제어 예제를 위해 사용되는 EVB보드를 그대로 사용하고, Hand Coding이 아닌 MBD Auto-Code-Generation을 통해 온도제어 동작을 확인한다.

### 하드웨어 구현

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/img3_3_hw_config.png').default}
			alt="Example banner"
		/>
	</div>
</p>

### 소프트웨어 구현

동작확인 절차
1. 시뮬링크를 통해 로직 구성
2. C코드를 자동생성하고, 빌드 후 hex파일 타겟 MCU에 다운로딩 후 실행
3. 가변저항을 통해 원하는 타겟 온도값 설정
4. 온도센서를 통해 피드백 되는 온도(ADC Value)가 타겟온도를 추종하는지 시리얼 통신으로 모니터링

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/img3_4_mbd_realization.png').default}
			alt="Example banner"
		/>
	</div>
</p>

