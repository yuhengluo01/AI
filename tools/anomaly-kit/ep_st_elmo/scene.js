// CASE 042 圣艾尔摩之火（电晕放电；潮湿空气约 100 kV/m 起辉；以水手守护神圣伊拉斯谟/St. Elmo 命名；皮加费塔麦哲伦航海记录；富兰克林 1751 尖杆猜想）
const EP={caseNo:'042',name:'桅杆鬼火',sfx:{ghost:[11.3,14.0],stings:[12.5],blips:[26.0,27.0,33.2,34.2,38.4,39.4],whisper:[10,16]}};
const MASTS=[[820,400],[1120,440]];
function sea(t,a,c=CYAN){for(let k=0;k<3;k++){const pts=[];for(let x=90;x<=1830;x+=20)pts.push([x,850+k*40+Math.sin(x*0.012+t*1.6+k)*10]);line(pts,c,k?1.5:2.5,!k,a*(0.8-k*0.25));}}
function ship(t,a,o={}){if(a<=0)return;const c=o.col||CYAN;const rock=o.still?0:Math.sin(t*1.2)*0.03;ctx.save();ctx.translate(960,830);ctx.rotate(rock);ctx.translate(-960,-830);
  line([[540,760],[1400,760],[1320,850],[620,850],[540,760]],c,3.5,true,a);line([[1400,760],[1480,720]],c,3,true,a);
  MASTS.forEach(([x,y],i)=>{line([[x,760],[x,y]],c,4,true,a);line([[x-150,y+60],[x+150,y+60]],c,3,true,a*0.8);line([[x-130,y+190],[x+130,y+190]],c,3,true,a*0.8);
    line([[x-150,y+60],[x-130,y+190]],c,1.5,false,a*0.4);line([[x+150,y+60],[x+130,y+190]],c,1.5,false,a*0.4);
    if(o.fire){fireAt(t,x,y,a*o.fire,1.8);fireAt(t,x-150,y+60,a*o.fire*0.8,1);fireAt(t,x+150,y+60,a*o.fire*0.8,1);}});
  line([[MASTS[0][0],MASTS[0][1]],[1480,720]],c,1.2,false,a*0.4);line([[MASTS[1][0],MASTS[1][1]],[540,760]],c,1.2,false,a*0.4);
  ctx.restore();}
function fireAt(t,x,y,a,s=1){if(a<=0)return;const f=0.75+0.25*Math.sin(t*23+x)*Math.sin(t*7.7+y);glowDot(x,y,70*s*f,'rgba(150,140,255,.55)',a);
  ctx.save();ctx.globalAlpha=a;ctx.strokeStyle='#b9b4ff';ctx.shadowColor='#8f7dff';ctx.shadowBlur=20;ctx.lineWidth=2.5;
  for(let k=0;k<6;k++){const an=-Math.PI/2+(k-2.5)*0.35+Math.sin(t*17+k)*0.15;const l=(26+12*Math.sin(t*29+k*2))*s;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(an)*l,y+Math.sin(an)*l);ctx.stroke();}ctx.restore();}
