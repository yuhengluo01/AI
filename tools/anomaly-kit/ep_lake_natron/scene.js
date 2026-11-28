// CASE 061 纳特龙湖"石化"动物（坦桑尼亚北部碱湖；2013 摄影师 Nick Brandt 拍下岸边死去的鸟和蝙蝠，姿势是他摆的，书《Across the Ravaged Land》；附近火山带来大量碳酸钠，湖水 pH 可达约 10.5，又咸又碱，尸体脱水、被盐壳包裹，像天然木乃伊；古埃及做木乃伊用的泡碱 natron 即同类盐；死因不明，反光迷惑说只是一种猜测；小火烈鸟主要繁殖地）
const EP={caseNo:'061',name:'石像湖',sfx:{ghost:[11.4,13.0,14.5],stings:[12.9],blips:[22.0,26.2,27.8,32.2,34.4,38.0,39.6],whisper:[10,16]}};
const STONE='rgb(205,200,190)';
// 鸟（侧视，站立），(x,y)=脚底
function bird(x,y,s,a,c=STONE,flip=1){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(-s*flip,s);
  line([[-8,0],[-4,-40]],c,3,true,a);line([[10,0],[6,-40]],c,3,true,a);
  ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=3.5;ctx.shadowColor=c;ctx.shadowBlur=10;ctx.beginPath();ctx.ellipse(0,-62,40,24,-0.2,0,6.28);ctx.stroke();ctx.restore();
  line([[30,-74],[40,-102],[46,-112]],c,3.5,true,a);headAt(50,-118,10,c,a);line([[58,-118],[78,-112]],c,3,true,a);
  line([[-36,-56],[-62,-46]],c,3,true,a);ctx.restore();}
