var log  = require('log-update')
var downSpeed = {
    totalLen: [0,0,0,0],
    doneLen: [0,0,0,0],
    downSpeed: ['下载中...','下载中...','下载中...','下载中...'],
    logOutInfo :''
  }
console.log("1111")
console.log("2222");

setInterval(()=>{
    //for(let i=0;i<1;i++){
        downSpeed.logOutInfo += `第0部分 下载中\n` ;
       // (i == downSpeed.totalLen.length - 1) ? void 0 : downSpeed.logOutInfo += `\n`;
     // }
      downSpeed.logOutInfo_1 =''+`第0部分 下载中\n`+`第1部分 下载中\n`+`第2部分 下载中\n`
      log(downSpeed.logOutInfo_1)
},500)