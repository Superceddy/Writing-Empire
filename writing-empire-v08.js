/* Writing Empire v0.8 */
(function(){
"use strict";
const $=id=>document.getElementById(id);
const st=document.createElement("style");
st.textContent="html,body{height:auto!important;min-height:100%;overflow-x:hidden!important;overflow-y:auto!important}body{display:flex;flex-direction:column}.main-layout{flex:1 0 auto;min-height:calc(100vh - 70px);overflow:visible!important}.content-area{height:auto!important;min-height:100%;overflow:visible!important}.tab-content,.tab-content.active{height:auto!important;min-height:0}#we-group-tabs{position:static!important;top:auto!important;z-index:auto!important;display:flex;flex-wrap:wrap;gap:7px;margin:12px 0;padding:8px;background:var(--surface-dark);border-radius:10px}#virtual-keyboard{display:flex!important;flex-direction:column;gap:7px;max-width:900px}.we-key-row{display:flex;justify-content:center;gap:6px;width:100%}.we-key-row .key{flex:1;min-width:0;max-width:68px;height:52px}.we-key-row .key.wide{max-width:92px;flex:1.35}.we-key-row .key.space-key{flex:5;max-width:none;height:48px}.we-key-row .key.modifier{font-size:12px;max-width:92px}.we-key-pressed,.key.we-key-pressed{background:#e8c84b!important;color:#171717!important;transform:translateY(2px);box-shadow:0 0 0 3px #ffe98a,0 0 15px #ffd700!important}.key.next-key{outline:3px solid #ffe45c;outline-offset:1px}#tab-stats .we-stat-grid,#tab-stats .we-stat-wrap{display:flex;flex-direction:column;gap:7px}#tab-stats .we-stat{display:flex;align-items:center;justify-content:space-between;padding:9px 12px}#tab-stats .we-stat b{font-size:16px;margin:0}#tab-prestige .we-progress{height:14px;background:#333;border-radius:20px;overflow:hidden;margin:8px 0}#tab-prestige .we-progress>span{display:block;height:100%;background:#b77be7;transition:width .2s}.we-settings-card{background:var(--surface-dark);border:1px solid var(--border-color);border-radius:10px;padding:14px;margin:12px 0}#admin-panel{max-height:88vh;height:auto;min-height:65vh;overflow-y:auto}.admin-tabs{display:flex;flex-wrap:wrap;gap:7px;position:static!important}.admin-tab{max-height:none;overflow:visible}.we-admin-tabs{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}.we-admin-tabs button{padding:9px 13px;border-radius:8px;border:1px solid #555;background:#292929;color:white}.we-admin-tabs button.active{background:#8a3030}.we-admin-page{display:none}.we-admin-page.active{display:block}.we-theme-paper{--bg-dark:#e9e5d8;--surface-dark:#f8f5eb;--text-main:#263a32;--text-muted:#627067;--border-color:#c9c1af;--accent-gold:#a57b19;--accent-purple:#7650a8}body{background:var(--bg-dark);color:var(--text-main)}header{background:var(--surface-dark);color:var(--text-main)}.content-area{background:var(--we-main-bg,var(--bg-dark))}nav{background:var(--we-nav-bg,var(--surface-dark))}input,textarea,select{background:var(--we-input-bg,var(--surface-dark));color:var(--text-main);border-color:var(--border-color)}@media(max-width:760px){.main-layout{display:block}.content-area{padding:12px}nav{width:100%;display:flex;flex-direction:row;overflow-x:auto;position:relative}nav .nav-btn{white-space:nowrap;padding:10px 12px;font-size:13px}.we-key-row{gap:4px}.we-key-row .key{height:44px;font-size:14px}.we-key-row .key.modifier{font-size:10px}}";
document.head.appendChild(st);

/* New texts: the first story is well over 500 words. */
TEXT_TEMPLATES.long_library=[
"Über den Dächern von Auralis schwebte eine Bibliothek, die auf keiner Karte verzeichnet war. Ihre Tür erschien nur bei Sonnenaufgang, wenn der Wind aus Norden kam und die Glocken der Stadt dreimal schlugen.",
"Die Menschen erzählten sich, dort würden Bücher aufbewahrt, die noch niemand geschrieben hatte. Andere behaupteten, die Bibliothek sammle Erinnerungen, die sonst verloren gingen. Niemand wusste, welche Geschichte stimmte, denn kaum jemand hatte den Weg hinauf gefunden.",
"An einem Herbstmorgen entdeckte die junge Kartografin Mira eine silberne Treppe zwischen zwei Wolken. Sie trug einen abgenutzten Rucksack, ein Notizbuch und den Kompass ihres Großvaters. Die Nadel zeigte nicht nach Norden, sondern direkt in den Himmel.",
"Stufe für Stufe stieg Mira hinauf. Unter ihr wurden die Häuser kleiner, die Straßen zu dünnen Linien und der Fluss zu einem glänzenden Band. Als sie die letzte Stufe erreichte, stand sie vor einem hohen Tor aus hellem Holz.",
"Das Tor öffnete sich lautlos. Dahinter lagen endlose Säle mit Regalen, die bis in den Nebel reichten. Kleine Lampen schwebten zwischen den Büchern. Auf jedem Rücken stand ein Name, doch viele Namen waren Mira unbekannt.",
"Eine alte Bibliothekarin begrüßte sie. Ihr Mantel war mit winzigen Sternen bestickt, und in ihrer Hand hielt sie einen Schlüssel aus Glas. Sie erklärte, dass jedes Buch eine Entscheidung festhalte, die ein Mensch irgendwann getroffen hatte.",
"Manche Bücher waren dünn wie ein Blatt Papier. Andere waren so groß, dass mehrere Leitern nötig waren, um ihren Titel zu lesen. Ein Regal enthielt Geschichten über mutige Reisen, ein anderes über verpasste Gelegenheiten und neue Anfänge.",
"Mira fragte nach dem Buch ihres Großvaters. Er war vor vielen Jahren verschwunden, als er eine Karte der nördlichen Berge zeichnen wollte. Die Bibliothekarin nickte und führte sie zu einem stillen Raum hinter einer runden Tür.",
"Dort stand ein einzelnes Buch auf einem Pult. Sein Einband war dunkelblau und roch nach Regen. Auf der ersten Seite fand Mira eine Zeichnung des Kompasses. Daneben stand eine Nachricht, die nur an sie gerichtet war.",
"Der Text erzählte von einem verborgenen Tal, das sich nur zeigte, wenn jemand nicht nach dem kürzesten Weg suchte. Ihr Großvater hatte das Tal gefunden, aber beschlossen, dort zu bleiben, um eine bedrohte Siedlung zu beschützen.",
"Mira las weiter und erfuhr, dass die Bewohner des Tals ihre Karten verloren hatten. Ohne Wege und Grenzen konnten sie ihre Felder nicht mehr teilen. Der Großvater hatte versprochen, ihnen eine neue Karte zu zeichnen und anschließend zurückzukehren.",
"Die Bibliothekarin erklärte, dass das Buch nicht die Zukunft festlege. Es zeige nur, welche Spuren Entscheidungen hinterlassen könnten. Mira müsse selbst wählen, ob sie dem Weg folgen oder die Nachricht als Erinnerung bewahren wolle.",
"Sie dachte an ihre Werkstatt, an die vertrauten Straßen und an die Menschen, die auf ihre Rückkehr warteten. Dann betrachtete sie den Kompass. Die Nadel zitterte, als würde sie auf eine Antwort warten.",
"Mira nahm ein leeres Blatt aus ihrem Notizbuch und zeichnete die Treppe, das Tor und den stillen Raum. Zum ersten Mal verstand sie, dass eine Karte nicht nur Orte zeigen musste. Sie konnte auch Fragen festhalten.",
"Bevor sie ging, schenkte ihr die Bibliothekarin einen kleinen Schlüssel. Er sollte keine Tür öffnen, sondern sie daran erinnern, dass jeder Weg mit einem ersten Schritt begann. Mira steckte ihn neben den Kompass.",
"Der Abstieg dauerte länger als der Aufstieg. Die Wolken zogen auseinander und gaben den Blick auf eine Bergkette frei, die auf keiner ihrer bisherigen Karten stand. Dort musste das verborgene Tal liegen.",
"Zurück in Auralis erzählte Mira niemandem von der Bibliothek. Sie packte Proviant, Papier und Zeichenstifte ein. Auf ihrer neuen Karte ließ sie bewusst Platz für unbekannte Wege und für die Namen der Menschen, denen sie begegnen würde.",
"Viele Wochen später erreichte sie das Tal. Die Bewohner empfingen sie vorsichtig, doch als sie den Kompass sahen, erkannten sie das Zeichen ihres alten Beschützers. Gemeinsam zeichneten sie Wege, Brücken, Felder und sichere Übergänge.",
"Als Mira schließlich nach Hause zurückkehrte, war ihr Notizbuch voller Karten. Auf der letzten Seite schrieb sie, dass kein Atlas vollständig sein könne, solange Menschen neue Entscheidungen trafen. Dann schloss sie das Buch und begann eine neue Karte."
].join("\n\n");
TEXT_TEMPLATES.long_archive=[
"Im alten Archiv von Veyra wurden Karten gesammelt, die niemand mehr lesen konnte. Einige waren in vergessenen Sprachen geschrieben, andere zeigten Orte, die längst vom Meer bedeckt waren. Die Archivarin Elin erhielt eines Tages einen ungewöhnlichen Auftrag.",
"Ein Händler hatte eine Karte abgegeben, auf der eine Insel eingezeichnet war, die jede Nacht ihre Position wechselte. Elin verglich sie mit alten Seekarten und fand dieselbe Insel auf drei verschiedenen Seiten. Doch jedes Mal lag sie an einem anderen Ort.",
"Sie beschloss, die Aufzeichnungen zu ordnen. Dabei bemerkte sie, dass die Insel immer dort erschien, wo ein Schiff seine Reise abgebrochen hatte. Vielleicht war sie kein fester Ort, sondern ein Zeichen für unerfüllte Pläne.",
"Elin schrieb einen Bericht und legte ihn in das Fach für ungelöste Rätsel. Am nächsten Morgen war die Karte verschwunden. An ihrer Stelle lag ein kleiner Zettel mit nur einem Satz: Nicht jeder verlorene Weg möchte gefunden werden.",
"Seit diesem Tag prüfte Elin jede Karte sorgfältig, bevor sie sie einordnete. Manche Dokumente waren Wegweiser, andere Warnungen und wieder andere bloß Erinnerungen. Das Archiv wurde dadurch nicht kleiner, aber seine Geschichten wurden verständlicher."
].join("\n\n");
TEXT_TEMPLATES.long_clockmaker=[
"Der letzte Uhrmacher der Stadt hieß Arvid und arbeitete in einer Werkstatt, deren Fenster immer golden schimmerten. Er reparierte keine gewöhnlichen Uhren. Seine Maschinen maßen die Zeit, die Menschen miteinander verbrachten, und bewahrten sie in kleinen Glasrädern auf.",
"Eines Tages brachte ein Kind eine stehen gebliebene Taschenuhr. Sie hatte seinem Vater gehört, der auf einer langen Reise war. Arvid öffnete das Gehäuse und fand darin kein zerbrochenes Zahnrad, sondern ein winziges Stück blaues Glas.",
"Er erklärte dem Kind, dass die Uhr nicht kaputt sei. Sie warte auf einen Moment, der noch nicht gekommen war. Das Kind setzte sich ans Fenster und erzählte von seinem Vater, von den gemeinsamen Ausflügen und von den Geschichten, die sie abends gelesen hatten.",
"Als die Sonne unterging, begann das Glas im Inneren zu leuchten. Die Zeiger bewegten sich wieder, ganz langsam und ohne ein Geräusch. Arvid lächelte und gab die Uhr zurück. Manche Dinge, sagte er, lassen sich nicht mit Werkzeug reparieren.",
"Viele Jahre später schloss Arvid seine Werkstatt. Die Stadt hatte inzwischen digitale Uhren an jeder Ecke, doch die Menschen erinnerten sich an seine besonderen Maschinen. Sie wussten, dass Zeit nicht nur aus Sekunden bestand, sondern auch aus Augenblicken, die man miteinander teilte."
].join("\n\n");


/* English versions of built-in templates so the language setting also switches sample texts. */
TEXT_TEMPLATES.maerchen_en="Once upon a time, a small lonely letter lived inside a deep, dark inkwell. One day it decided to travel the world. It climbed over the rim and jumped onto a sheet of snow-white paper. There it met other characters, and together they founded the mighty Writing Empire.";
TEXT_TEMPLATES.fantasy_en="The drums of destiny echoed through the broken valley of Scriptoria. Ancient machines, powered by pure glyph dust, awoke from their centuries-long sleep. Every sentence written broke another seal of the dark Lord of Grammar Freedom.";
TEXT_TEMPLATES.science_en="The cybernetic interface processed a hundred terabytes of text data every second. Human thought and neural automation merged into a perfect unity. The Empire no longer expanded through swords, but through the fundamental power of structured algorithms.";
TEXT_TEMPLATES.long_library_en=[
"Above the rooftops of Auralis floated a library that appeared on no map. Its door could only be seen at sunrise, when the wind came from the north and the city bells rang three times.",
"People said that the library held books no one had written yet. Others believed it collected memories that would otherwise disappear. Nobody knew which story was true, because almost no one had found the path into the clouds.",
"One autumn morning, a young mapmaker named Mira discovered a silver staircase between two clouds. She carried a worn backpack, a notebook and her grandfather's compass. Its needle did not point north. It pointed straight into the sky.",
"Step by step, Mira climbed higher. The houses below became tiny, the streets turned into thin lines and the river looked like a shining ribbon. At the top stood a tall gate made of pale wood.",
"The gate opened without a sound. Beyond it were endless halls filled with shelves that vanished into the mist. Small lamps floated between the books. Every spine carried a name, though most of them meant nothing to Mira.",
"An elderly librarian welcomed her. Tiny stars were embroidered on her coat, and she held a key made of glass. She explained that every book recorded a decision someone had made during their life.",
"Some books were as thin as a sheet of paper. Others were so large that several ladders were needed to read their titles. One shelf held stories of brave journeys, another held missed chances and new beginnings.",
"Mira asked for the book belonging to her grandfather. He had disappeared many years earlier while drawing a map of the northern mountains. The librarian nodded and led her to a quiet room behind a round door.",
"A single book rested on a desk. Its cover was dark blue and smelled faintly of rain. On the first page Mira found a drawing of the compass. Beside it was a message addressed only to her.",
"The message described a hidden valley that appeared only to those who did not search for the shortest route. Her grandfather had found the valley, but had chosen to stay and protect a settlement that was in danger.",
"Mira read on and learned that the people of the valley had lost their maps. Without paths and boundaries, they could no longer share their fields. Her grandfather had promised to draw a new map and return home afterwards.",
"The librarian explained that the book did not determine the future. It only showed the traces that decisions might leave behind. Mira had to choose whether to follow the path or keep the message as a memory.",
"She thought of her workshop, the familiar streets and the people waiting for her return. Then she looked at the compass. The needle trembled as if it were waiting for an answer.",
"Mira took a blank page from her notebook and drew the staircase, the gate and the quiet room. For the first time she understood that a map did not only have to show places. It could also preserve questions.",
"Before she left, the librarian gave her a small key. It was not meant to open a door. It was meant to remind her that every journey began with a first step. Mira placed it beside the compass.",
"The way down took longer than the way up. The clouds parted and revealed a mountain range that had never appeared on any of her maps. The hidden valley had to be somewhere beyond those peaks.",
"Back in Auralis, Mira told no one about the library. She packed food, paper and drawing pencils. On her new map she deliberately left room for unknown paths and for the names of people she had not met yet.",
"Many weeks later she reached the valley. The people greeted her cautiously, but when they saw the compass they recognized the sign of their old protector. Together they drew paths, bridges, fields and safe crossings.",
"When Mira finally returned home, her notebook was full of maps. On the last page she wrote that no atlas could ever be complete while people continued to make new choices. Then she closed the book and began another map."
].join("\n\n");
TEXT_TEMPLATES.long_archive_en="The old archive of Veyra collected maps that no one could read anymore. Some were written in forgotten languages, while others showed places long since covered by the sea. One day the archivist Elin received an unusual assignment. A merchant had delivered a map showing an island that changed its position every night. Elin compared it with old sea charts and found the same island on three different pages, but never in the same place. She began sorting the records and noticed that the island always appeared where a ship had abandoned its journey. Perhaps it was not a fixed place at all, but a sign of plans left unfinished. Elin wrote a report and placed it in the section for unsolved mysteries. The next morning the map had vanished. In its place lay a small note with one sentence: Not every lost path wants to be found. From that day on, Elin examined every map carefully before filing it away. Some documents were directions, others were warnings, and some were simply memories. The archive did not become smaller, but its stories became easier to understand.";
TEXT_TEMPLATES.long_clockmaker_en="The last clockmaker in the city was named Arvid. He worked in a workshop whose windows always seemed to glow gold. He did not repair ordinary clocks. His machines measured the time people spent together and stored it inside tiny glass wheels. One day a child brought him a pocket watch that had stopped. It had belonged to the child's father, who was away on a long journey. Arvid opened the case and found no broken gear, but a tiny piece of blue glass. He explained that the watch was not broken. It was waiting for a moment that had not arrived yet. The child sat by the window and spoke about their father, their shared trips and the stories they used to read in the evenings. When the sun went down, the glass began to shine. The hands started moving again, slowly and without a sound. Arvid smiled and returned the watch. Some things, he said, cannot be repaired with tools. Many years later Arvid closed his workshop. The city had digital clocks on every corner, but people still remembered his unusual machines. They knew that time was not only made of seconds, but also of moments shared with others.";

function addTextOptions(){
 const sel=$("template-dropdown");if(!sel)return;
 [["long_library","Die Bibliothek unter den Wolken · Langtext (über 500 Wörter)"],["long_archive","Das Archiv der verlorenen Karten"],["long_clockmaker","Der letzte Uhrmacher"],["maerchen_en","The Golden Letter"],["fantasy_en","The Valley of Scriptoria"],["science_en","The Cybernetic Empire"],["long_library_en","The Library Above the Clouds · Long text (500+ words)"],["long_archive_en","The Archive of Lost Maps"],["long_clockmaker_en","The Last Clockmaker"]].forEach(([id,label])=>{if(![...sel.options].some(o=>o.value===id)){const o=document.createElement("option");o.value=id;o.textContent=label;sel.appendChild(o);}});
}
function caseUnlocked(){return typeof isUpgradePurchased==="function"&&isUpgradePurchased("case_master");}
function makeKey(label,code,kind){
 const b=document.createElement("button");b.type="button";b.className="key"+(kind?" "+kind:"");b.dataset.key=code;b.id="key-"+(code===" "?"SPACE":code.toUpperCase());b.textContent=label;
 b.addEventListener("pointerdown",()=>b.classList.add("we-key-pressed"));
 ["pointerup","pointercancel","pointerleave"].forEach(ev=>b.addEventListener(ev,()=>b.classList.remove("we-key-pressed")));
 return b;
}
function updateKeyboard(){
 const kb=$("virtual-keyboard");if(!kb)return;
 const enabled=caseUnlocked(),upper=!!gameState.settings.capsLock!==!!gameState.settings.shift;
 if(kb.dataset.caseUnlocked!==String(enabled)){initKeyboardV08();return;}
 kb.querySelectorAll(".modifier").forEach(b=>b.style.display=enabled?"":"none");
 kb.querySelectorAll("button").forEach(b=>{
  if(/^[A-ZÄÖÜ]$/.test(b.dataset.key||""))b.textContent=enabled?(upper?b.dataset.key:b.dataset.key.toLowerCase()):b.dataset.key.toLowerCase();
  b.classList.toggle("we-key-pressed",b.dataset.key==="SHIFT"&&!!gameState.settings.shift||b.dataset.key==="CAPSLOCK"&&!!gameState.settings.capsLock);
 });
 let state=$("we-case-state");if(!state){state=document.createElement("div");state.id="we-case-state";kb.after(state);}
 state.textContent=gameState.settings.language==="en"?(enabled?"Case: "+(upper?"UPPERCASE":"lowercase"):"Case controls are locked"):(enabled?"Schreibweise: "+(upper?"GROSS":"klein"):"Groß-/Kleinschreibung noch gesperrt");
 const space=$("key-SPACE");if(space)space.textContent=gameState.settings.language==="en"?"SPACE":"LEERZEICHEN";
}
function initKeyboardV08(){
 const kb=$("virtual-keyboard");if(!kb)return;kb.innerHTML="";kb.dataset.caseUnlocked=String(caseUnlocked());
 const rows=[["Q","W","E","R","T","Z","U","I","O","P","Ü"],["A","S","D","F","G","H","J","K","L","Ö","Ä"],["Y","X","C","V","B","N","M",",",".","ß","?123"]];
 rows.forEach((keys,i)=>{const row=document.createElement("div");row.className="we-key-row";if(i===1)row.style.padding="0 3%";if(i===2)row.style.padding="0 1%";
  keys.forEach(k=>{const b=makeKey(k,k);b.onclick=()=>{
   if(k==="?123"){handleKeyInput("?123");updateKeyboard();return;}
   const expected=getCurrentTextString()[gameState.textProgress];let out=k;
   if(/[A-ZÄÖÜ]/.test(k)){if(caseUnlocked()){const upper=!!gameState.settings.capsLock!==!!gameState.settings.shift;out=upper?k:k.toLowerCase();}else out=expected&&expected.toUpperCase()===k?expected:k.toLowerCase();}
   handleKeyInput(out);if(caseUnlocked()&&gameState.settings.shift)gameState.settings.shift=false;updateKeyboard();
  };row.appendChild(b);});kb.appendChild(row);
 });
 const bottom=document.createElement("div");bottom.className="we-key-row";
 if(caseUnlocked()){
  const shift=makeKey("⇧ Shift","SHIFT","modifier wide");shift.onclick=()=>{gameState.settings.shift=!gameState.settings.shift;updateKeyboard();};bottom.appendChild(shift);
  const caps=makeKey("⇪ Shift Lock","CAPSLOCK","modifier wide");caps.onclick=()=>{gameState.settings.capsLock=!gameState.settings.capsLock;gameState.settings.shift=false;updateKeyboard();};bottom.appendChild(caps);
 }
 const space=makeKey("LEERZEICHEN"," ","space-key");space.onclick=()=>{handleKeyInput(" ");if(gameState.settings.shift)gameState.settings.shift=false;updateKeyboard();};bottom.appendChild(space);kb.appendChild(bottom);updateKeyboard();
}
function flashKey(ch){const id=ch===" "?"SPACE":(ch==="ß"||ch==="ẞ"?"ß":String(ch||"").toUpperCase());const b=$("key-"+id);if(!b)return;b.classList.add("we-key-pressed");clearTimeout(b.__flashTimer);b.__flashTimer=setTimeout(()=>b.classList.remove("we-key-pressed"),150);}
window.handleRealKeyDown=function(e){
 if(e.key==="Escape"){if(typeof closeAdmin==="function")closeAdmin();return;}
 if(["Shift","CapsLock","Tab","Control","Alt","Meta","Dead"].includes(e.key)||e.metaKey||e.ctrlKey||e.altKey)return;
 if(e.key.length===1||e.key===" "){e.preventDefault();flashKey(e.key);handleKeyInput(e.key);updateKeyboard();}
};
window.addEventListener("keyup",e=>{if(e.key==="Shift"||e.key==="CapsLock")updateKeyboard();});
window.initKeyboard=initKeyboardV08;
window.updateNextKeyboardKey=function(){document.querySelectorAll(".key.next-key,.key.auto-key").forEach(x=>x.classList.remove("next-key","auto-key"));if(!isUpgradePurchased("keyboard_hint"))return;const ch=getCurrentTextString()[gameState.textProgress];if(!ch)return;let key=ch===" "?"SPACE":(ch==="ß"||ch==="ẞ"?"ß":ch.toUpperCase());if(!$("key-"+key))key="?123";$("key-"+key)?.classList.add("next-key");};

const groupOrder=["Schreibkunst","Gold","Purpur","Blaue Multiplikatoren","Prestige","Automatisierung"];
const effect={
 base_click:{unit:"SP pro manuellem Zeichen",v:l=>l},
 case_master:{unit:"Bonus-SP pro korrekt getipptem Großbuchstaben",v:l=>l},
 vowel_power:{unit:"Zusatz-Fortschritt pro Vokal (A, E, I, O, U)",v:l=>l},
 consonant_power:{unit:"Zusatz-Fortschritt pro Konsonant (B–Z ohne A, E, I, O, U)",v:l=>l},
 free_speed:{unit:"Fortschrittsschritte bis zum Goldzeichen",v:l=>Math.max(2,6-l)},
 purple_power:{unit:"Zusatz-SP pro Purpurzeichen",v:l=>2*l},
 gold_power:{unit:"Zusatz-SP pro Goldzeichen",v:l=>3*l},
 blue_power:{unit:"Multiplikator für blaue Zeichen",v:l=>2+l},
 blue_duration:{unit:"Zusätzliche Dauer des blauen Bonus",v:l=>1.5*l},
 auto_speed:{unit:"Automatikintervall",v:l=>Math.max(250,3000-300*l-(gameState.prestige?.upgrades?.p_auto||0)*150)},
 gold_frequency:{unit:"Abstand zwischen Goldzeichen",v:l=>Math.max(16,42-4*l-2*(gameState.upgrades.gold_capacity||0)-3*(gameState.prestige?.upgrades?.p_goldchance||0))},
 gold_capacity:{unit:"Abstand zwischen Goldzeichen",v:l=>Math.max(16,42-4*(gameState.upgrades.gold_frequency||0)-2*l-3*(gameState.prestige?.upgrades?.p_goldchance||0))},
 purple_frequency:{unit:"Abstand zwischen Purpurzeichen",v:l=>Math.max(10,28-3*l-2*(gameState.prestige?.upgrades?.p_purplechance||0))},
 streak_power:{unit:"Zusatz-SP pro fehlerfreiem Zeichen",v:l=>l},
 special_power:{unit:"Zusatz-SP pro Sonderzeichen",v:l=>2*l},
 imperial_script:{unit:"Zusatz-SP pro manuellem Zeichen",v:l=>2*l},
 green_focus:{unit:"Bonus-SP je 5 fehlerfreie Zeichen",v:l=>l},
 red_rare:{unit:"Bonus-SP für Q, X, Y, Z und J",v:l=>5*l},
 long_streak:{unit:"Bonus-SP je 10 fehlerfreie Zeichen",v:l=>l}
};
function describeSkill(s,l){
 const id=s.id;
 if(gameState.settings.language==="en"&&window.__we08SkillEnglish&&window.__we08SkillEnglish[id]&&!["imperial_script","blue_power","blue_duration","auto_speed","gold_frequency","gold_capacity","purple_frequency","streak_power","special_power","gold_power"].includes(id))return window.__we08SkillEnglish[id][1];
 if(id==="unlock_free")return gameState.settings.language==="en"?"Unlocks the gold ink tank. Gold characters are stored and used automatically at the matching position.":"Schaltet den Goldtintentank frei. Goldzeichen werden gesammelt und an der passenden Stelle automatisch eingesetzt.";
 if(id==="blue_unlock")return gameState.settings.language==="en"?"Unlocks blue multiplier characters. They appear every 75 text positions.":"Schaltet blaue Multiplikator-Zeichen frei. Sie erscheinen alle 75 Textpositionen.";
 if(id==="gold_frequency"||id==="gold_capacity")return gameState.settings.language==="en"?"Gold characters appear every "+effect[id].v(l)+" text positions.":"Goldzeichen erscheinen alle "+effect[id].v(l)+" Textpositionen.";
 if(id==="purple_frequency")return gameState.settings.language==="en"?"Purple characters appear every "+effect[id].v(l)+" text positions.":"Purpurzeichen erscheinen alle "+effect[id].v(l)+" Textpositionen.";
 if(id==="streak_power")return gameState.settings.language==="en"?"Each correctly typed character grants +"+l+" SP.":"Jedes fehlerfrei getippte Zeichen gibt +"+l+" SP.";
 if(id==="special_power")return gameState.settings.language==="en"?"Each special character grants +"+(2*l)+" SP.":"Jedes Sonderzeichen gibt +"+(2*l)+" SP.";
 if(id==="gold_power")return gameState.settings.language==="en"?"Each gold character grants +"+(3*l)+" additional SP.":"Jedes Goldzeichen gibt +"+(3*l)+" zusätzliche SP.";
 if(id==="unlock_auto")return gameState.settings.language==="en"?"Unlocks automatic typing. Requires Predictive keyboard.":"Schaltet die automatische Zeicheneingabe frei. Voraussetzung: Vorausschauende Tastatur.";
 if(id==="keyboard_hint")return gameState.settings.language==="en"?"Highlights the next required key on the on-screen keyboard.":"Markiert auf der Bildschirmtastatur das Zeichen, das als Nächstes geschrieben werden muss.";
 if(["auto_a","auto_e","auto_s","auto_t"].includes(id))return gameState.settings.language==="en"?"Automatically types "+id.slice(-1).toUpperCase()+" when it is next in the text.":"Schreibt das Zeichen "+id.slice(-1).toUpperCase()+" automatisch, sobald es im Text an der Reihe ist.";
 if(id==="auto_vowels")return gameState.settings.language==="en"?"Automatically types A, E, I, O and U. Requires Automatic A and Automatic E.":"Schreibt A, E, I, O und U automatisch. Benötigt Automatik A und Automatik E.";
 if(id==="auto_speed")return gameState.settings.language==="en"?"Automatic typing interval: "+effect[id].v(l)+" ms.":"Automatikintervall: "+effect[id].v(l)+" ms.";
 if(id==="gold_frequency"||id==="gold_capacity")return (gameState.settings.language==="en"?"Gold characters appear every ":"Goldzeichen erscheinen alle ")+effect[id].v(l)+" progress steps.";
 if(id==="purple_frequency")return (gameState.settings.language==="en"?"Purple characters appear every ":"Purpurzeichen erscheinen alle ")+effect[id].v(l)+" text positions.";
 if(id==="streak_power")return (gameState.settings.language==="en"?"Each correct character grants +":"Jedes fehlerfreie Zeichen gibt +")+l+" SP.";
 if(id==="special_power")return (gameState.settings.language==="en"?"Each special character grants +":"Jedes Sonderzeichen gibt +")+(2*l)+" SP.";
 if(id==="purple_bonus")return gameState.settings.language==="en"?"Every fifth manually typed character becomes purple and grants +5 bonus SP. Requires Ink tank.":"Jeder fünfte manuell geschriebene Buchstabe wird lila und bringt +5 Bonus-SP. Benötigt Tintentank.";
 if(id==="imperial_script")return gameState.settings.language==="en"?"Prestige talent: each manually typed character grants an extra "+(2*l)+" SP.":"Prestige-Talent: Jeder manuell geschriebene Buchstabe bringt zusätzlich "+(2*l)+" SP.";
 const d=effect[id];if(!d)return s.desc||"";
 if(id==="free_speed")return "Goldzeichen entstehen nach "+d.v(l)+" Fortschrittsschritten. Minimum: 2.";
 if(id==="blue_power")return d.unit+": "+(2+l).toFixed(1)+"×.";
 if(id==="blue_duration")return d.unit+": +"+d.v(l).toFixed(1)+" Sekunden."; 
 if(id==="auto_speed")return d.unit+": "+d.v(l)+" ms.";
 return d.unit+": +"+d.v(l)+".";
}
function previewSkill(s,l){
 if(s.maxLevel<=1||!effect[s.id])return "";
 const d=effect[s.id],a=d.v(l),b=d.v(Math.min(s.maxLevel,l+1));
 const fmt=v=>s.id==="blue_power"?v.toFixed(1)+"×":s.id==="blue_duration"?v.toFixed(1)+" s":s.id==="auto_speed"?v+" ms":s.id==="gold_frequency"||s.id==="gold_capacity"||s.id==="purple_frequency"?v+" Zeichen":s.id==="free_speed"?v+" Schritte":v+"";
 return (gameState.settings.language==="en"?"Now: ":"Gerade: ")+fmt(a)+(gameState.settings.language==="en"?" · Next: ":" · Danach: ")+fmt(b);
}
function configureSkills(){
 const by=id=>SKILL_TREE.find(s=>s.id===id);
 SKILL_TREE.forEach(s=>{
  if(["base_click","case_master","special_power","vowel_power","consonant_power","green_focus","red_rare","long_streak","streak_power"].includes(s.id))s.group="Schreibkunst";
  if(["unlock_free","free_speed","gold_frequency","gold_capacity","gold_power"].includes(s.id))s.group="Gold";
  if(["purple_bonus","purple_power","purple_frequency"].includes(s.id))s.group="Purpur";
  if(["blue_unlock","blue_power","blue_duration"].includes(s.id))s.group="Blaue Multiplikatoren";
  if(["keyboard_hint","unlock_auto","auto_a","auto_e","auto_s","auto_t","auto_vowels","auto_speed"].includes(s.id))s.group="Automatisierung";
  if(s.id==="special_power"){s.label="Zeichenkunde";s.group="Schreibkunst";}
  if(s.id==="case_master")s.label=gameState.settings.language==="en"?"Uppercase & lowercase":"Groß-/Kleinschreibmeister";
  if(s.id==="gold_capacity")s.label=gameState.settings.language==="en"?"Gold vein expansion":"Goldader-Ausbau";
  if(s.id==="special_power")s.label=gameState.settings.language==="en"?"Symbol mastery":"Zeichenkunde";
  if(s.id==="keyboard_hint")s.requires=["base_click"];
  if(s.id==="unlock_auto")s.requires=["keyboard_hint"];
  if(s.id==="auto_vowels")s.requires=["auto_a","auto_e"];
  if(s.id==="purple_bonus")s.requires=["unlock_free"];
  if(s.id==="purple_power"||s.id==="purple_frequency")s.requires=["purple_bonus"];
  if(s.id==="blue_power"||s.id==="blue_duration")s.requires=["blue_unlock"];
  if(s.id==="vowel_power"||s.id==="consonant_power")s.requires=["base_click"];
  if(s.id==="consonant_power")s.cost=Math.max(1200,s.cost);
 });
 if(!by("blue_unlock"))SKILL_TREE.push({id:"blue_unlock",label:"Blaue Magie",desc:"Schaltet blaue Multiplikator-Zeichen frei.",cost:3000,maxLevel:1,row:5,requires:["purple_bonus"],group:"Blaue Multiplikatoren"});
 if(!by("blue_power"))SKILL_TREE.push({id:"blue_power",label:"Blaue Resonanz",desc:"Erhöht den Multiplikator blauer Zeichen.",cost:2200,maxLevel:6,row:5,requires:["blue_unlock"],group:"Blaue Multiplikatoren"});
 if(!by("blue_duration"))SKILL_TREE.push({id:"blue_duration",label:"Blaue Dauer",desc:"Verlängert die Dauer des blauen Bonus.",cost:2500,maxLevel:6,row:5,requires:["blue_unlock"],group:"Blaue Multiplikatoren"});
 if(!by("gold_power"))SKILL_TREE.push({id:"gold_power",label:"Goldprägung",desc:"Jedes Goldzeichen bringt +3 SP je Stufe.",cost:1500,maxLevel:8,row:2,requires:["gold_frequency"],group:"Gold"});
 if(!by("streak_power"))SKILL_TREE.push({id:"streak_power",label:"Fehlerfreie Serie",desc:"+1 SP pro fehlerfreiem Zeichen je Stufe.",cost:800,maxLevel:8,row:1,requires:["base_click"],group:"Schreibkunst"});
 if(!by("imperial_script"))SKILL_TREE.push({id:"imperial_script",label:"Imperiale Schreibkunst",desc:"Exklusives Prestige-Talent.",cost:5000,maxLevel:5,row:8,requires:["base_click"],group:"Prestige"});
}
function renderSkillNodes(group){
 const root=$("skilltree-container");if(!root)return;root.innerHTML="";
 const list=SKILL_TREE.filter(s=>group==="Alle"||s.group===group).sort((a,b)=>(a.row||0)-(b.row||0));
 const rows=new Map();list.forEach(s=>{const r=s.row||0;if(!rows.has(r))rows.set(r,[]);rows.get(r).push(s);});
 [...rows.keys()].sort((a,b)=>a-b).forEach(r=>{
  const row=document.createElement("div");row.className="skill-row";
  rows.get(r).forEach(s=>{
   const l=gameState.upgrades[s.id]||0,prestigeLock=s.id==="imperial_script"&&!(gameState.prestige.upgrades.p_skilltree||0);
   const prereq=(s.requires||[]).every(id=>(gameState.upgrades[id]||0)>0),locked=prestigeLock||!prereq;
   const n=document.createElement("div");n.className="skill-node";n.dataset.skillId=s.id;n.dataset.weGroup=s.group||"Schreibkunst";
   if(s.group==="Blaue Multiplikatoren")n.style.borderColor="#438ee8";
   if(s.group==="Purpur")n.style.borderColor="#a56bd1";
   const h=document.createElement("h4");h.textContent=s.label+" ("+l+"/"+s.maxLevel+")";n.appendChild(h);
   const p=document.createElement("p");p.textContent=describeSkill(s,l);n.appendChild(p);
   if(s.maxLevel>1){const x=document.createElement("small");x.className="we-upgrade-preview";x.textContent=previewSkill(s,l);n.appendChild(x);}
   const c=document.createElement("span");c.className="cost";
   const rawCost=Math.round(s.cost*Math.pow(1.8,l));const cost=Math.max(1,Math.round(rawCost*(1-.05*(gameState.prestige.upgrades.p_discount||0))));
   if(l>=s.maxLevel){n.classList.add("purchased");c.textContent="MAXSTUFE";}
   else if(locked){n.classList.add("locked");c.textContent=prestigeLock?"Nur durch Prestige freischaltbar":"Voraussetzung fehlt";}
   else{n.classList.add("available");c.textContent=cost+" SP";n.onclick=()=>buyUpgrade(s.id,rawCost);}
   n.appendChild(c);row.appendChild(n);
  });root.appendChild(row);
 });
}
function renderSkillTree(){
 configureSkills();const root=$("skilltree-container");if(!root)return;
 let bar=$("we-group-tabs");if(!bar){bar=document.createElement("div");bar.id="we-group-tabs";bar.className="we-group-tabs";root.parentElement.insertBefore(bar,root);}
 const active=bar.querySelector("button.active")?.dataset.group||"Alle";bar.innerHTML="";
 const groups=["Alle"].concat(groupOrder.filter(g=>g!=="Prestige"||(gameState.prestige.upgrades.p_skilltree||0)));
 const groupEn={"Alle":"All","Schreibkunst":"Writing","Gold":"Gold","Purpur":"Purple","Blaue Multiplikatoren":"Blue Multipliers","Automatisierung":"Automation","Prestige":"Prestige"};
 groups.forEach((g,i)=>{const b=document.createElement("button");b.type="button";b.textContent=gameState.settings.language==="en"?groupEn[g]:g;b.dataset.group=g;b.className=(g===active||(!groups.includes(active)&&i===0))?"active":"";b.onclick=()=>{bar.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));renderSkillNodes(g);};bar.appendChild(b);});
 const selected=bar.querySelector("button.active")?.dataset.group||"Alle";renderSkillNodes(selected);
}
function addPrestigeProgress(){
 if(!$("tab-prestige"))return;
 const card=$("we-p-preview")?.closest(".we-prestige-card");let box=$("we-v08-prestige-progress");
 if(!box){box=document.createElement("div");box.id="we-v08-prestige-progress";box.className="we-prestige-card";if(card)card.after(box);else $("tab-prestige").prepend(box);}
 const sp=Math.max(0,Math.floor(gameState.sp)),gain=sp>=10000?Math.floor(Math.sqrt(sp/10000)):0,target=10000*Math.pow(gain+1,2),prev=10000*Math.pow(gain,2);
 const percent=Math.max(0,Math.min(100,(sp-prev)/(target-prev)*100));
 box.innerHTML=gameState.settings.language==="en"?"<b>Progress to next prestige point</b><p>"+sp.toLocaleString("en-US")+" / "+target.toLocaleString("en-US")+" SP</p><div class='we-progress'><span id='we-v08-pbar'></span></div><p>"+Math.max(0,target-sp).toLocaleString("en-US")+" SP remaining · "+gain+" prestige points currently available</p>":"<b>Fortschritt zum nächsten Prestige-Punkt</b><p>"+sp.toLocaleString("de-DE")+" / "+target.toLocaleString("de-DE")+" SP</p><div class='we-progress'><span id='we-v08-pbar'></span></div><p>Noch "+Math.max(0,target-sp).toLocaleString("de-DE")+" SP bis zum nächsten Punkt · aktuell "+gain+" Prestige-Punkte verfügbar</p>";
 $("we-v08-pbar").style.width=percent+"%";if($("we-p-preview"))$("we-p-preview").textContent=gain;
 let unlock=$("we-v08-prestige-unlock");
 if(!unlock){unlock=document.createElement("div");unlock.id="we-v08-prestige-unlock";unlock.className="we-prestige-card";$("we-p-upgrades")?.appendChild(unlock);}
 const bought=!!gameState.prestige.upgrades.p_skilltree;
 unlock.innerHTML=gameState.settings.language==="en"?"<b>Imperial talent</b><p>Unlocks “Imperial writing” in the upgrade tree.</p><small>"+(bought?"Unlocked":"Cost: 4 prestige points")+"</small>":"<b>Imperiales Talent</b><p>Schaltet „Imperiale Schreibkunst“ im Talentbaum frei.</p><small>"+(bought?"Freigeschaltet":"Kosten: 4 Prestige-Punkte")+"</small>";
 if(!bought){const btn=document.createElement("button");btn.className="btn";btn.textContent=gameState.settings.language==="en"?"Unlock":"Freischalten";btn.onclick=()=>{if(gameState.prestige.points<4)return toast("Nicht genug Prestige-Punkte.");gameState.prestige.points-=4;gameState.prestige.upgrades.p_skilltree=1;saveGameState();renderSkillTree();addPrestigeProgress();toast("Imperiales Talent freigeschaltet.");};unlock.appendChild(btn);}
}
function renderStatsV08(){
 const tab=$("tab-stats");if(!tab)return;
 const oldHead=[...tab.querySelectorAll("h3")].find(x=>x.textContent==="Weitere Statistiken");oldHead?.remove();$("we-extra-stats")?.remove();
 const box=tab.querySelector("div[style*='display:flex']")||tab.querySelector("div");if(!box)return;box.className="we-stat-wrap";box.style.background="transparent";box.style.padding="0";box.style.borderRadius="0";
 const s=gameState.stats,up=Object.values(gameState.upgrades).reduce((a,b)=>a+(Number(b)||0),0),attempts=(s.manualChars||0)+(s.errors||0);
 box.querySelectorAll(".we-v08-stat").forEach(x=>x.remove());
 const vals=[["Fehler","Errors",s.errors||0],["Aktuelle fehlerfreie Serie","Current error-free streak",s.errorFreeStreak||0],["Längste fehlerfreie Serie","Best error-free streak",s.bestStreak||0],["Großbuchstaben korrekt","Correct uppercase letters",s.uppercaseCorrect||0],["Purpurzeichen","Purple characters",s.purpleChars||0],["Blaue Zeichen","Blue characters",s.blueChars||0],["Gekaufte Upgrade-Stufen","Upgrade levels purchased",up],["Erfolgsquote","Accuracy",attempts?Math.round((s.manualChars||0)/attempts*100)+"%":"100%"],["Textfortschritt","Text progress",Math.round((gameState.textProgress||0)/Math.max(1,getCurrentTextString().length)*100)+"%"],["Prestige insgesamt","Total prestiges",gameState.prestige.totalPrestiges||0],["Prestige-Punkte","Prestige points",gameState.prestige.points||0]];
 vals.forEach(v=>{const row=document.createElement("div");row.className="we-stat we-v08-stat";const a=document.createElement("span");a.textContent=gameState.settings.language==="en"?v[1]:v[0];const b=document.createElement("b");b.textContent=v[2];row.append(a,b);box.appendChild(row);});
}
function setupSettings(){
 const cfg=$("tab-config");if(!cfg||$("we-v08-design"))return;
 $("we-theme-music")?.remove();document.body.classList.remove("we-paper");
 const design=document.createElement("section");design.id="we-v08-design";design.className="we-settings-card";
 design.innerHTML="<h3>Design · Hintergrund</h3><label>Hauptbereich</label><select id='we-v08-theme' style='width:100%;min-height:42px'><option value='paper'>Papier & Salbei</option><option value='dark'>Dunkel</option><option value='midnight'>Mitternacht</option></select><label style='display:block;margin-top:10px'>Linke Tableiste</label><select id='we-v08-nav' style='width:100%;min-height:42px'><option value='dark'>Dunkel</option><option value='sage'>Salbei</option><option value='blue'>Blau</option><option value='plum'>Violett</option></select>";
 const sounds=document.createElement("section");sounds.id="we-v08-sounds";sounds.className="we-settings-card";
 sounds.innerHTML="<h3>Sounds · Hintergrundmusik</h3><label class='switch-container'><span>Hintergrundmusik</span><input type='checkbox' id='we-v08-music' checked></label><label>Lautstärke</label><input id='we-v08-volume' type='range' min='0' max='0.12' step='0.005' value='0.025' style='width:100%'>";
 cfg.appendChild(design);cfg.appendChild(sounds);
 const palettes={paper:["#f3f0e6","#f8f5eb","#34443c"],dark:["#121212","#1e1e1e","#e0e0e0"],midnight:["#101827","#17243a","#e2eaf7"]},navs={dark:"#1e1e1e",sage:"#45685b",blue:"#233d62",plum:"#493052"};
 const apply=()=>{const p=palettes[$("we-v08-theme").value]||palettes.paper,n=navs[$("we-v08-nav").value]||navs.dark;document.documentElement.style.setProperty("--we-main-bg",p[0]);document.documentElement.style.setProperty("--surface-dark",p[1]);document.documentElement.style.setProperty("--text-main",p[2]);document.documentElement.style.setProperty("--we-nav-bg",n);document.querySelector("header").style.background=p[1];document.querySelector(".content-area").style.background=p[0];document.querySelector("nav").style.background=n;document.querySelectorAll(".paper-container").forEach(x=>{x.style.background=p[1];x.style.color=p[2];});gameState.settings.weV08Theme=$("we-v08-theme").value;gameState.settings.weV08Nav=$("we-v08-nav").value;saveGameState();};
 $("we-v08-theme").value=gameState.settings.weV08Theme||"paper";$("we-v08-nav").value=gameState.settings.weV08Nav||"dark";apply();$("we-v08-theme").onchange=apply;$("we-v08-nav").onchange=apply;
 const AC=window.AudioContext||window.webkitAudioContext;let ctx=null,master=null,osc=[],musicTimer=null,melodyIndex=0;
 const stop=()=>{if(musicTimer)clearInterval(musicTimer);musicTimer=null;osc.forEach(o=>{try{o.stop();}catch(e){}});osc=[];if(ctx){ctx.close();ctx=null;master=null;}};
 const start=async()=>{if(!$("we-v08-music").checked||ctx||!AC)return;ctx=new AC();await ctx.resume();master=ctx.createGain();master.gain.value=+$("we-v08-volume").value;master.connect(ctx.destination);[130.81,164.81,196].forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f;g.gain.value=[.018,.012,.009][i];o.connect(g);g.connect(master);o.start();osc.push(o);});const m=ctx.createOscillator(),mg=ctx.createGain();m.type="sine";m.frequency.value=261.63;mg.gain.value=.012;m.connect(mg);mg.connect(master);m.start();osc.push(m);const notes=[261.63,329.63,392,329.63,293.66,349.23,440,349.23];musicTimer=setInterval(()=>{if(!ctx)return;melodyIndex=(melodyIndex+1)%notes.length;m.frequency.setTargetAtTime(notes[melodyIndex],ctx.currentTime,.35);},1200);};
 $("we-v08-music").checked=gameState.settings.musicEnabled!==false;$("we-v08-volume").value=gameState.settings.musicVolume||.025;
 $("we-v08-music").onchange=()=>{gameState.settings.musicEnabled=$("we-v08-music").checked;saveGameState();if(gameState.settings.musicEnabled)start();else stop();};
 $("we-v08-volume").oninput=()=>{gameState.settings.musicVolume=+$("we-v08-volume").value;if(master)master.gain.setTargetAtTime(gameState.settings.musicVolume,ctx.currentTime,.15);saveGameState();};
 const gesture=()=>{if(gameState.settings.musicEnabled!==false)start();};document.addEventListener("pointerdown",gesture,{passive:true});document.addEventListener("keydown",gesture);
}
const enSkills={
 base_click:["Precision Quill","+1 SP for every manually typed character per level."],case_master:["Uppercase & lowercase","Correctly typed uppercase letters grant bonus SP per level."],vowel_power:["Vowel booster","Each typed A, E, I, O or U adds extra progress toward that letter's gold character."],consonant_power:["Consonant booster","Each typed consonant adds extra progress toward that letter's gold character."],free_speed:["Gold ink efficiency","Reduces the matching characters needed to earn a gold character."],unlock_free:["Ink tank","Unlocks stored gold characters, automatically used at the matching position."],keyboard_hint:["Predictive keyboard","Highlights the next required key on the on-screen keyboard."],unlock_auto:["Steam typewriter","Unlocks automatic typing. Requires Predictive keyboard."],auto_a:["Automatic A","Automatically types A when it is next in the text."],auto_e:["Automatic E","Automatically types E when it is next in the text."],auto_s:["Automatic S","Automatically types S when it is next in the text."],auto_t:["Automatic T","Automatically types T when it is next in the text."],auto_vowels:["Vowel machine","Automatically types vowels. Requires Automatic A and Automatic E."],auto_speed:["Gear drive","Increases automatic typing speed."],purple_bonus:["Royal purple","Every fifth manually typed character becomes purple and grants +5 bonus SP."],purple_power:["Purple resonance","Adds +2 SP to each purple character per level."],gold_power:["Gold amplifier","Each gold character grants +3 additional SP per level."],blue_power:["Blue multiplier","Increases the multiplier for blue characters."],blue_duration:["Blue duration","Extends the blue bonus duration."],green_focus:["Streak precision","Grants bonus SP every five error-free characters."],red_rare:["Rare-letter precision","Grants +5 SP for Q, X, Y, Z and J per level."],long_streak:["Streak master","Grants bonus SP every ten error-free characters."],special_power:["Symbol mastery","Grants extra SP when special characters are typed."],imperial_script:["Imperial writing","Prestige talent: each manually typed character grants extra SP."],blue_unlock:["Blue magic","Unlocks blue multiplier characters. They appear every 75 text positions."],gold_frequency:["Gold veins","Gold characters appear more often; each level reduces the interval by four text positions."],gold_capacity:["Gold vein expansion","Reduces the interval between gold characters by two text positions per level."],purple_frequency:["Purple frequency","Reduces the interval between purple characters by three text positions per level."],streak_power:["Flawless streak","Each correctly typed character grants +1 SP per level."],special_power:["Symbol mastery","Each special character grants +2 SP per level."]};
