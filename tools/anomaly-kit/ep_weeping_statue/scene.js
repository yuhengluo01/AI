// CASE 055 圣像流血泪（1995.2 意大利奇维塔韦基亚，从默主歌耶买回的圣母像据称流血泪；约 60 人作证含主教 Grillo；血后被验出为男性血，主人 Fabio Gregori 拒绝 DNA 比对；Garlaschelli 1995《Chemistry in Britain》：空心多孔石膏/陶瓷像+不透水釉面，头顶小孔灌液，眼角刮出看不见的划痕即可"流泪"，为一种解释）
const EP={caseNo:'055',name:'流血泪的圣母像',sfx:{ghost:[11.4,12.9,14.4],stings:[12.8],blips:[25.8,26.6,32.4,33.2,34.0,34.8,38.0,39.4],whisper:[10,16]}};
const SX=960,SY=820;
// 圣母像线稿：(x,y)=底座底部中心
function madonna(x,y,s,a,c=CYAN,o={}){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(o.fill){ctx.save();ctx.globalAlpha*=a;ctx.fillStyle=o.fill;ctx.beginPath();ctx.moveTo(0,-430);ctx.bezierCurveTo(-70,-430,-80,-350,-75,-320);ctx.lineTo(-120,-60);ctx.lineTo(120,-60);ctx.lineTo(75,-320);ctx.bezierCurveTo(80,-350,70,-430,0,-430);ctx.fill();ctx.restore();}
  line([[-130,0],[130,0],[120,-60],[-120,-60],[-130,0]],c,3.5,true,a);
  line([[0,-430],[-60,-420],[-80,-350],[-75,-320],[-120,-60]],c,3.5,true,a);line([[0,-430],[60,-420],[80,-350],[75,-320],[120,-60]],c,3.5,true,a);
  ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=3.5;ctx.shadowColor=c;ctx.shadowBlur=14;ctx.beginPath();ctx.ellipse(0,-360,38,48,0,0,6.28);ctx.stroke();ctx.restore();
  line([[-38,-300],[0,-230],[38,-300]],c,2.5,true,a*0.8);line([[-20,-230],[0,-200],[20,-230]],c,2.5,true,a*0.8);
  line([[-50,-200],[-30,-80]],c,2,true,a*0.5);line([[50,-200],[30,-80]],c,2,true,a*0.5);
  // 闭着的眼
  line([[-22,-366],[-8,-362]],c,2.5,true,a);line([[8,-362],[22,-366]],c,2.5,true,a);
  if(o.hole){circ(0,-430,6,o.hole,2.5,a);}
  if(o.tears>0){const tr=o.tears;for(const ex of [-15,15]){const len=lerp(0,150,tr);line([[ex,-360],[ex+Math.sign(ex)*4,-360+len]],o.tc||RED,4,true,a*0.9);
      const q=(o.t*0.7+(ex>0?0.4:0))%1;circ(ex+Math.sign(ex)*4,-360+len+q*80*tr,5,null,0,a*(1-q)*tr,o.tc||RED);}}
  ctx.restore();}
