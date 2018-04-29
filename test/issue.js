var puppeteer =require('puppeteer')
var counter ={
    req:0,
    res:0
};


(async function () {
    var browser = await puppeteer.launch({
        headless:false,
        devtools:true,
    })
    var page = await browser.newPage();

    //listen on "request"
    page.on("request",async function (req){
        if(req.url().match("googlevideo.com/videoplayback?")) {
            counter.req ++
            console.log("req:",counter.req,"res",counter.res);
        }
    })
    //listenon "response"
    page.on("response",async function (res){
        if(res.url().match("googlevideo.com/videoplayback?")) {
            counter.res ++
            console.log("req:",counter.req,"res",counter.res /*,"length", (await res.text()).length*/);
        }
    })

    await page.goto("https://www.youtube.com/watch?v=DUo7YwlU7_g")
    //await browser.close()
})()