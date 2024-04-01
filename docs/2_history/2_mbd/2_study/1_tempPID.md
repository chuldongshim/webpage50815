---
id: tempPID
title: 온도PID제어
---

<div align="right">
  <font size="4">
    2020 ~ <br/>
		about 12 weeks (3 month)
  </font>
</div>

---

### 온도 PID제어 MBD

MBD를 통해 생성된 자동생성코드가 MCU에 실제로 사용될 수 있을까라는 의문을 해결하기 위해 온도제어 실습이 가능한 EVB보드(TMS320F28069)를 이용하여 MBD기반 온도PID제어기 설계를 개인프로젝트로 진행하였습니다.

<p align="center">
	<img
		src={require('/img/1_process/f_process_gitlab_temp_pid.png').default}
		width="450"
		alt="Example banner"
	/><br/><em>&lt;GitLab 이슈를 통한 프로젝트 관리&gt;</em>
</p>

처음이라 그런지 프로젝트 관리가 제대로 되지 않아서 고민을 하던 차에 Github/GitLab하면 Agile 이야기가 나오는 것을 알게 되었고, "애자일, 민첩하고 유연한 조직의 비밀"이라는 책을 읽게 되었습니다. 프로젝트 경험과 책을 통해서 느낀점은 이후 Agile방식의 프로젝트를 지향하는 계기가 되었고, 그 생각과 실천은 지금까지 이어지고 있습니다.
* 처음으로 GitLab기반 소스 형상관리 수행
* 처음으로 GitLab기반 Task(할일) 및 Issue(문제) 관리 -> 프로젝트 관리 관리 수행

이 프로젝트를 통해 MBD 기반 개발을 타겟에 실제 적용할 수 있겠다는 확신을 갖을 수 있었습니다. 이는 이후 회사에서 MBD 프로젝트를 수행할 수 있는 계기가 되었습니다.  
* 처음으로 MBD기반으로 설계한 로직을 C코드를 자동생성하고 타겟 MCU에 구동
* 모든 MBD기반 프로젝트 진행의 계기가 됨
