---
id: esp32
title: ESP32 블루투스
---

<div align="right">
  <font size="4">
    Since 21.08.17 ~ 
  </font>
</div>

---

## 개요

본 문서는 MBD가 적용되지 않는 일반 선행개발 프로젝트를 대상으로 하며, __<font color="#34a28a">Embedded Web Server(이하 ews라 함)</font>__ 프로젝트를 진행하는데 필요한 모든 내용을 정의한 문서이다.  
ews는 웹서버를 통해 GUI 기능(신호모니터링출력, 스위치입력 등), 펌웨어 업데이트 기능(FOTA)을 제공한다.

* 개발 목적
  * IOT 제품을 대상으로 하여 관련 기술을 습득하고, 협업을 위한 개발환경을 구축하는데 목적이 있다.
  * 공유를 목적으로 프로젝트의 모든 내용(요구사항부터 소스코드 및 실행결과까지)을 웹을 통해 확인할 수 있도록 한다.
  * 기능을 실행하는 데모 시나리오를 정의하고, 테스트를 통과하면 프로젝트를 완료하는 것으로 한다.

* 개발환경  
  * GitHub-Docusaurus(문서산출물) 및 GitLab(소스) 환경에서 개발을 진행한다.

## 지원

### 프로젝트 관리

#### 일정관리

> Gantt View for Github(Chrome Extension)를 통한 WBS일정 관리

