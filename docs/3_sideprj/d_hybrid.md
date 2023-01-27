---
id: hybrid
title: 임베디드 웹서버OTA 개요
---

<div align="right">
  <font size="4">
    Since 22.05.22 ~ 22.08.04<br/>
    계획(21.08.17), 진행(22.05.22)
  </font>
</div>

---
## 임베디드 웹서버 구성

브라우저를 통해 웹서버에 접속하고 실행파일를 웹서버의 파일시스템에 업로드한 다음 웹서버 상에서 업데이트 버튼을 누르면 웹서버와 타겟 부트로더와의 무선통신을 통해 실행파일이 타겟에 전송되여 타겟 실행파일 업데이트를 수행한다.

<p align="center">
	<img
		src={require('/img/fourth_wifi_ota.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

## 임베디드 웹서버OTA 개발 개요 {#embed-ota-webserver-summary}

1. [관리 [☜ click for more]](./hybrid/esp32_mgn)
2. [시스템 [☜ click for more]](./hybrid/esp32_sys)
3. [하드웨어 [☜ click for more]](./hybrid/esp32_hw)
4. [소프트웨어 [☜ click for more]](./hybrid/esp32_sw)
