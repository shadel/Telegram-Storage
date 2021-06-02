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
    .get('/:fileId/:filename', getFile)
    .post(`/${password}`, processUpdate)
    .post('/', upload)
    .get('/proxy/:fileId', getProxy);

  return router;
};
