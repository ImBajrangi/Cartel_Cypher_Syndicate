import { useState } from 'react';
import { Send, Mail, MapPin, Phone, Lock, Terminal } from 'lucide-react';
import MorphingParticles from '../components/MorphingParticles';
import { addRequest } from '../utils/db';

const Instagram = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
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
      email: form.email,
      subject: form.subject,
      message: form.message,
      type: 'inquiry'
    });

    const logSequence = [
      '[i] Connecting to secure syndicate node relay...',
      '[i] Establishing cryptographic tunnel (ECDH / Curve25519)...',
      '[+] Tunnel established. Encryption: ChaCha20-Poly1305.',
      '[i] Scrambling origin routing (Scattered via 3 proxies)...',
      '[i] Encrypting message block (PGP block conversion)...',
      `[+] Transmission complete! Secure payload token: ${savedRequest.requestId}`
    ];

    logSequence.forEach((logText, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, logText]);
        if (index === logSequence.length - 1) {
          setIsTransmitting(false);
          setSubmitted(true);
          setForm({ name: '', email: '', subject: '', message: '' });
        }
      }, (index + 1) * 700);
    });
  };


  return (
    <div className="page-content fade-in">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-logo-box">
          <img src="/logo.png" alt="Contact" className="brand-logo-img" />
        </div>
        <h1 className="glitch" data-text="SECURE CONNECTION">SECURE CONNECTION</h1>
        <p className="page-hero-desc">Initiate an encrypted channel. We're listening.</p>
      </section>

      {/* Contact Grid */}
      <section className="contact-grid-section">
        <div className="contact-grid">
          {/* Form / Transmission Console */}
          <div className="contact-form-card">
            <h3>Transmit Data</h3>
            
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
                    Send Another Packet
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Alias / Name</label>
                  <input
                    type="text"
                    placeholder="Enter alias..."
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Secure Comm Link (Email)</label>
                  <input
                    type="email"
                    placeholder="email@server.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="Subject of inquiry..."
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Encrypted Message</label>
                  <textarea
                    rows="5"
                    placeholder="Describe your target..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="cyber-button cyber-button-filled" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={18} /> Transmit payload
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="contact-info-side">
            <div className="info-card">
              <h3>Direct Channels</h3>
              <div className="info-item">
                <Mail size={18} color="var(--primary-glow)" />
                <div>
                  <span className="info-label">Email</span>
                  <span>mishrarishabh467@gmail.com</span>
                </div>
              </div>
              <div className="info-item">
                <Phone size={18} color="var(--primary-glow)" />
                <div>
                  <span className="info-label">Secure Line</span>
                  <span>+91 9105280131</span>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} color="var(--primary-glow)" />
                <div>
                  <span className="info-label">Base of Operations</span>
                  <span>Global</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Social Channels</h3>
              <div className="social-links">
                <a href="https://www.instagram.com/code___shastra/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Instagram size={20} /> @code___shastra
                </a>
              </div>
            </div>

            <div className="info-card encryption-note">
              <Lock size={18} color="var(--primary-glow)" />
              <p>All communications are end-to-end encrypted. Your data never touches a third-party server. PGP keys available on request.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
