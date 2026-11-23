// CASE 037 雪山第四人（1916.5 沙克尔顿、沃斯利、克林翻越南乔治亚岛约 36 小时；《South》1919“我们似乎是四个人”；Blanke 等 2014 Current Biology 机器人延迟触碰诱发“存在感”）
const EP={caseNo:'037',name:'雪山第四人',sfx:{ghost:[11.2,12.5,13.8],stings:[],blips:[26.4,28.4,33.4,38.4,39.4],whisper:[10,16.5]}};
const sy=x=>780-Math.max(0,Math.sin((x-200)/1520*3.14))*260;
function peaks(t,a,c=CYAN){if(a<=0)return;line([[0,560],[180,430],[320,520],[520,360],[700,500]],'rgba(127,232,255,.25)',2,false,a);line([[1200,500],[1420,340],[1600,470],[1780,380],[1920,460]],'rgba(127,232,255,.25)',2,false,a);
  const pts=[];for(let x=120;x<=1800;x+=20)pts.push([x,sy(x)]);line(pts,c,4,true,a);
  const r=rng(3);for(let i=0;i<70;i++){const x=(r()*W-t*(60+r()*40)+W*10)%W,y=(r()*H+t*(30+r()*50))%H;ctx.save();ctx.globalAlpha=a*0.5;ctx.fillStyle=PAPER;ctx.beginPath();ctx.arc(x,y,1.4+r()*1.6,0,6.28);ctx.fill();ctx.restore();}}
