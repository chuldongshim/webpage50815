---
id: traindoor
title: 열차 출입문 제어기
---

<div align="right">
  <font size="4">
    17.06.07~19.04.12 <br/>
		22 month
  </font>
</div>

---

<div style={{textAlign: 'center'}}>
    <div style={{position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
        <iframe 
		        src="https://www.youtube.com/embed//qYLRAw-hKN8?rel=0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
            frameBorder="0"
            allowFullScreen="true">
            이 브라우저는 iframe을 지원하지 않습니다.
        </iframe>
    </div><em>[ 장애물 3회 감지 시 열림동작 모터제어 동영상 ]</em>
</div>

### 측출입문 제어기 양산SW 신규개발 {#myembedded-controller-train}

* 소속 : [인터콘시스템스](http://www.icsys.co.kr/s2/s2_5.php)
* 기간 : 18.08.29~19.01.13
* 역할 : 열차 출입문 양산 안정화 및 신규 개발 앙산적용

전동열차출입문제어기 소프트웨어 개발을 담당하여 양산적용하였고, 실차에 적용된 소프트웨어는 현재 정상적으로 현장에서 운행되고 있습니다.

* 소프트웨어 신규 개발 (현재 소사원시, 수인선, 과천안산선 운행중)
  * 통로문, 측출입문 2개 시스템에 대하여 FreeRTOS Multi-Task 기반의 소프트웨어 개발 신규 진행
  * RTOS기반 이중화 소프트웨어 개발 및 하드웨어 디버깅
  * 개발 산출물 작성 및 고객사(현대로템, 코레일) 대응  
  소프트웨어 요구사항 명세서→소프트웨어 설계 명세서→코딩→소프트웨어 시험 절차서→소프트웨어 시험 보고서 작성
  * UML기반 소프트웨어 설계  
  Rhapsody를 통한 소프트웨어 설계 (`Software Architecture & Design Specification_v1_190308.docx` 문서내용 정리)  
  EA를 통해 사양서 기술(`코레일128량 통로문 소프트웨어 설계 규격서_v06_수정후.docx` 문서내용 정리)
* 기능구현 예 - 장애물 3회감지(1,2,3회로 갈수록 장애물 감지 시 도어 닫힘력이 높아짐) 후 열림완료동작 시험

### 측출입문/통로문 제어기 유지보수

* 소속 : [인터콘시스템스](http://www.icsys.co.kr/s2/s2_5.php)
* 기간 : 17.06.07~19.04.12
* 역할 : 소사원시/수인선 납품 제어기 SW품질이슈 대응 및 안정화

코드 개발부터 양산/필드대응까지 소프트웨어 개발 관련 모든 업무를 직접 수행하였습니다. 이곳에서 프로젝트를 관리하기 위한 스킬을 쌓았으며, 업무를 수행하면서 실무에 적용가능하고, 실질적으로 도움이 되는 프로세스를 수립하기 위해 많은 고민을 하였습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/3_embedded/img5_1_train_door.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

* 기존에 개발된 소프트웨어 유지보수 및 소프트웨어 품질관리 [(회사홈페이지 참조)](http://www.icsys.co.kr/s2/s2_5.php)
  * 신사업(고객사 첫 납품)으로 진행된 제품에 대한 소프트웨어 품질문제 현장 대응 및 제품 안정화
  * 열차 현장운행 시 발생되는 이슈 대응 및 제품 안정화
  * 프로젝트 및 품질이슈 관리
  * 오픈소스 툴을 활용한 프로젝트 관리 (SVN을 통한 소스 이력관리, Redmine을 통한 이슈관리)
  * 품질이슈 해결사례 기술 - 고장 발생 시 닫힘동작 계속 Retry

IBM Rhapsody UML로 설계한 시스템 아키텍처 이미지 추가
