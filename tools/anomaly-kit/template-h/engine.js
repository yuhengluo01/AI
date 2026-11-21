// AI异常调查所 · 横屏引擎 1920x1080（风格同 ep01）。每期的 scene.js 定义 EP 和 scene(t)、coverScene()。
const W=1920,H=1080;
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const buf=document.createElement('canvas');buf.width=W;buf.height=H;const bx=buf.getContext('2d');
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const seg=(t,a,b)=>clamp((t-a)/(b-a));
const eOut=x=>1-Math.pow(1-x,3);
const eInOut=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const win=(t,a,b,fi=.35,fo=.35)=>Math.min(seg(t,a,a+fi),1-seg(t,b-fo,b));
const lerp=(a,b,x)=>a+(b-a)*x;
const SERIF='"Noto Serif CJK SC"',SANS='"Noto Sans CJK SC"',MONO='"DejaVu Sans Mono"';
const GREEN='#6dffc0',CYAN='#7fe8ff',RED='#ff3b3b',PAPER='#e9f3ee',DIM='rgba(233,243,238,.55)',WARM='#ffcf7a';
// 标准时间线（音频也按它）
const T={hook:0,lab:4.5,night:10,foil:16,hit:21,trace:25,reveal:31,eye:37,off:42,end:45,fin:50};
const GLITCH=[0.02,4.5,10,13.2,15.2,16,21,25,31,37,42,45];
const CAPLOG={};

// ---------- layers ----------
const noise=[];{const r=rng(7);for(let k=0;k<4;k++){const c=document.createElement('canvas');c.width=960;c.height=540;const x=c.getContext('2d');const id=x.createImageData(960,540);for(let i=0;i<id.data.length;i+=4){const v=r()*255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=255;}x.putImageData(id,0,0);noise.push(c);}}
const scan=document.createElement('canvas');scan.width=W;scan.height=H;{const x=scan.getContext('2d');x.fillStyle='rgba(0,0,0,0.22)';for(let y=0;y<H;y+=4)x.fillRect(0,y,W,2);}
const dust=[];{const r=rng(11);for(let i=0;i<90;i++)dust.push({x:r()*W,y:r()*H,s:1+r()*2.5,v:4+r()*14,p:r()*6.28});}

