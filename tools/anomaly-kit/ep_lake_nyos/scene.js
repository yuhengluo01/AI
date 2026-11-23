// CASE 036 尼奥斯湖一夜死寂（1986.8.21 喀麦隆，1746 人遇难；湖翻 limnic eruption：深层湖水溶解的火山二氧化碳突然释放；2001 年起安装排气管）
const EP={caseNo:'036',name:'死寂之湖',sfx:{ghost:[11.6,13.0,14.3],stings:[],blips:[26.2,27.6,33.2,34.4,38.4,39.4],whisper:[10,16]}};
const LY=600; // 湖面
function hills(t,a,c=CYAN){if(a<=0)return;line([[100,LY],[360,420],[560,LY]],c,3.5,true,a);line([[1360,LY],[1560,430],[1820,LY]],c,3.5,true,a);
  line([[560,LY],[1360,LY]],c,3,true,a);const pts=[];for(let x=580;x<=1340;x+=14)pts.push([x,LY+10+Math.sin(x*0.03+t*1.2)*3]);line(pts,c,1.5,false,a*0.5);
  line([[1360,LY],[1500,700],[1820,760]],c,2.5,true,a*0.6);}
function hut(x,y,a,lit=0,c=CYAN){if(a<=0)return;line([[x-36,y],[x-36,y-40],[x,y-70],[x+36,y-40],[x+36,y],[x-36,y]],c,2.5,true,a);rect(x-8,y-26,16,26,c,2,a*0.7,lit?`rgba(255,200,120,${0.6*lit})`:null);if(lit)glowDot(x,y-14,50,`rgba(255,200,120,${0.4*lit})`,a);}
const HUTS=[[1460,700],[1560,725],[1660,745],[1760,762],[200,700]];
function village(t,a,litFn){HUTS.forEach(([x,y],i)=>hut(x,y,a,litFn?litFn(i):1));}
function cloud(t,a,p){if(a<=0)return;const r=rng(9);for(let i=0;i<26;i++){const q=clamp(p*1.3-i/40);if(q<=0)continue;const x=lerp(960,1300,q)+lerp(0,520,clamp(q*1.4-0.3))+r()*120-60,y=LY-20+lerp(0,150,clamp(q*1.4-0.3))+r()*40;
  ctx.save();ctx.globalAlpha=a*0.32*Math.sin(Math.min(1,q)*3.14*0.9+0.3);ctx.filter='blur(14px)';ctx.fillStyle='rgb(210,225,225)';ctx.beginPath();ctx.ellipse(x,y,90+r()*60,40+r()*20,0,0,6.28);ctx.fill();ctx.restore();}}
