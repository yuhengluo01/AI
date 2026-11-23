// CASE 039 爆炸头综合征（Pearce 1989 命名；Sharpless 2015 J Sleep Res：211 名大学生中约 18% 经历过；机制“神经元延迟关闭后同时放电”为一种解释）
const EP={caseNo:'039',name:'深夜巨响',sfx:{ghost:[11.6,14.4],stings:[12.6],blips:[26.2,27.2,33.2,38.6,39.6],whisper:[10,16]}};
const X0=460,X1=1460,TOP=360,FL=860,BX=900,BY=760;
function bedroom(t,a,o={}){if(a<=0)return;const c=o.col||CYAN;roomBox(X0,X1,TOP,FL,a,c);
  rect(540,430,140,170,c,2.5,a*0.8,`rgba(150,200,255,${0.1*(o.moon??1)})`);line([[610,430],[610,600]],c,1.5,false,a*0.6);line([[540,515],[680,515]],c,1.5,false,a*0.6);
  line([[1330,FL],[1330,FL-300],[1430,FL-300],[1430,FL]],c,2.5,true,a*0.7);circ(1345,FL-150,5,c,2,a*0.7);
  bed(BX,BY,420,a,c);line([[BX-210,BY+60],[BX-210,FL]],c,3,true,a);line([[BX+210,BY+60],[BX+210,FL]],c,3,true,a);
  rect(1170,BY-10,90,110,c,2.5,a*0.7);txt(o.clock||'02:47',1215,BY-40,30,RED,{f:MONO,a,glow:'rgba(255,60,60,.6)'});}
function sleeper(t,a,eyes=0,c=PAPER){personLie(BX+20,BY-30,1,a,c,eyes);}
function bang(x,y,a,s=1,label='砰！'){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle=RED;ctx.lineWidth=5;ctx.shadowColor=RED;ctx.shadowBlur=20;ctx.beginPath();
  for(let i=0;i<=16;i++){const ang=i/16*6.283,r=i%2?70:130;ctx.lineTo(Math.cos(ang)*r*1.4,Math.sin(ang)*r);}ctx.closePath();ctx.stroke();ctx.restore();txt(label,x,y+4,70*s,RED,{f:SANS,w:900,a,glow:'rgba(255,60,60,.8)'});}
