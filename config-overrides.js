const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

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
      '@primary-color': '#E5C26E',
      '@font-size-base': '13px',
      '@btn-border-radius-base': '@btn-height-base/2'
    },
  })(config, env);

  return config;
};