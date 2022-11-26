---
id: window_verify_mcu_porting
title: MCU포팅
---
---

> * 실제 시스템(Plant) 개발은 시간/비용이 많이 소요되기 때문에,
* MIL(Simulink 시뮬레이션)을 통해 개발한 로직/알고리즘을 시스템 제작/적용 전 PIL단계에서 MCU에 적용하여 구현 가능성을 확인한다.

## 환경구축

### 동작모드

* `Full AutoCode`
  * External모드를 통해 실시간 파라미터를 모니터링하면서 기능을 개발한 다음
  <details><summary>External Mode</summary>
	<div>External Mode에서는 타겟에서 코드가 실행되는 동안 시뮬링크에서 파라미터를 수정/모니터링 할 수 있다.</div>
	<div>* External모드 실행은 PIL모델 구성을 Real-time으로 진행하며, Switch On/Off 시 Scope 출력 또한 실시간으로 On/OFF가 된다.</div>
  </details>
  * 변경없이 바로 AutoCode를 통해 타겟에서 동작을 확인
* `Hybrid AutoCode`
  * MIL 시뮬레이션을 통해 기능을 개발한 다음
  <details><summary>MIL Mode</summary>
	<div>MIL단계에서는 실제 Plant 및 타겟 MCU없이 PC상에서 시뮬레이션만을 통해 제어로직을 개발한다.</div>
  </details>
  * 타겟에서 구동될 수 있도록 인터페이스 후 AutoCode를 통해 타겟에서 동작을 확인
* `Mode Verification`
  * PIL모드를 통해 시뮬레이션 결과와 MCU실행 결과가 일치함을 확인
  <details><summary>PIL Mode</summary>
	<div>PIL단계에서는 실제 Plant 없이 PC에서 구동되는 가상입력/가상플랜트 및 타겟 MCU만으로 MIL단계에서 개발한 제어로직의 동작 일치성을 확인하며,</div>
	<div>시스템 개발이 결정되면 실제 Plant에 제어로직을 적용하여 시스템 테스트를 수행한다.</div>
	<div>* PC시뮬레이션 결과와 타겟보드 결과가 수치적으로 동일한지 확인</div>
	<div>* 시뮬링크 모델 실행시간 측정</div>
	<div>* UART를 통해 시뮬링크와 타겟보드 간 데이터 교환을 수행한다.</div>
	<div>* PIL Simulation은 Real-time에서 진행되지 않는다.</div>
  </details>
* SIL/PIL
  * SILPILVerificationExample.m -> SIL/PIL 구현방법 데모  
  : Help -> Code Verification and Validation with PIL
  * SIL 및 PIL 시뮬레이션으로 생성 된 코드 테스트(실제 실행 스크립트 예제 - 인터넷 연결하면 한글번역)  
  : software-and-processor-in-the-loop-sil-and-pil-simulation.html
  * SIL 또는 PIL 접근 방식 선택  
  : choosing-a-sil-or-pil-approach.html 찾아서 확인
  * Test Generated Code with SIL and PIL Simulations(Simulink Documentation)  
  : software-and-processor-in-the-loop-sil-and-pil-simulation.html
  * [Test Generated Code with SIL and PIL Simulations(유투브 설명)](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dpk8Jc6rK4uk&psig=AOvVaw3kGP-a_mCF3JMcwA4HmSPj&ust=1625116845912000&source=images&cd=vfe&ved=2ahUKEwiNq-mTzr7xAhVDcN4KHUY1BrIQr4kDegQIARBn)


### MCU - tms320f28069

> controlStick(tms320f28069)은 MIL, External Mode 모두 동작하므로 알고리즘개발 시 이용하고, 개발/검증 완료 후 로직 부분만 코드생성 후 타겟에 포팅

시뮬레이션을 통해 기능로직 개발을 완료하면 MBD Fully Support MCU(ti mcu(tms320f28069), arduino 등)를 이용하여 PIL Test를 수행하며, PIL Test 이후 MCU 포팅작업을 진행한다.

:::important Compatiability between Porting MCU and PIL Test MCU
* 포팅할 MCU에서 floating point를 지원할 경우 PIL MCU 또한 floating point 연산을 지원해야 한다.
* 포팅할 MCU가 32bit MCU일 경우 PIL MCU 또한 32bit MCU여야 하며, 포팅할 MCU가 16bit이면 PIL MCU 또한 16bit이어야 한다.
:::

### mcu - s32k144

> s32k144는 External Mode가 지원안되므로 코드자동생성하고 타겟에서 실행한 후 FreeMASTER를 통해 External Mode like하게 동작확인

프로그램 설치
* 가상 컴포트 드라이버
  * OpenSDA - CDC Serial Port
  * PEDrivers_install.exe
* 모니터링 for FreeMASTER
  * 옛날 버전(FMASTERSW.exe v2.0)으로 설치하면 장치드라이버는 인식하나 정작 통신이 안됨
  * FMASTERSW31.exe v3.1로 nxp에서 다운받아서 다시 설치하니까 잘됨
