import sys,asyncio
from playwright.async_api import async_playwright
async def main(kinds):
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
    pg=await b.new_page(viewport={'width':1200,'height':1200})
    msgs=[]; pg.on('console',lambda m:msgs.append(m.text)); pg.on('pageerror',lambda e:msgs.append(str(e)))
    for k in kinds:
      await pg.goto(f'http://localhost:8765/render.html?p={k}')
      try: await pg.wait_for_function('window.DONE',timeout=90000)
      except Exception as e: print(k,'TIMEOUT',msgs[-5:]); continue
      await pg.locator('canvas').screenshot(path=f'out/{k}.png',omit_background=True); print(k,'ok')
    print('\n'.join(msgs[-5:])); await b.close()
asyncio.run(main(sys.argv[1:]))
