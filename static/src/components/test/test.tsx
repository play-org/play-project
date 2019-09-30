import React, { useEffect } from 'react';
// const htmlStr = `<p>
// <br />测试水电费是否</p >
// <p style=\ "text-align: center;\">
// < imgs class=\ "rich_pages\" data-copyright=\ "0\" data-ratio=\ "1\" data-s=\ "300,640\" data-src=\ "https://mmbiz.qpic.cn/mmbiz_png/f3NvqFuUcAE2CvXvhOAGA5w3VPhCQHAItCp5pnEia7W9DKM2A1WL8CwJribbdhnYbZO3tBCymkda3532hdyYnh8g/640?wx_fmt=png\" data-type=\
// "png\" data-w=\ "1000\" style=\ "\" />
// </p >
// <p>
// <qqmusic class=\ "rich_pages res_iframe qqmusic_iframe js_editor_qqmusic place_music_area\" scrolling=\ "no\" frameborder=\ "0\" musicid=\ "4758516\" mid=\ "001wXiwd0eRSes\" albumurl=\
// "https://y.gtimg.cn/music/photo_new/T002R68x68M000002GJDhP0ZluDv.jpg\" audiourl=\ "http://isure.stream.qqmusic.qq.com/C200004WUYRN2CF4L9.m4a?guid=2000001731&vkey=153E551DA1C6A420BB7B9F42420D9FEFCB6351487787B37AAC91604599DA016A31257C6DAB2A368FD8E4007B3DFB3317427B65E952643C8B&uin=&fromtag=50\" music_name=\
// "屋顶\" singer=\ "周杰伦;温岚 - K情歌10\" play_length=\ "319\" src=\
// "/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer=%E5%91%A8%E6%9D%B0%E4%BC%A6%3B%E6%B8%A9%E5%B2%9A%20-%20K%E6%83%85%E6%AD%8C10&music_name=%E5%B1%8B%E9%A1%B6&albumurl=https%3A%2F%2Fy.gtimg.cn%2Fmusic%2Fphoto_new%2FT002R68x68M000002GJDhP0ZluDv.jpg&musictype=1\" musictype=\ "1\" otherid=\ "001wXiwd0eRSes\" albumid=\ "002GJDhP0ZluDv\" jumpurlkey=\ "\"></qqmusic>
// </p >
// <p><span class=\ "vote_area\"><iframe scrolling=\"no\" frameborder=\"0\" class=\"vote_iframe js_editor_vote_card\" data-display-style=\"height: 317px;\" data-display-src=\"/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz=MzU5NjAzNDc4NA==&supervoteid=461840684&token=689353354&lang=zh_CN\" data-src=\"/mp/newappmsgvote?action=show&__biz=MzU5NjAzNDc4NA==&supervoteid=461840684#wechat_redirect\" data-supervoteid=\"461840684\" allowfullscreen=\"\"></iframe><span class=\"vote_box skin_help po_left\"></span>
// <span
// class=\ "vote_box skin_help po_right\"></span>
//     </span>
// </p >
// <p>
// <iframe class=\ "res_iframe card_iframe js_editor_card\" data-cardid=\ "p4CJX1oB6Mto_1FrWq4FejsLolgQ\" data-num=\ "0\" data-display-src=\
// "/cgi-bin/readtemplate?t=cardticket/card_preview_tmpl&logo_url=https%3A%2F%2Fmmbiz.qlogo.cn%2Fmmbiz_png%2Ff3NvqFuUcAGs6BaTlkP6MRiaoRbm8ia5IJG3zRUZFLdicqpWYJC0KyhV4dibIXrkMCUG9icS3PyYibsCWkc1FbKIHHRQ%2F0%3Fwx_fmt%3Dpng&brand_name=%E5%85%94%E5%B1%95&title=%E4%BC%9A%E5%91%98%E5%B0%8A%E4%BA%AB%E5%8D%A1&color=%23F9861F&lang=zh_CN&cardid=p4CJX1oB6Mto_1FrWq4FejsLolgQ&token=689353354&lang=zh_CN\" data-src=\ "http://mp.weixin.qq.com/bizmall/appmsgcard?action=show&biz=MzU5NjAzNDc4NA==&cardid=p4CJX1oB6Mto_1FrWq4FejsLolgQ&wechat_card_js=1#wechat_redirect\"></iframe>
// </p >
// <p><a class=\ "weapp_text_link\" style=\ "font-size:17px;\" data-miniprogram-appid=\ "wx02e06e4ad0a15f40\" data-miniprogram-path=\ "pages/index/index\" data-miniprogram-nickname=\ "兔展伙伴加盟+\" href=\ "\" data-miniprogram-type=\ "text\" data-miniprogram-servicetype=\
// "\" href= "\">小程序</ a>
// </p >
// <p>
// <br />
// </p >
// <p>
// <a class=\ "weapp_image_link\" data-miniprogram-appid=\ "wx8fd251a6e1d0e239\" data-miniprogram-path=\ "pages/login/login\" data-miniprogram-nickname=\ "斐波大数据\" href=\ "\" data-miniprogram-type=\ "image\" data-miniprogram-servicetype=\ "0\" href=\ "\">
//     < imgs class=\ "rich_pages\" data-s=\ "300,640\" data-src=\ "https://mmbiz.qpic.cn/mmbiz_png/f3NvqFuUcAEtPcgAGyevNAGhjhmdTbhYNEMvGFO9zYicyh1FHZUg0EMYASl4DNib5110OzF4nzl23dGEE5FdpBPA/640?wx_fmt=png\" data-type=\ "png\" style=\ "\" data-ratio=\ "1\" data-w=\
//     "1000\" />
// </ a>
// </p >
// <p style=\ "text-align: center;\">
// < imgs class=\ "rich_pages\" data-ratio=\ "1\" data-s=\ "300,640\" data-src=\ "https://mmbiz.qpic.cn/mmbiz_jpg/f3NvqFuUcAEtPcgAGyevNAGhjhmdTbhYvRscPw3qRDOOBTIO1WqgAntagQ6vLlFvGpoJVMrukpWvgeQiaibDJJ9Q/640?wx_fmt=jpeg\" data-type=\ "jpeg\" data-w=\
// "430\" style=\ "\" />
// </p >
// <section class=\ "code-snippet__fix code-snippet__js\">
// <ul class=\ "code-snippet__line-index code-snippet__js\">
//     <li></li>
// </ul><pre class=\ "code-snippet__js\"><code><span class=\"code-snippet_outer\">代码格式好</span></code></pre>
// </section>
// <p>
// <br />
// </p >
// <p>
// <br />
// </p >
// <p>
// <br />
// </p >
// <p>
// <br />
// </p >`;

const htmlStr = '';
const dealHtmlStr = htmlStr
  .replace(/\\"/g, '"')
  .replace(/\\ "/g, '"')
  .replace(/\\\n"/g, '"')
  .replace(/< img/g, '<imgs');

export default function Test() {
  // console.log(dealHtmlStr);
  // useEffect(() => {
  //   document.getElementById('test').innerHTML = dealHtmlStr;
  //   var node = document.getElementById('test');
  //   console.log(node);
  //   return () => {};
  // }, []);
  return (
    <div id="test">
      123
      <img
        src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
        alt=""
      />
    </div>
  );
}
