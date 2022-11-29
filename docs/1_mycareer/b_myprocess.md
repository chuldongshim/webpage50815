---
id: myprocess
title: 프로세스개발
---
---

## MBD+AUTOSAR {#myprocess-mbdautosar}

### 개발전략 수립 2차 {#myprocess-mbdautosar-strategy2}

### 개발전략 수립 1차 {#myprocess-mbdautosar-strategy1}


## MBD+Agile {#myprocess-mbdagile}

### GitLab기반 Escalator MBD {#myprocess-mbdagile-escalator}

KTL(한국기술시험원)이 MBD교육을 의뢰하여 진행한 프로젝트로 샘플 타겟을 정하고 MBD기반으로 개발을 진행하고 지원을 해줄 수 없냐는 요청을 받아서 프로젝트를 진행하게 되었습니다. 

Agile 기반 MBD 템플릿 개발 프로젝트 진행

* Github를 통한 프로젝트 관리  
  (agile 기반 개발 프로세스 효율화/최적화)
* Github - Agile 기반 프로젝트 관리 및 개발환경 구축
* Matlab/Simulink를 통한 MBD 개발 프로세스 구축 (요구사항부터 코드/시험까지 일관된 추적성을 유지하며 개발하는 방법론 수립)

<p align="center">
    <a target="_blank"
		href={require('/img/1_process/f_process_gitlab_Escalator.png').default}>
        <img
            src={require('/img/1_process/f_process_gitlab_Escalator.png').default}
            alt="Example banner"
            width="450"
        /><br/><em>&lt;Github와 Gantt차트를 연동한 프로젝트 일정관리&gt;</em>
    </a>
</p>

### GitLab기반 온도 PID제어 MBD {#myprocess-mbdagile-temperature}

MBD를 통해 생성된 자동생성코드가 MCU에 실제로 사용될 수 있을까라는 의문을 해결하기 위해 온도제어 실습이 가능한 EVB보드(TMS320F28069)를 이용하여 MBD기반 온도PID제어기 설계를 개인프로젝트로 진행하였습니다.

<p align="center">
    <a target="_blank"
		href={require('/img/1_process/f_process_gitlab_temp_pid.png').default}>
		<img
			src={require('/img/1_process/f_process_gitlab_temp_pid.png').default}
			width="450"
			alt="Example banner"
		/><br/><em>&lt;GitLab 이슈를 통한 프로젝트 관리&gt;</em>
    </a>
</p>

처음이라 그런지 프로젝트 관리가 제대로 되지 않아서 고민을 하던 차에 Github/GitLab하면 Agile 이야기가 나오는 것을 알게 되었고, "애자일, 민첩하고 유연한 조직의 비밀"이라는 책을 읽게 되었습니다. 프로젝트 경험과 책을 통해서 느낀점은 이후 Agile방식의 프로젝트를 지향하는 계기가 되었고, 그 생각과 실천은 지금까지 이어지고 있습니다.
* 처음으로 GitLab기반 소스 형상관리 수행
* 처음으로 GitLab기반 Task(할일) 및 Issue(문제) 관리 -> 프로젝트 관리 관리 수행

이 프로젝트를 통해 MBD 기반 개발을 타겟에 실제 적용할 수 있겠다는 확신을 갖을 수 있었습니다. 이는 이후 회사에서 MBD 프로젝트를 수행할 수 있는 계기가 되었습니다.  
* 처음으로 MBD기반으로 설계한 로직을 C코드를 자동생성하고 타겟 MCU에 구동
* 모든 MBD기반 프로젝트 진행의 계기가 됨

## 이슈관리 {#myprocess-management}

### AWS Cloud를 통한 Redmine 환경구축 {#myprocess-management-aws-redmine}

