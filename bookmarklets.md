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

# Kindle lambda

```
javascript:(()=>{d=document,z=d.createElement('scr'+'ipt'),title=encodeURIComponent(document.title),url=encodeURIComponent(window.location.href);z.setAttribute('src',`LAMBDA_URL?title=${title}&url=${url}`);d.body.appendChild(z)})()
```

# Insert script

```
javascript:(()=>{d=document,b=d.body,z=d.createElement('scr'+'ipt');z.setAttribute('src','https://cdn.jsdelivr.net/gh/USER_NAME/REPO/SCRIPT.min.js');b.appendChild(z)})()
```

# Archive page
```
javascript:(()=>{window.location.href='https://archive.ph/?run=1&url='+window.location})()
```
