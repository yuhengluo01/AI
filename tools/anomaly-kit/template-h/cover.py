# 用法: 在 ep 目录里 python3 ../template-h/cover.py <名字>  → 只重出封面 <名字>-cover.png
import asyncio,os,sys
from playwright.async_api import async_playwright
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--font-render-hinting=none"]);pg=await b.new_page(viewport={"width":1920,"height":1080})
        pg.on("pageerror",lambda e:print("ERR",e))
        await pg.goto("file://"+os.path.abspath("index.html"));await pg.evaluate("window.ready");await pg.evaluate("window.cover()")
        await pg.locator("canvas").screenshot(path=f"{sys.argv[1]}-cover.png");await b.close()
asyncio.run(m())
