const blades=[
{name:"Xbox Live",kicker:"XBOX LIVE",title:"Welcome to Xbox Live",color:"#70b900",symbol:"◉",items:[
["Spotlight","✧","The best of Xbox Live.","Discover featured games, entertainment, and community highlights.","FEATURED"],
["Marketplace","▣","Explore the marketplace.","Browse downloadable games, add-ons, demos, and themes.","MARKETPLACE"],
["Friends","♙","Your friends, one place.","Sign in to see who's online and what your friends are playing.","COMMUNITY"],
["Messages","✉","Stay in touch.","Your Xbox messages and invitations would appear here.","MESSAGES"],
["Account","◎","Your Xbox account.","Sign in to manage your profile and Xbox Live membership.","ACCOUNT"]]},
{name:"Games",kicker:"GAMES",title:"Your games, your world",color:"#7a38a8",symbol:"✦",items:[
["Game Library","▣","Ready when you are.","Browse your games library and jump back into your favorites.","MY GAMES"],
["Achievements","◆","Every point tells a story.","Track achievements and compare your gamerscore.","GAMERSCORE"],
["Game Demos","▶","Try something new.","Discover playable demos and trailers.","DISCOVER"],
["Recent Games","◷","Pick up where you left off.","Your recently played games will show up here.","RECENT"]]},
{name:"Media",kicker:"MEDIA",title:"Your entertainment hub",color:"#087db1",symbol:"♫",items:[
["Music Library","♫","Your soundtrack.","Browse music stored on your console or connected device.","MUSIC"],
["Video Library","▣","Sit back and watch.","Explore videos and movies from your media library.","VIDEO"],
["Pictures","▧","Your memories on screen.","View photos from your console or connected storage.","PICTURES"],
["Radio","◖","Tune in.","Listen to music and audio from supported services.","AUDIO"]]},
{name:"System",kicker:"SYSTEM",title:"Make it yours",color:"#d77a16",symbol:"⚙",items:[
["Console Settings","⚙","Your console, your settings.","Configure your console preferences and system options.","SETTINGS"],
["Profile","♙","Your player identity.","Manage your avatar, gamer profile, and personal preferences.","PROFILE"],
["Storage","▤","Manage your storage.","View available storage and connected devices.","STORAGE"],
["Network Settings","⌁","Stay connected.","View network settings and connection information.","NETWORK"],
["Family Settings","♧","Safety and privacy.","Manage family settings and content preferences.","FAMILY"]]}];
let activeBlade=0,activeItem=0,toastTimer;
const menu=document.getElementById("menu-items"),tabs=[...document.querySelectorAll(".blade-tab")],$=id=>document.getElementById(id);
function render(){const blade=blades[activeBlade];document.documentElement.style.setProperty("--active",blade.color);$("blade-kicker").textContent=blade.kicker;$("blade-title").textContent=blade.title;$("footer-section").textContent=blade.kicker;$("feature-symbol").textContent=blade.symbol;$("feature-art").style.background=`radial-gradient(circle at 50% 45%, color-mix(in srgb, ${blade.color} 85%, white), color-mix(in srgb, ${blade.color} 60%, #0b1b26) 44%, #07121e 80%)`;tabs.forEach((tab,i)=>{tab.classList.toggle("active",i===activeBlade);tab.setAttribute("aria-selected",String(i===activeBlade))});menu.innerHTML="";blade.items.forEach((item,i)=>{const button=document.createElement("button");button.className="menu-item"+(i===activeItem?" selected":"");button.setAttribute("role","option");button.setAttribute("aria-selected",String(i===activeItem));button.innerHTML=`<span class="item-icon">${item[1]}</span><span>${item[0]}</span><span class="chevron">›</span>`;button.addEventListener("mouseenter",()=>{activeItem=i;renderFeature();updateSelection()});button.addEventListener("focus",()=>{activeItem=i;renderFeature();updateSelection()});button.addEventListener("click",()=>{activeItem=i;renderFeature();updateSelection();showToast(item[0]+" selected")});menu.appendChild(button)});renderFeature()}
function renderFeature(){const item=blades[activeBlade].items[activeItem];$("feature-kicker").textContent=item[4];$("feature-title").textContent=item[2];$("feature-description").textContent=item[3];$("action-button").innerHTML=`${item[0]} <span>›</span>`}
function updateSelection(){[...menu.children].forEach((el,i)=>{el.classList.toggle("selected",i===activeItem);el.setAttribute("aria-selected",String(i===activeItem))})}
function setBlade(index){activeBlade=(index+blades.length)%blades.length;activeItem=0;render()}
function moveItem(direction){const count=blades[activeBlade].items.length;activeItem=(activeItem+direction+count)%count;updateSelection();renderFeature();menu.children[activeItem]?.scrollIntoView({block:"nearest",behavior:"smooth"})}
function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1500)}
tabs.forEach((tab,i)=>tab.addEventListener("click",()=>setBlade(i)));
$("action-button").addEventListener("click",()=>showToast(blades[activeBlade].items[activeItem][0]+" is a dashboard demo panel"));
document.addEventListener("keydown",event=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," "].includes(event.key))event.preventDefault();if(event.key==="ArrowLeft"||event.key.toLowerCase()==="q")setBlade(activeBlade-1);if(event.key==="ArrowRight"||event.key.toLowerCase()==="e")setBlade(activeBlade+1);if(event.key==="ArrowUp")moveItem(-1);if(event.key==="ArrowDown")moveItem(1);if(event.key==="Enter"||event.key===" "){const item=blades[activeBlade].items[activeItem];showToast(item[0]+" selected")}if(event.key==="Escape"||event.key.toLowerCase()==="b")showToast("Dashboard")});
const consoleEl=document.querySelector(".console");consoleEl.addEventListener("touchstart",event=>{consoleEl.dataset.touchX=String(event.changedTouches[0].screenX)},{passive:true});consoleEl.addEventListener("touchend",event=>{const start=Number(consoleEl.dataset.touchX||0),delta=event.changedTouches[0].screenX-start;if(Math.abs(delta)>70)setBlade(activeBlade+(delta<0?1:-1))},{passive:true});
function updateClock(){$("clock").textContent=new Intl.DateTimeFormat([],{hour:"numeric",minute:"2-digit"}).format(new Date())}updateClock();setInterval(updateClock,30000);render();
