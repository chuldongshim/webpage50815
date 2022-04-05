---
id: window_autobox
title: 윈도우 오토박스
---

---

|기간|수행내용|
|---|---|
|13년4월 ~ 14년3월|MBD(Matlab/Simulink & Target Link)|

## MBD 첫 경험...

목적 : MBD 학습

* 소속 : 동양기전/DYAUTO
* 기간 : 2013.10 ~ 2014.09 (대리 1년차)

Model Based Design(이하 MBD라 함)를 접하여 Simulink 모델로부터 시뮬레이션을 수행하고, 코드를 자동생성하는 경험을 하였고, A-SPICE/ISO26262 업무를 대응하여 개발 프로세스에 대한 기초를 다질 수 있었습니다.

## MBD 개발환경 구축

<p align="center">
	<img
		src={require('/img/2_mbd/img2_1_dyauto_mbd.png').default}
		alt="Example banner"
	/>
</p>

* MicroAutoBox를 이용한 제어기 RCP(Rapid Control Prototyping) 구현 및 동작확인
  * Matlab Stateflow를 이용한 제어 로직 프로그래밍
  * Hardware dependent device driver interface를 통한 peripheral control(Timer/Interrupt, ADC, Port IO 등)
* Matlab/Simulink를 통한 제어기 시뮬레이션 확인 및 모델 코드 자동생성(AutoCode Generation)
* 장애물 감지 시 반전 알고리즘/로직 시뮬레이션

## Safety Power Window

장애물 감지 시 반전 알고리즘/로직 시뮬레이션

<p align="center">
	<iframe 
		width="350" height="250"
		src="https://www.youtube.com/embed//JWzVYKv_Eac?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 감지 시 반전 알고리즘 시뮬레이션&gt;</em>
</p>
