---
id: sd_spec
title: + 기술문서
---

<div align="right">
  <font size="4">
    23.02.02 ~ 23.04.25<br/>
	3 month
  </font>
</div>

---

## 개요

### 프로젝트 관리 {#ews2-management}

개발기간 12주 동안 Agile 방식으로 개발이 진행되어 사용자 요구사항에 대한 추가/수정 발생할 경우 컨셉수정부터 코드구현 및 적용까지 민첩하게 대응할 수 있습니다.  
원격지에서 시스템 상테를 모니터링하고, 제어할 수 있는 솔루션 개발을 타겟으로 정하고 제품개발을 진행하였기 때문에 이와 비슷한 제품개발에 본 솔루션을 재활용할 수 있습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_summary_plan.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 개발전략

본 제품개발 프로젝트는 기존에 수행된 2개의 프로젝트에 적용된 기술들을 통합하여 새로운 기능을 구현하는 컨셉으로 진행되었습니다.
* 기존에 수행된 작업
  * Kalman Filter학습 및 시뮬레이션
  * wifi 웹서버를 통한 STM MCU FW업데이트
* 추가한 작업
  * 칼만필터 알고리즘을 Matlab/Simulink를 통해 C코드로 자동생성하여 MCU에 적용
  * 도어상태판단 기능을 Simulink State-Machine Diagram으로 구현하고, C코드로 자동생성하여 MCU에 적용
  * 웹페이지 Revision - 상태정보 확인, Self-OTA

## 시스템 사양

### 주요기능

* 현재 적용된 기능입니다.
	* Kalman Filter를 통한 센서 신호 노이즈 필터링
	* MBD를 통한 필터 및 기능로직 코드 자동생성
	* https를 통한 웹서버 Secure 통신
	* 열림/닫힘, 배터리전압 상태정보 원격 모니터링
	* 펌웨어 원격 Secure 업데이트 (Self-OTA)
	* file server 및 file system을 통한 로깅정보 파일저장/업로드/다운로드
	* sntp 접속을 통한 rtc 시간 업데이트
* 리비전(T.B.D) 시 보완되어야 할 기능입니다.
	* BLE를 통한 Wifi 연결정보 설정
	* 카메라를 통한 입력/출력 인원 카운트
	* 원격 화면 모니터링
	* 설정 및 Calibration에 따라 속도/가속도계를 통해 측정할 수 있는 다양한(창문, 회전문, 엘리베이터 위치 등) 상태정보 모니터링 기능 추가

### 열림/닫힘 판단

smartGaurd 시스템은 0(UnInit), 1(Closed), 2(Opening), 3(Opened), 4(Closing)와 같이 5개의 상태가 있으며, 최초 Power On 후 초기화가 진행되지 않거나, 오류가 발생하면 0(UnInit) 상태가 됩니다. 초기화 이후에는 도어의 움직임에 따라 자동으로 1~4 상태 중 하나의 상태가 됩니다.

smartGaurd mcu는 i2c 인터페이스로 mpu6050 센서의 3축의 각속도와 3축의 각가속도 정보를 수신합니다.

