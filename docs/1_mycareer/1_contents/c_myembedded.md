---
id: myembedded
title: 임베디드개발 경력상세
---
---
<b><big>[목차]</big></b>

* [1. 부트로더 개발](#myembedded-bootloader)
  * [22.05.22~22.08.04 : 1.1 wifi 웹서버를 통한 STM MCU FW업데이트 [☜ click for side project]](#myembedded-bootloader-fota)
  * [20.05.16~20.08.10 : 1.2 PC Python과 LIN부트로더를 통한 NXP MCU FW업데이트](#myembedded-bootloader-nxp-iap)
  * [18.12.09~18.12.10 : 1.3 UART부트로더를 통한 STM MCU FW업데이트](#myembedded-bootloader-stm-iap)
  * [16.10.03~17.04.30 : 1.4 RTOS포팅 및 IAP구현(Self_Study)](#myembedded-bootloader-iap)
* [2. 제어기 개발](#myembedded-controller)
  * [17.06.07~19.04.12 : 2.1 열차 출입문 제어기 개발](#myembedded-controller-train)
  * [09.03.16~09.12.18 : 2.2 무인 전기자동차 하위 제어기 개발](#myembedded-controller-kist)
  * [08.09.01~09.02.26 : 2.3 제어기 개발 시작](#myembedded-controller-start)
* [3. 리눅스 응용프로그램 개발](#myembedded-linux)
  * [16.10.03~17.04.30 : 3.1 stm32f7에 uCLinux포팅(Self_Study)](#myembedded-linux-stm32f7)
  * [12.10.01~13.09.30 : 3.2 카드리더기 단말기 uCLinux/Linux 포팅](#myembedded-linux-porting)
  * [11.11.28~13.09.30 : 3.3 복합기 인증단말기 개발/유지보수](#myembedded-linux-maintenance)
* [4. 센서 개발](#myembedded-sensor)
  * [10.09.01~11.08.31 : 4.1 다축 Force/Torque센서 상용화 기술 개발](#myembedded-sensor-ft)
---

## 1. 부트로더 개발 {#myembedded-bootloader}

### [1.1 wifi 웹서버를 통한 STM MCU FW업데이트 [☜ click for side project]](/docs/sideprj/hybrid#embed-ota-webserver-summary) {#myembedded-bootloader-fota}

#### ESP32 Embedded WebServer를 통한 stm32f746 OTA

센서신호를 신호처리 알고리즘을 적용하여 필터링을 수행하고, 무선 데이터 송/수신을 통해 휴대폰으로 처리 결과를 확인할 수 있는 모니터링 시스템을 개발하는 것을 목적으로 개인 프로젝트를 진행하고 있습니다.

<p align="center">
	<img
		src={require('/img/fourth_wifi_ota.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

#### 통합 시뮬레이터 (TBD) {#myembedded-bootloader-integrate}

* OTA, TFT-LCD, Wifi/BLE 기능 통합 시뮬레이터
* mBed RTOS 기반
  * 코드 재사용을 위한 C/C++ 모듈화 프로그래밍
	* Mbed에서 C++ 기반 임베디드 소프트웨어 개발
* MPU6050를 통한 신호처리 로직 추가
  * FIR/IIR필터를 통해 입력신호 필터링 -> TFT-LCD Display
  * 입력신호 FFT -> TFT-LCD Display
  * Kalman Filter룰 이용한 모터제어 알고리즘 개발 적용(Kalman Filter 이론학습 및 시뮬레이션 완료)

X-CUBE-DSPDEMO by stm32f4-disco
* _[중요]AN4841 - CMSIS로 stm32f429와 stm32f746에서 FFT 구현.pdf
* en.x-cube-dspdemo_AN4841.zip

구현결과 동영상 추가할 것
* MPU6050 FIR필터링 동영상
* MPU6050 IIR필터링 동영상
* MPU6050 Kalman필터링 동영상

### 1.2 PC Python과 LIN부트로더를 통한 NXP MCU FW업데이트 {#myembedded-bootloader-nxp-iap}

* 기간 : 20.07.20 ~ 20.09.22 (책임 2년)

:::note History
* 개발이유
  * 차량용 제어기는 차량에 조립이 완료되면 차량을 뜯지 않는 이상 에뮬레이터를 연결하여 펌웨어를 업데이트 할 수가 없다.
  * LIN or CAN은 외부에 포트가 나와 있기 때문에 LIN or CAN을 통해 펌웨어를 업데이트 하면 차량을 뜯지 않고 업데이트가 가능하다.
* 성과
  * Python 언어 사용법 학습
  * 부트로더 작동원리를 파악했기 때문에 통신 방법을 특정하지 않고, 모든 통신에 부트로더 직접 개발/적용 가능함.
:::

\7_ESRBL\ 내용 정리
\workspace_gitlab\nxpiap\ 소스추가

#### 부트로더 및 펌웨어 실행 절차

<p align="center">
	<img
		src={require('/img/3_embedded/bootloader_1.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Memory Address Allocation&gt;</em>
</p>

* 1단계 : Reset Vector Address(메모리 시작 위치)에 부트로더를 빌드하여 Bootloader.bin 생성
* 2단계 : Firmware Address(메모리 특정 위치)에 펌웨어를 빌드하여 Firmware.bin 생성
* 3단계 : 디버거를 통해 Reset Vector Address(메모리 시작 위치)에 Bootloader downloading
* 4단계 : Reset 후 Bootloader 실행 -> Trigger 발생시 부트모드에서 대기
* 5단계 : Python으로 개발한 Updater를 통해 LIN으로 Firmware Address(메모리 특정 위치)에 Firmware downloading
* 6단계 : downloading 완료 후 자동으로 MCU Reset 수행
* 7단계 : Reset 후 Bootloader 실행 -> Trigger 미발생 시 Firmware Address로 Jump하여 downloading한 Appilcation 실행

#### 소프트웨어

nxp(mc9s12zvmb48) 펌웨어 업데이터 개발은 3개의 소프트웨어로 구성되며, 각 소프트웨어 기능은 다음과 같다.
* LinBLmc9s12zvmb48 (nxpiap - Bootloader)
  * mc9s12zvmb48 타겟 보드 상에서 동작하는 부트로더
  * Python으로부터 수신한 패킷을 메모리 상의 특정 주소로 Write하고, Update 된 이미지를 실행
* LinFWmc9s12zvmb48 (application)
  * mc9s12zvmb48 타겟 보드 상에서 동작하는, 제품의 특정 기능을 수행하는 소프트웨어
  (e.g. 열립버튼 입력 시 Window를 Open 동작을 수행하는 Sunroof System)
* LinMonitor (updater)
  * PC에서 동작하는 Phython 기반 소프트웨어
  * 타겟 Image(Hex파일)를 읽어 패킷으로 만든 후 LIN 통신을 통해 타겟 보드로 이미지 전송
  * LIN통신을 통해 타겟 보드의 상태(F/W Update 여부, 동작 상태 등)를 모니터링


#### nxpiap - bootloader

다음과 같이 nxp에서 제공하는 bootloader flow diagram에 따라 bootloader 개발을 진행하였다.

<p align="center">
	<img
		src={require('/img/3_embedded/bootloader_2.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;bootloader flow diagram&gt;</em>
</p>

#### application

Application이 Application Address부터 시작되도록 펌웨어를 빌드해야 한다.

#### LIN Updater

컴파일을 통해 생성되는 binary 파일을 다음과 같이 분석하여 binary파일을 패킷단위 쪼개어 Bootloader로 전송한다.

<p align="center">
	<img
		src={require('/img/3_embedded/bootloader_3.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Binary(Compiled Image) Analysis&gt;</em>
</p>

5단계에서 부트로더를 통해 펌웨어를 실행시키기 위해서는 펌웨어를 Application Address에 다운로딩 해야 한다.
Firmware를 메모리의 특정 위치에 다운로딩 하기 위해 Python을 이용하여 Updater 프로그램을 다음과 같이 개발하였다.

<p align="center">
	<img
		src={require('/img/3_embedded/bootloader_4.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Binary(Compiled Image) Analysis&gt;</em>
</p>

#### 추후 진행할 개인 프로젝트
* Master/Slave 구조를 갖는 시스템(열차 출입문은 Master MCU가 7개의 Slave MCU를 제어함)의 경우 Master 펌웨어만 업데이트 하면 자동으로 나머지 7개의 Slave 펌웨어를 업데이트하는 부트로더 개발
* Server/Client 구조를 갖는 시스템의 경우 서버에 펌웨어를 업데이트 하면 특정 시간에 Slave가 자동으로 펌웨어를 업데이트 하는 부트로더 개발

### 1.3 UART부트로더를 통한 STM MCU FW업데이트 {#myembedded-bootloader-stm-iap}

### 1.4 RTOS포팅 및 IAP구현(Self_Study) {#myembedded-bootloader-iap}

:::note History
* 성과
  * 이때(2017년) 습득한 기술은 추후(2018년) 열차출입문제어기에 적용하였읍
  * 적용전 : 에뮬레이터를 연결하여 펌웨어 업데이트 수행
  * 적용후 : 에뮬레이터 없이 시리얼 통신으로 펌웨어 업데이트 수행
:::

* IAP(시리얼 펌웨어 업데이트) 부트로더를 통한 uart, usb, http 펌웨어 업데이트
* 열차출입문제어기에 IAP 적용
  * 개발한 부트로더 적용을 통해 소프트웨어 업데이트 시간 단축
  * 열차 노이즈 유입으로 잦은 에뮬레이터 고장 발생 -> 에뮬레이터 재구매 안함


## 2. 제어기 개발 {#myembedded-controller}

### 2.1 열차 출입문 제어기 개발 {#myembedded-controller-train}

* [수행업무](http://www.icsys.co.kr/s2/s2_5.php)
  * 양산/필드 대응 (현재 소사원시, 수인선, 과천안산선 운행중)
  * 프로젝트 관리 역할 수행
  * RTOS기반 이중화 소프트웨어 개발 및 하드웨어 디버깅
  * 초도품 품질이슈 대응 및 이슈관리
  * 열차 현장운행 시 발생되는 이슈 대응 및 제품 안정화

#### 열차 측출입문 제어기 양산SW 신규개발

* 소속 : [인터콘시스템스](http://www.icsys.co.kr/s2/s2_5.php)
* 기간 : 18.08.29~19.01.13
* 역할 : 열차 출입문 양산 안정화 및 신규 개발 앙산적용

전동열차출입문제어기 소프트웨어 개발을 담당하여 양산적용하였고, 실차에 적용된 소프트웨어는 현재 정상적으로 현장에서 운행되고 있습니다.

* 소프트웨어 신규 개발
  * 통로문, 측출입문 2개 시스템에 대하여 FreeRTOS Multi-Task 기반의 소프트웨어 개발 신규 진행
  * 개발 산출물 작성 및 고객사(현대로템, 코레일) 대응
  소프트웨어 요구사항 명세서 -> 소프트웨어 설계 명세서 -> 코딩 -> 소프트웨어 시험 절차서 -> 소프트웨어 시험 보고서 작성
  * UML기반 소프트웨어 설계  
  Rhapsody를 통한 소프트웨어 설계 (`Software Architecture & Design Specification_v1_190308.docx` 문서내용 정리)  
  EA를 통해 사양서 기술(`코레일128량 통로문 소프트웨어 설계 규격서_v06_수정후.docx` 문서내용 정리)


#### 열차 측출입문/통로문 제어기 유지보수

* 소속 : [인터콘시스템스](http://www.icsys.co.kr/s2/s2_5.php)
* 기간 : 17.06.07~19.04.12
* 역할 : 소사원시/수인선 납품 제어기 SW품질이슈 대응 및 안정화

코드 개발부터 양산/필드대응까지 소프트웨어 개발 관련 모든 업무를 직접 수행하였습니다. 이곳에서 프로젝트를 관리하기 위한 스킬을 쌓았으며, 업무를 수행하면서 실무에 적용가능하고, 실질적으로 도움이 되는 프로세스를 수립하기 위해 많은 고민을 하였습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img5_1_train_door.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* 기존 소프트웨어 유지보수
  * 신사업(고객사 첫 납품)으로 진행된 제품에 대한 소프트웨어 품질문제 현장 대응 및 제품 안정화
  * 기존에 개발된 소프트웨어 유지보수 및 소프트웨어 품질관리
  * 품질이슈 해결사례 기술 - 고장 발생 시 닫힘동작 계속 Retry
  * 오픈소스 툴을 활용한 프로젝트 관리 (SVN을 통한 소스 이력관리, Redmine을 통한 이슈관리)
* 장애물 3회감지(1,2,3회로 갈수록 장애물 감지 시 도어 닫힘력이 높아짐) 후 열림완료동작 시험

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//qYLRAw-hKN8?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 3회 감지 시 열림동작&gt;</em>
</p>

IBM Rhapsody UML로 설계한 시스템 아키텍처 이미지 추가

### 2.2 무인 전기자동차 하위 제어기 개발 {#myembedded-controller-kist}

* 전기차 하위 인터페이스 제어기 개발/제작/관리 및 유지보수
* 기간 : 2009.03 ~ 2009.12
* 소속 : 한국과학기술연구원 인턴

차량핸들은 직접 제어하고, 차량속도는 악셀에 부착된 센서 정보를 인터페이스 제어기가 velocity 정보를 바탕으로 대신 생성하여 차량 제어기에 전달하는 인터페이스 제어기 개발업무를 수행하였습니다.  
차량 종방향제어(핸들제어) - absolute angle 센서 피드백을 통해 하위 인터페이스 제어기가 DC모터를 직접 제어하여 핸들제어  
횡방향제어(차량속도제어) - 상위제어기로부터 수신된 Angle, Velocity 정보와 피드백 정보로부터 모터 출력을 계산하고 모터제어기로 출력명령을 전달하여 차량속도제어  
얕은 지식으로 하고 싶다는 마음 하나로 낮/밤, 주말 가리지 않고 될 때까지 했었던 것 같습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img1_1_kist.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* ARM7(at91sam7x) 이용 제어기 개발
* Anolog to Digital & Digital to Analog의 신호처리
* 차량속도(Accel) 및 조향포지션(Handle) 피드백제어
* 속도/조향 센서 및 각종 IO 인터페이스 (Encoder, 통신(SPI, CAN, UART), Relay0External IO 등)
* 제어시퀀스 알고리즘 구상 및 적용
* 피드포워드 입력을 통한 제어신호 재성성
* 상위제어기로부터 전송되는 경로에 대한 차량 선속도 및 각도 명령을 플랫폼 제어기에서 실시간 제어
* 무인차 구동 중 고려되어야 하는 모든 Action에 대한 처리 구현
(유/무선 비상정지, 후진 시 Brake 등 점등, 차량제어 수/자동 전환 등)

[전기차 속도제어 실험](https://www.hellodd.com/news/articleView.html?idxno=29509)

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//rjTcdhceIw4?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;무인 상태에서 차량 속도제어&gt;</em>
</p>

### 2.3 제어기 개발 시작 {#myembedded-controller-start}

학부생활동안 FND 디지털 시계 및 디지털 도아락 제작 활동을 통해 임베디드 개발에 대한 꿈을 키웠습니다.
FND 디지털 시계
* Intel 80196 마이크로프로세스 학습
  * FND를 통한 시계 만들기
  * RAM Execution
  * address bus 기반 디바이스 컨트롤
* Atmega 8535 마이크로프로세스 학습
  * 디지털 도어락 만들기
  * 비밀번호를 EEPROM에 저장하고, 키패드를 통해 비밀번호를 누르면 액츄에이터(RC모터)를 돌려 잠금해제 동작을 수행

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//alL_y9gymNU?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
</p>

프로젝트를 통해 개발에 대한 경험을 쌓을 수 있었습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img1_1_mju_judo.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

문화체육관광부 주관, 용인대 주최
* 담당
  * ARM7(at91sam7s)을 이용한 유도인형 제어기 개발
  * Pro-e를 이용한 유도인형 기구부 설계 아이디어 제안 및 3D 개념설계
  * Visual C++를 이용한 힘센서 모니터링 프로그램 MFC Programming
* 개발내용
  * 힘센서(로드셀)의 아날로그 하드웨어 신호처리
  * 힘센서데이터 DAQ 및 데이터 PC Display
  * 파우더브레이크를 이용한 유도로봇 몸통 및 좌우다리 제동력 조절


## 3. 리눅스 응용프로그램 개발 {#myembedded-linux}

### 3.1 stm32f7에 uCLinux포팅(Self_Study) {#myembedded-linux-stm32f7}

* stm32f4-discovery에 uClinux 포팅

포팅로그 이미지 추가

### 3.2 복합기 인증단말기 개발/유지보수 {#myembedded-linux-maintenance}

* 단말기를 통한 복합기 인증 솔루션 개발
* 소속 : 한국후지제록스
* 기간 : 2011.11 ~ 2013.10 (사원 2년)
  * Linux 및 uClinux 포팅
	* Embedded Linux 기반 tcp/ip 네트워크 어플리케이션 개발
	* C++ Multi-thread 기반 TCP/IP Server Programming
  * [인증용단말기 SW 양산개발](https://www.fujixerox.co.kr/ko-KR/Products/KR-Software/Printing-Management)
  * [복합기-결재 단말기 연동 동영상](https://www.youtube.com/watch?v=ArtCujt2TUQ)

임베디드 리눅스를 직접 경험하고, 리눅스 기반 application을 개발하는 역할을 수행하였습니다. 리눅스라는 OS와 친해지고 싶은 마음이 생기는 계기가 되었습니다. 이후 자동차 분야로 업종을 변경하여 아지까지 리눅스에 대한 아쉬음이 많이 남아 있으며, 앞으로 꾸준히 시간을 투자하여 임베디드 리눅스 상에서 동작하는 네트워크 소프트웨어를 개발할 계획을 가지고 있습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/myhistory_4.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;그림제목&gt;</em>
</p>

[인증 단말기 개발 및 유지보수](https://m.blog.naver.com/PostView.nhn?blogId=humanwr&logNo=220517005542&proxyReferer=https:%2F%2Fwww.google.com%2F)

<p align="center">
	<img
		src={require('/img/3_embedded/img3_1_fujixerox.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* CPU 재고 소진으로 대체 CPU를 이용한 단말기 개발
  * 스펙결정 및 보드생산 외주업체 선정
  * 대체 단말기 ARM9 Embedded Linux(Bootloader, Kernel, Filesystem 등) 포팅작업 진행 (Embedded Linux)
  * 대체 단말기에서 기존 단말기 펌웨어 기능 재현
(사원증 인식-서버와 TCP/IP통신을 통한 인증확인 - RS422통신을 통한 복합기 제어)
* 유지보수
  * 단말기 TCP/IP 통신을 위한 고객사 별 네트워크 환경에 따른 대응
(원격 접속, 망분리 서버 접근, 서버-클라언트 패킷 확인)
* 인증서버 개발 (C++ Multi-thread programming)
  * 단말기와 인증 서버 간 통신(TCP/IP) 프로토콜 정의
  * 단말기로부터 수신한 인증 정보를 DB(MS-SQL)에서 조회한 후 인증 결과 단말기로 송신
  * 인증 성공 시 문서관리 솔루션 정책에 따른 출력 동작 수행
* MMU가 없는 MCU uClinux(mln7400) 및 linux kernel 2.6(mlc3700) 포팅 - IO device driver 구현/확인

### 3.3 카드리더기 단말기 uCLinux/Linux 포팅 {#myembedded-linux-porting}

* 2440에 ARM9 Linux 포팅
  * 기간 : 2011.11 ~ 2013.10 (사원 2년)
  * 소속 : 한국후지제록스

<p align="center">
	<img
		src={require('/img/3_embedded/img3_2_arm9_linux_porting.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;S3C2440 ARM9에 Embedded Linux 포팅&gt;</em>
</p>


## 4. 센서 개발 {#myembedded-sensor}

### 4.1 다축 Force/Torque센서 상용화 기술 개발 {#myembedded-sensor-ft}

* 삼성전자HME 사업부 주관 다축 Force/Torque 센서 개발
* 소속 : 연세대 자동화기술연구소 계약직 연구원
* 기간 : 2010.09 ~ 2011.09
* 역할 : 상용화기술 개발[(추후 XGEO GC80에 적용됨)](https://www.youtube.com/watch?v=eEmyj61OwYo)

무식하면 용감하다는 얘기가 있듯이 아무것도 모르는 상태에서 포부만으로 기구부, 하드웨어, 소프트웨어 설계를 모두 수행하였습니다. 독학으로 PCB 설계를 학습하여 보드를 직접 제작하였습니다. 제 능력을 넘어서는 일을 맡아 두려움이 컷지만, 부딪히는 난관을 하나하나 차근차근 극복해 나가면서 엔지니어링에 대한 자신감을 갖을 수 있는 값진 경험이었습니다. 담임 교수님과 함게 진행한 선행기술 개발 프로젝트는 추후 실제 제품 상용화로 이어지는 토대가 되었습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img2_1_yonsei_ftsensor.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* DSP를 이용한 신호처리 보드 시스템 구축  
센서를 이용하여 Force와 Torque를 측정하고, 디지털 값으로 변환하여 상위제어기로 센서 데이터 전송
* 아날로그 신호를 처리하는 센서보드 회로도 작성 및 Artwork 작업  
72mm pcb diameter, DSP주변회로, AD/DA(6ch), Amplifier(6ch), CAN, RS485, Power 회로 내장
* 기구부/전장부 일체형 센서 개발
* Calibraion Jig 기구부 설계/발주 (Pro-E, AutoCAD 이용)

해당 프로젝트는 양산 전 선행 프로젝트로 추후 양산제품적용 기반기술로 활용되었음

> 1000만원 이상의 고가센서를 대신하여 상용화 및 양산 성공  
> (삼성전자 XGEO GC80 Soft handling 기능구현에 적용 - 0:45 영상)

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed/eEmyj61OwYo?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;상용화 홍보 동영상&gt;</em>
</p>

* HW 설계, proto type 제어기 제작 경험을 하였음
* 손가락으로 핸들을 움직이는 힘을 측정하는데 센서 기술이 적용됨
* [연세대 건설환경공학과 CORAL LAB - Smart Sensing](https://web.yonsei.ac.kr/coral/project.html)

