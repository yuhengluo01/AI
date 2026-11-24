// CASE 043 马法之光（得州马法镇外；传说 1883 年牛仔 Robert Reed Ellison 首见；2004 年 5 月 UT Dallas 物理学会 4 晚观测：全部归因于 US 67 车灯；2008 Texas State 20 晚光谱：车灯或小火；海市蜃楼为一种解释；少数目击至今无公认解释）
const EP={caseNo:'043',name:'荒原鬼光',sfx:{ghost:[11.6,14.3],stings:[12.4],blips:[22.4,26.2,27.4,33.0,34.0,38.6],whisper:[10,16]}};
const HZ=560;
function desert(t,a,c=CYAN){if(a<=0)return;
  line([[90,HZ],[240,500],[380,520],[520,450],[700,500],[860,470],[1040,420],[1220,480],[1400,440],[1600,500],[1830,HZ]],'rgba(127,232,255,.35)',2,false,a);
  line([[90,HZ],[1830,HZ]],c,2.5,true,a*0.8);const r=rng(5);
  for(let i=0;i<26;i++){const x=120+r()*1680,y=HZ+40+r()*300;line([[x,y],[x-8,y-14]],c,1.5,false,a*0.3);line([[x,y],[x+8,y-16]],c,1.5,false,a*0.3);line([[x,y],[x,y-18]],c,1.5,false,a*0.3);}}
function platform(a,c=CYAN){if(a<=0)return;line([[150,880],[150,760],[420,760],[420,880]],c,3,true,a);line([[130,760],[440,760]],c,4,true,a);line([[150,700],[420,700]],c,2.5,true,a*0.7);line([[150,700],[150,760]],c,2,false,a*0.6);line([[420,700],[420,760]],c,2,false,a*0.6);
  txt('观景台',285,830,30,c,{f:SANS,w:700,a});}
function orb(x,y,a,col='255,210,140',s=1){if(a<=0)return;glowDot(x,y,60*s,`rgba(${col},.45)`,a);circ(x,y,8*s,null,0,a,`rgba(${col},1)`);}
function orbs(t,a,o={}){if(a<=0)return;const base=[[700,HZ-20],[1000,HZ-30],[1300,HZ-18]];
  base.forEach(([x,y],i)=>{const bl=0.5+0.5*Math.sin(t*(2+i*0.7)+i*2);const dy=Math.sin(t*0.9+i)*14;const split=o.split?seg(t,o.split+i*0.4,o.split+i*0.4+1)*60:0;
    const vis=bl>0.25?1:0.15;orb(x+Math.sin(t*0.5+i)*30-split,y+dy-30,a*vis,'255,210,140',1.9);if(split>0)orb(x+Math.sin(t*0.5+i)*30+split,y+dy-30,a*vis*0.8,'255,210,140',1.9);});}
function road(t,a,o={}){if(a<=0)return;line([[1830,HZ+6],[300,HZ+6]],o.col||WARM,3,true,a);txt('US 67',1600,HZ+40,30,o.col||WARM,{f:MONO,a});
  for(let k=0;k<3;k++){const q=((t*0.12)+k/3)%1;const x=lerp(1800,320,q);orb(x,HZ,a*(o.cars??1),'255,230,180',0.8);}}
