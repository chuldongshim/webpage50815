---
id: embedded
title: 임베디드 경험 요약
---
---

현재까지의 경험들을 임베디드 관점으로 기술 (임베디드와 무관한 경험은 embedded섹션에서 제외)

## 펌웨어

### 석사 졸업논문

지능형 근력강화 시스템 개발

<p align="center">
	<img
		src={require('/img/3_embedded/myhistory_1.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;명지대 석사논문(2007.03 ~ 2009.02)&gt;</em>
</p>

### 논문 후 프로젝트

유도인형

### 무인전기차 하위 제어기 개발

* 전기자동차 인터페이스 제어기 개발
* 기간 : 2009.03 ~ 2009.12
* 소속 : 한국과학기술연구원 인턴

<p align="center">
	<img
		src={require('/img/3_embedded/myhistory_2.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;그림제목&gt;</em>
</p>


### FT Sensor 개발

* 삼성전자HME 사업부 주관 다축 Force/Torque 센서 개발
* 소속 : 연세대 자동화기술연구소 계약직 연구원
* 기간 : 2010.09 ~ 2011.09
* 역할 : 상용화기술 개발[(추후 XGEO GC80에 적용됨)](https://www.youtube.com/watch?v=eEmyj61OwYo)

<p align="center">
	<img
		src={require('/img/3_embedded/myhistory_3.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;그림제목&gt;</em>
</p>

### 부트로더 개발 자기학습

  * IAP 부트로더를 통한 uart, usb, http 펌웨어 업데이트
	* OTA 원격 펌웨어 업데이트 - 진행중


## RTOS

### uCIS-II 자기학습

Self Study

### Linux포팅 자기학습

* 2440에 ARM9 Linux 포팅
  * 기간 : 2011.11 ~ 2013.10 (사원 2년)
  * 소속 : 한국후지제록스

<p align="center">
	<img
		src={require('/img/3_embedded/myhistory_5.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;그림제목&gt;</em>
</p>

* stm32f4-discovery에 uClinux 포팅

### 복합기 인증단말기 개발

* 단말기를 통한 복합기 인증 솔루션 개발
* 소속 : 한국후지제록스
* 기간 : 2011.11 ~ 2013.10 (사원 2년)
  * Linux 및 uClinux 포팅
	* Linux 기반 tcp/ip 네트워크 어플리케이션 개발
  * [인증용단말기 SW 양산개발](https://www.fujixerox.co.kr/ko-KR/Products/KR-Software/Printing-Management)
  * [복합기-결재 단말기 연동 동영상](https://www.youtube.com/watch?v=ArtCujt2TUQ)

<p align="center">
	<img
		src={require('/img/3_embedded/myhistory_4.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;그림제목&gt;</em>
</p>

### 열차 출입문 제어기 양산SW 개발

FreeRTOS

* 소속 : [인터콘시스템스](http://www.icsys.co.kr/s2/s2_5.php)
* 기간 : 2017.06 ~ 2019.04 (과장 2년
* 역할 : 열차 출입문 양산 안정화 및 신규 개발 앙산적용

<p align="center">
	<img
		src={require('/img/3_embedded/myhistory_7.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;그림제목&gt;</em>
</p>

### 통합 시뮬레이터

* OTA, TFT-LCD, Wifi/BLE 기능 통합 시뮬레이터
* mBed RTOS 기반
  * 코드 재사용을 위한 C/C++ 모듈화 프로그래밍
	* Mbed에서 C++ 기반 임베디드 소프트웨어 개발
* MPU6050를 통한 신호처리 로직 추가
  * 
  * FIR/IIR필터를 통해 입력신호 필터링 -> TFT-LCD Display
  * 입력신호 FFT -> TFT-LCD Display
  * Kalman Filter룰 이용한 모터제어 알고리즘 개발 적용(Kalman Filter 이론학습 및 시뮬레이션 완료)

X-CUBE-DSPDEMO by stm32f4-disco
* _[중요]AN4841 - CMSIS로 stm32f429와 stm32f746에서 FFT 구현.pdf
* en.x-cube-dspdemo_AN4841.zip

