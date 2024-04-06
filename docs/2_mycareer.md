---
id: mycareer
title: 컨텐츠별
---
---

프로젝트를 진행할 때 주로 github/gitlab에서 agile 방법론을 이용하여 프로젝트 일정 및 형상관리를 수행해 왔습니다.  
모델기반설계 기법을 이용하여 개발한 알고리즘을 C/C++코드로 자동생성하고, 임베디드 시스템에 통함하여 실시간으로 동작하는 시스템 설계/개발에 관심을 가지고 꾸준히 경험해 왔습니다.

크게 3가지 분야에 관심을 가지고 있으며, 현재는 지금까지의 경험을 모두 통합하여 개발을 진행하는 것에 관심을 가지고 있습니다.
* [임베디드개발](#embed-dev) - 타겟 실시간 구동
* [모델기반설계](#mbd-design) - 로직/알고리즘 개발
* [개발프로세스](#proc-setup) - GitHub/GitLab Agile기반 형상관리/일정관리

---

## 임베디드개발 {#embed-dev}

:::important
다음 기술을 활용하여 임베디드 제품을 개발할 수 있습니다.

* 양산제품 하드웨어/소프트웨어 이슈분석 및 대응
* 임베디드 리눅스기반 어플리케이션 소프트웨어 개발
* RTOS기반 실시간 제어시스템 소프트웨어 개발
* 펌웨어 업데이트용 시리얼통신 부트로더 개발
:::

### 리눅스 응용프로그램 개발

[1. 24.02.02~24.03.28 : BBB Linux포팅 및 Application 개발(Self_Study) [☜ click for more]](/docs/history/embed/linux/eyeRec)  
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed/AgLn7xk26fY?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

[2. 16.10.03~17.04.30 : stm32 f4/f7에 uCLinux포팅(Self_Study) [☜ click for more]](/docs/history/embed/linux/stm32f7#myembedded-linux-stm32f7)  
[&emsp;&emsp;12.10.01~13.09.30 : 카드리더기 단말기 uCLinux/Linux 포팅 [☜ click for more]](/docs/history/embed/linux/stm32f7#myembedded-linux-porting)  
<div style={{width: '75%', textAlign: 'center'}}>
	<img
		src={require('/img/3_embedded/stm32f4_linux.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[3. 11.11.28~13.09.30 : 복합기 인증단말기 Application 개발 및 유지보수 [☜ click for more]](/docs/history/embed/linux/fujixerox)  
<div style={{width: '75%'}}>
	<img
		src={require('/img/3_embedded/img3_1_fujixerox.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 제어기 개발

[1. 17.06.07~19.04.12 : 열차 출입문 제어기 개발 [☜ click for more]](/docs/history/embed/controller/traindoor)  
&emsp;&emsp;전동열차 출입문 장애물 연속3회 감지 시 완전열림 동작  
&emsp;&emsp;장애물1회감지 시 출입문을 약하게 닫고, 2회 3회에는 좀 더 세게 닫음
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed/qYLRAw-hKN8?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

[2. 09.03.16~09.12.18 : 무인 전기자동차 하위 제어기 개발 [☜ click for more]](/docs/history/embed/controller/kuve)  
&emsp;&emsp;무인 상태에서 차량 속도제어로 주행 중 정지 시 브레이크 등 점등 후 정지
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed//rjTcdhceIw4?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

### 원격 펌웨어 업데이트(OTA) 솔루션 개발

[1. 22.05.22~22.08.04 : wifi 웹서버를 통한 STM MCU FW업데이트 [☜ click for more]](/docs/history/embed/controller/iap#myembedded-bootloader-fota)  
[&emsp;&emsp;20.05.16~20.08.10 : PC Python과 LIN부트로더를 통한 NXP MCU FW업데이트 [☜ click for more]](/docs/history/embed/controller/iap#myembedded-bootloader-nxp-iap)  
[&emsp;&emsp;18.12.09~18.12.10 : UART부트로더를 통한 STM MCU FW업데이트 [☜ click for more]](/docs/history/embed/controller/iap#myembedded-bootloader-stm-iap)  
[&emsp;&emsp;16.10.03~17.04.30 : RTOS포팅 및 IAP구현(Self_Study) [☜ click for more]](/docs/history/embed/controller/iap#myembedded-bootloader-iap)  
<div style={{width: '75%'}}>
	<img
		src={require('/img/3_embedded/embedded_bootloader-fota_1.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 센서 개발

[1. 10.09.01~11.08.31 : 다축 Force/Torque센서 상용화 기술 개발 [☜ click for more]](/docs/history/embed/sensor/ftsensor)  
<div style={{width: '75%'}}>
	<img
		src={require('/img/3_embedded/myhistory_3.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[2. 08.09.01~09.02.26 : 유도인형 제어기 개발 [☜ click for more]](/docs/history/embed/sensor/judo)  
<div style={{width: '75%'}}>
	<img
		src={require('/img/3_embedded/img1_1_mju_judo.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

---

## 모델기반설계 {#mbd-design}

:::important
다음 기술을 활용하여 모델기반설계 방식으로 개발을 수행할 수 있습니다.

1. MBD기반 제어로직 설계 및 시뮬레이션 검증
2. MBD기반 제어로직 C코드 자동생성 및 실제 타겟 MCU에서 구동
3. 시뮬레이션-타겟구동 설계 비교검증
:::

### BLDC 선행학습

[1. 23.05.03~23.xx.xx : Sensorless BLDC by Kalman Filter (TBD) [☜ click for more]](/docs/history/mbd/motor/bldc)  
&emsp;&emsp;TBD  
[&emsp;&emsp;22.10.21~22.11.05 : MBD기반 Sensored/Sensorless BLDC 속도제어 [☜ click for more]](/docs/history/mbd/motor/bldc/bldc_spec)  
&emsp;&emsp;BLDC 동작원리를 파악하고, NXP에서 제공되는 MBD 예제를 통해 BLDC 모터를 구동시켜 보았음
<div style={{width: '75%'}}>
	<img
		src={require('/img/2_mbd/bldc_control_hardware.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[3. 16.10.03~17.04.30 : Kalman Filter이론학습(Self_Study) [☜ click for more]](/docs/history/mbd/study/algorithm#mymbd-kalman-therom-study)  
&emsp;&emsp;현대제어 이론 이해 완료  
[&emsp;&emsp;21.04.07~21.05.06 : Kalman Filter 시뮬레이션 [☜ click for more]](/docs/history/mbd/study/algorithm#mymbd-bldc-kalman-simulation-study)  
&emsp;&emsp;2016년에 이해한 이론을 바탕으로 2021년에 칼만필터 시뮬레이션을 통해 동작원리를 파악함  
&emsp;&emsp;(TBD, 시뮬링크 파일 시뮬레이션 동영상 추가)
<div style={{width: '75%'}}>
	<img
		src={require('/img/2_mbd/mymbd-kalman-modeling.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[4. 22.08.14~22.08.29 : FFT MCU 구현 및 Matlab 연동 확인 [☜ click for more]](/docs/history/mbd/study/algorithm)  
&emsp;&emsp;MCU에서 FFT연산 -> Serial 송/수신 -> Matlab에서 FFT Realtime Plot
<div style={{width: '75%'}}>
	<img
		src={require('/img/2_mbd/mymbd-wiper-fft_1.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### MBD 고객대응

[1. 22.03.03~22.05.17 : PSB(안전벨트) 기능로직 MBD구현 선행개발 고객대응[☜ click for more]](/docs/history/mbd/logic/safetybelt)  
&emsp;&emsp;PSB(Pre-safe Seat Belt)모터 구동을 위한 기능별 모터제어 입력신호 프로파일링  
&emsp;&emsp;프로파일링 코드를 MBD로 자동생성하고, 제어기에 통합하여 고객사에 납품함
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed//eV5v-e-QV1A?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

[2. 21.11.20~22.03.21 : Escalator를 통한 GitLab Agile기반 MBD 개발 [☜ click for more]](/docs/history/mbd/logic/escalator)  
&emsp;&emsp;KTL 교육 목적으로 프로젝트를 진행하였으며, 진행 시 일정관리/이슈관리/소스코드형상관리를 수행함  
&emsp;&emsp;처음으로 요구사항/기능을 정의하고, 프로젝트를 관리하면서 개발을 진행한 프로젝트입니다.  
<div style={{width: '75%'}}>
	<img
		src={require('/img/2_mbd/mymbd-esc-overview.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 와이퍼 알고리즘 개발

[1. 22.09.01~22.10.18 : 와이퍼 MBD 제어기설계(관측기,LQR) [☜ click for more]](/docs/history/mbd/motor/wiperMotor#mymbd-wiper-lqr)  
&emsp;&emsp;관측기 및 LQR제어기를 통해 Max 1s주기로 135도 Wiping Angle 상태피드백제어 수행
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed//n_bor37xbMU?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

[2. 21.01.08~21.07.13 : 와이퍼 MBD 기본기능 구현 [☜ click for more]](/docs/history/mbd/motor/wiperMotor#mymbd-wiper-func)  
&emsp;&emsp;Auto Wiping 동작확인
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed/gZ7yAiUIIdw?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

### 윈도우 선행학습

[1. 21.07.30~21.12.31 : 윈도우 MBD 기본기능 구현 [☜ click for more]](/docs/history/mbd/motor/windowMotor#mymbd-window-func)  
&emsp;&emsp;2013년 진행에 이어 장애물 감지 시 윈도우 반전기능을 MBD로 구현하여 타겟MCU에 실제 적용(21년12월)
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed/eEmUgEgfH4k?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

[2. 13.10.01~14.05.16 : 윈도우 MBD 선행학습 [☜ click for more]](/docs/history/mbd/motor/windowMotor#mymbd-window-basic)  
&emsp;&emsp;장애물 감지 시 윈도우 반전 시뮬레이션 및 MicroAutoBox 구현(13년4월~14년3월)
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed/JWzVYKv_Eac?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

### MBD 시작

[1. 20.08.12~20.11.13 : 온도 PID제어 MBD [☜ click for more]](/docs/history/mbd/study/tempPID)  
&emsp;&emsp;GitLab을 통한 프로젝트 관리, MBD프로젝트 처음 진행
<div style={{width: '75%'}}>
	<img
		src={require('/img/1_process/f_process_gitlab_temp_pid.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[2. 07.03.02~08.08.31 : 졸업논문 DC모터 PID제어[☜ click for more]](/docs/history/mbd/paper/skeleton)  
&emsp;&emsp;센서 입력에 따른 모터 PID제어  
&emsp;&emsp;C코드 자동생성 없이 제어시스템을 분석하는데 Matlab/Simulink를 처음으로 사용함
<div style={{position: 'relative', width: '75%', paddingBottom: '56.25%'}}>
	<iframe
		src="https://www.youtube.com/embed/Bdt_fOkhiw8?rel=0"
		style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
		frameBorder="0"
		allowFullScreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</div>

---

## 개발프로세스 {#proc-setup}

:::important
다음의 프로세스 및 기법을 통해 프로젝트를 관리할 수 있습니다.

* A-SPICE/ISO26262를 통한 프로세스 구축
* 프로세스 기반 선루프/윈도우 시스템 설계
* Redmine을 통한 이슈 및 품질관리
* Github/Gitlab 기반 Agile 프로젝트 관리
:::

### Agile 프로잭트

[1. 24.02.01~24.03.28 : Github를 통한 Agile기반 리눅스 프로젝트 일정 및 이슈관리 [☜ click for more]](/docs/history/embed/linux/eyeRec#eyeRec-progress)  
&emsp;&emsp;Beaglebone Black Linux 플랫폼에서 C++ 기반 IOT 어플리케이션 개발 (영상 자동기록장치)
<div style={{width: '75%'}}>
	<img
		src={require('/img/5_eyeRec/eyeRec_dev_progress.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[2. 21.12.01 ~ 22.03.21 : Github를 통한 Agile기반 MBD 프로젝트 일정 및 이슈관리 [☜ click for more]](/docs/history/mbd/logic/escalator#myprocess-mbdagile-esc-progress)  
&emsp;&emsp;Simulink를 이용한 알고리즘 개발 (에스컬레이터)
<div style={{width: '75%', textAlign: 'center'}}>
	<img
		src={require('/img/2_mbd/mymbd-esc-gitlab-schedule-mgn.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/><br/><em>&lt;Github와 Gantt차트를 연동한 프로젝트 일정관리&gt;</em>
</div>

[3. 23.02.02~23.04.25 : Github를 통한 Agile기반 임베디드 프로젝트 일정 및 이슈관리 [☜ click for more]](/docs/history/embed/controller/smartdoor/sd_spec#ews2-management)  
&emsp;&emsp;Github 환경에서 프로젝트 일정 및 이슈관리 (스마트 도어)
<div style={{width: '75%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_summary_plan.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 표준프로세스 구축

[1. 22.12.02~22.12.26 : A-SPICE를 준수하는 소프트웨어 컴포넌트 MBD개발 프로세스 구축 [☜ click for more]](/docs/history/proc/std_proc#myprocess-esc-swc-by-mbd-aspice)  
&emsp;&emsp;예제를 통해 요구사양서-설계사양서-모델-코드-테스트스펙-테스트레포트 추적성을 확보하면서 개발을 진행해 봄으로써 MBD를 통해 A-SPICE를 준수하는 프로세스를 구축함  
<div style={{width: '75%'}}>
	<img
		src={require('/img/1_process/swc_dev_process_by_mbd_and_aspice.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[2. 19.11.14~20.05.31 : A-SPICE 대응 선루프 시스템 설계 [☜ click for more]](/docs/history/proc/std_proc#myprocess-std-sys-design-sunroof)  
<div style={{width: '75%'}}>
	<img
		src={require('/img/1_process/c_process_sunroof_sysads.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[3. 19.05.20~19.12.10 : 프로젝트 관리 및 A-SPICE CL3 인증 [☜ click for more]](/docs/history/proc/std_proc#myprocess-std-cl3)  
<p align="left">
	<img
		src={require('/img/1_process/a_certification_cl3.png').default}
		width="200"
		alt="Example banner"
	/>
</p>

[4. 14.04.01~16.09.20 : A-SPICE CL2 인증 및 ISO26262 윈도우 시스템 설계 [☜ click for more]](/docs/history/proc/std_proc#myprocess-std-sys-design-window)  
<div style={{width: '75%'}}>
	<img
		src={require('/img/1_process/process_iso26262_function_Architecture.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>
<p align="left">
	<img
		src={require('/img/1_process/a_certification_cl2.png').default}
		width="200"
		alt="Example banner"
	/>
</p>


### 이슈관리

[1. 19.09.10~20.09.10 : AWS Cloud를 통한 Redmine 환경구축 [☜ click for more]](/docs/history/proc/std_proc#myprocess-management-aws-redmine)  
&emsp;&emsp;AWS Cloud 환경에서 Redmine을 통한 이슈관리, 이슈와 SVN연동
<div style={{width: '75%'}}>
	<img
		src={require('/img/1_process/e_process_aws_redmine_with_phone.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[2. 18.01.18~18.08.12 : Redmine을 통한 열차출입문제어기SW 품질이슈 관리 [☜ click for more]](/docs/history/proc/std_proc#myprocess-management-redmine)  
<div style={{width: '75%'}}>
	<img
		src={require('/img/1_process/d_process_train_issue_mgn.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>
