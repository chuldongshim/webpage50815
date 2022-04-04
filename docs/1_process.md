---
id: process
title: 프로세스 경험 요약
---
---

mindstorm과 같이 전체로드맵 한번에 볼 수 있도록 첫페이지에 이미지 추가

## A-SPICE

### A-SPICE CL2

프로세스라는 것을 처음으로 접하였고, 개발 과정을 체계적으로 파악할 수 있었습니다.

여기서는 컨설팅을 통해 기존 파워윈도우 양산 제품에 대한 시스템 분석/설계 및 사양서를 개발하였고,

< EA를 통한 시스템 설계 이미지 추가 >

QAC 및 VectorCAST 툴을 통해 정적/동적 소프트웨어 시험환경을 구축하고 소프트웨어 시험업무를 수행하였습니다. 이때 처음으로 SVN을 이용하여 소스코드를 관리하였습니다.

< QAC, VectorCAST 이미지 추가 >

### A-SPICE CL3

A-SPICE CL2 인증을 달성한 파워윈도우 양산 재품을 대상으로 컨설팅을 통해 사내 표준 프로세스를 수립하고, A-SPICE 표준 프로세스를 기반으로 PM역할을 수행하여 프로젝트 일정관리를 통해 기간내에 프로젝트를 완료할 수 있는 방법을 습득할 수 있었습니다. 여기서 수행한 프로젝트 관리 업무는 이후 프로젝트를 효율적으로 관리하는 방법론을 모색할 수 있는 중요한 경험적인 토대가 되었습니다.

<p align="center">
	<img
		src={require('/img/1_process/1_process_std.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;A-SPICE 표준 프로세스&gt;</em>
</p>

## Design

### 윈도우 기능안전 시스템 설계

### 선루프 시스템 설계

표준 프로세스를 기반으로 Process Tailoring을 수행하여 선행개발 프로세스를 수립하고 프로젝트 일정을 관리하였습니다. 이 프로젝트는 요구사항정의/설계/구현/검증 절차를 따라서 개발 진행하고 프로젝트 일정 및 이슈관리를 수행한 내용들을 고객에게 어필하여 추후 고객에게 수주를 받아 양산 개발로 이어질 수 있었습니다.

<p align="center">
	<img
		src={require('/img/1_process/1_process_sunroof_prj_mgn.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;선루프 개발 프로젝트 일정 관리&gt;</em>
</p>

일정관리와 함께 선루프 아이템을 대상으로 고객 요구사항을 분석하여 시스템 아키텍처를 설계하고 기능을 정의하였습니다. 소프트웨어 엔지니어를 통한 기능구현 완료 후 기능 시험스펙을 작성하고 시스템 시험을 직접 수행하여 요구사항에 따라 소프트웨어가 구현되었는지를 검증하였습니다.

<p align="center">
	<img
		src={require('/img/1_process/1_process_sunroof_sysads.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;선루프 시스템 아키텍처 설계&gt;</em>
</p>

## Agile

### Redmine 이슈 및 품질관리

고객사에 출입문 제어 시스템을 처음 납품하는 사례였는데, 입사 시점에 이미 제품이 납품된 상태 여서 초기 품질이슈가 많이 발생하였습니다. ms-office를 통해 이슈를 관리하다가 체계적인 이슈관리의 필요성을 느끼게 되어 프로젝트 관리 솔루션에 관심을 가지게 되었습니다. 이때 Redmine을 처음 접하게 되었고, Redmine을 통해 이슈관리를 수행하였습니다.

<p align="center">
	<img
		src={require('/img/1_process/1_process_train_issue_mgn.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Local Redmine을 통한 이슈관리&gt;</em>
</p>

#### AWS-Clude Redmine

처음에는 서버구축에 대한 고민이 없었기 때문에 Local환경에서 Redmine을 설치하고, 현장에서 발생된 이슈는 회사로 복귀하여 Local Redmine에 업데이트 하였습니다. 이후 프로젝트 인원이 2명이었기 때문에 가능했던 것이라고 생각했고, 인원이 많아지면 불가능 한 방식이라고 생각하여 현장에서도 서버에 접속할 수 있는 방법을 고민하던 중 AWS에 Redmine을 설치하는 방법을 알게되어 개인 프로젝트로 주말에 작업을 진행하여 직접 클라우드 기반 서버를 구축하여 대규모 프로젝트에서 프로젝트를 관리할 수 있는 역량을 확보하였습니다.

<p align="center">
	<img
		src={require('/img/1_process/1_process_aws_redmine_with_phone.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;AWS Cloud Redmine을 통한 이슈관리&gt;</em>
</p>

### GitLab 온도PID제어 MBD실습

처음으로 GitLab을 사용하여 소스를 관리하였고, GitLab을 통해 Task(할일) 및 Issue(문제) 관리를 시도 하였습니다. 처음이라 그런지 프로젝트 관리가 제대로 되지 않아서 고민을 하던 차에 Github/GitLab하면 Agile 이야기가 나오는 것을 알게 되었고, "애자일, 민첩하고 유연한 조직의 비밀"이라는 책을 읽게 되었습니다. 프로젝트 경험과 책을 통해서 느낀점은 이후 Agile방식의 프로젝트를 지향하는 계기가 되었고, 그 생각과 실천은 지금까지 이어지고 있습니다.

<p align="center">
	<img
		src={require('/img/1_process/1_process_gitlab_temp_pid.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

### GitHub 속도측정 MBD개발

KTL(한국기술시험원) 의뢰로 샘플 타겟을 정하고 MBD기반으로 개발을 진행하고 지원을 해줄 수 없냐는 요청을 받아서 프로젝트를 진행하게 되었습니다. 

Agile 기반 MBD 템플릿 개발 프로젝트 진행

* github를 통한 프로젝트 관리  
  (agile 기반 개발 프로세스 효율화/최적화)

### MBD with Agile

선행개발 프로젝트를 대상으로 Agile 기반 MBD 개발 프로세스 구축(22.02.24~)


