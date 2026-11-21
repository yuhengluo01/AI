// CASE 022 鬼压床（Sharpless & Barber 2011, Sleep Med Rev）
const EP={caseNo:'022',name:'床边的人影',sfx:{ghost:[11.2,12.4],stings:[],blips:[33.6,34.6,38.6,39.6],whisper:[10,16.5]}};
const X0=460,X1=1460,TOP=340,FL=860,BX=900,BY=760;
function bedroom(t,a,o={}){if(a<=0)return;const c=o.col||CYAN;roomBox(X0,X1,TOP,FL,a,c);
  rect(540,420,140,170,c,2.5,a*0.8,o.moon?`rgba(150,200,255,${0.12*o.moon})`:null);line([[610,420],[610,590]],c,1.5,false,a*0.6);line([[540,505],[680,505]],c,1.5,false,a*0.6);
  line([[1330,FL],[1330,FL-300],[1430,FL-300],[1430,FL]],c,2.5,true,a*0.7);
  bed(BX,BY,420,a,c);line([[BX-210,BY+60],[BX-210,FL]],c,3,true,a);line([[BX+210,BY+60],[BX+210,FL]],c,3,true,a);
  // 床头柜+闹钟
  rect(1170,BY-10,90,110,c,2.5,a*0.7);txt('03:14',1215,BY-40,30,RED,{f:MONO,a:a*(o.clock??1),glow:'rgba(255,60,60,.6)'});}
