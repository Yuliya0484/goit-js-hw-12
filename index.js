import{a as L,S as b,i as s}from"./assets/vendor-C4-ZuMk8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const w="47000249-41843abe91023242d8e7e2eb0",v="https://pixabay.com/api/",S=15;async function E(r,o){const i={key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:S,page:o};try{return(await L.get(v,{params:i})).data}catch(n){throw console.error("Error fetching images:",n),new Error("Failed to fetch images")}}const f=document.querySelector(".gallery");let P=new b(".gallery a");function q(r){const o=r.map(({webformatURL:i,largeImageURL:n,tags:e,likes:t,views:a,comments:g,downloads:y})=>`
        <div class="gallery-list>
        <a class="gallery-item" href="${n}">
        <img src="${i}" alt="${e}" width='360px' height='200px' loading="lazy" />
        </a>
        <div class="info">
          <p>Likes:<br /> ${t}</p>
          <p>Views:<br /> ${a}</p>
          <p>Comments:<br /> ${g}</p>
          <p>Downloads:<br /> ${y}</p>
          </div>
        </div>
        `).join("");f.insertAdjacentHTML("beforeend",o),P.refresh()}function M(){f.innerHTML=""}const R=document.querySelector(".search-form"),$=document.querySelector(".search-input"),d=document.querySelector(".load-more-btn"),h=document.querySelector("#loader");let l="",c=1;R.addEventListener("submit",O);d.addEventListener("click",I);function x(){h.classList.remove("hidden")}function u(){h.classList.add("hidden")}function A(){d.classList.remove("hidden")}function p(){d.classList.add("hidden")}async function O(r){if(r.preventDefault(),l=$.value.trim(),l===""){s.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}M(),p(),c=1,await m()}async function I(){c+=1,await m()}async function m(){try{x();const r=await E(l,c);if(r.hits.length===0){s.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u();return}q(r.hits),c>=Math.ceil(r.totalHits/15)?(s.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),p()):A()}catch{s.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{u()}}
//# sourceMappingURL=index.js.map