window.__we08SkillEnglish=enSkills;
const enAchievements={"Millionenchronist":"Millionaire Chronicler","Großvermögen":"Great Fortune","Ununterbrochene Feder":"Unbroken Quill","Goldenes Imperium":"Golden Empire","Purpurkönig":"Purple King","Imperialer Reichtum":"Imperial Wealth","Goldene Feder":"Golden Quill","Kleine Kasse":"Small Purse","Wohlstand":"Prosperity","Erster Funke":"First Spark","Fleißiger Schreiber":"Diligent Writer","Wortakrobat":"Word Acrobat","Chronist des Reiches":"Chronicler of the Empire","Evolution":"Evolution","Industrielle Revolution":"Industrial Revolution","Das erste Werk":"First Work","Bibliothekar":"Librarian","Wortschmied":"Wordsmith","Tintenmeister":"Ink Master","Forscher":"Researcher","Ingenieur":"Engineer","Maschinenfleiß":"Machine Industry","Goldlager":"Gold Reserve","Geschichtenerzähler":"Storyteller"};
const enLabels={"Hauptbereich":"Main area","Linke Tableiste":"Left navigation","Schreiben":"Write","Talentbaum":"Upgrade Tree","Erfolge & Auszeichnungen":"Achievements & Awards","Imperiums-Statistiken":"Empire Statistics","Einstellungen & Optionen":"Settings & Options","Vorlage wählen:":"Choose a text:","Märchen: Der goldene Buchstabe":"Fairy tale: The golden letter","Fantasy: Das Erwachen des Imperiums":"Fantasy: The awakening of the Empire","Wissenschaft: Die Automatisierung des Geistes":"Science: The automation of the mind","Text zurücksetzen":"Reset text","Schalter-Zentralen":"Gameplay switches","Eigene Texte verwalten":"Manage custom texts","Anzeige & Sound":"Display & sound","Konto & Cloud-Spielstand":"Account & cloud save","Maschinen-Automatisierung erlauben":"Enable automation","Kostenlose Gold-Buchstaben automatisch nutzen":"Automatically use free gold letters","Schreibmaschinensounds":"Typing sounds","Schriftgröße im Papier:":"Paper font size:","Text hinzufügen":"Add text","Admin-Panel öffnen":"Open admin panel","Titel:":"Title:","Inhalt:":"Content:","Lautstärke":"Volume","Hintergrundmusik":"Background music","Papier & Salbei":"Paper & sage","Dunkel":"Dark","Mitternacht":"Midnight","Blau":"Blue","Violett":"Violet","Alle":"All","Schreibkunst":"Writing","Gold":"Gold","Purpur":"Purple","Blaue Multiplikatoren":"Blue multipliers","Automatisierung":"Automation"};

