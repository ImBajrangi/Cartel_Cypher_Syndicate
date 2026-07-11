import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Users, Zap, Shield, Terminal, Eye, Activity, Skull, Cpu, Globe, Database, Server } from 'lucide-react';
import Typewriter from '../components/Typewriter';
import MorphingParticles from '../components/MorphingParticles';

const stats = [
  { label: 'Active Members', value: 2500, icon: <Users size={20} /> },
  { label: 'CTFs Won', value: 147, icon: <Shield size={20} /> },
  { label: 'Vulns Found', value: 3200, icon: <Eye size={20} /> },
  { label: 'Lines of Exploit', value: 98000, icon: <Terminal size={20} /> },
];

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);
      // easeOutQuad
      const easedRate = rate * (2 - rate);
      const current = Math.floor(easedRate * target);
      setCount(current);
      countRef.current = current;
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const Home = () => {
  return (
    <div className="page-content fade-in">
      {/* Hero */}
      <section className="hero-section">
        <MorphingParticles />
        <div className="hero-inner">
          <div className="hero-logo-box home-logo">
            <img src="/logo.png" alt="Cartel Core" className="brand-logo-img" />
          </div>
          <h1 className="glitch" data-text="SYSTEM COMPROMISED">SYSTEM COMPROMISED</h1>
          <h3 className="hero-subtitle">
            <Typewriter text="> Access granted to the Cartel network." delay={40} audioCtx={null} />
          </h3>
          <p className="hero-desc">
            We are a collective of elite cybersecurity professionals, ethical hackers, and security researchers. Join the revolution.
          </p>
          <div className="hero-cta">
            <a href="https://pookiz.codeshastra.tech/groups?joinGroupId=410ea32d-2838-4f4a-9c83-ca665a418c42" target="_blank" rel="noopener noreferrer" className="cyber-button">
              <Users size={20} /> Join The Syndicate
            </a>
            <Link to="/services" className="cyber-button cyber-button-filled">
              <Zap size={20} /> Our Services
            </Link>
          </div>
        </div>

      </section>

      {/* Trusted Partners Marquee */}
      <section className="partners-section">
        <div className="partners-title">TRUSTED SEC RELATIONSHIPS</div>
        <div className="partners-marquee">
          <div className="partners-marquee-track">
            <span><Terminal size={16} /> BLACKHAT_LTD</span>
            <span><Database size={16} /> CRYPTO_CORP</span>
            <span><Shield size={16} /> APEX_NETWORKS</span>
            <span><Cpu size={16} /> QUANTUM_SEC</span>
            <span><Server size={16} /> NEXUS_LOGISTICS</span>
            <span><Activity size={16} /> NEURAL_SYSTEMS</span>
            <span><Globe size={16} /> GALAXY_GLOBAL</span>
            {/* Duplicate for infinite loop */}
            <span><Terminal size={16} /> BLACKHAT_LTD</span>
            <span><Database size={16} /> CRYPTO_CORP</span>
            <span><Shield size={16} /> APEX_NETWORKS</span>
            <span><Cpu size={16} /> QUANTUM_SEC</span>
            <span><Server size={16} /> NEXUS_LOGISTICS</span>
            <span><Activity size={16} /> NEURAL_SYSTEMS</span>
            <span><Globe size={16} /> GALAXY_GLOBAL</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value"><AnimatedCounter target={s.value} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-section">
        <h2 className="section-title"><Terminal size={28} /> // Quick Access</h2>
        <div className="quick-grid">
          <Link to="/learn" className="quick-card">
            <Shield size={36} color="var(--primary-glow)" />
            <h3>Knowledge Base</h3>
            <p>Master penetration testing, cryptography, reverse engineering, and more.</p>
            <span className="quick-link">Explore →</span>
          </Link>
          <Link to="/blog" className="quick-card">
            <Terminal size={36} color="var(--primary-glow)" />
            <h3>Intel Feed</h3>
            <p>Latest writeups, CTF solutions, vulnerability research, and tutorials.</p>
            <span className="quick-link">Read →</span>
          </Link>
          <a href="https://pookiz.codeshastra.tech/groups?joinGroupId=410ea32d-2838-4f4a-9c83-ca665a418c42" target="_blank" rel="noopener noreferrer" className="quick-card">
            <Users size={36} color="var(--primary-glow)" />
            <h3>The Syndicate</h3>
            <p>Connect with elite hackers. Share exploits. Grow together.</p>
            <span className="quick-link">Join →</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
