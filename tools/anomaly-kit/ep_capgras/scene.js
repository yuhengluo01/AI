// CASE 053 卡普格拉综合征（Capgras & Reboul-Lachaux 1923「M 夫人」坚信丈夫孩子被替身调包；Hirstein & Ramachandran 1997 车祸后病人：电话里认得母亲；Ellis et al. 1997《Proc R Soc B》皮肤电：熟人面孔无自动情绪反应；认脸与情感通路断开为一种解释）
const EP={caseNo:'053',name:'被调包的家人',sfx:{ghost:[11.2,12.6,14.0],stings:[12.6],blips:[26.4,27.6,33.4,34.6,38.4,39.6],whisper:[10,16]}};
function phone(x,y,s,a,c){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=5;ctx.shadowColor=c;ctx.shadowBlur=18;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(-60,-40);ctx.quadraticCurveTo(-70,40,0,70);ctx.quadraticCurveTo(70,40,60,-40);ctx.stroke();
  ctx.beginPath();ctx.ellipse(-60,-50,22,14,0.5,0,6.28);ctx.stroke();ctx.beginPath();ctx.ellipse(60,-50,22,14,-0.5,0,6.28);ctx.stroke();ctx.restore();}
function face(x,y,s,a,c,mark){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=4;ctx.shadowColor=c;ctx.shadowBlur=14;
  ctx.beginPath();ctx.ellipse(0,0,70,90,0,0,6.28);ctx.stroke();ctx.beginPath();ctx.arc(-25,-15,7,0,6.28);ctx.arc(25,-15,7,0,6.28);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(-8,25);ctx.lineTo(6,25);ctx.stroke();ctx.beginPath();ctx.moveTo(-25,45);ctx.quadraticCurveTo(0,58,25,45);ctx.stroke();
  ctx.beginPath();ctx.moveTo(-70,-20);ctx.quadraticCurveTo(-60,-110,0,-95);ctx.quadraticCurveTo(60,-110,70,-20);ctx.stroke();ctx.restore();
  if(mark)txt(mark,x,y+s*140,30,c,{f:SANS,w:700,a});}
