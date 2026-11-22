// CASE 034 地球嗡鸣（1998 Suda/Nawa/Fukao 等发现背景自由振荡；2004 Rhie & Romanowicz 海洋源；主流解释：海浪/次重力波敲击海底）
const EP={caseNo:'034',name:'地球嗡鸣',sfx:{ghost:[11.5,12.8,14.0],stings:[],blips:[25.8,26.8,27.8,33.4,34.4],whisper:[10,16]}};
function globe(x,y,R,a,c=CYAN,t=0){if(a<=0)return;circ(x,y,R,c,3.5,a,'rgba(10,30,30,.5)');
  ctx.save();ctx.beginPath();ctx.arc(x,y,R,0,6.28);ctx.clip();for(let k=-2;k<=2;k++){ctx.globalAlpha=a*0.35;ctx.strokeStyle=c;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(x,y,Math.abs(R*Math.cos((k/3+t*0.05)*1.57))+1,R,0,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(x-R,y+k*R/3);ctx.lineTo(x+R,y+k*R/3);ctx.stroke();}ctx.restore();
  const s=R/220;line([[x-150*s,y-120*s],[x-80*s,y-150*s],[x-30*s,y-90*s],[x-60*s,y-20*s],[x-110*s,y-40*s],[x-150*s,y-120*s]],c,2.5,true,a*0.8);
  line([[x+20*s,y-60*s],[x+120*s,y-90*s],[x+160*s,y-20*s],[x+90*s,y+40*s],[x+40*s,y+10*s],[x+20*s,y-60*s]],c,2.5,true,a*0.8);
  line([[x-70*s,y+50*s],[x-20*s,y+60*s],[x-30*s,y+150*s],[x-70*s,y+120*s],[x-70*s,y+50*s]],c,2.5,true,a*0.8);}
function seismo(x,y,w,h,t,a,amp=1,quake=0,col=GREEN){if(a<=0)return;rect(x,y,w,h,DIM,2,a,'rgba(0,0,0,.4)');const pts=[];const r=rng(3);
  for(let i=0;i<=200;i++){const q=i/200,tt=t*1.5+q*6;let v=Math.sin(tt*5.1)*0.25+Math.sin(tt*7.3+1)*0.2+Math.sin(tt*3.2)*0.15;v*=amp;if(quake&&Math.abs(q-0.5)<0.12)v+=Math.sin(q*300)*quake*(1-Math.abs(q-0.5)/0.12)*2.5;pts.push([x+q*w,y+h/2-v*h*0.35]);}
  line(pts,col,2.5,true,a);}
function wavesSea(t,a,y=760,c=CYAN){if(a<=0)return;const pts=[];for(let x=100;x<=1820;x+=16)pts.push([x,y+Math.sin(x*0.012-t*2.2)*22+Math.sin(x*0.031-t*3)*8]);line(pts,c,3.5,true,a);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'地球低吼事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'没有地震的夜里，整个地球却在一直"嗡嗡"作响');
    const pul=1+0.03*Math.sin(t*8)*seg(t,1,1.5);globe(960,700,230*pul,a,CYAN,t);waves(960,700,240,RED,t,a*seg(t,1.2,1.8),5,-3.14,3.14);
    stamp('未解之谜',1640,880,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'全世界的地震台',PAPER,215,64);globe(560,620,230,a*seg(t,5,5.4),CYAN,t);
    for(const [dx,dy,k] of [[-120,-80,0],[60,-140,1],[130,40,2],[-60,100,3],[0,-20,4]])circ(560+dx,620+dy,9,GREEN,2.5,a*seg(t,5.4+k*.15,5.7+k*.15),'rgba(109,255,192,.5)');
    seismo(1000,520,760,200,t,a*seg(t,6.4,6.8),0.3,seg(t,7,7.6)*(1-seg(t,8.6,9.4)),GREEN);txt('地震来了才会大幅跳动',1380,780,30,DIM,{f:SANS,w:500,a:a*seg(t,7.4,7.8)});
    cap(t,T.lab+.4,7.4,'地球上布满了灵敏的地震仪和重力仪');cap(t,7.5,T.night+.2,'按理说，没有地震时，它们记录的应该是一片安静');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    seismo(260,420,1400,320,t,a*seg(t,10.2,10.6),0.4+seg(t,10.6,15)*1.2,0,RED);
    ghost(1500,600,1.4,a*(flashA(t,[11.5,12.8,14.0],0.14)+win(t,15.2,16.1,.03,.4)*0.7),'150,170,170');
    txt('附近 0 次地震',960,800,40,GREEN,{f:SANS,w:700,a:a*seg(t,12.8,13.2)});
    cap(t,T.night+.3,12.7,'可在完全没有地震的日子，曲线依然在起伏');cap(t,12.8,15.1,'一天 24 小时，一年 365 天，从不停歇','#d9e6e2');
    cap(t,15.2,T.foil,'就像地底下，有什么东西在呼吸',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'它太慢、太弱，没人听得见',PAPER,215,66);const pul=1+0.04*Math.sin(t*2.5);globe(960,620,230*pul,a,CYAN,t);
    glowDot(960,620,330,'rgba(255,60,60,.18)',a*(0.5+0.5*Math.sin(t*2.5)));
    cap(t,T.foil+.4,18.5,'整个地球像一口钟，被什么东西一直轻轻敲着');cap(t,18.6,T.hit,'1998 年，日本科学家终于把它从噪声里揪了出来……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'地球真的在"哼"！',RED,215,96,{pop:1,fi:.02});
    rect(260,400,1400,420,DIM,2,a,'rgba(0,0,0,.4)');const p=eOut(seg(t,21.1,22.2));
    for(let i=0;i<18;i++){const x=320+i*74,h=(140+((i*37)%5)*30)*p;line([[x,800],[x,800-h]],RED,6,true,a);}
    txt('频率',230,420,26,DIM,{f:SANS,w:500,al:'right',a});txt('一排整齐的"音阶"',1500,450,30,GREEN,{f:SANS,w:700,a:a*seg(t,22.4,22.8)});
    cap(t,T.hit+.8,T.trace,'频谱上排着整齐的峰：地球整体在持续自由振荡');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：是谁在敲这口钟？',PAPER,215,64);globe(560,620,230,a,CYAN,t);
    const n=a*seg(t,25.6,26),s=a*seg(t,27,27.4);
    glowDot(560-40,620-150,120,'rgba(255,60,60,.5)',n*(0.5+0.5*Math.sin(t*4)));glowDot(560,620+170,120,'rgba(255,60,60,.5)',s*(0.5+0.5*Math.sin(t*4+2)));
    txt('北半球冬天 → 北太平洋最强',1300,500,36,PAPER,{f:SANS,w:700,a:n,al:'left'});txt('南半球冬天 → 南大洋最强',1300,600,36,PAPER,{f:SANS,w:700,a:s,al:'left'});
    txt('= 风暴季节',1300,720,44,RED,{f:SANS,w:900,a:a*seg(t,28.4,28.8),al:'left'});
    cap(t,T.trace+.4,28.2,'定位发现：源头不在地下，而在海里');cap(t,28.3,T.reveal,'哪边的海洋是冬天、风暴多，哪边就"哼"得最响');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('2–7 mHz',560,430,150,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('海浪敲打海底',560,590,60,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,32)});
    txt('（主流解释）',560,670,30,DIM,{f:SANS,w:500,a:a*seg(t,32,32.4)});
    const by=820;line([[1060,by],[1300,by],[1500,by-120],[1820,by-120]],WARM,4,true,a*seg(t,32.4,32.8));txt('海底 / 大陆架',1180,by+40,28,WARM,{f:SANS,w:700,a:a*seg(t,32.6,33)});
    const pts=[];for(let x=1060;x<=1820;x+=12)pts.push([x,560+Math.sin(x*0.01-t*2)*30]);line(pts,CYAN,3.5,true,a*seg(t,33,33.4));
    for(let k=0;k<3;k++){const q=(t*0.8+k/3)%1;line([[1240+k*80,600],[1240+k*80,lerp(600,by-10,q)]],RED,3,true,a*seg(t,33.6,34)*(1-q));}
    waves(1300,by,10,RED,t,a*seg(t,34,34.4),4,3.14,6.28);
    cap(t,T.reveal+.6,34.4,'风暴掀起海浪，长周期的波一下下压在海底上');cap(t,34.5,T.eye,'整个地球被持续"敲响"，周期只有几分钟');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么人从来听不到？',PAPER,215,66);
    bar(560,470,1000,60,1,'人耳下限','20 Hz',37.4,t,GREEN);bar(560,620,1000,60,0.004,'地球嗡鸣','约 0.005 Hz',38.4,t,RED);
    txt('低了几千倍',1060,800,52,RED,{f:SANS,w:900,a:a*seg(t,39.4,39.8),glow:'rgba(255,60,60,.5)'});
    cap(t,T.eye+.4,39.9,'它的频率比人耳能听到的最低音还低几千倍');cap(t,40,T.off,'振幅又极小，只有最灵敏的仪器才"听"得到');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'不是怪物，是海洋的脉搏',PAPER,215,66);glowDot(W/2,560,620,'rgba(255,200,120,.22)',a);
    globe(960,600,200,a,WARM,t);wavesSea(t,a,860,WARM);
    cap(t,T.off+.4,T.end,'只要海浪还在拍，地球就会一直这样"哼"下去');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"低吼"，只是',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('海浪在敲地球',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：Suda, Nawa & Fukao 1998《Science》· Rhie & Romanowicz 2004《Nature》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你还知道地球的哪些"怪声"？｜评论区报案',GREEN);}
}
function coverScene(){globe(1180,700,250,1,CYAN,0);waves(1180,700,260,RED,0.3,0.9,5,-3.14,3.14);seismo(160,520,620,200,3,0.9,1.4,0,RED);
  txt('没有地震，地球却在低吼',W/2,215,104,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('24 小时不停，从没人听见',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1998',300,920,-1,0,GREEN,64,-0.1);}
