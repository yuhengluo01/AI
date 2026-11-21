import numpy as np, wave
SR=44100; D=50.0; N=int(SR*D); L=np.zeros(N); Rr=np.zeros(N)
rs=np.random.default_rng(3)
def tt(n): return np.arange(n)/SR
def add(x,t0,g=1.0,pan=0.0):
    i=int(t0*SR); j=min(N,i+len(x)); 
    if j<=i: return
    L[i:j]+=x[:j-i]*g*(1-pan)/1; Rr[i:j]+=x[:j-i]*g*(1+pan)/1
def lp(x,a):  # one-pole lowpass, a in (0,1)
    y=np.empty_like(x); s=0.0
    for k in range(len(x)): s+=a*(x[k]-s); y[k]=s
    return y
def lpf(x,fc): # fast via FFT
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X*=1/(1+(f/fc)**4); return np.fft.irfft(X,len(x))
def hpf(x,fc):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); X*=(f/fc)**4/(1+(f/fc)**4); return np.fft.irfft(X,len(x))
def env(n,a,r):
    e=np.ones(n); na=int(a*SR); nr=int(r*SR)
    if na: e[:na]=np.linspace(0,1,na)
    if nr: e[-nr:]*=np.linspace(1,0,nr)**2
    return e
def saw(f,n,det=0):
    t=tt(n); return sum(((t*f*(1+d))%1*2-1) for d in (-det,0,det))/3
# ---- drone/pad 0-45 ----
def pad(freqs,t0,t1,g,fc=600,a=2,r=2):
    n=int((t1-t0)*SR); x=sum(saw(f,n,0.004) for f in freqs)/len(freqs); x=lpf(x,fc)*env(n,a,r)
    lfo=0.75+0.25*np.sin(2*np.pi*0.13*tt(n)); add(x*lfo,t0,g,-0.2); add(np.roll(x*lfo,700),t0,g,0.2)
pad([55,82.4,110,130.8],0,21.3,0.32,500,3,0.6)          # A minor drone
pad([55,82.4,110,130.8,164.8],21,42.3,0.22,900,0.05,0.8)
pad([65.4,98,130.8,164.8,196],42,45.2,0.26,1400,0.6,0.6) # C major relief
pad([55,82.4,110,130.8,164.8],45,50,0.3,800,0.02,3.5)
# eerie shimmer (dissonant highs)
n=int(21*SR); t=tt(n); sh=(np.sin(2*np.pi*880*t)+np.sin(2*np.pi*932.3*t))*0.5*(0.5+0.5*np.sin(2*np.pi*0.21*t))
add(sh*env(n,6,1)*np.clip((t-4)/8,0,1),0,0.035)
# ---- heartbeat 10-21 ----
tb=10.0
while tb<20.8:
    bpm=60+50*((tb-10)/11)**1.5
    for off,gg in ((0,1),(0.18,0.7)):
        m=int(0.25*SR); tm=tt(m); x=np.sin(2*np.pi*(55-20*tm/0.25)*tm)*np.exp(-tm*22); add(x,tb+off,0.55*gg)
    tb+=60/bpm
# ---- sfx helpers ----
def boom(t0,g=1,dur=1.6):
    n=int(dur*SR); x=tt(n); f=110*np.exp(-x*6)+32; ph=2*np.pi*np.cumsum(f)/SR
    y=np.sin(ph)*np.exp(-x*2.6)+lpf(rs.standard_normal(n),900)*np.exp(-x*14)*0.6; add(y,t0,g)
def clang(t0,g=0.4):
    n=int(2.5*SR); x=tt(n); y=sum(np.sin(2*np.pi*f*x)*np.exp(-x*d) for f,d in ((523,2),(1187,3),(1873,4.5),(2741,6)))/4; add(y,t0,g,0.1)
def whoosh(t0,dur,g=0.4):
    n=int(dur*SR); x=tt(n); y=hpf(rs.standard_normal(n),400)*(x/dur)**2.5
    y=lpf(y,6000); tone=np.sin(2*np.pi*np.cumsum(120+800*(x/dur)**2)/SR)*(x/dur)**2*0.3
    add(y*0.5+tone,t0-dur,g)
