import type { Metadata } from "next";
import Link from "@/components/site-link";
import { articles } from "@/content/site";

export const metadata: Metadata = {
  title: "Articles on Product, Operations & AI",
  description: "Writing on customer experience, business operations, and building useful systems with AI.",
};

export default function Insights() {
  return <main>
    <header className="page-hero articles-header">
      <div className="wrap">
        <p className="eyebrow">ARTICLES</p>
        <h1>Product, operations<br/><em>and AI.</em></h1>
        <p className="intro">How technology changes the customer experience—and the work behind it.</p>
      </div>
    </header>
    <section className="section wrap articles-feature" aria-labelledby="featured-title">
      <Link className="featured-playbook" href="/insights/the-bigger-opportunity-for-ai">
        <p className="eyebrow">FEATURED · BUSINESS STRATEGY</p>
        <h2 id="featured-title">The Bigger Opportunity for AI</h2>
        <p>Better service, more loyal customers, and a business worth choosing beyond price.</p>
        <span className="text-link">Read the article</span>
        <span className="featured-meta">September 26, 2026 · 7 min read</span>
      </Link>
    </section>
    <section className="section wrap content-grid articles-archive" aria-labelledby="practice-title">
      <div>
        <h2 id="practice-title">AI in practice</h2>
        <p className="archive-intro">A closer look at workflows, data, and building software with AI.</p>
      </div>
      <div className="article-list">
        {articles.map(article => <a className="article-card" key={article.url} href={article.url}>
          <p className="eyebrow">{article.category}</p>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <span className="article-meta">{article.date} · Read on Substack</span>
        </a>)}
        <a className="text-link archive-link" href="https://www.oakheartlab.com/">More on Substack</a>
      </div>
    </section>
  </main>;
}
