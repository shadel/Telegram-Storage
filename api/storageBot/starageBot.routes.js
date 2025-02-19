'use strict';
const {
  getFile,
  upload,
  processUpdate,
  getProxy,
} = require('./storageBot.controller');
const { password, prefix } = require('./../../config').storageBot;
module.exports = Router => {
  const router = new Router({
    prefix: `/${prefix}`,
  });
  router
    .get('/proxy/:fileId', getProxy)
    .get('/:fileId/:filename', getFile)
    .post(`/${password}`, processUpdate)
    .post('/', upload);

  return router;
};
