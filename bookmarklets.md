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
javascript:(()=>{
	lambda="";
	appscript="";
	e=encodeURIComponent;
    d=document;
    d.head.insertAdjacentHTML("beforeend","<style>#s2k {visibility: hidden;min-width: 250px;transform: translateX(-50%);background-color: #333;color: #fff;text-align: center;border-radius: 2px;padding: 16px;position: fixed;z-index: 1;left: 50%;bottom: 30px;}#s2k.show {visibility: visible;-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;animation: fadein 0.5s, fadeout 0.5s 2.5s;}@-webkit-keyframes fadein {from {bottom: 0; opacity: 0;}to {bottom: 30px; opacity: 1;}}@keyframes fadein {from {bottom: 0; opacity: 0;}to {bottom: 30px; opacity: 1;}}@-webkit-keyframes fadeout {from {bottom: 30px; opacity: 1;}to {bottom: 0; opacity: 0;}}@keyframes fadeout {from {bottom: 30px; opacity: 1;}to {bottom: 0; opacity: 0;}}</style>")
	snackbar=d.createElement('div');
	snackbar.setAttribute('id','s2k');
    d.body.appendChild(snackbar);
	title=e(d.title);
	loc=window.location.href;
	hn=(loc.indexOf("https://news.ycombinator.com/")==0);
	if(hn){
		url=e(d.querySelector(".titleline > a").getAttribute("href"));
		id=loc.match(/id=(\d+)/)[1];
		endpoint=`${appscript}?title=${title}&url=${url}&hn=${id}`;
		window.open(endpoint,'_blank');
		snackbar.innerText="Sending article and comments in new tab...";
		snackbar.className = "show";
		setTimeout(()=>{snackbar.className=snackbar.className.replace("show","")},3000);
	} else {
		url=e(loc);
		endpoint=`${lambda}?title=${title}&url=${url}`;
		scr=d.createElement('scr'+'ipt');
		scr.onload = ()=>{            
			if(!d.querySelector('#senttokindle')){
				window.open(endpoint,'_blank');
				snackbar.innerText="Sending article in new tab...";
				snackbar.className = "show";
				setTimeout(()=>{snackbar.className=snackbar.className.replace("show","")},3000);
			} else {
                snackbar.innerText="Sent to kindle!";
				snackbar.className = "show";				
				setTimeout(()=>{snackbar.className=snackbar.className.replace("show","")},3000);
			}
		}
		scr.setAttribute('src',endpoint);
        d.body.appendChild(scr);
	}
})()
```
```
javascript:lambda="",appscript="",e=encodeURIComponent,(d=document).head.insertAdjacentHTML("beforeend","<style>#s2k {visibility: hidden;min-width: 250px;transform: translateX(-50%);background-color: #333;color: #fff;text-align: center;border-radius: 2px;padding: 16px;position: fixed;z-index: 1;left: 50%;bottom: 30px;}#s2k.show {visibility: visible;-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;animation: fadein 0.5s, fadeout 0.5s 2.5s;}@-webkit-keyframes fadein {from {bottom: 0; opacity: 0;}to {bottom: 30px; opacity: 1;}}@keyframes fadein {from {bottom: 0; opacity: 0;}to {bottom: 30px; opacity: 1;}}@-webkit-keyframes fadeout {from {bottom: 30px; opacity: 1;}to {bottom: 0; opacity: 0;}}@keyframes fadeout {from {bottom: 30px; opacity: 1;}to {bottom: 0; opacity: 0;}}</style>"),(snackbar=d.createElement("div")).setAttribute("id","s2k"),d.body.appendChild(snackbar),title=e(d.title),(hn=0==(loc=window.location.href).indexOf("https://news.ycombinator.com/"))?(endpoint=`${appscript}?title=${title}&url=${url=e(d.querySelector(".titleline > a").getAttribute("href"))}&hn=${id=loc.match(/id=(\d+)/)[1]}`,window.open(endpoint,"_blank"),snackbar.innerText="Sending article and comments in new tab...",snackbar.className="show",setTimeout(()=>{snackbar.className=snackbar.className.replace("show","")},3e3)):(endpoint=`${lambda}?title=${title}&url=${url=e(loc)}`,(scr=d.createElement("script")).onload=()=>{d.querySelector("#senttokindle")?(snackbar.innerText="Sent to kindle!",snackbar.className="show",setTimeout(()=>{snackbar.className=snackbar.className.replace("show","")},3e3)):(window.open(endpoint,"_blank"),snackbar.innerText="Sending article in new tab...",snackbar.className="show",setTimeout(()=>{snackbar.className=snackbar.className.replace("show","")},3e3))},scr.setAttribute("src",endpoint),d.body.appendChild(scr));
```

# Insert script

```
javascript:(()=>{d=document,b=d.body,z=d.createElement('scr'+'ipt');z.setAttribute('src','https://cdn.jsdelivr.net/gh/USER_NAME/REPO/SCRIPT.min.js');b.appendChild(z)})()
```

# Archive page
```
javascript:(()=>{window.location.href='https://archive.ph/?run=1&url='+window.location})()
```
