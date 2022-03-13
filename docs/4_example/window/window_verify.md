---
id: window_verify
title: 검증
---

<div align="right">
  <font size="4">
    Since 21.08.20 ~ 21.11.30
  </font>
</div>

---

## 코드 자동 생성

### 코드생성 전략

코드생성 전략은 `Full Autocode`방법과 `Hybrid Autocode`(Manual+Autocode) 방법이 있다.

#### Full AutoCode

* 제어대상(Plant)가 실제 있는 경우  
temperature PID 프로젝트와 같이 제어대상 Plant(PWM출력->션트저항 열발생->온도센서 피드백)가 있고, 구현에 필요한 모든 Peripherals를 시뮬링크에서 Function Block으로 모두 지원하는 경우 코드레벨 핸들링 없이 시뮬링크만으로 개발을 진행하며, 다음의 경우 사용한다.
  * MCU Study 없이 빠른 기간내에 특정 알고리즘을 개발해야 하는 경우 Simulik에서 Firmware Function Block을 Full로 지원하는 EVB를 통해 Simulink 만으로 AutoCode를 진행한다.
  * `External Mode`를 통해 개발기간을 단축할 수 있다.
  * 로직 or 알고리즘 개발/검증이 완료되면 로직 or 알고리즘은 최종 타겟에서 실행될 수 있도록 독립적으로 실행 가능한 C파일로 생성되어야 한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/img3_4_mbd_realization.png').default}>
		<img
			src={require('/img/2_mbd/img3_4_mbd_realization.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;Hybrid AutoCodeGen&gt;</em>
	</a>
</p>

* 제어대상(Plant)가 없는 경우  
현장이 아닌 장소와 같이 Plant가 없는 경우 Simulation으로 Plant를 모델링하고, 시뮬레이션 상에서 기능을 구현한 다음 `PIL Mode`를 통해 로직/알고리즘만 Simulink 지원 MCU에서 구동한다.

#### Hybrid AutoCode

* Hybrid(Peripherals Manual + Function Logic AutoCode)  
Window 프로젝트와 같이 시뮬링크에서 Peripherals 관련 Function Block을 모두 지원하지 않는 경우 Firmware 부분은 Manual Coding으로 개발을 진행하고, Application 부분은 Simulink(기능구현->시뮬레이션->코드자동생성)로 개발을 진행한다.
  * AutoCode가 지원되지 않는 MCU가 많기 때문에 이 방법을 통해 최종적으로 제품에 적용되어야 한다.
  * Simulink를 Full로 지원하는 MCU를 통해 Full AutoCode의 External Mode를 통해 전체를 개발하고, 로직/알고리즘 부분만 C코드로 분리하여 타겟에 포팅한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_pil1_1_Hybrid_AutoCodeGen.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_pil1_1_Hybrid_AutoCodeGen.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;Hybrid AutoCodeGen&gt;</em>
	</a>
</p>

* 절차  
Mathworks에서 제공하는 예제(mbdt_mpc_autosar_system_top.slx)를 통해 개발 절차를 설명한다.
  * 1. 다음과 같이 시뮬레이션 시스템에서 AutoCode 영역을 Model block을 통해 외부에서 생성된 slx파일을 Reference하여 시뮬레이션을 위한 영역과 AutoCode를 위한 영역을 구분하여 전체 시스템을 구축한다.
  * 2. 시뮬레이션이 완료되면 기능로직에 대하여 타겟 속성을 추가하여 타겟용 코드를 자동생성한다.
  * 3. Manual Coding으로 개발한 Peripherals와 Auto Generated Code를 통합한다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_pil1_1_Hybrid_AutoCodeStrategy.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_pil1_1_Hybrid_AutoCodeStrategy.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;Hybrid AutoCode Strategy&gt;</em>
	</a>
</p>

### Device블록 만들기

여기서는 Simulink Device Driver block을 생성하는 4가지 방법(the Legacy Code Tool(LCT), the MATLAB function block, the System Object block, S-Function) 중 S-Function을 이용하여 Device Driver block을 만든다.

:::important
100% gcc 기반 C코드 생성은 가능하나, S-Function에서 Device Driver 관련 함수를 호출할 경우 관련 include path를 모두 인식하게 해야 한다.
:::

#### s32k144 Device Block

* Default GPIO Example Open
* S-Function 생성
  * 초기설정 및 변수(입력) 설정
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil1_2_DD_Sequence1_Init.png').default}
		alt="Example banner"
		width="350"
	/>
</p>
  * Coding  
  모든 프로젝트에서 인식될 수 있도록 include path는 s32ds 설치 시 생성되는 소스파일 경로로 설정한다.
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil1_2_DD_Sequence2_Coding.png').default}
		alt="Example banner"
		width="350"
	/>
</p>  
  <u>코드생성 시 HW의존적인 부분은 #ifndef MATLAB_MEX_FILE ~ #endif 매크로 처리를 해야 빌드에러가 발생하지 않음</u><br/>
  즉, MEX파일이 생성되지 않는 경우에만 이 코드를 넣고, MEX파일이 생성되면 이 코드를 없애 빌드에러를 제거한다.
  * Build & 코드생성  
  S-Function 빌드 성공 시 mexw64 파일이 생성됨
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil1_2_DD_Sequence3_Compile.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

#### TroubleShoot

* S-Function 재빌드
  * S-Function Builder 변경내용이 반영안될 때 빌드결과 생성파일 전부 삭재 후 재빌드(다른 폴더에 생성된 생성파일을 참조할 수 있으므로 Everything으로 전부 찾아서 삭제 - 버그같음)
  * [*.mexw64파일이 지워지지 않을 때 -> matlab command -> clear all -> delete mexw64 file](https://kr.mathworks.com/matlabcentral/answers/1563471-can-t-delete-myfile-mexw64-after-run-mexw64)
  * mexw64 파일 삭제 후에도 반영 안되면 자동생성된 소스/프로젝트 전부 삭제후 자동생성/빌드 재수행
* 빌드 Path 설정
  * 저장/빌드 후 S-Function Builder를 다시 열면 Path에 줄바꿈이 되어 있어 재빌드 시 빌드오류가 발생 -> 줄바꿈 없이 1줄로 Path를 설정해야 함(버그같음).  
  빌드 성공		: INC_PATH c:\Users\Use~~  
  다시열기		: INC_PATH
				  c:\Users\Use~~  
  수정후재빌드	: INC_PATH c:\Users\Use~~  
* 컴파일러 설치 오류
  * MINGW64를 설치했음에도 Simulink 모델 빌드 시 "지원되는 컴파일러를 찾을 수 없습니다."라는 빌드오류가 발생하는 경우
  * matlab 명령창에서 다음 명령을 실행한다.  
  \>\> setenv('MW_MINGW64_LOC', 'C:\TDM-GCC-64')  
  \>\> mex -setup

### 코드생성

#### Window 모델

시뮬레이션을 통해 기능(Functional Block) 개발이 완료되면 타겟에서 동작 가능한 코드생성을 위해 다음과 같이 시뮬레이션 모델을 코드생성용으로 수정해야 한다.  
시뮬레이션 환경과 실제 구동환경이 다르기 때문에 다음과 같이 Gap을 보완하는 Function Block들이 추가되어야 한다.
* 노이즈 제거를 위해 입력된 속도에 Lowpassfilter Function Block 추가
* -1 ~ 1 사이의 값을 PWM에 해당하는 Duty 및 Direction으로 변경해주는 MotorOut Function Block 추가
* 초기화 완료 시 엔코더 펄스 카운트 값을 Reset 해주는 Trigger 신호 Enable Logic 추가

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_pil1_3_AutoCode_FuncLogic.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_pil1_3_AutoCode_FuncLogic.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;시뮬레이션모델(상) vs 코드생성용모델(하)&gt;</em>
	</a>
</p>

* 기본기능은 Hybrid AutoCode(AutoCode와 Manual Coding으로 개발한 Firmware를 한번에 통합하여 동작확인)를 통해 개발하고,
* Anti-Pinch와 같은 복잡한 기능은 Full AutoCode 방법으로 알고리즘을 개발/검증한 다음 로직 부분만 AutoCode로 생성하여 기존 Hybrid AutoCode와 통합한다.

#### Task 실행주기

### 최적화

코드생성 옵션을 설정하여 코드자동생성 최적화 작업을 수행해야 한다.

Function Block을 각각의 C파일로 생성하는 방법


### 참고자료

* [step-by-step으로 Arduino Device Drivers 만들기](https://kr.mathworks.com/matlabcentral/fileexchange/39354-device-drivers)
* [How Do I Create My Own Hardware Support Package](https://itectec.com/matlab/matlab-how-do-i-create-my-own-hardware-support-package)
* DriverGuide.pdf (Writing a Simulink Device Driver block: a step by step guide) - 아두이노는 include path가 설정되어 있어서 그대로 따라면 Device Driver Block 잘 동작함

## MCU 포팅

> * 실제 시스템(Plant) 개발은 시간/비용이 많이 소요되기 때문에,
* MIL(Simulink 시뮬레이션)을 통해 개발한 로직/알고리즘을 시스템 제작/적용 전 PIL단계에서 MCU에 적용하여 구현 가능성을 확인한다.

### 환경구축

#### 동작모드

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


#### MCU - tms320f28069

> controlStick(tms320f28069)은 MIL, External Mode 모두 동작하므로 알고리즘개발 시 이용하고, 개발/검증 완료 후 로직 부분만 코드생성 후 타겟에 포팅

시뮬레이션을 통해 기능로직 개발을 완료하면 MBD Fully Support MCU(ti mcu(tms320f28069), arduino 등)를 이용하여 PIL Test를 수행하며, PIL Test 이후 MCU 포팅작업을 진행한다.

:::important Compatiability between Porting MCU and PIL Test MCU
* 포팅할 MCU에서 floating point를 지원할 경우 PIL MCU 또한 floating point 연산을 지원해야 한다.
* 포팅할 MCU가 32bit MCU일 경우 PIL MCU 또한 32bit MCU여야 하며, 포팅할 MCU가 16bit이면 PIL MCU 또한 16bit이어야 한다.
:::

#### mcu - s32k144

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

### 동작확인

#### [PIL모드 예제 동작확인](https://www.mathworks.com/help/supportpkg/beaglebone/ref/code-verification-and-validation-with-pil-and-external-mode.html) (21.10.22 확인완료)

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

#### External모드 설정 (21.10.25 확인완료)

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
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_pil2_3_External_comport.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_pil2_3_External_comport.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;External모드 시리얼포트 설정&gt;</em>
	</a>
</p>
4. Simulation Mode 설정  
Normal -> External로 변경
5. 실행  
Simulation Tab에서 Run버튼을 누르면 코드생성/빌드/다운로드 후 자동으로 실행되며, Runtime 도중 파라미터를 변경하여 시스템에 적용되는지 확인할 수 있다.
6. Runtime Monitoring  
타겟보드에서 GPIO18, 19포트 물리적으로 연결한 상태에서 External모드로 설정하고 Run하면  
GPIO18 펄스출력 시(EnableOut=1) GPIO19에서 펄스신호가 읽히고  
GPIO18 펄스미출력 시(EnableOut=0) GPIO19에서 펄스신호가 읽히지 않음

#### External모드 동작확인 (21.10.25 확인완료)

External모드에서는 MCU Peripherals Real Signal 입출력 및 모델로직(stateflow)의 동작을 실시간으로 확인할 수 있다.

<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_pil2_4_External_mode_ex.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_pil2_4_External_mode_ex.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;External모드 Peripherals+Stateflow 동작확인&gt;</em>
	</a>
</p>


### 구현

#### 시뮬레이션

동영상 삽입

#### Window 구동

동영상 삽입

### 참고자료

* [STM32 PIL Example(Simulink Src)](https://github.com/freshhope/STM32_PIL_Example_Simulink)
* stm32-matlab_2020 (External Mode for Parameter tunning).pdf - 이걸로 개념정리 됨
* [Code generation for ARM Cortex-M from MATLAB and Simulink](https://www.st.com/content/ccc/resource/sales_and_marketing/presentation/product_presentation/a9/9b/32/0f/30/e7/4a/aa/stm32-matlab.pdf/files/stm32-matlab.pdf/jcr:content/translations/en.stm32-matlab.pdf)
* [FM4 Family Processor in the Loop Simulation](https://www.cypress.com/file/294966/download)
* [외부모드로 LAUNCHXL-F28379D Blink LED & UART 실행 (유투브 동영상)](https://www.youtube.com/watch?v=KZjueGF4Wno)
* Simulink executionProfile을 통한 실시간 코드 실행시간 측정  
Matlab -> 문서(F1) -> "Real-Time Code Execution Profiling" 키워드 검색 -> LAUNCHXL-F28377S 예제를 LAUNCHXL_F28069M로 변환하여 실행시간 측정 레포트 확인

## 기능시험

### F1 Auto/Manual & F4 초기화 설정

> `F4_Req1` Power On 시 초기화해제 상태에서 구속이 감지될 때까지 모터를 CW/CCW로 n회(TBD) 구동하여 모터 부하를 통해 Up/Down방향을 판단하고, 상하단구속 위치 감지 후 초기화 상태로 천이되어야 한다.

* 상/하단 위치와 무관하게 상단 or 하단구속위치에서 상/하단 1회 씩을 연속적으로 구속하면 초기화가 완료된다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//IEqg8dDzfDI?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Window 상단구속에서 Relay초기화 (21년11월17일)&gt;</em>
</p>

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//jCq4ktn4KRU?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Window 하단구속에서 Relay초기화 (21년11월17일)&gt;</em>
</p>

### F2 속도프로파일

> F2_Req1 속도프로파일을 통한 위치/속도제어를 수행해야 한다.  
F2_Req2 가속/등속/감속 구간으로 나눠 프로파일링을 수행한다. 

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//ML_fRinUlRI?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Window FET Manual Up & Down (21년11월17일)&gt;</em>
</p>

### F3 피드백제어

> 초기화 후 FET 가속/등속/감속 실행 시 피드백 제어를 수행한다.  

* 피드백제어 미수행 시 
  * Opening(Down)/Closing(Up) 시 Reference Profile 및 PWM출력 동일
  * 윈도우 부하로 인해 Opening(Down) 시에는 빠른속도로 윈도우가 하강
  * Closing(Up) 시에는 느린 속도록 윈도우가 상승하며, 부하로 인해 원점위치까지 올라오지 못하게 된다.
* 피드백제어 수행 시
  * Opening(Down)/Closing(Up) 시 Reference Profile 동일
  * Opening(Down) 시 피드백을 통해 윈도우 부하만큼 PWM출력을 낮춰 윈도우 하강
  * Closing(Up) 시 피드백제어를 통해 윈도우 부하만큼 PWM출력을 높여 윈도우 상승
  * Opening(Down)/Closing(Up) 모두 동일한 시간동안 동일한 위치까지 이동
  * 동영상을 통해 Closing(Up) 시 원점위치까지 이동하는 것을 확인할 수 있다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//rUO6xONQ8OM?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Window 상단구속에서 FET초기화 (21년11월17일)&gt;</em>
</p>

### F6 AntiPinch 반전

> Closing 동작 중 장애물 감지 시 윈도우를 Opening 방향으로 동작시켜 윈도우 끼임으로부터 사용자를 보호한다.

* 초기화 완료 후에만 Auto Up/Down 동작이 가능하다.  
초기화를 통해 이동거리(Full-Stoke)를 알아야 자동으로 정지할 수 있음
* Manual-Up 동작은 사용자 의도기능으로 간주하여 반전을 수행하지 않으며, Auto-Up 동작 중에만 장애물 끼임 감지 시 반전동작을 수행한다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//eEmUgEgfH4k?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 윈도우 반전 (21년12월03일)&gt;</em>
</p>

### 참고자료

* Simulink executionProfile을 통한 실시간 코드 실행시간 측정  
Matlab -> 문서(F1) -> "Real-Time Code Execution Profiling" 키워드 검색 -> LAUNCHXL-F28377S 예제를 LAUNCHXL_F28069M로 변환하여 실행시간 측정 레포트 확인

## 추적성 확인

### 추적표 자동생성

1. Requirements Editor를 통해 요구사항을 작성 or Import 한 다음 요구사항을 블록으로 드래그하여 링크를 생성한다.
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_design_reqs_1_Requirement_Editor.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_design_reqs_1_Requirement_Editor.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;요구사항 작성&gt;</em>
	</a>
</p>
2. Requirements Editor에서 Traceability Matrix를 선택하여 추적표를 자동으로 생성한다.
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_design_reqs_2_auto_traceability_matrix.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_design_reqs_2_auto_traceability_matrix.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;추적표 자동생성&gt;</em>
	</a>
</p>
3. 요구사항에 연결된 링크를 선택하면 연결된 블록이 자동으로 화면에 나타나서 어떤 Function Block이 요구사항을 구현하고 있는지 쉽게 확인할 수가 있다.
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_design_reqs_3_traceability_corss_check.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_design_reqs_3_traceability_corss_check.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;추적표 확인&gt;</em>
	</a>
</p>

### 추적표 html Export

Traceability Matrix Dialog에서 Export기능(Export 버튼 클릭)을 통해 추적표를 html로 export 할 수 있다.
<p align="center">
	<a target="_blank"
	href={require('/img/2_mbd/mbd_sys_design_reqs_4_traceability_matrix_html.png').default}>
		<img
			src={require('/img/2_mbd/mbd_sys_design_reqs_4_traceability_matrix_html.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;Export Traceability Matrix to html&gt;</em>
	</a>
</p>

### 요구사항 추적표 (최종)

Function block과 기능요구사항 간의 추적표를 시뮬링크를 통해 자동으로 생성한다.

<p align="center">
    <a target="_blank"
    href="/assets/mbd/SLReqMatrixSnapShot.html">
        <img
            src={require('/img/2_mbd/mbd_sys_t2_traceability.png').default}
            alt="Example banner"
            width="350"
        /><br/><em>&lt;Traceability Matrix&gt;</em>
    </a>
</p>

### 참고자료

* [Simulink Model로부터 요구사항 추적표 자동생성 - 2019a에는 없고, 2021b에 있음](https://kr.mathworks.com/help/slrequirements/ug/track-requirement-links-with-a-traceability-matrix.html)


