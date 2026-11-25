// CASE 048 科塔尔综合征 / 行尸综合征（1880 Jules Cotard 描述 X 小姐：坚信没有大脑、神经、内脏，不会死、不需要进食；2013 列日团队 Charland-Verville 等《Cortex》PET：额顶叶大片代谢极低；感知-情感断连为一种解释；可治疗）
const EP={caseNo:'048',name:'会走路的"死人"',sfx:{ghost:[11.4,12.9,14.3],stings:[12.6],blips:[21.8,22.4,26.0,27.4,33.0,34.2,38.4,39.6],whisper:[10,16]}};
function body(x,y,s,a,org,c=PAPER){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  headAt(0,-250,48,c,a);line([[-40,-195],[-90,-170],[-110,0],[-80,180],[80,180],[110,0],[90,-170],[40,-195]],c,4,true,a);
  line([[-90,-170],[-150,40]],c,3.5,true,a);line([[90,-170],[150,40]],c,3.5,true,a);line([[-50,180],[-60,380]],c,3.5,true,a);line([[50,180],[60,380]],c,3.5,true,a);
  if(org>0){ctx.globalAlpha=a*org;// 脑 心 肠：简化图标
    ctx.strokeStyle=RED;ctx.lineWidth=3;ctx.shadowColor=RED;ctx.shadowBlur=12;ctx.beginPath();ctx.ellipse(0,-258,30,20,0,0,6.28);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-14,-100);ctx.bezierCurveTo(-46,-140,-60,-80,-14,-50);ctx.lineTo(-14,-50);ctx.bezierCurveTo(30,-80,18,-140,-14,-100);ctx.stroke();
    ctx.beginPath();for(let i=0;i<5;i++){ctx.moveTo(-50,20+i*28);ctx.quadraticCurveTo(0,6+i*28,50,20+i*28);}ctx.stroke();}
  ctx.restore();}
function scanBrain(t,a,x,y,s,dim){if(a<=0)return;brain(x,y,s,CYAN,a);
  const R=[[-60,-55,70,0.85],[40,-75,60,0.9],[80,-10,45,0.7],[-90,10,40,0.2],[10,20,40,0.15]];
  R.forEach(([dx,dy,r,low])=>{const hot=1-low*dim;glowDot(x+dx*s,y+dy*s,r*s*1.2,`rgba(${255},${(80+hot*150)|0},${(40)|0},${0.25+hot*0.55})`,a);});}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'她坚信，自己已经死了',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'明明能走能说，却说自己没有心、没有脑');
    body(960,640,0.78,a,1-seg(t,1.4,3.4));ghost(1300,640,0.9,a*flashA(t,[1.8,2.9,3.6],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1880 年 · 法国 · 巴黎',PAPER,215,64);
    rect(560,400,800,440,CYAN,3,a,'rgba(127,232,255,.04)');for(let i=0;i<6;i++)line([[620,470+i*58],[lerp(1000,1300,(i*37%10)/10),470+i*58]],PAPER,2,false,a*seg(t,5.4+i*.3,5.7+i*.3)*0.7);
    txt('病例：X 小姐',960,440,34,GREEN,{f:SANS,w:700,a:a*seg(t,5,5.4)});
    cap(t,T.lab+.4,7.4,'1880 年，法国神经科医生科塔尔讲述了一个病例');cap(t,7.4,T.night+.2,'病人是一位中年女士，人称"X 小姐"');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    body(960,600,0.75,a,1-seg(t,11,13.4),'rgb(200,210,210)');
    ghost(1320,600,lerp(0.6,1.2,seg(t,11,15)),a*flashA(t,[11.4,12.9,14.3],0.14));ghost(600,600,1.3,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.5,'她说自己没有大脑、没有神经，也没有内脏');cap(t,12.6,15.1,'她说自己永远不会死，所以根本不用吃饭','#d9e6e2');
    cap(t,15.2,T.foil,'她觉得自己只剩一具空壳',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'她不是唯一一个',PAPER,215,72);
    for(let i=0;i<5;i++){const ca=a*seg(t,16.4+i*.35,16.7+i*.35);personStand(560+i*200,800,0.85,ca,'rgb(170,185,185)');ghost(560+i*200,620,0.55,ca*0.35*(0.6+0.4*Math.sin(t*4+i)));}
    cap(t,T.foil+.4,18.4,'后来，世界各地的医生陆续遇到类似病人');cap(t,18.5,T.hit,'他们坚信自己早已死去，只剩躯壳在走路');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'大脑扫描，真的"像睡死了"！',RED,215,86,{pop:1,fi:.02});
    scanBrain(t,a,960,620,1.9,seg(t,21.3,22.3));
    cap(t,T.hit+.8,T.trace,'2013 年，比利时团队给一位病人做了脑部扫描');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：哪里"熄火"了？',PAPER,215,64);
    scanBrain(t,a,700,620,1.6,1);
    bar(1260,470,420,44,0.9,'正常','',25.6,t,GREEN);bar(1260,600,420,44,0.3,'额叶','',26.4,t,RED);bar(1260,730,420,44,0.32,'顶叶','',27.2,t,RED);txt('极低',1710,622,36,RED,{f:SANS,w:900,al:'left',a:a*seg(t,26.6,27)});txt('极低',1710,752,36,RED,{f:SANS,w:900,al:'left',a:a*seg(t,27.4,27.8)});
    cap(t,T.trace+.4,28.1,'这位病人坚信，自己的脑子已经死了');cap(t,28.2,T.reveal,'扫描显示：额叶和顶叶大片区域代谢极低');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('科塔尔综合征',W/2,420,136,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('COTARD DELUSION',W/2,560,52,RED,{f:MONO,a:a*seg(t,31.4,31.8)});
    txt('俗称"行尸综合征"',W/2,690,60,PAPER,{f:SANS,w:900,a:a*seg(t,32.6,33)});
    cap(t,T.reveal+.6,34.4,'这种病以科塔尔命名，俗称"行尸综合征"');cap(t,34.5,T.eye,'常和重度抑郁、精神疾病或脑损伤一起出现');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么会觉得自己"死了"？',PAPER,215,64);
    [['断连','看什么都没有一点感觉',640,37.3],['脑补','于是得出：我已经死了',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,76,WARM,{a:ca});txt(s,x,630,32,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'一种解释：感知和情感的连接断了，世界变得毫无感觉');cap(t,40,T.off,'大脑为了解释这种"空"，就得出"我已经死了"');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'它是一种可以治疗的病',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    body(960,600,0.75,a,0.8,WARM);
    cap(t,T.off+.4,T.end,'经过抗抑郁等治疗，很多病人能慢慢好转');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"行尸"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是大脑"断了电"',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1560,480,46.2,t,RED,90,-0.14);
    txt('资料：Cotard 1880 · Charland-Verville 等 2013《Cortex》· BPS Research Digest',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你听过最离奇的怪病？｜评论区报案',GREEN);}
}
function coverScene(){body(960,660,0.8,1,0.35,'rgb(210,220,220)');ghost(1340,680,1.0,0.7);
  txt('她坚信自己已经死了',W/2,215,108,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('没有心，没有脑，只剩空壳在走路',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1880',300,920,-1,0,GREEN,64,-0.1);}
