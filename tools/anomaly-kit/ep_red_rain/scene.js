// CASE 031 喀拉拉血雨（2001.7.25–9.23 印度喀拉拉邦；主流解释：橘色藻 Trentepohlia 孢子）
const EP={caseNo:'031',name:'血雨',sfx:{ghost:[11.5,12.9],stings:[],blips:[26.0,27.0,28.4,33.4,34.4],whisper:[10,16]}};
function drops(t,a,col,x0=160,x1=1760,y0=380,y1=880,n=70,sp=520){if(a<=0)return;const r=rng(5);for(let i=0;i<n;i++){const x=x0+r()*(x1-x0),ph=r();const y=y0+((t*sp/(y1-y0)+ph)%1)*(y1-y0);line([[x,y],[x-4,y+22]],col,2.5,true,a*0.8);}}
function cloud(x,y,s,a,c=DIM){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=3;ctx.shadowColor=c;ctx.shadowBlur=10;ctx.beginPath();
  ctx.moveTo(-160,40);ctx.bezierCurveTo(-200,40,-200,-20,-150,-20);ctx.bezierCurveTo(-140,-80,-60,-90,-30,-50);ctx.bezierCurveTo(0,-110,110,-100,110,-30);ctx.bezierCurveTo(170,-40,190,40,140,40);ctx.closePath();ctx.stroke();ctx.restore();}
function palm(x,y,s,a,c=CYAN){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);line([[0,0],[10,-120],[24,-240]],c,5,true,a);
  for(const d of [[-110,-200],[-90,-270],[30,-310],[130,-260],[140,-200]])line([[24,-240],[24+(d[0])*0.5,-240+(d[1]+240)*0.6-20],[24+d[0],d[1]+40]],c,3,true,a);ctx.restore();}
