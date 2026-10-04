/* eslint-disable @typescript-eslint/no-require-imports -- plain Node script run outside the app build */
// Run against a production build: pnpm build && pnpm start -p 3100, then
// node tests/browser/success-heading.cjs (needs playwright; set PW_CHROMIUM for a custom browser path).
// Mocked successful submit at 390px: the confirmation heading must sit below the sticky header.
const { chromium } = require('playwright');
(async()=>{
  // 20 runs at 390px with random API latency: the confirmation heading must always sit below
  // the sticky header and hold focus (catches render/reveal ordering races).
  const b=await chromium.launch({executablePath:process.env.PW_CHROMIUM});
  const base=process.env.BASE_URL ?? 'http://127.0.0.1:3100';
  let failures=0, last=null;
  for (let i=0;i<20;i++){
    const p=await b.newPage({viewport:{width:390,height:844}});
    await p.route('**/api/checks', async r=>{await new Promise(res=>setTimeout(res,Math.random()*400));await r.fulfill({status:201,contentType:'application/json',body:'{"status":"received"}'});});
    await p.goto(`${base}/ai-visibility-check`,{waitUntil:'networkidle'});
    await p.fill('#businessName','X'); await p.fill('#website','x.example.com'); await p.fill('#location','Y');
    await p.selectOption('#businessType',{index:1}); await p.fill('#email','x@example.com');
    await p.click('button[type=submit]'); await p.waitForTimeout(1500);
    last=await p.evaluate(()=>{const h=document.querySelector('header').getBoundingClientRect().bottom;const t=document.querySelector('[role=status] h2')?.getBoundingClientRect().top ?? -1;return {headerBottom:h,headingTop:t,focused:document.activeElement?.getAttribute('role')}});
    if (!(last.headingTop>=last.headerBottom && last.focused==='status')) { failures++; console.log('run',i,'FAIL',JSON.stringify(last)); }
    if (i===19) await p.screenshot({path:process.argv[2] ?? require("node:path").join(require("node:os").tmpdir(), "success-heading.png")});
    await p.close();
  }
  console.log(JSON.stringify(last), failures===0?'PASS (20/20)':`FAIL (${failures}/20)`);
  process.exitCode = failures===0 ? 0 : 1;
  await b.close();
})();
