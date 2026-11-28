// CASE 063 幻肢痛（美国内战后医生 Silas Weir Mitchell 照看大批截肢者，1871 年提出"幻肢"一词；多达约 80% 截肢者经历幻肢痛；1990 年代 Ramachandran：碰截肢者脸颊，"幻手"有感觉——大脑皮层身体地图里手区挨着脸区，手区失去输入后被邻区"占领"，重组为一种解释；Ramachandran & Rogers-Ramachandran 1996《Proc R Soc B》镜箱：部分患者疼痛缓解）
const EP={caseNo:'063',name:'失去的手还在痛',sfx:{ghost:[11.4,13.0,14.5],stings:[12.9],blips:[22.0,26.2,27.8,32.2,34.4,38.0,39.6],whisper:[10,16]}};
function hand(x,y,s,ang,curl,a,c=PAPER){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.scale(s,s);
  line([[-40,0],[-48,-90],[48,-90],[40,0]],c,4,true,a);
  const F=[[-40,-90,60,-0.35],[-14,-90,80,-0.08],[12,-90,86,0.05],[36,-90,72,0.2]];
  for(const [fx,fy,L,da] of F){const k=curl;const p1=[fx+Math.sin(da)*L*0.5,fy-Math.cos(da)*L*0.5*(1-k*0.6)];const p2=[p1[0]+Math.sin(da+k*2.2)*L*0.5,p1[1]-Math.cos(da+k*2.2)*L*0.5];line([[fx,fy],p1,p2],c,4,true,a);}
  line([[48,-30],[80,-60+curl*10],[lerp(100,60,curl),lerp(-90,-70,curl)]],c,4,true,a);ctx.restore();}
// 鬼手：模糊发光的半透明手
function ghostHand(x,y,s,ang,curl,a,col='rgba(190,205,205,'){if(a<=0)return;ctx.save();ctx.filter='blur(3px)';hand(x,y,s,ang,curl,a*0.8,col+'0.9)');ctx.filter='none';ctx.restore();glowDot(x,y-90*s,120*s,col+'0.25)',a);}
// 只有右臂的人（左臂截肢，残端短线）
function amputee(x,y,s,a,c=PAPER){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  headAt(0,-170,26,c,a);line([[0,-144],[0,-60]],c,4,true,a);line([[0,-125],[38,-100],[52,-62]],c,3.5,true,a);line([[0,-125],[-22,-112]],c,3.5,true,a);
  line([[-26,0],[0,-60],[26,0]],c,3.5,true,a);ctx.restore();}
// 鬼手臂：从 amputee(x,y,s) 的残端接出半透明前臂+手
function ghostArm(x,y,s,curl,a){if(a<=0)return;const sx=x-22*s,sy=y-112*s,wx=sx-30*s,wy=sy+62*s;
  ctx.save();ctx.filter='blur(2px)';line([[sx,sy],[wx,wy]],'rgba(190,205,205,.85)',4*s/1.6,true,a*0.8);ctx.filter='none';ctx.restore();
  ghostHand(wx,wy,0.5*s,Math.PI+0.45,curl,a);glowDot(wx-10*s,wy+40*s,60*s,"rgba(255,50,50,.35)",a);}