function section(t,a,o={}){if(a<=0)return; // 湖剖面
  const x0=300,x1=1300,top=420,bot=800;line([[x0-80,top],[x0,top],[x0+120,bot],[x1-120,bot],[x1,top],[x1+80,top]],CYAN,4,true,a);
  ctx.save();ctx.globalAlpha=a*0.12;ctx.fillStyle=CYAN;ctx.beginPath();ctx.moveTo(x0,top);ctx.lineTo(x0+120,bot);ctx.lineTo(x1-120,bot);ctx.lineTo(x1,top);ctx.fill();ctx.restore();
  const dy=lerp(top+40,top+150,o.deep??1);const da=a*(o.deepA??0);
  if(da>0){ctx.save();ctx.globalAlpha=da*0.35;ctx.fillStyle=RED;ctx.beginPath();const k=(dy-top)/(bot-top);ctx.moveTo(x0+120*k,dy);ctx.lineTo(x0+120,bot);ctx.lineTo(x1-120,bot);ctx.lineTo(x1-120*k,dy);ctx.fill();ctx.restore();
    line([[x0+120*k,dy],[x1-120*k,dy]],RED,2.5,true,da);
    const r=rng(4);for(let i=0;i<34;i++){const bx=lerp(x0+140,x1-140,r()),by=lerp(dy+20,bot-20,r())+Math.sin(t*2+i)*4;circ(bx,by,4+r()*4,RED,1.5,da*0.8);}}
  if(o.magma){const ma=a*o.magma;for(let k=0;k<5;k++){const q=(t*0.6+k/5)%1;line([[540+k*130,bot+110],[540+k*130,lerp(bot+120,bot+6,q)]],WARM,3,true,ma*(1-q));}
    txt('岩浆 · 二氧化碳渗入',800,bot+60,32,WARM,{f:SANS,w:700,a:ma});}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'一夜死寂事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'一夜之间，湖边的村庄再也没有醒来');
    hills(t,a);village(t,a,i=>flashA(t,[0,0])?1:(t<2.4?1:0.15));cloud(t,a,seg(t,1.2,4.2));
    ghost(1240,500,0.7,a*flashA(t,[1.8,3.1],0.12));stamp('未解之谜',1640,900,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1986 年 8 月 · 喀麦隆 · 尼奥斯湖',PAPER,215,60);hills(t,a);village(t,a*seg(t,5,5.6));
    for(let i=0;i<4;i++)personStand(1470+i*95,712+i*16,0.32,a*seg(t,5.6+i*.15,5.9+i*.15)*(1-seg(t,8.6,9.2)));
    cap(t,T.lab+.4,7.4,'尼奥斯湖是一座火山口湖，湖边散落着几个村庄');cap(t,7.4,T.night+.2,'8 月 21 日晚上，人们和往常一样熄灯睡下');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    hills(t,a*0.6);const p=seg(t,10.6,15.4);cloud(t,a*1.2,p);
    village(t,a,i=>{const xq=(HUTS[i][0]-1300)/520;return i==4?0.5:1-seg(p,xq*0.7+0.2,xq*0.7+0.3);});
    if(t>10.4&&t<10.9)waves(960,LY,20,PAPER,t,a*0.7,4,3.14,6.28);
    ghost(1400,560,0.8,a*flashA(t,[11.6,13.0,14.3],0.14),'200,210,210');ghost(1150,560,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,13.1,'湖底传来一声闷响，一团白雾悄悄漫出湖面');cap(t,13.2,15.1,'雾经过的地方，人和牲畜都没了声息……','#d9e6e2');
    cap(t,15.2,T.foil,'1746 人在这一夜遇难',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'没有火，没有伤，没有凶手',PAPER,215,66);
    [[560,'湖神发怒?',16.4],[960,'毒雾诅咒?',17.0],[1360,'湖底怪物?',17.6]].forEach(([x,s,t0],i)=>{const ca=a*seg(t,t0,t0+.3);rect(x-160,420,320,240,CYAN,3,ca,'rgba(127,232,255,.05)');txt(s,x,540,48,PAPER,{a:ca});line([[x-130,450],[x+130,630]],RED,5,true,a*seg(t,18.6+i*0.2,18.9+i*0.2));});
    txt('第二天，蓝色湖水变成了红褐色',W/2,760,38,RED,{f:SANS,w:700,a:a*seg(t,17.8,18.2)});
    cap(t,T.foil+.4,18.4,'幸存者醒来时，四周一片死寂');cap(t,18.5,T.hit,'科学家赶到湖边，测量湖水和空气……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'凶手是看不见的气体！',RED,215,92,{pop:1,fi:.02});const p=eOut(seg(t,21.1,21.8));
    circ(960,600,70*p,RED,4,a,'rgba(255,60,60,.15)');txt('C',960,600,64,RED,{f:MONO,a:a*p});
    for(const s of [-1,1]){line([[960+s*70*p,600],[960+s*190*p,600]],PAPER,5,true,a);line([[960+s*70*p,612],[960+s*190*p,612]],PAPER,5,true,a);circ(960+s*250*p,606,60*p,CYAN,4,a,'rgba(127,232,255,.12)');txt('O',960+s*250*p,606,56,CYAN,{f:MONO,a:a*p});}
    txt('CO₂ · 二氧化碳',960,760,56,PAPER,{f:SANS,w:900,a:a*seg(t,22.2,22.6)});
    cap(t,T.hit+.8,T.trace,'湖底喷出了大量二氧化碳，无色、无味');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：气体从哪来？',PAPER,215,64);
    section(t,a,{deepA:seg(t,26,26.6),deep:lerp(1,0.15,seg(t,27.6,30.6)),magma:seg(t,25.4,25.9)});
    txt('深层湖水 · 溶满 CO₂',1440,680,30,RED,{f:SANS,w:700,a:a*seg(t,26.2,26.6),al:'left'});
    txt('上层湖水像盖子',1440,470,30,CYAN,{f:SANS,w:700,a:a*seg(t,27.6,28),al:'left'});
    cap(t,T.trace+.4,28.2,'湖底下的岩浆，不断把二氧化碳渗进深层湖水');cap(t,28.3,T.reveal,'上层湖水像盖子压着，气体越积越多');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('湖翻',500,420,140,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('LIMNIC ERUPTION',500,550,40,RED,{f:MONO,a:a*seg(t,31.4,31.8)});
    txt('像摇过的汽水突然开盖',500,640,42,PAPER,{f:SANS,w:700,a:a*seg(t,32,32.4)});
    // 汽水瓶
    const bx=1360,by=820;line([[bx-90,by],[bx-90,by-260],[bx-40,by-330],[bx-40,by-380],[bx+40,by-380],[bx+40,by-330],[bx+90,by-260],[bx+90,by],[bx-90,by]],CYAN,4,true,a*seg(t,32.6,33));
    const pop=seg(t,33.4,33.6);for(let i=0;i<14;i++){const q=(t*1.4+i/14)%1;circ(bx+Math.sin(i*2.3+t)*60*(1-q*0.5),lerp(by-20,by-370,q)-pop*q*220,5+3*(i%3),RED,2,a*seg(t,32.8,33.2)*(1-q*0.4));}
    if(pop>0){for(let k=0;k<6;k++){const ang=-1.57+(k-2.5)*0.25;line([[bx,by-400],[bx+Math.cos(ang)*160*pop,by-400+Math.sin(ang)*160*pop]],RED,4,true,a*pop);}}
    txt('比空气重约 1.5 倍',1360,by+50,32,RED,{f:SANS,w:700,a:a*seg(t,34.6,35)});
    cap(t,T.reveal+.6,34.4,'某个扰动让深水翻上来，气体一下子喷出（触发原因仍有争议）');cap(t,34.5,T.eye,'二氧化碳比空气重，像河一样沿着山谷往下流');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么死得这么安静？',PAPER,215,66);
    const gy=780;line([[300,gy],[1620,gy]],CYAN,3,true,a);
    ctx.save();ctx.globalAlpha=a*0.3*seg(t,37.4,38.4);ctx.filter='blur(10px)';ctx.fillStyle='rgb(210,225,225)';ctx.fillRect(300,gy-lerp(0,120,seg(t,37.4,38.6)),1320*seg(t,37.4,39),lerp(0,120,seg(t,37.4,38.6)));ctx.restore();
    txt('贴地流动',600,gy-170,36,PAPER,{f:SANS,w:700,a:a*seg(t,38.2,38.6)});txt('无色 · 无味',960,gy-170,36,PAPER,{f:SANS,w:700,a:a*seg(t,38.6,39)});txt('夜里人在熟睡',1320,gy-170,36,PAPER,{f:SANS,w:700,a:a*seg(t,39,39.4)});
    txt('最远影响到约 25 公里外',960,450,48,RED,{f:SANS,w:900,a:a*seg(t,39.6,40),glow:'rgba(255,60,60,.5)'});
    cap(t,T.eye+.4,39.9,'高浓度二氧化碳会让人在很短时间内失去意识');cap(t,40,T.off,'它贴着地面流过村庄，很多人在睡梦中就遇难了');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'2001 年，湖里装上了"排气管"',PAPER,215,64);glowDot(W/2,600,560,'rgba(255,200,120,.2)',a);
    hills(t,a,WARM);line([[960,LY+120],[960,LY]],WARM,5,true,a);
    for(let i=0;i<16;i++){const q=(t*0.9+i/16)%1;circ(960+Math.sin(i*1.7)*q*60,LY-q*190,4,null,0,a*(1-q),'rgba(255,230,180,.9)');}
    cap(t,T.off+.4,T.end,'把深层的气体一点点放掉，让悲剧不再重演');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('比鬼更可怕的',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('是看不见的气体',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：Kling 等 1987《Science》· 美国地质调查局 USGS · 不列颠百科',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'致敬 1746 位遇难者｜评论区报案',GREEN);}
}
function coverScene(){hills(3,1);village(3,1,i=>i<2?0.15:1);cloud(3,1,0.7);ghost(1250,520,0.8,0.65);
  txt('一夜之间，全村没再醒来',W/2,215,104,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('凶手藏在湖底',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1986',300,920,-1,0,GREEN,64,-0.1);}
