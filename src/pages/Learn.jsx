import { useState, useEffect } from 'react';
import { Shield, Terminal, Lock, Cpu, Eye, Globe, Search, ExternalLink, BookOpen, Award, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const domains = [
  {
    icon: <Terminal size={32} />,
    title: 'Penetration Testing',
    level: 'Intermediate',
    desc: 'Learn to identify and exploit vulnerabilities in web apps, networks, and systems before the bad guys do.',
    topics: ['OWASP Top 10', 'Burp Suite', 'Metasploit', 'SQL Injection', 'XSS/CSRF', 'API Security'],
    color: '#ff1a1a',
  },
  {
    icon: <Lock size={32} />,
    title: 'Cryptography',
    level: 'Advanced',
    desc: 'Understand encryption, hashing, and secure communication protocols to protect data integrity.',
    topics: ['AES/RSA', 'Hash Functions', 'PKI', 'TLS/SSL', 'Zero-Knowledge Proofs', 'Post-Quantum Crypto'],
    color: '#ff4444',
  },
  {
    icon: <Cpu size={32} />,
    title: 'Reverse Engineering',
    level: 'Advanced',
    desc: 'Deconstruct malware and proprietary software to understand their inner workings at the assembly level.',
    topics: ['IDA Pro', 'Ghidra', 'x86 Assembly', 'Dynamic Analysis', 'Anti-Debug Techniques', 'Firmware RE'],
    color: '#cc0000',
  },
  {
    icon: <Shield size={32} />,
    title: 'Defensive Security',
    level: 'Beginner',
    desc: 'Build robust architectures, configure firewalls, and set up SIEMs to detect and respond to threats.',
    topics: ['SIEM Setup', 'IDS/IPS', 'Incident Response', 'Log Analysis', 'Threat Hunting', 'SOC Operations'],
    color: '#ff6666',
  },
  {
    icon: <Eye size={32} />,
    title: 'OSINT',
    level: 'Beginner',
    desc: 'Master open-source intelligence gathering to track targets, map networks, and uncover hidden data.',
    topics: ['Maltego', 'Shodan', 'Google Dorking', 'Social Engineering', 'Dark Web Recon', 'Geolocation'],
    color: '#ff3333',
  },
  {
    icon: <Globe size={32} />,
    title: 'Web3 Security',
    level: 'Advanced',
    desc: 'Audit smart contracts, find DeFi exploits, and secure blockchain-based applications.',
    topics: ['Solidity Audits', 'Reentrancy Attacks', 'Flash Loans', 'Bridge Exploits', 'Foundry/Hardhat', 'MEV'],
    color: '#aa0000',
  },
];

const ctfChallenges = [
  { name: 'SQL Phantom', difficulty: 'Easy', category: 'Web', points: 100, hint: 'Target the username parameter on login. Use a standard single quote injection.' },
  { name: 'Buffer Overflow 101', difficulty: 'Medium', category: 'Binary', points: 250, hint: 'Overwrite the EIP register. Find the offset using cyclic patterns.' },
  { name: 'RSA Cracker', difficulty: 'Hard', category: 'Crypto', points: 500, hint: 'Factorize the low prime "N" value using Fermat factorisation.' },
  { name: 'Steganography Hunt', difficulty: 'Easy', category: 'Forensics', points: 150, hint: 'Analyze the LSB of the hero background image.' },
  { name: 'Kernel Rootkit', difficulty: 'Expert', category: 'Binary', points: 1000, hint: 'Hook sys_call_table to hide the process ID.' },
  { name: 'JWT Forgery', difficulty: 'Medium', category: 'Web', points: 300, hint: 'Modify header algorithm to "None" to sign your own token.' },
];

const resources = [
  { name: 'HackTheBox', url: 'https://hackthebox.com', desc: 'Practice labs & challenges' },
  { name: 'TryHackMe', url: 'https://tryhackme.com', desc: 'Guided learning paths' },
  { name: 'OverTheWire', url: 'https://overthewire.org', desc: 'War games for beginners' },
  { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', desc: 'Data transformation tool' },
  { name: 'OWASP', url: 'https://owasp.org', desc: 'Web security standards' },
  { name: 'Exploit-DB', url: 'https://exploit-db.com', desc: 'Exploit database & archive' },
];

const difficultyColor = { Easy: '#00ff41', Medium: '#ffaa00', Hard: '#ff4444', Expert: '#ff0066' };

const challengeFlags = {
  'SQL Phantom': 'flag{sql_injection_mastered}',
  'Buffer Overflow 101': 'flag{eip_overwrite_success}',
  'RSA Cracker': 'flag{rsa_factor_large_primes}',
  'Steganography Hunt': 'flag{hidden_in_plain_sight}',
  'Kernel Rootkit': 'flag{ring_zero_privileges}',
  'JWT Forgery': 'flag{unsigned_token_bypass}'
};

import MorphingParticles from '../components/MorphingParticles';

const Learn = () => {
  const [filter, setFilter] = useState('All');
  const [solvedList, setSolvedList] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState(null); // 'success' | 'error' | null

  // Cache loading
  useEffect(() => {
    const cached = localStorage.getItem('solved_challenges');
    if (cached) {
      try {
        setSolvedList(JSON.parse(cached));
      } catch (e) {
        // Fallback silently
      }
    }
  }, []);

  const categories = ['All', ...new Set(ctfChallenges.map(c => c.category))];

  const submitFlag = (e) => {
    e.preventDefault();
    if (!activeChallenge) return;

    const correctFlag = challengeFlags[activeChallenge.name];
    if (flagInput.trim() === correctFlag) {
      setFeedback('success');
      if (!solvedList.includes(activeChallenge.name)) {
        const updated = [...solvedList, activeChallenge.name];
        setSolvedList(updated);
        localStorage.setItem('solved_challenges', JSON.stringify(updated));
      }
    } else {
      setFeedback('error');
    }
  };

  const closeSolver = () => {
    setActiveChallenge(null);
    setFlagInput('');
    setFeedback(null);
  };

  const solvedPoints = ctfChallenges
    .filter(c => solvedList.includes(c.name))
    .reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="page-content fade-in">
      {/* Hero */}
      <section className="page-hero">
        <MorphingParticles />
        <div className="hero-logo-box">
          <img src="/module-folio.svg" alt="Learn" />
        </div>
        <h1 className="glitch" data-text="KNOWLEDGE BASE">KNOWLEDGE BASE</h1>
        <p className="page-hero-desc">Master the craft. Level up your offensive and defensive capabilities.</p>
        {solvedList.length > 0 && (
          <div style={{
            marginTop: '20px',
            color: '#00ff41',
            border: '1px solid #00ff41',
            background: 'rgba(0, 255, 65, 0.05)',
            padding: '8px 20px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem'
          }}>
            [+] SCOREBOARD: {solvedPoints} PTS ({solvedList.length}/{ctfChallenges.length} SOLVED)
          </div>
        )}
      </section>

      {/* Learning Domains */}
      <section className="learn-domains">
        <h2 className="section-title"><Shield size={28} /> // Learning Paths</h2>
        <div className="domains-grid">
          {domains.map((d, i) => (
            <div key={i} className="domain-card" style={{ '--card-accent': d.color }}>
              <div className="domain-header">
                <div className="domain-icon">{d.icon}</div>
                <span className={`difficulty-badge ${d.level.toLowerCase()}`}>{d.level}</span>
              </div>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
              <div className="topic-tags">
                {d.topics.map((t, j) => (
                  <span key={j} className="topic-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTF Challenges */}
      <section className="ctf-section">
        <h2 className="section-title"><Award size={28} /> // CTF Challenges</h2>
        <div className="ctf-filters">
          {categories.map(c => (
            <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className="ctf-table">
          <div className="ctf-header">
            <span>Challenge</span>
            <span>Category</span>
            <span>Difficulty</span>
            <span>Points</span>
          </div>
          {ctfChallenges
            .filter(c => filter === 'All' || c.category === filter)
            .map((c, i) => {
              const isSolved = solvedList.includes(c.name);
              return (
                <div
                  key={i}
                  className={`ctf-row ${isSolved ? 'solved-row' : ''}`}
                  onClick={() => {
                    setActiveChallenge(c);
                    setFeedback(null);
                    setFlagInput('');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="ctf-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isSolved && <CheckCircle size={14} color="#00ff41" />}
                    {c.name}
                  </span>
                  <span className="ctf-cat">{c.category}</span>
                  <span className="ctf-diff" style={{ color: difficultyColor[c.difficulty] }}>{c.difficulty}</span>
                  <span className="ctf-pts">{c.points} pts</span>
                </div>
              );
            })}
        </div>
      </section>

      {/* Dynamic CTF Solver Card overlay */}
      {activeChallenge && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div className="cyber-card" style={{
            maxWidth: '500px', width: '100%',
            background: 'var(--bg-color)',
            border: `1px solid ${feedback === 'success' ? '#00ff41' : feedback === 'error' ? 'var(--primary-glow)' : 'var(--border-color)'}`,
            padding: '30px',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Terminal size={18} color="var(--primary-glow)" /> {activeChallenge.name}
              </h3>
              <button onClick={closeSolver} style={{
                background: 'none', border: 'none', color: '#888', cursor: 'pointer'
              }}><XCircle size={20} /></button>
            </div>

            <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '15px' }}>
              <strong>Category:</strong> {activeChallenge.category} | <strong>Points:</strong> {activeChallenge.points} PTS
            </p>

            <div style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid #222',
              padding: '12px 16px',
              borderRadius: '4px',
              color: '#888',
              fontSize: '0.85rem',
              marginBottom: '20px'
            }}>
              <strong>Hint:</strong> {activeChallenge.hint}
            </div>

            {feedback === 'success' ? (
              <div style={{
                color: '#00ff41',
                background: 'rgba(0, 255, 65, 0.08)',
                border: '1px solid rgba(0, 255, 65, 0.2)',
                padding: '15px',
                borderRadius: '4px',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                [+] FLAG MATCHED! CHALLENGE SOLVED SUCCESSFULLY.
              </div>
            ) : (
              <form onSubmit={submitFlag}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    Enter Flag (flag&#123;...&#125;)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="flag{...}"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(0,0,0,0.8)',
                      border: `1px solid ${feedback === 'error' ? 'var(--primary-glow)' : 'var(--border-color)'}`,
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      borderRadius: '4px'
                    }}
                  />
                  {feedback === 'error' && (
                    <span style={{ color: 'var(--primary-glow)', fontSize: '0.75rem', marginTop: '6px', display: 'block' }}>
                      [-] Invalid flag payload. Verification failed.
                    </span>
                  )}
                </div>
                <button type="submit" className="cyber-button cyber-button-filled" style={{ width: '100%', justifyContent: 'center' }}>
                  Submit Flag <ArrowRight size={16} />
                </button>
              </form>
            )}

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#555' }}>
                Hint: Check data/posts or search writeups for tips.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Resources */}
      <section className="resources-section">
        <h2 className="section-title"><Search size={28} /> // External Resources</h2>
        <div className="resources-grid">
          {resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-card">
              <div className="resource-header">
                <span className="prompt">$</span> <span>{r.name}</span>
                <ExternalLink size={14} />
              </div>
              <p>{r.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Learn;
