const fs = require('fs');
const fetch = require('node-fetch');
const config = require('./../../config/index').storageBot;

const path = require('path');

exports.getFile = async ctx => {
  var filePath = path.resolve(__dirname, '../../__tests__/testImg.jpg');
  var mimeType = 'image/jpeg';
  const src = fs.createReadStream(filePath);
  ctx.response.set('content-type', mimeType);
  ctx.body = src;
};

exports.getRedirectFile = async ctx => {
  const fileLink = `${config.fileLink}/xxx/ttt`;
  ctx.redirect(fileLink);
};

var readFileThunk = function(src) {
  return new Promise(function(resolve, reject) {
    fs.readFile(src, { encoding: 'utf8' }, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

exports.getHtml = async ctx => {
  var filePath = path.resolve(__dirname, './image.html');
  ctx.body = await readFileThunk(filePath);
};

exports.getRedirectData = async ctx => {
  const fileLink = `${config.fileLink}/redirect`;
  // Fetch the original image
  const src = await fetch(fileLink).then(response => response.body);
  var mimeType = 'image/jpeg';
  ctx.response.set('content-type', mimeType);
  ctx.body = src;
};