function car(x,y,a,flash,c=PAPER){line([[x-60,y],[x+60,y],[x+50,y-30],[x-30,y-30],[x-60,y]],c,3,true,a);circ(x-35,y+8,10,c,2.5,a);circ(x+35,y+8,10,c,2.5,a);if(flash)orb(x+64,y-10,a,'255,240,200',1.3);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'得州荒原，夜空飘着鬼光',PAPER,215,82,{pop:1});sub(t,.9,T.lab,'它们会分裂、会合体，追近就消失');
    desert(t,a);orbs(t,a*seg(t,0.8,1.4));ghost(1560,680,0.7,a*flashA(t,[2.3,3.4],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'美国得克萨斯 · 马法镇外',PAPER,215,64);desert(t,a);platform(a*seg(t,5,5.4));orbs(t,a*seg(t,6,6.6));
    txt('1883 年',1500,720,60,WARM,{f:MONO,a:a*seg(t,7.4,7.8)});
    cap(t,T.lab+.4,7.4,'得州西部的荒原上，夜里常飘起一团团光');cap(t,7.4,T.night+.2,'传说 1883 年，一个牛仔赶牛时第一次看见了它');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    desert(t,a*0.5);orbs(t,a*seg(t,10.4,11),{split:12.6});
    ghost(1500,690,0.8,a*flashA(t,[11.6,14.3],0.13));ghost(460,640,1.1,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'深夜，地平线上亮起几个光点……');cap(t,12.6,15.1,'忽明忽暗，一分为二，又突然熄灭','#d9e6e2');
    cap(t,15.2,T.foil,'当地传说：那是亡灵提着灯，在荒原上游荡',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'谁在荒原上提灯？',PAPER,215,70);desert(t,a*0.6);platform(a);orbs(t,a);
    txt('?',1000,400,110,RED,{f:SERIF,a:a*(0.5+0.5*Math.sin(t*4)),glow:'rgba(255,60,60,.6)'});
    cap(t,T.foil+.4,18.4,'有人开车去追，光却总在前方，怎么也追不上');cap(t,18.5,T.hit,'镇上还专门建了观景台，每年都有人来蹲守');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'2004 年：物理学生来抓"鬼"',RED,215,86,{pop:1,fi:.02});desert(t,a*0.5);platform(a);
    [[600,'摄像机'],[960,'车流计数器'],[1320,'追踪车']].forEach(([x,s],i)=>{const ca=a*seg(t,21.6+i*.4,22+i*.4);rect(x-150,400,300,110,CYAN,3,ca,'rgba(127,232,255,.05)');txt(s,x,455,40,PAPER,{f:SANS,w:700,a:ca});});
    cap(t,T.hit+.8,T.trace,'德州大学达拉斯分校的物理学生，在观景台蹲了 4 个晚上');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：鬼光背后，有一条公路',PAPER,215,64);desert(t,a*0.6);platform(a);road(t,a*seg(t,25.6,26.2));
    line([[420,740],[1000,HZ+10]],GREEN,2,false,a*seg(t,26.4,26.8)*0.7);txt('视线',700,690,30,GREEN,{f:SANS,w:700,a:a*seg(t,26.6,27)});
    cap(t,T.trace+.4,28.1,'从观景台望去，远处正好能看到 67 号公路');cap(t,28.2,T.reveal,'光点出现的次数，和公路上的车流对得上');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('鬼光 = 车灯',W/2,400,150,RED,{f:SANS,w:900,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    car(700,640,a*seg(t,32.4,32.8),Math.floor(t*3)%2==0&&t>32.8);line([[800,630],[1180,630]],GREEN,2,false,a*seg(t,33,33.4)*0.6);orb(1300,630,a*seg(t,33,33.4)*(Math.floor(t*3)%2==0?1:0.1));
    txt('同伴在公路上闪灯',700,740,34,PAPER,{f:SANS,w:700,a:a*seg(t,32.6,33)});txt('观景台看到"鬼光"',1300,740,34,WARM,{f:SANS,w:700,a:a*seg(t,33.2,33.6)});
    cap(t,T.reveal+.6,34.4,'同伴在公路上闪车灯，观景台这边就看到了"鬼光"');cap(t,34.5,T.eye,'4 晚看到的光，都被归到了这条公路的车灯');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么车灯会像鬼？',PAPER,215,64);
    [['没参照','漆黑荒原，看不出远近',640,37.3],['空气透镜','冷热空气分层，光会抖、会裂',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-280,400,560,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,72,WARM,{a:ca});txt(s,x,630,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'夜里一片漆黑，没有参照物，大脑判断不出距离');cap(t,40,T.off,'一种解释：冷热空气分层像透镜，让光点抖动、分裂');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'大多数"鬼光"，只是远方的车',PAPER,215,64);desert(t,a,WARM);road(t,a,{col:WARM});platform(a,WARM);
    cap(t,T.off+.4,T.end,'不过仍有少数目击，至今没有公认解释');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些荒原"鬼光"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是远方公路的车灯',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：UT Dallas 物理学会 2004 年观测 · 德州州立大学 2008 年光谱研究',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你夜里见过说不清的光吗？｜评论区报案',GREEN);}
}
function coverScene(){desert(3,1);orbs(3.3,1,{split:2});platform(1);ghost(1560,700,0.75,0.55);
  txt('得州荒原，夜夜飘着鬼光',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('追了 100 多年，一追就消失？',W/2,318,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1883',1640,950,-1,0,GREEN,64,-0.1);}
