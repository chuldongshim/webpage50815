---
id: window_realize_f4_Initialize
title: F4 초기화
---
---

## 분석

### 구현조건

> <font color="blue"><strong>초기화설정 기능</strong></font><br/>
> 초기화 해제 상태에서 모터구동을 통해 상하단 구속위치 및 윈도우 이동거리(Full-Stroke)를 자동으로 설정하고, 초기화 상태로 동작모드를 변경하는 기능

### 가정

1. 편의를 위해 Dn(=Down)을 Opening방향, Up을 Closing방향으로 정의한다.
2. 초기화해제상태에서 초기화 동작 중 장애물을 감지되지 않아야 한다.
3. 상/하단 구속을 통한 초기화가 설정되지 않으면 시스템은 초기화해제상태(UninitState)에 있게 되고, 초기화 

## 기능구현

### 스위치 입력

초기화 상태에 따라 Auto 스위치입력 Masking을 통해 Auto 동작 활성화/비활성화를 결정한다.

* 초기화해제 상태
  * M-Up/M-Dn 스위치만 입력받아 M-Up/M-Dn 동작만 가능하고, 
  * Anti-Pinch 기능이 비활성화 된다.
* 초기화 상태
  * A-Up/A-Dn 스위치까지 입력을 받아 A-Up/A-Dn 동작도 가능하고,
  * A-Up 동작 시 Anti-Pinch 기능이 활성화 된다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f4_init_1_SetAutoByInit.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;초기화 상태에 따른 Auto 설정&gt;</em>
</p>

### 위치값리셋

Simulink 상에서 시뮬레이션을 통해 초기화기능을 구현할 때 원점설정 시 Plant의 현재위치가 0으로 Reset되어야 하는데,`Transfer Fcn` block은 초기화 기능이 없기 때문에 초기화기능이 있는 `Integrator` block만을 사용하여 전달함수를 풀어서 표현해야 한다.

1. `Transfer Fcn block`을 이용하여 표현된 모터 전달함수를 
2. `Integrator block`만을 이용하여 Decomposition 된 전달함수를 다음과 같이 표현한다.
3. 여기에 `Integrator block`의 Reset기능을 이용하여 Plant 초기화 기능을 추가한다.
4. 각각의 블록으로 표현된 전달함수 출력을 비교하면 동일한 입력에 대하여 동일한 결과가 출력됨을 확인할 수 있다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f4_init_2_reset_tf.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Decomposition of Transfer Function&gt;</em>
</p>

MCU 상에서는 레지스터 설정을 통해 초기화기능을 구현할 때 초기화를 위해 특정 조건을 만족하면 원점위치를 재설정해야 한다. 현재 Quadrature를 통해 위치를 카운트 하므로 Quadrature 카운터 레지스터 설정을 통해 Counter Value를 리셋해야 한다.

```c
// ftm_common.c
status_t FTM_DRV_Init(uint32_t instance,
                      const ftm_user_config_t * info,
                      ftm_state_t * state)
{
  FTM_DRV_SetSync(instance, &(info->syncMethod));
}

// main.c
void Init_FTM2_QuadratureDecoder(void)
{
  // flexTimer_qd2_InitConfig
  //  ->syncMethod == true(Software trigger state)
  FTM_DRV_Init(INST_FLEXTIMER_QD2,
               &flexTimer_qd2_InitConfig,
			   &stateQuad);
}

int main(void)
{
    :
  Init_FTM2_QuadratureDecoder();
    :
  while(1)
  {
      :
	// Read Encoder Pulse Count
	quadra_state = FTM_DRV_QuadGetState(INST_FLEXTIMER_QD2);
	gi_encPos = (int16_t)quadra_state.counter;
	// Read Count Value
    if(gb_tmpFlag)		          // flag set by breakpoint
	{
	  FTM_DRV_CounterReset(       // 카운터값 리셋
	    INST_FLEXTIMER_QD2,true);
	  gb_tmpFlag = false;
	}
	  :
  }
}
```

