import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Page.css';

const FanRanking = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <button className="back-button" onClick={() => navigate('/')}>
        ← BACK TO HOME
      </button>
      <div className="page-content">
        <h1 className="page-title">FAN RANKING</h1>
        <p className="page-description">Fan Ranking page content coming soon...</p>
      </div>
    </motion.div>
  );
};

export default FanRanking;
