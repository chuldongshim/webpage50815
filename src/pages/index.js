import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduce">
            Who Am I ? - 1min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {
          <>
            <br />
            <center><font size="5" color="#34a28a"><strong>이 공간은</strong></font></center>
              <center>개발자로서 살아온 흔적을 정리하여 나를 돌아보고,</center>
              <center>앞으로 내가 세상에 기여할 수 있는 것들이 무엇이 있을지 찾기 위한 공간입니다.</center>
            <br />
            <center><font size="4" color="#34a28a"><strong>"Yesterday is History. Tomorrow is a Mystery. Today is a Gift."</strong></font></center>
							<center>남과 나를 비교하거나, 과거에 연연하거나, 미래를 걱정할 필요는 없다.</center>
							<center>현재 하루하루를 최고의 선물로 생각하며 살자.</center>
          </>
        }
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
