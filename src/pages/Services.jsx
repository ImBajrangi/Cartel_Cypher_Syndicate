import { useState } from 'react';
import { Send, Terminal, Shield, Eye, AlertTriangle, CheckCircle, User } from 'lucide-react';

const Services = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    need: 'business', // 'business' | 'vulnerability' | 'crime'
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTransmitting(true);
    setLogs([]);
    setSubmitted(false);

    const logSequence = [
      '[i] Connecting to secure syndicate node relay...',
      '[i] Establishing cryptographic tunnel (ECDH / Curve25519)...',
      '[+] Tunnel established. Encryption: ChaCha20-Poly1305.',
      '[i] Registering scoping parameters for: ' + form.need.toUpperCase() + '...',
      '[i] Encrypting client specifications...',
      '[+] Transmission complete! Secure payload token: SEC-INIT-' + Math.floor(100000 + Math.random() * 900000),
      '[+] PARAMETERS REGISTERED. Our operators will contact you shortly.'
    ];

    logSequence.forEach((logText, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, logText]);
        if (index === logSequence.length - 1) {
          setIsTransmitting(false);
          setSubmitted(true);
          setForm({ name: '', contact: '', need: 'business', details: '' });
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="page-content fade-in">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-logo-box">
          <img src="/logo.png" alt="Services" className="brand-logo-img" />
        </div>
        <h1 className="glitch" data-text="SYNDICATE SERVICES">SYNDICATE SERVICES</h1>
        <p className="page-hero-desc">Elite threat assessment, business security, and compromise containment.</p>
      </section>

      {/* Scoping Form Card (Now First) */}
      <div className="initiate-wrapper" style={{ marginTop: '10px', marginBottom: '40px' }}>
        <div className="initiate-card">
          <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={20} color="var(--primary-glow)" /> Scoping Brief
          </h3>

          {(isTransmitting || logs.length > 0) ? (
            <div style={{
              background: '#020202',
              border: '1px solid var(--border-color)',
              padding: '20px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: '#0f0',
              marginBottom: '10px'
            }}>
              <div style={{ borderBottom: '1px solid #222', paddingBottom: '10px', color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} color="var(--primary-glow)" />
                <span>TRANSMISSION MONITOR</span>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {logs.map((log, idx) => (
                  <div key={idx} style={{
                    color: log.startsWith('[+') ? '#00ff41' : log.startsWith('[-]') ? '#ff4444' : '#00bfff',
                    marginBottom: '6px'
                  }}>
                    {log}
                  </div>
                ))}
                {isTransmitting && (
                  <div className="animate-pulse" style={{ color: 'var(--primary-glow)' }}>
                    &gt; Transmitting secure packets...
                  </div>
                )}
              </div>
              {submitted && (
                <button
                  onClick={() => { setLogs([]); setSubmitted(false); }}
                  className="cyber-button"
                  style={{ padding: '8px 16px', fontSize: '0.8rem', alignSelf: 'flex-end' }}
                >
                  Submit New Request
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="initiate-form-grid">
              <div className="initiate-field-group">
                <label>Your Name / Company Alias</label>
                <div className="initiate-input-container">
                  <input
                    type="text"
                    placeholder="e.g. Admin, Corp Sec..."
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <span className="initiate-input-icon">
                    <User size={16} />
                  </span>
                </div>
              </div>

              <div className="initiate-field-group">
                <label>Secure Contact Link (Email, Telegram or Signal)</label>
                <div className="initiate-input-container">
                  <input
                    type="text"
                    placeholder="email@server.com / @username"
                    value={form.contact}
                    onChange={e => setForm({ ...form, contact: e.target.value })}
                    required
                  />
                  <span className="initiate-input-icon">
                    <Shield size={16} />
                  </span>
                </div>
              </div>

              <div className="initiate-field-group initiate-grid-full">
                <label>Primary Need</label>
                <div className="initiate-need-group">
                  <label className={`initiate-need-label ${form.need === 'business' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="need"
                      value="business"
                      checked={form.need === 'business'}
                      onChange={() => setForm({ ...form, need: 'business' })}
                    />
                    Securing My Business
                  </label>

                  <label className={`initiate-need-label ${form.need === 'vulnerability' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="need"
                      value="vulnerability"
                      checked={form.need === 'vulnerability'}
                      onChange={() => setForm({ ...form, need: 'vulnerability' })}
                    />
                    Finding Vulnerabilities
                  </label>

                  <label className={`initiate-need-label ${form.need === 'crime' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="need"
                      value="crime"
                      checked={form.need === 'crime'}
                      onChange={() => setForm({ ...form, need: 'crime' })}
                    />
                    Mitigating Cybercrime
                  </label>
                </div>
              </div>

              <div className="initiate-field-group initiate-grid-full">
                <label>Brief details of how we can help you</label>
                <div className="initiate-input-container">
                  <textarea
                    rows="4"
                    placeholder="Enter your system details, incident logs, or questions..."
                    value={form.details}
                    onChange={e => setForm({ ...form, details: e.target.value })}
                    required
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="cyber-button cyber-button-filled initiate-grid-full" style={{ width: '100%', justifyContent: 'center', height: '48px', fontSize: '1rem', marginTop: '10px' }}>
                <Send size={18} /> Send Scoping Details
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Simplified Service Cards (Now Second) */}
      <section className="about-values-section" style={{ padding: '0 20px 40px' }}>
        <div className="values-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="value-card" style={{ textAlign: 'center', padding: '30px' }}>
            <div style={{ color: 'var(--primary-glow)', marginBottom: '15px' }}>
              <Shield size={40} style={{ filter: 'drop-shadow(0 0 10px rgba(255, 26, 26, 0.4))' }} />
            </div>
            <h3>Securing Your Business</h3>
            <p>
              We fortify your company's digital perimeter, secure cloud infrastructures, and safeguard databases to keep operations running cleanly and safely.
            </p>
          </div>

          <div className="value-card" style={{ textAlign: 'center', padding: '30px' }}>
            <div style={{ color: 'var(--primary-glow)', marginBottom: '15px' }}>
              <Eye size={40} style={{ filter: 'drop-shadow(0 0 10px rgba(255, 26, 26, 0.4))' }} />
            </div>
            <h3>Finding Vulnerabilities</h3>
            <p>
              We run expert penetration testing and code audits, discovering hidden security loopholes and vulnerabilities before cyber threat actors can find them.
            </p>
          </div>

          <div className="value-card" style={{ textAlign: 'center', padding: '30px' }}>
            <div style={{ color: 'var(--primary-glow)', marginBottom: '15px' }}>
              <AlertTriangle size={40} style={{ filter: 'drop-shadow(0 0 10px rgba(255, 26, 26, 0.4))' }} />
            </div>
            <h3>Cyber Crime Containment</h3>
            <p>
              If you have been hacked, breached, or are dealing with cyber incidents, we quickly contain the breach, evict attackers, and restore system integrity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
