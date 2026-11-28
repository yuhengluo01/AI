// CASE 062 僵尸蚂蚁（偏侧蛇虫草菌 Ophiocordyceps unilateralis s.l. 感染木蚁 Camponotus；被感染蚂蚁离巢乱走，爬到离地约 25 厘米的叶片下咬住叶脉死去，Andersen 等 2009；咬合多在正午前后，Hughes 等 2011《BMC Ecology》；之后真菌柄从头后长出、洒落孢子；Fredericksen 等 2017《PNAS》3D 电镜：真菌细胞在全身连成网、包裹钻入肌肉，大脑未被入侵；直接操控肌肉为一种解释；约 4800 万年前化石叶片已有咬痕，Hughes 等 2011《Biology Letters》）
const EP={caseNo:'062',name:'僵尸蚂蚁',sfx:{ghost:[11.4,13.0,14.5],stings:[12.9],blips:[22.0,26.2,27.8,32.2,34.4,38.0,39.6],whisper:[10,16]}};
// 蚂蚁：(x,y)=身体中心，头朝右，ang 旋转
function ant(x,y,s,ang,a,c=PAPER,o={}){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.scale(s,s);
  const lw=o.walk||0;
  for(const [lx,d] of [[-6,-1],[6,1],[18,-1]]){for(const sd of [-1,1]){const sw=Math.sin(lw*10+lx+sd)*8;line([[lx,0],[lx+sw-10*d,sd*22],[lx+sw-18*d,sd*40]],c,2.5,true,a);}}
  ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=3;ctx.shadowColor=c;ctx.shadowBlur=10;
  ctx.beginPath();ctx.ellipse(-46,0,30,20,0,0,6.28);ctx.stroke();ctx.beginPath();ctx.ellipse(6,0,20,11,0,0,6.28);ctx.stroke();ctx.beginPath();ctx.ellipse(46,0,16,14,0,0,6.28);ctx.stroke();ctx.restore();
  line([[56,-10],[72,-30],[86,-34]],c,2.2,true,a);line([[56,10],[72,26],[86,30]],c,2.2,true,a);
  line([[60,-4],[72,-2]],o.jaw||c,3,true,a);line([[60,4],[72,2]],o.jaw||c,3,true,a);
  if(o.net){ctx.save();const r=rng(5);for(let i=0;i<22;i++){const x0=-70+r()*130,y0=(r()-.5)*24;line([[x0,y0],[x0+(r()-.5)*40,y0+(r()-.5)*16]],GREEN,1.8,true,a*o.net);}ctx.restore();}
  if(o.stalk){const L=150*o.stalk;line([[40,-12],[34,-12-L*0.5],[46,-12-L]],WARM,4,true,a);if(o.stalk>0.8)glowDot(46,-12-L,26,'rgba(255,207,122,.8)',a);}
  ctx.restore();}
// 叶子（底面朝下），(x,y)=叶脉中心
function leaf(x,y,w,a,c=CYAN){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=3;ctx.shadowColor=c;ctx.shadowBlur=12;
  ctx.beginPath();ctx.moveTo(x-w/2,y);ctx.quadraticCurveTo(x,y-w*0.32,x+w/2,y);ctx.quadraticCurveTo(x,y+w*0.12,x-w/2,y);ctx.stroke();ctx.restore();
  line([[x-w/2,y],[x+w/2,y]],c,2,true,a*0.8);for(let k=-2;k<=2;k++)line([[x+k*w*0.16,y],[x+k*w*0.16+w*0.08,y-w*0.1]],c,1.5,false,a*0.5);}
