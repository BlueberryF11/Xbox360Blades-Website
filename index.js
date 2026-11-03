const tabs=[...document.querySelectorAll(".tab")];
const pages=[...document.querySelectorAll(".page")];
const tiles=[...document.querySelectorAll(".tile")];
const toast=document.getElementById("toast");
let pageIndex=0,tileIndex=0,toastTimer;
const pageNames=["home","social","settings"];
function showPage(name){pageIndex=pageNames.indexOf(name);if(pageIndex<0)pageIndex=0;tabs.forEach(t=>t.classList.toggle("active",t.dataset.page===name));pages.forEach(p=>p.classList.toggle("active",p.id===name));tileIndex=0;syncSelection()}
function currentTiles(){return [...document.querySelector("#"+pageNames[pageIndex]).querySelectorAll(".tile")]}
function syncSelection(){const list=currentTiles();tiles.forEach(t=>t.classList.remove("selected"));if(list.length){tileIndex=Math.max(0,Math.min(tileIndex,list.length-1));list[tileIndex].classList.add("selected")}}
function moveTile(delta){const list=currentTiles();if(!list.length)return;tileIndex=(tileIndex+delta+list.length)%list.length;syncSelection()}
function activate(){const list=currentTiles(),tile=list[tileIndex];if(tile)showToast(tile.dataset.title||tile.textContent.trim())}
function showToast(text){toast.textContent=text;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1250)}
tabs.forEach(tab=>tab.addEventListener("click",()=>showPage(tab.dataset.page)));
tiles.forEach(tile=>tile.addEventListener("click",()=>{const list=currentTiles();tileIndex=list.indexOf(tile);syncSelection();activate()}));
document.getElementById("profile-chip").addEventListener("click",()=>showToast("Player 1"));
document.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," "].includes(e.key))e.preventDefault();if(e.key==="ArrowLeft"||e.key==="ArrowUp")moveTile(-1);if(e.key==="ArrowRight"||e.key==="ArrowDown")moveTile(1);if(e.key==="Enter"||e.key===" ")activate();if(e.key==="Tab"){const next=(pageIndex+1)%3;showPage(pageNames[next])}if(e.key==="Escape"||e.key.toLowerCase()==="b")showToast("Back")});
let touchX=0;document.querySelector(".dashboard").addEventListener("touchstart",e=>touchX=e.changedTouches[0].clientX,{passive:true});document.querySelector(".dashboard").addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>70){const next=(pageIndex+(dx<0?1:2))%3;showPage(pageNames[next])}},{passive:true});
showPage("home");