function sleeper(t,a,eyes=0){personLie(BX+20,BY-30,1,a,PAPER,eyes);}
function lock(x,y,a,c=RED){if(a<=0)return;rect(x-14,y-6,28,22,c,2.5,a,'rgba(255,60,60,.2)');ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y-6,9,Math.PI,0);ctx.stroke();ctx.restore();}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'半夜醒来，动不了',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'而床边，还站着一个人');
    bedroom(t,a,{moon:1});sleeper(t,a,1);ghost(1100,690,0.85,a*(flashA(t,[1.3,1.8,3.1],0.12)+0.35*win(t,2.3,4.2,.3,.3)));
    stamp('未解之谜',1640,700,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'全世界都有它的传说',PAPER,215,64);
    const cards=[[620,'中国','"鬼压床"',5.0],[960,'欧洲','"梦魇"',5.6],[1300,'民间说法','"被附身"',6.2]];
    for(const [x,l,v,t0] of cards){const ca=a*seg(t,t0,t0+.4);rect(x-140,420,280,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(l,x,490,40,DIM,{f:SANS,w:500,a:ca});txt(v,x,610,58,PAPER,{a:ca,glow:'rgba(127,232,255,.5)'});ghost(x,690,0.35,ca*0.4);}
    cap(t,T.lab+.4,7.4,'中国叫它"鬼压床"，欧洲叫它"梦魇"');cap(t,7.4,T.night+.2,'几百年来，无数人说自己被"压"过');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    bedroom(t,a*0.6,{moon:0.6});sleeper(t,a,1);
    for(const [x,y,t0] of [[BX-30,BY-40,10.6],[BX+90,BY-36,10.9],[BX+150,BY-34,11.2]])lock(x,y-24,a*seg(t,t0,t0+.2));
    const gx=lerp(1380,1100,seg(t,11.5,13.2));ghost(gx,690,0.85,a*(win(t,11.2,13.4,.6,.2)*(0.6+0.3*Math.sin(t*17))));
    // 压在胸口
    const ca=a*win(t,13.2,15.2,.4,.1);ghost(BX-40,610,0.6,ca*(0.6+0.3*Math.sin(t*13)),'150,150,160');
    // 床边特写
    const fa=a*win(t,15.2,16.1,.03,.4);ghost(1080,640,1.25,fa);
    cap(t,T.night+.3,13.1,'意识清醒，眼睛睁着，身体却一动不动');cap(t,13.2,15.1,'胸口越来越重，好像有东西坐了上来……','#d9e6e2');
    cap(t,15.2,T.foil,'它就站在床边，盯着你',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'几十秒后，一切突然消失',PAPER,215,64);bedroom(t,a,{moon:1});sleeper(t,a,1);
    txt('?',1100,560,180,GREEN,{f:SERIF,a:a*seg(t,18.4,18.9)*(0.7+0.3*Math.sin(t*5)),glow:'rgba(109,255,192,.6)'});
    cap(t,T.foil+.4,18.4,'醒来后身体恢复正常，像什么都没发生过');cap(t,18.4,T.hit,'那刚才，到底是什么？');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'睡眠瘫痪',RED,215,110,{pop:1,fi:.02});txt('Sleep Paralysis',W/2,320,40,PAPER,{f:MONO,a:a*seg(t,21.4,21.8)});
    bedroom(t,a*0.8,{moon:1});sleeper(t,a,1);
    cap(t,T.hit+.8,T.trace,'这是一种有正式名字的睡眠现象');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'做梦时，身体会被"上锁"',PAPER,215,64);
    const gx0=420,gx1=1620,lv=[['清醒',400],['REM 做梦',500],['浅睡',620],['深睡',760]];
    for(const [l,y] of lv){txt(l,gx0-20,y,30,l.startsWith('REM')?RED:DIM,{f:SANS,w:700,al:'right',a});line([[gx0,y],[gx1,y]],'rgba(127,232,255,.15)',1,false,a);}
    const path=[[0,0],[.04,2],[.1,3],[.16,2],[.2,1],[.24,2],[.32,3],[.38,2],[.42,1],[.48,2],[.55,3],[.6,2],[.65,1],[.72,2],[.78,2],[.84,1],[.92,1],[.96,0],[1,0]];
    const pr=seg(t,25.3,28);const pts=[];for(let i=0;i<path.length-1;i++){const [u0,l0]=path[i],[u1]=path[i+1];if(u0>pr)break;const y=lv[l0][1];pts.push([gx0+u0*(gx1-gx0),y],[gx0+Math.min(u1,pr)*(gx1-gx0),y]);
      if(l0==1){const ra=a*seg(t,28.3,28.7);rect(gx0+u0*(gx1-gx0),470,(Math.min(u1,pr)-u0)*(gx1-gx0),60,RED,2,ra,'rgba(255,60,60,.25)');for(let k=0;k<1;k++)lock(gx0+(u0+u1)/2*(gx1-gx0),445,ra);}}
    line(pts,CYAN,4,true,a);txt('入睡',gx0,820,26,DIM,{f:SANS,w:500,a});txt('天亮',gx1,820,26,DIM,{f:SANS,w:500,a});
    cap(t,T.trace+.4,28.2,'REM 期，是一夜里做梦最多的阶段');cap(t,28.3,T.reveal,'这时大脑会让全身肌肉"断电"，防止你跟着梦乱动');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('28.3%',620,500,200,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('的学生，至少经历过一次',620,680,48,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,32)});
    bar(1300,470,420,56,0.076/0.32,'普通人群','7.6%',33.6,t,CYAN);bar(1300,580,420,56,0.283/0.32,'学生','28.3%',34.6,t,RED);
    txt('一生中至少一次',1500,700,28,DIM,{f:SANS,w:500,a:a*seg(t,34.6,35)});
    cap(t,T.reveal+.6,34.5,'大学生里，超过四分之一的人遇到过');cap(t,34.6,T.eye,'普通人群里，大约是 7.6%');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'大脑醒了，身体还没醒',PAPER,215,66);
    brain(640,560,1.3,GREEN,a,0.7+0.2*Math.sin(t*5));txt('大脑：已清醒',640,760,40,GREEN,{f:SANS,w:700,a:a*seg(t,38.6,39)});
    personStand(1280,780,1.6,a,'#9fb0ac');for(const [x,y] of [[1280,560],[1240,700],[1320,700]])lock(x,y,a*seg(t,39.6,40));txt('身体：仍在"上锁"',1280,830,40,RED,{f:SANS,w:700,a:a*seg(t,39.6,40)});
    ghost(1480,640,0.6,a*seg(t,40.4,41)*0.6);
    cap(t,T.eye+.4,39.9,'大脑先醒了，身体的"锁"却还没解开');cap(t,40,T.off,'梦还没退场，就变成了床边的人影和胸口的重压');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);const w=seg(t,42.3,43.3);
    title(t,T.off,T.end+.2,'作息规律，它就很少来',PAPER,215,66);bedroom(t,a,{moon:1,clock:0});sleeper(t,a,0);
    ctx.save();ctx.globalAlpha=a*w*0.2;const g=ctx.createRadialGradient(BX,BY,0,BX,BY,700);g.addColorStop(0,'rgba(255,230,180,1)');g.addColorStop(1,'rgba(255,230,180,0)');ctx.fillStyle=g;ctx.fillRect(0,300,W,700);ctx.restore();
    txt('Zz',BX-170,BY-120,60,GREEN,{f:SERIF,a:a*w});
    cap(t,T.off+.4,T.end,'熬夜、压力大、作息乱，更容易被"压"');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('压在你身上的"鬼"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('是还没醒透的大脑',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：Sharpless & Barber, 2011 · Sleep Medicine Reviews',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你被"压"过吗？评论区报案',GREEN);}
}
function coverScene(){bedroom(20,1,{moon:1});sleeper(20,1,1);ghost(BX-40,600,0.65,0.7,'150,150,160');ghost(1100,690,0.9,0.85);
  txt('半夜醒来动不了？',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('床边站着',1690,520,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});txt('的是谁？',1690,600,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('28.3%',1650,760,-1,0,GREEN,64,-0.1);}
