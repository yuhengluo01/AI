// CASE 041 鸣沙/会唱歌的沙丘（Physics World 2006；Douady 等 2006 PRL 同步说为一种解释；65–110 Hz，最响约 105 dB；全球 30 多处；马可·波罗记载沙漠“精灵”之声）
const EP={caseNo:'041',name:'沙漠鬼哭',sfx:{ghost:[11.5,14.2],stings:[12.6],blips:[26.2,27.0,32.8,33.8,38.4,39.4],whisper:[10,16]}};
function curvePath(pts){ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length-1;i++){const xc=(pts[i][0]+pts[i+1][0])/2,yc=(pts[i][1]+pts[i+1][1])/2;ctx.quadraticCurveTo(pts[i][0],pts[i][1],xc,yc);}const l=pts[pts.length-1];ctx.lineTo(l[0],l[1]);}
function curve(pts,c,w,a,glow=true,fill){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;const l=pts[pts.length-1];
  if(fill){curvePath(pts);ctx.lineTo(l[0],H+20);ctx.lineTo(pts[0][0],H+20);ctx.closePath();ctx.fillStyle=fill;ctx.fill();}
  curvePath(pts);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';if(glow){ctx.shadowColor=c;ctx.shadowBlur=14;}ctx.stroke();ctx.restore();}
function dunes(t,a,c=CYAN){if(a<=0)return;
  curve([[90,600],[300,520],[520,560],[700,480],[860,540],[1060,500],[1300,560],[1500,470],[1700,540],[1830,520]],'rgba(127,232,255,.35)',2,a,false);
  curve([[90,820],[350,700],[620,640],[880,560],[930,555],[1250,860]],c,3.5,a,true,'rgba(5,15,15,.95)');
  curve([[1150,880],[1400,700],[1560,660],[1830,760]],c,3,a*0.8,true,'rgba(5,15,15,.95)');
  for(let k=0;k<5;k++)curve([[200+k*120,830-k*10],[380+k*120,760-k*30],[560+k*100,720-k*30]],c,1.2,a*0.25,false);}
const CR=[905,556]; // 沙脊
function avalanche(t,a,t0,col=WARM){if(a<=0)return;const r=rng(4);for(let i=0;i<70;i++){const ph=r(),off=r();const q=((t-t0)*0.5+ph)%1;if(t<t0)continue;
  const x=lerp(CR[0]+10,1230,q)+off*14,y=lerp(CR[1]+8,850,q)-off*10;circ(x,y,3,null,0,a*(1-q*0.5),col);}}
function moon(a){glowDot(1600,300,120,'rgba(200,230,255,.25)',a);circ(1600,300,32,'rgba(220,240,255,.9)',2,a,'rgba(200,230,255,.15)');}
function boom(t,a,x,y,col=RED){if(a<=0)return;waves(x,y,40,col,t,a,5,-3.14,0);}
function traveler(x,y,a,c=PAPER){personStand(x,y,0.55,a,c);}
function grains(t,a,x,y,round,col){const r=rng(round?2:3);for(let i=0;i<18;i++){const gx=x+(i%6)*44+(r()-.5)*8,gy=y+Math.floor(i/6)*44;if(round)circ(gx,gy,16,col,3,a,'rgba(255,200,120,.12)');else{const p=[];for(let k=0;k<5;k++){const an=k/5*6.283+r();const rr=10+r()*10;p.push([gx+Math.cos(an)*rr,gy+Math.sin(an)*rr]);}p.push(p[0]);line(p,col,3,true,a);}}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'沙漠深夜，传来"鬼哭"',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'没有人，沙丘却在低声轰鸣');
    dunes(t,a);moon(a);boom(t,a*seg(t,1.4,1.8),CR[0],CR[1]);traveler(1500,660,a);
    ghost(700,450,0.7,a*flashA(t,[2.4,3.4],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'700 年前，马可·波罗就写过它',PAPER,215,64);
    const ca=a*seg(t,4.8,5.2);rect(560,380,800,420,WARM,3,ca,'rgba(255,200,120,.04)');
    txt('《马可·波罗游记》',960,450,40,WARM,{a:ca});
    txt('沙漠里会听到精灵的声音，',960,560,40,PAPER,{f:SANS,w:500,a:a*seg(t,5.6,6)});txt('有时像有人喊你的名字，有时像鼓声',960,630,40,PAPER,{f:SANS,w:500,a:a*seg(t,6.4,6.8)});
    txt('落单的旅人会被引走……',960,720,40,RED,{f:SANS,w:700,a:a*seg(t,7.6,8)});
    cap(t,T.lab+.4,7.4,'马可·波罗记下：穿越沙漠时，会听见奇怪的声音');cap(t,7.4,T.night+.2,'当地人说，那是沙漠里的恶灵在作祟');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    dunes(t,a*0.6);moon(a);traveler(1500,660,a);boom(t,a*seg(t,12.6,13),CR[0],CR[1]);
    ghost(1200,500,0.8,a*flashA(t,[11.5,14.2],0.13));ghost(700,420,1.1,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'夜里，四周一片死寂……');cap(t,12.6,15.1,'沙丘里突然传出低沉的轰鸣，像飞机，又像大鼓','#d9e6e2');
    cap(t,15.2,T.foil,'声音能响好几分钟，仿佛有东西在地底呼喊',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'沙子，怎么会叫？',PAPER,215,70);dunes(t,a*0.6);
    txt('?',CR[0],CR[1]-110,110,RED,{f:SERIF,a:a*(0.5+0.5*Math.sin(t*4)),glow:'rgba(255,60,60,.6)'});
    cap(t,T.foil+.4,18.4,'全世界有 30 多处"鸣沙"，中国敦煌鸣沙山就是一处');cap(t,18.5,T.hit,'物理学家爬上沙丘，带着麦克风开始录音');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'是沙子在"雪崩"！',RED,215,92,{pop:1,fi:.02});dunes(t,a*0.8);
    avalanche(t,a,21.2);boom(t,a*seg(t,21.4,21.8),1060,700,WARM);
    txt('背风坡的沙一滑，沙丘就开始响',1480,420,36,PAPER,{f:SANS,w:700,a:a*seg(t,22.4,22.8)});
    cap(t,T.hit+.8,T.trace,'声音不是来自地底，而是来自滑下来的沙子');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：不是所有沙子都会唱',PAPER,215,64);
    ctx.save();ctx.translate(400,460);grains(t,a*seg(t,25.4,25.8),0,0,true,WARM);ctx.restore();
    ctx.save();ctx.translate(1140,460);grains(t,a*seg(t,26.2,26.6),0,0,false,DIM);ctx.restore();
    txt('会唱：圆、干、光滑',510,720,38,WARM,{f:SANS,w:700,a:a*seg(t,25.6,26)});txt('不会：棱角、潮湿',1250,720,38,DIM,{f:SANS,w:700,a:a*seg(t,26.4,26.8)});
    cap(t,T.trace+.4,28.1,'会唱的沙粒又圆又干，表面裹着一层光滑的硅质膜');cap(t,28.2,T.reveal,'而且沙子要滑得够快，每秒约 0.45 米以上');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('65–110 赫兹',W/2,420,150,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('最响约 105 分贝',W/2,590,64,PAPER,{f:SANS,w:700,a:a*seg(t,31.6,32)});
    txt('接近摇滚演唱会的音量',W/2,690,40,GREEN,{f:SANS,w:700,a:a*seg(t,32.6,33)});
    cap(t,T.reveal+.6,34.4,'亿万颗沙粒一起滑，发出低沉的嗡嗡声');cap(t,34.5,T.eye,'最远有报道在约 10 公里外都能听见');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么像同一个音？',PAPER,215,64);
    for(let row=0;row<3;row++)for(let i=0;i<14;i++){const sync=t>38.6;const ph=sync?t*8:t*8+i*1.7+row;const x=420+i*60+((t*60)%60)*(row==0?1:0.6),y=500+row*60+Math.sin(ph)*8;circ(x,y,14,sync?WARM:DIM,2.5,a,sync?'rgba(255,200,120,.2)':null);}
    const pts=[];for(let x=420;x<1260;x+=6)pts.push([x,760+Math.sin(x*0.05-t*10)*24*seg(t,38.6,39)]);line(pts,WARM,3,true,a*seg(t,38.6,39));
    txt('同步碰撞（一种解释）',1560,520,36,WARM,{f:SANS,w:700,a:a*seg(t,38.6,39)});txt('沙丘共鸣说',1560,620,36,CYAN,{f:SANS,w:700,a:a*seg(t,40,40.4)});txt('至今仍有争论',1560,700,32,DIM,{f:SANS,w:500,a:a*seg(t,40.4,40.8)});
    cap(t,T.eye+.4,39.9,'一种解释：沙粒步调一致地碰撞，像千万个鼓手一起敲');cap(t,40,T.off,'也有人认为整座沙丘像音箱一样共鸣');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'不是恶灵，是沙子在唱歌',PAPER,215,66);glowDot(1600,300,300,'rgba(255,200,120,.3)',a);circ(1600,300,50,WARM,3,a,'rgba(255,200,120,.2)');
    dunes(t,a,WARM);traveler(1500,660,a,WARM);
    cap(t,T.off+.4,T.end,'沙子停下来，"鬼哭"也就停了');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些沙漠"鬼哭"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是亿万沙粒在合唱',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：Douady 等 2006《PRL》· Andreotti 2004《PRL》· Physics World',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你听过大自然的怪声吗？｜评论区报案',GREEN);}
}
function coverScene(){dunes(3,1);moon(1);boom(1.3,1,CR[0],CR[1]);traveler(1500,660,1);ghost(640,560,0.75,0.5);
  txt('沙漠深夜，沙丘在"鬼哭"',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('马可·波罗说是恶灵？',W/2,318,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('105dB',300,940,-1,0,GREEN,64,-0.1);}
