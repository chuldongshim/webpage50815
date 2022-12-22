---
id: window_verify_traceability
title: 추적성확보
---
---

## 추적표 자동생성

1. Requirements Editor를 통해 요구사항을 작성 or Import 한 다음 요구사항을 블록으로 드래그하여 링크를 생성한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_design_reqs_1_Requirement_Editor.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;요구사항 작성&gt;</em>
</p>
2. Requirements Editor에서 Traceability Matrix를 선택하여 추적표를 자동으로 생성한다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_design_reqs_2_auto_traceability_matrix.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;추적표 자동생성&gt;</em>
</p>
3. 요구사항에 연결된 링크를 선택하면 연결된 블록이 자동으로 화면에 나타나서 어떤 Function Block이 요구사항을 구현하고 있는지 쉽게 확인할 수가 있다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_design_reqs_3_traceability_corss_check.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;추적표 확인&gt;</em>
</p>

## 추적표 html Export

Traceability Matrix Dialog에서 Export기능(Export 버튼 클릭)을 통해 추적표를 html로 export 할 수 있다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_design_reqs_4_traceability_matrix_html.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;Export Traceability Matrix to html&gt;</em>
</p>

## 요구사항 추적표 (최종)

Function block과 기능요구사항 간의 추적표를 시뮬링크를 통해 자동으로 생성한다.

<p align="center">
    <a target="_blank"
    href="/assets/mbd/SLReqMatrixSnapShot.html">
        <img
            src={require('/img/2_mbd/mbd_sys_t2_traceability.png').default}
			width="450"
            alt="Example banner"
        /><br/><em>&lt;Traceability Matrix&gt;</em>
    </a>
</p>

## 참고자료

* [Simulink Model로부터 요구사항 추적표 자동생성 - 2019a에는 없고, 2021b에 있음](https://kr.mathworks.com/help/slrequirements/ug/track-requirement-links-with-a-traceability-matrix.html)


