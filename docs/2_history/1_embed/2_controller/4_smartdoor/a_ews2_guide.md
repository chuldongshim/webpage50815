---
id: sd_guide
title: + 사용법
---

<div align="right">
  <font size="4">
    23.02.02 ~ 23.04.25<br/>
		about 12 weeks (3 month)
  </font>
</div>

---

스마트 도어 센서에 대한 설명입니다.

## 스마트 도어 센서란

스마트 센서가 부착된 도어의 열림/닫힘을 원격에서 모니터링 할 수 있는 제품입니다. 외출 시 현관문이 열려 있는지 확인할 수 있습니다. 케이스 내부에 위치한 자석으로 스마트 도어 센서를 현관문에 붙이는 방식을 채택하여 드릴작업이 필요 없습니다.

## 설치

제품 설치방법을 설명합니다.
1. PCB에 위치한 스위치가 상부커버 Top면의 홀을 통해 나올 수 있도록 PCB를 상부커버에 Up 방향으로 밀어 넣습니다.
2. 배터리를 하부커버에 올려 놓고, 하부커버를 상부커버에 넣습니다.
3. 하부커버 Bottom면에 위치한 4개의 Hole에 자석을 붙이고, 상부커버와 하부커버가 상하로 움직이지 않게 하부커버 지지대를 상부커버 홈에 맞춰 끼워 넣습니다.
4. 상부커버와 하부커버가 좌우로 움직이지 않게 볼트를 체결하여 고정시킵니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_hw_assemble.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

## 사용법

제품 사용방법을 설명합니다.

### 로그인
PC 또는 스마트폰에서 wifi를 활성화 하고, 사용가능한 네트워크에서 스마트도어 센서를 선택하여 wifi를 연결합니다. wifi 연결 후 크롬 또는 마이크로소프트 엣지와 같은 웹브라우저에서 주소 https://192.168.4.1 로 접속합니다. 초기 로그인 정보 'user/****' 로 로그인을 수행합니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_html3_login.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### Monitoring page

모니터 탭을 클릭하면 도어 상태정보(열림/닫힘)와 상태변경시간을 확인할 수 있습니다. 상태정보는 최근 20개까지만 출력되며, 필요 시 파일로 저장이 가능합니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_html5_openclose.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

## 동영상

### 웹페이지 화면

