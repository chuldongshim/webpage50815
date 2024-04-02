---
slug: docu
title: 문서작성
author: chuldong shim
author_title: Maintainer of Docs
author_image_url: https://avatars.githubusercontent.com/chuldongshim
tags: [docu, docusaurus]
---

문서작성 팁

<!--truncate-->

<div align="right">
  <font size="4">
    Since 21.08.17 ~ 
  </font>
</div>

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

<details>
  <summary>Toggle me!</summary>
  <div>
    <div>This is the detailed content</div>
	<details>
	  <summary>
	    <div>Nested toggle!</div>
	    <div>some surprise inside...</div>
	  </summary>
	  <div>
	    ♨♨♨
	  </div>
	</details>
  </div>
</details>

## Link

Docusaurus Tutorial
아래 URL접속해서 classic, classic-typescript, facebook 중 하나 클릭하면 시뮬레이터를 통해 수정사항을 바로 확인할 수 있음.
* https://github.com/facebook/docusaurus/tree/main/examples

벤치마킹용 docusaurus homepage Examples
* [Unity Multiplayer Networking](https://docs-multiplayer.unity3d.com/)

### 문서 링크

웹페이지에서 문서제목에 마우스를 가져가면 우축에 #표시가 나타나며, #에 마우스를 가져가면 좌측하단에 팝업으로 링크주소가 나타난다.
이 링크주소를 복사하여 다음과 같이 제목 or Text에 링크를 설정할 수 있다.  
단, 한글제목을 링크 할 경우 encoding된 값으로 링크주소를 넣어야 하는데, 이 경우 마우스를 #에 가져가 마우스 우클릭으로 주소를 복사한 다음 메모장에 붙여 넣어 생성된 링크 주소를 이용한다.  
만약 한글제목id인 경우 인코딩으로 link가 길어지므로 "## 모델기반설계 {#my-mbd-id}"와 같이 [id를 재설정](https://docusaurus.io/ko/docs/next/markdown-features/toc#heading-ids)하여 간단한 id로 링크를 걸수 있다.
```
대소문자구분하므로 링크주소가 소문자이면 소문자로 해야 함
localhost:3000/webpage/docs/mycareer/myprocess/#a-spice-cl3		// 제목링크주소
[링크설정](/docs/mycareer/myprocess/#a-spice-cl3)				// 링크설정방법
[한글링크설정](/docs/introduce#%ED%9D%AC%EB%A7%9D%EC%82%AC%ED%95%AD)
```

a태크의 href 속송에서 경로뒤에 #와 함께 제목을 붙이면 해당 페이지의 제목으로 링크가 설정된다.
```
<a href="./hello-world#시험-210911">시험에 대한 생각</a>
```

a태크의 href 속성을 통해 링크를 연결한 경우 title 속성을 통해 페이지에 대한 설명을 추가할 수 있다.
(문서 중간에 head, body 테그 사용하지 말고 문서작성 초기 전체 Structure를 잡을때 사용해야 함)
```
<html>
	<head>
		<title>a태그 예시</title>
	</head>
	<body>
		<a href="https://blog.naver.com/alyssa111" title="일상 글">하양의 블로그</a>
	</body>
</html>
```
left(default)/center align External url Link

<a href="https://blog.naver.com/alyssa111" title="일상 글">하양의 블로그</a>

<p align="center">
	<a href="https://blog.naver.com/alyssa111" title="일상 글">하양의 블로그</a>
</p>

### 이미지 링크

#### 웹이서 이미지 링크

이미지 링크
```
![homepage](http://commonmark.org/help/images/favicon.png)
```
![homepage](http://commonmark.org/help/images/favicon.png)

이미지 클릭 시 사이트로 이동
```
[![homepage](http://commonmark.org/help/images/favicon.png)](http://commonmark.org "Redirect to homepage")
```
[![homepage](http://commonmark.org/help/images/favicon.png)](http://commonmark.org "Redirect to homepage")

a태그 안에 있는 target 속성의 값에 따라 링크여는 방법을 변경할 수 있다.
* _blank(새창이나 새탭에서 열기)
* _self(기본값으로 링크가 있는 화면에서 열기)
* _parent(프레임 사용 시 부모프레임에 표시)
* _top(프레임 사용 시 전체화면에 표시)

이미지 클릭 시 링크된 Docusaurus html 파일로 연결

<p align="center">
    <a target="_blank"
    href="/assets/test.html">
        <img
            src={require('/img/docusaurus.png').default}
            alt="Example banner"
            width="350"
        /><br/><em>&lt;이미지와 html파일 연결&gt;</em>
    </a>
</p>

이미지 클릭 시 이밎 확대

<p align="center">
    <a target="_blank"
    href={require('/img/docusaurus.png').default}>
        <img
            src={require('/img/docusaurus.png').default}
            alt="Example banner"
            width="350"
        /><br/><em>&lt;이미지 클릭 시 원본 이미지 열기&gt;</em>
    </a>
</p>

#### MD 이미지 링크

마크다운 기본문법, JSX require(이미지 크기 조절 가능) 구문을 사용하여 <u>이미지+링크</u> 함게 연결할 수 있다.

이미지+링크 예제(아래 이미지 클릭 시 새탭에서 링크된 이미지가 열림)  
```
[![Docusaurus logo](/img/docusaurus.png)](/img/docusaurus.png)
```
[![Docusaurus logo](/img/docusaurus.png)](/img/docusaurus.png)

#### React 이미지 링크

확인 결과 left/right는 img 태그 내부에서 설정이 가능하나 center align은 img 외부 태그를 통해 설정해야 한다.
아래 이미지 클릭 시 새탭에서 링크된 이미지가 열림 (아래 이미지는 링크가 안열리는데 실제 다른데서 이렇게 하면 동작됨)
```
<p align="center">
	<a target="_blank"
	href={require('/img/docusaurus.png').default}>
		<img
			src={require('/img/docusaurus.png').default}
			alt="Example banner"
			width="350"
		/><br/><em>&lt;이미지 Caption&gt;</em>
	</a>
</p>
```
<p align="center">
	<img
		src={require('/img/docusaurus.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;그림제목&gt;</em>
</p>

align 속성을 지정하지 않으면 default로 left align이 적용된다.
<img
  src={require('/img/docusaurus.png').default}
  alt="Example banner"
  width="200"
/>

<img
  src={require('/img/docusaurus.png').default}
  alt="Example banner"
  align="right" 
  width="200"
/>

#### HTML Container 크기에 맞게 이미지 크기 Auto-Resize
width=350의 고정된 이미지 출력

```
<p align="center">
	<img
		src={require('/img/blog_test.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;A-SPICE 표준 프로세스&gt;</em>
</p>

```
<p align="center">
	<img
		src={require('/img/blog_test.png').default}
		alt="Example banner"
		width="350"
	/><br/><em>&lt;A-SPICE 표준 프로세스&gt;</em>
</p>

[div element에 "box" class를 이용하여 HTML크기에 따라 이미지 크기 재조정](https://www.w3docs.com/snippets/css/how-to-auto-resize-an-image-to-fit-an-html-container.html)

```
<p align="center">
	<div class="box">
		<img
			src={require('/img/blog_test.png').default}
			alt="Example banner"
		/><br/><em>&lt;A-SPICE 표준 프로세스&gt;</em>
	</div>
</p>
```

<p align="center">
	<div class="box">
		<img
			src={require('/img/blog_test.png').default}
			alt="Example banner"
		/><br/><em>&lt;A-SPICE 표준 프로세스&gt;</em>
	</div>
</p>

#### iframe(유투브 url) 링크

* 지도링크<br />
<iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="450" height="200"
    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
</iframe>

* 홈페이지 링크<br />
<iframe
	src="https://docs-multiplayer.unity3d.com/"
  title="iframe Example 1"
	width="450" height="300">
</iframe>

* [유투브 링크](https://aboooks.tistory.com/205)<br />
어느 화면에서든 맞도록 자동으로 늘었다 줄었다 하는 기술을 반응형(Responsive)이라고 부르며 유튜브 화면 역시 반응형으로 공유가 가능하다.
[유튜브 반응형 영상링크 삽입 방법](https://lightblog.tistory.com/222)은 다음과 같다.
  * <http://embedresponsively.com/> 접속
  * url에 유투브 영상주소 입력 후 변환 된 src로 url 주소를 업데이트하여 붙여 넣기
```
<p align="center">
	<iframe 
		width="350" height="250"
		src="http://www.youtube.com/embed/xDMP3i36naA"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
	<br/><em>&lt;동영상 Caption&gt;</em>
</p>

* 스마트폰으로 유투브 확인 시 350x200이 제일 적당한 비율임
```

<p align="center">
	<iframe 
		width="350" height="250"
		src="http://www.youtube.com/embed/xDMP3i36naA"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
	<br/><em>&lt;재생 완료 후 관련영상이 나옴&gt;</em>
</p>

[동영상 링크 끝에 `?rel=0`를 붙이면 동영상재상 완료 후 첫화면이 다시 나온다.](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=zzogmani&logNo=220084533275)

<p align="center">
	<iframe 
		width="350" height="250"
		src="http://www.youtube.com/embed/xDMP3i36naA?rel=0"
		frameborder="0"
		allowfullscreen="true">
		이 브라우저는 iframe을 지원하지 않습니다.
	</iframe>
	<br/><em>&lt;재생 완료 후 첫화면이 나옴&gt;</em>
</p>

#### 이미지 변환

png파일을 svg파일로 변환
https://onlineconvertfree.com/complete/png-svg/
(V-model+Agile 첫페이지의 경우 화면에 페이지가 다 나오게 한 상태(63%)에서 마우스 스크롤 두번해서(100%) 이미지 캡처)

### 파일 링크

#### MD파일 링크
파일링크 시 파일명을 기준으로 링크되지 않고 파일 id를 기준으로 링크된다.

```md title="파일 링크"
Let's see how to [aspice](/docs/past/development_process/1_aspice.md) -> Fail.
Let's see how to [aspice](/docs/past/development_process/aspice) -> OK.
```

#### pdf파일 링크

이미지 연결과 같은 방식으로 파일 or 비디오나 링크의 url을 연결할 수 있다.

```md
[마크다운을 사용해 PDF 파일 내려받기](/assets/docusaurus-asset-example-pdf.pdf)

<a
  target="_blank"
  href={require('/assets/docusaurus-asset-example-pdf.pdf').default}>
  JSX를 사용해 PDF 파일 내려받기
</a>
```

* [마크다운을 사용해 PDF 파일 내려받기](/assets/docusaurus-asset-example-pdf.pdf)  
* <a target="_blank" href={require('/assets/docusaurus-asset-example-pdf.pdf').default}>
    JSX를 사용해 PDF 파일 내려받기
  </a>
* [프로젝트 계획/관리 문서(docx) 내려받기](/assets/project_management_plan.docx)  

#### 제목에 파일 링크

제목 단락은 별도로 지정하지 않으면 자동으로 생성된다. 제목단락이 영문인 경우 대문자는 소문자로 바뀌어 제목단락 id가 생성된다. 즉, ### Hello World라고 작성한 제목 단락은 hello-world를 id값으로 가집니다.

```md title="제목 링크"
Let's see how to [aspice](/aspice).
Let's see how to [aspice](../past/1_aspice.md).
**Result:** [Front Matter(제목 링크)](#front-matter) -> OK.  
**Result:** [산출물(제목 링크)](#산출물) -> OK.  
```
**Result:** [Front Matter(제목 링크)](#front-matter) -> OK.  
**Result:** [산출물(제목 링크)](#산출물) -> OK.  

test: [ref](file:///C:/Users/User/workspace_github/webpage_offline/docs/test.txt)

#### html 파일 링크

* Simulink Live Script와 같은 외부 편집기를 통해 문서(기능사양) 작성한 문서를 docusaurus에서 확인하기 위해서는 html 포멧으로 변환하여 링크를 통해 연결해야 한다(docusaurus에서 작성하는 md파일도 결국 html로 변환됨).  
* 확인결과 상대경로로 링크를 연결하면 Page Not found 페이지가 나타나므로 절대경로로 html파일을 링크해야 한다.
* Docusaurus는 docs폴더는 md파일만 html로 변환하여 build 폴더에 저장한다.
  * html파일을 `..\webpage\docs\mbd\sys\test.html`와 같이 docs폴더에 저장한 후 Build를 수행하면 `..\webpage\build\docs\mbd\sys\`에 html파일이 생성되지 않음
  * 확인결과 만약 docs 폴더에 html파일이 있는 상태에서 build를 수행하면 기존에 있는 html파일은 삭제하고, md파일을 html파일로 변환하여 build 폴더에 저장함
  * 따라서 md 이외의 파일은 전부 assets 폴더를 통해 관리해야 한다.
* html파일 링크를 위해서는 assets폴더를 이용해야 한다.
  * html파일 변환 전 원본파일과 html파일을 함께 관리해야 하므로 assets 폴더에서 html파일을 관리하는 것이 맞음
  * html파일을 `..\webpage\static\assets\mbd\test.html`와 같이 저장한 후 Build를 수행하면 `..\webpage\build\assets\mbd\test.html`과 같이 html파일이 생성됨

``` md title="local 문서에서 확인"
[tset absolute link in same page](http://localhost:3000/webpage/assets/test.html)
[tset relative link in same page](/assets/test.html)
<a href="/assets/test.html" target="_blank">tset relative link in new tab page</a>
```
* [tset absolute link in same page](http://localhost:3000/webpage/assets/test.html)
* [tset relative link in same page](/assets/test.html) // 같은 페이지에서 열면 됐다 안됨
* <a href="/assets/test.html" target="_blank">tset relative link in new tab page</a> // 새탭 페이지에서 열면 잘됨

:::note
target="_blank"가 포함되면 새탭에서 링크를 연다.
target="_self"가 포함되면 현재탭에서 링크를 연다.
rel="noopener noreferrer"가 포함되면 어디서 웹페이지를 열었는지에 대한 정보가 전송되지 않는다.
:::

``` md title="인터넷 연결 시 github server를 통해 확인"
[tset web link](https://github.com/chuldongshim/webpage/assets/test.html)
```
* [tset web link](https://github.com/chuldongshim/webpage/assets/test.html)

## Mdx

### MDX and React Components

[MDX](https://mdxjs.com/) can make your documentation more **interactive** and allows using any **React components inside Markdown**:

```jsx
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`)
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !
```

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`);
    }}>
    {children}
  </span>
);

### Tab

defaultValue="apple"를 설정하면 기본적으로 화면을 열 때 Apple 탭을 표시합니다.  
defaultValue 속성을 설정하지 않거나 유효하지 않은 값을 설정한 경우에는 사용자가 탭을 클릭하기 전까지는 탭 버튼만 표시합니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="apple"
  values={[
    {label: 'Apple', value: 'apple'},
    {label: 'Orange', value: 'orange'},
    {label: 'Banana', value: 'banana'},
  ]}>
  <TabItem value="apple">이것은 사과입니다 🍎</TabItem>
  <TabItem value="orange">이것은 오렌지입니다 🍊</TabItem>
  <TabItem value="banana">이것은 바나나입니다 🍌</TabItem>
</Tabs>

```shell
cd my-website

npx docusaurus start
```

## Syntax

### 문법

* [문단, 줄바꿈, 띄어쓰기](https://opentutorials.org/course/1468/65)
  * 문단 : `<p>문단</p>`
  * 줄바꿈 (line break) : `<br/>`
  * 띄어쓰기 : `문장&nbsp;문장`
* <font size="5">FOTA</font>

  * IAP 부트로더를 통한 uart, usb, http 펌웨어 업데이트
	* OTA 원격 펌웨어 업데이트 - 진행중

```
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
    </head>
    <body>
        <p>
            test1&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;test1 의 결과 :
            test1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;test1
        </p>
        <p>
            test1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;test1의 결과 :
            test1     test1
        </p>
    </body>
</html>
```

* <small>작은 문자들</small>
* <big>큰 글자들</big>

### color

```
<font color="blue">
이 글자는 font 태그로 속성(칼라)을 주었다
</font><br/>
<font color="#34a28a"><strong>Docusaurus색상적용</strong></font><br/>
<font color="#34a28a">Docusaurus색상적용</font>
```
<font color="blue">
이 글자는 font 태그로 속성(칼라)을 주었다
</font><br/>
<font color="#34a28a"><strong>Docusaurus색상적용</strong></font><br/>
<font color="#34a28a">Docusaurus색상적용</font>

Docusaurus supports **[Markdown](https://daringfireball.net/projects/markdown/syntax)** and a few **additional features**.  
Markdown documents have metadata at the top called [Front Matter](https://jekyllrb.com/docs/front-matter/):

```text title="my-doc.md"
// highlight-start
---
id: my-doc-id
title: My document title
description: My document description
slug: /my-custom-url
---
// highlight-end

Markdown heading
Markdown text with [links](./hello.md)
```

### special char

* [markdown에서 특수문자 사용하기](https://4urdev.tistory.com/m/62)

### table

테이블에 `:`를 추가하지 않으면 첫줄은 center aligne, 이후 줄부터 lift align을 수행한다.

<div id="container">
  <div id="left"></div>
  <div id="right"></div>
  <div id="center"></div>
</div>

| a          | b          | c              |
|------------|------------|----------------|
| Type       | anything   | <li>here1.</li><li>here2.</li> |
| Markdown   | is         | neat and cool! |

| a          | b          | c              |
|:-----------|:----------:|---------------:|
| Type       | anything   | here.          |
| Markdown   | is         | neat and cool! |

### Admonitions

`:::`에 이어 note, tip, important(or info), caution, warning 문자를 쓰면 다음과 같이 admonition을 추가할 수 있다.

:::tip

Use this awesome feature option  
Use **[docusaurus.new](https://docusaurus.new)** to test Docusaurus immediately in your browser!

:::


:::danger danger

This action is dangerous

:::

:::caution

In development, you can only use one locale at a same time.

:::

:::note

In development, you can only use one locale at a same time.

:::

:::info

In development, you can only use one locale at a same time.

:::

## 문서 카테고리

### Navbar

[item Dropdown](https://younho9.dev/docusaurus-manage-docs-2)
[상위문서 링크](https://docusaurus.io/ko/docs/category/guides)

### Sidebar

items를 이용하여 mbd->윈도우 하위에 design,realize,verify 카테고리 추가
[link를 이용하여 상위카테고리(mbd) 클릭 시 mbd 문서 Open](https://docusaurus.io/ko/docs/2.1.0/sidebar#complex-sidebars-example)
```
module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  process: [
    'process',
    'process/aspice_cl2',
    'process/iso26262',
    'process/redmine',
    'process/aspice_cl3',
    'process/sunroof_system_design',
    'process/agile_by_github',
    'process/agile_by_mbd',
  ],
  mbd: [
    'mbd',
    'mbd/study',
    'mbd/window_autobox',
    'mbd/traindoor_uml',
    'mbd/temperature',
    'mbd/wiper',
    {
      type: 'category',
      label: '윈도우',
  	  link: {										// 상위 카테고리 클리 시 열리는 문서
        type: 'doc',
        id: 'mbd/window',							// mbd폴더에 있는 window.md파일
      },
      collapsed: false,
      items: [
        {
          'desing': ['mbd/window/window_design',    // 하위 카테고리 추가
                    'mbd/window/window_realize',
                    'mbd/window/window_verify'],
          'realize': ['mbd/window/window_realize'],
          'verify': ['mbd/window/window_verify'],
        }
      ],
    },
    'mbd/kalman_filter',
  ],
```