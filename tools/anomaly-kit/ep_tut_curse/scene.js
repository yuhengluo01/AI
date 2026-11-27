// CASE 058 法老的诅咒（1922.11 Howard Carter 发现图坦卡蒙墓，资助人 Lord Carnarvon 1923.4 在开罗因蚊虫叮咬感染（丹毒→败血症、肺炎）去世；开罗灯灭为传说；Nelson 2002《BMJ》：44 名西方人中 25 人暴露，平均死亡年龄 70 vs 75，暴露后存活 20.8 vs 28.9 年，无显著差异；Carter 活到 1939）
const EP={caseNo:'058',name:'法老的诅咒',sfx:{ghost:[11.2,12.7,14.3],stings:[12.6],blips:[17.0,17.6,18.2,26.4,27.0,32.2,33.0,38.0,39.4],whisper:[10,16]}};
function mask(x,y,s,a,c=WARM,o={}){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  line([[-60,-170],[60,-170],[150,60],[110,200],[-110,200],[-150,60],[-60,-170]],c,4,true,a);
  for(let i=0;i<6;i++){line([[-70-i*13,-130+i*55],[-110-i*6,-120+i*55]],c,2,false,a*0.6);line([[70+i*13,-130+i*55],[110+i*6,-120+i*55]],c,2,false,a*0.6);}
  ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=4;ctx.shadowColor=c;ctx.shadowBlur=14;ctx.beginPath();ctx.ellipse(0,0,62,90,0,0,6.28);ctx.stroke();ctx.restore();
  line([[-36,-20],[-12,-24]],c,3,true,a);line([[12,-24],[36,-20]],c,3,true,a);line([[0,-10],[0,30]],c,2,true,a*0.8);line([[-18,52],[18,52]],c,2.5,true,a);
  line([[-12,90],[0,180],[12,90]],c,3,true,a);
  if(o.eyes){ctx.save();ctx.globalAlpha=a*o.eyes;ctx.fillStyle=RED;ctx.shadowColor=RED;ctx.shadowBlur=20;ctx.beginPath();ctx.arc(-24,-20,6,0,6.28);ctx.arc(24,-20,6,0,6.28);ctx.fill();ctx.restore();}
  ctx.restore();}
function tomb(x,y,a,c=CYAN){if(a<=0)return;line([[x-300,y],[x+300,y]],c,3,true,a);for(let i=0;i<5;i++)line([[x-150+i*20,y-i*30],[x+150-i*20,y-i*30]],c,2,false,a*0.6);
  line([[x-110,y-150],[x-110,y-420],[x+110,y-420],[x+110,y-150]],c,4,true,a);line([[x-140,y-420],[x+140,y-420]],c,4,true,a);}
