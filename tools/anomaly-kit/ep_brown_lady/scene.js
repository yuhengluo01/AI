// CASE 064 雷纳姆府棕衣女士鬼照（英国诺福克 Raynham Hall；传说是 Dorothy Walpole（1726 年去世）的鬼魂；1936.9.19《乡村生活》摄影师 Hubert Provand 与 Indre Shira 拍楼梯，Shira 称看见人影飘下；1936.12.26 刊出；人影半透明，双重曝光/叠加为一种解释（Joe Nickell 等），镜头污渍亦为一种说法；人脸/人形空想性错视让人更易"看见"；照片从未被证实为灵异）
const EP={caseNo:'064',name:'楼梯上的女鬼',sfx:{ghost:[11.4,13.0,14.5],stings:[12.9],blips:[22.0,26.2,27.8,32.2,34.4,38.0,39.6],whisper:[10,16]}};
// 楼梯（从左下到右上），(x,y)=底部起点
function stairs(x,y,n,step,a,c=CYAN){if(a<=0)return;const pts=[[x,y]];for(let i=0;i<n;i++){const px=x+i*step*1.3,py=y-i*step;pts.push([px,py-step],[px+step*1.3,py-step]);}
  line(pts,c,3,true,a);line([[x,y-140],[x+n*step*1.3,y-n*step-140]],c,3,true,a*0.8);
  for(let i=0;i<n;i+=2)line([[x+i*step*1.3+20,y-i*step-step],[x+i*step*1.3+20,y-i*step-140]],c,1.8,false,a*0.6);}
// 棕衣女士：长裙半透明人影
function lady(x,y,s,a,col='200,180,160'){if(a<=0)return;ctx.save();ctx.globalAlpha=clamp(a);ctx.translate(x,y);ctx.scale(s,s);ctx.filter='blur(5px)';
  const g=ctx.createLinearGradient(0,-180,0,170);g.addColorStop(0,`rgba(${col},0.85)`);g.addColorStop(1,`rgba(${col},0.05)`);ctx.fillStyle=g;
  ctx.beginPath();ctx.arc(0,-140,30,0,6.28);ctx.fill();ctx.beginPath();ctx.moveTo(-50,-150);ctx.quadraticCurveTo(0,-200,50,-150);ctx.lineTo(70,-60);ctx.lineTo(-70,-60);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-30,-105);ctx.quadraticCurveTo(-60,20,-95,170);ctx.lineTo(95,170);ctx.quadraticCurveTo(60,20,30,-105);ctx.closePath();ctx.fill();
  ctx.filter='none';ctx.restore();}
function camera(x,y,s,a,c=CYAN){if(a<=0)return;rect(x-90*s,y-55*s,180*s,110*s,c,3,a);circ(x,y,36*s,c,3,a);rect(x-60*s,y-75*s,40*s,20*s,c,2.5,a);
  line([[x-40*s,y+55*s],[x-70*s,y+260*s]],c,2.5,true,a*0.7);line([[x+40*s,y+55*s],[x+70*s,y+260*s]],c,2.5,true,a*0.7);line([[x,y+55*s],[x,y+260*s]],c,2.5,true,a*0.7);}
