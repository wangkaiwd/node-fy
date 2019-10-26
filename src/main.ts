import md5 = require('md5');
import * as https from 'https';
import * as querystring from 'querystring';
// 把secretKey存放到一个单独的服务器，服务器将md5后的结果进行返回
import { appid, secretKey } from './privateKey';

interface TranslateResult {
  src: string;
  dst: string;
}
interface BaiduResult {
  error_code?: string;
  error_msg?: string;
  form: string;
  to: string;
  trans_result: TranslateResult[]
}
interface ErrorMap {
  [k: string]: string
}
const errorMap: ErrorMap = {
  52000: '成功',
  52001: '请求超时',
  52002: '系统错误',
  52003: '未授权用户',
  54000: '必填参数为空',
  54001: '签名错误',
  54003: '访问频率受限',
  54004: '账户余额不足',
  54005: '长query请求频繁',
  58000: '客户端IP非法',
  58001: '译文语言方向不支持',
  58002: '服务当前已关闭',
  90107: '认证未通过或未生效'
};
export const translate = (word: string) => {
  // appid+q+salt+密钥 的MD5值
  const salt = Math.random();
  const sign = md5(appid + word + salt + secretKey);
  const query = querystring.stringify({ appid, q: word, from: 'en', to: 'zh', salt, sign });
  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: `/api/trans/vip/translate?${query}`,
    method: 'GET'
  };
  // 这里遇到一个问题： 不进行chunk数据拼接，直接使用官方例子的时候看不到响应结果？
  const request = https.request(options, (response) => {
    let body = '';
    response.on('data', (chunk) => {
      body += chunk;
    });
    response.on('end', () => {
      const object: BaiduResult = JSON.parse(body);
      if (object.error_code) {
        console.error(errorMap[object.error_code] || object.error_msg);
        process.exit(1);
      } else {
        console.log(object.trans_result[0].dst);
        // 0: 成功退出
        process.exit(0);
      }
    });
  });

  request.on('error', (e) => {
    console.error('error', e);
  });
  request.end();
};

// http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4
