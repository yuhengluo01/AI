// CASE 027 骷髅湖 Roopkund（Harney 等 2019 Nature Communications；冰雹说为一种解释）
const EP={caseNo:'027',name:'雪山骷髅湖',sfx:{ghost:[11.5,12.6],stings:[],blips:[25.8,26.6,28.4,33.2,34.4],whisper:[10,16]}};
const LX=960,LY=700,RX=400,RY=110;
function peaks(a,c=CYAN){if(a<=0)return;line([[120,650],[360,440],[520,560],[720,400],[880,600]],c,3.5,true,a);line([[1040,600],[1220,410],[1400,550],[1580,430],[1800,650]],c,3.5,true,a);
  for(const [x,y] of[[360,440],[720,400],[1220,410],[1580,430]])line([[x-40,y+44],[x,y],[x+40,y+44]],PAPER,3,true,a*0.8);
  line([[120,650],[LX-RX-60,LY],[LX+RX+60,LY],[1800,650]],c,2.5,true,a*0.6);}
function lake(a,ice=0){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.beginPath();ctx.ellipse(LX,LY,RX,RY,0,0,6.28);ctx.fillStyle=`rgba(127,232,255,${0.06+ice*0.1})`;ctx.fill();ctx.strokeStyle=CYAN;ctx.lineWidth=3.5;ctx.shadowColor=CYAN;ctx.shadowBlur=14;ctx.stroke();ctx.restore();
  for(let i=0;i<4;i++)line([[LX-260+i*150,LY-20+i*8],[LX-180+i*150,LY-20+i*8]],'rgba(127,232,255,.35)',1.5,false,a);}
// 抽象骸骨：短线+两端小点（不画头骨）
function bones(a,n,col=PAPER,seed=4,grp){if(a<=0)return;const r=rng(seed);for(let i=0;i<n;i++){const ang=r()*6.28,rr=Math.sqrt(r());const x=LX+Math.cos(ang)*RX*0.95*rr,y=LY+Math.sin(ang)*RY*0.9*rr;const th=r()*3.14,l=10+r()*14;
  const c=grp?grp(i):col;const dx=Math.cos(th)*l,dy=Math.sin(th)*l*0.5;line([[x-dx,y-dy],[x+dx,y+dy]],c,3,true,a*(0.5+0.5*r()));circ(x-dx,y-dy,3,null,0,a,c);circ(x+dx,y+dy,3,null,0,a,c);}}
