// CASE 025 遗体会自己动（Alison Wilson 等, 2019, Forensic Science International: Synergy；AFTER 遗体农场）
const EP={caseNo:'025',name:'会动的遗体',sfx:{ghost:[11.6,12.6],stings:[],blips:[27.2,28.6,33.4,34.4],whisper:[10,16]}};
const BX=960,BY=640;
// 俯视：盖布下的人形轮廓（抽象线稿），ang=手臂外张角度
function shroud(x,y,s,a,ang=0,c=PAPER){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  headAt(-250,0,34,c,a);
  ctx.save();ctx.globalAlpha*=a;ctx.fillStyle='rgba(233,243,238,.07)';ctx.strokeStyle=c;ctx.lineWidth=3.5;ctx.shadowColor=c;ctx.shadowBlur=12;
  ctx.beginPath();ctx.moveTo(-205,-52);ctx.quadraticCurveTo(-60,-70,60,-50);ctx.quadraticCurveTo(250,-40,300,-18);ctx.lineTo(300,18);ctx.quadraticCurveTo(250,40,60,50);ctx.quadraticCurveTo(-60,70,-205,52);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
  for(const sg of[-1,1]){const sx=-190,sy=sg*58;const ex=sx+190*Math.cos(ang),ey=sy+sg*190*Math.sin(ang);line([[sx,sy],[(sx+ex)/2,(sy+ey)/2+sg*4],[ex,ey]],c,5,true,a);circ(ex+8*Math.cos(ang),ey+sg*8*Math.sin(ang),9,c,3,a);}
  ctx.restore();}
