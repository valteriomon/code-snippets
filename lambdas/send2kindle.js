import { request, get } from 'https';
export { handle };

async function handle (event, context, callback) {
    const e = encodeURIComponent;
    const email = e(process.env.TO_EMAIL), from  = e(process.env.FROM_EMAIL), paramsObj = event.queryStringParameters;
    let url, title;

    if(paramsObj && Object.keys(paramsObj).length) {
        title = e(paramsObj.title);
        url = e(paramsObj.url);
    } else {
        const article = JSON.parse(event.body).items[0];
        title = e(article.title);
        url = e(article.canonical[0].href);
    }

    const opts = {
        hostname: process.env.P2K_URL,
        path: ('/send.php?context=send&url=' + url),
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
    postData = `email=${email}&from=${from}&title=${title}`;

    return await new Promise((resolve) => {
        const req = request(opts, res => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, message: "Sent to kindle" });
            });
            res.on('error', (e) => {
                console.error(e);
                resolve({ statusCode: 400, message: 'Response error.' });
            });
        });
        req.on('error', (e) => {
            console.error(e);
            resolve({ statusCode: 400, message: 'Request error.' });
        });
        req.write(postData);
        req.end();
    });
};