// 身体地图条带
function cortexMap(cx,cy,a,hl=0,invade=0){const parts=[['腿',0],['躯干',0],['手臂',0],['手',1],['脸',2],['嘴唇',0]];const w=190;
  parts.forEach(([n,k],i)=>{const x=cx+(i-2.5)*w;const ca=a*seg(hl,i*0.12,i*0.12+0.3);
    const col=k===1?RED:k===2?WARM:CYAN;rect(x-w/2+6,cy-70,w-12,140,col,3,ca,k===1?`rgba(255,59,59,${0.06+invade*0.25})`:'rgba(127,232,255,.04)');txt(n,x,cy,44,col,{f:SANS,w:700,a:ca});});
  if(invade>0){const x0=cx+1.5*w,x1=cx+0.5*w;for(let k=0;k<3;k++){const q=(invade*1.5+k/3)%1;line([[lerp(x0,x1,q)+30,cy+100],[lerp(x0,x1,q),cy+100]],WARM,5,true,a*invade);}
    txt('脸的信号 → 搬进手区',cx+w,cy+160,36,WARM,{f:SANS,w:700,a:a*invade});}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'失去的手，还在痛',PAPER,215,94,{pop:1});sub(t,.9,T.lab,'手臂早就截掉了，半夜却疼得像被攥碎');
    amputee(900,860,1.9,a);ghostArm(900,860,1.9,0.3+0.6*seg(t,1.5,4),a*(0.4+0.6*flashA(t,[1.6,2.4,3.2,3.8],0.2)));
    ghost(1480,620,0.85,a*flashA(t,[1.8,2.9,3.7],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1860 年代 · 美国内战 · 截肢病房',PAPER,215,60);
    for(let i=0;i<3;i++){bed(520+i*420,780,320,a*seg(t,4.7+i*.2,5.1+i*.2));personLie(520+i*420,750,0.8,a*seg(t,4.9+i*.2,5.3+i*.2),'rgb(200,210,205)');}
    personStand(1580,860,1.0,a*seg(t,5.6,6),CYAN);txt('米切尔医生',1580,600,34,CYAN,{f:SANS,w:700,a:a*seg(t,5.8,6.2)});
    cap(t,T.lab+.4,7.4,'美国内战后，医生米切尔照看了大批截肢伤员');cap(t,7.4,T.night+.2,'很多人坚称：已经不存在的手脚，还能感觉到');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    bed(960,800,560,a*0.7);personLie(960,770,1.2,a,'rgb(170,190,190)',seg(t,10.6,11));
    const curl=seg(t,12.7,14.5);ghostHand(1100,700,1.1,0.3,curl,a*(0.35+0.65*flashA(t,[11.0,11.9,12.9,13.6,14.4,15.2],0.25)));
    ghost(lerp(1600,500,seg(t,11,15)),560,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.4,13.0,14.5],0.14));
    ghost(960,500,1.5,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.6,'有人半夜醒来，想用那只手去抓东西');cap(t,12.7,15.1,'有人觉得它被死死攥成拳头，怎么也松不开','#d9e6e2');
    cap(t,15.2,T.foil,'1871 年，米切尔给这只"鬼手"起了名：幻肢',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'手的鬼魂？',PAPER,215,76);
    amputee(960,860,1.6,a*seg(t,16.3,16.7));ghostArm(960,860,1.6,0.6,a*seg(t,17,17.6)*(0.6+0.4*Math.sin(t*6)));
    ghost(1300,640,1.1,a*seg(t,18.3,19)*0.45);
    cap(t,T.foil+.4,18.4,'手明明已经不在了，痛感却留了下来');cap(t,18.5,T.hit,'难道身体也有一个看不见的"魂"？');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'碰他的脸，"鬼手"就有感觉！',RED,215,90,{pop:1,fi:.02});
    headAt(760,560,90,PAPER,a);line([[760,650],[760,860]],PAPER,4,true,a);
    const tp=seg(t,22,22.8);line([[1000,470],[lerp(1000,860,tp),lerp(470,560,tp)]],CYAN,5,true,a);circ(lerp(1000,860,tp),lerp(470,560,tp),9,CYAN,3,a,'rgba(127,232,255,.6)');
    ghostHand(1300,760,1.3,0.2,0.1,a*seg(t,22.8,23.2));if(t>22.8)glowDot(1310,600,90,'rgba(255,207,122,.5)',a*(0.6+0.4*Math.sin(t*10)));
    txt('棉签',1060,440,32,CYAN,{f:SANS,w:700,a:a*seg(t,22,22.3)});
    cap(t,T.hit+.8,23.4,'1990 年代，神经科学家拉马钱德兰做了个实验');cap(t,23.4,T.trace,'用棉签碰病人的脸颊，他却说：我的手指被碰了');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：大脑里有张"身体地图"',PAPER,215,64);
    brain(960,520,1.1,CYAN,a*seg(t,25.3,25.7)*0.5);
    cortexMap(960,640,a,seg(t,25.6,27.2),seg(t,28.3,29.8));
    cap(t,T.trace+.4,27.5,'大脑皮层里，有一张对应全身的"地图"');cap(t,27.6,T.reveal,'地图上，"手"的区域正好挨着"脸"');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('约 80%',W/2,420,200,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('的截肢者，会经历幻肢痛',W/2,610,56,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,31.9)});
    txt('手区没了输入，被旁边脸区的信号"占领"（一种解释）',W/2,740,40,CYAN,{f:SANS,w:700,a:a*seg(t,34.3,34.7)});
    cap(t,T.reveal+.6,34.2,'多达约 80% 的截肢者，都经历过幻肢痛');cap(t,34.3,T.eye,'手被截掉后，大脑里的手区并没有消失');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么会痛？',PAPER,215,64);
    [['还在发命令','"握拳"却等不到回应',640,37.3],['地图错乱','交叉的信号被读成疼痛',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,66,WARM,{a:ca});txt(s,x,630,34,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'大脑还在给那只手发命令，却永远收不到回应');cap(t,40,T.off,'这种错乱，可能被大脑读成了疼痛（一种解释）');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'一面镜子，骗过大脑',PAPER,215,66);glowDot(W/2,660,560,'rgba(255,200,120,.22)',a);
    rect(700,560,520,260,WARM,3,a*seg(t,42.2,42.5));line([[960,540],[960,840]],WARM,6,true,a*seg(t,42.4,42.7));
    hand(1090,800,1.1,0,0.2,a*seg(t,42.5,42.8),WARM);hand(830,800,1.1,0,0.2,a*seg(t,42.8,43.2)*0.7,'rgba(255,207,122,.7)');
    cap(t,T.off+.4,T.end,'镜箱：好手的倒影"变成"失去的手，有人疼痛缓解');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"鬼手"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是大脑还没更新地图',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：Mitchell 1871 · Ramachandran & Rogers-Ramachandran 1996《Proc R Soc B》· 幻肢痛综述（PMC）',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你有过身体"不听使唤"的怪感觉吗？评论区报案',GREEN);}
}
function coverScene(){amputee(1440,940,2.0,1);ghostArm(1440,940,2.0,0.8,1);glowDot(1300,640,260,'rgba(255,40,40,.12)',1);ghost(1780,620,0.75,0.45);
  txt('截掉的手还在痛',620,320,108,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('碰一下脸，它就有感觉',620,470,74,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('80%',330,850,-1,0,GREEN,70,-0.1);}
