// CASE 040 死亡谷会走的石头（Racetrack Playa；Norris, Norris, Ray & Lorenz 2014《PLOS ONE》：2013.12 首次观测；冰<5mm，风3-5 m/s，2-6 m/min，最远60多米；石头最重约320kg）
const EP={caseNo:'040',name:'会走的石头',sfx:{ghost:[11.4,13.9],stings:[12.4],blips:[22.0,22.6,23.2,33.0,34.0,38.6],whisper:[10,16]}};
const HZ=520;
function partial(pts,p){if(p<=0)return [pts[0]];let L=0;const seglen=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seglen.push(d);L+=d;}
  let need=L*clamp(p);const out=[pts[0]];for(let i=1;i<pts.length;i++){const d=seglen[i-1];if(need>=d){out.push(pts[i]);need-=d;}else{const f=need/d;out.push([lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f)]);break;}}return out;}
function playa(t,a,c=CYAN){if(a<=0)return;
  line([[90,HZ],[260,440],[420,490],[640,400],[860,470],[1080,420],[1300,470],[1520,410],[1700,470],[1830,HZ]],'rgba(127,232,255,.35)',2,false,a);
  line([[90,HZ],[1830,HZ]],c,2.5,true,a*0.8);
  const r=rng(9);for(let row=0;row<6;row++){const y=HZ+30+row*row*14+row*30;const step=80+row*40;
    line([[90,y],[1830,y]],c,1.2,false,a*0.18);for(let x=90+r()*step;x<1830;x+=step*(0.7+r()*0.6)){line([[x,y],[x+(r()-.5)*30,y+20+row*14]],c,1.2,false,a*0.18);}}}
function rock(x,y,s,a,c=PAPER){if(a<=0)return;const p=[[-40,0],[-34,-28],[-6,-42],[30,-34],[44,-8],[36,4]].map(q=>[x+q[0]*s,y+q[1]*s]);p.push(p[0]);
  ctx.save();ctx.globalAlpha=a;ctx.beginPath();p.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.fillStyle='rgba(20,30,30,.9)';ctx.fill();ctx.restore();line(p,c,3.5,true,a);}
function trail(pts,p,a,c=CYAN){const q=partial(pts,p);if(a<=0)return q[q.length-1];line(q,c,3,true,a*0.85);const off=q.map(v=>[v[0],v[1]+10]);line(off,c,1.5,false,a*0.4);return q[q.length-1];}
const TR1=[[380,820],[560,760],[760,740],[900,700],[1020,690]],TR2=[[1500,840],[1380,780],[1300,700],[1360,640],[1260,600]];
function moon(a){glowDot(1600,330,120,'rgba(200,230,255,.25)',a);circ(1600,330,34,'rgba(220,240,255,.9)',2,a,'rgba(200,230,255,.15)');}
function ice(t,a,crack,dx=0){if(a<=0)return;const ys=740;
  for(let k=0;k<3;k++){const x0=420+k*360+dx*(1+k*0.1),w=330;const sh=crack?(k-1)*20*crack:0;
    ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(170,230,255,.16)';ctx.beginPath();ctx.moveTo(x0+sh,ys-10);ctx.lineTo(x0+w+sh,ys-14);ctx.lineTo(x0+w+sh,ys+6);ctx.lineTo(x0+sh,ys+6);ctx.closePath();ctx.fill();ctx.restore();
    line([[x0+sh,ys-10],[x0+w+sh,ys-14]],'#cdf3ff',3,true,a);}
  line([[300,ys+8],[1620,ys+8]],CYAN,2,false,a*0.6);// 水面下泥面
  line([[300,ys+60],[1620,ys+60]],WARM,3,true,a*0.6);}
