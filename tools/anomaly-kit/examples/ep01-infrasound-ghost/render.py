import sys, os, subprocess, asyncio
from playwright.async_api import async_playwright
HERE=os.path.dirname(os.path.abspath(__file__)); FPS=30
CUTS=[0,10,21,31,42,50]
async def scene(b,i):
    pg=await b.new_page(viewport={"width":1080,"height":1920})
    await pg.goto("file://"+os.path.join(HERE,"index.html")); await pg.evaluate("window.ready")
    cv=pg.locator("canvas"); out=os.path.join(HERE,"parts",f"s{i}.mp4")
    ff=subprocess.Popen(["ffmpeg","-y","-loglevel","error","-f","image2pipe","-framerate",str(FPS),"-c:v","mjpeg","-i","-",
        "-c:v","libx264","-preset","veryfast","-crf","18","-pix_fmt","yuv420p","-r",str(FPS),out],stdin=subprocess.PIPE)
    for f in range(round(CUTS[i]*FPS),round(CUTS[i+1]*FPS)):
        await pg.evaluate(f"window.draw({f/FPS})"); ff.stdin.write(await cv.screenshot(type="jpeg",quality=92))
    ff.stdin.close(); assert ff.wait()==0
async def main():
    os.makedirs(os.path.join(HERE,"parts"),exist_ok=True)
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--font-render-hinting=none"])
        await asyncio.gather(*[scene(b,i) for i in range(len(CUTS)-1)])
        await b.close()
    print("RENDER DONE")
asyncio.run(main())
