// CASE 021 镜中陌生人（Caputo 2010, Perception）
const EP={caseNo:'021',name:'镜子里的陌生人',sfx:{ghost:[11.8,12.9,14.1],stings:[],blips:[25.4,26.0,26.6,27.2,28.3],whisper:[10,16]}};
const MX=960,MY=600;
function mirror(a,glass=0.08,c=CYAN){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.ellipse(MX,MY,210,270,0,0,6.28);ctx.fillStyle=`rgba(127,232,255,${glass})`;ctx.fill();ctx.strokeStyle=c;ctx.lineWidth=5;ctx.shadowColor=c;ctx.shadowBlur=20;ctx.stroke();ctx.beginPath();ctx.ellipse(MX,MY,226,286,0,0,6.28);ctx.lineWidth=2;ctx.stroke();ctx.restore();
  line([[MX,MY+286],[MX,880]],c,3,true,a*0.6);line([[MX-90,880],[MX+90,880]],c,3,true,a*0.6);}
function face(t,a,def=0,mon=0,s=1,cx=MX,cy=MY,col=PAPER){if(a<=0)return;const j=def*Math.sin(t*3.1),k=def*Math.sin(t*2.3+1);
  ctx.save();ctx.translate(cx,cy);ctx.scale(s,s);ctx.globalAlpha*=a;ctx.strokeStyle=mon>0.5?RED:col;ctx.lineWidth=4;ctx.shadowColor=ctx.strokeStyle;ctx.shadowBlur=14;
  ctx.beginPath();ctx.ellipse(0,0,120+def*20*j,160+def*30*k,def*0.15*j,0,6.28);ctx.stroke();
  // 眼睛
  for(const sx of[-1,1]){const ex=sx*(48+def*26*(sx>0?j:k)),ey=-30-def*24*(sx>0?k:j);ctx.beginPath();ctx.ellipse(ex,ey,20+def*10,10+def*14+mon*8,sx*def*0.4,0,6.28);ctx.stroke();
    ctx.save();ctx.fillStyle=mon>0.5?RED:col;ctx.beginPath();ctx.arc(ex+def*6*j,ey,5+mon*3,0,6.28);ctx.fill();ctx.restore();}
  ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(-12+def*10*j,40);ctx.lineTo(8,44);ctx.stroke();
  ctx.beginPath();if(mon>0.5){ctx.moveTo(-60,85);for(let i=0;i<=8;i++)ctx.lineTo(-60+i*15,85+(i%2?22:0));}else{ctx.moveTo(-40-def*20,90+def*10*k);ctx.quadraticCurveTo(0,100+def*30*j,40+def*20,90-def*10*k);}ctx.stroke();
  ctx.restore();}
function timer(t,x,y,a,t0,t1){const p=seg(t,t0,t1);const sec=Math.floor(p*600);txt(`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`,x,y,64,p>=1?RED:GREEN,{f:MONO,a,glow:'rgba(109,255,192,.5)'});txt('凝视时间',x,y-60,28,DIM,{f:SANS,w:500,a});}
function people(t,a,red=0){for(let i=0;i<50;i++){const x=1360+(i%10)*44,y=430+Math.floor(i/10)*80;const rr=seg(t,red+(i%10)*0.03+Math.floor(i/10)*0.05,red+0.2+(i%10)*0.03+Math.floor(i/10)*0.05);
  const c=red&&rr>0?RED:PAPER;headAt(x,y,9,c,a*0.9);line([[x,y+10],[x,y+32]],c,2.5,false,a*0.9);line([[x-10,y+46],[x,y+32],[x+10,y+46]],c,2,false,a*0.9);}}
