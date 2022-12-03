---
id: window_realize_f7_KalmanFilter
title: F7 칼만필터(TBD)
---
---

## 기본개념 {#basic-concept}

칼만필터를 통한 모터제어(LQG)는 matrix 형태의 상태방정식으로 표현되기 때문에 matrix 연산을 위한 선형대수학에 대한 이해가 선행되어야 한다.

:::note [Html Link]
0. <a href="/assets/kalman/Maxon_Motor_.html" target="_blank">모터 전달함수</a>
1. <a href="/assets/kalman/Webpage_Maxon_Motor_1_ObserverStateFB_.html" target="_blank">State Feedback Control by full state observer(관측기를 통한 전상태모니터링)</a>
2. <a href="/assets/kalman/Webpage_Maxon_Motor_2_RobustStateFB_.html" target="_blank">Robust Control by Integral Action(외란 오차제거) and Anti-Windup(Saturation Limit을 통한 적분기 출력제한)</a>
3. <a href="/assets/kalman/Webpage_Maxon_Motor_3_Kalman_.html" target="_blank">Kalman Filter</a>
4. <a href="/assets/kalman/Webpage_Maxon_Motor_4_Stochastic_.html" target="_blank">Stochastic Estimation Control by LQG</a>
5. <a href="/assets/kalman/Q_filter.html" target="_blank">Q-Filter</a>
:::

> <font color="blue"><strong>Kalman-Filtering 기능</strong></font><br/>
> 엔코더를 통해 측정한 위치/속도에 대한 필터링을 수행하고 이용하여 전류를 추정한다.

:::important
* 모터과열방지 기능이 없는 상태에서 모터연속동작 시 과열에 의해 아마추어 내부 플라스틱이 녹아 정상적으로 모터가 구동되지 않는 현상 발생함(21.10.13)
* 모터 발생열은 모터에 흐르는 전류에 비례하므로 엔코더 펄스를 이용하여 모터에 흐르는 전류를 추정하고, 이를 이용하여 모터발생열을 추정하여 모터과열로 인한 모터파손을 방지해야 한다. (`모터시스템에 필히 구현되어야 하는 기능`임)
* Kalman-Filtering을 이용하여 모터에 흐르는 전류를 추정한다.
:::

### 구현전략

`Full AutoCode` 방법을 통해 칼만필터 알고리즘을 개발하고, `Hybrid AutoCode` 방법으로 타겟에 통합한다.

1. 시뮬레이션  
시뮬레이션을 통하 칼만필터 원리를 파악한다.
2. 예제구현  
쉽게 접근할 수 있는 MPU6050 센서와 F28069를 통해 Full AutoCode-External Mode 방식으로 칼만필터 구현이 가능성한지 실제로 확인한다.
3. 기능구현  
최종 목적에 맞게 타겟에서 동작이 가능한 칼만필터 전류추정 알고리즘을 개발한다.
4. 동작확인
타겟(s32k144)동작 확인을 통해 검증한다.

### 시뮬레이션

:::note [Html Link]
0. <a href="/assets/kalman/Maxon_Motor_.html" target="_blank">칼만필터 시뮬레이션</a>
:::

## 예제구현

### [사양 및 인터페이스](http://www.jkelec.co.kr/img/sensors/manual/mpu6050_gy521/mpu6050_ds.pdf)

* 3~5V 전원공급 (GY-521에 LDO가 있는데, 3.3V로도 동작 가능하고, MPU6050는 3.3V에서도 동작함)
* [빨강색 모듈에는 3.3V 공급핀이 있고, 파랑색 모듈은 없는데, 파랑색 모듈에서 3.3V를 공급해서 동작시키는 내용이 있음](https://chocoball.tistory.com/entry/Hardware-Gyroscope-GY521-MPU6050)

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f7_mpu6050_interface.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;MPU6050 인터페이스&gt;</em>
</p>

### 시뮬링크 I2C 통신

* 파라미터 설정 : controlstick_I2C_MPU6050.m
* I2C 통신 시뮬링크 모델 : controlstick_I2C_MPU6050.slx

<p align="center">
	<iframe 
		src="https://www.youtube.com/embed//lSM-kUjmdFw?rel=0"
		width="350" height="250"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
	<br/><em>&lt;MPU6050와 TI ControlStick의 Simulink 연동&gt;</em>
</p>

### MPU6050 칼만필터링

## 전류추정 기능구현

### 전상태 모니터링

관측기를 통한 전상태 모니터링

### 위치로 속도 추정

### 동작확인

T.B.D

