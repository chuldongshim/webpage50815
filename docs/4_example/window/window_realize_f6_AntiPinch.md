---
id: window_realize_f6_AntiPinch
title: F6 Anti-Pinch
---

<div align="right">
  <font size="4">
    Since 21.08.20 ~ 21.11.30
  </font>
</div>

---

> <font color="blue"><strong>반전 기능</strong></font><br/>
> 윈도우 Auto-Up 동작 중 <u>장애물(물체끼임)을 감지하면 윈도우 Down 동작을 수행(반전동작)</u>하여 윈도우 끼임으로부터 신체를 보호하는 기능

:::important
* Down(Auto/Manual) 동작 중에는 반전동작을 수행하지 않는다.
* Manual-Up 동작은 사용자 의도에 의한 Up 동작으로 간주하고 반전동작을 수행하지 않는다.
:::


## 구현조건

### 알고리즘 개발전략

* `Full AutoCode` 방법을 통해 Anti-Pinch 알고리즘을 개발하고, `Hybrid AutoCode` 방법으로 타겟에 통합한다.

### 기존 반전판단 기준

* 100N 미만 반전력이 측정되어야 하고, ±3N안으로 튜닝이 가능해야 함.
* 반전판단방법 : rpm 변화량이 기준치(가변가능) 이상을 넘은 횟수(가변가능)가 정해진 횟수를 넘어가면 반전
* rpm을 32개 저장하여 평균 rpm을 구하고 평균 rpm과 비교하는 로직이 있음
* Short Pinch(기동이 얼마 안되었을 대) 반전로직 있음
* Max Pinch(180N) 반전로직 있음 (많이 아픔)
* 꾹 눌렀을 때는 반전해야 하고, 임펄스로 눌렀을 때에는 반전하면 안됨
* 전압변동도 고려해야 함.

## 반전기능구현

### 오반전 요인 제거

:::note [Html Link]
<a href="/assets/kalman/fir_filtering.html" target="_blank">1. FIR Lowpass filter를 통한 속도측정</a><br/>
<a href="/assets/mbd/sbcmDS_f6_AntiPinch.html" target="_blank">2. 부하학습을 통한 오반전 요인 제거</a><br/>
:::

* 속도정보를 바탕으로 반전을 판단하기 때문에 속도측정값이 튀는 경우 반전 오인식으로 이어질 수 있으므로 디지털 필터를 적용하여 노이즈로 인해 튀는 값(속도)은 제거되어야 한다.
* Window 프레임 형상으로 인해 동일한 위치에서 반전이 발생하므로 형상으로 발생되는 부하를 제거한 상태에서 반전판단을 수행한다.

### 부하학습

윈도우 상승구간에서만 Anti-Pinch 반전을 수행하므로 초기화 시 상승구간 부하학습을 메모리에 저장하고, 상승구간에서 학습된 부하를 적용하여 Anti-Pinch 반전을 판단한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f6_antipinch1_selfstudy.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Anti-Pinch반전에 부하학습 적용&gt;</em>
</p>

실부하에서 다음과 같이 실

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f6_antipinch2_test.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Anti-Pinch 반전 테스트&gt;</em>
</p>

### 시뮬레이션

Anti-Pinch 반전은 실부하가 있는 상태에서 확인이 수월하므로 실부하 상태에서 기능시험으로 대체함.
