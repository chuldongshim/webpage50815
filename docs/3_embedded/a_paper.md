---
id: paper
title: 연구활동
---

---

# 학생 경험 요약

- 임베디드, 자동제어 맛보기
- 주도적으로 목표를 정하고 추진하는 능력 배양

## 학부3년 80196 개인학습

FND 디지털 시계
* Intel 80196 마이크로프로세스 학습
  * FND를 통한 시계 만들기
  * RAM Execution
  * address bus 기반 디바이스 컨트롤
* Atmega 8535 마이크로프로세스 학습
  * 디지털 도어락 만들기

## 학부4년 8225를 통한 잠금장치

기능
- 비밀번호를 EEPROM에 저장하고, 키패드를 통해 비밀번호를 누르면 액츄에이터(RC모터)를 돌려 잠금해제 동작을 수행


## 1자유도 근력증강로봇 졸업논문

<p align="center">
	<img
		src={require('/img/3_embedded/img1_0_mju_paper.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

* 담당
  * 기구부 및 전장부 설계 및 개발
  * 시스템 요소를 Modeling한 후 Matlab-Simulink 시뮬레이션과 실제 실험데이터와의 비교를 통하여 
Modeling의 타당성 검증
  * 시스템 요소 Modeling의 타당성을 검증한 후 전체 시스템으로 통합하는 단계적인 절차 제시
  * 통합된 System Model의 안정성 확인을 통하여 제어기 성능을 검증하여 주어진 제어 명령을 잘 추종하는
제어기 설계
  * Modeling System과 Real System과의 출력 데이터 일치 여부를 확인하여 제어기 성능 검증
  * 실제 System을 이용하여 사용자의 근력 증강 여부 검증 
* 개발내용
  * FSR(Force Sensing Registor)를 통하여 시스템 입력(제어명령)을 생성하고 전압(PWM) 제어기를 통하여 모터 제어
  (Force Sensing Registor : 힘에 비례하여 전압이 증가하는 센서)
  * 제어기는 구동 상태에 따라 제어 모드를 변환시켜 모터 제어
  (FSR 입력이 없을 때에는 PI제어(위치)를 수행하고, FSR 입력이 있을 때에는 PD제어(속도) 수행)
  * 검지 손가락의 미미한 움직임을 통하여 5kg의 물건을 움직여 개발된 시스템 동작 확인

<p align="center">
	<iframe 
		width="350" height="250"
		src="https://www.youtube.com/embed//alL_y9gymNU?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 안ㄶ습니다.
	</iframe>
</p>

# 논문 후 유도인형 프로젝트

<p align="center">
	<img
		src={require('/img/3_embedded/img1_1_mju_judo.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

문화체육관광부 주관, 용인대 주최
* 담당
  * ARM7(at91sam7s)을 이용한 유도인형 제어기 개발
  * Pro-e를 이용한 유도인형 기구부 설계 아이디어 제안 및 3D 개념설계
  * Visual C++를 이용한 힘센서 모니터링 프로그램 MFC Programming
* 개발내용
  * 힘센서(로드셀)의 아날로그 하드웨어 신호처리
  * 힘센서데이터 DAQ 및 데이터 PC Display
  * 파우더브레이크를 이용한 유도로봇 몸통 및 좌우다리 제동력 조절

<p align="center">
	<iframe 
		width="350" height="250"
		src="https://www.youtube.com/embed/Bdt_fOkhiw8?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 안ㄶ습니다.
	</iframe>
</p>

# 무인전기차

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


# 다축 F/T센서

무식하면 용감하다는 얘기가 있듯이 아무것도 모르는 상태에서 포부만으로 기구부, 하드웨어, 소프트웨어 설계를 모두 수행하였습니다. 독학으로 PCB 설계를 학습하여 보드를 직접 제작하였습니다. 제 능력을 넘어서는 일을 맡아 두려움이 컷지만, 부딪히는 난관을 하나하나 차근차근 극복해 나가면서 엔지니어링에 대한 자신감을 갖을 수 있는 값진 경험이었습니다. 담임 교수님과 함게 진행한 선행기술 개발 프로젝트는 추후 실제 제품 상용화로 이어지는 토대가 되었습니다.

## 습득기술

* HW 설계 경험
* proto type 제어기 제작
* 양산 전 선행 기반기술 개발 (추후 양산으로 이어짐)

## 다축 Force/Torque센서 상용화 기술 개발

> 삼성전자HME 사업부 주관

<p align="center">
	<img
		src={require('/img/3_embedded/img2_1_yonsei_ftsensor.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

* DSP를 이용한 신호처리 보드 시스템 구축
센서를 이용하여 Force와 Torque를 측정하고, 디지털 값으로 변환하여 상위제어기로 센서 데이터 전송
* 아날로그 신호를 처리하는 센서보드 회로도 작성 및 Artwork 작업
(pcb diameter : 72mm, DSP주변회로, AD/DA(6ch), Amplifier(6ch), CAN, RS485, Power 회로 내장)
* 기구부/전장부 일체형 센서 개발
* Calibraion Jig 기구부 설계/발주 (Pro-E, AutoCAD 이용)

## 제품 적용

> 1000만원 이상의 고가센서를 대신하여 상용화 및 양산 성공  
> (삼성전자 XGEO GC80 Soft handling 기능구현에 적용 - 0:45 영상)

<p align="center">
	<iframe 
		width="450" height="300"
		src="https://www.youtube.com/embed/eEmyj61OwYo?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;상용화 홍보 동영상&gt;</em>
</p>

* 손가락으로 핸들을 움직이는 힘을 측정하는데 센서 기술이 적용됨

* [연세대 건설환경공학과 CORAL LAB - Smart Sensing](https://web.yonsei.ac.kr/coral/project.html)
