# 用法: 在 ep 目录里 python3 ../template-h/render.py <输出名不带.mp4>   → 出 <名>.mp4 和 <名>-cover.png
import sys, os, subprocess, asyncio, json
from playwright.async_api import async_playwright
FPS=30; CUTS=[0,10,21,31,42,50]; NAME=sys.argv[1]; HERE=os.getcwd(); TPL=os.path.dirname(os.path.abspath(__file__))
async def scene(b,i):
    pg=await b.new_page(viewport={"width":1920,"height":1080})
    await pg.goto("file://"+os.path.join(HERE,"index.html")); await pg.evaluate("window.ready")
    cv=pg.locator("canvas"); out=os.path.join(HERE,"parts",f"s{i}.mp4")
    ff=subprocess.Popen(["ffmpeg","-y","-loglevel","error","-f","image2pipe","-framerate",str(FPS),"-c:v","mjpeg","-i","-",
        "-c:v","libx264","-preset","veryfast","-crf","19","-pix_fmt","yuv420p","-r",str(FPS),out],stdin=subprocess.PIPE)
    for f in range(round(CUTS[i]*FPS),round(CUTS[i+1]*FPS)):
        await pg.evaluate(f"window.draw({f/FPS})"); ff.stdin.write(await cv.screenshot(type="jpeg",quality=90))
    ff.stdin.close(); assert ff.wait()==0
async def main():
    os.makedirs("parts",exist_ok=True)
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--font-render-hinting=none"])
        pg=await b.new_page(viewport={"width":1920,"height":1080}); pg.on("pageerror",lambda e:print("ERR",e))
        await pg.goto("file://"+os.path.join(HERE,"index.html")); await pg.evaluate("window.ready")
        json.dump(await pg.evaluate("window.meta()"),open("meta.json","w"),ensure_ascii=False)
        await pg.evaluate("window.cover()"); await pg.locator("canvas").screenshot(path=f"{NAME}-cover.png"); await pg.close()
        await asyncio.gather(*[scene(b,i) for i in range(len(CUTS)-1)])
        await b.close()
asyncio.run(main())
subprocess.run(["python3",os.path.join(TPL,"audio.py")],check=True)
open("list.txt","w").write("".join(f"file 'parts/s{i}.mp4'\n" for i in range(len(CUTS)-1)))
subprocess.run(["ffmpeg","-y","-loglevel","error","-f","concat","-safe","0","-i","list.txt","-c","copy","video.mp4"],check=True)
subprocess.run(["ffmpeg","-y","-loglevel","error","-i","video.mp4","-i","audio.wav","-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest","-movflags","+faststart",f"{NAME}.mp4"],check=True)
print("DONE",NAME)
