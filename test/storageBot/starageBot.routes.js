'use strict';
const {
  getFile,
  getRedirectFile,
  getHtml,
  getRedirectData,
} = require('./storageBot.controller');
const { prefix } = require('../../config').storageBot;
module.exports = Router => {
  const router = new Router({
    prefix: `/${prefix}`,
  });
  router.get('/:fileId/:filename', getFile);
  router.get('/redirect', getRedirectFile);
  router.get('/html', getHtml);
  router.get('/data', getRedirectData);

  return router;
};
