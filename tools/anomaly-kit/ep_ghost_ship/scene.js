// CASE 030 飞翔的荷兰人幽灵船（1881 HMS Bacchante 航海日志；复杂海市蜃楼 Fata Morgana，一种解释）
const EP={caseNo:'030',name:'幽灵船',sfx:{ghost:[11.4,12.6,14.0],stings:[],blips:[26.0,27.2,28.4,33.6,34.6],whisper:[10,16]}};
const HZ=640; // 海平线
function sea(t,a,c=CYAN){if(a<=0)return;const pts=[];for(let x=100;x<=1820;x+=20)pts.push([x,HZ+Math.sin(x*0.018+t*1.6)*4]);line(pts,c,3,true,a);
  for(let i=0;i<6;i++){const y=HZ+50+i*45,o=(t*30+i*90)%240;line([[140+o+i*40,y],[220+o+i*40,y]],'rgba(127,232,255,.3)',1.5,false,a);line([[900+o-i*30,y],[990+o-i*30,y]],'rgba(127,232,255,.3)',1.5,false,a);}}
// 帆船线稿，(x,y)=船底中心；flip=倒影
function ship(x,y,s,a,c=PAPER,flip=0,glow=0){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,flip?-s:s);
  if(glow>0)glowDot(0,-90,260,'rgba(255,60,60,.35)',a*glow);
  line([[-150,-40],[-120,0],[120,0],[160,-44],[-150,-40]],c,4,true,a);
  for(const [mx,h] of [[-70,190],[10,230],[90,170]]){line([[mx,-40],[mx,-40-h]],c,3.5,true,a);
    line([[mx-48,-60-h*0.15],[mx+40,-60-h*0.15],[mx+44,-40-h*0.55],[mx-44,-40-h*0.55],[mx-48,-60-h*0.15]],c,2.5,true,a*0.85);
    line([[mx-36,-40-h*0.62],[mx+32,-40-h*0.62],[mx+34,-40-h*0.95],[mx-30,-40-h*0.95],[mx-36,-40-h*0.62]],c,2.5,true,a*0.75);}
  ctx.restore();}