function lamp(a,on=0.3){glowDot(MX-330,420,160,`rgba(255,200,120,${on*0.5})`,a);line([[MX-330,330],[MX-330,410]],CYAN,2,true,a*0.6);circ(MX-330,420,14,CYAN,2,a*0.7);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'镜子里的陌生人',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'盯着镜子 10 分钟，你会看见谁？');
    mirror(a);const fl=flashA(t,[1.5,2.1,3.2,3.8],0.12);face(t,a*(1-fl),0.1);face(t,a*fl,1.3,1);
    stamp('未解之谜',1560,720,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'2010 · 意大利 · 乌尔比诺大学',PAPER,215,62);
    ctx.save();ctx.translate(-260,0);mirror(a);face(t,a,0);ctx.restore();people(t,a*seg(t,5,5.6));
    cap(t,T.lab+.4,7.4,'心理学家 Caputo 找来 50 名健康的年轻人');cap(t,7.4,T.night+.2,'让他们在昏暗房间里，盯着镜中自己的脸');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    lamp(a,0.25);mirror(a,0.03);const d=seg(t,12.6,15)*1.1;const mon=flashA(t,[11.8,12.9,14.1],0.12)+win(t,15.2,16,.02,.4);
    face(t,a*(1-mon),d);face(t,a*mon,1.4,1);timer(t,1500,560,a,10,16);
    cap(t,T.night+.3,13.1,'灯光很暗，只看得清自己脸的轮廓');cap(t,13.2,15.1,'不到 1 分钟，有人开始觉得不对劲……','#d9e6e2');
    cap(t,15.2,T.foil,'镜子里的脸，不再是自己',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'10 分钟后',PAPER,215,66);mirror(a,0.03);face(t,a,0.6+0.3*Math.sin(t*2));timer(t,1500,560,a,10,17.5);lamp(a,0.25);
    cap(t,T.foil+.4,18.4,'研究者让他们写下：刚才在镜子里看到了什么');cap(t,18.4,T.hit,'答案，让人后背发凉……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'所有人都看到了"别人"',RED,215,92,{pop:1,fi:.02});
    ctx.save();ctx.translate(-260,0);mirror(a,0.05,RED);face(t,a,1.2,1);ctx.restore();people(t,a,21.2);
    cap(t,T.hit+.8,T.trace,'50 个人，全都觉得镜中的脸"不像自己"');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'他们看到了什么？',PAPER,215,66);
    const rows=[['自己的脸严重变形',.66,'66%',25.4],['怪物',.48,'48%',26.0],['陌生人',.28,'28%',26.6],['动物的脸',.18,'18%',27.2],['已去世的亲人',.10,'10%',28.3]];
    rows.forEach(([l,f,v,t0],i)=>bar(820,370+i*96,760,50,f,l,v,t0,t,i==1||i==4?RED:GREEN));
    cap(t,T.trace+.4,28.2,'将近一半的人，在镜子里看到了怪物');cap(t,28.3,T.reveal,'还有 10% 的人，看到了已经去世的亲人',RED);}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);
    title(t,T.reveal,T.eye+.2,'大脑"拼脸"失灵了',RED,215,96,{pop:1,fi:.02});txt('（一种解释）',W/2,305,30,DIM,{f:SANS,w:500,a});
    const sp=Math.sin(seg(t,32,36.5)*Math.PI);// 五官散开再拼回
    ctx.save();ctx.globalAlpha=a;const parts=[[-48,-30,'eye'],[48,-30,'eye'],[0,30,'nose'],[0,92,'mouth']];
    circ(MX,MY+20,165*(1+sp*0.1),PAPER,3,a*(1-sp*0.6));
    parts.forEach(([x,y,k],i)=>{const ang=i*1.7+0.6;const px=MX+x+Math.cos(ang)*sp*260,py=MY+20+y+Math.sin(ang)*sp*180;
      if(k=='eye'){ctx.strokeStyle=PAPER;ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(px,py,22,11,0,0,6.28);ctx.stroke();}
      else if(k=='nose'){line([[px,py-40],[px-12,py+10],[px+8,py+14]],PAPER,4,true,a);}else{line([[px-42,py],[px,py+12],[px+42,py]],PAPER,4,true,a);}});
    ctx.restore();
    cap(t,T.reveal+.6,34.4,'盯着一点太久，周围的细节会慢慢"淡出"');cap(t,34.5,T.eye,'大脑只好自己补全，补出了另一张脸');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'人类天生爱在万物里看到脸',PAPER,215,64);
    const oa=a*seg(t,37.4,37.9);rect(560,420,300,300,CYAN,4,oa);circ(650,520,18,CYAN,3,oa);circ(770,520,18,CYAN,3,oa);line([[660,640],[710,660],[760,640]],CYAN,4,true,oa);txt('插座',710,770,34,PAPER,{f:SANS,w:700,a:oa});
    const ca=a*seg(t,38.6,39.1);ctx.save();ctx.globalAlpha=ca;ctx.strokeStyle=CYAN;ctx.lineWidth=4;ctx.shadowColor=CYAN;ctx.shadowBlur=14;ctx.beginPath();for(const [x,y,r] of [[1180,560,70],[1280,520,90],[1390,560,70],[1300,610,80]])ctx.arc(x,y,r,0,6.28);ctx.stroke();ctx.restore();
    circ(1240,540,10,PAPER,0,ca,PAPER);circ(1340,540,10,PAPER,0,ca,PAPER);line([[1250,600],[1290,620],[1330,600]],PAPER,4,true,ca);txt('云朵',1290,770,34,PAPER,{f:SANS,w:700,a:ca});
    cap(t,T.eye+.4,39.9,'插座、云朵、墙上的污渍，都能看出脸');cap(t,40,T.off,'光线越暗、盯得越久，大脑"脑补"得越多');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);const w=seg(t,42.3,43.3);
    title(t,T.off,T.end+.2,'开灯，眨眨眼',PAPER,215,66);lamp(a,0.3+w*0.9);mirror(a,0.05+w*0.1);face(t,a,0.8*(1-w));
    ctx.save();ctx.globalAlpha=a*w*0.2;const g=ctx.createRadialGradient(MX,MY,0,MX,MY,700);g.addColorStop(0,'rgba(255,230,180,1)');g.addColorStop(1,'rgba(255,230,180,0)');ctx.fillStyle=g;ctx.fillRect(0,300,W,700);ctx.restore();
    cap(t,T.off+.4,T.end,'一切恢复正常，镜子里还是你自己');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('镜子里的"怪物"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('是你的大脑画出来的',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1520,480,46.2,t,RED,90,-0.14);
    txt('资料：Caputo, 2010 · Perception《镜中陌生面孔错觉》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'半夜千万别关灯照镜子｜你试过吗？评论区报案',GREEN);}
}
function coverScene(){mirror(1,0.05,RED);face(20,1,1.3,1);glowDot(MX,MY,300,'rgba(255,40,40,.18)');
  txt('别盯着镜子',420,420,112,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('超过 10 分钟',420,580,84,RED,{glow:'rgba(255,60,60,.7)',blur:34});
  stamp('48%',1560,500,-1,0,GREEN,120,-0.1);txt('的人看到了怪物',1560,700,50,PAPER,{f:SANS,w:700});}
