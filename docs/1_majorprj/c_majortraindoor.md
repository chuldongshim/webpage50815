---
id: majortraindoor
title: ┗ 열차 출입문 제어기
---
---

:::important
자세히 기술할 것
현재까지의 경험들을 임베디드 관점으로 기술 (임베디드와 무관한 경험은 embedded섹션에서 제외)
이 프로젝트에서 한거는 짬뽕으로 썩어서 다 넣을 것
:::

## 열차 출입문 제어기 양산SW 개발

* 소속 : [인터콘시스템스](http://www.icsys.co.kr/s2/s2_5.php)
* 기간 : 2017.06 ~ 2019.04 (과장 2년
* 역할 : 열차 출입문 양산 안정화 및 신규 개발 앙산적용

<p align="center">
	<iframe 
		width="350" height="250"
		src="https://www.youtube.com/embed//qYLRAw-hKN8?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 3회 감지 시 열림동작&gt;</em>
</p>

## Redmine 이슈 및 품질관리

고객사에 출입문 제어 시스템을 처음 납품하는 사례였는데, 입사 시점에 이미 제품이 납품된 상태 여서 초기 품질이슈가 많이 발생하였습니다. ms-office를 통해 이슈를 관리하다가 체계적인 이슈관리의 필요성을 느끼게 되어 프로젝트 관리 솔루션에 관심을 가지게 되었습니다. 이때 Redmine을 처음 접하게 되었고, Redmine을 통해 이슈관리를 수행하였습니다.

<p align="center">
	<div class="box">
		<img
			src={require('/img/1_process/d_process_train_issue_mgn.png').default}
			alt="Example banner"
		/><br/><em>&lt;Local Redmine을 통한 이슈관리&gt;</em>
	</div>
</p>

## AWS-Clude Redmine

처음에는 서버구축에 대한 고민이 없었기 때문에 Local환경에서 Redmine을 설치하고, 현장에서 발생된 이슈는 회사로 복귀하여 Local Redmine에 업데이트 하였습니다. 이후 프로젝트 인원이 2명이었기 때문에 가능했던 것이라고 생각했고, 인원이 많아지면 불가능 한 방식이라고 생각하여 현장에서도 서버에 접속할 수 있는 방법을 고민하던 중 AWS에 Redmine을 설치하는 방법을 알게되어 개인 프로젝트로 주말에 작업을 진행하여 직접 클라우드 기반 서버를 구축하여 대규모 프로젝트에서 프로젝트를 관리할 수 있는 역량을 확보하였습니다.

<p align="center">
	<div class="box">
		<img
			src={require('/img/1_process/e_process_aws_redmine_with_phone.png').default}
			alt="Example banner"
		/><br/><em>&lt;AWS Cloud Redmine을 통한 이슈관리&gt;</em>
	</div>
</p>