const uiEnglish={
"Vorlage wählen:":"Choose a text:","Text zurücksetzen":"Reset text","Talentbaum":"Upgrade Tree","Erfolge & Auszeichnungen":"Achievements & Awards","Imperiums-Statistiken":"Empire Statistics","Einstellungen & Optionen":"Settings & Options","Schalte Pfade frei, um Automatisierung und Generatoren zu aktivieren.":"Unlock paths to activate automation and generators.",
"Geschriebene Buchstaben insgesamt:":"Total characters written:","Manuell getippte Buchstaben:":"Manually typed characters:","Automatisch generierte Buchstaben:":"Automatically generated characters:","Eingesetzte goldene Freibuchstaben:":"Free gold characters used:","Verdiene Schreibpunkte (Lebenszeit):":"Lifetime writing points earned:","Abgeschlossene Texte:":"Texts completed:",
"Schalter-Zentralen":"Gameplay switches","Eigene Texte verwalten":"Manage custom texts","Anzeige & Sound":"Display & sound","Konto & Cloud-Spielstand":"Account & cloud save","Maschinen-Automatisierung erlauben":"Enable automation","Kostenlose Gold-Buchstaben automatisch nutzen":"Automatically use free gold letters","Schreibmaschinensounds":"Typing sounds","Schriftgröße im Papier:":"Paper font size:","Titel:":"Title:","Inhalt:":"Content:","Text hinzufügen":"Add text","Admin-Panel öffnen":"Open admin panel","Spielstand auf diesem Gerät löschen":"Delete save on this device","SECRET ADMIN PANEL":"SECRET ADMIN PANEL","Schließen":"Close","+ 1.000 SP":"+1,000 SP","+ 100.000 SP":"+100,000 SP","- 5.000 SP":"-5,000 SP","Alle Upgrades freischalten":"Unlock all upgrades","Alle Erfolge freischalten":"Unlock all achievements","Textfortschritt zurücksetzen":"Reset text progress",
"Design · Hintergrund":"Design · Background","Hauptbereich":"Main area","Linke Tableiste":"Left navigation","Sounds · Hintergrundmusik":"Sounds · Background music","Hintergrundmusik":"Background music","Sprache · Language":"Language",
"Fortschritt zum nächsten Prestige-Punkt":"Progress to next prestige point","Voraussichtliche Belohnung":"Estimated reward","Prestige-Upgrades":"Prestige upgrades","Prestige starten":"Start prestige","Imperiale Tinte":"Imperial Ink","Goldmacht":"Gold Power","Purpurmacht":"Purple Power","Reicher Neustart":"Rich Restart","Maschinenwissen":"Machine Knowledge","Blaue Krone":"Blue Crown","Königlicher Rabatt":"Royal Discount","Goldene Ader":"Golden Vein","Purpurne Ader":"Purple Vein","Königlicher Tintentank":"Royal Ink Tank",
"Goldene Feder":"Golden Quill","Kleine Kasse":"Small Purse","Wohlstand":"Prosperity","Millionenchronist":"Millionaire Chronicler","Großvermögen":"Great Fortune","Ununterbrochene Feder":"Unbroken Quill","Goldenes Imperium":"Golden Empire","Purpurkönig":"Purple King",
"Übersicht":"Overview","Wirtschaft":"Economy","Fortschritt":"Progress","Texte":"Texts","Werkzeuge":"Tools","SP setzen":"Set SP","Übernehmen":"Apply","Text hinzufügen":"Add text","Vorlage bearbeiten":"Edit template","Vorlage speichern":"Save template","Prestige-Punkte vergeben":"Grant prestige points","Öffentliche Texte für alle Spieler":"Public texts for all players","Veröffentlichen":"Publish","Erfolge löschen":"Delete achievements","Textfortschritt löschen":"Reset text progress","Gesamten Spielstand löschen":"Delete entire save","Spielstand verwalten":"Manage save","Texte für alle Spieler":"Texts for all players",
"Nicht genug SP.":"Not enough SP.","Voraussetzung fehlt.":"Requirement missing.","Freischalten":"Unlock","Kaufen":"Buy","MAXSTUFE":"MAX LEVEL","Fehlerfreie Serie":"Flawless streak","Goldadern":"Gold veins","Goldader-Ausbau":"Gold vein expansion","Purpurhäufigkeit":"Purple frequency","Blaue Magie":"Blue magic","Zeichenkunde":"Symbol mastery","Noch nicht freigeschaltet":"Not unlocked yet"
};
function translateVisibleText(en){
 const roots=[$("tab-schreiben"),$("tab-skilltree"),$("tab-erfolge"),$("tab-stats"),$("tab-config"),$("tab-prestige"),$("admin-panel"),document.querySelector("header")].filter(Boolean);
 roots.forEach(root=>{
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let node;while(node=walker.nextNode()){
   const parent=node.parentElement;if(!parent||["SCRIPT","STYLE","TEXTAREA","INPUT"].includes(parent.tagName)||parent.closest("#paper,.we-public-text"))continue;
   if(node.__we08Original===undefined)node.__we08Original=node.nodeValue;
   const original=node.__we08Original,trim=original.trim();
   if(en&&uiEnglish[trim]){const lead=original.match(/^\s*/)?.[0]||"",trail=original.match(/\s*$/)?.[0]||"";node.nodeValue=lead+uiEnglish[trim]+trail;}
   else if(!en)node.nodeValue=original;
  }
 });
}

