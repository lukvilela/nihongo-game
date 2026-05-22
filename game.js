const c=document.getElementById("game"),x=c.getContext("2d"),W=960,H=540;
const KH=[["\u3042","a"],["\u3044","i"],["\u3046","u"],["\u3048","e"],["\u304A","o"]];
const KH2=[["\u304B","ka"],["\u304D","ki"],["\u304F","ku"],["\u3051","ke"],["\u3053","ko"]];
const KH3=[["\u3055","sa"],["\u3057","shi"],["\u3059","su"],["\u305B","se"],["\u305D","so"]];
const KK=[["\u30A2","a"],["\u30A4","i"],["\u30A6","u"],["\u30A8","e"],["\u30AA","o"]];
const KK2=[["\u30AB","ka"],["\u30AD","ki"],["\u30AF","ku"],["\u30B1","ke"],["\u30B3","ko"]];
const KK3=[["\u30B5","sa"],["\u30B7","shi"],["\u30B9","su"],["\u30BB","se"],["\u30BD","so"]];
const K={h:[...KH,...KH2,...KH3],k:[...KK,...KK2,...KK3]};
const L=[{n:"Nivel 1",p:5,t:5,s:24},{n:"Nivel 2",p:10,t:7,s:20},{n:"Nivel 3",p:15,t:9,s:16},{n:"Nivel 4",p:15,t:11,s:13}];
const s={m:"menu",lv:0,hp:3,xp:0,sc:0,rd:0,tm:24,q:null,o:[],h:[0,0,0,0],msg:"",st:0,stars:0,hints:2,mist:0,ans:0,rev:[],scr:"h",pause:false};
const R=n=>Math.floor(Math.random()*n),sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=R(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const pool=()=>K[s.scr].slice(0,L[s.lv].p).map(v=>({k:v[0],r:v[1]}));
const addRev=v=>{if(!s.rev.some(r=>r.k===v.k&&r.r===v.r))s.rev.push(v)};
function ask(){const p=pool();let ok=p[R(p.length)];if(s.rev.length&&Math.random()<0.4)ok=s.rev[R(s.rev.length)];const wr=sh(p.filter(v=>v.r!==ok.r)).slice(0,3);s.q=ok;s.o=sh([{r:ok.r,ok:1},...wr.map(v=>({r:v.r,ok:0}))]);s.h=[0,0,0,0]}
function reset(){Object.assign(s,{m:"menu",lv:0,hp:3,xp:0,sc:0,rd:0,tm:L[0].s,q:null,o:[],h:[0,0,0,0],msg:"",st:0,stars:0,hints:2,mist:0,ans:0,rev:[],pause:false})}
function start(i){s.m="play";s.lv=i;s.rd=0;s.tm=L[i].s;s.msg="";s.pause=false;ask()}
function hint(){if(s.m!=="play"||s.hints<=0)return;const wrong=[];for(let i=0;i<4;i++)if(!s.o[i].ok&&!s.h[i])wrong.push(i);for(const i of sh(wrong).slice(0,2))s.h[i]=1;s.hints--;s.msg="Dica usada"}
function pick(i){if(s.m!=="play"||!s.o[i]||s.h[i])return;s.ans++;if(s.o[i].ok){s.rd++;s.st++;const mult=1+Math.floor(s.st/3)*0.25;const g=Math.round(10*mult);s.xp+=g;s.sc+=g;s.msg="Acerto +"+g;if(s.st%3===0)s.stars++;if(s.rev.length&&Math.random()<0.5)s.rev.shift();if(s.rd>=L[s.lv].t){s.m=s.lv===L.length-1?"done":"level";return}ask()}else{s.hp--;s.st=0;s.mist++;s.msg="Erro: "+s.q.r;addRev(s.q);if(s.hp<=0){reset();s.msg="Game over"}else ask()}}
function upd(d){if(s.m!=="play"||s.pause)return;s.tm=Math.max(0,s.tm-d);if(!s.tm){s.hp--;s.st=0;s.msg="Tempo esgotado";addRev(s.q);if(s.hp<=0){reset();s.msg="Game over"}else{s.tm=8;ask()}}}
function draw(){x.clearRect(0,0,c.width,c.height);const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#d8ebff");g.addColorStop(1,"#bcd9ff");x.fillStyle=g;x.fillRect(0,0,W,H);x.fillStyle="#0d2b4d";x.font="bold 30px Trebuchet MS";x.fillText("Nihongo Quest",30,45);
x.font="21px Trebuchet MS";x.fillText("XP "+s.xp+" HP "+s.hp+" T "+s.tm.toFixed(1)+" Combo "+s.st+" Estrelas "+s.stars,30,80);x.fillText("Script: "+(s.scr==="h"?"Hiragana":"Katakana")+" | Dicas: "+s.hints+" | Revisao: "+s.rev.length,30,108);
if(s.m==="menu"){x.font="28px Trebuchet MS";x.fillText("Enter para iniciar",330,250);x.font="20px Trebuchet MS";x.fillText("1-4 responde, H dica, P pausa, N proximo, J troca script",150,300);x.fillText("R reinicia, F fullscreen",340,332)}
if(s.m==="play"){x.font="24px Trebuchet MS";x.fillText("Nivel "+(s.lv+1)+" "+L[s.lv].n+" Rodada "+(s.rd+1)+"/"+L[s.lv].t,180,155);x.font="bold 96px Trebuchet MS";x.fillText(s.q.k,450,250);x.font="32px Trebuchet MS";for(let i=0;i<4;i++){if(s.h[i])continue;x.fillText((i+1)+". "+s.o[i].r,220+(i%2)*280,340+Math.floor(i/2)*72)}if(s.pause){x.font="bold 48px Trebuchet MS";x.fillText("PAUSADO",390,460)}}
if(s.m==="level"){const acc=s.ans?Math.round(((s.ans-s.mist)/s.ans)*100):100;x.font="38px Trebuchet MS";x.fillText("Nivel concluido! N para proximo",150,250);x.font="26px Trebuchet MS";x.fillText("Precisao "+acc+"% | Estrelas "+s.stars+" | Erros "+s.mist,220,310)}
if(s.m==="done"){const acc=s.ans?Math.round(((s.ans-s.mist)/s.ans)*100):100;x.font="38px Trebuchet MS";x.fillText("Parabens! R para jogar de novo",160,250);x.font="26px Trebuchet MS";x.fillText("Score "+s.sc+" | Precisao "+acc+"% | Revisao pendente "+s.rev.length,170,310)}
if(s.msg){x.font="24px Trebuchet MS";x.fillText(s.msg,30,520)}}
addEventListener("keydown",e=>{const k=e.key.toLowerCase();if(k==="f"){if(!document.fullscreenElement)c.requestFullscreen?.();else document.exitFullscreen?.();return}if(k==="escape"&&document.fullscreenElement){document.exitFullscreen?.();return}
if(k==="enter"&&s.m==="menu")start(0);if(k==="n"&&s.m==="level")start(Math.min(L.length-1,s.lv+1));if(k==="r")reset();if(k==="j"&&s.m==="menu")s.scr=s.scr==="h"?"k":"h";if(k==="h"||k==="a")hint();if((k==="p"||k==="b")&&s.m==="play"){s.pause=!s.pause;s.msg=s.pause?"Pausado":""}
if(s.m==="play"&&["1","2","3","4"].includes(k))pick(Number(k)-1)});
let last=0;function loop(t){if(!last)last=t;upd((t-last)/1000);last=t;draw();requestAnimationFrame(loop)}
document.addEventListener("fullscreenchange",()=>{if(document.fullscreenElement){c.width=innerWidth;c.height=innerHeight}else{c.width=W;c.height=H}draw()});
c.addEventListener("mousedown",e=>{if(s.m!=="play")return;const r=c.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width*W,my=(e.clientY-r.top)/r.height*H;if(mx<190||mx>770||my<300||my>470)return;const col=mx<480?0:1,row=my<385?0:1;pick(row*2+col)});
window.render_game_to_text=()=>JSON.stringify({coordinateSystem:{origin:"top-left",xDirection:"right",yDirection:"down",width:W,height:H},mode:s.m,level:{index:s.lv,name:L[s.lv].n,round:s.rd,target:L[s.lv].t},stats:{hp:s.hp,xp:s.xp,score:s.sc,timer:Number(s.tm.toFixed(2)),combo:s.st,stars:s.stars,hints:s.hints},prompt:s.q?{kana:s.q.k}:null,options:s.o.map((o,i)=>({index:i,romaji:o.r,hidden:!!s.h[i]})),reviewQueue:s.rev.length,feedback:s.msg,script:s.scr==="h"?"hiragana":"katakana",paused:s.pause});
window.advanceTime=ms=>{const n=Math.max(1,Math.round(ms/(1000/60)));for(let i=0;i<n;i++)upd(1/60);draw()};reset();draw();requestAnimationFrame(loop);
// --- audio + missao diaria ---
const MKEY="nihongoQuestMissionV1";
const todayKey=()=>new Date().toISOString().slice(0,10);
const defaultMission=()=>({date:todayKey(),targetAnswers:12,targetAccuracy:80,answered:0,correct:0,completed:false});
function loadMission(){try{const raw=localStorage.getItem(MKEY);const m=raw?JSON.parse(raw):defaultMission();s.mission=(!m||m.date!==todayKey())?defaultMission():m}catch{s.mission=defaultMission()}}
function saveMission(){try{localStorage.setItem(MKEY,JSON.stringify(s.mission))}catch{}}
function missionAcc(){return s.mission&&s.mission.answered?Math.round((s.mission.correct/s.mission.answered)*100):0}
function updateMission(ok){if(!s.mission)loadMission();s.mission.answered++;if(ok)s.mission.correct++;if(!s.mission.completed&&s.mission.answered>=s.mission.targetAnswers&&missionAcc()>=s.mission.targetAccuracy){s.mission.completed=true;s.xp+=50;s.stars+=2;s.hints+=1;s.msg="Missao diaria concluida! +50 XP"}saveMission()}
function speakCurrent(){if(!s.q)return;if("speechSynthesis" in window&&typeof SpeechSynthesisUtterance!=="undefined"){const u=new SpeechSynthesisUtterance(s.q.k);u.lang="ja-JP";window.speechSynthesis.cancel();window.speechSynthesis.speak(u);s.msg="Pronuncia: "+s.q.k}else{s.msg="Audio nao suportado"}}
s.voiceAuto=false;loadMission();
const _reset=reset;reset=function(){_reset();if(!s.mission||s.mission.date!==todayKey())loadMission()};
const _ask=ask;ask=function(){_ask();if(s.voiceAuto&&s.m==="play")speakCurrent()};
const _pick=pick;pick=function(i){if(s.m!=="play")return;const ok=!!(s.o[i]&&!s.h[i]&&s.o[i].ok);const before=s.ans;_pick(i);if(s.ans>before)updateMission(ok)};
const _draw=draw;draw=function(){_draw();x.fillStyle="#0d2b4d";x.font="18px Trebuchet MS";const mp=s.mission?s.mission.answered+"/"+s.mission.targetAnswers+" "+missionAcc()+"%":"-";x.fillText("Missao diaria: "+mp,30,132);if(s.mission&&s.mission.completed)x.fillText("Missao concluida!",30,154);if(s.m==="menu")x.fillText("V/Space pronuncia | T auto-voz",330,362)};
addEventListener("keydown",e=>{const k=e.key.toLowerCase();if((k==="v"||k==="space")&&s.m==="play")speakCurrent();if(k==="t"){s.voiceAuto=!s.voiceAuto;s.msg=s.voiceAuto?"Auto-voz ligada":"Auto-voz desligada"}});
const _rtt=window.render_game_to_text;window.render_game_to_text=()=>{const p=JSON.parse(_rtt());p.voiceAuto=s.voiceAuto;p.mission=s.mission?{answered:s.mission.answered,targetAnswers:s.mission.targetAnswers,accuracy:missionAcc(),completed:s.mission.completed}:null;return JSON.stringify(p)};
// --- streak diario + loja ---
const SKEY="nihongoQuestShopV1";
const dStr=d=>new Date(d+"T00:00:00");
const dayDiff=(a,b)=>Math.round((dStr(a)-dStr(b))/86400000);
const defaultShop=()=>({shield:0,timeBoost:0});
function loadShop(){try{s.shop=Object.assign(defaultShop(),JSON.parse(localStorage.getItem(SKEY)||"{}"))}catch{s.shop=defaultShop()}s.shopOpen=false;}
function saveShop(){try{localStorage.setItem(SKEY,JSON.stringify({shield:s.shop.shield,timeBoost:s.shop.timeBoost}))}catch{}}
const _loadMission=loadMission;loadMission=function(){_loadMission();if(!s.mission.streakDays)s.mission.streakDays=0;if(!s.mission.lastCompleteDate)s.mission.lastCompleteDate="";if(s.mission.date!==todayKey()){const prev=JSON.parse(JSON.stringify(s.mission));s.mission=defaultMission();s.mission.streakDays=(prev.completed&&dayDiff(todayKey(),prev.date)===1)?(prev.streakDays||1)+1:0;s.mission.lastCompleteDate=prev.lastCompleteDate||"";saveMission();}};
loadMission=function(){try{const raw=localStorage.getItem(MKEY);const prev=raw?JSON.parse(raw):null;const t=todayKey();if(!prev){s.mission=Object.assign(defaultMission(),{streakDays:0,lastCompleteDate:""});saveMission();return;}if(prev.date===t){s.mission=Object.assign(defaultMission(),prev);if(typeof s.mission.streakDays!=="number")s.mission.streakDays=0;if(!s.mission.lastCompleteDate)s.mission.lastCompleteDate="";return;}const streak=(prev.completed&&dayDiff(t,prev.date)===1)?(prev.streakDays||0)+1:0;s.mission=Object.assign(defaultMission(),{streakDays:streak,lastCompleteDate:prev.lastCompleteDate||""});saveMission();}catch{s.mission=Object.assign(defaultMission(),{streakDays:0,lastCompleteDate:""})}};
const _updateMission=updateMission;updateMission=function(ok){const was=s.mission&&s.mission.completed;_updateMission(ok);if(!s.mission)return;if(typeof s.mission.streakDays!=="number")s.mission.streakDays=0;if(!s.mission.lastCompleteDate)s.mission.lastCompleteDate="";if(!was&&s.mission.completed){s.mission.lastCompleteDate=todayKey();if(!s.mission.streakDays)s.mission.streakDays=1;if(s.mission.streakDays>0&&s.mission.streakDays%3===0){s.stars+=3;s.msg="Streak x"+s.mission.streakDays+"! Bonus +3 estrelas";}saveMission();}};
loadMission();loadShop();
const _start=start;start=function(i){_start(i);if(s.shop&&s.shop.timeBoost>0)s.tm+=s.shop.timeBoost;};
const _pickShop=pick;pick=function(i){if(s.m!=="play"||!s.o[i]||s.h[i])return;const wrong=!s.o[i].ok;if(wrong&&s.shop&&s.shop.shield>0){s.shop.shield--;s.ans++;s.mist++;s.st=0;s.msg="Escudo absorveu erro";addRev(s.q);updateMission(false);saveShop();ask();return;}_pickShop(i)};
const _updShop=upd;upd=function(d){const hp=s.hp;_updShop(d);if(s.m==="play"&&s.shop&&s.shop.shield>0&&hp>s.hp){s.shop.shield--;s.hp=hp;s.msg="Escudo bloqueou dano de tempo";saveShop();}};
function buy(id){if(!s.shop)loadShop();if(id===1&&s.stars>=2){s.stars-=2;s.hints+=1;s.msg="Comprou: +1 dica";return saveShop(),true}if(id===2&&s.stars>=3){s.stars-=3;s.shop.shield+=1;s.msg="Comprou: escudo";return saveShop(),true}if(id===3&&s.stars>=2){s.stars-=2;s.shop.timeBoost=Math.min(12,(s.shop.timeBoost||0)+2);s.msg="Comprou: +2s por nivel";return saveShop(),true}s.msg="Estrelas insuficientes";return false}
addEventListener("keydown",e=>{const k=e.key.toLowerCase();if(k==="o"&&s.m!=="play"){s.shopOpen=!s.shopOpen;s.msg=s.shopOpen?"Loja aberta":"Loja fechada";}if(!s.shopOpen)return;if(k==="1")buy(1);if(k==="2")buy(2);if(k==="3")buy(3);});
const _drawShop=draw;draw=function(){_drawShop();x.fillStyle="#0d2b4d";x.font="18px Trebuchet MS";const streak=s.mission&&s.mission.streakDays?s.mission.streakDays:0;x.fillText("Streak diario: "+streak+" dia(s)",30,176);x.fillText("Loja (O): Escudo "+(s.shop?s.shop.shield:0)+" | Bonus tempo "+(s.shop?s.shop.timeBoost:0)+"s",30,198);if(s.shopOpen&&s.m!=="play"){x.fillStyle="rgba(255,255,255,0.9)";x.fillRect(180,210,600,220);x.fillStyle="#0d2b4d";x.font="bold 28px Trebuchet MS";x.fillText("Loja de Estrelas",370,250);x.font="22px Trebuchet MS";x.fillText("1) +1 dica (2 estrelas)",220,295);x.fillText("2) Escudo anti-erro (3 estrelas)",220,330);x.fillText("3) +2s por nivel (2 estrelas)",220,365);x.fillText("Estrelas atuais: "+s.stars,220,400);}};
const _rtt2=window.render_game_to_text;window.render_game_to_text=()=>{const p=JSON.parse(_rtt2());p.mission=p.mission||{};p.mission.streakDays=s.mission&&s.mission.streakDays?s.mission.streakDays:0;p.shop={open:!!s.shopOpen,shield:s.shop?s.shop.shield:0,timeBoost:s.shop?s.shop.timeBoost:0};return JSON.stringify(p)};
const _resetShop=reset;reset=function(){_resetShop();if(s.shop)s.shopOpen=false;};
addEventListener("keydown",e=>{const k=e.key.toLowerCase();if((k==="arrowup")&&s.m!=="play"){s.shopOpen=!s.shopOpen;s.msg=s.shopOpen?"Loja aberta":"Loja fechada";}if(!s.shopOpen)return;if(k==="arrowleft")buy(1);if(k==="arrowright")buy(2);if(k==="arrowdown")buy(3);});
