---
id: train_door
title: 열차 출입문 제어
---

---

# 열차출입문

코드 개발부터 양산/필드대응까지 소프트웨어 개발 관련 모든 업무를 직접 수행하였습니다. 이곳에서 프로젝트를 관리하기 위한 스킬을 쌓았으며, 업무를 수행하면서 실무에 적용가능하고, 실질적으로 도움이 되는 프로세스를 수립하기 위해 많은 고민을 하였습니다.

## 습득기술
* 경험 기반 개발 프로세스 구축
* 양산/필드 대응 (현재 소사원시, 수인선, 과천안산선 운행중)
* 프로젝트 관리 역할 수행

## [수행업무](http://www.icsys.co.kr/s2/s2_5.php)

<p align="center">
	<img
		src={require('/img/3_embedded/img5_1_train_door.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

* 기존 소프트웨어 유지보수
  * 신사업(고객사 첫 납품)으로 진행된 제품에 대한 소프트웨어 품질문제 현장 대응 및 제품 안정화
  * 기존에 개발된 소프트웨어 유지보수 및 소프트웨어 품질관리
* 소프트웨어 신규 개발
  * 통로문, 측출입문 2개 시스템에 대하여 FreeRTOS Multi-Task 기반의 소프트웨어 개발 신규 진행
  * 오픈소스 툴을 활용한 프로젝트 관리
  (SVN을 통한 소스 이력관리, Redmine을 통한 이슈관리)
  * 개발 산출물 작성 및 고객사(현대로템, 코레일) 대응
  소프트웨어 요구사항 명세서 -> 소프트웨어 설계 명세서 -> 코딩 -> 소프트웨어 시험 절차서 -> 소프트웨어 시험 보고서 작성 
* 장애물 3회감지(1,2,3회로 갈수록 장애물 감지 시 도어 닫힘력이 높아짐) 후 열림완료동작 시험
<p align="center">
	<iframe 
		width="350" height="250"
		src="https://www.youtube.com/embed//qYLRAw-hKN8?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;장애물 3회 감지 시 열림동작&gt;</em>
</p>


## 측출입문 개발

* rhapsody를 통해 사양서 기술
* `Software Architecture & Design Specification_v1_190308.docx` 문서내용 정리

* 품질이슈 해결사례 기술
  * 고장 발생 시 닫힘동작 계속 Retry

## 통로문 개발

* EA를 통해 사양서 기술
* `코레일128량 통로문 소프트웨어 설계 규격서_v06_수정후.docx` 문서내용 정리

