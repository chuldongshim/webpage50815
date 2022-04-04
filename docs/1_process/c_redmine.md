---
id: redmine
title: Redmine 형상관리
---

---

## Redmine

Docusaurus creates a **page for each blog post**, but also a **blog index page**, a **tag system**, an **RSS** feed...

## redmine을 통한 품질이슈관리

<p align="center">
	<img
		src={require('/img/1_process/1_process_train_issue_mgn.png').default}
		alt="Example banner"
		width="750"
	/><br/><em>&lt;이슈관리 사례&gt;</em>
</p>

* redmine 개발환경 구축
* redmine을 통한 프로젝트 이슈&소스코드 관리 실무적용

* 현장에서 발생된 이슈를 회사로 복귀하여 Local Server에 업데이트
  * 2명에서 해당 프로젝트 이슈를 관리했기 때문에 Local 방식으로 가능
  * 인원이 많으면 불가능 할 것으로 판단되었음
* 엑셀을 통해 이슈를 관리했는데 이슈들이 정리가 되지 않아 이를 해결하고자 이슈관리 툴 Redmine을 도입

## redmine-AWS연동

* 클라우드 서버를 구축하여 장소와 무관하게 Redmine에 접속할 수 있도록 환경 구축
* Local에서만 Redmine에 접속하는 문제를 개선하기 위해 개인적으로 주말 프로젝트로 진행
* 서버 구축 없이 저비용으로 클라우드 서버 구축방법 습득 -> 소규모/저비용 프로젝트에서 활용 가능

