---
id: window_design_cencept
title: 개발컨셉
---
---

## 설계컨셉

:::important
반복작업을 최소화 하기 위해 아키텍처 작성은 개발 처음과 끝에 각각 1회씩만 작성하여 업데이트 한다.
* <u>개발 초기단계에 `예비 아키텍처(Preliminary Architecture)`를 1회 작성</u>하고,
* 이를 바탕으로 시뮬링크 모델링→기능구현→시뮬레이션을 진행하며,
* 모든 기능구현 및 시험이 완료되는 <u>프로젝트 종료시점에 `최종 아키텍처(Architecture)`를 1회 개정</u>한다.
:::

시뮬링크를 이용하여 아키텍처를 설계하고, 기능을 아키텍처에 <u>할당(allocation)</u>한다.

## Physical Architecture

* 하드웨어 의존적인 MCU Peripherals 영역을 Physical로 분류한다.

## Logical Architecture

:::info
로직으로 언급되는 시스템 구성요소는 모델을 통한 시뮬레이션을 이용하여 하드웨어 독립적으로 개발이 가능함을 의미한다.
:::
하드웨어 독립적으로 실행할 수 있는 부분을 Logical로 분류하고, MIL단계 시뮬링크 시뮬레이션을 통해 Logical Component(Software Logic)를 개발한다.


* Input Processing
  * 사용자 입력을 처리하여 WindowLogic의 상태천이 조건을 생성하는 로직
* Window State
  * 상태천이를 이용하여 PWS의 여러 기능을 구현하는 로직
* Output Processing
  * Trigger 신호를 입력받아 0~1(0~100%) 범위의 출력을 조절하여 프로파일링 신호를 생성한다.
  * 프로파일링 신호를 제어입력으로 하여 피드백 제어를 수행한다.
* Pos Calculator
  * 엔코더 펄스 카운트 값과 엔코더 펄스 주기를 입력으로 받아 속도 및 위치를 계산하는 로직
* Obstacle Detect
  * T.B.D
* Comm Processing
  * T.B.D

## 참고자료

* [S32K1xx Series Safety Manual](https://usermanual.wiki/Document/S32K1xx20Series20Safety20ManualREV204.925554493/view)
* Simulink Library  
Matlab Path에 lib파일위치 추가→set_param(gcs,'EnableLBRepository','on') 실행→Simulink Library Browser 새로고침(F5)
* [사용자 지정 라이브러리 (by Mathworks)](https://kr.mathworks.com/help/simulink/libraries.html)
* [라이브러리 브라우저에 라이브러리 추가 (by Mathworks)](https://kr.mathworks.com/help/simulink/ug/adding-libraries-to-the-library-browser.html)
* [Creating Customized Block Libraries 동영상 (by Mathworks)](https://kr.mathworks.com/videos/creating-customized-block-libraries-101591.html)
* [사용자 지정 라이브러리 만들기 (by Mathworks)](https://kr.mathworks.com/help/simulink/ug/creating-block-libraries.html)
* [구성요소 기반 모델링 지침 (by Mathworks)](https://kr.mathworks.com/help/simulink/ug/component-based-modeling-guidelines.html)

