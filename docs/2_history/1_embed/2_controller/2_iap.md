---
id: iap
title: 펌웨어 업데이트
---

<div align="right">
  <font size="4">
    2016 ~ <br/>
		about 12 weeks (3 month)
  </font>
</div>

---

* [IAP 개발](#myembedded-bootloader)
  * [22.05.22~22.08.04 : wifi 웹서버를 통한 STM MCU FW업데이트](#myembedded-bootloader-fota)
  * [20.05.16~20.08.10 : PC Python과 LIN부트로더를 통한 NXP MCU FW업데이트](#myembedded-bootloader-nxp-iap)
  * [18.12.09~18.12.10 : UART부트로더를 통한 STM MCU FW업데이트](#myembedded-bootloader-stm-iap)
  * [16.10.03~17.04.30 : RTOS포팅 및 IAP구현(Self_Study)](#myembedded-bootloader-iap)


## IAP 개발 {#myembedded-bootloader}

### wifi 웹서버를 통한 STM MCU FW업데이트 {#myembedded-bootloader-fota}

#### ESP32 Embedded WebServer를 통한 stm32f746 OTA

센서신호를 신호처리 알고리즘을 적용하여 필터링을 수행하고, 무선 데이터 송/수신을 통해 휴대폰으로 처리 결과를 확인할 수 있는 모니터링 시스템을 개발하는 것을 목적으로 개인 프로젝트를 진행하였습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/fourth_wifi_ota.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

* 웹서버에 bin파일 업로드  
  Wifi를 통해 PC or 휴대폰에서 WebServer(ESP32) file system으로 bin/hex파일 업로드 후 웹페이지에서 파일 업로드 성공 확인
* 웹서버를 통해 MCU 펌웨어 업데이트 수행  
  웹페이지에서 업데이트 버튼을 눌러 WebServer에서 타겟 MCU로 bin/hex파일 전송  
  bin/hex파일을 수신한 MCU는 부트로더 모드에서 펌웨어 업데이트 수행

#### 통합 시뮬레이터 (TBD) {#myembedded-bootloader-integrate}

* OTA, TFT-LCD, Wifi/BLE 기능 통합 시뮬레이터
* mBed RTOS 기반
  * 코드 재사용을 위한 C/C++ 모듈화 프로그래밍
	* Mbed에서 C++ 기반 임베디드 소프트웨어 개발
* MPU6050를 통한 신호처리 로직 추가
  * FIR/IIR필터를 통해 입력신호 필터링 -> TFT-LCD Display
  * 입력신호 FFT -> TFT-LCD Display
  * Kalman Filter룰 이용한 모터제어 알고리즘 개발 적용(Kalman Filter 이론학습 및 시뮬레이션 완료)

구현결과 동영상 추가할 것 (TBD)
* MPU6050 FIR필터링 동영상
* MPU6050 IIR필터링 동영상
* MPU6050 Kalman필터링 동영상

### UART부트로더를 통한 STM MCU FW업데이트 {#myembedded-bootloader-stm-iap}

## 부트로더 개발

### PC Python과 LIN부트로더를 통한 NXP MCU FW업데이트 {#myembedded-bootloader-nxp-iap}

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

### RTOS포팅 및 IAP구현(Self_Study) {#myembedded-bootloader-iap}

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

