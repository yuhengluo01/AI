// CASE 020 一氧化碳闹鬼的房子（Wilmer 1921, Am J Ophthalmol）
const EP={caseNo:'020',name:'地下室里的幽灵',sfx:{ghost:[11.6,12.6],stings:[],blips:[33.2,34.6,38.6,39.4,40.2],whisper:[10,16]}};
const HX0=560,HX1=1360,ROOF=330,EAVE=420,F2=600,F1=760,BS=880,MID=960;
function house(t,a,o={}){if(a<=0)return;const c=o.col||CYAN;
  line([[HX0-30,EAVE],[MID,ROOF],[HX1+30,EAVE]],c,3.5,true,a);
  line([[HX0,EAVE],[HX0,BS],[HX1,BS],[HX1,EAVE]],c,3,true,a);
  line([[HX0,F2],[HX1,F2]],c,3,true,a);line([[HX0,F1],[HX1,F1]],c,3,true,a);
  line([[MID,EAVE],[MID,F2-70]],c,2,true,a*0.7);
  // 窗户
  for(const [x,y] of [[650,470],[1210,470],[1210,640]]){rect(x,y,70,80,c,2,a*0.8,o.lit?`rgba(255,200,120,${o.lit*0.35})`:null);line([[x+35,y],[x+35,y+80]],c,1.5,false,a*0.6);}
  // 床（左上）
  line([[610,F2-40],[820,F2-40]],c,3,true,a*0.8);line([[610,F2-90],[610,F2]],c,3,true,a*0.8);line([[820,F2-60],[820,F2]],c,3,true,a*0.8);
  // 楼梯
  for(let i=0;i<6;i++)line([[1280-i*26,F1-i*26],[1306-i*26,F1-i*26]],c,2,false,a*0.6);
  // 煤气灯
  for(const x of [700,1100]){line([[x,F2],[x,F2+30]],c,1.5,false,a*0.6);glowDot(x,F2+40,40,`rgba(255,200,120,${0.35*(o.gas??1)})`,a);}
  // 盆栽
  const droop=o.droop||0;line([[1000,F1],[1060,F1],[1052,F1-50],[1008,F1-50],[1000,F1]],c,2.5,true,a*0.8);
  for(const s of[-1,0,1]){const ang=-Math.PI/2+s*0.5+droop*(s===0?1.2:s*1.4);line([[1030,F1-50],[1030+Math.cos(ang)*60,F1-50+Math.sin(ang)*60]],o.droop?'#8fb38a':GREEN,3,true,a);}
  // 地下室暖炉
  const fx=760,fy=BS-10;rect(fx-60,fy-90,120,90,o.furnCol||c,3,a);for(let i=0;i<3;i++)line([[fx-35,fy-60+i*18],[fx+35,fy-60+i*18]],o.furnCol||c,2,false,a*0.8);
  line([[fx,fy-90],[fx,F1+6]],o.furnCol||c,3,true,a);line([[fx,F2+10],[fx,F1]],c,2,false,a*0.4);
  if(o.fire){glowDot(fx,fy-40,70,`rgba(255,120,40,${0.55*o.fire})`,a);}
  txt('地下室',HX0+60,BS-24,24,DIM,{f:SANS,w:500,a:a*(o.labels??0)});
}
function co(t,a,n=70,spread=1){if(a<=0)return;const r=rng(5);
  for(let i=0;i<n;i++){const ph=r(),sp=0.12+r()*0.1,dx=(r()-.5)*560*spread;const q=(t*sp+ph)%1;const x=760+dx*q+Math.sin(t*1.3+i)*20,y=BS-60-q*460;
    const al=a*Math.sin(q*Math.PI)*0.9;circ(x,y,9,RED,2,al);circ(x+14,y,7,'#ffa0a0',2,al*0.8);}}
