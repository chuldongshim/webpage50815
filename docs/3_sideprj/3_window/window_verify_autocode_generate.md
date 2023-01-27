---
id: window_verify_autocode_generate
title: 코드자동생성
---
---

## 코드생성

### Window 모델

시뮬레이션을 통해 기능(Functional Block) 개발이 완료되면 타겟에서 동작 가능한 코드생성을 위해 다음과 같이 시뮬레이션 모델을 코드생성용으로 수정해야 한다.  
시뮬레이션 환경과 실제 구동환경이 다르기 때문에 다음과 같이 Gap을 보완하는 Function Block들이 추가되어야 한다.
* 노이즈 제거를 위해 입력된 속도에 Lowpassfilter Function Block 추가
* -1 ~ 1 사이의 값을 PWM에 해당하는 Duty 및 Direction으로 변경해주는 MotorOut Function Block 추가
* 초기화 완료 시 엔코더 펄스 카운트 값을 Reset 해주는 Trigger 신호 Enable Logic 추가

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_pil1_3_AutoCode_FuncLogic.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;시뮬레이션모델(상) vs 코드생성용모델(하)&gt;</em>
</p>

* 기본기능은 Hybrid AutoCode(AutoCode와 Manual Coding으로 개발한 Firmware를 한번에 통합하여 동작확인)를 통해 개발하고,
* Anti-Pinch와 같은 복잡한 기능은 Full AutoCode 방법으로 알고리즘을 개발/검증한 다음 로직 부분만 AutoCode로 생성하여 기존 Hybrid AutoCode와 통합한다.

### Task 실행주기

### 최적화

코드생성 옵션을 설정하여 코드자동생성 최적화 작업을 수행해야 한다.

Function Block을 각각의 C파일로 생성하는 방법

