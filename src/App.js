import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Interview from './pages/Interview';
import MusicReview from './pages/MusicReview';
import MyMusicTaste from './pages/MyMusicTaste';
import Featured from './pages/Featured';
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
        <Route path="/my-music-taste" element={<MyMusicTaste />} />
        <Route path="/featured" element={<Featured />} />
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
