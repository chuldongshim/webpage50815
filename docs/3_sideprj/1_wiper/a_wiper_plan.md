---
id: wiper_plan
title: 계획
---

---

## 개요

본 문서는 Model Based Design(이하 mbd라 함)을 적용하여 모터제어 시스템을 개발하는데 필요한 모든 내용을 정의한 문서이다.

### 목표

* Model Based Design(이하 MBD라 함) 선행개발을 진행하여 모델(로직/알고리즘)로부터 자동생성된 코드를 실제 타겟에서 구동한다.
* Wiper 모터 구동을 통한 MBD 개발환경을 구축하는 것을 주 목적으로 하며, temperature PID 프로젝트를 통해 정의한 개발환경을 개선하여 최적의 MBD 개발환경을 구축한다.

### 프로젝트 관리

* 형상관리 : GitHub-Docusaurus를 통한 문서산출물 관리
* 소스관리 : GitLab Repository를 통한 소스 관리

## 진행절차

1. System Identification을 통한 Plant 모델링(DC모터 파라미터 정의)
2. DC모터 속도/위치제어 알고리즘 개발 및 시뮬레이션
3. 코드자동생성
4. 실제 구동결과와 시뮬레이션 결과 일치여부 비교검증

### 선행개발(적용)

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

### 일반프로세스(미적용)

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

## 진행결과

`~21.07.26 완료`
* Reference Velocity Profiling 생성 로직을 개발하고 Simulink를 통한 시뮬레이션 검증 후
* 개발한 로직 모델로부터 타겟용 C코드를 자동생성한 후 타겟 MCU를 통해 Wiper Motor모터의 속도 가/감속 제어를 수행하였다.
* 시뮬레이션과 실제 구동결과가 일치함을 확인하고, 개발시간을 획기적으로 단축할 수 있음을 확인하였다.

