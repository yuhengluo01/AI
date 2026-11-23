// CASE 035 教堂火球（1638 怀德孔布大雷暴；2012 青海球状闪电光谱 Cen, Yuan & Xue 2014 PRL；土壤硅蒸气说为一种解释，球状闪电至今无公认解释）
const EP={caseNo:'035',name:'教堂火球',sfx:{ghost:[11.3,12.6,14.1],stings:[13.2],blips:[26.2,26.8,27.4,33.2,34.2],whisper:[10,16]}};
const CX=960,GR=840;
function church(t,a,o={}){if(a<=0)return;const c=o.col||CYAN;
  // 塔楼 + 中殿
  line([[620,GR],[620,470],[700,470],[700,GR]],c,3.5,true,a);line([[612,470],[612,440],[708,440],[708,470]],c,3,true,a);
  for(let k=0;k<4;k++)line([[618+k*28,440],[618+k*28,420]],c,3,true,a);
  line([[700,600],[1300,600],[1300,GR]],c,3.5,true,a);line([[700,600],[1000,500],[1300,600]],c,3,true,a*0.8);
  for(let k=0;k<4;k++){const x=780+k*130;line([[x,720],[x,660],[x+25,640],[x+50,660],[x+50,720],[x,720]],c,2.5,true,a*0.8);
    if(o.lit)glowDot(x+25,685,50,`rgba(255,200,120,${0.4*o.lit})`,a);}
  line([[560,GR],[1360,GR]],c,3,true,a);rect(645,520,30,50,c,2,a*0.7);}
function pews(t,a,n=6,dim=1){for(let i=0;i<n;i++)personSit(800+i*80,GR-12,0.42,a*dim,PAPER);}
function fireball(x,y,r,a,t){if(a<=0)return;const fl=0.85+0.15*Math.sin(t*31)*Math.sin(t*7);
  glowDot(x,y,r*3.2,'rgba(255,170,80,.35)',a*fl);glowDot(x,y,r*1.6,'rgba(255,230,160,.85)',a*fl);circ(x,y,r*0.6,null,0,a,'rgba(255,250,230,.95)');}
