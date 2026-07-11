import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Tag, Clock, ChevronRight, BookOpen } from 'lucide-react';
import { posts, categoryColors } from '../data/posts';

import MorphingParticles from '../components/MorphingParticles';

const Blog = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const categories = ['All', ...new Set(posts.map(p => p.category))];

  const filtered = posts.filter(p => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = posts.find(p => p.featured);

  return (
    <div className="page-content fade-in">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-logo-box">
          <img src="/module-chevron.svg" alt="Blog" />
        </div>
        <h1 className="glitch" data-text="INTEL FEED">INTEL FEED</h1>
        <p className="page-hero-desc">Writeups, research, tutorials, and threat intelligence from the Syndicate.</p>
      </section>

      {/* Featured */}
      {featured && (
        <section className="blog-featured">
          <Link to={`/blog/${featured.id}`} className="featured-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="featured-content">
              <span className="featured-badge">FEATURED</span>
              <span className="blog-category" style={{ color: categoryColors[featured.category] }}><Tag size={14} /> {featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <div className="blog-meta">
                <span><Clock size={14} /> {featured.readTime}</span>
                <span>By {featured.author}</span>
                <span>{featured.date}</span>
              </div>
              <span className="cyber-button cyber-button-filled" style={{ marginTop: '10px' }}>Read Full Report <ChevronRight size={16} /></span>
            </div>

            <div className="featured-visual">
              <div className="code-terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">waf_bypass.py</span>
              </div>
              <pre className="code-terminal-body">
                <code>{`# Unicode Bypass Payload
import urllib.parse

def payload_generator(waf_rules):
    raw = "UNION SELECT username, password FROM users"
    # Normalize unicode bypass char
    bypass = "\\u212a" # kelvin sign (K)
    payload = raw.replace("s", bypass)
    return urllib.parse.quote(payload)

print("[+] Payload Generated: " + payload_generator(None))`}</code>
              </pre>
            </div>
          </Link>
        </section>
      )}

      {/* Filters */}
      <section className="blog-controls">
        <div className="blog-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search intel..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="blog-filters">
          {categories.map(c => (
            <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="blog-grid-section">
        <div className="blog-grid">
          {filtered.map(p => (
            <Link key={p.id} to={`/blog/${p.id}`} className="blog-card">
              <div className="blog-card-header">
                <span className="blog-category" style={{ color: categoryColors[p.category] }}><Tag size={12} /> {p.category}</span>
                <span className="blog-date">{p.date}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <div className="blog-card-footer">
                <span className="blog-author"><FileText size={14} /> {p.author}</span>
                <span className="blog-read-time"><Clock size={14} /> {p.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="no-results">
            <p>No intel found matching your query. Try different search terms.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