처음에는 서버구축에 대한 고민이 없었기 때문에 Local환경에서 Redmine을 설치하고, 현장에서 발생된 이슈는 회사로 복귀하여 Local Redmine에 업데이트 하였습니다. 이후 프로젝트 인원이 2명이었기 때문에 가능했던 것이라고 생각했고, 인원이 많아지면 불가능 한 방식이라고 생각하여 현장에서도 서버에 접속할 수 있는 방법을 고민하던 중 AWS에 Redmine을 설치하는 방법을 알게되어 개인 프로젝트로 주말에 작업을 진행하여 직접 클라우드 기반 서버를 구축하여 대규모 프로젝트에서 프로젝트를 관리할 수 있는 역량을 확보하였습니다.

<p align="center">
    <a target="_blank"
		href={require('/img/1_process/e_process_aws_redmine_with_phone.png').default}>
		<img
			src={require('/img/1_process/e_process_aws_redmine_with_phone.png').default}
			width="450"
			alt="Example banner"
		/><br/><em>&lt;AWS Cloud 환경에서 Redmine을 통한 이슈관리&gt;</em>
    </a>
</p>

* 클라우드 서버를 구축하여 장소와 무관하게 Redmine에 접속할 수 있도록 환경 구축
* Local에서만 Redmine에 접속하는 문제를 개선하기 위해 개인적으로 주말 프로젝트로 진행
* 서버 구축 없이 저비용으로 클라우드 서버 구축방법 습득 -> 소규모/저비용 프로젝트에서 활용 가능

### Redmine을 통한 SW품질이슈 관리 {#myprocess-management-redmine}

고객사에 출입문 제어 시스템을 처음 납품하는 사례였는데, 입사 시점에 이미 제품이 납품된 상태 여서 초기 품질이슈가 많이 발생하였습니다. ms-office를 통해 이슈를 관리하다가 체계적인 이슈관리의 필요성을 느끼게 되어 프로젝트 관리 솔루션에 관심을 가지게 되었습니다. 이때 Redmine을 처음 접하게 되었고, Redmine을 통해 이슈관리를 수행하였습니다.

<p align="center">
    <a target="_blank"
		href={require('/img/1_process/d_process_train_issue_mgn.png').default}>
			<img
				src={require('/img/1_process/d_process_train_issue_mgn.png').default}
				width="450"
				alt="Example banner"
			/><br/><em>&lt;Redmine을 통한 이슈관리&gt;</em>
    </a>
</p>

* redmine 개발환경 구축
* redmine을 통한 프로젝트 이슈&소스코드 관리 실무적용

* 현장에서 발생된 이슈를 회사로 복귀하여 Local Server에 업데이트
  * 2명에서 해당 프로젝트 이슈를 관리했기 때문에 Local 방식으로 가능
  * 인원이 많으면 불가능 할 것으로 판단되었음
* 엑셀을 통해 이슈를 관리했는데 이슈들이 정리가 되지 않아 이를 해결하고자 이슈관리 툴 Redmine을 도입


## 표준프로세스 구축 {#myprocess-std}

### 프로젝트 관리 및 A-SPICE CL3 인증 {#myprocess-std-cl3}

A-SPICE/ISO26262 표준 프로세스 구축 프로젝트 PM으로 다음 역할을 수행하여 A-SPICE CL3 인증을 획득하였습니다.

* A-SPICE(CL3달성) 및 ISO26262 대응
* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 2019.05 ~ 2019.12 (책임 1년차)
* 역할 : 표준 프로세스 고도화 및 프로젝트 관리

A-SPICE CL2 인증을 받은 파워윈도우 양산 재품을 대상으로 A-SPICE CL3 인증을 받기 위해 컨설팅을 받으면서 사내 표준 프로세스를 수립하고, A-SPICE 표준 프로세스를 기반으로 PM역할을 수행하여 프로젝트 일정관리를 통해 기간내에 프로젝트를 완료할 수 있는 방법을 습득할 수 있었습니다. 여기서 수행한 프로젝트 관리 업무는 이후 프로젝트를 효율적으로 관리하는 방법론을 모색할 수 있는 중요한 경험적인 토대가 되었습니다.

