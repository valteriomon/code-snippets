# Google cache page

```
javascript:(()=>{window.location.href='http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=cache:%27+window.location})()
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

```javascript
javascript:(()=>{navigator.clipboard.writeText(document.querySelector("#summary-wrapper h1").innerHTML.replace(/(.+)\s<span class="year">(.+)<\/span>/,"$1 ($2)"))})()
```

# Kindle lambda

```
javascript:(()=>{d=document,z=d.createElement('scr'+'ipt'),title=encodeURIComponent(document.title),url=encodeURIComponent(window.location.href);z.setAttribute('src',`LAMBDA_URL?title=${title}&url=${url}`);d.body.appendChild(z)})()
```
