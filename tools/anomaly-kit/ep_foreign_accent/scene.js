// CASE 045 外国口音综合征（1941.9.6 奥斯陆空袭，28 岁的 Astrid L. 被弹片击中头部，醒来后挪威语带德国口音，被当成德国人；Monrad-Krohn 1947《Brain》；左脑语言区受损→韵律改变）
const EP={caseNo:'045',name:'被"换掉"的声音',sfx:{ghost:[11.4,12.9,14.3],stings:[12.6],blips:[21.8,22.4,26.0,27.4,33.0,34.2,38.4,39.6],whisper:[10,16]}};
function city(t,a,c=CYAN){if(a<=0)return;const gy=760;const r=rng(5);let x=200;const pts=[[160,gy]];
  while(x<1760){const w=60+r()*90,h=80+r()*200;pts.push([x,gy],[x,gy-h],[x+w,gy-h],[x+w,gy]);
    if(r()<0.3){pts.push([x+w,gy-h-40]);}x+=w+10;}
  pts.push([1760,gy]);line(pts,c,2.5,true,a);
  line([[880,gy],[880,gy-330],[905,gy-380],[930,gy-330],[930,gy]],c,3,true,a);}
function contour(x0,y,w,amp,t,col,a,jag){if(a<=0)return;const pts=[];for(let i=0;i<=120;i++){const q=i/120;let v=Math.sin(q*9+t*2)*0.6+Math.sin(q*3.1)*0.4;
  if(jag){v=Math.round(v*2.2)/2.2+Math.sin(q*40)*0.25;}pts.push([x0+q*w,y-v*amp]);}line(pts,col,3,true,a);}
function hospital(t,a,c=CYAN){roomBox(420,1500,400,820,a,c);bed(960,720,520,a,c);line([[1300,440],[1300,620]],c,2,true,a*0.6);rect(1270,440,60,40,c,2,a*0.6);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'醒来后，她变成了"外国人"',PAPER,215,82,{pop:1});sub(t,.9,T.lab,'从没出过国，一开口却满是外国口音');
    personStand(960,800,1.3,a);ghost(1180,640,1.0,a*flashA(t,[1.7,2.8,3.6],0.12));
    contour(560,470,800,30,t,GREEN,a*0.6,t>2.4);stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1941 年 9 月 · 挪威 · 奥斯陆',PAPER,215,62);city(t,a);
    for(const [k,x] of [[6.0,620],[6.8,1300],[7.6,980]]){const f=win(t,k,k+0.6,.05,.5);glowDot(x,560,220,'rgba(255,190,110,.55)',a*f);}
    cap(t,T.lab+.4,7.4,'1941 年 9 月 6 日，奥斯陆遭到空袭');cap(t,7.4,T.night+.2,'28 岁的阿斯特丽德被弹片击中了头部');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    hospital(t,a*0.6);personLie(960,690,1,a,PAPER,seg(t,11.6,12));
    ghost(1240,560,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.4,12.9,14.3],0.14));ghost(700,560,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    contour(560,340,800,34,t,RED,a*seg(t,12.6,13),1);
    cap(t,T.night+.3,12.5,'她昏迷了好几天，终于醒来……');cap(t,12.6,15.1,'可她一开口，说的挪威语像个德国人','#d9e6e2');
    cap(t,15.2,T.foil,'像被另一个人"附身"了',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'她被当成了"敌人"',PAPER,215,72);
    [[560,16.6],[960,17.2],[1360,17.8]].forEach(([x,t0],i)=>{const ca=a*seg(t,t0,t0+.3);line([[x-140,720],[x-140,500],[x,420],[x+140,500],[x+140,720],[x-140,720]],CYAN,3,true,ca);txt('商店',x,600,44,PAPER,{a:ca});line([[x-110,460],[x+110,700]],RED,5,true,a*seg(t,18.8+i*.2,19.1+i*.2));line([[x+110,460],[x-110,700]],RED,5,true,a*seg(t,18.8+i*.2,19.1+i*.2));});
    cap(t,T.foil+.4,18.4,'当时挪威正被纳粹德国占领');cap(t,18.5,T.hit,'店主们以为她是德国人，不肯卖东西给她');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'是左脑的语言区受伤了！',RED,215,90,{pop:1,fi:.02});
    brain(960,620,1.8,CYAN,a);const pu=0.6+0.4*Math.sin(t*8);glowDot(820,560,120,'rgba(255,60,60,.8)',a*pu*seg(t,21.3,21.6));circ(820,560,40,RED,4,a*seg(t,21.3,21.6));
    txt('左',560,620,44,PAPER,{f:SANS,a:a*seg(t,22,22.4)});txt('右',1360,620,44,PAPER,{f:SANS,a:a*seg(t,22,22.4)});
    cap(t,T.hit+.8,T.trace,'弹片损伤了她大脑左半球管说话的区域');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：变的到底是什么？',PAPER,215,64);
    txt('受伤前',380,470,34,GREEN,{f:SANS,w:700,a:a*seg(t,25.6,26),al:'right'});contour(460,470,1000,40,t,GREEN,a*seg(t,25.6,26),0);
    txt('受伤后',380,700,34,RED,{f:SANS,w:700,a:a*seg(t,26.8,27.2),al:'right'});contour(460,700,1000,40,t,RED,a*seg(t,26.8,27.2),1);
    txt('音高 · 节奏 · 重音',1640,585,34,PAPER,{f:SANS,w:700,a:a*seg(t,28.4,28.8)});
    cap(t,T.trace+.4,28.1,'神经科医生蒙拉德-克罗恩反复听她说话');cap(t,28.2,T.reveal,'她用的词没变，变的是说话的"旋律"');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('外国口音综合征',W/2,420,130,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('FOREIGN ACCENT SYNDROME',W/2,560,48,RED,{f:MONO,a:a*seg(t,31.4,31.8)});
    txt('1947',760,700,96,GREEN,{f:MONO,a:a*seg(t,32.6,33),glow:'rgba(109,255,192,.6)'});txt('《Brain》期刊',1120,700,48,PAPER,{f:SANS,w:700,a:a*seg(t,33,33.4)});
    cap(t,T.reveal+.6,34.4,'1947 年，他在《Brain》上发表了这个病例');cap(t,34.5,T.eye,'这种病极罕见，全世界有记录的病例并不多');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么听起来像"外国人"？',PAPER,215,64);
    [['说的人','重音、元音、停顿全变了',640,37.3],['听的人','大脑自动归成"某国口音"',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,76,WARM,{a:ca});txt(s,x,630,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'脑损伤让她的重音、元音长短和停顿都变了样');cap(t,40,T.off,'听的人把这种陌生感，自动归成了"外国口音"');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'她没有被附身',PAPER,215,70);glowDot(W/2,600,560,'rgba(255,200,120,.22)',a);
    personStand(960,820,1.3,a,WARM);contour(560,470,800,30,t,WARM,a*0.7,0);
    cap(t,T.off+.4,T.end,'只是大脑里的"发音旋律"被打乱了');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"附身"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是大脑受了伤',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：Monrad-Krohn 1947《Brain》· Hem 2006《挪威医学会杂志》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你听过最离奇的口音？｜评论区报案',GREEN);}
}
function coverScene(){personStand(960,860,1.4,1);ghost(1220,760,1.1,0.75);contour(460,450,1000,36,3,RED,0.7,1);
  txt('醒来后，她满口外国口音',W/2,215,104,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('被全城当成了敌人',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1941',300,920,-1,0,GREEN,64,-0.1);}
