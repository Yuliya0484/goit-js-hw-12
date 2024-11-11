import{i,S as p}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const m="47000249-41843abe91023242d8e7e2eb0",y="https://pixabay.com/api/";async function g(n,t=1,o=200){const s=`${y}?key=${m}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${o}`,e=await fetch(s);if(!e.ok)throw new Error("Error fetching images");return(await e.json()).hits}function h(n){const t=document.querySelector(".gallery"),o=n.map(({webformatURL:s,largeImageURL:e,tags:r,likes:a,views:u,comments:f,downloads:d})=>`
    <a class="gallery__item" href="${e}">
      <img src="${s}" alt="${r}" width="360px" height="200px" loading="lazy"/>
      <div class="info">
        <p><b>Likes:</b> ${a}</p>
        <p><b>Views:</b> ${u}</p>
        <p><b>Comments:</b> ${f}</p>
        <p><b>Downloads:</b> ${d}</p>
      </div>
    </a>
  `).join("");t.innerHTML=o}function b(){document.querySelector(".gallery").innerHTML=""}const w=document.querySelector("#search-form"),l=document.querySelector(".loader");let c;w.addEventListener("submit",async n=>{n.preventDefault();const t=n.target.elements.searchQuery.value.trim();if(!t){i.warning({title:"Warning",message:"Please enter a search query."});return}b(),l.style.display="block";try{const o=await g(t);l.style.display="none",o.length===0?i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}):(h(o),c?c.refresh():c=new p(".gallery a"))}catch{l.style.display="none",i.error({title:"Error",message:"Something went wrong. Please try again later."})}});
//# sourceMappingURL=index.js.map