function windArrows(t,a,x0=300,y0=640){for(let i=0;i<5;i++){const q=(t*0.8+i/5)%1;const x=x0+q*500,y=y0+i*22;line([[x,y],[x+70,y]],GREEN,3,true,a*Math.sin(q*Math.PI));line([[x+58,y-8],[x+70,y],[x+58,y+8]],GREEN,3,true,a*Math.sin(q*Math.PI));}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'死亡谷：石头自己在走',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'没人推，身后却拖出长长的轨迹');
    playa(t,a);const e=trail(TR1,seg(t,0.3,3.6),a);rock(e[0],e[1],1,a);
    ghost(1440,600,0.7,a*flashA(t,[2.2,3.3],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'美国加州 · 死亡谷 · 赛道干湖',PAPER,215,62);playa(t,a);
    [[TR1,1],[TR2,0.9],[[[700,880],[640,820],[700,770],[620,720]],0.7]].forEach(([tr,s],i)=>{const e=trail(tr,1,a*seg(t,5+i*.5,5.4+i*.5));rock(e[0],e[1],s,a*seg(t,5+i*.5,5.4+i*.5));});
    txt('最重约 320 公斤',1260,560,40,WARM,{f:SANS,w:700,a:a*seg(t,7.6,8),al:'left'});
    cap(t,T.lab+.4,7.4,'一片干涸的湖底，上百块石头身后都拖着痕迹');cap(t,7.4,T.night+.2,'几十年来，没有一个人亲眼见过它们动');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    playa(t,a*0.5);moon(a);const e1=trail(TR1,seg(t,10.4,15.4),a);rock(e1[0],e1[1],1,a);const e2=trail(TR2,seg(t,12.4,15.6),a);rock(e2[0],e2[1],0.9,a);
    ghost(1100,560,0.75,a*flashA(t,[11.4,13.9],0.13));ghost(760,520,1.1,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.3,'深夜，荒无人烟的湖底……');cap(t,12.4,15.1,'石头像被什么拖着，转弯、折返，还会结伴走','#d9e6e2');
    cap(t,15.2,T.foil,'有人说是外星人，有人说是磁场，甚至是恶作剧',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'到底是谁在推石头？',PAPER,215,70);playa(t,a*0.6);const e=trail(TR1,1,a);rock(e[0],e[1],1,a);
    txt('?',e[0],e[1]-110,110,RED,{f:SERIF,a:a*(0.5+0.5*Math.sin(t*4)),glow:'rgba(255,60,60,.6)'});
    cap(t,T.foil+.4,18.4,'是风？可几百公斤的石头，大风也很难吹动');cap(t,18.5,T.hit,'于是科学家给石头装上 GPS，架起相机，开始蹲守');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'2013 年 12 月：石头动了！',RED,215,88,{pop:1,fi:.02});playa(t,a*0.5);
    const x=lerp(760,1060,seg(t,21.3,24.6));line([[560,760],[x,740]],CYAN,3,true,a);rock(x,740,1.1,a);
    circ(x,690,8,RED,2,a*(Math.floor(t*3)%2),RED);txt('GPS',x,650,26,RED,{f:MONO,a});
    txt('第一次被人亲眼看见',1500,420,40,PAPER,{f:SANS,w:700,a:a*seg(t,22.4,22.8)});
    cap(t,T.hit+.8,T.trace,'蹲守两年，科学家终于亲眼看着石头开始移动');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：湖底只有一层薄冰',PAPER,215,64);const crack=seg(t,28.2,29);
    ice(t,a,crack);rock(1000,734,1,a);glowDot(1500,420,200,'rgba(255,200,120,.18)',a*seg(t,28.2,28.8));circ(1500,420,40,WARM,3,a*seg(t,28.2,28.8));
    txt('浅水：不到 7 厘米',1620,850,34,CYAN,{f:SANS,w:700,a:a*seg(t,25.8,26.2),al:'right'});
    if(t>28.2)for(let k=0;k<2;k++)line([[760+k*360,724],[770+k*360,760]],WARM,3,true,a*crack);
    cap(t,T.trace+.4,28.1,'冬天下雨，干湖积起一层浅水，夜里结成冰');cap(t,28.2,T.reveal,'白天太阳一晒，冰面裂成一大片一大片的薄冰');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('冰 < 5 毫米',W/2,400,150,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('风速只要 3–5 米/秒',W/2,560,58,PAPER,{f:SANS,w:700,a:a*seg(t,31.6,32)});
    const dx=seg(t,33,36.6)*160;ice(t,a*seg(t,32.4,32.8),1,dx);rock(1000+dx,734,1,a*seg(t,32.4,32.8));windArrows(t,a*seg(t,32.6,33),260,620);
    cap(t,T.reveal+.6,34.4,'微风推着大片薄冰，薄冰再推着石头走');cap(t,34.5,T.eye,'每分钟挪几米，在软泥上犁出轨迹');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么几十年没人看见？',PAPER,215,64);
    [['慢','每分钟只挪几米',560,37.3],['少','几年才发生一次',960,37.9],['没痕迹','冰一化，只剩轨迹',1360,38.5]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-170,400,340,300,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,76,WARM,{a:ca});txt(s,x,620,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'移动又慢又罕见，人很少会在场');cap(t,40,T.off,'看到"无人推动"的轨迹，大脑就自动补上了"谁在推"');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'不是鬼，是冰和风',PAPER,215,66);glowDot(1600,330,300,'rgba(255,200,120,.3)',a);circ(1600,330,50,WARM,3,a,'rgba(255,200,120,.2)');
    playa(t,a,WARM);const e=trail(TR1,1,a,WARM);rock(e[0],e[1],1,a,WARM);
    cap(t,T.off+.4,T.end,'冰化水干，石头停在原地，等下一个冬天');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"会走的石头"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是被薄冰推着走',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：Norris 等 2014《PLOS ONE》· 美国国家公园管理局',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你见过什么"自己会动"的东西？｜评论区报案',GREEN);}
}
function coverScene(){playa(3,1);moon(1);const e=trail(TR1,1,1);rock(e[0],e[1],1.2,1);const e2=trail(TR2,1,1);rock(e2[0],e2[1],1,1);ghost(1100,580,0.75,0.55);
  txt('死亡谷的石头，半夜自己在走',W/2,215,96,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('几百公斤，没人推？',W/2,318,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('320kg',300,940,-1,0,GREEN,64,-0.1);}
