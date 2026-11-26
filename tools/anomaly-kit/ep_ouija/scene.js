// CASE 050 通灵板自己会动（观念运动效应：Carpenter 1852；Faraday 1853 桌灵转实验；Gauchou, Rensink & Fels 2012《Consciousness and Cognition》蒙眼实验 65% vs 50%）
const EP={caseNo:'050',name:'自己会动的通灵板',sfx:{ghost:[11.4,13.0,14.4],stings:[13.0],blips:[26.2,27.4,33.4,34.6,38.6,39.6],whisper:[10,16]}};
const BX=960,BY=620; // 通灵板中心
const LET='ABCDEFGHIJKLM',LET2='NOPQRSTUVWXYZ';
function letterPos(ch){let i=LET.indexOf(ch);if(i>=0){const x=(i/12-0.5)*680;return [BX+x,BY-50+Math.pow(x/340,2)*45];}
  i=LET2.indexOf(ch);const x=(i/12-0.5)*600;return [BX+x,BY+70+Math.pow(x/300,2)*35];}
const YES=[BX-320,BY-160],NO=[BX+320,BY-160];
function board(t,a,c=CYAN,lit=''){if(a<=0)return;
  ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=3.5;ctx.shadowColor=c;ctx.shadowBlur=14;ctx.fillStyle='rgba(127,232,255,.04)';
  ctx.beginPath();ctx.roundRect(BX-420,BY-220,840,440,40);ctx.fill();ctx.stroke();ctx.restore();
  txt('YES',YES[0],YES[1],40,c,{f:SERIF,a:a*(lit==='YES'?1:0.75),glow:lit==='YES'?'rgba(255,60,60,.8)':null});
  txt('NO',NO[0],NO[1],40,c,{f:SERIF,a:a*0.75});
  for(const ch of LET+LET2){const [x,y]=letterPos(ch);const on=lit.includes(ch)&&lit!=='YES';txt(ch,x,y,36,on?RED:c,{f:SERIF,a:a*(on?1:0.7),glow:on?'rgba(255,60,60,.7)':null});}
  txt('GOOD BYE',BX,BY+180,32,c,{f:SERIF,a:a*0.7});
  // 太阳与月亮
  circ(BX-300,BY+180,16,c,2.5,a*0.6);ctx.save();ctx.globalAlpha*=a*0.6;ctx.strokeStyle=c;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(BX+300,BY+180,16,0.6,5.6);ctx.stroke();ctx.restore();}
function planchette(x,y,a,c=PAPER,glow=0){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=4;ctx.shadowColor=glow?RED:c;ctx.shadowBlur=glow?30:14;
  ctx.fillStyle='rgba(233,243,238,.06)';ctx.beginPath();ctx.moveTo(0,-70);ctx.bezierCurveTo(70,-60,85,40,40,70);ctx.lineTo(-40,70);ctx.bezierCurveTo(-85,40,-70,-60,0,-70);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(0,-20,18,0,6.28);ctx.stroke();ctx.restore();}
