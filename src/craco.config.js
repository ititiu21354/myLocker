// craco.config.js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#f15a22' }, // Update Ant Design primary color here
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
