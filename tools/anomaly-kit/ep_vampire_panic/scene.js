// CASE 049 新英格兰吸血鬼恐慌（罗德岛埃克塞特 George Brown 家：妻子 1883.12、长女 Mary Olive 1884.6 去世；1891 Mercy 与 Edwin 染痨病；Mercy 1892 年 1 月去世，19 岁；1892.3.17 村民、医生 Harold Metcalf、记者开棺；心肝有血，被烧成灰兑水给 Edwin，两个月后仍去世；真凶肺结核；Koch 1882 发现结核杆菌）
const EP={caseNo:'049',name:'坟里的"吸血鬼"',sfx:{ghost:[11.3,12.8,14.3],stings:[12.6],blips:[21.8,22.4,26.0,26.6,27.2,27.8,33.0,34.2,38.4,39.6],whisper:[10,16]}};
const GND=800;
function stone(x,y,s,a,c=CYAN,label){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  line([[-60,0],[-60,-120],[-40,-150],[0,-160],[40,-150],[60,-120],[60,0]],c,3.5,true,a);line([[-20,-110],[20,-110]],c,2.5,true,a*0.8);line([[0,-130],[0,-80]],c,2.5,true,a*0.8);
  if(label)txt(label,0,-50,26,c,{f:MONO,a:a*0.9});ctx.restore();}
function yard(t,a,c=CYAN){if(a<=0)return;line([[160,GND],[1760,GND]],c,3,true,a);
  [[420,0.9],[640,1.1],[1280,1.0],[1500,0.85]].forEach(([x,s])=>stone(x,GND,s,a*0.8,c));
  // 枯树
  line([[1720,GND],[1700,560],[1650,480]],c,3,true,a*0.6);line([[1700,620],[1760,540]],c,2.5,true,a*0.6);}
function family(t,a,alive){const P=[[620,'母亲'],[800,'大女儿'],[980,'梅西'],[1160,'埃德温'],[1340,'父亲']];
  P.forEach(([x,n],i)=>{const al=alive[i];personStand(x,760,0.75,a*(0.25+0.75*al),al<0.5?'rgb(140,150,150)':PAPER);txt(n,x,810,30,PAPER,{f:SANS,w:700,a:a*(0.4+0.6*al)});});}
