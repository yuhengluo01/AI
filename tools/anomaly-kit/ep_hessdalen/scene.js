// CASE 047 海斯达伦之光（挪威中部 Hessdalen 山谷；至少 1930 年代起有报告；1981 年底–1984 年最频繁，一周约 15–20 次；1983 年 Project Hessdalen；仪器记录到；一种解释：Monari 天然电池假说——西坡铁锌、东坡铜、Hesja 河含废矿硫酸；至今无公认解释）
const EP={caseNo:'047',name:'山谷幽灵光',sfx:{ghost:[11.5,12.9,14.4],stings:[12.6],blips:[21.6,22.2,22.8,26.0,27.4,33.0,34.2,38.4,39.6],whisper:[10,16]}};
const GY=760;
function valley(t,a,c=CYAN){if(a<=0)return;line([[120,520],[400,430],[640,560],[860,GY]],c,3.5,true,a);line([[1060,GY],[1300,560],[1560,420],[1800,500]],c,3.5,true,a);
  line([[860,GY],[1060,GY]],c,3,true,a);const pts=[];for(let x=870;x<=1050;x+=10)pts.push([x,GY-6+Math.sin(x*0.08+t*2)*3]);line(pts,c,1.5,false,a*0.6);
  for(const [x,y] of [[300,560],[1650,540],[520,620]]){line([[x-30,y],[x-30,y-34],[x,y-56],[x+30,y-34],[x+30,y],[x-30,y]],c,2,true,a*0.7);}}
