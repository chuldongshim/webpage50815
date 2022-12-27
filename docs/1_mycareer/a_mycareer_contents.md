---
id: contents
title: 1. 컨텐츠별
---
---

다음 3가지 분야를 관심과 흥미를 가지고 꾸준히 경험해 왔습니다. [[career-excel]](https://docs.google.com/spreadsheets/d/1IEfmGKft0ClDigiTWpDMb05anEFAgLyUKv18ROo-rVE/edit?usp=sharing)

* [모델기반설계](/docs/mycareer#mycareer-mbd)
* [개발프로세스](/docs/mycareer#mycareer-process)
* [임베디드개발](/docs/mycareer#mycareer-embed)

---

## 모델기반설계 {#mycareer-mbd}

:::important
다음 기술을 활용하여 모델기반설계 방식으로 개발을 수행할 수 있습니다.

1. MBD기반 제어로직 설계 및 시뮬레이션 검증
2. MBD기반 제어로직 C코드 자동생성 및 실제 타겟 MCU에서 구동
3. 시뮬레이션-타겟구동 설계 비교검증
:::

### BLDC 선행학습

1. [추후계획 : Sensorless BLDC by Kalman Filter [☜ click for more]](/docs/mycareer/mymbd#mymbd-bldc-plan)
2. [22.10.21~22.11.05 : MBD기반 Sensored BLDC 속도제어 [☜ click for more]](/docs/mycareer/mymbd#mymbd-bldc-sensered)
3. [16.10.03~17.04.30 : Kalman Filter 이론학습 및 시뮬레이션 [☜ click for more]](/docs/mycareer/mymbd#mymbd-bldc-kalman)
<p align="left">
	<img
		src={require('/img/2_mbd/mymbd-kalman-modeling.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

### 와이퍼 알고리즘 개발

1. [22.09.01~22.10.18 : MBD기반 와이퍼 제어기설계 (관측기,LQR) [☜ click for more]](/docs/mycareer/mymbd#mymbd-wiper-lqr)  
관측기 상태피드백을 통한 LQR제어
<p align="left">
	<iframe 
		src="https://www.youtube.com/embed//n_bor37xbMU?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>
2. [22.08.14~22.08.29 : FFT MCU 구현 [☜ click for more]](/docs/mycareer/mymbd#mymbd-wiper-fft)  
MCU에서 FFT연산 -> Serial 송/수신 -> Matlab에서 FFT Realtime Plot
<p align="left">
	<img
		src={require('/img/2_mbd/mymbd-wiper-fft_1.png').default}
		width="450"
		alt="Example banner"
	/>
</p>
3. [21.01.08~21.07.13 : MBD기반 와이퍼 기본기능구현 [☜ click for more]](/docs/mycareer/mymbd#mymbd-wiper-func)  
Auto Wiping 동작확인
<p align="left">
	<iframe
		src="https://www.youtube.com/embed/gZ7yAiUIIdw?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>

### MBD고객대응

1. [22.03.03~22.05.03 : MBD기반 PSB(안전벨트) 기능로직 구현 [☜ click for more]](/docs/mycareer/mymbd#mymbd-customer-psb)  
PSB(Pre-safe Seat Belt)모터 구동을 위한 기능별 모터제어 입력신호 프로파일링  
프로파일링 코드를 MBD로 자동생성하고, 제어기에 통합하여 고객사에 납품함
<p align="left">
	<iframe 
		src="https://www.youtube.com/embed//eV5v-e-QV1A?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>

### 윈도우 선행학습 {#mycareer-mbd-window}

1. [21.07.30~21.12.31 : MBD기반 Safety Power Window 기능구현 [☜ click for more]](/docs/mycareer/mymbd#mymbd-window-func)  
2013년 진행에 이어 장애물 감지 시 윈도우 반전 타겟MCU에 실제 구현/적용(21년12월)
<p align="left">
	<iframe
		src="https://www.youtube.com/embed/eEmUgEgfH4k?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>
2. [13.10.01~14.05.16 : MBD기반 MicroAutoBox를 통한 Window 기본기능 구동 [☜ click for more]](/docs/mycareer/mymbd#mymbd-window-basic)  
장애물 감지 시 윈도우 반전 시뮬레이션 및 MicroAutoBox 구현(13년4월~14년3월)
<p align="left">
	<iframe 
		src="https://www.youtube.com/embed/JWzVYKv_Eac?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>

### MBD 시작

1. [07.03.02~08.08.31 : 졸업논문 [☜ click for more]](/docs/mycareer/mymbd#mymbd-start-graduation)  
센서 입력에 따른 모터 PID제어  
C코드 자동생성 없이 제어시스템을 분석하는데 Matlab/Simulink를 처음으로 사용함
<p align="left">
	<iframe 
		src="https://www.youtube.com/embed/Bdt_fOkhiw8?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>

---

## 개발프로세스 {#mycareer-process}

:::important
다음의 프로세스 및 기법을 통해 프로젝트를 관리할 수 있습니다.

* A-SPICE/ISO26262를 통한 프로세스 구축
* 프로세스 기반 선루프/윈도우 시스템 설계
* Redmine을 통한 이슈 및 품질관리
* Github/Gitlab 기반 Agile 프로젝트 관리
:::

### SwC 개발 프로세스

1. TBD : AUTOSAR ASW 개발  
기존에 개발한 PSB 프로파일링로직을 Non-AUTOSAR/AUTOSAR에 모두 사용 가능한 SwC로 개발
2. [22.11.30~ : Escalator SwC 개발 [☜ click for more]](/docs/mycareer/myprocess##myprocess-escalator-swc)  
요구사양서-설계사양서-모델-코드-테스트스펙-테스트레포트 추적성을 확보하면서 개발
3. [22.11.01~22.11.30 : 개발전략 수립 2차 [☜ click for more]](/docs/mycareer/myprocess#myprocess-mbdautosar-strategy2)  
4. [21.01.15~21.02.16 : 개발전략 수립 1차 [☜ click for more]](/docs/mycareer/myprocess#myprocess-mbdautosar-strategy1)

### MBD+Agile {#mycareer-process-agile}

1. [21.11.20~22.03.21 : GitLab기반 Escalator MBD [☜ click for more]](/docs/mycareer/myprocess#myprocess-mbdagile-escalator)  
KTL 교육 목적으로 프로젝트 진행, 일정관리, 이슈관리, 소스코드 형상관리 수행
<p align="left">
	<img
		src={require('/img/1_process/f_process_gitlab_Escalator.png').default}
		alt="Example banner"
		width="450"
	/><br/>
</p>

2. [20.08.12~20.11.13 : GitLab기반 온도 PID제어 MBD [☜ click for more]](/docs/mycareer/myprocess#myprocess-mbdagile-temperature)  
GitLab을 통한 프로젝트 관리, MBD프로젝트 처음 진행
<p align="left">
	<img
		src={require('/img/1_process/f_process_gitlab_temp_pid.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

### Redmine 이슈관리

1. [18.01.23~19.11.29 : AWS Cloud를 통한 Redmine 환경구축 [☜ click for more]](/docs/mycareer/myprocess#myprocess-management-aws-redmine)  
AWS Cloud 환경에서 Redmine을 통한 이슈관리, 이슈와 SVN연동
<p align="left">
	<img
		src={require('/img/1_process/e_process_aws_redmine_with_phone.png').default}
		width="450"
		alt="Example banner"
	/>
</p>
2. [18.01.18~18.08.12 : Redmine을 통한 SW품질이슈관리 [☜ click for more]](/docs/mycareer/myprocess#myprocess-management-redmine)
<p align="left">
	<img
		src={require('/img/1_process/d_process_train_issue_mgn.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

### 표준프로세스 구축

1. [19.05.20~19.12.10 : 프로젝트 관리 및 A-SPICE CL3 인증 [☜ click for more]](/docs/mycareer/myprocess#myprocess-std-cl3)
<p align="left">
	<img
		src={require('/img/1_process/a_certification_cl3.png').default}
		width="200"
		alt="Example banner"
	/>
</p>
2. [16.04.25~16.09.20 : A-SPICE CL2/ISO26262 시스템 설계 [☜ click for more]](/docs/mycareer/myprocess#myprocess-std-sys-design)
3. [14.04.01~16.03.31 : ISO26262 프로세스구축 및 A-SPICE CL2인증 [☜ click for more]](/docs/mycareer/myprocess#myprocess-std-cl2)
<p align="left">
	<img
		src={require('/img/1_process/a_certification_cl2.png').default}
		width="200"
		alt="Example banner"
	/>
</p>

---

## 임베디드개발 {#mycareer-embed}

:::important
다음 기술을 활용하여 임베디드 제품을 개발할 수 있습니다.

* 양산제품 하드웨어/소프트웨어 이슈분석 및 대응
* 임베디드 리눅스기반 어플리케이션 소프트웨어 개발
* RTOS기반 실시간 제어시스템 소프트웨어 개발
* 펌웨어 업데이트용 시리얼통신 부트로더 개발
:::

### 부트로더 개발 {#mycareer-embed-fota}

1. [22.05.22~22.08.04 : wifi 웹서버를 통한 STM FW업데이트 [☜ click for more]](/docs/mycareer/myembedded#myembedded-bootloader-fota)
<p align="left">
	<img
		src={require('/img/3_embedded/embedded_bootloader-fota_1.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

2. [20.05.16~20.08.10 : PC Python/LIN을 통한 NXP MCU FW업데이트 [☜ click for more]](/docs/mycareer/myembedded#myembedded-bootloader-nxp-iap)

3. [18.12.09~18.12.10 : UART를 통한 STM MCU FW업데이트 [☜ click for more]](/docs/mycareer/myembedded#myembedded-bootloader-stm-iap)

4. [16.10.03~17.04.30 : RTOS포팅 및 IAP구현 [☜ click for more]](/docs/mycareer/myembedded#myembedded-bootloader-iap)

### 제어기 개발 {#mycareer-embed-train}

1. [17.06.07~19.01.13 : 열차 출입문 제어기 개발 [☜ click for more]](/docs/mycareer/myembedded#myembedded-controller-train)  
전동열차 출입문 장애물 연속3회 감지 시 완전열림 동작
<p align="left">
	<iframe
		src="https://www.youtube.com/embed/qYLRAw-hKN8?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>
2. [09.03.16~09.12.18 : 무인 전기자동차 하위 제어기 개발 [☜ click for more]](/docs/mycareer/myembedded#myembedded-controller-kist)  
무인 상태에서 차량 속도제어로 주행 중 정지 시 브레이크 등 점등 후 정지
<p align="left">
	<iframe 
		src="https://www.youtube.com/embed//rjTcdhceIw4?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>
3. [08.09.01~09.02.26 : 유도인형 제어기 개발 [☜ click for more]](/docs/mycareer/myembedded#myembedded-controller-judo)  
<p align="left">
	<img
		src={require('/img/3_embedded/img1_1_mju_judo.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

### 리눅스 응용프로그램 개발

1. [16.10.03~17.04.30 : stm32f7에 uCLinux포팅 [☜ click for more]](/docs/mycareer/myembedded#myembedded-linux-stm32f7)
<p align="left">
	<img
		src={require('/img/3_embedded/img3_1_fujixerox.png').default}
		width="450"
		alt="Example banner"
	/>
</p>
2. [11.11.28~13.09.30 : 복합기 인증단말기 개발/유지보수 [☜ click for more]](/docs/mycareer/myembedded#myembedded-linux-maintenance)  
3. [13.06.09~16.12.26 : 카드리더기 단말기 uCLinux/Linux 포팅 [☜ click for more]](/docs/mycareer/myembedded#myembedded-linux-porting)  

### 센서 개발

1. [10.09.01~11.08.31 : 다축 Force/Torque센서 상용화 기술 개발 [☜ click for more]](/docs/mycareer/myembedded#myembedded-sensor-ft)
<p align="left">
	<img
		src={require('/img/3_embedded/myhistory_3.png').default}
			width="450"
		alt="Example banner"
	/>
</p>