function paper(x,y,s,head,a,rot=0){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha*=a;ctx.fillStyle='rgba(233,243,238,.08)';ctx.fillRect(-170,-110,340,220);ctx.restore();
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);rect(-170,-110,340,220,PAPER,2.5,a);txt(head,0,-40,46,RED,{a,glow:'rgba(255,60,60,.5)'});for(let i=0;i<4;i++)line([[-140,20+i*22],[140-(i%2)*60,20+i*22]],DIM,2,false,a);ctx.restore();}
function mosquito(x,y,s,a,t,c=PAPER){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  line([[-60,0],[50,0]],c,5,true,a);circ(70,0,16,c,4,a);line([[86,0],[150,10]],c,2.5,true,a);
  const f=Math.sin(t*60)*0.4;ctx.save();ctx.globalAlpha*=a*0.7;ctx.strokeStyle=CYAN;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(-10,-40,60,20,-0.5+f,0,6.28);ctx.stroke();ctx.beginPath();ctx.ellipse(10,-40,60,20,0.5-f,0,6.28);ctx.stroke();ctx.restore();
  for(const lx of [-30,0,30]){line([[lx,0],[lx-20,50],[lx-34,90]],c,2.5,true,a);}
  ctx.restore();}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'打开法老墓的人，接连死去',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'传说：谁打扰法老安眠，死神就会降临');
    glowDot(960,620,320,'rgba(255,170,80,.12)',a);mask(960,640,1.1,a,WARM,{eyes:flashA(t,[1.5,2.4,3.3],0.18)});
    ghost(1450,620,0.9,a*flashA(t,[1.8,2.9,3.7],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1922 年 11 月 · 埃及 · 帝王谷',PAPER,215,58);
    tomb(960,860,a*seg(t,4.8,5.4));const fa=a*seg(t,5.2,5.6);personStand(620,860,0.9,fa);personStand(1300,860,0.9,fa);
    txt('卡特',620,650,34,PAPER,{f:SANS,w:700,a:fa});txt('卡那封勋爵',1300,650,34,PAPER,{f:SANS,w:700,a:a*seg(t,7.4,7.8)});
    cap(t,T.lab+.4,7.4,'考古学家卡特，找到了图坦卡蒙的陵墓');cap(t,7.4,T.night+.2,'出钱资助他的，是英国的卡那封勋爵');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    tomb(960,860,a*0.7,'rgb(110,170,180)');mask(960,620,0.7,a*0.8,'rgb(200,170,120)',{eyes:flashA(t,[11.4,13.0,14.6],0.2)});
    ghost(lerp(500,1450,seg(t,11,15)),600,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.2,12.7,14.3],0.14));ghost(960,470,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.6,'1923 年 4 月，卡那封勋爵在开罗突然病逝');cap(t,12.7,15.1,'传说他死的那一刻，整个开罗的灯都灭了','#d9e6e2');
    cap(t,15.2,T.foil,'"法老的诅咒"，登上了全世界的报纸',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'之后，又有人接连死去',PAPER,215,66);
    paper(620,560,1,'诅咒应验？',a*seg(t,16.8,17.1),-0.08);paper(960,600,1,'又一人死亡',a*seg(t,17.4,17.7),0.05);paper(1300,560,1,'法老复仇',a*seg(t,18,18.3),0.1);
    cap(t,T.foil+.4,18.4,'报纸一次次把新的死亡，算到诅咒头上');cap(t,18.5,T.hit,'打开陵墓的人，真的死得更早吗？');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'真正的凶手：一只蚊子！',RED,215,96,{pop:1,fi:.02});
    mosquito(700,610,2.2,a,t);glowDot(760,600,220,'rgba(255,40,40,.2)',a);
    const ca=a*seg(t,23.4,23.8);[['蚊子包刮破',560],['感染',650],['败血症 + 肺炎',740]].forEach(([s,y],i)=>{txt(s,1380,y,42,i==2?RED:PAPER,{f:SANS,w:700,a:a*seg(t,23.4+i*0.4,23.8+i*0.4)});});
    cap(t,T.hit+.8,23.4,'卡那封脸上的蚊子包，刮胡子时被刮破');cap(t,23.4,T.trace,'感染引发败血症和肺炎，那时还没有抗生素');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：诅咒经得起统计吗？',PAPER,215,64);
    for(let i=0;i<44;i++){const r=Math.floor(i/11),cI=i%11;const ex=i<25;const ca=a*seg(t,25.4+i*0.02,25.8+i*0.02);personStand(560+cI*80,520+r*110,0.42,ca,ex&&t>27.6?RED:PAPER);}
    txt('44',1520,560,120,PAPER,{f:MONO,a:a*seg(t,26,26.4)});txt('25',1520,760,120,RED,{f:MONO,a:a*seg(t,27.6,28),glow:'rgba(255,60,60,.6)'});
    txt('当时在埃及的西方人',1520,650,30,PAPER,{f:SANS,w:500,a:a*seg(t,26,26.4)});txt('接触过陵墓',1520,850,30,RED,{f:SANS,w:500,a:a*seg(t,27.6,28)});
    cap(t,T.trace+.4,28.1,'2002 年，医生尼尔森在《英国医学杂志》发表研究');cap(t,28.2,T.reveal,'他找出当时在埃及的 44 个西方人');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('70 vs 75',W/2,330,170,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    bar(760,520,800,70,70/90,'接触过陵墓','70 岁',31.8,t,RED);bar(760,640,800,70,75/90,'没接触','75 岁',32.6,t,GREEN);
    txt('平均死亡年龄 · 差异不显著',W/2,790,44,PAPER,{f:SANS,w:700,a:a*seg(t,33.6,34)});
    cap(t,T.reveal+.6,34.4,'接触者平均活到 70 岁，没接触的 75 岁');cap(t,34.5,T.eye,'统计上没有显著差异：找不到诅咒的证据');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么诅咒传得这么凶？',PAPER,215,64);
    [['只记得死者','活得好好的人，没人提',640,37.3],['卡特本人','亲手开棺，活到 1939 年',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,72,WARM,{a:ca});txt(s,x,630,34,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'人们只盯着死去的人，把巧合当成了证据');cap(t,40,T.off,'亲手打开陵墓的卡特，一直活到 1939 年');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'诅咒，只是一个好卖的故事',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    mask(960,640,1.0,a,WARM);
    cap(t,T.off+.4,T.end,'诅咒没有找到，法老的宝藏留给了全世界');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"诅咒"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是被记住的巧合',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：Nelson 2002《BMJ》The mummy\'s curse · 英国皇家博物馆 · History.com',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你相信诅咒吗？评论区报案',GREEN);}
}
function coverScene(){glowDot(1400,600,340,'rgba(255,170,80,.14)',1);mask(1400,620,1.25,1,WARM,{eyes:1});ghost(1760,620,0.8,0.5);
  txt('打开法老墓的人',640,320,108,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('一个接一个死去',640,470,80,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1922',330,850,-1,0,GREEN,64,-0.1);}
