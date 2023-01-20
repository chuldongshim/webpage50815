---
id: esp32_mgn
title: 관리
---
---

## 개요

### 목적

본 문서는 MBD가 적용되지 않는 일반 선행개발 프로젝트를 대상으로 하며, __<font color="#34a28a">Embedded Web Server(이하 ews라 함)</font>__ 프로젝트를 진행하는데 필요한 모든 내용을 정의한 문서이다.  
ews는 웹서버를 통해 GUI 기능(신호모니터링출력, 스위치입력 등), 펌웨어 업데이트 기능(FOTA)을 제공한다.

* 개발 목적
  * IOT 제품을 대상으로 하여 관련 기술을 습득하고, 협업을 위한 개발환경을 구축하는데 목적이 있다.
  * 공유를 목적으로 프로젝트의 모든 내용(요구사항부터 소스코드 및 실행결과까지)을 웹을 통해 확인할 수 있도록 한다.
  * 기능을 실행하는 데모 시나리오를 정의하고, 테스트를 통과하면 프로젝트를 완료하는 것으로 한다.

* 개발환경  
  * GitHub-Docusaurus(문서산출물) 및 GitLab(소스) 환경에서 개발을 진행한다.

### 개발단계

개발은 3단계를 통해 진행한다.  

|단계|Task|
|---|---|
|시스템|<li>기능/비기능 요구사항 정의</li><li>컨셉설계 및 분석</li><li>HW-SW인터페이스 설계</li>|
|하드웨어|<li>HW설계</li><li>Firmware</li><li>OS (필요시)</li>
|소프트웨어|<li>하드웨어 독립적인 Logic & Algorithm</li><li>Simulink Function Block Model</li>|


## 관리

### 일정관리

> Gantt View for Github(Chrome Extension)를 통한 WBS일정 관리

* 프로젝트는 Agile 기반으로 진행하며, 이슈를 최소 활동단위로 정의하고 관리한다.
* 프로젝트/마일스톤/실행기간 속성을 적용하여 이슈를 발행하고, Gantt를 통해 일정을 관리한다.  

### 이슈관리

> GitHub(공유프로젝트) / GitLab(개인프로젝트)을 통해 형상(소스,사양서 등)관리를 수행하고, 프로젝트 진행 중 발생되는 이슈를 Scrum보드를 통해 등록/해결/관리한다.

* GitHub(Open Project로 공개) 또는 GitLab(Private Project로 배공개)에서 프로젝트를 생성하여 이슈를 관리한다.
* <font color="red"><strong>이슈 Link를 통해 Docusaurus 산출물과 이슈를 연결하여 관리한다.</strong></font><br/>

### 형상관리

#### 형상관리 방법

* 프로젝트 진행 중 생성되는 모든 산출물은 Github/Gitlab Repository에만 저장한다.
  * Github Docusaurus를 통해 문서화(사양서, 제품 사용자 매뉴얼, 유지보수 매뉴얼 등) 작업을 진행하고, 필요 시 Docusaurus를 pdf로 문서를 추출하여 공유한다.
  * Gitlab을 통해 프로젝트 진행 중 생성되는 산출물(버전별 소스코드, 이슈관리 등)을 저장/관리한다.
* Gitlab에서 기능별로 폴더를 생성하며 각 폴더에는 요구사항(slreqx), 기능사양(mlx, slx), 자동생성코드(.c, .h), 기능검증(slx) 산출물을 저장/관리하고, 기능통합이 완료되면 전 기능을 포함하는 시스템 폴더를 새로 생성하여 산출물을 저장/관리한다.  
<- 좀 더 효율적인 방안 추가 검토해 볼 것

#### 문서추출

실패 : https://github.com/KohheePeace/docusaurus-pdf  
성공 : https://github.com/kohheepeace/mr-pdf (21.11.04)

local에서 문서 추출 시 인터넷을 연결한 상태에서 로컬에서 docusaurus를 실행하고 있는 상태에서 문서를 추출해야 함. (web도 마찬가지임)

명령창을 새로 열어 `c:\Users\User\workspace_github\webpage`로 이동 후 다음 명령을 실행하며, 로컬에서 문서 추출은 중간 이후부터 이미지 안나옴

```
npx mr-pdf --initialDocURLs="http://localhost:3000/webpage/docs/mbd" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".margin-vert--xl a" --coverImage="https://chuldongshim.github.io/webpage/img/firstpage_motor_pos_control.png" --coverTitle="Model Based Design"
```

웹에서 문서 추출은 비교적 이미지 잘 나오나, 몇몇 짤린 이미지 있음, 인터넷 연결 상태에서 이미지 클릭 시 web link로 연결해서 이미지 확인할 수 있음

