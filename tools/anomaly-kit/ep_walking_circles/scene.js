// CASE 057 鬼打墙（Souman, Frissen, Sreenivasa & Ernst 2009《Current Biology》，马普生物控制论所：撒哈拉（突尼斯）与德国 Bienwald 森林 GPS 实验；看得到太阳/月亮能走直，阴天绕圈且不自知；蒙眼绕圈直径可小于 20 米；方向不固定，非腿长差；感官随机小误差累积）
const EP={caseNo:'057',name:'走不出的树林',sfx:{ghost:[11.3,12.8,14.4],stings:[12.7],blips:[22.0,26.0,27.4,32.4,33.6,38.2,39.4],whisper:[10,16]}};
function tree(x,y,s,a,c=CYAN){if(a<=0)return;line([[x,y],[x,y-30*s]],c,3,true,a);line([[x-50*s,y-30*s],[x,y-200*s],[x+50*s,y-30*s],[x-50*s,y-30*s]],c,3,true,a);line([[x-38*s,y-100*s],[x,y-200*s],[x+38*s,y-100*s]],c,2,true,a*0.7);}
const TREES=(()=>{const r=rng(21),o=[];for(let i=0;i<22;i++)o.push([160+r()*1600,560+r()*320,0.7+r()*0.6]);return o.sort((a,b)=>a[1]-b[1]);})();
function forest(a,c=CYAN){for(const [x,y,s] of TREES)tree(x,y,s,a*(0.5+0.5*(y-560)/320),c);}
// 绕圈轨迹：返回点列
function loopPath(cx,cy,r,turns,n=240,drift=120){const p=[];for(let i=0;i<=n;i++){const q=i/n,an=-Math.PI/2+q*turns*6.283;const rr=r*(1+0.18*Math.sin(q*9));p.push([cx+Math.cos(an)*rr*1.5+q*drift,cy+Math.sin(an)*rr]);}return p;}
function trail(pts,prog,c,w=4,a=1){const n=Math.max(2,Math.floor(pts.length*clamp(prog)));line(pts.slice(0,n),c,w,true,a);const e=pts[n-1];return e;}
function steps(pts,prog,a,c=PAPER){const n=Math.floor(pts.length*clamp(prog));for(let i=0;i<n;i+=8){const [x,y]=pts[i];circ(x+(i%16?6:-6),y,4,null,0,a*0.8,c);}}
function sun(x,y,a,c=WARM){if(a<=0)return;circ(x,y,40,c,4,a);for(let i=0;i<8;i++){const an=i*0.785;line([[x+Math.cos(an)*55,y+Math.sin(an)*55],[x+Math.cos(an)*75,y+Math.sin(an)*75]],c,3,true,a);}}
function cloud(x,y,a,c=DIM){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=4;ctx.beginPath();ctx.arc(x-40,y,30,Math.PI*0.5,Math.PI*1.5);ctx.arc(x,y-25,40,Math.PI,0);ctx.arc(x+45,y,30,Math.PI*1.5,Math.PI*0.5);ctx.closePath();ctx.stroke();ctx.restore();}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'深夜树林里的"鬼打墙"',PAPER,215,88,{pop:1});sub(t,.9,T.lab,'走了一整夜，天亮才发现，又回到了原地');
    forest(a);const P=loopPath(960,700,110,1.05);trail(P,seg(t,.5,4),RED,4,a*0.9);
    ghost(1500,620,0.9,a*flashA(t,[1.7,2.8,3.6],0.12));stamp('未解之谜',1640,930,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'民间传说 · 鬼打墙',PAPER,215,64);
    forest(a*seg(t,4.8,5.4));personStand(lerp(500,1300,seg(t,5,10)),840,0.8,a*seg(t,5,5.4));glowDot(lerp(540,1340,seg(t,5,10)),720,90,'rgba(255,200,120,.25)',a);
    cap(t,T.lab+.4,7.4,'夜里走山路，明明一直往前，却总在原地打转');cap(t,7.4,T.night+.2,'老人说，是有"东西"挡住了你的路');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    forest(a,'rgb(110,170,180)');const P=loopPath(960,720,120,1.1);const e=trail(P,seg(t,10.2,15.6),'rgba(233,243,238,.5)',3,a);steps(P,seg(t,10.2,15.6),a);
    personStand(e[0],e[1]+10,0.55,a);
    ghost(lerp(400,1500,seg(t,11,15)),600,lerp(0.6,1.1,seg(t,11,15)),a*flashA(t,[11.3,12.8,14.4],0.14));ghost(960,480,1.4,a*win(t,15.2,16.1,.03,.4),'150,150,160');
    cap(t,T.night+.3,12.6,'四周的树长得一模一样，一点声音也没有');cap(t,12.7,15.1,'走着走着，你又看见了自己留下的脚印','#d9e6e2');
    cap(t,15.2,T.foil,'你，被困住了',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'给"撞鬼"的人绑上 GPS',PAPER,215,66);
    personStand(960,800,1.3,a*seg(t,16.3,16.7));rect(985,610,46,30,GREEN,3,a*seg(t,16.8,17.2));
    waves(1008,600,20,GREEN,t,a*seg(t,17,17.4),4,-2.2,-0.9);txt('GPS',1008,560,30,GREEN,{f:MONO,a:a*seg(t,17,17.4)});
    cap(t,T.foil+.4,18.4,'2009 年，德国马普所的科学家做了一个实验');cap(t,18.5,T.hit,'让志愿者在森林和沙漠里，一直往前走');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'GPS 轨迹：真的在绕圈！',RED,215,96,{pop:1,fi:.02});
    rect(460,380,1000,500,GREEN,2,a*0.6,'rgba(109,255,192,.03)');
    const P=loopPath(760,640,110,2.2,400,420);trail(P,seg(t,21.1,24.6),RED,5,a);
    const k=Math.floor(400*clamp(seg(t,21.1,24.6)));if(k>200)circ(P[200][0],P[200][1],18,GREEN,3,a);
    txt('起点',P[0][0],P[0][1]-30,30,GREEN,{f:SANS,w:700,a});
    cap(t,T.hit+.8,23.4,'阴天的森林里，他们一次次兜圈子');cap(t,23.4,T.trace,'有人好几次走回老路，自己却毫无察觉');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：什么时候会绕圈？',PAPER,215,64);
    const a1=a*seg(t,25.4,25.8),a2=a*seg(t,27.6,28);
    rect(220,380,700,480,CYAN,3,a1,'rgba(127,232,255,.04)');sun(330,480,a1);line([[300,800],[lerp(300,860,seg(t,25.8,27.4)),lerp(800,560,seg(t,25.8,27.4))]],GREEN,5,true,a1);txt('看得见太阳：直线',570,820,36,GREEN,{f:SANS,w:700,a:a1});
    rect(1000,380,700,480,CYAN,3,a2,'rgba(127,232,255,.04)');cloud(1120,480,a2);const P=loopPath(1350,640,70,1.6);trail(P,seg(t,28,30.4),RED,5,a2);txt('太阳被云挡住：绕圈',1350,820,36,RED,{f:SANS,w:700,a:a2});
    cap(t,T.trace+.4,28.1,'太阳或月亮露脸时，大家几乎都能走直线');cap(t,28.2,T.reveal,'太阳一被云挡住，人就开始兜圈子');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('< 20 米',700,470,210,RED,{f:MONO,a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});
    txt('蒙眼绕圈的直径',700,650,52,PAPER,{f:SANS,w:700,a:a*seg(t,31.5,31.9)});
    const ca=a*seg(t,32.2,32.6);circ(1450,540,150,RED,4,ca);line([[1300,540],[1600,540]],GREEN,3,true,ca);txt('< 20 m',1450,510,36,GREEN,{f:MONO,a:ca});personStand(1450,730,0.6,ca);
    txt('方向不固定 → 不是腿长腿短',1150,790,38,CYAN,{f:SANS,w:700,a:a*seg(t,34.5,34.9)});
    cap(t,T.reveal+.6,34.4,'蒙上眼睛，有人绕的圈直径不到 20 米');cap(t,34.5,T.eye,'绕的方向并不固定，所以不是腿长腿短的问题');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么会走不直？',PAPER,215,64);
    let x=280,y=800,an=0;const pts=[[x,y]];const r=rng(9);for(let i=0;i<14;i++){an-=0.045+r()*0.02;x+=Math.cos(an)*85;y+=Math.sin(an)*85;pts.push([x,y]);}
    const pr=seg(t,37.3,41);const n=Math.max(1,Math.floor(14*pr));line([[280,800],[1660,800]],DIM,2,false,a*0.6);
    for(let i=0;i<n;i++)line([pts[i],pts[i+1]],i<5?GREEN:i<10?WARM:RED,5,true,a);
    txt('以为的"正前方"',1500,840,32,DIM,{f:SANS,w:500,a});brain(400,450,0.6,CYAN,a*seg(t,38.6,39));
    cap(t,T.eye+.4,39.9,'每一步，大脑对"正前方"的判断都会偏一点点');cap(t,40,T.off,'没有太阳、远山这样的参照，偏差越积越大');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'找到参照物，"鬼"就散了',PAPER,215,66);glowDot(W/2,620,560,'rgba(255,200,120,.22)',a);
    forest(a,WARM);sun(1620,420,a);line([[300,860],[lerp(300,1600,seg(t,42.4,44.6)),860]],WARM,5,true,a);
    cap(t,T.off+.4,T.end,'迷路时，盯住远处的目标，或者看太阳和星星');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"鬼打墙"',760,400,104,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('只是大脑悄悄跑偏',760,560,80,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1600,480,46.2,t,RED,90,-0.14);
    txt('资料：Souman et al. 2009《Current Biology》· 马克斯·普朗克生物控制论研究所',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你遇到过鬼打墙吗？评论区报案',GREEN);}
}
function coverScene(){for(const [x,y,sc] of TREES)tree(x,y,sc,(x>1050||y>720)?0.9:0.25);const P=loopPath(1250,720,120,1.6);trail(P,1,RED,5,1);ghost(1620,600,0.9,0.6);
  txt('树林里走了一整夜',660,300,104,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('天亮又回到原地',660,450,80,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('GPS',300,870,-1,0,GREEN,64,-0.1);}
