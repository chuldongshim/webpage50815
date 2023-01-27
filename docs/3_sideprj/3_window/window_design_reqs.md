---
id: window_design_reqs
title: 요구사항 정의
---
---

## 개요

* 기능을 정의하고, 시스템 요구사항을 기능에 <u>할당(allocation)</u>하므로 기능을 모두 구현하고, 시험하면 모든 기능요구사항을 만족하게 된다.
  * 본 프로젝트는 선행개발로 윈도우 Up/Down 동작과 관련된 기능(F1~F5)만을 구현 한다.
  * 본 프로젝트에서 비기능 요구사항 및 인터페이스 요구사항은 고려하지 않는다.
* 요구사항 관리는
  * 워드/엑셀/txt 등의 포멧을 이용하여 기능요구사항 초안작성 후 MBD 구현을 시작하기 전에 요구사항을 Simulink Requirements를 통해 Simulink로 import하여 `요구사항-구현-코드`의 추적성을 확보한다.
  * Simulink import 시점 이후부터는 구현이 완료될 때까지 Simulink Requirement로만 요구사항을 관리하고, 구현 및 시뮬레이션이 완료된 시점에 고객과의 공유를 위해 1회 기능요구사항 초안을 업데이트하고, 추적표를 작성한다.

## F1 Auto/Manual

* [`F1_Req1`](./window_realize_f1_AutoManual#window-logic) 윈도우 이동 중 버튼을 조작하면 Window는 동작을 멈춰야 한다.
* [`F1_Req2`](./window_realize_f1_AutoManual#window-logic) A-Up/A-Dn이 입력 후 추가 버튼 조작이 없으면 모터는 상/하단 Soft-Stop 위치까지 이동하여야 한다.
* [`F1_Req3`](./window_realize_f1_AutoManual#window-logic) M-Up/M-Dn이 입력되는 동안 모터는 상/하단 방향으로 이동하며 입력이 해제되면 모터는 정지해야 한다.

:::note Wiper모터 스위치입력 vs Window모터 스위치입력
Wiper모터는 SW를 눌렀다 떼면(Manual 1회 입력) 속도프로파일(0 -> Target)을 1회 완료하고, 속도프로파일 중 스위치를 다시 입력하면 감속을 수행하는 반면  
Window모터는 SW를 누르는 동안에만 속도프로파일을 수행하고 스위치를 떼면 감속을 수행
:::

## F2 속도프로파일

* [`F2_Req1`](./window_realize_f3_FeedbackControl#feedback-control-period) 속도프로파일을 통한 위치/속도제어를 수행해야 한다.
* [`F2_Req2`](./window_realize_f2_Profiling#vel-profiling) 가속/등속/감속 구간으로 나눠 프로파일링을 수행하며, 
* [`F2_Req3`](./window_realize_f2_Profiling#vel-profiling) 파라미터를 통해 프로파일을 가변할 수 있어야 한다.
  
## F3 피드백제어

* [`F3_Req1`](./window_realize_f3_FeedbackControl#feedback-control-simulation) 위치 및 속도 피드백 제어를 수행해야 한다.

## F4 초기화설정

* [`F4_Req1`](./window_realize_f4_Initialize#stuck-detection) Power On 시 [초기화해제 상태에서 구속이 감지될 때까지 모터를 CW/CCW로 n회(TBD) 구동하여 모터 부하를 통해 Up/Down방향을 판단하고, 상하단구속 위치 감지 후 초기화 상태로 천이되어야 한다.](./window_realize_f4_Initialize#init-logic)
* [`F4_Req2`](./window_realize_f4_Initialize#switch-input) 초기화해제 상태에서는 Manaul동작만 가능하고, 초기화 상태에서 Auto/Manual동작 모두 가능하다.
* [`F4_Req3`](./window_realize_f4_Initialize#init-logic) 초기화를 통해 상/하단 구속지점을 감지하여 이동거리(Full-Stroke)를 자동으로 인식해야 한다.
  
## F5 Soft-Stop

* [`F5_Req1`](./window_realize_f5_SoftStop#soft-stop) 충격으로 인한 시스템 파손을 방지하기 위해 상/하단 구속 전 위치에서 모터는 정지해야 한다.
* [`F5_Req2`](./window_realize_f5_SoftStop#soft-stop) Soft-Stop 수행 시 상/하단 구속이 발생하면 위치오차가 발생한 것으로 판단하여 모터를 정지시키고, Soft-Stop 위치(상/하단 구속 전 위치)를 재설정 해야 한다.
* [`F5_Req3`](./window_realize_f5_SoftStop#pos-data-reset) Softstop으로 인해 발생하는 위치오차는 보정되어야 한다.
  
## F6 Anti-Pinch

* [`F6_Req1`](./window_realize_f6_AntiPinch#anti-pinch-by-window-area) Pinch 감지 시 윈도우 영역에 따라 각각 정의된 반전동작을 수행해야 한다.
  
## F7 칼만필터(TBD)

* [`F7_Req1`](./window_realize_f7_KalmanFilter#basic-concept) 엔코더 신호를 칼만필터링하여 전류정보를 추정한다.
  
## F8 이상감지

* `F8_Req1`(TBD) 홀센서 고장 시 
* `F8_Req2`(TBD) 고전압 감지 시 모터가 구동중이면 모터를 즉시 정시시키고, 정상전압 복귀 시 진행중이던 모터구동을 재개해야 한다.
* `F8_Req3`(TBD) 저전압 감지 시 
* `F8_Req4`(TBD) 연속 입/출력 동작 10회 감지 시 

## F9 모터 과열 방지

* TBD

## F10 Sleep/WakeUp

* TBD

