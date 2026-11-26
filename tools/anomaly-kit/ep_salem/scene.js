// CASE 051 塞勒姆女巫审判（1692.2 Betty Parris 9 岁、Abigail Williams 11 岁发病；200 多人被指控，19 人被绞死；Caporael 1976《Science》麦角中毒说为一种解释；Spanos & Gottlieb 1976.12《Science》反驳；1711 平反赔偿）
const EP={caseNo:'051',name:'塞勒姆中邪的女孩',sfx:{ghost:[11.2,12.7,14.2],stings:[12.7],blips:[26.0,27.0,28.0,33.4,34.6,38.4,39.6],whisper:[10,16]}};
function girl(x,y,s,a,c,jit,t,seed){if(a<=0)return;const r=jit*Math.sin(t*31+seed)*0.12;ctx.save();ctx.translate(x,y);ctx.rotate(r);
  personStand(0,0,s,a,c);// 裙子
  line([[-30*s,-60*s],[-46*s,-4*s],[46*s,-4*s],[30*s,-60*s]],c,3,true,a*0.8);ctx.restore();}
function house(x,y,a,c=CYAN){if(a<=0)return;line([[x-200,y],[x-200,y-200],[x,y-330],[x+200,y-200],[x+200,y],[x-200,y]],c,3.5,true,a);rect(x-40,y-120,80,120,c,3,a);rect(x-150,y-170,70,60,c,2.5,a*0.8);rect(x+80,y-170,70,60,c,2.5,a*0.8,'rgba(255,207,122,.15)');
  line([[x,y-330],[x,y-380]],c,3,true,a*0.8);line([[x-22,y-360],[x+22,y-360]],c,3,true,a*0.8);}
function rye(x,y,a,bad,t){if(a<=0)return;const sw=Math.sin(t*1.3+x)*8;line([[x,y],[x+sw*0.5,y-260],[x+sw,y-420]],WARM,3,true,a);
  for(let i=0;i<9;i++){const yy=y-300-i*14,sd=i%2?1:-1;const isBad=bad&&(i==3||i==6||i==1);const xx=x+sw*(0.75+i*0.03);
    ctx.save();ctx.globalAlpha*=a;ctx.translate(xx+sd*12,yy);ctx.rotate(sd*0.5);ctx.strokeStyle=isBad?RED:WARM;ctx.fillStyle=isBad?'rgba(60,10,20,.95)':'rgba(255,207,122,.15)';ctx.lineWidth=2.5;ctx.shadowColor=isBad?RED:WARM;ctx.shadowBlur=isBad?16:8;
    ctx.beginPath();ctx.ellipse(0,isBad?-8:0,isBad?6:7,isBad?24:12,0,0,6.28);ctx.fill();ctx.stroke();ctx.restore();}}