function scene(t){
  // S0 钩子
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'老宅闹鬼事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'一家人，被同一个冬天"缠"上了');
    house(t,a,{gas:0.6});ghost(1245,520,0.42,a*(flashA(t,[1.4,1.9,2.2,3.4],0.12)+0.25*win(t,2.4,4.2,.3,.3)));
    stamp('未解之谜',1600,720,2.6,t,RED,58,-0.12);}
  // S1 背景
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1912 年冬 · 美国 · 一栋老宅',PAPER,215,64);
    house(t,a,{labels:seg(t,7.4,8),gas:1});
    personStand(880,F1,0.55,a);personStand(940,F1,0.5,a);personStand(1150,F1,0.38,a);
    cap(t,T.lab+.4,7.4,'H 夫妇一家，搬进了这栋没通电的老房子');cap(t,7.4,T.night+.2,'靠煤气灯照明，地下室有一台旧暖炉');}
  // S2 怪事（暗）
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    title(t,T.night,T.foil+.2,'深夜 · 楼上',PAPER,215,60);house(t,a*0.6,{gas:0.25});
    for(let i=0;i<10;i++){const tf=10.4+i*0.28;const fa=a*seg(t,tf,tf+.08)*(1-seg(t,13.4,13.8));const x=1300-i*66,y=F2-8+(i%2)*10;ctx.save();ctx.globalAlpha=fa;ctx.fillStyle=PAPER;ctx.shadowColor=PAPER;ctx.shadowBlur=10;ctx.beginPath();ctx.ellipse(x,y,14,7,0,0,6.28);ctx.fill();ctx.restore();}
    ghost(1190,690,0.62,a*(win(t,13.2,15.0,.5,.1)*(0.6+0.3*Math.sin(t*19))),'110,115,125');
    ghost(1180,470,0.55,a*flashA(t,[11.6,12.6],0.13));
    // 胸口
    ghost(700,560,0.36,a*win(t,15.2,16,.05,.3),'150,150,160');personLie(735,F2-50,0.45,a*seg(t,15,15.2));
    cap(t,T.night+.3,13.1,'半夜楼上总有脚步声，上去一看，空无一人');cap(t,13.2,15.1,'她还看见一个黑衣女人，一转眼就消失了……','#d9e6e2');
    cap(t,15.2,T.foil,'儿子说：一个胖男人坐在他胸口上',RED);}
  // S3 蓄力
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'这个冬天，全家都病了',PAPER,215,64);
    house(t,a,{droop:seg(t,18.4,20.6),gas:0.7});
    for(const [x,s] of [[860,.55],[920,.5],[1150,.38]])personStand(x,F1+seg(t,17,20)*4,s,a,'#b9c4c0');
    cap(t,T.foil+.4,18.4,'全家头痛、乏力、脸色越来越白');cap(t,18.4,T.hit,'连屋里的盆栽，都一盆接一盆枯死……');}
  // S4 重击
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'"鬼"，就藏在地下室！',RED,215,92,{pop:1,fi:.02});
    house(t,a*0.7,{furnCol:RED,fire:0.8+0.2*Math.sin(t*9),labels:1});co(t,a*seg(t,22,23),30,0.4);
    cap(t,T.hit+.8,T.trace,'医生上门检查：那台旧暖炉坏了',PAPER);}
  // S5 追查
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'燃烧不完全的暖炉',PAPER,215,64);
    house(t,a*0.8,{furnCol:RED,fire:0.8,labels:1});co(t,a,70,seg(t,25.5,28.5)+0.3);
    txt('CO',1500,500,60,RED,{f:MONO,a:a*seg(t,26,26.5),glow:'rgba(255,60,60,.6)'});txt('无色 · 无味',1500,570,36,PAPER,{f:SANS,w:700,a:a*seg(t,26.4,26.9)});
    cap(t,T.trace+.4,28.2,'不停产生一氧化碳，无色又无味');cap(t,28.3,T.reveal,'顺着管道和地板缝，飘进每一个房间');}
  // S6 揭晓
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('CO',560,520,260,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('一氧化碳',560,700,56,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,32)});
    txt('抢夺血红蛋白的能力',1300,420,42,PAPER,{f:SANS,w:700,a:a*seg(t,32.4,32.9)});
    bar(1180,500,520,48,0.004,'氧气','1',33.2,t,CYAN);bar(1180,600,520,48,1,'一氧化碳','约 200+',34.6,t,RED);
    cap(t,T.reveal+.6,34.5,'它比氧气更容易"抢走"血液里的血红蛋白');cap(t,34.6,T.eye,'身体和大脑都开始慢性缺氧');}
  // S7 机制
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'"闹鬼"，其实是中毒症状',PAPER,215,66);
    brain(960,600,1.3,CYAN,a,0.4+0.3*Math.sin(t*6));
    const items=[[520,470,'脚步声','幻听',38.6],[1400,470,'黑衣女人','幻视',39.4],[960,840,'胸口的"胖男人"','呼吸困难',40.2]];
    for(const [x,y,s1,s2,t0] of items){const ia=a*seg(t,t0,t0+.4);txt(s1,x,y,44,PAPER,{f:SANS,w:700,a:ia});txt('→ '+s2,x,y+56,40,RED,{f:SANS,w:700,a:ia,glow:'rgba(255,60,60,.5)'});}
    cap(t,T.eye+.4,40.2,'慢性一氧化碳中毒：头痛、幻听、幻视');cap(t,40.4,T.off,'一家人的遭遇，和这些症状高度吻合');}
  // S8 解除
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);const w=seg(t,42.3,43.5);
    title(t,T.off,T.end+.2,'修好暖炉之后',PAPER,215,66);
    house(t,a,{lit:w,gas:1,furnCol:w>0.5?GREEN:RED});
    for(const [x,s] of [[860,.55],[920,.5],[1150,.38]])personStand(x,F1,s,a);
    ctx.save();ctx.globalAlpha=a*w*0.22;const g=ctx.createRadialGradient(960,620,0,960,620,600);g.addColorStop(0,'rgba(255,230,180,1)');g.addColorStop(1,'rgba(255,230,180,0)');ctx.fillStyle=g;ctx.fillRect(0,300,W,700);ctx.restore();
    cap(t,T.off+.4,T.end,'一家人慢慢康复，"鬼"再也没来过');}
  // S9 结案
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('最可怕的"鬼"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('是你闻不到的气体',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1520,480,46.2,t,RED,90,-0.14);
    txt('资料：Wilmer, 1921 · 美国眼科学杂志《一氧化碳对眼睛的影响》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'冬天烧炉子记得通风｜你遇到过怪事吗？评论区报案',GREEN);}
}
function coverScene(){house(20,1,{gas:0.4,furnCol:RED,fire:0.9});ghost(1245,520,0.42,0.85);ghost(1190,700,0.45,0.5,'110,115,125');
  txt('老宅闹鬼？',W/2,200,116,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('凶手藏在',260,600,70,RED,{glow:'rgba(255,60,60,.7)',blur:34});txt('地下室',260,700,86,RED,{glow:'rgba(255,60,60,.7)',blur:34});
  stamp('CO',1600,520,-1,0,GREEN,110,-0.1);txt('无色无味的"鬼"',1600,720,48,PAPER,{f:SANS,w:700});}
