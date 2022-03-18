---
id: paper
title: 학교생활
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
		이 브라우저는 iframe을 지원하지 않습니다.
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
