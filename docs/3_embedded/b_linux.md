---
id: linux
title: 임베디드 리눅스
---

---

## 복합기 인증 단말기

임베디드 리눅스를 직접 경험하고, 리눅스 기반 application을 개발하는 역할을 수행하였습니다. 리눅스라는 OS와 친해지고 싶은 마음이 생기는 계기가 되었습니다. 이후 자동차 분야로 업종을 변경하여 아지까지 리눅스에 대한 아쉬음이 많이 남아 있으며, 앞으로 꾸준히 시간을 투자하여 임베디드 리눅스 상에서 동작하는 네트워크 소프트웨어를 개발할 계획을 가지고 있습니다.

### 습득기술

* Embedded Linux Porting
* C++ Multi-thread 기반 Server Programming

### [인증 단말기 개발 및 유지보수](https://m.blog.naver.com/PostView.nhn?blogId=humanwr&logNo=220517005542&proxyReferer=https:%2F%2Fwww.google.com%2F)

<p align="center">
	<img
		src={require('/img/3_embedded/img3_1_fujixerox.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

* CPU 재고 소진으로 대체 CPU를 이용한 단말기 개발
  * 스펙결정 및 보드생산 외주업체 선정
  * 대체 단말기 ARM9 Embedded Linux(Bootloader, Kernel, Filesystem 등) 포팅작업 진행 (Embedded Linux)
  * 대체 단말기에서 기존 단말기 펌웨어 기능 재현
(사원증 인식-서버와 TCP/IP통신을 통한 인증확인 - RS422통신을 통한 복합기 제어)
* 유지보수
  * 단말기 TCP/IP 통신을 위한 고객사 별 네트워크 환경에 따른 대응
(원격 접속, 망분리 서버 접근, 서버-클라언트 패킷 확인)
* 인증서버 개발 (C++ Multi-thread programming)
  * 단말기와 인증 서버 간 통신(TCP/IP) 프로토콜 정의
  * 단말기로부터 수신한 인증 정보를 DB(MS-SQL)에서 조회한 후 인증 결과 단말기로 송신
  * 인증 성공 시 문서관리 솔루션 정책에 따른 출력 동작 수행
* MMU가 없는 MCU uClinux(mln7400) 및 linux kernel 2.6(mlc3700) 포팅 - IO device driver 구현/확인

---

## 개인 프로젝트 - ARM9 포팅

* Embedded Linux S3C2440 ARM9 포팅
<p align="center">
	<img
		src={require('/img/3_embedded/img3_2_arm9_linux_porting.png').default}
		alt="Example banner"
		width="350"
	/>
</p>


## 참고자료
* [STM32F429i-Discovery 보드에 uClinux 올려보기](https://codedosa.com/1300)
* [elinux for STM32](https://elinux.org/STM32)
* [ARM Cortex M7용 작은 uboot, Linux 및 rootfs 빌드](https://james-hui.com/2021/07/02/building-a-small-uboot-linux-and-rootfs-for-arm-cortex-m7/)
* [STM32F746 검색 및 U 부팅](https://clockworkbird9.wordpress.com/2020/09/27/stm32f746-discovery-and-u-boot/)
* [STM32 – eLinux.org](https://elinux.org/STM32)
* [buildroot-labs.pdf(bootlin.com)](https://bootlin.com/doc/training/buildroot/buildroot-labs.pdf)
* [STM32F7 디스커버리 보드용 uClinux 구축](https://aelseb.wordpress.com/2016/11/05/building-uclinux-for-stm32f7-discovery-board/)
* [STM32F769I-disco_Buildroot/Makefile at master · fdu/STM32F769I-disco_Buildroot · GitHub](https://github.com/fdu/STM32F769I-disco_Buildroot/blob/master/Makefile)
* [Buildroot를 사용하여 STM32F769I DISCO용 Linux 빌드](https://adrianalin.gitlab.io/popsblog.me/posts/build-linux-for-stm32f769i-disco-using-buildroot/)
* [STM32F769I DISCO의 Linux 부팅 옵션](https://adrianalin.gitlab.io/popsblog.me/posts/linux-boot-options-on-stm32f769i-disco/)
* [STM32F7 SOM 릴리스 2.4.0 리소스 디렉토리(emcraft.com)](https://emcraft.com/products/700#docs)
* [STM32F7 디스커버리 보드용 uClinux 구축](https://aelseb.wordpress.com/2016/11/05/building-uclinux-for-stm32f7-discovery-board/)
* [ARM Cortex-M 프로세서용 GCC 도구 체인 크로스 컴파일](https://www.linkedin.com/pulse/cross-compiling-gcc-toolchain-arm-cortex-m-processors-ijaz-ahmad/)
* [Raspberry Pi로 루트 빌드 – U-Boot(ltekieli.com)](https://ltekieli.com/buildroot-with-raspberry-pi-u-boot/)