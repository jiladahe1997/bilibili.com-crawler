var puppeteer =require('puppeteer')
var ret=[]
var config = require('../config.json')

//getUrls("https://www.bilibili.com/bangumi/play/ep200482")
async function getUrls(videoUrl) {
    var chromePath = config.chrome
    var keyResponseUrl = /\d{5,}-\d-\d+\.flv\?/
    var browser = await puppeteer.launch({
        executablePath: chromePath,
        headless:config.headless,
    })
    var page = await browser.newPage();


    
    await page.goto(videoUrl)
    await page.setViewport({
        width:1920,
        height:1080
    })

    {
        let deltaY = 400 
        await page.waitFor(3000);
        //await page.mouse.wheel(0,deltaY);
        await page.waitFor(500);
        await page.mouse.move(1080,1055/*-400*/)  //切换清晰度
        await page.mouse.click(1067,891/*-400*/)  //请注意，先移X后移Y 修正为 先Y后X
        await page.waitFor(1000)
    }
    page.on("response",async function (res){
        var url = res.url()
        if(url.match(keyResponseUrl)){
            if(res.request().method() == "GET"){
                if(ret.indexOf(url) == -1){
                    ret.push(url);
                    //ret.push(res.headers())
                    //console.log("find!",res.url(),"\n");
                }
            }
        }
    })
    await page.mouse.click(391,1050/*-400*/)
    for(let i=0,xStart=462,xEnd=950,y=1050/*-400*/;i<10;i++,xStart+=(xEnd-420)/9){
        await page.mouse.click(xStart,y)
       // console.log("clicked!",xStart,y);
        await page.waitFor(500)
    }
   
    await page.waitFor(2000)
    await browser.close()
    //console.log(ret);
    
    return ret
}

exports = module.exports = getUrls
/*返回格式
[url1,url2,url3,url4....]
*/