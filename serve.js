/* eslint no-console: 0 */
// start webpack
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./configurations/webpack.development.config');

module.exports = () => {
  // create express
  const app = express();

  // setup plugins
  config.plugins = [
    // define plugin for node env
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
  ];
  // hot reload plugin
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  // setup no errors plugin
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  // override entry for hot reload
  config.entry = ['webpack-hot-middleware/client', config.entry];
  // returns a Compiler instance
  const compiler = webpack(config);
  app.use(webpackHotMiddleware(compiler));
  // serve statics
  app.use(express.static(__dirname));
  // serve index
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
  // start server
  app.listen(3000, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> Listening on port 3000');
  });
};
