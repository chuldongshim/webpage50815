---
id: eyeRec
title: 영상 자동기록장치
---

<div align="right">
  <font size="4">
    24.02.02 ~ 24.03.28<br/>
		about 8 weeks (2 month)
  </font>
</div>

---

<div style={{textAlign: 'center'}}>
    <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
        <iframe 
			src="https://www.youtube.com/embed//AgLn7xk26fY?rel=0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
            frameBorder="0"
            allowFullScreen="true">
            이 브라우저는 iframe을 지원하지 않습니다.
        </iframe>
    </div><em>[ 무선으로 웹서버에 접속하여 카메라 영상확인 ]</em>
</div>

### 목적

사람들이 필요로 하고, 사람에게 유용함을 제공할 수 있어야 한다는 생각으로 프로젝트를 진행하고 있습니다. 기술은 사람들에게 유용함을 제공할 수 있어야 한다고 생각합니다. eye Recoder를 이용하면 위험상황을 자동으로 인식하고, 영상을 촬영하여 저장할 수가 있습니다.

* eye Recoder는 센서정보 처리 알고리즘을 통해 차량의 상태(급발진 or 추돌)를 판단하고 사건 발생 시 자동으로 영상을 촬영하고 SDCard에 저장합니다.  
-- 영상 이미지를 통해 특정 상태를 판단하는 AI알고리즘 개발(TBD)  
&emsp;&emsp;: 윈도우에서 Python을 구동하여 영상정보를 통해 얼굴인식, 움직임감지 등 기초적인 동작확인은 완료함  
&emsp;&emsp;: 머신러닝, 강화학습 등 AI알고리즘 Study 후 진행 예정
* 또한 웹서버 기능이 있어 PC 또는 휴대폰에서 웹캠을 원격으로 조정하여 현재 상황을 실시간으로 확인하거나, 사건 발생 시 촬영된 영상을 확인/저장 할 수 있습니다.  
-- 차량 파손 시 영상정보 보존을 위해 Cloud 서버에 촬영된 영상파일 자동전송 기능 추가 예정  
-- SDCard에 저장된 모든 영상은 웹서버를 통해 선택적으로 PC 또는 휴대폰에 저장/재생이 가능함

<div style={{width: '100%'}}>
	<img
		src={require('/img/5_eyeRec/eyeRec_hw_config.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 기능

BeagleboneBlack을 통한 Embedded Linux IOT Application 개발 {#myembedded-linux-bbb}

센서신호를 처리하여 상황을 판단하고 자동으로 영상을 촬영하여 SDCard에 저장합니다.
또한 웹서버 기능이 있어 PC 또는 휴대폰에서 웹캠을 원격으로 조정하여 현재 상황을 실시간으로 확인하거나, 사건 발생 시 촬영된 영상을 확인할 수 있습니다.
SDCard에 저장된 모든 영상은 웹서버를 통해 선택적으로 PC 또는 휴대폰에 저장/재생이 가능합니다.  
(영상 업데이트 개선을 위해 http 기반 영상 스트리밍을 추후 UDP-Multicast 기반 영상스트리밍으로 변경 예정)

### 컨셉

본 제품은 정의된 특정상황 감지 시 자동으로 영상을 촬영하고 저장할 수 있는 시스템이입니다(24.03.21).
웹서버를 통해 구동되므로 인터넷만 연결된다면 PC에서 확인한 것과 동일하게 휴대폰에서도 확인이 가능합니다.
* 급발진 감지 알고리즘 컨셉
  * 칼만필터를 통해 속도정보 노이즈 필터링
  * FFT를 통해 패턴 모니터링 및 정상/급발진 판단
  * 급발진 판단 시 영상(계기판,악셀페달) 자동저장
* 영상정보 저장
  * 웹서버 접속을 통해 현재 촬영중인 영상 확인  
    (시스템에 웹서버가 설치되어 있어 BLE앱 설치 없이 url 접속만으로 이용 가능)
  * 긴급 상황 or 정의된 이벤트 발생 시에만 촬영된 영상 SDCard에 저장
* 원격지에 자동저장 기능
  * 휴대폰 AP와 연동을 통해 원격저장소에 자동 영상정보 업로드
  * 자동알람기능

<div style={{width: '100%'}}>
	<img
		src={require('/img/sixth_embedded_linux.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 구성

* BBB 위치정보 검출  
-- 칼만필터를 통해 각속도(Gyro)와 각가속도(Accelerator)) 센서 정보를 이용하여 위치정보 계산  
-- Matlab/Simulink 시뮬레이션으로 칼만필터 알고리즘을 검증하고 C코드 자동생성  
-- Linux 환경에서 Application 구동(자동생성 C코드를 구동하여 위치판단 후 웹서버에 판단정보 전달)
* BBB 웹서버 구동  
-- Linux 환경에서 Python Flask기반 웹서버 구동  
-- 열림정보 수신 시 http로 스트리밍 영상을 웹브라우저에 출력  
* ESP32-CAM 영상정보 획득  
-- 펌웨어 레벨로 구헌된 C코드를 통해 http를 통해 영상정보를 Python Flask 웹서버에 전송
