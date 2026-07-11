import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';

const TerminalWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState([
    { text: 'CARTEL SECURE TERMINAL v1.0.4', type: 'system' },
    { text: 'Type "help" for a list of available commands.', type: 'system' },
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [vvHeight, setVvHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isOpen, isMinimized]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleResize = () => {
      const vv = window.visualViewport;
      const offset = window.innerHeight - vv.height;
      setKeyboardOffset(offset > 60 ? offset : 0);
      setVvHeight(vv.height);
    };

    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);
    handleResize();

    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
      window.visualViewport.removeEventListener('scroll', handleResize);
    };
  }, []);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { text: `specter@cartel:~$ ${trimmed}`, type: 'input' }];
    const parts = trimmed.split(' ');
    const commandName = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (commandName) {
      case 'help':
        newHistory.push({
          text: `Available commands:
  help             - Show this helper menu
  goto [page]      - Navigate to a section (e.g. goto learn)
  join             - Join our group on Pookiz
  about            - Learn about Cartel Cypher Syndicate
  status           - Get current encryption & node connection status
  portscan [host]  - Run vulnerability scanning on a host
  decrypt [hash]   - Brute-force decrypt an MD5/SHA256 cipher
  export-payloads  - Package & export client scoping requests
  clear            - Clear terminal log output`,
          type: 'output',
        });
        break;

      case 'export-payloads':
        try {
          const reqs = localStorage.getItem("syndicate_requests") || "[]";
          const base64 = btoa(unescape(encodeURIComponent(reqs)));
          newHistory.push({
            text: `[+] Secure database pack encrypted. Copy the block below:\n\n-----BEGIN CARTEL CRYPTO PACK-----\n${base64}\n-----END CARTEL CRYPTO PACK-----\n\nUse this block in the Admin Portal sync terminal to import all submissions.`,
            type: 'output',
          });
        } catch (e) {
          newHistory.push({ text: `[!] Encryption failed: ${e.message}`, type: 'error' });
        }
        break;

      case 'join':
        newHistory.push({ text: '[+] Spawning tunnel connection to Pookiz Group...', type: 'info' });
        setTimeout(() => {
          window.open('https://pookiz.codeshastra.tech/groups?joinGroupId=410ea32d-2838-4f4a-9c83-ca665a418c42', '_blank');
        }, 800);
        break;

      case 'goto':
      case 'nav':
        if (!arg) {
          newHistory.push({ text: 'Error: Provide page name. e.g. goto learn. (Pages: home, community, learn, services, about, blog, contact)', type: 'error' });
        } else {
          const page = arg.toLowerCase().trim();
          const routes = {
            home: '/',
            community: '/community',
            learn: '/learn',
            services: '/services',
            about: '/about',
            blog: '/blog',
            contact: '/contact'
          };

          if (routes[page] !== undefined) {
            newHistory.push({ text: `[+] Connecting to secure node route: ${page}...`, type: 'info' });
            setTimeout(() => {
              navigate(routes[page]);
            }, 500);
          } else {
            newHistory.push({ text: `Error: Unknown route "${page}". Available nodes: home, community, learn, services, about, blog, contact`, type: 'error' });
          }
        }
        break;

      case 'about':
        newHistory.push({
          text: 'We are an elite decentralized collective of security researchers and ethical operators. Our mission is to test, defend, and secure the modern digital frontier.',
          type: 'output',
        });
        break;

      case 'status':
        newHistory.push({
          text: `[+] PROTOCOL: E2EE / TLS 1.3
[+] NODE: Syndicate Core (Hong Kong Relay)
[+] ENCRYPTION: AES-256-GCM
[+] SYSTEM INTEGRITY: Secure`,
          type: 'output',
        });
        break;

      case 'portscan':
        if (!arg) {
          newHistory.push({ text: 'Error: Specify host to scan. Example: portscan 10.10.11.23', type: 'error' });
        } else {
          newHistory.push({ text: `[i] Initializing probe scan on target host: ${arg}...`, type: 'info' });
          setTimeout(() => {
            setHistory(prev => [
              ...prev,
              {
                text: `[+] Port 22/tcp  - OPEN (OpenSSH 8.9p1)
[+] Port 80/tcp  - OPEN (Nginx 1.18.0)
[+] Port 443/tcp - OPEN (Nginx 1.18.0)
[+] Port 8080/tcp - FILTERED (WAF Active)
Scan complete. 3 open ports found.`,
                type: 'output',
              },
            ]);
          }, 1500);
        }
        break;

      case 'decrypt':
        if (!arg) {
          newHistory.push({ text: 'Error: Provide hash to crack. Example: decrypt 827ccb0eea8a706c4c34a16891f84e7b', type: 'error' });
        } else {
          newHistory.push({ text: `[i] Loading dictionaries... cracking cipher hash: ${arg}...`, type: 'info' });
          setTimeout(() => {
            setHistory(prev => [
              ...prev,
              {
                text: `[+] Success! Decrypted plain text: "12345"
Crack duration: 0.84 seconds. Method: Dict Attack.`,
                type: 'output',
              },
            ]);
          }, 1800);
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          text: `Command not found: ${commandName}. Type "help" for valid command formats.`,
          type: 'error',
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="terminal-float-btn"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'rgba(5, 5, 5, 0.95)',
          border: '1px solid var(--primary-glow)',
          color: 'var(--primary-glow)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(255, 26, 26, 0.3)',
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scale(0.3) rotate(90deg)' : 'scale(1) rotate(0deg)',
          pointerEvents: isOpen ? 'none' : 'auto',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Terminal size={24} />
      </button>

      <div
        className={`terminal-widget-container ${isMinimized ? 'minimized' : ''}`}
        style={{
          position: 'fixed',
          bottom: `${20 + keyboardOffset}px`,
          right: '20px',
          width: isMinimized ? '280px' : '450px',
          height: isMinimized ? '45px' : '320px',
          maxWidth: 'calc(100% - 40px)',
          maxHeight: isMinimized ? '45px' : `calc(${vvHeight}px - 40px)`,
          zIndex: 9999,
          background: 'rgba(5, 5, 5, 0.95)',
          border: '1px solid var(--primary-glow)',
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 25px rgba(255, 26, 26, 0.25)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1) translate(0, 0)' : 'scale(0.1) translate(100px, 100px)',
          transformOrigin: 'bottom right',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.1s ease-out, max-height 0.1s ease-out',
        }}
      >
      {/* Title Bar */}
      <div
        style={{
          padding: '10px 14px',
          background: 'rgba(255, 26, 26, 0.08)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
          <Terminal size={14} color="var(--primary-glow)" />
          <span>cartel_terminal@specter</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
          >
            {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      {!isMinimized && (
        <>
          <div
            style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              color: '#0f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  color: h.type === 'error' ? '#ff4444' : h.type === 'info' ? '#00bfff' : h.type === 'system' ? '#888' : h.type === 'input' ? '#fff' : '#0f0',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {h.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar */}
          <div
            style={{
              padding: '10px 14px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              background: '#020202',
            }}
          >
            <span style={{ color: 'var(--primary-glow)', marginRight: '8px' }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Type a command...'
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
              }}
            />
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default TerminalWidget;
