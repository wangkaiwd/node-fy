import md5 = require('md5');
import * as https from 'https';

export const translate = (word: string) => {
  console.log(word);
  console.log(md5);

  const options = {
    hostname: 'encrypted.google.com',
    port: 443,
    path: '/',
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    console.log('状态码:', res.statusCode);
    console.log('请求头:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};

// http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4
