import request from 'request';
import COS from 'cos-nodejs-sdk-v5';
import { Transform } from 'stream';
import uuid from 'uuid';
import moment from 'moment';

// const CACHE_TIME = 365 * 24 * 60 * 60;

const cosObj = {
  accessKey: 'AKIDztgNtEkWP7kBcgmUCzmPr8JI8EE274LQ',
  secretKey: 'Rnzzc8UecP2U7vZ1IZhUQNCrKb58BFWr',
  bucket: 'rabbitpre-test',
  bucketAppId: '1251517970',
  region: 'ap-guangzhou',
  endPoint: 'cos.ap-guangzhou.myqcloud.com',
  sts: 'https://sts.api.qcloud.com/v2/index.php',
  prefix: 'rp/test',
};
/**
 * 上传文件
 * @param urls url数组
 */
export async function uploadFiles(urls: string[]) {
  const {
    bucket,
    bucketAppId,
    region,
    prefix,
    accessKey: secretId,
    secretKey,
  } = cosObj;
  const cos = new COS({
    SecretId: secretId,
    SecretKey: secretKey,
    FileParallelLimit: 3,
  });

  // 上传静态文件
  const uploadTask: Promise<string>[] = [];
  for await (const url of urls) {
    let p: Promise<string>;
    let ext: string;
    let filename: string;

    // redis 中没有图片地址缓存，就需要上传
    // 转换流
    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk);
      },
    });
    p = new Promise((resolve, reject) => {
      request
        .get(url)
        .on('response', function(res) {
          // 获取文件扩展名
          ext = res.headers['content-type']
            ? res.headers['content-type'].split('/')[1]
            : 'png';
          // uuid 命名文件
          filename = `${uuid.v4()}.${ext}`;
          // 上传到腾讯cos
          cos.putObject(
            {
              Bucket: `${bucket}-${bucketAppId}`,
              Region: region,
              Key: prefix ? `${prefix}/${filename}` : filename,
              Body: transformStream,
            },
            (err: Record<string, any>, data: Record<string, any>) => {
              if (err) {
                // 图片上传失败一张，reject
                reject(new Error('图片上传失败'));
              } else {
                const cdnUrl = `https://${data.Location}`;
                // 异步设置图片缓存redis，不用同步
                resolve(cdnUrl);
                console.info(`['${url}' => '${cdnUrl}'`);
              }
            }
          );
        })
        .pipe(transformStream)
        .on('error', () => {
          reject(new Error('非法图片地址'));
        });
    });

    uploadTask.push(p);
  }
  return Promise.all(uploadTask).catch(err => {
    throw err;
  });
}

/**
 * 预处理
 * @param $ 选择符
 */
export function preProcess($: CheerioStatic, data: Record<string, any>) {
  // 删除阅读全文
  $('.rich_media_tool').remove();
  // 删除小程序文字
  $('.weapp_text_link').remove();
  // 删除小程序图片
  $('.weapp_image_link').remove();
  // 删除临时文章提示
  $('.rich_media_global_msg').remove();
  // 删除pc二维码
  $('.qr_code_pc_img').remove();
  // 删除投票
  $('.vote_iframe')
    .parents('p')
    .remove();
  // 删除卡券
  $('.card_iframe')
    .parents('p')
    .remove();
  // 删除音频
  $('mpvoice')
    .parents('p')
    .remove();
  // 删除qq音乐
  $('qqmusic')
    .parents('p')
    .remove();
  // 删除上传的视频
  $('iframe[data-mpvid].video_iframe').remove();
  // 重置 title 的margin-top
  $('.rich_media_title').css('margin-top', '0px');
  // 删除js_img_loading
  $('.js_img_loading').remove();
  // 处理line-height
  $('.rich_media_inner').css('line-height', '1.6');

  // 替换发布日期
  const publishDate = moment
    .unix(parseInt(data.createTime, 10))
    .format('YYYY-MM-DD');
  $('#publish_time').text(`${publishDate}`);

  // 处理公众号跳转链接
  $('#js_name').attr(
    'href',
    `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${data.appuin}&scene=124#wechat_redirect`
  );
}

/**
 * 后处理
 * @param $ 选择符
 */
export function postProcess($: CheerioStatic) {
  // 删除link、style、script标签和display:none元素
  $('link,style,script,[style*="display: none"]').remove();
}

/**
 *
 * @param $ 选择符
 * @param selector 选择器
 */
export async function walkNodesAndFix($: CheerioStatic, selector: string) {
  const nodeList: Cheerio[] = [$(selector)];
  // 背景图片node和src存储
  const backgroundImgNodes: Cheerio[] = [];
  const backgroundImgSrcs: string[] = [];
  // 图片node和src存储
  const imgNodes: Cheerio[] = [];
  const imgSrcs: string[] = [];

  // 广度优先遍历节点
  while (nodeList.length > 0) {
    const currentNode = nodeList.shift();
    const childrens = (currentNode as Cheerio).children();
    if (childrens) {
      childrens.each((i, el) => {
        const node = $(el);
        const style = node.attr('style');
        // 优先拿data-src，一般都是懒加载
        const dataSrc = node.attr('data-src') || node.attr('src');
        // 处理腾讯视频
        if (el.tagName === 'iframe' && $(el).hasClass('video_iframe')) {
          const dealStyle = style && style.replace(/display: none;/g, '');
          $(el).replaceWith(
            `<iframe style== "${dealStyle}" frameborder="0" src="${dataSrc}"/>`
          );
        } else {
          // 处理rem
          const dealStyle =
            style &&
            style.replace(/([0-9.]+?)rem/g, function(match, p1) {
              return `${p1 * 16}px`;
            });
          $(el).attr('style', dealStyle);

          // 处理背景图片
          if (style && /url\("(.*?)"\)/.test(style)) {
            backgroundImgSrcs.push(
              getProtocolUrl(style.match(/url\("(.*?)"\)/)![1])
            );
            backgroundImgNodes.push($(el));
          }

          // 处理图片
          if (
            el.tagName === 'img' &&
            dataSrc &&
            !dataSrc.includes('data:image')
          ) {
            imgSrcs.push(getProtocolUrl(dataSrc));
            imgNodes.push($(el));
          }

          nodeList.push($(el));
        }
      });
    }
  }
  // 下载背景图片
  const uploadBackgroundImgSrcs = await uploadFiles(backgroundImgSrcs);
  const uploadImgSrcs = await uploadFiles(imgSrcs);
  // 背景图片回填
  backgroundImgNodes.forEach((el, index) => {
    $(el).css('background-image', `url("${uploadBackgroundImgSrcs[index]}")`);
  });
  // 图片回填
  imgNodes.forEach((el, index) => {
    el.attr('src', uploadImgSrcs[index]).removeAttr('data-src');
  });
}
/**
 * 获取带协议的链接
 * @param url 地址
 * @param protocol 协议
 */
export function getProtocolUrl(url: string, protocol = 'http:') {
  const reg = /^(?:http:|https:)/i;
  if (reg.test(url)) return url;
  return protocol + (/^\/\//.test(url) ? url : `//${url}`);
}
