import { request, get } from 'https';
export { handle };

async function handle (event, context, callback) {
    const e = encodeURIComponent;
    const email = e(process.env.TO_EMAIL), from  = e(process.env.FROM_EMAIL);
    let url, title;
    if(event.httpMethod == 'GET') {
        const qs = event.queryStringParameters;
        if(qs && Object.keys(qs).length) {
            title = e(qs.title || '');
            url = e(qs.url || '');
        }
    } else {
        const body = event.body;
        if(body.length) {
            try {
                const data = JSON.parse(body);
                if(data.items) {
                    const article = data.items[0];
                    title = e(article.title);
                    url = e(article.canonical[0].href);
                }
            } catch(e) {
                console.debug(e);
            }
        }
    }

    if(title && url) {
        const opts = {
            hostname: process.env.P2K_URL,
            path: ('/send.php?context=send&url=' + url),
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        },
        postData = `email=${email}&from=${from}&title=${title}`;

        const response = await new Promise((resolve) => {
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
        
        if(response.statusCode == 200) {
            return {
                "statusCode": 200,
                "body": '<html><head></head><body onload="window.close()"><body></html>',
                "headers": {
                    'Content-Type': 'text/html',
                }
            }
        } else return response;
    } else {
            return '(function(){const t=document.createElement("div");t.setAttribute("id","senttokindle");document.body.appendChild(t)})()';
    }
};