function trio(t,x,a,s=0.5,c=PAPER){for(let i=0;i<3;i++){const xx=x-i*70;personStand(xx,sy(xx)+2,s,a,c);}}
// 机器人实验示意
function robotRig(t,a,delay){if(a<=0)return;const px=860,py=800;
  personStand(px,py,0.9,a);rect(px-34,py-176,68,14,PAPER,2,a,'rgba(0,0,0,.8)');txt('蒙眼',px,py-210,26,DIM,{f:SANS,w:500,a});
  // 前方机械臂
  const push=Math.max(0,Math.sin(t*3));line([[px+34,py-100],[px+90+push*30,py-104]],PAPER,3.5,true,a);
  line([[px+120+push*30,py-104],[px+200,py-150],[px+260,py-60],[px+260,py]],CYAN,5,true,a);circ(px+120+push*30,py-104,10,CYAN,3,a);txt('前方：手推机械臂',px+290,py-200,30,CYAN,{f:SANS,w:700,a,al:'left'});
  // 背后机械臂（延迟）
  const back=Math.max(0,Math.sin(t*3-delay*3*1.0));line([[px-260,py],[px-260,py-80],[px-160,py-160],[px-50-back*20,py-120]],RED,5,true,a);circ(px-46-back*20,py-120,9,RED,3,a);
  txt('背后：同步戳背',px-290,py-230,30,RED,{f:SANS,w:700,a,al:'right'});}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'雪山第四人事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'三个人走在雪山上，却总觉得身边多了一个');
    peaks(t,a);trio(t,lerp(760,960,seg(t,0,4.5)),a);const gx=lerp(760,960,seg(t,0,4.5))+90;ghost(gx,sy(gx)-80,0.5,a*(flashA(t,[1.5,2.4,3.3],0.13)+0.3*win(t,2.6,4.2,.3,.3)));
    stamp('未解之谜',1640,900,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1916 年 5 月 · 南大西洋 · 南乔治亚岛',PAPER,215,58);peaks(t,a);
    trio(t,lerp(360,620,seg(t,4.6,10)),a*seg(t,5,5.5));
    txt('沙克尔顿',1420,470,36,PAPER,{f:SANS,w:700,a:a*seg(t,5.6,6)});txt('沃斯利 · 克林',1420,525,32,DIM,{f:SANS,w:500,a:a*seg(t,6,6.4)});
    cap(t,T.lab+.4,7.4,'探险船"坚忍号"被浮冰压碎，队员们困在荒岛上');cap(t,7.4,T.night+.2,'沙克尔顿带两名队友，翻越从没人走过的雪山去求救');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    peaks(t,a*0.6);const x=lerp(700,1000,seg(t,10,16));trio(t,x,a,0.5,'#d9e6e2');
    ghost(x+100,sy(x+100)-80,0.5,a*flashA(t,[11.2,12.5,13.8],0.15));ghost(x-210,sy(x-210)-80,0.5,a*flashA(t,[12.0,13.3],0.12));
    ghost(x+260,sy(x+260)-170,1.1,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,13.1,'约 36 小时不眠不休，走过冰川和雪岭');cap(t,13.2,15.1,'沙克尔顿后来写道："我总觉得我们是四个人，不是三个"','#d9e6e2');
    cap(t,15.2,T.foil,'另外两个人，也感觉到了"它"',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'不只是他们',PAPER,215,70);
    [[560,'登山者',16.4],[960,'极地探险家',17.0],[1360,'海难幸存者',17.6]].forEach(([x,s,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-160,420,320,300,CYAN,3,ca,'rgba(127,232,255,.05)');personStand(x-30,640,0.5,ca);ghost(x+50,560,0.35,ca*(0.4+0.3*Math.sin(t*5+x)));txt(s,x,680,40,PAPER,{a:ca,f:SANS,w:700});});
    cap(t,T.foil+.4,18.4,'许多身处绝境的人，都说身边出现过一个"看不见的同伴"');cap(t,18.5,T.hit,'人们叫它"第三人现象"——是守护天使，还是鬼？');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'"鬼"在实验室里被造出来了！',RED,215,86,{pop:1,fi:.02});
    personStand(820,800,0.9,a);ghost(620,630,0.9,a*(0.5+0.3*Math.sin(t*9))*seg(t,21.4,21.8));
    txt('2014 · 瑞士洛桑联邦理工',1340,520,36,PAPER,{f:SANS,w:700,a:a*seg(t,21.8,22.2)});txt('布兰克团队',1340,580,32,DIM,{f:SANS,w:500,a:a*seg(t,22.2,22.6)});
    cap(t,T.hit+.8,T.trace,'2014 年，瑞士科学家用一台机器人，让普通人"撞鬼"');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：机器人做了什么？',PAPER,215,64);robotRig(t,a,seg(t,28.4,28.8)*0.5);
    cap(t,T.trace+.4,28.2,'受试者蒙着眼，用手推动面前的机械臂');cap(t,28.3,T.reveal,'背后的机械臂会同步戳他的背——然后故意慢半拍');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('0.5 秒',540,430,150,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('慢半拍，"鬼"就来了',540,590,56,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,32)});
    const tx=1060,ty=480;line([[tx,ty],[1800,ty]],DIM,2,false,a*seg(t,32.2,32.5));line([[tx,ty+180],[1800,ty+180]],DIM,2,false,a*seg(t,32.2,32.5));
    txt('手在推',tx,ty-40,28,CYAN,{f:SANS,w:700,a:a*seg(t,32.2,32.5),al:'left'});txt('背被戳',tx,ty+140,28,RED,{f:SANS,w:700,a:a*seg(t,32.2,32.5),al:'left'});
    for(let k=0;k<3;k++){const x=tx+120+k*220;const ka=a*seg(t,32.6+k*.3,32.8+k*.3);circ(x,ty,12,null,0,ka,CYAN);circ(x+90,ty+180,12,null,0,ka,RED);line([[x,ty+14],[x+90,ty+166]],DIM,1.5,false,ka);}
    ghost(1790,800,0.5,a*seg(t,34.4,34.8)*(0.6+0.3*Math.sin(t*11)));
    cap(t,T.reveal+.6,34.4,'只要触感比动作晚了大约半秒');cap(t,34.5,T.eye,'很多人感觉背后站着一个人，有人甚至觉得有好几个');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'大脑把"自己"算成了"别人"',PAPER,215,66);
    brain(700,600,1.5,CYAN,a,0.3+0.3*Math.sin(t*4));circ(760,560,26,RED,3,a*seg(t,37.6,38),'rgba(255,60,60,.3)');
    personStand(1300,800,0.8,a*seg(t,38.4,38.8));ghost(1460,640,0.8,a*seg(t,39.4,39.8)*(0.6+0.25*Math.sin(t*9)));
    txt('自己的身体信号',1300,410,30,CYAN,{f:SANS,w:700,a:a*seg(t,38.4,38.8)});txt('→ 被当成"另一个人"',1460,460,30,RED,{f:SANS,w:700,a:a*seg(t,39.4,39.8)});
    cap(t,T.eye+.4,39.9,'大脑负责拼合"我的身体在哪"的区域一旦出错');cap(t,40,T.off,'极度疲劳、寒冷、缺氧时，就可能出现这种"同伴"（一种解释）');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'他们走到了捕鲸站',PAPER,215,66);glowDot(W/2,600,560,'rgba(255,200,120,.22)',a);
    peaks(t,a,WARM);trio(t,1500,a,0.5,WARM);hut2(1700,sy(1700),a);
    cap(t,T.off+.4,T.end,'最终，"坚忍号"的队员全部获救');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"同行者"，只是',760,400,96,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('大脑算错的自己',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：Shackleton《South》1919 · Blanke 等 2014《Current Biology》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你有过"身后有人"的感觉吗？｜评论区报案',GREEN);}
}
function hut2(x,y,a){line([[x-50,y],[x-50,y-60],[x,y-100],[x+50,y-60],[x+50,y]],WARM,3,true,a);glowDot(x,y-30,70,'rgba(255,200,120,.5)',a);}
function coverScene(){peaks(3,1);trio(3,1000,1);ghost(1190,sy(1190)-70,0.55,0.75);
  txt('三个人，却走出了四个',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('第四个是谁？',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1916',300,920,-1,0,GREEN,64,-0.1);}
