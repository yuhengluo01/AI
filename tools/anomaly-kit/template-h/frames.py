# 用法: python3 ../template-h/frames.py 2,8,12.5,...   （在 ep 目录里运行）→ kf/sheet.png
import asyncio,os,sys,subprocess
from playwright.async_api import async_playwright
TS=[float(x) for x in sys.argv[1].split(',')]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--font-render-hinting=none"]);pg=await b.new_page(viewport={"width":1920,"height":1080})
        pg.on("pageerror",lambda e:print("ERR",e))
        await pg.goto("file://"+os.path.abspath("index.html"));await pg.evaluate("window.ready")
        os.makedirs("kf",exist_ok=True)
        for i,t in enumerate(TS):
            await pg.evaluate(f"window.draw({t})");await pg.locator("canvas").screenshot(path=f"kf/{i:02d}.png")
        await b.close()
    cols=4
    subprocess.run(["ffmpeg","-y","-loglevel","error","-i","kf/%02d.png","-vf",f"scale=480:270,tile={cols}x{(len(TS)+cols-1)//cols}","kf/sheet.png"],check=True)
asyncio.run(main())
