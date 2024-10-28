import type { Plugin } from '@docusaurus/types'

// taken from: https://github.com/facebook/docusaurus/issues/2961
const plugin = (context, options): Plugin => {
  return {
    name: 'plugin-tailwindcss',
    injectHtmlTags: () => ({
      headTags: [
        {
          tagName: 'link',
          attributes: {
            rel: 'stylesheet',
            href: "/css/preflight.css",
          },
        },
      ],
    }),
    configurePostCss: (postcssOptions) => {
      postcssOptions.plugins.push(require("tailwindcss"));
      postcssOptions.plugins.push(require("autoprefixer"));
      return postcssOptions;
    },
  }
}

export default plugin
