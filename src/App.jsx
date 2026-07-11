import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BootScreen from './components/BootScreen';
import Home from './pages/Home';
import Community from './pages/Community';
import Learn from './pages/Learn';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Initiate from './pages/Initiate';
import CyberBackground from './components/CyberBackground';
import TerminalWidget from './components/TerminalWidget';
import './index.css';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isBooting) {
    return <BootScreen onBootComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="app-container fade-in">
      <CyberBackground />
      <div className="cyber-overlay"></div>

      <Navbar />

      <main className="main-content" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/initiate" element={<Initiate />} />
        </Routes>
      </main>

      <Footer />
      <TerminalWidget />
    </div>
  );
}

export default App;