function umbrellaMan(x,y,s,a,c=PAPER){if(a<=0)return;personStand(x,y,s,a,c);ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  line([[38,-100],[40,-260]],c,3,true,a);line([[-60,-250],[-20,-285],[40,-295],[100,-285],[140,-250],[-60,-250]],c,3.5,true,a);ctx.restore();}
function cellDot(x,y,r,a,col=RED){circ(x,y,r,col,2.5,a,'rgba(255,60,60,.25)');circ(x,y,r*0.35,null,0,a*0.8,'rgba(255,120,90,.7)');}
function scope(cx,cy,R,t,a,n=26){if(a<=0)return;circ(cx,cy,R,PAPER,4,a,'rgba(20,0,0,.45)');const r=rng(9);for(let i=0;i<n;i++){const an=r()*6.28,d=Math.sqrt(r())*(R-30);cellDot(cx+Math.cos(an)*d+Math.sin(t+i)*3,cy+Math.sin(an)*d,12+r()*8,a);}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'天降血雨事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'连续两个月，天上落下像血一样的红雨');
    cloud(700,520,1.2,a);cloud(1250,500,1.4,a);drops(t,a*seg(t,1,1.6),RED,300,1620,570,900,60);
    stamp('未解之谜',1640,860,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'2001 年 · 印度喀拉拉邦',PAPER,215,64);
    palm(400,860,1,a*seg(t,5,5.4));palm(1500,860,1.1,a*seg(t,5.3,5.7));line([[160,860],[1760,860]],CYAN,3,true,a);
    umbrellaMan(960,860,1.1,a*seg(t,5.8,6.3));txt('7 月 25 日 — 9 月 23 日',960,400,40,GREEN,{f:MONO,a:a*seg(t,6.6,7)});
    cap(t,T.lab+.4,7.4,'印度南部，季风雨本该是最平常的东西');cap(t,7.5,T.night+.2,'可从 7 月底开始，有些地方的雨变了颜色');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    cloud(960,400,1.8,a*0.7);drops(t,a*seg(t,10.3,10.8),RED,200,1720,440,880,90,600);line([[160,880],[1760,880]],CYAN,2,true,a*0.6);
    umbrellaMan(700,880,1,a*0.8);ghost(1300,690,1.1,a*(flashA(t,[11.5,12.9],0.14)+win(t,15.2,16.1,.03,.4)*0.8),'200,90,90');
    for(let i=0;i<5;i++)glowDot(400+i*260,885,80,'rgba(255,40,40,.35)',a*seg(t,12.5+i*.3,13+i*.3));
    cap(t,T.night+.3,12.7,'雨水落下，地上积起一滩滩血红色的水');cap(t,12.8,15.1,'晾着的白衣服，被染成了粉红色','#d9e6e2');
    cap(t,15.2,T.foil,'有人说，这是不祥的"血雨"',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'雨前，有人听到天上一声巨响',PAPER,215,64);cloud(960,460,1.5,a*0.6);
    const p=seg(t,17,18.6);line([[1500,300],[lerp(1500,1100,p),lerp(300,520,p)]],WARM,5,true,a*(1-seg(t,18.6,19.2)));glowDot(lerp(1500,1100,p),lerp(300,520,p),80,'rgba(255,200,120,.6)',a*p*(1-seg(t,18.6,19.2)));
    txt('流星爆炸？',1500,640,46,RED,{f:SANS,w:700,a:a*seg(t,18.6,19)});
    cap(t,T.foil+.4,18.5,'于是传言四起：是流星在天上炸开了？');cap(t,18.6,T.hit,'研究人员把一瓶血雨，放到了显微镜下……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'雨里全是红色"细胞"！',RED,215,96,{pop:1,fi:.02});scope(960,600,250,t,a*eOut(seg(t,21,21.4)),30);
    txt('×1000',1300,400,40,GREEN,{f:MONO,a:a*seg(t,21.6,22),al:'left'});
    cap(t,T.hit+.8,T.trace,'每一滴雨里，都漂着无数个红色的圆形小颗粒');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：这些"细胞"从哪来？',PAPER,215,62);
    const l=a*seg(t,25.6,26);rect(160,380,720,420,DIM,2,l,'rgba(0,0,0,.35)');txt('一位物理学家：',520,440,32,RED,{f:SANS,w:700,a:l});txt('"可能来自外太空"',520,520,44,RED,{f:SANS,w:700,a:l});cellDot(520,660,40,l);txt('?',520,660,40,PAPER,{f:MONO,a:l});
    const r=a*seg(t,27,27.4);rect(1040,380,720,420,DIM,2,r,'rgba(0,0,0,.35)');txt('植物学家：去看附近的树',1400,440,32,GREEN,{f:SANS,w:700,a:r});
    palm(1300,780,0.9,r,CYAN);for(let i=0;i<6;i++)circ(1300+10+Math.sin(i)*8,700-i*40,9,WARM,2.5,a*seg(t,28,28.3+i*.1),'rgba(255,170,80,.5)');
    txt('树皮上长满橘红色"苔"',1560,760,28,WARM,{f:SANS,w:700,a:a*seg(t,28.6,29)});
    cap(t,T.trace+.4,28.2,'有人猜，这是外星生命；植物学家却去爬了树');cap(t,28.3,T.reveal,'当地树干上，到处是一层橘红色的东西');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('橘色藻孢子',560,430,140,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('TRENTEPOHLIA',560,580,56,PAPER,{f:MONO,a:a*seg(t,31.5,32)});
    palm(1200,850,0.9,a*seg(t,32.4,32.8),CYAN);cloud(1560,440,0.9,a*seg(t,33.2,33.6));
    const s=seg(t,33.4,35);const r=rng(4);for(let i=0;i<14;i++){const q=(s+r())%1;const x=lerp(1220,1560,q),y=lerp(700,480,q)+Math.sin(q*9+i)*20;circ(x,y,6,WARM,2,a*s,'rgba(255,170,80,.6)');}
    drops(t,a*seg(t,34.6,35),RED,1440,1700,520,850,16);
    cap(t,T.reveal+.6,34.4,'化验结果：是一种橘色藻释放的孢子（主流解释）');cap(t,34.5,T.eye,'孢子大量飘进空气，被雨水一起冲了下来');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么红得像血？',PAPER,215,66);
    cellDot(620,560,120,a);txt('胡萝卜素等色素',620,760,36,WARM,{f:SANS,w:700,a:a*seg(t,38,38.4)});
    line([[1100,520],[1180,700],[1260,520]],WARM,5,true,a*seg(t,38.6,39));line([[1180,520],[1160,460]],GREEN,4,true,a*seg(t,38.6,39));line([[1180,520],[1210,450]],GREEN,4,true,a*seg(t,38.6,39));
    txt('和胡萝卜同一类色素',1450,600,36,PAPER,{f:SANS,w:700,a:a*seg(t,39,39.4),al:'left'});
    cap(t,T.eye+.4,39.9,'这种藻含大量橙红色色素，颗粒又多又密');cap(t,40,T.off,'雨水里每毫升有上百万颗，看起来就像血');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'孢子散尽，雨又变回透明',PAPER,215,62);glowDot(W/2,540,560,'rgba(255,200,120,.2)',a);
    cloud(960,420,1.4,a,WARM);drops(t,a,CYAN,500,1420,480,860,40);palm(420,860,1,a,WARM);palm(1500,860,1,a,WARM);
    cap(t,T.off+.4,T.end,'那年 9 月底之后，"血雨"渐渐停了');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"血雨"，只是',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('一场藻类孢子雨',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：印度地球科学研究中心 CESS & 热带植物园研究所 TBGRI 2001 年联合报告',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你见过颜色奇怪的雨吗？｜评论区报案',GREEN);}
}
function coverScene(){cloud(700,520,1.3,1);cloud(1250,500,1.5,1);drops(3,1,RED,300,1620,580,960,70);umbrellaMan(960,980,1,0.9);
  txt('天降血雨两个月',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('显微镜下，雨里全是红色"细胞"',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('2001',300,920,-1,0,GREEN,64,-0.1);}
