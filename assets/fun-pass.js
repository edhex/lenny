/* Lenny Fun Pass v2. All original games, profiles and progress remain intact.
 * No private service keys in this GitHub Pages website. */
(() => {
'use strict';
const stage = document.getElementById('stage');
const contentEl = document.getElementById('content');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const urls = {
  hello:'https://v3b.fal.media/files/b/0ab193b3/_BQ9faSH4W6SPGJNWLS_n_gemini_tts_output.wav',
  welcome:'https://v3b.fal.media/files/b/0ab193b3/lMKVCindEA-m_Bsl_AoVh_gemini_tts_output.wav',
  mission:'https://v3b.fal.media/files/b/0ab193b3/un0nHtD-HxLKd92MsotvP_gemini_tts_output.wav',
  complete:'https://v3b.fal.media/files/b/0ab193b3/UIJARzguz-hh9rqdTjwyW_gemini_tts_output.wav',
  feed:'https://v3b.fal.media/files/b/0ab193b3/eJwa9EHsznUfsMF7wl4mn_gemini_tts_output.wav',
  feeddance:'https://v3b.fal.media/files/b/0ab193b3/boJmholY0gGKYp1TKUPM8_gemini_tts_output.wav',
  hug:'https://v3b.fal.media/files/b/0ab193b3/bfO_sqKfX4VpSg5QCl63x_gemini_tts_output.wav',
  megahug:'https://v3b.fal.media/files/b/0ab193b3/dwT2UhorSZ4D3frlhfR59_gemini_tts_output.wav'
};
const voiceKind = new Map();
let currentAudio=null, activeMediaKey='', activeMediaEpoch=0, fxTimer=0, zoomTimer=0, toastTimer=0, hugOpen=false;
let currentWorld='';
const missionMeta = [
 ['pirate','🏝️','Secret Island'],['builder','🧰','Secret Workshop'],['river','🛟','Rescue River'],
 ['theatre','🎭','Story Theatre'],['mystery','🧦','Mystery Studio'],['news','🎙️','Lenny News'],
 ['shop','🛍️','Toy Shop'],['lab','💡','Invention Lab'],['party','🎈','Party Planet'],
 ['puzzle','🖍️','Fair-Play Park'],['welcome','🧩','Welcome World'],['kindness','💛','Kindness Street'],
 ['bridge','🌉','Bridge Bay'],['tower','🏗️','Builder Valley'],['maze','🌀','Maze Land']
];
missionMeta.push(...[["skyship","☁️","CLOUD CAPTAIN"],["teddy-radio","📻","T.E.D.D.Y. RESCUE"],["jungle","🌿","JUNGLE CROSSING"],["signals","🪧","SIGNAL SQUAD"],["weather","🌦️","WACKY WEATHER"],["puppet","🧦","PUPPET STUDIO"],["museum","🏛️","MINI MUSEUM"],["sound-story","🎵","SOUND STORY"],["lemonade","🍋","LEMONADE LAB"],["fixit","🧸","TOY FIX-IT"],["airline","✈️","PAPER AIRLINE"],["stickers","🌟","STICKER MARKET"],["post-office","💌","FRIENDSHIP POST"],["referee","🛝","PLAY FAIR PARK"],["helpers","🦸","HIDDEN HEROES"],["boomerang","🪃","COMPLIMENT CLUB"],["windcastle","🏰","WIND CASTLE"],["doodle","🖍️","DOODLE QUEST"],["ramp","🏎️","RAMP RALLY"],["glider","🚀","GLIDER QUEST"]]);
const worldLayer = document.createElement('div');worldLayer.className='world-layer';worldLayer.setAttribute('aria-hidden','true');
worldLayer.innerHTML='<div class="world-scene" id="worldScene"></div>';
stage.prepend(worldLayer);
const worldTag=document.createElement('div');worldTag.className='world-tag';worldTag.setAttribute('aria-hidden','true');stage.append(worldTag);
const fxLayer=document.createElement('div');fxLayer.className='fx-layer';fxLayer.setAttribute('aria-hidden','true');stage.append(fxLayer);
const lionImage='assets/lenny-lion.png';
function setWorld(name,title,icon='🌈'){
 const safe=/^[a-z-]+$/.test(name)?name:'home';
 const label=title||'Lenny’s Little World';
 worldTag.innerHTML='<b>✦ Lenny’s little world</b><span></span>';
 worldTag.querySelector('span').textContent=icon+' '+label;
 document.body.dataset.world=safe;
 window.dispatchEvent(new CustomEvent("lenny:world",{detail:{slug:safe}}));
 if(currentWorld!==safe){
   currentWorld=safe;
   document.getElementById('worldScene').style.backgroundImage='url("assets/worlds/'+safe+'.svg")';
   worldLayer.classList.remove('world-in');void worldLayer.offsetWidth;worldLayer.classList.add('world-in');
 }
}
function pickWorld(){
 if(mode==='journey'){
   const idx=progress.tasks[Math.min(progress.done.length,4)]||0;
   return missionMeta[idx];
 }
 if(mode==='project')return ['lab','🚀','My Big Idea'];
 if(mode==='joke')return ['theatre','🤭','Giggle Theatre'];
 if(mode==='talk')return ['home','💬','Chat with Lenny'];
 if(mode==='feed'||mode==='reward'){const last=progress.done.length?progress.tasks[Math.min(progress.done.length-1,4)]:null;return last!==null?missionMeta[last]:['party','🍖','Lenny’s Snack Party'];}
 return ['home','🌈','Lenny’s Island'];
}
function refreshWorld(){const [scene,icon,title]=pickWorld();setWorld(scene,title,icon)}
setWorld('home','Lenny’s Island','🌈');
function pauseRecorded(){activeMediaEpoch++;activeMediaKey='';if(currentAudio){currentAudio.pause();currentAudio.src='';currentAudio=null;}}
const baseStopVoice=stopVoice;
stopVoice = function(){pauseRecorded();return baseStopVoice();};
const baseChooseVoice=chooseVoice;
chooseVoice=function(){
 if(!synthesis)return null;
 const voices=synthesis.getVoices().filter(v=>/^en[-_]/i.test(v.lang));
 const chosen=voices.find(v=>v.voiceURI===voicePreference);
 if(chosen)return chosen;
 function quality(v){
   const n=v.name.toLowerCase();const au=/^en[-_]au$/i.test(v.lang);
   const female=/karen|matilda|catherine|natasha|olivia|zoe|ava|samantha|moira|tessa|susan|fiona|serena|shelley|female/i.test(n);
   const male=/male|daniel|alex|fred|aaron|gordon|arthur|thomas|brian|rishi/i.test(n);
   return (au?1000:0)+(female?330:0)-(male?320:0)+(/natural|premium|enhanced/i.test(n)?110:0);
 }
 return voices.sort((a,b)=>quality(b)-quality(a))[0]||baseChooseVoice();
};
const baseSay=say;
function audioKeyFor(text){
 const t=String(text||'');
 if(/(all six|every secret heart)/i.test(t) && /hug|squeeze|heart/i.test(t))return 'megahug';
 if(/(lion hug|secret heart)/i.test(t))return 'hug';
 if(mode==='welcome')return 'hello';
 if(mode==='home'&&/hello|hi[,! ]/i.test(t))return 'welcome';
 if(mode==='reward'&&/earned a silly meat treat/i.test(t))return 'complete';
 if(mode==='feed'&&/nom/i.test(t))return 'feed';
 if(mode==='feed'&&/scrumptious/i.test(t))return 'feeddance';
 return '';
}
function fallbackSpeech(text,reopen){state("LENNY IS READY");const el=get("status");if(el)el.textContent="Lenny’s recording couldn’t play. Tap 🔊 Hear Lenny to try again.";}
function recordedSpeak(key,text,reopen){
 const epoch=activeMediaEpoch;
 const audio=new Audio();
 currentAudio=audio;activeMediaKey=key;
 audio.preload='auto';audio.volume=1;
 audio.onplay=()=>{if(epoch===activeMediaEpoch)state('LENNY IS TALKING','speaking')};
 audio.onended=()=>{if(epoch!==activeMediaEpoch)return;currentAudio=null;state(mode==='talk'?'YOUR TURN!':'LENNY IS READY');if(reopen&&keepChatting&&mode==='talk')setTimeout(listen,600);};
 const fallback=()=>{
   if(epoch!==activeMediaEpoch||currentAudio!==audio)return;
   currentAudio=null;activeMediaKey='';fallbackSpeech(text,reopen);
 };
 audio.onerror=()=>{
   // If the optional local files have not yet been fetched, try the hosted clip.
   if(epoch!==activeMediaEpoch)return;
   if(audio.dataset.source==='local'){
     audio.dataset.source='hosted';audio.src=urls[key];audio.load();audio.play().catch(fallback);
   }else fallback();
 };
 audio.dataset.source='local';
 audio.src='assets/voice/'+key+'.wav';
 audio.play().catch(()=>{
   if(epoch!==activeMediaEpoch)return;
   audio.dataset.source='hosted';audio.src=urls[key];audio.play().catch(fallback);
 });
}
say = function(text=spoken,reopen=false){
 text=String(text||'');
 const key=audioKeyFor(text);
 if(!key){baseSay(text,reopen);return;}
 stopVoice();spoken=text;
 if(muted)return;
 recordedSpeak(key,text,reopen);
};
const baseContent=content;
content=function(html,speech,read=true){
 clearTimeout(fxTimer);clearTimeout(zoomTimer);stage.removeAttribute('data-zoom');stage.removeAttribute('data-dance');stage.removeAttribute('data-tickle');fxLayer.replaceChildren();
 baseContent(html,speech,read);
 refreshWorld();
};
function burst(variant='confetti',amount=18){
 if(reduceMotion.matches)return;
 const emojis=variant==='hearts'?['💛','💗','✨','💕','💖']:variant==='feed'?['🍖','⭐','✨','💥']:['✨','🌟','⭐','🎉','💛','🌈'];
 for(let i=0;i<amount;i++){
   const el=document.createElement('span');el.className='fx-piece';el.textContent=emojis[Math.floor(Math.random()*emojis.length)];
   const left=8+Math.random()*84,top=23+Math.random()*54;
   el.style.cssText='--x:'+left+'%;--y:'+top+'%;--dx:'+((Math.random()-.5)*170)+'px;--dy:'+(-35-Math.random()*140)+'px;--spin:'+((Math.random()-.5)*220)+'deg;--delay:'+(Math.random()*.18)+'s';
   fxLayer.append(el);
 }
 clearTimeout(fxTimer);fxTimer=setTimeout(()=>fxLayer.replaceChildren(),1800);
}
function pop(text='SURPRISE!',style='zoom'){
 if(reduceMotion.matches)return;
 stage.removeAttribute('data-zoom');stage.removeAttribute('data-tickle');void stage.offsetWidth;
 if(style==='zoom')stage.dataset.zoom='true';else stage.dataset.tickle='true';
 const span=document.createElement('div');span.className='comic-pop';span.textContent=text;
 stage.append(span);
 clearTimeout(zoomTimer);zoomTimer=setTimeout(()=>{span.remove();delete stage.dataset.zoom;delete stage.dataset.tickle;},1500);
}
function stamp(){
 const box=document.createElement('div');box.className='celebration-stamp';box.textContent='🏅 MISSION COMPLETE!';
 contentEl.prepend(box);
}
function progressPips(){
 if(mode!=='journey'||!contentEl.querySelector('#stamps'))return;
 const current=Math.min(5,progress.done.length);
 const task=quests[progress.tasks[Math.min(4,current)]];
 if(!task)return;
 const max=task[4].length+3; // intro, supplies, activity steps, show and tell
 const pips=document.createElement('div');pips.className='mission-progress';pips.setAttribute('aria-hidden','true');
 for(let i=0;i<max;i++){
   let pip=document.createElement('span');pip.className=i<taskPage?'complete':i===taskPage?'active':'';pips.append(pip);
 }
 contentEl.querySelector('#stamps').after(pips);
}
const baseRenderTask=renderTask;
renderTask=function(read=true){baseRenderTask(read);refreshWorld();progressPips()};
const baseRenderProof=renderProof;
renderProof=function(i,task,cat,read){baseRenderProof(i,task,cat,read);refreshWorld();progressPips()};
const baseHome=home;
home=function(read=false){
 baseHome(read);refreshWorld();
 if(mode!=='home'||!playerName)return;
 const p=document.createElement('div');p.className='home-progress';
 const completed=progress.done.length;
 const hearts=progress.hearts.length;
 p.innerHTML='<div class="home-progress-head"><span>🏅 Your adventure badges</span><strong>'+completed+' / 5</strong></div><div class="home-progress-track"><span style="--done:'+(completed*20)+'%"></span></div><small>💛 '+hearts+' / 6 secret hearts discovered</small>';
 const choices=contentEl.querySelector('#choices');
 if(choices)contentEl.insertBefore(p,choices);
 const top=document.createElement('div');top.className='world-ribbon';top.textContent=completed===5?'🚀 You’ve unlocked your big idea!':'✨ A little adventure. A big imagination.';
 contentEl.querySelector('h1')?.after(top);
};
const baseShowEarnedSnack=showEarnedSnack;
showEarnedSnack=function(destination){baseShowEarnedSnack(destination);stamp();burst('confetti',25);pop('YOU DID IT!')};
const baseFeedLenny=feedLenny;
feedLenny=function(destination){
 const count=progress.snacks.length;
 baseFeedLenny(destination);
 if(count>0&&mode==='feed'){
   burst('feed',10);
   setTimeout(()=>{
      if(mode!=='feed')return;
      stage.dataset.dance='true';pop('NOM NOM NOM!');burst('confetti',23);
   },760);
   setTimeout(()=>{
     if(mode!=='feed'&&Math.random()<.11)surprise('🍕 SURPRISE! Lenny just invented lion pizza.','disco');
   },1350);
 }
};
const baseConfetti=confetti;
confetti=function(){baseConfetti();burst('confetti',28)};
const baseRenderJoke=renderJoke;
renderJoke=function(){baseRenderJoke();if(jokeAnswer){pop(Math.random()<.25?'HA HA HAAAA!':'HEE HEE!',Math.random()<.2?'tickle':'zoom');burst('confetti',7);if(Math.random()<.1)surprise('🦁 Lenny laughed so hard he nearly dropped his whiskers!');}};
const baseNewJoke=newJoke;
newJoke=function(){baseNewJoke();refreshWorld()};
const baseTalkStart=talkStart;
talkStart=function(){baseTalkStart();refreshWorld()};
const baseStartProject=startProject;
startProject=function(){baseStartProject();refreshWorld()};
const baseFinishJourney=finishJourney;
finishJourney=function(){baseFinishJourney();refreshWorld()};
const baseProjectCelebration=projectCelebration;
projectCelebration=function(){baseProjectCelebration();burst('confetti',30);pop('SUPERSTAR!')};
const hugOverlay=document.createElement('div');
hugOverlay.id='megaHugOverlay';hugOverlay.className='mega-hug-overlay';hugOverlay.hidden=true;
hugOverlay.setAttribute('role','dialog');hugOverlay.setAttribute('aria-modal','true');hugOverlay.setAttribute('aria-labelledby','megaHugTitle');
hugOverlay.innerHTML='<div class="mega-hug-card"><img class="mega-hug-lion" alt="Lenny stretching out for a huge cuddle" src="'+lionImage+'"><div class="mega-hug-arms" aria-hidden="true"><span>🫲</span><span>🫱</span></div><h2 class="mega-hug-title" id="megaHugTitle"></h2><p class="mega-hug-note" id="megaHugNote"></p><button class="hug-done" id="hugOverlayDone">Thanks, Lenny! 💛</button></div>';
document.body.append(hugOverlay);
function dismissHug(){hugOverlay.hidden=true;hugOpen=false;closeHug();stopVoice();if(mode!=='welcome')get('hear')?.focus();}
document.getElementById('hugOverlayDone').addEventListener('click',dismissHug);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&hugOpen)dismissHug();if(e.key==='Tab'&&hugOpen){e.preventDefault();document.getElementById('hugOverlayDone').focus();}});
const baseFindHeart=findHeart;
findHeart=function(id){
 const had=progress.hearts.includes(id);
 baseFindHeart(id);
 if(!playerName)return;
 hugOpen=true;
 const all=progress.hearts.length===6;
 hugOverlay.dataset.mega=String(all);
 document.getElementById('megaHugTitle').textContent=all?'MEGA LION HUG UNLOCKED!':'BIG SQUISHY LION HUG!';
 document.getElementById('megaHugNote').textContent=(all?'🌟 All six secret hearts found!':'💛 '+progress.hearts.length+' of 6 secret hearts found')+' Squeeze, '+playerName+'!';
 hugOverlay.hidden=false;
 document.getElementById('hugOverlayDone').focus({preventScroll:true});
 burst('hearts',all?30:16);
 const heartLine=contentEl.querySelector('.home-progress small');
 if(heartLine)heartLine.textContent='💛 '+progress.hearts.length+' / 6 secret hearts discovered';
 if(all||!had)pop(all?'MEGA HUG!':'SQUEEEEZE!');
};
const baseCloseHug=closeHug;
closeHug=function(){baseCloseHug();/* full-screen hug has its own dismiss button */};
function surprise(message,kind='normal'){
 document.querySelector('.surprise-toast')?.remove();clearTimeout(toastTimer);
 const toast=document.createElement('div');toast.className='surprise-toast';toast.setAttribute('role','status');toast.textContent=message;document.body.append(toast);
 if(kind==='disco')document.body.classList.add('disco-mode');
 toastTimer=setTimeout(()=>{toast.remove();document.body.classList.remove('disco-mode')},3500);
}
// Enable the voice switcher only as a device fallback option; the eight special
// moments use the same prerecorded female voice regardless of installed voices.
const select=get('voice');
if(select){
  const first=select.querySelector('option');
  if(first)first.textContent='Australian female (auto where available)';
  const label=document.querySelector('label[for="voice"]');if(label)label.textContent='Voice for other task instructions';
}
// Preview uses the prerecorded welcome clip as soon as audio can play.
get('preview').onclick=()=>{interrupt();if(muted){muted=false;updateMute()}say('Oh, hello there! I’m Lenny. Shall we go on an adventure?')};
// Close any popovers when navigating or hiding the tab.
const baseInterrupt=interrupt;
interrupt=function(){baseInterrupt();document.body.classList.remove('disco-mode');document.querySelector('.surprise-toast')?.remove();};
document.addEventListener('visibilitychange',()=>{if(document.hidden){pauseRecorded();hugOverlay.hidden=true;hugOpen=false;}});
// First screen was created by base script before this enhancement loaded.
refreshWorld();
})();


