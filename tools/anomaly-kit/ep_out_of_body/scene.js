// CASE 038 灵魂出窍（Blanke, Ortigue, Landis & Seeck 2002 Nature 419:269：日内瓦大学医院，43 岁癫痫女病人，电刺激右侧角回诱发出体体验）
const EP={caseNo:'038',name:'病床上的灵魂',sfx:{ghost:[11.8,13.0],stings:[],blips:[26.0,27.6,33.4,34.4,38.4,39.4],whisper:[10,16.5]}};
const BX=960,BY=780;
function ward(t,a,o={}){if(a<=0)return;const c=o.col||CYAN;roomBox(480,1440,380,880,a,c);bed(BX,BY,460,a,c);
  line([[BX-230,BY+60],[BX-230,880]],c,3,true,a);line([[BX+230,BY+60],[BX+230,880]],c,3,true,a);
  // 监护仪
  rect(1240,560,150,110,c,2.5,a*0.8,'rgba(0,0,0,.4)');const pts=[];for(let i=0;i<=30;i++){const q=i/30;let v=0;const ph=(q*2+t*1.2)%1;if(ph>0.45&&ph<0.55)v=Math.sin((ph-0.45)*62.8)*30;pts.push([1250+q*130,615-v]);}line(pts,o.ecg||GREEN,2.5,true,a);
  line([[1315,670],[1315,880]],c,2,true,a*0.6);}
