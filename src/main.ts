import md5 = require('md5');
import * as https from 'https';
import * as querystring from 'querystring';
import { appid, secretKey } from './privateKey';

export const translate = (word: string) => {
  console.log('word', word);
  // appid+q+salt+密钥 的MD5值
  const salt = Math.random();
  const sign = md5(appid + word + salt + secretKey);
  const query = querystring.stringify({ appid, q: word, from: 'en', to: 'zh', salt, sign });
  const options = {
    hostname: `fanyi-api.baidu.com`,
    port: 443,
    path: `/api/trans/vip/translate?${query}`,
    method: 'GET'
  };
  const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
  });

  req.on('error', (e) => {
    console.error('error', e);
  });
  req.end();
};

// http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4
