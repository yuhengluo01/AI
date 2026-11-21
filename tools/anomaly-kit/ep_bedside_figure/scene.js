// CASE 028 床边站着一个人：入睡前幻觉（Ohayon 等 1996, British Journal of Psychiatry）
const EP={caseNo:'028',name:'床边的黑影',sfx:{ghost:[10.8,11.9,12.9],stings:[13.9],blips:[25.8,28.5,38.4,39.4],whisper:[10,16]}};
const X0=460,X1=1460,TOP=340,FL=860,BX=900,BY=760;
function bedroom(t,a,o={}){if(a<=0)return;const c=o.col||CYAN;roomBox(X0,X1,TOP,FL,a,c);
  rect(540,420,140,170,c,2.5,a*0.8,o.moon?`rgba(150,200,255,${0.12*o.moon})`:null);line([[610,420],[610,590]],c,1.5,false,a*0.6);line([[540,505],[680,505]],c,1.5,false,a*0.6);
  line([[1330,FL],[1330,FL-300],[1430,FL-300],[1430,FL]],c,2.5,true,a*0.7);
  bed(BX,BY,420,a,c);line([[BX-210,BY+60],[BX-210,FL]],c,3,true,a);line([[BX+210,BY+60],[BX+210,FL]],c,3,true,a);
  rect(1170,BY-10,90,110,c,2.5,a*0.7);txt(o.clock||'23:47',1215,BY+45,30,RED,{f:MONO,a:a*0.9,glow:'rgba(255,60,60,.6)'});
  if(o.lamp){glowDot(1215,BY-90,260,`rgba(255,200,120,${0.35*o.lamp})`,a);line([[1195,BY-10],[1215,BY-70],[1235,BY-10]],WARM,3,true,a*o.lamp);}}
