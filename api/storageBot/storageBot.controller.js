const bot = require('./storageBot.model');
const config = require('./../../config/index').storageBot;

exports.upload = async ctx => {
  const { file } = ctx;
  const { filename } = ctx.request.body;
  if (!file) {
    ctx.status = 400;
    ctx.body = 'document is not exist';
  } else
    await bot
      .sendDocument(
        config.storageChat,
        file.buffer,
        {},
        {
          filename: `${filename || file.originalname}`,
        },
      )
      .then(res => {
        ctx.body = `${config.fileLink}/${res.document.file_id}/${filename ||
          file.originalname}`;
      })
      .catch(err => {
        ctx.body = err;
        ctx.status = 500;
      });
};

exports.getFile = async ctx => {
  const { fileId } = ctx.params;

  ctx.body = bot.getFileStream(fileId);
};

exports.getProxy = async ctx => {
  const { fileId } = ctx.params;

  console.log(`fileId`, fileId);
  const fileLink = await bot.getFileLink(fileId);
  console.log(`fileLink`, fileLink);
  ctx.redirect(fileLink);
};

exports.processUpdate = async ctx => {
  await bot.processUpdate(ctx.request.body);
  ctx.status = 200;
};

bot.on('message', async mes => {
  console.log(mes.document);
  if (mes.text && mes.text.match('/')) return;
  if (mes.document) {
    await bot.sendMessage(
      mes.chat.id,
      `${config.fileLink}/${mes.document.file_id}/${mes.document.file_name}`,
    );
  } else if (mes.photo) {
    const resMes = mes.photo.map(
      photo =>
        `${photo.width}x${photo.width}: ${config.fileLink}/${photo.file_id}/${
          photo.file_name
        }`,
    );
    await bot.sendMessage(mes.chat.id, resMes.join(', '));
  } else if (mes.video) {
    await bot.sendMessage(
      mes.chat.id,
      `${config.fileLink}/${mes.video.file_id}/${mes.video.file_name}`,
    );
  } else {
    await bot.sendMessage(
      mes.chat.id,
      `Sorry, i don't see the file.
It seems you didn't understand what I needed.
Use the /help command to not feel like an ass🏳️‍🌈`,
    );
  }
});
