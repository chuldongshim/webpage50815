---
id: window_verify_autocode_strategy
title: 코드자동생성전략
---
---

## 코드생성 전략

코드생성 전략은 `Full Autocode`방법과 `Hybrid Autocode`(Manual+Autocode) 방법이 있다.

### Full AutoCode

* 제어대상(Plant)가 실제 있는 경우  
temperature PID 프로젝트와 같이 제어대상 Plant(PWM출력->션트저항 열발생->온도센서 피드백)가 있고, 구현에 필요한 모든 Peripherals를 시뮬링크에서 Function Block으로 모두 지원하는 경우 코드레벨 핸들링 없이 시뮬링크만으로 개발을 진행하며, 다음의 경우 사용한다.
  * MCU Study 없이 빠른 기간내에 특정 알고리즘을 개발해야 하는 경우 Simulik에서 Firmware Function Block을 Full로 지원하는 EVB를 통해 Simulink 만으로 AutoCode를 진행한다.
  * `External Mode`를 통해 개발기간을 단축할 수 있다.
  * 로직 or 알고리즘 개발/검증이 완료되면 로직 or 알고리즘은 최종 타겟에서 실행될 수 있도록 독립적으로 실행 가능한 C파일로 생성되어야 한다.

<p align="center">
	<img
		src={require('/img/2_mbd/img3_4_mbd_realization.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Hybrid AutoCodeGen&gt;</em>
</p>

* 제어대상(Plant)가 없는 경우  
현장이 아닌 장소와 같이 Plant가 없는 경우 Simulation으로 Plant를 모델링하고, 시뮬레이션 상에서 기능을 구현한 다음 `PIL Mode`를 통해 로직/알고리즘만 Simulink 지원 MCU에서 구동한다.

### Hybrid AutoCode

* Hybrid(Peripherals Manual + Function Logic AutoCode)  
Window 프로젝트와 같이 시뮬링크에서 Peripherals 관련 Function Block을 모두 지원하지 않는 경우 Firmware 부분은 Manual Coding으로 개발을 진행하고, Application 부분은 Simulink(기능구현->시뮬레이션->코드자동생성)로 개발을 진행한다.
  * AutoCode가 지원되지 않는 MCU가 많기 때문에 이 방법을 통해 최종적으로 제품에 적용되어야 한다.
  * Simulink를 Full로 지원하는 MCU를 통해 Full AutoCode의 External Mode를 통해 전체를 개발하고, 로직/알고리즘 부분만 C코드로 분리하여 타겟에 포팅한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil1_1_Hybrid_AutoCodeStrategy.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Hybrid AutoCode Strategy&gt;</em>
</p>

* 절차  
Mathworks에서 제공하는 예제(mbdt_mpc_autosar_system_top.slx)를 통해 개발 절차를 설명한다.
  * 1. 다음과 같이 시뮬레이션 시스템에서 AutoCode 영역을 Model block을 통해 외부에서 생성된 slx파일을 Reference하여 시뮬레이션을 위한 영역과 AutoCode를 위한 영역을 구분하여 전체 시스템을 구축한다.
  * 2. 시뮬레이션이 완료되면 기능로직에 대하여 타겟 속성을 추가하여 타겟용 코드를 자동생성한다.
  * 3. Manual Coding으로 개발한 Peripherals와 Auto Generated Code를 통합한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil1_1_Hybrid_AutoCodeGen.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Hybrid AutoCode Integration&gt;</em>
</p>

## Device블록 만들기

여기서는 Simulink Device Driver block을 생성하는 4가지 방법(the Legacy Code Tool(LCT), the MATLAB function block, the System Object block, S-Function) 중 S-Function을 이용하여 Device Driver block을 만든다.

:::important
100% gcc 기반 C코드 생성은 가능하나, S-Function에서 Device Driver 관련 함수를 호출할 경우 관련 include path를 모두 인식하게 해야 한다.
:::

### s32k144 Device Block

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

### TroubleShoot

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