function crowd(t,a,t0,lit){const n=200;for(let i=0;i<n;i++){const c=i%25,r=Math.floor(i/25);const x=560+c*34,y=430+r*50;const on=seg(t,t0+i*0.012,t0+i*0.012+.1);
    const is19=lit&&[3,17,29,41,48,60,77,88,95,104,119,126,133,148,155,167,172,186,198].includes(i);
    circ(x,y-12,6,is19?RED:PAPER,2,a*on*(is19?1:0.55));line([[x,y-6],[x,y+12]],is19?RED:PAPER,2,false,a*on*(is19?1:0.55));}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'女孩们突然中邪了',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'抽搐、尖叫，说有看不见的人在掐她们');
    girl(820,780,1.3,a,PAPER,1,t,1);girl(1100,780,1.4,a,PAPER,1,t,2);
    ghost(1420,600,0.95,a*flashA(t,[1.4,2.5,3.5],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1692 年 · 美国 · 马萨诸塞 · 塞勒姆村',PAPER,215,58);
    house(660,830,a*seg(t,4.8,5.3));txt('牧师家',660,880,30,DIM,{f:SANS,w:500,a:a*seg(t,5,5.4)});
    girl(1120,800,1.0,a*seg(t,5.6,6),PAPER,0,t,1);girl(1380,800,1.1,a*seg(t,5.9,6.3),PAPER,0,t,2);
    txt('贝蒂 · 9 岁',1120,850,30,PAPER,{f:SANS,w:700,a:a*seg(t,7.4,7.8)});txt('阿比盖尔 · 11 岁',1380,850,30,PAPER,{f:SANS,w:700,a:a*seg(t,7.6,8)});
    cap(t,T.lab+.4,7.4,'1692 年 2 月，塞勒姆村牧师家的女孩突然发病');cap(t,7.4,T.night+.2,'9 岁的贝蒂，和她 11 岁的表姐阿比盖尔');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    house(400,830,a*0.4);
    const more=seg(t,12.6,13.4);girl(860,790,1.2,a,PAPER,1,t,1);girl(1080,790,1.25,a,PAPER,1,t,2);girl(1300,790,1.2,a*more,PAPER,1,t,3);girl(1500,790,1.15,a*more,PAPER,1,t,4);
    ghost(1600,560,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.2,12.7,14.2],0.14));ghost(1080,520,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'她们浑身抽搐，说被看不见的人掐、用针扎');cap(t,12.6,15.1,'很快，村里更多女孩出现了同样的症状','#d9e6e2');
    cap(t,15.2,T.foil,'医生的结论：她们被施了巫术',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'一场"猎巫"开始了',PAPER,215,70);
    crowd(t,a,16.3,t>18.5);txt('19',1560,820,60,RED,{f:MONO,a:a*seg(t,18.6,19),glow:'rgba(255,60,60,.6)'});
    cap(t,T.foil+.4,18.4,'200 多人被指控是女巫');cap(t,18.5,T.hit,'那一年，19 个无辜的人被处死');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'"巫术"可能藏在面包里？',RED,215,92,{pop:1,fi:.02});
    for(let i=0;i<5;i++)rye(640+i*90,860,a*seg(t,21.2+i*0.1,21.5+i*0.1),seg(t,22.6,23)>0.5,t);
    txt('麦角菌',1320,520,72,RED,{a:a*seg(t,22.6,23),glow:'rgba(255,60,60,.6)'});txt('Claviceps purpurea',1320,610,32,PAPER,{f:MONO,w:400,a:a*seg(t,22.8,23.2)});
    txt('（一种解释）',1320,680,32,DIM,{f:SANS,w:500,a:a*seg(t,23,23.4)});
    cap(t,T.hit+.8,23.3,'1976 年，心理学家卡波雷尔在《科学》上提出一个猜测');cap(t,23.4,T.trace,'女孩们吃的黑麦面包里，可能长了麦角菌');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：1691 年的黑麦田',PAPER,215,64);
    [['温暖多雨','麦角菌疯长',26.0],['黑麦是主粮','家家都吃',27.0],['存到冬天','磨成面包',28.0]].forEach(([b,s,t0],i)=>{const x=520+i*440,ca=a*seg(t,t0,t0+.3);rect(x-180,400,360,300,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,52,WARM,{a:ca});txt(s,x,610,36,PAPER,{f:SANS,w:500,a:ca});
      if(i<2)line([[x+190,550],[x+250,550]],GREEN,4,true,ca);});
    cap(t,T.trace+.4,28.2,'她查到：1691 年当地春夏温暖多雨');cap(t,28.3,T.reveal,'正适合麦角菌在黑麦上生长');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('麦角中毒',W/2,400,160,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    [['抽搐',33.4],['刺痛',34.0],['幻觉',34.6]].forEach(([s,t0],i)=>txt(s,660+i*300,600,64,PAPER,{a:a*seg(t,t0,t0+.3),glow:'rgba(127,232,255,.5)'}));
    txt('LSD',W/2,740,64,GREEN,{f:MONO,a:a*seg(t,35,35.4),glow:'rgba(109,255,192,.6)'});
    cap(t,T.reveal+.6,34.4,'麦角中毒会让人抽搐、皮肤刺痛、出现幻觉');cap(t,34.5,T.eye,'麦角里的化学物，和致幻剂 LSD 十分相似');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'但同一年，它就被反驳了',PAPER,215,64);
    [['麦角中毒说','（一种解释）',640,37.3,WARM],['集体恐慌说','（一种解释）',1280,38.6,CYAN]].forEach(([b,s,x,t0,c])=>{const ca=a*seg(t,t0,t0+.3);rect(x-270,400,540,300,c,3,ca,'rgba(127,232,255,.05)');txt(b,x,520,64,c,{a:ca});txt(s,x,620,32,DIM,{f:SANS,w:500,a:ca});});
    txt('VS',W/2,550,56,RED,{f:MONO,a:a*seg(t,38.4,38.8)});
    cap(t,T.eye+.4,39.9,'反驳者说：女孩们一见到被告才发作，不像中毒');cap(t,40,T.off,'也许是恐惧和猜疑，在小村子里一传十、十传百');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'1711 年，迟到的平反',PAPER,215,70);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    for(let i=0;i<5;i++)rye(700+i*130,860,a,false,t);
    cap(t,T.off+.4,T.end,'殖民地为许多受害者恢复名誉，并作出赔偿');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"中邪"',760,400,110,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('可能是毒，也可能是恐慌',760,560,78,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1580,480,46.2,t,RED,90,-0.14);
    txt('至今仍有争议 · 资料：Caporael 1976《Science》· Spanos & Gottlieb 1976《Science》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'致敬塞勒姆的无辜者｜评论区报案',GREEN);}
}
function coverScene(){girl(760,860,1.3,1,PAPER,0,0,1);girl(1000,860,1.4,1,PAPER,0,0,2);ghost(1260,680,1.0,0.75);
  for(let i=0;i<4;i++)rye(1440+i*90,900,1,true,2);
  txt('1692，女孩们集体"中邪"',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('让她们发狂的，可能是一块面包？',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1692',300,940,-1,0,GREEN,64,-0.1);}