/* Lenny Fun Pass v3 — cooler celebrations, bigger feed moments, more face zooms. */
(() => {
'use strict';
if(window.__lennyFunPassV3)return; window.__lennyFunPassV3=true;
const stage=document.getElementById('stage');
const contentEl=document.getElementById('content');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let heroTimer=0, zoomTimers=[];
function clearStageFlags(){['faceZoom','superzoom','feedImpact'].forEach(k=>delete stage.dataset[k]);zoomTimers.forEach(clearTimeout);zoomTimers=[];}
function stageFlash(flag='faceZoom',ms=1100){delete stage.dataset[flag];void stage.offsetWidth;stage.dataset[flag]='true';const t=setTimeout(()=>delete stage.dataset[flag],ms);zoomTimers.push(t);}
const hero=document.createElement('div');
hero.className='hero-overlay';hero.hidden=true;
hero.innerHTML='<div class="hero-card"><div class="hero-portrait"><div class="hero-shine" aria-hidden="true"></div></div><div class="hero-copy"><div class="hero-kicker" id="heroKicker"></div><h2 class="hero-title" id="heroTitle"></h2><p class="hero-sub" id="heroSub"></p></div></div>';
hero.addEventListener('click',()=>hideHero(true));
document.body.append(hero);
function heroNodes(){return {portrait:hero.querySelector('.hero-portrait'),kicker:hero.querySelector('#heroKicker'),title:hero.querySelector('#heroTitle'),sub:hero.querySelector('#heroSub')}}
function refreshHeroPortrait(kind='celebrate'){
 const {portrait}=heroNodes();
 portrait.innerHTML='<div class="hero-shine" aria-hidden="true"></div>';
 const scene=stage.querySelector('.scene');
 if(scene){
   const clone=scene.cloneNode(true);
   clone.removeAttribute('id');
   clone.classList.add('hero-scene-copy');
   clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
   portrait.append(clone);
 }
 if(kind==='feed'||kind==='feed-hit'){
   const treat=document.createElement('div');
   treat.className='hero-treat';
   treat.setAttribute('aria-hidden','true');
   treat.textContent='🍖';
   portrait.append(treat);
 }
}
function showHero({kicker='',title='',sub='',kind='celebrate',hold=1800,zoom='faceZoom'}={}){
 if(reduceMotion.matches)clearStageFlags();
 clearTimeout(heroTimer);
 hero.hidden=false;
 hero.dataset.kind=kind;
 refreshHeroPortrait(kind);
 const n=heroNodes();
 n.kicker.textContent=kicker;
 n.title.textContent=title;
 n.sub.textContent=sub;
 document.body.classList.add('hero-open');
 requestAnimationFrame(()=>hero.classList.add('show'));
 if(!reduceMotion.matches && zoom)stageFlash(zoom,Math.min(hold,1500));
 heroTimer=setTimeout(()=>hideHero(),hold);
}
function hideHero(immediate=false){
 clearTimeout(heroTimer);
 hero.classList.remove('show');
 document.body.classList.remove('hero-open');
 const done=()=>{hero.hidden=true;};
 if(immediate)done(); else setTimeout(done,220);
}
function currentTaskName(){
 try{ if(mode!=='journey') return ''; const idx=progress.tasks[Math.min(progress.done.length,4)]||0; return quests[idx]?.[1]||'';}catch{return ''}
}
function treatName(){
 const snack=(progress && progress.snacks && progress.snacks[progress.snacks.length-1])||'steak';
 return snack==='drumstick'?'drumstick':snack==='chop'?'lion chop':'victory steak';
}
function enhanceRewardCard(){
 const box=contentEl.querySelector('.earned-snack');
 if(!box || box.dataset.cool==='yes')return;
 box.dataset.cool='yes';
 const h=contentEl.querySelector('h2');
 if(h && !contentEl.querySelector('.reward-cool-note')){
   const p=document.createElement('p');
   p.className='reward-cool-note';
   p.style.margin='0 0 10px';
   p.style.fontWeight='800';
   p.style.color='#5e4d77';
   p.textContent='A proper win deserves a proper Lenny snack.';
   h.after(p);
 }
}
const prevContent=content;
content=function(html,speech,read=true){ if(mode!=='feed')hideHero(true); clearStageFlags(); return prevContent(html,speech,read); };
const prevShowEarnedSnack=showEarnedSnack;
showEarnedSnack=function(destination){
 prevShowEarnedSnack(destination);
 enhanceRewardCard();
 const task=currentTaskName();
 const title=(progress.done.length>=5?'YOU NAILED IT':'THAT WAS SERIOUSLY COOL');
 showHero({
   kicker:'MISSION COMPLETE',
   title,
   sub: task ? '"'+task+'" is complete. Now Lenny gets a proper victory snack.' : 'Lenny thinks that deserves a proper victory snack.',
   kind:'celebrate', hold:2350, zoom:'superzoom'
 });
};
const prevFeedLenny=feedLenny;
feedLenny=function(destination){
 const before=(progress.snacks||[]).length;
 prevFeedLenny(destination);
 if(mode!=='feed')return;
 const after=(progress.snacks||[]).length;
 if(after>=before)return;
 const dramatic=(before%3===0);
 showHero({
   kicker:'FEED LENNY',
   title:dramatic?'THIS IS A BIG ONE':'INCOMING SNACK',
   sub:'The '+treatName()+' is flying straight to Lenny. Stand by for the chomp.',
   kind:'feed', hold:980, zoom:'superzoom'
 });
 setTimeout(()=>{
   showHero({
     kicker:'CHOMP',
     title:dramatic?'NOW THAT\'S A FEAST':'LENNY LOVED THAT',
     sub:dramatic?'That snack hit like a headline moment. Absolute scenes.':'That treat absolutely made his day.',
     kind:'feed-hit', hold:1450, zoom:'feedImpact'
   });
   stageFlash('feedImpact',950);
 },760);
};
const prevProjectCelebration=projectCelebration;
projectCelebration=function(){
 prevProjectCelebration();
 showHero({
   kicker:'BIG IDEA',
   title:'NOW WE\'RE TALKING',
   sub:'Lenny is right up in your face because that idea is genuinely cool.',
   kind:'project', hold:2200, zoom:'superzoom'
 });
};
const prevRenderJoke=renderJoke;
renderJoke=function(){
 prevRenderJoke();
 if(jokeAnswer){
   setTimeout(()=>showHero({
     kicker:'GIGGLE MODE',
     title:Math.random()<.5?'HE IS LOSING IT':'THAT ONE GOT HIM',
     sub:'Close-up Lenny laugh. Maximum giggle energy.',
     kind:'celebrate', hold:1100, zoom:'faceZoom'
   }),120);
 }
};
const prevFindHeart=findHeart;
findHeart=function(id){
 const had=(progress.hearts||[]).includes(id);
 prevFindHeart(id);
 if(!had){
   setTimeout(()=>showHero({
     kicker:'SECRET HEART',
     title:(progress.hearts.length===6?'MEGA HUG UNLOCKED':'LENNY FOUND YOU'),
     sub:(progress.hearts.length===6?'All six hearts found. Big hug energy.':progress.hearts.length+' of 6 hearts found. Lenny is coming in for a squeeze.'),
     kind:'hug', hold:1600, zoom:'faceZoom'
   }),90);
 }
 };
const prevInterrupt=interrupt;
interrupt=function(){ hideHero(true); clearStageFlags(); return prevInterrupt(); };
document.addEventListener('visibilitychange',()=>{ if(document.hidden) hideHero(true); });
})();

