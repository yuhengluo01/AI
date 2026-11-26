// CASE 052 拉撒路现象（自动复苏；Bray 1993 命名；Adhiyaman 2007《J R Soc Med》综述 38 例，平均停止 CPR 后约 7 分钟恢复，35% 出院无明显神经后遗症；动态肺过度充气为主要一种解释；建议停止后监测至少 10–15 分钟）
const EP={caseNo:'052',name:'宣布死亡之后',sfx:{ghost:[11.2,12.8,14.2],stings:[15.2],blips:[1.2,2.0,2.8,3.6,22.0,22.8,23.6,24.4,26.2,27.6,33.4,38.6,39.6,43.0,43.8,44.6],whisper:[10,16]}};
// 心电图：在 [x0,x1] 画，beats = 在哪些相对位置有心跳
function ecg(x0,x1,y,t,a,beat,c=GREEN,amp=1){if(a<=0)return;const pts=[];const N=240;
  for(let i=0;i<=N;i++){const u=i/N;const x=lerp(x0,x1,u);let v=0;
    if(beat){const ph=((u*4-t*1.2)%1+1)%1;if(ph>0.40&&ph<0.43)v=-0.25;else if(ph>0.47&&ph<0.5)v=1.2;else if(ph>0.5&&ph<0.53)v=-0.5;else if(ph>0.62&&ph<0.7)v=0.18*Math.sin((ph-0.62)/0.08*3.14);}
    pts.push([x,y-v*90*amp]);}
  line(pts,c,3.5,true,a);}
function monitor(x,y,w,h,t,a,beat,c=GREEN,label){if(a<=0)return;rect(x-w/2,y-h/2,w,h,CYAN,3,a,'rgba(0,20,15,.6)');ecg(x-w/2+20,x+w/2-20,y+10,t,a,beat,beat?c:RED,0.8);
  if(label)txt(label,x+w/2-30,y-h/2+34,30,beat?c:RED,{f:MONO,al:'right',a});}
function heartS(x,y,s,c,a,fill){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=4;ctx.shadowColor=c;ctx.shadowBlur=20;
  ctx.beginPath();ctx.moveTo(0,40);ctx.bezierCurveTo(-90,-20,-50,-90,0,-45);ctx.bezierCurveTo(50,-90,90,-20,0,40);if(fill){ctx.fillStyle=fill;ctx.fill();}ctx.stroke();ctx.restore();}
function lungs(x,y,inf,a,c=CYAN){if(a<=0)return;const s=lerp(0.85,1.25,inf);for(const sd of [-1,1]){ctx.save();ctx.translate(x+sd*(120+inf*30),y);ctx.scale(sd*s,s);ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=4;ctx.shadowColor=c;ctx.shadowBlur=14;
  ctx.fillStyle=`rgba(127,232,255,${0.05+inf*0.15})`;ctx.beginPath();ctx.moveTo(-30,-170);ctx.bezierCurveTo(60,-180,110,40,90,150);ctx.bezierCurveTo(40,170,-20,160,-40,120);ctx.bezierCurveTo(-60,20,-60,-120,-30,-170);ctx.fill();ctx.stroke();ctx.restore();}
  line([[x,y-260],[x,y-190],[x-60,y-150]],c,3,true,a*0.8);line([[x,y-190],[x+60,y-150]],c,3,true,a*0.8);}
