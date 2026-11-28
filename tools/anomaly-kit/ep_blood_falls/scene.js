// CASE 060 南极血瀑布（1911 Griffith Taylor 在泰勒冰川发现血红色"瀑布"，当时猜是红藻；冰下富铁高盐卤水，出来时近无色，遇氧气铁被氧化变红；2017 Badgeley 等《Journal of Glaciology》雷达找到冰下卤水通道：高盐压低冰点+结冰放热，让卤水在冰中流动；Mikucki 等 2009《Science》卤水里有无光无氧也能活的微生物）
const EP={caseNo:'060',name:'冰川在流血',sfx:{ghost:[11.4,13.0,14.5],stings:[12.9],blips:[22.0,26.2,27.8,32.2,34.4,38.0,39.6],whisper:[10,16]}};
// 冰川侧视：左边是冰体，cliff 在 cx 处，地面 gy
function glacier(cx,gy,a,c=CYAN){if(a<=0)return;
  line([[cx-700,gy-330],[cx-420,gy-360],[cx-160,gy-320],[cx,gy-300],[cx+10,gy-160],[cx-6,gy],[cx+640,gy]],c,3.5,true,a);
  line([[cx-700,gy],[cx-6,gy]],c,2,false,a*0.4);
  for(let k=0;k<5;k++)line([[cx-640+k*120,gy-300+k*6],[cx-600+k*120,gy-220]],c,1.6,false,a*0.35);
  // 远山
  line([[cx+80,gy-60],[cx+260,gy-180],[cx+400,gy-90],[cx+560,gy-200],[cx+700,gy-80]],c,2,false,a*0.3);}
// 血水：从 cliff 顶口 (cx,gy-200) 流下并在地面铺开，col 可变（透明→红）
function bloodFlow(cx,gy,a,p=1,col='rgba(255,40,40,'){if(a<=0||p<=0)return;ctx.save();ctx.globalAlpha=a;
  const top=gy-210,len=210*clamp(p*1.6);
  const g=ctx.createLinearGradient(0,top,0,gy);g.addColorStop(0,col+'0.95)');g.addColorStop(1,col+'0.7)');
  ctx.fillStyle=g;ctx.shadowColor=col+'0.8)';ctx.shadowBlur=24;ctx.beginPath();ctx.moveTo(cx-4,top);ctx.lineTo(cx+20,top);
  ctx.lineTo(cx+34,top+len);ctx.lineTo(cx-10,top+len);ctx.closePath();ctx.fill();
  const sp=clamp(p*1.6-1)*1.6;if(sp>0){ctx.beginPath();ctx.ellipse(cx+40,gy+6,60+200*sp,12+10*sp,0,0,6.28);ctx.fill();}
  ctx.restore();}
