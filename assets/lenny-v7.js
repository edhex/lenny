/* Lenny's Little Adventure v7: three clear activities, 48 boredom-busters and local audio */
(() => {
'use strict';
if (window.__LENNY_V7__) return;
window.__LENNY_V7__ = true;
const ideas = [["The Sock Puppet News","🎭","Make a sock puppet tell breaking news about your bedroom.","Give it a dramatic reporter voice.","indoor",3],["Floor Is Lava: Toy Edition","🌋","Make a safe route for a toy across three cushions, with your feet on the floor.","Pretend the toy has ridiculously tiny lava-proof boots.","indoor",4],["Rainbow Treasure Hunt","🌈","Find something red, blue, green and yellow. Bring them together.","Line them up like a rainbow museum.","indoor",3],["Robot Walk Contest","🤖","Invent three silly robot movements and teach them to someone.","Add a robot power-down sound.","movement",3],["The Invisible Restaurant","🍽️","Set up a pretend café and serve your favourite imaginary dish.","Describe the world’s most disgusting dessert.","pretend",5],["Animal Orchestra","🦁","Make four different animal sounds, then turn them into a song.","Ask someone to conduct the orchestra.","movement",3],["Tiny Detective","🔎","Pick an everyday object and find five tiny details you never noticed.","Present your findings like a detective.","indoor",4],["Cloud Shape Safari","☁️","Look out a window and see what shapes the clouds remind you of.","Make up a name for the cloud creature.","outdoors",3],["Cushion Castle","🏰","Build a little fort with cushions or a sheet, asking first.","Give your castle a silly royal name.","indoor",6],["Backwards Fashion Show","🧦","Invent a funny outfit using safe clothes and accessories.","Walk the pretend runway in slow motion.","pretend",4],["Secret Handshake","🤝","Invent a four-move secret handshake with a friend or grown-up.","Finish with a lion roar.","movement",4],["The Wobbly Statue","🗿","Strike a funny statue pose while someone counts to ten.","Make your statue a dancing banana.","movement",2],["Shadow Monster","👤","Find a shadow on a wall and turn it into a pretend creature.","Give the creature a very silly name.","indoor",3],["One-Minute Museum","🏛️","Choose three tiny objects and give a tour of your miniature museum.","Make the smallest thing the most important exhibit.","pretend",5],["The Great Toy Parade","🥁","Line up your toys for a parade and invent a marching chant.","Give each toy an outrageous title.","indoor",4],["Paper Aeroplane Lab","✈️","Fold a paper plane with grown-up help, then safely test it in an open space.","Give it a call sign and announce take-off.","indoor",5],["Dinosaur Footprints","🦖","Walk across the room like a tiny dinosaur, then a giant one.","Finish with your quietest dinosaur roar.","movement",3],["Kitchen Band","🥄","Ask first, then use two safe kitchen items to make a gentle rhythm.","Perform a three-beat drum solo.","indoor",4],["Magic Door","🚪","Pretend a door leads to a strange world. Describe what is on the other side.","Tell Lenny which creature greets you.","pretend",3],["Alphabet Explorer","🔤","Pick a letter and find three safe objects beginning with it.","Make a ridiculous sentence using the letter.","indoor",3],["The Upside-Down Story","📖","Tell a story where the ending happens first.","Try to explain how everyone got there.","pretend",4],["Silly Olympics","🏅","Choose three safe standing challenges: one-leg balance, slow walk and funny face.","Announce the winner in a dramatic voice.","movement",5],["Leaf Detective","🍃","With a grown-up, find two fallen leaves outdoors and compare them.","Give each leaf a superhero name.","outdoors",5],["Weather Reporter","🌦️","Look outside and give a dramatic weather forecast.","Forecast a chance of raining marshmallows.","outdoors",3],["Toy Interview","🎤","Ask a toy three questions and answer in its funny voice.","Ask about its most embarrassing moment.","pretend",4],["Secret Code","🔐","Invent three picture symbols for a secret message.","Ask someone to decode your drawings.","indoor",5],["Colour Switch","🎨","Draw an ordinary thing in completely silly colours.","Make a purple lion or a green sun.","indoor",5],["Slow-Motion Superhero","🦸","Pretend to save a toy in ultra-slow motion, without jumping or climbing.","Add your own heroic sound effect.","movement",3],["The Tiny Shop","🛍️","Set up three toys for sale using pretend paper coins.","Sell one with the silliest advert you can invent.","pretend",6],["The Kindness Ninja","💛","Find one safe, small job you can do to surprise someone kindly.","Tell them their secret helper has struck.","indoor",5],["Guess That Sound","👂","Make three gentle sounds using safe household objects.","Ask a friend to guess each without looking.","indoor",4],["Mirror Monster","🪞","Stand in front of a mirror and practise five ridiculous expressions.","Invent a monster who makes only nice faces.","movement",3],["The Paper Crown","👑","Make a pretend crown from paper and decorate it with crayons.","Declare one hilarious law for your kingdom.","indoor",6],["Backyard Explorer","🧭","With permission, explore a safe outdoor area and find three different textures.","Describe them like a nature documentary.","outdoors",5],["Rock Star Concert","🎸","Invent a ten-second song about your favourite food.","Add a huge imaginary guitar solo.","movement",3],["The Impossible Sandwich","🥪","Draw the silliest pretend sandwich ever made.","Give it five impossible ingredients.","pretend",4],["The Shape Challenge","🔺","Find one circle, one square and one triangle around you.","Invent a creature made of these shapes.","indoor",4],["Mini Post Office","💌","Draw a little postcard for someone at home.","Add a secret cartoon stamp.","indoor",5],["Balloon Without a Balloon","🎈","Pretend you are a balloon slowly floating up, then gently sinking down.","Become a grumpy balloon with a squeaky voice.","movement",2],["The Super Quiet Mission","🤫","Stay very still and listen. Name five sounds around you.","Pretend to be a sound detective.","indoor",3],["Toy Island Map","🗺️","Draw an island with a beach, mountain and silly treasure.","Name the treasure something surprising.","indoor",6],["Five Silly Walks","🚶","Make up five funny ways to walk across a clear, safe floor.","Choose your champion walk.","movement",3],["Pirate Name Machine","🏴‍☠️","Invent three ridiculous pirate names and choose your favourite.","Introduce yourself with an enormous pirate voice.","pretend",3],["The Upside-Down Zoo","🐘","Create a zoo with imaginary animals that each do something unusual.","Explain the rules to a new zookeeper.","pretend",5],["The Button Factory","🔘","Draw a machine with three buttons and invent what each does.","Give one button a hilariously useless power.","indoor",5],["Secret Agent Freeze","🕵️","Sneak like a secret agent, then freeze when someone says “Lenny!”","Change your secret agent disguise with a funny pose.","movement",4],["The Gigantic Tiny Story","🐜","Tell a story about a tiny ant that thinks it is a giant.","Give the ant a booming lion voice.","pretend",4],["The Compliment Rocket","🚀","Think of three nice things you appreciate about someone.","Deliver one like an astronaut on a mission.","indoor",3]];
const voiceKeys = new Set(["mission-00","mission-01","mission-02","mission-03","mission-04","mission-05","mission-06","mission-07","mission-08","mission-09","mission-10","mission-11","mission-12","mission-13","mission-14","mission-15","mission-16","mission-17","mission-18","mission-19","mission-20","mission-21","mission-22","mission-23","mission-24","mission-25","mission-26","mission-27","mission-28","mission-29","mission-30","mission-31","mission-32","mission-33","mission-34","jokeq-00","jokef-00","jokeq-01","jokef-01","jokeq-02","jokef-02","jokeq-03","jokef-03","jokeq-04","jokef-04","jokeq-05","jokef-05","jokeq-06","jokef-06","jokeq-07","jokef-07","jokeq-08","jokef-08","jokeq-09","jokef-09","jokeq-10","jokef-10","jokeq-11","jokef-11","jokeq-12","jokef-12","jokeq-13","jokef-13","jokeq-14","jokef-14","jokeq-15","jokef-15","jokeq-16","jokef-16","jokeq-17","jokef-17","jokeq-18","jokef-18","jokeq-19","jokef-19","jokeq-20","jokef-20","jokeq-21","jokef-21","jokeq-22","jokef-22","jokeq-23","jokef-23","jokeq-24","jokef-24","jokeq-25","jokef-25","jokeq-26","jokef-26","jokeq-27","jokef-27","jokeq-28","jokef-28","jokeq-29","jokef-29","jokeq-30","jokef-30","jokeq-31","jokef-31","jokeq-32","jokef-32","jokeq-33","jokef-33","jokeq-34","jokef-34","jokeq-35","jokef-35","jokeq-36","jokef-36","jokeq-37","jokef-37","jokeq-38","jokef-38","jokeq-39","jokef-39","jokeq-40","jokef-40","jokeq-41","jokef-41","jokeq-42","jokef-42","jokeq-43","jokef-43","jokeq-44","jokef-44","jokeq-45","jokef-45","jokeq-46","jokef-46","jokeq-47","jokef-47","jokeq-48","jokef-48","jokeq-49","jokef-49","jokeq-50","jokef-50","jokeq-51","jokef-51","idea-00","idea-01","idea-02","idea-03","idea-04","idea-05","idea-06","idea-07","idea-08","idea-09","idea-10","idea-11","idea-12","idea-13","idea-14","idea-15","idea-16","idea-17","idea-18","idea-19","idea-20","idea-21","idea-22","idea-23","idea-24","idea-25","idea-26","idea-27","idea-28","idea-29","idea-30","idea-31","idea-32","idea-33","idea-34","idea-35","idea-36","idea-37","idea-38","idea-39","idea-40","idea-41","idea-42","idea-43","idea-44","idea-45","idea-46","idea-47","cheer-00","cheer-01","cheer-02","cheer-03","cheer-04","cheer-05","cheer-06","cheer-07","cheer-08","cheer-09","cheer-10","cheer-11","star-00","star-01","star-02","star-03","quick-win-00","quick-win-01","quick-win-02","quick-win-03","quick-win-04","quick-win-05","nav-big","nav-quick","nav-jokes","welcome-v7"]);
const worldThemes = {indoor:['home','#7651c8','✨'],movement:['ramp','#fc826c','⚡'],pretend:['theatre','#c66ab3','🎭'],outdoors:['jungle','#3aa89b','🌿']};
const e = id => document.getElementById(id);
const escapeText = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mobileTop = () => {if(matchMedia('(max-width:720px)').matches) requestAnimationFrame(()=>scrollTo({top:0,behavior:'instant'}));};
let ideaFilter='all', ideaId=-1, arcadeLauncher=null, quickSound=null, quickEpoch=0;
// ONE audio owner: local MP3 -> completed fal WAV -> one device TTS fallback.
// Never run media audio and browser narration simultaneously. v10.
const remoteClips=window.LENNY_VOICE_REMOTE||{};
const localClips=new Set(window.LENNY_LOCAL_CLIPS||[]);
const failedClips=new Set();
let lastRecordedKey=null,lastRecordedText='',lastRecordedMode='';
let missingClipCount=0,lastClipError='',activeSource='none',speakerUtterance=null;
function stopLocalOnly(){
 quickEpoch++;
 if(quickSound){
  const old=quickSound;quickSound=null;
  old.onplay=old.onended=old.onerror=null;
  try{old.pause();old.removeAttribute('src');old.load();}catch{}
 }
 activeSource='none';
}
const beforeStopVoice=stopVoice;
stopVoice=function(...args){stopLocalOnly();speakerUtterance=null;return beforeStopVoice(...args)};
function notice(message,buttonLabel='',action=null){
 let box=e('lennyAudioNotice');
 if(!box){
  box=document.createElement('div');box.id='lennyAudioNotice';box.className='lenny-audio-notice';
  box.setAttribute('role','status');box.setAttribute('aria-live','polite');
  const target=e('status');if(target)target.after(box);else document.querySelector('main')?.append(box);
 }
 box.replaceChildren();
 if(!message){box.hidden=true;return}
 box.hidden=false;
 const msg=document.createElement('span');msg.textContent=message;box.append(msg);
 if(buttonLabel&&action){
  const button=document.createElement('button');button.type='button';button.className='small';button.textContent=buttonLabel;
  button.addEventListener('click',action);box.append(button);
 }
}
function australianVoice(){
 if(!window.speechSynthesis)return null;
 const voices=window.speechSynthesis.getVoices().filter(v=>/^en[-_]/i.test(v.lang));
 const selected=voices.find(v=>v.voiceURI===voicePreference);if(selected)return selected;
 function rank(v){
  const n=v.name.toLowerCase();const au=/^en[-_]au$/i.test(v.lang);
  const feminine=/karen|matilda|catherine|natasha|olivia|zoe|ava|samantha|tessa|susan|fiona|serena|shelley|female/i.test(n);
  const male=/daniel|alex|fred|aaron|gordon|arthur|thomas|brian|rishi|male/i.test(n);
  return (au?1000:0)+(feminine?250:0)-(male?250:0)+(/natural|premium|enhanced/i.test(n)?90:0);
 }
 return voices.sort((a,b)=>rank(b)-rank(a))[0]||null;
}
function deviceSpeak(text,reopen=false,reason=''){ // Runs only after all media is stopped.
 const messageText=String(text||'').trim();
 stopVoice();spoken=messageText;
 if(muted||!messageText)return;
 const synth=window.speechSynthesis;
 if(!synth||!window.SpeechSynthesisUtterance){
  notice('This browser cannot read aloud. You can still play using the words on screen.');return;
 }
 const token=quickEpoch;
 const utterance=new SpeechSynthesisUtterance(messageText);
 const voice=australianVoice();if(voice)utterance.voice=voice;
 utterance.lang=voice?.lang||'en-AU';utterance.rate=.91;utterance.pitch=1.08;utterance.volume=1;
 speakerUtterance=utterance;
 let began=false;
 utterance.onstart=()=>{if(token!==quickEpoch||speakerUtterance!==utterance)return;began=true;activeSource='device';state('LENNY IS TALKING','speaking')};
 utterance.onend=()=>{if(token!==quickEpoch||speakerUtterance!==utterance)return;speakerUtterance=null;activeSource='none';state(mode==='talk'?'YOUR TURN!':'LENNY IS READY');if(reopen&&keepChatting&&mode==='talk')setTimeout(listen,450)};
 utterance.onerror=()=>{if(token!==quickEpoch||speakerUtterance!==utterance)return;speakerUtterance=null;activeSource='none';notice('Tap to hear Lenny. Your browser needs a tap before it can talk.','🔊 Tap to hear Lenny',()=>deviceSpeak(messageText,reopen,reason));state('LENNY IS READY')};
 try{synth.cancel();synth.speak(utterance)}catch(err){utterance.onerror?.(err)}
 if(reason)notice('The recorded voice isn’t on this site yet. Lenny is using your device’s voice.', '🔊 Hear again',()=>deviceSpeak(messageText,reopen,reason));
}
function playClip(key,text='',reopen=false){
 const words=String(text||spoken||'').trim();
 if(!voiceKeys.has(key)){deviceSpeak(words,reopen);return;}
 stopVoice();spoken=words;
 lastRecordedKey=key;lastRecordedText=words;lastRecordedMode=mode;
 if(muted)return;
 notice('');
 if(failedClips.has(key)){deviceSpeak(words,reopen,'missing recording');return;}
 const token=quickEpoch;
 const possible=[];
 const localUrl='assets/voice/'+key+'.mp3';
 const remote=remoteClips[key];
 if(localClips.has(key))possible.push({name:'local',src:localUrl});
 if(remote)possible.push({name:'fal recording',src:remote});
 // If GitHub uploaded MP3s without local-ready.js, also check that final local path.
 if(!localClips.has(key))possible.push({name:'local',src:localUrl});
 let index=0,done=false;
 function tryNext(){
  if(done||token!==quickEpoch)return;
  if(index>=possible.length){
   done=true;missingClipCount++;failedClips.add(key);lastClipError='No usable recording for '+key;
   deviceSpeak(words,reopen,'missing recording');return;
  }
  const candidate=possible[index++];
  const a=new Audio();a.preload='auto';a.volume=1;a.dataset.lennyKey=key;
  a.dataset.source=candidate.name;
  quickSound=a;
  let started=false,closed=false;
  function release(){a.onplay=a.onplaying=a.onended=a.onerror=null;try{a.pause();a.removeAttribute('src')}catch{}if(quickSound===a)quickSound=null}
  function error(err){
   if(closed||done||token!==quickEpoch||quickSound!==a)return;
   closed=true;
   lastClipError=String(err?.name||err?.message||'Media error')+' ('+candidate.name+')';
   release();tryNext();
  }
  a.onplay=()=>{if(token!==quickEpoch||quickSound!==a)return;started=true;activeSource=candidate.name;try{synthesis?.cancel()}catch{};notice('');state('LENNY IS TALKING','speaking')};
  a.onplaying=a.onplay;
  a.onended=()=>{if(token!==quickEpoch||quickSound!==a)return;done=true;closed=true;release();activeSource='none';state(mode==='talk'?'YOUR TURN!':'LENNY IS READY');if(reopen&&keepChatting&&mode==='talk')setTimeout(listen,450)};
  a.onerror=()=>error(new Error('Audio could not load'));
  a.src=candidate.src;
  try{
   const p=a.play();
   if(p?.catch)p.catch(err=>{
    if(err?.name==='NotAllowedError'){
      if(closed||token!==quickEpoch||quickSound!==a)return;
      closed=true;release();activeSource='needs-tap';
      notice('Tap to hear Lenny. Your browser needs a tap to start audio.', '🔊 Tap to hear Lenny',()=>playClip(key,words,reopen));
      return;
    }
    error(err);
   });
  }catch(err){error(err)}
 }
 if(!possible.length){failedClips.add(key);deviceSpeak(words,reopen,'missing recording');return;}
 tryNext();
}
window.LennyVoiceAudio={
 locked:()=>quickSound!==null||speakerUtterance!==null,
 stop:()=>stopVoice(),
 get activeKey(){return quickSound?.dataset?.lennyKey||null},
 get lastKey(){return lastRecordedKey},
 get activeSource(){return activeSource},
 get missingClips(){return missingClipCount},
 get lastError(){return lastClipError},
 get remoteClips(){return Object.keys(remoteClips).length},
 get localClips(){return localClips.size}
};
function keyForSpeech(text){
 if(mode==='home'&&(/Oh, hello|Hi,/.test(String(text||''))))return 'welcome-v7';
 const normalized=String(text||'').replace(/\s+/g,' ').trim();
 if(mode==='ideas' && ideaId>=0 && normalized.startsWith(ideas[ideaId][2]))return 'idea-'+String(ideaId).padStart(2,'0');
 if(mode==='joke'&&jokeIndex>=0 && jokes[jokeIndex]){
  const [q,a]=jokes[jokeIndex];
  if(normalized===q)return 'jokeq-'+String(jokeIndex).padStart(2,'0');
  if(normalized===q+' '+a||normalized===q+' … '+a)return 'jokef-'+String(jokeIndex).padStart(2,'0');
  if(normalized===a)return 'jokef-'+String(jokeIndex).padStart(2,'0');
 }
 if(mode==='journey'&&progress.done.length<5&&taskPage===0){return 'mission-'+String(progress.tasks[progress.done.length]).padStart(2,'0');}
 if(mode==='bonus'){const header=e('content')?.querySelector('h2')?.textContent;const beginning=e('content')?.querySelector('.bonus-step-heading')?.textContent;const idx=quests.findIndex(q=>q[1]===header);if(idx>=0&&beginning==='LET’S GO')return 'mission-'+String(idx).padStart(2,'0');}
 return null;
}
say=function(text=spoken,reopen=false){
 const key=keyForSpeech(text);
 if(key&&voiceKeys.has(key)){playClip(key,text,reopen);return;}
 // Long instructions and free-form responses use exactly one speech owner.
 deviceSpeak(text,reopen);
};
const beforeInterrupt=interrupt;
interrupt=function(...args){
 stopLocalOnly();lastRecordedKey=null;lastRecordedText='';lastRecordedMode='';
 return beforeInterrupt(...args);
};
function audioMoment(key,text=''){playClip(key,text||'Well done!')}
// The main replay button previously invoked say(spoken) and could turn on
// the device's computer voice even while a recorded navigation line played.
// Replay the exact recorded asset whenever this screen has one.
const replayButton=e('hear');
if(replayButton){
 const originalReplay=replayButton.onclick;
 replayButton.onclick=function(event){
   if(muted){muted=false;updateMute();}
   cancelMic();
   if(lastRecordedKey&&lastRecordedMode===mode){
     playClip(lastRecordedKey,lastRecordedText||spoken);
   }else if(typeof originalReplay==='function')originalReplay.call(this,event);
 };
}
const v7BaseContent=content;
content=function(...args){
 lastRecordedKey=null;lastRecordedText='';lastRecordedMode='';
 return v7BaseContent(...args);
};
function loadIdeas(){
 try{const d=JSON.parse(localStorage.getItem('lenny-v7-ideas-'+encodeURIComponent(playerName.toLowerCase()))||'{}');return {done:Array.isArray(d.done)?d.done.filter(n=>Number.isInteger(n)&&n>=0&&n<ideas.length):[],history:Array.isArray(d.history)?d.history.filter(n=>Number.isInteger(n)&&n>=0&&n<ideas.length):[]}}
 catch{return {done:[],history:[]}}
}
function saveIdeas(d){try{localStorage.setItem('lenny-v7-ideas-'+encodeURIComponent(playerName.toLowerCase()),JSON.stringify(d))}catch{}}
let ideasData={done:[],history:[]};
function choice(icon,title,subtitle,action,cls='choice'){
 const b=document.createElement('button');b.type='button';b.className=cls;
 b.innerHTML='<span class="icon" aria-hidden="true">'+icon+'</span><span><strong>'+escapeText(title)+'</strong><small>'+escapeText(subtitle)+'</small></span><span class="arrow" aria-hidden="true">→</span>';
 b.addEventListener('click',action);return b;
}
function attachHome(){
 if(mode!=='home'||!playerName)return;
 ideasData=loadIdeas();
 const container=e('choices');if(!container)return;
 if(!arcadeLauncher){arcadeLauncher=e('arcadeHomeChoice');}
 container.replaceChildren(
  choice('🏅','Big Missions','35 proper adventures · build real-life skills',openBig,'choice main-choice big-missions'),
  choice('⚡','Lenny Adventure Ideas','48 quick ideas for “I’m bored!”',openIdeas,'choice main-choice quick-ideas'),
  choice('🤭','Giggle Club','52 jokes · practise telling them yourself',()=>newJoke(),'choice main-choice giggle-club')
 );
 e('lennyV7Talk')?.remove();
 const subtitle=container.parentElement.querySelector('.sub');if(subtitle)subtitle.textContent='What are we in the mood for? Pick one!';
 const small=document.querySelector('.home-progress small');if(small&&!small.textContent.includes('quick adventures'))small.textContent+=' · ⚡ '+ideasData.done.length+' quick adventures';
 document.body.dataset.hub='home';
}
const previousHome=home;
home=function(...args){const result=previousHome(...args);attachHome();return result};
function openBig(){
 interrupt();mode='bighub';
 content('<div class="v7-kicker">🏅 THE BIG ADVENTURES</div><h1>Ready to do something amazing?</h1><p class="sub">Real-life missions for curious minds. Take your time, make something, try an idea and show what you learned.</p><div class="v7-hub-grid" id="bigHubChoices"></div>','Let’s go on a BIG adventure!',false);
 e('bigHubChoices').append(
  choice('🌟','My five badge journey',progress.done.length+' of 5 badges earned · pick up where you left off',()=>journey(),'choice'),
  choice('🧭','Explore all 35 big missions','Choose a mission from all five life-skill worlds',()=>{if(arcadeLauncher)arcadeLauncher.click();else journey()},'choice')
 );
 e('bigHubChoices').after(actionButton('← Back to my choices',()=>home(false),'small'));
 playClip('nav-big','Let’s go on a big adventure!');mobileTop();
}
function actionButton(label,action,className='big'){
 const b=document.createElement('button');b.type='button';b.className=className;b.textContent=label;b.addEventListener('click',action);return b;
}
function setIdeaWorld(){
 if(ideaId<0)return;
 const idea=ideas[ideaId];const meta=worldThemes[idea[4]]||worldThemes.indoor;
 document.body.dataset.world=meta[0];document.body.dataset.idea=idea[4];
 const world=e('worldScene');if(world)world.style.backgroundImage='url("assets/worlds/'+meta[0]+'.svg")';
 const tag=document.querySelector('.world-tag span');if(tag)tag.textContent=idea[1]+' '+idea[0];
 e('chapterRibbon')?.setAttribute('hidden','');
}
function openIdeas(){
 interrupt();mode='ideas';ideasData=loadIdeas();ideaId=-1;ideaFilter='all';renderIdeaList();mobileTop();
 playClip('nav-quick','Bored? Not on my watch! Pick a quick adventure.');
}
function filteredIds(){return ideas.map((v,i)=>i).filter(i=>ideaFilter==='all'||ideas[i][4]===ideaFilter)}
function nextIdea(){
 const pool=filteredIds();const unseen=pool.filter(i=>!ideasData.history.includes(i));
 if(!unseen.length)ideasData.history=ideasData.history.filter(i=>!pool.includes(i));
 const options=unseen.length?unseen:pool;
 if(!options.length)return;
 ideaId=options[Math.floor(Math.random()*options.length)];
 ideasData.history.push(ideaId);saveIdeas(ideasData);renderIdeaCard();mobileTop();
}
function renderIdeaList(){
 mode='ideas';
 content('<div class="v7-kicker">⚡ LENNY ADVENTURE IDEAS</div><h1>“I’m boooored!”</h1><p class="sub">Not for long! Tiny adventures you can start right now. No big preparation, no homework and no pressure.</p><div class="idea-stats">✨ <strong>'+ideasData.done.length+' / '+ideas.length+'</strong> ideas tried · every idea can be played again!</div><div class="idea-filters" id="ideaFilters"></div><div class="idea-main" id="ideaMain"></div>','Let’s beat the boredom!',false);
 const tabs=[['all','🎲 Anything'],['indoor','🏠 Indoors'],['movement','⚡ Move'],['pretend','🎭 Pretend'],['outdoors','🌿 Outside']];
 tabs.forEach(([value,label])=>{const b=actionButton(label,()=>{ideaFilter=value;renderIdeaList();},'idea-filter'+(ideaFilter===value?' selected':''));b.setAttribute('aria-pressed',String(ideaFilter===value));e('ideaFilters').append(b)});
 e('ideaMain').append(actionButton('🎲 Surprise me, Lenny!',()=>nextIdea(),'big pink idea-surprise'));
 e('ideaMain').append(actionButton('← Back to my choices',()=>home(false),'small'));
}
function renderIdeaCard(){
 mode='ideas';const x=ideas[ideaId];if(!x){renderIdeaList();return;}
 const played=ideasData.done.includes(ideaId);
 content('<div class="v7-kicker">⚡ YOUR LITTLE ADVENTURE · '+x[5]+' MIN</div><div class="idea-illustration" aria-hidden="true">'+x[1]+'</div><h1>'+escapeText(x[0])+'</h1><p class="idea-sub">'+escapeText(x[2])+'</p><div class="idea-twist"><strong>🌟 Extra silly challenge</strong><p>'+escapeText(x[3])+'</p></div><div class="idea-action-area" id="ideaActions"></div><p class="idea-tip">'+(played?'🎉 You have tried this one before. Want another go?':'🤝 If you need an object or a grown-up, ask first.')+'</p>',x[2]+' '+x[3],false);
 setIdeaWorld();
 e('ideaActions').append(actionButton('🔊 Hear Lenny explain',()=>{if(muted){muted=false;updateMute()}say(x[2]+' '+x[3]);},'small'));
 e('ideaActions').append(actionButton('🌟 I did it!',()=>completeIdea(),'big pink'));
 e('ideaActions').append(actionButton('🎲 Different idea',()=>nextIdea(),'big'));
 e('ideaActions').append(actionButton('← All idea types',()=>renderIdeaList(),'small'));
 say(x[2]+' '+x[3]);
}
function completeIdea(){
 if(ideaId<0)return;
 const fresh=!ideasData.done.includes(ideaId);
 if(fresh)ideasData.done.push(ideaId);
 saveIdeas(ideasData);
 const title=e('content');
 title.innerHTML='<div class="quick-win" role="status"><div class="quick-win-emoji">🌟</div><div class="v7-kicker">THE BOREDOM BUSTER CLUB</div><h1>BOREDOM: DEFEATED!</h1><p>You gave it a go! Lenny is doing a little happy dance.</p><strong>⚡ '+ideasData.done.length+' quick adventures tried</strong><div class="idea-action-area" id="ideaActions"></div></div>';
 e('ideaActions').append(actionButton('🎲 Let’s do another!',()=>nextIdea(),'big pink'));
 e('ideaActions').append(actionButton('🏠 Back home',()=>home(false),'small'));
 stage.dataset.expression='giggle';
 const blast=e('confetti');if(blast)confetti();
 playClip('quick-win-'+String(ideasData.done.length%6).padStart(2,'0'),'That was brilliant!');
 mobileTop();
}
function emphasizeJokes(){
 const no=e('content')?.querySelector('.joke-spotlight');
 if(no)no.setAttribute('aria-label','Practice telling jokes at your own pace; no scoring');
}
const beforeRenderJoke=renderJoke;
renderJoke=function(...args){const r=beforeRenderJoke(...args);emphasizeJokes();return r};
// Distinct prerecorded celebration callouts, played after the modal appears.
const victory=e('lennyVictory');
let wasVictory=false, lastCelebration=-1;
function victoryChanged(){
 if(!victory)return;
 const visible=!victory.hidden;
 if(visible&&!wasVictory){
   wasVictory=true;
   const isJoke=victory.dataset.kind==='joke';
   const kind=isJoke?'star': 'cheer';
   let idx=Math.floor(Math.random()*(isJoke?4:12));if(idx===lastCelebration)idx=(idx+1)%(isJoke?4:12);lastCelebration=idx;
   const key=kind+'-'+String(idx).padStart(2,'0');
   setTimeout(()=>{if(!victory.hidden){playClip(key,isJoke?'You told a joke! You are a comedy star!':'Mission complete! You absolutely smashed it!')}},150);
 }
 if(!visible)wasVictory=false;
}
if(victory){new MutationObserver(victoryChanged).observe(victory,{attributes:true,attributeFilter:['hidden']});victoryChanged();}
// On old home screens generated before this script loaded.
attachHome();
window.LennyV7={openBig,openIdeas,nextIdea,selectIdea:n=>{ideaId=n;renderIdeaCard()},audioKeys:()=>voiceKeys.size,ideaCount:ideas.length};
})();
