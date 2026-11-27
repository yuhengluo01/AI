// CASE 056 玛丽·赛勒斯特号（1872.11.7 纽约出发去热那亚，船长 Benjamin Briggs、妻子 Sarah、2 岁女儿 Sophia、7 名船员共 10 人；约 1700 桶酒精；12.4 亚速尔群岛附近被 Dei Gratia 发现空船，小艇不见，日志止于 11.25；9 桶空；2006 UCL Andrea Sella 模拟：压力波爆燃无焦痕，为一种解释，至今有争议）
const EP={caseNo:'056',name:'空无一人的船',sfx:{ghost:[11.2,12.7,14.2],stings:[12.6],blips:[21.6,22.0,22.4,26.2,27.0,32.6,33.4,38.0,39.4],whisper:[10,16]}};
const SEA=760;
function sea(t,a,c=CYAN){if(a<=0)return;for(let k=0;k<3;k++){const pts=[];for(let x=120;x<=1800;x+=20)pts.push([x,SEA+k*40+Math.sin(x*0.012+t*1.4+k)*8]);line(pts,c,2.5-k*0.6,k==0,a*(0.8-k*0.22));}}
function ship(x,y,s,a,c=CYAN,o={}){if(a<=0)return;ctx.save();ctx.translate(x,y+Math.sin((o.t||0)*1.3)*6);ctx.rotate(Math.sin((o.t||0)*0.9)*0.02);ctx.scale(s,s);
  line([[-300,-40],[300,-40],[250,40],[-260,40],[-300,-40]],c,4,true,a);line([[300,-40],[380,-80]],c,3,true,a);
  for(const mx of [-120,110]){line([[mx,-40],[mx,-420]],c,3.5,true,a);
    const torn=o.torn||0;for(const [y0,w] of [[-400,90],[-300,120],[-190,140]]){const pts=[[mx-w,y0],[mx+w,y0],[mx+w*(1-0.5*torn),y0+90],[mx+w*0.2,y0+90-torn*30],[mx-w*(1-0.3*torn),y0+90],[mx-w,y0]];line(pts,c,2.5,true,a*0.85);}}
  if(o.boat!==false){line([[-60,-56],[40,-56],[30,-46],[-50,-46],[-60,-56]],o.boatC||c,2.5,true,a*0.9);}
  ctx.restore();}
function barrel(x,y,a,c=CYAN,fill){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=2.5;ctx.shadowColor=c;ctx.shadowBlur=10;if(fill){ctx.fillStyle=fill;}
  ctx.beginPath();ctx.ellipse(x,y,28,36,0,0,6.28);if(fill)ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(x-26,y-12);ctx.lineTo(x+26,y-12);ctx.moveTo(x-26,y+12);ctx.lineTo(x+26,y+12);ctx.stroke();ctx.restore();}
