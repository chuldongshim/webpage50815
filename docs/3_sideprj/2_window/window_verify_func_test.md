---
id: window_verify_func_test
title: 기능시험
---
---

## F1 Auto/Manual & F4 초기화 설정

> `F4_Req1` Power On 시 초기화해제 상태에서 구속이 감지될 때까지 모터를 CW/CCW로 n회(TBD) 구동하여 모터 부하를 통해 Up/Down방향을 판단하고, 상하단구속 위치 감지 후 초기화 상태로 천이되어야 한다.

* 상/하단 위치와 무관하게 상단 or 하단구속위치에서 상/하단 1회 씩을 연속적으로 구속하면 초기화가 완료된다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//IEqg8dDzfDI?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Window 상단구속에서 Relay초기화 (21년11월17일)&gt;</em>
</p>

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//jCq4ktn4KRU?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Window 하단구속에서 Relay초기화 (21년11월17일)&gt;</em>
</p>

## F2 속도프로파일

> F2_Req1 속도프로파일을 통한 위치/속도제어를 수행해야 한다.  
F2_Req2 가속/등속/감속 구간으로 나눠 프로파일링을 수행한다. 

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//ML_fRinUlRI?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Window FET Manual Up & Down (21년11월17일)&gt;</em>
</p>

## F3 피드백제어

> 초기화 후 FET 가속/등속/감속 실행 시 피드백 제어를 수행한다.  

* 피드백제어 미수행 시 
  * Opening(Down)/Closing(Up) 시 Reference Profile 및 PWM출력 동일
  * 윈도우 부하로 인해 Opening(Down) 시에는 빠른속도로 윈도우가 하강
  * Closing(Up) 시에는 느린 속도록 윈도우가 상승하며, 부하로 인해 원점위치까지 올라오지 못하게 된다.
* 피드백제어 수행 시
  * Opening(Down)/Closing(Up) 시 Reference Profile 동일
  * Opening(Down) 시 피드백을 통해 윈도우 부하만큼 PWM출력을 낮춰 윈도우 하강
  * Closing(Up) 시 피드백제어를 통해 윈도우 부하만큼 PWM출력을 높여 윈도우 상승
  * Opening(Down)/Closing(Up) 모두 동일한 시간동안 동일한 위치까지 이동
  * 동영상을 통해 Closing(Up) 시 원점위치까지 이동하는 것을 확인할 수 있다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//rUO6xONQ8OM?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;Window 상단구속에서 FET초기화 (21년11월17일)&gt;</em>
</p>

## F6 AntiPinch 반전

> Closing 동작 중 장애물 감지 시 윈도우를 Opening 방향으로 동작시켜 윈도우 끼임으로부터 사용자를 보호한다.

* 초기화 완료 후에만 Auto Up/Down 동작이 가능하다.  
초기화를 통해 이동거리(Full-Stoke)를 알아야 자동으로 정지할 수 있음
* Manual-Up 동작은 사용자 의도기능으로 간주하여 반전을 수행하지 않으며, Auto-Up 동작 중에만 장애물 끼임 감지 시 반전동작을 수행한다.

<p align="center">
	<iframe
		width="350" height="250"
		src="https://www.youtube.com/embed//eEmUgEgfH4k?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 윈도우 반전 (21년12월03일)&gt;</em>
</p>

## 참고자료

* Simulink executionProfile을 통한 실시간 코드 실행시간 측정  
Matlab -> 문서(F1) -> "Real-Time Code Execution Profiling" 키워드 검색 -> LAUNCHXL-F28377S 예제를 LAUNCHXL_F28069M로 변환하여 실행시간 측정 레포트 확인

