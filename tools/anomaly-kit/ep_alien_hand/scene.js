// CASE 059 异手综合征（Kurt Goldstein 1908：57 岁女病人中风后左手"有自己的意志"，乱抓东西、掐住自己喉咙，需用右手掰开；尸检见胼胝体等损伤；1972 Brion & Jedynak 命名"异手"；胼胝体约 2 亿根神经纤维；左右脑断连、动作脱离自我约束为一种解释）
const EP={caseNo:'059',name:'不听话的左手',sfx:{ghost:[11.3,12.9,14.4],stings:[13.0],blips:[22.2,26.0,27.6,32.4,33.6,38.0,39.4],whisper:[10,16]}};
// 手：(x,y)=手腕，ang=朝向，curl=0..1 握紧
function hand(x,y,s,ang,curl,a,c=PAPER){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.scale(s,s);
  line([[-40,0],[-48,-90],[48,-90],[40,0]],c,4,true,a);
  const F=[[-40,-90,60,-0.35],[-14,-90,80,-0.08],[12,-90,86,0.05],[36,-90,72,0.2]];
  for(const [fx,fy,L,da] of F){const k=curl;const p1=[fx+Math.sin(da)*L*0.5,fy-Math.cos(da)*L*0.5*(1-k*0.6)];const p2=[p1[0]+Math.sin(da+k*2.2)*L*0.5,p1[1]-Math.cos(da+k*2.2)*L*0.5];line([[fx,fy],p1,p2],c,4,true,a);}
  const tk=curl;line([[48,-30],[80,-60+tk*10],[lerp(100,60,tk),lerp(-90,-70,tk)]],c,4,true,a);
  ctx.restore();}
function seated(x,y,a,c=PAPER){headAt(x,y-250,34,c,a);line([[x,y-216],[x,y-90]],c,4,true,a);line([[x,y-90],[x+90,y-80],[x+96,y]],c,3.5,true,a);line([[x-20,y-90],[x+80,y-60]],c,3.5,true,a*0.7);
  line([[x-80,y-90],[x+130,y-90]],CYAN,3,true,a*0.6);line([[x-70,y-90],[x-70,y]],CYAN,3,true,a*0.6);}
