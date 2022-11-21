import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: <a href="./docs/mycareer/#%EB%AA%A8%EB%8D%B8%EA%B8%B0%EB%B0%98%EC%84%A4%EA%B3%84" target="_self" rel="noopener noreferrer">모델기반설계</a>,
    Svg: require('../../static/img/second_motor_control_wiper_window.svg').default,
    description: (
      <>
        MBD기반 제어로직 시뮬레이션/코드생성/MCU포팅<br />
        하드웨어 개발 전 RCP를 통한 제어로직 개발/검증<br />
        Kalman Filter를 통핸 제어알고리즘 개발 <code>진행중</code><br />
        ProE 연동 Simulnik모델 가상 시뮬레이션 <code>계획중</code><br />
        <code><a href="https://www.cs.unc.edu/~welch/media/pdf/kalman_intro.pdf" target="_blank" rel="noopener noreferrer">Kalman Filter?</a></code>&emsp;
        <code><a href="https://www.mathworks.com/content/dam/mathworks/mathworks-dot-com/company/events/conferences/matlab-conference-australia/2016/proceedings/design-with-simulation-in-simulink.pdf" target="_blank" rel="noopener noreferrer">MBD?</a></code>&emsp;
        <code><a href="https://kr.mathworks.com/videos/run-models-interactively-on-arduino-and-raspberry-pi-1549462466264.html" target="_blank" rel="noopener noreferrer">RCP?</a></code>
      </>
    ),
  },
  {
    title: <a href="./docs/mycareer/#%EA%B0%9C%EB%B0%9C%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4" target="_self" rel="noopener noreferrer">개발프로세스</a>,
    Svg: require('../../static/img/firstpage_DevProcess_black.svg').default,
    description: (
      <>
        개발 프로세스 구축/실무적용<br />
        Matlab/Simulink를 통한 MBD 개발 프로세스 구축<br />
        Redmine(by Clude AWS) 기반 이슈관리<br />
        Agile(by GitHub/GitLab) 기반 선행개발<br />
        <code><a href="https://address83.tistory.com/153" target="_blank" rel="noopener noreferrer">A-SPICE?</a></code>&emsp;
        <code><a href="https://www.koreascience.or.kr/article/JAKO201325449260743.pdf" target="_blank" rel="noopener noreferrer">ISO26262?</a></code>&emsp;
        <code><a href="https://hackersstudy.tistory.com/35" target="_blank" rel="noopener noreferrer">Redmine?</a></code>&emsp;
        <code><a href="https://gmlwjd9405.github.io/2018/05/26/what-is-agile.html" target="_blank" rel="noopener noreferrer">Agile?</a></code>
      </>
    ),
  },
  {
    title: <a href="./docs/mycareer#%EC%9E%84%EB%B2%A0%EB%94%94%EB%93%9C" target="_self" rel="noopener noreferrer">임베디드개발</a>,
    Svg: require('../../static/img/third_train_door_controller.svg').default,
    description: (
      <>
        Linux/uClinux 포팅 및 tcp/ip 어플리케이션 개발<br />
        RTOS 기반 임베디드 소프트웨어 개발<br />
        IAP부트로더를 통한 uart,usb,http 펌웨어 업데이트<br />
        OTA 펌웨어 업데이트 <code>진행중</code><br />
        <code><a href="https://os.mbed.com/" target="_blank" rel="noopener noreferrer">Mbed?</a></code>&emsp;
        <code><a href="https://www.elec4.co.kr/article/articleView.asp?idx=18469" target="_blank" rel="noopener noreferrer">OTA?</a></code>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
