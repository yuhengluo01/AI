// CASE 046 坦噶尼喀大笑瘟疫（1962.1.30 卡沙沙村女子教会寄宿学校，3 名女生开始，159 人中 95 人发作；3.18 关校；传到 Nshamba 村 217 人、Ramashenye 女校 48 人；约 1000 人、14 所学校关闭、约 18 个月平息；集体心因性疾病）
const EP={caseNo:'046',name:'停不下来的笑声',sfx:{ghost:[11.3,12.8,14.2],stings:[12.6],blips:[21.8,22.4,22.9,26.0,27.4,33.0,34.2,38.4,39.6],whisper:[10,16]}};
function school(x,y,a,c=CYAN,s=1){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  line([[-300,0],[-300,-180],[0,-300],[300,-180],[300,0],[-300,0]],c,3.5,true,a);line([[-20,-300],[-20,-360],[40,-345],[-20,-330]],c,2.5,true,a);line([[0,-360],[0,-300]],c,2.5,true,a*0.8);
  for(const wx of [-210,-90,90,210])rect(wx-30,-140,60,60,c,2,a*0.7);rect(-35,-80,70,80,c,2.5,a);ctx.restore();}
function girls(x0,y,n,gap,s,a,c,lit){for(let i=0;i<n;i++){const cc=lit&&lit(i)?RED:c;personStand(x0+i*gap,y,s,a,cc);}}
function ha(t,a,n,seed,area,col){if(a<=0)return;const r=rng(seed);for(let i=0;i<n;i++){const x=area[0]+r()*(area[2]-area[0]),y=area[1]+r()*(area[3]-area[1]),ph=r()*6,sz=36+r()*40;
  const fl=0.5+0.5*Math.sin(t*9+ph);txt('哈',x,y+Math.sin(t*14+ph)*5,sz,col,{a:a*fl*clamp(r()+0.3),rot:(r()-.5)*0.6,glow:col===RED?'rgba(255,60,60,.6)':null});}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'笑到停不下来的学校',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'一个女孩先笑了，接着是全校');
    school(960,880,a*0.8,CYAN,0.7);ha(t,a*seg(t,1.2,2),14,3,[520,400,1400,600],RED);ghost(1380,640,0.9,a*flashA(t,[1.8,2.9,3.6],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1962 年 · 坦噶尼喀 · 卡沙沙村',PAPER,215,60);school(700,800,a*0.9,CYAN,0.85);
    girls(1180,820,5,110,0.6,a*seg(t,5.4,5.9),PAPER,i=>t>7.6&&i<3);
    txt('（今坦桑尼亚，维多利亚湖西岸）',W/2,300,32,GREEN,{f:SANS,w:500,a:a*seg(t,5,5.4)});
    cap(t,T.lab+.4,7.4,'1962 年 1 月 30 日，湖边一所教会女子寄宿学校');cap(t,7.4,T.night+.2,'三个女孩突然大笑起来，怎么也停不下来');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    const sp=seg(t,10.3,15);girls(420,800,10,120,0.62,a*0.9,PAPER,i=>i<3+sp*7);
    ha(t,a*sp,Math.floor(6+sp*26),9,[340,380,1580,620],RED);
    ghost(1500,600,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.3,12.8,14.2],0.14));ghost(460,560,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'笑声像瘟疫一样，在宿舍里一个个传开');cap(t,12.6,15.1,'有人笑几个小时，有人断断续续发作十几天','#d9e6e2');
    cap(t,15.2,T.foil,'全校 159 名学生，95 人被"传染"',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'学校关门，笑声却跟着回了村',PAPER,215,66);
    const P=[[560,620,'卡沙沙女校','95 人',16.3],[1000,480,'恩沙姆巴村','217 人',17.4],[1400,700,'拉马申耶女校','48 人',18.4]];
    P.forEach(([x,y,n,v,t0],i)=>{const ca=a*seg(t,t0,t0+.3);circ(x,y,16,RED,3,ca,'rgba(255,60,60,.5)');waves(x,y,10,RED,t,ca*0.6,3,0,6.28);txt(n,x,y+60,34,PAPER,{f:SANS,w:700,a:ca});txt(v,x,y-56,40,RED,{f:MONO,a:ca});
      if(i>0){const [px,py]=P[i-1];const q=seg(t,t0-0.6,t0);line([[px,py],[lerp(px,x,q),lerp(py,y,q)]],RED,2,true,a*0.6);}});
    cap(t,T.foil+.4,18.4,'3 月 18 日学校被迫关门，学生回到家里');cap(t,18.5,T.hit,'没想到，邻村和另一所女校也开始狂笑');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'查不到任何病毒和毒物！',RED,215,90,{pop:1,fi:.02});
    [[620,'血液'],[960,'食物'],[1300,'饮水']].forEach(([x,s],i)=>{const ca=a*seg(t,21.2+i*.25,21.5+i*.25);line([[x-40,460],[x-40,560],[x-110,720],[x+110,720],[x+40,560],[x+40,460]],CYAN,3.5,true,ca);txt(s,x,660,40,PAPER,{f:SANS,w:700,a:ca});
      line([[x-100,450],[x+100,750]],RED,6,true,a*seg(t,22.4+i*.2,22.7+i*.2));line([[x+100,450],[x-100,750]],RED,6,true,a*seg(t,22.4+i*.2,22.7+i*.2));});
    cap(t,T.hit+.8,T.trace,'医生化验了血液、食物和水，什么都没找到');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：笑声从哪来？',PAPER,215,64);
    const L=[[420,'1961.12','国家刚独立',25.5],[960,'新学校','规矩严、要求高',26.5],[1500,'学生们','压力越积越多',27.5]];
    line([[300,560],[1620,560]],CYAN,3,true,a*seg(t,25.4,25.8));
    L.forEach(([x,k,s,t0])=>{const ca=a*seg(t,t0,t0+.3);circ(x,560,14,GREEN,3,ca,'rgba(109,255,192,.5)');txt(k,x,480,44,GREEN,{f:MONO,a:ca});txt(s,x,650,36,PAPER,{f:SANS,w:700,a:ca});});
    cap(t,T.trace+.4,28.1,'发作的几乎都是学生，老师们没有被"传染"');cap(t,28.2,T.reveal,'而一年前国家刚独立，学校和家长的期望都很高');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('集体心因性疾病',W/2,420,130,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('MASS PSYCHOGENIC ILLNESS',W/2,560,48,RED,{f:MONO,a:a*seg(t,31.4,31.8)});
    txt('约 1000 人',700,700,80,GREEN,{f:MONO,a:a*seg(t,32.6,33),glow:'rgba(109,255,192,.6)'});txt('14 所学校停课',1250,700,60,PAPER,{f:SANS,w:900,a:a*seg(t,33.2,33.6)});
    cap(t,T.reveal+.6,34.4,'病因不是病毒，而是"集体心因性疾病"');cap(t,34.5,T.eye,'据记载，前后约 1000 人发作，14 所学校停课');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'笑为什么会"传染"？',PAPER,215,64);
    [['压力','找不到出口，就从身体爆发',640,37.3],['模仿','看见别人发作，大脑跟着学',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,76,WARM,{a:ca});txt(s,x,630,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'长期的压力和焦虑，会变成身体症状爆发（一种解释）');cap(t,40,T.off,'看到身边人发作，大脑会不自觉地跟着"学"');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'约 18 个月后，笑声停了',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    school(960,820,a,WARM,0.8);
    cap(t,T.off+.4,T.end,'没有特效药，也没有驱邪，它慢慢自己平息了');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"瘟疫"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('是从心里传染的',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：Rankin & Philip 1963《Central African Journal of Medicine》· Bartholomew & Wessely 2002',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你见过集体"中邪"吗？｜评论区报案',GREEN);}
}
function coverScene(){school(960,900,0.9,CYAN,0.85);ha(3,1,16,3,[420,420,1500,560],RED);ghost(1480,720,1,0.7);
  txt('全校女生笑到停不下来',W/2,215,104,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('一笑就是一年半，传染上千人',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1962',300,920,-1,0,GREEN,64,-0.1);}