### 구속판단

초기화해제 상태에서는 장애물에 의한 구속이 발생되지 않아야 하며, AutoSet을 통한 Full-Stroke 계산 시 차량마다 편차가 있으나 평균적으로 최소 2700 pulse(T.B.D)이상의 Full-Stroke 값이 측정되어야 초기화상태로 천이한다.
* 초기화 해제 시 구속판단
  * 초기화해제 상태에서 PWM출력 시 200ms±10ms동안 Quadrature Decoder Count Value값에 변화가 없으면 구속으로 판단한다.
  * PWM출력 duty가 작을 경우 PWM출력 시 Hall Pulse가 발생하지 않으므로 PWM출력은 모터 구동이 가능한 최소한의 duty여야 하며, 파라미터를 통해 튜닝할 수 있어야 한다.
<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f4_init_3_StuckDetect.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;구속판단&gt;</em>
</p>
* 초기화 시 구속판단
  * I/IV 영역에서 윈도우가 Up or Dn 동작 중(Quadrature Decoder Count Value값에 변화) 200ms±10ms동안 Quadrature Decoder Count Value값에 변화가 없으면 구속으로 판단한다.

:::important 구속판단시첨 (21.10.20 현재 미구현 상태)
모터 초기 시동구간에서  부하마찰 등의 요인으로 출력이 나가는데 모터가 움직이지 않는 상황이 발생하게 된다. 따라서 1 or -1 출력 후 일정시간이 지난 다음부터 구속판단을 수행해야 한다.
:::

### 초기화 로직

초기화해제상태에서 `CW구속->CCW구속->CW구속` 연속동작이 수행되는 경우에만 초기화를 수행하며, `CW구속->CCW구속->CW구속 전 정지`와 같이 동작 중 정지가 발생하면 다시 처음부터 `CW구속->CCW구속->CW구속` 연속동작을 수행해야 초기화가 가능하다.

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f4_init_4_InitLogic.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;초기화 로직&gt;</em>
</p>

:::note 초기화 설정방법
* 구속지점까지 이동한 상태에서 CW/CCW 1회 이동을 통해 Full-Stroke 및 Direction을 자동으로 설정한다.
* 초기화해제상태에서는 CW/CCW로 방향을 정의하고, 초기화상태에서는 Up/Dn으로 방향을 정의한다.
:::

초기화를 위해 필요한 설정값을 다음과 같이 Flag로 설정하고, 초기화동작을 통해 설정값이 설정되면 플래그를 셋하고, 모든 플래그가 셋이되면 초기화상태로 천이한다.

```c
struct FLAG_INIT_BIT
{
	uint8_t bCWendpos  : 1;  // CW Full-Stroke 설정 플래그
	uint8_t bCWdist    : 1;  // CW 방향판단 정보설정 플래그
	uint8_t bCCWendpos : 1;  // CCW Full-Stroke 설정 플래그
	uint8_t bCCWdist   : 1;  // CCW 방향판단 정보설정 플래그
	uint8_t binitState : 1;  // 초기화/초개화해제 상태
};

union FLAG_INIT
{
	uint8 all;
	struct FLAG_INIT_BIT bit;
};

typedef struct
{
	/*
	 * 이동거리 판단
	 *  - |CWendpos-CCWendpos| > 3000(TBD) -> Full Stroke 설정
	 */
	union FLAG_INIT flag;
	uint32_t iCWendpos;    // CW구동 중 Stuck 발생 시 엔코더 위치
	uint32_t iCWdist;      // 100ms동안 CW로 pwm duty 30% 출력 시 이동거리
	uint32_t iCCWendpos;   // CCW구동 중 Stuck 발생 시 엔코더 위치
	uint32_t iCCWdist;     // 100ms동안 CCW로 pwm duty 30% 출력 시 이동거리
} flag_init_t;
flag_init_t windowinit;

logic()
{
  if(windowinit.flag.all = 0x0F)
  {
    // 초기화완료
	windowinit.flag.bit.binitState = 1;
  }
}
```

