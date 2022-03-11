---
id: study
title: 연구활동
---

---

## 무인전기차

알고리즘 개발 보다는 상위제어기로부터 angle, velocity 정보를 수신하여 하위 제어기의 모터 출력명령을 전달하는 인터페이스 역할을 수행하는 제어기 개발업무를 수행하였습니다.
얕은 지식으로 하고 싶다는 마음 하나로 낮/밤, 주말 가리지 않고 될 때까지 했었던 것 같습니다.
차량 핸들은 DC모터와 absolute angle 센서 피드백으로 직접 제어하고, 차량 속도는 악셀에 부착된 센서 정보를 인터페이스 제어기가 velocity 정보를 바탕으로 대신 생성하여 차량 제어기에 전달하였습니다.

## 전기차 하위 제어기 개발/제작/관리 및 유지보수

<p align="center">
	<img
		src={require('/img/3_embedded/img1_1_kist.png').default}
		alt="Example banner"
		width="350"
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

## [전기차 속도제어 실험](https://www.hellodd.com/news/articleView.html?idxno=29509)

<p align="center">
	<iframe 
		width="350" height="250"
		src="https://www.youtube.com/embed//rjTcdhceIw4?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;무인 상태에서 차량 속도제어&gt;</em>
</p>
