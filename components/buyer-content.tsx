import Link from '@/components/site-link';
export function Lifecycle(){return <section className="section wrap" id="operations"><p className="eyebrow">BEYOND THE BOOKING</p><h2>The customer sees one business.<br/>Your team should have the full picture.</h2><p className="section-intro">For businesses where serving a customer requires people, physical assets, locations, and systems to work together.</p><div className="process-grid">{[
['Attract & convert','Help the right customers find you, compare services, and request or book the right option.','Service pages · Useful content · Booking journeys'],
['Prepare & deliver','Give customers a clear view of what’s next, and staff a shared view of what still needs attention.','Customer portals · Readiness checks · Staff work queues'],
['Support & return','Keep service history and follow-up connected so the next interaction doesn’t start from scratch.','Support tools · Follow-up workflows · Repeat bookings']
].map(([t,b,c])=><div key={t}><h3>{t}</h3><p>{b}</p><p className="caption">Potential project scope: {c}</p></div>)}</div><p className="section-intro">Start with the website and booking journey. Extend into one operational workflow when it is the constraint. Integrations, permissions, and system ownership are assessed before any backend build.</p><Link className="text-link" href="/contact">Start your website preview</Link></section>}
export function BuyerGuides(){return <section className="section wrap"><p className="eyebrow">BEFORE YOU REBUILD</p><h2>Questions worth answering first.</h2><div className="process-grid" style={{marginTop:30}}>{[
['Website or booking system?','Work out whether the problem is in your pages, booking system, or the way your team handles requests.','/guides#systems'],
['What does a complete website include?','From content and system connections to launch and handover.','/guides#scope'],
['How would we know it helped?','Look at suitable inquiries, completed bookings, and time saved—not just clicks.','/guides#measurement']
].map(([t,b,h])=><div key={h}><h3>{t}</h3><p>{b}</p><Link className="text-link" href={h}>Read the guide</Link></div>)}</div></section>}
