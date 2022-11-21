---
id: mycareer
title: 주요경험
---
---

관심과 흥미를 가지고 꾸준히 경험해온 만큼 다음 3가지 분야에 강점을 발휘할 수 있습니다. [[참고]](https://docs.google.com/spreadsheets/d/1IEfmGKft0ClDigiTWpDMb05anEFAgLyUKv18ROo-rVE/edit?usp=sharing)

1. [모델기반설계](/docs/mycareer#%EB%AA%A8%EB%8D%B8%EA%B8%B0%EB%B0%98%EC%84%A4%EA%B3%84)
2. [개발프로세스](/docs/mycareer#%EA%B0%9C%EB%B0%9C%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4)
3. [임베디드](/docs/mycareer#%EC%9E%84%EB%B2%A0%EB%94%94%EB%93%9C)


## 모델기반설계

모델기반설계를 통해 통해 습득한 기술

1. MBD기반 제어로직 설계 및 시뮬레이션 검증
2. MBD기반 제어로직 C코드 자동생성 및 실제 타겟구동
3. 시뮬레이션-타겟구동 설계 비교검증

### 주요경험

MBD기반의 소프트웨어를 개발하고, 개발한 소프트웨어를 실제 타겟 MCU에서 동작하여 검증하였습니다.

* 개발환경 구축 및 윈도우 타겟구동 확인
* MBD를 통해 선행/양산 대응이 가능한 수준의 프로세스 준수 방법론 정립

2013년도에 MBD를 처음 시작하였으며, 사내 표준프로세스 구축 업무로 MBD개발 업무가 Holding되어 시뮬레이션을 통해 알고리즘만 개발하고 실제 타겟에 적용하지 못하여 아쉬움이 많이 남았습니다.

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed/JWzVYKv_Eac?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 윈도우 반전 시뮬레이션(13년4월~14년3월)&gt;</em>
</p>

하지만 꾸준한 관심과 하고자 하는 의지로 21년에 결국 Manual Coding 없이 모델기반설계로 제어기 개발환경을 구축/적용해 보았고, 
제품 수주를 위한 개발활동에 MBD를 적용하여 개발을 진행하고 있습니다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed/eEmUgEgfH4k?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 윈도우 반전 실제적용(21년12월)&gt;</em>
</p>

### 관련활동

* [MBD 시작 ☜ click for more](/docs/mycareer/mymbd#mbd-%EC%8B%9C%EC%9E%91)
  * 07.03.02 ~ 08.08.31	: 졸업논문
* [선행학습 ☜ click for more](/docs/mycareer/mymbd#%EC%84%A0%ED%96%89%ED%95%99%EC%8A%B5)
  * 13.10.01 ~ 14.05.16	: MicroAutoBox를 통한 Window MBD 기본기능 구동
  * 21.07.30 ~ 21.12.31	: Safety Power Window MBD 기능구현
* [고객대응 실사례 ☜ click for more](/docs/mycareer/mymbd#%EA%B3%A0%EA%B0%9D%EB%8C%80%EC%9D%91-%EC%8B%A4%EC%82%AC%EB%A1%80)
  * 22.03.03 ~ 22.05.03	: PSB(Pre-safe Seat Belt) MBD 대응
* [알고리즘 개발 ☜ click for more](/docs/mycareer/mymbd#%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B0%9C%EB%B0%9C)
  * 16.10.03 ~ 17.04.30	: Self_Study - Kalman Filter이론학습
  * 21.01.08 ~ 21.07.13	: Wiper MBD 1차 - s32k144 학습 및 기능구현
  * 22.08.14 ~ 22.08.29	: FFT MCU 구현 및 Matlab 연동 확인
  * 22.09.01 ~ 22.10.18	: Wiper MBD 2차 - 제어기설계(PID,관측기,LQR)
* [선행학습 ☜ click for more](/docs/mycareer/mymbd#%EC%84%A0%ED%96%89%ED%95%99%EC%8A%B5-1)
  * 22.10.21 ~ 22.11.05	: Sensored BLDC MBD


## 개발프로세스

개발프로세스 활동을 통해 습득한 기술

1. A-SPICE/ISO26262를 통한 프로세스 구축
2. 프로세스 기반 선루프/윈도우 시스템 설계
3. Redmine을 통한 이슈 및 품질관리
4. Github/Gitlab 기반 Agile 프로젝트 관리

### 주요경험

A-SPICE/ISO26262 표준 프로세스 구축 프로젝트 PM으로 다음 역할을 수행하여 A-SPICE CL3 인증을 획득하였습니다.

* 사내 개발 표준 프로세스 수립
* 개발 일정 WBS 수립
* 프로젝트 산출물 및 개발 일정 관리
* 인증 심사 대응

<p align="center">
	<div class="box" >
		<img
			src={require('/img/1_process/a_certification.png').default}
			alt="Example banner"
		/><br/><em>&lt;A-SPICE CL3 인증&gt;</em>
	</div>
</p>

### 관련활동

* [표준프로세스 구축 ☜ click for more](/docs/mycareer/myprocess#%ED%91%9C%EC%A4%80%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%EA%B5%AC%EC%B6%95)
  * 14.04.01 ~ 16.03.31 : ISO26262 프로세스구축 및 A-SPICE CL2인증
  * 16.04.25 ~ 16.09.20 : A-SPICE CL2/ISO26262 시스템 설계
  * 19.05.20 ~ 19.12.10 : 프로젝트 관리 및 A-SPICE CL3 인증
* [이슈관리 ☜ click for more](/docs/mycareer/myprocess#%EC%9D%B4%EC%8A%88%EA%B4%80%EB%A6%AC)
  * 18.01.18 ~ 18.08.12 : Redmine을 통한 SW품질이슈관리
  * 18.01.23 ~ 19.11.29 : AWS Cloud를 통한 Redmine 환경구축
* [MBD+Agile ☜ click for more](/docs/mycareer/myprocess#mbdagile)
  * 20.08.12 ~ 20.11.13 : GitLab기반 온도 PID제어 MBD
  * 21.11.20 ~ 22.03.21 : GitLab기반 Escalator MBD (KTL 교육용 프로젝트)
* [MBD+AUTOSAR ☜ click for more](/docs/mycareer/myprocess#mbdautosar)
  * 21.01.15 ~ 21.02.16 : AUTOSAR+MBD 개발전략 수립 1차
  * 22.11.01 ~ 22.11.30 : AUTOSAR+MBD 개발전략 수립 2차


## 임베디드

임베디드 개발을 통해 통해 습득한 기술

1. 양산제품 하드웨어/소프트웨어 이슈분석 및 대응
2. 임베디드 리눅스기반 어플리케이션 소프트웨어 개발
3. RTOS기반 실시간 제어시스템 소프트웨어 개발
4. 펌웨어 업데이트용 시리얼통신 부트로더 개발

### 주요경험

전동열차 출입문 제어기 소프트웨어 개발을 담당하여 양산적용하였습니다.

* RTOS기반 이중화 소프트웨어 개발 및 하드웨어 디버깅
* 초도품 품질이슈 대응 및 이슈관리
* 열차 현장운행 시 발생되는 이슈 대응 및 제품 안정화

실차에 적용된 소프트웨어는 현재 정상적으로 현장에서 운행되고 있습니다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed/qYLRAw-hKN8?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;전동열차 출입문 장애물 연속3회 감지 시 완전열림 동작&gt;</em>
</p>

### 관련활동

* [센서 개발 ☜ click for more](/docs/mycareer/myembedded#%EC%84%BC%EC%84%9C-%EA%B0%9C%EB%B0%9C)
  * 10.09.01 ~ 11.08.31 : 다축 Force/Torque센서 상용화 기술 개발
* [리눅스 응용프로그램 개발 ☜ click for more](/docs/mycareer/myembedded#%EB%A6%AC%EB%88%85%EC%8A%A4-%EC%9D%91%EC%9A%A9%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EA%B0%9C%EB%B0%9C)
  * 13.06.09 ~ 16.12.26 : 카드리더기 단말기 uCLinux/Linux 포팅
  * 11.11.28 ~ 13.09.30 : 복합기 인증단말기 개발/유지보수
  * 16.10.03 ~ 17.04.30 : stm32f7에 uCLinux포팅
* [제어기 개발 ☜ click for more](/docs/mycareer/myembedded#%EC%A0%9C%EC%96%B4%EA%B8%B0-%EA%B0%9C%EB%B0%9C)
  * 08.09.01 ~ 09.02.26 : 유도인형 제어기 개발
  * 09.03.16 ~ 09.12.18 : 무인 전기자동차 하위 제어기 개발
  * 17.06.07 ~ 19.04.12 : 열차 측출입문/통로문 제어기 유지보수
  * 18.08.29 ~ 19.01.13 : 열차 측출입문 제어기 양산SW 신규개발
* [부트로더 개발 ☜ click for more](/docs/mycareer/myembedded#%EB%B6%80%ED%8A%B8%EB%A1%9C%EB%8D%94-%EA%B0%9C%EB%B0%9C)
  * 16.10.03 ~ 17.04.30	: RTOS포팅 및 IAP구현
  * 18.12.09 ~ 18.12.10	: UART를 통한 STM FW업데이트
  * 20.05.16 ~ 20.08.10	: PC Python/LIN을 통한 NXP FW업데이트
  * 22.05.22 ~ 22.08.04	: wifi 웹서버를 통한 STM FW업데이트
