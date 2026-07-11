import { useState, useEffect } from 'react';
import { Skull, Terminal, Cpu, ShieldAlert, Wifi } from 'lucide-react';
import Typewriter from './Typewriter';

const BootScreen = ({ onBootComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState([]);

  useEffect(() => {
    // Generate some mock boot log feeds for the corners to look authentic
    const logs = [
      'SECURE_TUNNEL: INITIATING HANDSHAKE',
      'LOCAL_PORT: 443 -> TARGET: 10.23.4.11',
      'CIPHER_SUITE: AES-256-GCM / SHA-384',
      'SYSTEM: ENCRYPTED CORE ONLINE',
    ];
    setTerminalLogs(logs);
  }, []);

  const startSequence = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioCtx(ctx);
    setHasStarted(true);
  };

  if (!hasStarted) {
    return (
      <div className="boot-screen" onClick={startSequence}>
        {/* Holographic HUD corners */}
        <div className="hud-corner top-left"></div>
        <div className="hud-corner top-right"></div>
        <div className="hud-corner bottom-left"></div>
        <div className="hud-corner bottom-right"></div>

        {/* System telemetry background streams */}
        <div className="telemetry-panel left">
          {terminalLogs.map((log, i) => (
            <div key={i} className="telemetry-line">{`> ${log}`}</div>
          ))}
        </div>
        
        <div className="telemetry-panel right">
          <div className="telemetry-line">PROTOCOL: TLS 1.3</div>
          <div className="telemetry-line">RELAY: ACTIVE</div>
          <div className="telemetry-line">INTEGRITY: SECURE</div>
        </div>

        {/* Central Core Console */}
        <div className="boot-portal">
          <div className="portal-emblem-wrapper">
            <div className="portal-ring pulse-slow"></div>
            <div className="portal-ring pulse-fast"></div>
            <Skull size={48} className="portal-icon" />
          </div>
          
          <h1 className="portal-title">CARTEL CYPHER SYNDICATE</h1>
          <p className="portal-desc">OFFENSIVE SECURITY OPERATIONS CENTRE</p>

          <button className="initialize-btn">
            <span className="btn-glow-border"></span>
            <span className="btn-text">INITIALIZE DECRYPTOR</span>
            <span className="btn-scanner"></span>
          </button>

          <div className="boot-prompt-sub animate-pulse">
            [ CLICK ANYWHERE TO RUN PORTAL HANDSHAKE ]
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="boot-screen boot-typing">
      {/* Holographic HUD corners */}
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>

      <div className="boot-logs-console">
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-glow)', fontFamily: 'var(--font-mono)' }}>
          <Typewriter
            text="Welcome to Cartel Cypher Syndicate. Opening secure connection channel..."
            delay={50}
            audioCtx={audioCtx}
            onComplete={onBootComplete}
          />
        </h2>
      </div>
    </div>
  );
};

export default BootScreen;
