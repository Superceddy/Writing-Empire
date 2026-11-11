/* Writing Empire v0.6 */
(function(){
"use strict";
const byId=id=>document.getElementById(id);
const css=[
'#admin-panel{inset:2vh 2vw!important;width:96vw!important;height:96vh!important;max-height:96vh;overflow:auto;background:#14131a;border:2px solid #bb86fc;z-index:3000;padding:clamp(10px,2vw,24px)}',
'#admin-panel .admin-head{display:flex;justify-content:space-between;align-items:center;gap:10px;position:sticky;top:-24px;background:#14131a;padding:8px 0;z-index:5}',
'#admin-panel button,#admin-panel input,#admin-panel textarea,#admin-panel select{min-height:44px;font-size:15px}',
'#admin-panel .admin-grid{grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))}',
'.admin-section,.skill-group{background:#201e29;border:1px solid #49415c;border-radius:10px;padding:14px;margin:12px 0}',
'.admin-tabs{display:flex;gap:8px;flex-wrap:wrap;position:sticky;top:55px;background:#14131a;padding:8px 0;z-index:4}',
'.admin-tabs button{flex:1 1 110px}.admin-tab{display:none}.admin-tab.active{display:block}',
'.skill-group h3{color:#bb86fc;margin-bottom:10px}.skill-node{min-height:130px;touch-action:manipulation}',
'.skill-node .preview{display:block;color:#aaa;font-size:11px;margin-top:5px}',
'.char-blue{color:#168cff!important;font-weight:bold;text-shadow:0 0 5px #168cff}',
'#we-extra-settings select{width:100%;min-height:44px}',
'#we-prestige{background:#20172a;border:1px solid #8754ad;padding:14px;border-radius:10px;margin:12px 0}',
'.prestige-tree{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}',
'.prestige-node{border:1px solid #8754ad;background:#251b30;border-radius:10px;padding:12px;text-align:center}',
'.prestige-node button{width:100%;margin-top:8px}',
'@media(max-width:760px){#admin-panel{inset:0!important;width:100vw!important;height:100dvh!important;max-height:100dvh;border-radius:0;padding:10px}.admin-tabs{top:48px}}'
].join('');
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
gameState.stats=Object.assign({purpleChars:0,blueChars:0,errorFreeStreak:0,bestStreak:0,errors:0,uppercaseCorrect:0},gameState.stats||{});
gameState.prestige=Object.assign({points:0,level:0,upgrades:{},totalPrestiges:0},gameState.prestige||{});
gameState.settings=Object.assign({language:"de",background:"default",capsLock:false,shift:false},gameState.settings||{});
gameState.specialKeyMode=false;gameState.blueUntil=gameState.blueUntil||0;gameState.customTexts=gameState.customTexts||{};

/* 30 achievements, with one-time rewards */
const achievements=[
["first_char","Erster Funke","Erstes Zeichen geschrieben",1,"total_chars",1],
["chars_10","Feder in Bewegung","10 Zeichen geschrieben",10,"total_chars",15],
["chars_100","Fleißiger Schreiber","100 Zeichen geschrieben",100,"total_chars",35],
["chars_1000","Wortakrobat","1.000 Zeichen geschrieben",1000,"total_chars",100],
["chars_10000","Chronist des Reiches","10.000 Zeichen geschrieben",10000,"total_chars",300],
["chars_100000","Meister der Lettern","100.000 Zeichen geschrieben",100000,"total_chars",1000],
["gold_10","Goldene Reserve","10 goldene Zeichen",10,"gold_chars",35],
["gold_100","Goldschmied","100 goldene Zeichen",100,"gold_chars",120],
["gold_1000","Goldenes Zeitalter","1.000 goldene Zeichen",1000,"gold_chars",500],
["purple_10","Purpurglanz","10 lilane Bonuszeichen",10,"purple_chars",40],
["purple_100","Hüter der Königstinte","100 lilane Bonuszeichen",100,"purple_chars",150],
["purple_1000","Lila Legende","1.000 lilane Bonuszeichen",1000,"purple_chars",600],
["sp_100","Kleine Kasse","100 SP verdient",100,"total_sp",25],
["sp_10000","Wohlstand","10.000 SP verdient",10000,"total_sp",250],
["first_upgrade","Evolution","Erstes Talent erworben",1,"upgrades_bought",20],
["auto_unlock","Industrielle Revolution","Automatisierung freigeschaltet",1,"auto_unlocked",50],
["auto_a","Erster Automat","A-Automatik freigeschaltet",1,"auto_a",40],
["auto_four","Buchstabenfabrik","A, E, S und T automatisiert",4,"auto_letters",180],
["text_1","Das erste Werk","Einen Text abgeschlossen",1,"texts_finished",50],
["text_10","Bibliothekar","10 Texte abgeschlossen",10,"texts_finished",180],
["text_50","Unermüdlicher Erzähler","50 Texte abgeschlossen",50,"texts_finished",500],
["text_100","Reich der Geschichten","100 Texte abgeschlossen",100,"texts_finished",1200],
["streak_25","Sichere Hand","25 Zeichen fehlerfrei",25,"best_streak",30],
["streak_100","Tastenmeister","100 Zeichen fehlerfrei",100,"best_streak",100],
["streak_500","Fehlerfreie Chronik","500 Zeichen fehlerfrei",500,"best_streak",400],
["max_write","Meister der Schreibkunst","Alle Schreibkunst-Talente maximiert",1,"max_write",250],
["max_gold","Goldenes Handwerk","Alle Gold-Talente maximiert",1,"max_gold",300],
["max_purple","Purpurmeister","Alle Purpur-Talente maximiert",1,"max_purple",350],
["max_auto","Maschinenmeister","Alle Automatisierungs-Talente maximiert",1,"max_auto",500],
["max_special","Spezialist des Reiches","Alle Spezial-Talente maximiert",1,"max_special",600]
].map(a=>({id:a[0],name:a[1],desc:a[2],target:a[3],type:a[4],reward:a[5]}));
ACHIEVEMENTS.splice(0,ACHIEVEMENTS.length,...achievements);

/* Additional upgrade paths */
const additions=[
{id:"gold_frequency",label:"Goldadern",desc:"Goldzeichen erscheinen häufiger.",cost:950,maxLevel:6,requires:["unlock_free"],group:"Gold"},
{id:"gold_power",label:"Goldprägung",desc:"+3 SP pro Goldzeichen je Stufe.",cost:1500,maxLevel:8,requires:["gold_frequency"],group:"Gold"},
{id:"gold_capacity",label:"Goldspeicher",desc:"Erhöht die Goldzeichen-Kapazität.",cost:1200,maxLevel:5,requires:["unlock_free"],group:"Gold"},
{id:"purple_frequency",label:"Purpurhäufigkeit",desc:"Lilane Bonuszeichen erscheinen häufiger.",cost:1800,maxLevel:5,requires:["purple_bonus"],group:"Purpur",color:"purple"},
{id:"auto_e",label:"Automatik: E",desc:"Schreibt E automatisch.",cost:1400,maxLevel:1,requires:["unlock_auto"],group:"Automatisierung"},
{id:"auto_s",label:"Automatik: S",desc:"Schreibt S automatisch.",cost:1600,maxLevel:1,requires:["unlock_auto"],group:"Automatisierung"},
{id:"auto_t",label:"Automatik: T",desc:"Schreibt T automatisch.",cost:1800,maxLevel:1,requires:["unlock_auto"],group:"Automatisierung"},
{id:"auto_vowels",label:"Vokalmaschine",desc:"Automatisiert alle Vokale.",cost:5000,maxLevel:1,requires:["auto_e"],group:"Automatisierung"},
{id:"streak_power",label:"Fehlerfreie Serie",desc:"+1 SP pro fehlerfreiem Zeichen je Stufe.",cost:800,maxLevel:8,requires:["base_click"],group:"Schreibkunst"},
{id:"special_power",label:"Zeichenkunde",desc:"+2 SP für Sonderzeichen je Stufe.",cost:1000,maxLevel:8,requires:["base_click"],group:"Spezial"},
{id:"blue_unlock",label:"Blaue Magie",desc:"Schaltet blaue Multiplikator-Zeichen frei.",cost:3000,maxLevel:1,requires:["purple_bonus"],group:"Spezial"},
{id:"blue_power",label:"Blaue Resonanz",desc:"+1 Stufe beim blauen SP-Multiplikator.",cost:2200,maxLevel:6,requires:["blue_unlock"],group:"Spezial"},
{id:"blue_duration",label:"Blaue Dauer",desc:"Verlängert den blauen Bonus.",cost:2500,maxLevel:6,requires:["blue_unlock"],group:"Spezial"}
];
additions.forEach(s=>{const old=SKILL_TREE.find(x=>x.id===s.id);if(old)Object.assign(old,s);else SKILL_TREE.push(s);});
SKILL_TREE.forEach(s=>{if(!s.group)s.group=s.color==="purple"?"Purpur":(s.id.indexOf("auto")===0||s.id==="unlock_auto"?"Automatisierung":(s.id.indexOf("free")>=0||s.id.indexOf("gold")>=0||s.id==="unlock_free"?"Gold":"Schreibkunst"));});

function colorAt(i){
 const pEvery=Math.max(10,28-(gameState.upgrades.purple_frequency||0)*3-(gameState.prestige?.upgrades?.p_purplechance||0)*2);
 const gEvery=Math.max(16,42-(gameState.upgrades.gold_frequency||0)*4-(gameState.upgrades.gold_capacity||0)*2-(gameState.prestige?.upgrades?.p_goldchance||0)*3);
 if(i>=gameState.textProgress&&(i-5)%pEvery===0&&isUpgradePurchased("purple_bonus"))return "purple";
 if(i>=gameState.textProgress&&(i-10)%gEvery===0&&isUpgradePurchased("unlock_free"))return "gold";
 if(i>=gameState.textProgress&&(i-15)%75===0&&isUpgradePurchased("blue_unlock"))return "blue";
 return "";
}
window.colorAt=colorAt;
window.renderPaper=function(){
 const paper=byId("paper");if(!paper)return;paper.innerHTML="";
 gameState.history.forEach(item=>{const x=document.createElement("span");x.textContent=item.char;x.className=item.type==="gold"?"char-gold":item.type==="purple"?"char-purple":item.type==="blue"?"char-blue":"char-normal";paper.appendChild(x);});
 const t=getCurrentTextString();
 for(let i=gameState.textProgress;i<t.length;i++){const x=document.createElement("span");x.textContent=t[i];if(i===gameState.textProgress)x.className="char-next";else{const c=colorAt(i);if(c==="gold")x.className="char-gold";else if(c==="purple")x.className="char-purple";else if(c==="blue")x.className="char-blue";else x.style.color="#aaa";}paper.appendChild(x);}
 updateNextKeyboardKey();
};
window.updateNextKeyboardKey=function(){
 document.querySelectorAll(".key.next-key,.key.auto-key").forEach(x=>x.classList.remove("next-key","auto-key"));
 if(!isUpgradePurchased("keyboard_hint"))return;const c=getCurrentTextString()[gameState.textProgress];if(!c)return;
 let k=c===" "?"SPACE":c.toUpperCase();if(!byId("key-"+k)&&!/[A-Z .,!?]/.test(c))k="?123";if(byId("key-"+k))byId("key-"+k).classList.add("next-key");
};

/* Exact-case input, error streak, special-key gate */
window.handleKeyInput=function(input){
 const t=getCurrentTextString(),expected=t[gameState.textProgress];if(expected===undefined){finishText();return;}
 if(input==="?123"){const next=getCurrentTextString()[gameState.textProgress];if(next!==undefined&&!/[A-Za-z0-9 .,!? ]/.test(next)){input=next;gameState.specialKeyMode=true;}else{showToast("Die Sonderzeichen-Taste ist nur für Zeichen ohne eigene Taste gedacht.");return;}}
 const special=!/[A-Za-z0-9 .,!? ]/.test(expected);
 if(special&&!gameState.specialKeyMode){showToast("Dafür zuerst ?123 aktivieren.");return;}
 if(!special&&gameState.specialKeyMode)gameState.specialKeyMode=false;
 if(input!==expected){gameState.stats.errors++;gameState.stats.errorFreeStreak=0;return;}
 gameState.specialKeyMode=false;if(gameState.settings.shift)gameState.settings.shift=false;gameState.stats.errorFreeStreak++;gameState.stats.bestStreak=Math.max(gameState.stats.bestStreak,gameState.stats.errorFreeStreak);
 if(/[A-ZÄÖÜ]/.test(expected))gameState.stats.uppercaseCorrect++;
 let type=colorAt(gameState.textProgress);if(type!=="gold"&&type!=="purple"&&type!=="blue")type="manual";if(type==="manual"&&gameState.settings.freeEnabled&&isUpgradePurchased("unlock_free")){const stockKey=expected===" "?"SPACE":expected.toUpperCase();if((gameState.freeStock[stockKey]||0)>0){gameState.freeStock[stockKey]--;type="gold";}}
 if(type==="blue")gameState.blueUntil=Date.now()+5000+(gameState.upgrades.blue_duration||0)*1500;
 executeCharacterWrite(expected,type);
 if(type==="manual"&&/[A-ZÄÖÜ]/.test(expected)&&isUpgradePurchased("case_master")){const b=gameState.upgrades.case_master;gameState.sp+=b;gameState.totalSpEarned+=b;}
 if(special&&isUpgradePurchased("special_power")){const b=2*gameState.upgrades.special_power;gameState.sp+=b;gameState.totalSpEarned+=b;}
 if(isUpgradePurchased("streak_power")){const b=gameState.upgrades.streak_power;gameState.sp+=b;gameState.totalSpEarned+=b;}
 playClickSound();checkAchievements();updateAllDisplays();saveGameState();
};
window.executeCharacterWrite=function(ch,type){
 gameState.history.push({char:ch,type:type});gameState.textProgress++;gameState.stats.totalChars++;
 if(type==="manual"||type==="purple"||type==="blue")gameState.stats.manualChars++;
 if(type==="auto")gameState.stats.autoChars++;if(type==="gold")gameState.stats.goldChars++;
 if(type==="purple")gameState.stats.purpleChars++;if(type==="blue")gameState.stats.blueChars++;
 let gain=1;if(type==="manual"||type==="purple"||type==="blue")gain+=gameState.upgrades.base_click||0;
 if(type==="purple")gain+=5+2*(gameState.upgrades.purple_power||0);
 if(type==="gold")gain+=3*(gameState.upgrades.gold_power||0);
 if(Date.now()<gameState.blueUntil)gain*=2+(gameState.upgrades.blue_power||0);
 gain*=1+0.1*(gameState.prestige.upgrades.p_sp||0);
 if(type==="gold")gain*=1+0.15*(gameState.prestige.upgrades.p_gold||0);
 if(type==="purple")gain*=1+0.15*(gameState.prestige.upgrades.p_purple||0);
 gameState.sp+=gain;gameState.totalSpEarned+=gain;checkAchievements();
 if(gameState.textProgress>=getCurrentTextString().length)finishText();
};
window.gameLoop=function(){
 const t=getCurrentTextString(),c=t[gameState.textProgress];if(c===undefined)return;
 if(colorAt(gameState.textProgress)==="gold"&&isUpgradePurchased("unlock_free")&&gameState.settings.freeEnabled){executeCharacterWrite(c,"gold");updateAllDisplays();saveGameState();return;}
 if(!gameState.settings.autoEnabled)return;
 if(colorAt(gameState.textProgress)==="purple"||colorAt(gameState.textProgress)==="blue")return;
 msCounter+=100;autoACounter+=100;
 const ids=["auto_a","auto_e","auto_s","auto_t"];
 const specific=ids.some(id=>isUpgradePurchased(id)&&id.slice(-1).toUpperCase()===c.toUpperCase());
 if((specific||(isUpgradePurchased("auto_vowels")&&"AEIOU".includes(c.toUpperCase())))&&autoACounter>=1800){autoACounter=0;executeCharacterWrite(c,"auto");updateAllDisplays();saveGameState();return;}
 if(!isUpgradePurchased("unlock_auto"))return;
 const interval=Math.max(250,3000-(gameState.upgrades.auto_speed||0)*300-(gameState.prestige?.upgrades?.p_auto||0)*150);
 if(msCounter>=interval){msCounter=0;executeCharacterWrite(c,"auto");updateAllDisplays();saveGameState();}
};
window.getAutoCooldownMs=function(){
 const text=getCurrentTextString(),ch=text[gameState.textProgress];
 if(ch===undefined||!gameState.settings.autoEnabled)return null;
 if(colorAt(gameState.textProgress)==="gold"&&isUpgradePurchased("unlock_free")&&gameState.settings.freeEnabled)return 0;
 if(colorAt(gameState.textProgress)==="purple"||colorAt(gameState.textProgress)==="blue")return null;
 const ids=["auto_a","auto_e","auto_s","auto_t"];
 const specific=ids.some(id=>isUpgradePurchased(id)&&id.slice(-1).toUpperCase()===ch.toUpperCase());
 if(specific||(isUpgradePurchased("auto_vowels")&&"AEIOU".includes(ch.toUpperCase())))return Math.max(0,1800-autoACounter);
 if(!isUpgradePurchased("unlock_auto"))return null;
 const interval=Math.max(250,3000-(gameState.upgrades.auto_speed||0)*300-(gameState.prestige?.upgrades?.p_auto||0)*150);
 return Math.max(0,interval-msCounter);
};


/* Grouped talents show live level, next level and actual prerequisites */
window.buyUpgrade=function(id,cost){const skill=SKILL_TREE.find(s=>s.id===id);if(!skill)return;const lvl=gameState.upgrades[id]||0;if(lvl>=skill.maxLevel)return showToast("Bereits auf Maximalstufe.");if((skill.requires||[]).some(r=>(gameState.upgrades[r]||0)<1))return showToast("Voraussetzung fehlt.");if(gameState.sp<cost)return showToast("Nicht genug SP.");gameState.sp-=cost;gameState.upgrades[id]=lvl+1;checkAchievements();buildSkillTreeUI();updateAllDisplays();saveGameState();showToast("Upgrade erworben: "+skill.label);};
window.buildSkillTreeUI=function(){
 const root=byId("skilltree-container");if(!root)return;root.innerHTML="";
 [...new Set(SKILL_TREE.map(s=>s.group||"Weitere Talente"))].forEach(g=>{
 const sec=document.createElement("section");sec.className="skill-group";const h=document.createElement("h3");h.textContent=g;sec.appendChild(h);const row=document.createElement("div");row.className="skill-row";
 SKILL_TREE.filter(s=>(s.group||"Weitere Talente")===g).forEach(s=>{
 const lvl=gameState.upgrades[s.id]||0,cost=Math.round(s.cost*Math.pow(1.65,lvl)),missing=(s.requires||[]).filter(id=>(gameState.upgrades[id]||0)<1),node=document.createElement("div");
 node.className="skill-node "+(lvl>=s.maxLevel?"purchased":missing.length?"locked":"available");node.dataset.skillId=s.id;
 const req=missing.map(id=>{const x=SKILL_TREE.find(y=>y.id===id);return x?x.label:id;}).join(", ");
 node.innerHTML="<h4>"+s.label+" ("+lvl+"/"+s.maxLevel+")</h4><p>"+s.desc+"</p><span class='preview'>Aktuell: Stufe "+lvl+" · Danach: "+Math.min(s.maxLevel,lvl+1)+"</span><span class='cost'>"+(lvl>=s.maxLevel?"MAXSTUFE":cost+" SP")+"</span>"+(missing.length?"<p class='preview'>Benötigt: "+req+"</p>":"");
 if(lvl<s.maxLevel&&!missing.length){node.tabIndex=0;node.onclick=()=>buyUpgrade(s.id,cost);node.onkeydown=e=>{if(e.key==="Enter")buyUpgrade(s.id,cost);};}
 row.appendChild(node);
 });sec.appendChild(row);root.appendChild(sec);
 });renderPrestigeTree();
};
function maxGroup(g){const a=SKILL_TREE.filter(s=>s.group===g);return a.length>0&&a.every(s=>(gameState.upgrades[s.id]||0)>=s.maxLevel);}
window.checkAchievements=function(){
 const total=Object.values(gameState.upgrades).reduce((a,b)=>a+b,0);
 const v={total_chars:gameState.stats.totalChars,total_sp:gameState.totalSpEarned,upgrades_bought:total,auto_unlocked:isUpgradePurchased("unlock_auto")?1:0,auto_a:isUpgradePurchased("auto_a")?1:0,auto_letters:["auto_a","auto_e","auto_s","auto_t"].filter(isUpgradePurchased).length,texts_finished:gameState.stats.textsFinished,gold_chars:gameState.stats.goldChars,purple_chars:gameState.stats.purpleChars,best_streak:gameState.stats.bestStreak,max_write:maxGroup("Schreibkunst")?1:0,max_gold:maxGroup("Gold")?1:0,max_purple:maxGroup("Purpur")?1:0,max_auto:maxGroup("Automatisierung")?1:0,max_special:maxGroup("Spezial")?1:0};
 ACHIEVEMENTS.forEach(a=>{if(!gameState.achievementsUnlocked.includes(a.id)&&(v[a.type]||0)>=a.target){gameState.achievementsUnlocked.push(a.id);gameState.sp+=a.reward;gameState.totalSpEarned+=a.reward;showToast("Erfolg: "+a.name+" (+"+a.reward+" SP)");}});
};
window.renderAchievements=function(){
 const box=byId("achievements-display");if(!box)return;box.innerHTML="";
 const total=Object.values(gameState.upgrades).reduce((a,b)=>a+b,0);
 const v={total_chars:gameState.stats.totalChars,total_sp:gameState.totalSpEarned,upgrades_bought:total,auto_unlocked:isUpgradePurchased("unlock_auto")?1:0,auto_a:isUpgradePurchased("auto_a")?1:0,auto_letters:["auto_a","auto_e","auto_s","auto_t"].filter(isUpgradePurchased).length,texts_finished:gameState.stats.textsFinished,gold_chars:gameState.stats.goldChars,purple_chars:gameState.stats.purpleChars,best_streak:gameState.stats.bestStreak,max_write:maxGroup("Schreibkunst")?1:0,max_gold:maxGroup("Gold")?1:0,max_purple:maxGroup("Purpur")?1:0,max_auto:maxGroup("Automatisierung")?1:0,max_special:maxGroup("Spezial")?1:0};
 ACHIEVEMENTS.forEach(a=>{const n=v[a.type]||0,done=gameState.achievementsUnlocked.includes(a.id),card=document.createElement("div");card.className="achievement-card "+(done?"unlocked":"");card.innerHTML="<h4>"+a.name+"</h4><p>"+a.desc+"</p><div style='font-size:11px'>"+Math.min(n,a.target)+" / "+a.target+" · +"+a.reward+" SP</div><div class='progress-bar'><div class='progress-fill' style='width:"+Math.min(100,n/a.target*100)+"%'></div></div>";box.appendChild(card);});
};

/* Prestige tree: permanent perks survive normal resets */
const prestigeSkills=[
{id:"p_sp",name:"Imperiale Tinte",desc:"+10% SP je Stufe",cost:1,max:10,req:null},
{id:"p_gold",name:"Goldmacht",desc:"+15% Gold-SP",cost:2,max:5,req:"p_sp"},
{id:"p_purple",name:"Purpurmacht",desc:"+15% Purpur-SP",cost:2,max:5,req:"p_sp"},
{id:"p_era",name:"Neue Ära",desc:"Prestige-Fortschritt",cost:5,max:1,req:"p_gold"},
{id:"p_instant",name:"Sofortige Feder",desc:"Prestige-Spezialtalent",cost:4,max:5,req:"p_purple"}
];
window.renderPrestigeTree=function(){
 const root=byId("prestige-tree");if(!root)return;root.innerHTML="";
 prestigeSkills.forEach(s=>{const lvl=gameState.prestige.upgrades[s.id]||0,locked=s.req&&(gameState.prestige.upgrades[s.req]||0)<1,n=document.createElement("div");n.className="prestige-node";n.innerHTML="<b>"+s.name+" ("+lvl+"/"+s.max+")</b><p>"+s.desc+"</p><small>"+(locked?"Voraussetzung: "+s.req:lvl>=s.max?"MAX":s.cost+" Prestige-Punkte")+"</small>";
 if(!locked&&lvl<s.max){const b=document.createElement("button");b.className="btn";b.textContent="Freischalten";b.onclick=()=>{if(gameState.prestige.points<s.cost)return showToast("Nicht genug Prestige-Punkte.");gameState.prestige.points-=s.cost;gameState.prestige.upgrades[s.id]=lvl+1;saveGameState();renderPrestigeTree();};n.appendChild(b);}root.appendChild(n);});
};
window.finishText=function(){gameState.stats.textsFinished++;gameState.sp+=50;gameState.totalSpEarned+=50;showToast("Text abgeschlossen! +50 SP");checkAchievements();resetCurrentText();};
window.doPrestige=function(){
 if(gameState.sp<10000)return showToast("Benötigt mindestens 10.000 aktuelle SP.");
 if(!confirm("Prestige setzt aktuelle SP, normale Upgrades und Textfortschritt zurück. Lebenszeitstatistik, Erfolge und Prestige-Talente bleiben erhalten. Fortfahren?"))return;
 const gain=Math.max(1,Math.floor(Math.sqrt(gameState.sp/10000)));
 gameState.prestige.points+=gain;gameState.prestige.level++;gameState.prestige.totalPrestiges++;
 gameState.sp=0;gameState.textProgress=0;gameState.history=[];gameState.upgrades={};gameState.freeStock={};gameState.freeProgress={};
 saveGameState();buildSkillTreeUI();updateAllDisplays();showToast("Prestige! +"+gain+" Punkte");
};

/* Settings: language selector and editable background themes */
function addSettings(){
 const cfg=byId("tab-config");if(!cfg||byId("we-extra-settings"))return;
 const box=document.createElement("section");box.id="we-extra-settings";
 box.innerHTML="<h3>Sprache & Hintergrund</h3><div class='form-group'><label>Sprache</label><select id='we-language'><option value='de'>Deutsch</option><option value='en'>English</option></select></div><div class='form-group'><label>Hintergrund</label><select id='we-background'><option value='default'>Standard dunkel</option><option value='midnight'>Mitternachtblau</option><option value='forest'>Waldgrün</option><option value='wine'>Purpurrot</option><option value='light'>Hell</option></select></div>";
 cfg.appendChild(box);byId("we-language").value=gameState.settings.language;byId("we-background").value=gameState.settings.background;
 byId("we-language").onchange=e=>{gameState.settings.language=e.target.value;applyLanguage();saveGameState();};
 byId("we-background").onchange=e=>{gameState.settings.background=e.target.value;applyBackground();saveGameState();};
 applyLanguage();applyBackground();
}
function applyLanguage(){const en=gameState.settings.language==="en",names=en?["Write","Skill Tree","Achievements","Statistics","Settings"]:["Schreiben","Talentbaum","Erfolge","Statistiken","Einstellungen"];document.documentElement.lang=en?"en":"de";document.querySelectorAll(".nav-btn").forEach((b,i)=>{if(names[i])b.textContent=["📝 ","🌳 ","🏆 ","📊 ","⚙ "][i]+names[i];});}
function applyBackground(){const m={default:["#121212","#1e1e1e","#e0e0e0"],midnight:["#081525","#10243a","#e4f0ff"],forest:["#102018","#1b3024","#e5f4e9"],wine:["#241018","#351927","#ffe8f0"],light:["#e8e8ee","#fff","#171717"]};const v=m[gameState.settings.background]||m.default;document.documentElement.style.setProperty("--bg-dark",v[0]);document.documentElement.style.setProperty("--surface-dark",v[1]);document.documentElement.style.setProperty("--text-main",v[2]);}
function addPrestige(){
 const cfg=byId("tab-config");if(!cfg||byId("we-prestige"))return;const box=document.createElement("section");box.id="we-prestige";
 box.innerHTML="<h3>Prestige-System</h3><p>Prestige-Punkte: <b id='we-pp'>0</b> · Stufe: <b id='we-pl'>0</b></p><p>Setzt SP, normale Upgrades und Textfortschritt zurück. Erfolge und Prestige-Talente bleiben erhalten.</p><button class='btn' onclick='doPrestige()'>Prestige starten</button><h4>Prestige-Talentbaum</h4><div id='prestige-tree' class='prestige-tree'></div>";cfg.appendChild(box);renderPrestigeTree();
}

/* Admin: responsive tabs, account overview, economy, progress, text management and tools */
function buildAdmin(){
 const panel=byId("admin-panel");if(!panel||byId("admin-tabs"))return;
 panel.innerHTML="<div class='admin-head'><div><h2 style='color:#bb86fc;margin:0'>Writing Empire · Admin</h2><small>Nur für Admin-Konten</small></div><button class='btn' onclick='closeAdmin()'>Schließen ✕</button></div>"+
 "<div class='admin-tabs' id='admin-tabs'><button class='btn' onclick=\"adminTab('overview')\">Übersicht</button><button class='btn' onclick=\"adminTab('economy')\">Wirtschaft</button><button class='btn' onclick=\"adminTab('progress')\">Fortschritt</button><button class='btn' onclick=\"adminTab('texts')\">Texte</button><button class='btn' onclick=\"adminTab('tools')\">Werkzeuge</button></div>"+
 "<section class='admin-tab active' id='admin-overview'><div class='admin-section'><h3>Live-Status</h3><p>SP: <b id='admin-sp'>0</b> · Zeichen: <b id='admin-chars'>0</b> · Texte: <b id='admin-texts'>0</b></p><p>Konto: <b id='admin-email'>–</b></p></div><div class='admin-grid'><button class='btn' onclick='adminAddSP(1000)'>+1.000 SP</button><button class='btn' onclick='adminAddSP(100000)'>+100.000 SP</button><button class='btn' onclick='adminGrantAllFreeChars(10)'>+10 Gold pro Taste</button><button class='btn' onclick='adminBuyAllUpgrades()'>Alle Upgrades max.</button><button class='btn' onclick='adminUnlockAllAchievements()'>Alle Erfolge</button></div></section>"+
 "<section class='admin-tab' id='admin-economy'><div class='admin-section'><h3>SP setzen</h3><input id='admin-sp-value' type='number' value='1000' style='width:100%'><button class='btn' onclick='adminSetSP()'>Übernehmen</button><div class='admin-grid'><button class='btn' onclick='adminAddSP(500)'>+500</button><button class='btn' onclick='adminAddSP(-500)'>−500</button><button class='btn' onclick='adminAddSP(10000)'>+10.000</button></div></div></section>"+
 "<section class='admin-tab' id='admin-progress'><div class='admin-section'><button class='btn' onclick='adminResetProgress()'>Text zurücksetzen</button><button class='btn' onclick='adminResetStats()'>Statistiken zurücksetzen</button><button class='btn' onclick='adminResetUpgrades()'>Upgrades zurücksetzen</button></div><div class='admin-section'><h3>Prestige-Punkte vergeben</h3><input id='admin-pp-value' type='number' value='10' style='width:100%'><button class='btn' onclick='adminGrantPrestige()'>Vergeben</button></div></section>"+
 "<section class='admin-tab' id='admin-texts'><div class='admin-section'><h3>Text hinzufügen</h3><input id='admin-title' placeholder='Titel' style='width:100%'><textarea id='admin-body' rows='5' placeholder='Textinhalt' style='width:100%'></textarea><button class='btn' onclick='adminAddText()'>Hinzufügen</button></div><div class='admin-section'><h3>Vorlage bearbeiten</h3><select id='admin-template' style='width:100%'></select><textarea id='admin-template-body' rows='5' style='width:100%'></textarea><button class='btn' onclick='adminSaveTemplate()'>Vorlage speichern</button></div></section>"+
 "<section class='admin-tab' id='admin-tools'><div class='admin-section'><button class='btn' onclick='adminShowState()'>Spielstand in neuem Fenster</button></div><div class='admin-section'><button class='btn' style='background:#b22;color:white' onclick='adminFullReset()'>Gesamten Spielstand löschen</button></div></section>";
 const sel=byId("admin-template");Object.keys(TEXT_TEMPLATES).forEach(k=>{const o=document.createElement("option");o.value=k;o.textContent=k;sel.appendChild(o);});sel.onchange=()=>{byId("admin-template-body").value=TEXT_TEMPLATES[sel.value]||"";};sel.dispatchEvent(new Event("change"));
}
window.adminTab=function(n){document.querySelectorAll(".admin-tab").forEach(x=>x.classList.remove("active"));byId("admin-"+n).classList.add("active");};
window.adminSetSP=function(){gameState.sp=Math.max(0,Number(byId("admin-sp-value").value)||0);updateAllDisplays();saveGameState();};
window.adminGrantPrestige=function(){gameState.prestige.points+=Math.max(0,Number(byId("admin-pp-value").value)||0);renderPrestigeTree();saveGameState();};
window.adminResetStats=function(){if(!confirm("Statistiken zurücksetzen?"))return;gameState.stats={totalChars:0,manualChars:0,autoChars:0,goldChars:0,textsFinished:0,purpleChars:0,blueChars:0,errorFreeStreak:0,bestStreak:0,errors:0,uppercaseCorrect:0};updateAllDisplays();saveGameState();};
window.adminResetUpgrades=function(){if(!confirm("Normale Upgrades zurücksetzen?"))return;gameState.upgrades={};buildSkillTreeUI();updateAllDisplays();saveGameState();};
window.adminAddText=function(){const title=byId("admin-title").value.trim(),body=byId("admin-body").value.trim();if(!title||!body)return showToast("Titel und Inhalt fehlen.");const id="custom_"+Date.now();TEXT_TEMPLATES[id]=body;gameState.customTexts[id]={title:title,body:body};const o=document.createElement("option");o.value=id;o.textContent=title;byId("template-dropdown").appendChild(o);byId("template-dropdown").value=id;loadTemplate();saveGameState();showToast("Text gespeichert.");};
window.adminSaveTemplate=function(){const id=byId("admin-template").value;TEXT_TEMPLATES[id]=byId("admin-template-body").value;if(gameState.customTexts[id])gameState.customTexts[id].body=TEXT_TEMPLATES[id];saveGameState();showToast("Vorlage aktualisiert.");};
window.adminShowState=function(){const w=window.open("","_blank");if(w){const p=w.document.createElement("pre");p.textContent=JSON.stringify(gameState,null,2);w.document.body.appendChild(p);}};
window.adminFullReset=function(){if(!confirm("Wirklich den gesamten Spielstand löschen?"))return;localStorage.removeItem("writing_empire_v04_save");localStorage.removeItem("writing_empire_v03_save");location.reload();};
window.triggerAdminAccess=function(){if(currentUser?.app_metadata?.role!=="admin"){showToast("Kein Admin-Zugriff.");return;}buildAdmin();byId("admin-panel").style.display="block";adminTab("overview");byId("admin-sp").textContent=Math.floor(gameState.sp);byId("admin-chars").textContent=gameState.stats.totalChars;byId("admin-texts").textContent=gameState.stats.textsFinished;byId("admin-email").textContent=currentUser.email||"Admin";};
window.adminResetProgress=function(){if(!confirm("Textfortschritt zurücksetzen?"))return;gameState.textProgress=0;gameState.history=[];updateAllDisplays();saveGameState();};

/* iPad keyboard: visible shift and caps lock, physical keyboard respects exact case */
window.initKeyboard=function(){
 const kb=byId("virtual-keyboard");if(!kb)return;kb.innerHTML="";
 KEYBOARD_LAYOUT.forEach(key=>{const b=document.createElement("button");b.type="button";b.className="key";b.id="key-"+key;b.innerHTML=key+"<span class='key-sub-gold' id='sub-gold-"+key+"'></span><span class='key-sub-grey' id='sub-grey-"+key+"'></span>";b.onclick=()=>{if(key==="?123"){handleKeyInput("?123");return;}const c=getCurrentTextString()[gameState.textProgress];let v=key;if(/^[A-Z]$/.test(key)&&c&&c.toUpperCase()===key)v=(c===c.toUpperCase()&&c!==c.toLowerCase())?key:key.toLowerCase();if(gameState.settings.shift||gameState.settings.capsLock)v=v.toUpperCase();handleKeyInput(v);};kb.appendChild(b);});
 const sh=document.createElement("button");sh.type="button";sh.className="key";sh.textContent="⇧ Shift";sh.onclick=()=>{gameState.settings.shift=!gameState.settings.shift;};kb.appendChild(sh);
 const cp=document.createElement("button");cp.type="button";cp.className="key";cp.textContent="Caps Lock";cp.onclick=()=>{gameState.settings.capsLock=!gameState.settings.capsLock;};kb.appendChild(cp);
 const sp=document.createElement("button");sp.type="button";sp.className="key space-key";sp.id="key-SPACE";sp.textContent="LEERZEICHEN";sp.onclick=()=>handleKeyInput(" ");kb.appendChild(sp);
};
window.handleRealKeyDown=function(e){if(e.key==="Escape"){closeAdmin();return;}if(["Shift","CapsLock","Tab","Control","Alt"].includes(e.key)||e.metaKey||e.ctrlKey)return;if(e.key.length===1||e.key===" "){e.preventDefault();handleKeyInput(e.key);}};
const oldUpdate=window.updateAllDisplays;
window.updateAllDisplays=function(){oldUpdate();if(byId("we-pp"))byId("we-pp").textContent=gameState.prestige.points;if(byId("we-pl"))byId("we-pl").textContent=gameState.prestige.level;if(byId("admin-panel")&&byId("admin-panel").style.display==="block"){byId("admin-sp").textContent=Math.floor(gameState.sp);byId("admin-chars").textContent=gameState.stats.totalChars;byId("admin-texts").textContent=gameState.stats.textsFinished;}};
const oldLoad=window.loadGameState;
window.loadGameState=function(){oldLoad();gameState.stats=Object.assign({purpleChars:0,blueChars:0,errorFreeStreak:0,bestStreak:0,errors:0,uppercaseCorrect:0},gameState.stats||{});gameState.prestige=Object.assign({points:0,level:0,upgrades:{},totalPrestiges:0},gameState.prestige||{});gameState.settings=Object.assign({language:"de",background:"default",capsLock:false,shift:false},gameState.settings||{});gameState.customTexts=gameState.customTexts||{};Object.entries(gameState.customTexts).forEach(([id,t])=>{TEXT_TEMPLATES[id]=t.body;const d=byId("template-dropdown");if(d&&!Array.from(d.options).some(o=>o.value===id)){const o=document.createElement("option");o.value=id;o.textContent=t.title||id;d.appendChild(o);}});};
window.addEventListener("load",function(){addSettings();addPrestige();buildAdmin();buildSkillTreeUI();renderAchievements();updateAllDisplays();});
})();