function patient(t,a,c=PAPER){personLie(BX+20,BY-30,1,a,c,1);}
function soul(t,a,lift){if(a<=0)return; // 漂浮的“自己”，面朝下
  ctx.save();ctx.globalAlpha=clamp(a)*(0.55+0.2*Math.sin(t*5));ctx.translate(BX+20,lerp(BY-30,440,lift));ctx.filter='blur(3px)';
  ctx.strokeStyle='rgb(200,215,215)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(-150,10,24,0,6.28);ctx.stroke();ctx.beginPath();ctx.moveTo(-124,8);ctx.lineTo(140,2);ctx.stroke();ctx.restore();}
function electrodes(x,y,s,a,hot){if(a<=0)return;for(let i=0;i<4;i++)for(let j=0;j<3;j++){const ex=x+(i-1.5)*24*s,ey=y+(j-1)*24*s;const h=(i==2&&j==1)?hot:0;circ(ex,ey,6*s,h?RED:GREEN,2,a,h?`rgba(255,60,60,${0.8*h})`:'rgba(109,255,192,.2)');}}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'病床灵魂出窍事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'她飘在天花板上，看见了躺在床上的自己');
    ward(t,a);patient(t,a);soul(t,a*seg(t,1.0,1.6),eOut(seg(t,1.0,3.6)));
    stamp('未解之谜',1640,900,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'2002 年 · 瑞士 · 日内瓦大学医院',PAPER,215,60);ward(t,a);patient(t,a);
    brain(1640,560,0.6,CYAN,a*seg(t,7.4,7.8));electrodes(1660,540,1,a*seg(t,7.8,8.2),0);
    cap(t,T.lab+.4,7.4,'一位 43 岁的癫痫病人，正在做手术前的检查');cap(t,7.4,T.night+.2,'医生在她的大脑表面放了电极，寻找发病的位置');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    ward(t,a*0.6,{ecg:t>12?RED:GREEN});patient(t,a);
    const lift=eOut(seg(t,10.8,14.5));soul(t,a*seg(t,10.6,11)*(1-seg(t,15.1,15.25)),lift);
    if(t>10.4&&t<10.9)for(let k=0;k<4;k++)line([[1500+k*20,420],[1480+k*20,480]],RED,3,true,a*0.8);
    ghost(1380,640,0.8,a*flashA(t,[11.8,13.0],0.13),'170,180,180');
    ghost(BX+20,560,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,13.1,'电流一通，她突然说："我好像在往上飘……"');cap(t,13.2,15.1,'"我从上面看见自己躺在床上，只看得到腿和下半身"','#d9e6e2');
    cap(t,15.2,T.foil,'电流一断，她又"回到"了身体里',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'灵魂真的能离开身体？',PAPER,215,70);
    [[560,'濒死体验',16.4],[960,'噩梦惊醒',17.0],[1360,'手术台上',17.6]].forEach(([x,s,t0],i)=>{const ca=a*seg(t,t0,t0+.3);rect(x-160,420,320,300,CYAN,3,ca,'rgba(127,232,255,.05)');
      line([[x-90,640],[x+90,640]],CYAN,2.5,true,ca);personLie(x+10,630,0.5,ca);ghost(x,500,0.3,ca*(0.4+0.3*Math.sin(t*4+i)));txt(s,x,690,38,PAPER,{a:ca,f:SANS,w:700});});
    cap(t,T.foil+.4,18.4,'很多人都讲过类似的经历：飘起来，从上往下看自己');cap(t,18.5,T.hit,'几千年来，人们说那是灵魂暂时离开了肉体');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'"出窍"的开关，就在大脑里！',RED,215,86,{pop:1,fi:.02});
    brain(960,620,2,CYAN,a,0);const hot=flashA(t,[21.2,22.2,23.2,24.2],0.5);electrodes(1080,590,1.6,a,hot);
    txt('ON',1300,500,44,RED,{f:MONO,a:a*hot,glow:'rgba(255,60,60,.7)'});
    cap(t,T.hit+.8,T.trace,'医生发现：每次刺激同一个位置，她就会"出窍"');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：那是什么地方？',PAPER,215,64);
    brain(640,620,2,CYAN,a,0);circ(760,560,34,RED,4,a*seg(t,25.6,26),'rgba(255,60,60,.35)');
    line([[790,540],[1060,460]],RED,2.5,true,a*seg(t,25.8,26.2));txt('右侧角回',1080,460,48,RED,{f:SANS,w:900,a:a*seg(t,25.8,26.2),al:'left'});
    [['视觉',27.0],['触觉',27.4],['平衡感',27.8]].forEach(([s,t0],i)=>{const ca=a*seg(t,t0,t0+.3);rect(1080+i*220,560,180,80,GREEN,2.5,ca,'rgba(109,255,192,.06)');txt(s,1170+i*220,600,36,PAPER,{f:SANS,w:700,a:ca});});
    txt('↓ 拼成',1390,690,32,DIM,{f:SANS,w:500,a:a*seg(t,28.3,28.6)});txt('"我的身体在这里"',1390,760,44,GREEN,{f:SANS,w:900,a:a*seg(t,28.5,28.9)});
    cap(t,T.trace+.4,28.2,'电极下面是右侧角回，大约在右耳的后上方');cap(t,28.3,T.reveal,'它负责把视觉、触觉和平衡感拼成"我"');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('坐标错位',540,430,130,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('大脑算错了"我在哪"',540,580,52,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,32)});
    const bx=1380,by=800;line([[bx-200,by],[bx+200,by]],CYAN,3,true,a);personLie(bx+10,by-20,0.8,a,PAPER);
    const d=eOut(seg(t,32.6,34));ctx.save();ctx.globalAlpha=a;ctx.setLineDash([10,10]);line([[bx-120,by-20],[bx-120,by-20-d*300]],GREEN,2,false,a);ctx.restore();
    ctx.save();ctx.translate(bx-BX-10+(0),by-20-d*300-(BY-30)+10);soul(t,a*seg(t,32.6,33),0);ctx.restore();
    txt('真实身体',bx+240,by-20,30,PAPER,{f:SANS,w:700,a,al:'left'});txt('大脑算出的视角',bx+240,by-20-d*300,30,GREEN,{f:SANS,w:700,a:a*seg(t,33.4,33.8),al:'left'});
    cap(t,T.reveal+.6,34.4,'信号一乱，大脑算出的"我"和真实的身体错开了');cap(t,34.5,T.eye,'于是视角就像被搬到了半空中');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么濒死、梦里也会出现？',PAPER,215,64);
    [[480,'缺氧',37.4],[960,'癫痫发作',38.2],[1440,'鬼压床',39.0]].forEach(([x,s,t0])=>{const ca=a*seg(t,t0,t0+.3);circ(x,560,130,GREEN,3,ca,'rgba(109,255,192,.05)');txt(s,x,560,44,PAPER,{a:ca,f:SANS,w:700});});
    txt('都可能扰乱这块区域（一种解释）',960,780,40,RED,{f:SANS,w:700,a:a*seg(t,39.6,40)});
    cap(t,T.eye+.4,39.9,'缺氧、癫痫、睡眠瘫痪，都可能干扰身体感的整合');cap(t,40,T.off,'大脑就给你造出一个"从上往下看"的画面');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'灵魂没走，只是坐标乱了',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    ward(t,a,{col:WARM,ecg:WARM});patient(t,a,WARM);
    cap(t,T.off+.4,T.end,'刺激一停，身体感马上恢复正常');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"灵魂出窍"',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是大脑弄丢了坐标',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：Blanke, Ortigue, Landis & Seeck 2002《Nature》',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你有过灵魂出窍的感觉吗？｜评论区报案',GREEN);}
}
function coverScene(){ward(3,1);patient(3,1);soul(3,1.3,0.85);ghost(1560,690,0.7,0.5);
  txt('她飘在天花板上，看着自己',W/2,215,100,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('灵魂出窍是真的？',W/2,335,58,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('2002',300,920,-1,0,GREEN,64,-0.1);}
