import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Interview from './pages/Interview';
import MusicReview from './pages/MusicReview';
import FanRanking from './pages/FanRanking';
import MyMusicTaste from './pages/MyMusicTaste';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/music-review" element={<MusicReview />} />
        <Route path="/fan-ranking" element={<FanRanking />} />
        <Route path="/my-music-taste" element={<MyMusicTaste />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
