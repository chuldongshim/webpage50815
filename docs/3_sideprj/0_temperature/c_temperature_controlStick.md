---
id: temperature_controlStick
title: controlStick
---
---

## 온도PID제어


## 엔코더 펄스 생성/카운트

개발환경 구축 : Wiper_v9_210726_Closing.docx 내용 정리

### HW 사양

#### VNH5019 Driver 사양

The VHN5019A-E is a full bridge motor driver intended for a wide range of automotive applications.

* Vmax=41V, Iout=30A
* PWM operation up to 20 khz
* Over/Under Voltage shutdown
* High/Low side thermal shutdown
* Cross-conduction protection
* Current limitation
* Current sense output proportional to motor current
* Charge pump output for reverse polarity protection
* Output protected against short to ground and short to Vcc

#### ControlStick

Piccolo ControlStick F28069 인터페이스

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/mbd_hw_ti_evb_ControlStick_pinout.png').default}
			alt="Example banner"
		/><br/><em>&lt;Piccolo ControlStick F28069 pinout&gt;</em>
	</div>
</p>

#### LAUNCHXL-F28069M

<p align="center">
	<div class="box" >
		<img
			src={require('/img/2_mbd/mbd_hw_ti_evb_LAUNCHXL_pinout.png').default}
			alt="Example banner"
		/><br/><em>&lt;LAUNCHXL-F28069M pinout&gt;</em>
	</div>
</p>

#### 참고자료

* [F28069_controlSTICK_SCH[R1].pdf (controlSUIT 설치 시 함께 설치)](file:///C:/ti/controlSUITE/development_kits/F28069controlSTICK/~F28069controlSTICK_HWdevPkg/R1/F28069_controlSTICK_SCH[R1].pdf)
* [_tms320f28069 Piccolo controlSTICK.pdf](file:///C:/Users/cdshim/OneDrive/5_MBD_Temperature/3_SW/TI_F28069\Piccolo\controlSTICK)
