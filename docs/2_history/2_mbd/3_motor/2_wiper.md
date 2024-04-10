---
id: wiperMotor
title: 와이퍼모터 제어
---

<div align="right">
  <font size="4">
    2021 ~ 2022<br/>
  </font>
</div>

---

### 와이퍼 MBD 제어기설계(관측기,LQR) {#mymbd-wiper-lqr}

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 22.09.01~22.10.18 (책임 4년차)
* 목적 : 현대제어기법 Wiper MBD 적용
* 해당 제어기는 다음의 성능사양을 만족해야 한다.
  * 3.5s 주기로 Wiping을 수행하다 1s 주기로 Wiping 수행
  * 60[CPM] 구동 - 1s 당 1회 Wiping
  * Wiping 주기가 1s인 경우 0.5s동안 0°->134°, 0.5s동안 134°->0°로 Wiping 수행
  * 제어로직 실행시간 : 10us @ s32k144
  * 개발 하드웨어 - S32K144(48MHz Cortex-M4 with FPU) + VNH5019(ST모터드라이버)
* 기본 동작확인을 위한 PID 피드백 구현
  * 위치/속도 피드백 제어

<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-wiper-pid.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

* 성능개선을 위한 상태피드백 구현
  * DC모터 모델링 및 시뮬레이션  
  : 전달함수를 상태방정식으로 변환  
  : <a href="/assets/kalman/Maxon_Motor_.html" target="_blank">모터 전달함수 모델링[☜ click for more]</a>
  * 관측기를 통한 전상태모니터링  
  : 상태관측기를 통한 상태추정  
  : <a href="/assets/kalman/Webpage_Maxon_Motor_1_ObserverStateFB_.html" target="_blank">State Feedback Control by full state observer(관측기를 통한 전상태모니터링) [☜ click for more]</a>
  * Robust 상태피드백 제어  
  : LQR상태피드백 제어 + 오차적분제어 + Anti-Windup(Saturation Limit을 통한 적분기 출력제한)  
  : <a href="/assets/kalman/Webpage_Maxon_Motor_2_RobustStateFB_.html" target="_blank">Robust Control by Integral Action(외란 오차제거) and Anti-Windup [☜ click for more]</a>

<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-wiper-lqr_1.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

상태피드백 제어 알고리즘을 Simulink를 통해 C코드로 자동생성하고, 컴파일 하여 타겟 MCU에서 실행  
0°~135°를 3.5s 주기로 Wiping 하다가 1s 주기로 변경하여 Wiping 수행
<div style={{textAlign: 'center'}}>
    <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
        <iframe 
			src="https://www.youtube.com/embed//n_bor37xbMU?rel=0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
            frameBorder="0"
            allowFullScreen="true">
            이 브라우저는 iframe을 지원하지 않습니다.
        </iframe>
    </div><em>[ 관측기 상태피드백을 통한 LQR제어 동영상 ]</em>
</div>

MCU에서 상태피드백 제어 방식으로 와이퍼모터를 제어하고, 통신으로 위치정보를 수신하여 다음과 같이 1s 주기마다 Wiping 동작하는 것을 확인함
<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-wiper-lqr_2.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 와이퍼 MBD 기본기능 구현 {#mymbd-wiper-func}

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 21.04.01 ~ 21.06.30 (책임 3년차)
* 목적 : GitLab-Agile방식을 통한 Wiper MBD개발
  * MBD기반 제어로직 모델링
  * 시뮬레이션을 통한 모델 검증
  * 자동생성코드 타겟MCU(RCP) 구현 및 동작검증
* 구현 내용 : Wiper모터를 대상으로 모터구동부 구현
  * 기능로직 보다는 모터구동부만 구현
  * 모터 가속-등속-감속제어를 위한 profiling 로직 설계
  * 위치/속도 PID제어
(공유한 구동부-통신부-제어로직부 ... 블록다이어그램 이미지(fig_2_1 추가)

제어로직을 개발하고, 시뮬레이션을 통해 제어로직 검증(MIL, Model In the Loop)을 수행하였습니다. 

<div style={{textAlign: 'center'}}>
    <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
        <iframe 
			src="https://www.youtube.com/embed/nDjuDzeTUoU?rel=0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
            frameBorder="0"
            allowFullScreen="true">
            이 브라우저는 iframe을 지원하지 않습니다.
        </iframe>
    </div><em>[ 입력각도로 Linkage 위치 피드백제어 3D시뮬레이션 동영상 ]</em>
</div>

제어로직 개발 후 MBD를 통해 생성된 자동생성코드가 실제 MCU에 적용되어 시뮬레이션과 동일하게 동작하는 것을 확인함으로써 MBD가 개발실무에 적용이 가능한지 타당성을 확인하는 것을 목적으로 프로젝트를 진행하였습니다.

<div style={{textAlign: 'center'}}>
    <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
        <iframe 
			src="https://www.youtube.com/embed/gZ7yAiUIIdw?rel=0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
            frameBorder="0"
            allowFullScreen="true">
            이 브라우저는 iframe을 지원하지 않습니다.
        </iframe>
    </div><em>[ Auto Wiping 동작확인 동영상 ]</em>
</div>
