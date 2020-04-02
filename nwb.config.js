module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorEuropeanaFulltextAnnotation',
      externals: {
        react: 'React'
      }
    }
  }
};
