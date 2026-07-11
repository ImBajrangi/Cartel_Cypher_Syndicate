import { Link } from 'react-router-dom';
import { Skull, Users } from 'lucide-react';

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

const Footer = () => {
  return (
    <footer className="site-footer">
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.05,
          pointerEvents: 'none'
        }}
      >
        <source src="/footer-bg.mp4" type="video/mp4" />
      </video>

      <div className="footer-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-col">
          <div className="footer-brand">
            <img src="/logo.png" alt="Cartel Core" className="brand-logo-img" style={{ width: '24px', height: '24px' }} />
            <span>CARTEL_SEC</span>
          </div>
          <p className="footer-tagline">Elite cybersecurity collective. Defend. Exploit. Evolve.</p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/community">Community</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/services">Services</Link>
        </div>

        <div className="footer-col">
          <h4>More</h4>
          <Link to="/about">About Us</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <div className="footer-socials" style={{ marginBottom: '10px' }}>
            <a href="https://www.instagram.com/code___shastra/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="https://pookiz.codeshastra.tech/groups?joinGroupId=410ea32d-2838-4f4a-9c83-ca665a418c42" target="_blank" rel="noopener noreferrer" aria-label="Pookiz Group"><Users size={20} /></a>
          </div>
          <a href="https://pookiz.codeshastra.tech/groups?joinGroupId=410ea32d-2838-4f4a-9c83-ca665a418c42" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary-glow)', textDecoration: 'underline' }}>
            Join Pookiz Group
          </a>
        </div>
      </div>

      <div className="footer-bottom" style={{ position: 'relative', zIndex: 1 }}>
        <p>© {new Date().getFullYear()} CARTEL_SEC. All connections encrypted. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
