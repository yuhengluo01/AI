// CASE 026 1518 斯特拉斯堡跳舞瘟疫（John Waller；集体心因性疾病为一种解释）
const EP={caseNo:'026',name:'停不下来的舞',sfx:{ghost:[11.5,12.6],stings:[],blips:[26.0,26.6,27.2,38.4],whisper:[10,16]}};
const GY=820;
function dancer(x,y,s,a,t,ph=0,c=PAPER,sp=1){if(a<=0)return;const k=t*5*sp+ph;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const bob=Math.abs(Math.sin(k))*10,lean=Math.sin(k*0.5)*0.15;ctx.translate(0,-bob);ctx.rotate(lean);
  headAt(0,-170,24,c,a);line([[0,-146],[0,-62]],c,4,true,a);
  const a1=Math.sin(k)*0.9,a2=Math.sin(k+2)*0.9;line([[0,-128],[-40*Math.cos(a1),-128-50*Math.sin(a1)-20],[-60*Math.cos(a1),-128-90*Math.sin(a1)-10]],c,3.5,true,a);
  line([[0,-128],[40*Math.cos(a2),-128-50*Math.sin(a2)-20],[60*Math.cos(a2),-128-90*Math.sin(a2)-10]],c,3.5,true,a);
  const l1=Math.sin(k*2)*14;line([[-24+l1,0],[-10,-30],[0,-62],[14,-30-Math.max(0,l1)],[26-l1,0]],c,3.5,true,a);ctx.restore();}
function town(a,c=CYAN){if(a<=0)return;const hs=[[300,120,160],[440,100,200],[560,140,150],[1300,130,180],[1440,110,220],[1570,150,160]];
  for(const [x,w,h] of hs){line([[x,GY],[x,GY-h],[x+w/2,GY-h-70],[x+w,GY-h],[x+w,GY]],c,3,true,a*0.8);rect(x+w/2-14,GY-h+30,28,36,c,2,a*0.6);}
  line([[880,GY],[880,GY-230],[960,GY-400],[1040,GY-230],[1040,GY]],c,3.5,true,a);line([[960,GY-400],[960,GY-440]],c,3,true,a);circ(960,GY-170,30,c,2.5,a*0.8);
  line([[200,GY],[1720,GY]],c,3,true,a);}
