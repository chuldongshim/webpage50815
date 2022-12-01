---
id: temperature
title: MBD기반 온도PID제어 개요
---

<div align="right">
  <font size="4">
    20.08.12 ~ 20.11.12
  </font>
</div><br/>

39살, 40을 바라보는 나이에 좀 더 열정적이고 주도적으로 살고 싶은 마음에 자기개발을 위해 시작한 첫 개인프로젝트로 비록 내용은 별볼일 없을지라도 이 프로젝트를 통해 자신감을 갖을 수 있었던 의미있는 프로젝트였습니다.
이 시기에 [Agile혁명](/blog/hello-world#agile-secret)이라는 책을 읽고 Agile Mind를 갖게 되었으며 지금까지 개발자로서 무언가에 끊임없이 도전할 수 있는 계기가 되었습니다.

---

## 온도 PID제어 시스템 구성 {#temperature-pid-ctrl-system}

저항에 붙어있는 온도센서를 통해 온도를 센싱하면서 Watt저항에 PID제어로 PWM을 출력하여 온도를 조절함

<p align="center">
	<img
		src={require('/img/2_mbd/img3_3_hw_config.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;출처 - 싱크웍스&gt;</em>
</p>

## 온도 PID제어 개발 개요

* [프로젝트 관리 ☜ click for more](./temperature/temperature_mgn)
  * 처음으로 진행한 MBD프로젝트
  * 프로젝트를 통해 MBD 개발 프로세스 수립
  * 최초 자동생성 C코드를 타겟에서 구동하여 모델 시뮬레이션과 실제구현이 동일하게 동작되는 것을 확인함
* [설계 및 검증 ☜ click for more](./temperature/temperature_design)
  * MBD구현
