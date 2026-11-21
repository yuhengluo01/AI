import asyncio,os,sys
from playwright.async_api import async_playwright
TS=[float(x) for x in sys.argv[1].split(',')]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--font-render-hinting=none"]);pg=await b.new_page(viewport={"width":1080,"height":1920})
        pg.on("console",lambda m:print("CONSOLE",m.text)); pg.on("pageerror",lambda e:print("ERR",e))
        await pg.goto("file://"+os.path.abspath("index.html"));await pg.evaluate("window.ready")
        os.makedirs("kf",exist_ok=True)
        for i,t in enumerate(TS):
            await pg.evaluate(f"window.draw({t})");await pg.locator("canvas").screenshot(path=f"kf/{i:02d}.png")
        await b.close()
asyncio.run(main())
