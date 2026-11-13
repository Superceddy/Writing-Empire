/* Writing Empire v1.0 – stability, navigation, automation and admin fixes */
(function(){
"use strict";
const $=id=>document.getElementById(id);
const css=`
/* v1.0 consistent light theme */
body.we-paper,body.we-paper *{color-scheme:light}
body.we-paper #admin-panel,body.we-paper .admin-section,body.we-paper .we-stat,body.we-paper .we-prestige-card,body.we-paper .achievement-card,body.we-paper .skill-node,body.we-paper .auth-card,body.we-paper input,body.we-paper textarea,body.we-paper select,body.we-paper .tab-content,body.we-paper .paper-container,body.we-paper #we-theme-music{background:#f8f5eb!important;color:#34443c!important;border-color:#d7d0bd!important}
body.we-paper .skill-node p,body.we-paper .achievement-card p,body.we-paper small,body.we-paper .text-muted{color:#58675f!important}
body.we-paper .skill-node .cost,body.we-paper .sp-display{color:#8a6410!important}
#tab-prestige h2{display:block!important}
.we-v09-stat{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border:1px solid var(--border-color);border-radius:9px;background:var(--surface-dark);margin:6px 0}
.we-v09-stat b{font-size:20px}
#we-v09-blue-mult{font-size:12px;text-align:center;color:#4b9cff;margin:5px}
#we-group-tabs button{white-space:nowrap}
#admin-panel input,#admin-panel textarea{width:100%;min-height:44px;font-size:16px}
`;
const style=document.createElement("style");style.textContent=css;document.head.appendChild(style);
function toast(m){if(typeof showToast==="function")showToast(m);}
function editable(t){return !!t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));}
function allowTypingIntoFields(){
 window.addEventListener("keydown",e=>{
  if(editable(e.target)){e.stopImmediatePropagation();return;}
 },true);
 document.addEventListener("keydown",e=>{if(editable(e.target))e.stopImmediatePropagation();},true);
 // Reinstall the physical game-key handler only for the writing surface.
 window.handleRealKeyDown=function(e){
  if(editable(e.target)||e.defaultPrevented)return;
  if(["Shift","CapsLock","Tab","Control","Alt","Meta","Escape","Dead"].includes(e.key)||e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key.length===1||e.key===" "){e.preventDefault();window.handleKeyInput(e.key);}
 };
}
function renameTabs(){
 const prestigeNav=$("we-prestige-nav");if(prestigeNav)prestigeNav.textContent="👑 Prestige";
 const statsNav=document.querySelector('nav button[onclick*="tab-stats"]');if(statsNav)statsNav.textContent="📊 Statistiken";
 const settingsNav=document.querySelector('nav button[onclick*="tab-config"]');if(settingsNav)settingsNav.textContent="⚙ Einstellungen";
 const p=$("tab-prestige");if(p){const h=p.querySelector("h2");if(h)h.textContent="Prestige";}
 const st=$("tab-stats");if(st){const h=st.querySelector("h2");if(h)h.textContent="Statistiken";}
}
function showPrestigePoints(){
 const root=$("tab-prestige");if(!root)return;
 let n=$("we-v09-pp");if(!n){n=document.createElement("div");n.id="we-v09-pp";n.className="we-v09-stat";const h=root.querySelector("h2");(h||root).insertAdjacentElement("afterend",n);}
 n.innerHTML='<span>Deine Prestige-Punkte</span><b></b>';n.querySelector("b").textContent=gameState.prestige?.points||0;
}
function unifyStats(){
 const root=$("tab-stats");if(!root)return;
 const extra=$("we-extra-stats");if(extra){
  const cards=[...extra.querySelectorAll(".we-stat")];
  const target=root.querySelector(".we-stat-grid")||root;
  cards.forEach(c=>{c.classList.add("we-v09-stat");target.appendChild(c);});
  extra.remove();
 }
 const wrap=root.querySelector(".we-stat-wrap");
 if(wrap)[...wrap.children].forEach(c=>c.classList.add("we-v09-stat"));
 root.querySelectorAll(".stat-card,.stat-item,.we-stat").forEach(c=>c.classList.add("we-v09-stat"));
}
function refreshCountdown(){
 const fn=window.updateAllDisplays;
 if(!window.__we09UpdateWrapped&&typeof fn==="function"){
  window.__we09UpdateWrapped=true;
  window.updateAllDisplays=function(){fn();showPrestigePoints();unifyStats();};
 }
 const grey=[...document.querySelectorAll('[id^="sub-grey-"]')];
 grey.forEach(span=>{
  const key=span.id.slice("sub-grey-".length);
  const threshold=Math.max(2,6-(gameState.upgrades.free_speed||0));
  const prog=gameState.freeProgress?.[key]||0;
  span.textContent=(gameState.upgrades.unlock_free||0)>0?String(Math.max(0,threshold-prog)):"";
 });
 const mult=2+(gameState.upgrades.blue_power||0)+((gameState.upgrades.blue_precision||0)+(gameState.prestige?.upgrades?.p_blue||0))*.25;
 let n=$("we-v09-blue-mult");if(!n){n=document.createElement("div");n.id="we-v09-blue-mult";$("virtual-keyboard")?.after(n);}
 if(n)n.textContent="Blauer Zeichen-Multiplikator: ×"+mult;
}
function repairAutomation(){
 // Keep the switch and saved setting synchronized, and ensure the loop is ticked.
 const sw=$("switch-auto");
 if(sw&&!sw.__we09){sw.__we09=true;sw.addEventListener("change",()=>{gameState.settings.autoEnabled=sw.checked;saveGameState();});}
 if(sw&&sw.checked!==!!gameState.settings.autoEnabled)sw.checked=!!gameState.settings.autoEnabled;
 const label=$("we-auto-cooldown");
 if(label&&gameState.settings.autoEnabled&&((gameState.upgrades.unlock_auto||0)>0||(gameState.upgrades.auto_a||0)>0))label.textContent="Automatik aktiv";
}
function addSkills(){
 if(!Array.isArray(SKILL_TREE))return;
 const add=(id,label,desc,cost,group,maxLevel,requires,color)=>{if(!SKILL_TREE.some(s=>s.id===id))SKILL_TREE.push({id,label,desc,cost,maxLevel,requires,row:90+SKILL_TREE.length,group,color});};
 add("blue_precision","Blaue Präzision","Erhöht den Multiplikator blauer Zeichen um 0,25 je Stufe.",3500,"Blaue Multiplikatoren",10,["blue_power"],"blue");
 add("blue_duration_plus","Blaue Resonanz","Verlängert die Wirkung blauer Zeichen um 1 Sekunde je Stufe.",5000,"Blaue Multiplikatoren",8,["blue_power"],"blue");
 if(typeof window.buildSkillTreeUI==="function")window.buildSkillTreeUI();
}
function upgradeGroupFilter(){ /* Group tabs are rendered by the v0.8 skill-tree renderer. */ }

