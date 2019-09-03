import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import request from 'request';
const iPhone = puppeteer.devices['iPhone 5'];

async function download(uri: string, filename: string, callback: () => void) {
  await request.head(uri, async (err, res, body) => {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    await request(uri)
      .pipe(fs.createWriteStream(filename))
      .on('close', callback);
  });
}

router.get('/getImage', async (req, res, next) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto('https://mp.weixin.qq.com/s/1m0hZESFVJY8DNunCyQ0_Q');
  // await page.setViewport({ width: 320, height: 504, isMobile: true });
  await page.emulate(iPhone);

  page.on('load', async () => {
    // step1: 删除dom
    // p .card_iframe
    // p .weapp_text_link
    await page.evaluate(() => {
      const card_iframes = document.querySelectorAll('p .card_iframe');
      const weapp_text_links = document.querySelectorAll('p .weapp_text_link');
      for (let i = 0, len = card_iframes.length; i < len; i++) {
        card_iframes[i] &&
          card_iframes[i]!.parentNode!.parentNode!.removeChild(card_iframes[i]!.parentNode!);
      }
      for (let i = 0, len = weapp_text_links.length; i < len; i++) {
        weapp_text_links[i] &&
          weapp_text_links[i]!.parentNode!.parentNode!.removeChild(
            weapp_text_links[i]!.parentNode!
          );
      }
    });

    // 等待500ms，然后获取高度
    await page.waitFor(500);
    // step2: 获取图片地址
    const pageUrl = page.url();
    const imgSrcs = await page.$$eval(
      'img',
      (imgs, pageUrl) => {
        // (childrens[i] as HTMLImageElement).src && !(childrens[i] as HTMLImageElement).src.includes('data:image')
        // && (childrens[i] as HTMLImageElement).src !== pageUrl
        return imgs
          .map(img => (img as HTMLImageElement).src)
          .filter(img => img && img !== pageUrl && !img.includes('data:image'));
      },
      pageUrl
    );
    // step3: 下载全部图片地址，返回按顺序的新地址数组
    imgSrcs.forEach(async (item, index) => {
      await download(item, path.resolve(__dirname, `../../../var/static/${index}.jpg`), () => {});
    });
    const jsArticle = await page.$('#js_article');
    // step4: 改造dom
    const dataObj = await page.evaluate(
      (elem, pageUrl) => {
        // 广度优先遍历
        function deep(elem: HTMLElement): string[] {
          var nodeList = [];
          var res = [];
          nodeList.push(elem);
          while (nodeList.length > 0) {
            var currentNode = nodeList.shift();
            for (
              var i = 0, childrens: HTMLCollection = currentNode!.children;
              i < childrens.length;
              i++
            ) {
              // 判断是否是需要替换的图片url
              if (
                childrens[i].tagName === 'IMG' &&
                (childrens[i] as HTMLImageElement).src &&
                !(childrens[i] as HTMLImageElement).src.includes('data:image') &&
                (childrens[i] as HTMLImageElement).src !== pageUrl
              ) {
                res.push((childrens[i] as HTMLImageElement).src.split('?')[0]);
              }
              nodeList.push(childrens[i]);
            }
          }
          return res;
        }
        return deep(elem);
      },
      jsArticle,
      pageUrl
    );

    const height = await page.evaluate(x => {
      return window.getComputedStyle(x).height;
    }, jsArticle);

    res.json({
      data: { height, data: dataObj },
    });
  });
  await page.goto('https://mp.weixin.qq.com/s/lD1WymWHoSSy9MQbFfSxuw');

  // browser.close();
});
export default router;
