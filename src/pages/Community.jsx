import { useState, useEffect } from 'react';
import { Users, ChevronRight, Cpu, MessageSquare, Calendar, Award, Fingerprint } from 'lucide-react';

const testimonials = [
  { alias: 'gh0st_r00t', msg: 'The Cartel changed my career. Went from script kiddie to red team lead in 18 months.', role: 'Red Team Lead' },
  { alias: 'n3tW1z4rd', msg: 'Best CTF community I\'ve been part of. The mentorship here is unreal.', role: 'Security Researcher' },
  { alias: 'crypt0_qu33n', msg: 'Finally found a crew that takes crypto seriously. The workshops are elite.', role: 'Cryptographer' },
  { alias: 'z3r0d4y_hunt3r', msg: 'From zero knowledge to finding my first CVE — all thanks to this community.', role: 'Bug Bounty Hunter' },
];

const rules = [
  'Always practice ethical hacking — legal authorization required.',
  'Share knowledge freely. Gatekeeping is for firewalls.',
  'Respect all members regardless of skill level.',
  'No selling exploits or engaging in black hat activities.',
  'What happens in the Cartel, stays in the Cartel.',
  'Continuous learning is not optional — it is mandatory.',
];

const CountdownTimer = () => {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 12);
    eventDate.setHours(20, 0, 0, 0);

    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, eventDate - now);
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown">
      {Object.entries(time).map(([k, v]) => (
        <div key={k} className="countdown-unit">
          <span className="countdown-value">{String(v).padStart(2, '0')}</span>
          <span className="countdown-label">{k === 'd' ? 'Days' : k === 'h' ? 'Hours' : k === 'm' ? 'Min' : 'Sec'}</span>
        </div>
      ))}
    </div>
  );
};

const Community = () => {
  return (
    <div className="page-content fade-in">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-logo-box">
          <img src="/module-community.svg" alt="Community" />
        </div>
        <h1 className="glitch" data-text="THE SYNDICATE">THE SYNDICATE</h1>
        <p className="page-hero-desc">Enter the inner circle. Connect. Collaborate. Conquer.</p>
        <a href="https://pookiz.codeshastra.tech/groups?joinGroupId=410ea32d-2838-4f4a-9c83-ca665a418c42" target="_blank" rel="noopener noreferrer" className="cyber-button" style={{ marginTop: '20px' }}>
          <Users size={16} style={{ marginRight: '8px' }} /> Join Syndicate Group
        </a>
      </section>

      {/* Join CTA */}
      <section className="community-join">
        <div className="join-content">
          <div className="join-text">
            <h2>Access The Inner Circle</h2>
            <p>Join our exclusive hacking community. Discuss zero-days, share CTF write-ups, network with industry professionals, and grow your skills with like-minded hackers.</p>
            <ul className="feature-list">
              <li><ChevronRight size={16} color="var(--primary-glow)" /> Exclusive Resources & Tools</li>
              <li><ChevronRight size={16} color="var(--primary-glow)" /> Live CTF Events & Workshops</li>
              <li><ChevronRight size={16} color="var(--primary-glow)" /> 1-on-1 Mentorship Programs</li>
              <li><ChevronRight size={16} color="var(--primary-glow)" /> Private Vulnerability Disclosures</li>
              <li><ChevronRight size={16} color="var(--primary-glow)" /> Career Networking & Job Board</li>
            </ul>
            <a href="https://pookiz.codeshastra.tech/groups?joinGroupId=410ea32d-2838-4f4a-9c83-ca665a418c42" target="_blank" rel="noopener noreferrer" className="cyber-button cyber-button-filled">
              <Users size={20} /> Execute Join Protocol
            </a>
          </div>
          <div className="join-visual">
            <Cpu size={200} color="var(--secondary-glow)" style={{ opacity: 0.4 }} />
          </div>
        </div>
      </section>

      {/* Next Event Countdown */}
      <section className="event-section">
        <div className="event-card">
          <Calendar size={28} color="var(--primary-glow)" />
          <h2>Next Live CTF Event</h2>
          <p className="event-name">Operation: Digital Fortress</p>
          <CountdownTimer />
          <p className="event-desc">48-hour jeopardy-style CTF covering web exploitation, binary analysis, cryptography, and OSINT. Top 3 teams get bounty rewards.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title"><MessageSquare size={28} /> // Terminal Outputs</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">~/{t.alias}</span>
              </div>
              <div className="terminal-body">
                <p className="terminal-output"><span className="prompt">$</span> {t.msg}</p>
                <p className="terminal-role"><Fingerprint size={14} /> {t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="rules-section">
        <h2 className="section-title"><Award size={28} /> // Code of Conduct</h2>
        <div className="rules-terminal">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">~/cartel/rules.sh</span>
          </div>
          <div className="terminal-body">
            {rules.map((r, i) => (
              <p key={i} className="rule-line">
                <span className="prompt">root@cartel:~#</span> echo "Rule {i + 1}: {r}"
              </p>
            ))}
            <p className="rule-line" style={{ color: 'var(--primary-glow)', marginTop: '15px' }}>
              <span className="prompt">root@cartel:~#</span> echo "Violation = Permanent Ban. No exceptions."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