function trace(x0,x1,y,t,a,spike,c){if(a<=0)return;const pts=[];for(let i=0;i<=200;i++){const u=i/200;let v=Math.sin(u*40+t*3)*4+Math.sin(u*13)*3;if(spike)v-=spike*130*Math.exp(-Math.pow((u-0.55)/0.07,2));pts.push([lerp(x0,x1,u),y+v]);}line(pts,c,3.5,true,a);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'她说丈夫被调包了',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'长得一模一样，可她坚信：这个人是冒牌货');
    personStand(760,830,1.5,a);personStand(1160,830,1.5,a,t>2.2&&Math.floor(t*8)%3==0?RED:PAPER);txt('?',960,620,120,RED,{a:a*seg(t,1.4,1.8),glow:'rgba(255,60,60,.6)'});
    ghost(1160,640,1.0,a*flashA(t,[1.6,2.7,3.5],0.12));stamp('未解之谜',1640,940,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1923 年 · 法国 · 巴黎',PAPER,215,64);
    personStand(600,830,1.4,a*seg(t,4.8,5.2));txt('M 夫人',600,880,32,PAPER,{f:SANS,w:700,a:a*seg(t,5,5.4)});
    [[1050,'丈夫'],[1300,'女儿'],[1530,'儿子']].forEach(([x,n],i)=>{const ca=a*seg(t,7.4+i*.3,7.8+i*.3);personStand(x,830,i?1.0:1.4,ca,'#9fb0ac');txt(n,x,880,30,DIM,{f:SANS,w:700,a:ca});txt('替身',x,i?560:500,30,RED,{f:SANS,w:900,a:ca});});
    cap(t,T.lab+.4,7.4,'1923 年，精神科医生卡普格拉记录了一位"M 夫人"');cap(t,7.4,T.night+.2,'她坚信丈夫和孩子，都被一模一样的替身换掉了');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    const n=1+Math.floor(seg(t,12.6,15)*5);for(let i=0;i<n;i++){const x=960+(i-(n-1)/2)*230;personStand(x,830,1.3,a*(i?0.6:1),i?'rgb(140,150,150)':PAPER);}
    ghost(1640,560,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.2,12.6,14.0],0.14));ghost(960,560,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'每天回家的"丈夫"，在她眼里都是陌生人');cap(t,12.6,15.1,'替身一个接一个，怎么也换不完……','#d9e6e2');
    cap(t,15.2,T.foil,'她说：真正的丈夫，早就被藏起来了',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'几十年后，一个更奇怪的病人',PAPER,215,64);
    personStand(640,830,1.4,a*seg(t,16.3,16.7));txt('车祸后的年轻人',640,880,30,PAPER,{f:SANS,w:700,a:a*seg(t,16.5,16.9)});
    personStand(1280,830,1.3,a*seg(t,16.6,17)*(1-seg(t,19.2,20)),'#9fb0ac');txt('"假妈妈"',1280,520,40,RED,{f:SANS,w:900,a:a*seg(t,17,17.4)*(1-seg(t,19.2,20))});
    cap(t,T.foil+.4,18.4,'一位车祸后脑部受伤的年轻人，说妈妈是冒牌货');cap(t,18.5,T.hit,'于是，妈妈走进另一个房间，给他打了个电话……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'电话里，他认出了妈妈！',RED,215,96,{pop:1,fi:.02});
    personStand(640,830,1.4,a);phone(960,560,1.2,a,GREEN);waves(960,560,60,GREEN,t,a,4,-0.6,0.6);waves(960,560,60,GREEN,t,a,4,2.54,3.74);
    personStand(1280,830,1.3,a,PAPER);txt('妈妈',1280,880,30,GREEN,{f:SANS,w:700,a});
    cap(t,T.hit+.8,23.3,'听到声音，他毫不怀疑：这就是我妈');cap(t,23.4,T.trace,'可一见到她的脸，又觉得是假的');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：看见熟人时，手心会"出汗"',PAPER,215,62);
    face(420,600,1.1,a,PAPER,'熟人的脸');
    txt('普通人',760,450,30,DIM,{f:SANS,w:700,al:'left',a:a*seg(t,26.4,26.8)});trace(760,1700,520,t,a*seg(t,26.4,26.8),seg(t,26.8,27.4),GREEN);
    txt('卡普格拉患者',760,680,30,DIM,{f:SANS,w:700,al:'left',a:a*seg(t,27.6,28)});trace(760,1700,750,t,a*seg(t,27.6,28),0.06*seg(t,28,28.6),RED);
    cap(t,T.trace+.4,28.2,'研究者测量人们看照片时的皮肤电反应');cap(t,28.3,T.reveal,'看到熟人的脸，普通人会有一下自动的情绪波动');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('认得出，却没感觉',W/2,420,130,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('认脸 ✓',700,620,72,GREEN,{f:SANS,w:900,a:a*seg(t,33.4,33.8),glow:'rgba(109,255,192,.6)'});txt('亲切感 ✗',1220,620,72,RED,{f:SANS,w:900,a:a*seg(t,34.6,35),glow:'rgba(255,60,60,.6)'});
    cap(t,T.reveal+.6,34.4,'患者看到熟人的脸，那一下波动几乎没有');cap(t,34.5,T.eye,'脸认得出来，那份"亲切感"却消失了');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'大脑的两条线路',PAPER,215,66);txt('（一种解释）',W/2,300,30,DIM,{f:SANS,w:500,a});
    face(400,600,0.9,a,PAPER);brain(960,600,1.3,CYAN,a,0.2);
    line([[500,560],[1500,470]],GREEN,5,true,a*seg(t,38.4,38.8));txt('认脸：通',1640,470,40,GREEN,{f:SANS,w:900,a:a*seg(t,38.4,38.8)});
    const cut=seg(t,39.6,40);line([[500,640],[920,690]],RED,5,true,a*cut);line([[1000,700],[1500,740]],RED,5,true,a*cut*0.35);
    line([[945,665],[975,725]],RED,6,true,a*cut);line([[975,665],[945,725]],RED,6,true,a*cut);txt('情感：断',1640,740,40,RED,{f:SANS,w:900,a:a*cut});
    cap(t,T.eye+.4,39.9,'认出一张脸和感到亲切，在大脑里走的是两条线路');cap(t,40,T.off,'情感线断了，大脑只好解释：这是个冒牌货');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'它是病，不是"鬼上身"',PAPER,215,70);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    personStand(800,830,1.4,a,WARM);personStand(1120,830,1.4,a,WARM);
    cap(t,T.off+.4,T.end,'它常和精神分裂症、痴呆或脑损伤有关，可以就医治疗');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"冒牌货"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是大脑弄丢了亲切感',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1580,480,46.2,t,RED,90,-0.14);
    txt('资料：Capgras & Reboul-Lachaux 1923 · Ellis et al. 1997《Proc R Soc B》· Hirstein & Ramachandran 1997',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你听过最离奇的怪病？评论区报案',GREEN);}
}
function coverScene(){personStand(760,900,1.6,1);personStand(1160,900,1.6,1,RED);ghost(1160,700,1.0,0.6);txt('?',960,680,120,RED,{glow:'rgba(255,60,60,.6)'});
  txt('她坚信丈夫被"调包"了',W/2,215,104,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('一模一样的脸，却是个冒牌货？',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1923',300,940,-1,0,GREEN,64,-0.1);}
