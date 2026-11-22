// CASE 033 布罗肯幽灵（德国哈茨山布罗肯峰；1780 Silberschlag 记载；影子投在雾上+光环 glory）
const EP={caseNo:'033',name:'云中巨人',sfx:{ghost:[11.4,12.6,13.9],stings:[],blips:[25.8,26.8,27.8,33.4,34.4],whisper:[10,16]}};
const PK=[560,600]; // 山顶站人点
function mountain(a,c=CYAN){if(a<=0)return;line([[100,900],[300,780],[420,700],[PK[0]-40,PK[1]+10],[PK[0]+40,PK[1]+10],[700,700],[760,760],[820,900]],c,3.5,true,a);}
function fog(t,a,col='170,195,195'){if(a<=0)return;ctx.save();ctx.globalAlpha=a;const r=rng(21);for(let i=0;i<16;i++){const x=780+r()*1100+Math.sin(t*0.3+i)*30,y=560+r()*320,rr=120+r()*120;const g=ctx.createRadialGradient(x,y,0,x,y,rr);g.addColorStop(0,`rgba(${col},.16)`);g.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=g;ctx.fillRect(x-rr,y-rr,2*rr,2*rr);}ctx.restore();}
function glory(x,y,R,a){if(a<=0)return;const cs=['rgba(255,80,80,','rgba(255,200,90,','rgba(120,255,170,','rgba(110,180,255,','rgba(200,120,255,'];ctx.save();ctx.filter='blur(3px)';
  for(let k=0;k<5;k++){ctx.globalAlpha=a*0.55;ctx.strokeStyle=cs[k]+'1)';ctx.lineWidth=10;ctx.beginPath();ctx.arc(x,y,R+k*12,0,6.28);ctx.stroke();}ctx.restore();}
function giant(x,y,s,a,arm=0){if(a<=0)return;ghost(x,y,s,a,'150,165,170');if(arm>0){ctx.save();ctx.globalAlpha=a*0.7;ctx.filter='blur(6px)';ctx.strokeStyle='rgba(150,165,170,.8)';ctx.lineWidth=34*s;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(x+40*s,y-80*s);ctx.lineTo(x+(40+80*arm)*s,y-(80+120*arm)*s);ctx.stroke();ctx.restore();}}
function hiker(a,arm=0,c=PAPER){if(a<=0)return;const [x,y]=PK;headAt(x,y-170,26,c,a);line([[x,y-144],[x,y-60]],c,4,true,a);line([[x-38,y-100],[x,y-125]],c,3.5,true,a);
  line([[x,y-125],[x+38-10*arm,y-100-60*arm]],c,3.5,true,a);line([[x-26,y],[x,y-60],[x+26,y]],c,3.5,true,a);}
