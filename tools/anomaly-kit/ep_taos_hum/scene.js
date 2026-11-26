// CASE 054 陶斯嗡鸣（美国新墨西哥陶斯，1990 年代初开始被报告；1993 国会议员要求调查，新墨西哥大学 Joe Mullins 带队约十几人；1440 名受访者中 161 人是"听见者"，约占总人口 2%；多在晚 8 点–早 9 点；约 80% 每周至少一次；描述频率约 32–80 Hz、0.5–2 Hz 调制、接近听阈；电磁信号来自电线与发射塔；结论：没有已知声学信号能解释；至今无公认解释）
const EP={caseNo:'054',name:'只有少数人听见的嗡鸣',sfx:{ghost:[11.2,12.8,14.4],stings:[12.8],blips:[22.2,23.0,26.2,27.4,33.4,34.6,38.4,39.6],whisper:[10,16]}};
const GND=820;
function adobe(x,w,h,a,c=CYAN,lit=0){if(a<=0)return;line([[x-w/2,GND],[x-w/2,GND-h],[x+w/2,GND-h],[x+w/2,GND]],c,3.5,true,a);
  for(let k=0;k<3;k++)line([[x-w/2+30+k*(w-60)/2,GND-h+14],[x-w/2+30+k*(w-60)/2,GND-h+28]],c,3,true,a*0.8);
  rect(x-28,GND-h/2-30,56,50,c,2.5,a*0.8,lit?`rgba(255,207,122,${0.35*lit})`:null);}
function town(t,a,c=CYAN,lit=0){if(a<=0)return;line([[120,GND],[1800,GND]],c,3,true,a);
  // 远山
  line([[120,GND-120],[380,GND-300],[560,GND-180],[820,GND-360],[1100,GND-200],[1380,GND-320],[1600,GND-170],[1800,GND-240]],c,2,false,a*0.35);
  [[420,200,150],[700,260,190],[1000,220,160],[1280,280,200],[1560,200,140]].forEach(([x,w,h],i)=>adobe(x,w,h,a,c,lit*(i%2)));}
