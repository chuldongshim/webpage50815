---
id: bldc_spec
title: + 기술문서
---

---

### 1.1 Sensorless BLDC with Kalman Filter (TBD) {#mymbd-bldc-plan}

* CAD연동(ProE/Solidworks 등)을 통한 Simulnik모델 가상 시뮬레이션
* 하드웨어 없이 시뮬레이션 만으로 타겟 소프트웨어 개발
(로봇팔 PIL 이미지 삽입)
* Software Component개발
* BLDC 모터 Sensorless/FOC 제어
* 300W급 BLDC모터 드라이버 Extension Board 개발

### 1.2 MBD기반 Sensored BLDC 속도제어 {#mymbd-bldc-sensered}

* 기간 : 22.10.21~22.11.05

예제를 통해 BLDC모터를 시뮬레이션 해 봄으로써 작동원리를 쉽게 파악할 수 있었고, 코드자동생성 후 타겟MCU로 BLDC모터를 실제 구동시켜 보았습니다.

* BLDC Simulation을 통한 동작원리 이해
<p align="center">
	<img
		src={require('/img/2_mbd/bldc-simulation.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* MBD기반 Open-loop BLDC모터 제어
<p align="center">
	<img
		src={require('/img/2_mbd/bldc_control_openloop.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* MBD기반 closed-loop BLDC모터 제어
<p align="center">
	<img
		src={require('/img/2_mbd/bldc_control_closedloop.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* 코드자동생성 후 타겟 MCU에서 BLDC모터 구동확인
<p align="center">
	<img
		src={require('/img/2_mbd/bldc_control_hardware.png').default}
		width="450"
		alt="Example banner"
	/>
</p>
