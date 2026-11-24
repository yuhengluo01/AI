// CASE 044 汉普顿宫闹鬼长廊（传说：凯瑟琳·霍华德 1542 年被处死，鬼魂在长廊尖叫；Wiseman 等 2002《Journal of Parapsychology》678 人问卷；2003《British Journal of Psychology》：异常体验集中在传闻闹鬼区，与是否知道传说无关，与局部磁场波动、光线水平相关）
const EP={caseNo:'044',name:'闹鬼长廊',sfx:{ghost:[11.2,13.0,14.4],stings:[12.4],blips:[21.8,22.2,22.6,23.0,33.0,34.0,38.6],whisper:[10,16]}};
const VX=960,VY=610,O=[300,385,1620,905],I=[840,530,1080,690];
function corridor(t,a,c=CYAN,o={}){if(a<=0)return;
  line([[O[0],O[1]],[O[2],O[1]],[O[2],O[3]],[O[0],O[3]],[O[0],O[1]]],c,2,false,a*0.4);
  line([[I[0],I[1]],[I[2],I[1]],[I[2],I[3]],[I[0],I[3]],[I[0],I[1]]],c,3,true,a);
  [[0,1,0,1],[2,1,2,1],[2,3,2,3],[0,3,0,3]].forEach(([ox,oy,ix,iy])=>line([[O[ox],O[oy]],[I[ix],I[iy]]],c,3,true,a));
  for(let k=0;k<4;k++){const f=k/4+0.08,g=f+0.12;const L=(q,y0,y1)=>[lerp(O[0],I[0],q),lerp(y0,y1,q)];
    // 左墙窗、右墙画像
    const p1=L(f,460,575),p2=L(g,460,575),p3=L(g,760,655),p4=L(f,760,655);line([p1,p2,p3,p4,p1],o.warm?WARM:c,2,true,a*0.7);
    if(o.light!==undefined){ctx.save();ctx.globalAlpha=a*o.light*0.15;ctx.fillStyle='rgb(200,230,255)';ctx.beginPath();[p1,p2,p3,p4].forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.fill();ctx.restore();}
    const R=(q,y0,y1)=>[lerp(O[2],I[2],q),lerp(y0,y1,q)];const r1=R(f,480,585),r2=R(g,480,585),r3=R(g,680,640),r4=R(f,680,640);line([r1,r2,r3,r4,r1],o.warm?WARM:c,2,true,a*0.6);
    headAt((r1[0]+r2[0])/2,(r1[1]+r3[1])/2-10,10*(1-f*0.6),o.warm?WARM:c,a*0.5);}}
function mapView(t,a){if(a<=0)return;rect(360,420,1200,260,CYAN,3,a,'rgba(127,232,255,.04)');for(let k=1;k<6;k++)line([[360+k*200,420],[360+k*200,440]],CYAN,2,false,a*0.5);
  txt('长廊平面图',360,390,30,CYAN,{f:SANS,w:700,a,al:'left'});}