function arrows(x,y,dir,a,c){for(let k=0;k<3;k++){const yy=y+k*40;line([[x,yy],[x+dir*60,yy]],c,4,true,a);line([[x+dir*44,yy-12],[x+dir*60,yy],[x+dir*44,yy+12]],c,4,true,a);}}
function ward(t,a,beat){bed(820,760,460,a*0.8);personLie(840,730,1,a);monitor(1360,560,420,240,t,a,beat,GREEN,beat?'HR 52':'HR 0');line([[1360,680],[1360,860]],CYAN,3,true,a*0.6);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'宣布死亡后，心脏又跳了',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'抢救已经停止，监护仪上却突然跳出了心跳');
    monitor(W/2,620,1100,320,t,a,t>1.2,GREEN,t>1.2?'HR 48':'HR 0');ghost(1620,600,0.9,a*flashA(t,[1.6,2.6,3.5],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'深夜 · 急救室',PAPER,215,64);ward(t,a,false);
    txt('停止抢救',1360,380,40,RED,{f:SANS,w:900,a:a*seg(t,7.6,8)});
    cap(t,T.lab+.4,7.4,'心脏骤停的病人，抢救了很久也没有反应');cap(t,7.4,T.night+.2,'医生停止心肺复苏，宣布死亡');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    ward(t,a*0.85,t>15.2);
    ghost(1650,560,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.2,12.8,14.2],0.14));ghost(840,520,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'几分钟过去，病房里只剩仪器的长鸣');cap(t,12.6,15.1,'就在大家准备离开时，屏幕突然动了……','#d9e6e2');
    cap(t,15.2,T.foil,'"死人"的心脏，自己跳了起来',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'这不是个例',PAPER,215,70);
    for(let i=0;i<12;i++){const x=420+(i%6)*216,y=i<6?470:700;const ca=a*seg(t,16.3+i*0.12,16.6+i*0.12);rect(x-90,y-80,180,150,CYAN,2.5,ca,'rgba(127,232,255,.05)');ecg(x-80,x+80,y+10,t+i,ca*0.8,true,GREEN,0.4);}
    cap(t,T.foil+.4,18.4,'从 1982 年起，医学期刊里不断有人报告');cap(t,18.5,T.hit,'停止抢救后，病人的心脏又自己恢复了跳动');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'拉撒路现象',RED,215,110,{pop:1,fi:.02});txt('Lazarus Phenomenon · 自动复苏',W/2,320,36,PAPER,{f:MONO,w:400,a:a*seg(t,21.4,21.8)});
    monitor(W/2,620,1100,320,t,a,true,GREEN,'HR 52');
    cap(t,T.hit+.8,23.3,'1993 年，医生用《圣经》里复活的拉撒路给它命名');cap(t,23.4,T.trace,'2007 年的一篇综述，就整理出了 38 例');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：停手后，多久"复活"？',PAPER,215,64);
    const x0=400,x1=1520,y=560;line([[x0,y],[x1,y]],CYAN,4,true,a);for(let m=0;m<=10;m++){const x=lerp(x0,x1,m/10);line([[x,y-12],[x,y+12]],CYAN,2,false,a);txt(m+'',x,y+44,26,DIM,{f:MONO,a});}
    txt('分钟',x1+60,y+44,26,DIM,{f:SANS,w:500,a});
    txt('停止抢救',x0,y-60,34,RED,{f:SANS,w:900,a:a*seg(t,26.2,26.6)});
    const px=lerp(x0,lerp(x0,x1,0.7),eOut(seg(t,26.6,27.6)));circ(px,y,14,GREEN,3,a*seg(t,26.6,27),'rgba(109,255,192,.5)');
    txt('平均约 7 分钟',lerp(x0,x1,0.7),y-60,40,GREEN,{f:SANS,w:900,a:a*seg(t,27.6,28)});
    txt('约 35% 后来出院，没有明显神经后遗症',W/2,730,40,WARM,{f:SANS,w:700,a:a*seg(t,28.6,29)});
    cap(t,T.trace+.4,28.2,'这些病人，平均在停手后约 7 分钟恢复心跳');cap(t,28.3,T.reveal,'而且有三分之一多的人，后来康复出院');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    title(t,T.reveal,T.eye+.2,'肺里憋住的气',RED,215,104,{pop:1,fi:.02});txt('动态肺过度充气（一种解释）',W/2,320,36,PAPER,{f:SANS,w:500,a:a*seg(t,31.4,31.8)});
    const inf=seg(t,32,34.5);lungs(W/2,640,inf,a);heartS(W/2,700,lerp(0.9,0.6,inf),RED,a,'rgba(255,60,60,.2)');
    arrows(W/2-460,600,1,a*seg(t,33.4,33.8),CYAN);txt('快速吹气',W/2-560,560,32,CYAN,{f:SANS,w:700,a:a*seg(t,33.4,33.8)});
    txt('压住了心脏和血管',W/2+520,640,36,RED,{f:SANS,w:700,a:a*seg(t,34.6,35)});
    cap(t,T.reveal+.6,34.4,'抢救时快速吹气，肺里的气来不及呼出，越积越多');cap(t,34.5,T.eye,'胸腔压力升高，压住血管，血回不到心脏');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'一停手，压力就松开了',PAPER,215,66);
    const inf=1-seg(t,37.4,39);lungs(W/2,640,inf,a);heartS(W/2,700,lerp(0.9,0.6,inf)*(1+0.08*Math.sin(t*8)*seg(t,39.4,40)),RED,a,'rgba(255,60,60,.25)');
    arrows(W/2+380,600,-1,a*seg(t,38.6,39),RED);txt('血液回流',W/2+480,560,32,RED,{f:SANS,w:700,a:a*seg(t,38.6,39)});
    txt('药物也终于送到',W/2-500,640,34,GREEN,{f:SANS,w:700,a:a*seg(t,39.6,40)});
    cap(t,T.eye+.4,39.9,'抢救一停，胸腔压力释放，血液重新流回心脏');cap(t,40,T.off,'之前打进去的药物也终于送到，心脏重新跳了起来');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'停手后，再等 10 分钟',PAPER,215,70);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    monitor(W/2,620,1000,300,t,a,true,WARM,'HR 64');
    cap(t,T.off+.4,T.end,'专家建议：停止抢救后，至少监测 10 到 15 分钟再宣布死亡');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"复活"',760,400,110,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是心脏还没放弃',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1580,480,46.2,t,RED,90,-0.14);
    txt('机制仍在研究 · 资料：Bray 1993 · Adhiyaman 2007《J R Soc Med》· Smithsonian 2016',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你听过"死而复生"的事吗？评论区报案',GREEN);}
}
function coverScene(){monitor(W/2,640,1200,340,0.3,1,true,GREEN,'HR 48');ghost(1640,640,1.0,0.7);
  txt('抢救停止约 7 分钟后',W/2,215,104,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('他的心脏，自己又跳了起来',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('38 例',300,940,-1,0,GREEN,64,-0.1);}
