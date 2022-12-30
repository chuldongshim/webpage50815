---
id: esp32_sys
title: 시스템
---
---

## 시스템

### 요구사항

### 기능 요구사항
선행이므로 비기능/인터페이스 요구사항은 고려하지 않고, 기능 요구사항만을 고려한다.
* [F1 무선통신 기능](#f1-wireless-comm)
  * `F1_Req1` 근거리(블루투스) 제어를 제공해야 한다.
  * `F1_Req2` 원거리(와이파이) 제어를 제공해야 한다.
  * `F1_Req3` CAN_to_Wifi를 제공하여 CAN통신만 존재하는 장비와 인터페이스를 제공해야 한다.  
  [(Development of a CAN-Wifi converter based on a ESP32.pdf)](https://upcommons.upc.edu/bitstream/handle/2117/118541/report-tfm-eduard-valentino.pdf)
* [F2 무선업데이트기능](#f2-wireless-update)
  * `F2_Req1` 제어기 펌웨어를 무선으로 업데이트 해야 한다.
  * `F2_Req2` 통신불가 상황을 고려하여 업데이트가 진행되어야 한다.
  * `F2_Req3` 허가된 사용자만 업데이트를 수행할 수 있어야 한다.
* [F3 모니터링기능](#f3-monitoring)
  * `F3_Req1` 펌웨어 업데이트, Signal Monitoring을 위한 웹GUI를 제공해야 한다.

### 아키텍처

#### 개발컨셉

본 프로젝트는 앞으로 진행 될 모든 IOT 제품에 동일하게 적용할 수 있는 표준 플랫폼을 개발하는데 목적이 있다.

* IOT 관련 제품(not applicable for automotive)을 개발할 경우 C++ & MBed OS를 표준플랫픔으로 하여 개발을 진행한다.
* Rhapsody에서 Class Diagram을 통해 아키텍처를 설계하고, C++기반으로 Code Skeleton을 생성하여 MBD OS와 Merge 한다.
* 휴대휴앱과 블루투스 연결을 통해 원격 스위치 입력 역할 수행 -> 태블릿으로 화면 크게 적용
* 휴대폰을 통해 OTA 기능 구현
* 휴댜폰 없이 LCD를 통해 직접 스위치 역할도 수행

#### 아키텍처

* Physical Architecture
  * 하드웨어 의존적인 부분인 PWS 및 MCU Peripherals 영역을 Physical로 분류한다.
  * 모듈로 언급되는 시스템 구성요소는 하드웨어 자체를 의미한다.
* Logical Architecture
  * 로직으로 언급되는 시스템 구성요소는 모델을 통한 시뮬레이션을 이용하여 하드웨어 독립적으로 개발이 가능함을 의미한다.

#### 참고자료

* [ESP32의 Dual core 확인해 보기](https://chocoball.tistory.com/entry/Hardware-ESP32-Dual-core?category=729036)


### [F1 무선통신 기능] {#f1-wireless-comm}

#### 관련 요구사항

* `F1_Req1` 근거리(블루투스) 제어를 제공해야 한다.
* `F1_Req2` 원거리(와이파이) 제어를 제공해야 한다.

#### 참고자료
* ESP32 온라인 워크숍
  * [GitHub 소스](https://github.com/gcamp-hub/ESP32_Middle_Class)
  * 1일차
    * [ESP32 Peripherals 과정 리뷰 및 Network 과정 소개 - 자료](https://github.com/gcamp-hub/ESP32_Middle_Class/blob/master/ESP32_%EC%A4%91%EA%B8%89%EA%B3%BC%EC%A0%951.pdf)
    * [온라인 동영상 교육](https://www.g.camp/1662)
  * 2일차
    * [lwip+wifi 리뷰 - 자료](https://github.com/gcamp-hub/ESP32_Middle_Class/blob/master/ESP32_%EC%A4%91%EA%B8%89%EA%B3%BC%EC%A0%952.pdf)
    * [온라인 동영상 교육](https://www.g.camp/1663?category=816908)
  * 3일차
    * [BLE+WIFI 통합 - 자료](https://github.com/gcamp-hub/ESP32_Middle_Class/blob/master/ESP32_%EC%A4%91%EA%B8%89%EA%B3%BC%EC%A0%953.pdf)
    * [온라인 동영상 교육](https://www.g.camp/1664?category=816908)

### [F2 무선업데이트 기능] {#f2-wireless-update}

#### 관련 요구사항

* [FID_02] 제어기 펌웨어를 무선으로 업데이트 해야 한다.
  * 통신불가 상황을 고려하여 업데이트가 진행되어야 한다.
  * 허가된 사용자만 업데이트를 수행할 수 있어야 한다.

#### 참고자료

* [Secure Boot](https://docs.espressif.com/projects/esp-idf/en/stable/security/secure-boot-v1.html)
* [Flash encryption](https://docs.espressif.com/projects/esp-idf/en/stable/security/flash-encryption.html)

### [F3 모니터링 기능] {#f3-monitoring}

#### 관련 요구사항

* [FID_03] 펌웨어 업데이트, Signal Monitoring을 위한 웹GUI를 제공해야 한다.