function shrine(x,y,a,c=CYAN){line([[x-200,y],[x-200,y-480],[x-120,y-560],[x+120,y-560],[x+200,y-480],[x+200,y]],c,3,true,a*0.6);line([[x-260,y],[x+260,y]],c,3,true,a*0.8);}
function crowd(a,n=7,c=PAPER){for(let i=0;i<n;i++){const x=i<n/2?260+i*110:1400+(i-n/2)*110;personStand(x,SY,0.7,a*(0.6+0.4*((i*37)%5)/5),c);}}
// 剖面图
function section(cx,cy,a,t0,t){if(a<=0)return;const s1=seg(t,t0,t0+.5),s2=seg(t,t0+1.2,t0+1.7),s3=seg(t,t0+2.4,t0+2.9),s4=seg(t,t0+3.4,t0+3.9);
  ctx.save();ctx.translate(cx,cy);
  // 外壳（釉面）
  ctx.save();ctx.globalAlpha*=a*s1;ctx.strokeStyle=CYAN;ctx.lineWidth=10;ctx.shadowColor=CYAN;ctx.shadowBlur=18;ctx.beginPath();ctx.ellipse(0,-140,95,120,0,0,6.28);ctx.stroke();
  ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-90,-60);ctx.lineTo(-150,260);ctx.lineTo(150,260);ctx.lineTo(90,-60);ctx.stroke();ctx.restore();
  // 多孔石膏层
  const r=rng(3);ctx.save();ctx.globalAlpha*=a*s1*0.7;ctx.fillStyle=PAPER;for(let i=0;i<120;i++){const an=r()*6.28,rr=0.82+r()*0.12;ctx.beginPath();ctx.arc(Math.cos(an)*95*rr,-140+Math.sin(an)*120*rr,2,0,6.28);ctx.fill();}ctx.restore();
  // 液体填满
  if(s2>0){ctx.save();ctx.globalAlpha*=a*0.45;ctx.fillStyle=RED;const lv=lerp(260,-210,eOut(s2));ctx.beginPath();ctx.rect(-150,lv,300,520);ctx.clip();ctx.beginPath();ctx.ellipse(0,-140,80,105,0,0,6.28);ctx.fill();ctx.beginPath();ctx.moveTo(-80,-60);ctx.lineTo(-138,250);ctx.lineTo(138,250);ctx.lineTo(80,-60);ctx.fill();ctx.restore();
    line([[0,-330],[0,-262]],RED,4,true,a*(1-s2*0.6));}
  // 小孔
  circ(0,-262,8,GREEN,3,a*s2);
  // 眼角划痕
  for(const ex of [-36,36]){line([[ex-10,-150],[ex+10,-144]],GREEN,3,true,a*s3);if(s4>0){const len=90*s4;line([[ex+(ex>0?8:-8),-140],[ex+(ex>0?10:-10),-140+len]],RED,5,true,a);}}
  ctx.restore();
  txt('头顶小孔：偷偷灌入液体',cx+260,cy-262,34,GREEN,{f:SANS,w:700,al:'left',a:a*s2});
  txt('空心多孔石膏：吸饱液体',cx+260,cy-60,34,PAPER,{f:SANS,w:700,al:'left',a:a*s1});
  txt('不透水釉面：把液体封住',cx+260,cy+40,34,CYAN,{f:SANS,w:700,al:'left',a:a*s1});
  txt('眼角划痕：肉眼看不见',cx+260,cy-150,34,RED,{f:SANS,w:700,al:'left',a:a*s3});
}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'圣母像流下了血泪',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'一尊石膏像的眼角，渗出一道道暗红色的液体');
    glowDot(SX,560,300,'rgba(255,40,40,.12)',a);madonna(SX,SY+40,1.0,a,CYAN,{tears:seg(t,1,4),t});
    ghost(1450,600,0.9,a*flashA(t,[1.7,2.8,3.6],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1995 年 2 月 · 意大利 · 奇维塔韦基亚',PAPER,215,58);
    shrine(SX,SY,a*seg(t,4.8,5.3));madonna(SX,SY,0.95,a*seg(t,5,5.5),CYAN,{tears:seg(t,8.2,9.6),t});
    personStand(560,SY,0.9,a*seg(t,5.4,5.8));personStand(470,SY,0.65,a*seg(t,5.6,6));
    cap(t,T.lab+.4,7.4,'一户人家从朝圣地带回一尊圣母像');cap(t,7.4,T.night+.2,'放进自家花园，没多久，它开始"流泪"');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    glowDot(SX,520,260,'rgba(255,30,30,.16)',a);madonna(SX,SY,1.05,a,'rgb(150,200,210)',{tears:1,t});
    crowd(a*seg(t,12.6,13.4));
    ghost(1500,560,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.4,12.9,14.4],0.14));ghost(SX,450,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.6,'暗红色的"泪"顺着脸颊，一道一道往下流');cap(t,12.7,15.1,'约 60 人作证亲眼看见，其中包括当地主教','#d9e6e2');
    cap(t,15.2,T.foil,'一尊石膏像，怎么会流"血"？',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'化验：红色的泪是什么？',PAPER,215,66);
    const p=seg(t,16.4,16.9);line([[900,420],[900,780],[920,800],[1000,800],[1020,780],[1020,420]],CYAN,4,true,a*p);
    ctx.save();ctx.globalAlpha=a*p*0.55;ctx.fillStyle=RED;ctx.fillRect(904,lerp(780,620,seg(t,17,18.5)),112,lerp(0,160,seg(t,17,18.5)));ctx.restore();
    for(let i=0;i<5;i++){const q=(t*0.6+i/5)%1;circ(960+Math.sin(i*2)*30,780-q*160,6,RED,2,a*seg(t,17,18)*(1-q));}
    cap(t,T.foil+.4,18.4,'人们刮下"血泪"，送去实验室化验');cap(t,18.5,T.hit,'结果出来，所有人都愣住了……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'是人血，而且是男人的！',RED,215,96,{pop:1,fi:.02});
    txt('XY',700,600,240,RED,{f:MONO,a,glow:'rgba(255,60,60,.8)',blur:50,sc:1+0.04*Math.sin(t*9)});
    txt('男性',700,770,54,PAPER,{f:SANS,w:900,a});
    rect(1080,470,560,260,RED,4,a*seg(t,23.4,23.8),'rgba(255,40,40,.06)');txt('DNA 比对',1360,550,60,RED,{f:SANS,w:900,a:a*seg(t,23.4,23.8)});txt('雕像主人：拒绝',1360,650,46,PAPER,{f:SANS,w:700,a:a*seg(t,23.6,24)});
    cap(t,T.hit+.8,23.4,'化验显示：那是真的人血，来自一名男性');cap(t,23.4,T.trace,'可雕像的主人，拒绝做 DNA 比对');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：怎样让雕像"哭"？',PAPER,215,64);
    madonna(560,840,0.9,a,CYAN,{tears:seg(t,28.5,30),t,tc:GREEN});
    personStand(1300,820,1.1,a*seg(t,25.6,26));line([[1350,700],[1420,660]],PAPER,3,true,a*seg(t,25.6,26));
    txt('L. Garlaschelli',1500,520,40,GREEN,{f:MONO,a:a*seg(t,25.8,26.2)});txt('帕维亚大学 · 化学家',1500,580,32,PAPER,{f:SANS,w:500,a:a*seg(t,26.6,27)});
    cap(t,T.trace+.4,28.1,'同一年，意大利化学家加拉斯凯利站出来');cap(t,28.2,T.reveal,'他说：会哭的雕像，我自己就能做');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('空心 + 划痕',860,225,110,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('（一种解释）',1270,240,32,DIM,{f:SANS,w:500,a:a*seg(t,31.6,32)});
    section(620,640,a,31.4,t);
    cap(t,T.reveal+.6,34.4,'空心石膏像吸饱液体，釉面把它封在里面');cap(t,34.5,T.eye,'在眼角刮出看不见的划痕，"泪"就流出来了');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么没人看穿？',PAPER,215,64);
    [['不留痕迹','眼后空腔很小，流完几乎看不出',640,37.3],['更简单的','直接抹上血或油',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,72,WARM,{a:ca});txt(s,x,630,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'化学家说，他这样做出的"哭像"骗过了所有围观者');cap(t,40,T.off,'这尊圣母像究竟怎么流泪，至今没有公认结论');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'"神迹"，在实验室里可以复制',PAPER,215,64);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    shrine(SX,SY,a,WARM);madonna(SX,SY,0.95,a,WARM);
    cap(t,T.off+.4,T.end,'眼泪能被复制，奇迹就需要更多证据');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"神迹"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是一道看不见的划痕',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：Garlaschelli《Chemistry in Britain》1995 · Skeptic\'s Dictionary · Wikipedia: Weeping statue',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你见过会哭的雕像吗？评论区报案',GREEN);}
}
function coverScene(){shrine(1380,960,0.8);glowDot(1380,560,320,'rgba(255,40,40,.18)',1);madonna(1380,960,1.15,1,CYAN,{tears:1,t:0.3});ghost(1760,620,0.8,0.55);
  txt('圣母像流下血泪',640,330,112,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('化验结果：是男人的血',640,480,72,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1995',360,800,-1,0,GREEN,64,-0.1);}
