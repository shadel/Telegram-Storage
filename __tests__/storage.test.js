const { fileLink } = require('../config').storageBot;
const request = require('supertest');

describe(`TEST storage`, async () => {
  let link;
  test(
    'Upload file',
    async () => {
      console.log(fileLink);

      const { text } = await request(fileLink)
        .post('/')
        .field('filename', 'test.jpg')
        .attach('document', `${__dirname}/testImg.jpg`)
        .expect(200);
      link = text;
      console.log(`props.link`, link);
    },
    1000 * 60,
  );

  test(
    'Download file',
    async () => {
      await request(link)
        .get('/')
        .expect(200);
    },
    1000 * 60,
  );
});