// 指针窗口对准目标：窗口在 (x, y-20)
function pl(p){return [p[0],p[1]+20];}
function fingers(x,y,a,n=2,c=PAPER){if(a<=0)return;for(let k=0;k<n;k++){const dx=(k-(n-1)/2)*44;line([[x+dx,y-50],[x+dx*1.4,y-200],[x+dx*1.8+60,y-330]],c,5,true,a*0.85);}}
function path(t,keys){for(let i=0;i<keys.length-1;i++){const [t0,p0]=keys[i],[t1,p1]=keys[i+1];if(t<t1){const q=eInOut(seg(t,t0,t1));return [lerp(p0[0],p1[0],q),lerp(p0[1],p1[1],q)];}}return keys[keys.length-1][1];}
function cardboard(x,y,a,shift){for(let k=0;k<5;k++){const sx=shift*k*10;line([[x-220+sx,y-k*16],[x+220+sx,y-k*16]],k==4?WARM:CYAN,4,true,a);}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'通灵板自己动了',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'没人用力，指针却一个字一个字拼出了答案');
    board(t,a*0.9);const p=path(t,[[0,[BX,BY+30]],[1.6,pl(letterPos('H'))],[2.6,pl(letterPos('I'))],[3.6,pl(YES)]]);planchette(p[0],p[1],a);
    ghost(1560,600,0.9,a*flashA(t,[1.4,2.5,3.6],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1891 年 · 美国 · 通灵板走进千家万户',PAPER,215,58);
    board(t,a*seg(t,4.8,5.3));planchette(BX,BY+30,a*seg(t,5,5.4));
    personSit(420,820,1.1,a*seg(t,5.4,5.8));ctx.save();ctx.translate(1500,820);ctx.scale(-1,1);personSit(0,0,1.1,a*seg(t,5.6,6));ctx.restore();
    cap(t,T.lab+.4,7.4,'1891 年，通灵板在美国拿到专利，成了热卖的"游戏"');cap(t,7.4,T.night+.2,'几个人把手指轻放在指针上，向"亡灵"提问');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    board(t,a*0.75,CYAN,t>12.6&&t<15.2?'YES':'');
    const p=path(t,[[10,[BX,BY+30]],[11,[BX-40,BY+10]],[12.5,pl(YES)],[13.8,pl(YES)],[14.4,pl(letterPos('R'))],[15.2,pl(letterPos('R'))]]);
    planchette(p[0],p[1],a,PAPER,t>12.5?1:0);fingers(p[0],p[1],a*0.7,3);
    ghost(1600,560,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.4,13.0,14.4],0.14));ghost(BX,500,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'深夜，有人问：这里还有别人吗？');cap(t,12.6,15.1,'指针慢慢滑向了 YES……','#d9e6e2');
    cap(t,15.2,T.foil,'所有人都发誓：我没有推',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'1853 年 · 伦敦 · 法拉第',PAPER,215,66);
    rect(560,700,800,24,CYAN,3,a*seg(t,16.3,16.7),'rgba(127,232,255,.05)');line([[600,724],[600,860]],CYAN,3,true,a*seg(t,16.3,16.7));line([[1320,724],[1320,860]],CYAN,3,true,a*seg(t,16.3,16.7));
    cardboard(960,690,a*seg(t,17.2,17.6),0);
    txt('桌',960,800,40,DIM,{f:SANS,w:500,a:a*seg(t,16.3,16.7)});txt('纸板',1240,640,32,WARM,{f:SANS,w:700,a:a*seg(t,17.4,17.8)});
    cap(t,T.foil+.4,18.4,'1853 年，法拉第研究当时流行的"桌灵转"');cap(t,18.5,T.hit,'他在手和桌面之间，垫了几层纸板');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'是手先动的！',RED,215,104,{pop:1,fi:.02});
    const sh=eOut(seg(t,21.3,22.3));
    rect(560,700,800,24,CYAN,3,a,'rgba(127,232,255,.05)');cardboard(960,690,a,sh*3);
    for(let k=0;k<3;k++){const x=1060+sh*120+k*46;line([[x,620],[x+30,450]],PAPER,5,true,a*0.85);}
    line([[1300,560],[1460,560]],RED,5,true,a*seg(t,21.8,22.2));line([[1430,540],[1460,560],[1430,580]],RED,5,true,a*seg(t,21.8,22.2));
    txt('越靠上的纸板，被推得越远',960,820,38,WARM,{f:SANS,w:700,a:a*seg(t,22.4,22.8)});
    cap(t,T.hit+.8,23.3,'纸板被推歪了：是手在推桌子，不是桌子拉着手');cap(t,23.4,T.trace,'他还装了指示杆：人一看见自己在推，桌子就不动了');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：2012 年 · 加拿大 · 蒙眼实验',PAPER,215,60);
    board(t,a*0.6);planchette(BX+60*Math.sin(t*1.3),BY+20,a);
    personSit(470,820,1.1,a);line([[440,666],[510,666]],RED,10,true,a*seg(t,26.2,26.6));txt('蒙眼',470,600,34,RED,{f:SANS,w:700,a:a*seg(t,26.2,26.6)});
    const off=seg(t,27.4,28.2);ctx.save();ctx.translate(1500,820);ctx.scale(-1,1);personSit(0,0,1.1,a*(1-off*0.6));ctx.restore();
    txt('偷偷松手',1500,600,34,WARM,{f:SANS,w:700,a:a*seg(t,27.4,27.8)});
    cap(t,T.trace+.4,28.2,'研究者蒙上受试者的眼睛，同伴悄悄松开了手');cap(t,28.3,T.reveal,'受试者以为两个人一起在推，其实只有他自己');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('65%',600,470,220,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('用通灵板答题的正确率',600,650,44,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,32)});
    bar(1300,450,420,56,0.5,'嘴上猜','约 50%',33.4,t,CYAN);bar(1300,570,420,56,0.65,'通灵板','约 65%',34.6,t,RED);
    txt('（自己"没把握"的题）',1500,690,28,DIM,{f:SANS,w:500,a:a*seg(t,34.6,35)});
    cap(t,T.reveal+.6,34.4,'没把握的题，嘴上猜只对约一半');cap(t,34.5,T.eye,'换成通灵板回答，却对了约 65%');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'观念运动效应',PAPER,215,72);txt('Ideomotor Effect · 卡彭特 1852',W/2,305,30,GREEN,{f:MONO,w:400,a:a*seg(t,37.4,37.8)});
    brain(620,580,1.2,GREEN,a,0.5+0.3*Math.sin(t*5));
    const q=(t*0.9)%1;glowDot(lerp(760,1180,q),lerp(560,640,q),30,'rgba(109,255,192,.9)',a*seg(t,38.6,39));line([[760,560],[1180,640]],GREEN,2,false,a*0.4*seg(t,38.6,39));
    for(let k=0;k<3;k++){const x=1260+k*46+4*Math.sin(t*12+k);line([[x,720],[x+30,520]],PAPER,5,true,a*seg(t,39.6,40));}
    txt('微小动作',1310,790,36,WARM,{f:SANS,w:700,a:a*seg(t,39.6,40)});
    cap(t,T.eye+.4,39.9,'大脑一想到答案，手就会做出察觉不到的微小动作');cap(t,40,T.off,'没感觉到自己用力，就以为是"别的东西"在推');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'看见自己的手，"鬼"就不推了',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    board(t,a,WARM);planchette(BX,BY+30,a,WARM);
    cap(t,T.off+.4,T.end,'答案不是亡灵给的，是你自己心里的');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"鬼"',760,400,110,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('其实是你自己的手',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1580,480,46.2,t,RED,90,-0.14);
    txt('资料：Faraday 1853 · Carpenter 1852 · Gauchou, Rensink & Fels 2012《Consciousness and Cognition》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你玩过通灵板吗？评论区报案',GREEN);}
}
function coverScene(){board(3,1);planchette(...pl(YES),1,PAPER,1);ghost(1600,600,1.0,0.75);
  txt('没人推，通灵板却自己动了',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('蒙上眼睛后，真相露馅了',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('65%',300,940,-1,0,GREEN,64,-0.1);}