// 蝙蝠（倒挂/展开小型）
function bat(x,y,s,a,c=STONE){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  line([[-70,0],[-40,-20],[-20,-4],[0,-14],[20,-4],[40,-20],[70,0],[44,6],[20,10],[0,4],[-20,10],[-44,6],[-70,0]],c,3,true,a);headAt(0,-22,8,c,a);ctx.restore();}
function lake(cx,cy,rx,ry,a,glow=1){if(a<=0)return;ctx.save();ctx.globalAlpha=a;const g=ctx.createRadialGradient(cx,cy,0,cx,cy,rx);
  g.addColorStop(0,`rgba(200,30,30,${0.55*glow})`);g.addColorStop(1,'rgba(90,10,10,0.15)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,6.28);ctx.fill();
  ctx.strokeStyle=RED;ctx.lineWidth=3;ctx.shadowColor=RED;ctx.shadowBlur=14;ctx.stroke();ctx.restore();}
function volcano(x,y,s,a,c=CYAN){line([[x-200*s,y],[x-40*s,y-200*s],[x+40*s,y-200*s],[x+200*s,y]],c,3.5,true,a);}
function branch(x,y,a){line([[x-170,y],[x+170,y-20]],CYAN,4,true,a);line([[x+150,y-18],[x+190,y-70]],CYAN,3,true,a*0.8);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'这个湖，会把动物变成石像',PAPER,215,86,{pop:1});sub(t,.9,T.lab,'湖边站着一排一动不动的鸟，摸上去像石头');
    lake(960,820,620,90,a);[[620,780,1],[820,770,-1],[1060,775,1],[1280,785,-1]].forEach(([x,y,f],i)=>bird(x,y,1.3,a*seg(t,.6+i*.3,1+i*.3),STONE,f));
    ghost(1560,600,0.85,a*flashA(t,[1.7,2.8,3.7],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'2013 年 · 坦桑尼亚 · 纳特龙湖',PAPER,215,62);
    lake(820,780,520,80,a*seg(t,4.7,5.2));volcano(560,700,1.2,a*seg(t,4.9,5.4)*0.6);
    personStand(1380,840,1.0,a*seg(t,5.2,5.6),CYAN);rect(1420,690,60,40,CYAN,3,a*seg(t,5.4,5.8));
    txt('摄影师',1380,580,34,CYAN,{f:SANS,w:700,a:a*seg(t,5.6,6)});
    bird(980,780,1.1,a*seg(t,7.6,8),STONE,-1);bat(1140,760,0.9,a*seg(t,8,8.4));
    cap(t,T.lab+.4,7.4,'摄影师尼克·布兰特来到坦桑尼亚的纳特龙湖');cap(t,7.4,T.night+.2,'在湖岸边，他发现了一具具"石化"的鸟和蝙蝠');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    const pulse=0.7+0.3*Math.sin(t*4);lake(960,830,700,100,a,pulse);
    [[560,800,1,10.6],[760,790,-1,11.6],[1120,795,1,12.6],[1360,805,-1,13.6]].forEach(([x,y,f,t0])=>bird(x,y,1.4,a*seg(t,t0,t0+.25),'rgb(170,165,160)',f));
    ghost(lerp(1500,500,seg(t,11,15)),560,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.4,13.0,14.5],0.14));
    ghost(960,500,1.5,a*win(t,15.2,16.1,.03,.4),'150,140,150');
    cap(t,T.night+.3,12.6,'它们保持着生前的姿势，僵硬得像石头');cap(t,12.7,15.1,'湖水是诡异的血红色，有时还烫得惊人','#d9e6e2');
    cap(t,15.2,T.foil,'传说：碰到湖水的动物，都会变成石头',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'被诅咒的湖？',PAPER,215,76);
    branch(960,700,a*seg(t,16.3,16.7));bird(900,690,1.3,a*seg(t,16.5,16.9));bird(1050,672,1.2,a*seg(t,16.7,17.1),STONE,-1);
    ghost(960+Math.sin(t*2)*10,560,1.3,a*seg(t,18.3,19)*0.4);
    cap(t,T.foil+.4,18.4,'照片传遍全网，人们说这是美杜莎之湖');cap(t,18.5,T.hit,'可动物真的会一瞬间变成石头吗？');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'姿势，是摄影师摆的！',RED,215,96,{pop:1,fi:.02});
    branch(820,700,a);bird(760,690,1.3,a);bird(910,672,1.2,a,STONE,-1);
    const hp=seg(t,22.2,23.2);line([[1200,560],[lerp(1200,980,hp),lerp(560,630,hp)]],CYAN,4,true,a*seg(t,22,22.3));
    personStand(1320,840,1.1,a*seg(t,21.8,22.2),CYAN);
    cap(t,T.hit+.8,23.4,'这些鸟，其实是死后被冲上岸的');cap(t,23.4,T.trace,'站在树枝上的"生前姿势"，是布兰特亲手摆的');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：为什么不腐烂？',PAPER,215,64);
    volcano(560,760,1.3,a*seg(t,25.4,25.8));txt('火山',560,560,40,CYAN,{f:SANS,w:700,a:a*seg(t,25.4,25.8)});
    const fp=seg(t,26,27.2);for(let i=0;i<6;i++){const q=(fp+i/6)%1;circ(lerp(760,1100,q),lerp(700,760,q),8,WARM,2,a*fp*(1-q));}
    lake(1340,760,280,70,a*seg(t,26.4,26.8));txt('碳酸钠',1340,640,44,WARM,{a:a*seg(t,27,27.4)});
    txt('又咸又碱',1340,860,40,RED,{f:SANS,w:900,a:a*seg(t,28.2,28.6)});
    cap(t,T.trace+.4,27.5,'附近的火山，把大量碳酸钠冲进湖里');cap(t,27.6,T.reveal,'湖水又咸又碱，细菌很难活下去');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('pH ≈ 10.5',W/2,420,190,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('湖水是强碱，比肥皂水还碱',W/2,610,56,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,31.9)});
    txt('尸体难以腐烂，表面结出一层盐壳',W/2,740,40,CYAN,{f:SANS,w:700,a:a*seg(t,34.3,34.7)});
    cap(t,T.reveal+.6,34.2,'湖水 pH 可达约 10.5，属于强碱');cap(t,34.3,T.eye,'尸体泡在里面不会腐烂，反而被盐分慢慢包裹');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么看起来像石头？',PAPER,215,64);
    [['脱水干化','水分被盐吸干',640,37.3],['盐壳包裹','表面结出白色矿物',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,70,WARM,{a:ca});txt(s,x,630,34,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'古埃及人做木乃伊，用的就是同类的盐：泡碱');cap(t,40,T.off,'它们不是石化，而是成了天然"木乃伊"');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'可这里，却是火烈鸟的家',PAPER,215,66);glowDot(W/2,640,560,'rgba(255,200,120,.22)',a);
    [[760,820,1],[900,810,-1],[1040,825,1],[1180,815,-1]].forEach(([x,y,f],i)=>bird(x,y+Math.sin(t*3+i)*4,1.2,a*seg(t,42.3+i*.15,42.6+i*.15),'rgb(255,170,170)',f));
    cap(t,T.off+.4,T.end,'小火烈鸟偏偏在这里繁殖，天敌进不来');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"石化诅咒"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是一湖天然防腐剂',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：National Geographic 2013 · Live Science 2013 · Nick Brandt《Across the Ravaged Land》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你还知道哪些"吃人"的地方？评论区报案',GREEN);}
}
function coverScene(){lake(1400,900,460,80,1);branch(1400,760,1);bird(1330,750,1.5,1);bird(1500,730,1.4,1,STONE,-1);ghost(1780,600,0.75,0.45);
  txt('碰到湖水就变石头',640,320,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('其实是天然木乃伊',640,470,78,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('pH 10.5',330,850,-1,0,GREEN,58,-0.1);}
