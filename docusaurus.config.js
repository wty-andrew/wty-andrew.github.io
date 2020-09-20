const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')

module.exports = {
  title: 'My Site',
  url: 'https://wty-andrew.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'wty-andrew',
  projectName: 'wty-andrew.github.io',
  themeConfig: {
    navbar: {
      title: 'My Site',
      items: [
        {
          to: 'notes',
          activeBasePath: 'notes',
          label: 'Notes',
          position: 'left',
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left',
        },
      ],
      hideOnScroll: true,
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Andrew. Built with Docusaurus.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/oceanicNext'),
      additionalLanguages: ['lisp'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'notes',
          routeBasePath: 'notes',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: ['/css/katex.min.css'],
}
