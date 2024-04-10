---
id: escalator
title: 에스컬레이터
---

<div align="right">
  <font size="4">
    21.12.01 ~ 22.03.21<br/>
	4 month
  </font>
</div>

---

## Escalator를 통한 GitLab Agile기반 MBD개발 고객대응 {#myprocess-mbdagile-esc-dev}

KTL(한국기술시험원)이 MBD교육을 의뢰하여 진행한 프로젝트로 샘플 타겟을 정하고 MBD기반으로 개발을 진행하고 지원을 해줄 수 없냐는 요청을 받아서 프로젝트를 진행하게 되었습니다.
* 기간 : 21.11.20~22.03.21

### 프로젝트 일정관리 {#myprocess-mbdagile-esc-progress}

Agile 기반 MBD 템플릿 개발 프로젝트 진행

* Github - Agile 기반 프로젝트 관리개발환경 구축  
  : 프로젝트 일정관리 스냅샷 - [esc_progress_total.pdf](/assets/esc_progress_total.pdf)  
  : Github-Gantt차트 연동을 통한 프로젝트 일정관리  
  : Github Repository를 통한 프로젝트 소스 및 산출물 형상관리  
  : 일정-이슈-소스코드 추적성을 확보하여 개발 효율성을 높임

<div style={{width: '100%', textAlign: 'center'}}>
	<img
		src={require('/img/2_mbd/mymbd-esc-gitlab-schedule-mgn.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/><br/><em>&lt;Github와 Gantt차트를 연동한 프로젝트 일정관리&gt;</em>
</div>

### 설계 구현 및 검증

요구사항으로부터 기능을 정의하고, Matlab/Simulink를 이용하여 기능 아키텍처를 설계한 다음
<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-esc-architecture.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

시뮬레이션을 통해 기능(Function block)에 대한 상세로직을 구현하고, 
* 기능 상세구현 예1 - 기본기능(F1_Basic)

<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-esc-f1-vel-measure.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* 기능 상세구현 예2 - 역주행방지기능(F3_ReverseRun)

<p align="center">
	<img
		src={require('/img/2_mbd/mymbd-esc-f3-reverserun.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

시뮬링크 모델로부터 C코드를 자동생성하고, 빌드를 통해 타겟에서 구동검증을 수행하였습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/2_mbd/mymbd-esc-func-test.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>
