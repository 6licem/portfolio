import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import BookConsultation from './pages/BookConsultation';
import Videos from './pages/Videos';
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', (e: any) => {
      const velocity = Math.abs(e.velocity);
      if (velocity > 5) {
        document.body.classList.add('is-fast-scroll');
      } else {
        document.body.classList.remove('is-fast-scroll');
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      document.body.classList.remove('is-fast-scroll');
    };
  }, []);

  return (
    <Router>
      <div className="bg-noise"></div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio/:specialistId" element={<Portfolio />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </Router>
  );
}

export default App;
