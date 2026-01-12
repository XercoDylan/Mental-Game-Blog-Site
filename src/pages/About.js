import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Page.css';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="page-container about-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <button className="back-button" onClick={() => navigate('/')}>
        ← BACK TO HOME
      </button>

      <div className="page-content">
        {/* Newspaper Header */}
        <div className="newspaper-header">
          <div className="newspaper-date">EST. 2024 • MUSIC • CULTURE • LIFESTYLE</div>
          <h1 className="page-title about-title">ABOUT MENTAL GAME</h1>
          <div className="newspaper-subtitle">WHERE CULTURE MEETS AUTHENTICITY</div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="about-main-content">
          {/* Left Column - Main Story */}
          <div className="about-column main-column">
            <div className="article-section">
              <h2 className="section-heading">WHO WE ARE</h2>
              <div className="article-divider"></div>
              <p className="article-text">
                <span className="drop-cap">M</span>ental Game is more than just a media platform—it's a movement dedicated to authentic music journalism. We dive deep into the world of hip-hop, bringing you exclusive interviews, honest album reviews, and genuine connections with the artists shaping culture.
              </p>
              <p className="article-text">
                Born from a passion for discovering and championing real talent, Mental Game cuts through the noise to deliver content that matters. No corporate BS, no payola reviews—just honest perspectives on the music that moves us.
              </p>
            </div>

            <div className="article-section">
              <h2 className="section-heading">OUR MISSION</h2>
              <div className="article-divider"></div>
              <p className="article-text">
                We exist to bridge the gap between underground talent and mainstream recognition. Every interview we conduct, every review we publish, and every artist we feature is chosen because they deserve your attention—not because they paid for it.
              </p>
              <blockquote className="pull-quote">
                "Real music journalism for real music lovers."
              </blockquote>
              <p className="article-text">
                Our goal is simple: create a space where authenticity reigns supreme, where artists can tell their stories unfiltered, and where music fans can discover their next obsession before everyone else catches on.
              </p>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="about-column sidebar-column">
            <div className="info-box">
              <h3 className="info-box-title">WHAT WE DO</h3>
              <div className="info-divider"></div>
              <ul className="info-list">
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">Exclusive artist interviews</span>
                </li>
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">In-depth album reviews</span>
                </li>
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">Music rankings & lists</span>
                </li>
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">Cultural commentary</span>
                </li>
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">Emerging artist spotlights</span>
                </li>
              </ul>
            </div>

            <div className="info-box">
              <h3 className="info-box-title">OUR VALUES</h3>
              <div className="info-divider"></div>
              <div className="value-item">
                <div className="value-number">01</div>
                <div className="value-content">
                  <h4 className="value-title">AUTHENTICITY</h4>
                  <p className="value-desc">No fake hype, just honest opinions</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-number">02</div>
                <div className="value-content">
                  <h4 className="value-title">INTEGRITY</h4>
                  <p className="value-desc">We can't be bought or influenced</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-number">03</div>
                <div className="value-content">
                  <h4 className="value-title">PASSION</h4>
                  <p className="value-desc">Driven by love for the culture</p>
                </div>
              </div>
            </div>

            <div className="info-box featured-box">
              <h3 className="info-box-title">THE VISION</h3>
              <div className="info-divider"></div>
              <p className="info-text">
                Building Mental Game into a trusted voice in music media—where artists want to be featured and fans come for real recommendations.
              </p>
              <p className="info-text">
                From interviews to documentaries, festival coverage to industry insights, we're creating a comprehensive platform for hip-hop culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