function sleeper(t,a,eyes=0,jerk=0){ctx.save();ctx.translate(0,-jerk*18);personLie(BX+20,BY-30,1,a,PAPER,eyes);ctx.restore();}
function zz(t,a){for(let i=0;i<3;i++){const q=(t*0.5+i/3)%1;txt('z',BX-160+q*60,BY-90-q*120,30+q*20,DIM,{f:SANS,a:a*(1-q)});}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'床边人影事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'刚闭上眼，就看见床边站着一个人');
    bedroom(t,a,{moon:1});sleeper(t,a,1);ghost(1080,690,0.9,a*(flashA(t,[1.3,1.9,3.2],0.12)+0.35*win(t,2.3,4.2,.3,.3)));
    stamp('未解之谜',1640,700,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'深夜 · 卧室 · 快要睡着的那一刻',PAPER,215,60);bedroom(t,a,{moon:1});sleeper(t,a,1-seg(t,6.5,8.5));zz(t,a*seg(t,8,8.5));
    cap(t,T.lab+.4,7.4,'关灯，躺下，眼皮越来越沉');cap(t,7.4,T.night+.2,'就在你快要睡着的那一刻……');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    bedroom(t,a*0.55,{moon:0.5});const jk=t>=15.2&&t<15.6?Math.sin(seg(t,15.2,15.6)*Math.PI):0;sleeper(t,a,t>15.2?1:0.3,jk);
    ghost(1080,690,0.9,a*(flashA(t,[10.8,11.9,12.9],0.14)+0.55*win(t,11.2,13.2,.4,.3)*(0.6+0.4*Math.sin(t*15))));
    if(t>13.2&&t<15.2){const q=seg(t,13.2,15.2);ghost(lerp(1120,1040,q),660,lerp(0.9,1.3,q),a*0.8*(0.7+0.3*Math.sin(t*19)),'150,150,160');
      for(let i=0;i<3;i++){const qq=(t*0.9+i/3)%1;txt('……',BX-120-qq*80,BY-130-qq*60,36,DIM,{f:SANS,a:a*(1-qq)});}}
    cap(t,T.night+.3,13.1,'床边站着一个黑影，正低头看着你');cap(t,13.2,15.1,'耳边有人叫你的名字，越来越近……','#d9e6e2');
    cap(t,15.2,T.foil,'你猛地一抖，睁开眼——什么都没有',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'撞鬼了，还是在做梦？',PAPER,215,66);bedroom(t,a,{moon:1});sleeper(t,a,1);
    txt('?',1110,560,180,GREEN,{f:SERIF,a:a*seg(t,18.4,18.9)*(0.7+0.3*Math.sin(t*5)),glow:'rgba(109,255,192,.6)'});
    cap(t,T.foil+.4,18.4,'可你明明还没睡着，身体也能动');cap(t,18.4,T.hit,'那个人影，到底是从哪来的？');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'入睡前幻觉',RED,215,110,{pop:1,fi:.02});txt('Hypnagogic Hallucination',W/2,320,40,PAPER,{f:MONO,a:a*seg(t,21.4,21.8)});
    bed(BX,BY,420,a*0.7);sleeper(t,a,0.5);ghost(1080,690,0.9,a*0.3);
    cap(t,T.hit+.8,T.trace,'这是一种有正式名字的常见睡眠现象');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：近 5000 人的调查',PAPER,215,66);
    bar(760,470,860,80,0.37,'入睡时','约 37%',25.6,t,RED);bar(760,640,860,80,0.125,'醒来时','约 12.5%',28.3,t,GREEN);
    txt('有过幻觉的人',W/2,800,34,DIM,{f:SANS,w:500,a:a*seg(t,26,26.4)});
    cap(t,T.trace+.4,28.2,'英国一项近 5000 人的调查发现');cap(t,28.3,T.reveal,'约 37% 的人，入睡时有过这样的幻觉');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('醒 + 梦 叠加',W/2,380,130,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    const x0=460,x1=1460,y0=560,y1=780;line([[x0,y1],[x1,y1]],DIM,2,false,a*seg(t,32.3,32.6));
    const pr=seg(t,32.4,35.4);const pa=[],pb=[];for(let i=0;i<=60*pr;i++){const q=i/60;const x=lerp(x0,x1,q);pa.push([x,lerp(y0,y1,1/(1+Math.exp(-(q-0.6)*10)))]);pb.push([x,lerp(y1,y0,1/(1+Math.exp(-(q-0.4)*10)))]);}
    if(pa.length>1){line(pa,CYAN,5,true,a);line(pb,WARM,5,true,a);}
    txt('清醒',x0-30,y0,34,CYAN,{f:SANS,w:700,al:'right',a:a*seg(t,32.4,32.8)});txt('做梦',x0-30,y1,34,WARM,{f:SANS,w:700,al:'right',a:a*seg(t,32.4,32.8)});
    const za=a*seg(t,34,34.4);rect(lerp(x0,x1,0.38),y0-10,lerp(0,x1-x0,0.24),y1-y0+20,RED,3,za,'rgba(255,60,60,.1)');txt('幻觉在这里',lerp(x0,x1,0.5),y0-40,34,RED,{f:SANS,w:700,a:za});
    cap(t,T.reveal+.6,34.4,'快睡着时，大脑先一步开始"做梦"');cap(t,34.5,T.eye,'意识却还醒着，梦就叠在了真实的房间上');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么偏偏是一个"人"？',PAPER,215,64);brain(700,600,1.2,CYAN,a,seg(t,38.4,39)*(0.6+0.3*Math.sin(t*8)));
    ghost(1300,640,1,a*seg(t,38.4,39)*0.7);line([[860,560],[1180,600]],RED,3,true,a*seg(t,38.4,38.8));
    txt('人形 / 人脸探测',700,800,36,GREEN,{f:SANS,w:700,a:a*seg(t,39.4,39.8)});
    cap(t,T.eye+.4,39.9,'大脑天生擅长从模糊中找出人形和人脸');cap(t,40,T.off,'在黑暗里，它宁可多"看见"一个人');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'熬夜和压力大时，更容易出现',PAPER,215,60);bedroom(t,a,{col:WARM,lamp:1,clock:'07:00'});sleeper(t,a,1);
    ghost(1080,690,0.9,a*(1-seg(t,42.2,43.2))*0.5);
    cap(t,T.off+.4,T.end,'规律作息、睡足觉，它大多会少很多');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"鬼"，只是',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('提前开场的梦',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：Ohayon 等, 1996 · British Journal of Psychiatry（约 5000 名英国成年人）',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你也见过床边的人吗？｜评论区报案',GREEN);}
}
function coverScene(){ctx.save();ctx.translate(0,90);bedroom(20,1,{moon:1});sleeper(20,1,1);ghost(1080,680,1.05,0.85);ctx.restore();
  txt('床边站着一个人',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('约 37% 的人遇到过',W/2,330,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('37%',1660,720,-1,0,GREEN,72,-0.1);}