function hum(x,y,t,a,c=GREEN,r0=40){if(a<=0)return;const md=0.6+0.4*Math.sin(t*2*Math.PI*0.9);ctx.save();for(let k=0;k<6;k++){const q=((t*0.35)+k/6)%1;ctx.globalAlpha=a*(1-q)*0.45*md;ctx.strokeStyle=c;ctx.lineWidth=3;ctx.shadowColor=c;ctx.shadowBlur=12;ctx.beginPath();ctx.arc(x,y,r0+q*420,0,6.283);ctx.stroke();}ctx.restore();}
function sine(x0,x1,y,f,amp,t,a,c){const pts=[];for(let i=0;i<=300;i++){const u=i/300;const md=0.65+0.35*Math.sin(u*6.28*1.5+t);pts.push([lerp(x0,x1,u),y+Math.sin(u*f*6.28-t*4)*amp*md]);}line(pts,c,3.5,true,a);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'小镇深夜的嗡嗡声',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'只有少数人听得见，有人整夜睡不着');
    town(t,a*0.8);hum(1000,640,t,a);ghost(1640,640,0.9,a*flashA(t,[1.5,2.6,3.5],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1990 年代初 · 美国 · 新墨西哥 · 陶斯',PAPER,215,58);
    town(t,a*seg(t,4.8,5.3),CYAN,1);hum(1280,600,t,a*seg(t,7.4,7.8),GREEN);
    cap(t,T.lab+.4,7.4,'1990 年代初，陶斯小镇的居民开始抱怨一种怪声');cap(t,7.4,T.night+.2,'低沉、持续，像远处有台柴油机在空转');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    roomBox(460,1460,380,860,a*0.6);bed(820,760,420,a*0.8);personLie(840,730,1,a,PAPER,1);personLie(840,690,0.9,a*0.5,'#7f8f8b');
    hum(840,700,t,a*0.8,GREEN,30);txt('03:12',1300,520,40,RED,{f:MONO,a,glow:'rgba(255,60,60,.6)'});
    ghost(1650,560,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.2,12.8,14.4],0.14));ghost(1200,560,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.6,'怪声多在晚上 8 点到早上 9 点之间响起');cap(t,12.7,15.1,'可睡在旁边的家人，什么也听不见……','#d9e6e2');
    cap(t,15.2,T.foil,'只有你听得见的声音，是从哪来的？',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'1993 年 · 国会要求调查',PAPER,215,66);
    for(let i=0;i<12;i++){const x=560+(i%6)*160,y=i<6?600:800;personStand(x,y,0.65,a*seg(t,16.5+i*0.12,16.8+i*0.12),i==0?GREEN:PAPER);}
    cap(t,T.foil+.4,18.4,'1993 年，新墨西哥州的国会议员要求查个明白');cap(t,18.5,T.hit,'新墨西哥大学的穆林斯，带着十几位研究者进驻小镇');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'只有约 2% 的人听得见！',RED,215,96,{pop:1,fi:.02});
    for(let i=0;i<100;i++){const x=600+(i%20)*36,y=430+Math.floor(i/20)*70;const on=i==37||i==82;personStand(x,y+50,0.28,a*seg(t,21.2+i*0.008,21.4+i*0.008),on?RED:'rgb(120,135,130)');}
    txt('161 / 1440',1560,500,48,GREEN,{f:MONO,a:a*seg(t,22.2,22.6)});txt('受访者中的"听见者"',1560,560,28,DIM,{f:SANS,w:500,a:a*seg(t,22.2,22.6)});
    txt('80%',1560,690,60,WARM,{f:MONO,a:a*seg(t,23,23.4)});txt('每周至少听到一次',1560,750,28,DIM,{f:SANS,w:500,a:a*seg(t,23,23.4)});
    cap(t,T.hit+.8,23.3,'调查发现：镇上大约 2% 的人是"听见者"');cap(t,23.4,T.trace,'而他们里约 80%，每周至少听到一次');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：仪器能录到它吗？',PAPER,215,64);
    town(t,a*0.6);
    // 麦克风
    const mic=(x,y,ca)=>{rect(x-14,y-60,28,50,GREEN,3,ca);line([[x,y-10],[x,y+60]],GREEN,3,true,ca);line([[x-30,y+60],[x+30,y+60]],GREEN,3,true,ca);};
    mic(560,GND-80,a*seg(t,26.2,26.6));mic(1140,GND-80,a*seg(t,26.4,26.8));
    // 电线塔
    const ta=a*seg(t,27.4,27.8);line([[1660,GND],[1700,GND-320],[1740,GND]],WARM,3,true,ta);line([[1650,GND-250],[1750,GND-250]],WARM,3,true,ta);line([[1750,GND-250],[1880,GND-230]],WARM,2,true,ta*0.6);
    txt('60 Hz 电线',1700,GND-360,30,WARM,{f:SANS,w:700,a:ta});
    cap(t,T.trace+.4,28.2,'研究者用灵敏的麦克风和电磁仪器四处监测');cap(t,28.3,T.reveal,'测到的电磁信号，都能追到电线和发射塔');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('32–80 Hz',W/2,400,170,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    sine(380,1540,620,7,50,t,a*seg(t,33.4,33.8),GREEN);txt('忽强忽弱',1700,620,36,GREEN,{f:SANS,w:700,a:a*seg(t,33.4,33.8)});
    txt('接近人耳能听到的下限',W/2,760,44,PAPER,{f:SANS,w:700,a:a*seg(t,34.6,35)});
    cap(t,T.reveal+.6,34.4,'听见者描述：约 32 到 80 赫兹的低频声，忽强忽弱');cap(t,34.5,T.eye,'可仪器始终没录到能解释它的声音');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么只有少数人听见？',PAPER,215,64);
    [['耳朵特别灵','对低频声格外敏感',640,37.3],['脑子里的声音','耳朵或大脑自己"造"的',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,64,WARM,{a:ca});txt(s,x,610,32,PAPER,{f:SANS,w:500,a:ca});txt('（一种解释）',x,670,28,DIM,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'也许少数人对低频声格外敏感');cap(t,40,T.off,'也可能是耳朵和大脑自己"造"出的声音，就像耳鸣');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'调查结论',PAPER,215,70);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    town(t,a,WARM,1);
    cap(t,T.off+.4,T.end,'没有任何已知的声音信号，能解释陶斯嗡鸣');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"怪声"',760,400,110,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('可能只在你的耳朵里',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('悬案待查',1580,480,46.2,t,RED,80,-0.14);
    txt('至今没有公认解释 · 资料：新墨西哥大学 Joe Mullins 等陶斯嗡鸣调查（1993 起）· Live Science · Sciencing',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你半夜听到过怪声吗？评论区报案',GREEN);}
}
function coverScene(){town(3,1,CYAN,1);hum(1000,640,1.2,1);ghost(1640,660,1.0,0.7);
  txt('深夜嗡嗡响，家人却听不见',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('全镇只有约 2% 的人听得到它',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('32–80Hz',320,940,-1,0,GREEN,56,-0.1);}
