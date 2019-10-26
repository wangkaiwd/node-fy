import { RequestOptions } from 'https';
import { appid, secretKey } from './privateKey';
import * as querystring from 'querystring';
import md5 = require('md5');

interface TranslateRule {
  from: string;
  to: string;
}
export const translateFromAndTo = (word: string): TranslateRule => {
  const englishReg = /^[a-z]/i;
  let translateRule = { from: 'zh', to: 'en' };
  if (englishReg.test(word)) {
    translateRule = { from: 'en', to: 'zh' };
  }
  return translateRule;
};

export const getRequestOptions = (word: string): RequestOptions => {
  // appid+q+salt+密钥 的MD5值
  const salt = Math.random();
  const sign = md5(appid + word + salt + secretKey);
  const query = querystring.stringify({ appid, q: word, ...translateFromAndTo(word), salt, sign });
  return {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: `/api/trans/vip/translate?${query}`,
    method: 'GET'
  };
};
