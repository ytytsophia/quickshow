const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { 
      libraryName: 'antd', 
      libraryDirectory: 'es', 
      style: 'css' 
    }], config);

  config = injectBabelPlugin(
    ['import', { 
      libraryName: 'antd', 
      style: true 
    }], config);

  config = rewireLess.withLoaderOptions({
    modifyVars: { 
      '@btn-height-base': '32px',
      '@primary-color': '#E5C26E',
      '@font-size-base': '13px',
      '@btn-border-radius-base': '@btn-height-base/2'
    },
  })(config, env);

  config.resolve.alias = {
    '@src':path.resolve(__dirname, './src'),
    '@node_modules':path.resolve(__dirname, './node_modules'),
  };

  return config;
};