```
npx mr-pdf --initialDocURLs="https://chuldongshim.github.io/webpage/docs/mbd" --contentSelector="article" --paginationSelector=".pagination-nav__item--next > a" --excludeSelectors=".margin-vert--xl a" --coverImage="https://chuldongshim.github.io/webpage/img/firstpage_motor_pos_control.png" --coverTitle="Model Based Design"
```
* excludeSelectors를 포함하여 웹에서 문서추출

![excludeSelectors items](https://user-images.githubusercontent.com/29557494/90359040-c8fb9780-e092-11ea-89c7-1868bc32919f.png)

#### [public/private 설정을 통한 문서공유](https://ndb796.tistory.com/427)

* 공유 시  
github를 public에서 private으로 변경하면 외부에서 접근이 불가능함.
* 공유해제 시  
github를 private에서 public으로 다시 변경하면 외부에서 접근이 가능함.

## 개발환경

### Background

#### 예제소스
ESP-IDF는 FreeRTOS kernel과 주변기능(device driver, network stack, security, etc...)을 하나로 통합하여 ESP Seriese 보드에 맞게 최적화 시킨 SDK를 말한다.
Espressif에서는 FreeRTOS를 그대로 사용하지 않고 자신들의 CPU에 맞게 최적화(예: dual core CPU 상황을 고려하여 API 기능 확장)하여 [github를 통해 배포](https://github.com/espressif/esp-idf)하고 있다.

:::note
ESP-IDF는 FreeRTOS포함하며, ESP-IDF eclipse에서 예제프로젝트 생성 시 ESP-IDF SDK에 있는 project를 가져옴
:::

#### IDE
ESP32 개발환경은 Arduino IDE(쉽게 사용이 가능함)를 이용하는 방법과 [ESP-IDF SDK(전문적인 설정과 사용이 가능함)](https://blog.naver.com/chcbaram/222201330177)를 사용하는 방법이 있다.

#### 교육자료

* [G-캠프 교육자료](https://www.g.camp/search/esp32)
  * [ESP32 초급과정 pdf 교육자료](https://github.com/gcamp-hub/ESP32-beginner)
	* [ESP32 중급과정 pdf 교육자료](https://github.com/gcamp-hub/ESP32_Middle_Class)
* [G-캠프 교육 동영상](https://www.youtube.com/c/WizcenterSeoul/search?query=esp32)
  * [ESP32 초급 1일차](https://www.youtube.com/watch?v=xhSXpPV11E4)
  * [ESP32 초급 2일차](https://www.youtube.com/watch?v=mdoZqCX9oNA)
  * [ESP32 초급 3일차](https://www.youtube.com/watch?v=_Xmc0mddPqw)
	* [ESP32 온라인 워크숍 중급과정 1강](https://www.youtube.com/watch?v=7cK0aFWThRc) - wifi
	* [ESP32 온라인 워크숍 중급과정 2강](https://www.youtube.com/watch?v=JZbcwAwdwyw) - BLE
	* [ESP32 온라인 워크숍 중급과정 3강](https://www.youtube.com/watch?v=MbEe1b7lhqA) - wifi+BLE
	

### ESP-IDF

ESP-IDF는 eclipse기반 통합개발환경으로 본 문서에서는 `ESP-IDF eclipse` 설치 및 빌드/다운로딩/동작확인 과정을 설명한다.

#### eclipse 설치

`ESP-IDF eclipse`는 `%userprofile%\esp`를 설치 위치로 사용하며, 설치위치는 명령창에서 다음 명령으로 확인할 수 있다.
```
> echo %UserProfile%
C:\Users\cdshim
```
여기서는 필요한 모든 도구를 자동으로 설치해 주는 [Windows용 ESP-IDF 도구 통합 설치 프로그램 (`esp-idf-tools-setup-offline-2.10.exe` - 2021-08-10 offline download)](https://github.com/espressif/idf-installer#esp-idf-tools-installer-for-windows)을 통해 설치를 진행한다.
:::note ESP-IDF eclipse를 설치하면 다음의 절차들이 자동으로 모두 수행된다.
* [ESP32 Get Started](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#)
* [이클립스에서 플러그인 설치 후 빌드/다운로드](https://github.com/espressif/idf-eclipse-plugin#installing-idf-plugin-using-update-site-url)
* [ESP-IDF SDK 다운로드](https://github.com/espressif/esp-idf)
:::

다음과 같이 Off-line mode로 설치파일 `esp-idf-tools-setup-offline-2.10.exe`를 다운로드 하고, 더블클릭하여 디폴트로 설치를 진행한다(단 경로는 아래와 같이 변경).

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_01.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

설치가 완료되면 `Run ESP-IDF Eclipse Environment`를 체크하고 Finish 버튼을 눌러 설치를 종료한다.

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_02.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

이후 이클립스가 자동으로 실행되는데, workspace를 `C:\Users\cdshim\esp\esp-idf`로 설정하여 이클립스를 실행한다.

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_03.png').default}
		width="450"
		alt="Example banner"
	/>
</p>
<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_04.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

나중에 ESP-IDF를 재시작하려면...
* 바탕화면에 생성되는 "ESP-IDF Eclipse" 아이콘 실행
* C:\Users\cdshim\.espressif\tools\idf-eclipse\2021-07\eclipse.exe 실행

#### plug-in 설치

ESP-IDF eclipse를 설치하면 esp-idf plug-in이 자동으로 설치되며, Eclipse Marketplace -> Search -> idf 검색을 통해 ESP-IDF Eclipse plug-in이 이미 installed 된 것을 확인할 수 있다.
그리고 ESP32 C/C++ Development Tools가 설치되어 있어야 ESP-IDF Tool가 정상적으로 설치되므로 설치되지 않았으면 ESP32 C/C++ Development Tools를 설치한다.

#### ESP-IDF Tools 설치

ESP-IDF Tool 설치를 진행하지 않은 상태에서 eclipse에서 Expressif IDF Project를 생성하거나 Workspace를 변경한 상태에서 ESP-IDF Tool을 다시 설치하지 않으면 다음과 같은 Path Error가 발생하므로 ESP-IDF 툴 설치를 진행해야 한다.
  
<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_07.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

`Help -> ESP-IDF Tools Manager -> Install Tools`를 선택하여 다이얼로그를 열고 git실행파일이 위치하는 경로를 Git Executable Location으로 입력하고 ESP-IDF 툴 설치를 진행한다. (ES_-IDF Directory, Choose Python version은 자동으로 인식 됨)
* [업데이트 사이트 URL을 사용하여 eclipse에 IDF 플러그인 설치](https://github.com/espressif/idf-eclipse-plugin#Prerequisites)
* [ESP-IDF 도구 설치 프로그램](https://docs.espressif.com/projects/esp-idf/en/latest/esp32s2/get-started/windows-setup.html)

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_05.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

설치 완료 후 프로젝트가 정상적으로 생성/빌드되는지 확인한다. (재부팅 필요 없음)

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_06.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

### 기타 설치

#### usb driver 설치

ESP32 EVB보드는 [CP2192 드라이버를 통해 usb to serial converting을 수행](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=solsol8711&logNo=172613469)한다.
프로그램 설치 완료 후 ESP32를 PC와 연결하면 자동으로 usb to serial 장치를 검색하는데, 드라이버가 설치되지 않으면 장치를 인식할 수 없으므로 드라이버를 설치하여 장치인식을 확인한다.  

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_08.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

#### Debugger 설치

ESP32은 다음과 같이 JTAG or UART를 통해 디버깅을 수행할 수 있고, JTAG이 없으므로 UART printf를 통해서만 디버깅을 진행한다.
* UART는 EVB보드에 내장되어 있는 CP2102N 칩(USB-UART)을 이용하여 가상 USB를 통해 모니터링이 가능하다.
* 디버깅은 JTAG 장비가 있어야 가능하며, <font color="blue"><u>ESP32-WROOM-32D는 JTAG adapter는 없고 usb-uart interface만 embed 되어 있다.</u></font>  
[ESP-IDF GDB OpenOCD Debugging](https://github.com/espressif/idf-eclipse-plugin/blob/master/docs/OpenOCD%20Debugging.md) 또는 [ESP-WROVER-KIT(on-board debuger 내장)](https://docs.platformio.org/en/latest/boards/espressif32/esp-wrover-kit.html#debugging) 참조

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_OpenOCD_over_JTAG.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

## Hello World

### Hello ESP32

#### 이클립스 프로젝트 생성

동작확인을 위해 Espressif IDF에서 제공하는 기본 예제 Project를 생성한다. Espressif IDF Project -> 디폴트경로, 프로젝트 이름을 정의 후 Next -> 예제 프로젝트를 생성할 수 있는 Template가 나타난다.

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_09.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

여기서는 Blink Example 선택 후 Finish 버튼을 누른다.

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_10.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

타겟을 esp32로 설정하고

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_11.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

장치관리자에서 인식한 시리얼포트로 포트번호를 설정한다.

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_12.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

:::important
예제 프로젝트를 불러오지 못하는 경우 환경변수가 인식되지 않아서 그런 것 같으므로 다음과 같이 ESP-IDF를 재설치 해준다.
Help -> Download and Configure ESP-IDF -> Check "Use an existing ESP-IDF directory from file system" -> Browse -> "C:\Users\User\esp\esp-idf" -> Finish
:::

#### 이클립스 빌드/다운로드/터미널모니터

빌드버튼을 눌러 프로젝트를 빌드한다.(처음 빌드 시 빌드시간 오래 걸림) 에러 없이 빌드가 완료되면 `sdkconfig.defaults`파일이 `sdkconfig파일`(콘솔 idf.py menuconfig를 통해서 설정할 수 있는 프로젝트 설정파일로 ESP-IDF eclipse에서 sdkconfig파일 더블클릭하여 설정이 가능함)로 변경된다.

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_13.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

테라텀 연결 해제 후(시리얼을 통해 업데이트 하는 것으로 보임) RUN버튼을 눌러 다운로드를 진행한다.

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_14.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

다운로드가 완료되면 테라텀(115200bps)을 연결하여 printf메시지 출력을 확인하거나

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_15.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

ESP-IDF에서 제공하는 Serial Monitor를 통해 메시지 출력을 확인한다.  
Window탭 -> Show View -> Terminal -> 시리얼 통신 설정 후 연결/확인

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_16_terminal.png').default}
		width="450"
		alt="Example banner"
	/>
</p>

#### 콘솔 빌드/다운로드

ESP-IDF 설치 시 함께 설치되는 `ESP-IDF 4.3 CMD` 터미널(ESP32 빌드를 위한 환경변수가 적용됨) [명령을 통해 빌드/다운로드](https://blog.naver.com/PostView.naver?blogId=kim1417&logNo=222262511133&parentCategoryNo=&categoryNo=76&viewDate=&isShowPopularPosts=false&from=postView)가 가능하다. (21.09.17 확인완)

1. ESP-IDF 4.3 CMD(터미널) 실행 후 프로젝트 폴더로 이동
3. menuconfig  
\> idf.py menuconfig
4. build  
\> idf.py build
5. flash download  
하이퍼터미널 시리얼포트 연결 해제  
\> idf.py -p COM8 -b 115200 flash
6. 콘솔 확인  
하이퍼터미널을 통해 시리얼 연결 후 printf 확인

#### Troubleshout

* [빌드 중 ccache 오류- 경로길이로 인한 빌드에러](https://www.esp32.com/viewtopic.php?t=14651)

### Hello phtyon

[참고자료](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=opusk&logNo=220984663685)

* python은 3.9버전으로 기존에 설치되어 있는 상태
* 이클립스에서 python 사용을 위해 PyDev 플러그인 설치
* eclipse -> window -> preferences -> PyDev -> Interpreters -> Python interpreters -> New -> python.exe가 있는 폴더를 찾아서 선택 -> 적용 후 Close
* 프로젝트 생성 후 print 확인

### ESP32 아두이노 IDE

미적용, 21.08.23

* [ESP32 아두이노 IDE 에서 사용하기](https://www.bneware.com/blogPost/esp32_arduino_ide)
* [Arduino IDE download](https://www.arduino.cc/en/software)
* [ESP32-DevKitC-32D - LED Blinking 도입](https://fermium.tistory.com/1200)
* [ESP32-DevKitC-32D - TCP/IP](https://fermium.tistory.com/1201)
* [아두이노 IDE를 통한 블루투스 통신 예제](https://eduino.kr/product/detail.html?product_no=611)

## 코딩룰

#### 변수정의

* 변수는 prefix 이후 처음 글자를 소문자로 시작한다.
* 모든 변수는 데이터 size를 알 수 있는 prefix를 붙이다.  
* 로컬변수에는 prefix가 붙지 않고, 전역변수는 g_ prefix가 붙는다.
* 객체 내부에서 사용되는 변수는 static을 통해 C파일에 정의한다.
* 객체 외부에서 사용되는 변수는 getFunc() or setFunc() 등과 같이 함수 호출을 통해 사용한다.
  * get/set 함수만 확인하면 객체 외부에서 어떤 변수들이 사용하는지 확인할 수 있는 장점이 있음
  * get/set 함수에서 사용되는 변수가 외부와 의존성있는 변수가 됨
  * get/set 함수가 없는 경우 독립적으로 사용할 수 있는 객체임
```
float				: float임을 나타내는 f_
uint32_t or int32_t	: word임을 나타내는 w_
uint16_t or int16_t	: int임을 나타내는 i_
uint8_t or int8_t	: byte임을 나타내는 b_

ex)
gw_ADC_Data : 객체 내부에서 사용되는 32bit 형 전역변수 데이터
```

#### 함수정의

* 함수는 prefix 이후 처음 글자를 대문자로 시작한다.
* 파일명을 객체로 정의하고, 함수명 이전에 prefix로 파일명이 붙는다.
  Motor_OutputCtrl()	: motor.c파일의 출력제어 함수
* C파일 내부에서만 사용되는 함수는 header file에 function prototype을 정의하지 않으며, 함수명 앞에 static 키워드를 붙여 외부에서 호출할 경우 컴파일 에러가 발생하게 하여 C파일 내에서만 사용될 수 있도록 한다.

#### 참고자료

* [소스 코드 주석 다는 법 예](https://hubbleconstant.tistory.com/7)


