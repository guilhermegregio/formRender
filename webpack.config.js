require('babel-core/register');

module.exports = require('./webpack.make').default({
  isDev: true
});