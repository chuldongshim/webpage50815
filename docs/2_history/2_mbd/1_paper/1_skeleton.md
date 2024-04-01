---
id: skeleton
title: 석사논문
---

<div align="right">
  <font size="4">
    2007 ~ <br/>
		about 12 weeks (3 month)
  </font>
</div>

---

### 5.2 졸업논문 DC모터 PID제어 {#mymbd-start-graduation}

졸업논문 : [제어모드 변환을 통한 지능형 근력강화 시스템 개발 [☜ Click here to see the paper]](https://m.riss.kr/search/detail/ssoSkipDetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=cfd4eb61d6f0d291ffe0bdc3ef48d419)  
졸업논문에서 지능형 근력강화 시스템을 수학적으로 모델링하고, 모델링한 시스템을 분석할 때 처음으로 Matlab/Simulink를 사용하였습니다.  
처음 시뮬링크를 사용하였을 때에는 시스템을 모델링하여 분석하는 용도로만 사용했었고, 분석내용을 이용하여 Manual Coding으로 개발을 진행하였습니다.

<p align="center">
	<img
		src={require('/img/3_embedded/img1_0_mju_paper.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

* 담당
  * 기구부 및 전장부 설계 및 개발
  * 시스템 요소를 Modeling한 후 Matlab-Simulink 시뮬레이션과 실제 실험데이터와의 비교를 통하여 Modeling의 타당성 검증
  * 시스템 요소 Modeling의 타당성을 검증한 후 전체 시스템으로 통합하는 단계적인 절차 제시
  * 통합된 System Model의 안정성 확인을 통하여 제어기 성능을 검증하고 주어진 제어 명령을 잘 추종하는 제어기 설계
  * Modeling System과 Real System과의 출력 데이터 일치 여부를 확인하여 제어기 성능 검증
  * 실제 System을 이용하여 사용자의 근력 증강 여부 검증 
* 개발내용
  * FSR(Force Sensing Registor)를 통하여 시스템 입력(제어명령)을 생성하고 전압(PWM) 제어기를 통하여 모터 제어 (Force Sensing Registor : 힘에 비례하여 전압이 증가하는 센서)
  * 제어기는 구동 상태에 따라 제어 모드를 변환시켜 모터 제어 (FSR 입력이 없을 때에는 PI제어(위치)를 수행하고, FSR 입력이 있을 때에는 PD제어(속도) 수행)
  * 검지 손가락의 미미한 움직임을 통하여 5kg의 물건을 움직여 개발된 시스템 동작 확인

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed/Bdt_fOkhiw8?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe><br/><em>&lt;명지대 석사논문 동영상 (2007.03 ~ 2009.02)&gt;</em>
</p>

