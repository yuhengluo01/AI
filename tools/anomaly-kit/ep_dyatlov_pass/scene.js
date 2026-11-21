// CASE 024 迪亚特洛夫山口事件（Gaume & Puzrin 2021）
const EP={caseNo:'024',name:'死亡山口',sfx:{ghost:[11.4,12.5],stings:[],blips:[33.4,34.4,38.6,39.6],whisper:[10,16]}};
const sy=x=>420+(x-300)*0.333; const CUT0=860,CUT1=1010,TY=sy(CUT1);
function mountain(t,a,o={}){if(a<=0)return;
  line([[0,520],[220,360],[380,470],[560,330],[760,480]],'rgba(127,232,255,.25)',2,false,a);line([[1100,520],[1350,380],[1500,460],[1700,340],[1920,480]],'rgba(127,232,255,.25)',2,false,a);
  const pts=[[300,sy(300)],[CUT0,sy(CUT0)]];if(o.cut!==false){pts.push([CUT0,TY],[CUT1,TY]);}pts.push([1620,sy(1620)]);line(pts,CYAN,4,true,a);
  // 雪花
  const r=rng(3);for(let i=0;i<60;i++){const x=(r()*W+t*20*(1+r()))%W,y=(r()*H+t*(40+r()*40))%H;ctx.save();ctx.globalAlpha=a*0.5;ctx.fillStyle=PAPER;ctx.beginPath();ctx.arc(x,y,1.5+r()*1.5,0,6.28);ctx.fill();ctx.restore();}}
function tent(t,a,o={}){if(a<=0)return;const x0=CUT0+12,x1=CUT1-8,y=TY;const sq=o.squash||0;const h=70*(1-sq*0.7);
  line([[x0,y],[(x0+x1)/2,y-h],[x1,y],[x0,y]],o.col||PAPER,3.5,true,a);if(o.slash){for(let k=0;k<3;k++)line([[x0+18+k*10,y-12-k*14],[x0+30+k*10,y-26-k*14]],RED,3,true,a*o.slash);}
  if(o.glow)glowDot((x0+x1)/2,y-30,90,`rgba(255,200,120,${0.3*o.glow})`,a);}
function slab(t,a,grow,slide=0){if(a<=0)return;const xa=560,xb=CUT0;const th=10+grow*38;const dx=slide*130,dy=slide*130*0.333+slide*28;
  ctx.save();ctx.globalAlpha=a;ctx.translate(dx,dy);ctx.beginPath();ctx.moveTo(xa,sy(xa));ctx.lineTo(xb,sy(xb));ctx.lineTo(xb,sy(xb)-th);ctx.lineTo(xa,sy(xa)-th*0.4);ctx.closePath();
  ctx.fillStyle='rgba(233,243,238,.18)';ctx.fill();ctx.strokeStyle=slide>0||grow>0.9?RED:PAPER;ctx.lineWidth=3;ctx.shadowColor=ctx.strokeStyle;ctx.shadowBlur=14;ctx.stroke();ctx.restore();}
