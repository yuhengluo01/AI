# 合成悬疑配乐+音效，读取 meta.json（字幕起点/字数、EP.sfx），输出 audio.wav。时间线固定同 engine.js 的 T。
# EP.sfx 可选: {"ghost":[出现时刻], "stings":[额外刺耳时刻], "blips":[提示音时刻], "whisper":[开始,结束]}
import numpy as np, wave, json
SR=44100; D=50.0; N=int(SR*D); L=np.zeros(N); R=np.zeros(N)
rs=np.random.default_rng(3); meta=json.load(open("meta.json")); sfx=meta.get("sfx",{})
def tt(n): return np.arange(n)/SR
def add(x,t0,g=1.0,pan=0.0):
    i=int(t0*SR); j=min(N,i+len(x))
    if j<=i or i<0: return
    L[i:j]+=x[:j-i]*g*(1-pan); R[i:j]+=x[:j-i]*g*(1+pan)
def lpf(x,fc): X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X*=1/(1+(f/fc)**4); return np.fft.irfft(X,len(x))
def hpf(x,fc): X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X*=(f/fc)**4/(1+(f/fc)**4); return np.fft.irfft(X,len(x))
def env(n,a,r):
    e=np.ones(n); na=int(a*SR); nr=int(r*SR)
    if na: e[:na]=np.linspace(0,1,na)
    if nr: e[-nr:]*=np.linspace(1,0,nr)**2
    return e
def saw(f,n,det=0): t=tt(n); return sum(((t*f*(1+d))%1*2-1) for d in (-det,0,det))/3
def pad(freqs,t0,t1,g,fc=600,a=2,r=2):
    n=int((t1-t0)*SR); x=sum(saw(f,n,0.004) for f in freqs)/len(freqs); x=lpf(x,fc)*env(n,a,r)
    lfo=0.75+0.25*np.sin(2*np.pi*0.13*tt(n)); add(x*lfo,t0,g,-0.2); add(np.roll(x*lfo,700),t0,g,0.2)
pad([55,82.4,110,130.8,155.6],0,21.3,0.34,450,3,0.6)        # A 小调 + 降五度，压抑
pad([55,82.4,110,130.8,164.8],21,42.3,0.22,900,0.05,0.8)
pad([65.4,98,130.8,164.8,196],42,45.2,0.26,1400,0.6,0.6)
pad([55,82.4,110,130.8,164.8],45,50,0.3,800,0.02,3.5)
n=int(21*SR); t=tt(n); sh=(np.sin(2*np.pi*880*t)+np.sin(2*np.pi*932.3*t))*0.5*(0.5+0.5*np.sin(2*np.pi*0.21*t))
add(sh*env(n,6,1)*np.clip((t-4)/8,0,1),0,0.04)
# 低频隆隆
n=int(21*SR); add(lpf(rs.standard_normal(n),60)*env(n,4,1)*3,0,0.35)
# 心跳 10-21
tb=10.0
while tb<20.8:
    bpm=60+55*((tb-10)/11)**1.5
    for off,gg in ((0,1),(0.18,0.7)):
        m=int(0.25*SR); tm=tt(m); add(np.sin(2*np.pi*(55-20*tm/0.25)*tm)*np.exp(-tm*22),tb+off,0.6*gg)
    tb+=60/bpm
def boom(t0,g=1,dur=1.6):
    n=int(dur*SR); x=tt(n); f=110*np.exp(-x*6)+32; ph=2*np.pi*np.cumsum(f)/SR
    add(np.sin(ph)*np.exp(-x*2.6)+lpf(rs.standard_normal(n),900)*np.exp(-x*14)*0.6,t0,g)
def clang(t0,g=0.4):
    n=int(2.5*SR); x=tt(n); add(sum(np.sin(2*np.pi*f*x)*np.exp(-x*d) for f,d in ((523,2),(1187,3),(1873,4.5),(2741,6)))/4,t0,g,0.1)