// 1881 年军舰（简单线稿）
function frigate(x,y,s,a){ship(x,y,s,a,CYAN);}
function eyeIcon(x,y,a){if(a<=0)return;line([[x-40,y],[x,y-22],[x+40,y],[x,y+22],[x-40,y]],GREEN,3,true,a);circ(x,y,10,GREEN,3,a);}
function scene(t){
  if(t<T.lab){const a=win(t,0,T.lab,.2,.4);
    title(t,0,T.lab,'幽灵船现身事件',PAPER,215,84,{pop:1});sub(t,.9,T.lab,'凌晨四点，一艘发着红光的船，横穿军舰船头');
    sea(t,a);ship(1100,HZ-10,0.75,a*0.5*seg(t,1,1.6)+a*flashA(t,[1.6,2.4,3.3],0.14)*0.5,RED,0,1);
    stamp('未解之谜',1640,880,2.6,t,RED,58,-0.12);}
  if(t>=T.lab&&t<T.night+.4){const a=win(t,T.lab,T.night+.4,.35,.6);
    title(t,T.lab,T.night+.4,'1881 年 · 澳大利亚南部海域',PAPER,215,62);sea(t,a);frigate(560,HZ+20,0.9,a*seg(t,5,5.5));
    txt('HMS 巴坎特号',560,HZ+120,30,GREEN,{f:SANS,w:700,a:a*seg(t,5.6,6)});
    rect(1180,420,560,250,DIM,2,a*seg(t,6.4,6.8),'rgba(0,0,0,.4)');
    txt('航海日志 · 7 月 11 日',1460,470,30,PAPER,{f:SANS,w:700,a:a*seg(t,6.6,7)});
    txt('"凌晨 4 点，飞翔的荷兰人',1460,540,28,DIM,{f:SANS,w:500,a:a*seg(t,7,7.4)});txt('从我们船头穿过……"',1460,590,28,DIM,{f:SANS,w:500,a:a*seg(t,7.4,7.8)});
    cap(t,T.lab+.4,7.4,'英国军舰上，年轻的乔治王子写下一段日记');cap(t,7.5,T.night+.2,'传说中的幽灵船：永远靠不了岸，见到它就有厄运');}
  if(t>=T.night&&t<T.foil+.2){const a=win(t,T.night,T.foil+.2,.3,.4);
    sea(t,a*0.6);const show=seg(t,10.4,11.4)*(1-seg(t,14.6,15))+win(t,15.2,16.1,.03,.4);
    ship(1150,HZ-140+Math.sin(t*2)*6,0.85,a*show*(0.6+0.4*Math.sin(t*9)),RED,0,1);
    ship(1150,HZ-140,0.85,a*(flashA(t,[11.4,12.6,14.0],0.14)),PAPER,1);
    for(let i=0;i<13;i++){const lit=seg(t,12.8+i*0.12,13+i*0.12);circ(300+i*34,HZ+180,7,GREEN,2,a*lit,'rgba(109,255,192,.4)');}
    txt('目击者 13 人',520,HZ+230,30,GREEN,{f:SANS,w:700,a:a*seg(t,14,14.4)});
    cap(t,T.night+.3,12.7,'一艘船浑身发出诡异的红光，桅杆、帆清清楚楚');cap(t,12.8,15.1,'日志写着：船上一共 13 个人都看见了','#d9e6e2');
    cap(t,15.2,T.foil,'可等人跑上船头，海面上什么都没有',RED);}
  if(t>=T.foil&&t<T.hit){const a=win(t,T.foil,T.hit,.35,.05);
    title(t,T.foil,T.hit,'几百年来，水手一再"撞见"它',PAPER,215,64);sea(t,a*0.6);
    const lift=eInOut(seg(t,17,20));ship(1000,HZ-lift*160,0.7,a*0.8,PAPER,0);ship(1000,HZ-lift*160,0.7,a*0.5*lift,CYAN,1);
    txt('船…浮在天上？',1500,420,44,RED,{f:SANS,w:700,a:a*seg(t,18.6,19)});
    cap(t,T.foil+.4,18.5,'更怪的是，有时它会悬在半空，甚至倒着航行');cap(t,18.6,T.hit,'船员说，那是一艘被诅咒的船……');}
  if(t>=T.hit&&t<T.trace+.2){const a=win(t,T.hit,T.trace+.2,.02,.4);
    title(t,T.hit,T.trace+.2,'"幽灵船"是一束被掰弯的光！',RED,215,86,{pop:1,fi:.02});sea(t,a*0.6);
    ship(1000,HZ-160,0.7,a*0.8,PAPER,0);ship(1000,HZ-160,0.7,a*0.6,CYAN,1);
    const pts=[];for(let i=0;i<=40;i++){const q=i/40;pts.push([300+q*1300,HZ-10-Math.sin(q*Math.PI)*170*seg(t,21.4,22.4)]);}line(pts,RED,5,true,a);
    cap(t,T.hit+.8,T.trace,'它的轨迹，和一种大气光学现象完全吻合（一种解释）');}
  if(t>=T.trace&&t<T.reveal+.1){const a=win(t,T.trace,T.reveal+.1,.35,.25);
    title(t,T.trace,T.reveal+.1,'追查：海面上方发生了什么？',PAPER,215,62);
    const cold=a*seg(t,25.6,26),warm=a*seg(t,26.8,27.2);
    rect(160,HZ-60,1600,100,'rgba(127,232,255,.5)',2,cold,'rgba(60,140,200,.15)');txt('贴海冷空气（密）',340,HZ-10,30,CYAN,{f:SANS,w:700,a:cold,al:'left'});
    rect(160,HZ-260,1600,200,'rgba(255,170,90,.5)',2,warm,'rgba(255,150,60,.10)');txt('上层暖空气（疏）',340,HZ-220,30,WARM,{f:SANS,w:700,a:warm,al:'left'});
    line([[160,HZ+40],[1760,HZ+40]],CYAN,3,true,a);
    ship(1560,HZ+40,0.45,a*seg(t,27.8,28.2),PAPER);txt('地平线外的真船',1560,HZ+110,28,DIM,{f:SANS,w:500,a:a*seg(t,28,28.4)});
    eyeIcon(260,HZ+10,a*seg(t,28.4,28.8));
    cap(t,T.trace+.4,28.2,'海水很冷时，贴着海面的是又冷又密的空气');cap(t,28.3,T.reveal,'上面压着一层暖空气，像一面看不见的透镜');}
  if(t>=T.reveal&&t<T.eye+.2){const a=win(t,T.reveal,T.eye+.2,.02,.35);const p=seg(t,T.reveal,T.reveal+.45);
    txt('复杂海市蜃楼',600,420,120,RED,{a,sc:lerp(1.35,1,eOut(p)),glow:'rgba(255,60,60,.8)',blur:50});txt('FATA MORGANA',600,560,56,PAPER,{f:MONO,a:a*seg(t,31.5,32)});
    const by=820;line([[1060,by],[1820,by]],CYAN,3,true,a);eyeIcon(1100,by-20,a);ship(1720,by,0.35,a,PAPER);
    const r=seg(t,32.6,34);const pts=[];for(let i=0;i<=40*r;i++){const q=i/40;pts.push([1700-q*600,by-50-Math.sin(q*Math.PI)*170]);}if(pts.length>1)line(pts,RED,4,true,a);
    const ia=a*seg(t,34,34.6);line([[1100,by-20],[1700,by-300]],GREEN,2.5,false,ia*0.7);ship(1650,by-280,0.35,ia,GREEN);ship(1650,by-280,0.35,ia*0.6,GREEN,1);
    txt('看到的"幽灵船"',1600,by-420,30,GREEN,{f:SANS,w:700,a:ia});
    cap(t,T.reveal+.6,34.4,'远处船只的光，在冷暖空气交界处被一层层弯折');cap(t,34.5,T.eye,'地平线以外的船，被"投影"到了半空中');}
  if(t>=T.eye&&t<T.off+.2){const a=win(t,T.eye,T.off+.2,.35,.35);
    title(t,T.eye,T.off+.2,'为什么会悬空、倒挂、忽隐忽现？',PAPER,215,62);brain(560,560,1.3,CYAN,a,seg(t,38,39)*0.6);
    txt('大脑默认：光走直线',560,760,36,PAPER,{f:SANS,w:700,a:a*seg(t,38,38.4)});
    ship(1350,560,0.6,a*seg(t,38.6,39),PAPER,0);ship(1350,560,0.6,a*seg(t,39.2,39.6)*0.8,CYAN,1);
    txt('正像 + 倒像 叠在一起',1350,800,32,GREEN,{f:SANS,w:700,a:a*seg(t,39.6,40)});
    cap(t,T.eye+.4,39.9,'大脑以为光走直线，就把船"放"在了天上');cap(t,40,T.off,'气层一抖动，影像拉长、倒转，又突然消失');}
  if(t>=T.off&&t<T.end+.2){const a=win(t,T.off,T.end+.2,.35,.35);
    title(t,T.off,T.end+.2,'气温一变，幽灵船沉回海里',PAPER,215,62);sea(t,a,WARM);glowDot(W/2,HZ,520,'rgba(255,200,120,.22)',a);
    const d=eInOut(seg(t,42.4,44.4));ship(1000,HZ-160*(1-d),0.7,a*(1-d*0.3),PAPER);ship(1000,HZ-160*(1-d),0.7,a*0.5*(1-d),CYAN,1);
    cap(t,T.off+.4,T.end,'冷暖空气混匀后，"幽灵船"就消失了');}
  if(t>=T.end){const a=seg(t,T.end,T.end+.3);const p=seg(t,T.end,T.end+.5);
    txt('有些"幽灵船"，只是',760,400,96,PAPER,{a,sc:lerp(1.3,1,eOut(p)),glow:'rgba(127,232,255,.6)',blur:34});
    txt('被空气掰弯的光',760,560,84,RED,{a:a*seg(t,45.5,46),glow:'rgba(255,60,60,.6)',blur:30});
    stamp('已结案',1540,480,46.2,t,RED,90,-0.14);
    txt('资料：《The Cruise of H.M.S. Bacchante 1879–1882》航海日志 · 海市蜃楼光学研究（一种解释）',W/2,760,26,DIM,{f:SANS,w:400,a:a*seg(t,46.6,47)});
    cap(t,47,T.fin,'你在海边见过"空中楼阁"吗？｜评论区报案',GREEN);}
}
function coverScene(){sea(3,1);ship(1250,HZ-20,0.8,0.9,RED,0,1);ship(1250,HZ+10,0.8,0.35,PAPER,1);
  txt('幽灵船横穿船头',W/2,215,110,PAPER,{glow:'rgba(127,232,255,.7)',blur:40});txt('13 人亲眼所见，转眼消失',W/2,335,56,RED,{glow:'rgba(255,60,60,.7)',blur:30});
  stamp('1881',300,920,-1,0,GREEN,64,-0.1);}