* 프로젝트는 Agile 기반으로 진행하며, 이슈를 최소 활동단위로 정의하고 관리한다.
* 프로젝트/마일스톤/실행기간 속성을 적용하여 이슈를 발행하고, GanttViewer Chrome Extension을 통해 일정을 관리한다.  
[(Issue_#7 gantt차트를 통한 일정관리 참고)](https://github.com/chuldongshim/webpage/issues/7)

#### 이슈관리

> GitHub -> WBS일정 관리를 위한 이슈  
> GitLab -> 프로젝트 진행을 위한 이슈  
> 
> Gitlab을 소스 저장소로 사용하므로 프로젝트 진행(소스개발) 중 발생되는 이슈는 Gitlab을 통해 등록/해결/관리하며, Github에서는 WBS를 위한 이슈로만 사용한다.

* GitHub(Open Project로 공개) 또는 GitLab(Private Project로 배공개)에서 프로젝트를 생성하여 이슈를 관리한다.
* <font color="red"><strong>이슈 Link를 통해 Docusaurus 산출물과 이슈를 연결하여 관리한다.</strong></font><br/>
-> 이 내용 이슈로 등록해서 이슈해결할 것

#### 형상관리

##### 형상관리 방법

> [Github Repository를 통한 형상관리](https://github.com/chuldongshim/webpage/tree/main/static/assets)

* 프로젝트 진행 중 생성되는 모든 산출물은 Github/Gitlab Repository에만 저장한다.
  * Github Docusaurus를 통해 문서화(사양서, 제품 사용자 매뉴얼, 유지보수 매뉴얼 등) 작업을 진행하고, 필요 시 Docusaurus를 pdf로 문서를 추출하여 공유한다.
  * Gitlab을 통해 프로젝트 진행 중 생성되는 산출물(버전별 소스코드, 이슈관리 등)을 저장/관리한다.
* Gitlab에서 기능별로 폴더를 생성하며 각 폴더에는 요구사항(slreqx), 기능사양(mlx, slx), 자동생성코드(.c, .h), 기능검증(slx) 산출물을 저장/관리하고, 기능통합이 완료되면 전 기능을 포함하는 시스템 폴더를 새로 생성하여 산출물을 저장/관리한다.  
<- 좀 더 효율적인 방안 추가 검토해 볼 것

##### 문서추출

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

##### [public/private 설정을 통한 문서공유](https://ndb796.tistory.com/427)

* 공유 시  
github를 public에서 private으로 변경하면 외부에서 접근이 불가능함.
* 공유해제 시  
github를 private에서 public으로 다시 변경하면 외부에서 접근이 가능함.

#### 개발단계

개발은 3단계를 통해 진행한다.  

|단계|Task|
|---|---|
|시스템|<li>기능/비기능 요구사항 정의</li><li>컨셉설계 및 분석</li><li>HW-SW인터페이스 설계</li>|
|하드웨어|<li>HW설계</li><li>Firmware</li><li>OS (필요시)</li>
|소프트웨어|<li>하드웨어 독립적인 Logic & Algorithm</li><li>Simulink Function Block Model</li>|

#### 참고자료

* OneDrive에서 Offilce 이외의 파일에 메모추가  
google -> `onedrive memo`키워드 검색 -> OneDrive에서 Offilce 이외의 파일에 메모추가 확인

### 개발환경

#### Background

##### 예제소스
ESP-IDF는 FreeRTOS kernel과 주변기능(device driver, network stack, security, etc...)을 하나로 통합하여 ESP Seriese 보드에 맞게 최적화 시킨 SDK를 말한다.
Espressif에서는 FreeRTOS를 그대로 사용하지 않고 자신들의 CPU에 맞게 최적화(예: dual core CPU 상황을 고려하여 API 기능 확장)하여 [github를 통해 배포](https://github.com/espressif/esp-idf)하고 있다.

:::note
ESP-IDF는 FreeRTOS포함하며, ESP-IDF eclipse에서 예제프로젝트 생성 시 ESP-IDF SDK에 있는 project를 가져옴
:::

##### IDE
ESP32 개발환경은 Arduino IDE(쉽게 사용이 가능함)를 이용하는 방법과 [ESP-IDF SDK(전문적인 설정과 사용이 가능함)](https://blog.naver.com/chcbaram/222201330177)를 사용하는 방법이 있다.

##### 교육자료

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
	

#### ESP-IDF 용 eclipse 설치

본 문서에서는 `ESP-IDF eclipse` 설치 및 빌드/다운로딩/동작확인 과정을 설명한다.

##### eclipse 설치

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
![](/img/3_embedded/esp_sup_env_01.png)

설치가 완료되면 `Run ESP-IDF Eclipse Environment`를 체크하고 Finish 버튼을 눌러 설치를 종료한다.  
![](/img/3_embedded/esp_sup_env_02.png)

이후 이클립스가 자동으로 실행되는데, workspace를 `C:\Users\cdshim\esp\esp-idf`로 설정하여 이클립스를 실행한다.  
![](/img/3_embedded/esp_sup_env_03.png)
![](/img/3_embedded/esp_sup_env_04.png)

나중에 ESP-IDF를 재시작하려면...
* 바탕화면에 생성되는 "ESP-IDF Eclipse" 아이콘 실행
* C:\Users\cdshim\.espressif\tools\idf-eclipse\2021-07\eclipse.exe 실행

##### plug-in 설치

ESP-IDF eclipse를 설치하면 esp-idf plug-in이 자동으로 설치되며, Eclipse Marketplace -> Search -> idf 검색을 통해 ESP-IDF Eclipse plug-in이 이미 installed 된 것을 확인할 수 있다.

##### ESP-IDF Tools 설치

ESP-IDF Tool 설치를 진행하지 않은 상태에서 eclipse에서 Expressif IDF Project를 생성하거나 Workspace를 변경한 상태에서 ESP-IDF Tool을 다시 설치하지 않으면 다음과 같은 Path Error가 발생하므로 ESP-IDF 툴 설치를 진행해야 한다.
  
![](/img/3_embedded/esp_sup_env_07.png)

`Help -> ESP-IDF Tools Manager -> Install Tools`를 선택하여 다이얼로그를 열고 git실행파일이 위치하는 경로를 Git Executable Location으로 입력하고 ESP-IDF 툴 설치를 진행한다. (ES_-IDF Directory, Choose Python version은 자동으로 인식 됨)
* [업데이트 사이트 URL을 사용하여 eclipse에 IDF 플러그인 설치](https://github.com/espressif/idf-eclipse-plugin#Prerequisites)
* [ESP-IDF 도구 설치 프로그램](https://docs.espressif.com/projects/esp-idf/en/latest/esp32s2/get-started/windows-setup.html)

![](/img/3_embedded/esp_sup_env_05.png)

설치 완료 후 프로젝트가 정상적으로 생성/빌드되는지 확인한다. (재부팅 필요 없음)
![](/img/3_embedded/esp_sup_env_06.png)

#### 기타 설치

##### usb driver 설치

ESP32 EVB보드는 [CP2192 드라이버를 통해 usb to serial converting을 수행](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=solsol8711&logNo=172613469)한다.
프로그램 설치 완료 후 ESP32를 PC와 연결하면 자동으로 usb to serial 장치를 검색하는데, 드라이버가 설치되지 않으면 장치를 인식할 수 없으므로 드라이버를 설치하여 장치인식을 확인한다.  
![](/img/3_embedded/esp_sup_env_08.png)

##### Debugger 설치

ESP32은 다음과 같이 JTAG or UART를 통해 디버깅을 수행할 수 있고, JTAG이 없으므로 UART printf를 통해서만 디버깅을 진행한다.
* UART는 EVB보드에 내장되어 있는 CP2102N 칩(USB-UART)을 이용하여 가상 USB를 통해 모니터링이 가능하다.
* 디버깅은 JTAG 장비가 있어야 가능하며, <font color="blue"><u>ESP32-WROOM-32D는 JTAG adapter는 없고 usb-uart interface만 embed 되어 있다.</u></font>  
[ESP-IDF GDB OpenOCD Debugging](https://github.com/espressif/idf-eclipse-plugin/blob/master/docs/OpenOCD%20Debugging.md) 또는 [ESP-WROVER-KIT(on-board debuger 내장)](https://docs.platformio.org/en/latest/boards/espressif32/esp-wrover-kit.html#debugging) 참조
![](/img/3_embedded/esp_sup_env_OpenOCD_over_JTAG.png)

#### Hello ESP32

##### 이클립스 프로젝트 생성

동작확인을 위해 Espressif IDF에서 제공하는 기본 예제 Project를 생성한다. Espressif IDF Project -> 디폴트경로, 프로젝트 이름을 정의 후 Next -> 예제 프로젝트를 생성할 수 있는 Template가 나타난다.   
![](/img/3_embedded/esp_sup_env_09.png)

여기서는 Blink Example 선택 후 Finish 버튼을 누른다.  
![](/img/3_embedded/esp_sup_env_10.png)

타겟을 esp32로 설정하고  
![](/img/3_embedded/esp_sup_env_11.png)

장치관리자에서 인식한 시리얼포트로 포트번호를 설정한다.  
![](/img/3_embedded/esp_sup_env_12.png)

:::important
예제 프로젝트를 불러오지 못하는 경우 환경변수가 인식되지 않아서 그런 것 같으므로 다음과 같이 ESP-IDF를 재설치 해준다.
Help -> Download and Configure ESP-IDF -> Check "Use an existing ESP-IDF directory from file system" -> Browse -> "C:\Users\User\esp\esp-idf" -> Finish
:::

##### 이클립스 빌드/다운로드/터미널모니터

빌드버튼을 눌러 프로젝트를 빌드한다.(처음 빌드 시 빌드시간 오래 걸림) 에러 없이 빌드가 완료되면 `sdkconfig.defaults`파일이 `sdkconfig파일`(콘솔 idf.py menuconfig를 통해서 설정할 수 있는 프로젝트 설정파일로 ESP-IDF eclipse에서 sdkconfig파일 더블클릭하여 설정이 가능함)로 변경된다.  
![](/img/3_embedded/esp_sup_env_13.png)

테라텀 연결 해제 후(시리얼을 통해 업데이트 하는 것으로 보임) RUN버튼을 눌러 다운로드를 진행한다.  
![](/img/3_embedded/esp_sup_env_14.png)

다운로드가 완료되면 테라텀(115200bps)을 연결하여 printf메시지 출력을 확인하거나
![](/img/3_embedded/esp_sup_env_15.png)

ESP-IDF에서 제공하는 Serial Monitor를 통해 메시지 출력을 확인한다.  
Window탭 -> Show Vier -> Terminal -> 시리얼 통신 설정 후 연결/확인

<p align="center">
	<img
		src={require('/img/3_embedded/esp_sup_env_16_terminal.png').default}
		alt="Example banner"
		width="350"
	/>
</p>

##### 콘솔 빌드/다운로드

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

##### Troubleshout

* [빌드 중 ccache 오류- 경로길이로 인한 빌드에러](https://www.esp32.com/viewtopic.php?t=14651)

#### Hello phtyon

[참고자료](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=opusk&logNo=220984663685)

* python은 3.9버전으로 기존에 설치되어 있는 상태
* 이클립스에서 python 사용을 위해 PyDev 플러그인 설치
* eclipse -> window -> preferences -> PyDev -> Interpreters -> Python interpreters -> New -> python.exe가 있는 폴더를 찾아서 선택 -> 적용 후 Close
* 프로젝트 생성 후 print 확인

#### ESP32 아두이노 IDE

미적용, 21.08.23

* [ESP32 아두이노 IDE 에서 사용하기](https://www.bneware.com/blogPost/esp32_arduino_ide)
* [Arduino IDE download](https://www.arduino.cc/en/software)
* [ESP32-DevKitC-32D - LED Blinking 도입](https://fermium.tistory.com/1200)
* [ESP32-DevKitC-32D - TCP/IP](https://fermium.tistory.com/1201)
* [아두이노 IDE를 통한 블루투스 통신 예제](https://eduino.kr/product/detail.html?product_no=611)

### 코딩룰

##### 변수정의

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

##### 함수정의

* 함수는 prefix 이후 처음 글자를 대문자로 시작한다.
* 파일명을 객체로 정의하고, 함수명 이전에 prefix로 파일명이 붙는다.
  Motor_OutputCtrl()	: motor.c파일의 출력제어 함수
* C파일 내부에서만 사용되는 함수는 header file에 function prototype을 정의하지 않으며, 함수명 앞에 static 키워드를 붙여 외부에서 호출할 경우 컴파일 에러가 발생하게 하여 C파일 내에서만 사용될 수 있도록 한다.

##### 참고자료

* [소스 코드 주석 다는 법 예](https://hubbleconstant.tistory.com/7)



## 시스템

### 요구사항

### 기능 요구사항
선행이므로 비기능/인터페이스 요구사항은 고려하지 않고, 기능 요구사항만을 고려한다.
* [F1 무선통신기능](./)
  * `F1_Req1` 근거리(블루투스) 제어를 제공해야 한다.
  * `F1_Req2` 원거리(와이파이) 제어를 제공해야 한다.
  * `F1_Req3` CAN_to_Wifi를 제공하여 CAN통신만 존재하는 장비와 인터페이스를 제공해야 한다.  
  [(Development of a CAN-Wifi converter based on a ESP32.pdf)](https://upcommons.upc.edu/bitstream/handle/2117/118541/report-tfm-eduard-valentino.pdf)
* [F2 무선업데이트기능](./)
  * `F2_Req1` 제어기 펌웨어를 무선으로 업데이트 해야 한다.
  * `F2_Req2` 통신불가 상황을 고려하여 업데이트가 진행되어야 한다.
  * `F2_Req3` 허가된 사용자만 업데이트를 수행할 수 있어야 한다.
* [F3 모니터링기능](./)
  * `F3_Req1` 펌웨어 업데이트, Signal Monitoring을 위한 웹GUI를 제공해야 한다.

### 아키텍처

#### 개발컨셉

본 프로젝트는 앞으로 진행 될 모든 IOT 제품에 동일하게 적용할 수 있는 표준 플랫폼을 개발하는데 목적이 있다.

* IOT 관련 제품(not applicable for automotive)을 개발할 경우 C++ & MBed OS를 표준플랫픔으로 하여 개발을 진행한다.
* Rhapsody에서 Class Diagram을 통해 아키텍처를 설계하고, C++기반으로 Code Skeleton을 생성하여 MBD OS와 Merge 한다.
* 휴대휴앱과 블루투스 연결을 통해 원격 스위치 입력 역할 수행 -> 태블릿으로 화면 크게 적용
* 휴대폰을 통해 OTA 기능 구현
* 휴댜폰 없이 LCD를 통해 직접 스위치 역할도 수행

#### 아키텍처

* Physical Architecture
  * 하드웨어 의존적인 부분인 PWS 및 MCU Peripherals 영역을 Physical로 분류한다.
  * 모듈로 언급되는 시스템 구성요소는 하드웨어 자체를 의미한다.
* Logical Architecture
  * 로직으로 언급되는 시스템 구성요소는 모델을 통한 시뮬레이션을 이용하여 하드웨어 독립적으로 개발이 가능함을 의미한다.

#### 참고자료

* [ESP32의 Dual core 확인해 보기](https://chocoball.tistory.com/entry/Hardware-ESP32-Dual-core?category=729036)


### F1 무선통신

#### 관련 요구사항

* `F1_Req1` 근거리(블루투스) 제어를 제공해야 한다.
* `F1_Req2` 원거리(와이파이) 제어를 제공해야 한다.

#### 참고자료
* ESP32 온라인 워크숍
  * [GitHub 소스](https://github.com/gcamp-hub/ESP32_Middle_Class)
  * 1일차
    * [ESP32 Peripherals 과정 리뷰 및 Network 과정 소개 - 자료](https://github.com/gcamp-hub/ESP32_Middle_Class/blob/master/ESP32_%EC%A4%91%EA%B8%89%EA%B3%BC%EC%A0%951.pdf)
    * [온라인 동영상 교육](https://www.g.camp/1662)
  * 2일차
    * [lwip+wifi 리뷰 - 자료](https://github.com/gcamp-hub/ESP32_Middle_Class/blob/master/ESP32_%EC%A4%91%EA%B8%89%EA%B3%BC%EC%A0%952.pdf)
    * [온라인 동영상 교육](https://www.g.camp/1663?category=816908)
  * 3일차
    * [BLE+WIFI 통합 - 자료](https://github.com/gcamp-hub/ESP32_Middle_Class/blob/master/ESP32_%EC%A4%91%EA%B8%89%EA%B3%BC%EC%A0%953.pdf)
    * [온라인 동영상 교육](https://www.g.camp/1664?category=816908)

### F2 무선업데이트

#### 관련 요구사항

* [FID_02] 제어기 펌웨어를 무선으로 업데이트 해야 한다.
  * 통신불가 상황을 고려하여 업데이트가 진행되어야 한다.
  * 허가된 사용자만 업데이트를 수행할 수 있어야 한다.

#### 참고자료

* [Secure Boot](https://docs.espressif.com/projects/esp-idf/en/stable/security/secure-boot-v1.html)
* [Flash encryption](https://docs.espressif.com/projects/esp-idf/en/stable/security/flash-encryption.html)

### F3 모니터링

#### 관련 요구사항

* [FID_03] 펌웨어 업데이트, Signal Monitoring을 위한 웹GUI를 제공해야 한다.

## 하드웨어

### 블루투스

T.B.D

### MCU

#### 사양

##### 주요기능

<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_module_mcu_esp32_devKitC_v4_board.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;Modules on ESP32-DevKitC v4&gt;</em>
</p>

* Internal Memory
  * 외부메모리 인터페이스를 지원하기 때문에 내부메모리는 외부메모리에 대한 독립된 캐시로 사용될 수 있다.
* External Memory  
  * Supports up to 16 MB off-Chip SPI Flash
  * Supports up to 8 MB off-Chip SPI SRAM
* IO Usage
  * USB커넥트 양쪽 근처에 그룹화 된 D0, D1, D2, D3, CMD 및 CLK는 내부적으로 ESP32와 SPI메모리(Flash/RAM) 간의 통신에 사용된다.

##### 핀맵

[ESP32 GPIO 포트 설명](https://arsviator.blogspot.com/2018/11/esp32-gpio.html)

<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_module_mcu_esp32_devkitC_v4_pinout.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;PinMap of ESP32-DevKitC v4&gt;</em>
</p>

##### 메모리맵

<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_module_mcu_memory_map.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;MemoroyMap in technical reference manual&gt;</em>
</p>

##### 부팅과정

* 링커스크립트 파일(esp32_bootloader.ld)에서 Entry point를 call_start_cpu0()로 정의
* ..esp\esp-idf\components\esp_system\port\cpu_start.c -> call_start_cpu0() -> start_cpu0() -> start_cpu0_default() -> main_task() 생성 후 FreeRTOS vTaskStartScheduler()를 호출하여 스케쥴링 시작 -> app_main() 호출 후 main_task 자기 자신 vTaskDelete() -> app_main() 시작
* 

#### 참고자료

##### MCU Comparision

ESP32 vs NodeMCU

|ESP-WROOM-32|NodeMCU|
|---|---|
|32bit Xtensa Dual-core|32bit Xtensa Single-core|
|Bluetooth 4.2+wifi|No Bluetooth|
|EEPROM Flash|No Flash|
|160MHz|80MHz|
|CAN protocol|No CAN protoclo|
|34 GPIO pin|17 GPIO pin|
|12 bit ADC|10 bit ADC|
|built-in Hall sensor, temperature sensor|No built-in sensor|

ESP32 vs ESP-32S

|ESP32|ESP-32S|
|---|---|
|ESP-WROOM-32|ESP-WROOM-32s|
|single-core|dual-core|
|wifi+ble|wifi+ble|

[ESP32-s2](https://iotassistant.io/news/esp32-s2-vs-esp32/)

* IOT 및 스마트폰을 위한 low power wifi 솔루션(wifi only, no bluetooth support, esp32보다 50% 에너지 효율이 높음)에 적용하기 위해 설계되었다.
* ESP32(Xtensa 32bit LX6 dual core) -> ESP32(Xtensa 32bit LX7 single core)

##### 데이터시트

ESP32-DevKitC v4는 ESP32-WROOM-32D MCU Core를 사용하는 wifi, Bluetooth 일체형 개발보드 이다.

* [ESP32-DevKitC V4 Getting Started 가이드](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-devkitc.html)
  * ESP32-DevKitC V4 주요 구성요소
	* 헤더 Pinmap 및 레이아웃
* [ESP-IDF Github 소스](https://github.com/espressif/esp-idf)
  * ESP-IDF를 설치하면 `c:\Users\cdshim\esp\esp-idf\` 경로에 github에 있는 예제프로그램이 생성된다.
	* [esp32_devkit_v4 예제소스 github](https://github.com/sglee0223/esp32)
* ESP32-WROOM-32D
  * [ESP32-DevKitC V4 mcu hw datasheet : ESP32­WROOM­32D_datasheet_en.pdf](https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32d_esp32-wroom-32u_datasheet_en.pdf)
  * [ESP32-DevKitC V4 회로도 : esp32_devkitc_v4-sch.pdf](https://dl.espressif.com/dl/schematics/esp32_devkitc_v4-sch.pdf)
* 기타
  * [ESP-IDF Programming Guide - API Reference](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/index.html)
  * [ESP32-ADC](https://coyoteugly.tistory.com/159?category=806422)


##### 펌웨어 참고자료
* ESP32 peripheral
  * [ESP32 peripheral 설명](https://arsviator.blogspot.com/2018/11/esp32-gpio.html)
  * [ESP32 peripheral 설명2](https://postpop.tistory.com/15)
  * [Deep Sleep & Wake-up](https://arsviator.blogspot.com/search?q=esp32)

### FW_BLE

:::note GUI환경 구축
* 블루투스 통신을 위한 안드로이드 프로그래밍은 진행하지 않고, 앱스토어를 통해 무료설치가 가능한 BlueSPP 앱(원하는 기능을 충분히 구현할 수 있음)을 이용한다.
* 최종 GUI는 임베디드 웹서버를 구축한 다음 wifi를 통해 웹브라우저로 웹서버에 접속한다.
:::

#### 기초이론

##### BLE

* Classic Bluetooth는 항상연결되어 있는 반면 BLE는 일반적으로 대기모드에 있으며 필요한 경우에만 깨어나 전력을 적게 소모한다.
* BLE는 2.4GHz ISM 주파수 대역에서도 작동하므로 Wi-fi와 BLE를 단일 안테나로 사용할 수 있다.
* [BLUETOOTH SPECIFICATION Version 5.0 - LIST OF ERROR CODES](https://github.com/chegewara/esp32-ble-wiki/issues/5)
* [중요 - Packet Format 및 Advertising 방법](https://blog.naver.com/PostView.naver?blogId=cksung71&logNo=10183530219&categoryNo=15&parentCategoryNo=0&viewDate=&currentPage=2&postListTopCurrentPage=1&from=postView&userTopListOpen=true&userTopListCount=30&userTopListManageOpen=false&userTopListCurrentPage=2)
* [EspressIF bluetooth API ](https://docs.espressif.com/projects/esp-idf/en/stable/api-reference/bluetooth/index.html)
* [BLE에서 Pairing 과 Bonding](https://blog.naver.com/chodahi/221403306027)
* [BLE(Bluetooth Low Energy) 이해하기](https://www.hardcopyworld.com/?p=1132)

##### 블루투스 프로파일

블루투스 프로파일은 블루투스 서비스라고도 하며 블루투스 통신계층 최상단에 있는 일종의 프로토콜로 블루투스에는 수십개의 프로파일 표준이 존재한다.

* SPP
  * 블루투스 프로파일 중 SPP(Serial Port Profile)은 블루투스를 통해 RS232와 같은 기능을 하는 서비스다. SPP를 지원하는 블루투스 장치를 PC와 연결하면 PC에 가상 COM포트가 생성되고, 무선으로 RS232통신을 할 수 있다.
  * SPP는 블루투스 Classic에서 정의되고 있고, BLE(Bluetooth LE)에는 정의되어 있지 않기 때문에 BLE를 사용하면 PC에 가상 COM포트가 생성되지 않는다.
* SSP
  * SSP(Secure Simple Pairing)는 bluetooth 2.1 Spec에 도입되었다.
  * SSP를 사용하면 Bluetooth 장치를 더 간단하게 페어링할 수 있다.
* [보안](https://hubbleconstant.tistory.com/29)
  * Security Management Protocol(SMP)라고 하는 보안 메커니즘을 제공한다.
  * 블루투스 v2.1 이전까지는 PIN코드를 입력할 인터페이스가 없는 기기에 하드코딩된 PIN을 사용하는 단순 메커니즘이었는데,
  * 이후 Diffie-Hellman 키교환방식을 사용하는 SSP(Secure Simple Pairing)라는 인증 메커니즘을 도입하여 PINCODE 입력없이 Pairing이 가능하게 되었다. (SSP를 지원하지 않는 모듈과는 PINCODE 입력이 필요함)
  * SSP를 통해서는 블루투스 기기 연결 시 상대기기의 동의를 구한다음 수락을 통해 연결이 성립된다.


##### 비콘

* 어떤 신호를 알리기 위해 주기적으로 신호를 전송하는 기기를 말하며, 애플이 2013년에 BLE기반에 비콘개념을 적용하여 ibeacon을 발표한 이후 ibeacon을 비콘이라고 부른다. 
* 비콘은 소량의 패킷 전송으로 동작이 가능하고, 기기를 연결하기 위한 페이링이 불필요하며, 저전력으로 통신하기 때문에 다른 무선 통신기루에 비해 저비용으로 위치를 인식할 수 있다.
* 비콘은 장치가 있건 없건 상관없이 특정 장치를 지정하지 않고 주변의 모든 장치에게 일방적으로 일정주기의 신호를 보내기 때문에 비콘을 사용할 경우 장비 접촉없이 beacon이 설치된 곳을 지나가기만 해도 데이터 전송이 가능하다.
* [iBeacon Advertising Packet  Data](https://blog.naver.com/PostView.naver?blogId=cksung71&logNo=10183539970&categoryNo=15&parentCategoryNo=0&viewDate=&currentPage=2&postListTopCurrentPage=1&from=postView&userTopListOpen=true&userTopListCount=30&userTopListManageOpen=false&userTopListCurrentPage=2)

####  [BLE구성](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/bluetooth/index.html)

##### 기능



##### 인터페이스

##### 레지스터설정

<details><summary>BT 파라미터 초기화 및 Enable</summary>

```c
typedef struct {
    /*
     * Following parameters can be configured runtime, when call esp_bt_controller_init()
     */
    uint16_t controller_task_stack_size;    // Bluetooth controller task stack size
    uint8_t controller_task_prio;           // Bluetooth controller task priority
    uint8_t hci_uart_no;                    // If use UART1/2 as HCI IO interface, indicate UART number
    uint32_t hci_uart_baudrate;             // If use UART1/2 as HCI IO interface, indicate UART baudrate
    uint8_t scan_duplicate_mode;            // scan duplicate mode
    uint8_t scan_duplicate_type;            // scan duplicate type
    uint16_t normal_adv_size;               // Normal adv size for scan duplicate
    uint16_t mesh_adv_size;                 // Mesh adv size for scan duplicate
    uint16_t send_adv_reserved_size;        // Controller minimum memory value
    uint32_t  controller_debug_flag;        // Controller debug log flag
    uint8_t mode;                           // Controller mode: BR/EDR, BLE or Dual Mode
    uint8_t ble_max_conn;                   // BLE maximum connection numbers
    uint8_t bt_max_acl_conn;                // BR/EDR maximum ACL connection numbers
    uint8_t bt_sco_datapath;                // SCO data path, i.e. HCI or PCM module
    bool auto_latency;                      // BLE auto latency, used to enhance classic BT performance
    bool bt_legacy_auth_vs_evt;             // BR/EDR Legacy auth complete event required to  protect from BIAS attack
    /*
     * Following parameters can not be configured runtime when call esp_bt_controller_init()
     * It will be overwrite with a constant value which in menuconfig or from a macro.
     * So, do not modify the value when esp_bt_controller_init()
     */
    uint8_t bt_max_sync_conn;               // BR/EDR maximum ACL connection numbers. Effective in menuconfig
    uint8_t ble_sca;                        // BLE low power crystal accuracy index
    uint8_t pcm_role;                       // PCM role (master & slave)*/
    uint8_t pcm_polar;                      // PCM polar trig (falling clk edge & rising clk edge)
    uint32_t magic;                         // Magic number
} esp_bt_controller_config_t;

#define BT_CONTROLLER_INIT_CONFIG_DEFAULT() {                              \
    .controller_task_stack_size = ESP_TASK_BT_CONTROLLER_STACK,            \
    .controller_task_prio = ESP_TASK_BT_CONTROLLER_PRIO,                   \
    .hci_uart_no = BT_HCI_UART_NO_DEFAULT,                                 \
    .hci_uart_baudrate = BT_HCI_UART_BAUDRATE_DEFAULT,                     \
    .scan_duplicate_mode = SCAN_DUPLICATE_MODE,                            \
    .scan_duplicate_type = SCAN_DUPLICATE_TYPE_VALUE,                      \
    .normal_adv_size = NORMAL_SCAN_DUPLICATE_CACHE_SIZE,                   \
    .mesh_adv_size = MESH_DUPLICATE_SCAN_CACHE_SIZE,                       \
    .send_adv_reserved_size = SCAN_SEND_ADV_RESERVED_SIZE,                 \
    .controller_debug_flag = CONTROLLER_ADV_LOST_DEBUG_BIT,                \
    .mode = BTDM_CONTROLLER_MODE_EFF,                                      \
    .ble_max_conn = CONFIG_BTDM_CTRL_BLE_MAX_CONN_EFF,                     \
    .bt_max_acl_conn = CONFIG_BTDM_CTRL_BR_EDR_MAX_ACL_CONN_EFF,           \
    .bt_sco_datapath = CONFIG_BTDM_CTRL_BR_EDR_SCO_DATA_PATH_EFF,          \
    .auto_latency = BTDM_CTRL_AUTO_LATENCY_EFF,                            \
    .bt_legacy_auth_vs_evt = BTDM_CTRL_LEGACY_AUTH_VENDOR_EVT_EFF,         \
    .bt_max_sync_conn = CONFIG_BTDM_CTRL_BR_EDR_MAX_SYNC_CONN_EFF,         \
    .ble_sca = CONFIG_BTDM_BLE_SLEEP_CLOCK_ACCURACY_INDEX_EFF,             \
    .pcm_role = CONFIG_BTDM_CTRL_PCM_ROLE_EFF,                             \
    .pcm_polar = CONFIG_BTDM_CTRL_PCM_POLAR_EFF,                           \
    .magic = ESP_BT_CONTROLLER_CONFIG_MAGIC_VAL,                           \
};

esp_bt_controller_config_t bt_cfg = BT_CONTROLLER_INIT_CONFIG_DEFAULT();

if((ret = esp_bt_controller_init(&bt_cfg)) != ESP_OK)
{
  ESP_LOGE(SPP_TAG, "%s initialize controller failed: %s\n", __func__, esp_err_to_name(ret));
  return;
}

if((ret = esp_bt_controller_enable(ESP_BT_MODE_CLASSIC_BT)) != ESP_OK)
{
  ESP_LOGE(SPP_TAG, "%s enable controller failed: %s\n", __func__, esp_err_to_name(ret));
  return;
}
```

</details>

<details><summary>bluedroid 초기화 및 Enable</summary>

```c
if((ret = esp_bluedroid_init()) != ESP_OK)
{
  ESP_LOGE(SPP_TAG, "%s initialize bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
  return;
}

if((ret = esp_bluedroid_enable()) != ESP_OK)
{
  ESP_LOGE(SPP_TAG, "%s enable bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
  return;
}
```

</details>

<details><summary>BT 및 SPP 콜백함수 등록</summary>

1. ESP_SPP_INIT_EVT -> ESP_SPP_START_EVT  
처음 bt_spp_acceptor 펌웨어 실행 시 발생
2. ESP_SPP_OPEN_EVT  
안드로이드 앱에서 ESP32 블루투스 연결 시 발생
3. ESP_SPP_DATA_IND_EVT
안도르오드 앱에서 패킷 전송 시 발생

```c
//========================
// BT GAP callback events
//------------------------
// 다음 이벤트가 발생하면 esp_bt_gap_cb() 콜백함수가 호출되어 발생한 이벤트를 처리한다.
typedef enum{
    ESP_BT_GAP_DISC_RES_EVT = 0,              // Device discovery result event
    ESP_BT_GAP_DISC_STATE_CHANGED_EVT,        // Discovery state changed event
    ESP_BT_GAP_RMT_SRVCS_EVT,                 // Get remote services event
    ESP_BT_GAP_RMT_SRVC_REC_EVT,              // Get remote service record event
    ESP_BT_GAP_AUTH_CMPL_EVT,                 // Authentication complete event
    ESP_BT_GAP_PIN_REQ_EVT,                   // Legacy Pairing Pin code request
    ESP_BT_GAP_CFM_REQ_EVT,                   // Security Simple Pairing User Confirmation request.
    ESP_BT_GAP_KEY_NOTIF_EVT,                 // Security Simple Pairing Passkey Notification
    ESP_BT_GAP_KEY_REQ_EVT,                   // Security Simple Pairing Passkey request
    ESP_BT_GAP_READ_RSSI_DELTA_EVT,           // Read rssi event
    ESP_BT_GAP_CONFIG_EIR_DATA_EVT,           // Config EIR data event
    ESP_BT_GAP_SET_AFH_CHANNELS_EVT,          // Set AFH channels event
    ESP_BT_GAP_READ_REMOTE_NAME_EVT,          // Read Remote Name event
    ESP_BT_GAP_MODE_CHG_EVT,
    ESP_BT_GAP_REMOVE_BOND_DEV_COMPLETE_EVT,  // remove bond device complete event
    ESP_BT_GAP_QOS_CMPL_EVT,                  // QOS complete event
    ESP_BT_GAP_EVT_MAX,
}esp_bt_gap_cb_event_t;

if((ret = esp_bt_gap_register_callback(esp_bt_gap_cb)) != ESP_OK)
{
  ESP_LOGE(SPP_TAG, "%s gap register failed: %s\n", __func__, esp_err_to_name(ret));
  return;
}

//========================
// BT GAP callback events
//------------------------
// 다음 이벤트가 발생하면 esp_spp_cb() 콜백함수가 호출되어 발생한 이벤트를 처리한다.
typedef enum{
    ESP_SPP_INIT_EVT            = 0,          // When SPP is inited, the event comes
    ESP_SPP_UNINIT_EVT          = 1,          // When SPP is uninited, the event comes
    ESP_SPP_DISCOVERY_COMP_EVT  = 8,          // When SDP discovery complete, the event comes
    ESP_SPP_OPEN_EVT            = 26,         // When SPP Client connection open, the event comes
    ESP_SPP_CLOSE_EVT           = 27,         // When SPP connection closed, the event comes
    ESP_SPP_START_EVT           = 28,         // When SPP server started, the event comes
    ESP_SPP_CL_INIT_EVT         = 29,         // When SPP client initiated a connection, the event comes
    ESP_SPP_DATA_IND_EVT        = 30,         // When SPP connection received data, the event comes, only for ESP_SPP_MODE_CB
    ESP_SPP_CONG_EVT            = 31,         // When SPP connection congestion status changed, the event comes, only for ESP_SPP_MODE_CB
    ESP_SPP_WRITE_EVT           = 33,         // When SPP write operation completes, the event comes, only for ESP_SPP_MODE_CB
    ESP_SPP_SRV_OPEN_EVT        = 34,         // When SPP Server connection open, the event comes
    ESP_SPP_SRV_STOP_EVT        = 35,         // When SPP server stopped, the event comes
}esp_spp_cb_event_t;

if((ret = esp_spp_register_callback(esp_spp_cb)) != ESP_OK)
{
  ESP_LOGE(SPP_TAG, "%s spp register failed: %s\n", __func__, esp_err_to_name(ret));
  return;
}
```

</details>

<details><summary>SPP 초기화</summary>

```c
if((ret = esp_spp_init(esp_spp_mode)) != ESP_OK)
{
  ESP_LOGE(SPP_TAG, "%s spp init failed: %s\n", __func__, esp_err_to_name(ret));
  return;
}
```

</details>

<details><summary>BT Security 설정</summary>

```c
#if(CONFIG_BT_SSP_ENABLED == true)
  /* Set default parameters for Secure Simple Pairing
  esp_bt_sp_param_t param_type = ESP_BT_SP_IOCAP_MODE;
  esp_bt_io_cap_t iocap = ESP_BT_IO_CAP_IO;
  esp_bt_gap_set_security_param(param_type, &iocap, sizeof(uint8_t));
#endif
```

</details>

<details><summary>Paring PinCode 설정</summary>

```c
/*
 * Set default parameters for Legacy Pairing
 * Use variable pin, input pin code when pairing

esp_bt_pin_type_t pin_type = ESP_BT_PIN_TYPE_VARIABLE;
esp_bt_pin_code_t pin_code;
esp_bt_gap_set_pin(pin_type, 0, pin_code);
```

</details>

#### 예제확인

##### bt_spp_acceptor

example_spp_acceptor_demo.c -> 동작확인완료



#### 참고자료

##### BLE 개념

* [BLE 정리 by 임베디드 개발장이](https://enidanny.github.io/ble/)
  * [BLE (1) - 저전력 블루투스 (BLE) 란?](https://enidanny.github.io/ble/what-is-the-ble/)
  * [BLE (2) - BLE 프로토콜 스택](https://enidanny.github.io/ble/ble-protocol-stack/)
  * [BLE (3) - ATT/GATT 이해하기](https://enidanny.github.io/ble/ble-att-gatt/)
  * [BLE (4) - BLE 디바이스는 어떻게 연결할까?](https://enidanny.github.io/ble/ble-connection/)
  * [BLE (5) - BLE 통신 속도는 실제로 1 Mbps 일까?](https://enidanny.github.io/ble/ble-effective-throughput/)
  * [BLE (6) - BLE 5.0 주요 특징](https://enidanny.github.io/ble/ble5-intro/)
  * [BLE (7) - 연결 파라미터](https://enidanny.github.io/ble/ble-slave-latency/)
  * [BLE (8) - Nordic BLE Chip 개발환경 구축하기](https://enidanny.github.io/ble/ble-development/)
  * [BLE (9) - 블루투스 메시: Overview of Mesh stack](https://enidanny.github.io/ble/ble-mesh/)
  * [BLE (10) - 블루투스 메시: Overview of Mesh operation](https://enidanny.github.io/ble/ble-mesh-opeartion/)
  * [BLE (11) - 블루투스 메시: Overview of Mesh concepts](https://enidanny.github.io/ble/ble-mesh-concepts/)
  * [BLE (12) - 블루투스 메시: Advertising Bearer 포맷](https://enidanny.github.io/ble/ble-mesh-message/)
  * [BLE (13) - 블루투스 소식: Bluetooth 5.1](https://enidanny.github.io/ble/ble-bluetooth-news-51/)
  * [BLE (14) - 새로운 무선 오디오 시장의 시작: Bluetooth 5.2](https://enidanny.github.io/ble/ble-bluetooth-52/)
  * [BLE (15) - Bluetooth 5.3 에서 개선 및 추가된 BLE 기능](https://enidanny.github.io/ble/ble-bluetooth53/)
* 블루투스 앱
  * [블루투스 SPP를 위한 샘플 앱 개발](https://karrel.tistory.com/m/15)
  * [안드로이드 어플에서 직접 주변기기를 검색하고 pairing 하는 방법](http://jinyongjeong.github.io/2018/09/27/bluetoothpairing/)
  * [홈 오토메이션을 위한 모바일 앱 만들기](https://www.hardcopyworld.com/?p=)

##### 아두이노

아두이노에서 제공하는 라이브러리를 이용하면 블루투스 통신을 매우 간단하게 구현할 수 있다.

* [ESP32에서 블루투스 사용하기](https://arsviator.blogspot.com/2019/07/esp32-spp-profile.html)
* [Arduino-ESP32-BLE 개발 관련 내용 정리 - 쉽게 설명, Good](https://velog.io/@embeddedjune/BLE-%EA%B0%9C%EB%B0%9C-%EA%B4%80%EB%A0%A8-%EB%82%B4%EC%9A%A9-%EC%A0%95%EB%A6%AC)
* [ESP32 아두이노 블루투스 테스트 - 아주 쉬움](https://www.bneware.com/blogPost/esp32_arduino_bluetooth)
* [ESP32_BLE_OTA_Arduino](https://github.com/fbiego/ESP32_BLE_OTA_Arduino/blob/main/esp32_nim_ble_ota/esp32_nim_ble_ota.ino)

##### ESP-IDF

* [ESP32 Bluetooth Architecture](https://www.espressif.com/sites/default/files/documentation/esp32_bluetooth_architecture_en.pdf)
* [ESP32 bluetooth serial module](https://higaski.at/aoihashi-esp32-bluetooth-serial-module/)
* [Over The Air Updates (OTA)](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/ota.html#secure-ota-updates-without-secure-boot)

##### Nordic nRF51-DK

ESP32는 소스코드를 제공하지 않는 반면 nRF 시리즈는 소스코드를 제공하고, mbed도 지원함.

* [nRF51 DK FOTA 컨셉 및 예제 프로젝트 실행방법 from 유투브](https://www.youtube.com/watch?v=LdY2m_bZTgE)
* [support arm mbed and fota](https://os.mbed.com/platforms/Nordic-nRF51-DK/#support-for-fota)
* [nRF51 Dongle SDK](https://docs.google.com/viewer?url=http%3A%2F%2Finfocenter.nordicsemi.com%2Fpdf%2FnRF51_Dongle_UG_v1.0.pdf&embedded=true&chrome=false&dov=1) - 가격: [엘레파츠 12만원](https://www.eleparts.co.kr/goods/view?no=9378612)
* [NRF51-DK SDK](https://docs.google.com/viewer?url=https%3A%2F%2Finfocenter.nordicsemi.com%2Fpdf%2FnRF51_DK_UG_v1.1.pdf&embedded=true&chrome=false&dov=1) - 가격: [엘레파츠 6만원](https://eleparts.co.kr/EPXKTGB3)
* [SEGGER Embedded Studio for nRF5](https://m.blog.naver.com/PostView.naver?blogId=cksung71&logNo=221262064390&targetKeyword=&targetRecommendationCode=1)
* [nRF5 DK에서 장치 펌웨어 업데이트(DFU) 설정](https://devzone.nordicsemi.com/nordic/short-range-guides/b/software-development-kit/posts/setting-up-device-firmware-updatedfu-on-the-nrf5-d)
* [완전 무료 개발 툴 : SEGGER Embedded Studio](https://m.blog.naver.com/PostView.naver?blogId=cksung71&logNo=221262064390&targetKeyword=&targetRecommendationCode=1)
* [SEGGER Embedded studio – Getting started from 유투브](https://www.youtube.com/watch?v=YZouRE_Ol8g&t=18s)
### FW_BLE_UART

#### 예제확인

##### 프로젝트 이름 변경

1. ESP-IDF 블루투스 예제 프로젝트 생성
2. 이클립스 프로젝트이름 변경  
bt_spp_acceptor -> bt_uart로 변경
3. main()함수가 있는 파일명 변경  
example_spp_acceptor_demo.c -> bt_uart.c로 변경
4. 빌드 시 참고되는 소스파일 명 변경  
CMakeLists.txt 파일 Open  
SRCS를 example_spp_acceptor_demo.c -> bt_uart.c로 변경

##### menuconfig에 UART설정 추가
1. ESP-IDF UART 예제프로젝트에서 Kconfig.projbuild 복사하여
2. bt_uart 프로젝트 main 폴더에 붙여넣기
3. 기존에 생성한 build 폴더 삭제 후 빌드 재수행
4. 설정파일 열기  
콘솔(ESP-IDF 4.3 CMD)에서 idf.py menuconfig or 이클립스에서 sdkconfig 더블클릭
5. menuconfig에서 추가된 UART 확인

##### 코드구현

* [gitlab login 후 링크확인](https://gitlab.com/private210/ewserver/-/blob/main/function/bt_uart/main/bt_uart.c)


### FW_CAN

#### 기초이론


#### CAN구성

##### 인터페이스


##### 레지스터설정

#### 예제확인

##### timer_group


#### 참고자료

* [ESP32에서 CAN bus 사용하기](https://arsviator.blogspot.com/2019/06/esp32-can-bus.html)

### FW_GPIO

#### [GPIO구성](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/gpio.html)

##### 기능

* 34개의 physical GPIO pad를 갖는데 이중 몇몇은 사용 불가능함.
* 각 패드는 GPIO 또는 internal peripherals signal로 연결하여 사용될 수 있다.

<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_fw_gpio1_pinmap.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;GPIO Alternative Configuration&gt;</em>
</p>

##### 인터페이스

* 출력설정 : GPIO18, GPIO19 포트로 0/1 신호 출력
* 입력설정 : GPIO4(both edge), GPIO5(rising edge) 포트로 인터럽트(EXT_INT) 신호 입력

<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_fw_gpio2_interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;입/출력 포트 정의&gt;</em>
</p>

##### 레지스터설정

#### 예제확인

##### generic_gpio

[`gitlab 로그인 -> private repository -> generic_gpio.c`](https://gitlab.com/private210/ewserver/-/blob/main/peripherals/esp32/generic_gpio/main/gpio_example_main.c)

다음과 같이 console printf, gpio, ext_int, create_task, queue 동작을 확인한다.
1. 1s 간격으로 GPIO18, GPIO19 출력 Toggling
2. GPIO4(both edge), GPIO5(rising edge) 포트를 통해 인터럽트가 발생하면 포트번호를 인자로 갖는 xQueueSendFromISR 발생
3. Task에서 Queue 수신 시 포트번호/신호레벨 printf

```c
void isr_ext_int(void)
{
	// 인터러럽트 발생 시 Send_Queue
}

void gpio_task(void)
{
	for(;;)
	{
		if(xQueueReceive)
			printf("port_number, port_level");
	}
}

void app_main(void)
{
	// gpio 출력 설정
	// gpio 입력 설정
	// Queue 및 태스크 생성(생성에 성공하면 task는 바로 시작됨)
	// ext_int isr 등록
	
	while(1)
	{
		// 1s delay
		// cnt++ print
		// port0 and port1 0/1 toggling
	}
}
```

#### 분석

기본이되는 GPIO toggling 예제프로그램을 통해 프로젝트 구조를 파악한다.

##### 프로젝트 실행

다음 절차를 통해 ESP에서 제공하는 예제프로젝트를 생성한다.
1. esp32-idf eclipse에서 File->New->Espressif IDF Project를 선택한다.
여기서는 peripherals->gpio->`generic_gpio` 프로젝트를 선택한다.
<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_fw_gpio3_prj_create.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;esp32-idf에저 제공되는 gpio 예제프로젝트 생성&gt;</em>
</p>
2. 타겟을 esp32로 선택한 다음 Build&Run을 통해 ESP32보드에 실행파일을 다운로드 한다.
<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_fw_gpio4_prj_create.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;프로젝트 빌드 및 실행&gt;</em>
</p>
3. esp32-idf eclipse에서 제공되는 터미널을 통해 printf 출력을 모니터링 한다.  
Window 탭 -> Show view -> terminal
<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_fw_gpio5_prj_create.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;printf 콘솔 모니터링&gt;</em>
</p>

##### 프로젝트 구조

Basic Firmware(led blinking)에 대한 분석을 통해 프로젝트 구조를 파악한다.

* esp32-idf에서 제공되는 예제 프로젝트는 다음과 같은 구조로 프로젝트를 생성하며, 
build 폴더 하위경로에 esp-idf sdk directory 구조와 동일하게 폴더를 생성한다.
* esp-idf sdk에 있는 소스를 빌드하여 library(*.a) 파일로 만들어 build 폴더 하위 경로에 library(*.a) 파일을 생성/링킹한다.
* 따라서 프로젝트에는 main.c파일만 생성되며, 이외의 파일은 library(*.a) 파일로 존재하며, 원본소스를 확인하려면 esp-idf sdk 설치경로(C:\Users\cdshim\esp\esp-idf)에 있는 소스파일을 확인해야 한다.

```c
generic_gpio
 ┣━ Binaries
 ┃   ┣━ bootloader.elf
 ┃   ┗━ generic-gpio.elf
 ┣━ build
 ┃   ┣━ bootloader
 ┃   ┗━ esp-idf             // esp-idf sdk의
 ┃       ┣━ bootloader
 ┃       ┗━ driver          // driver 폴더에 위치한 소스를 빌드하여
 ┃          ┗━ libdriver.a  // library로 만들어 이곳에 저장
 ┃             :
 ┣━ main
 ┃   ┣━ generic-gpio_main.c // main 소스파일
 ┃   ┣━ CMakeLists.txt
 ┃   ┗━ component.mk
 ┣━ CMakeList.txt
 ┣━ example_test.py
 ┣━ Makefile
 ┣━ README.md               // 프로젝트 설명(eclipse에서 markdown 포멧으로 확인가능)
 ┣━ sdkconfig               // 더블클릭 -> 프로젝트 관련 설정(= menuconfig)
 ┗━ sdkconfig_old           // 원본 설정파일
```

#### 참고자료

* [ESP32 ESP-IDF Programming Guide(2312p).pdf](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/esp-idf-en-v4.4-dev-3235-g3e370c4-esp32.pdf)
  * 705p, `2.3.4 GPIO & RTC GPIO`
* [esp32_technical_reference_manual_en(720p).pdf](https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf#iomuxgpio)
  * 45p, `4 IO_MUX and GPIO Matrix (GPIO, IO_MUX)`
### FW_TIMER

#### [TIMER구성](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/timer.html)

##### 기능

* 2개의 하드웨어 타이머 그룹을 갖고 있으며, 각 그룹은 2개의 general-purpose hardware timer를 갖고 있다.
* 모든 타이머는 16bit prescaler를 갖는 64bit timer로,
* auto-reload를 통해 up/down 카운터로 동작한다.

##### 인터페이스

타이머인터럽트 발생 시 등록해 놓은 콜백함수가 호출되어 메시지를 큐버퍼에 저장하고, main에서 메시지 수신 시 printf를 통해 콜백함수 호출여부를 확인한다.  
따라서 printf 만으로 동작을 확인하기 때문에 별도의 인터페이스는 필요없다.

##### 레지스터설정

<details><summary>파라미터 설정</summary>

* 구조체에 값을 설정하여 esp32_api timer_init() 함수에 인자로 설정값을 건네 타이머 초기화를 수행한다.

```c
typedef struct {
    timer_alarm_t alarm_en;         /*!< Timer alarm enable */
    timer_start_t counter_en;       /*!< Counter enable */
    timer_intr_mode_t intr_type;    /*!< Interrupt mode */
    timer_count_dir_t counter_dir;  /*!< Counter direction  */
    timer_autoreload_t auto_reload; /*!< Timer auto-reload */
    uint32_t divider;               /*!< Counter clock divider. The divider's range is from from 2 to 65536. */
    #if SOC_TIMER_GROUP_SUPPORT_XTAL
        timer_src_clk_t clk_src;    /*!< Use XTAL as source clock. */
    #endif
} timer_config_t;

timer_config_t config = { 
    .divider = TIMER_DIVIDER, 
    .counter_dir = TIMER_COUNT_UP, 
    .counter_en = TIMER_PAUSE,
    .alarm_en = TIMER_ALARM_EN, 
    .auto_reload = auto_reload, };  // default clock source is APB
timer_init(group, timer, &config);
```

</details>

<details><summary>Counter Value 설정</summary>

초기화 후 다음과 같이 타아머카운트 시작값을 설정하며, auto_reload값이 설정되어 있으면 overflow 발생 후 auto_reload로 값애 재설정되고, 그렇치 않을 경우 최초 타이머카운트 시작값으로 다시 카운트를 시작한다.

```c
timer_set_counter_value(group, timer, 0);
```

</details>

<details><summary>timer alarm 설정 및 timer enable</summary>

```c
timer_set_alarm_value(group, timer, timer_interval_sec * TIMER_SCALE);
timer_enable_intr(group, timer);
```

</details>

<details><summary>콜백함수 등록 후 타이머 시작</summary>

```c
example_timer_info_t *timer_info = calloc(1, sizeof(example_timer_info_t));
timer_info->timer_group = group;
timer_info->timer_idx = timer;
timer_info->auto_reload = auto_reload;
timer_info->alarm_interval = timer_interval_sec;
timer_isr_callback_add(group, timer, timer_group_isr_callback, timer_info, 0);

timer_start(group, timer);
```

</details>

#### 예제확인

##### timer_group

1. 타이머 설정 및 콜백함수를 등록하여 타이머를 시작
2. 타이머인터럽트에 의해 콜백함수가 호출되면 큐버퍼에 메시지 전송
3. main의 while()문에서 메시지 수신을 대기하고 있다가 메시지를 수신하면 타이머카운트 값, 인터럽트가 발생된 타이머 그룹, 타이머 정보 printf

### FW_UART

#### [UART구성](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/uart.html)

##### 기능

* ESP32는 3개(UART0, UART1, UART2)의 UART Controller를 가지고 있고,
* 이중 UART0은 모니터링용으로, UART2는 타겟 MCU와의 데이터 송/수신을 위해 사용한다.

##### 인터페이스

[`CP2102 USB to TTL 컨버터`(디바이스마트, 2750원 판매)](https://www.devicemart.co.kr/goods/view?no=1324910)를 통해 타겟 MCU와 통신을 수행한다.

* UART0
  * RX0(GPIO3), TX0(GPIO1)
  * Onboard 되어있는 usb to uart chip(CP2102N)에 연결되어 usb를 통해 가상 시리얼 포트로 사용되며, 주로 콘솔 모니터링을 위해 사용한다.
* UART2
  * RX2(GPIO5), TX2(GPIO4)
  * 제어기와 연결되어 블루투스를 통해 수신한 정보를 제어기로 전달하기 위해 사용한다.
* USB to UART 컨버터
  * [FT232 USB UART Board (mini)](https://www.waveshare.com/wiki/FT232_USB_UART_Board_(mini))
    * [엘레파츠 6600원 판매](https://www.eleparts.co.kr/goods/view?no=2305017)
    * [드라이버 다운로드](https://www.waveshare.com/wiki/File:FT232-Driver.7z)
    * [Board Schematic](https://www.waveshare.com/w/upload/f/f4/FT232-USB-UART-Board-Schematic.pdf)
    * [FT232RL CPU Datasheet](https://www.waveshare.com/w/upload/b/b5/FT232R.pdf)
  * ~~CP2102 USB to TTL Uart Serial Converter~~
    * [~~디바이스마트, 2750원 판매~~](https://www.devicemart.co.kr/goods/view?no=1324910)
  * 21.10.03 장치인식 문제
    * `CP2102 USB to TTL Uart Serial Converter`는 사용 안함 (사용하기에는 이게 더 편함)
    * 기존에 사용했던 `FT232 USB UART Board (mini)` 사용함

<p align="center">
	<img
		src={require('/img/3_embedded/mbd_hw_fw_uart1_interface.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;입/출력 포트 정의&gt;</em>
</p>

##### 레지스터설정

<details><summary>파라미터 설정</summary>

* uart_param_config() 함수를 1번 호출하여 한번에 설정하는 방법과,
* uart_set_baudrate(), uart_set_word_length(), uart_set_parity() 등과 같이 각 단계를 각각의 함수를 호출하여 각각 설정하는 방법이 있으며,
* 여기서는 config() 함수를 이용하여 한번에 UART 파라미터를 설정한다.

```c
const uart_port_t uart_num = UART_NUM_2;

uart_config_t uart_config = {
  .baud_rate = 115200,
  .data_bits = UART_DATA_8_BITS,
  .parity = UART_PARITY_DISABLE,
  .stop_bits = UART_STOP_BITS_1,
  .flow_ctrl = UART_HW_FLOWCTRL_CTS_RTS,
  .rx_flow_ctrl_thresh = 122,
};

ESP_ERROR_CHECK(uart_param_config(  // 설정함수
                  uart_num,         // UART 0/1/2 중 하나
                  &uart_config));   // 설정 파라미터
```

</details>

<details><summary>UART pin 설정</summary>

uart_set_pin() 함수를 이용하여 출력핀을 설정한다.

```c
ESP_ERROR_CHECK(uart_set_pin(
                  UART_NUM_2,       // UART2
                  4,                // TX2 : GPIO4
                  5,                // RX2 : GPIO5
                  18,               // RTS: GPIO18
                  19));             // CTS: GPIO19
```

</details>

<details><summary>드라이버 설정</summary>

Rx/Tx ring buffer size, event queue handle을 설정한다.

```c
// Setup UART buffered IO with event queue
const int uart_buffer_size = (1024 * 2);
QueueHandle_t uart_queue;

// Install UART driver using an event queue here
ESP_ERROR_CHECK(uart_driver_install(
                  UART_NUM_2, uart_buffer_size, \
                  uart_buffer_size, 
                  10, 
                  &uart_queue, 
                  0));
```

</details>

<details><summary>데이터 송신</summary>

시리얼 통신은 각 UART controller의 Finite State Machine(FSM)에 의해 제어된다.
* `uart_write_bytes()` 함수를 이용하여 Tx FIFO 버퍼에 데이터 write
* Tx FIFO buffer에 free space가 있으면 ISR이 background에서 데이터를 Tx ring buffer에서 Tx FIFO로 전송한다.

```c
// Write data to UART.
char* test_str = "This is a test string.\n";
uart_write_bytes(uart_num, (const char*)test_str, strlen(test_str));
```

</details>

<details><summary>데이터 수신</summary>

* UART 데이터를 수신하면 Rx FIFO buffer에 저장
*  uart_get_buffered_data_len() 함수를 이용하여 Rx FIFO에서 읽을 수 있는 byte 수 확인
*  uart_read_bytes() 함수를 이용하여 수신 데이터 읽기

```c
// Read data from UART.
const uart_port_t uart_num = UART_NUM_2;
uint8_t data[128];
int length = 0;
ESP_ERROR_CHECK(uart_get_buffered_data_len(uart_num, (size_t*)&length));
length = uart_read_bytes(uart_num, data, length, 100);
```

</details>

#### 예제확인

##### uart_echo

[`gitlab 로그인 -> private repository -> uart_echo_example_main.c`](https://gitlab.com/private210/ewserver/-/blob/main/peripherals/esp32/uart_echo/main/uart_echo_example_main.c)

다음과 같이 console printf 및 loopback(GPIO4_Tx2, GPIO5_Rx2) 동작을 확인한다.
1. Task 생성/시작 전 console printf
2. loopback task 생성
3. 일정시간동안 패킷 수신 대기
4. 수신된 패킷 송신

##### uart_async_rxtxtasks

[`gitlab 로그인 -> private repository -> uart_async_rxtxtasks_main.c`](https://gitlab.com/private210/ewserver/-/blob/main/peripherals/esp32/uart_async_rxtxtasks/main/uart_async_rxtxtasks_main.c)

다음과 같이 console printf, GPIO4_Tx2, GPIO5_Rx2 동작을 확인한다.
1. Task 생성/시작 전 console printf
2. rx_task, tx_task 생성
3. tx_task에서 주기적으로 "Hello world\n" 메시지 GPIO4_Tx2
4. rx_task에서 bytes 수신 시 log 출력


#### 참고자료
* ESP32 ESP-IDF Programming Guide(2312p).pdf -> 900p, 2.3.21 Universal Asynchronous Receiver/Transmitter (UART)

### FW_WIFI

#### 기초이론

##### 기본개념

Bluetooth와는 다르게 Wifi를 통해 임베디드 웹서버를 구축하면 웹브라우저만 있으면 ESP32에 접속하는 Client에서 블루투스 앱과 같은 별도 프로그램 없이 GUI를 구현할 수 있다.

#### WIFI구성

##### 인터페이스


##### 레지스터설정

#### 예제확인



#### 참고자료

##### wifi
* [wifi programming](https://docs.espressif.com/projects/esp-idf/en/stable/api-guides/wifi.html)
* [ESP32 blufi(Bluetooth로 ip/pw등 연결설정하여 연결되면 wifi로 통신)](https://coyoteugly.tistory.com/148)

##### 아두이노

* [아두이노 및 파이썬을 이용하여 ESP32에서 웹소켓 서버 실행](https://arsviator.blogspot.com/2018/07/esp32-websocket-server-on-esp32.html)
* [ESP32에서 JSON 파싱(for 실시간 웹페이지 업데이트)](https://arsviator.blogspot.com/2018/07/esp32-json.html)
* [ESP32에 static IP 사용하기](https://arsviator.blogspot.com/2018/11/esp32-static-ip-using-static-ip-address.html)
* [ESP32’s Web page accessed using Chrome browser - 끝부분](https://www.electronicshub.org/esp32-servo-control/)

### RTOS_Sync

#### 기본개념

##### 세마포어/뮤텍스

* [FreeRTOS Message Queue 사용](https://arsviator.blogspot.com/2018/07/esp32-freertos-message-queue.html)

##### 큐

1. boolean 크기를 갖는 데이터를 10개까지 저장할 수 있는 큐를 생성하고, 
2. 인터럽트 수신 즉시 큐에 데이터를 계속 밀어 넣고,
3. main에서 큐 데이터를 수신하여 사용한다.

```c
static bool toggleLED = false;
static xQueueHandle gpio_evt_queue = NULL;
uint8_t trigger;    // 큐에 있는 데이터를 저장할 변수

void uart_isr(void)
{
  if(패킷수신)
  {
    toggleLED = !toggleLED;
    xQueueSend(gpio_evt_queue, &toggleLED, NULL);
  }
}

void main(void)
{
	gpio_evt_queue = xQueueCreate(
			10,               // 아이템 최대 개수
			sizeof(bool));    // 각 아이템의 크기
  
  while(1)
  {
		if(xQueueReceive(gpio_evt_queue, &trigger, portMAX_DELAY))
		{
			gpio_set_level(GPIO_OUTPUT_IO_0, trigger);
			printf("# [gpio_task] gpio out: %d\n", trigger);
		}
  }
}
```

##### 태스크 동기화


#### 참고자료

* [freertos-user guide for aws](https://docs.aws.amazon.com/ko_kr/freertos/latest/userguide/freertos-ug.pdf)

### RTOS_Task

#### 태스크 생성

* FreeRTOS 기반 태스크 생성 시 [우선순위, 코어를 선태갛여 태스크를 생성](https://arsviator.blogspot.com/2019/04/esp32-use-multicore-on-esp32.html)할 수 있다.

#### 우선순위 설정

##### FreeRTOS

* [ESP32로 알아보는 FreeRTOS](https://slowbootkernelhacks.blogspot.com/2020/12/esp32-freertos.html)
* [Amazon FreeRTOS for AWS Cloud](https://github.com/aws/amazon-freertos)
* [FreeRTOS 정리 - good](https://velog.io/@embeddedjune/FreeRTOS-%EC%A0%95%EB%A6%AC-%E5%AE%8C.-%EC%B4%9D%EC%A7%91%EB%B3%B8)
* [FreeRTOS 정리 1. FreeRTOS와 Task](https://velog.io/@embeddedjune/FreeRTOS-%EC%A0%95%EB%A6%AC-1.-FreeRTOS%EC%99%80-Task)

##### mbed

* [MBED OS(RTOS 포함) 워크숍](https://gcamp.tistory.com/tag/arm_mbed_rtos)
  * [MBED OS(RTOS 포함) 워크숍 1일](https://www.youtube.com/watch?v=pu8pM536uks&t=5025s)
  * [MBED OS(RTOS 포함) 워크숍 2일](https://www.youtube.com/watch?v=IrZLFODeFoM)
  * [MBED OS(RTOS 포함) 워크숍 3일](https://www.youtube.com/watch?v=BH4AFFJqh_Q)
  * [MBED OS(RTOS 포함) 워크숍 4일](https://www.youtube.com/watch?v=QPpxXiEKAMI)
  * [MBED OS(RTOS 포함) 워크숍 5일](https://www.youtube.com/watch?v=KFSLiFLvuO4)
* [Arm MBED Programming Basics](https://gcamp.tistory.com/tag/arm_mbed?page=3)
  * [Arm MBED Programming Basics 01강](https://gcamp.tistory.com/1523)
	* [Arm MBED Programming Basics 02강 디바이스 연결](https://gcamp.tistory.com/1523)
	* [Arm MBED Programming Basics 03강](https://gcamp.tistory.com/1524)
	* [Arm MBED Programming Basics 04강 프로그램 기본 구조](https://gcamp.tistory.com/1525)
	* [Arm MBED Programming Basics 05강 디지털 출력](https://gcamp.tistory.com/1526)
	* [Arm MBED Programming Basics 06강 디지털 입력](https://gcamp.tistory.com/1527)
	* [Arm MBED Programming Basics 07강 PwmOut](https://gcamp.tistory.com/1528)
	* [Arm MBED Programming Basics 08강 아날로그 출력AnalogOut](https://gcamp.tistory.com/1529)
	* [Arm MBED Programming Basics 09강 아날로그 입력 AnalogIn](https://gcamp.tistory.com/1530)
	* [Arm MBED Programming Basics 10강 BusOut](https://gcamp.tistory.com/1531)
	* [Arm MBED Programming Basics 11강 BusIn](https://gcamp.tistory.com/1532)
	* [Arm MBED Programming Basics 12강 토양수분센서](https://gcamp.tistory.com/1533)
	* [Arm MBED Programming Basics 13강 적외선인체감지센서PIR](https://gcamp.tistory.com/1534)
	* [Arm MBED Programming Basics 14강 조도센서CDS](https://gcamp.tistory.com/1535)
	* [Arm MBED Programming Basics 15강 가스센서 불꽃감지센서](https://gcamp.tistory.com/1536)
	* [Arm MBED Programming Basics 16강 거리측정센서](https://gcamp.tistory.com/1537)
	* [Arm MBED Programming Basics 17강 온습도센서](https://gcamp.tistory.com/1538)
	* [Arm MBED Programming Basics 18강 피에조부저](https://gcamp.tistory.com/1539)
	* [Arm MBED Programming Basics 19강 릴레이](https://gcamp.tistory.com/1540)
	* [Arm MBED Programming Basics 20강 진동센서와모터, IR장애물센서](https://gcamp.tistory.com/1541)
	* [Arm MBED Programming Basics 21강 UARTBoardToPc 통신](https://gcamp.tistory.com/1542)
	* [Arm MBED Programming Basics 22강 UARTBoardToBoard 통신](https://gcamp.tistory.com/1543)
	* [Arm MBED Programming Basics 23강 I2C LCD활용 통신](https://gcamp.tistory.com/1544)
	* [Arm MBED Programming Basics 24강 I2C OLED활용 통신](https://gcamp.tistory.com/1545)
	* [Arm MBED Programming Basics 25강 SPI LCD활용 통신](https://gcamp.tistory.com/1546)
	* [Arm MBED Programming Basics 26강 SPI LCD활용 통신](https://gcamp.tistory.com/1547)
	* [Arm MBED Programming Basics 27강 7Segment1digit 사용하기](https://gcamp.tistory.com/1548)
	* [Arm MBED Programming Basics 28강 7Segment4digit 사용하기](https://gcamp.tistory.com/1549)
	* [Arm MBED Programming Basics 29강 LED Matrix8X8사용하기](https://gcamp.tistory.com/1550)
	* [Arm MBED Programming Basics 30강 RTC(DS1302)사용하기](https://gcamp.tistory.com/1551)
	* [Arm MBED Programming Basics 31강 인터럽트Interrupt](https://gcamp.tistory.com/1552)
	* [Arm MBED Programming Basics 32강 반복실행Ticker](https://gcamp.tistory.com/1553)
	* [Arm MBED Programming Basics 33강 시간 측정 Timer](https://gcamp.tistory.com/1554)
	* [Arm MBED Programming Basics 34강 시간 종료Timeout](https://gcamp.tistory.com/1555)
	* [Arm MBED Programming Basics 35강 서보Servo모터](https://gcamp.tistory.com/1556)
	* [Arm MBED Programming Basics 36강 스테핑Stepping모터](https://gcamp.tistory.com/1557)
	* [Arm MBED Programming Basics 37강 DC모터](https://gcamp.tistory.com/1558)
	* [Arm MBED Programming Basics 38강 OnBoardSensor L475](https://gcamp.tistory.com/1559)
	* [Arm MBED Programming Basics 39강 스레드](https://gcamp.tistory.com/1560)
	* [Arm MBED Programming Basics 40강 스레드 통신](https://gcamp.tistory.com/1561)

## 소프트웨어

### Application Logic

T.B.D

#### Function Block

#### 참고자료

* [Smart door bell and noise meter using FFT on ESP32](https://iotassistant.io/esp32/smart-door-bell-noise-meter-using-fft-esp32/)
* esp32 예제소스
  * [esp32 github 예제소스 by sglee0223](https://github.com/sglee0223/esp32)
* [ESP-IoT-Solution Programming Guide](https://docs.espressif.com/projects/espressif-esp-iot-solution/en/latest/)
  * [관성 측정 장치(IMU) - MPU6050](https://docs.espressif.com/projects/espressif-esp-iot-solution/en/latest/sensors/imu.html#adapted-products)
* 안드로이드 스튜디오 - 블루투스
* [ESP-IDF 설치](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#get-esp-idf)


