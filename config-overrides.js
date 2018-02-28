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
      '@primary-color': '#E4C37E',
      '@font-size-base': '13px',
    },
  })(config, env);

  return config;
};