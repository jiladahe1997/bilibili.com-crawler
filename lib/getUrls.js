var puppeteer =require('puppeteer')
var ret=[]


getUrls("https://www.bilibili.com/bangumi/play/ep200482")
async function getUrls(videoUrl) {
    var chromePath = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"

    var keyResponseUrl = "https://bangumi.bilibili.com/player/web_api/v2/playurl"
    var browser = await puppeteer.launch({
        executablePath: chromePath
    })
    var page = await browser.newPage();

    page.on("response",async function (res){
        if(res.url().search(keyResponseUrl) != -1){
            ret.push(await res.json());
            console.log("find!");
            
            
        }
    })

    await page.goto(videoUrl)
    await page.screenshot({
        path:"./"+ videoUrl.match(/\d{6}/)[0] +".png",
        fullPage:true
    })

    await page.mouse.click(374,1050)
    for(let i=0,xStart=420,xEnd=900,y=1050;i<10;i++,xStart+=(xEnd-xStart)/9){
        await page.mouse.click(xStart,y)
        console.log("clicked!",xStart,y);
        
    }
   
    
    await page.waitFor(5000)
    await browser.close()
    return ret
}

exports = module.exports = getUrls
/*返回格式

{
    "accept_description": [
        "高清 1080P+",
        "高清 1080P",
        "高清 720P",
        "清晰 480P",
        "流畅 360P"
    ],
    "accept_format": "hdflv2,flv,flv720,flv480,flv360",
    "accept_quality": [
        112,
        80,
        64,
        32,
        15
    ],
    "bp": 0,
    "code": 0,
    "durl": [
        {
            "backup_url": [
                "http://ws.acgvideo.com/8/91/36069888-1-15.flv?wsTime=1524548959&platform=pc&wsSecret2=882539cf655201b092f9fdfa571a98d8&oi=1857605517&rate=102&trid=8924d202c0d84ff2b6976d2df9c4efc0"
            ],
            "length": 358357,
            "order": 1,
            "size": 21604703,
            "url": "http://upos-hz-mirrorkodo.acgvideo.com/upgcxcode/88/98/36069888/36069888-1-15.flv?e=ig8euxZM2rNcNbRVhbdVhoMghwKVhwdEto8g5X10ugNcXBlqNxHxNEVE5XREto8KqJZHUa6m5J0SqE85tZvEuENvNC8xNEVE9EKE9IMvXBvE2ENvNCImNEVEK9GVqJIwqa80WXIekXRE9IB5QK==&deadline=1524548959&dynamic=1&gen=playurl&oi=1857605517&os=kodo&platform=pc&rate=102000&trid=8924d202c0d84ff2b6976d2df9c4efc0&uipk=5&uipv=5&um_deadline=1524548959&um_sign=2343ccad6c7cb26addd8e296bf8a1bd6&upsig=5c3083ab826d7c3a3e44acd6e5a7b6ca"
        },
        {
            "backup_url": [
                "http://ws.acgvideo.com/8/91/36069888-2-15.flv?wsTime=1524548959&platform=pc&wsSecret2=dd9adf04f5643c9916933aac63325add&oi=1857605517&rate=100&trid=8924d202c0d84ff2b6976d2df9c4efc0"
            ],
            "length": 407808,
            "order": 2,
            "size": 24415683,
            "url": "http://upos-hz-mirrorks3.acgvideo.com/upgcxcode/88/98/36069888/36069888-2-15.flv?e=ig8euxZM2rNcNbRVhwhVhoMghwdjhwdEto8g5X10ugNcXBlqNxHxNEVE5XREto8KqJZHUa6m5J0SqE85tZvEuENvNC8xNEVE9EKE9IMvXBvE2ENvNCImNEVEK9GVqJIwqa80WXIekXRE9IB5QK==&deadline=1524548959&dynamic=1&gen=playurl&hfb=Yjk5ZmZjM2M1YzY4ZjAwYTMzMTIzYmIyNWY4ODJkNWI=&oi=1857605517&os=ks3&platform=pc&rate=100300&trid=8924d202c0d84ff2b6976d2df9c4efc0&uipk=5&uipv=5&um_deadline=1524548959&um_sign=c1dd4084fd094b215948b4b81eb70bac&upsig=e6c867168800492d5358097deb90e218"
        },
        {
            "backup_url": [
                "http://ws.acgvideo.com/8/91/36069888-3-15.flv?wsTime=1524548959&platform=pc&wsSecret2=32a98758e3dd0fff1680a8d3b4e5d948&oi=1857605517&rate=107&trid=8924d202c0d84ff2b6976d2df9c4efc0"
            ],
            "length": 203307,
            "order": 3,
            "size": 12811285,
            "url": "http://upos-hz-mirrorks3.acgvideo.com/upgcxcode/88/98/36069888/36069888-3-15.flv?e=ig8euxZM2rNcNbRV7zRVhoMghWKghwdEto8g5X10ugNcXBlqNxHxNEVE5XREto8KqJZHUa6m5J0SqE85tZvEuENvNC8xNEVE9EKE9IMvXBvE2ENvNCImNEVEK9GVqJIwqa80WXIekXRE9IB5QK==&deadline=1524548959&dynamic=1&gen=playurl&hfb=Yjk5ZmZjM2M1YzY4ZjAwYTMzMTIzYmIyNWY4ODJkNWI=&oi=1857605517&os=ks3&platform=pc&rate=107100&trid=8924d202c0d84ff2b6976d2df9c4efc0&uipk=5&uipv=5&um_deadline=1524548959&um_sign=9ac0e21d1a26990c998363aec0527ab4&upsig=be048ea0dc9d815392a0d4cb8f0e6d0e"
        },
        {
            "backup_url": [
                "http://ws.acgvideo.com/8/91/36069888-4-15.flv?wsTime=1524548959&platform=pc&wsSecret2=4723cfdbe860a71c5d78568fcd7f57b5&oi=1857605517&rate=98&trid=8924d202c0d84ff2b6976d2df9c4efc0"
            ],
            "length": 515583,
            "order": 4,
            "size": 30358193,
            "url": "http://upos-hz-mirrorks3.acgvideo.com/upgcxcode/88/98/36069888/36069888-4-15.flv?e=ig8euxZM2rNcNbe37bdVtWRH7zNVhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEVEuxTEto8i8o859r1qXg8xNEVE5XREto8GuFGv2U7SuxI72X6fTr859IB_&deadline=1524548959&dynamic=1&gen=playurl&hfb=Yjk5ZmZjM2M1YzY4ZjAwYTMzMTIzYmIyNWY4ODJkNWI=&oi=1857605517&os=ks3&platform=pc&rate=98600&trid=8924d202c0d84ff2b6976d2df9c4efc0&uipk=5&uipv=5&um_deadline=1524548959&um_sign=a6219fb45af55ae53c3e6dcc8694b109&upsig=192b0f55054edfcefef77b2588415845"
        }
    ],
    "format": "flv360",
    "from": "local",
    "has_paid": false,
    "quality": 15,
    "result": "suee",
    "seek_param": "start",
    "seek_type": "offset",
    "status": 2,
    "timelength": 1485055,
    "vip_status": 0,
    "vip_type": 0
}*/