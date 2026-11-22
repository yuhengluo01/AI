// CASE 032 鬼火（ignis fatuus；一般解释：磷化氢等自燃引燃甲烷；2024 斯坦福 PNAS 微闪电假说）
const EP={caseNo:'032',name:'鬼火',sfx:{ghost:[11.3,12.5,13.8],stings:[],blips:[25.8,26.8,27.8,33.4,34.4],whisper:[10,16]}};
const GR=820;
function ground(t,a,c=CYAN){if(a<=0)return;line([[100,GR],[1820,GR]],c,3,true,a);for(let i=0;i<14;i++){const x=180+i*120;line([[x,GR],[x-10,GR-24-(i%3)*8]],c,2,false,a*0.5);line([[x+8,GR],[x+16,GR-30]],c,2,false,a*0.5);}}
function tomb(x,y,s,a,c=DIM){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);line([[-50,0],[-50,-110],[-36,-138],[0,-150],[36,-138],[50,-110],[50,0]],c,3.5,true,a);line([[-20,-90],[20,-90]],c,2,false,a*0.7);line([[0,-110],[0,-60]],c,2,false,a*0.7);ctx.restore();}
function wisp(x,y,r,a,t,col='120,255,210'){if(a<=0)return;r*=1.8;const f=0.8+0.2*Math.sin(t*13+x);glowDot(x,y,r*3*f,`rgba(${col},.35)`,a);glowDot(x,y,r*f,`rgba(${col},.95)`,a);
  ctx.save();ctx.globalAlpha=a*0.8;ctx.fillStyle=`rgba(${col},.8)`;ctx.shadowColor=`rgb(${col})`;ctx.shadowBlur=20;ctx.beginPath();ctx.moveTo(x-r*0.5,y);ctx.quadraticCurveTo(x,y-r*2.2*f,x+r*0.5,y);ctx.arc(x,y,r*0.5,0,3.14);ctx.fill();ctx.restore();}
