const blades=[
{name:"Xbox Live",color:"#e78316",dark:"#a94e0c",title:"Welcome to Xbox Live",heading:"Xbox Live",items:[
["Create Profile","G","Create your Xbox profile","Create a profile to save your games, achievements, and personal settings."],
["Join Xbox LIVE","◎","Join Xbox LIVE","Connect to Xbox LIVE to play with friends and explore online entertainment."],
["Recover Gamertag","↻","Recover your gamertag","Recover a gamertag that is already associated with an Xbox LIVE account."]]},
{name:"Games",color:"#55b91c",dark:"#287c12",title:"Select a Game",heading:"Games",items:[
["Kameo: Elements of Power","K","Kameo: Elements of Power","Unleash elemental powers in an adventure across a magical world."],
["Project Gotham Racing 3","P","Project Gotham Racing 3","Race through detailed city streets in a world-class driving experience."],
["Call of Duty 2","C","Call of Duty 2","Experience the intensity of the Second World War across multiple fronts."],
["Peter Jackson's King Kong","K","Peter Jackson's King Kong","Survive a mysterious island filled with danger and discovery."],
["Need for Speed: Most Wanted","N","Need for Speed: Most Wanted","Race, evade the cops, and climb the Blacklist."],
["Amped 3","A","Amped 3","Hit the slopes in an over-the-top snowboarding adventure."]]},
{name:"Media",color:"#168bc1",dark:"#07527f",title:"Media",heading:"Media",items:[
["Windows Media Center","▣","Windows Media Center","Connect to a Windows Media Center PC to enjoy music, photos, and video."],
["Music Player","♫","Music Player","Play music from your console or a connected portable music player."],
["Picture Viewer","▧","Picture Viewer","View slideshows and browse pictures stored on your devices."],
["Video Player","▶","Video Player","Watch videos stored on your console or connected devices."]]},
{name:"System",color:"#8753a9",dark:"#4d2a75",title:"System",heading:"System",items:[
["Console Settings","⚙","Console Settings","Configure your console, preferences, and connected devices."],
["Memory","▤","Memory","Manage saved games, profiles, and storage devices."],
["Network Settings","⌁","Network Settings","Configure your network connection and test Xbox LIVE connectivity."],
["Family Settings","♧","Family Settings","Manage family settings and content restrictions."],
["System Info","ⓘ","System Information","View your console's system information."]]}
];
let bladeIndex=0,itemIndex=0,toastTimer;
const $=id=>document.getElementById(id);
function renderTabs(){const left=$("left-tabs"),right=$("right-tabs");left.innerHTML="";right.innerHTML="";for(let i=bladeIndex-1;i>=0;i--)left.appendChild(makeTab(i));for(let i=bladeIndex+1;i<blades.length;i++)right.appendChild(makeTab(i));}
function makeTab(i){const b=document.createElement("button");b.className="side-tab"+(Math.abs(i-bladeIndex)===1?" near":"");b.textContent=blades[i].name;b.setAttribute("aria-label","Switch to "+blades[i].name);b.addEventListener("click",()=>setBlade(i));return b}
function render(){const blade=blades[bladeIndex];document.documentElement.style.setProperty("--blade",blade.color);document.documentElement.style.setProperty("--blade-dark",blade.dark);$("active-blade").style.background="linear-gradient(135deg,"+blade.color+" 0,"+blade.dark+" 100%)";$("page-title").textContent=blade.title;$("list-heading").textContent=blade.heading;$("y-action").textContent=bladeIndex===1?"Search":"Search";$("item-list").innerHTML="";blade.items.forEach((item,i)=>{const row=document.createElement("button");row.className="blade-item"+(i===itemIndex?" selected":"");row.setAttribute("role","option");row.setAttribute("aria-selected",String(i===itemIndex));row.innerHTML='<span class="item-thumb">'+item[1]+'</span><span class="item-name">'+item[0]+'</span><span class="item-sub">XBOX 360</span>';row.addEventListener("mouseenter",()=>{itemIndex=i;updateRows();updatePreview()});row.addEventListener("focus",()=>{itemIndex=i;updateRows();updatePreview()});row.addEventListener("click",()=>{itemIndex=i;updateRows();updatePreview();showToast(item[0])});$("item-list").appendChild(row)});renderTabs();updatePreview();}
function updateRows(){[...$("item-list").children].forEach((row,i)=>{row.classList.toggle("selected",i===itemIndex);row.setAttribute("aria-selected",String(i===itemIndex))})}
function updatePreview(){const item=blades[bladeIndex].items[itemIndex];$("preview-title").textContent=item[2];$("preview-description").textContent=item[3];$("art-mark").textContent=item[1];const hue=bladeIndex===1?"#9ac5e7":bladeIndex===2?"#a7d8e7":bladeIndex===3?"#c7b3dc":"#d9c48e";$("preview-art").style.background="linear-gradient(145deg,"+hue+",#547b85 54%,#263e4a)"}
function setBlade(i){bladeIndex=(i+blades.length)%blades.length;itemIndex=0;render()}
function moveItem(d){itemIndex=(itemIndex+d+blades[bladeIndex].items.length)%blades[bladeIndex].items.length;updateRows();updatePreview()}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),1300)}
document.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," "].includes(e.key))e.preventDefault();if(e.key==="ArrowLeft")setBlade(bladeIndex-1);if(e.key==="ArrowRight")setBlade(bladeIndex+1);if(e.key==="ArrowUp")moveItem(-1);if(e.key==="ArrowDown")moveItem(1);if(e.key==="Enter"||e.key===" "){showToast(blades[bladeIndex].items[itemIndex][0])}if(e.key==="Escape"||e.key.toLowerCase()==="b")showToast("Back")});
let touchStartX=0;document.querySelector(".screen").addEventListener("touchstart",e=>touchStartX=e.changedTouches[0].screenX,{passive:true});document.querySelector(".screen").addEventListener("touchend",e=>{const delta=e.changedTouches[0].screenX-touchStartX;if(Math.abs(delta)>55)setBlade(bladeIndex+(delta<0?1:-1))},{passive:true});
render();
