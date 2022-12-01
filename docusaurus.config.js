const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Who am I and What should I do next...',
  tagline: '',
  url: 'https://github.com',
  baseUrl: '/webpage/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'chuldongshim', // Usually your GitHub org/user name.
  projectName: 'webpage', // Usually your repo name.
  trailingSlash: false,   // false(md파일 명으로 html파일 생성), true(md파일명 하위에 index.html파일로 생성)
  
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
		  //routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/chuldongshim/webpage/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/chuldongshim/webpage/tree/main/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      docs:{
        sidebar: {
          hideable: true,					        // 왼쪽 사이드바 접기버튼 생성
          autoCollapseCategories: true,		// 펼쳐져 있는 사이드바 항목 접어서 축소
        },
      },
      colorMode: {
        defaultMode: 'light',				      // light or dark
        disableSwitch: true,				      // true(메뉴바에서 모드 전환버튼 숨김), false(전환버튼 보임)
        respectPrefersColorScheme: true,	// defaultMode 대신 사용자 시스템 환경 설정에 따라 color 속성 적용 안함
      },
      navbar: {
        hideOnScroll: false,				      // 아래로 스크롤 시 타이틀메뉴 숨기고, 위로 스크롤 시 타이틀메뉴 보이는 기능
        title: '나는 개발자다!',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'mycareer',
            position: 'left',
            label: '경력요약',
          },
          {
            type: 'doc',
            docId: 'sideprj',
            position: 'left',
            label: '사이드프로젝트',
          },
          {
            type: 'doc',
            docId: 'introduce',
            position: 'left',
            label: '자기소개',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/chuldongshim/webpage/',
            label: 'MyGitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '경력요약',
                to: '/docs/mycareer',
              },
              {
                label: '자기소개',
                to: '/docs/introduce',
              },
              {
                label: '사이드프로젝트',
                to: '/docs/sideprj',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'MyGitHub',
                href: 'https://github.com/chuldongshim/webpage',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
});
