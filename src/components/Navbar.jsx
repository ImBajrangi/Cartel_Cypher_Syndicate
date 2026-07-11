import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Skull, Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/community', label: 'Community' },
  { path: '/learn', label: 'Learn' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/logo.png" alt="Cartel Core" className="brand-logo-img" style={{ width: '32px', height: '32px' }} />
        <h2>CARTEL_SEC</h2>
      </Link>

      <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X size={28} color="var(--primary-glow)" /> : <Menu size={28} color="var(--primary-glow)" />}
      </button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="https://pookiz.codeshastra.tech/groups?joinGroupId=410ea32d-2838-4f4a-9c83-ca665a418c42"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link nav-join-btn"
          onClick={() => setMenuOpen(false)}
        >
          Join Group
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