function drop(x,y,s,col,a){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=a;ctx.fillStyle=col;ctx.strokeStyle=CYAN;ctx.lineWidth=3;ctx.shadowColor=col;ctx.shadowBlur=20;
  ctx.beginPath();ctx.moveTo(0,-80);ctx.bezierCurveTo(30,-30,50,0,50,25);ctx.arc(0,25,50,0,Math.PI);ctx.bezierCurveTo(-50,0,-30,-30,0,-80);ctx.fill();ctx.stroke();ctx.restore();}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'南极的冰川，在流血',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'雪白的冰壁上，一道血红的"伤口"终年渗个不停');
    glacier(1000,820,a);bloodFlow(1000,820,a,seg(t,.6,3.6));
    ghost(1500,640,0.85,a*flashA(t,[1.7,2.8,3.7],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1911 年 · 南极 · 泰勒冰川',PAPER,215,62);
    glacier(820,800,a*seg(t,4.7,5.2));bloodFlow(820,800,a,1);
    personStand(1330,800,0.9,a*seg(t,5.2,5.6),CYAN);personStand(1450,800,0.8,a*seg(t,5.5,5.9),CYAN);
    txt('英国探险队',1390,540,34,CYAN,{f:SANS,w:700,a:a*seg(t,5.6,6)});
    txt('"血瀑布"',900,500,40,RED,{f:SANS,w:900,a:a*seg(t,7.6,8)});
    cap(t,T.lab+.4,7.4,'英国探险队的地质学家格里菲斯·泰勒');cap(t,7.4,T.night+.2,'在冰川尽头，撞见了一道血红色的"瀑布"');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    glacier(900,780,a*0.7,'rgb(110,150,160)');
    const pulse=0.75+0.25*Math.sin(t*5);bloodFlow(900,780,a*pulse,1);
    glowDot(920,640,260,'rgba(255,30,30,.14)',a*pulse);
    ghost(lerp(1500,600,seg(t,11,15)),560,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.4,13.0,14.5],0.14));
    ghost(920,500,1.5,a*win(t,15.2,16.1,.03,.4),'150,140,150');
    cap(t,T.night+.3,12.6,'四周零下十几度，一切都冻得结结实实');cap(t,12.7,15.1,'只有这道红水，年复一年从冰里渗出来','#d9e6e2');
    cap(t,15.2,T.foil,'冰川深处，到底埋着什么？',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'冰下有东西在流血？',PAPER,215,76);
    glacier(900,820,a*0.8);bloodFlow(900,820,a,1);
    txt('红藻？',1450,520,64,GREEN,{f:SANS,w:900,a:a*seg(t,17,17.4)});
    line([[1370,560],[1530,480]],RED,6,true,a*seg(t,18.6,18.9));line([[1370,480],[1530,560]],RED,6,true,a*seg(t,18.6,18.9));
    cap(t,T.foil+.4,18.4,'当年的人猜：是红色的藻类在作怪');cap(t,18.5,T.hit,'可冰川深处一片漆黑，藻类根本活不下去');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'刚流出来时，它是透明的！',RED,215,92,{pop:1,fi:.02});
    const m=seg(t,22.4,24.4);
    drop(700,640,2,'rgba(200,240,255,.35)',a);
    line([[860,640],[1060,640]],PAPER,5,true,a*seg(t,22.2,22.5));line([[1030,615],[1060,640],[1030,665]],PAPER,5,true,a*seg(t,22.2,22.5));
    txt('+ 空气',960,590,34,PAPER,{f:SANS,w:700,a:a*seg(t,22.2,22.5)});
    drop(1220,640,2,`rgba(${lerp(200,255,m)|0},${lerp(240,40,m)|0},${lerp(255,40,m)|0},${lerp(.35,.9,m)})`,a*seg(t,22.4,22.7));
    cap(t,T.hit+.8,23.4,'科学家发现：卤水刚冒出冰面时几乎无色');cap(t,23.4,T.trace,'一碰到空气，才慢慢变成血红');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：红色从哪来？',PAPER,215,64);
    const a1=a*seg(t,25.4,25.8);
    rect(300,420,560,320,CYAN,3,a1,'rgba(127,232,255,.05)');txt('冰下卤水',580,480,44,CYAN,{a:a1});
    txt('溶着大量的铁',580,560,36,PAPER,{f:SANS,w:500,a:a1});txt('Fe',580,660,70,CYAN,{f:MONO,a:a1});
    line([[900,580],[1040,580]],WARM,5,true,a*seg(t,27.6,28));txt('+ 氧气',970,530,32,WARM,{f:SANS,w:700,a:a*seg(t,27.6,28)});
    rect(1080,420,560,320,RED,3,a*seg(t,28,28.4),'rgba(255,59,59,.06)');txt('生锈',1360,520,72,RED,{a:a*seg(t,28,28.4),glow:'rgba(255,60,60,.6)'});
    txt('像铁钉泡水变红',1360,640,36,PAPER,{f:SANS,w:500,a:a*seg(t,28.3,28.7)});
    cap(t,T.trace+.4,27.5,'冰下的卤水里，溶着大量的铁');cap(t,27.6,T.reveal,'铁一遇到氧气就会生锈，颜色变红');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('Fe²⁺ → Fe³⁺',W/2,420,170,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('所谓的"血"，其实是铁锈的颜色',W/2,610,56,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,31.9)});
    txt('铁被氧化：从无色变成红褐色',W/2,740,40,CYAN,{f:SANS,w:700,a:a*seg(t,34.3,34.7)});
    cap(t,T.reveal+.6,34.2,'"血瀑布"的红，就是铁被氧化后的锈色');cap(t,34.3,T.eye,'和生锈的铁钉，是同一种化学反应');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'零下十几度，为什么不结冰？',PAPER,215,64);
    [['盐分极高','冰点被大大压低',640,37.3],['结冰会放热','反倒让卤水保持流动',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,66,WARM,{a:ca});txt(s,x,630,34,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'2017 年，雷达在冰川里找到了一条卤水通道');cap(t,40,T.off,'卤水极咸，冰点低，所以能在冰里一路流出来');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'冰下，还藏着活着的生命',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    for(let i=0;i<14;i++){const r=rng(i*7+3);circ(760+r()*400,560+r()*180+Math.sin(t*2+i)*8,10+r()*10,WARM,2.5,a*seg(t,42.3+i*0.05,42.6+i*0.05));}
    cap(t,T.off+.4,T.end,'黑暗无氧的卤水里，还住着古老的微生物');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"血"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是生了锈的水',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：Badgeley et al. 2017《Journal of Glaciology》· Mikucki et al. 2009《Science》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你还见过哪些吓人的自然现象？评论区报案',GREEN);}
}
function coverScene(){glacier(1480,960,1);bloodFlow(1480,960,1,1);glowDot(1490,800,300,'rgba(255,40,40,.16)',1);ghost(1760,620,0.75,0.45);
  txt('南极冰川在流血',600,320,108,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('百年谜底竟是它',600,470,80,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1911',330,850,-1,0,GREEN,64,-0.1);}