function coffin(x,y,a,c=CYAN){if(a<=0)return;line([[x-180,y],[x-140,y-60],[x+140,y-60],[x+180,y],[x+140,y+60],[x-140,y+60],[x-180,y]],c,3.5,true,a);line([[x-40,y],[x+40,y]],c,2.5,true,a*0.7);line([[x,y-30],[x,y+30]],c,2.5,true,a*0.7);}
function heart(x,y,s,c,a){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=4;ctx.shadowColor=c;ctx.shadowBlur=20;
  ctx.beginPath();ctx.moveTo(0,40);ctx.bezierCurveTo(-90,-20,-50,-90,0,-45);ctx.bezierCurveTo(50,-90,90,-20,0,40);ctx.stroke();ctx.restore();}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'村民挖开了她的坟',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'他们怀疑：死去的女孩，每晚都在吸家人的命');
    yard(t,a);stone(960,GND,1.3,a,RED,'1892');ghost(960,560,0.9,a*flashA(t,[1.6,2.7,3.5],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1892 年 · 美国 · 罗德岛 · 埃克塞特',PAPER,215,58);
    family(t,a*seg(t,4.8,5.3),[1-seg(t,7.6,8.2),1-seg(t,8.6,9.2),1,1,1]);
    txt('1883',620,480,48,RED,{f:MONO,a:a*seg(t,7.6,8)});txt('1884',800,480,48,RED,{f:MONO,a:a*seg(t,8.6,9)});
    cap(t,T.lab+.4,7.4,'罗德岛农夫乔治·布朗家，接连有人病倒');cap(t,7.4,T.night+.2,'1883 年妻子去世，第二年大女儿也走了');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    line([[1720,GND],[1700,560],[1650,480]],CYAN,3,true,a*0.5);line([[1700,620],[1760,540]],CYAN,2.5,true,a*0.5);family(t,a*0.9,[0,0,1-seg(t,12.6,13.4),1-seg(t,13,15)*0.5,1]);
    ghost(1500,580,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.3,12.8,14.3],0.14));ghost(980,560,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'1891 年，女儿梅西和儿子埃德温也病了');cap(t,12.6,15.1,'1892 年 1 月，19 岁的梅西去世，埃德温越来越虚弱','#d9e6e2');
    cap(t,15.2,T.foil,'村里传言：是死去的人在吸活人的命',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'1892 年 3 月 17 日 · 开棺',PAPER,215,66);
    coffin(960,620,a*seg(t,16.4,16.8));stone(560,GND,0.9,a*seg(t,16.6,17),CYAN);stone(1360,GND,0.9,a*seg(t,16.8,17.2),CYAN);
    line([[1500,760],[1600,480]],PAPER,4,true,a*seg(t,17.2,17.6));line([[1480,770],[1520,740],[1540,790],[1500,800],[1480,770]],PAPER,3,true,a*seg(t,17.2,17.6));
    cap(t,T.foil+.4,18.4,'村民带着医生和记者，挖开了三母女的坟');cap(t,18.5,T.hit,'母亲和姐姐的遗体早已腐烂，可梅西……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'她的心脏里还有血！',RED,215,96,{pop:1,fi:.02});
    const pu=1+0.08*Math.sin(t*9);heart(760,600,2.2*pu,RED,a);glowDot(760,600,220,'rgba(255,40,40,.35)',a);
    for(let i=0;i<8;i++){const q=(t*0.8+i/8)%1;const fx=1220+Math.sin(i*2.1)*60;line([[fx,700],[fx+Math.sin(t*5+i)*20,700-q*220]],WARM,4,true,a*seg(t,23.4,23.8)*(1-q));}
    glowDot(1220,640,160,'rgba(255,170,80,.35)',a*seg(t,23.4,23.8));txt('烧成灰',1220,760,40,WARM,{f:SANS,w:900,a:a*seg(t,23.4,23.8)});
    cap(t,T.hit+.8,23.4,'梅西的心脏和肝脏里，竟然还有血');cap(t,23.4,T.trace,'村民把心脏烧成灰，兑水给埃德温喝下');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：一家人得的是什么病？',PAPER,215,64);
    [['脸色苍白',26.0],['日渐消瘦',26.6],['咳嗽咳血',27.2],['夜里盗汗',27.8]].forEach(([s,t0],i)=>{const x=420+i*360,ca=a*seg(t,t0,t0+.3);rect(x-150,480,300,180,CYAN,3,ca,'rgba(127,232,255,.05)');txt(s,x,570,44,PAPER,{a:ca});});
    txt('就像被一点点"吸干"',W/2,760,48,RED,{f:SANS,w:900,a:a*seg(t,28.6,29),glow:'rgba(255,60,60,.5)'});
    cap(t,T.trace+.4,28.1,'可两个月后，埃德温还是去世了');cap(t,28.2,T.reveal,'其实，这一家人的症状几乎一模一样');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('肺结核',W/2,410,170,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('TUBERCULOSIS',W/2,560,52,RED,{f:MONO,a:a*seg(t,31.4,31.8)});
    txt('1882',760,700,96,GREEN,{f:MONO,a:a*seg(t,32.6,33),glow:'rgba(109,255,192,.6)'});txt('科赫发现结核杆菌',1160,700,48,PAPER,{f:SANS,w:700,a:a*seg(t,33,33.4)});
    cap(t,T.reveal+.6,34.4,'真凶是肺结核，当时人们叫它"痨病"');cap(t,34.5,T.eye,'其实十年前，科赫就已发现了结核杆菌');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么像"死人吸活人"？',PAPER,215,64);
    [['传染','一家人同住，咳嗽一个传一个',640,37.3],['遗体','天冷、才下葬两个月',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,76,WARM,{a:ca});txt(s,x,630,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'病菌随咳嗽在家里传播，家人就一个接一个病倒');cap(t,40,T.off,'医生当时就说：才下葬两个月，心里有血很正常');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'痨病，不再是绝症',PAPER,215,70);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    yard(t,a,WARM);stone(960,GND,1.3,a,WARM,'MERCY');
    cap(t,T.off+.4,T.end,'今天，肺结核已经可以用抗生素治愈');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"吸血鬼"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('其实是看不见的病菌',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1580,480,46.2,t,RED,90,-0.14);
    txt('资料：Bell《Food for the Dead》2001 · History.com 2014 · 罗德岛历史学会',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'致敬梅西·布朗｜评论区报案',GREEN);}
}
function coverScene(){yard(3,1);stone(960,GND,1.4,1,RED,'1892');ghost(960,560,1.0,0.75);
  txt('村民挖开坟，找"吸血鬼"',W/2,215,104,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('19 岁女孩的心脏里，竟然还有血',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1892',300,940,-1,0,GREEN,64,-0.1);}
