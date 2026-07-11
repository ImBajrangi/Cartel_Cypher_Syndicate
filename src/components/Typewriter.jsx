import { useEffect, useState } from 'react';

const playBlip = (audioCtx) => {
  if (!audioCtx) return;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(150 + Math.random() * 50, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
};

const Typewriter = ({ text, delay = 50, onComplete, audioCtx }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        if (text[currentIndex] !== ' ') playBlip(audioCtx);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      setTimeout(onComplete, 1000);
    }
  }, [currentIndex, delay, text, onComplete, audioCtx]);

  return <span>{currentText}<span className="animate-pulse" style={{ color: 'var(--primary-glow)' }}>_</span></span>;
};

export default Typewriter;