// ---------- primitives ----------
function txt(s,x,y,size,color,o={}){
  ctx.save();ctx.globalAlpha*=(o.a??1);if(ctx.globalAlpha<=0){ctx.restore();return;}
  ctx.font=`${o.w||700} ${size}px ${o.f||SERIF}`;ctx.textAlign=o.al||'center';ctx.textBaseline='middle';
  if(o.glow){ctx.shadowColor=o.glow;ctx.shadowBlur=o.blur||24;}
  ctx.translate(x,y);if(o.rot)ctx.rotate(o.rot);if(o.sc&&o.sc!==1)ctx.scale(o.sc,o.sc);
  ctx.fillStyle=color;ctx.fillText(s,0,0);ctx.restore();
}
function line(pts,color,w=3,glow=true,a=1){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';if(glow){ctx.shadowColor=color;ctx.shadowBlur=14;}ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.restore();}
function rect(x,y,w,h,color,lw=3,a=1,fill){ctx.save();ctx.globalAlpha*=a;if(fill){ctx.fillStyle=fill;ctx.fillRect(x,y,w,h);}ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.shadowColor=color;ctx.shadowBlur=12;ctx.strokeRect(x,y,w,h);ctx.restore();}
function circ(x,y,r,color,lw=3,a=1,fill){ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.arc(x,y,r,0,6.2832);if(fill){ctx.fillStyle=fill;ctx.fill();}if(color){ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.shadowColor=color;ctx.shadowBlur=12;ctx.stroke();}ctx.restore();}
function glowDot(x,y,r,color,a=1){ctx.save();ctx.globalAlpha*=a;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();}
// 打字机字幕（y 默认 975）
function cap(t,a,b,s,col=PAPER,y=975,size=46){
  if(!(s in CAPLOG))CAPLOG[s]=[a,s.length];
  const al=win(t,a,b,.2,.3);if(al<=0)return;
  const n=Math.ceil(seg(t,a,a+s.length*0.05)*s.length);const shown=s.slice(0,n);
  ctx.save();ctx.font=`500 ${size}px ${SANS}`;const w=ctx.measureText(s).width;
  ctx.globalAlpha=al*0.62;ctx.fillStyle='#000';ctx.fillRect(W/2-w/2-30,y-size*0.8,w+60,size*1.6);
  ctx.globalAlpha=al;ctx.textBaseline='middle';ctx.textAlign='left';ctx.fillStyle=col;ctx.fillText(shown,W/2-w/2,y);
  if(n<s.length&&Math.floor(t*6)%2==0){const sw=ctx.measureText(shown).width;ctx.fillStyle=GREEN;ctx.fillRect(W/2-w/2+sw+4,y-size*0.4,size*0.45,size*0.8);}
  ctx.restore();
}
function title(t,a,b,s,col=PAPER,y=215,size=78,o={}){const al=win(t,a,b,o.fi??.3,o.fo??.35);if(al<=0)return;const p=seg(t,a,a+.45);
  const gl=col===RED?'rgba(255,60,60,.7)':col===GREEN?'rgba(109,255,192,.6)':'rgba(127,232,255,.5)';
  txt(s,o.x??W/2,y,size,col,{a:al,glow:gl,blur:o.blur||30,sc:o.pop?lerp(1.4,1,eOut(p)):1,f:o.f,w:o.w,al:o.al});}
function sub(t,a,b,s,col=GREEN,y=300,size=40){txt(s,W/2,y,size,col,{f:SANS,w:500,a:win(t,a,b,.3,.35)});}
function ghost(x,y,s,a,col='190,205,205'){ // 灰色人影，(x,y)=身体中心
  if(a<=0)return;ctx.save();ctx.globalAlpha=clamp(a);ctx.translate(x,y);ctx.scale(s,s);
  ctx.filter='blur(6px)';const g=ctx.createLinearGradient(0,-170,0,170);g.addColorStop(0,`rgba(${col},0.9)`);g.addColorStop(1,`rgba(${col},0)`);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,-130,36,0,6.28);ctx.fill();
  ctx.beginPath();ctx.moveTo(-34,-92);ctx.quadraticCurveTo(-62,0,-50,170);ctx.lineTo(50,170);ctx.quadraticCurveTo(62,0,34,-92);ctx.closePath();ctx.fill();
  ctx.filter='none';ctx.fillStyle=`rgba(255,40,40,${0.8})`;ctx.beginPath();ctx.arc(-12,-134,3.5,0,6.28);ctx.arc(12,-134,3.5,0,6.28);ctx.fill();
  ctx.restore();
}
// 闪现：times 里每个时刻出现 dur 秒
function flashA(t,times,dur=0.14){for(const k of times)if(t>=k&&t<k+dur)return 1;return 0;}
function stamp(s,x,y,t0,t,col=RED,size=80,rot=-0.16){const p=seg(t,t0,t0+0.35);if(p<=0)return;const sc=lerp(2.2,1,eOut(p));
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);ctx.globalAlpha=p*0.92;ctx.strokeStyle=col;ctx.lineWidth=7;ctx.shadowColor=col;ctx.shadowBlur=18;
  ctx.font=`900 ${size}px ${SANS}`;const w=ctx.measureText(s).width;ctx.strokeRect(-w/2-30,-size*0.75,w+60,size*1.5);ctx.lineWidth=2.5;ctx.strokeRect(-w/2-42,-size*0.75-12,w+84,size*1.5+24);
  ctx.fillStyle=col;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(s,0,4);ctx.restore();}
// 火柴人：站 / 坐 / 躺
function headAt(x,y,r,c,a){ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=c;ctx.lineWidth=4;ctx.shadowColor=c;ctx.shadowBlur=12;ctx.beginPath();ctx.arc(x,y,r,0,6.28);ctx.stroke();ctx.restore();}
function personStand(x,y,s=1,a=1,c=PAPER){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  headAt(0,-170,26,c,a);line([[0,-144],[0,-60]],c,4,true,a);line([[-38,-100],[0,-125],[38,-100]],c,3.5,true,a);line([[-26,0],[0,-60],[26,0]],c,3.5,true,a);ctx.restore();}
function personSit(x,y,s=1,a=1,c=PAPER){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  headAt(4,-150,26,c,a);line([[0,-124],[-4,-30]],c,4,true,a);line([[-2,-100],[50,-70],[80,-74]],c,3.5,true,a);line([[-4,-30],[56,-26],[60,40]],c,3.5,true,a);ctx.restore();}
function personLie(x,y,s=1,a=1,c=PAPER,eyes=0){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s); // 头在左
  headAt(-150,-10,24,c,a);line([[-124,-8],[30,-6]],c,4,true,a);line([[30,-6],[140,-2]],c,3.5,true,a);line([[-90,-6],[-20,4]],c,3,true,a*0.8);
  if(eyes>0){ctx.save();ctx.globalAlpha*=a*eyes;ctx.fillStyle=PAPER;ctx.beginPath();ctx.arc(-156,-16,3.5,0,6.28);ctx.arc(-144,-16,3.5,0,6.28);ctx.fill();ctx.restore();}
  ctx.restore();}
