---
id: myembedded
title: 임베디드개발
---
---
<b><big>[목차]</big></b>

* [2. 제어기 개발](#myembedded-controller)
  * [17.06.07~19.04.12 : 2.1 열차 출입문 제어기 개발](#myembedded-controller-train)
  * [09.03.16~09.12.18 : 2.2 무인 전기자동차 하위 제어기 개발](#myembedded-controller-kist)
  * [08.09.01~09.02.26 : 2.3 유도인형시스템 개발](#myembedded-controller-judo)
* [3. 리눅스 응용프로그램 개발](#myembedded-linux)
  * [23.07.01~~~~~~~현재 : 3.1 BeagleboneBlack을 통한 Embedded Linux IOT Application 개발](#myembedded-linux-bbb)
  * [16.10.03~17.04.30 : 3.2 stm32f7에 uCLinux포팅(Self_Study)](#myembedded-linux-stm32f7)
  * [12.10.01~13.09.30 : 3.3 카드리더기 단말기 uCLinux/Linux 포팅](#myembedded-linux-porting)
  * [11.11.28~13.09.30 : 3.4 복합기 인증단말기 개발/유지보수](#myembedded-linux-maintenance)
* [4. 센서 개발](#myembedded-sensor)
  * [10.09.01~11.08.31 : 4.1 다축 Force/Torque센서 상용화 기술 개발](#myembedded-sensor-ft)
---


## 2. 제어기 개발 {#myembedded-controller}

### 2.1 열차 출입문 제어기 개발 {#myembedded-controller-train}

#### 열차 측출입문 제어기 양산SW 신규개발

* 소속 : [인터콘시스템스](http://www.icsys.co.kr/s2/s2_5.php)
* 기간 : 18.08.29~19.01.13
* 역할 : 열차 출입문 양산 안정화 및 신규 개발 앙산적용

전동열차출입문제어기 소프트웨어 개발을 담당하여 양산적용하였고, 실차에 적용된 소프트웨어는 현재 정상적으로 현장에서 운행되고 있습니다.

* 소프트웨어 신규 개발 (현재 소사원시, 수인선, 과천안산선 운행중)
  * 통로문, 측출입문 2개 시스템에 대하여 FreeRTOS Multi-Task 기반의 소프트웨어 개발 신규 진행
  * RTOS기반 이중화 소프트웨어 개발 및 하드웨어 디버깅
  * 개발 산출물 작성 및 고객사(현대로템, 코레일) 대응  
  소프트웨어 요구사항 명세서→소프트웨어 설계 명세서→코딩→소프트웨어 시험 절차서→소프트웨어 시험 보고서 작성
  * UML기반 소프트웨어 설계  
  Rhapsody를 통한 소프트웨어 설계 (`Software Architecture & Design Specification_v1_190308.docx` 문서내용 정리)  
  EA를 통해 사양서 기술(`코레일128량 통로문 소프트웨어 설계 규격서_v06_수정후.docx` 문서내용 정리)
* 기능구현 예 - 장애물 3회감지(1,2,3회로 갈수록 장애물 감지 시 도어 닫힘력이 높아짐) 후 열림완료동작 시험

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//qYLRAw-hKN8?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 3회 감지 시 열림동작 동영상&gt;</em>
</p>


#### 열차 측출입문/통로문 제어기 유지보수

* 소속 : [인터콘시스템스](http://www.icsys.co.kr/s2/s2_5.php)
* 기간 : 17.06.07~19.04.12
* 역할 : 소사원시/수인선 납품 제어기 SW품질이슈 대응 및 안정화

코드 개발부터 양산/필드대응까지 소프트웨어 개발 관련 모든 업무를 직접 수행하였습니다. 이곳에서 프로젝트를 관리하기 위한 스킬을 쌓았으며, 업무를 수행하면서 실무에 적용가능하고, 실질적으로 도움이 되는 프로세스를 수립하기 위해 많은 고민을 하였습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img5_1_train_door.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* 기존에 개발된 소프트웨어 유지보수 및 소프트웨어 품질관리 [(회사홈페이지 참조)](http://www.icsys.co.kr/s2/s2_5.php)
  * 신사업(고객사 첫 납품)으로 진행된 제품에 대한 소프트웨어 품질문제 현장 대응 및 제품 안정화
  * 열차 현장운행 시 발생되는 이슈 대응 및 제품 안정화
  * 프로젝트 및 품질이슈 관리
  * 오픈소스 툴을 활용한 프로젝트 관리 (SVN을 통한 소스 이력관리, Redmine을 통한 이슈관리)
  * 품질이슈 해결사례 기술 - 고장 발생 시 닫힘동작 계속 Retry

IBM Rhapsody UML로 설계한 시스템 아키텍처 이미지 추가

### 2.2 무인 전기자동차 하위 제어기 개발 {#myembedded-controller-kist}

* 전기차 하위 인터페이스 제어기 개발/제작/관리 및 유지보수
* 기간 : 2009.03 ~ 2009.12
* 소속 : 한국과학기술연구원 인턴

차량핸들은 직접 제어하고, 차량속도는 악셀에 부착된 센서 정보를 인터페이스 제어기가 velocity 정보를 바탕으로 대신 생성하여 차량 제어기에 전달하는 인터페이스 제어기 개발업무를 수행하였습니다.  
차량 종방향제어(핸들제어) - absolute angle 센서 피드백을 통해 하위 인터페이스 제어기가 DC모터를 직접 제어하여 핸들제어  
횡방향제어(차량속도제어) - 상위제어기로부터 수신된 Angle, Velocity 정보와 피드백 정보로부터 모터 출력을 계산하고 모터제어기로 출력명령을 전달하여 차량속도제어  
얕은 지식으로 하고 싶다는 마음 하나로 낮/밤, 주말 가리지 않고 될 때까지 했었던 것 같습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img1_1_kist.png').default}
		width="450"
		alt="Example banner"
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

[전기차 속도제어 실험](https://www.hellodd.com/news/articleView.html?idxno=29509)

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//rjTcdhceIw4?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;무인 상태에서 차량 속도제어 동영상&gt;</em>
</p>

### 2.3 유도인형시스템 개발 {#myembedded-controller-judo}

학부생활동안 MCU를 이용하여 FND 디지털 시계 및 디지털 도아락 제작 활동을 통해 임베디드 개발에 대한 꿈을 키웠습니다.
* Intel 80196 마이크로프로세스 학습
  * FND를 통한 시계 만들기
  * RAM Execution
  * address bus 기반 디바이스 컨트롤
* Atmega 8535 마이크로프로세스 학습
  * 디지털 도어락 만들기
  * 비밀번호를 EEPROM에 저장하고, 키패드를 통해 비밀번호를 누르면 액츄에이터(RC모터)를 돌려 잠금해제 동작을 수행

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//alL_y9gymNU?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;디지털 도어락 만들기 동영상&gt;</em>
</p>

학부생 때 MCU를 접한것을 계기로 대학원을 진학하였고, 대학원생활동안 수행한 유도인형시스템 개발 프로젝트(문화체육관광부 주관, 용인대 주최)를 통해 개발에 대한 경험을 쌓을 수 있었습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img1_1_mju_judo.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* 담당
  * ARM7(at91sam7s)을 이용한 유도인형 제어기 개발
  * Pro-e를 이용한 유도인형 기구부 설계 아이디어 제안 및 3D 개념설계
  * Visual C++를 이용한 힘센서 모니터링 프로그램 MFC Programming
* 개발내용
  * 힘센서(로드셀)의 아날로그 하드웨어 신호처리
  * 힘센서데이터 DAQ 및 데이터 PC Display
  * 파우더브레이크를 이용한 유도로봇 몸통 및 좌우다리 제동력 조절
* 성과
  * 논문 : [유도경기력 향상을 위한 유도인형시스템 개발](https://scienceon.kisti.re.kr/srch/selectPORSrchReport.do?cn=TRKO201700003559)
  * 특허등록 : [유도훈련 장치](https://patents.google.com/patent/KR101117353B1/ko)

## 3. 리눅스 응용프로그램 개발 {#myembedded-linux}

### 3.1 BeagleboneBlack을 통한 Embedded Linux IOT Application 개발 {#myembedded-linux-bbb}

센서신호를 처리하여 상황을 판단하고 자동으로 영상을 촬영하여 SDCard에 저장합니다.
또한 웹서버 기능이 있어 PC 또는 휴대폰에서 웹캠을 원격으로 조정하여 현재 상황을 실시간으로 확인하거나, 사건 발생 시 촬영된 영상을 확인할 수 있습니다.
SDCard에 저장된 모든 영상은 웹서버를 통해 선택적으로 PC 또는 휴대폰에 저장/재생이 가능합니다.  
(http 기반 영상 스트리밍은 버퍼링 현상이 발생함 -> 추후 UDP-Multicast 기반 영상스트리밍으로 변경 예정)

<p align="center">
	<iframe 
		src='https://www.youtube.com/embed//bXYC9jwxIAU'
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;움직임 감지 시 자동 영상촬영&gt;</em>
</p>


### 3.2 stm32f7에 uCLinux포팅(Self_Study) {#myembedded-linux-stm32f7}

* stm32f4-discovery에 uClinux 포팅
* stm32f7-discovery에 uClinux 포팅

포팅로그 이미지 추가

### 3.3 복합기 인증단말기 개발/유지보수 {#myembedded-linux-maintenance}

* 단말기를 통한 복합기 인증 솔루션 개발
* 소속 : 한국후지제록스
* 기간 : 2011.11 ~ 2013.10 (사원 2년)
  * Linux 및 uClinux 포팅
	* Embedded Linux 기반 tcp/ip 네트워크 어플리케이션 개발
	* C++ Multi-thread 기반 TCP/IP Server Programming
  * [인증용단말기 양산SW개발](https://www.fujixerox.co.kr/ko-KR/Products/KR-Software/Printing-Management)
  * [복합기-결재 단말기 연동 동영상](https://www.youtube.com/watch?v=ArtCujt2TUQ)

임베디드 리눅스를 직접 경험하고, 리눅스 기반 application을 개발하는 역할을 수행하였습니다. 리눅스라는 OS와 친해지고 싶은 마음이 생기는 계기가 되었습니다. 이후 자동차 분야로 업종을 변경하여 아지까지 리눅스에 대한 아쉬음이 많이 남아 있으며, 앞으로 꾸준히 시간을 투자하여 임베디드 리눅스 상에서 동작하는 네트워크 소프트웨어를 개발할 계획을 가지고 있습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/myhistory_4.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

[인증 단말기 개발 및 유지보수](https://m.blog.naver.com/PostView.nhn?blogId=humanwr&logNo=220517005542&proxyReferer=https:%2F%2Fwww.google.com%2F)

<p align="center">
	<img
		src={require('/img/3_embedded/img3_1_fujixerox.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* CPU 재고 소진으로 대체 CPU를 이용한 단말기 개발
  * 스펙결정 및 보드생산 외주업체 선정
  * 대체 단말기 ARM9 Embedded Linux(Bootloader, Kernel, Filesystem 등) 포팅작업 진행 (Embedded Linux)
  * 대체 단말기에서 기존 단말기 펌웨어 기능 재현
(사원증 인식-서버와 TCP/IP통신을 통한 인증확인 - RS422통신을 통한 복합기 제어)
* 유지보수
  * 단말기 TCP/IP 통신을 위한 고객사 별 네트워크 환경에 따른 대응
(원격 접속, 망분리 서버 접근, 서버-클라언트 패킷 확인)
* 인증서버 개발 (C++ Multi-thread programming)
  * 단말기와 인증 서버 간 통신(TCP/IP) 프로토콜 정의
  * 단말기로부터 수신한 인증 정보를 DB(MS-SQL)에서 조회한 후 인증 결과 단말기로 송신
  * 인증 성공 시 문서관리 솔루션 정책에 따른 출력 동작 수행
* MMU가 없는 MCU uClinux(mln7400) 및 linux kernel 2.6(mlc3700) 포팅 - IO device driver 구현/확인

### 3.4 카드리더기 단말기 uCLinux/Linux 포팅 {#myembedded-linux-porting}

* 2440에 ARM9 Linux 포팅
  * 기간 : 2011.11 ~ 2013.10 (사원 2년)
  * 소속 : 한국후지제록스

<p align="center">
	<img
		src={require('/img/3_embedded/img3_2_arm9_linux_porting.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;S3C2440 ARM9에 Embedded Linux 포팅&gt;</em>
</p>


## 4. 센서 개발 {#myembedded-sensor}

### 4.1 다축 Force/Torque센서 상용화 기술 개발 {#myembedded-sensor-ft}

* 삼성전자HME 사업부 주관 다축 Force/Torque 센서 개발
* 소속 : 연세대 자동화기술연구소 계약직 연구원
* 기간 : 2010.09 ~ 2011.09
* 역할 : 상용화기술 개발[(추후 XGEO GC80에 적용됨)](https://www.youtube.com/watch?v=eEmyj61OwYo)

무식하면 용감하다는 얘기가 있듯이 아무것도 모르는 상태에서 포부만으로 기구부, 하드웨어, 소프트웨어 설계를 모두 수행하였습니다. 독학으로 PCB 설계를 학습하여 보드를 직접 제작하였습니다. 제 능력을 넘어서는 일을 맡아 두려움이 컷지만, 부딪히는 난관을 하나하나 차근차근 극복해 나가면서 엔지니어링에 대한 자신감을 갖을 수 있는 값진 경험이었습니다. 담임 교수님과 함게 진행한 선행기술 개발 프로젝트는 추후 실제 제품 상용화로 이어지는 토대가 되었습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img2_1_yonsei_ftsensor.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* DSP를 이용한 신호처리 보드 시스템 구축  
센서를 이용하여 Force와 Torque를 측정하고, 디지털 값으로 변환하여 상위제어기로 센서 데이터 전송
* 아날로그 신호를 처리하는 센서보드 회로도 작성 및 Artwork 작업  
72mm pcb diameter, DSP주변회로, AD/DA(6ch), Amplifier(6ch), CAN, RS485, Power 회로 내장
* 기구부/전장부 일체형 센서 개발
* Calibraion Jig 기구부 설계/발주 (Pro-E, AutoCAD 이용)

해당 프로젝트는 양산 전 선행 프로젝트로 추후 양산제품적용 기반기술로 활용되었음

> 1000만원 이상의 고가센서를 대신하여 상용화 및 양산 성공  
> (삼성전자 XGEO GC80 Soft handling 기능구현에 적용 - 0:45 영상)

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed/eEmyj61OwYo?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;상용화 홍보 동영상&gt;</em>
</p>

* HW 설계, proto type 제어기 제작 경험을 하였음
* 손가락으로 핸들을 움직이는 힘을 측정하는데 센서 기술이 적용됨
* [연세대 건설환경공학과 CORAL LAB - Smart Sensing](https://web.yonsei.ac.kr/coral/project.html)