function bubble(x,y,r,a){circ(x,y,r,CYAN,2,a,'rgba(127,232,255,.12)');}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'荒坟鬼火事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'半夜的坟地里，一团绿火飘着……还会跟着人走');
    ground(t,a);for(const [x,s] of [[520,1],[760,.8],[1220,.9],[1440,1.1]])tomb(x,GR,s,a*0.8);
    wisp(960+Math.sin(t*1.3)*80,620+Math.sin(t*2)*20,26,a*seg(t,1,1.5)*(0.5+0.5*flashA(t,[1.5,2.3,3.2],0.2)),t);
    stamp('未解之谜',1640,880,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'从古至今 · 东西方都有',PAPER,215,64);ground(t,a);
    rect(260,400,560,300,DIM,2,a*seg(t,5,5.4),'rgba(0,0,0,.35)');txt('中国：鬼火 · 磷火',540,470,40,GREEN,{f:SANS,w:700,a:a*seg(t,5.2,5.6)});txt('"人死后魂魄不散"',540,580,34,DIM,{f:SANS,w:500,a:a*seg(t,5.6,6)});
    rect(1100,400,560,300,DIM,2,a*seg(t,6.4,6.8),'rgba(0,0,0,.35)');txt('欧洲：Will-o\'-the-wisp',1380,470,36,GREEN,{f:SANS,w:700,a:a*seg(t,6.6,7)});txt('"引人走进沼泽的鬼灯"',1380,580,34,DIM,{f:SANS,w:500,a:a*seg(t,7,7.4)});
    cap(t,T.lab+.4,7.4,'中国叫它"鬼火"，欧洲叫它"捉弄人的鬼灯"');cap(t,7.5,T.night+.2,'它总出现在坟地、沼泽，这些和死亡有关的地方');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    ground(t,a*0.6);for(const [x,s] of [[420,1],[760,.8],[1280,.9],[1560,1.1]])tomb(x,GR,s,a*0.6);
    personStand(300+seg(t,10,16)*380,GR,1,a*0.9);
    const wx=980+seg(t,10,16)*300+Math.sin(t*1.7)*40;wisp(wx,640+Math.sin(t*2.4)*30,24,a*seg(t,10.4,11),t);
    wisp(1500,560,18,a*flashA(t,[11.3,12.5],0.18),t);wisp(640,520,16,a*flashA(t,[12.5,13.8],0.18),t);
    ghost(1600,650,1.1,a*win(t,15.2,16.1,.03,.4),'120,200,170');
    cap(t,T.night+.3,12.7,'夜里路过坟地，前面飘起一团幽幽的绿光');cap(t,12.8,15.1,'你往前走，它就往后退；你一跑，它就追上来','#d9e6e2');
    cap(t,15.2,T.foil,'像是有什么东西，在跟着你',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'它还有一个怪特点',PAPER,215,66);ground(t,a*0.6);wisp(960,600,34,a,t);
    const h=a*seg(t,17.6,18);txt('摸上去不太烫？',1400,560,44,RED,{f:SANS,w:700,a:h,al:'left'});
    cap(t,T.foil+.4,18.5,'据说它几乎不点燃周围的草，像是"冷"的火');cap(t,18.6,T.hit,'化学家开始怀疑：这团火，是从地下"冒"出来的');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'是地下冒出的"会自燃的气"！',RED,215,86,{pop:1,fi:.02});ground(t,a*0.7);
    for(let i=0;i<7;i++){const q=(t*0.4+i/7)%1;bubble(820+i*44,GR-q*240,10+i%3*4,a*(1-q));}
    wisp(960,GR-260,30,a*seg(t,21.6,22),t);
    cap(t,T.hit+.8,T.trace,'坟地、沼泽的泥里，一直在冒着看不见的气泡');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：泥里在发生什么？',PAPER,215,62);
    rect(160,560,1600,300,'rgba(255,207,122,.4)',2,a,'rgba(80,50,20,.25)');line([[160,560],[1760,560]],CYAN,3,true,a);
    txt('腐烂的有机物（落叶、动植物残骸）',960,800,32,WARM,{f:SANS,w:700,a:a*seg(t,25.6,26)});
    const items=[['甲烷 CH₄',520,25.8],['磷化氢 PH₃',960,26.8],['双膦 P₂H₄',1400,27.8]];
    for(const [s,x,t0] of items){const p=seg(t,t0,t0+1.2);bubble(x,lerp(720,420,eOut(p)),16,a*seg(t,t0,t0+.3));txt(s,x,lerp(720,420,eOut(p))-50,32,GREEN,{f:SANS,w:700,a:a*seg(t,t0+.3,t0+.6)});}
    cap(t,T.trace+.4,28.2,'细菌分解腐烂物，会放出几种气体');cap(t,28.3,T.reveal,'其中有一种，一碰到空气就会自己烧起来');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('自燃的气体',560,430,140,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('P₂H₄ + CH₄ + O₂',560,580,56,PAPER,{f:MONO,a:a*seg(t,31.5,32)});
    txt('（一般解释）',560,660,32,DIM,{f:SANS,w:500,a:a*seg(t,32,32.4)});
    const s1=seg(t,32.6,33.4),s2=seg(t,33.4,34.4);bubble(1300,700-s1*60,26,a*seg(t,32.4,32.8));txt('双膦遇空气自燃',1300,770,28,GREEN,{f:SANS,w:700,a:a*seg(t,32.6,33)});
    line([[1350,600],[1460,560]],GREEN,3,true,a*s2);wisp(1560,560,40,a*s2,t);txt('点燃甲烷',1560,660,28,GREEN,{f:SANS,w:700,a:a*s2});
    txt('2024 年新假说：气泡间"微闪电"',1440,420,28,CYAN,{f:SANS,w:700,a:a*seg(t,35,35.4)});
    cap(t,T.reveal+.6,34.4,'磷化物遇空气自燃，顺带点着了甲烷（一般解释）');cap(t,34.5,T.eye,'火焰温度低、气量小，烧一下就灭，所以忽明忽暗');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么它会"跟着你走"？',PAPER,215,66);ground(t,a*0.6);
    const fw=seg(t,37.4,39.4),bk=seg(t,39.6,41.6);const px=500+fw*300-bk*300;personStand(px,GR,1,a);
    const wx=900+fw*260-bk*200;wisp(wx,620,24,a,t);
    for(let i=0;i<4;i++){const q=(t*1.2+i/4)%1;const dir=bk>0?-1:1;line([[px+dir*(40+q*200),560+i*40],[px+dir*(90+q*200),560+i*40]],CYAN,2,false,a*(1-q)*0.7);}
    cap(t,T.eye+.4,39.9,'你往前走，身体推着空气，把这团轻飘飘的火推远');cap(t,40,T.off,'你转身跑，身后的气流又把它"吸"了过来（一种解释）');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'天亮了，鬼火不见了',PAPER,215,66);glowDot(W/2,500,600,'rgba(255,200,120,.22)',a);ground(t,a,WARM);
    for(const [x,s] of [[520,1],[760,.8],[1220,.9],[1440,1.1]])tomb(x,GR,s,a,WARM);
    cap(t,T.off+.4,T.end,'白天气体照样在冒，只是火光太弱，看不见');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"鬼火"，只是',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('泥里冒出的一口气',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：磷化氢/甲烷自燃说（一般解释）· Xia, Zare 等 2024《PNAS》微闪电假说',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你小时候见过鬼火吗？｜评论区报案',GREEN);}
}
function coverScene(){ground(3,1);for(const [x,s] of [[420,1],[700,.8],[1300,.9],[1560,1.1]])tomb(x,GR,s,0.9);wisp(980,620,44,1,3);wisp(1430,560,22,0.6,5);personStand(620,GR,1,0.9);
  txt('坟地鬼火跟着人走',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('你退它进，你跑它追',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('PH₃',300,940,-1,0,GREEN,64,-0.1);}