function applyLanguage(){
 const en=gameState.settings.language==="en";document.documentElement.lang=en?"en":"de";
 const baseTexts=["maerchen","fantasy","science","long_library","long_archive","long_clockmaker"];
 const current=gameState.currentTemplateKey||"maerchen";
 if(gameState.textProgress===0){const base=current.endsWith("_en")?current.slice(0,-3):current; if(baseTexts.includes(base)){const next=en?base+"_en":base;if(next!==current){gameState.currentTemplateKey=next;const sel=$("template-dropdown");if(sel){sel.value=next;resetCurrentText();}}}}
 document.querySelectorAll("#template-dropdown option").forEach(o=>{const isEn=o.value.endsWith("_en");o.hidden=en?!isEn:isEn;});
 const sel=$("template-dropdown");if(sel)sel.value=gameState.currentTemplateKey;
 const nav=[...document.querySelectorAll("nav .nav-btn")],de=["📝 Schreiben","🌳 Talentbaum","🏆 Erfolge","📊 Statistiken","⚙ Einstellungen"],eng=["📝 Write","🌳 Upgrade Tree","🏆 Achievements","📊 Statistics","⚙ Settings"];
 nav.slice(0,5).forEach((b,i)=>b.textContent=(en?eng:de)[i]);
 const heads={"tab-skilltree":["Talentbaum","Upgrade Tree"],"tab-erfolge":["Erfolge & Auszeichnungen","Achievements & Awards"],"tab-stats":["Imperiums-Statistiken","Empire Statistics"],"tab-config":["Einstellungen & Optionen","Settings & Options"]};
 Object.entries(heads).forEach(([id,v])=>{const h=$(id)?.querySelector("h2");if(h)h.textContent=v[en?1:0];});
 document.querySelectorAll("#tab-config h3,#tab-config label,#tab-config button,#tab-config p,#tab-config span").forEach(el=>{if(!el.dataset.v08De)el.dataset.v08De=el.textContent.trim();const t=el.dataset.v08De;if(en&&enLabels[t])el.textContent=enLabels[t];else if(!en)el.textContent=t;});
 SKILL_TREE.forEach(s=>{if(!s._v08DeLabel){s._v08DeLabel=s.label;s._v08DeDesc=s.desc;}if(en&&enSkills[s.id]){s.label=enSkills[s.id][0];s.desc=enSkills[s.id][1];}else{s.label=s._v08DeLabel;s.desc=s._v08DeDesc;}});
 ACHIEVEMENTS.forEach(a=>{if(!a._v08DeName){a._v08DeName=a.name;a._v08DeDesc=a.desc;}if(en){a.name=enAchievements[a._v08DeName]||a._v08DeName;a.desc=achievementDescEn(a);}else{a.name=a._v08DeName;a.desc=a._v08DeDesc;}});
 const adminLabels=en?["Overview","Economy","Progress","Texts","Tools"]:["Übersicht","Wirtschaft","Fortschritt","Texte","Werkzeuge"];[...document.querySelectorAll("#admin-tabs button")].forEach((b,i)=>b.textContent=adminLabels[i]||b.textContent);
 const settingLabels=en?["Design · Background","Main area","Left navigation","Sounds · Background music","Background music","Language · Language"]:["Design · Hintergrund","Hauptbereich","Linke Tableiste","Sounds · Hintergrundmusik","Hintergrundmusik","Sprache · Language"];
 const ids=["we-v08-design","we-v08-theme","we-v08-nav","we-v08-sounds","we-v08-music","we-language-card"];ids.forEach((id,i)=>{const el=$(id);if(!el)return;if(id==="we-v08-theme"||id==="we-v08-nav"||id==="we-v08-music")return;const h=el.querySelector("h3");if(h)h.textContent=settingLabels[i];});
 document.querySelectorAll("#we-v08-design option,#we-v08-nav option").forEach(o=>{if(!o.dataset.v08De)o.dataset.v08De=o.textContent.trim();const t=o.dataset.v08De;const m={"Papier & Salbei":"Paper & sage","Dunkel":"Dark","Mitternacht":"Midnight","Salbei":"Sage","Blau":"Blue","Violett":"Purple"};o.textContent=en?(m[t]||t):t;});
 renderSkillTree();renderStatsV08();addPrestigeProgress();renderAchievements();translateVisibleText(en);
 if($("we-auto-cooldown")){const ms=window.getAutoCooldownMs?.();$("we-auto-cooldown").textContent=en?(ms===null?"Automation off":"Next automatic key: "+Math.ceil(ms/1000)+" s"):(ms===null?"Automatik aus":"Nächste automatische Taste: "+Math.ceil(ms/1000)+" s");}
}
function achievementDescEn(a){const t=a.target||0;if(a.type==="total_sp")return "Earn "+t.toLocaleString("en-US")+" SP in total.";if(a.type==="total_chars")return "Type "+t.toLocaleString("en-US")+" characters.";if(a.type==="upgrades_bought")return "Purchase "+t+" upgrade levels.";if(a.type==="texts_finished")return "Complete "+t+" texts.";if(a.type==="auto_chars")return "Type "+t+" characters automatically.";if(a.type==="gold_chars")return "Use "+t+" gold characters.";if(a.type==="auto_unlocked")return "Unlock automatic typing.";return a._v08DeDesc||"";}
function setupLanguage(){
 const cfg=$("tab-config");if(!cfg||$("we-language-card"))return;
 const box=document.createElement("section");box.id="we-language-card";box.className="we-settings-card";box.innerHTML="<h3>Sprache · Language</h3><select id='we-language' style='width:100%;min-height:42px'><option value='de'>Deutsch</option><option value='en'>English</option></select>";cfg.appendChild(box);
 $("we-language").value=gameState.settings.language||"de";$("we-language").onchange=()=>{gameState.settings.language=$("we-language").value;saveGameState();applyLanguage();};
}

