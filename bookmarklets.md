# Google cache page

```
javascript:(()=>{window.location.href='http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=cache:'+window.location})()
```

# Hackernews comments reader

```
javascript:(()=>{window.location.href='https://hackerweb.app/#/item/'+(new URL(window.location)).searchParams.get('id')})()
```

# Goodreads data

```
javascript:(()=>{const title=document.querySelector(".Text__title1").innerText,count=document.querySelector(".RatingStatistics__meta").getAttribute("aria-label").match(/^[\d,]+/)[0].replace(",","."), rating=document.querySelector(".RatingStatistics__rating").innerHTML;const text = `${title} (${rating}/${count})`;navigator.clipboard.writeText(text)})()
```

# Trakt.tv data

```
javascript:(()=>{navigator.clipboard.writeText(document.querySelector("#summary-wrapper h1").innerHTML.replace(/(.+)\s<span class="year">(.+)<\/span>/,"$1 ($2)"))})()
```

# Send to Kindle

```
javascript:(()=>{d=document,t=encodeURIComponent(d.title),href=window.location.href,hn=(window.location.href.indexOf("https://news.ycombinator.com/")==0),url=encodeURIComponent(hn?d.querySelector(".titleline > a").getAttribute("href"):href),id=hn?href.match(/id=(\d+)/)[1]:"",d.head.insertAdjacentHTML("beforeend",`<style>#send2kindle{visibility:hidden;min-width:250px;margin-left:-125px;background-color:#333;color:red;border:4px solid red;text-align:center;border-radius:2px;padding:16px;position:fixed;z-index:1;left:50%;bottom:30px;visibility:visible;-webkit-animation:.5s fadein;animation:.5s fadein}#send2kindle a{font-size:30px;color:red},@-webkit-keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}</style>`),z=d.createElement('div'),z.setAttribute('id','send2kindle'),z.innerHTML=`<a target="_blank" href="LAMBDA_URL?title=${t}&url=${url}&hn=${id}">Click me to send to kindle!</a>`;d.body.appendChild(z);})()
```

# Insert script

```
javascript:(()=>{d=document,b=d.body,z=d.createElement('scr'+'ipt');z.setAttribute('src','https://cdn.jsdelivr.net/gh/USER_NAME/REPO/SCRIPT.min.js');b.appendChild(z)})()
```

# Archive page
```
javascript:(()=>{window.location.href='https://archive.ph/?run=1&url='+window.location})()
```