const EMPTY=[3,11,16,22,27,30,36,41,45];
function hold(t,a,o={}){for(let r=0;r<4;r++)for(let i=0;i<12;i++){const k=r*12+i;const x=540+i*76,y=480+r*96;const e=EMPTY.includes(k);
  barrel(x,y,a*(o.dimFull&&!e?0.35:1),e&&o.mark?RED:CYAN,e&&o.mark?'rgba(255,40,40,.18)':null);}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'大西洋上漂着一艘空船',PAPER,215,88,{pop:1});sub(t,.9,T.lab,'货物完好、补给充足，船上 10 个人却全部消失');
    sea(t,a);ship(960,SEA-20,0.85,a,CYAN,{t,torn:1,boat:false});ghost(1040,560,0.7,a*flashA(t,[1.6,2.7,3.5],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1872 年 11 月 7 日 · 纽约 → 热那亚',PAPER,215,58);
    sea(t,a);ship(lerp(760,1060,seg(t,4.5,10)),SEA-20,0.75,a,CYAN,{t});
    const fa=a*seg(t,5,5.5);personStand(330,640,0.8,fa);personStand(420,640,0.72,fa);personStand(490,640,0.4,fa);
    txt('船长',330,690,28,PAPER,{f:SANS,w:700,a:fa});txt('妻子',420,690,28,PAPER,{f:SANS,w:700,a:fa});txt('2 岁女儿',510,690,28,PAPER,{f:SANS,w:700,a:fa});
    cap(t,T.lab+.4,7.4,'船长布里格斯带着妻子和 2 岁的女儿出海');cap(t,7.4,T.night+.2,'加上 7 名船员，一共 10 个人');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    sea(t,a,'rgb(110,170,180)');ship(960,SEA-20,0.85,a,'rgb(150,200,210)',{t,torn:1,boat:false});
    ghost(lerp(700,1300,seg(t,11,15)),560,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.2,12.7,14.2],0.14));ghost(960,470,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    txt('11.25',1560,420,72,RED,{f:MONO,a:a*seg(t,15.2,15.5),glow:'rgba(255,60,60,.6)'});
    cap(t,T.night+.3,12.6,'12 月 4 日，亚速尔群岛附近，它被另一艘船发现');cap(t,12.7,15.1,'船帆残破，空无一人，救生小艇不见了','#d9e6e2');
    cap(t,15.2,T.foil,'最后一条日志，停在 11 月 25 日',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'货舱里，还有约 1700 桶酒精',PAPER,215,64);
    hold(t,a*seg(t,16.3,16.9));
    cap(t,T.foil+.4,18.4,'货物几乎原封不动，人却像蒸发了一样');cap(t,18.5,T.hit,'海怪？海盗？还是船员发了疯……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'有 9 只酒桶是空的！',RED,215,100,{pop:1,fi:.02});
    hold(t,a,{mark:1,dimFull:1});
    for(let i=0;i<14;i++){const q=(t*0.35+i/14)%1;glowDot(560+((i*137)%880),860-q*420,50,'rgba(255,120,120,.25)',a*seg(t,23.4,24)*(1-q));}
    cap(t,T.hit+.8,23.4,'卸货时发现：有 9 只酒桶是空的');cap(t,23.4,T.trace,'漏出的酒精蒸气，可能充满了密闭的货舱');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：货舱里发生了什么？',PAPER,215,64);
    rect(520,420,700,400,CYAN,4,a*seg(t,25.4,25.8),'rgba(127,232,255,.04)');
    for(let i=0;i<5;i++)for(let j=0;j<3;j++)rect(570+i*130,560+j*80,70,60,PAPER,2.5,a*seg(t,26.2+i*0.1,26.6+i*0.1));
    txt('纸盒 = 酒桶',870,470,34,PAPER,{f:SANS,w:700,a:a*seg(t,27,27.4)});
    personStand(1440,820,1.1,a*seg(t,25.6,26));txt('Andrea Sella',1500,500,40,GREEN,{f:MONO,a:a*seg(t,25.8,26.2)});txt('伦敦大学学院 · 化学家',1500,560,32,PAPER,{f:SANS,w:500,a:a*seg(t,26.6,27)});
    cap(t,T.trace+.4,28.1,'2006 年，伦敦大学学院化学家塞拉做了模拟');cap(t,28.2,T.reveal,'他在货舱模型里充入燃气，然后点火');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('爆燃 · 不留焦痕',860,230,104,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('（一种解释）',1400,240,32,DIM,{f:SANS,w:500,a:a*seg(t,31.6,32)});
    rect(520,420,700,400,CYAN,4,a,'rgba(127,232,255,.04)');
    const q=seg(t,31.2,33.2);ctx.save();ctx.beginPath();ctx.rect(520,420,700,400);ctx.clip();
    glowDot(870,620,lerp(40,520,eOut(q)),`rgba(120,170,255,${0.55*(1-q*0.6)})`,a);
    ctx.globalAlpha=a*(1-q)*0.9;ctx.strokeStyle='#9fc6ff';ctx.lineWidth=5;ctx.shadowColor='#9fc6ff';ctx.shadowBlur=20;ctx.beginPath();ctx.arc(870,620,lerp(30,480,eOut(q)),0,6.28);ctx.stroke();ctx.restore();
    for(let i=0;i<5;i++)for(let j=0;j<3;j++)rect(570+i*130,560+j*80,70,60,PAPER,2.5,a);
    txt('火球掠过',1500,480,52,'#9fc6ff',{f:SANS,w:900,a:a*seg(t,32.4,32.8)});txt('纸盒没烧焦',1500,580,52,GREEN,{f:SANS,w:900,a:a*seg(t,33.2,33.6)});txt('没有烟灰',1500,680,52,GREEN,{f:SANS,w:900,a:a*seg(t,34,34.4)});
    cap(t,T.reveal+.6,34.4,'一团火球轰然掠过，纸盒却没烧焦，不留痕迹');cap(t,34.5,T.eye,'船员可能以为船要炸了，慌忙跳上小艇逃离');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么他们再也没回来？',PAPER,215,64);
    sea(t,a);ship(1240,SEA-20,0.6,a,CYAN,{t,boat:false});
    const bx=lerp(820,560,seg(t,39.6,41.6));line([[1060,SEA-20],[bx+60,SEA-8]],WARM,2.5,true,a*(t<39.6?1:0.2));
    line([[bx-60,SEA-14],[bx+60,SEA-14],[bx+45,SEA],[bx-45,SEA],[bx-60,SEA-14]],WARM,3,true,a);
    txt('（推测）',560,420,32,DIM,{f:SANS,w:500,a});
    cap(t,T.eye+.4,39.9,'一种推测：小艇用绳子拖在船后，等危险过去再回去');cap(t,40,T.off,'可绳子一旦断开，小艇就消失在茫茫大西洋上');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'船找到了，人没有回来',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    sea(t,a,WARM);ship(960,SEA-20,0.8,a,WARM,{t,boat:false});
    cap(t,T.off+.4,T.end,'这只是一种解释，此案至今仍有争议');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"幽灵船"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是一场看不见的爆燃',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：UCL 2006 · 英国皇家博物馆格林尼治 · Wikipedia: Mary Celeste',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'致敬船上的 10 个人｜评论区报案',GREEN);}
}
function coverScene(){sea(2,1);ship(1340,SEA-20,0.9,1,CYAN,{t:2,torn:1,boat:false});ghost(1420,520,0.8,0.6);
  txt('海上漂着一艘空船',660,300,108,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('10 个人凭空消失',660,450,76,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1872',330,880,-1,0,GREEN,64,-0.1);}