* 사내 개발 표준 프로세스 수립
* 개발 일정 WBS 수립
* 프로젝트 산출물 및 개발 일정 관리
* 인증 심사 대응

<p align="center">
	<img
		src={require('/img/1_process/a_process_std.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;A-SPICE/ISO26262 통합 표준 프로세스 수립&gt;</em>
</p>

### A-SPICE 및 ISO26262 시스템 설계 {#myprocess-std-sys-design}

:::important
표준 프로세스를 구축하면서 진행한 시스템 설계활동을 통해 MBD개발에서 요구되는 아키텍처 설계 역량을 키울 수 있었습니다.
:::

#### 윈도우 시스템 설계

<p align="center">
	<img
		src={require('/img/1_process/process_iso26262_function_Architecture.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Functional Architecture 설계&gt;</em>
</p>

* ISO26262 기능안전 시스템 요구사항 명세서 작성
* 시스템 아키텍처 및 Safety Mechanism 설계
* FMEA & FTA 수행을 통한 시스템 아키텍처 분석
* 시스템 설계 명세서 작성

#### 선루프 시스템 설계

* 소속 : DYESSYS(DYAUTO, ESSYS 합작사)
* 기간 : 2019.12 ~ 2020.08 (책임 2년차)
* 역할 : Sunroof 선행개발 프로젝트 시스템 설계(양산수주로 이어짐)

표준 프로세스를 기반으로 Process Tailoring을 수행하여 선행개발 프로세스를 수립하고 프로젝트 일정을 관리하였습니다. 이 프로젝트는 요구사항정의/설계/구현/검증 절차를 따라서 개발 진행하고 프로젝트 일정 및 이슈관리를 수행한 내용들을 고객에게 어필하여 추후 고객에게 수주를 받아 양산 개발로 이어질 수 있었습니다.

<p align="center">
	<img
		src={require('/img/1_process/b_process_sunroof_prj_mgn.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;선루프 개발 프로젝트 일정 관리&gt;</em>
</p>

일정관리와 함께 선루프 아이템을 대상으로 고객 요구사항을 분석하여 시스템 아키텍처를 설계하고 기능을 정의하였습니다. 소프트웨어 엔지니어를 통한 기능구현 완료 후 기능 시험스펙을 작성하고 시스템 시험을 직접 수행하여 요구사항에 따라 소프트웨어가 구현되었는지를 검증하였습니다.

<p align="center">
	<img
		src={require('/img/1_process/c_process_sunroof_sysads.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;선루프 시스템 아키텍처 설계&gt;</em>
</p>

### ISO26262프로세스구축 & A-SPICE CL2인증 {#myprocess-std-cl2}

* A-SPICE(CL2달성) 및 ISO26262 대응
* 소속 : 동양기전/DYAUTO
* 기간 : 2013.10 ~ 2016.09 (대리 2년차)
* 역할 : 신규 프로세스 구축 및 시스템 설계

프로세스라는 것을 처음으로 접하였고, A-SPICE CL2 인증을 위한 활동을 수행하면서 개발 과정을 체계적으로 파악할 수 있었습니다. 처음에는 컨설팅을 통해 기존 파워윈도우 양산 제품에 대한 시스템 분석/설계 및 사양서를 개발하였습니다. A-SPICE 업무대응을 통해 개발 프로세스에 대한 기초를 다질 수 있었습니다.

< EA를 통한 시스템 설계 이미지 추가 >

시스템 설계를 마친 다음 QAC 및 VectorCAST 툴을 통해 정적/동적 소프트웨어 시험환경을 구축하고 소프트웨어 시험업무를 수행하였습니다. 이때 처음으로 SVN을 이용하여 소스코드를 관리하였습니다.

< QAC, VectorCAST 이미지 추가 >

* 소프트웨어 시험 계획서 작성
* 소프트웨어 정적(QAC) 동적(VectorCAST) 테스트 스펙 작성 및 테스트, 테스트 리포트 생성
* 소프트웨어 통합 테스트 수행