* CW구속지점까지 이동
  * a. M-Dn 스위치 입력 시 30% duty 출력으로 CW구동 시작
  * b. CW구속 감지 후 정지
  * c. 위치값 0으로 리셋
* CCW구속지점까지 이동
  * a. M-Up 스위치 입력 시 30% duty 출력으로 CCW구동 시작
  * b. CCW구속 감지 후 정지
  * c. CW구속->CCW구속 시간/거리 저장
    * `CCW이동시간` 저장
    * `CCW이동거리` 저장
* CW구속지점까지 이동
  * a. 정의된 출력(eg. 30% duty)으로 CW구동 시작
  * b. CW구속 감지 후 정지
  * c. CCW구속->CW구속 시간/거리 저장
    * `CW이동시간` 저장
    * `CW이동거리` 저장

동일출력(TBD) 시 윈도우 부하때문에 Closing_Up 이동시간보다 Opening_Down 이동시간이 짧은 사실을 이용하여 방향을 판단한다.
* Opening_Down / Closing_Up 판단
  * `CW이동시간` > `CCW이동시간` : CW=Opening, CCW=Closing
  * `CW이동시간` < `CCW이동시간` : CCW=Opening, CW=Closing

:::important Window 이동시간
* 동일출력 시 윈도우 부하로 인해 CW/CCW이동시간 차이가 발생하는 사실을 이용하므로 초기화 동작동안에는 CW/CCW 모두 동일한 PWM duty로 모터를 구동해야 한다.
* 플랜트를 모터단품으로 모델링한 경우 윈도우 부하가 없어 CW/CCW 구동시간이 동일하므로 Up/Dn이동시간 차이를 통한 방향판단이 불가능 하다.  
* 따라서 시뮬레이션을 통한 방향판단로직 검증을 위해서는 윈도우로 플랜트를 모델링해야 한다.
:::

Full-Stroke 및 방향 설정이 완료되는 경우에만 초기화상태로 천이한다.
* 초기화 완료 조건
  * Full-Stroke 및 Opening/Closing 설정 -> 초기화상태로 천이
  * Full-Stroke 및 Opening/Closing 미설정 -> 초기화동작 재수행
* 초기화 실패 조건
  * 초기화해제 상태에서 구속 발생 전 CW/CCW 구동은 무한반복 가능하며, 상단 or 하단구속 시점부터 연속동작이 진행되지 않으면 초기화실패로 판단한다.
  * 초기화해제상태에서 초기화동작 연속 3회 실패 시 시스템은 halt 되며, Power Off->On을 통해 초기화 동작을 재시작 할 수 있다.

:::note Full-Stroke 판단기능 삭제
CW이동중엔 장애물이 없다가 CCW이동중 장애물이 감지되는 경우로 보통 장애물감지는 처음 시작부터 감지되는 것으로 봐야하므로 Full-Stroke 판단기능 삭제  
~~장애물 감지 시 감지위치가 정중앙에서 감지되지 않는 이상 CW/CCW 이동거리가 다를 수 밖에 없고, 장애물이 감지되지 않을 경우 CW/CCW 이동거리가 같게 된다.~~
* ~~Full-Stroke 판단~~
  * ~~`CW이동거리`==`CCW이동거리` : Full-Stroke 설정  
  -> 오차범위 내에서 이동거리가 같을 경우 Full-Stroke = (CW이동거리`+`CCW이동거리)/2~~
  * ~~`CW이동거리`!=`CCW이동거리` : Full-Stroke 미설정  
  -> 장애물 감지로 Full-Stroke까지 이동하지 못한 것으로 판단~~
:::

## 시뮬레이션

### 초기화 동작확인

<p align="center">
	<img
		src={require('/img/2_mbd/mbd_sys_mil_f4_init_5_InitSequence.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;초기화 시퀀스&gt;</em>
</p>