function neurons(t,a,cx,cy,mode){ // mode: 0 正常依次熄灭, 1 听觉组延迟后齐放
  if(a<=0)return;const r=rng(21);for(let i=0;i<40;i++){const x=cx+(r()-.5)*640,y=cy+(r()-.5)*300;const aud=i%5==0;
    let on;if(!aud||mode==0)on=1-seg(t,32.4+i*0.02,32.6+i*0.02);else on=t<34.2?(1-seg(t,32.6,32.8))*0+0.6:Math.max(0,1-seg(t,34.2,34.8))*1.4;
    if(aud&&mode==1&&t<34.2)on=0.55;
    const col=aud?(mode==1&&t>=34.2?RED:WARM):GREEN;circ(x,y,9,col,2,a*(0.3+0.7*clamp(on)),aud&&on>1?RED:`rgba(109,255,192,${0.5*clamp(on)})`);}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'深夜枪声事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'每次快睡着，耳边就"砰"地一声巨响');
    bedroom(t,a);sleeper(t,a,t>2.2?1:0);bang(BX-130,560,a*win(t,2.0,2.7,.02,.3),0.8);
    ghost(1380,700,0.8,a*flashA(t,[3.0,3.5],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'很多人以为，是自己疯了',PAPER,215,64);
    [[560,'枪声',5.0],[960,'摔门',5.5],[1360,'爆炸',6.0]].forEach(([x,s,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-150,420,300,280,CYAN,3,ca,'rgba(127,232,255,.05)');txt(s,x,560,64,PAPER,{a:ca});});
    cap(t,T.lab+.4,7.4,'有人说是枪声，有人说是摔门、爆炸、电线短路');cap(t,7.4,T.night+.2,'可起身一看，屋里安安静静，什么都没有');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    bedroom(t,a*0.6,{moon:0.5,clock:'03:14'});const awake=t>12.6;sleeper(t,a,awake?1:0);
    bang(BX-130,560,a*win(t,12.6,13.3,.02,.35),1.1);if(t>=12.6&&t<12.75){ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(0,0,W,H);}
    ghost(1380,690,0.85,a*flashA(t,[11.6,14.4],0.14));ghost(1120,620,1.2,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'凌晨，人刚要睡着……');cap(t,12.6,15.1,'脑子里突然"轰"的一声，还闪过一道白光，心跳狂飙','#d9e6e2');
    cap(t,15.2,T.foil,'有人以为家里进了人，有人以为自己脑出血',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'闹鬼？还是被"攻击"了？',PAPER,215,68);
    bedroom(t,a*0.5);sleeper(t,a,1);txt('?',BX-130,580,120,RED,{f:SERIF,a:a*(0.5+0.5*Math.sin(t*4)),glow:'rgba(255,60,60,.6)'});
    cap(t,T.foil+.4,18.4,'有人怀疑闹鬼，也有人怀疑被"声波武器"攻击');cap(t,18.5,T.hit,'医生和心理学家，开始认真研究这种深夜巨响');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'它有名字：爆炸头综合征',RED,215,88,{pop:1,fi:.02});
    brain(960,620,1.8,CYAN,a,0.3);bang(960,600,a*win(t,21.1,22.2,.02,.4),0.7,'BANG');
    txt('1989 年 · 英国神经科医生皮尔斯正式命名',960,820,34,PAPER,{f:SANS,w:700,a:a*seg(t,22.6,23)});
    cap(t,T.hit+.8,T.trace,'一种和入睡有关的现象，听着吓人，但并不危险');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：有多少人中过招？',PAPER,215,64);
    for(let i=0;i<20;i++)for(let j=0;j<5;j++){const k=i*5+j;const x=560+i*42,y=480+j*70;const hit=(k*37)%100<18;const ca=a*seg(t,25.4+k*0.01,25.6+k*0.01);
      headAt(x,y,12,hit&&t>27.6?RED:PAPER,ca);line([[x,y+12],[x,y+34]],hit&&t>27.6?RED:PAPER,2.5,false,ca);}
    txt('211 名大学生',1460,480,40,PAPER,{f:SANS,w:700,a:a*seg(t,26,26.4),al:'left'});txt('美国 · 2015',1460,540,30,DIM,{f:SANS,w:500,a:a*seg(t,26.4,26.8),al:'left'});
    cap(t,T.trace+.4,28.2,'2015 年，美国心理学家调查了 211 名大学生');cap(t,28.3,T.reveal,'结果比所有人想的都多');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('约 18%',W/2,450,170,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('至少经历过一次',W/2,620,58,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,32)});
    txt('差不多每 5 个人里就有 1 个',W/2,720,40,GREEN,{f:SANS,w:700,a:a*seg(t,32.6,33)});
    cap(t,T.reveal+.6,34.4,'约 18% 的人至少经历过一次深夜"爆炸"');cap(t,34.5,T.eye,'其中不少人还有过"鬼压床"');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'大脑"关机"时出了个小故障',PAPER,215,64);
        // 右侧：听觉组
    txt('正常：一片片关灯',700,800,32,GREEN,{f:SANS,w:700,a});
    const r=rng(5);for(let i=0;i<12;i++){const x=1260+(i%4)*90,y=500+Math.floor(i/4)*90;const late=t>39.4;circ(x,y,14,late?RED:WARM,3,a,late?`rgba(255,60,60,${0.9*(1-seg(t,40.2,41))})`:'rgba(255,200,120,.35)');}
    if(t>39.4&&t<40.2)waves(1395,590,60,RED,t,a,4,-3.14,3.14);
    txt('听觉神经元：没关好，一起放电',1395,800,32,RED,{f:SANS,w:700,a:a*seg(t,38.6,39)});
    for(let i=0;i<40;i++){const rr=rng(21+i);const x=700+(rr()-.5)*600,y=600+(rr()-.5)*260;circ(x,y,9,GREEN,2,a*(0.3+0.7*(1-seg(t,37.4+i*0.04,37.6+i*0.04))),`rgba(109,255,192,${0.5*(1-seg(t,37.4+i*0.04,37.6+i*0.04))})`);}
    cap(t,T.eye+.4,39.9,'入睡时，大脑会一片片"关灯"（一种解释）');cap(t,40,T.off,'听觉神经元没按顺序关好，一下子同时放电，就像爆炸');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'不伤脑，也不是鬼',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    bedroom(t,a,{col:WARM,clock:'07:00'});sleeper(t,a,0,WARM);
    cap(t,T.off+.4,T.end,'减压、规律作息，发作通常会变少');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些深夜"枪声"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是大脑关机的杂音',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：Sharpless 2015《Journal of Sleep Research》· Pearce 1989',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你半夜听过"砰"的一声吗？｜评论区报案',GREEN);}
}
function coverScene(){bedroom(3,1,{clock:'03:14'});sleeper(3,1,1);bang(BX-130,560,1,1);ghost(1380,690,0.85,0.6);
  txt('一睡着，脑子里就"砰"一声',W/2,200,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('每 5 人就有 1 个？',W/2,302,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('18%',300,940,-1,0,GREEN,64,-0.1);}