function hail(t,a){if(a<=0)return;const r=rng(8);for(let i=0;i<40;i++){const x=200+r()*1520,sp=500+r()*400,y=((r()*600+t*sp)%600)+380;circ(x,y,5+r()*6,PAPER,2,a*0.8,'rgba(233,243,238,.3)');}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'骷髅湖事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'雪山冰湖底下，躺着几百具骸骨');
    peaks(a);lake(a);bones(a*seg(t,1,3),70);ghost(1520,560,0.7,a*flashA(t,[1.5,2.2,3.4],0.12),'150,150,160');
    stamp('未解之谜',1640,880,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'印度 · 喜马拉雅 · 海拔约 5000 米',PAPER,215,60);peaks(a);lake(a,1-seg(t,7.4,9));
    personStand(LX+RX+110,LY,0.5,a*seg(t,5,5.4));bones(a*seg(t,7.6,9),40);
    cap(t,T.lab+.4,7.4,'1942 年，一名护林员在冰湖边发现了骸骨');cap(t,7.4,T.night+.2,'每年夏天冰雪融化，湖底就露出更多');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    peaks(a*0.5);lake(a);bones(a,Math.floor(lerp(40,160,seg(t,10.3,13))));
    ghost(1500,560,0.8,a*flashA(t,[11.5,12.6],0.13));ghost(LX,560,1.15,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,13.1,'估计有好几百人，死在了这片湖边');cap(t,13.2,15.1,'没有村庄，没有战场，他们为何来这里？','#d9e6e2');
    cap(t,15.2,T.foil,'更诡异的是：不少人头部都有重伤',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'一场冰雹，杀死了所有人？',PAPER,215,66);peaks(a*0.5);lake(a);bones(a,80);hail(t,a*seg(t,16.3,16.8));
    cap(t,T.foil+.4,18.4,'曾有研究认为：他们死于一场猛烈的冰雹');cap(t,18.4,T.hit,'但 2019 年的一次 DNA 检测，推翻了"一场灾难"');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'他们不是同一批人！',RED,215,96,{pop:1,fi:.02});peaks(a*0.4);lake(a);
    bones(a,80,PAPER,4,i=>i%3==0?RED:i%11==0?WARM:PAPER);
    cap(t,T.hit+.8,T.trace,'研究团队检测了 38 具遗骸的 DNA');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：DNA 里的身份',PAPER,215,66);
    bar(760,430,800,70,23/38,'南亚血统','23 人',25.6,t,GREEN);
    bar(760,560,800,70,14/38,'东地中海血统','14 人',28.3,t,RED);
    bar(760,690,800,70,1/38,'东南亚血统','1 人',26.4,t,WARM);
    cap(t,T.trace+.4,28.2,'23 人来自南亚，1 人带东南亚血统');cap(t,28.3,T.reveal,'还有 14 人，竟像来自希腊一带的东地中海');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('相隔约 1000 年',W/2,400,130,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    const y=660;line([[360,y],[1560,y]],DIM,3,false,a*seg(t,32.4,32.8));
    const tl=[[460,'公元 600',32.6],[960,'1200',32.8],[1460,'1800',33]];for(const [x,s,t0] of tl)txt(s,x,y+84,30,DIM,{f:MONO,a:a*seg(t,t0,t0+.3)});
    const g1=a*seg(t,33.2,33.6);rect(470,y-40,260,80,GREEN,3,g1,'rgba(109,255,192,.12)');txt('南亚人 7–10 世纪',600,y-80,34,GREEN,{f:SANS,w:700,a:g1});
    const g2=a*seg(t,34.4,34.8);rect(1420,y-40,80,80,RED,3,g2,'rgba(255,60,60,.15)');txt('地中海人 约 1800 年',1400,y-80,34,RED,{f:SANS,w:700,a:g2,al:'right'});
    cap(t,T.reveal+.6,34.4,'南亚人大多死于公元 7 到 10 世纪');cap(t,34.5,T.eye,'而地中海人，却死于约 1800 年前后');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么会被当成一场灾难？',PAPER,215,64);peaks(a*0.4);lake(a,1);
    const mx=seg(t,39.6,41.6);bones(a,60,GREEN,4);bones(a*seg(t,38,38.4),40,RED,9);
    for(let i=0;i<5;i++){const q=(t*0.5+i/5)%1;const x=lerp(1400,LX+200,q),y=lerp(400,LY-40,q);circ(x,y,10,DIM,2,a*seg(t,39.6,40)*(1-q));}
    txt('落石 · 冰川 · 冻融',1560,860,34,DIM,{f:SANS,w:700,a:a*seg(t,39.6,40)});
    cap(t,T.eye+.4,39.9,'高寒冰湖，让遗骸保存了上千年');cap(t,40,T.off,'落石和冻融反复搅动，把不同年代的骸骨混在一起');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'谜团，只解开了一半',PAPER,215,66);peaks(a*0.5,WARM);lake(a);glowDot(LX,LY,420,'rgba(255,200,120,.22)',a);
    cap(t,T.off+.4,T.end,'不是一场灾难；但他们为何而来，至今没有定论');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"鬼湖"，只是',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('千年时光的叠影',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('部分结案',1560,480,46.2,t,RED,74,-0.14);
    txt('资料：Harney 等, 2019 · Nature Communications · 冰雹说为一种解释',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'向湖边的逝者致敬｜评论区报案',GREEN);}
}
function coverScene(){peaks(1);lake(1);bones(1,140);ghost(1540,580,0.8,0.6,'150,150,160');
  txt('雪山骷髅湖',W/2,215,116,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('湖底几百具骸骨，竟相隔千年',W/2,335,54,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('5000 米',300,900,-1,0,GREEN,64,-0.1);}
