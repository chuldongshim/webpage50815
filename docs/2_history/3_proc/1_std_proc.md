---
id: std_proc
title: 표준 프로세스
---

<div align="right">
  <font size="4">
    2014 ~ <br/>
		about 12 weeks (3 month)
  </font>
</div>

---

### 2.4 A-SPICE CL2 인증 및 ISO26262 윈도우 시스템 설계 {#myprocess-std-sys-design-window}

* A-SPICE(CL2달성) 및 ISO26262 대응
* 소속 : 동양기전/DYAUTO
* 기간 : 2014.04 ~ 2016.09 (대리 2/3년차)
* 역할 : 신규 프로세스 구축 및 시스템 설계

프로세스라는 것을 처음으로 접하였고, A-SPICE CL2 인증을 위한 활동을 수행하면서 개발 과정을 체계적으로 파악할 수 있었습니다. 처음에는 컨설팅을 통해 기존 파워윈도우 양산 제품에 대한 시스템 분석/설계 및 사양서를 개발하였습니다. A-SPICE 업무대응을 통해 개발 프로세스에 대한 기초를 다질 수 있었습니다.

* ISO26262 기능안전 시스템 요구사항 명세서 작성
* 시스템 아키텍처 설계 및 FMEA&FTA를 통한 아키텍처 분석

<p align="center">
	<img
		src={require('/img/1_process/process_iso26262_system_Architecture.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;System Architecture 설계&gt;</em>
</p>

표준 프로세스를 구축하면서 진행한 시스템 설계활동을 통해 MBD개발에서 요구되는 아키텍처 설계 역량을 키울 수 있었습니다.  

* 시스템 Functional Architecture 및 Safety Mechanism 설계

<p align="center">
	<img
		src={require('/img/1_process/process_iso26262_function_Architecture.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Functional Architecture 설계&gt;</em>
</p>

시스템 설계를 마친 다음 QAC 및 VectorCAST 툴을 통해 정적/동적 소프트웨어 시험환경을 구축하고 소프트웨어 시험업무를 수행하였습니다. 이때 처음으로 SVN을 이용하여 소스코드를 관리하였습니다.

< QAC, VectorCAST 이미지 추가 >

* 소프트웨어 시험 계획서 작성
* 소프트웨어 정적(QAC) 동적(VectorCAST) 테스트 스펙 작성 및 테스트, 테스트 리포트 생성
* 소프트웨어 통합 테스트 수행


### 3.1 AWS Cloud를 통한 Redmine 환경구축 {#myprocess-management-aws-redmine}

처음에는 서버구축에 대한 고민이 없었기 때문에 Local환경에서 Redmine을 설치하고, 현장에서 발생된 이슈는 회사로 복귀하여 Local Redmine에 업데이트 하였습니다. 이후 프로젝트 인원이 2명이었기 때문에 가능했던 것이라고 생각했고, 인원이 많아지면 불가능 한 방식이라고 생각하여 현장에서도 서버에 접속할 수 있는 방법을 고민하던 중 AWS에 Redmine을 설치하는 방법을 알게되어 개인 프로젝트로 주말에 작업을 진행하여 직접 클라우드 기반 서버를 구축하여 대규모 프로젝트에서 프로젝트를 관리할 수 있는 역량을 확보하였습니다.

<p align="center">
	<img
		src={require('/img/1_process/e_process_aws_redmine_with_phone.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;AWS Cloud 환경에서 Redmine을 통한 이슈관리&gt;</em>
</p>

* 클라우드 서버를 구축하여 장소와 무관하게 Redmine에 접속할 수 있도록 환경 구축
* Local에서만 Redmine에 접속하는 문제를 개선하기 위해 개인적으로 주말 프로젝트로 진행
* 서버 구축 없이 저비용으로 클라우드 서버 구축방법 습득 -> 소규모/저비용 프로젝트에서 활용 가능

### 3.2 Redmine을 통한 SW품질이슈 관리 {#myprocess-management-redmine}

고객사에 출입문 제어 시스템을 처음 납품하는 사례였는데, 입사 시점에 이미 제품이 납품된 상태 여서 초기 품질이슈가 많이 발생하였습니다. ms-office를 통해 이슈를 관리하다가 체계적인 이슈관리의 필요성을 느끼게 되어 프로젝트 관리 솔루션에 관심을 가지게 되었습니다. 이때 Redmine을 처음 접하게 되었고, Redmine을 통해 이슈관리를 수행하였습니다.

<p align="center">
	<img
		src={require('/img/1_process/d_process_train_issue_mgn.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Redmine을 통한 이슈관리&gt;</em>
</p>

* redmine 개발환경 구축
* redmine을 통한 프로젝트 이슈&소스코드 관리 실무적용
* 현장에서 발생된 이슈를 회사로 복귀하여 Local Server에 업데이트
  * 2명에서 해당 프로젝트 이슈를 관리했기 때문에 Local 방식으로 가능
  * 인원이 많으면 불가능 할 것으로 판단되었음
* 엑셀을 통해 이슈를 관리했는데 이슈들이 정리가 되지 않아 이를 해결하고자 이슈관리 툴 Redmine을 도입