function cloud(x,y,a,c=DIM){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-240,y);ctx.bezierCurveTo(x-260,y-60,x-160,y-90,x-110,y-60);ctx.bezierCurveTo(x-80,y-120,x+40,y-120,x+60,y-70);ctx.bezierCurveTo(x+130,y-100,x+250,y-60,x+230,y);ctx.closePath();ctx.stroke();ctx.restore();}
function bolt(x,y,a){line([[x,y],[x-30,y+90],[x+10,y+90],[x-40,y+220]],'#fff',4,true,a);}
function charges(x,y,n,r,a,sign='-',col=RED){for(let i=0;i<n;i++){const an=i/n*6.283;txt(sign,x+Math.cos(an)*r,y+Math.sin(an)*r,30,col,{f:MONO,a});}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'暴风雨夜，桅杆燃起鬼火',PAPER,215,82,{pop:1});sub(t,.9,T.lab,'火在烧，帆和木头却一点没着');
    sea(t,a);ship(t,a,{fire:seg(t,1,1.6)});ghost(1560,620,0.7,a*flashA(t,[2.4,3.4],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'大航海时代，水手见过几百年',PAPER,215,62);sea(t,a);ship(t,a,{fire:seg(t,5.2,5.8)});
    txt('麦哲伦船队 1519–1522',1620,420,34,WARM,{f:SANS,w:700,a:a*seg(t,7.4,7.8)});
    cap(t,T.lab+.4,7.4,'雷雨夜，桅杆尖常会冒出蓝紫色的火焰');cap(t,7.4,T.night+.2,'麦哲伦船队的记录员皮加费塔，也把它写进了航海记录');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    sea(t,a*0.7);ship(t,a*0.7,{fire:seg(t,12.4,12.7)});cloud(500,330,a*0.6);if(t>=13.2&&t<13.35)bolt(560,340,a);
    ghost(1560,600,0.8,a*flashA(t,[11.3,14.0],0.13));ghost(380,560,1.1,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.3,'雷声滚滚，甲板一片漆黑……');cap(t,12.4,15.1,'桅杆尖突然亮起幽蓝的火，还发出嘶嘶声','#d9e6e2');
    cap(t,15.2,T.foil,'有人说是圣徒显灵，有人说是死神来索命',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'这火，为什么烧不坏木头？',PAPER,215,68);sea(t,a*0.6);ship(t,a*0.6,{fire:1});
    txt('?',1500,520,110,RED,{f:SERIF,a:a*(0.5+0.5*Math.sin(t*4)),glow:'rgba(255,60,60,.6)'});
    cap(t,T.foil+.4,18.4,'它不冒烟、不烧帆，风吹雨打也不灭');cap(t,18.5,T.hit,'水手用守护神圣艾尔摩的名字，叫它"圣艾尔摩之火"');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'它根本不是火！',RED,215,96,{pop:1,fi:.02});
    const x=960,y=520;line([[x,880],[x,y]],CYAN,6,true,a);fireAt(t,x,y,a,1.6);
    for(let k=0;k<7;k++){const an=-Math.PI/2+(k-3)*0.32;line([[x+Math.cos(an)*60,y+Math.sin(an)*60],[x+Math.cos(an)*200,y+Math.sin(an)*200]],GREEN,2,false,a*seg(t,22,22.5)*0.7);}
    txt('是电',1340,560,90,GREEN,{a:a*seg(t,22.4,22.8),glow:'rgba(109,255,192,.6)'});
    cap(t,T.hit+.8,T.trace,'没有燃烧，是空气本身在发光——一种放电');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：1751 年，富兰克林的猜想',PAPER,215,64);cloud(960,420,a,DIM);
    charges(960,380,8,90,a*seg(t,25.6,26),'-',RED);line([[960,880],[960,600]],CYAN,5,true,a);fireAt(t,960,600,a*seg(t,27.6,28),1.2);
    txt('尖铁杆',1080,760,34,CYAN,{f:SANS,w:700,a:a*seg(t,26,26.4),al:'left'});
    cap(t,T.trace+.4,28.1,'富兰克林猜想：雷雨天，尖铁杆的顶端会发光');cap(t,28.2,T.reveal,'这个想法，后来引出了避雷针');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('约 100 千伏/米',W/2,420,140,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('电晕放电',W/2,590,72,'#b9b4ff',{a:a*seg(t,31.6,32),glow:'rgba(150,140,255,.7)'});
    txt('氮气、氧气被激发，发出蓝紫光',W/2,700,40,GREEN,{f:SANS,w:700,a:a*seg(t,32.6,33)});
    cap(t,T.reveal+.6,34.4,'雷雨云让电场强到每米约 10 万伏，潮湿空气开始放电');cap(t,34.5,T.eye,'和霓虹灯一个原理，只是颜色不同');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么偏偏是桅杆尖？',PAPER,215,64);
    circ(620,600,110,CYAN,3,a);charges(620,600,8,140,a*seg(t,37.4,37.8),'+',WARM);txt('圆：电荷分散',620,800,34,CYAN,{f:SANS,w:700,a});
    line([[1300,820],[1300,520]],CYAN,5,true,a);line([[1260,820],[1340,820]],CYAN,4,true,a);for(let k=0;k<5;k++)txt('+',1300+(k-2)*18,500-Math.abs(k-2)*10,30,WARM,{f:MONO,a:a*seg(t,38.4,38.8)});fireAt(t,1300,500,a*seg(t,38.8,39.2),1.1);
    txt('尖：电荷挤在顶端',1300,880,34,WARM,{f:SANS,w:700,a:a*seg(t,38.4,38.8)});
    cap(t,T.eye+.4,39.9,'越尖的地方电场越集中，越先"点亮"');cap(t,40,T.off,'飞机机翼、教堂尖顶上，也都出现过');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'不是鬼火，是空气在发光',PAPER,215,66);glowDot(1600,330,300,'rgba(255,200,120,.3)',a);circ(1600,330,50,WARM,3,a,'rgba(255,200,120,.2)');
    sea(t,a,WARM);ship(t,a,{col:WARM});
    cap(t,T.off+.4,T.end,'雷雨过去，电场减弱，"鬼火"就熄了');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些桅杆"鬼火"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是被电亮的空气',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：富兰克林 1751 年书信 · 皮加费塔航海记录 · 大英百科全书',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你见过雷雨天的怪光吗？｜评论区报案',GREEN);}
}
function coverScene(){ctx.save();ctx.translate(0,70);sea(3,1);ship(3,1,{fire:1,still:1});ctx.restore();cloud(420,420,0.6);ghost(1600,640,0.75,0.55);
  txt('暴风雨夜，桅杆燃起鬼火',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('烧了几百年，从没点着帆？',W/2,318,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('100kV/m',300,950,-1,0,GREEN,56,-0.1);}
