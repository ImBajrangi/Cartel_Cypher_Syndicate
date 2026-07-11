import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, Clock, FileText, ChevronRight, Share2, BookOpen } from 'lucide-react';
import { posts, categoryColors } from '../data/posts';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="page-content fade-in">
        <section className="page-hero">
          <h1 className="glitch" data-text="404 — NOT FOUND">404 — NOT FOUND</h1>
          <p className="page-hero-desc">This intel report does not exist or has been redacted.</p>
          <Link to="/blog" className="cyber-button" style={{ marginTop: '20px' }}>
            <ArrowLeft size={18} /> Return to Intel Feed
          </Link>
        </section>
      </div>
    );
  }

  const currentIndex = posts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const relatedPosts = posts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <div className="page-content fade-in">
      {/* Back */}
      <div className="post-back">
        <button className="back-btn" onClick={() => navigate('/blog')}>
          <ArrowLeft size={16} /> Back to Intel Feed
        </button>
      </div>

      {/* Post Header */}
      <article className="post-article">
        <header className="post-header">
          <div className="post-meta-top">
            <span className="blog-category" style={{ color: categoryColors[post.category] }}>
              <Tag size={14} /> {post.category}
            </span>
            <span className="post-date">{post.date}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta-bar">
            <span><FileText size={14} /> {post.author}</span>
            <span><Clock size={14} /> {post.readTime} read</span>
          </div>
          <p className="post-excerpt">{post.excerpt}</p>
        </header>

        {/* Table of Contents */}
        <nav className="post-toc">
          <div className="toc-header">
            <BookOpen size={16} /> Table of Contents
          </div>
          <ul>
            {post.content.map((section, i) => (
              <li key={i}>
                <a href={`#section-${i}`} className="toc-link">
                  <ChevronRight size={12} /> {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Sections */}
        <div className="post-body">
          {post.content.map((section, i) => (
            <section key={i} id={`section-${i}`} className="post-section">
              <h2>{section.heading}</h2>
              {section.body.split('\n\n').map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        {/* Share */}
        <div className="post-share">
          <Share2 size={16} />
          <span>Share this report with your syndicate</span>
        </div>
      </article>

      {/* Prev / Next Navigation */}
      <nav className="post-nav">
        {prevPost ? (
          <Link to={`/blog/${prevPost.id}`} className="post-nav-link prev">
            <span className="post-nav-label"><ArrowLeft size={14} /> Previous</span>
            <span className="post-nav-title">{prevPost.title}</span>
          </Link>
        ) : <div />}
        {nextPost ? (
          <Link to={`/blog/${nextPost.id}`} className="post-nav-link next">
            <span className="post-nav-label">Next <ChevronRight size={14} /></span>
            <span className="post-nav-title">{nextPost.title}</span>
          </Link>
        ) : <div />}
      </nav>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-section">
          <h3 className="section-title"><Tag size={22} /> // Related Intel</h3>
          <div className="related-grid">
            {relatedPosts.map(p => (
              <Link key={p.id} to={`/blog/${p.id}`} className="related-card">
                <span className="blog-category" style={{ color: categoryColors[p.category] }}>
                  <Tag size={12} /> {p.category}
                </span>
                <h4>{p.title}</h4>
                <p>{p.excerpt}</p>
                <span className="related-meta"><Clock size={12} /> {p.readTime} · {p.author}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