function stem(x,y0,y1,a){line([[x,y0],[x+10,(y0+y1)/2],[x,y1]],CYAN,3.5,true,a);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'森林里，蚂蚁变成了僵尸',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'它离开同伴爬上高处，咬住叶子，再也不松口');
    stem(960,880,560,a);leaf(1080,560,320,a);ant(1060,668,1.5,-Math.PI/2,a,'rgb(210,220,215)',{jaw:RED,stalk:seg(t,1.5,4)});
    ghost(1520,620,0.85,a*flashA(t,[1.7,2.8,3.7],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'热带雨林 · 一片叶子的背面',PAPER,215,62);
    for(let i=0;i<5;i++){const r=rng(i+20);leaf(480+i*240,460+r()*260,200,a*seg(t,4.7+i*.15,5.1+i*.15)*0.8);}
    ant(720,560,0.9,0.1,a*seg(t,7.5,7.9),'rgb(210,220,215)');ant(1200,700,0.9,-0.1,a*seg(t,7.8,8.2),'rgb(210,220,215)');
    cap(t,T.lab+.4,7.4,'在泰国、巴西的热带雨林里');cap(t,7.4,T.night+.2,'科学家一次次发现：咬着叶脉死去的蚂蚁');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    const climb=seg(t,11.5,14.6);stem(1000,900,520,a*0.8);leaf(1110,520,300,a*0.8);
    let ax,ay,ang;if(t<11.5){ax=lerp(500,960,seg(t,10,11.5));ay=880+Math.sin(t*9)*10;ang=Math.sin(t*6)*0.3;}else{ax=1000;ay=lerp(860,580,climb);ang=-Math.PI/2;}
    if(t>14.6){ax=1060;ay=600;ang=-Math.PI/2;}
    ant(ax,ay,1.1,ang,a,'rgb(180,195,190)',{walk:t,jaw:t>15.2?RED:null});
    ghost(lerp(1600,600,seg(t,11,15)),600,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.4,13.0,14.5],0.14));
    ghost(1100,460,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,140');
    cap(t,T.night+.3,12.6,'被感染的蚂蚁会离开蚁巢，独自乱走');cap(t,12.7,15.1,'它爬到离地约 25 厘米的叶片下面','#d9e6e2');
    cap(t,15.2,T.foil,'一口咬住叶脉，到死都不松口',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'被谁定好了时间？',PAPER,215,76);
    circ(960,620,170,WARM,3,a*seg(t,16.3,16.7));line([[960,620],[960,480]],WARM,5,true,a*seg(t,16.5,16.9));line([[960,620],[960,500]],WARM,3,true,a*seg(t,16.5,16.9));
    txt('12:00',960,860,60,WARM,{f:MONO,a:a*seg(t,17,17.4)});ghost(1350,620,1.0,a*seg(t,18.3,19)*0.45);
    cap(t,T.foil+.4,18.4,'更诡异的是：它们多在正午前后咬下这一口');cap(t,18.5,T.hit,'就像有什么东西，替它们定好了时间');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'头后面，长出了一根"角"！',RED,215,92,{pop:1,fi:.02});
    leaf(1010,520,420,a);ant(1000,650,1.8,-Math.PI/2,a,'rgb(190,200,195)',{jaw:RED,stalk:seg(t,21.3,23)});
    if(t>23.4){const r=rng(9);for(let i=0;i<16;i++){const q=((t-23.4)*0.5+r())%1;circ(1040+(r()-.5)*260,lerp(320,880,q),4,WARM,2,a*(1-q));}}
    cap(t,T.hit+.8,23.4,'之后，蚂蚁的头后面钻出一根真菌柄');cap(t,23.4,T.trace,'孢子从高处洒落，落到下面路过的蚂蚁身上');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：真凶是一种真菌',PAPER,215,64);
    ant(860,620,3.2,0,a*seg(t,25.4,25.8),CYAN,{net:seg(t,26.5,28.5)});
    txt('偏侧蛇虫草菌',1480,560,52,GREEN,{a:a*seg(t,26,26.4),glow:'rgba(109,255,192,.6)'});
    txt('2017 · 3D 电子显微镜',1480,660,36,PAPER,{f:SANS,w:500,a:a*seg(t,28,28.4)});
    cap(t,T.trace+.4,27.5,'真凶，是一种叫偏侧蛇虫草菌的真菌');cap(t,27.6,T.reveal,'2017 年，科学家用电子显微镜给蚂蚁做了 3D 扫描');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('大脑没被入侵',W/2,420,150,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('菌丝在全身连成网，缠住、钻进肌肉',W/2,610,52,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,31.9)});
    txt('它可能直接操纵肌肉，把蚂蚁变成"提线木偶"（一种解释）',W/2,740,38,CYAN,{f:SANS,w:700,a:a*seg(t,34.3,34.7)});
    cap(t,T.reveal+.6,34.2,'真菌细胞在蚂蚁全身连成一张网，包裹着肌肉');cap(t,34.3,T.eye,'可大脑却完好无损，被绑架的是它的身体');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么偏偏咬在那里？',PAPER,215,64);
    [['离地约 25 厘米','温度湿度最适合真菌',640,37.3],['居高临下','孢子正好洒向蚁路',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,58,WARM,{a:ca});txt(s,x,630,34,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'那个高度的温度和湿度，最适合真菌生长');cap(t,40,T.off,'这"死亡之咬"，其实是真菌在替自己挑产房');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'这场操控，已经持续了很久',PAPER,215,66);glowDot(W/2,640,560,'rgba(255,200,120,.22)',a);
    leaf(960,640,520,a*seg(t,42.2,42.6),WARM);for(let i=-1;i<=1;i++)line([[960+i*90,640],[960+i*90+12,668]],RED,4,true,a*seg(t,42.8,43.1));
    txt('约 4800 万年',960,800,58,WARM,{f:MONO,a:a*seg(t,43,43.4)});
    cap(t,T.off+.4,T.end,'化石叶片上的咬痕显示：至少约 4800 万年');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"僵尸"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是被真菌劫持的身体',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：Fredericksen et al. 2017《PNAS》· Hughes et al. 2011《BMC Ecology》·《Biology Letters》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你还见过哪些吓人的寄生现象？评论区报案',GREEN);}
}
function coverScene(){leaf(1400,640,520,1);ant(1400,800,2.2,-Math.PI/2,1,'rgb(200,210,205)',{jaw:RED,stalk:1,net:0.7});ghost(1780,640,0.75,0.45);
  txt('蚂蚁被"附身"了',620,320,108,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('死前咬住叶子不松口',620,470,76,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('12:00',330,850,-1,0,GREEN,64,-0.1);}