function crowd(t,a,n,c=PAPER,s=0.55,y0=GY){const r=rng(5);for(let i=0;i<n;i++){const x=260+r()*1400,dy=r()*60,ph=r()*6.28;dancer(x,y0-dy*0.3,s*(0.8+r()*0.4),a*(0.55+0.45*r()),t,ph,c,0.8+r()*0.6);}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'跳舞瘟疫事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'几百人在街上狂舞，怎么也停不下来');
    town(a*0.6);crowd(t,a,14);ghost(1680,640,0.7,a*flashA(t,[1.5,2.2,3.4],0.12),'150,150,160');
    stamp('未解之谜',1640,900,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1518 年 7 月 · 斯特拉斯堡',PAPER,215,64);town(a);
    dancer(960,GY,0.9,a*seg(t,5,5.4),t,0,PAPER,0.9);
    cap(t,T.lab+.4,7.4,'一个女人突然走上街头，开始跳舞');cap(t,7.4,T.night+.2,'没有音乐，一跳就是好几天，停不下来');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    town(a*0.45);const n=Math.floor(lerp(1,34,seg(t,10.3,12.8))+lerp(0,26,seg(t,13.2,14.8)));crowd(t,a,n,'#c9d6d2',0.5);
    const cnt=t<13.2?Math.floor(lerp(1,34,seg(t,10.3,12.8))):Math.floor(lerp(34,400,seg(t,13.2,14.8)));
    txt(`${cnt} 人`,W/2,240,96,t<13.2?GREEN:RED,{f:MONO,a,glow:t<13.2?'rgba(109,255,192,.5)':'rgba(255,60,60,.6)'});
    ghost(1600,600,0.8,a*flashA(t,[11.5,12.6],0.13));ghost(1450,560,1.15,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,13.1,'一周后，跟着跳的人超过 30 个');cap(t,13.2,15.1,'一个月后，据记载多达约 400 人……','#d9e6e2');
    cap(t,15.2,T.foil,'有人跳到筋疲力尽，倒在街头',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'官方药方：继续跳！',PAPER,215,70);
    rect(560,700,800,40,CYAN,3,a*seg(t,16.4,16.8),'rgba(127,232,255,.06)');for(let i=0;i<3;i++)personStand(700+i*260,700,0.6,a*seg(t,17,17.4),CYAN);
    for(let i=0;i<5;i++)dancer(640+i*160,GY+40,0.5,a*seg(t,17.6,18),t,i,PAPER,1.3);
    for(let i=0;i<4;i++){const q=(t*0.8+i/4)%1;txt('♪',700+i*220+Math.sin(q*6)*20,640-q*200,46,GREEN,{f:SANS,a:a*(1-q)*seg(t,17,17.4)});}
    cap(t,T.foil+.4,18.4,'医生说这是"血太热"，跳出来就好');cap(t,18.4,T.hit,'官方竟然请来乐队、搭起舞台……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'集体心因性疾病',RED,215,100,{pop:1,fi:.02});txt('Mass Psychogenic Illness',W/2,320,38,PAPER,{f:MONO,a:a*seg(t,21.4,21.8)});
    town(a*0.4);crowd(t,a,20,'#c9d6d2',0.5);
    cap(t,T.hit+.8,T.trace,'历史学家约翰·沃勒的解释（一种解释）');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：那几年发生了什么？',PAPER,215,66);
    [[560,'连年饥荒',25.8],[960,'疾病流行',26.4],[1360,'粮价暴涨',27.0]].forEach(([x,s,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-160,420,320,200,CYAN,3,ca,'rgba(127,232,255,.05)');txt(s,x,520,52,PAPER,{a:ca});});
    const ca=a*seg(t,28.4,28.8);rect(560,680,800,150,RED,3,ca,'rgba(255,60,60,.08)');txt('传说：圣维特会降下"跳舞诅咒"',W/2,755,44,RED,{f:SANS,w:700,a:ca});
    cap(t,T.trace+.4,28.2,'饥荒和疾病，让全城陷入恐惧和绝望');cap(t,28.3,T.reveal,'当地还流传着一个可怕的跳舞诅咒');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('压力 + 信念',600,470,130,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('Stress × Belief',600,600,44,PAPER,{f:MONO,a:a*seg(t,31.5,32)});
    brain(1400,520,1.1,CYAN,a*seg(t,32.6,33),seg(t,33.4,34.4)*(0.6+0.4*Math.sin(t*9)));
    txt('恍惚状态',1400,700,44,WARM,{f:SANS,w:700,a:a*seg(t,34,34.4),glow:'rgba(255,200,120,.5)'});
    dancer(1400,880,0.55,a*seg(t,34.4,34.8),t,0,WARM,1.2);
    cap(t,T.reveal+.6,34.4,'在极度压力下，相信诅咒的人陷入恍惚');cap(t,34.5,T.eye,'身体不受控制地跳，像被"附身"一样');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么会"传染"？',PAPER,215,66);
    const r=rng(21),nodes=[];for(let i=0;i<24;i++)nodes.push([420+r()*1080,420+r()*380]);
    const sp=seg(t,37.6,41);nodes.forEach((n,i)=>{const d=Math.hypot(n[0]-960,n[1]-610)/700;const lit=sp>d;
      nodes.forEach((m,j)=>{if(j>i&&Math.hypot(n[0]-m[0],n[1]-m[1])<230)line([n,m],lit?RED:'rgba(127,232,255,.3)',lit?2.5:1.5,lit,a*0.7);});
      circ(n[0],n[1],10,null,0,a,lit?RED:CYAN);});
    cap(t,T.eye+.4,39.9,'人会不自觉地模仿身边人的情绪和动作');cap(t,40,T.off,'越相信自己"中了咒"，就越停不下来');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'送往圣维特神殿后，渐渐平息',PAPER,215,62);
    line([[300,GY],[900,GY],[1300,560],[1700,560]],WARM,3,true,a);rect(1500,440,120,120,WARM,3,a);line([[1500,440],[1560,390],[1620,440]],WARM,3,true,a);glowDot(1560,500,140,'rgba(255,200,120,.35)',a);
    for(let i=0;i<5;i++){const x=lerp(400,1100,seg(t,42.2,45))+i*-70;const y=x<900?GY:GY-(x-900)*0.65;personStand(x,y,0.42,a,PAPER);}
    cap(t,T.off+.4,T.end,'舞者被送上山中神殿祈祷，疫情才结束');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"诅咒"，只是',760,400,96,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('恐惧在人群里传染',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：John Waller《A Time to Dance, a Time to Die》2008 · 另有麦角中毒说，证据较弱',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你觉得是心理还是中毒？｜评论区报案',GREEN);}
}
function coverScene(){town(0.6);crowd(3.3,1,16,'#c9d6d2',0.55);ghost(1700,620,0.8,0.6,'150,150,160');
  txt('约 400 人停不下来地跳',W/2,215,96,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('是诅咒，还是集体恐惧？',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1518',300,920,-1,0,GREEN,64,-0.1);}
