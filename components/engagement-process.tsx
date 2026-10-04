const stages=[
['Tell us about your business','A short conversation about your business, customers, and existing systems.'],
['See it before you commit','Explore your tailored website preview and see one price to finish and launch. No fee or obligation to buy.'],
['Approve, build, launch','We build the complete website, connect your systems, test the experience, and launch with your approval.']
];
export function EngagementProcess(){return <section className="section wrap" id="process"><p className="eyebrow">HOW THE WEBSITE PROJECT WORKS</p><h2>See it. Try it. Then decide.</h2><div className="process-grid" style={{marginTop:32}}>{stages.map(([title,body],i)=><div key={title}><span className="service-no">0{i+1}</span><h3>{title}</h3><p>{body}</p></div>)}</div></section>}
