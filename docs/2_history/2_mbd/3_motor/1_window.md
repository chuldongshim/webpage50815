---
id: windowMotor
title: 윈도우모터 제어
---

<div align="right">
  <font size="4">
    2013 ~ 2021<br/>
  </font>
</div>

---

<div style={{textAlign: 'center'}}>
    <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
        <iframe 
			src="https://www.youtube.com/embed/eEmUgEgfH4k?rel=0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
            frameBorder="0"
            allowFullScreen="true">
            이 브라우저는 iframe을 지원하지 않습니다.
        </iframe>
    </div><em>[ 장애물 감지 시 윈도우 반전 모터제어 동영상(21년12월03일) 동영상 ]</em>
</div>

### 윈도우 MBD 기본기능 구현 {#mymbd-window-func}

2013년도에 MBD를 처음 시작하였으며, 사내 표준프로세스 구축 업무로 MBD개발 업무가 Holding되어 시뮬레이션을 통해 알고리즘만 개발하고 실제 타겟에 적용하지 못하여 아쉬움이 많이 남았습니다.
하지만 꾸준한 관심과 하고자 하는 의지로 21년에 결국 Manual Coding 없이 모델기반설계로 제어기 개발환경을 구축/적용해 보았고, 제품 수주를 위한 개발활동에 MBD를 적용하여 개발을 진행하고 있습니다.

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 21.08.20 ~ 21.11.30 (책임 3년차)

MBD를 통해 기능로직에 대한 HW 독립적인 SW(C코드)를 자동생성하고, 타겟 MCU에 포팅하여 기능로직 정상동작 확인을 목적으로 프로젝트를 진행하였습니다. MBD를 통해 7가지 기능로직을 설계하고 C코드를 생성 후 타겟 MCU에서 동작하여 설계한 로직을 검증해 보았습니다.

### 윈도우 MBD 선행학습 {#mymbd-window-basic}

처음으로 MBD를 접하여 파워윈도우 시스템을 대상으로 Simulink 모델을 개발하고, 모델로부터 시뮬레이션을 수행하여 모델링 타당성을 검증한 다음, MicroAutoBox를 통해 시뮬레이션과 동일하게 실제 윈도우가 동작되는지를 확인하여 경험을 통해 MBD에 대한 기초를 다질 수 있었습니다.

* 소속 : 동양기전/DYAUTO
* 기간 : 2013.10 ~ 2014.09 (대리 1년차)

<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/img2_1_dyauto_mbd.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

* MicroAutoBox를 이용한 제어기 RCP(Rapid Control Prototyping) 구현 및 동작확인
  * Matlab Stateflow를 이용한 제어 로직 프로그래밍
  * Hardware dependent device driver interface를 통한 peripheral control(Timer/Interrupt, ADC, Port IO 등)
* Matlab/Simulink를 통한 제어기 시뮬레이션 확인 및 모델 코드 자동생성(AutoCode Generation)
* 장애물 감지 시 반전 알고리즘/로직 시뮬레이션

<div style={{textAlign: 'center'}}>
    <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
        <iframe 
			src="https://www.youtube.com/embed/JWzVYKv_Eac?rel=0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
            frameBorder="0"
            allowFullScreen="true">
            이 브라우저는 iframe을 지원하지 않습니다.
        </iframe>
    </div><em>[ 장애물 감지 시 반전 알고리즘 시뮬레이션 동영상 ]</em>
</div>

