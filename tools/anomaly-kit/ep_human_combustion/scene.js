// CASE 023 人体自燃（Mary Reeser 1951；灯芯效应）
const EP={caseNo:'023',name:'扶手椅上的灰烬',sfx:{ghost:[11.6,12.7],stings:[],blips:[33.4,34.6,38.6,39.6],whisper:[10,16]}};
const X0=420,X1=1500,TOP=340,FL=860,CX=900;
function armchair(x,y,s,a,c=CYAN,burn=0){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  line([[-110,0],[-110,-150],[-80,-190],[80,-190],[110,-150],[110,0]],c,4,true,a*(1-burn*0.5));line([[-130,-40],[-130,-110],[-90,-110],[-90,-40],[90,-40],[90,-110],[130,-110],[130,-40],[-130,-40]],c,4,true,a*(1-burn*0.5));
  line([[-120,-40],[-120,0]],c,3,true,a);line([[120,-40],[120,0]],c,3,true,a);ctx.restore();
  if(burn>0){ctx.save();ctx.globalAlpha=a*burn;const g=ctx.createRadialGradient(x,y-60*s,0,x,y-60*s,190*s);g.addColorStop(0,'rgba(0,0,0,.95)');g.addColorStop(.7,'rgba(20,10,5,.6)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-200*s,y-260*s,400*s,300*s);ctx.restore();}}
function smoke(t,x,y,a,n=7){if(a<=0)return;const r=rng(9);for(let i=0;i<n;i++){const q=(t*0.18+r())%1;const sx=x+Math.sin(t*0.8+i*2)*40*q+(r()-.5)*60;ctx.save();ctx.globalAlpha=a*(1-q)*0.35;ctx.filter='blur(14px)';ctx.fillStyle='#8a948f';ctx.beginPath();ctx.arc(sx,y-q*300,30+q*50,0,6.28);ctx.fill();ctx.restore();}}
function flame(x,y,s,t,a,c='255,140,50'){if(a<=0)return;const f=1+0.12*Math.sin(t*23)+0.08*Math.sin(t*37);ctx.save();ctx.translate(x,y);ctx.scale(s,s*f);ctx.globalAlpha=a;
  glowDot(0,-40,120,`rgba(${c},.5)`);ctx.fillStyle=`rgba(${c},.9)`;ctx.shadowColor=`rgb(${c})`;ctx.shadowBlur=30;ctx.beginPath();ctx.moveTo(0,-110);ctx.bezierCurveTo(40,-60,40,0,0,0);ctx.bezierCurveTo(-40,0,-40,-60,0,-110);ctx.fill();
  ctx.fillStyle='rgba(255,240,200,.9)';ctx.beginPath();ctx.moveTo(0,-60);ctx.bezierCurveTo(16,-36,16,-6,0,-6);ctx.bezierCurveTo(-16,-6,-16,-36,0,-60);ctx.fill();ctx.restore();}
function candle(x,y,s,t,a){if(a<=0)return;rect(x-50*s,y-260*s,100*s,260*s,PAPER,4,a,'rgba(233,243,238,.06)');line([[x,y-260*s],[x,y-290*s]],PAPER,4,true,a);flame(x,y-290*s,0.8*s,t,a);}
function room(t,a,o={}){if(a<=0)return;roomBox(X0,X1,TOP,FL,a);
  line([[1250,FL],[1250,FL-150],[1420,FL-150],[1420,FL]],CYAN,3,true,a*0.7);line([[1250,FL-150],[1420,FL-150]],CYAN,3,true,a);rect(1290,FL-260,90,110,CYAN,2,a*0.7);txt('报纸',1335,FL-120,22,DIM,{f:SANS,w:500,a:a*(o.labels??0)});
  line([[560,FL],[560,TOP+180]],CYAN,2,true,a*0.7);line([[520,TOP+180],[600,TOP+180],[580,TOP+130],[540,TOP+130],[520,TOP+180]],CYAN,2.5,true,a*0.8);
  armchair(CX,FL,1.2,a,CYAN,o.burn||0);}
function pig(x,y,s,a){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha=a;ctx.strokeStyle=PAPER;ctx.lineWidth=4;ctx.shadowColor=PAPER;ctx.shadowBlur=12;
  ctx.beginPath();ctx.ellipse(0,0,150,70,0,0,6.28);ctx.stroke();ctx.beginPath();ctx.ellipse(160,-10,40,34,0,0,6.28);ctx.stroke();
  for(const lx of[-90,-40,50,100])line([[lx,60],[lx,100]],PAPER,4,true,1);
  ctx.fillStyle='rgba(127,232,255,.12)';ctx.strokeStyle=CYAN;ctx.setLineDash([12,8]);ctx.beginPath();ctx.ellipse(10,0,190,95,0,0,6.28);ctx.fill();ctx.stroke();ctx.setLineDash([]);ctx.restore();}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'人体自燃事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'人几乎烧没了，房间却几乎没烧着');
    room(t,a,{burn:0.8});smoke(t,CX,FL-120,a);ghost(CX,640,0.6,a*flashA(t,[1.4,2.0,3.3],0.13),'120,120,125');
    stamp('未解之谜',1660,700,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1951 年 · 美国 · 佛罗里达',PAPER,215,64);room(t,a,{labels:1});personSit(CX-10,FL-130,0.9,a*(1-seg(t,9,10)));
    glowDot(560,TOP+200,120,'rgba(255,200,120,.3)',a);
    cap(t,T.lab+.4,7.4,'67 岁的玛丽·里瑟，晚上独自待在公寓里');cap(t,7.4,T.night+.2,'第二天早上，房东推开了她的房门');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    room(t,a*0.7,{burn:1,labels:seg(t,13.2,13.6)});smoke(t,CX,FL-120,a,9);
    ghost(CX,620,0.75,a*(flashA(t,[11.6,12.7],0.13)+win(t,15.2,16,.03,.4)),'120,120,125');
    const ha=a*seg(t,13.4,13.8);circ(1335,FL-210,80,GREEN,3,ha);circ(560,TOP+160,60,GREEN,3,ha);txt('完好',1335,FL-320,30,GREEN,{f:SANS,w:700,a:ha});txt('完好',560,TOP+60,30,GREEN,{f:SANS,w:700,a:ha});
    cap(t,T.night+.3,13.1,'她和那把扶手椅，几乎烧成了灰烬');cap(t,13.2,15.1,'可离她不远的家具和报纸，几乎没被烧到','#d9e6e2');
    cap(t,15.2,T.foil,'没有明火，难道人会自己着火？',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'报纸疯传：人体自燃！',PAPER,215,66);
    [[640,560,-0.12,16.4],[960,520,0.06,17.0],[1280,580,-0.04,17.6]].forEach(([x,y,r,t0],i)=>{const ca=a*seg(t,t0,t0+.3);const yy=y-60*(1-eOut(seg(t,t0,t0+.4)));
      ctx.save();ctx.translate(x,yy);ctx.rotate(r);ctx.globalAlpha=ca;ctx.fillStyle='rgba(233,243,238,.08)';ctx.fillRect(-170,-200,340,400);ctx.strokeStyle=PAPER;ctx.lineWidth=3;ctx.strokeRect(-170,-200,340,400);ctx.restore();
      txt(['人体自燃！','离奇火灾','无法解释'][i],x,yy-120,46,RED,{a:ca,rot:r});for(let k=0;k<5;k++)line([[x-130,yy-40+k*40],[x+130,yy-40+k*40]],'rgba(233,243,238,.4)',3,false,ca);});
    cap(t,T.foil+.4,18.4,'几百年来，类似的离奇案例不止一起');cap(t,18.4,T.hit,'真相，其实藏在一根蜡烛里……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'人体，就像一根蜡烛！',RED,215,92,{pop:1,fi:.02});candle(W/2,890,1.25,t,a);
    cap(t,T.hit+.8,T.trace,'只不过，这是一根"里外颠倒"的蜡烛');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'蜡烛 vs 人体',PAPER,215,66);
    candle(620,820,1.4,t,a);personStand(1300,820,2.1,a,'#c8d2ce');flame(1300,560,0.55,t,a*seg(t,26.4,27));
    const l1=a*seg(t,25.6,26),l2=a*seg(t,27,27.4);
    txt('灯芯',760,430,40,GREEN,{f:SANS,w:700,a:l1,al:'left'});txt('↔  衣服',1450,520,40,GREEN,{f:SANS,w:700,a:l1,al:'left'});
    txt('蜡',760,650,40,WARM,{f:SANS,w:700,a:l2,al:'left'});txt('↔  脂肪',1450,680,40,WARM,{f:SANS,w:700,a:l2,al:'left'});
    cap(t,T.trace+.4,28.2,'衣服像灯芯，吸住受热熔化的脂肪');cap(t,28.3,T.reveal,'火焰小而稳，能慢慢烧上好几个小时');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('灯芯效应',600,480,150,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('Wick Effect',600,620,48,PAPER,{f:MONO,a:a*seg(t,31.5,32)});
    pig(1350,600,1.1,a*seg(t,33.4,33.8));flame(1350,560,0.5,t,a*seg(t,34,34.4));txt('毯子',1350,470,30,CYAN,{f:SANS,w:700,a:a*seg(t,33.6,34)});
    txt('阴燃数小时',1350,760,40,WARM,{f:SANS,w:700,a:a*seg(t,34.6,35),glow:'rgba(255,200,120,.5)'});
    cap(t,T.reveal+.6,34.5,'法医做过实验：用毯子裹住一头死猪点燃');cap(t,34.6,T.eye,'它真的持续阴燃了好几个小时');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么周围没烧起来？',PAPER,215,66);
    flame(W/2,780,1.1,t,a);for(let i=0;i<3;i++){const q=(t*0.6+i/3)%1;line([[W/2-40+i*40,700-q*260],[W/2-40+i*40,640-q*260]],WARM,4,true,a*(1-q));}
    txt('热量往上走 ↑',W/2,380,44,WARM,{f:SANS,w:700,a:a*seg(t,38.6,39)});
    armchair(560,840,0.8,a*seg(t,39.6,40));rect(1300,700,140,140,CYAN,3,a*seg(t,39.6,40));txt('基本完好',560,560,34,GREEN,{f:SANS,w:700,a:a*seg(t,39.8,40.2)});txt('基本完好',1370,640,34,GREEN,{f:SANS,w:700,a:a*seg(t,39.8,40.2)});
    cap(t,T.eye+.4,39.9,'火焰很小，热量主要往上走');cap(t,40,T.off,'所以旁边的家具，常常没怎么被烧到');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'FBI 的结论：灯芯效应',PAPER,215,66);
    const cx=W/2,cy=620;line([[cx-200,cy],[cx+120,cy]],PAPER,22,true,a);line([[cx+120,cy],[cx+200,cy]],WARM,22,true,a);glowDot(cx+205,cy,60,'rgba(255,120,40,.7)',a*(0.7+0.3*Math.sin(t*8)));smoke(t,cx+210,cy-20,a,5);
    cap(t,T.off+.4,T.end,'而起火的源头，很可能只是一根烟');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('没有会"自燃"的人',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只有没人发现的火',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：FBI 1951 年结论 · DeHaan 等法医灯芯效应实验',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'千万别抽着烟在沙发上睡着｜评论区报案',GREEN);}
}
function coverScene(){room(20,1,{burn:0.9});smoke(3,CX,FL-120,1,9);flame(CX,FL-160,0.7,0.2,0.9);ghost(CX,620,0.7,0.5,'120,120,125');
  txt('人体自燃？',W/2-20,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('真相是一根',1710,500,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});txt('"人体蜡烛"',1710,580,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1951',1680,760,-1,0,GREEN,70,-0.1);}
