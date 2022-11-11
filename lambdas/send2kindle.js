import { request } from 'https';
export { handle };

const KINDLE_EMAIL = "", SENDER_EMAIL = "", ENDPOINT = "";

async function handle (event, context, callback) {
    const enc = encodeURIComponent;
    const email = enc(KINDLE_EMAIL);
    const from  = enc(SENDER_EMAIL);
    const paramsObj = event.queryStringParameters;
    let url, title;
    if(paramsObj && Object.keys(paramsObj).length) {
        title = enc(paramsObj.title);
        url = enc(paramsObj.url);
    } else {
        const body = JSON.parse(event.body);
        const article = body.items[0];
        title = enc(article.title);
        url = enc(article.canonical[0].href);
    }

    const opts = {
        hostname: ENDPOINT,
        path: ('/send.php?context=send&url=' + url),
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const postData = `email=${email}&from=${from}&title=${title}`;
    const response = await new Promise((resolve, reject) => {
        let dataString = '';    
        const req = request(opts, res => {
            res.on('data', chunk => {
                dataString += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    body: dataString
                });
            });
            res.on('error', (e) => {
                reject({
                    statusCode: 500,
                    body: 'Something went wrong!'
                });
            });
        });
        req.write(postData);
        req.end();
    });
    return response;
};
