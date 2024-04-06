---
id: fujixerox
title: 복합기 인증 단말기
---

<div align="right">
  <font size="4">
    11.11.28~13.09.30 <br/>
		22 month
  </font>
</div>

---

### 복합기 인증단말기 개발/유지보수 {#myembedded-linux-maintenance}

* 단말기를 통한 복합기 인증 솔루션 개발
* 소속 : 한국후지제록스
* 기간 : 2011.11 ~ 2013.10 (사원 2년)
  * Linux 및 uClinux 포팅
	* Embedded Linux 기반 tcp/ip 네트워크 어플리케이션 개발
	* C++ Multi-thread 기반 TCP/IP Server Programming
  * [인증용단말기 양산SW개발](https://www.fujixerox.co.kr/ko-KR/Products/KR-Software/Printing-Management)
  * [복합기-결재 단말기 연동 동영상](https://www.youtube.com/watch?v=ArtCujt2TUQ)

임베디드 리눅스를 직접 경험하고, 리눅스 기반 application을 개발하는 역할을 수행하였습니다. 리눅스라는 OS와 친해지고 싶은 마음이 생기는 계기가 되었습니다. 이후 자동차 분야로 업종을 변경하여 아지까지 리눅스에 대한 아쉬음이 많이 남아 있으며, 앞으로 꾸준히 시간을 투자하여 임베디드 리눅스 상에서 동작하는 네트워크 소프트웨어를 개발할 계획을 가지고 있습니다.

<div style={{width: '100%'}}>
	<img
		src={require('/img/3_embedded/myhistory_4.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

[인증 단말기 개발 및 유지보수](https://m.blog.naver.com/PostView.nhn?blogId=humanwr&logNo=220517005542&proxyReferer=https:%2F%2Fwww.google.com%2F)

<div style={{width: '100%'}}>
	<img
		src={require('/img/3_embedded/img3_1_fujixerox.png').default}
		style={{width: '100%'}}
		alt="Example banner"
	/>
</div>

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

