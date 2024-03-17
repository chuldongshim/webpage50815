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
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {
          <>
            <br />
            <center><font size="5" color="#34a28a"><strong>"Yesterday is History. Tomorrow is a Mystery. Today is a Gift."</strong></font></center>
            <center>과거를 돌아보고, 앞으로 무엇을 할 것인지 찾기 위한 공간입니다. (웹사이트 정리중...)</center>
          </>
        }
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