function slab(a,c=CYAN){rect(560,520,820,240,c,3,a,'rgba(127,232,255,.03)');for(let i=0;i<8;i++)line([[600+i*100,775],[640+i*100,775]],c,1.5,false,a*0.4);}
function camera(x,y,a,t){if(a<=0)return;rect(x-40,y-26,80,52,CYAN,3,a);circ(x,y,16,CYAN,3,a);line([[x,y+26],[x,y+90]],CYAN,3,true,a);if(Math.floor(t*2)%2==0)circ(x+28,y-16,5,null,0,a,RED);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'遗体移动事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'它躺了一年多，手臂却自己换了位置');
    slab(a);shroud(BX,BY,1,a,0.05+0.35*seg(t,1.2,3.6));ghost(1500,560,0.7,a*flashA(t,[1.5,2.2,3.4],0.12),'150,150,160');
    stamp('未解之谜',1640,860,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'澳大利亚 · 悉尼郊外 · 遗体农场',PAPER,215,60);
    for(let i=0;i<9;i++){const x=440+i*130;line([[x,600],[x,860]],'rgba(127,232,255,.5)',2,false,a*seg(t,4.8+i*.08,5.1+i*.08));}
    line([[380,620],[1520,620]],'rgba(127,232,255,.5)',2,false,a);line([[380,740],[1520,740]],'rgba(127,232,255,.5)',2,false,a);
    txt('AFTER',W/2,470,64,GREEN,{f:MONO,a:a*seg(t,5.2,5.6),glow:'rgba(109,255,192,.5)'});txt('澳大利亚埋葬学实验研究基地',W/2,535,32,DIM,{f:SANS,w:500,a:a*seg(t,5.4,5.8)});
    cap(t,T.lab+.4,7.4,'这里是南半球第一座「遗体农场」');cap(t,7.4,T.night+.2,'科学家用自愿捐献的遗体，研究人死后的变化');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    slab(a*0.6);camera(470,380,a,t);line([[500,400],[760,560]],'rgba(127,232,255,.25)',2,false,a);line([[500,400],[1200,560]],'rgba(127,232,255,.25)',2,false,a);
    const ang=0.05+0.4*seg(t,13.2,15.4);shroud(BX,BY,1,a,ang);
    ghost(1480,560,0.75,a*flashA(t,[11.6,12.6],0.13));ghost(1300,520,1.05,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    txt(`IMG_${String(Math.floor(t*240)).padStart(5,'0')}`,1460,380,28,GREEN,{f:MONO,a:a*0.8,al:'left'});
    cap(t,T.night+.3,13.1,'一台相机悬在上方，每 30 分钟拍一张');cap(t,13.2,15.1,'深夜回看照片，研究员发现……','#d9e6e2');
    cap(t,15.2,T.foil,'遗体的手臂，自己挪开了！',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'连拍 17 个月',PAPER,215,70);
    const m=Math.min(17,Math.floor(seg(t,16.3,19.5)*17));txt(`MONTH ${String(m).padStart(2,'0')} / 17`,W/2,420,60,GREEN,{f:MONO,a,glow:'rgba(109,255,192,.5)'});
    slab(a*0.5);shroud(BX,BY+40,0.85,a,0.05+0.45*seg(t,16.3,19.5));
    cap(t,T.foil+.4,18.4,'整整 17 个月，它几乎一直在慢慢挪动');cap(t,18.4,T.hit,'人已经死了，是什么在牵动它？');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'遗体，真的会动！',RED,215,96,{pop:1,fi:.02});slab(a*0.6);shroud(BX,BY,1,a,0.5);
    cap(t,T.hit+.8,T.trace,'这是科学家亲手拍下的证据（2019 年发表）');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：手臂去了哪？',PAPER,215,66);
    for(let k=0;k<6;k++){const ka=a*seg(t,25.4+k*.3,25.7+k*.3)*(0.15+0.85*(k==5));shroud(700,620,0.8,ka,0.05+k*0.09,k==5?GREEN:PAPER);}
    // 角度曲线
    const gx=1200,gy=760,gw=560,gh=300;line([[gx,gy-gh],[gx,gy],[gx+gw,gy]],DIM,2,false,a*seg(t,27,27.3));
    txt('时间（月）',gx+gw,gy+36,26,DIM,{f:SANS,w:500,al:'right',a:a*seg(t,27,27.3)});txt('外张角度',gx,gy-gh-26,26,DIM,{f:SANS,w:500,al:'left',a:a*seg(t,27,27.3)});
    const p=seg(t,27.2,30.4),pts=[];for(let i=0;i<=40*p;i++){const q=i/40;pts.push([gx+q*gw,gy-gh*0.85*(1-Math.exp(-q*3))]);}if(pts.length>1)line(pts,GREEN,4,true,a);
    cap(t,T.trace+.4,28.2,'把上千张照片按时间排好');cap(t,28.3,T.reveal,'手臂从身体两侧，一点点向外张开');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('腐败 + 干化',600,470,130,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('Decomposition',600,600,44,PAPER,{f:MONO,a:a*seg(t,31.5,32)});
    // 绳子干缩示意
    const sh=eInOut(seg(t,33.4,35));const x0=1180,x1=lerp(1720,1600,sh),y=520;
    const wav=[];for(let i=0;i<=30;i++){const q=i/30;wav.push([lerp(x0,x1,q),y+Math.sin(q*18)*lerp(16,3,sh)]);}line(wav,WARM,6,true,a*seg(t,32.6,33));
    circ(x0,y,10,null,0,a*seg(t,32.6,33),CYAN);txt('湿韧带',1450,440,32,WARM,{f:SANS,w:700,a:a*seg(t,32.8,33.2)*(1-sh)});txt('失水 → 收缩',1450,440,32,RED,{f:SANS,w:700,a:a*sh});
    shroud(1440,720,0.5,a*seg(t,33.4,33.8),lerp(0.05,0.5,sh));
    cap(t,T.reveal+.6,34.4,'人死后，组织慢慢分解、失水变干');cap(t,34.5,T.eye,'韧带收缩，像晒干的绳子一样拉动四肢');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'这对法医很重要',PAPER,215,66);
    const c1=a*seg(t,37.4,37.8),c2=a*seg(t,38.8,39.2);
    rect(420,400,480,360,CYAN,3,c1,'rgba(127,232,255,.04)');txt('过去',660,450,40,DIM,{f:SANS,w:500,a:c1});txt('遗体位置',660,560,48,PAPER,{a:c1});txt('= 死亡时的姿势',660,640,40,PAPER,{f:SANS,w:500,a:c1});
    rect(1020,400,480,360,GREEN,3,c2,'rgba(109,255,192,.05)');txt('现在',1260,450,40,GREEN,{f:SANS,w:700,a:c2});txt('姿势会变',1260,560,48,GREEN,{a:c2});txt('现场要重新解读',1260,640,40,PAPER,{f:SANS,w:500,a:c2});
    line([[930,580],[990,580]],GREEN,4,true,c2);
    cap(t,T.eye+.4,39.9,'过去常默认：遗体被发现的姿势就是死亡时的姿势');cap(t,40,T.off,'这项发现，能帮法医更准确地还原现场');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'没有鬼，只有化学和物理',PAPER,215,66);
    glowDot(W/2,600,300,'rgba(255,200,120,.25)',a);shroud(W/2,640,0.9,a,0.5,WARM);
    cap(t,T.off+.4,T.end,'感谢遗体捐献者，让科学看得更远');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"鬼"，只是',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('时间在悄悄做功',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：Wilson 等, 2019 · Forensic Science International: Synergy · CQUniversity / AFTER',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'向遗体捐献者致敬｜评论区报案',GREEN);}
}
function coverScene(){slab(1);shroud(BX,BY+40,1,1,0.45);camera(470,420,1,0);ghost(1560,620,0.8,0.6,'150,150,160');
  txt('遗体自己会动？',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('相机拍了 17 个月',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('17 个月',1600,880,-1,0,GREEN,64,-0.1);}
