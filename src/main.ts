import * as https from 'https';
import { errorMap } from './config';
import { getRequestOptions } from './helper';
// 把secretKey存放到一个单独的服务器，服务器将md5后的结果进行返回(sign)

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

export const translate = (word: string) => {
  // 这里遇到一个问题： 不进行chunk数据拼接，直接使用官方例子的时候看不到响应结果？
  const request = https.request(getRequestOptions(word), (response) => {
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
        // console.log(object.trans_result[0].dst);
        const results = object.trans_result.map(item => item.dst);
        console.log(results.join('; '));
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
