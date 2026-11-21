// CASE 029 深海怪声 Bloop（NOAA PMEL 1997；2005 年后判定为冰震 icequake）
const EP={caseNo:'029',name:'深海怪声',sfx:{ghost:[11.6,12.7],stings:[],blips:[25.8,26.4,27.0,27.6,33.4,34.4],whisper:[10,16]}};
const SEA=400;
function ocean(t,a,c=CYAN){if(a<=0)return;const pts=[];for(let x=100;x<=1820;x+=20)pts.push([x,SEA+Math.sin(x*0.02+t*2)*6]);line(pts,c,3,true,a);
  line([[100,900],[400,860],[700,890],[1000,850],[1300,880],[1600,860],[1820,890]],c,2.5,true,a*0.6);
  for(let i=0;i<5;i++)line([[200+i*340,SEA+120+i*30],[260+i*340,SEA+120+i*30]],'rgba(127,232,255,.25)',1.5,false,a);}
function hydro(x,y,a,lit=0){if(a<=0)return;line([[x,880],[x,y]],DIM,1.5,false,a);circ(x,y,14,lit?GREEN:CYAN,3,a,lit?'rgba(109,255,192,.3)':null);}
function monster(x,y,s,a){if(a<=0)return;ctx.save();ctx.globalAlpha=clamp(a);ctx.translate(x,y);ctx.scale(s,s);ctx.filter='blur(10px)';
  const g=ctx.createRadialGradient(0,0,0,0,0,260);g.addColorStop(0,'rgba(90,110,115,.85)');g.addColorStop(1,'rgba(90,110,115,0)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,280,150,0,0,6.28);ctx.fill();
  for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(-160+i*80,90);ctx.quadraticCurveTo(-180+i*80,200,-130+i*85,280);ctx.lineWidth=26;ctx.strokeStyle='rgba(90,110,115,.6)';ctx.stroke();}
  ctx.filter='none';ctx.fillStyle='rgba(255,40,40,.9)';ctx.shadowColor=RED;ctx.shadowBlur=20;ctx.beginPath();ctx.arc(-50,-20,9,0,6.28);ctx.arc(50,-20,9,0,6.28);ctx.fill();ctx.restore();}
function spectro(x,y,w,h,t,a,p){if(a<=0)return;rect(x,y,w,h,DIM,2,a,'rgba(0,0,0,.35)');const pts=[];for(let i=0;i<=50*p;i++){const q=i/50;pts.push([x+q*w,y+h-h*(0.15+0.7*q*q)]);}if(pts.length>1)line(pts,RED,6,true,a);
  txt('频率',x-16,y+20,24,DIM,{f:SANS,w:500,al:'right',a});txt('约 1 分钟',x+w,y+h+30,24,DIM,{f:SANS,w:500,al:'right',a});}
