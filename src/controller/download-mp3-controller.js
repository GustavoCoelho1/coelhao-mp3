const puppeteer = require("puppeteer");

module.exports = class DownloadMP3Controller {
    async handle(req, res) {
        const { artist, title, video_id} = req.body;
        
        const browser = await puppeteer.launch({ 
            args: ['--no-sandbox'],
            headless: false
        });

        const page = await browser.newPage();

        await page.goto("https://yout.com");

        await page.evaluate((artist, video_id, title) => {
            if (video_id)
            {
                let params = {
                    artist: artist | "",
                    audio_quality: "128k",
                    discover_metadata: true,
                    end_time: false,
                    format: "mp3",
                    normalize: true,
                    remove_silence: true,
                    start_time: false,
                    thingy: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9mb3JfYXBpX2FjY2VzcyI6ImpvaG5AbmFkZXIubXgifQ.YPt3Eb3xKekv2L3KObNqMF25vc2uVCC-aDPIN2vktmA",
                    title: title | "mp3",
                    video_id,
                };
                
                params.video_url = utils.base64VideoUrlFn({id: params.video_id});
                
                let callback = utils.cleanLoaderFn;
                
                if ($('body').hasClass('yout-user')) {
                    utils.sendGAEvent('recording');
                    isPro = true;
                }
                
                var endpoint = 'https://dvr3.yout.com/' + params.format;
                var form = document.createElement("form");
                
                form.setAttribute("method", "post");
                form.setAttribute("action", endpoint);
                
                for (var i in params) {
                    if (params.hasOwnProperty(i)) {
                        var input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = i;
                        input.value = params[i];
                        form.appendChild(input);
                    }
                }
                
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
                
                if (callback) {
                    callback();
                }
            }
            else
            {
                throw new Error("Forneça o código do vídeo!");
            }
        }, artist, video_id, title);

        await page.waitForNavigation();

        return res.status(200).json({ok: "true"})
    }
}