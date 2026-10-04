// Run against a production build: pnpm build && pnpm start -p 3100, then
// node tests/browser/success-heading.cjs (needs playwright; set PW_CHROMIUM for a custom browser path).
// Mocked successful submit at 390px: the confirmation heading must sit below the sticky header.
const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.PW_CHROMIUM});
  const p=await b.newPage({viewport:{width:390,height:844}});
  await p.route('**/api/checks', r=>r.fulfill({status:201,contentType:'application/json',body:'{"status":"received"}'}));
  await p.goto(`${process.env.BASE_URL ?? 'http://127.0.0.1:3100'}/ai-visibility-check`,{waitUntil:'networkidle'});
  await p.fill('#businessName','X'); await p.fill('#website','x.example.com'); await p.fill('#location','Y');
  await p.selectOption('#businessType',{index:1}); await p.fill('#email','x@example.com');
  await p.click('button[type=submit]'); await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const h=document.querySelector('header').getBoundingClientRect().bottom;const t=document.querySelector('[role=status] h2').getBoundingClientRect().top;return {headerBottom:h,headingTop:t,focused:document.activeElement?.getAttribute('role')}});
  await p.screenshot({path:process.argv[2] ?? "success-heading.png"});
  console.log(JSON.stringify(r), r.headingTop>=r.headerBottom?'PASS':'FAIL');
  await b.close();
})();