function bolt(pts,a){line(pts,'#dff6ff',5,true,a);line(pts,CYAN,12,true,a*0.3);}
function spectrum(x,y,w,h,a,t,t0){if(a<=0)return;rect(x,y,w,h,DIM,2,a,'rgba(0,0,0,.45)');
  const g=ctx.createLinearGradient(x,0,x+w,0);['#5a3cff','#2fa8ff','#2fff9a','#e8ff4a','#ffa23a','#ff3b3b'].forEach((c,i)=>g.addColorStop(i/5,c));
  ctx.save();ctx.globalAlpha=a*0.28;ctx.fillStyle=g;ctx.fillRect(x+2,y+2,w-4,h-4);ctx.restore();
  const L=[[0.17,'Si',GREEN],[0.24,'Fe',GREEN],[0.33,'Ca',GREEN],[0.56,'Fe',GREEN],[0.72,'Si',GREEN],[0.86,'N',DIM],[0.92,'O',DIM]];
  L.forEach(([q,s,c],i)=>{const la=a*seg(t,t0+i*0.3,t0+i*0.3+0.2);line([[x+q*w,y+8],[x+q*w,y+h-8]],c==DIM?PAPER:'#fffbe8',5,true,la);txt(s,x+q*w,y-34,36,c,{f:MONO,a:la});});}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'教堂火球事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'暴雨中，一团火球冲进了正在礼拜的教堂');
    church(t,a,{lit:1});pews(t,a);fireball(lerp(1500,1100,seg(t,1.2,3.6)),lerp(420,640,seg(t,1.2,3.6)),40,a*seg(t,1.2,1.5),t);
    ghost(1480,690,0.7,a*flashA(t,[1.8,3.0],0.12));stamp('未解之谜',1640,900,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1638 年 10 月 21 日 · 英国 · 怀德孔布村',PAPER,215,58);church(t,a,{lit:1});pews(t,a*seg(t,5,5.6));
    const ra=rng(5);for(let i=0;i<70;i++){const x=(ra()*W+t*60)%W,y=(ra()*H+t*700)%H;line([[x,y],[x-6,y+26]],CYAN,1.5,false,a*0.35);}
    cap(t,T.lab+.4,7.4,'星期天下午，村民挤在教堂里做礼拜，外面雷雨大作');cap(t,7.4,T.night+.2,'村里一直流传：魔鬼会骑着黑马，来抓有罪的人');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    church(t,a*0.6,{lit:1-seg(t,12.6,12.9)});pews(t,a,6,0.8);
    bolt([[680,140],[650,280],[700,330],[660,440]],a*flashA(t,[10.4,10.55,12.6],0.08));
    const p=seg(t,11,12.6);fireball(lerp(700,1080,p),lerp(470,700,p)-Math.sin(p*3.14)*80,lerp(20,60,p),a*win(t,11,13.6,.15,.4),t);
    ghost(1420,680,0.9,a*flashA(t,[11.3,12.6,14.1],0.14));
    ghost(1150,640,1.25,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,13.1,'一声巨响，一团约 2.4 米的火球冲进教堂');cap(t,13.2,15.1,'火光、浓烟、刺鼻的硫磺味……人们以为魔鬼来了','#d9e6e2');
    cap(t,15.2,T.foil,'4 人遇难，约 60 人受伤',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'"会飘的火球"',PAPER,215,70);
    [[560,'穿过窗户',16.4],[960,'悬停飘移',17.0],[1360,'无声消失',17.6]].forEach(([x,s,t0],i)=>{const ca=a*seg(t,t0,t0+.3);rect(x-160,420,320,300,CYAN,3,ca,'rgba(127,232,255,.05)');
      fireball(x,520+Math.sin(t*2+i)*14,22,ca*(i==2?0.5+0.5*Math.sin(t*6):1),t);txt(s,x,660,44,PAPER,{a:ca});});
    cap(t,T.foil+.4,18.4,'几百年来，世界各地都有人目击这种发光的火球');cap(t,18.5,T.hit,'它来去无踪，从来没人用仪器好好测过它……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'2012 年，它被仪器拍到了！',RED,215,88,{pop:1,fi:.02});
    rect(360,380,1200,460,DIM,2,a,'rgba(0,0,0,.4)');line([[360,760],[600,700],[820,740],[1100,690],[1560,750]],CYAN,2.5,true,a*0.6);
    bolt([[700,390],[740,520],[710,600],[760,720]],a*flashA(t,[21.05,21.2],0.1));
    const p=seg(t,21.3,24.8);fireball(lerp(780,1120,p),lerp(700,660,p),26,a*seg(t,21.3,21.5)*(1-seg(t,24.6,24.9)),t);
    txt('REC  · 青海 · 7 月',400,410,26,RED,{f:MONO,a,al:'left'});txt('持续 1.64 秒',1520,410,30,GREEN,{f:MONO,a:a*seg(t,22.4,22.8),al:'right'});
    cap(t,T.hit+.8,T.trace,'中国科学家在青海观测闪电时，意外拍下了球状闪电');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：火球里有什么？',PAPER,215,64);
    fireball(300,620,34,a,t);line([[360,620],[460,620]],PAPER,3,true,a*seg(t,25.4,25.8));line([[440,606],[460,620],[440,634]],PAPER,3,true,a*seg(t,25.4,25.8));
    spectrum(500,520,1300,200,a*seg(t,25.5,25.9),t,26);
    txt('光谱',1150,780,30,DIM,{f:SANS,w:500,a});
    cap(t,T.trace+.4,28.2,'他们同时拍到了它的光谱——光里藏着元素的"指纹"');cap(t,28.3,T.reveal,'谱线里，出现了硅、铁、钙');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('Si·Fe·Ca',580,430,110,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('正好是泥土的成分',560,580,56,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,32)});txt('（一种解释）',560,660,30,DIM,{f:SANS,w:500,a:a*seg(t,32,32.4)});
    const gy=820;line([[1060,gy],[1820,gy]],WARM,4,true,a*seg(t,32.2,32.6));txt('地面土壤',1180,gy+40,28,WARM,{f:SANS,w:700,a:a*seg(t,32.4,32.8)});
    bolt([[1400,380],[1430,520],[1390,640],[1420,gy]],a*seg(t,33,33.1)*(1-seg(t,33.6,34)));
    for(let k=0;k<8;k++){const q=seg(t,33.3+k*0.05,34.3+k*0.05);circ(1420+Math.sin(k*2.1)*40*q,gy-q*120,4,null,0,a*q*(1-seg(t,35,35.5)),GREEN);}
    fireball(1420,gy-150,lerp(4,40,seg(t,34.2,35)),a*seg(t,34.2,34.5),t);
    cap(t,T.reveal+.6,34.4,'一种解释：闪电劈中地面，把土里的硅蒸发出来');cap(t,34.5,T.eye,'硅蒸气在空气里慢慢氧化、发光，聚成火球');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么人们说是魔鬼？',PAPER,215,66);
    [[480,'极其罕见',37.4],[960,'只存在几秒',38.2],[1440,'雷击焦味',39.0]].forEach(([x,s,t0])=>{const ca=a*seg(t,t0,t0+.3);circ(x,560,130,GREEN,3,ca,'rgba(109,255,192,.05)');txt(s,x,560,40,PAPER,{a:ca,f:SANS,w:700});});
    txt('↓',960,730,50,DIM,{f:SANS,a:a*seg(t,39.6,40)});txt('当年只能想到"魔鬼"',960,810,48,RED,{f:SANS,w:900,a:a*seg(t,39.8,40.2),glow:'rgba(255,60,60,.5)'});
    cap(t,T.eye+.4,39.9,'它罕见又短暂，加上雷击的焦糊味和巨响');cap(t,40,T.off,'在 17 世纪，人们只能把它当成魔鬼的惩罚');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'但它至今仍是悬案',PAPER,215,66);glowDot(W/2,600,560,'rgba(255,200,120,.2)',a);church(t,a,{col:WARM,lit:1});
    cap(t,T.off+.4,T.end,'球状闪电至今没有公认解释，土壤说只是其中一种');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"魔鬼之火"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('是还没解开的物理',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('仍在调查',1540,480,46.2,t,RED,80,-0.14);
    txt('资料：Cen, Yuan & Xue 2014《Physical Review Letters》· 1638 年怀德孔布大雷暴记载',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你亲眼见过球状闪电吗？｜评论区报案',GREEN);}
}
function coverScene(){church(5,1,{lit:1});pews(5,1);fireball(1460,560,50,1,5);ghost(1640,690,0.8,0.7);
  txt('一团火球冲进教堂',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('是魔鬼，还是闪电？',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1638',300,920,-1,0,GREEN,64,-0.1);}