// 简化地图：南美 + 南极
function map(a){if(a<=0)return;line([[1180,360],[1260,400],[1300,500],[1270,600],[1220,700],[1190,800],[1170,850],[1150,820],[1160,700],[1150,560],[1130,440],[1180,360]],CYAN,3,true,a);
  line([[700,980],[900,940],[1100,950],[1300,930],[1500,960],[1700,990]],PAPER,3,true,a);txt('南极洲',1200,900,30,DIM,{f:SANS,w:500,a});txt('南美洲',1340,560,30,DIM,{f:SANS,w:500,a,al:'left'});txt('南太平洋',480,840,36,DIM,{f:SANS,w:500,a});}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'深海怪声事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'一个比蓝鲸还响的声音，从南太平洋深处传来');
    ocean(t,a);waves(960,720,30,RED,t,a*seg(t,1,1.5),5,-3.14,3.14);monster(960,680,0.9,a*flashA(t,[1.5,2.2,3.4],0.14));
    stamp('未解之谜',1640,860,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1997 年 · 太平洋海底',PAPER,215,64);ocean(t,a);
    for(let i=0;i<4;i++)hydro(420+i*360,720,a*seg(t,5+i*.3,5.3+i*.3));txt('NOAA 水听器',420,650,30,GREEN,{f:SANS,w:700,a:a*seg(t,6,6.4)});
    cap(t,T.lab+.4,7.4,'美国海洋机构 NOAA 在海里布下水听器');cap(t,7.4,T.night+.2,'原本用来监听海底火山和地震');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    ocean(t,a*0.6);const lit=seg(t,13.2,14);for(let i=0;i<4;i++)hydro(420+i*360,720,a,lit>i/4);
    waves(1700,760,20,RED,t,a*seg(t,10.4,10.8),5,-3.14,3.14);spectro(640,460,640,180,t,a*seg(t,10.6,11),seg(t,10.8,12.8));
    monster(1250,700,1.3,a*(flashA(t,[11.6,12.7],0.14)+win(t,15.2,16.1,.03,.4)));
    cap(t,T.night+.3,13.1,'那年夏天，水听器录到一个诡异的低吼');cap(t,13.2,15.1,'相隔 5000 多公里的水听器，都听到了它','#d9e6e2');
    cap(t,15.2,T.foil,'没有任何已知动物，能发出这么响的声音',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'它被取名为 "Bloop"',PAPER,215,70);ocean(t,a*0.5);monster(960,700,1.2,a*seg(t,16.4,17.2)*0.7);
    txt('R\'lyeh?',1500,560,48,RED,{f:MONO,a:a*seg(t,18.4,18.8),glow:'rgba(255,60,60,.5)'});
    cap(t,T.foil+.4,18.4,'有人说，那是一只未知的深海巨兽');cap(t,18.4,T.hit,'源头附近，正是小说里"克苏鲁"沉睡的海域……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'是冰，在"尖叫"！',RED,215,96,{pop:1,fi:.02});ocean(t,a*0.5);
    line([[500,SEA],[500,SEA+90],[1300,SEA+90],[1400,SEA]],PAPER,4,true,a);line([[880,SEA-60],[860,SEA+90]],RED,5,true,a*seg(t,21.6,22));
    for(let k=0;k<3;k++)line([[860+k*14,SEA+90],[840+k*30,SEA+140+k*20]],RED,3,true,a*seg(t,21.8,22.2));waves(860,SEA+120,20,RED,t,a,4,0,3.14);
    cap(t,T.hit+.8,T.trace,'后来，NOAA 在南极附近录到了几乎一样的声音');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：声音从哪来？',PAPER,215,66);map(a);
    const tgt=[1000,820],hs=[[300,420,25.8],[620,360,26.4],[200,700,27.0],[1600,420,27.6]];
    for(const [x,y,t0] of hs){const ha=a*seg(t,t0,t0+.3);circ(x,y,12,GREEN,3,ha,'rgba(109,255,192,.3)');const p=eOut(seg(t,t0+.2,t0+1.2));line([[x,y],[lerp(x,tgt[0],p),lerp(y,tgt[1],p)]],GREEN,2.5,true,ha);}
    const ta=a*seg(t,28.6,29);circ(tgt[0],tgt[1],30,RED,4,ta);circ(tgt[0],tgt[1],8,null,0,ta,RED);txt('约 50°S 100°W',tgt[0]-50,tgt[1]+60,32,RED,{f:MONO,a:ta,al:'right'});
    cap(t,T.trace+.4,28.2,'多个水听器交叉定位');cap(t,28.3,T.reveal,'源头指向南美洲南端、靠近南极的海域');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('冰震',560,440,170,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('ICEQUAKE',560,590,56,PAPER,{f:MONO,a:a*seg(t,31.5,32)});
    const br=eInOut(seg(t,33.4,34.6));const by=520;
    line([[1080,by],[1080,by+160],[1500,by+160],[1500,by]],CYAN,4,true,a);line([[1080,by],[1500,by]],CYAN,4,true,a);
    ctx.save();ctx.translate(1500+br*40,by+160+br*30);ctx.rotate(br*0.35);ctx.translate(-1500,-(by+160));line([[1500,by],[1720,by],[1720,by+160],[1500,by+160],[1500,by]],PAPER,4,true,a*seg(t,32.6,33));ctx.restore();
    txt('冰架',1290,by-40,32,CYAN,{f:SANS,w:700,a:a*seg(t,32.6,33)});txt('冰山崩落',1650,by-40,32,RED,{f:SANS,w:700,a:a*br});
    waves(1500,by+160,20,RED,t,a*br,5,0,3.14);
    cap(t,T.reveal+.6,34.4,'巨大的冰架开裂，冰山从南极崩落');cap(t,34.5,T.eye,'声音在深海"声道"里，能传出几千公里');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么听起来像活物？',PAPER,215,66);spectro(560,440,800,300,t,a,seg(t,37.4,39));
    txt('× 16 倍速',1400,420,48,GREEN,{f:MONO,a:a*seg(t,38.4,38.8),glow:'rgba(109,255,192,.5)',al:'left'});
    cap(t,T.eye+.4,39.9,'原始声音极低沉，加速 16 倍后才听得清');cap(t,40,T.off,'音调一路升高，听起来就像巨兽在叫');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'海怪退场，冰川登场',PAPER,215,66);ocean(t,a,WARM);glowDot(W/2,SEA,500,'rgba(255,200,120,.2)',a);
    line([[600,SEA],[620,SEA-120],[760,SEA-150],[900,SEA-90],[940,SEA]],PAPER,4,true,a);line([[620,SEA],[700,SEA+180],[860,SEA+160],[940,SEA]],'rgba(233,243,238,.4)',3,true,a);
    cap(t,T.off+.4,T.end,'此后在南极录到的许多冰震，都和 Bloop 十分相似');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"海怪"，只是',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('南极的冰在碎裂',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：NOAA PMEL 声学项目 · NOAA Ocean Service「What is the Bloop?」',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你还听过哪些深海怪声？｜评论区报案',GREEN);}
}
function coverScene(){ocean(3,1);monster(1000,700,1.3,0.8);waves(1000,700,40,RED,3,0.8,5,-3.14,3.14);for(let i=0;i<3;i++)hydro(400+i*560,780,1,1);
  txt('深海怪声 Bloop',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('比蓝鲸还响，究竟是谁在叫？',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1997',300,920,-1,0,GREEN,64,-0.1);}
