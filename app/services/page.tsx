import {AdditionalServices} from '@/components/additional-services';
import {Button} from '@/components/ui/button';
import Link from '@/components/site-link';
import {Closing} from '@/components/site';
import {EngagementProcess} from '@/components/engagement-process';
export const metadata={title:'Websites, Customer Apps & Operational Tools',description:'Connected customer experiences and operational tools for businesses with complex real-world operations. Start with a complete website and booking experience.'};
export default function Services(){return <main>
<section className="page-hero"><div className="wrap"><p className="eyebrow">WHAT WE BUILD</p><h1>Connect the customer experience.<br/><em>Coordinate the work behind it.</em></h1><p className="intro">Websites, customer apps, and operational tools for businesses that coordinate people, physical assets, and service delivery. From growing companies to midmarket and enterprise organizations, we start with one clear business need.</p><div className="actions" style={{marginTop:28}}><Button asChild className="cta"><Link href="/contact">Get your free website preview</Link></Button><span className="caption">For qualified businesses. No obligation to buy.</span></div></div></section>
<section className="section wrap"><h2>One connected customer experience.</h2><div className="service-grid">{[
['Win the customer','Help people find you, choose confidently, and book.','Websites · Content · Search visibility · Booking'],
['Deliver the service','Keep customers informed and give staff the information they need to prepare and deliver.','Customer portals · Staff tools · Workflow automation'],
['Bring them back','Make support, follow-up, and repeat bookings easier.','Customer support · Follow-up · Companion apps']
].map(([title,body,examples])=><article className="service" key={title}><h3>{title}</h3><p>{body}</p><p className="caption">{examples}</p></article>)}</div><p className="section-intro">Begin where the need is clearest. Connect to what you already use, then add capabilities when they solve the next problem.</p></section>
<section className="section wrap" id="included"><p className="eyebrow">A PLACE TO START</p><h2>Your complete website.<br/>Ready for business.</h2><p className="section-intro">We write, design, build, connect, and launch it. Conversion, SEO, and AI-search foundations included.</p><div className="service-grid">{[
['Get found','SEO & AI search','Content that answers your customers’ questions, with the structure and access checks that help search engines and AI tools find and understand it.'],
['Get chosen','Copy & design','A cohesive website that explains your services, builds trust, and makes choosing easier. Copy, design, and development together.'],
['Get booked','Booking & measurement','Booking, inquiries, and follow-up connected to your existing systems. Tested on mobile, with measurement in place.']
].map(([label,title,body])=><article className="service" key={label}><p className="eyebrow">{label}</p><h3>{title}</h3><p>{body}</p></article>)}</div></section>
<section className="soft-section" id="booking"><div className="section wrap content-grid"><h2>Connected from<br/>booking to follow-up.</h2><div className="richtext"><p>Customers can book or inquire, receive confirmation, and pass their details to the systems your team uses. We check the available connections before quoting.</p><p>We handle the content, connections, testing, launch, and handover as one complete job.</p><p><strong>Price and timing?</strong> Your preview comes with one price to complete and launch your website. We agree the delivery timeline before paid work begins.</p></div></div></section>
<EngagementProcess/>
<section className="section wrap content-grid" id="measurement"><h2>A few details.</h2><div>{[
['Do I need to replace my booking system?','Not necessarily. We check what your current system supports and how the new website can connect to it. You know the proposed setup before you commit.'],
['What do I receive in the free preview?','A tailored website concept and proposed booking experience, after a short conversation to confirm fit and timing. Simulated steps are marked. The complete website and live connections follow if you choose the paid project.'],
['What do you need from me?','Your service and policy details, relevant system access, existing brand materials, and the right stakeholders to approve key decisions. We handle the writing, design, and build.'],
['What happens after launch?','You receive a working website and a handover. We agree ownership, hosting, ongoing software costs, and support before you commit. Continued maintenance and improvement are available.'],
['How will we know it’s working?','We agree success measures and a starting point before building. We track suitable inquiries and confirmed bookings where your systems allow. Search and AI visibility are measured where possible; rankings and recommendations cannot be guaranteed.']

].map(([q,a])=><details className="faq" key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section><AdditionalServices/><Closing/></main>}