function orb(x,y,r,col,a){if(a<=0)return;glowDot(x,y,r*4,col,a*0.8);circ(x,y,r*0.5,null,0,a,'rgba(255,255,240,.95)');}
function orbs(t,a,n=3){const C=['rgba(255,255,230,.9)','rgba(255,215,120,.9)','rgba(255,90,80,.9)'];
  for(let i=0;i<n;i++){const ph=i*2.1;const dart=Math.floor(t*0.7+i)%3==0;const x=960+Math.sin(t*(0.3+i*0.13)+ph)*500+(dart?Math.sin(t*6+i)*60:0);const y=380+i*60+Math.sin(t*0.5+ph)*40;
    orb(x,y,14+i*3,C[i%3],a*(0.6+0.4*Math.sin(t*3+ph)));}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'深夜山谷，光球在飘',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'它会悬停、会突然加速，然后凭空消失');
    valley(t,a);orbs(t,a*seg(t,0.8,1.4),3);ghost(1500,600,0.7,a*flashA(t,[1.8,2.9,3.6],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'挪威 · 海斯达伦山谷',PAPER,215,64);valley(t,a);
    txt('1981–1984',W/2,420,80,RED,{f:MONO,a:a*seg(t,7.4,7.8),glow:'rgba(255,60,60,.6)'});
    txt('一周约 15–20 次',W/2,520,44,PAPER,{f:SANS,w:700,a:a*seg(t,8,8.4)});
    cap(t,T.lab+.4,7.4,'挪威中部的海斯达伦山谷，几十年来怪光不断');cap(t,7.4,T.night+.2,'1981 年底到 1984 年最频繁，据报一周多达 15–20 次');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    valley(t,a*0.5);orbs(t*1.4,a*seg(t,10.3,10.8),3);
    const sudden=win(t,13.6,14.6,.05,.2);orb(lerp(1500,500,seg(t,13.6,14.4)),lerp(380,450,seg(t,13.6,14.4)),26,'rgba(255,90,80,.95)',a*sudden);
    ghost(700,620,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.5,12.9,14.4],0.14));ghost(1300,600,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'白色、黄色、红色的光球，在山谷上空游荡');cap(t,12.6,15.1,'有的只亮几秒，有的悬停一个多小时','#d9e6e2');
    cap(t,15.2,T.foil,'它们像在盯着山下的村子',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'UFO？山里的幽灵？',PAPER,215,72);
    [[560,'外星飞船?',16.4],[960,'山中幽灵?',17.0],[1360,'军方秘密?',17.6]].forEach(([x,s,t0],i)=>{const ca=a*seg(t,t0,t0+.3);rect(x-160,420,320,240,CYAN,3,ca,'rgba(127,232,255,.05)');txt(s,x,540,48,PAPER,{a:ca});line([[x-130,450],[x+130,630]],RED,5,true,a*seg(t,18.6+i*0.2,18.9+i*0.2));});
    cap(t,T.foil+.4,18.4,'村民说是 UFO，也有人说是山里的幽灵');cap(t,18.5,T.hit,'1983 年，科学家发起"海斯达伦计划"去抓它');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'光被仪器抓到了！',RED,215,92,{pop:1,fi:.02});
    // 雷达屏
    circ(620,620,180,GREEN,3,a);circ(620,620,110,GREEN,1.5,a*0.6);line([[620,620],[620+Math.cos(t*3)*180,620+Math.sin(t*3)*180]],GREEN,3,true,a);
    glowDot(690,560,40,'rgba(255,60,60,.9)',a*seg(t,21.6,21.9)*(0.6+0.4*Math.sin(t*10)));txt('雷达',620,850,36,PAPER,{f:SANS,w:700,a});
    // 相机/光谱
    rect(1060,480,420,260,CYAN,3,a*seg(t,22.2,22.5));orb(1270,600,18,'rgba(255,215,120,.9)',a*seg(t,22.4,22.7));txt('相机 · 光谱',1270,850,36,PAPER,{f:SANS,w:700,a:a*seg(t,22.2,22.5)});
    cap(t,T.hit+.8,T.trace,'不是幻觉：相机和雷达都记录到了这些光');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：山谷底下有什么？',PAPER,215,64);valley(t,a*0.9);
    ctx.save();ctx.globalAlpha=a*0.18*seg(t,25.6,26);ctx.fillStyle=CYAN;ctx.beginPath();ctx.moveTo(120,520);ctx.lineTo(400,430);ctx.lineTo(640,560);ctx.lineTo(860,GY);ctx.lineTo(860,880);ctx.lineTo(120,880);ctx.fill();ctx.restore();
    ctx.save();ctx.globalAlpha=a*0.18*seg(t,26.6,27);ctx.fillStyle=WARM;ctx.beginPath();ctx.moveTo(1060,GY);ctx.lineTo(1300,560);ctx.lineTo(1560,420);ctx.lineTo(1800,500);ctx.lineTo(1800,880);ctx.lineTo(1060,880);ctx.fill();ctx.restore();
    txt('西坡：铁 · 锌',440,700,40,CYAN,{f:SANS,w:900,a:a*seg(t,25.6,26)});txt('东坡：铜',1460,700,40,WARM,{f:SANS,w:900,a:a*seg(t,26.6,27)});
    txt('河水：混着废矿流出的硫酸',960,830,34,RED,{f:SANS,w:700,a:a*seg(t,28.4,28.8)});
    cap(t,T.trace+.4,28.1,'西边山坡的岩石富含铁和锌，东边富含铜');cap(t,28.2,T.reveal,'中间的河里，混着废弃矿井流出的含硫酸水');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('一节天然大电池',W/2,400,124,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('（一种解释）',W/2,510,40,PAPER,{f:SANS,w:700,a:a*seg(t,31.4,31.8)});
    const bx=960,by=680;rect(bx-260,by-70,520,140,GREEN,4,a*seg(t,32,32.4));rect(bx+260,by-30,30,60,GREEN,3,a*seg(t,32,32.4));
    txt('−  铁·锌',bx-130,by,40,CYAN,{f:SANS,w:900,a:a*seg(t,32.4,32.8)});txt('铜  +',bx+130,by,40,WARM,{f:SANS,w:900,a:a*seg(t,32.4,32.8)});
    for(let i=0;i<6;i++){const q=(t*1.2+i/6)%1;circ(lerp(bx-200,bx+200,q),by+48,4,null,0,a*seg(t,33,33.4),'rgba(109,255,192,.9)');}
    cap(t,T.reveal+.6,34.4,'意大利工程师莫纳里提出：整个山谷像一节电池');cap(t,34.5,T.eye,'他们在河两岸放石头做实验，电流足以点亮小灯泡');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'电怎么变成光球？',PAPER,215,64);
    [['假说','带电的气体聚在空中发光',640,37.3],['质疑','距离太远，能量对不上',1280,38.6]].forEach(([b,s,x,t0],i)=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,i?RED:CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,76,i?RED:WARM,{a:ca});txt(s,x,630,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'一种假说：冒出的气体带上电，聚在空中发光');cap(t,40,T.off,'也有物理学家质疑：距离太远，解释不通');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'至今没有公认解释',PAPER,215,70);glowDot(W/2,620,560,'rgba(255,200,120,.2)',a);
    valley(t,a,WARM);rect(1380,500,60,46,WARM,3,a);line([[1410,500],[1410,460]],WARM,3,true,a);
    cap(t,T.off+.4,T.end,'山上的自动观测站，至今还在日夜盯着天空');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"幽灵光"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('可能是大地在放电',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('悬案待查',1580,480,46.2,t,RED,80,-0.14);
    txt('资料：海斯达伦计划 Project Hessdalen · ScienceNorway 2014 · IFLScience 2023',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你见过说不清的怪光吗？｜评论区报案',GREEN);}
}
function coverScene(){valley(3,1);orb(700,520,22,'rgba(255,255,230,.9)',1);orb(1180,470,18,'rgba(255,215,120,.9)',1);orb(1420,560,24,'rgba(255,90,80,.95)',1);ghost(960,620,0.8,0.55);
  txt('山谷深夜，光球在盯着村子',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('雷达都拍到了，至今没人说得清',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1981',300,920,-1,0,GREEN,64,-0.1);}
