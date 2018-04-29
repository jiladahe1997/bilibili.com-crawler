var puppeteer =require('puppeteer')
var counter ={
    req:0,
    res:0
};


(async function () {

    var chromePath = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    var browser = await puppeteer.launch({
        executablePath: chromePath,
        headless:false,
        devtools:true,
    })
    var page = await browser.newPage();

    page.on("request",async function (req){
        //if(req.url().match(/\d{5,}-\d-\d+\.flv\?/)) {
        if(req.url().match("googlevideo.com/videoplayback?")) {
            counter.req ++ 
            console.log("req:",counter.req,"res",counter.res);
        }
    })
    page.on("response",async function (res){
        if(res.url().match("googlevideo.com/videoplayback?")) {
            counter.res ++
            console.log("req:",counter.req,"res",counter.res);
        }
    })

    await page.goto("https://www.youtube.com/watch?v=DUo7YwlU7_g")
    //await browser.close()
})()