function brainSplit(x,y,s,a,cut=0,lit=0){brain(x,y,s,CYAN,a);ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const c=cut>0?RED:GREEN;line([[-60,-40],[0,-55],[60,-40]],c,7,true,a);if(cut>0){line([[-12,-70],[12,-25]],RED,6,true,a*cut);line([[12,-70],[-12,-25]],RED,6,true,a*cut);}
  if(lit>0)glowDot(0,-48,90,cut>0?'rgba(255,60,60,.4)':'rgba(109,255,192,.35)',a*lit);ctx.restore();}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'她的左手，想掐死她',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'一只手不听使唤，自己伸向了主人的脖子');
    glowDot(960,620,300,'rgba(255,40,40,.12)',a);hand(960+Math.sin(t*3)*20,820,2.2,0.1*Math.sin(t*2),0.3+0.5*seg(t,1.5,4),a,'rgb(210,220,215)');
    ghost(1450,620,0.9,a*flashA(t,[1.7,2.8,3.6],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1908 年 · 德国 · 一间神经科病房',PAPER,215,58);
    seated(760,860,a*seg(t,4.8,5.3));personStand(1260,860,1.0,a*seg(t,5.2,5.6),CYAN);txt('戈德斯坦医生',1260,600,34,CYAN,{f:SANS,w:700,a:a*seg(t,5.4,5.8)});
    txt('左手',600,760,30,RED,{f:SANS,w:700,a:a*seg(t,8,8.4)});
    cap(t,T.lab+.4,7.4,'医生戈德斯坦接诊了一位 57 岁的女病人');cap(t,7.4,T.night+.2,'中风之后，她说左手"有自己的意志"');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    const hx=lerp(800,915,seg(t,12.8,13.6)),hy=lerp(800,790,seg(t,12.8,13.6));
    headAt(960,520,46,'rgb(170,190,190)',a);line([[960,566],[960,800]],'rgb(170,190,190)',4,true,a);
    hand(hx+Math.sin(t*7)*12*(t<12.8?1:0.3),hy,1.1,lerp(0.4,0.15,seg(t,12.8,13.6)),lerp(0.2,0.75,seg(t,12.8,13.6)),a,RED);
    if(t>15.2)hand(1080,820,1.1,-0.5,0.5,a,CYAN);
    ghost(lerp(400,1500,seg(t,11,15)),600,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.3,12.9,14.4],0.14));ghost(960,470,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.6,'左手会自己乱抓东西，怎么也停不下来');cap(t,12.7,15.1,'有时，它竟然一把掐住了她的喉咙','#d9e6e2');
    cap(t,15.2,T.foil,'她只能用右手，拼命把左手掰开',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'恶灵附身？',PAPER,215,76);
    personStand(960,860,1.4,a*seg(t,16.3,16.7));ghost(960+Math.sin(t*2)*10,640,1.3,a*seg(t,18.3,19)*0.45);
    cap(t,T.foil+.4,18.4,'她坚持说：那只手，不是我在控制');cap(t,18.5,T.hit,'难道身体里，还住着另一个"人"？');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'尸检：大脑中间断了！',RED,215,96,{pop:1,fi:.02});
    brainSplit(800,640,2.3,a,seg(t,21.4,21.8),1);
    txt('胼胝体',1420,560,72,RED,{a:a*seg(t,22,22.4),glow:'rgba(255,60,60,.6)'});txt('左右脑之间的"桥"',1420,670,40,PAPER,{f:SANS,w:700,a:a*seg(t,23.4,23.8)});
    cap(t,T.hit+.8,23.4,'后来尸检发现：她大脑里的胼胝体受了损');cap(t,23.4,T.trace,'那是连接左右两半大脑的一座"桥"');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：左手听谁的？',PAPER,215,64);
    const a1=a*seg(t,25.4,25.8);
    circ(780,480,110,CYAN,3,a1);circ(1140,480,110,CYAN,3,a1);txt('左脑',780,480,44,CYAN,{a:a1});txt('右脑',1140,480,44,CYAN,{a:a1});
    line([[1140,590],[lerp(1140,620,seg(t,25.8,27)),lerp(590,800,seg(t,25.8,27))]],RED,5,true,a1);line([[780,590],[lerp(780,1300,seg(t,25.8,27)),lerp(590,800,seg(t,25.8,27))]],GREEN,5,true,a1);
    txt('左手',600,850,44,RED,{f:SANS,w:900,a:a*seg(t,26.6,27)});txt('右手',1320,850,44,GREEN,{f:SANS,w:900,a:a*seg(t,26.6,27)});
    line([[890,480],[1030,480]],WARM,5,true,a*seg(t,28.2,28.6));txt('互相约束',960,420,32,WARM,{f:SANS,w:700,a:a*seg(t,28.2,28.6)});
    cap(t,T.trace+.4,28.1,'右脑控制左手，左脑控制右手');cap(t,28.2,T.reveal,'平时两边靠胼胝体互相商量、彼此约束');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('约 2 亿',W/2,420,200,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('根神经纤维，连接左右脑',W/2,600,56,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,31.9)});
    txt('桥一断 → 左手可能"自作主张"（一种解释）',W/2,760,44,CYAN,{f:SANS,w:700,a:a*seg(t,34.5,34.9)});
    cap(t,T.reveal+.6,34.4,'胼胝体由约 2 亿根神经纤维组成');cap(t,34.5,T.eye,'桥一断，左手的动作就可能脱离"自我"的约束');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么像"别人的手"？',PAPER,215,64);
    [['动作还在','手照样能抓、能握',640,37.3],['"我要做"','这个信号却没传到',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,72,WARM,{a:ca});txt(s,x,630,34,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'手的动作还在，大脑却没收到"是我要做"的信号');cap(t,40,T.off,'于是人会真切地觉得：这只手，不是我的');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'它有了名字：异手综合征',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    hand(960,860,2.0,0,0.15,a,WARM);
    cap(t,T.off+.4,T.end,'1972 年，医生正式把它命名为"异手"');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"附身"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是大脑里断了一座桥',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：Goldstein 1908 · Brion & Jedynak 1972 · 异手综合征文献综述（PMC）',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你听过更离奇的怪病吗？评论区报案',GREEN);}
}
function coverScene(){glowDot(1380,600,320,'rgba(255,40,40,.16)',1);hand(1380,920,2.4,-0.15,0.4,1,RED);ghost(1740,620,0.8,0.5);
  txt('她的左手',640,320,116,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('自己掐住了她的喉咙',640,470,76,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1908',330,850,-1,0,GREEN,64,-0.1);}