def whoosh(t0,dur,g=0.4):
    n=int(dur*SR); x=tt(n); y=lpf(hpf(rs.standard_normal(n),400),6000)*(x/dur)**2.5
    add(y*0.5+np.sin(2*np.pi*np.cumsum(120+800*(x/dur)**2)/SR)*(x/dur)**2*0.3,t0-dur,g)
def glitch(t0,g=0.2):
    n=int(0.22*SR); y=np.round(rs.standard_normal(n)*3)/3; y*=np.repeat(rs.random(n//400+1)>0.4,400)[:n]; add(y*env(n,0.005,0.05),t0,g,rs.uniform(-.5,.5))
def tick(t0,g=0.045): n=int(0.02*SR); add(hpf(rs.standard_normal(n),2500)*np.exp(-tt(n)*300),t0,g)
def blip(t0,f=1320,g=0.12): n=int(0.35*SR); x=tt(n); add(np.sin(2*np.pi*f*x)*np.exp(-x*12),t0,g)
def sting(t0,g=0.4):  # 刺耳不和谐弦乐+重击
    boom(t0,0.55,1.0); n=int(1.4*SR); x=tt(n); add(sum(saw(f,n,0.01) for f in (466,494,523,554))*np.exp(-x*2.5)*0.25,t0,g)
def ghostswell(t0,g=0.28):
    n=int(1.8*SR); x=tt(n); add((np.sin(2*np.pi*(440+30*np.sin(2*np.pi*5*x))*x)*0.4+lpf(rs.standard_normal(n),300))*(x/1.8)**2,t0-1.6,g)
for gt in [0.02,4.5,10,13.2,15.2,16,21,25,31,37,42,45]: glitch(gt)
# 耳语般的噪声
w0,w1=sfx.get("whisper",[10,16]); n=int((w1-w0)*SR); x=tt(n)
wh=hpf(rs.standard_normal(n),1500); wh=lpf(wh,5000)*(0.5+0.5*np.sin(2*np.pi*3.3*x)*np.sin(2*np.pi*0.7*x))**2*env(n,1,0.5); add(wh,w0,0.12,0.4)
boom(2.6,0.45,0.6)
sting(15.2,0.4); ghostswell(13.2)
for g_ in sfx.get("ghost",[]): ghostswell(g_,0.22); glitch(g_,0.25)
for s_ in sfx.get("stings",[]): sting(s_,0.3)
whoosh(21,2.2,0.55); boom(21,1.3,2.0); clang(21,0.45)
B=0.6; bassl=[55,55,65.4,55,49,49,58.3,49]
for k in range(int((42-21)/B)):
    t0=21+k*B; m=int(0.4*SR); x=tt(m); add(np.sin(2*np.pi*np.cumsum(90*np.exp(-x*30)+45)/SR)*np.exp(-x*9),t0,0.6)
    hm=int(0.06*SR); add(hpf(rs.standard_normal(hm),7000)*np.exp(-tt(hm)*70),t0+B/2,0.12,0.3)
    bn=int(B*SR*0.9); f=bassl[(k//2)%8]; add(lpf(saw(f,bn,0.006)+0.5*saw(f*2,bn),380)*env(bn,0.01,0.15),t0,0.32)
whoosh(25,0.7,0.3); boom(25,0.6,1)
whoosh(31,1.8,0.5); boom(31,1.1,1.8); clang(31,0.3)
whoosh(37,0.7,0.3); boom(37,0.6,1)
for b_ in sfx.get("blips",[]): blip(b_,1760,0.13)
whoosh(45,1.6,0.45); boom(45,1.1,2.4); boom(46.2,0.7,1.0); clang(46.2,0.25)
for s,c in meta["caps"]:
    for i in range(c): tick(s+i*0.05)
st=np.stack([L,R],1); st*=np.clip((D-np.arange(N)/SR)/1.8,0,1)[:,None]
st=np.tanh(st*1.2); st*=0.89/np.abs(st).max()
with wave.open("audio.wav","wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