* 컴파일러
  * S32 Design Studio for ARM Version 2.2
  * S32DS_ARM_Win32_v2.2.exe
  * S32DS_ARM_v2.2_UP1.zip

:::important
* External모드 동작
  * 회사/집 모두 빌드 실패, 타겟연결 실패(21.10.30)
  * FreeMASTER를 이용하여 External Mode like하게 개발 진행
* 타겟 실행 방법
  * Simulink MBD_S32K14x_Config_Information에서 "Download Code after Build"를 체크하여 빌드 후 바로 다운로드
  * 빌드결과 생성되는 <ProjectName\>.mot파일을 EVB-S32K144 장치인식드라이버에 복사하여 실행.
  * S32DS -> Flash from file -> elf파일 선택 -> downloading
:::

## 동작확인

### [PIL모드 예제 동작확인](https://www.mathworks.com/help/supportpkg/beaglebone/ref/code-verification-and-validation-with-pil-and-external-mode.html) (21.10.22 확인완료)

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil2_1_PIL_mode.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;PIL모드 동작확인&gt;</em>
</p>

1. TI 예제 프로그림 c2000_pil_block.slx Open
2. PIL블록 생성 활성화  
Simulink Configuration Parameter Open -> Search에서 `CreateSILPILBlock`검색 -> PIL 선택 후 OK
3. PIL블록 생성  
Controller Block 선택 후 마우스 우클릭 -> C/C++ Code -> Deploy this Subsystem to Hardware -> 다이얼로그 창이 열리면 Controller Block에 대한 PIL Block 생성을 위해 Build 버튼을 선택하여 빌드 진행
4. Simulation블록과 PIL블록 Merge  
새창에서 생성된 PIL 블록을 복사하여 기존 c2000_pil_block.slx 예제의 `Place PIL block here` 위치에 붙여넣기
5. 실행  
Simulation Tab에서 Run버튼을 누르면 PIL블록이 타겟에서 실행된다.

### External모드 설정 (21.10.25 확인완료)

prototyping 또는 알고리즘 개발중인 경우 외부모드를 사용하면 로직을 하드웨어에서 실행하면서 시리얼 통신을 통해 모니터링/튜닝이 가능하다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil2_2_External_mode_concept.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;External모드&gt;</em>
</p>

1. Solver 설정  
`variable-step`, `auto(Automatic solver selection)`에서 `Fixed-step`, `discrete(no continuous state)`로 변경
2. 타겟보드 설정  
Configuration Parameters -> Hardware Implementation -> Hardware board를 `TI Piccolo F2806x`로 변경 
3. External모드에 사용될 시리얼포트 설정  
Configuration Parameters -> Hardware Implementation -> Hardware board settings -> Target hardware resources -> Groups -> External mode -> Serial Port를 장치관리자에서 인식된 controlStick 가상컴포트 포트번호로 설정
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil2_3_External_comport.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;External모드 시리얼포트 설정&gt;</em>
</p>
4. Simulation Mode 설정  
Normal -> External로 변경
5. 실행  
Simulation Tab에서 Run버튼을 누르면 코드생성/빌드/다운로드 후 자동으로 실행되며, Runtime 도중 파라미터를 변경하여 시스템에 적용되는지 확인할 수 있다.
6. Runtime Monitoring  
타겟보드에서 GPIO18, 19포트 물리적으로 연결한 상태에서 External모드로 설정하고 Run하면  
GPIO18 펄스출력 시(EnableOut=1) GPIO19에서 펄스신호가 읽히고  
GPIO18 펄스미출력 시(EnableOut=0) GPIO19에서 펄스신호가 읽히지 않음

### External모드 동작확인 (21.10.25 확인완료)

External모드에서는 MCU Peripherals Real Signal 입출력 및 모델로직(stateflow)의 동작을 실시간으로 확인할 수 있다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil2_4_External_mode_ex.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;External모드 Peripherals+Stateflow 동작확인&gt;</em>
</p>

## 구현

### 시뮬레이션

동영상 삽입

### Window 구동

동영상 삽입

## 참고자료

* [STM32 PIL Example(Simulink Src)](https://github.com/freshhope/STM32_PIL_Example_Simulink)
* stm32-matlab_2020 (External Mode for Parameter tunning).pdf - 이걸로 개념정리 됨
* [Code generation for ARM Cortex-M from MATLAB and Simulink](https://www.st.com/content/ccc/resource/sales_and_marketing/presentation/product_presentation/a9/9b/32/0f/30/e7/4a/aa/stm32-matlab.pdf/files/stm32-matlab.pdf/jcr:content/translations/en.stm32-matlab.pdf)
* [FM4 Family Processor in the Loop Simulation](https://www.cypress.com/file/294966/download)
* [외부모드로 LAUNCHXL-F28379D Blink LED & UART 실행 (유투브 동영상)](https://www.youtube.com/watch?v=KZjueGF4Wno)
* Simulink executionProfile을 통한 실시간 코드 실행시간 측정  
Matlab -> 문서(F1) -> "Real-Time Code Execution Profiling" 키워드 검색 -> LAUNCHXL-F28377S 예제를 LAUNCHXL_F28069M로 변환하여 실행시간 측정 레포트 확인