function setupAdminPanelEnhancements(){
 const panel=$("admin-panel");if(!panel||panel.__we08AdminObserver)return;panel.__we08AdminObserver=true;
 const observer=new MutationObserver(()=>{
  const tabs=$("admin-tabs");if(tabs){tabs.style.display="flex";tabs.style.flexWrap="wrap";tabs.style.gap="7px";tabs.style.position="static";tabs.style.margin="12px 0";}
  const pub=$("we-public-admin"),progress=$("admin-progress");
  if(pub&&progress&&!$("we-v08-admin-reset-actions")){
   const heading=[...pub.querySelectorAll("h3")].find(x=>x.textContent.includes("Spielstand-Verwaltung"));
   const buttons=["we-del-ach","we-del-progress","we-del-save"].map(id=>$(id)).filter(Boolean);
   if(buttons.length){const wrap=document.createElement("div");wrap.id="we-v08-admin-reset-actions";wrap.className="admin-section";if(heading)wrap.appendChild(heading);buttons.forEach(b=>wrap.appendChild(b));progress.appendChild(wrap);}
  }
 });
 observer.observe(panel,{childList:true,subtree:true,attributes:true,attributeFilter:["style"]});
}

function setupAdminTabs(){
 const panel=$("admin-panel");if(!panel||$("we-admin-tabs"))return;const grid=panel.querySelector(".admin-grid");if(!grid)return;
 const tabs=document.createElement("div");tabs.id="we-admin-tabs";tabs.className="we-admin-tabs";const pages={};
 [["overview","Übersicht"],["texts","Texte rein"],["progress","Spielstand"],["tools","Werkzeuge"]].forEach(([id,label],i)=>{const b=document.createElement("button");b.textContent=label;b.className=i===0?"active":"";b.onclick=()=>{tabs.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));Object.values(pages).forEach(x=>x.classList.remove("active"));pages[id].classList.add("active");};tabs.appendChild(b);const p=document.createElement("section");p.id="admin-"+id;p.className="we-admin-page"+(i===0?" active":"");pages[id]=p;panel.appendChild(p);});
 panel.insertBefore(tabs,grid);pages.overview.appendChild(grid);
 const info=document.createElement("div");info.className="admin-section";info.innerHTML="<h3>Texte für alle Spieler</h3><p>Veröffentliche Community-Texte im Textbereich.</p>";pages.texts.appendChild(info);
 const progress=document.createElement("div");progress.className="admin-section";progress.innerHTML="<h3>Spielstand verwalten</h3><p>Erfolge, Textfortschritt und den gesamten Spielstand verwalten.</p>";pages.progress.appendChild(progress);
 const tools=document.createElement("div");tools.className="admin-section";tools.innerHTML="<h3>Werkzeuge</h3><p>Zusätzliche Admin-Werkzeuge.</p>";pages.tools.appendChild(tools);
 const mo=new MutationObserver(()=>{const pub=$("we-public-admin");if(pub&&pub.parentElement!==pages.texts)pages.texts.appendChild(pub);if(pub&&!$("we-v08-admin-reset-actions")){const bs=[...pub.querySelectorAll("button")],a=bs.find(x=>x.id==="we-del-ach"),d=bs.find(x=>x.id==="we-del-progress"),s=bs.find(x=>x.id==="we-del-save");if(a||d||s){const wrap=document.createElement("div");wrap.id="we-v08-admin-reset-actions";wrap.className="admin-section";wrap.append(a,d,s);pages.progress.appendChild(wrap);}}});mo.observe(panel,{childList:true,subtree:true});
}
function sortAchievements(){
 const order={total_chars:0,total_sp:1,upgrades_bought:2,auto_unlocked:3,auto_chars:4,gold_chars:5,texts_finished:6,best_streak:7};
 ACHIEVEMENTS.sort((a,b)=>(order[a.type]??99)-(order[b.type]??99)||(a.target||0)-(b.target||0));
}
function install(){
 if(window.__weV08)return;window.__weV08=true;
 gameState.settings=Object.assign({shift:false,capsLock:false,language:"de",musicEnabled:true,musicVolume:.025,weV08Theme:"paper",weV08Nav:"dark"},gameState.settings||{});
 addTextOptions();configureSkills();sortAchievements();window.initKeyboard=initKeyboardV08;initKeyboardV08();
 window.buildSkillTreeUI=renderSkillTree;
 const oldUpdate=window.updateAllDisplays;window.updateAllDisplays=function(){oldUpdate();updateKeyboard();renderStatsV08();addPrestigeProgress();if(gameState.settings.language==="en")translateVisibleText(true);};
 const oldInput=window.handleKeyInput;window.handleKeyInput=function(ch){const before=gameState.textProgress;flashKey(ch);oldInput(ch);if(gameState.textProgress>before){const last=gameState.history[gameState.history.length-1];const level=gameState.upgrades.imperial_script||0;if(level>0&&last&&(last.type==="manual"||last.type==="purple")){const bonus=2*level;gameState.sp+=bonus;gameState.totalSpEarned+=bonus;updateAllDisplays();saveGameState();}if(gameState.settings.shift){gameState.settings.shift=false;updateKeyboard();}}};
 window.addEventListener("keydown",e=>{if(e.key==="CapsLock")gameState.settings.capsLock=!!e.getModifierState?.("CapsLock");if(e.key==="Shift")gameState.settings.shift=true;updateKeyboard();},true);
 window.addEventListener("keyup",e=>{if(e.key==="Shift")gameState.settings.shift=false;updateKeyboard();},true);
 setupSettings();setupLanguage();setupAdminPanelEnhancements();
 const v=[...document.querySelectorAll("header span")].find(x=>/v0\./.test(x.textContent));if(v)v.textContent="v0.8";
 renderSkillTree();renderStatsV08();addPrestigeProgress();updateKeyboard();applyLanguage();
 setInterval(()=>{const n=$("we-auto-cooldown");if(n&&gameState.settings.language==="en"){const ms=window.getAutoCooldownMs?.();n.textContent=ms===null?"Automation off":"Next automatic key: "+Math.ceil(ms/1000)+" s";}},200);
 const tabs=$("we-group-tabs");if(tabs)tabs.style.position="static";
}
window.addEventListener("load",()=>setTimeout(install,750));
})();