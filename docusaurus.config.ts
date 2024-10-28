import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { recmaCodeHike, remarkCodeHike } from 'codehike/mdx'
import { themes as prismThemes } from 'prism-react-renderer'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import tailwindPlugin from './plugins/tailwindcss'
import codeHikeTheme from './theme'

const codehikeConfig = {
  components: { code: 'Code' },
  syntaxHighlighting: {
    theme: codeHikeTheme,
  },
}

const config = {
  title: "wty's site",
  favicon: 'img/favicon.ico',
  url: 'https://wty-andrew.github.io/',
  baseUrl: '/',
  projectName: 'wty-andrew.github.io',
  organizationName: 'wty-andrew',
  trailingSlash: true,
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'notes',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          beforeDefaultRemarkPlugins: [[remarkCodeHike, codehikeConfig]],
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
          recmaPlugins: [[recmaCodeHike, codehikeConfig]],
        },
        blog: {
          path: 'blog',
          showReadingTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false }]],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'wty',
      items: [],
      hideOnScroll: true,
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Andrew. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oceanicNext,
      darkTheme: prismThemes.oceanicNext,
      additionalLanguages: ['lisp'],
    },
  } satisfies Preset.ThemeConfig,
  stylesheets: ['/css/katex.min.css', '/css/pseudocode.min.css'],
  plugins: [tailwindPlugin],
} satisfies Config

module.exports = config