function bed(x,y,w=380,a=1,c=CYAN){line([[x-w/2,y],[x+w/2,y]],c,4,true,a);line([[x-w/2,y-70],[x-w/2,y+60]],c,4,true,a);line([[x+w/2,y-30],[x+w/2,y+60]],c,4,true,a);line([[x-w/2+10,y-20],[x-w/2+80,y-20]],c,2.5,true,a*0.7);}
// 房间外框（侧视）
function roomBox(x0,x1,top,floor,a=1,c=CYAN){line([[x0,top],[x1,top],[x1,floor],[x0,floor],[x0,top]],c,3,true,a);for(let x=x0+20;x<x1;x+=60)line([[x,floor+10],[x+30,floor+10]],c,1.5,false,a*.35);}
function waves(x,y,r0,color,t,a=1,n=5,start=-0.8,end=0.8){ctx.save();for(let k=0;k<n;k++){const q=((t*0.9)+k/n)%1;ctx.globalAlpha=a*(1-q)*0.55;ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,r0+q*220,start,end);ctx.stroke();}ctx.restore();}
// 横向柱状图条
function bar(x,y,w,h,frac,label,val,t0,t,col=GREEN){const p=eOut(seg(t,t0,t0+0.6));if(p<=0)return;
  ctx.save();ctx.globalAlpha=p;ctx.strokeStyle=col;ctx.lineWidth=2;ctx.strokeRect(x,y,w,h);ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=14;ctx.globalAlpha=p*0.8;ctx.fillRect(x,y,w*frac*p,h);ctx.restore();
  txt(label,x-24,y+h/2,34,PAPER,{f:SANS,w:500,al:'right',a:p});txt(val,x+w*frac*p+20,y+h/2,38,col,{f:MONO,w:700,al:'left',a:p});}
// 大脑轮廓
function brain(x,y,s,c,a=1,lit=0){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha*=a;
  ctx.strokeStyle=c;ctx.lineWidth=4;ctx.shadowColor=c;ctx.shadowBlur=16;ctx.beginPath();
  ctx.moveTo(-120,20);ctx.bezierCurveTo(-150,-60,-90,-120,-20,-115);ctx.bezierCurveTo(40,-140,130,-100,128,-30);ctx.bezierCurveTo(150,20,110,70,60,64);ctx.lineTo(30,90);ctx.lineTo(10,62);ctx.bezierCurveTo(-40,80,-110,70,-120,20);ctx.stroke();
  ctx.lineWidth=2.5;ctx.globalAlpha*=0.7;for(const p of [[[-80,-40],[-40,-70],[0,-50]],[[-20,0],[30,-30],[80,-10]],[[-90,20],[-40,10],[0,30]],[[30,30],[70,20],[100,40]]]){ctx.beginPath();ctx.moveTo(...p[0]);ctx.quadraticCurveTo(...p[1],...p[2]);ctx.stroke();}
  if(lit>0){ctx.globalAlpha=lit*0.35;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(0,-20,120,85,0,0,6.28);ctx.fill();}
  ctx.restore();}