function photoFrame(x,y,w,h,a,c=PAPER){rect(x-w/2,y-h/2,w,h,c,3,a,'rgba(233,243,238,.03)');}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'楼梯上，飘下来一个女鬼',PAPER,215,90,{pop:1});sub(t,.9,T.lab,'史上最著名的一张鬼照，拍下了它');
    stairs(640,900,8,46,a);lady(lerp(1120,1000,seg(t,.5,4.5)),lerp(560,620,seg(t,.5,4.5)),1.1,a*(0.35+0.65*flashA(t,[1.4,2.2,3.0,3.6],0.3)));
    stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1936 年 · 英国诺福克 · 雷纳姆府',PAPER,215,60);
    stairs(560,860,9,48,a*seg(t,4.7,5.2));camera(1420,560,1,a*seg(t,5.1,5.5));
    personStand(1580,860,0.9,a*seg(t,5.4,5.8),CYAN);personStand(1700,860,0.85,a*seg(t,5.6,6),CYAN);
    txt('《乡村生活》摄影师',1560,400,34,CYAN,{f:SANS,w:700,a:a*seg(t,5.8,6.2)});
    cap(t,T.lab+.4,7.4,'《乡村生活》杂志的两名摄影师来拍古宅的楼梯');cap(t,7.4,T.night+.2,'传说这里有个"棕衣女士"，已经出没了一百多年');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    stairs(560,880,10,50,a*0.7,'rgb(110,150,160)');
    const lp=seg(t,10.5,15);lady(lerp(1180,960,lp),lerp(480,620,lp),1.2,a*(0.3+0.7*flashA(t,[11.0,11.9,13.0,13.8,14.5],0.3)));
    ghost(lerp(1600,500,seg(t,11,15)),560,lerp(0.6,1.0,seg(t,11,15)),a*flashA(t,[11.4,13.0,14.5],0.12));
    if(t>15.2&&t<15.5){ctx.save();ctx.fillStyle=`rgba(255,255,255,${0.5*(1-(t-15.2)/0.3)})`;ctx.fillRect(0,0,W,H);ctx.restore();}
    lady(960,600,1.4,a*win(t,15.2,16.1,.03,.4),'230,210,190');
    cap(t,T.night+.3,12.6,'传说她是 18 世纪的女主人多萝西');cap(t,12.7,15.1,'死后，她的影子一直在宅子里游荡','#d9e6e2');
    cap(t,15.2,T.foil,'快门按下的瞬间，一个人影正从楼梯上飘下',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'真的拍到了鬼？',PAPER,215,76);
    const fa=a*seg(t,16.3,16.7);photoFrame(960,620,640,460,fa);ctx.save();ctx.beginPath();ctx.rect(640,390,640,460);ctx.clip();stairs(700,820,8,40,fa*0.8,'rgb(200,190,170)');lady(1000,600,0.95,fa*seg(t,17,17.8));ctx.restore();
    txt('COUNTRY LIFE · 1936.12.26',960,890,28,DIM,{f:MONO,a:fa});
    cap(t,T.foil+.4,18.4,'照片洗出来，楼梯上真的有一个模糊人影');cap(t,18.5,T.hit,'它登上杂志，成了全世界最有名的鬼照');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'台阶，透过了她的身体！',RED,215,92,{pop:1,fi:.02});
    photoFrame(800,640,620,440,a);ctx.save();ctx.beginPath();ctx.rect(490,420,620,440);ctx.clip();stairs(540,830,8,40,a*0.9,'rgb(200,190,170)');lady(840,610,0.95,a*0.8);ctx.restore();
    const zp=seg(t,21.6,22.2);circ(860,700,lerp(20,110,zp),RED,5,a*zp);line([[960,720],[1300,620]],RED,4,true,a*zp);
    txt('半透明',1460,580,72,RED,{a:a*seg(t,22.2,22.6),glow:'rgba(255,60,60,.6)'});txt('能看见身后的台阶',1460,680,38,PAPER,{f:SANS,w:700,a:a*seg(t,23.4,23.8)});
    cap(t,T.hit+.8,23.4,'仔细看：人影是半透明的，透出了后面的台阶');cap(t,23.4,T.trace,'这恰恰是老式相机最常见的一种"事故"');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：老相机怎么拍出"鬼"？',PAPER,215,64);
    const a1=a*seg(t,25.4,25.8),a2=a*seg(t,26.4,26.8),a3=a*seg(t,28.2,28.6);
    photoFrame(480,620,400,300,a1);ctx.save();ctx.beginPath();ctx.rect(280,470,400,300);ctx.clip();stairs(310,750,6,34,a1);ctx.restore();txt('第 1 次：楼梯',480,810,34,CYAN,{f:SANS,w:700,a:a1});
    txt('+',760,620,80,WARM,{f:MONO,a:a2});
    photoFrame(1040,620,400,300,a2);personStand(1040,720,0.9,a2,PAPER);txt('第 2 次：一个人',1040,810,34,PAPER,{f:SANS,w:700,a:a2});
    txt('=',1310,620,80,WARM,{f:MONO,a:a3});
    photoFrame(1580,620,400,300,a3);ctx.save();ctx.beginPath();ctx.rect(1380,470,400,300);ctx.clip();stairs(1410,750,6,34,a3);lady(1580,640,0.6,a3);ctx.restore();txt('"鬼"',1580,810,40,RED,{a:a3});
    cap(t,T.trace+.4,27.5,'老式相机拍完一张，如果底片没卷过去');cap(t,27.6,T.reveal,'再拍一次，两幅画面就会叠在同一张底片上');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('× 2',W/2,420,220,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('同一张底片，曝光了两次（一种解释）',W/2,610,56,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,31.9)});
    txt('另有说法：镜头污渍，或是有人在楼梯上走动',W/2,740,40,CYAN,{f:SANS,w:700,a:a*seg(t,34.3,34.7)});
    cap(t,T.reveal+.6,34.2,'叠进去的人影，就会变成半透明的"鬼"');cap(t,34.3,T.eye,'调查者认为它很可能是双重曝光或后期叠加');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么一眼就看成"女鬼"？',PAPER,215,64);
    [['大脑爱找人形','模糊一团也认成人',640,37.3],['先听了传说','期待让你"看见"她',1280,38.6]].forEach(([b,s,x,t0])=>{const ca=a*seg(t,t0,t0+.3);rect(x-290,400,580,320,CYAN,3,ca,'rgba(127,232,255,.05)');txt(b,x,500,64,WARM,{a:ca});txt(s,x,630,34,PAPER,{f:SANS,w:500,a:ca});});
    cap(t,T.eye+.4,39.9,'大脑天生爱在模糊的图案里找人形');cap(t,40,T.off,'先听过闹鬼传说，再看照片，就更容易"看见"她');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'楼梯，依旧空空荡荡',PAPER,215,66);glowDot(W/2,640,560,'rgba(255,200,120,.22)',a);
    stairs(620,880,9,52,a,WARM);
    cap(t,T.off+.4,T.end,'这张照片，从来没能证明世上有鬼');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"鬼照"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是底片多曝了一次',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：Country Life 1936.12.26 · Joe Nickell 鬼照调查 · Museum of Hoaxes',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你拍到过说不清的怪照片吗？评论区报案',GREEN);}
}
function coverScene(){stairs(1060,960,10,52,1);lady(1500,640,1.3,0.95);glowDot(1500,600,280,'rgba(255,40,40,.12)',1);
  txt('史上最著名鬼照',600,320,108,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('楼梯上飘下的女人',600,470,78,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1936',330,850,-1,0,GREEN,64,-0.1);}