function prints(t,a,t0){for(let i=0;i<14;i++){const x=CUT1+40+i*42,y=sy(CUT1+40+i*42)-6+(i%2)*6;const fa=a*seg(t,t0+i*0.1,t0+i*0.1+.1);ctx.save();ctx.globalAlpha=fa;ctx.fillStyle=PAPER;ctx.beginPath();ctx.ellipse(x,y,9,4,0.32,0,6.28);ctx.fill();ctx.restore();}}
function wind(t,a){for(let i=0;i<6;i++){const q=(t*0.7+i/6)%1;const x=lerp(1500,600,q),y=sy(x)-90-i*14;line([[x,y],[x-60,y+8]],CYAN,2.5,true,a*Math.sin(q*Math.PI)*0.8);}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'死亡山口事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'9 个人，在零下的雪夜里冲出帐篷');
    mountain(t,a);tent(t,a,{slash:1});prints(t,a,0.6);ghost(1300,sy(1300)-170,0.6,a*flashA(t,[1.6,2.3,3.5],0.12));
    stamp('未解之谜',1640,860,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1959 年 2 月 · 苏联 · 乌拉尔山北部',PAPER,215,60);mountain(t,a);
    for(let i=0;i<9;i++){const x=lerp(380,780,seg(t,4.6,7.6))+i*34;personStand(x,sy(x)-2,0.32,a*(1-seg(t,7.4,7.9)));}
    tent(t,a*seg(t,7.6,8),{glow:1});
    cap(t,T.lab+.4,7.4,'9 名经验丰富的登山者，在雪坡上扎营过夜');cap(t,7.4,T.night+.2,'几周后搜救队找到帐篷时，人已全部遇难');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    mountain(t,a*0.7);tent(t,a,{slash:seg(t,10.4,11)});prints(t,a,13.2);
    ghost(1240,sy(1240)-170,0.6,a*flashA(t,[11.4,12.5],0.13));ghost(1500,sy(1500)-180,0.9,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,13.1,'帐篷，是从里面被划开的');cap(t,13.2,15.1,'很多人没穿鞋，就冲进了零下的黑夜……','#d9e6e2');
    cap(t,15.2,T.foil,'有人胸口和头部重伤，像被巨大的力量挤压',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'60 多年的谜团',PAPER,215,66);
    [[620,'外星人?',16.4],[960,'秘密武器?',17.0],[1300,'雪人?',17.6]].forEach(([x,s,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-150,440,300,240,CYAN,3,ca,'rgba(127,232,255,.05)');txt(s,x,560,52,PAPER,{a:ca});line([[x-120,470],[x+120,650]],RED,5,true,a*seg(t,18.6+(x-620)/1500,18.9+(x-620)/1500));});
    cap(t,T.foil+.4,18.4,'外星人、秘密武器、雪人……各种猜测满天飞');cap(t,18.4,T.hit,'2021 年，两位雪崩专家给出了新答案');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'凶手，可能是一块"雪板"！',RED,215,88,{pop:1,fi:.02});mountain(t,a);tent(t,a);slab(t,a,1);
    txt('雪板',700,sy(700)-90,40,RED,{f:SANS,w:700,a:a*seg(t,21.6,22),glow:'rgba(255,60,60,.5)'});
    cap(t,T.hit+.8,T.trace,'一种不起眼的小型雪崩');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'切口 + 大风',PAPER,215,66);mountain(t,a);tent(t,a);
    const ca=a*seg(t,25.4,25.9);circ(CUT0,TY-20,60,GREEN,3,ca);txt('扎营挖出的切口',CUT0-40,TY+70,34,GREEN,{f:SANS,w:700,a:ca});
    wind(t,a*seg(t,28.2,28.6));slab(t,a*seg(t,28.2,28.6),seg(t,28.3,31));txt('风吹来的积雪',680,sy(680)-110,34,PAPER,{f:SANS,w:700,a:a*seg(t,28.6,29)});
    cap(t,T.trace+.4,28.2,'为了扎营，他们在雪坡上挖了一个切口');cap(t,28.3,T.reveal,'夜里，大风不断把雪堆在切口上方');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);
    title(t,T.reveal,T.eye+.2,'延迟雪崩',RED,215,110,{pop:1,fi:.02});mountain(t,a);
    const sl=eInOut(seg(t,33.6,34.6));slab(t,a,1,sl);tent(t,a,{squash:sl});
    const tl=[['扎营',600,33.0],['数小时后',960,33.4],['雪板滑落',1320,34.4]];line([[560,375],[1360,375]],DIM,2,false,a*seg(t,32.8,33));
    for(const [s,x,t0] of tl){const ta=a*seg(t,t0,t0+.3);circ(x,375,9,s=='雪板滑落'?RED:GREEN,0,ta,s=='雪板滑落'?RED:GREEN);txt(s,x,345,30,s=='雪板滑落'?RED:PAPER,{f:SANS,w:700,a:ta});}
    cap(t,T.reveal+.6,34.4,'雪越积越重，几个小时后，雪板突然滑落');cap(t,34.5,T.eye,'正好压在帐篷上（一种解释）');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'伤和逃，都说得通了',PAPER,215,66);
    // 剖面放大
    const x0=560,x1=1360,y=760;line([[x0,y],[x1,y]],CYAN,5,true,a);for(let i=0;i<5;i++)line([[x0+60+i*150,y-6],[x0+180+i*150,y-6]],GREEN,5,true,a*seg(t,38.6,39));
    txt('滑雪板铺的硬地面',W/2,y+50,32,GREEN,{f:SANS,w:700,a:a*seg(t,38.6,39)});
    const d=eOut(seg(t,37.4,38.2));rect(x0+40,lerp(380,560,d),x1-x0-80,90,RED,3,a,'rgba(255,60,60,.15)');txt('雪板',W/2,lerp(425,605,d),36,RED,{f:SANS,w:700,a});
    line([[x0+80,y],[W/2,lerp(560,700,d)],[x1-80,y]],PAPER,3,true,a);
    for(let i=0;i<4;i++){const q=seg(t,39.6+i*0.2,40.8+i*0.2);personStand(x1+40+q*360+i*40,y,0.45,a*seg(t,39.6+i*.2,39.8+i*.2));}
    cap(t,T.eye+.4,39.9,'人被雪板压在硬地面上，造成严重挤压伤');cap(t,40,T.off,'以为更大的雪崩要来，他们划开帐篷逃生');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'目前最有力的解释之一',PAPER,215,66);mountain(t,a*0.6);
    for(let i=0;i<9;i++){const x=600+i*90;glowDot(x,560,50,'rgba(255,200,120,.6)',a*seg(t,42.3+i*.12,42.6+i*.12));circ(x,560,6,null,0,a*seg(t,42.3+i*.12,42.6+i*.12),WARM);}
    cap(t,T.off+.4,T.end,'它解释了大部分疑点，但争议仍未完全平息');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('比鬼更可怕的',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('是大自然的力量',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('科学推演',1540,480,46.2,t,RED,74,-0.14);
    txt('资料：Gaume & Puzrin, 2021 · Communications Earth & Environment',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'致敬 9 位遇难的登山者｜评论区报案',GREEN);}
}
function coverScene(){mountain(5,1);tent(5,1,{slash:1});slab(5,1,1);prints(5,1,0);ghost(1300,sy(1300)-170,0.7,0.8);
  txt('死亡山口',W/2,215,116,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('9 人为何冲出帐篷？',W/2,330,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1959',380,800,-1,0,GREEN,70,-0.1);}