// ---------- background / header / post ----------
function bg(t,dark=0){
  const g=ctx.createRadialGradient(W/2,H/2,80,W/2,H/2,1150);g.addColorStop(0,`rgb(${lerp(14,3,dark)|0},${lerp(30,8,dark)|0},${lerp(30,10,dark)|0})`);g.addColorStop(1,'#010303');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.globalAlpha=0.06*(1-dark*0.7);ctx.strokeStyle=GREEN;ctx.lineWidth=1;for(let x=0;x<=W;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}for(let y=0;y<=H;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}ctx.restore();
  ctx.save();for(const d of dust){const y=(d.y-t*d.v+H*10)%H;const x=d.x+Math.sin(t*0.5+d.p)*12;ctx.globalAlpha=(0.25+0.2*Math.sin(t+d.p))*(1-dark*0.5);ctx.fillStyle=GREEN;ctx.beginPath();ctx.arc(x,y,d.s,0,6.28);ctx.fill();}ctx.restore();
}
function header(t){
  const a=seg(t,0.1,0.6);ctx.save();ctx.globalAlpha=a;
  txt('AI 异常调查所',90,62,32,GREEN,{f:SANS,w:700,al:'left',glow:'rgba(109,255,192,.5)',blur:12});
  txt('CASE #'+EP.caseNo,1830,62,28,GREEN,{f:MONO,w:700,al:'right',a:.85});
  if(Math.floor(t*1.5)%2==0){ctx.fillStyle=RED;ctx.shadowColor=RED;ctx.shadowBlur=12;ctx.beginPath();ctx.arc(1606,62,8,0,6.28);ctx.fill();ctx.shadowBlur=0;}
  ctx.fillStyle='rgba(109,255,192,.5)';ctx.fillRect(90,92,1740,2);
  txt(`T+${String(Math.floor(t/60)).padStart(2,'0')}:${(t%60).toFixed(2).padStart(5,'0')}`,90,122,22,'rgba(109,255,192,.6)',{f:MONO,w:400,al:'left'});
  txt('档案：'+EP.name,1830,122,24,'rgba(233,243,238,.6)',{f:SANS,w:500,al:'right'});
  ctx.restore();
}
function glitch(t){
  let k=-1;for(const g of GLITCH.concat(EP.glitch||[]))if(t>=g&&t<g+0.28)k=g;if(k<0)return;
  const p=1-(t-k)/0.28;bx.clearRect(0,0,W,H);bx.drawImage(cv,0,0);const r=rng(Math.floor(t*30)*13+5);
  for(let i=0;i<10;i++){const y=r()*H,h=8+r()*70,dx=(r()-.5)*160*p;ctx.drawImage(buf,0,y,W,h,dx,y,W,h);}
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=0.35*p;ctx.drawImage(buf,10*p,0);ctx.restore();
}
function post(t,dark=0,redFlash=0){
  ctx.drawImage(scan,0,0);
  const v=ctx.createRadialGradient(W/2,H/2,380,W/2,H/2,1100);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,`rgba(0,0,0,${0.78+dark*0.18})`);ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  if(redFlash>0){ctx.fillStyle=`rgba(255,20,20,${redFlash*0.18})`;ctx.fillRect(0,0,W,H);}
  ctx.save();ctx.globalCompositeOperation='overlay';ctx.globalAlpha=0.08+dark*0.04;ctx.drawImage(noise[Math.floor(t*24)%4],0,0,W,H);ctx.restore();
  const fl=0.035*Math.sin(t*37)*Math.sin(t*11.3)+dark*0.05*Math.max(0,Math.sin(t*53));ctx.fillStyle=`rgba(0,0,0,${Math.max(0,fl)})`;ctx.fillRect(0,0,W,H);
  glitch(t);
  const fo=Math.max(seg(t,T.fin-1.6,T.fin),1-seg(t,0,0.25));if(fo>0){ctx.fillStyle=`rgba(0,0,0,${fo})`;ctx.fillRect(0,0,W,H);}
}
function darkness(t){let d=0;const [a,b]=EP.dark||[T.night,T.foil];if(t>=a-0.4&&t<b+0.6)d=0.85*Math.min(seg(t,a-0.4,a+0.2),1-seg(t,b,b+0.6));return d;}

function draw(t){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.filter='none';
  const dark=darkness(t);
  let sh=0;for(const [h,m] of [[T.hit,26],[T.reveal,16],[T.end,10],[T.night+5.2,12]]){if(t>=h&&t<h+0.6)sh=Math.max(sh,m*(1-(t-h)/0.6));}
  const r=rng(Math.floor(t*30)+99);
  bg(t,dark);ctx.save();ctx.translate((r()-.5)*sh,(r()-.5)*sh);
  scene(t);
  ctx.restore();header(t);
  const rf=(t>=T.hit&&t<T.hit+0.5?1-(t-T.hit)/0.5:0)+(t>=15.2&&t<15.6?1-(t-15.2)/0.4:0);
  post(t,dark,rf);
}
window.draw=draw;
window.cover=function(){ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;bg(20,0.5);coverScene();header(20);ctx.drawImage(scan,0,0);
  const v=ctx.createRadialGradient(W/2,H/2,380,W/2,H/2,1100);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.75)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);};
window.meta=function(){for(let t=0;t<T.fin;t+=0.1)draw(t);return {caps:Object.values(CAPLOG),sfx:EP.sfx||{}};};
window.ready=(async()=>{await new Promise(r=>document.readyState==="complete"?r():window.addEventListener("load",r));for(const f of [`700 40px ${SERIF}`,`500 40px ${SANS}`,`700 40px ${SANS}`,`900 40px ${SANS}`,`700 40px ${MONO}`,`400 40px ${MONO}`])await document.fonts.load(f);draw(0);return true;})();
