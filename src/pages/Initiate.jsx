import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Send, Terminal, ArrowLeft, User, Shield, Globe, Zap, FileText } from 'lucide-react';
import { addRequest } from '../utils/db';

const Initiate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get pre-selected tier from state or query params if any
  const queryParams = new URLSearchParams(location.search);
  const preSelectedTier = queryParams.get('tier') || 'Exploit';

  const [form, setForm] = useState({
    name: '',
    contact: '',
    scope: '',
    tier: preSelectedTier,
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTransmitting(true);
    setLogs([]);
    setSubmitted(false);

    // Save request to Firebase
    const savedRequest = await addRequest({
      name: form.name,
      contact: form.contact,
      scope: form.scope,
      tier: form.tier,
      details: form.details,
      type: 'service'
    });

    const logSequence = [
      '[i] Connecting to secure syndicate node relay...',
      '[i] Establishing cryptographic tunnel (ECDH / Curve25519)...',
      '[+] Tunnel established. Encryption: ChaCha20-Poly1305.',
      '[i] Registering scoping parameters for Tier: ' + form.tier.toUpperCase() + '...',
      '[i] Encrypting client specifications...',
      `[+] Transmission complete! Secure payload token: ${savedRequest.requestId}`,
      '[+] SCOPE REGISTERED. Our operators will contact you shortly.'
    ];

    logSequence.forEach((logText, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, logText]);
        if (index === logSequence.length - 1) {
          setIsTransmitting(false);
          setSubmitted(true);
          setForm({ name: '', contact: '', scope: '', tier: 'Exploit', details: '' });
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="page-content fade-in">
      <div className="post-back">
        <button className="back-btn" onClick={() => navigate('/services')}>
          <ArrowLeft size={16} /> Back to Services
        </button>
      </div>

      <section className="page-hero" style={{ paddingBottom: '30px' }}>
        <div className="hero-logo-box">
          <img src="/logo.png" alt="Initiate" className="brand-logo-img" />
        </div>
        <h1 className="glitch" data-text="INITIATE ENGAGEMENT">INITIATE ENGAGEMENT</h1>
        <p className="page-hero-desc">Submit scoping coordinates. Operators will establish contact.</p>
      </section>

      <div className="initiate-wrapper">
        <div className="initiate-card">
          <h3><FileText size={20} color="var(--primary-glow)" /> Scoped Request Details</h3>

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
              marginBottom: '20px'
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
                <label>Client Alias / Name</label>
                <div className="initiate-input-container">
                  <input
                    type="text"
                    placeholder="e.g. Operator, Admin..."
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
                <label>Secure Comm Link (Email or Signal Number)</label>
                <div className="initiate-input-container">
                  <input
                    type="text"
                    placeholder="email@server.com or Signal handle"
                    value={form.contact}
                    onChange={e => setForm({ ...form, contact: e.target.value })}
                    required
                  />
                  <span className="initiate-input-icon">
                    <Shield size={16} />
                  </span>
                </div>
              </div>

              <div className="initiate-field-group">
                <label>Target Scope URL / Domain / Assets count</label>
                <div className="initiate-input-container">
                  <input
                    type="text"
                    placeholder="e.g. targetcompany.com / 25 IP nodes"
                    value={form.scope}
                    onChange={e => setForm({ ...form, scope: e.target.value })}
                    required
                  />
                  <span className="initiate-input-icon">
                    <Globe size={16} />
                  </span>
                </div>
              </div>

              <div className="initiate-field-group">
                <label>Scoping Tier</label>
                <div className="initiate-input-container">
                  <select
                    value={form.tier}
                    onChange={e => setForm({ ...form, tier: e.target.value })}
                  >
                    <option value="Recon">Recon — Vulnerability Assessment</option>
                    <option value="Exploit">Exploit — Penetration Testing</option>
                    <option value="Zero-Day">Zero-Day — Red Team Ops</option>
                    <option value="Custom">Custom Scope Estimation</option>
                  </select>
                  <span className="initiate-input-icon">
                    <Zap size={16} />
                  </span>
                </div>
              </div>

              <div className="initiate-field-group initiate-grid-full">
                <label>Additional Specifications</label>
                <div className="initiate-input-container">
                  <textarea
                    rows="4"
                    placeholder="Detail your parameters, critical scopes, and timelines..."
                    value={form.details}
                    onChange={e => setForm({ ...form, details: e.target.value })}
                    required
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="cyber-button cyber-button-filled initiate-grid-full" style={{ width: '100%', justifyContent: 'center', height: '48px', fontSize: '1rem', marginTop: '10px' }}>
                <Send size={18} /> Transmit Scoping Brief
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Initiate;