function fixUpgradeCards(){
 document.querySelectorAll(".skill-node").forEach(node=>{
  const cost=node.querySelector(".cost");if(!cost)return;
  // Keep prerequisites and price on separate lines, avoiding concatenated text.
  cost.style.display="block";cost.style.marginTop="7px";cost.style.lineHeight="1.5";
  const p=node.querySelector("p");if(p)p.style.marginBottom="7px";
 });
}
function fixSettings(){
 const cfg=$("tab-config");if(!cfg)return;
 // Keep only the original language selector; v0.8 accidentally added a
 // second selector with the same ID.
 $("we-language-card")?.remove();
 const moveGroup=(id,targetId,label)=>{
  const control=$(id),target=$(targetId);if(!control||!target)return;
  let group=control.closest(".form-group,.switch-container");
  if(!group)group=control.parentElement;
  if(!group||group===target||target.contains(group))return;
  const labelNode=group.querySelector("label,span");
  if(labelNode&&label)labelNode.textContent=label;
  target.appendChild(group);
 };
 moveGroup("setting-fontsize","we-v08-design","Schriftgröße im Papier");
 moveGroup("we-background","we-v08-design","Hintergrundfarbe");
 moveGroup("setting-sound","we-v08-sounds","Tastaturklang");
 const design=$("we-v08-design"),sounds=$("we-v08-sounds");
 if(design){const h=design.querySelector("h3");if(h)h.textContent="Design · Hintergrund & Schrift";}
 if(sounds){const h=sounds.querySelector("h3");if(h)h.textContent="Sounds";}
}
function fixAdmin(){
 const panel=$("admin-panel");if(!panel||panel.__we09)return;panel.__we09=true;
 const mo=new MutationObserver(()=>{
  const economy=$("admin-economy"),texts=$("admin-texts");
  const pub=$("we-public-admin");
  if(pub&&texts&&pub.parentElement!==texts)texts.appendChild(pub);
  if(economy){
   const controls=[...panel.querySelectorAll("button")].filter(b=>/SP pro Taste|Gold pro Taste|\+SP|\+Gold|max.*upgrade/i.test(b.textContent));
   controls.forEach(b=>{const sec=b.closest(".admin-section")||b; if(sec.parentElement!==economy)economy.appendChild(sec);});
  }
  const progress=$("admin-progress");
  if(progress){
   const fields=["admin-sp-value","admin-pp-value"];
   fields.forEach(id=>{const input=$(id);if(input){input.disabled=false;input.readOnly=false;input.style.pointerEvents="auto";input.style.zIndex="5";}});
  }
 });
 mo.observe(panel,{childList:true,subtree:true});
 const addAllPrestige=()=>{
  const section=$("admin-progress")||panel;
  if($("we-v09-all-prestige"))return;
  const b=document.createElement("button");b.id="we-v09-all-prestige";b.className="btn";b.textContent="Alle Prestige-Upgrades maximieren";
  b.onclick=()=>{if(!confirm("Alle Prestige-Upgrades maximieren?"))return;const costs={p_sp:10,p_gold:5,p_purple:5,p_start:5,p_auto:5,p_blue:5,p_discount:5,p_goldchance:5,p_purplechance:5,p_capacity:5,p_skilltree:1};Object.entries(costs).forEach(([id,max])=>gameState.prestige.upgrades[id]=max);gameState.prestige.points=0;updateAllDisplays();saveGameState();};
  section.appendChild(b);
  const points=document.createElement("button");points.id="we-v09-grant-all-pp";points.className="btn";points.textContent="Alle Prestige-Punkte hinzufügen (+100.000)";points.onclick=()=>window.adminGrantAllPrestige();section.appendChild(points);
 };
 addAllPrestige();
 if(!window.__we09AdminFns){
  window.__we09AdminFns=true;
  window.adminGrantPrestige=function(){const input=$("admin-pp-value");const amount=Math.max(0,Number(input?.value)||0);gameState.prestige=gameState.prestige||{points:0,upgrades:{}};gameState.prestige.points+=amount;updateAllDisplays();saveGameState();toast("Prestige-Punkte vergeben.");};
  window.adminSetSP=function(){const input=$("admin-sp-value");gameState.sp=Math.max(0,Number(input?.value)||0);updateAllDisplays();saveGameState();toast("SP gesetzt.");};
  window.adminUnlockAllAchievements=function(){
   ACHIEVEMENTS.forEach(a=>{if(!gameState.achievementsUnlocked.includes(a.id)){gameState.achievementsUnlocked.push(a.id);gameState.sp+=a.reward||0;gameState.totalSpEarned+=a.reward||0;}});
   saveGameState();renderAchievements();updateAllDisplays();toast("Alle Erfolge freigeschaltet.");
  };
  window.adminGrantAllPrestige=function(){gameState.prestige=gameState.prestige||{points:0,upgrades:{}};gameState.prestige.points+=100000;updateAllDisplays();saveGameState();toast("Prestige-Punkte vergeben.");};
 }
}
function unlockExtraAchievements(){
 const values={purple_chars:gameState.stats.purpleChars||0,blue_chars:gameState.stats.blueChars||0,best_streak:gameState.stats.bestStreak||0};
 ACHIEVEMENTS.forEach(a=>{const val=values[a.type];if(val===undefined||val<a.target||gameState.achievementsUnlocked.includes(a.id))return;gameState.achievementsUnlocked.push(a.id);gameState.sp+=a.reward||0;gameState.totalSpEarned+=a.reward||0;});
}
function repairAchievementProgress(){
 if(!Array.isArray(ACHIEVEMENTS))return;
 const vals={total_chars:()=>gameState.stats.totalChars||0,total_sp:()=>gameState.totalSpEarned||0,upgrades_bought:()=>Object.values(gameState.upgrades||{}).reduce((a,b)=>a+b,0),auto_unlocked:()=>gameState.upgrades.unlock_auto?1:0,texts_finished:()=>gameState.stats.textsFinished||0,auto_chars:()=>gameState.stats.autoChars||0,gold_chars:()=>gameState.stats.goldChars||0,purple_chars:()=>gameState.stats.purpleChars||0,blue_chars:()=>gameState.stats.blueChars||0,best_streak:()=>gameState.stats.bestStreak||0};
 ACHIEVEMENTS.forEach(a=>{const val=vals[a.type]?.()??0;const card=[...($("achievements-display")?.querySelectorAll(".achievement-card")||[])].find(c=>c.querySelector("h4")?.textContent===a.name);if(card){const n=card.children[2],f=card.querySelector(".progress-fill");if(n)n.textContent=Math.min(val,a.target)+" / "+a.target;if(f)f.style.width=Math.min(100,val/a.target*100)+"%";card.classList.toggle("unlocked",gameState.achievementsUnlocked.includes(a.id));}});
}
function fixBlueMultiplier(){
 const old=window.executeCharacterWrite;
 if(typeof old==="function"&&!window.__we09BlueWrapped){
  window.__we09BlueWrapped=true;
  window.executeCharacterWrite=function(ch,type){
   if(type!=="blue")return old(ch,type);
   const base=gameState.upgrades.blue_power||0;
   const precision=(gameState.upgrades.blue_precision||0)+(gameState.prestige?.upgrades?.p_blue||0);
   gameState.upgrades.blue_power=base+precision*.25;
   try{old(ch,type);}
   finally{gameState.upgrades.blue_power=base;}
   gameState.blueUntil=(gameState.blueUntil||Date.now())+(gameState.upgrades.blue_duration_plus||0)*1000;
  };
 }
}
function greenUpgradeEffect(){ /* Green characters are a real character type in v0.6. */ }
function repairAutoAchievements(){
 const values={auto_chars:gameState.stats.autoChars||0};
 ACHIEVEMENTS.forEach(a=>{
  if(a.type!=="auto_chars"||values.auto_chars<a.target||gameState.achievementsUnlocked.includes(a.id))return;
  gameState.achievementsUnlocked.push(a.id);
  const reward=a.reward||0;gameState.sp+=reward;gameState.totalSpEarned+=reward;
  toast("Erfolg freigeschaltet: "+a.name);
 });
}

