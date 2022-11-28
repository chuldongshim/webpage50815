---
id: temperature_mgn
title: 프로젝트 관리
---
---

## 개요

### 목표

* 개인 프로젝트를 통해 MBD를 통하여 실제 개발을 진행할 수 있는지 여부를 확인한다.
* MBD 개발 환경을 구축하고, MBD 기반 선행개발 프로세스를 수립한다.

### 컨셉

개발 컨셉은 다음과 같다.
* 시뮬링크에서 시뮬레이션을 통해 제어로직을 개발한다.
* 다음과 같이 Simulink RCP를 구성하여 Peripherals와 제어로직을 인터페이스 한다.
* 코드자동생성/빌드/타겟다운로드/실행
* 가변저항으로 설정한 목표값으로 온도가 피드백 제어되는지 확인한다.

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/img3_2_mbd_concept.png').default}
			width="450"
			alt="Example banner"
		/>
	</div>
</p>

### 진행결과

* Sinkworks 온도제어 예제를 MBD를 통해 구현하여 동일하게 동작됨을 확인하였다.
* 이전에 수행한 MBD는 C코드자동생성 없이 MicroAutobox라는 범용 제어기에서 제어로직에 대한 동작을 확인한 것인 반변,
* 본 프로젝트에서 예제 수준으로 간단하게나마 MBD기반 자동생성코드를 처음으로 타겟 MCU에서 구동하여 모델 시뮬레이션과 실제 타겟MCU 구동결과가 일치함을 확인하였다.

## 관리

온도PID제어 프로젝트는 개인프로젝트로 별도의 프로젝트 관리 툴 없이 GitLab만을 이용하여 프로젝트 관련 모든 활동을 수행한다.

### 일정관리

GitLab을 통해 Task(할일,일정) 및 Issue(문제) 관리

|기간|수행내용|
|---|---|
|20년 8월|Simulink 및 TI MCU 개발환경 구축
|20년 9~10월|MCU(tms320f28069) 학습<li>gpio, ext_gpio, ADC</li><li>eCAP, eQEP, ePWM</li>|
|20년 11월|MBD 구현 및 동작확인|


### 형상관리

산출물(코드, 문서 등)은 gitlab repository에 저장하여 이력관리를 수행한다.

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/img3_1_svn_log.png').default}
			width="450"
			alt="Example banner"
		/>
	</div>
</p>

### 이슈관리

gitlab repository에 Project를 생성하여 agile 기반으로 프로젝트 이슈를 관리한다.  

