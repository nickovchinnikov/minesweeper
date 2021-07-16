const custom = require('../webpack.config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: { ...config.resolve.alias, ...custom.resolve.alias },
    },
  }),
}