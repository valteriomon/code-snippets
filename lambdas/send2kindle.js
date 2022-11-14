import { request, get } from 'https';
export { handle };

async function handle (event, context, callback) {
    const e = encodeURIComponent;
    const email = e(process.env.TO_EMAIL), from  = e(process.env.FROM_EMAIL), paramsObj = event.queryStringParameters;
    let url, title, hn;

    if(paramsObj && Object.keys(paramsObj).length) {
        title = e(paramsObj.title);
        url = e(paramsObj.url);
        hn = e(paramsObj.hn);
    } else {
        const article = JSON.parse(event.body).items[0];
        title = e(article.title);
        url = e(article.canonical[0].href);
    }

    // SendToKindle
    const opts = {
        hostname: process.env.P2K_URL,
        path: ('/send.php?context=send&url=' + url),
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
    postData = `email=${email}&from=${from}&title=${title}`;

    const s2k = await new Promise((resolve) => {
        const req = request(opts, res => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    message: "Sent to kindle"
                });
            });
            res.on('error', (e) => {
                console.error(e);
                resolve({
                    statusCode: 400,
                    message: 'Error: Send To Kindle response.'
                });
            });
        });
        req.on('error', (e) => {
            console.error(e);
            resolve({
                statusCode: 400,
                message: 'Error: Send To Kindle request.'
            });
        });
        req.write(postData);
        req.end();
    });

    // SendToAppScript
    let s2as = null;
    if(s2k.statusCode == 200 && hn) {
        s2as = await new Promise((resolve) => {
            get(`${process.env.GAS_URL}?hn=${hn}&title=${title}`, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        message: " and to AppScript!"
                    });
                });
                res.on('error', (e) => {
                    console.error(e);
                    resolve({
                        statusCode: 400,
                        message: 'Error: Send To AppScript response.'
                    });
                });
            }).on('error', (e) => {
                console.error(e);
                resolve({
                    statusCode: 400,
                    message: 'Error: Send To AppScript request.'
                });
            });
        });
    }

    const statusCode = s2as ? s2as.statusCode : s2k.statusCode;
    const message = `${s2k.message} ${s2as ? s2as.message : ""}`;
    return {
        statusCode: statusCode,
        body: `(function(){alert("${message}")})()`
    };
};
