// import express from 'express';
// import request from 'request';

// import cheerio from 'cheerio';
// import juice from 'juice';
// import puppeteer, { LaunchOptions } from 'puppeteer';
// import {
//   walkNodesAndFix,
//   getProtocolUrl,
//   preProcess,
//   postProcess,
// } from '../utils/wechat-transform';

// const router = express.Router();

// const iPhone = puppeteer.devices['iPhone 5'];
// const puppeteerOptions: LaunchOptions = {
//   headless: true,
// };
// // 使用系统内置安装的chromium
// if (process.env.RUNTIME_ENV !== 'dev')
//   puppeteerOptions.executablePath = '/usr/bin/chromium-browser';

// // 转换接口
// router.get('/', async (req, res) => {
//   const weixinArticleSelector = '#js_article';
//   let { url } = req.query;
//   url = decodeURIComponent(url);

//   const browser = await puppeteer.launch(puppeteerOptions);
//   const page = await browser.newPage();
//   // 仿真 iphone5
//   await page.emulate(iPhone);
//   /**
//    * step1: 获取html字符串
//    */
//   await page.goto(getProtocolUrl(url), { waitUntil: 'load' });
//   const html = await page.content();
//   const {
//     msg_title,
//     msg_desc,
//     msg_cdn_url,
//     create_time,
//     appuin,
//   } = await page.$eval('html', () => {
//     return {
//       msg_title: window.msg_title,
//       msg_desc: window.msg_desc,
//       msg_cdn_url: window.msg_cdn_url,
//       create_time: window.ct,
//       appuin: window.appuin,
//     };
//   });
//   /**
//    * step2: css in style
//    */
//   const $ = cheerio.load(juice(html));

//   if (!$(weixinArticleSelector).html()) {
//     // TODO: 可以更好的异常处理
//     throw new Error('非微信文章');
//   }
//   /**
//    * step3: 处理每个节点（rem，backgroundImage，img）
//    */
//   // 预处理
//   preProcess($, { createTime: create_time, appuin });
//   // 遍历节点处理样式
//   await walkNodesAndFix($, weixinArticleSelector);
//   // 后处理
//   postProcess($);

//   browser.close();

//   /**
//    * step5: 保存作品
//    */
//   let shtml = $(weixinArticleSelector).html() || '';
//   shtml = shtml
//     .replace(/\n/g, '')
//     .replace(/id=".+?"/gi, '')
//     .replace(/class=".+?"/gi, '')
//     .replace(/data-[\w\d]+=".+?"/gi, '');
//   const thtml = `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <meta name="description" content="${msg_desc}">
//   <meta name="cover" content="${msg_cdn_url}">
//   <title>${msg_title}</title>
// </head>
// <body>
//   ${shtml}
// </body>
// </html>`;
//   // TODO: 返回
//   res.send(thtml);
// });

// // 检测接口
// router.get('/check', (req, res) => {
//   let { url } = req.query;
//   url = getProtocolUrl(decodeURIComponent(url));
//   return new Promise((resolve, reject) => {
//     if (!url.includes('mp.weixin.qq.com/s')) {
//       reject(new Error('请粘贴正确的公众号文章地址'));
//     }
//     request.get(url, (err: any, resp: any) => {
//       if (err || resp.statusCode !== 200) {
//         reject(new Error('请粘贴正确的公众号文章地址'));
//       } else {
//         res.json(true);
//       }
//     });
//   });
// });
// export default router;
