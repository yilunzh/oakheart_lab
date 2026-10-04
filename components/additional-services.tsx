import Link from '@/components/site-link';
export function AdditionalServices(){return <section className="soft-section" id="operations"><div className="section wrap"><p className="eyebrow">WHEN YOUR BUSINESS NEEDS MORE</p><h2>Solve the next customer problem.</h2><p className="section-intro">Your website is a complete service. Apps and additional operational tools are optional projects with their own price.</p><div className="service-grid">{[
['Companion mobile app','Make repeat visits easier with booking, visit details, and updates in one place.','mobile-app','Explore an app'],
['Staff tools & automation','Reduce re-entered information and missed handoffs. Connect customer forms, booking updates, and staff tasks, using AI where it helps.','back-office','Automate the busywork'],
['AI customer support','Answer common questions using your business information, with a clear handoff to your team when needed.','customer-support','Improve customer support']
].map(([title,body,interest,cta])=><article className="service" key={interest}><h3>{title}</h3><p>{body}</p><Link className="text-link" href={'/contact?interest='+interest}>{cta}</Link></article>)}</div></div></section>}