/* Lenny v4: whole-page worlds, surprise plush expressions, touch reactions. */
(() => {
'use strict';
if(window.__lennyV4)return;window.__lennyV4=true;
const stage=document.getElementById('stage');
const main=document.querySelector('main');
const shell=document.querySelector('.shell');
const ribbon=document.createElement('section');
ribbon.id='chapterRibbon';ribbon.className='chapter-ribbon';
ribbon.setAttribute('aria-label','Your adventure world');
ribbon.innerHTML='<div class="chapter-badge" id="chapterBadge" aria-hidden="true"></div><div class="chapter-main"><span class="chapter-top" id="chapterTop"></span><div class="chapter-title" id="chapterTitle"></div><div class="chapter-sub" id="chapterSub"></div></div><div class="chapter-tags" id="chapterTags"></div>';
main.insertBefore(ribbon,shell);
const worlds={
 home:['🏰','Welcome to Lenny’s Island','A new idea is always around the corner.',['Explore','Play']],
 pirate:['🏴‍☠️','The Secret Island','Treasure maps, brave explorers and secret clues.',['ADVENTURE','TEAMWORK']],
 builder:['🧱','The Secret Workshop','Build something amazing using nothing but words.',['BUILD','DESCRIBE']],
 river:['🛟','Rescue River','The water is rising. Your team has a mission.',['RESCUE','LEAD']],
 theatre:['🎭','The Story Theatre','The spotlight is yours. Tell a tale with a twist.',['STORY','SHOWTIME']],
 mystery:['🔎','The Mystery Studio','A tiny clue can change everything.',['IMAGINE','INVESTIGATE']],
 news:['🎙️','Lenny News Network','Go live from the island’s most exciting newsroom.',['ON AIR','ASK']],
 shop:['🛍️','The Five-Coin Shop','Set your prices, open your stall and make a sale.',['DESIGN','COUNT']],
 lab:['⚗️','The Invention Lab','New ideas, messy prototypes and discoveries ahead.',['INVENT','TEST']],
 party:['🎈','Party Planet','You’re running the party. Let the planning begin.',['PLAN','BUDGET']],
 puzzle:['🧩','Fair-Play Park','Find a clever answer that works for everyone.',['LISTEN','SOLVE']],
 welcome:['🤝','Welcome World','Make a new friend feel like part of the team.',['INCLUDE','PLAY']],
 kindness:['💛','Kindness Street','A thoughtful little act can make a big difference.',['NOTICE','HELP']],
 bridge:['🌉','Bridge Bay','Fold, test and make a stronger way across.',['BUILD','IMPROVE']],
 tower:['🏗️','Builder Valley','Every great builder learns from a wobble.',['TRY','RETRY']],
 maze:['🌀','Maze Land','Make a twisty puzzle. Then make it even better.',['DESIGN','TEST']]
};
Object.assign(worlds,{"skyship":["☁️","CLOUD CAPTAIN","PLAN • LISTEN",["NEW QUEST","GO FOR IT"]],"teddy-radio":["📻","T.E.D.D.Y. RESCUE","COMMUNICATE • HELP",["NEW QUEST","GO FOR IT"]],"jungle":["🌿","JUNGLE CROSSING","TEAMWORK • ROUTE",["NEW QUEST","GO FOR IT"]],"signals":["🪧","SIGNAL SQUAD","LEAD • NOTICE",["NEW QUEST","GO FOR IT"]],"weather":["🌦️","WACKY WEATHER","SPEAK • PERFORM",["NEW QUEST","GO FOR IT"]],"puppet":["🧦","PUPPET STUDIO","ASK • LISTEN",["NEW QUEST","GO FOR IT"]],"museum":["🏛️","MINI MUSEUM","EXPLAIN • SHOW",["NEW QUEST","GO FOR IT"]],"sound-story":["🎵","SOUND STORY","IMAGINE • PERFORM",["NEW QUEST","GO FOR IT"]],"lemonade":["🍋","LEMONADE LAB","MAKE • PITCH",["NEW QUEST","GO FOR IT"]],"fixit":["🧸","TOY FIX-IT","LISTEN • DESIGN",["NEW QUEST","GO FOR IT"]],"airline":["✈️","PAPER AIRLINE","TEST • SELL",["NEW QUEST","GO FOR IT"]],"stickers":["🌟","STICKER MARKET","COUNT • CHOOSE",["NEW QUEST","GO FOR IT"]],"post-office":["💌","FRIENDSHIP POST","NOTICE • THANK",["NEW QUEST","GO FOR IT"]],"referee":["🛝","PLAY FAIR PARK","LISTEN • SOLVE",["NEW QUEST","GO FOR IT"]],"helpers":["🦸","HIDDEN HEROES","APPRECIATE • HELP",["NEW QUEST","GO FOR IT"]],"boomerang":["🪃","COMPLIMENT CLUB","KINDNESS • WORDS",["NEW QUEST","GO FOR IT"]],"windcastle":["🏰","WIND CASTLE","TEST • ADAPT",["NEW QUEST","GO FOR IT"]],"doodle":["🖍️","DOODLE QUEST","TRY • RETRY",["NEW QUEST","GO FOR IT"]],"ramp":["🏎️","RAMP RALLY","EXPERIMENT • IMPROVE",["NEW QUEST","GO FOR IT"]],"glider":["🚀","GLIDER QUEST","BUILD • TEST",["NEW QUEST","GO FOR IT"]]});
const reactions={pirate:'curious',builder:'think',river:'proud',theatre:'giggle',mystery:'curious',news:'wow',shop:'proud',lab:'think',party:'giggle',puzzle:'think',welcome:'hug',kindness:'hug',bridge:'think',tower:'proud',maze:'curious',home:'curious'};
const pressable=document.createElement('button');
pressable.type='button';pressable.className='lenny-tap-zone';
pressable.setAttribute('aria-label','Tap Lenny for a funny reaction');
pressable.title='Boop Lenny!';
stage.append(pressable);
let expressionTimer=0,reactLock=0, bubbleTimer=0,lastTaskKey='',lastChapter='',stepCheck='';
const exps=['curious','giggle','proud','wow','think','hug'];
let tapCount=0;
function expression(kind='curious',duration=1300){
 clearTimeout(expressionTimer);stage.dataset.expression=kind;reactLock=Date.now()+duration;
 expressionTimer=setTimeout(()=>{reactLock=0;stage.dataset.expression=stage.dataset.state==='speaking'?'wow':'neutral';},duration);
}
function speechBurst(s,life=1400){
 stage.querySelector('.lenny-speech-burst')?.remove();clearTimeout(bubbleTimer);
 const bubble=document.createElement('div');bubble.className='lenny-speech-burst';bubble.setAttribute('role','status');bubble.textContent=s;stage.append(bubble);
 bubbleTimer=setTimeout(()=>bubble.remove(),life);
}
pressable.addEventListener('click',()=>{
 const lines=['BOOP! My whiskers!','ROARRR! Just kidding!','Hee hee, that tickles!','You found my secret boop button!','I see you, clever explorer!','I am one very silly lion.'];
 tapCount++;
 const kind=exps[tapCount%exps.length];expression(kind,1400);
 speechBurst(lines[(tapCount-1)%lines.length],1550);
 if(navigator.vibrate)try{navigator.vibrate(20)}catch{}
});
const stateWatch=new MutationObserver(()=>{
 if(Date.now()<reactLock)return;
 const state=stage.dataset.state||'';
 if(state==='speaking')stage.dataset.expression='wow';
 else if(state==='listening')stage.dataset.expression='curious';
 else stage.dataset.expression='neutral';
});
stateWatch.observe(stage,{attributes:true,attributeFilter:['data-state']});
function taskId(){
 try{return mode==='journey' && progress.done.length<5?progress.tasks[progress.done.length]:null}catch{return null}
}
function activeWorld(){
 let slug=document.body.dataset.world||'home';
 if(!worlds[slug])slug='home';
 return slug;
}
function viewName(){try{return String(mode||'home')}catch{return 'home'}}
function sync(animate=false){
 const slug=activeWorld();
 const view=viewName();
 document.body.dataset.view=view;
 const data=worlds[slug];
 const active=(view==='journey'&&progress.done.length<5&&taskId()!==null);
 ribbon.hidden=!active;
 if(!active)return;
 const n=progress.done.length;
 const t=quests[progress.tasks[n]];
 const isNew=lastChapter!==slug;
 ribbon.querySelector('#chapterBadge').textContent=data[0];
 ribbon.querySelector('#chapterTop').textContent=`ADVENTURE WORLD ${n+1} OF 5 · ${t[2]} MINUTES`;
 ribbon.querySelector('#chapterTitle').textContent=data[1];
 ribbon.querySelector('#chapterSub').textContent=data[2];
 const tags=ribbon.querySelector('#chapterTags');tags.replaceChildren();
 for(const s of data[3]){let el=document.createElement('span');el.className='chapter-tag';el.textContent=s;tags.append(el)}
 if(isNew){
   lastChapter=slug;
   ribbon.animate([{opacity:.2,transform:'translateY(-8px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'ease-out'});
 }
 const check=`${slug}-${taskPage}`;
 if(animate&&check!==stepCheck){
   stepCheck=check;
   if(taskPage===0){expression(reactions[slug]||'curious',1500)}
   else if(taskPage===1){expression('think',1150)}
   else if(taskPage>=2 && taskPage<7){expression(taskPage%2?'proud':'curious',900)}
 }
}
window.addEventListener('lenny:world',()=>{sync(false)});
const beforeRenderTask=renderTask;
renderTask=function(read=true){
 const r=beforeRenderTask(read);sync(true);return r;
};
const beforeRenderProof=renderProof;
renderProof=function(...args){const r=beforeRenderProof(...args);sync(true);expression('proud',1100);return r;};
const beforeHome=home;
home=function(...args){const r=beforeHome(...args);sync(false);stage.dataset.expression='curious';return r;};
const beforeShowEarnedSnack=showEarnedSnack;
showEarnedSnack=function(...args){const r=beforeShowEarnedSnack(...args);sync(false);expression('proud',2050);return r;};
const beforeFeedLenny=feedLenny;
feedLenny=function(...args){const r=beforeFeedLenny(...args);sync(false);expression('chomp',1550);return r;};
const beforeRenderJoke=renderJoke;
renderJoke=function(...args){const r=beforeRenderJoke(...args);if(jokeAnswer)expression('giggle',1900);return r;};
const beforeFindHeart=findHeart;
findHeart=function(...args){const r=beforeFindHeart(...args);expression('hug',2050);return r;};
const beforeProjectCelebration=projectCelebration;
projectCelebration=function(...args){const r=beforeProjectCelebration(...args);expression('wow',2050);return r;};
const beforeContent=content;
content=function(...args){const r=beforeContent(...args);sync(false);return r;};
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(expressionTimer);clearTimeout(bubbleTimer);stage.querySelector('.lenny-speech-burst')?.remove();stage.dataset.expression='neutral';}});
stage.dataset.expression='curious';sync(false);
})();