def glitch(t0,g=0.18):
    n=int(0.22*SR); y=rs.standard_normal(n); y=np.round(y*3)/3; y*=np.repeat(rs.random(n//400+1)>0.4,400)[:n]; add(y*env(n,0.005,0.05),t0,g,rs.uniform(-.5,.5))
def tick(t0,g=0.05):
    n=int(0.02*SR); add(hpf(rs.standard_normal(n),2500)*np.exp(-tt(n)*300),t0,g)
def blip(t0,f=1320,g=0.12):
    n=int(0.35*SR); x=tt(n); add(np.sin(2*np.pi*f*x)*np.exp(-x*12),t0,g)
for gt in [0.02,4.5,10,13.2,15.2,16,21,25,31,37,42,45]: glitch(gt)
# ghost appear: low swell + whine
n=int(2*SR); x=tt(n); add(np.sin(2*np.pi*(440+30*np.sin(2*np.pi*5*x))*x)*(x/2)**2*0.4+lpf(rs.standard_normal(n),300)*(x/2)**2,13.2,0.25)
# turn stinger
boom(15.2,0.6,1.0); n=int(1.4*SR); x=tt(n); add(sum(saw(f,n,0.01) for f in (233,247,262,277))*np.exp(-x*2.5)*0.25,15.2,0.35)
# stamp at 2.6
boom(2.6,0.45,0.6)
# riser + hit
whoosh(21,2.2,0.55); boom(21,1.3,2.0); clang(21,0.45)
# blade buzz 21-25 (audible stand-in for vibration)
n=int(4*SR); x=tt(n); add(np.sign(np.sin(2*np.pi*95*x))*0.2*np.exp(-x*0.3)*(0.6+0.4*np.sin(2*np.pi*7*x))*env(n,0.01,0.6),21,0.18)
# ---- groove 21-42 @100bpm ----
B=0.6; bass=[55,55,65.4,55,49,49,58.3,49]
for k in range(int((42-21)/B)):
    t0=21+k*B
    m=int(0.4*SR); x=tt(m); add(np.sin(2*np.pi*np.cumsum(90*np.exp(-x*30)+45)/SR)*np.exp(-x*9),t0,0.6)  # kick
    hm=int(0.06*SR); add(hpf(rs.standard_normal(hm),7000)*np.exp(-tt(hm)*70),t0+B/2,0.12,0.3)       # hat
    bn=int(B*SR*0.9); f=bass[(k//2)%8]; bx=lpf(saw(f,bn,0.006)+0.5*saw(f*2,bn),380)*env(bn,0.01,0.15); add(bx,t0,0.32)
# beats
whoosh(25,0.7,0.3); boom(25,0.6,1)
whoosh(31,1.8,0.5); boom(31,1.1,1.8); clang(31,0.3)
for tb_ in (33.6,34.5): blip(tb_,1760,0.14)
whoosh(37,0.7,0.3); boom(37,0.6,1)
for tb_ in (38.6,39.4): blip(tb_,990,0.12)
# fan wind-down 42-44
n=int(2.2*SR); x=tt(n); fan=lpf(rs.standard_normal(n),900)*(1-x/2.2)**2*(0.6+0.4*np.sin(2*np.pi*np.cumsum(14*(1-x/2.2)+1)/SR)); add(fan,42.1,0.3)
# end
whoosh(45,1.6,0.45); boom(45,1.1,2.4); boom(46.2,0.7,1.0); clang(46.2,0.25)
# caption typewriter ticks
caps=[(4.9,19),(7.5,13),(10.3,20),(13.2,17),(15.2,13),(17.3,10),(18.6,15),(21.8,13),(25.5,14),(28.3,15),(31.6,17),(34.5,24),(37.5,15),(39.4,19),(42.4,17),(47,19)]
for s,c in caps:
    for i in range(c): tick(s+i*0.05,0.045)
st=np.stack([L,Rr],1)
fo=np.clip((D-np.arange(N)/SR)/1.8,0,1); st*=fo[:,None]
st=np.tanh(st*1.2); st*=0.89/np.abs(st).max()
with wave.open("audio.wav","wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
print("audio ok")
