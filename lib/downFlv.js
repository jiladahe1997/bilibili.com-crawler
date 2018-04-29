var https = require("https")
var fs = require("fs")
var getUrls = require("./getVideo_test.js")
var log = require('log-update')
var config = require('../config.json')




async function crawl() {
  console.log("开始获取视频地址...请耐心等待10s"); 
  var videoData = await getUrls(`https://www.bilibili.com/bangumi/play/ep${config.ep}`)
  console.log("获取成功");
  var urls = videoData
  var referer = `https://www.bilibili.com/bangumi/play/ep${config.ep}`
  var downSpeed = {
    totalLen: [0, 0, 0, 0],
    doneLen: [0, 0, 0, 0],
    downSpeed: ['下载中...', '下载中...', '下载中...', '下载中...'],
    logOutInfo: '',
    downCount: 4
  }

  try {
    for (let i = 0; i < urls.length; i++) {

      sendRequest(urls[i], i, referer)
    }
    //sendRequest(urls[0],0,referer)
  } catch (e) {
    console.log(e);

  }

  function sendRequest(url, order, referer) {
    var hostname = url.match(/https:\/\/.+\..+\.\w+\//)[0];
    hostname = hostname.slice(8, hostname.length - 1)
    var path = url.slice(hostname.length + 9 - 1)
    //console.log("path",path);
    //console.log("host",hostname);
    const options = {
      hostname: hostname,
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Host: hostname,
        Origin: "https://www.bilibili.com",
        Pragma: "no-cache",
        Range: `bytes=0-`,
        Referer: referer,
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0",
      }
    };

    setInterval(() => {
      for (let i = 0; i < downSpeed.totalLen.length; i++) {
        downSpeed.logOutInfo += `第${i}部分 下载中... ${(downSpeed.doneLen[i] / downSpeed.totalLen[i]).toString().slice(0, 5)}% ${downSpeed.doneLen[i]}/${downSpeed.totalLen[i]} 下载速度:${downSpeed.downSpeed[i]}`;
        (i == downSpeed.totalLen.length - 1) ? void 0 : downSpeed.logOutInfo += `\n`;
      }
      log(downSpeed.logOutInfo)
      downSpeed.logOutInfo = ''
      if (downSpeed.downCount == 0) {
        console.log("完成！")
        process.exit()
      }
    }, 1000)

    const req = https.request(options, (res) => {
      //console.log('状态码：', res.statusCode);
      //console.log('请求头：', res.headers["content-length"]);
      downSpeed.totalLen[order] = res.headers["content-length"]

      var fsStream = fs.createWriteStream(`bilibili_${referer.slice(40)}_${order}.flv`)
      setInterval(() => {
        let preDOwn = downSpeed.doneLen[order]
        setTimeout(() => {
          let delta = downSpeed.doneLen[order] - preDOwn
          downSpeed.downSpeed[order] = delta / 1000
        }, 1000)
      }, 1000)

      res.on('data', (d) => {
        //onsole.log("test",d);
        fsStream.write(d, function () {
          downSpeed.doneLen[order] += d.length

          //console.log("test!");


        })

      });

      res.on('end', () => {
        //onsole.log("test",d);
        fsStream.end(null, null, function () { downSpeed.downCount-- })

      });
    });
    //console.log(req.headers);

    req.on('error', (e) => {
      console.error(e);
    });
    req.end();
  }
}

exports = module.exports = crawl