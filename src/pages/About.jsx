import { Skull, Target, Clock, Code, Shield, Wifi, Fingerprint } from 'lucide-react';
import Typewriter from '../components/Typewriter';
import MorphingParticles from '../components/MorphingParticles';

const team = [
  { alias: 'Ph4nt0m', role: 'Founder & Lead Operator', specialty: 'Red Team Ops', avatar: '/logo.svg' },
  { alias: 'Cyph3r', role: 'Head of Cryptography', specialty: 'Blockchain Security', avatar: '/module-triskelion.svg' },
  { alias: 'Sh4d0w', role: 'Reverse Engineer', specialty: 'Malware Analysis', avatar: '/module-sfe.svg' },
  { alias: 'N3ur0n', role: 'OSINT Specialist', specialty: 'Threat Intelligence', avatar: '/globe.svg' },
  { alias: 'V3ct0r', role: 'Web Security Lead', specialty: 'AppSec & API Security', avatar: '/module-paris.svg' },
  { alias: 'R00tkit', role: 'Infrastructure Lead', specialty: 'Cloud & Network Security', avatar: '/module-ut.svg' },
];

const timeline = [
  { year: '2021', event: 'Syndicate Founded', desc: 'A group of 5 hackers form the initial Cartel Cypher Syndicate on an encrypted IRC channel.' },
  { year: '2022', event: 'First CTF Victory', desc: 'Team places 1st at DEF CON CTF qualifiers. Community grows to 500+ members.' },
  { year: '2023', event: 'Professional Services Launch', desc: 'Launch of commercial penetration testing and security auditing services.' },
  { year: '2024', event: 'Global Expansion', desc: 'Community reaches 2000+ members across 40 countries. Partnership with major bug bounty platforms.' },
  { year: '2025', event: 'Academy Launch', desc: 'Launch of structured learning paths, mentorship programs, and certification prep courses.' },
  { year: '2026', event: 'Present Day', desc: '2500+ members. 3200+ vulnerabilities responsibly disclosed. The Syndicate continues to grow.' },
];

const values = [
  { icon: <Shield size={28} />, title: 'Ethical Hacking', desc: 'We believe in using our skills to protect, not destroy. Every engagement is authorized and legal.' },
  { icon: <Code size={28} />, title: 'Open Knowledge', desc: 'Knowledge should be free. We share tools, techniques, and writeups to elevate the community.' },
  { icon: <Wifi size={28} />, title: 'Continuous Learning', desc: 'The threat landscape evolves daily. We evolve faster.' },
  { icon: <Target size={28} />, title: 'Precision', desc: 'Every test, every audit, every line of exploit code is crafted with surgical precision.' },
];

const About = () => {
  return (
    <div className="page-content fade-in">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-logo-box">
          <img src="/module-shutter.svg" alt="About" />
        </div>
        <h1 className="glitch" data-text="THE SYNDICATE">THE SYNDICATE</h1>
        <p className="page-hero-desc">
          <Typewriter text="> Who we are. What we stand for. Why we hack." delay={40} audioCtx={null} />
        </p>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>
            The Cartel Cypher Syndicate exists to build the next generation of cybersecurity professionals.
            We bridge the gap between academic knowledge and real-world offensive security through hands-on
            training, community collaboration, and professional engagements. We believe that the best
            defense is built by those who understand the offense.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <h2 className="section-title"><Fingerprint size={28} /> // Core Values</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <h2 className="section-title"><Skull size={28} /> // Core Operators</h2>
        <div className="team-grid">
          {team.map((m, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px', marginBottom: '15px' }}>
                <img src={m.avatar} alt={m.alias} style={{ height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1) drop-shadow(0 0 4px var(--primary-glow))' }} />
              </div>
              <h3 className="team-alias">{m.alias}</h3>
              <p className="team-role">{m.role}</p>
              <span className="team-specialty">{m.specialty}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <h2 className="section-title"><Clock size={28} /> // Audit Trail</h2>
        <div className="timeline">
          {timeline.map((t, i) => (
            <div key={i} className="timeline-entry">
              <div className="timeline-marker">
                <span className="timeline-year">{t.year}</span>
              </div>
              <div className="timeline-content">
                <h4>{t.event}</h4>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