function install(){
 if(window.__weV09)return;window.__weV09=true;
 gameState.settings=Object.assign({autoEnabled:true},gameState.settings||{});
 allowTypingIntoFields();renameTabs();addSkills();greenUpgradeEffect();fixSettings();fixAdmin();upgradeGroupFilter();fixBlueMultiplier();repairAutoAchievements();
 const oldBuy=window.buyUpgrade;if(typeof oldBuy==="function"&&!window.__we09AutoPurchase){window.__we09AutoPurchase=true;window.buyUpgrade=function(id,cost){oldBuy(id,cost);if(id==="unlock_auto"||id==="auto_a"){gameState.settings.autoEnabled=true;const sw=$("switch-auto");if(sw)sw.checked=true;saveGameState();}};}
 const oldUpdate=window.updateAllDisplays;
 if(typeof oldUpdate==="function"&&!window.__we09FinalUpdate){
  window.__we09FinalUpdate=true;
  window.updateAllDisplays=function(){oldUpdate();showPrestigePoints();unifyStats();refreshCountdown();repairAchievementProgress();};
 }
 refreshCountdown();repairAutomation();fixUpgradeCards();
 setInterval(()=>{refreshCountdown();repairAutomation();fixUpgradeCards();unlockExtraAchievements();repairAutoAchievements();repairAchievementProgress();},500);
 const version=[...document.querySelectorAll("header span")].find(x=>/v\d/.test(x.textContent));if(version)version.textContent="v1.0.1";
}
window.addEventListener("load",()=>setTimeout(install,1100));
})();