function sun(x,y,a){if(a<=0)return;glowDot(x,y,160,'rgba(255,207,122,.5)',a);circ(x,y,40,WARM,4,a,'rgba(255,207,122,.4)');}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'云中巨人事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'山顶的雾里，站着一个几十米高、头顶光环的黑影');
    mountain(a);hiker(a);fog(t,a);giant(1300,700,2.2,a*(0.35+0.5*flashA(t,[1.5,2.3,3.2],0.18)));
    stamp('未解之谜',1640,880,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'德国 · 哈茨山 · 布罗肯峰',PAPER,215,64);mountain(a*seg(t,5,5.4));
    txt('海拔 1141 米',PK[0],PK[1]-80,34,GREEN,{f:MONO,a:a*seg(t,5.6,6)});
    rect(1080,400,640,300,DIM,2,a*seg(t,6.4,6.8),'rgba(0,0,0,.35)');txt('传说：女巫在此聚会',1400,470,38,PAPER,{f:SANS,w:700,a:a*seg(t,6.6,7)});txt('《浮士德》里的魔鬼之山',1400,580,32,DIM,{f:SANS,w:500,a:a*seg(t,7,7.4)});
    cap(t,T.lab+.4,7.4,'德国最阴森的山：传说每年春天，女巫在这里聚会');cap(t,7.5,T.night+.2,'这里常年被浓雾包围，登山者常常独自走在雾里');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    mountain(a*0.6);hiker(a*0.9);fog(t,a*seg(t,10,11));
    const g=seg(t,10.6,12)*(1-seg(t,14.6,15))+flashA(t,[11.4,12.6,13.9],0.14)*0.6+win(t,15.2,16.1,.03,.4);
    giant(1300,700,2.4,a*clamp(g)*0.8);glory(1300,700-130*2.4,70,a*seg(t,12.8,13.6)*(1-seg(t,14.6,15))+a*win(t,15.2,16.1,.03,.4));
    cap(t,T.night+.3,12.7,'登山者转身，雾里慢慢浮出一个巨大的人影');cap(t,12.8,15.1,'它的头顶，还围着一圈彩色的光环','#d9e6e2');
    cap(t,15.2,T.foil,'它就站在那里，一动不动地看着你',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'登山者壮着胆子，抬起了手',PAPER,215,64);mountain(a*0.6);fog(t,a);
    const arm=eInOut(seg(t,18.6,19.6));hiker(a,arm);giant(1300,700,2.4,a*0.75);glory(1300,388,70,a*0.7);
    cap(t,T.foil+.4,18.5,'有人吓得跑下山，说遇见了山里的幽灵');cap(t,18.6,T.hit,'也有人鼓起勇气，朝它举起了一只手……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'巨人也举起了手！',RED,215,96,{pop:1,fi:.02});mountain(a*0.6);fog(t,a);
    hiker(a,1);giant(1300,700,2.4,a*0.85,eOut(seg(t,21.1,21.5)));glory(1300,388,70,a*0.8);
    line([[PK[0]+60,PK[1]-200],[1150,PK[1]-260]],RED,3,true,a*seg(t,22,22.4));
    cap(t,T.hit+.8,T.trace,'你动，它就动，动作一模一样——它在模仿你');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：光从哪里来？',PAPER,215,64);mountain(a*0.6);fog(t,a*0.8);hiker(a);
    const s=a*seg(t,25.6,26);sun(220,420,s);txt('身后：低垂的太阳',220,330,30,WARM,{f:SANS,w:700,a:s});
    for(let k=0;k<5;k++){const p=eOut(seg(t,26.4+k*.12,27.4+k*.12));const y0=380+k*20,y1=560+k*80;line([[260,y0],[lerp(260,1800,p),lerp(y0,y1,p)]],'rgba(255,207,122,.6)',2,false,a);}
    const sh=a*seg(t,27.8,28.4);ctx.save();ctx.globalAlpha=sh*0.5;ctx.fillStyle='rgba(0,0,0,.8)';ctx.beginPath();ctx.moveTo(PK[0],PK[1]-190);ctx.lineTo(1500,320);ctx.lineTo(1500,900);ctx.lineTo(PK[0],PK[1]);ctx.closePath();ctx.fill();ctx.restore();
    txt('影子投到雾上',1500,950-80,30,PAPER,{f:SANS,w:700,a:sh});
    cap(t,T.trace+.4,28.2,'每次出现，太阳都在人的身后，而且很低');cap(t,28.3,T.reveal,'而人的前方，正好是一片浓雾');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('你自己的影子',560,430,140,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('BROCKEN SPECTRE',560,580,56,PAPER,{f:MONO,a:a*seg(t,31.5,32)});
    const by=760;sun(1080,by-160,a*seg(t,32.4,32.8));personStand(1260,by,0.7,a*seg(t,32.6,33));
    for(let k=0;k<3;k++)line([[1110,by-150+k*20],[1780,by-300+k*160]],'rgba(255,207,122,.5)',2,false,a*seg(t,33,33.4));
    const g=a*seg(t,33.6,34.2);fog(t,g*0.8);ghost(1680,by-120,1.2,g*0.7,'150,165,170');glory(1680,by-276,40,g);txt('雾墙',1680,by+90,30,DIM,{f:SANS,w:500,a:g});
    cap(t,T.reveal+.6,34.4,'它叫"布罗肯幽灵"：人的影子投在身前的雾上');cap(t,34.5,T.eye,'你动，影子当然跟着动');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么像巨人？为什么有光环？',PAPER,215,62);brain(480,560,1.2,CYAN,a,seg(t,38,39)*0.6);
    txt('以为它站在远处',480,760,34,PAPER,{f:SANS,w:700,a:a*seg(t,38,38.4)});txt('→ 脑补成巨人',480,820,34,RED,{f:SANS,w:700,a:a*seg(t,38.4,38.8)});
    glory(1350,560,90,a*seg(t,39,39.6));for(let i=0;i<10;i++){const an=i/10*6.28;circ(1350+Math.cos(an)*200,560+Math.sin(an)*200,10,CYAN,2,a*seg(t,39,39.6),'rgba(127,232,255,.2)');}
    txt('小水滴把光"弹"回来',1350,820,34,GREEN,{f:SANS,w:700,a:a*seg(t,39.6,40)});
    cap(t,T.eye+.4,39.9,'雾没有参照物，大脑以为影子在很远处，就把它脑补得巨大');cap(t,40,T.off,'雾里的小水滴把阳光反射回来，形成彩色光环');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'太阳升高，巨人消失',PAPER,215,66);glowDot(W/2,500,620,'rgba(255,200,120,.22)',a);mountain(a,WARM);hiker(a,0,WARM);
    sun(lerp(1100,1500,eInOut(seg(t,42.2,44))),lerp(620,400,eInOut(seg(t,42.2,44))),a);fog(t,a*(1-seg(t,42.4,44)));
    cap(t,T.off+.4,T.end,'光环只围着你自己的影子，身边的人看不到你的');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"巨人"，只是',760,400,100,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('你自己的影子',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：J. Silberschlag 1780 年记载 · 英国气象局 Met Office「Brocken spectre」',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你在山顶见过"佛光"吗？｜评论区报案',GREEN);}
}
function coverScene(){mountain(1);hiker(1,1);fog(3,1);giant(1300,760,2.3,0.85,1);glory(1300,760-130*2.3,70,1);
  txt('山顶雾里站着巨人',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('你举手，它也举手',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1780',300,940,-1,0,GREEN,64,-0.1);}
