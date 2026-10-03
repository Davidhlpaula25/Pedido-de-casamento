const screens=[...document.querySelectorAll('.screen')];
function go(name){screens.forEach(s=>s.classList.toggle('active',s.dataset.screen===name));window.scrollTo({top:0,behavior:'instant'});} 
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));

const teaseStage=document.getElementById('teaseStage');
const runawayYes=document.getElementById('runawayYes');
const teaseMsg=document.getElementById('teaseMsg');
const unlockStory=document.getElementById('unlockStory');
const teaseLines=[
  'Ué... não era você que vivia me intimando pra casar? 😂',
  'Calma, apressadinha 😌',
  'Hoje quem manda sou eu 😂',
  'Nem adianta correr atrás do SIM 👀',
  'Tá bom... antes de responder, quero te mostrar uma coisa ❤️'
];
let teaseCount=0;
const escapesBeforeUnlock=10;
function moveButton(btn,stage){
  const pad=14, maxX=stage.clientWidth-btn.offsetWidth-pad*2, maxY=stage.clientHeight-btn.offsetHeight-pad*2;
  btn.style.left=`${pad+Math.max(0,Math.random()*maxX)}px`;
  btn.style.top=`${pad+Math.max(0,Math.random()*maxY)}px`;
  btn.style.transform='none';
}
function teaseEscape(e){e.preventDefault();moveButton(runawayYes,teaseStage);teaseMsg.textContent=teaseLines[Math.min(teaseCount,teaseLines.length-1)];teaseCount++;if(teaseCount>=escapesBeforeUnlock){runawayYes.classList.add('hidden');document.getElementById('fakeNo').classList.add('hidden');unlockStory.classList.remove('hidden');}}
['pointerenter','pointerdown','touchstart'].forEach(ev=>runawayYes.addEventListener(ev,teaseEscape,{passive:false}));
document.getElementById('fakeNo').addEventListener('click',()=>{teaseMsg.textContent='Não vale escolher NÃO só porque o SIM fugiu 😂';});
unlockStory.addEventListener('click',()=>go('story'));

const story=[
 {img:'assets/foto-01.jpeg',k:'Nossa história',t:'Desde o começo...',x:'Entre risadas, fases boas, desafios e tantas memórias, a gente foi construindo uma história que é só nossa.'},
 {img:'assets/foto-02.jpeg',k:'Nós dois',t:'Do nosso jeito.',x:'Sem precisar ser perfeito. Só verdadeiro, intenso, engraçado e cheio de momentos que eu não trocaria por nada.'},
 {img:'assets/foto-03.jpeg',k:'Memórias',t:'Cada fase ficou marcada.',x:'Tem foto bonita, foto zoada, passeio, rotina e aqueles momentos simples que acabam sendo os mais especiais.'},
 {img:'assets/foto-04.jpeg',k:'Parceria',t:'Até nas loucuras.',x:'Você esteve comigo em tantas versões minhas. E eu amo olhar para trás e perceber quanto caminho a gente já percorreu.'},
 {img:'assets/foto-05.jpeg',k:'Tempo',t:'A gente foi crescendo.',x:'Mudamos, amadurecemos, aprendemos e continuamos escolhendo ficar lado a lado.'},
 {img:'assets/foto-06.jpeg',k:'Companhia',t:'Minha pessoa favorita.',x:'Pra conversar, implicar, rir, sair, ficar em casa e até discutir besteira. É com você que eu quero dividir a vida.'},
 {img:'assets/foto-07.jpeg',k:'Amor',t:'E a história ficou ainda maior.',x:'O que era “eu e você” virou muito mais. Vieram novos planos, novas responsabilidades e um amor ainda mais forte.'},
 {img:'assets/foto-08.jpeg',k:'Família',t:'Nossa história virou família.',x:'E quando eu olho para tudo que construímos, fica fácil saber onde eu quero estar: ao lado de vocês.'},
 {img:'assets/foto-09.jpeg',k:'Hoje',t:'Eu escolheria vocês de novo.',x:'Por tudo que já vivemos e, principalmente, por tudo que eu ainda quero viver com você.'}
];
let idx=0;const photo=document.getElementById('storyPhoto'),kick=document.getElementById('storyKicker'),title=document.getElementById('storyTitle'),txt=document.getElementById('storyText'),bar=document.getElementById('progressBar'),dots=document.getElementById('storyDots');
story.forEach((_,i)=>{const d=document.createElement('span');d.onclick=()=>{idx=i;renderStory()};dots.appendChild(d)});
function renderStory(){const s=story[idx];photo.style.opacity=.25;setTimeout(()=>{photo.src=s.img;photo.onload=()=>photo.style.opacity=1},120);kick.textContent=s.k;title.textContent=s.t;txt.textContent=s.x;bar.style.width=`${((idx+1)/story.length)*100}%`;[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===idx));document.getElementById('prevStory').style.visibility=idx===0?'hidden':'visible';document.getElementById('nextStory').textContent=idx===story.length-1?'Continuar →':'→';}
document.getElementById('prevStory').onclick=()=>{if(idx>0){idx--;renderStory()}};
document.getElementById('nextStory').onclick=()=>{if(idx<story.length-1){idx++;renderStory()}else go('pause')};renderStory();

const runawayNo=document.getElementById('runawayNo'),proposalStage=document.getElementById('proposalStage'),proposalMsg=document.getElementById('proposalMsg'),finalYes=document.getElementById('finalYes');let noCount=0;
const noLines=['Opa! Esse botão fugiu 😂','Agora quem não deixa sou eu 😌','Nem tenta! Esse botão não funciona 😂','Acho melhor clicar no SIM ❤️','Vai logo, Karolliny 😂❤️'];
function noEscape(e){e.preventDefault();moveButton(runawayNo,proposalStage);proposalMsg.textContent=noLines[Math.min(noCount,noLines.length-1)];noCount++;const scale=Math.min(1.55,1+noCount*.08);finalYes.style.transform=`translateY(-50%) scale(${scale})`;}
['pointerenter','pointerdown','touchstart'].forEach(ev=>runawayNo.addEventListener(ev,noEscape,{passive:false}));
finalYes.addEventListener('click',()=>{go('yes');celebrate()});
function celebrate(){const box=document.getElementById('confetti');box.innerHTML='';for(let i=0;i<100;i++){const el=document.createElement('i');el.style.left=Math.random()*100+'vw';el.style.animationDuration=(2.7+Math.random()*3.2)+'s';el.style.animationDelay=(Math.random()*1.2)+'s';el.style.opacity=.5+Math.random()*.5;box.appendChild(el)}}