/* Lenny v5 — tactile mobile boop: obvious reaction, without losing game state. */
(() => {
  'use strict';
  if (window.__lennyMobileV5) return;
  window.__lennyMobileV5 = true;
  const stage = document.getElementById('stage');
  const boop = stage?.querySelector('.lenny-tap-zone');
  if (!stage || !boop) return;
  let timer;
  boop.addEventListener('click', () => {
    if (!window.matchMedia('(max-width:720px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    clearTimeout(timer);
    delete stage.dataset.mobileBoop;
    // Reset the CSS animation so consecutive taps are independently playful.
    void stage.offsetHeight;
    stage.dataset.mobileBoop = 'true';
    timer = setTimeout(() => { delete stage.dataset.mobileBoop; }, 880);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(timer); delete stage.dataset.mobileBoop; }
  });
})();

/* Keep Lenny on-screen after a navigation action on short mobile displays. */
(() => {
'use strict';
if (window.__lennyMobileScrollV5) return;
window.__lennyMobileScrollV5 = true;
const resetOnMobile = () => {
  if (window.matchMedia('(max-width:720px)').matches) {
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }
};
const baseMobileHome = home;
home = function(...args) { const result = baseMobileHome(...args); resetOnMobile(); return result; };
const baseMobileJourney = journey;
journey = function(...args) { const result = baseMobileJourney(...args); resetOnMobile(); return result; };
const baseMobileTalk = talkStart;
talkStart = function(...args) { const result = baseMobileTalk(...args); resetOnMobile(); return result; };
const baseMobileJoke = newJoke;
newJoke = function(...args) { const result = baseMobileJoke(...args); resetOnMobile(); return result; };
const baseMobileProject = startProject;
startProject = function(...args) { const result = baseMobileProject(...args); resetOnMobile(); return result; };
const baseMobileEnterName = enterName;
enterName = function(...args) { const result = baseMobileEnterName(...args); resetOnMobile(); return result; };
})();

/* Lenny v6 — Adventure Arcade, 52 jokes, kid-led telling practice and giant mission celebrations. */
(() => {
'use strict';
if (window.__lennyV6) return; window.__lennyV6 = true;
const stage = document.getElementById('stage');
const contentEl = document.getElementById('content');
const reduced = window.matchMedia('(prefers-reduced-motion:reduce)');
const Recognition2 = window.SpeechRecognition || window.webkitSpeechRecognition;
const artwork = document.querySelector('use[href="#lion"]') ? document.getElementById('lion')?.getAttribute('href') : null;
const lionPortrait = artwork || 'assets/lenny-lion.png';
const baseScenes = ['pirate','builder','river','theatre','mystery','news','shop','lab','party','puzzle','welcome','kindness','bridge','tower','maze'];
const additionalScenes = ['skyship','teddy-radio','jungle','signals','weather','puppet','museum','sound-story','lemonade','fixit','airline','stickers','post-office','referee','helpers','boomerang','windcastle','doodle','ramp','glider'];
const sceneNames = [...baseScenes,...additionalScenes];
const allPalette = ['#e6a960','#779df2','#47b5b5','#a56bba','#7062b7','#6697df','#e69092','#71cbbb','#d889bf','#90c983','#80c49a','#e5a0b2','#6ab5d4','#8dc4b6','#ac90de',
 '#6659c0','#228a9a','#2f9a68','#4769a0','#438bd0','#c45d99','#a082c7','#6d56b3','#efad52','#3ca7a2','#4e92d3','#db76b0','#ba738b','#5caa8e','#985bbc','#d07c98','#658fc1','#ab61c8','#d27d63','#567db7'];
const sceneArt = slug => 'assets/worlds/'+slug+'.svg';
const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const scrollHome = () => { if (window.matchMedia('(max-width:720px)').matches) requestAnimationFrame(()=>window.scrollTo(0,0)); };
let arcadeCategory=0, bonusId=-1, bonusStep=0, jokePractice=-1, jokeListening=null, jokeListeningToken=0, lastReward=null;
let victoryFocus=null, winning=false, winningTimer=0;
const safeSave = () => { try { save(); } catch {} };
function stopCapture(){
 jokeListeningToken++;
 const rec=jokeListening; jokeListening=null;
 if(rec){try{rec.onresult=null;rec.onend=null;rec.onerror=null;rec.abort();}catch{}}
}
function captureSpeech(statusId, buttonId){
 const target=document.getElementById(statusId),control=document.getElementById(buttonId);
 if(!target||!control)return;
 if(!Recognition2){target.textContent='Your device cannot listen here. Tell a grown-up (or a teddy) out loud — that counts!';return;}
 if(jokeListening){stopCapture();control.textContent='🎙️ Try the microphone';target.textContent='Stopped. Tap when you want another go.';return;}
 cancelMic();stopVoice();
 const token=++jokeListeningToken, v=viewToken;
 try {
   const rec=new Recognition2();jokeListening=rec;rec.lang='en-AU';rec.interimResults=false;rec.continuous=false;rec.maxAlternatives=1;
   target.textContent='Listening… Speak clearly, then leave a little pause.';
   control.textContent='■ Stop listening';
   let heard='',error='';
   rec.onresult=e=>{heard=e.results?.[0]?.[0]?.transcript||''};
   rec.onerror=e=>{error=(e.error==='not-allowed'||e.error==='service-not-allowed')?'Ask a grown-up to allow the microphone, or just practise out loud.':'I didn’t catch that. That’s okay — try again!'};
   rec.onend=()=>{
     if(jokeListening!==rec||token!==jokeListeningToken||v!==viewToken)return;
     jokeListening=null;control.textContent='🎙️ Try the microphone';
     if(heard){target.textContent='I heard: “'+heard+'” 🎉 Nice speaking! Try telling it with a big smile.';}
     else target.textContent=error||'No words caught this time. You can always say it aloud and tap “I did it!”';
   };
   rec.start();
 } catch {jokeListening=null;control.textContent='🎙️ Try the microphone';target.textContent='The microphone is unavailable here. Speaking out loud still counts!';}
}
function updateWorld(id){
 const slug=sceneNames[id]||'home';
 document.body.dataset.world=slug;
 const world=document.getElementById('worldScene');
 if(world) world.style.backgroundImage='url("'+sceneArt(slug)+'")';
 const name=quests[id][1];
 const tag=document.querySelector('.world-tag span');
 if(tag)tag.textContent='✨ '+name;
 window.dispatchEvent(new Event('lenny:world'));
 const ribbon=document.getElementById('chapterRibbon');
 if(ribbon){
   ribbon.hidden=false;
   const chapter=quests[id][0];
   ribbon.querySelector('#chapterTop').textContent='BONUS ADVENTURE · '+quests[id][2]+' MINUTES';
   ribbon.querySelector('#chapterBadge').textContent=categories[chapter].icon;
   ribbon.querySelector('#chapterTitle').textContent=name;
   ribbon.querySelector('#chapterSub').textContent=quests[id][6];
   const tags=ribbon.querySelector('#chapterTags');
   tags.replaceChildren();
   for(const txt of ['MISSION '+(id+1),'YOU CHOOSE']){const n=document.createElement('span');n.className='chapter-tag';n.textContent=txt;tags.append(n);}
 }
}

/* No automatic assessment, transcription storage or background recording. Speech recognition is opt-in. */
const oldInterrupt=interrupt;
interrupt=function(...args){stopCapture();hideVictory();return oldInterrupt(...args)};

function makeChoice(label,fn,cls='big'){
 const b=document.createElement('button');b.type='button';b.className=cls;b.textContent=label;b.addEventListener('click',fn);return b;
}
function onHome(){
 if(mode!=='home'||!playerName)return;
 const choices=document.getElementById('choices');
 if(!choices||document.getElementById('arcadeHomeChoice'))return;
 const b=makeChoice('',arcade,'choice arcade-home-choice');b.id='arcadeHomeChoice';
 b.innerHTML='<span class="icon" aria-hidden="true">🧭</span><span><strong>Adventure Arcade</strong><small>Pick from '+quests.length+' different mini missions!</small></span><span class="arrow" aria-hidden="true">→</span>';
 choices.insertBefore(b,choices.children[1]||null);
 const small=document.querySelector('.home-progress small');
 if(small){small.textContent+=' · 🎖️ '+(progress.arcadeDone||[]).length+' arcade quests tried';}
}
const oldHome=home;
home=function(...args){const result=oldHome(...args);onHome();return result;};

function arcade(){
 interrupt();mode='arcade';renderArcade();scrollHome();
}
function renderArcade(){
 content('<p class="eyebrow">Your adventure passport</p><h1>Choose your next quest!</h1><p class="sub">'+quests.length+' very different missions. Pick a skill, or let Lenny surprise you.</p><div class="arcade-stats">🏅 <strong>'+(progress.arcadeDone||[]).length+' / '+quests.length+'</strong> adventures tried. Replay any one whenever you like.</div><div class="arcade-tabs" id="arcadeTabs" aria-label="Choose an adventure type"></div><div class="arcade-list" id="arcadeList"></div><div class="secondary" id="arcadeMore"></div>', 'Choose an adventure, explorer!',false);
 const tabs=document.getElementById('arcadeTabs');
 categories.forEach((cat,c)=>{
  const tab=makeChoice(cat.icon+' '+cat.name,()=>{arcadeCategory=c;renderArcade();},'arcade-tab'+(arcadeCategory===c?' active':''));
  tab.setAttribute('aria-pressed',String(arcadeCategory===c));tabs.append(tab);
 });
 const list=document.getElementById('arcadeList');
 quests.forEach((q,id)=>{
   if(q[0]!==arcadeCategory)return;
   const done=(progress.arcadeDone||[]).includes(id);
   const tile=makeChoice('',()=>startBonus(id),'arcade-tile');
   tile.style.setProperty('--tile',allPalette[id]||'#7f7fd0');
   tile.innerHTML='<span class="arcade-tile-icon">'+categories[q[0]].icon+'</span><span class="arcade-tile-content"><strong>'+escapeHtml(q[1])+'</strong><small>'+escapeHtml(q[6])+'</small><em>'+(done?'✓ Tried before · ':'')+q[2]+' min · '+(q[3]==='pair'?'With a buddy':'Solo-friendly')+'</em></span><span class="arcade-tile-arrow">→</span>';
   list.append(tile);
 });
 const surprise=makeChoice('🎲 Surprise me!',()=>{
    const notPlayed=quests.map((q,id)=>id).filter(id=>!(progress.arcadeDone||[]).includes(id));
    const pool=notPlayed.length?notPlayed:quests.map((q,id)=>id);
    startBonus(pool[Math.floor(Math.random()*pool.length)]);
 },'big pink');
 const back=makeChoice('← Back to Lenny',()=>home(false),'small');
 document.getElementById('arcadeMore').append(surprise,back);
}
function startBonus(id){
 if(!quests[id])return;
 interrupt();mode='bonus';bonusId=id;bonusStep=0;renderBonus();scrollHome();
}
function renderBonus(){
 const q=quests[bonusId];if(!q){arcade();return;}
 const numSteps=q[4].length;
 const isProof=bonusStep===numSteps+2;
 const heading=bonusStep===0?'Your mission':bonusStep===1?'Get ready':isProof?'Show your thinking!':'Your next move';
 const desc=bonusStep===0?q[6]:bonusStep===1?supplies[bonusId]:isProof?proofQuestions[bonusId]:q[4][bonusStep-2];
 const badge=bonusStep===0?categories[q[0]].icon:bonusStep===1?'🎒':isProof?'🌟':bonusStep===numSteps+1?'🏁':'✨';
 const stepCount=numSteps+3;
 const pips=Array.from({length:stepCount},(_,i)=>'<span class="'+(i<bonusStep?'complete':i===bonusStep?'active':'')+'"></span>').join('');
 const subtitle=isProof?q[5]:bonusStep===0?'You are in charge of this mission!':bonusStep===1?'Everything you need is nearby.':bonusStep>=2?'Give this step a go — no rushing.':'';
 const label=bonusStep===0?'LET’S GO':bonusStep===1?'GET SET':isProof?'YOU DID IT':`STEP ${bonusStep-1} OF ${numSteps}`;
 content('<p class="eyebrow">Adventure Arcade · '+escapeHtml(categories[q[0]].name)+'</p><div class="mission-progress bonus-pips">'+pips+'</div><div class="bonus-step-heading">'+escapeHtml(label)+'</div><h2>'+escapeHtml(q[1])+'</h2><div class="activity-icon" aria-hidden="true">'+badge+'</div><div class="bubble"><p>'+escapeHtml(desc)+'</p><p class="hint">'+escapeHtml(subtitle)+'</p></div><div class="bonus-actions" id="bonusActions"></div><div class="secondary" id="bonusBack"></div>',String(desc)+' '+String(subtitle),true);
 updateWorld(bonusId);
 const actions=document.getElementById('bonusActions');
 if(isProof){
   actions.append(makeChoice('I showed it! 🏅',()=>completeBonus(),'big green'));
   actions.append(makeChoice('🎙️ Tell Lenny about it',()=>{
     const feedback=document.getElementById('bonusMicFeedback');
     if(feedback)captureSpeech('bonusMicFeedback','bonusMicBtn');
   },'big bonus-mic-trigger'));
   actions.lastChild.id='bonusMicBtn';
   const feedback=document.createElement('p');feedback.id='bonusMicFeedback';feedback.className='voice-practice-feedback';feedback.setAttribute('aria-live','polite');feedback.textContent='Optional: tell Lenny your idea out loud. You can also show someone nearby.';
   actions.append(feedback);
 } else {
   actions.append(makeChoice(bonusStep===0?'Let’s go →':bonusStep===1?'Start the mission →':bonusStep===numSteps+1?'Show what I made →':'Next step →',()=>{interrupt();mode='bonus';bonusStep++;renderBonus()},'big'));
 }
 document.getElementById('bonusBack').append(makeChoice(bonusStep>0?'← Previous step':'← All adventures',()=>{
  if(bonusStep>0){interrupt();mode='bonus';bonusStep--;renderBonus();}else arcade();
 },'small'));
 if(bonusStep>0)document.getElementById('bonusBack').append(makeChoice('🧭 Different mission',()=>arcade(),'small'));
}
function completeBonus(){
 if(mode!=='bonus'||bonusId<0||bonusStep!==quests[bonusId][4].length+2)return;
 const id=bonusId;
 if(!Array.isArray(progress.arcadeDone))progress.arcadeDone=[];
 if(!progress.arcadeDone.includes(id))progress.arcadeDone.push(id);
 lastReward={name:quests[id][1],category:quests[id][0]};
 earnSnack();safeSave();showEarnedSnack('home');
}

/* Joke club: kid gets to practise the setup, the punchline, then the whole joke. */
newJoke=function(){
 interrupt();mode='joke';jokeAnswer=true;jokePractice=-1;
 const history=progress.jokeHistory||[];
 const all=jokes.map((_,id)=>id);
 const unseen=all.filter(id=>!history.includes(id));
 if(!unseen.length){progress.jokeHistory=[];}
 const pool=unseen.length?unseen:all;
 jokeIndex=pool[Math.floor(Math.random()*pool.length)];
 progress.jokeHistory.push(jokeIndex);progress.jokeHistory=progress.jokeHistory.slice(-jokes.length);safeSave();
 renderJoke();scrollHome();
};
renderJoke=function(){
 if(jokeIndex<0)jokeIndex=0;
 const [question,answer]=jokes[jokeIndex];
 // Never hide the punchline. The original Giggle Club worked because kids
 // could hear the entire joke in one go and then try telling it themselves.
 jokeAnswer=true;
 const rehearsing=jokePractice>=0;
 const completeScript=question+' '+answer;
 const script=rehearsing?(jokePractice===0?question:jokePractice===1?answer:question+' … '+answer):completeScript;
 const stepText=['1. Ask the question','2. Say the punchline','3. Tell the whole joke'];
 const stepHint=['Say the question slowly. Let your audience think for a second.',
 'Try the funny ending with a big smile or a silly voice!',
 'Ask the question, pause, and deliver the punchline. You’re the comedian!'];
 const inside=rehearsing?
   '<div class="joke-steps">'+stepText.map((s,i)=>'<span class="'+(i===jokePractice?'selected':i<jokePractice?'past':'')+'">'+(i<jokePractice?'✓ ': '')+s+'</span>').join('')+'</div><p class="joke-coach">'+escapeHtml(stepHint[jokePractice])+'</p><div class="joke-spotlight"><span class="joke-tag">'+(jokePractice===0?'QUESTION':jokePractice===1?'PUNCHLINE':'THE WHOLE JOKE')+'</span><p>'+escapeHtml(script)+'</p></div>':
   '<div class="joke-spotlight"><span class="joke-tag">THE QUESTION</span><p>'+escapeHtml(question)+'</p></div><div class="joke-punchline"><span class="joke-tag">THE PUNCHLINE 😂</span><p>'+escapeHtml(answer)+'</p></div><p class="joke-coach">🎤 Your turn! Can you make someone laugh telling it yourself?</p>';
 const count=(progress.jokesPractised||[]).length;
 // The punchline-practice step leaves the audio off, giving the child room
 // to speak. Every automatic joke playback uses an existing fal recording.
 const shouldRead=!(rehearsing&&jokePractice===1);
 content('<p class="eyebrow">Lenny’s Giggle Club</p><h1>'+(rehearsing?'The stage is yours!':'That’s a good one!')+'</h1><p class="sub">🤭 '+jokes.length+' jokes · '+count+' Giggle Stars earned</p>'+inside+'<div class="joke-buttons" id="jokeButtons"></div><p class="voice-practice-feedback" id="jokeFeedback" aria-live="polite"></p>',script,shouldRead);
 const actions=document.getElementById('jokeButtons');
 if(!rehearsing){
   actions.append(makeChoice('🎤 My turn! Tell the whole joke',()=>{interrupt();mode='joke';jokeAnswer=true;jokePractice=2;renderJoke();},'big pink'));
   actions.append(makeChoice('🪜 Practise it step by step',()=>{interrupt();mode='joke';jokeAnswer=true;jokePractice=0;renderJoke();},'small'));
   actions.append(makeChoice('🤭 Another joke',()=>newJoke(),'small'));
 }else{
   const speak=makeChoice(jokePractice===1?'🔊 Hear Lenny tell the full joke':'🔊 Hear Lenny again',()=>{
     if(muted){muted=false;updateMute();}
     say(jokePractice===1?completeScript:script);
   },'small');
   const mic=makeChoice('🎙️ Try the microphone',()=>captureSpeech('jokeFeedback','jokeMicBtn'),'small');mic.id='jokeMicBtn';
   actions.append(speak,mic);
   actions.append(makeChoice(jokePractice===2?'🌟 I told the whole joke!': 'I said it! Next →',()=>{
     interrupt();mode='joke';jokeAnswer=true;
     if(jokePractice<2){jokePractice++;renderJoke();}
     else completeJokePractice();
   },'big pink'));
   actions.append(makeChoice('← Back to the joke',()=>{
     interrupt();mode='joke';jokeAnswer=true;
     if(jokePractice===2){jokePractice=-1;}else if(jokePractice===1){jokePractice=0;}else{jokePractice=-1;}
     renderJoke();
   },'small'));
   document.getElementById('jokeFeedback').textContent='No microphone needed. Tell a person, a teddy, or the room — that counts!';
 }
}
function completeJokePractice(){
 if(jokeIndex<0)return;
 if(!Array.isArray(progress.jokesPractised))progress.jokesPractised=[];
 const first=!progress.jokesPractised.includes(jokeIndex);
 if(first)progress.jokesPractised.push(jokeIndex);
 safeSave();
 stage.dataset.expression='giggle';
 launchVictory({kind:'joke',name:'You told the whole joke!',message:first?'Your very own GIGGLE STAR is earned. What a brave comedian!':'Encore! Telling jokes gets easier every time.',primary:'🤭 Tell another joke',secondary:'🎤 Practise this joke again',onPrimary:()=>newJoke(),onSecondary:()=>{interrupt();mode='joke';jokeAnswer=true;jokePractice=0;renderJoke();}});
}

/* Supersized, interactive celebrations: a reward moment, not an overlay that instantly disappears. */
const victory=document.createElement('div');victory.id='lennyVictory';victory.className='lenny-victory';victory.hidden=true;
victory.setAttribute('role','dialog');victory.setAttribute('aria-modal','true');victory.setAttribute('aria-labelledby','victoryTitle');
victory.innerHTML='<div class="victory-beams" aria-hidden="true"></div><div class="victory-stars" id="victoryStars" aria-hidden="true"></div><div class="victory-panel"><button class="victory-close" id="victoryClose" aria-label="Save celebration and close">×</button><div class="victory-ribbon" id="victoryRibbon">MISSION COMPLETE!</div><div class="victory-visual"><div class="victory-rings" aria-hidden="true"></div><img class="victory-lenny" id="victoryLenny" alt="Lenny celebrating" src="'+lionPortrait+'"><span class="victory-treat" id="victoryTreat" aria-hidden="true">🍖</span><span class="victory-sparkle one" aria-hidden="true">✦</span><span class="victory-sparkle two" aria-hidden="true">⭐</span><span class="victory-sparkle three" aria-hidden="true">💛</span></div><div class="victory-text"><h2 id="victoryTitle">YOU DID IT!</h2><p class="victory-message" id="victoryMessage"></p><div class="victory-buttons"><button class="victory-primary" id="victoryPrimary">🍖 FEED LENNY!</button><button class="victory-secondary" id="victorySecondary">Save my treat for later</button></div></div></div>';
document.body.append(victory);
const themes=['disco','superstar','rocket','roar','confetti','sparkle'];
const titles=['LENNY HAS GONE BONKERS!','THAT WAS EPIC!','WHAT A SUPERSTAR!','THE CROWD GOES WILD!','BIG LION ENERGY!','YOU ABSOLUTELY NAILED IT!'];
let onVictoryPrimary=null,onVictorySecondary=null;
function victoryTone(){
 if(muted)return;
 try {
   const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
   const ac=new AC();
   if(ac.state==='suspended')ac.resume().catch(()=>{});
   const notes=[523.25,659.25,783.99,1046.50];
   const now=ac.currentTime;
   notes.forEach((f,i)=>{
     const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.setValueAtTime(f,now+i*.11);
     g.gain.setValueAtTime(.0001,now+i*.11);g.gain.exponentialRampToValueAtTime(.075,now+i*.11+.015);g.gain.exponentialRampToValueAtTime(.0001,now+i*.11+.34);
     o.connect(g).connect(ac.destination);o.start(now+i*.11);o.stop(now+i*.11+.36);
   });
   setTimeout(()=>ac.close().catch(()=>{}),1800);
 }catch{}
}
function hideVictory(){
 winning=false;clearTimeout(winningTimer);
 if(victory.hidden)return;
 victory.hidden=true;victory.classList.remove('on');document.body.classList.remove('victory-open');
 if(victoryFocus&&victoryFocus.isConnected)try{victoryFocus.focus({preventScroll:true})}catch{}
}
function launchVictory({kind='mission',name='',message='',primary='🍖 FEED LENNY!',secondary='Save the treat for later',onPrimary=()=>{},onSecondary=()=>{}}={}){
 if(winning)hideVictory();
 document.querySelector('.hero-overlay')?.classList.remove('show');document.body.classList.remove('hero-open');
 const hero=document.querySelector('.hero-overlay');if(hero)hero.hidden=true;
 victoryFocus=document.activeElement;
 victory.dataset.kind=kind;
 const n=(progress.done.length+(progress.arcadeDone||[]).length+(progress.jokesPractised||[]).length)%themes.length;
 victory.dataset.theme=kind==='joke'?'disco':themes[n];
 victory.querySelector('#victoryRibbon').textContent=kind==='joke'?'GIGGLE STAR EARNED 🎤':'🎉 MISSION COMPLETE! 🎉';
 victory.querySelector('#victoryTitle').textContent=kind==='joke'?'A NEW COMEDY STAR!':titles[n];
 victory.querySelector('#victoryMessage').textContent=kind==='joke'?message:(name+' — '+(message||'You did it, and Lenny is ROARING with pride!'));
 victory.querySelector('#victoryTreat').textContent=kind==='joke'?'🌟':'🍖';
 victory.querySelector('#victoryPrimary').textContent=primary;
 victory.querySelector('#victorySecondary').textContent=secondary;
 onVictoryPrimary=onPrimary;onVictorySecondary=onSecondary;
 const stars=victory.querySelector('#victoryStars');stars.replaceChildren();
 const symbols=kind==='joke'?['🌟','😂','🎤','💛','✨']:['⭐','🌈','✨','🎊','💛','🎉','🌟','🍖'];
 const total=reduced.matches?16:60;
 for(let i=0;i<total;i++){
   const el=document.createElement('span');el.className='victory-star';el.textContent=symbols[i%symbols.length];
   el.style.setProperty('--x',(Math.random()*100).toFixed(1)+'%');
   el.style.setProperty('--d',(Math.random()*1.7).toFixed(2)+'s');
   el.style.setProperty('--speed',(2.5+Math.random()*2.4).toFixed(2)+'s');
   el.style.setProperty('--spin',(Math.random()*520-260).toFixed(0)+'deg');
   stars.append(el);
 }
 victory.hidden=false;winning=true;document.body.classList.add('victory-open');
 requestAnimationFrame(()=>victory.classList.add('on'));
 victory.querySelector('#victoryPrimary').focus({preventScroll:true});
 stage.dataset.expression=kind==='joke'?'giggle':'wow';
 victoryTone();
}
function victoryFinish(which){
 const cb=which==='primary'?onVictoryPrimary:onVictorySecondary;
 hideVictory();if(cb)cb();
}
victory.querySelector('#victoryPrimary').addEventListener('click',()=>victoryFinish('primary'));
victory.querySelector('#victorySecondary').addEventListener('click',()=>victoryFinish('secondary'));
victory.querySelector('#victoryClose').addEventListener('click',()=>victoryFinish('secondary'));
document.addEventListener('keydown',e=>{
 if(victory.hidden)return;
 if(e.key==='Escape'){e.preventDefault();victoryFinish('secondary')}
 if(e.key==='Tab'){
   const focused=[victory.querySelector('#victoryPrimary'),victory.querySelector('#victorySecondary'),victory.querySelector('#victoryClose')];
   const at=focused.indexOf(document.activeElement);if(at<0)return;
   if(e.shiftKey&&at===0){e.preventDefault();focused[2].focus()}
   if(!e.shiftKey&&at===2){e.preventDefault();focused[0].focus()}
 }
});
const olderReward=showEarnedSnack;
showEarnedSnack=function(destination){
 const newlyEarned=!!lastReward||destination!=='home';
 const latest=lastReward || (destination==='project'?{name:'Your big idea'}: {name:quests[progress.tasks[Math.max(0,Math.min(4,progress.done.length-1))]]?.[1]||'Your awesome mission'});
 lastReward=null;
 olderReward(destination);
 if(!newlyEarned)return;
 launchVictory({kind:'mission',name:latest.name,message:'That took imagination, effort and a proper go! Lenny has a delicious reward for you.',
   onPrimary:()=>{const action=document.querySelector('#feedActions button');if(action)action.click();else home(true);},
   onSecondary:()=>{const action=document.querySelector('#feedLater button');if(action)action.click();else home(true);}
 });
};
// After the victory, the original feeding animation, secret hearts and saved treats remain unchanged.
const oldFinish=finishJourney;
finishJourney=function(...args){const result=oldFinish(...args);const actions=document.getElementById('finishButtons');if(actions)actions.append(makeChoice('🧭 Explore more missions',()=>arcade(),'big pink'));return result;};
// Resetting progress deliberately continues to clear only the current player. Their legacy data stays isolated by nickname.
const originalReset=get('confirmReset').onclick;
get('confirmReset').onclick=function(...args){const r=originalReset?.apply(this,args);onHome();return r;};
// initial screen was created before this enhancer loaded.
onHome();
})();