const HOT=[[620,520],[1130,600],[1380,500]];
function dots(t,a,t0){const r=rng(17);for(let i=0;i<60;i++){let x,y;if(i<42){const h=HOT[i%3];x=h[0]+(r()-.5)*120;y=h[1]+(r()-.5)*90;}else{x=380+r()*1160;y=440+r()*220;}
  circ(x,y,7,null,0,a*seg(t,t0+i*0.03,t0+i*0.03+0.1),'rgba(255,60,60,.9)');}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'王宫长廊，深夜有人尖叫',PAPER,215,82,{pop:1});sub(t,.9,T.lab,'几百年来，游客说在这里撞见了"她"');
    corridor(t,a);ghost(VX,630,0.55,a*flashA(t,[1.8,2.9,3.6],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'英国 · 汉普顿宫 · "闹鬼长廊"',PAPER,215,62);corridor(t,a*0.8,CYAN,{light:0.6});
    txt('1542',VX,610,72,RED,{f:MONO,a:a*seg(t,7.4,7.8),glow:'rgba(255,60,60,.6)'});
    cap(t,T.lab+.4,7.4,'传说亨利八世的第五任王后凯瑟琳·霍华德被捕后');cap(t,7.4,T.night+.2,'曾沿这条长廊尖叫着奔向国王求饶，1542 年被处死');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    corridor(t,a*0.6);const gz=lerp(0.5,1.3,seg(t,11,15));ghost(VX,lerp(630,670,seg(t,11,15)),gz,a*flashA(t,[11.2,13.0,14.4],0.14));
    ghost(1300,600,1.2,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.3,'深夜的长廊，只剩昏暗的光……');cap(t,12.4,15.1,'有人突然浑身发冷，觉得背后有人，还听见尖叫','#d9e6e2');
    cap(t,15.2,T.foil,'"她"是不是还在长廊里奔跑？',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'真的闹鬼吗？',PAPER,215,72);corridor(t,a*0.5);
    for(let i=0;i<5;i++)personStand(700+i*130,880,0.55,a*seg(t,18.6+i*.1,18.9+i*.1));
    cap(t,T.foil+.4,18.4,'英国心理学家怀斯曼的团队，决定在宫里做个实验');cap(t,18.5,T.hit,'让几百名游客走一遍长廊，把每处异样都标在地图上');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'异样感，真的扎堆了！',RED,215,90,{pop:1,fi:.02});mapView(t,a);dots(t,a,21.3);
    HOT.forEach((h,i)=>circ(h[0],h[1],90,RED,3,a*seg(t,23.2+i*.2,23.5+i*.2)));
    cap(t,T.hit+.8,T.trace,'标记点不是随机的，而是扎堆在几个位置');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：是因为听过传说吗？',PAPER,215,64);
    [[640,'知道传说',WARM,25.6],[1280,'不知道传说',CYAN,26.6]].forEach(([x,s,c,t0])=>{const ca=a*seg(t,t0,t0+.3);personStand(x,720,0.9,ca,c);txt(s,x,800,38,c,{f:SANS,w:700,a:ca});});
    txt('=',960,620,110,RED,{f:MONO,a:a*seg(t,28.4,28.8),glow:'rgba(255,60,60,.6)'});
    cap(t,T.trace+.4,28.1,'有人以为，是大家早就知道哪里"闹鬼"');cap(t,28.2,T.reveal,'可不知道传说的人，也在同样的地方觉得不对劲');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('磁场波动 + 昏暗光线',W/2,420,120,RED,{f:SANS,w:900,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    const pts=[];for(let x=420;x<=1500;x+=6){const hot=Math.exp(-Math.pow((x-1100)/120,2));pts.push([x,640+Math.sin(x*0.08+t*6)*(6+hot*40)]);}line(pts,GREEN,3,true,a*seg(t,32,32.4));
    txt('局部磁场',360,640,32,GREEN,{f:SANS,w:700,a:a*seg(t,32,32.4),al:'right'});
    txt('与"闹鬼感"位置相关',W/2,760,44,PAPER,{f:SANS,w:700,a:a*seg(t,33,33.4)});
    cap(t,T.reveal+.6,34.4,'这些位置的局部磁场波动更大，光线也和别处不同');cap(t,34.5,T.eye,'环境因素和"闹鬼感"扎堆在一起（一种解释）');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'大脑是怎么"见鬼"的？',PAPER,215,64);
    [['昏暗','影子、噪声被脑补成人',640,37.3],['相信','越信有鬼，报告的怪事越多',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,76,WARM,{a:ca});txt(s,x,630,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'光线昏暗时，大脑更容易把影子和声响脑补成"人"');cap(t,40,T.off,'而且越相信有鬼的游客，报告的怪事越多');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'灯一亮，长廊只是长廊',PAPER,215,66);glowDot(VX,VY,600,'rgba(255,200,120,.22)',a);corridor(t,a,WARM,{warm:1,light:1});
    for(let i=0;i<3;i++)personStand(760+i*200,880,0.5,a,WARM);
    cap(t,T.off+.4,T.end,'白天这里挤满游客，只有画像在墙上看着你');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些宫殿"闹鬼"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('是环境在骗你的大脑',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：Wiseman 等 2002《Journal of Parapsychology》· 2003《British Journal of Psychology》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你去过哪个"闹鬼"的地方？｜评论区报案',GREEN);}
}
function coverScene(){corridor(3,1);ghost(VX,680,1.1,0.8);
  txt('王宫长廊，王后的鬼魂在尖叫',W/2,215,96,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('几百人走一遍，怪事真扎堆了？',W/2,318,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1542',300,950,-1,0,GREEN,64,-0.1);}
