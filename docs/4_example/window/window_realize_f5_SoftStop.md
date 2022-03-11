---
id: window_realize_f5_SoftStop
title: F5 Soft-Stop
---
<div align="right">
  <font size="4">
    Since 21.08.20 ~ 21.11.30
  </font>
</div>
---

## 기능구현

> <font color="blue"><strong>Soft-Stop 기능</strong></font><br/>
> 소음을 저감하고, 충격으로 인한 모터/기구부 파손을 방지하기 위해 구속 전 위치에서 모터를 정지시키는 기능

### 구속정지

모터출력 시 300ms([저속 구동 시 max 260ms의 펄스가 발생함](./))동안 엔코더펄스 변화가 없는 경우 구속으로 판단한다.

* 초기화해제상태 구속정지  
초기화해제상태에서 구속이 발생하면 모터를 즉시 정지하고, 상/하단 구속위치를 설정한다.
* 초기화상태 구속정지  
Soft-Stop 오차누적으로 구속이 발생하면 모터를 즉시 정지하고, 상/하단 및 Soft-Stop 위치를 재설정 한다.

## 시뮬레이션

T.B.D