<p align="center">
	<img
		src={require('/img/4_ews2/ews2_spec_hw_mcu_mpu6050.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

이렇게 수신된 가속도 정보를 통해 각도를 계산하는데, 가속도계의 drift 현상으로 측정오차가 발생하여 계산된 각도정보에도 오차가 발생하게 됩니다. 각도오차를 보정하기 위해 각속도정보를 추가로 이용하여 칼만필터링을 수행하며, 그 결과 측정오차 및 노이즈가 제거된 각도정보를 계산할 수 있습니다.

<p align="center">
	<img
		src={require('/img/4_ews2/ews2_spec_sw_func_kalman_logic.png').default}
		alt="Example banner"
		width="550"
	/>
</p>

다음은 각속도와 각가속도정보 입력으로 칼만필터 각도출력을 확인한 결과입니다.

<p align="center">
	<img
		src={require('/img/4_ews2/ews2_spec_sw_func_kalman_result.png').default}
		alt="Example banner"
		width="550"
	/>
</p>

이렇게 센서를 통해 계산된 위치(각도) 및 속도 정보를 바탕으로 다음과 같이 State-Machine Diagram 기반으로 도어의 열림/닫힘 상태를 판단합니다. 

<p align="center">
	<img
		src={require('/img/4_ews2/ews2_spec_sys_func_openclose_logic.png').default}
		alt="Example banner"
		width="550"
	/>
</p>

다음은 최종 구현된 smartGaurd 시스템 출력을 모니터링하여 도어 움직임에 따라 상태정보가 자동으로 결정되는 것을 확인한 결과입니다.

<p align="center">
	<img
		src={require('/img/4_ews2/ews2_spec_sys_func_openclose_result.png').default}
		alt="Example banner"
		width="300"
	/>
</p>

### 로그인

smartGaurd WebServer는 HTTPS 통신을 통해 서버와 클라이언트가 연결되어, 인증서로 생성된 키값으로 패킷 암호화를 수행하여 통신을 수행하기 때문에 제3자가 통신 내용을 수신하더라도 패킷 내용을 복호화 할 수가 없어 통신내용 확인이 불가능합니다.  

wifi connection을 통해 서버와 연결이 되면 웹브라우저를 통해 웹서버 주소(https://192.168.4.1) 로 접속합니다. 현재 smartGaurd WebServer는 공인된 인증기관으로부터 인증서를 발급받지 않았기 때문에 Self-Signed(안전하지 않은 연결) Connection을 통해 HTTPS연결을 수행해야 합니다(단, 비용을 지불하고 공인된 인증서를 발급받아 적용하면 정상적으로 안전한 HTTPS 통신을 수행할 수 있습니다).

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_html2_connect.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

로그인은 POST 방식을 사용하며 로그인을 수행합니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_html3_login.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

로그인에 성공하면 첫 화면으로 시스템을 간략히 설명하는 창이 활성화 됩니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_html4_homepg.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### 상태정보 모니터링

모니터링 탭을 클릭하여 나타나는 창을 통해 도어의 열림/닫힘 상태 및 상태 변경시간을 확인할 수 있습니다. 인터넷이 연결되면 smartGuard는 sntp 서버에 접속하여 시간정보를 가져온 다음 내부 rtc time을 업데이트 합니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_html5_openclose.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### Software Update

업데이트 탭을 클릭하면 두 섹션으로 구분되는 창이 나타나는데, 상부영역에서 SOTA(Master Self-OTA) 기능을 수행하고, 하부영역에서 FOTA(Slave FW-OTA) 기능을 수행합니다.

상부영역에 해당하는 SOTA에서 smartGaurd 자체 MCU의 소프트웨어를 업데이트 기능이 수행됩니다. local에 저장된 smartGuard MCU의 실행 가능한 이미지 파일을 선택한 다음 [start SOTA] 버튼을 클릭하면 업데이트가 수행되면서 버튼 아래에 진행상태가 나타난다. 업데이트가 완료되면 MCU는 자동으로 재부팅을 수행하여 업데이트 된 이미지를 수행한다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_html6_ota.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

하부영역에 해당하는 FOTA에서 smartGaurd와 연결된 MCU의 소프트웨어를 업데이트 할 수 있습니다. 이 기능은 무선통신 기능 없이 smartGaurd와 유선으로 연결된 장비를 원격에서 업데이트 하기 위해 준비된 기능힙니다.
[업데이트 창 - FOTA 설명]


## HW사양

기구부 설계 경험과 PCB설계 경험을 되살려 하드웨어를 직접 설계하였습니다.  
설계 단계에서 PCB와 기구부를 함께 고려해야 재작업 비용을 줄일 수 있다는 사실을 직접 경험해 보았습니다.  
* PCB 5회 설계 변경 x 기구부 3회 설계 변경
* 중간중간 수시로 변경된 작은 사항들(부품변경, PCB 사이즈 변경 등)을 포함하면 더 많은 설계변경이 발생하였음

### Electronic

전장부는 총 5회 설계 변경을 통해 최종안을 확정하였고,  
wifi가 통합된 MCU, 가속도 및 각속도 측정을 위한 MEMS센서로 구성되어 있습니다.
[(smartGaurd BOM Lists)](/assets/smartGuard_BOM_Lists.pdf)  

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_hw_schematic.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### Mechanic

기구부는 총 3회 설계 변경을 통해 최종안을 확정하였고,  
상/하부커버, 자석, 받침대, 볼트, 9V 배터리, 전원케이블로 구성되어 있습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_hw_update.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

* 1회(좌) 초안
  * 4개의 볼트로 상/하부 케이스를 고정
	* 1.5V AAA Battery 2개 사용
	* 전원 스위치 없음
* 2회(중) 컨셉추가
  * 9V Battery 1개로 전원공급 변경
	* 전원 스위치 추가 (상부 Case와 PCB 분리가 불가능)
	* 좌측 접시머리볼트 1개로 케이스 고정
* 3회(우) 최종안
  * 상부 Case와 PCB 분리가 가능하도록 전원 스위치 변경

### HW통합

PCB는 2층기판으로 Top면에 모든 부품이 배치되도록 설계 하였습니다.  
Top면에는 Vcc, Bottom면에는 GND로 Copper를 채웠습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_hw_pcb_3d.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

## SW사양

소프트웨어는 smartGaurd는 AUTOSAR 컨셉을 적용하여 MCU 변경 시 HW를 직접 제어하는 Firmware Layer와, HW의존적인 Abstraction Layer와, HW독립적인 Application Layer로 나눠 각각 개발한 다음 통합되었습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_arch_all.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

### Firmware Layer SW

6개(i2c, uart, spi, gpio, wifi adc)의 Peripherals를 제어하기 위한 펌웨어로 구성되어 있으며, 각 펌웨어 용도는 다음과 같습니다.
* i2c  : MPU6050 센서 인터페이스
* uart : 디버그 콘솔
* spi  : Flash Memory Interface
* gpio : Alarm
* wifi : 웹서버/파일서버 무선 연결
* adc  : 배터리 전압 모니터링

### Abstraction Layer SW

Application은 HW Peripherals를 제어하는 FW에 직접 접근하지 않고, abs_func이라고 하는 Abstraction Function을 통해 HW Peripherals에 접근합니다. MCU 교체로 인해 FW가 변경되더라도 abs_func 인터페이스만 조정하여 APP을 변경하지 않고 재사용 될 수 있게 합니다.

### Application Layer SW

Application은 Auto Code 영역과, Manual Code 영역으로 구분하여 개발되었습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/4_ews2/ews2_spec_sw_arch_app.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

* Auto Code  
기능로직을 실행하는 Application Layer SW 중 신호처리 기능(Kalman Filter학습 및 시뮬레이션)과 및 열림/닫힘 판단기능은 MBD 시뮬레이션으로 로직을 개발/검증하고, 자동생성된 C코드를 적용하였습니다.
* Manual Code  
wifi로 웹서버에 접속하여 MCU FW를 업데이트하는 기존 개발내용을 재사용하여 웹페이지를 통해 시스템의 상태를 모니터링 하는 기능과 원격에서 펌웨어를 업데이트하는 Self OTA 기능을 추가하였습니다.






