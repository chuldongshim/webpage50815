---
id: safetybelt
title: 안전벨트
---

<div align="right">
  <font size="4">
    2022.03 ~ 22.05<br/>
		3 month
  </font>
</div>

---

### PSB(안전벨트) 기능로직 MBD구현 고객대응 {#mymbd-customer-psb}

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 22.03.01 ~ 현재 (책임 4년차)
* MBD 선행 개발 프로세스 수립
* S32K144+Simulink를 통한 제어 알고리즘 개발 및 AutoCode
* Cypress MCU에서 동작 가능한 HW 독립적인 코드 생성

양산적용을 타겟으로 고객 요청하에 진행된 프로젝트로,
MBD를 통해 PSB(Pre-safe Seat Belt)의 기능로직SW를 개발하는 것이 주요 목적이며,
시뮬링크를 이용하여 아키텍처를 설계하고 기능을 아키텍처에 할당(allocation)하여 Profiling 기능로직을 구현하였다.

다음과 같이 정의된 기능 요구사항을 분석하여,
<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-psb-requirements.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

시스템 아키텍처 설계 후 MBD로 구현할 개발범위/인터페이스를 결정하였다.
<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-psb-architecture.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

Profiling 기능로직을 시뮬레이션으로 확인해 가면서 구현을 진행하였으며, 최종 구현결과는 다음과 같다.
<div style={{textAlign: 'center'}}>
    <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
        <iframe 
			src="https://www.youtube.com/embed//eV5v-e-QV1A?rel=0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
            frameBorder="0"
            allowFullScreen="true">
            이 브라우저는 iframe을 지원하지 않습니다.
        </iframe>
    </div><em>[ 안전벨트 기능로직 MBD구현 동영상 ]</em>
</div>

PC에서 설정된 파라미터 정보를 CAN을 통해 제어기로 전송하하고, 제어입력(Reference Profiling)과 제어출력(Motor Current Sensing)을 비교한 결과가 동일하므로 제어입력을 제어기가 잘 추종하는 것을 확인하였다.
<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-psb-verify.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

시뮬링크를 통해 '요구사항-아키텍처모델-C코드' 간의 양방향 추적성을 확보하였다.
<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-psb-traceability.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

